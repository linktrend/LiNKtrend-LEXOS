import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { isValidUuid } from "@/server/matters/queries";

export type StrategyMemoRow = Database["public"]["Tables"]["strategy_memos"]["Row"];

export async function countStrategyMemosForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<number> {
  if (!isValidUuid(matterId)) return 0;
  const { count, error } = await supabase
    .from("strategy_memos")
    .select("id", { count: "exact", head: true })
    .eq("matter_id", matterId);
  if (error || count == null) return 0;
  return count;
}

export async function listStrategyMemosForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<StrategyMemoRow[]> {
  if (!isValidUuid(matterId)) return [];

  const { data, error } = await supabase
    .from("strategy_memos")
    .select("*")
    .eq("matter_id", matterId)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data as StrategyMemoRow[];
}

export async function getStrategyMemoForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string,
  strategyMemoId: string
): Promise<StrategyMemoRow | null> {
  if (!isValidUuid(matterId) || !isValidUuid(strategyMemoId)) return null;

  const { data, error } = await supabase
    .from("strategy_memos")
    .select("*")
    .eq("id", strategyMemoId)
    .eq("matter_id", matterId)
    .maybeSingle();

  if (error || !data) return null;
  return data as StrategyMemoRow;
}
