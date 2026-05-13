import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";
import { insertAuditEvent } from "@/server/audit/log";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { advanceWorkflowToW9AfterFirstAdversarialCritique } from "@/server/workflow/mutations";
import {
  countAdversarialCritiquesForMatter,
  getAdversarialCritiqueForMatter,
} from "@/server/adversarial/queries";
import { getArgumentDraftForMatter } from "@/server/argument/queries";
import {
  adversarialSectionsToAttackMatrix,
  countAdversarialMatrixKeys,
} from "@/features/adversarial/template-json";
import {
  ADVERSARIAL_TEMPLATE_KEYS,
  LOOP_DECISION_VALUES,
  type AdversarialTemplateKey,
  type LoopDecisionValue,
} from "@/features/adversarial/template-keys";

const CRITIQUE_STATUSES = new Set([
  "draft",
  "under_review",
  "approved_internal",
  "final_internal",
  "superseded",
  "archived",
]);

const PRIVILEGE = new Set([
  "unknown",
  "not_privileged",
  "potentially_privileged",
  "privileged",
  "work_product",
  "restricted",
]);

const CONFIDENTIALITY = new Set([
  "unknown",
  "public",
  "internal",
  "confidential",
  "highly_confidential",
  "restricted",
]);

const LOOP_DECISION_SET = new Set<string>(LOOP_DECISION_VALUES);

const SEVERITY_OPTIONS = new Set(["low", "medium", "high", "critical"]);

export type AdversarialCritiqueMutationResult = { id: string | null; error: string | null };

function nextActionForLoopDecision(loop: LoopDecisionValue): string {
  switch (loop) {
    case "return_to_W5_support":
      return "Adversarial review: return to support matrix (W5) and address gaps before revised output.";
    case "return_to_W6_strategy":
      return "Adversarial review: return to strategy (W6) and revise positions.";
    case "return_to_W7_research":
      return "Adversarial review: return to research (W7) to close gaps.";
    case "return_to_W8_argument":
      return "Adversarial review: return to argument draft (W8) for revision.";
    case "proceed_to_revised_output_with_caveats":
      return "Adversarial review: proceed toward revised output (WP-22) only with listed caveats — not auto-generated here.";
    default:
      return "Review adversarial critique and resolve required fixes";
  }
}

async function syncWorkflowNextActionForLoopDecision(
  supabase: SupabaseClient<Database>,
  matterId: string,
  loopDecision: string | null
): Promise<void> {
  if (!isValidUuid(matterId) || !loopDecision || !LOOP_DECISION_SET.has(loopDecision)) return;

  const { data: wf, error } = await supabase
    .from("workflow_states")
    .select("id")
    .eq("matter_id", matterId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !wf) return;

  await supabase
    .from("workflow_states")
    .update({ next_action: nextActionForLoopDecision(loopDecision as LoopDecisionValue) })
    .eq("id", wf.id);
}

function parseAdversarialSectionsFromForm(form: FormData): Record<AdversarialTemplateKey, string> {
  const out = Object.fromEntries(ADVERSARIAL_TEMPLATE_KEYS.map((k) => [k, ""])) as Record<
    AdversarialTemplateKey,
    string
  >;
  for (const k of ADVERSARIAL_TEMPLATE_KEYS) {
    out[k] = String(form.get(`adversarial_matrix_${k}`) ?? "");
  }
  return out;
}

export async function createAdversarialCritique(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  matterId: string,
  argumentDraftId: string
): Promise<AdversarialCritiqueMutationResult> {
  if (!isValidUuid(matterId) || !isValidUuid(argumentDraftId)) {
    return { id: null, error: "Invalid matter or argument draft." };
  }

  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const draft = await getArgumentDraftForMatter(supabase, matterId, argumentDraftId);
  if (!draft) {
    return { id: null, error: "Argument draft not found for this matter." };
  }
  if (draft.status === "archived" || draft.status === "superseded") {
    return { id: null, error: "Cannot link to an archived or superseded argument draft." };
  }

  const { matter } = bundle;
  const before = await countAdversarialCritiquesForMatter(supabase, matterId);

  const emptyMatrix = adversarialSectionsToAttackMatrix(
    Object.fromEntries(ADVERSARIAL_TEMPLATE_KEYS.map((k) => [k, ""])) as Record<
      AdversarialTemplateKey,
      string
    >
  );

  const row: Database["public"]["Tables"]["adversarial_critiques"]["Insert"] = {
    client_id: matter.client_id,
    matter_id: matterId,
    argument_draft_id: argumentDraftId,
    title: "Untitled adversarial critique",
    content_markdown: null,
    attack_matrix: emptyMatrix,
    loop_decision: null,
    severity_summary: null,
    version: 1,
    status: "draft",
    workflow_origin: "W9",
    created_by: ctx.userId,
    updated_by: ctx.userId,
    model_used: null,
    prompt_version: null,
    privilege_status: matter.privilege_status && PRIVILEGE.has(matter.privilege_status)
      ? matter.privilege_status
      : "unknown",
    confidentiality_status:
      matter.confidentiality_status && CONFIDENTIALITY.has(matter.confidentiality_status)
        ? matter.confidentiality_status
        : "unknown",
    notes: null,
    metadata: null,
  };

  const { data, error } = await supabase.from("adversarial_critiques").insert(row).select("id").single();
  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to create adversarial critique." };
  }

  await insertAuditEvent(supabase, {
    event_type: "adversarial_critique_created",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: matter.client_id,
    matter_id: matterId,
    target_object_type: "adversarial_critiques",
    target_object_id: data.id,
    summary: "Adversarial critique created",
    metadata: {
      adversarial_critique_id: data.id,
      matter_id: matterId,
      argument_draft_id: argumentDraftId,
      status: "draft",
      title_len: (row.title ?? "").length,
      attack_matrix_keys: 0,
    } as Json,
  });

  if (before === 0) {
    await advanceWorkflowToW9AfterFirstAdversarialCritique(supabase, matterId);
  }

  return { id: data.id, error: null };
}

export type UpdateAdversarialCritiqueInput = {
  matterId: string;
  adversarialCritiqueId: string;
  title: string;
  contentMarkdown: string;
  notes: string | null;
  status: string;
  severitySummary: string | null;
  loopDecision: string | null;
  argumentDraftId: string;
  matrixSections: Record<AdversarialTemplateKey, string>;
};

export async function updateAdversarialCritique(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: UpdateAdversarialCritiqueInput
): Promise<AdversarialCritiqueMutationResult> {
  if (!isValidUuid(input.matterId) || !isValidUuid(input.adversarialCritiqueId)) {
    return { id: null, error: "Invalid matter or critique." };
  }

  const bundle = await getMatterBundle(supabase, input.matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const existing = await getAdversarialCritiqueForMatter(
    supabase,
    input.matterId,
    input.adversarialCritiqueId
  );
  if (!existing) {
    return { id: null, error: "Adversarial critique not found." };
  }

  if (existing.status === "archived" || existing.status === "superseded") {
    return { id: null, error: "Archived or superseded critiques cannot be edited." };
  }

  const status = CRITIQUE_STATUSES.has(input.status) ? input.status : "draft";
  if (status === "archived" || status === "superseded") {
    return { id: null, error: "Use archive to set archived or superseded status." };
  }

  const draft = await getArgumentDraftForMatter(supabase, input.matterId, input.argumentDraftId);
  if (!draft) {
    return { id: null, error: "Argument draft not found for this matter." };
  }
  if (draft.status === "archived" || draft.status === "superseded") {
    return { id: null, error: "Cannot link to an archived or superseded argument draft." };
  }

  let severity: string | null = null;
  if (input.severitySummary) {
    const s = input.severitySummary.trim();
    severity = SEVERITY_OPTIONS.has(s) ? s : null;
  }

  let loopDecision: string | null = null;
  if (input.loopDecision && LOOP_DECISION_SET.has(input.loopDecision)) {
    loopDecision = input.loopDecision;
  }

  const attackMatrix = adversarialSectionsToAttackMatrix(input.matrixSections);
  const title = input.title.trim() || "Untitled adversarial critique";
  const content = input.contentMarkdown.trim();
  const notes = input.notes?.trim() || null;

  const prevLoop = existing.loop_decision;
  const loopChanged = (prevLoop ?? "") !== (loopDecision ?? "");

  const nextVersion = (existing.version ?? 1) + 1;

  const { data, error } = await supabase
    .from("adversarial_critiques")
    .update({
      title,
      content_markdown: content || null,
      notes,
      status,
      severity_summary: severity,
      loop_decision: loopDecision,
      argument_draft_id: input.argumentDraftId,
      attack_matrix: attackMatrix,
      version: nextVersion,
      updated_by: ctx.userId,
    })
    .eq("id", input.adversarialCritiqueId)
    .eq("matter_id", input.matterId)
    .select("id")
    .single();

  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to update adversarial critique." };
  }

  if (loopChanged) {
    await insertAuditEvent(supabase, {
      event_type: "adversarial_loop_decision_recorded",
      actor_id: ctx.userId,
      actor_type: "user",
      client_id: bundle.matter.client_id,
      matter_id: input.matterId,
      target_object_type: "adversarial_critiques",
      target_object_id: data.id,
      summary: "Adversarial loop decision updated",
      metadata: {
        adversarial_critique_id: data.id,
        argument_draft_id: input.argumentDraftId,
        matter_id: input.matterId,
        old_loop_decision: prevLoop,
        new_loop_decision: loopDecision,
      } as Json,
    });

    if (loopDecision) {
      await syncWorkflowNextActionForLoopDecision(supabase, input.matterId, loopDecision);
    }
  }

  await insertAuditEvent(supabase, {
    event_type: "adversarial_critique_updated",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: bundle.matter.client_id,
    matter_id: input.matterId,
    target_object_type: "adversarial_critiques",
    target_object_id: data.id,
    summary: "Adversarial critique updated",
    metadata: {
      adversarial_critique_id: data.id,
      matter_id: input.matterId,
      argument_draft_id: input.argumentDraftId,
      status,
      title_len: title.length,
      content_len: content.length,
      attack_matrix_keys: countAdversarialMatrixKeys(attackMatrix),
      severity_summary: severity,
      loop_decision: loopDecision,
    } as Json,
  });

  return { id: data.id, error: null };
}

export async function updateAdversarialCritiqueFromForm(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  formData: FormData
): Promise<AdversarialCritiqueMutationResult> {
  const matterId = String(formData.get("matter_id") ?? "");
  const adversarialCritiqueId = String(formData.get("adversarial_critique_id") ?? "");
  const argumentDraftId = String(formData.get("argument_draft_id") ?? "");
  const loopRaw = String(formData.get("loop_decision") ?? "").trim();
  const severityRaw = String(formData.get("severity_summary") ?? "").trim();

  return updateAdversarialCritique(supabase, ctx, {
    matterId,
    adversarialCritiqueId,
    argumentDraftId,
    title: String(formData.get("title") ?? ""),
    contentMarkdown: String(formData.get("content_markdown") ?? ""),
    notes: String(formData.get("notes") ?? "").trim() || null,
    status: String(formData.get("status") ?? "draft"),
    severitySummary: severityRaw || null,
    loopDecision: loopRaw || null,
    matrixSections: parseAdversarialSectionsFromForm(formData),
  });
}

export type ArchiveAdversarialCritiqueInput = {
  matterId: string;
  adversarialCritiqueId: string;
  mode: "archived" | "superseded";
};

export async function archiveAdversarialCritique(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: ArchiveAdversarialCritiqueInput
): Promise<AdversarialCritiqueMutationResult> {
  if (!isValidUuid(input.matterId) || !isValidUuid(input.adversarialCritiqueId)) {
    return { id: null, error: "Invalid matter or critique." };
  }

  const bundle = await getMatterBundle(supabase, input.matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const existing = await getAdversarialCritiqueForMatter(
    supabase,
    input.matterId,
    input.adversarialCritiqueId
  );
  if (!existing) {
    return { id: null, error: "Adversarial critique not found." };
  }

  if (existing.status === "archived" || existing.status === "superseded") {
    return { id: existing.id, error: null };
  }

  const status = input.mode === "superseded" ? "superseded" : "archived";
  const meta =
    existing.metadata && typeof existing.metadata === "object" && !Array.isArray(existing.metadata)
      ? { ...(existing.metadata as Record<string, unknown>) }
      : {};
  meta.archived_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("adversarial_critiques")
    .update({
      status,
      metadata: meta as Json,
      updated_by: ctx.userId,
      version: (existing.version ?? 1) + 1,
    })
    .eq("id", input.adversarialCritiqueId)
    .eq("matter_id", input.matterId)
    .select("id")
    .single();

  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to archive adversarial critique." };
  }

  await insertAuditEvent(supabase, {
    event_type: "adversarial_critique_archived",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: bundle.matter.client_id,
    matter_id: input.matterId,
    target_object_type: "adversarial_critiques",
    target_object_id: data.id,
    summary: status === "superseded" ? "Adversarial critique superseded" : "Adversarial critique archived",
    metadata: {
      adversarial_critique_id: data.id,
      matter_id: input.matterId,
      argument_draft_id: existing.argument_draft_id,
      status,
      title_len: (existing.title ?? "").length,
      content_len: (existing.content_markdown ?? "").length,
    } as Json,
  });

  return { id: data.id, error: null };
}
