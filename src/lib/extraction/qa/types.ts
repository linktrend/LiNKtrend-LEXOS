/** Single deterministic QA check outcome */
export type QACheckSeverity = "error" | "warn";

export type QACheckResult = {
  id: string;
  pass: boolean;
  severity: QACheckSeverity;
  message: string;
};

export type QAEvidenceSlice = {
  id: string;
  matter_id: string;
  original_file_uri: string | null;
};

export type QAExtractionSlice = {
  id: string;
  evidence_id: string;
  matter_id: string;
  is_current: boolean | null;
  extraction_type: string | null;
  markdown_text: string | null;
  json_content: unknown;
  quality_flags: unknown;
  metadata: unknown;
  extraction_tool: string | null;
};

export type DbExtractionQualityStatus = "accepted" | "qa_flagged" | "failed" | "human_review_required";

export type QAComparatorOutput = {
  checks: QACheckResult[];
  extraction_quality_status: DbExtractionQualityStatus;
  human_review_required: boolean;
  quality_flags: string[];
  extraction_quality_score: number | null;
  notes: string;
  /** For audit metadata: passed | failed | flagged */
  qa_result: "passed" | "failed" | "flagged";
};
