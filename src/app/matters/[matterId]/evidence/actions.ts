"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext, assertCanMutate } from "@/server/auth/context";
import { uploadEvidence } from "@/server/evidence/mutations";
import type { EvidenceUploadState } from "./upload-state";

export async function uploadEvidenceAction(
  matterId: string,
  _prev: EvidenceUploadState,
  formData: FormData
): Promise<EvidenceUploadState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null };
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { error: "Missing file.", success: null };
  }

  const evidenceLabel = String(formData.get("evidence_label") ?? "").trim() || null;

  const supabase = await createSupabaseServerClient();
  const result = await uploadEvidence(supabase, ctx, {
    matterId,
    file,
    evidenceLabel,
  });

  if (result.error || !result.evidenceId) {
    return { error: result.error ?? "Upload failed.", success: null };
  }

  revalidatePath(`/matters/${matterId}/evidence`);
  revalidatePath(`/matters/${matterId}/evidence/${result.evidenceId}`);
  return { error: null, success: "File uploaded." };
}
