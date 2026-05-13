import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { isValidUuid } from "@/server/matters/queries";

export type OutputArtifactRow = Database["public"]["Tables"]["output_artifacts"]["Row"];

const TERMINAL_STATUSES = new Set(["archived", "superseded"]);

function isActiveOutputRow(row: OutputArtifactRow): boolean {
  const s = row.status ?? "";
  return !TERMINAL_STATUSES.has(s);
}

export async function countActiveOutputArtifactsForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<number> {
  if (!isValidUuid(matterId)) return 0;
  const { data, error } = await supabase
    .from("output_artifacts")
    .select("id, status")
    .eq("matter_id", matterId);
  if (error || !data) return 0;
  return (data as OutputArtifactRow[]).filter(isActiveOutputRow).length;
}

export async function listOutputArtifactsForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<OutputArtifactRow[]> {
  if (!isValidUuid(matterId)) return [];

  const { data, error } = await supabase
    .from("output_artifacts")
    .select("*")
    .eq("matter_id", matterId)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data as OutputArtifactRow[];
}

export async function getOutputArtifactForMatter(
  supabase: SupabaseClient<Database>,
  matterId: string,
  outputArtifactId: string
): Promise<OutputArtifactRow | null> {
  if (!isValidUuid(matterId) || !isValidUuid(outputArtifactId)) return null;

  const { data, error } = await supabase
    .from("output_artifacts")
    .select("*")
    .eq("id", outputArtifactId)
    .eq("matter_id", matterId)
    .maybeSingle();

  if (error || !data) return null;
  return data as OutputArtifactRow;
}
