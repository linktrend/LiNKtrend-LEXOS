"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext, assertCanMutate } from "@/server/auth/context";
import {
  archiveOutputArtifact,
  createOutputArtifact,
  updateOutputArtifactFromForm,
} from "@/server/output/mutations";
import type { OutputMutationState } from "./output-mutation-state";

export async function createRevisedOutputAction(
  _prev: OutputMutationState,
  formData: FormData
): Promise<OutputMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, outputArtifactId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, outputArtifactId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const argumentDraftId = String(formData.get("argument_draft_id") ?? "");
  const adversarialCritiqueId = String(formData.get("adversarial_critique_id") ?? "");
  const title = String(formData.get("title") ?? "");
  const overrideW9Prereq = String(formData.get("override_w9_prereq") ?? "") === "1";
  const overrideReason = String(formData.get("override_reason") ?? "");

  const supabase = await createSupabaseServerClient();
  const result = await createOutputArtifact(supabase, ctx, {
    matterId,
    argumentDraftId,
    adversarialCritiqueId,
    title,
    overrideW9Prereq,
    overrideReason,
  });

  if (result.error || !result.id) {
    return { error: result.error ?? "Create failed.", success: null, outputArtifactId: null };
  }

  revalidatePath(`/matters/${matterId}/output`);
  revalidatePath(`/matters/${matterId}/output/${result.id}`);
  revalidatePath(`/matters/${matterId}/overview`);
  redirect(`/matters/${matterId}/output/${result.id}`);
}

export async function updateRevisedOutputAction(
  _prev: OutputMutationState,
  formData: FormData
): Promise<OutputMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, outputArtifactId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, outputArtifactId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const supabase = await createSupabaseServerClient();
  const result = await updateOutputArtifactFromForm(supabase, ctx, formData);

  if (result.error || !result.id) {
    return { error: result.error ?? "Save failed.", success: null, outputArtifactId: null };
  }

  revalidatePath(`/matters/${matterId}/output`);
  revalidatePath(`/matters/${matterId}/output/${result.id}`);
  return { error: null, success: "Saved.", outputArtifactId: result.id };
}

export async function archiveRevisedOutputAction(
  _prev: OutputMutationState,
  formData: FormData
): Promise<OutputMutationState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, outputArtifactId: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, outputArtifactId: null };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const outputArtifactId = String(formData.get("output_artifact_id") ?? "");
  const modeRaw = String(formData.get("archive_mode") ?? "archived");
  const mode = modeRaw === "superseded" ? "superseded" : "archived";

  const supabase = await createSupabaseServerClient();
  const result = await archiveOutputArtifact(supabase, ctx, { matterId, outputArtifactId, mode });

  if (result.error || !result.id) {
    return { error: result.error ?? "Archive failed.", success: null, outputArtifactId: null };
  }

  revalidatePath(`/matters/${matterId}/output`);
  revalidatePath(`/matters/${matterId}/output/${result.id}`);
  return { error: null, success: "Archived.", outputArtifactId: result.id };
}
