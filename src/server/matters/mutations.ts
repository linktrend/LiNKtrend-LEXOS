import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";
import { insertAuditEvent } from "@/server/audit/log";
import { getClientById } from "@/server/clients/queries";
import type { MatterPosture } from "@/types/domain";
import { MATTER_POSTURES } from "@/types/domain";

export type CreateMatterInput = {
  client_id: string;
  matter_name: string;
  posture: MatterPosture;
  jurisdiction?: string | null;
  matter_type?: string | null;
};

/**
 * Creates matter + workflow_state + three audit events (best-effort rollback).
 * Not atomic across Postgres round-trips; see PROJECT_STATE / final report limitation.
 */
export async function createMatterWithWorkflowAndAudits(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: CreateMatterInput
): Promise<{ matterId: string | null; error: string | null }> {
  const client = await getClientById(supabase, input.client_id, ctx);
  if (!client) {
    return { matterId: null, error: "Client not found or access denied." };
  }

  const matterName = input.matter_name.trim();
  if (!matterName) {
    return { matterId: null, error: "Matter name is required." };
  }

  const posture = MATTER_POSTURES.includes(input.posture) ? input.posture : "unknown";

  const { data: matterRow, error: matterErr } = await supabase
    .from("matters")
    .insert({
      client_id: input.client_id,
      matter_name: matterName,
      matter_type: input.matter_type?.trim() || null,
      posture,
      jurisdiction: input.jurisdiction?.trim() || null,
      status: "active",
      current_workflow: "W2",
      opened_at: new Date().toISOString(),
      confidentiality_status: "unknown",
      privilege_status: "unknown",
      created_by: ctx.userId,
      updated_by: ctx.userId,
    })
    .select("id")
    .single();

  if (matterErr || !matterRow) {
    return { matterId: null, error: matterErr?.message ?? "Failed to create matter." };
  }

  const matterId = matterRow.id;

  const { data: wfRow, error: wfErr } = await supabase
    .from("workflow_states")
    .insert({
      client_id: input.client_id,
      matter_id: matterId,
      current_workflow: "W2",
      workflow_status: "not_started",
      last_completed_step: null,
      next_action: "Create or review Case Story",
      blocked_flag: false,
      block_reason: null,
    })
    .select("id")
    .single();

  if (wfErr || !wfRow) {
    await supabase.from("matters").delete().eq("id", matterId);
    return {
      matterId: null,
      error: wfErr?.message ?? "Failed to create workflow state; matter was rolled back.",
    };
  }

  const workflowId = wfRow.id;

  const rollbackData = async () => {
    await supabase.from("workflow_states").delete().eq("id", workflowId);
    await supabase.from("matters").delete().eq("id", matterId);
  };

  const a1 = await insertAuditEvent(supabase, {
    event_type: "matter_created",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: input.client_id,
    matter_id: matterId,
    target_object_type: "matters",
    target_object_id: matterId,
    summary: "Matter created",
    metadata: { matter_name: matterName },
  });
  if (a1.error) {
    await rollbackData();
    return { matterId: null, error: `Audit failure (matter_created): ${a1.error}` };
  }

  const a2 = await insertAuditEvent(supabase, {
    event_type: "workflow_state_initialized",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: input.client_id,
    matter_id: matterId,
    target_object_type: "workflow_states",
    target_object_id: workflowId,
    summary: "Workflow state initialized",
    metadata: { current_workflow: "W2", workflow_status: "not_started" },
  });
  if (a2.error) {
    await rollbackData();
    return {
      matterId: null,
      error: `Audit failure (workflow_state_initialized): ${a2.error}`,
    };
  }

  return { matterId, error: null };
}
