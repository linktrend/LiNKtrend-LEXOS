import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";
import { getEvidenceForMatter } from "@/server/evidence/queries";
import { insertAuditEvent } from "@/server/audit/log";
import { downloadEvidenceOriginalBytes } from "@/lib/storage/evidence-originals";
import { classifyEvidenceFile, MAX_EXTRACTION_FILE_BYTES, type FileClassification } from "@/lib/extraction/classify";
import { createLocalTextAdapter } from "@/lib/parser/local-text";
import { createLayoutParserAdapter } from "@/lib/parser/layout-parser";
import {
  createForcedPlaceholderAdapter,
  createPlaceholderAdapter,
} from "@/lib/parser/placeholder";
import type { ParserRequest, ParserResult } from "@/lib/parser/types";

async function runParserPipeline(req: ParserRequest): Promise<ParserResult> {
  const c = req.classification;
  if (c === "image_text_suspected" || c === "image_no_text") {
    return (await createForcedPlaceholderAdapter("unsupported_media").parse(req))!;
  }
  if (c === "audio" || c === "video" || c === "spreadsheet" || c === "email_export" || c === "unknown") {
    return (await createForcedPlaceholderAdapter("unsupported_media").parse(req))!;
  }

  const local = createLocalTextAdapter();
  const localRes = await local.parse(req);
  if (localRes) return localRes;

  const layout = createLayoutParserAdapter();
  const layoutRes = await layout.parse(req);
  if (layoutRes) return layoutRes;

  return (await createPlaceholderAdapter().parse(req))!;
}

const MAX_MARKDOWN_CHARS = 400_000;

function trimMarkdown(s: string): string {
  if (s.length <= MAX_MARKDOWN_CHARS) return s;
  return `${s.slice(0, MAX_MARKDOWN_CHARS)}\n\n…(truncated for storage)`;
}

export type RunExtractionResult =
  | { ok: true; extractionId: string }
  | { ok: false; error: string };

export async function runEvidenceExtraction(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  matterId: string,
  evidenceId: string
): Promise<RunExtractionResult> {
  const evidence = await getEvidenceForMatter(supabase, matterId, evidenceId);
  if (!evidence) {
    return { ok: false, error: "Evidence not found or access denied." };
  }
  if (!evidence.original_file_uri) {
    return { ok: false, error: "No original file in storage; upload the file first." };
  }

  const auditBase = {
    actor_id: ctx.userId,
    actor_type: "user" as const,
    client_id: evidence.client_id,
    matter_id: matterId,
    target_object_type: "evidence" as const,
    target_object_id: evidenceId,
  };

  await insertAuditEvent(supabase, {
    ...auditBase,
    event_type: "evidence_extraction_started",
    summary: "Extraction run started",
    metadata: { evidence_id: evidenceId, matter_id: matterId },
  });

  const { data: fileBytes, error: dlErr } = await downloadEvidenceOriginalBytes(
    supabase,
    evidence.original_file_uri,
    MAX_EXTRACTION_FILE_BYTES
  );
  if (dlErr || !fileBytes) {
    await failExtraction(supabase, ctx, evidenceId, matterId);
    await insertAuditEvent(supabase, {
      ...auditBase,
      event_type: "evidence_extraction_failed",
      summary: "Extraction failed: could not read original",
      metadata: { evidence_id: evidenceId, error: dlErr ?? "download" },
    });
    return { ok: false, error: dlErr ?? "Could not read original file." };
  }

  const head = fileBytes.slice(0, Math.min(4096, fileBytes.length));
  const classification: FileClassification = classifyEvidenceFile({
    fileName: evidence.file_name ?? "upload",
    fileType: evidence.file_type,
    evidenceMediaType: evidence.evidence_media_type,
    head,
  });

  await supabase
    .from("evidence")
    .update({
      processing_status: "processing",
      extraction_status: "running",
      quality_status: "pending",
      updated_by: ctx.userId,
    })
    .eq("id", evidenceId)
    .eq("matter_id", matterId);

  let parserResult: ParserResult;
  try {
    parserResult = await runParserPipeline({
      buffer: fileBytes,
      fileName: evidence.file_name ?? "upload",
      mimeType: evidence.file_type,
      classification,
    });
  } catch {
    await failExtraction(supabase, ctx, evidenceId, matterId);
    await insertAuditEvent(supabase, {
      ...auditBase,
      event_type: "evidence_extraction_failed",
      summary: "Extraction failed: parser error",
      metadata: { evidence_id: evidenceId },
    });
    return { ok: false, error: "Extraction failed." };
  }

  const { data: prevRows } = await supabase
    .from("evidence_extractions")
    .select("id")
    .eq("evidence_id", evidenceId)
    .eq("is_current", true);

  const prevId = prevRows?.[0]?.id ?? null;

  if (prevRows?.length) {
    await supabase
      .from("evidence_extractions")
      .update({ is_current: false, updated_by: ctx.userId })
      .eq("evidence_id", evidenceId)
      .eq("is_current", true);

    await insertAuditEvent(supabase, {
      ...auditBase,
      event_type: "evidence_extraction_superseded",
      summary: "Prior extraction marked not current",
      metadata: { evidence_id: evidenceId, superseded_extraction_id: prevId },
    });
  }

  const extractionQualityStatus = "human_review_required";

  const insertRow: Database["public"]["Tables"]["evidence_extractions"]["Insert"] = {
    evidence_id: evidenceId,
    client_id: evidence.client_id,
    matter_id: matterId,
    extraction_type: parserResult.extractionType,
    markdown_text: trimMarkdown(parserResult.markdown),
    json_content: parserResult.structuredJson as Database["public"]["Tables"]["evidence_extractions"]["Insert"]["json_content"],
    extraction_tool: parserResult.extractionTool,
    extraction_model: parserResult.extractionModel,
    extraction_quality_status: extractionQualityStatus,
    quality_flags: parserResult.qualityFlags,
    human_review_required: true,
    is_current: true,
    supersedes_extraction_id: prevId,
    created_by: ctx.userId,
    updated_by: ctx.userId,
    privilege_status: evidence.privilege_status,
    confidentiality_status: evidence.confidentiality_status,
    metadata: {
      classification,
      limitations: parserResult.limitations,
      is_placeholder: parserResult.isPlaceholder,
    },
  };

  const { data: inserted, error: insErr } = await supabase
    .from("evidence_extractions")
    .insert(insertRow)
    .select("id")
    .single();

  if (insErr || !inserted) {
    await failExtraction(supabase, ctx, evidenceId, matterId);
    await insertAuditEvent(supabase, {
      ...auditBase,
      event_type: "evidence_extraction_failed",
      summary: "Extraction failed: could not persist extraction",
      metadata: { evidence_id: evidenceId, error: insErr?.message },
    });
    return { ok: false, error: insErr?.message ?? "Failed to save extraction." };
  }

  const extractionId = inserted.id;

  const processingStatus = parserResult.isPlaceholder ? "requires_human_review" : "processed";
  const extractionStatus = parserResult.isPlaceholder ? "placeholder" : "completed";
  const qualityStatus = parserResult.isPlaceholder ? "parser_unavailable" : "unverified";

  await supabase
    .from("evidence")
    .update({
      processing_status: processingStatus,
      extraction_status: extractionStatus,
      quality_status: qualityStatus,
      human_review_required: true,
      metadata_json: {
        last_extraction_id: extractionId,
        last_classification: classification,
      },
      updated_by: ctx.userId,
    })
    .eq("id", evidenceId)
    .eq("matter_id", matterId);

  await insertAuditEvent(supabase, {
    ...auditBase,
    event_type: "evidence_extraction_created",
    target_object_type: "evidence_extraction",
    target_object_id: extractionId,
    summary: "Evidence extraction created",
    metadata: {
      evidence_id: evidenceId,
      extraction_id: extractionId,
      extraction_type: parserResult.extractionType,
      extraction_quality_status: extractionQualityStatus,
      quality_flags: parserResult.qualityFlags,
      processing_status: processingStatus,
    },
  });

  return { ok: true, extractionId };
}

async function failExtraction(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  evidenceId: string,
  matterId: string
): Promise<void> {
  await supabase
    .from("evidence")
    .update({
      processing_status: "failed",
      extraction_status: "failed",
      quality_status: "failed",
      human_review_required: true,
      updated_by: ctx.userId,
    })
    .eq("id", evidenceId)
    .eq("matter_id", matterId);
}
