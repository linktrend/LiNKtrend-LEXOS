"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext, assertCanMutate } from "@/server/auth/context";
import {
  archiveArgumentDraft,
  createArgumentDraft,
  updateArgumentDraftFromForm,
} from "@/server/argument/mutations";
import type { ArgumentMutationState } from "./argument-mutation-state";

export async function createArgumentDraftAction(
  _prev: ArgumentMutationState,
  formData: FormData
): Promise<ArgumentMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, argumentDraftId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, argumentDraftId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const supabase = await createSupabaseServerClient();
  const result = await createArgumentDraft(supabase, ctx, matterId);

  if (result.error || !result.id) {
    return { error: result.error ?? "Create failed.", success: null, argumentDraftId: null };
  }

  revalidatePath(`/matters/${matterId}/argument`);
  revalidatePath(`/matters/${matterId}/argument/${result.id}`);
  redirect(`/matters/${matterId}/argument/${result.id}`);
}

export async function updateArgumentDraftAction(
  _prev: ArgumentMutationState,
  formData: FormData
): Promise<ArgumentMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, argumentDraftId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, argumentDraftId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const supabase = await createSupabaseServerClient();
  const result = await updateArgumentDraftFromForm(supabase, ctx, formData);

  if (result.error || !result.id) {
    return { error: result.error ?? "Save failed.", success: null, argumentDraftId: null };
  }

  revalidatePath(`/matters/${matterId}/argument`);
  revalidatePath(`/matters/${matterId}/argument/${result.id}`);
  return { error: null, success: "Saved.", argumentDraftId: result.id };
}

export async function archiveArgumentDraftAction(
  _prev: ArgumentMutationState,
  formData: FormData
): Promise<ArgumentMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, argumentDraftId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, argumentDraftId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const argumentDraftId = String(formData.get("argument_draft_id") ?? "");
  const modeRaw = String(formData.get("archive_mode") ?? "archived");
  const mode = modeRaw === "superseded" ? "superseded" : "archived";

  const supabase = await createSupabaseServerClient();
  const result = await archiveArgumentDraft(supabase, ctx, { matterId, argumentDraftId, mode });

  if (result.error || !result.id) {
    return { error: result.error ?? "Archive failed.", success: null, argumentDraftId: null };
  }

  revalidatePath(`/matters/${matterId}/argument`);
  revalidatePath(`/matters/${matterId}/argument/${result.id}`);
  return { error: null, success: "Archived.", argumentDraftId: result.id };
}
