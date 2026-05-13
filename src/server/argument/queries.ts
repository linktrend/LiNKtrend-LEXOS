import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { isValidUuid } from "@/server/matters/queries";

export type ArgumentDraftRow = Database["public"]["Tables"]["argument_drafts"]["Row"];

export async function countArgumentDraftsForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<number> {
  if (!isValidUuid(matterId)) return 0;
  const { count, error } = await supabase
    .from("argument_drafts")
    .select("id", { count: "exact", head: true })
    .eq("matter_id", matterId);
  if (error || count == null) return 0;
  return count;
}

export async function listArgumentDraftsForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<ArgumentDraftRow[]> {
  if (!isValidUuid(matterId)) return [];

  const { data, error } = await supabase
    .from("argument_drafts")
    .select("*")
    .eq("matter_id", matterId)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data as ArgumentDraftRow[];
}

export async function getArgumentDraftForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string,
  argumentDraftId: string
): Promise<ArgumentDraftRow | null> {
  if (!isValidUuid(matterId) || !isValidUuid(argumentDraftId)) return null;

  const { data, error } = await supabase
    .from("argument_drafts")
    .select("*")
    .eq("id", argumentDraftId)
    .eq("matter_id", matterId)
    .maybeSingle();

  if (error || !data) return null;
  return data as ArgumentDraftRow;
}
