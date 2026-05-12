"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext, assertCanMutate } from "@/server/auth/context";
import {
  abandonIntake,
  createClientCandidate,
  createIntakeGroup,
  createMatterCandidate,
  linkSharedMatterToGroup,
  materializeW1FromIntake,
  prepareIntakeHandoff,
  rejectIntake,
  updateIntakeGroupFlagsOnly,
  updateIntakeRecord,
} from "@/server/intake/mutations";

export type ActionState = { error: string | null };

const ok: ActionState = { error: null };

export async function addClientCandidateAction(intakeId: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in." };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden." };
  }

  const supabase = await createSupabaseServerClient();
  const gid = String(formData.get("intake_group_id") ?? "").trim();
  const res = await createClientCandidate(supabase, ctx, {
    intake_id: intakeId,
    intake_group_id: gid || null,
    name: String(formData.get("name") ?? ""),
    client_type: String(formData.get("client_type") ?? "") || null,
    identity_status: String(formData.get("identity_status") ?? "") || null,
    kyc_status: String(formData.get("kyc_status") ?? "") || null,
    conflict_status: String(formData.get("conflict_status") ?? "") || null,
    authority_status: String(formData.get("authority_status") ?? "") || null,
    representative_status: String(formData.get("representative_status") ?? "") || null,
    engagement_status: String(formData.get("engagement_status") ?? "") || null,
    consent_status: String(formData.get("consent_status") ?? "") || null,
    notes: String(formData.get("notes") ?? "") || null,
  });

  if (res.error) return { error: res.error };
  revalidatePath(`/intake/${intakeId}`);
  return ok;
}

export async function addMatterCandidateAction(intakeId: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in." };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden." };
  }

  const supabase = await createSupabaseServerClient();
  const gid = String(formData.get("intake_group_id") ?? "").trim();
  const res = await createMatterCandidate(supabase, ctx, {
    intake_id: intakeId,
    intake_group_id: gid || null,
    proposed_matter_name: String(formData.get("proposed_matter_name") ?? ""),
    matter_type: String(formData.get("matter_type") ?? "") || null,
    posture: String(formData.get("posture") ?? "unknown"),
    jurisdiction: String(formData.get("jurisdiction") ?? "") || null,
    engagement_status: String(formData.get("engagement_status") ?? "") || null,
    notes: String(formData.get("notes") ?? "") || null,
  });

  if (res.error) return { error: res.error };
  revalidatePath(`/intake/${intakeId}`);
  return ok;
}

export async function createIntakeGroupAction(intakeId: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in." };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden." };
  }

  const supabase = await createSupabaseServerClient();
  const res = await createIntakeGroup(supabase, ctx, {
    intake_id: intakeId,
    relationship_type: String(formData.get("relationship_type") ?? "") || null,
    joint_representation_flag: formData.get("joint_representation_flag") === "on",
    potential_internal_conflict_flag: formData.get("potential_internal_conflict_flag") === "on",
    group_conflict_status: String(formData.get("group_conflict_status") ?? "") || null,
    group_consent_status: String(formData.get("group_consent_status") ?? "") || null,
    notes: String(formData.get("notes") ?? "") || null,
  });

  if (res.error) return { error: res.error };
  revalidatePath(`/intake/${intakeId}`);
  return ok;
}

export async function linkSharedMatterAction(intakeId: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in." };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden." };
  }

  const supabase = await createSupabaseServerClient();
  const res = await linkSharedMatterToGroup(supabase, ctx, {
    intake_id: intakeId,
    intake_group_id: String(formData.get("intake_group_id") ?? ""),
    matter_candidate_id: String(formData.get("matter_candidate_id") ?? ""),
  });

  if (res.error) return { error: res.error };
  revalidatePath(`/intake/${intakeId}`);
  return ok;
}

export async function updateIntakeGroupFlagsFormAction(
  intakeId: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in." };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden." };
  }

  const supabase = await createSupabaseServerClient();
  const res = await updateIntakeGroupFlagsOnly(supabase, ctx, {
    intake_id: intakeId,
    group_id: String(formData.get("group_id") ?? ""),
    joint_representation_flag: formData.get("joint_representation_flag") === "on",
    potential_internal_conflict_flag: formData.get("potential_internal_conflict_flag") === "on",
  });

  if (res.error) return { error: res.error };
  revalidatePath(`/intake/${intakeId}`);
  return ok;
}

export async function updateIntakeFieldsAction(intakeId: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in." };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden." };
  }

  const supabase = await createSupabaseServerClient();
  const patch: Parameters<typeof updateIntakeRecord>[3] = {};
  const s = (k: string) => {
    const v = formData.get(k);
    if (v === null || v === "") return undefined;
    return String(v);
  };
  const intake_status = s("intake_status");
  const conflict_status = s("conflict_status");
  const kyc_status = s("kyc_status");
  const engagement_status = s("engagement_status");
  const lead_attorney_review_status = s("lead_attorney_review_status");
  const intake_type = s("intake_type");
  const source = s("source");
  const urgency_level = s("urgency_level");
  const notes = s("notes");

  if (intake_status !== undefined) patch.intake_status = intake_status as never;
  if (conflict_status !== undefined) patch.conflict_status = conflict_status as never;
  if (kyc_status !== undefined) patch.kyc_status = kyc_status as never;
  if (engagement_status !== undefined) patch.engagement_status = engagement_status as never;
  if (lead_attorney_review_status !== undefined) patch.lead_attorney_review_status = lead_attorney_review_status;
  if (intake_type !== undefined) patch.intake_type = intake_type;
  if (source !== undefined) patch.source = source;
  if (urgency_level !== undefined) patch.urgency_level = urgency_level;
  if (notes !== undefined) patch.notes = notes;

  const res = await updateIntakeRecord(supabase, ctx, intakeId, patch);
  if (res.error) return { error: res.error };
  revalidatePath(`/intake/${intakeId}`);
  return ok;
}

export async function prepareHandoffAction(intakeId: string): Promise<ActionState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in." };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden." };
  }
  const supabase = await createSupabaseServerClient();
  const res = await prepareIntakeHandoff(supabase, ctx, intakeId);
  if (res.error) return { error: res.error };
  revalidatePath(`/intake/${intakeId}`);
  return ok;
}

export async function materializeW1FormAction(
  intakeId: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  void formData;
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in." };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden." };
  }
  const supabase = await createSupabaseServerClient();
  const res = await materializeW1FromIntake(supabase, ctx, intakeId);
  if (res.error) return { error: res.error };
  revalidatePath(`/intake/${intakeId}`);
  revalidatePath("/clients");
  revalidatePath("/matters");
  if (res.matterId) {
    redirect(`/matters/${res.matterId}/overview`);
  }
  return ok;
}

export async function rejectIntakeAction(intakeId: string): Promise<ActionState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in." };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden." };
  }
  const supabase = await createSupabaseServerClient();
  const res = await rejectIntake(supabase, ctx, intakeId);
  if (res.error) return { error: res.error };
  revalidatePath(`/intake/${intakeId}`);
  return ok;
}

export async function abandonIntakeAction(intakeId: string): Promise<ActionState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in." };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden." };
  }
  const supabase = await createSupabaseServerClient();
  const res = await abandonIntake(supabase, ctx, intakeId);
  if (res.error) return { error: res.error };
  revalidatePath(`/intake/${intakeId}`);
  return ok;
}

/** `useActionState` / progressive enhancement wrappers (Next form actions must not return `ActionState` from a bound one-arg action). */
export async function prepareHandoffFormAction(
  intakeId: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  void formData;
  return prepareHandoffAction(intakeId);
}

export async function rejectIntakeFormAction(
  intakeId: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  void formData;
  return rejectIntakeAction(intakeId);
}

export async function abandonIntakeFormAction(
  intakeId: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  void formData;
  return abandonIntakeAction(intakeId);
}
