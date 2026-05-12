"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext, assertCanMutate } from "@/server/auth/context";
import { createIntakeRecord } from "@/server/intake/mutations";

export type IntakeCreateState = { error: string | null };

export async function createIntakeAction(_prev: IntakeCreateState, formData: FormData): Promise<IntakeCreateState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in." };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden." };
  }

  const supabase = await createSupabaseServerClient();
  const res = await createIntakeRecord(supabase, ctx, {
    intake_type: String(formData.get("intake_type") ?? "") || null,
    source: String(formData.get("source") ?? "") || null,
    urgency_level: String(formData.get("urgency_level") ?? "") || null,
    notes: String(formData.get("notes") ?? "") || null,
  });

  if (res.error || !res.intakeId) {
    return { error: res.error ?? "Failed to create intake." };
  }

  redirect(`/intake/${res.intakeId}`);
}
