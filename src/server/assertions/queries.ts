import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { isValidUuid } from "@/server/matters/queries";

export type AssertionRow = Database["public"]["Tables"]["assertions"]["Row"];

export async function listAssertionsForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<AssertionRow[]> {
  if (!isValidUuid(matterId)) return [];

  const { data, error } = await supabase
    .from("assertions")
    .select("*")
    .eq("matter_id", matterId)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data as AssertionRow[];
}

export async function getAssertionForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string,
  assertionId: string
): Promise<AssertionRow | null> {
  if (!isValidUuid(matterId) || !isValidUuid(assertionId)) return null;

  const { data, error } = await supabase
    .from("assertions")
    .select("*")
    .eq("id", assertionId)
    .eq("matter_id", matterId)
    .maybeSingle();

  if (error || !data) return null;
  return data as AssertionRow;
}
