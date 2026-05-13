import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { isValidUuid } from "@/server/matters/queries";

export type CaseStoryRow = Database["public"]["Tables"]["case_stories"]["Row"];

export async function getPrimaryCaseStoryForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<CaseStoryRow | null> {
  if (!isValidUuid(matterId)) return null;

  const { data, error } = await supabase
    .from("case_stories")
    .select("*")
    .eq("matter_id", matterId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return data as CaseStoryRow;
}
