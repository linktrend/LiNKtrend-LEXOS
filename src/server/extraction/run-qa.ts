import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";
import { getEvidenceForMatter, getCurrentExtractionForEvidence } from "@/server/evidence/queries";
import { insertAuditEvent } from "@/server/audit/log";
import { runDeterministicExtractionQA } from "@/lib/extraction/qa/comparator";
import type { QAComparatorOutput } from "@/lib/extraction/qa/types";

export type RunExtractionQAResult =
  | { ok: true; output: QAComparatorOutput; extractionId: string }
  | { ok: false; error: string };

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function mergeExtractionMetadata(
  prev: unknown,
  qa: QAComparatorOutput,
  extractionId: string
): Record<string, unknown> {
  const base = isRecord(prev) ? { ...prev } : {};
  const lastQa = {
    at: new Date().toISOString(),
    result: qa.qa_result,
    extraction_quality_status: qa.extraction_quality_status,
    check_ids: qa.checks.map((c) => ({ id: c.id, pass: c.pass, severity: c.severity })),
  };
  return {
    ...base,
    last_qa: lastQa,
    last_qa_extraction_id: extractionId,
  };
}

function evidenceUpdateForQA(
  status: QAComparatorOutput["extraction_quality_status"]
): Pick<
  Database["public"]["Tables"]["evidence"]["Update"],
  "processing_status" | "extraction_status" | "quality_status" | "human_review_required"
> {
  switch (status) {
    case "failed":
      return {
        processing_status: "failed",
        extraction_status: "qa_failed",
        quality_status: "qa_failed",
        human_review_required: true,
      };
    case "qa_flagged":
      return {
        processing_status: "qa_flagged",
        extraction_status: "completed",
        quality_status: "qa_issues",
        human_review_required: true,
      };
    case "human_review_required":
      return {
        processing_status: "requires_human_review",
        extraction_status: "completed",
        quality_status: "pending_operator",
        human_review_required: true,
      };
    case "accepted":
      return {
        processing_status: "processed",
        extraction_status: "completed",
        quality_status: "verified_deterministic",
        human_review_required: false,
      };
  }
}

export async function runExtractionQA(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  matterId: string,
  evidenceId: string
): Promise<RunExtractionQAResult> {
  const evidence = await getEvidenceForMatter(supabase, matterId, evidenceId);
  if (!evidence) {
    return { ok: false, error: "Evidence not found or access denied." };
  }

  const extraction = await getCurrentExtractionForEvidence(supabase, matterId, evidenceId);
  if (!extraction) {
    return { ok: false, error: "No current extraction to QA." };
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
    event_type: "evidence_extraction_qa_started",
    summary: "Extraction QA started",
    metadata: {
      evidence_id: evidenceId,
      extraction_id: extraction.id,
    },
  });

  let output: QAComparatorOutput;
  try {
    output = runDeterministicExtractionQA(
      {
        id: evidence.id,
        matter_id: evidence.matter_id,
        original_file_uri: evidence.original_file_uri,
      },
      {
        id: extraction.id,
        evidence_id: extraction.evidence_id,
        matter_id: extraction.matter_id,
        is_current: extraction.is_current,
        extraction_type: extraction.extraction_type,
        markdown_text: extraction.markdown_text,
        json_content: extraction.json_content,
        quality_flags: extraction.quality_flags,
        metadata: extraction.metadata,
        extraction_tool: extraction.extraction_tool,
      }
    );
  } catch (e) {
    await insertAuditEvent(supabase, {
      ...auditBase,
      event_type: "evidence_extraction_qa_failed",
      summary: "Extraction QA failed: comparator error",
      metadata: {
        evidence_id: evidenceId,
        extraction_id: extraction.id,
        error: e instanceof Error ? e.message : "unknown",
      },
    });
    return { ok: false, error: "QA comparator error." };
  }

  const extractionId = extraction.id;
  const metaMerged = mergeExtractionMetadata(extraction.metadata, output, extractionId);

  const { error: upExtErr } = await supabase
    .from("evidence_extractions")
    .update({
      extraction_quality_status: output.extraction_quality_status,
      human_review_required: output.human_review_required,
      quality_flags: output.quality_flags,
      extraction_quality_score: output.extraction_quality_score,
      notes: output.notes.slice(0, 4000),
      metadata: metaMerged as Database["public"]["Tables"]["evidence_extractions"]["Update"]["metadata"],
      updated_by: ctx.userId,
    })
    .eq("id", extractionId)
    .eq("matter_id", matterId)
    .eq("evidence_id", evidenceId);

  if (upExtErr) {
    await insertAuditEvent(supabase, {
      ...auditBase,
      event_type: "evidence_extraction_qa_failed",
      summary: "Extraction QA failed: could not update extraction",
      metadata: {
        evidence_id: evidenceId,
        extraction_id: extractionId,
        error: upExtErr.message,
      },
    });
    return { ok: false, error: upExtErr.message };
  }

  const evPatch = evidenceUpdateForQA(output.extraction_quality_status);
  const metaJson = {
    ...(isRecord(evidence.metadata_json) ? evidence.metadata_json : {}),
    last_qa_extraction_id: extractionId,
    last_qa_at: new Date().toISOString(),
    last_qa_result: output.qa_result,
  };

  await supabase
    .from("evidence")
    .update({
      ...evPatch,
      metadata_json: metaJson as Database["public"]["Tables"]["evidence"]["Update"]["metadata_json"],
      updated_by: ctx.userId,
    })
    .eq("id", evidenceId)
    .eq("matter_id", matterId);

  await insertAuditEvent(supabase, {
    ...auditBase,
    event_type: "evidence_extraction_qa_completed",
    target_object_type: "evidence_extraction",
    target_object_id: extractionId,
    summary: "Extraction QA completed",
    metadata: {
      evidence_id: evidenceId,
      extraction_id: extractionId,
      qa_result: output.qa_result,
      extraction_quality_status: output.extraction_quality_status,
      quality_flags: output.quality_flags,
    },
  });

  return { ok: true, output, extractionId };
}
