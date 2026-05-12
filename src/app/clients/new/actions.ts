"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext, assertCanMutate } from "@/server/auth/context";
import { createClientRecord } from "@/server/clients/mutations";

export type ClientCreateState = { error: string | null };

export async function createClientAction(
  _prev: ClientCreateState,
  formData: FormData
): Promise<ClientCreateState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in." };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden." };
  }

  const supabase = await createSupabaseServerClient();
  const result = await createClientRecord(supabase, ctx, {
    client_name: String(formData.get("client_name") ?? ""),
    client_type: String(formData.get("client_type") ?? "") || null,
    jurisdiction: String(formData.get("jurisdiction") ?? "") || null,
    notes: String(formData.get("notes") ?? "") || null,
  });

  if (result.error || !result.clientId) {
    return { error: result.error ?? "Failed to create client." };
  }

  redirect(`/clients/${result.clientId}`);
}
