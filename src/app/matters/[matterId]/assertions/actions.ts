"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext, assertCanMutate } from "@/server/auth/context";
import {
  archiveAssertion,
  createAssertion,
  updateAssertion,
} from "@/server/assertions/mutations";
import type { AssertionMutationState } from "./assertion-mutation-state";

function boolFromForm(formData: FormData, key: string): boolean {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

export async function createAssertionAction(
  _prev: AssertionMutationState,
  formData: FormData
): Promise<AssertionMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const supabase = await createSupabaseServerClient();
  const result = await createAssertion(supabase, ctx, {
    matterId,
    assertionText: String(formData.get("assertion_text") ?? ""),
    assertionType: String(formData.get("assertion_type") ?? "").trim() || null,
    truthState: String(formData.get("truth_state") ?? ""),
    supportState: String(formData.get("support_state") ?? ""),
    useStatus: String(formData.get("use_status") ?? ""),
    contradictionFlag: boolFromForm(formData, "contradiction_flag"),
    notes: String(formData.get("notes") ?? ""),
    caseStoryId: String(formData.get("case_story_id") ?? "").trim() || null,
    materiality: String(formData.get("materiality") ?? ""),
    nextSupportAction: String(formData.get("next_support_action") ?? ""),
    gaps: String(formData.get("gaps") ?? ""),
    vulnerability: String(formData.get("vulnerability") ?? ""),
  });

  if (result.error || !result.id) {
    return { error: result.error ?? "Create failed.", success: null };
  }

  revalidatePath(`/matters/${matterId}/assertions`);
  revalidatePath(`/matters/${matterId}/assertions/${result.id}`);
  return { error: null, success: "Assertion created." };
}

export async function updateAssertionAction(
  _prev: AssertionMutationState,
  formData: FormData
): Promise<AssertionMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const assertionId = String(formData.get("assertion_id") ?? "");
  const supabase = await createSupabaseServerClient();
  const result = await updateAssertion(supabase, ctx, {
    matterId,
    assertionId,
    assertionText: String(formData.get("assertion_text") ?? ""),
    assertionType: String(formData.get("assertion_type") ?? "").trim() || null,
    truthState: String(formData.get("truth_state") ?? ""),
    supportState: String(formData.get("support_state") ?? ""),
    useStatus: String(formData.get("use_status") ?? ""),
    contradictionFlag: boolFromForm(formData, "contradiction_flag"),
    notes: String(formData.get("notes") ?? ""),
    caseStoryId: String(formData.get("case_story_id") ?? "").trim() || null,
    materiality: String(formData.get("materiality") ?? ""),
    nextSupportAction: String(formData.get("next_support_action") ?? ""),
    gaps: String(formData.get("gaps") ?? ""),
    vulnerability: String(formData.get("vulnerability") ?? ""),
  });

  if (result.error) {
    return { error: result.error, success: null };
  }

  revalidatePath(`/matters/${matterId}/assertions`);
  revalidatePath(`/matters/${matterId}/assertions/${assertionId}`);
  return { error: null, success: "Assertion updated." };
}

export async function archiveAssertionAction(
  _prev: AssertionMutationState,
  formData: FormData
): Promise<AssertionMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const assertionId = String(formData.get("assertion_id") ?? "");
  const supabase = await createSupabaseServerClient();
  const result = await archiveAssertion(supabase, ctx, matterId, assertionId);

  if (result.error) {
    return { error: result.error, success: null };
  }

  revalidatePath(`/matters/${matterId}/assertions`);
  revalidatePath(`/matters/${matterId}/assertions/${assertionId}`);
  return { error: null, success: "Assertion archived." };
}
