import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { EvidenceExtractionRow } from "@/server/evidence/queries";
import { isValidUuid } from "@/server/matters/queries";
import { isSupportMatrixItemArchived } from "@/server/support/metadata";

export type SupportMatrixItemRow = Database["public"]["Tables"]["support_matrix_items"]["Row"];

export type SupportMatrixListRow = {
  item: SupportMatrixItemRow;
  assertion_text: string | null;
  evidence_label: string | null;
  evidence_file_name: string | null;
  extraction: Pick<
    EvidenceExtractionRow,
    "id" | "extraction_quality_status" | "human_review_required" | "is_current" | "evidence_id"
  > | null;
};

export async function listSupportMatrixItemsForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string,
  options?: { includeArchived?: boolean }
): Promise<SupportMatrixListRow[]> {
  if (!isValidUuid(matterId)) return [];

  const { data: items, error } = await supabase
    .from("support_matrix_items")
    .select("*")
    .eq("matter_id", matterId)
    .order("updated_at", { ascending: false });
  if (error || !items?.length) return [];

  const filtered = options?.includeArchived
    ? (items as SupportMatrixItemRow[])
    : (items as SupportMatrixItemRow[]).filter((i) => !isSupportMatrixItemArchived(i.metadata));

  if (filtered.length === 0) return [];

  const assertionIds = [...new Set(filtered.map((i) => i.assertion_id))];
  const evidenceIds = [
    ...new Set(
      filtered.map((i) => i.evidence_id).filter((id): id is string => typeof id === "string" && isValidUuid(id))
    ),
  ];
  const extractionIds = [
    ...new Set(
      filtered
        .map((i) => i.extraction_id)
        .filter((id): id is string => typeof id === "string" && isValidUuid(id))
    ),
  ];

  const [{ data: assertions }, { data: evidenceRows }, { data: extractions }] = await Promise.all([
    assertionIds.length
      ? supabase.from("assertions").select("id, assertion_text").in("id", assertionIds)
      : Promise.resolve({ data: [] as { id: string; assertion_text: string }[] }),
    evidenceIds.length
      ? supabase.from("evidence").select("id, evidence_label, file_name").in("id", evidenceIds)
      : Promise.resolve({ data: [] as { id: string; evidence_label: string | null; file_name: string | null }[] }),
    extractionIds.length
      ? supabase
          .from("evidence_extractions")
          .select("id, extraction_quality_status, human_review_required, is_current, evidence_id")
          .in("id", extractionIds)
      : Promise.resolve({
          data: [] as Pick<
            EvidenceExtractionRow,
            "id" | "extraction_quality_status" | "human_review_required" | "is_current" | "evidence_id"
          >[],
        }),
  ]);

  const assertionMap = new Map((assertions ?? []).map((a) => [a.id, a.assertion_text]));
  const evidenceMap = new Map(
    (evidenceRows ?? []).map((e) => [e.id, { label: e.evidence_label, file: e.file_name }])
  );
  const extractionMap = new Map((extractions ?? []).map((x) => [x.id, x]));

  return (filtered as SupportMatrixItemRow[]).map((item) => {
    const ev = item.evidence_id ? evidenceMap.get(item.evidence_id) : null;
    const ex = item.extraction_id ? extractionMap.get(item.extraction_id) ?? null : null;
    return {
      item,
      assertion_text: assertionMap.get(item.assertion_id) ?? null,
      evidence_label: ev?.label ?? null,
      evidence_file_name: ev?.file ?? null,
      extraction: ex,
    };
  });
}

/** Active (non-archived) support links for one assertion — used for rollup. */
export async function listActiveSupportLinksForAssertion(
  supabase: SupabaseClient<Database>,
  matterId: string,
  assertionId: string
): Promise<SupportMatrixItemRow[]> {
  if (!isValidUuid(matterId) || !isValidUuid(assertionId)) return [];

  const { data, error } = await supabase
    .from("support_matrix_items")
    .select("*")
    .eq("matter_id", matterId)
    .eq("assertion_id", assertionId);
  if (error || !data) return [];
  return (data as SupportMatrixItemRow[]).filter((row) => !isSupportMatrixItemArchived(row.metadata));
}

export async function countActiveSupportItemsForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<number> {
  const rows = await listSupportMatrixItemsForMatter(supabase, matterId, { includeArchived: true });
  return rows.filter((r) => !isSupportMatrixItemArchived(r.item.metadata)).length;
}
