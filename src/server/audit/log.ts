import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

export type AuditInsert = {
  event_type: string;
  actor_id: string;
  actor_type?: string | null;
  client_id?: string | null;
  matter_id?: string | null;
  intake_id?: string | null;
  target_object_type?: string | null;
  target_object_id?: string | null;
  summary?: string | null;
  metadata?: Database["public"]["Tables"]["audit_events"]["Insert"]["metadata"];
};

export async function insertAuditEvent(
  supabase: SupabaseClient<Database>,
  row: AuditInsert
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("audit_events").insert({
    event_type: row.event_type,
    actor_id: row.actor_id,
    actor_type: row.actor_type ?? "user",
    client_id: row.client_id ?? null,
    matter_id: row.matter_id ?? null,
    intake_id: row.intake_id ?? null,
    target_object_type: row.target_object_type ?? null,
    target_object_id: row.target_object_id ?? null,
    summary: row.summary ?? null,
    metadata: row.metadata ?? null,
  });
  if (error) return { error: error.message };
  return { error: null };
}
