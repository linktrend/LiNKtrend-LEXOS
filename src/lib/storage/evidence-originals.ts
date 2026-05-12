import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const DEFAULT_BUCKET = "evidence-originals";

export function getEvidenceOriginalsBucketName(): string {
  return process.env.STORAGE_BUCKET_EVIDENCE_ORIGINALS?.trim() || DEFAULT_BUCKET;
}

/** Single-segment safe filename; strips path components and control chars. */
export function sanitizeEvidenceFilename(raw: string): string {
  const base = raw.replace(/^.*[/\\]/, "").trim() || "upload";
  const cleaned = base.replace(/[\x00-\x1f\x7f]/g, "_").replace(/\.\./g, "_");
  return cleaned.slice(0, 255) || "upload";
}

export function buildOriginalObjectKey(
  clientId: string,
  matterId: string,
  evidenceId: string,
  safeFilename: string
): string {
  return `client/${clientId}/matter/${matterId}/evidence/${evidenceId}/original/${safeFilename}`;
}

/** Maps extension / MIME to DB check constraint on evidence.evidence_media_type. */
export function inferEvidenceMediaType(fileName: string, mimeType: string | null | undefined): string {
  const ext = fileName.includes(".") ? fileName.split(".").pop()?.toLowerCase() ?? "" : "";
  const mime = (mimeType ?? "").toLowerCase();

  if (ext === "pdf" || mime === "application/pdf") return "pdf";
  if (ext === "docx" || mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    return "docx";
  if (ext === "txt" || mime === "text/plain") return "txt";
  if (ext === "md" || ext === "markdown" || mime === "text/markdown") return "markdown";

  if (["png", "jpg", "jpeg", "gif", "webp", "heic", "tif", "tiff", "bmp"].includes(ext) || mime.startsWith("image/"))
    return "image";

  if (["mp3", "wav", "m4a", "aac", "flac", "ogg"].includes(ext) || mime.startsWith("audio/")) return "audio";
  if (["mp4", "webm", "mov", "mkv"].includes(ext) || mime.startsWith("video/")) return "video";

  if (["xlsx", "xls", "csv", "ods"].includes(ext)) return "spreadsheet";

  if (ext === "mbox" || ext === "eml" || mime === "message/rfc822") return "email_export";

  return "unknown";
}

export async function createEvidenceOriginalSignedUrl(
  supabase: SupabaseClient<Database>,
  objectKey: string,
  expiresSeconds = 300
): Promise<{ url: string | null; error: string | null }> {
  const bucket = getEvidenceOriginalsBucketName();
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(objectKey, expiresSeconds);
  if (error) return { url: null, error: error.message };
  return { url: data?.signedUrl ?? null, error: null };
}
