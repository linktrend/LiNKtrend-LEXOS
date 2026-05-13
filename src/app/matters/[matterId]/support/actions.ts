"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext, assertCanMutate } from "@/server/auth/context";
import {
  archiveSupportMatrixItem,
  createSupportMatrixItem,
  updateSupportMatrixItem,
} from "@/server/support/mutations";
import type { SupportMutationState } from "./support-mutation-state";

export async function createSupportMatrixItemAction(
  _prev: SupportMutationState,
  formData: FormData
): Promise<SupportMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const extractionRaw = String(formData.get("extraction_id") ?? "").trim();
  const supabase = await createSupabaseServerClient();
  const result = await createSupportMatrixItem(supabase, ctx, {
    matterId,
    assertionId: String(formData.get("assertion_id") ?? ""),
    evidenceId: String(formData.get("evidence_id") ?? ""),
    extractionId: extractionRaw || null,
    supportState: String(formData.get("support_state") ?? ""),
    riskLevel: String(formData.get("risk_level") ?? "").trim() || null,
    supportExplanation: String(formData.get("support_explanation") ?? ""),
    evidenceExcerpt: String(formData.get("evidence_excerpt") ?? ""),
    notes: String(formData.get("notes") ?? ""),
    relevance: String(formData.get("relevance") ?? "").trim() || null,
  });

  if (result.error || !result.id) {
    return { error: result.error ?? "Create failed.", success: null };
  }

  revalidatePath(`/matters/${matterId}/support`);
  revalidatePath(`/matters/${matterId}/assertions`);
  return { error: null, success: "Support link created." };
}

export async function updateSupportMatrixItemAction(
  _prev: SupportMutationState,
  formData: FormData
): Promise<SupportMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const extractionRaw = String(formData.get("extraction_id") ?? "").trim();
  const supabase = await createSupabaseServerClient();
  const result = await updateSupportMatrixItem(supabase, ctx, {
    matterId,
    itemId: String(formData.get("item_id") ?? ""),
    evidenceId: String(formData.get("evidence_id") ?? ""),
    extractionId: extractionRaw || null,
    supportState: String(formData.get("support_state") ?? ""),
    riskLevel: String(formData.get("risk_level") ?? "").trim() || null,
    supportExplanation: String(formData.get("support_explanation") ?? ""),
    evidenceExcerpt: String(formData.get("evidence_excerpt") ?? ""),
    notes: String(formData.get("notes") ?? ""),
    relevance: String(formData.get("relevance") ?? "").trim() || null,
  });

  if (result.error || !result.id) {
    return { error: result.error ?? "Update failed.", success: null };
  }

  revalidatePath(`/matters/${matterId}/support`);
  revalidatePath(`/matters/${matterId}/assertions`);
  return { error: null, success: "Support link updated." };
}

export async function archiveSupportMatrixItemAction(
  _prev: SupportMutationState,
  formData: FormData
): Promise<SupportMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const itemId = String(formData.get("item_id") ?? "");
  const supabase = await createSupabaseServerClient();
  const result = await archiveSupportMatrixItem(supabase, ctx, matterId, itemId);

  if (result.error) {
    return { error: result.error, success: null };
  }

  revalidatePath(`/matters/${matterId}/support`);
  revalidatePath(`/matters/${matterId}/assertions`);
  return { error: null, success: "Support link archived." };
}
