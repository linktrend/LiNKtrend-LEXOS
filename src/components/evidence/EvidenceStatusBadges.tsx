import type { Database } from "@/types/database";
import {
  extractionQualityBadgeClass,
  extractionStatusLabelClass,
  processingStatusBadgeClass,
} from "@/components/evidence/evidenceBadgeStyles";

type EvidenceRow = Database["public"]["Tables"]["evidence"]["Row"];
type EvidenceExtractionRow = Database["public"]["Tables"]["evidence_extractions"]["Row"];

type Props = {
  row: EvidenceRow;
  current: EvidenceExtractionRow | null;
  /** When true, show a one-line status sentence (detail page). */
  showStatusLine?: boolean;
};

function truncateFlags(flags: unknown, max = 3): { text: string; extra: number } {
  if (!Array.isArray(flags) || flags.length === 0) {
    if (flags && typeof flags === "object") {
      return { text: JSON.stringify(flags), extra: 0 };
    }
    return { text: "—", extra: 0 };
  }
  const shown = flags.slice(0, max).map((f) => String(f));
  const extra = Math.max(0, flags.length - max);
  return { text: shown.join(", "), extra };
}

export function EvidenceStatusBadges({ row, current, showStatusLine }: Props) {
  const eq = current?.extraction_quality_status ?? null;
  const review =
    row.human_review_required ||
    current?.human_review_required ||
    eq === "human_review_required" ||
    eq === "qa_flagged" ||
    eq === "failed";
  const { text: flagsPreview, extra: flagsExtra } = truncateFlags(current?.quality_flags);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2" data-testid="evidence-status-badges">
        <span className={processingStatusBadgeClass(row.processing_status)}>
          Processing: {row.processing_status ?? "—"}
        </span>
        {row.extraction_status ? (
          <span className={extractionStatusLabelClass(row.extraction_status)}>
            Extraction: {row.extraction_status}
          </span>
        ) : (
          <span className={extractionStatusLabelClass(null)}>Extraction: none</span>
        )}
        <span className={extractionQualityBadgeClass(eq)}>Extraction quality: {eq ?? "—"}</span>
        {row.quality_status ? (
          <span className="inline-flex rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            Matter quality: {row.quality_status}
          </span>
        ) : null}
        {review ? (
          <span className="inline-flex rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-950 dark:bg-orange-950/50 dark:text-orange-100">
            Review
          </span>
        ) : null}
        {current ? (
          <span className="max-w-[min(100%,24rem)] truncate text-xs text-zinc-500" title={flagsPreview}>
            Flags: {flagsPreview}
            {flagsExtra > 0 ? ` +${flagsExtra}` : ""}
          </span>
        ) : null}
      </div>
      {showStatusLine ? (
        <p className="text-xs text-zinc-500" data-testid="evidence-status-line">
          ID {row.id} · Media {row.evidence_media_type ?? "—"} · Original file{" "}
          {row.original_file_uri ? "stored" : "not available"}
        </p>
      ) : null}
    </div>
  );
}
