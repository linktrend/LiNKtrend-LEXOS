import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";

export type ClientRow = Database["public"]["Tables"]["clients"]["Row"];
export type MatterSummaryRow = Pick<
  Database["public"]["Tables"]["matters"]["Row"],
  "id" | "matter_name" | "status" | "current_workflow" | "updated_at"
>;

export async function listClients(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext
): Promise<ClientRow[]> {
  let q = supabase.from("clients").select("*").order("updated_at", { ascending: false });
  if (!ctx.isAdmin) {
    q = q.eq("created_by", ctx.userId);
  }
  const { data, error } = await q;
  if (error || !data) return [];
  return data;
}

export async function getClientById(
  supabase: SupabaseClient<Database>,
  clientId: string,
  ctx: AuthContext
): Promise<ClientRow | null> {
  let q = supabase.from("clients").select("*").eq("id", clientId);
  if (!ctx.isAdmin) {
    q = q.eq("created_by", ctx.userId);
  }
  const { data, error } = await q.maybeSingle();
  if (error || !data) return null;
  return data;
}

export async function listMattersForClient(
  supabase: SupabaseClient<Database>,
  clientId: string,
  ctx: AuthContext
): Promise<MatterSummaryRow[]> {
  let q = supabase
    .from("matters")
    .select("id, matter_name, status, current_workflow, updated_at")
    .eq("client_id", clientId)
    .order("updated_at", { ascending: false });
  if (!ctx.isAdmin) {
    q = q.eq("created_by", ctx.userId);
  }
  const { data, error } = await q;
  if (error || !data) return [];
  return data;
}
