import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";

export type MatterRow = Database["public"]["Tables"]["matters"]["Row"];
export type ClientRow = Database["public"]["Tables"]["clients"]["Row"];
export type WorkflowStateRow = Database["public"]["Tables"]["workflow_states"]["Row"];

export type MatterWithClient = MatterRow & {
  clients: Pick<ClientRow, "id" | "client_name"> | null;
};

export type MatterDashboardRow = Pick<
  MatterRow,
  "id" | "matter_name" | "status" | "current_workflow" | "updated_at" | "client_id"
> & {
  clients: Pick<ClientRow, "id" | "client_name"> | null;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidUuid(id: string): boolean {
  return UUID_RE.test(id);
}

export async function listMattersForDashboard(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  limit = 10
): Promise<MatterDashboardRow[]> {
  let q = supabase
    .from("matters")
    .select("id, matter_name, status, current_workflow, updated_at, client_id, clients(id, client_name)")
    .order("updated_at", { ascending: false })
    .limit(limit);
  if (!ctx.isAdmin) {
    q = q.eq("created_by", ctx.userId);
  }
  const { data, error } = await q;
  if (error || !data) return [];
  return data as MatterDashboardRow[];
}

export async function listAllMatters(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext
): Promise<MatterDashboardRow[]> {
  let q = supabase
    .from("matters")
    .select("id, matter_name, status, current_workflow, updated_at, client_id, clients(id, client_name)")
    .order("updated_at", { ascending: false });
  if (!ctx.isAdmin) {
    q = q.eq("created_by", ctx.userId);
  }
  const { data, error } = await q;
  if (error || !data) return [];
  return data as MatterDashboardRow[];
}

export async function getMatterBundle(
  supabase: SupabaseClient<Database>,
  matterId: string,
  ctx: AuthContext
): Promise<{ matter: MatterWithClient; workflow: WorkflowStateRow | null } | null> {
  if (!isValidUuid(matterId)) return null;

  const { data: matter, error: mErr } = await supabase
    .from("matters")
    .select("*, clients(id, client_name)")
    .eq("id", matterId)
    .maybeSingle();

  if (mErr || !matter) return null;

  const row = matter as MatterWithClient;
  if (!ctx.isAdmin && row.created_by !== ctx.userId) {
    return null;
  }

  const { data: workflow } = await supabase
    .from("workflow_states")
    .select("*")
    .eq("matter_id", matterId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return {
    matter: row,
    workflow: workflow as WorkflowStateRow | null,
  };
}
