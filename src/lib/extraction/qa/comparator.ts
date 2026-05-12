import type {
  QAComparatorOutput,
  QAExtractionSlice,
  QAEvidenceSlice,
  QACheckResult,
  DbExtractionQualityStatus,
} from "./types";

const VALID_EXTRACTION_TYPES = new Set([
  "text_document",
  "scanned_document",
  "image_with_text",
  "image_without_text",
  "audio_transcript",
  "video_transcript",
  "video_visual_timeline",
  "metadata_only",
  "manual_extraction",
]);

const PARSER_RISK_FLAGS = new Set([
  "parser_unavailable",
  "parser_failed",
  "raw_ocr_fallback",
  "unsupported_media",
  "unsupported_file_type",
]);

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

export function normalizeQualityFlags(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.filter((x): x is string => typeof x === "string" && x.length > 0);
  }
  return [];
}

function parseMeta(raw: unknown): Record<string, unknown> {
  if (isRecord(raw)) return raw;
  return {};
}

function checkLinkage(evidence: QAEvidenceSlice, extraction: QAExtractionSlice): QACheckResult {
  if (extraction.evidence_id !== evidence.id) {
    return {
      id: "link_evidence_id",
      pass: false,
      severity: "error",
      message: "Extraction evidence_id does not match evidence row.",
    };
  }
  if (extraction.matter_id !== evidence.matter_id) {
    return {
      id: "link_matter_id",
      pass: false,
      severity: "error",
      message: "Extraction matter_id does not match evidence matter.",
    };
  }
  if (extraction.is_current !== true) {
    return {
      id: "link_is_current",
      pass: false,
      severity: "error",
      message: "Extraction is not marked current.",
    };
  }
  return { id: "link_scope", pass: true, severity: "warn", message: "Linkage OK." };
}

function checkOriginal(evidence: QAEvidenceSlice): QACheckResult {
  if (!evidence.original_file_uri?.trim()) {
    return {
      id: "original_uri",
      pass: false,
      severity: "error",
      message: "Original file URI missing; cannot anchor QA.",
    };
  }
  return { id: "original_uri", pass: true, severity: "warn", message: "Original URI present." };
}

function checkExtractionType(extraction: QAExtractionSlice): QACheckResult {
  const t = extraction.extraction_type;
  if (!t || !VALID_EXTRACTION_TYPES.has(t)) {
    return {
      id: "extraction_type",
      pass: false,
      severity: "error",
      message: "extraction_type missing or not a DB-allowed value.",
    };
  }
  return { id: "extraction_type", pass: true, severity: "warn", message: "extraction_type OK." };
}

function checkJsonShape(extraction: QAExtractionSlice): QACheckResult {
  const j = extraction.json_content;
  if (j === null || j === undefined) {
    return { id: "json_present", pass: false, severity: "error", message: "json_content is null." };
  }
  if (Array.isArray(j)) {
    return { id: "json_shape", pass: true, severity: "warn", message: "json_content is array (allowed)." };
  }
  if (typeof j === "object") {
    return { id: "json_shape", pass: true, severity: "warn", message: "json_content is object." };
  }
  return {
    id: "json_shape",
    pass: false,
    severity: "error",
    message: "json_content must be object or array, not primitive.",
  };
}

function checkMarkdown(extraction: QAExtractionSlice, isPlaceholder: boolean): QACheckResult {
  const md = extraction.markdown_text?.trim() ?? "";
  if (md.length === 0) {
    return { id: "markdown_nonempty", pass: false, severity: "error", message: "markdown_text is empty." };
  }
  if (isPlaceholder && !md.includes("placeholder") && !md.includes("not performed")) {
    return {
      id: "markdown_placeholder_copy",
      pass: false,
      severity: "warn",
      message: "Placeholder extraction markdown should state extraction was not performed.",
    };
  }
  return { id: "markdown_nonempty", pass: true, severity: "warn", message: "Markdown present." };
}

function isPlaceholderExtraction(extraction: QAExtractionSlice, meta: Record<string, unknown>): boolean {
  if (meta.is_placeholder === true) return true;
  if (extraction.extraction_type === "metadata_only" && isRecord(extraction.json_content)) {
    const k = extraction.json_content.kind;
    if (k === "lexos_placeholder") return true;
  }
  return false;
}

function narrowMachineAcceptable(extraction: QAExtractionSlice): boolean {
  if (extraction.extraction_type !== "text_document") return false;
  if (extraction.extraction_tool !== "local_utf8") return false;
  if (!isRecord(extraction.json_content)) return false;
  return extraction.json_content.kind === "text_extraction";
}

function dedupeFlags(flags: string[]): string[] {
  return [...new Set(flags)];
}

/**
 * Deterministic extraction QA (WP-08). No LLM / vision; structural and policy checks only.
 */
export function runDeterministicExtractionQA(
  evidence: QAEvidenceSlice,
  extraction: QAExtractionSlice
): QAComparatorOutput {
  const checks: QACheckResult[] = [];
  checks.push(checkLinkage(evidence, extraction));
  checks.push(checkOriginal(evidence));
  checks.push(checkExtractionType(extraction));
  checks.push(checkJsonShape(extraction));

  const meta = parseMeta(extraction.metadata);
  const placeholder = isPlaceholderExtraction(extraction, meta);
  checks.push(checkMarkdown(extraction, placeholder));

  const existingFlags = normalizeQualityFlags(extraction.quality_flags);
  const parserRisk = existingFlags.some((f) => PARSER_RISK_FLAGS.has(f));

  const errorFailures = checks.filter((c) => !c.pass && c.severity === "error");
  const warnFailures = checks.filter((c) => !c.pass && c.severity === "warn");

  let merged = dedupeFlags([...existingFlags, "qa_deterministic_review"]);

  if (placeholder) {
    merged = dedupeFlags([...merged, "placeholder_extraction"]);
  }
  if (parserRisk) {
    merged = dedupeFlags([...merged, "parser_path_risk"]);
  }

  for (const c of errorFailures) {
    merged = dedupeFlags([...merged, "qa_check_failed", `qa_${c.id}`]);
  }
  for (const c of warnFailures) {
    merged = dedupeFlags([...merged, `qa_warn_${c.id}`]);
  }

  let extraction_quality_status: DbExtractionQualityStatus;
  let qa_result: "passed" | "failed" | "flagged";
  let human_review_required: boolean;
  let extraction_quality_score: number | null;
  let notes: string;

  if (errorFailures.length > 0) {
    extraction_quality_status = "failed";
    qa_result = "failed";
    human_review_required = true;
    extraction_quality_score = 0;
    notes = `QA failed: ${errorFailures.map((e) => e.message).join(" ")}`;
  } else if (placeholder) {
    extraction_quality_status =
      parserRisk || warnFailures.length > 0 ? "qa_flagged" : "human_review_required";
    qa_result = "flagged";
    human_review_required = true;
    extraction_quality_score = 0.2;
    notes = "Placeholder extraction; cannot accept. Human or follow-up extraction required.";
  } else if (parserRisk) {
    extraction_quality_status = "qa_flagged";
    qa_result = "flagged";
    human_review_required = true;
    extraction_quality_score = 0.35;
    notes = "Parser-risk flags present; deterministic QA cannot accept.";
  } else if (warnFailures.length > 0) {
    extraction_quality_status = "qa_flagged";
    qa_result = "flagged";
    human_review_required = true;
    extraction_quality_score = 0.45;
    notes = `QA warnings: ${warnFailures.map((w) => w.message).join(" ")}`;
  } else if (narrowMachineAcceptable(extraction) && !existingFlags.some((f) => PARSER_RISK_FLAGS.has(f))) {
    const hasPreQa = existingFlags.includes("pre_qa_unverified");
    if (hasPreQa) {
      merged = dedupeFlags([...merged.filter((f) => f !== "pre_qa_unverified"), "deterministic_qa_passed"]);
    } else {
      merged = dedupeFlags([...merged, "deterministic_qa_passed"]);
    }
    extraction_quality_status = "accepted";
    qa_result = "passed";
    human_review_required = false;
    extraction_quality_score = 1;
    notes = "Deterministic structural QA passed for local text extraction (narrow rule).";
  } else {
    extraction_quality_status = "human_review_required";
    qa_result = "flagged";
    human_review_required = true;
    extraction_quality_score = 0.55;
    merged = dedupeFlags([...merged, "pre_w5_review"]);
    notes = "Structural checks passed; pathway not eligible for narrow automatic acceptance.";
  }

  if (existingFlags.includes("raw_ocr_fallback") && extraction_quality_status === "accepted") {
    extraction_quality_status = "qa_flagged";
    qa_result = "flagged";
    human_review_required = true;
    extraction_quality_score = 0.3;
    merged = dedupeFlags([...merged, "raw_ocr_requires_review"]);
    notes = "Raw OCR fallback cannot be marked accepted.";
  }

  return {
    checks,
    extraction_quality_status,
    human_review_required,
    quality_flags: merged,
    extraction_quality_score,
    notes,
    qa_result,
  };
}
