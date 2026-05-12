"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext, assertCanMutate } from "@/server/auth/context";
import { isValidUuid } from "@/server/matters/queries";
import { runEvidenceExtraction } from "@/server/extraction/runner";
import { runExtractionQA } from "@/server/extraction/run-qa";
import type { ExtractionRunState } from "./run-extraction-state";
import type { ExtractionQaRunState } from "./run-qa-state";

export async function runExtractionAction(
  _prev: ExtractionRunState,
  formData: FormData
): Promise<ExtractionRunState> {
  const matterId = String(formData.get("matter_id") ?? "").trim();
  const evidenceId = String(formData.get("evidence_id") ?? "").trim();
  if (!isValidUuid(matterId) || !isValidUuid(evidenceId)) {
    return { error: "Invalid matter or evidence.", success: null };
  }

  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null };
  }

  const supabase = await createSupabaseServerClient();
  const result = await runEvidenceExtraction(supabase, ctx, matterId, evidenceId);
  if (!result.ok) {
    return { error: result.error, success: null };
  }

  revalidatePath(`/matters/${matterId}/evidence`);
  revalidatePath(`/matters/${matterId}/evidence/${evidenceId}`);
  return { error: null, success: "Extraction saved." };
}

export async function runExtractionQaAction(
  _prev: ExtractionQaRunState,
  formData: FormData
): Promise<ExtractionQaRunState> {
  const matterId = String(formData.get("matter_id") ?? "").trim();
  const evidenceId = String(formData.get("evidence_id") ?? "").trim();
  if (!isValidUuid(matterId) || !isValidUuid(evidenceId)) {
    return { error: "Invalid matter or evidence.", success: null };
  }

  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null };
  }

  const supabase = await createSupabaseServerClient();
  const result = await runExtractionQA(supabase, ctx, matterId, evidenceId);
  if (!result.ok) {
    return { error: result.error, success: null };
  }

  revalidatePath(`/matters/${matterId}/evidence`);
  revalidatePath(`/matters/${matterId}/evidence/${evidenceId}`);
  return { error: null, success: `QA: ${result.output.extraction_quality_status}` };
}
