"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext, assertCanMutate } from "@/server/auth/context";
import {
  archiveAdversarialCritique,
  createAdversarialCritique,
  updateAdversarialCritiqueFromForm,
} from "@/server/adversarial/mutations";
import type { AdversarialMutationState } from "./adversarial-mutation-state";

export async function createAdversarialCritiqueAction(
  _prev: AdversarialMutationState,
  formData: FormData
): Promise<AdversarialMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, adversarialCritiqueId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, adversarialCritiqueId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const argumentDraftId = String(formData.get("argument_draft_id") ?? "");
  const supabase = await createSupabaseServerClient();
  const result = await createAdversarialCritique(supabase, ctx, matterId, argumentDraftId);

  if (result.error || !result.id) {
    return { error: result.error ?? "Create failed.", success: null, adversarialCritiqueId: null };
  }

  revalidatePath(`/matters/${matterId}/adversarial`);
  revalidatePath(`/matters/${matterId}/adversarial/${result.id}`);
  redirect(`/matters/${matterId}/adversarial/${result.id}`);
}

export async function updateAdversarialCritiqueAction(
  _prev: AdversarialMutationState,
  formData: FormData
): Promise<AdversarialMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, adversarialCritiqueId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, adversarialCritiqueId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const supabase = await createSupabaseServerClient();
  const result = await updateAdversarialCritiqueFromForm(supabase, ctx, formData);

  if (result.error || !result.id) {
    return { error: result.error ?? "Save failed.", success: null, adversarialCritiqueId: null };
  }

  revalidatePath(`/matters/${matterId}/adversarial`);
  revalidatePath(`/matters/${matterId}/adversarial/${result.id}`);
  return { error: null, success: "Saved.", adversarialCritiqueId: result.id };
}

export async function archiveAdversarialCritiqueAction(
  _prev: AdversarialMutationState,
  formData: FormData
): Promise<AdversarialMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, adversarialCritiqueId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, adversarialCritiqueId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const adversarialCritiqueId = String(formData.get("adversarial_critique_id") ?? "");
  const modeRaw = String(formData.get("archive_mode") ?? "archived");
  const mode = modeRaw === "superseded" ? "superseded" : "archived";

  const supabase = await createSupabaseServerClient();
  const result = await archiveAdversarialCritique(supabase, ctx, { matterId, adversarialCritiqueId, mode });

  if (result.error || !result.id) {
    return { error: result.error ?? "Archive failed.", success: null, adversarialCritiqueId: null };
  }

  revalidatePath(`/matters/${matterId}/adversarial`);
  revalidatePath(`/matters/${matterId}/adversarial/${result.id}`);
  return { error: null, success: "Archived.", adversarialCritiqueId: result.id };
}
