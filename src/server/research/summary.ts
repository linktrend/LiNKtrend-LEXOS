import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { listStrategyMemosForMatter } from "@/server/strategy/queries";
import { getStrategyWorkspaceSummary, type StrategyWorkspaceSummary } from "@/server/strategy/summary";
import { isValidUuid } from "@/server/matters/queries";

export type ResearchWorkspaceSummary = StrategyWorkspaceSummary & {
  strategyMemos: { id: string; title: string | null; status: string | null }[];
};

export async function getResearchWorkspaceSummary(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<ResearchWorkspaceSummary | null> {
  if (!isValidUuid(matterId)) return null;

  const [summary, memos] = await Promise.all([
    getStrategyWorkspaceSummary(supabase, matterId),
    listStrategyMemosForMatter(supabase, matterId),
  ]);

  if (!summary) return null;

  return {
    ...summary,
    strategyMemos: memos.map((m) => ({
      id: m.id,
      title: m.title,
      status: m.status,
    })),
  };
}
