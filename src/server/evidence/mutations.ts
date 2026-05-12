import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { insertAuditEvent } from "@/server/audit/log";
import {
  buildOriginalObjectKey,
  getEvidenceOriginalsBucketName,
  inferEvidenceMediaType,
  sanitizeEvidenceFilename,
} from "@/lib/storage/evidence-originals";

const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

export type UploadEvidenceInput = {
  matterId: string;
  file: File;
  evidenceLabel?: string | null;
};

export type UploadEvidenceResult = { evidenceId: string | null; error: string | null };

export async function uploadEvidence(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: UploadEvidenceInput
): Promise<UploadEvidenceResult> {
  const { matterId, file } = input;
  if (!isValidUuid(matterId)) {
    return { evidenceId: null, error: "Invalid matter." };
  }

  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) {
    return { evidenceId: null, error: "Matter not found or access denied." };
  }

  const { matter } = bundle;
  const clientId = matter.client_id;
  if (!clientId) {
    return { evidenceId: null, error: "Matter has no client." };
  }

  if (!file || file.size === 0) {
    return { evidenceId: null, error: "Choose a non-empty file." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { evidenceId: null, error: `File too large (max ${MAX_UPLOAD_BYTES / (1024 * 1024)} MB).` };
  }

  const rawName = file.name || "upload";
  const safeName = sanitizeEvidenceFilename(rawName);
  const mediaType = inferEvidenceMediaType(rawName, file.type);
  const label = (input.evidenceLabel?.trim() || safeName) || null;
  const fileType = file.type?.trim() || null;

  const nowIso = new Date().toISOString();

  const { data: inserted, error: insErr } = await supabase
    .from("evidence")
    .insert({
      client_id: clientId,
      matter_id: matterId,
      source_id: null,
      evidence_label: label,
      file_name: rawName,
      file_type: fileType,
      evidence_media_type: mediaType,
      source_type: "operator_upload",
      original_file_uri: null,
      processing_status: "uploaded",
      extraction_status: null,
      quality_status: null,
      human_review_required: false,
      uploaded_by: ctx.userId,
      uploaded_at: nowIso,
      created_by: ctx.userId,
      updated_by: ctx.userId,
      privilege_status: "unknown",
      confidentiality_status: "unknown",
      legal_hold: false,
    })
    .select("id")
    .single();

  if (insErr || !inserted) {
    return { evidenceId: null, error: insErr?.message ?? "Failed to create evidence record." };
  }

  const evidenceId = inserted.id;
  const objectKey = buildOriginalObjectKey(clientId, matterId, evidenceId, safeName);
  const bucket = getEvidenceOriginalsBucketName();

  const body = new Uint8Array(await file.arrayBuffer());
  const { error: upErr } = await supabase.storage.from(bucket).upload(objectKey, body, {
    contentType: fileType || "application/octet-stream",
    upsert: false,
  });

  if (upErr) {
    await supabase.from("evidence").delete().eq("id", evidenceId);
    return { evidenceId: null, error: upErr.message ?? "Storage upload failed." };
  }

  const { error: updErr } = await supabase
    .from("evidence")
    .update({
      original_file_uri: objectKey,
      updated_by: ctx.userId,
    })
    .eq("id", evidenceId);

  if (updErr) {
    await supabase.storage.from(bucket).remove([objectKey]);
    await supabase.from("evidence").delete().eq("id", evidenceId);
    return { evidenceId: null, error: updErr.message ?? "Failed to finalize evidence record." };
  }

  const audit = await insertAuditEvent(supabase, {
    event_type: "evidence_uploaded",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: clientId,
    matter_id: matterId,
    target_object_type: "evidence",
    target_object_id: evidenceId,
    summary: "Evidence file uploaded",
    metadata: {
      evidence_id: evidenceId,
      file_name: rawName,
      evidence_media_type: mediaType,
      storage_bucket: bucket,
      storage_path: objectKey,
      mime_type: fileType,
      file_size: file.size,
    },
  });

  if (audit.error) {
    await supabase.storage.from(bucket).remove([objectKey]);
    await supabase.from("evidence").delete().eq("id", evidenceId);
    return { evidenceId: null, error: `Audit failed: ${audit.error}` };
  }

  return { evidenceId, error: null };
}
