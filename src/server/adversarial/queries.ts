import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { isValidUuid } from "@/server/matters/queries";

export type AdversarialCritiqueRow = Database["public"]["Tables"]["adversarial_critiques"]["Row"];

export async function countAdversarialCritiquesForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<number> {
  if (!isValidUuid(matterId)) return 0;
  const { count, error } = await supabase
    .from("adversarial_critiques")
    .select("id", { count: "exact", head: true })
    .eq("matter_id", matterId);
  if (error || count == null) return 0;
  return count;
}

export async function listAdversarialCritiquesForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<AdversarialCritiqueRow[]> {
  if (!isValidUuid(matterId)) return [];

  const { data, error } = await supabase
    .from("adversarial_critiques")
    .select("*")
    .eq("matter_id", matterId)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data as AdversarialCritiqueRow[];
}

export async function getAdversarialCritiqueForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string,
  adversarialCritiqueId: string
): Promise<AdversarialCritiqueRow | null> {
  if (!isValidUuid(matterId) || !isValidUuid(adversarialCritiqueId)) return null;

  const { data, error } = await supabase
    .from("adversarial_critiques")
    .select("*")
    .eq("id", adversarialCritiqueId)
    .eq("matter_id", matterId)
    .maybeSingle();

  if (error || !data) return null;
  return data as AdversarialCritiqueRow;
}

const TERMINAL_ADVERSARIAL = new Set(["archived", "superseded"]);

export async function countActiveAdversarialCritiquesForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<number> {
  const rows = await listAdversarialCritiquesForMatter(supabase, matterId);
  return rows.filter((c) => !TERMINAL_ADVERSARIAL.has(c.status ?? "")).length;
}
