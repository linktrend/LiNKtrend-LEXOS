import type { EvidenceExtractionRow } from "@/server/evidence/queries";

export type RollupLinkInput = {
  support_state: string | null;
  extraction_id: string | null;
};

/**
 * Extraction quality must not silently justify full factual support at assertion level.
 * Per-link "supported" may still be stored; assertion rollup is capped.
 */
export function extractionBlocksSilentSupport(ex: EvidenceExtractionRow | null | undefined): boolean {
  if (!ex) return false;
  const q = ex.extraction_quality_status;
  if (q === "failed" || q === "qa_flagged" || q === "human_review_required") return true;
  if (ex.human_review_required === true) return true;
  return false;
}

/**
 * Deterministic rollup from active (non-archived) support matrix links only.
 * Does not read truth_state; never implies verified truth.
 */
export function computeAssertionSupportStateFromLinks(
  links: RollupLinkInput[],
  extractionById: Map<string, EvidenceExtractionRow>
): string {
  if (links.length === 0) return "unsupported";

  const states = links.map((l) => l.support_state ?? "pending");
  const hasContradicted = states.some((s) => s === "contradicted");
  const hasSupported = states.some((s) => s === "supported");
  const hasPartial = states.some((s) => s === "partially_supported");
  const hasPositive = hasSupported || hasPartial;
  const allUnsupported = states.every((s) => s === "unsupported");
  const allPending = states.every((s) => s === "pending");

  let raw: string;
  if (hasContradicted && !hasPositive) {
    raw = "contradicted";
  } else if (hasContradicted && hasPositive) {
    raw = "partially_supported";
  } else if (allUnsupported) {
    raw = "unsupported";
  } else if (allPending && !hasSupported && !hasPartial) {
    raw = "pending";
  } else if (hasSupported && !hasPartial && !hasContradicted && states.every((s) => s === "supported")) {
    raw = "supported";
  } else if (hasPositive) {
    raw = "partially_supported";
  } else {
    raw = "pending";
  }

  const positiveLinkHasBadExtraction = links.some((l) => {
    const st = l.support_state;
    if (st !== "supported" && st !== "partially_supported") return false;
    if (!l.extraction_id) return false;
    const ex = extractionById.get(l.extraction_id);
    return extractionBlocksSilentSupport(ex);
  });

  if (raw === "supported" && positiveLinkHasBadExtraction) {
    return "partially_supported";
  }

  return raw;
}

export function anyActiveContradictedLink(links: RollupLinkInput[]): boolean {
  return links.some((l) => l.support_state === "contradicted");
}
