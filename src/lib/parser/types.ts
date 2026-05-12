import type { FileClassification } from "@/lib/extraction/classify";

export type ParserRequest = {
  buffer: Uint8Array;
  fileName: string;
  mimeType: string | null;
  classification: FileClassification;
};

/** extraction_type value allowed by Postgres CHECK on evidence_extractions */
export type ParserExtractionType =
  | "text_document"
  | "scanned_document"
  | "image_with_text"
  | "image_without_text"
  | "audio_transcript"
  | "video_transcript"
  | "video_visual_timeline"
  | "metadata_only"
  | "manual_extraction";

export type ParserResult = {
  markdown: string;
  structuredJson: Record<string, unknown>;
  extractionType: ParserExtractionType;
  detectedLanguage: string | null;
  qualityFlags: string[];
  limitations: string[];
  extractionTool: string;
  extractionModel: string | null;
  /** When true, caller should set extraction_quality_status to human_review_required / qa_flagged, never accepted */
  isPlaceholder: boolean;
};

export type ParserAdapter = {
  id: string;
  parse(req: ParserRequest): Promise<ParserResult | null>;
};
