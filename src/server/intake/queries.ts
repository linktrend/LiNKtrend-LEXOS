import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";

export type IntakeRecordRow = Database["public"]["Tables"]["intake_records"]["Row"];
export type IntakeGroupRow = Database["public"]["Tables"]["intake_groups"]["Row"];
export type ClientCandidateRow = Database["public"]["Tables"]["client_candidates"]["Row"];
export type MatterCandidateRow = Database["public"]["Tables"]["matter_candidates"]["Row"];
export type IntakeTaskRow = Database["public"]["Tables"]["intake_tasks"]["Row"];

export type IntakeBundle = {
  intake: IntakeRecordRow;
  groups: IntakeGroupRow[];
  clientCandidates: ClientCandidateRow[];
  matterCandidates: MatterCandidateRow[];
  tasks: IntakeTaskRow[];
};

export async function listIntakeRecords(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  limit = 100
): Promise<IntakeRecordRow[]> {
  let q = supabase
    .from("intake_records")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(limit);
  if (!ctx.isAdmin) {
    q = q.eq("created_by", ctx.userId);
  }
  const { data, error } = await q;
  if (error || !data) return [];
  return data;
}

export async function getIntakeRecordById(
  supabase: SupabaseClient<Database>,
  intakeId: string,
  ctx: AuthContext
): Promise<IntakeRecordRow | null> {
  let q = supabase.from("intake_records").select("*").eq("id", intakeId);
  if (!ctx.isAdmin) {
    q = q.eq("created_by", ctx.userId);
  }
  const { data, error } = await q.maybeSingle();
  if (error || !data) return null;
  return data;
}

export async function getIntakeBundle(
  supabase: SupabaseClient<Database>,
  intakeId: string,
  ctx: AuthContext
): Promise<IntakeBundle | null> {
  const intake = await getIntakeRecordById(supabase, intakeId, ctx);
  if (!intake) return null;

  const [groupsRes, clientsRes, mattersRes, tasksRes] = await Promise.all([
    supabase.from("intake_groups").select("*").eq("intake_id", intakeId).order("created_at"),
    supabase.from("client_candidates").select("*").eq("intake_id", intakeId).order("created_at"),
    supabase.from("matter_candidates").select("*").eq("intake_id", intakeId).order("created_at"),
    supabase.from("intake_tasks").select("*").eq("intake_id", intakeId).order("created_at"),
  ]);

  return {
    intake,
    groups: groupsRes.data ?? [],
    clientCandidates: clientsRes.data ?? [],
    matterCandidates: mattersRes.data ?? [],
    tasks: tasksRes.data ?? [],
  };
}
