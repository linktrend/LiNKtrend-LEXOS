import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { isValidUuid } from "@/server/matters/queries";

const W2_MILESTONE_NEXT_ACTION = "Review assertions and proceed to support mapping";

/**
 * After a meaningful case story or assertions exist, nudge workflow next_action toward W5 prep.
 * Keeps current_workflow as W2; does not advance stage automatically.
 */
export async function advanceWorkflowAfterW2Milestone(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<void> {
  if (!isValidUuid(matterId)) return;

  const { data: wf, error } = await supabase
    .from("workflow_states")
    .select("id, workflow_status")
    .eq("matter_id", matterId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !wf) return;

  const patch: Database["public"]["Tables"]["workflow_states"]["Update"] = {
    next_action: W2_MILESTONE_NEXT_ACTION,
  };
  if (wf.workflow_status === "not_started") {
    patch.workflow_status = "in_progress";
  }

  await supabase.from("workflow_states").update(patch).eq("id", wf.id);
}

const W5_NEXT_ACTION = "Review support gaps and decide W6 strategy readiness";

/**
 * First non-archived support matrix item for the matter: move workflow W2→W5 and set next_action.
 * Does not advance to W6. Idempotent for subsequent items (current_workflow already W5).
 */
export async function advanceWorkflowToW5AfterFirstSupportItem(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<void> {
  if (!isValidUuid(matterId)) return;

  const { data: wf, error } = await supabase
    .from("workflow_states")
    .select("id, workflow_status, current_workflow")
    .eq("matter_id", matterId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !wf) return;

  const patch: Database["public"]["Tables"]["workflow_states"]["Update"] = {
    next_action: W5_NEXT_ACTION,
  };

  if (wf.workflow_status === "not_started") {
    patch.workflow_status = "in_progress";
  }

  if (wf.current_workflow === "W2") {
    patch.current_workflow = "W5";
    await supabase.from("matters").update({ current_workflow: "W5" }).eq("id", matterId);
  }

  await supabase.from("workflow_states").update(patch).eq("id", wf.id);
}
