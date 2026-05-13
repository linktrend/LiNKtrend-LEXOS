"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext, assertCanMutate } from "@/server/auth/context";
import {
  archiveResearchMemo,
  createResearchMemo,
  updateResearchMemoFromForm,
} from "@/server/research/mutations";
import type { ResearchMutationState } from "./research-mutation-state";

export async function createResearchMemoAction(
  _prev: ResearchMutationState,
  formData: FormData
): Promise<ResearchMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, researchMemoId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, researchMemoId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const supabase = await createSupabaseServerClient();
  const result = await createResearchMemo(supabase, ctx, matterId);

  if (result.error || !result.id) {
    return { error: result.error ?? "Create failed.", success: null, researchMemoId: null };
  }

  revalidatePath(`/matters/${matterId}/research`);
  revalidatePath(`/matters/${matterId}/research/${result.id}`);
  redirect(`/matters/${matterId}/research/${result.id}`);
}

export async function updateResearchMemoAction(
  _prev: ResearchMutationState,
  formData: FormData
): Promise<ResearchMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, researchMemoId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, researchMemoId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const supabase = await createSupabaseServerClient();
  const result = await updateResearchMemoFromForm(supabase, ctx, formData);

  if (result.error || !result.id) {
    return { error: result.error ?? "Save failed.", success: null, researchMemoId: null };
  }

  revalidatePath(`/matters/${matterId}/research`);
  revalidatePath(`/matters/${matterId}/research/${result.id}`);
  return { error: null, success: "Saved.", researchMemoId: result.id };
}

export async function archiveResearchMemoAction(
  _prev: ResearchMutationState,
  formData: FormData
): Promise<ResearchMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, researchMemoId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, researchMemoId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const researchMemoId = String(formData.get("research_memo_id") ?? "");
  const modeRaw = String(formData.get("archive_mode") ?? "archived");
  const mode = modeRaw === "superseded" ? "superseded" : "archived";

  const supabase = await createSupabaseServerClient();
  const result = await archiveResearchMemo(supabase, ctx, { matterId, researchMemoId, mode });

  if (result.error || !result.id) {
    return { error: result.error ?? "Archive failed.", success: null, researchMemoId: null };
  }

  revalidatePath(`/matters/${matterId}/research`);
  revalidatePath(`/matters/${matterId}/research/${result.id}`);
  return { error: null, success: "Archived.", researchMemoId: result.id };
}
