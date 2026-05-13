"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext, assertCanMutate } from "@/server/auth/context";
import {
  archiveStrategyMemo,
  createStrategyMemo,
  updateStrategyMemoFromForm,
} from "@/server/strategy/mutations";
import type { StrategyMutationState } from "./strategy-mutation-state";

export async function createStrategyMemoAction(
  _prev: StrategyMutationState,
  formData: FormData
): Promise<StrategyMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, strategyMemoId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, strategyMemoId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const supabase = await createSupabaseServerClient();
  const result = await createStrategyMemo(supabase, ctx, matterId);

  if (result.error || !result.id) {
    return { error: result.error ?? "Create failed.", success: null, strategyMemoId: null };
  }

  revalidatePath(`/matters/${matterId}/strategy`);
  revalidatePath(`/matters/${matterId}/strategy/${result.id}`);
  redirect(`/matters/${matterId}/strategy/${result.id}`);
}

export async function updateStrategyMemoAction(
  _prev: StrategyMutationState,
  formData: FormData
): Promise<StrategyMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, strategyMemoId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, strategyMemoId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const supabase = await createSupabaseServerClient();
  const result = await updateStrategyMemoFromForm(supabase, ctx, formData);

  if (result.error || !result.id) {
    return { error: result.error ?? "Save failed.", success: null, strategyMemoId: null };
  }

  revalidatePath(`/matters/${matterId}/strategy`);
  revalidatePath(`/matters/${matterId}/strategy/${result.id}`);
  return { error: null, success: "Saved.", strategyMemoId: result.id };
}

export async function archiveStrategyMemoAction(
  _prev: StrategyMutationState,
  formData: FormData
): Promise<StrategyMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, strategyMemoId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, strategyMemoId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const strategyMemoId = String(formData.get("strategy_memo_id") ?? "");
  const modeRaw = String(formData.get("archive_mode") ?? "archived");
  const mode = modeRaw === "superseded" ? "superseded" : "archived";

  const supabase = await createSupabaseServerClient();
  const result = await archiveStrategyMemo(supabase, ctx, { matterId, strategyMemoId, mode });

  if (result.error || !result.id) {
    return { error: result.error ?? "Archive failed.", success: null, strategyMemoId: null };
  }

  revalidatePath(`/matters/${matterId}/strategy`);
  revalidatePath(`/matters/${matterId}/strategy/${result.id}`);
  return { error: null, success: "Archived.", strategyMemoId: result.id };
}
