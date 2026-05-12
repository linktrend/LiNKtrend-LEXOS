/** Shared badge styles for evidence list + detail (WP-09). */

const base = "inline-flex rounded-full px-2 py-0.5 text-xs font-medium";

export function processingStatusBadgeClass(status: string | null): string {
  switch (status) {
    case "uploaded":
      return `${base} bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-100`;
    case "queued":
    case "processing":
      return `${base} bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100`;
    case "processed":
      return `${base} bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100`;
    case "qa_flagged":
      return `${base} bg-violet-100 text-violet-900 dark:bg-violet-950 dark:text-violet-100`;
    case "failed":
      return `${base} bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-100`;
    case "requires_human_review":
      return `${base} bg-orange-100 text-orange-950 dark:bg-orange-950/60 dark:text-orange-100`;
    default:
      return `${base} bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100`;
  }
}

export function extractionQualityBadgeClass(status: string | null): string {
  switch (status) {
    case "accepted":
      return `${base} bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100`;
    case "qa_flagged":
      return `${base} bg-violet-100 text-violet-900 dark:bg-violet-950 dark:text-violet-100`;
    case "human_review_required":
      return `${base} bg-orange-100 text-orange-950 dark:bg-orange-950/60 dark:text-orange-100`;
    case "failed":
      return `${base} bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-100`;
    default:
      return `${base} bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100`;
  }
}

export function extractionStatusLabelClass(status: string | null): string {
  if (!status) return `${base} bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400`;
  switch (status) {
    case "none":
    case "pending":
      return `${base} bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300`;
    case "complete":
    case "completed":
      return `${base} bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100`;
    case "failed":
      return `${base} bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-100`;
    default:
      return `${base} bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-100`;
  }
}
