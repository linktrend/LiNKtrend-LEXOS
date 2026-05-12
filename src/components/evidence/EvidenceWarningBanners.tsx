import type { ReactNode } from "react";
import type { Database } from "@/types/database";

type EvidenceRow = Database["public"]["Tables"]["evidence"]["Row"];
type EvidenceExtractionRow = Database["public"]["Tables"]["evidence_extractions"]["Row"];

function isPlaceholderExtraction(current: EvidenceExtractionRow | null): boolean {
  if (!current) return false;
  const meta = current.metadata;
  if (meta && typeof meta === "object" && !Array.isArray(meta)) {
    if ((meta as Record<string, unknown>).is_placeholder === true) return true;
  }
  if (current.extraction_type === "metadata_only" && current.json_content && typeof current.json_content === "object") {
    const j = current.json_content as Record<string, unknown>;
    if (j.kind === "lexos_placeholder") return true;
  }
  return false;
}

function hasParserRiskFlags(current: EvidenceExtractionRow | null): boolean {
  const flags = current?.quality_flags;
  if (!Array.isArray(flags)) return false;
  return flags.some((f) => {
    const s = String(f).toLowerCase();
    return (
      s.includes("parser") ||
      s.includes("ocr") ||
      s.includes("layout") ||
      s.includes("raw_ocr") ||
      s.includes("fallback")
    );
  });
}

function hasMeaningfulExtraction(current: EvidenceExtractionRow | null): boolean {
  if (!current) return false;
  if (current.markdown_text && current.markdown_text.trim().length > 0) return true;
  if (current.json_content != null && Object.keys(current.json_content as object).length > 0) return true;
  return false;
}

type Props = {
  row: EvidenceRow;
  current: EvidenceExtractionRow | null;
};

/**
 * Stacked contextual alerts. Preserves `data-testid="human-review-banner"` for E2E when review-like states apply.
 */
export function EvidenceWarningBanners({ row, current }: Props) {
  const eq = current?.extraction_quality_status ?? null;
  const processingFailed = row.processing_status === "failed";
  const qualityFailed = eq === "failed";
  const qaFlagged = eq === "qa_flagged";
  const placeholder = isPlaceholderExtraction(current);
  const parserRisk = hasParserRiskFlags(current) && !placeholder;
  const noOriginal = !row.original_file_uri;
  const noExtraction = !noOriginal && !hasMeaningfulExtraction(current);
  const acceptedNarrow = eq === "accepted";

  const showHumanReviewBanner =
    row.human_review_required ||
    current?.human_review_required ||
    eq === "human_review_required" ||
    eq === "qa_flagged" ||
    eq === "failed" ||
    row.processing_status === "requires_human_review" ||
    row.processing_status === "qa_flagged";

  const banners: ReactNode[] = [];

  if (noOriginal) {
    banners.push(
      <div
        key="no-original"
        data-testid="evidence-warning-no-original"
        className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-950 dark:border-red-900 dark:bg-red-950/30 dark:text-red-100"
      >
        No original file URI on this evidence record. You cannot download the evidentiary anchor or run extraction until
        an original is stored.
      </div>
    );
  }

  if (noExtraction) {
    banners.push(
      <div
        key="no-extraction"
        data-testid="evidence-warning-no-extraction"
        className="rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100"
      >
        No extraction yet. Run extraction below when an original is available. Extraction outputs are derivative; they
        do not replace the original.
      </div>
    );
  }

  if (placeholder) {
    banners.push(
      <div
        key="placeholder"
        data-testid="evidence-warning-placeholder"
        className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
      >
        Controlled placeholder extraction — not substantive layout parsing. Do not rely on this for assertions until
        replaced with a full extraction and QA pass.
      </div>
    );
  }

  if (processingFailed || qualityFailed) {
    banners.push(
      <div
        key="failed"
        data-testid="evidence-warning-failed"
        className="rounded-md border border-red-300 bg-red-100 px-3 py-2 text-sm text-red-950 dark:border-red-800 dark:bg-red-950/50 dark:text-red-50"
      >
        Processing or extraction quality is <span className="font-semibold">failed</span>. Do not treat downstream
        workflows (for example W5 assertions) as ready until this is resolved or re-run.
      </div>
    );
  }

  if (qaFlagged && !qualityFailed) {
    banners.push(
      <div
        key="qa-flagged"
        data-testid="evidence-warning-qa-flagged"
        className="rounded-md border border-violet-300 bg-violet-50 px-3 py-2 text-sm text-violet-950 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100"
      >
        Extraction is <span className="font-semibold">QA-flagged</span>. Review flags and the original before relying on
        this content.
      </div>
    );
  }

  if (parserRisk) {
    banners.push(
      <div
        key="parser-risk"
        data-testid="evidence-warning-parser-risk"
        className="rounded-md border border-amber-200 bg-amber-50/80 px-3 py-2 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100"
      >
        Parser or OCR-related risk flags are present. Treat structured text and tables as uncertain until human review.
      </div>
    );
  }

  if (acceptedNarrow && !processingFailed && !qualityFailed) {
    banners.push(
      <div
        key="accepted"
        data-testid="evidence-warning-accepted-caveat"
        className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100"
      >
        Machine structural pass only (<span className="font-medium">accepted</span> for this path). This remains a
        derivative artifact — not court-ready or externally approved legal work product.
      </div>
    );
  }

  if (showHumanReviewBanner) {
    banners.push(
      <div
        key="human-review"
        data-testid="human-review-banner"
        className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
      >
        Human review may be required. Do not treat extraction as verified until QA and operator review are complete.
      </div>
    );
  }

  if (banners.length === 0) return null;

  return <div className="flex flex-col gap-2">{banners}</div>;
}
