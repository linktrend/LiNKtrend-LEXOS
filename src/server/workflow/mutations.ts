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

const W6_NEXT_ACTION = "Review strategy and identify research or argument drafting needs";

/**
 * After the first strategy memo is created for a matter: if workflow is still W5, advance to W6.
 * Strict W5→W6 only (does not jump from W2). Idempotent when already W6+.
 */
export async function advanceWorkflowToW6AfterFirstStrategyMemo(
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

  if (wf.current_workflow !== "W5") return;

  const patch: Database["public"]["Tables"]["workflow_states"]["Update"] = {
    current_workflow: "W6",
    next_action: W6_NEXT_ACTION,
  };

  if (wf.workflow_status === "not_started") {
    patch.workflow_status = "in_progress";
  }

  await supabase.from("matters").update({ current_workflow: "W6" }).eq("id", matterId);
  await supabase.from("workflow_states").update(patch).eq("id", wf.id);
}

const W7_NEXT_ACTION = "Review research findings and prepare argument drafting readiness";

/**
 * After the first research memo is created for a matter: if workflow is still W6, advance to W7.
 * Strict W6→W7 only. Idempotent when already W7+.
 */
export async function advanceWorkflowToW7AfterFirstResearchMemo(
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

  if (wf.current_workflow !== "W6") return;

  const patch: Database["public"]["Tables"]["workflow_states"]["Update"] = {
    current_workflow: "W7",
    next_action: W7_NEXT_ACTION,
  };

  if (wf.workflow_status === "not_started") {
    patch.workflow_status = "in_progress";
  }

  await supabase.from("matters").update({ current_workflow: "W7" }).eq("id", matterId);
  await supabase.from("workflow_states").update(patch).eq("id", wf.id);
}

const W8_NEXT_ACTION = "Review argument draft and prepare adversarial analysis";

/**
 * After the first argument draft is created for a matter: if workflow is still W7, advance to W8.
 * Strict W7→W8 only. Idempotent when already W8+.
 */
export async function advanceWorkflowToW8AfterFirstArgumentDraft(
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

  if (wf.current_workflow !== "W7") return;

  const patch: Database["public"]["Tables"]["workflow_states"]["Update"] = {
    current_workflow: "W8",
    next_action: W8_NEXT_ACTION,
  };

  if (wf.workflow_status === "not_started") {
    patch.workflow_status = "in_progress";
  }

  await supabase.from("matters").update({ current_workflow: "W8" }).eq("id", matterId);
  await supabase.from("workflow_states").update(patch).eq("id", wf.id);
}

const W9_NEXT_ACTION = "Review adversarial critique and resolve required fixes";

/**
 * After the first adversarial critique is created for a matter: if workflow is still W8, advance to W9.
 * Strict W8→W9 only. Idempotent when already W9+.
 */
export async function advanceWorkflowToW9AfterFirstAdversarialCritique(
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

  if (wf.current_workflow !== "W8") return;

  const patch: Database["public"]["Tables"]["workflow_states"]["Update"] = {
    current_workflow: "W9",
    next_action: W9_NEXT_ACTION,
  };

  if (wf.workflow_status === "not_started") {
    patch.workflow_status = "in_progress";
  }

  await supabase.from("matters").update({ current_workflow: "W9" }).eq("id", matterId);
  await supabase.from("workflow_states").update(patch).eq("id", wf.id);
}

const W11_NEXT_ACTION =
  "Review revised output and decide whether visual/presentation refinement is needed";

/**
 * After the first active revised output artifact is created: if workflow is still W9, advance to W11.
 * Strict W9→W11 only. Does not imply final external approval or filing readiness.
 */
export async function advanceWorkflowToW11AfterFirstRevisedOutput(
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

  if (wf.current_workflow !== "W9") return;

  const patch: Database["public"]["Tables"]["workflow_states"]["Update"] = {
    current_workflow: "W11",
    next_action: W11_NEXT_ACTION,
  };

  if (wf.workflow_status === "not_started") {
    patch.workflow_status = "in_progress";
  }

  await supabase.from("matters").update({ current_workflow: "W11" }).eq("id", matterId);
  await supabase.from("workflow_states").update(patch).eq("id", wf.id);
}
