import type { Database } from "@/types/database";

export type SupportMatrixItemRow = Database["public"]["Tables"]["support_matrix_items"]["Row"];

export function isSupportMatrixItemArchivedClient(metadata: SupportMatrixItemRow["metadata"]): boolean {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return false;
  return (metadata as Record<string, unknown>).archived === true;
}

export function extractionQaWarning(
  extraction: Pick<
    Database["public"]["Tables"]["evidence_extractions"]["Row"],
    "extraction_quality_status" | "human_review_required"
  > | null
): string | null {
  if (!extraction) return null;
  if (extraction.human_review_required === true) {
    return "Human review required on linked extraction.";
  }
  const q = extraction.extraction_quality_status;
  if (q === "failed") return "Linked extraction failed QA — do not treat as reliable support.";
  if (q === "qa_flagged") return "Linked extraction is QA-flagged.";
  if (q === "human_review_required") return "Linked extraction requires human review.";
  return null;
}
