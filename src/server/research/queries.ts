import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { isValidUuid } from "@/server/matters/queries";

export type ResearchMemoRow = Database["public"]["Tables"]["research_memos"]["Row"];

export async function countResearchMemosForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<number> {
  if (!isValidUuid(matterId)) return 0;
  const { count, error } = await supabase
    .from("research_memos")
    .select("id", { count: "exact", head: true })
    .eq("matter_id", matterId);
  if (error || count == null) return 0;
  return count;
}

export async function listResearchMemosForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<ResearchMemoRow[]> {
  if (!isValidUuid(matterId)) return [];

  const { data, error } = await supabase
    .from("research_memos")
    .select("*")
    .eq("matter_id", matterId)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data as ResearchMemoRow[];
}

export async function getResearchMemoForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string,
  researchMemoId: string
): Promise<ResearchMemoRow | null> {
  if (!isValidUuid(matterId) || !isValidUuid(researchMemoId)) return null;

  const { data, error } = await supabase
    .from("research_memos")
    .select("*")
    .eq("id", researchMemoId)
    .eq("matter_id", matterId)
    .maybeSingle();

  if (error || !data) return null;
  return data as ResearchMemoRow;
}
