import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";
import { insertAuditEvent } from "@/server/audit/log";
import { createClientRecord } from "@/server/clients/mutations";
import { createMatterWithWorkflowAndAudits } from "@/server/matters/mutations";
import { getIntakeBundle, getIntakeRecordById } from "@/server/intake/queries";
import type { MatterPosture } from "@/types/domain";
import { MATTER_POSTURES } from "@/types/domain";
import { isIntakeFrozen } from "@/types/intake";

function normalizeMatterPosture(raw: string | null | undefined): MatterPosture {
  const t = (raw ?? "unknown").trim();
  if (t === "defense") return "defence";
  if (MATTER_POSTURES.includes(t as MatterPosture)) return t as MatterPosture;
  return "unknown";
}

export async function createIntakeRecord(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: {
    intake_type?: string | null;
    source?: string | null;
    urgency_level?: string | null;
    notes?: string | null;
  }
): Promise<{ intakeId: string | null; error: string | null }> {
  const { data, error } = await supabase
    .from("intake_records")
    .insert({
      intake_type: input.intake_type?.trim() || null,
      intake_status: "new",
      source: input.source?.trim() || null,
      urgency_level: input.urgency_level?.trim() || null,
      notes: input.notes?.trim() || null,
      conflict_status: "unknown",
      kyc_status: "unknown",
      engagement_status: "not_started",
      lead_attorney_review_status: "not_started",
      handoff_status: "none",
      created_by: ctx.userId,
      updated_by: ctx.userId,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { intakeId: null, error: error?.message ?? "Failed to create intake." };
  }

  const intakeId = data.id;
  const audit = await insertAuditEvent(supabase, {
    event_type: "intake_created",
    actor_id: ctx.userId,
    actor_type: "user",
    intake_id: intakeId,
    target_object_type: "intake_records",
    target_object_id: intakeId,
    summary: "Intake created",
    metadata: { intake_type: input.intake_type },
  });
  if (audit.error) {
    await supabase.from("intake_records").delete().eq("id", intakeId);
    return { intakeId: null, error: `Audit failed: ${audit.error}` };
  }

  return { intakeId, error: null };
}

export async function createClientCandidate(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: {
    intake_id: string;
    intake_group_id?: string | null;
    name: string;
    client_type?: string | null;
    identity_status?: string | null;
    kyc_status?: string | null;
    conflict_status?: string | null;
    authority_status?: string | null;
    representative_status?: string | null;
    engagement_status?: string | null;
    consent_status?: string | null;
    notes?: string | null;
  }
): Promise<{ id: string | null; error: string | null }> {
  const intake = await getIntakeRecordById(supabase, input.intake_id, ctx);
  if (!intake) return { id: null, error: "Intake not found or access denied." };
  if (isIntakeFrozen(intake.intake_status)) {
    return { id: null, error: "This intake is closed; candidates cannot be added." };
  }

  if (input.intake_group_id) {
    const { data: grp } = await supabase
      .from("intake_groups")
      .select("id, intake_id")
      .eq("id", input.intake_group_id)
      .maybeSingle();
    if (!grp || grp.intake_id !== input.intake_id) {
      return { id: null, error: "Intake group does not belong to this intake." };
    }
  }

  const name = input.name.trim();
  if (!name) return { id: null, error: "Client candidate name is required." };

  const { data, error } = await supabase
    .from("client_candidates")
    .insert({
      intake_id: input.intake_id,
      intake_group_id: input.intake_group_id ?? null,
      name,
      client_type: input.client_type?.trim() || null,
      identity_status: input.identity_status?.trim() || "unknown",
      kyc_status: (input.kyc_status as Database["public"]["Tables"]["client_candidates"]["Insert"]["kyc_status"]) ?? "unknown",
      conflict_status:
        (input.conflict_status as Database["public"]["Tables"]["client_candidates"]["Insert"]["conflict_status"]) ??
        "unknown",
      authority_status: input.authority_status?.trim() || "unknown",
      representative_status: input.representative_status?.trim() || "unknown",
      engagement_status:
        (input.engagement_status as Database["public"]["Tables"]["client_candidates"]["Insert"]["engagement_status"]) ??
        "not_started",
      consent_status: input.consent_status?.trim() || "unknown",
      notes: input.notes?.trim() || null,
      created_by: ctx.userId,
      updated_by: ctx.userId,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to create client candidate." };
  }

  const audit = await insertAuditEvent(supabase, {
    event_type: "client_candidate_created",
    actor_id: ctx.userId,
    actor_type: "user",
    intake_id: input.intake_id,
    target_object_type: "client_candidates",
    target_object_id: data.id,
    summary: "Client candidate created",
    metadata: { name },
  });
  if (audit.error) {
    await supabase.from("client_candidates").delete().eq("id", data.id);
    return { id: null, error: `Audit failed: ${audit.error}` };
  }

  return { id: data.id, error: null };
}

export async function createMatterCandidate(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: {
    intake_id: string;
    intake_group_id?: string | null;
    proposed_matter_name: string;
    matter_type?: string | null;
    posture: string;
    jurisdiction?: string | null;
    engagement_status?: string | null;
    notes?: string | null;
  }
): Promise<{ id: string | null; error: string | null }> {
  const intake = await getIntakeRecordById(supabase, input.intake_id, ctx);
  if (!intake) return { id: null, error: "Intake not found or access denied." };
  if (isIntakeFrozen(intake.intake_status)) {
    return { id: null, error: "This intake is closed; matter candidates cannot be added." };
  }

  if (input.intake_group_id) {
    const { data: grp } = await supabase
      .from("intake_groups")
      .select("id, intake_id")
      .eq("id", input.intake_group_id)
      .maybeSingle();
    if (!grp || grp.intake_id !== input.intake_id) {
      return { id: null, error: "Intake group does not belong to this intake." };
    }
  }

  const matterName = input.proposed_matter_name.trim();
  if (!matterName) return { id: null, error: "Matter name is required." };

  const posture = normalizeMatterPosture(input.posture);

  const { data, error } = await supabase
    .from("matter_candidates")
    .insert({
      intake_id: input.intake_id,
      intake_group_id: input.intake_group_id ?? null,
      proposed_matter_name: matterName,
      matter_type: input.matter_type?.trim() || null,
      posture,
      jurisdiction: input.jurisdiction?.trim() || null,
      engagement_status:
        (input.engagement_status as Database["public"]["Tables"]["matter_candidates"]["Insert"]["engagement_status"]) ??
        "not_started",
      notes: input.notes?.trim() || null,
      created_by: ctx.userId,
      updated_by: ctx.userId,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to create matter candidate." };
  }

  const audit = await insertAuditEvent(supabase, {
    event_type: "matter_candidate_created",
    actor_id: ctx.userId,
    actor_type: "user",
    intake_id: input.intake_id,
    target_object_type: "matter_candidates",
    target_object_id: data.id,
    summary: "Matter candidate created",
    metadata: { proposed_matter_name: matterName },
  });
  if (audit.error) {
    await supabase.from("matter_candidates").delete().eq("id", data.id);
    return { id: null, error: `Audit failed: ${audit.error}` };
  }

  return { id: data.id, error: null };
}

export async function createIntakeGroup(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: {
    intake_id: string;
    relationship_type?: string | null;
    joint_representation_flag?: boolean;
    potential_internal_conflict_flag?: boolean;
    group_conflict_status?: string | null;
    group_consent_status?: string | null;
    notes?: string | null;
  }
): Promise<{ groupId: string | null; error: string | null }> {
  const intake = await getIntakeRecordById(supabase, input.intake_id, ctx);
  if (!intake) return { groupId: null, error: "Intake not found or access denied." };
  if (isIntakeFrozen(intake.intake_status)) {
    return { groupId: null, error: "This intake is closed; groups cannot be added." };
  }

  const { data, error } = await supabase
    .from("intake_groups")
    .insert({
      intake_id: input.intake_id,
      relationship_type: input.relationship_type?.trim() || null,
      joint_representation_flag: input.joint_representation_flag ?? false,
      potential_internal_conflict_flag: input.potential_internal_conflict_flag ?? false,
      group_conflict_status: input.group_conflict_status?.trim() || null,
      group_consent_status: input.group_consent_status?.trim() || null,
      notes: input.notes?.trim() || null,
      created_by: ctx.userId,
      updated_by: ctx.userId,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { groupId: null, error: error?.message ?? "Failed to create intake group." };
  }

  const audit = await insertAuditEvent(supabase, {
    event_type: "intake_group_created",
    actor_id: ctx.userId,
    actor_type: "user",
    intake_id: input.intake_id,
    target_object_type: "intake_groups",
    target_object_id: data.id,
    summary: "Intake group created",
    metadata: { relationship_type: input.relationship_type },
  });
  if (audit.error) {
    await supabase.from("intake_groups").delete().eq("id", data.id);
    return { groupId: null, error: `Audit failed: ${audit.error}` };
  }

  return { groupId: data.id, error: null };
}

export async function linkSharedMatterToGroup(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: { intake_id: string; intake_group_id: string; matter_candidate_id: string }
): Promise<{ error: string | null }> {
  const bundle = await getIntakeBundle(supabase, input.intake_id, ctx);
  if (!bundle) return { error: "Intake not found or access denied." };
  if (isIntakeFrozen(bundle.intake.intake_status)) {
    return { error: "This intake is closed." };
  }

  const group = bundle.groups.find((g) => g.id === input.intake_group_id);
  if (!group) return { error: "Intake group not found." };

  const mc = bundle.matterCandidates.find((m) => m.id === input.matter_candidate_id);
  if (!mc || mc.intake_group_id !== input.intake_group_id) {
    return { error: "Matter candidate must belong to the selected intake group." };
  }

  const { error } = await supabase
    .from("intake_groups")
    .update({
      shared_matter_candidate_id: input.matter_candidate_id,
      updated_by: ctx.userId,
    })
    .eq("id", input.intake_group_id);

  if (error) return { error: error.message };
  return { error: null };
}

export async function updateIntakeGroupFlagsOnly(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: { intake_id: string; group_id: string; joint_representation_flag: boolean; potential_internal_conflict_flag: boolean }
): Promise<{ error: string | null }> {
  const bundle = await getIntakeBundle(supabase, input.intake_id, ctx);
  if (!bundle) return { error: "Intake not found or access denied." };
  if (isIntakeFrozen(bundle.intake.intake_status)) {
    return { error: "This intake is closed." };
  }
  const group = bundle.groups.find((g) => g.id === input.group_id);
  if (!group) return { error: "Group not found." };

  const { error } = await supabase
    .from("intake_groups")
    .update({
      joint_representation_flag: input.joint_representation_flag,
      potential_internal_conflict_flag: input.potential_internal_conflict_flag,
      updated_by: ctx.userId,
    })
    .eq("id", input.group_id);

  if (error) return { error: error.message };
  return { error: null };
}

export async function updateIntakeRecord(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  intakeId: string,
  patch: Partial<
    Pick<
      Database["public"]["Tables"]["intake_records"]["Update"],
      | "intake_status"
      | "intake_type"
      | "source"
      | "urgency_level"
      | "notes"
      | "conflict_status"
      | "kyc_status"
      | "engagement_status"
      | "lead_attorney_review_status"
      | "handoff_status"
    >
  >
): Promise<{ error: string | null }> {
  const intake = await getIntakeRecordById(supabase, intakeId, ctx);
  if (!intake) return { error: "Intake not found or access denied." };

  const terminal = new Set(["rejected", "abandoned", "archived", "accepted"]);
  if (terminal.has(intake.intake_status ?? "") && !ctx.isAdmin) {
    return { error: "This intake is closed and cannot be edited." };
  }

  const { error } = await supabase
    .from("intake_records")
    .update({
      ...patch,
      updated_by: ctx.userId,
    })
    .eq("id", intakeId);

  if (error) return { error: error.message };
  return { error: null };
}

export async function rejectIntake(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  intakeId: string
): Promise<{ error: string | null }> {
  const intake = await getIntakeRecordById(supabase, intakeId, ctx);
  if (!intake) return { error: "Intake not found or access denied." };
  if (intake.intake_status === "accepted") {
    return { error: "Accepted intake cannot be rejected." };
  }

  const { error } = await supabase
    .from("intake_records")
    .update({
      intake_status: "rejected",
      rejected_at: new Date().toISOString(),
      updated_by: ctx.userId,
    })
    .eq("id", intakeId);

  if (error) return { error: error.message };

  await insertAuditEvent(supabase, {
    event_type: "intake_rejected",
    actor_id: ctx.userId,
    actor_type: "user",
    intake_id: intakeId,
    target_object_type: "intake_records",
    target_object_id: intakeId,
    summary: "Intake rejected",
  });

  return { error: null };
}

export async function abandonIntake(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  intakeId: string
): Promise<{ error: string | null }> {
  const intake = await getIntakeRecordById(supabase, intakeId, ctx);
  if (!intake) return { error: "Intake not found or access denied." };
  if (intake.intake_status === "accepted") {
    return { error: "Accepted intake cannot be abandoned." };
  }

  const { error } = await supabase
    .from("intake_records")
    .update({
      intake_status: "abandoned",
      abandoned_at: new Date().toISOString(),
      updated_by: ctx.userId,
    })
    .eq("id", intakeId);

  if (error) return { error: error.message };

  await insertAuditEvent(supabase, {
    event_type: "intake_abandoned",
    actor_id: ctx.userId,
    actor_type: "user",
    intake_id: intakeId,
    target_object_type: "intake_records",
    target_object_id: intakeId,
    summary: "Intake abandoned",
  });

  return { error: null };
}

export async function prepareIntakeHandoff(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  intakeId: string
): Promise<{ error: string | null }> {
  const intake = await getIntakeRecordById(supabase, intakeId, ctx);
  if (!intake) return { error: "Intake not found or access denied." };
  if (["rejected", "abandoned", "archived", "accepted"].includes(intake.intake_status ?? "")) {
    return { error: "Terminal or accepted intake cannot prepare handoff." };
  }

  const { error } = await supabase
    .from("intake_records")
    .update({
      handoff_status: "prepared",
      updated_by: ctx.userId,
    })
    .eq("id", intakeId);

  if (error) return { error: error.message };

  await insertAuditEvent(supabase, {
    event_type: "intake_handoff_prepared",
    actor_id: ctx.userId,
    actor_type: "user",
    intake_id: intakeId,
    target_object_type: "intake_records",
    target_object_id: intakeId,
    summary: "Intake handoff prepared",
  });

  return { error: null };
}

/**
 * Creates W1 client + matter from validated W0 candidates. Requires handoff_status prepared
 * and intake not yet accepted. Best-effort rollback if matter step fails after client insert.
 */
export async function materializeW1FromIntake(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  intakeId: string
): Promise<{ clientId: string | null; matterId: string | null; error: string | null }> {
  const bundle = await getIntakeBundle(supabase, intakeId, ctx);
  if (!bundle) return { clientId: null, matterId: null, error: "Intake not found or access denied." };

  const { intake } = bundle;
  if (intake.handoff_status !== "prepared") {
    return {
      clientId: null,
      matterId: null,
      error: "Prepare handoff first (handoff status must be prepared).",
    };
  }
  if (intake.intake_status === "accepted") {
    return { clientId: null, matterId: null, error: "Intake is already accepted." };
  }
  if (["rejected", "abandoned", "archived"].includes(intake.intake_status ?? "")) {
    return { clientId: null, matterId: null, error: "Cannot materialize from a closed intake." };
  }

  const soloClients = bundle.clientCandidates.filter((c) => !c.intake_group_id);
  const soloMatters = bundle.matterCandidates.filter((m) => !m.intake_group_id);

  let clientName: string;
  let matterRow: (typeof bundle.matterCandidates)[0];
  let matterCandidateId: string;
  let clientType: string | null | undefined;

  if (soloClients.length === 1 && soloMatters.length === 1) {
    clientName = soloClients[0].name?.trim() || "Unnamed client";
    clientType = soloClients[0].client_type;
    matterRow = soloMatters[0];
    matterCandidateId = matterRow.id;
  } else {
    const grouped = bundle.groups.filter((g) => g.shared_matter_candidate_id);
    if (grouped.length !== 1 || soloClients.length > 0 || soloMatters.length > 0) {
      return {
        clientId: null,
        matterId: null,
        error:
          "Use exactly one solo client + one solo matter, OR one intake group with a linked shared matter and no solo candidates.",
      };
    }
    const g = grouped[0];
    const inGroupClients = bundle.clientCandidates.filter((c) => c.intake_group_id === g.id);
    const sharedMc = bundle.matterCandidates.find((m) => m.id === g.shared_matter_candidate_id);
    if (!sharedMc || inGroupClients.length < 1) {
      return {
        clientId: null,
        matterId: null,
        error: "Intake group must have at least one client candidate and a shared matter candidate.",
      };
    }
    const names = inGroupClients.map((c) => c.name?.trim()).filter(Boolean);
    clientName = names.length ? names.join(" & ") : "Grouped prospects";
    clientType = inGroupClients[0]?.client_type;
    matterRow = sharedMc;
    matterCandidateId = sharedMc.id;
  }

  const clientRes = await createClientRecord(supabase, ctx, {
    client_name: clientName,
    client_type: clientType ?? null,
    notes: `Created from intake ${intakeId}`,
    created_from_intake_id: intakeId,
  });

  if (clientRes.error || !clientRes.clientId) {
    return { clientId: null, matterId: null, error: clientRes.error ?? "Client creation failed." };
  }

  const matterRes = await createMatterWithWorkflowAndAudits(supabase, ctx, {
    client_id: clientRes.clientId,
    matter_name: matterRow.proposed_matter_name?.trim() || "Matter",
    posture: normalizeMatterPosture(matterRow.posture),
    jurisdiction: matterRow.jurisdiction,
    matter_type: matterRow.matter_type,
    created_from_intake_id: intakeId,
    created_from_matter_candidate_id: matterCandidateId,
  });

  if (matterRes.error || !matterRes.matterId) {
    await supabase.from("clients").delete().eq("id", clientRes.clientId);
    return {
      clientId: null,
      matterId: null,
      error: matterRes.error ?? "Matter creation failed; client rolled back.",
    };
  }

  const { error: updErr } = await supabase
    .from("intake_records")
    .update({
      intake_status: "accepted",
      accepted_at: new Date().toISOString(),
      handoff_status: "completed",
      updated_by: ctx.userId,
    })
    .eq("id", intakeId);

  if (updErr) {
    return {
      clientId: clientRes.clientId,
      matterId: matterRes.matterId,
      error: `W1 created but intake update failed: ${updErr.message}`,
    };
  }

  await insertAuditEvent(supabase, {
    event_type: "intake_accepted",
    actor_id: ctx.userId,
    actor_type: "user",
    intake_id: intakeId,
    client_id: clientRes.clientId,
    matter_id: matterRes.matterId,
    target_object_type: "intake_records",
    target_object_id: intakeId,
    summary: "Intake accepted and W1 records created",
    metadata: { client_id: clientRes.clientId, matter_id: matterRes.matterId },
  });

  return { clientId: clientRes.clientId, matterId: matterRes.matterId, error: null };
}
