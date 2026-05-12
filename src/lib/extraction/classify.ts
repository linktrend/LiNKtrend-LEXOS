/** Logical classification for routing extraction (not necessarily equal to DB extraction_type). */
export type FileClassification =
  | "digital_text_document"
  | "pdf_digital"
  | "pdf_scanned_or_mixed"
  | "docx"
  | "image_text_suspected"
  | "image_no_text"
  | "audio"
  | "video"
  | "spreadsheet"
  | "email_export"
  | "unknown";

export type ClassificationInput = {
  fileName: string;
  fileType: string | null;
  evidenceMediaType: string | null;
  /** First bytes of file for magic sniff (optional). */
  head?: Uint8Array | null;
};

const PDF_MAGIC = new Uint8Array([0x25, 0x50, 0x44, 0x46]); // %PDF

function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
}

function looksLikePdfMagic(head: Uint8Array | null | undefined): boolean {
  if (!head || head.length < 4) return false;
  return head[0] === PDF_MAGIC[0] && head[1] === PDF_MAGIC[1] && head[2] === PDF_MAGIC[2] && head[3] === PDF_MAGIC[3];
}

/**
 * Classify evidence for extraction routing. Conservative on PDFs without parser metadata.
 */
export function classifyEvidenceFile(input: ClassificationInput): FileClassification {
  const ext = extOf(input.fileName);
  const mime = (input.fileType ?? "").toLowerCase();
  const media = (input.evidenceMediaType ?? "").toLowerCase();

  if (ext === "txt" || mime === "text/plain") return "digital_text_document";
  if (ext === "md" || ext === "markdown" || mime === "text/markdown") return "digital_text_document";

  if (ext === "pdf" || media === "pdf" || mime === "application/pdf") {
    if (looksLikePdfMagic(input.head)) return "pdf_digital";
    return "pdf_scanned_or_mixed";
  }

  if (
    ext === "docx" ||
    media === "docx" ||
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "docx";
  }

  if (media === "screenshot" || media === "image") {
    return "image_text_suspected";
  }

  if (mime.startsWith("image/")) return "image_text_suspected";

  if (media === "audio" || mime.startsWith("audio/")) return "audio";
  if (media === "video" || mime.startsWith("video/")) return "video";
  if (media === "spreadsheet") return "spreadsheet";
  if (media === "email_export" || ext === "eml" || ext === "mbox") return "email_export";

  return "unknown";
}

/** DB-safe extraction_type for evidence_extractions.check */
export type DbExtractionType =
  | "text_document"
  | "scanned_document"
  | "image_with_text"
  | "image_without_text"
  | "audio_transcript"
  | "video_transcript"
  | "video_visual_timeline"
  | "metadata_only"
  | "manual_extraction";

export function classificationToDbExtractionType(c: FileClassification): DbExtractionType {
  switch (c) {
    case "digital_text_document":
      return "text_document";
    case "pdf_digital":
      return "text_document";
    case "pdf_scanned_or_mixed":
      return "scanned_document";
    case "docx":
      return "text_document";
    case "image_text_suspected":
      return "image_with_text";
    case "image_no_text":
      return "image_without_text";
    case "audio":
      return "audio_transcript";
    case "video":
      return "video_transcript";
    case "spreadsheet":
      return "manual_extraction";
    case "email_export":
      return "manual_extraction";
    default:
      return "metadata_only";
  }
}

export const MAX_EXTRACTION_FILE_BYTES = 512 * 1024;
