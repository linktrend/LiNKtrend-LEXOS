"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext, assertCanMutate } from "@/server/auth/context";
import { createMatterWithWorkflowAndAudits } from "@/server/matters/mutations";
import type { MatterPosture } from "@/types/domain";
import { MATTER_POSTURES } from "@/types/domain";

export type MatterCreateState = { error: string | null };

export async function createMatterAction(
  _prev: MatterCreateState,
  formData: FormData
): Promise<MatterCreateState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in." };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden." };
  }

  const clientId = String(formData.get("client_id") ?? "");
  const matterName = String(formData.get("matter_name") ?? "");
  const postureRaw = String(formData.get("posture") ?? "unknown");
  const posture = (MATTER_POSTURES.includes(postureRaw as MatterPosture)
    ? postureRaw
    : "unknown") as MatterPosture;

  const supabase = await createSupabaseServerClient();
  const result = await createMatterWithWorkflowAndAudits(supabase, ctx, {
    client_id: clientId,
    matter_name: matterName,
    posture,
    jurisdiction: String(formData.get("jurisdiction") ?? "") || null,
    matter_type: String(formData.get("matter_type") ?? "") || null,
  });

  if (result.error || !result.matterId) {
    return { error: result.error ?? "Failed to create matter." };
  }

  redirect(`/matters/${result.matterId}/overview`);
}
