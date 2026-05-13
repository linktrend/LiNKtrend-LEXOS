import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { listAssertionsForMatter } from "@/server/assertions/queries";
import { getPrimaryCaseStoryForMatter } from "@/server/story/queries";
import { listSupportMatrixItemsForMatter } from "@/server/support/queries";
import { isSupportMatrixItemArchived } from "@/server/support/metadata";
import { extractionQaWarning } from "@/features/support/support-matrix-utils";
import { isAssertionArchivedRow } from "@/features/assertions/assertion-utils";
import { isValidUuid } from "@/server/matters/queries";

export type StrategyWorkspaceSummary = {
  matterId: string;
  currentWorkflow: string | null;
  storyTitle: string | null;
  storyContentLen: number;
  assertionTotal: number;
  assertionCountBySupportState: Record<string, number>;
  activeSupportLinkCount: number;
  supportQaConcernLinkCount: number;
  zeroActiveSupportLinks: boolean;
  unsupportedAssertions: { id: string; snippet: string }[];
  contradictedAssertions: { id: string; snippet: string }[];
  evidenceGapHints: { id: string; snippet: string; nextSupportAction: string | null }[];
};

function snippet(text: string | null, max = 120): string {
  const t = (text ?? "").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}…`;
}

export async function getStrategyWorkspaceSummary(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<StrategyWorkspaceSummary | null> {
  if (!isValidUuid(matterId)) return null;

  const { data: matterRow } = await supabase
    .from("matters")
    .select("id, current_workflow")
    .eq("id", matterId)
    .maybeSingle();

  if (!matterRow) return null;

  const [story, assertions, supportRows] = await Promise.all([
    getPrimaryCaseStoryForMatter(supabase, matterId),
    listAssertionsForMatter(supabase, matterId),
    listSupportMatrixItemsForMatter(supabase, matterId, { includeArchived: true }),
  ]);

  const activeRows = supportRows.filter((r) => !isSupportMatrixItemArchived(r.item.metadata));
  let supportQaConcernLinkCount = 0;
  for (const r of activeRows) {
    if (extractionQaWarning(r.extraction)) supportQaConcernLinkCount += 1;
  }

  const activeAssertions = assertions.filter((a) => !isAssertionArchivedRow(a));

  const assertionCountBySupportState: Record<string, number> = {};
  for (const a of activeAssertions) {
    const k = a.support_state ?? "unknown";
    assertionCountBySupportState[k] = (assertionCountBySupportState[k] ?? 0) + 1;
  }

  const unsupportedAssertions = activeAssertions
    .filter((a) => (a.support_state ?? "") === "unsupported")
    .map((a) => ({ id: a.id, snippet: snippet(a.assertion_text) }));

  const contradictedAssertions = activeAssertions
    .filter((a) => a.contradiction_flag === true || (a.support_state ?? "") === "contradicted")
    .map((a) => ({ id: a.id, snippet: snippet(a.assertion_text) }));

  const evidenceGapHints = activeAssertions
    .map((a) => {
      const m =
        a.metadata && typeof a.metadata === "object" && !Array.isArray(a.metadata)
          ? (a.metadata as Record<string, unknown>)
          : null;
      const next =
        m && typeof m.next_support_action === "string" && m.next_support_action !== "none"
          ? m.next_support_action
          : null;
      return { a, next };
    })
    .filter(({ next }) => next != null)
    .map(({ a, next }) => ({
      id: a.id,
      snippet: snippet(a.assertion_text),
      nextSupportAction: next,
    }));

  const content = story?.content_markdown ?? "";

  return {
    matterId,
    currentWorkflow: matterRow.current_workflow ?? null,
    storyTitle: story?.title ?? null,
    storyContentLen: content.length,
    assertionTotal: activeAssertions.length,
    assertionCountBySupportState,
    activeSupportLinkCount: activeRows.length,
    supportQaConcernLinkCount,
    zeroActiveSupportLinks: activeRows.length === 0,
    unsupportedAssertions,
    contradictedAssertions,
    evidenceGapHints,
  };
}
