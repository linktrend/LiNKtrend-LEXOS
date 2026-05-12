import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { isValidUuid } from "@/server/matters/queries";

export type EvidenceRow = Database["public"]["Tables"]["evidence"]["Row"];

export async function listEvidenceForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<EvidenceRow[]> {
  if (!isValidUuid(matterId)) return [];

  const { data, error } = await supabase
    .from("evidence")
    .select("*")
    .eq("matter_id", matterId)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as EvidenceRow[];
}

export async function getEvidenceForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string,
  evidenceId: string
): Promise<EvidenceRow | null> {
  if (!isValidUuid(matterId) || !isValidUuid(evidenceId)) return null;

  const { data, error } = await supabase
    .from("evidence")
    .select("*")
    .eq("id", evidenceId)
    .eq("matter_id", matterId)
    .maybeSingle();
  if (error || !data) return null;
  return data as EvidenceRow;
}
