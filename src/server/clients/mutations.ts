import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";
import { insertAuditEvent } from "@/server/audit/log";

export type CreateClientInput = {
  client_name: string;
  client_type?: string | null;
  jurisdiction?: string | null;
  notes?: string | null;
  created_from_intake_id?: string | null;
};

export async function createClientRecord(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: CreateClientInput
): Promise<{ clientId: string | null; error: string | null }> {
  const name = input.client_name.trim();
  if (!name) {
    return { clientId: null, error: "Client name is required." };
  }

  const { data, error } = await supabase
    .from("clients")
    .insert({
      client_name: name,
      client_type: input.client_type?.trim() || null,
      jurisdiction: input.jurisdiction?.trim() || null,
      notes: input.notes?.trim() || null,
      status: "active",
      confidentiality_status: "unknown",
      privilege_status: "unknown",
      created_by: ctx.userId,
      updated_by: ctx.userId,
      created_from_intake_id: input.created_from_intake_id ?? null,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { clientId: null, error: error?.message ?? "Failed to create client." };
  }

  const clientId = data.id;
  const audit = await insertAuditEvent(supabase, {
    event_type: "client_created",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: clientId,
    intake_id: input.created_from_intake_id ?? null,
    target_object_type: "clients",
    target_object_id: clientId,
    summary: "Client created",
    metadata: { client_name: name },
  });

  if (audit.error) {
    await supabase.from("clients").delete().eq("id", clientId);
    return {
      clientId: null,
      error: `Client was rolled back after audit failure: ${audit.error}`,
    };
  }

  return { clientId, error: null };
}
