import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";
import { insertAuditEvent } from "@/server/audit/log";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { advanceWorkflowToW11AfterFirstRevisedOutput } from "@/server/workflow/mutations";
import { getArgumentDraftForMatter } from "@/server/argument/queries";
import { getAdversarialCritiqueForMatter, countActiveAdversarialCritiquesForMatter } from "@/server/adversarial/queries";
import {
  countActiveOutputArtifactsForMatter,
  getOutputArtifactForMatter,
} from "@/server/output/queries";
import { buildCaveatSnapshot } from "@/server/output/summary";
import {
  emptyRevisedSections,
  mergeRevisedSectionsMetadata,
  parseRevisedSectionsFromForm,
} from "@/features/output/template-json";

const OUTPUT_STATUSES = new Set([
  "draft",
  "under_review",
  "approved_internal",
  "final_internal",
  "superseded",
  "archived",
]);

const REVIEW_STATUSES = new Set([
  "not_reviewed",
  "under_review",
  "approved",
  "approved_with_changes",
  "rejected",
  "needs_more_evidence",
  "needs_more_research",
  "needs_client_clarification",
  "risk_accepted",
  "deferred",
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

export type OutputArtifactMutationResult = { id: string | null; error: string | null };

export type CreateOutputArtifactInput = {
  matterId: string;
  argumentDraftId: string;
  adversarialCritiqueId: string;
  title: string;
  overrideW9Prereq: boolean;
  overrideReason: string;
};

export async function createOutputArtifact(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: CreateOutputArtifactInput
): Promise<OutputArtifactMutationResult> {
  const { matterId, argumentDraftId, adversarialCritiqueId, title, overrideW9Prereq, overrideReason } = input;
  if (!isValidUuid(matterId) || !isValidUuid(argumentDraftId) || !isValidUuid(adversarialCritiqueId)) {
    return { id: null, error: "Invalid matter, argument draft, or adversarial critique." };
  }

  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const { matter } = bundle;

  const draft = await getArgumentDraftForMatter(supabase, matterId, argumentDraftId);
  if (!draft || draft.status === "archived" || draft.status === "superseded") {
    return { id: null, error: "Argument draft not found or not available." };
  }

  const critique = await getAdversarialCritiqueForMatter(supabase, matterId, adversarialCritiqueId);
  if (!critique || critique.status === "archived" || critique.status === "superseded") {
    return { id: null, error: "Adversarial critique not found or not available." };
  }

  const activeCritiques = await countActiveAdversarialCritiquesForMatter(supabase, matterId);
  const trimmedOverride = overrideReason.trim();

  if (activeCritiques === 0) {
    if (!overrideW9Prereq || trimmedOverride.length < 8) {
      return {
        id: null,
        error:
          "No active adversarial critique on this matter. Add a critique first, or confirm override with a detailed reason (8+ characters).",
      };
    }
  }

  const beforeActiveOutputs = await countActiveOutputArtifactsForMatter(supabase, matterId);

  const sections = emptyRevisedSections();
  const caveat_snapshot = await buildCaveatSnapshot(supabase, matterId);

  const meta: Record<string, unknown> = {
    argument_draft_id: argumentDraftId,
    adversarial_critique_id: adversarialCritiqueId,
    revised_sections: sections,
    caveat_snapshot,
  };
  if (overrideW9Prereq && activeCritiques === 0) {
    meta.operator_override_w9_prereq = true;
    meta.operator_override_reason = trimmedOverride;
  }

  const row: Database["public"]["Tables"]["output_artifacts"]["Insert"] = {
    client_id: matter.client_id,
    matter_id: matterId,
    artifact_type: "revised_output_mvp_v1",
    title: title.trim() || "Revised output (draft)",
    content_markdown: null,
    content_uri: null,
    workflow_origin: "W11",
    status: "draft",
    version: 1,
    supersedes_artifact_id: null,
    source_ids: null,
    evidence_ids: null,
    assertion_ids: null,
    risk_ids: null,
    review_status: "not_reviewed",
    reviewed_by: null,
    reviewed_at: null,
    created_by: ctx.userId,
    updated_by: ctx.userId,
    model_used: null,
    prompt_version: null,
    privilege_status:
      matter.privilege_status && PRIVILEGE.has(matter.privilege_status) ? matter.privilege_status : "unknown",
    confidentiality_status:
      matter.confidentiality_status && CONFIDENTIALITY.has(matter.confidentiality_status)
        ? matter.confidentiality_status
        : "unknown",
    notes: null,
    metadata: meta as Json,
  };

  const { data, error } = await supabase.from("output_artifacts").insert(row).select("id").single();
  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to create revised output." };
  }

  const id = data.id;

  await insertAuditEvent(supabase, {
    event_type: "output_artifact_created",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: matter.client_id,
    matter_id: matterId,
    target_object_type: "output_artifacts",
    target_object_id: id,
    summary: "Revised output artifact created",
    metadata: {
      output_artifact_id: id,
      matter_id: matterId,
      argument_draft_id: argumentDraftId,
      adversarial_critique_id: adversarialCritiqueId,
      status: "draft",
      review_status: "not_reviewed",
      caveat_snapshot_changed: true,
      operator_override: Boolean(meta.operator_override_w9_prereq),
    } as Json,
  });

  if (beforeActiveOutputs === 0) {
    await advanceWorkflowToW11AfterFirstRevisedOutput(supabase, matterId);
  }

  return { id, error: null };
}

export async function updateOutputArtifactFromForm(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  form: FormData
): Promise<OutputArtifactMutationResult> {
  const matterId = String(form.get("matter_id") ?? "");
  const outputArtifactId = String(form.get("output_artifact_id") ?? "");
  if (!isValidUuid(matterId) || !isValidUuid(outputArtifactId)) {
    return { id: null, error: "Invalid matter or output artifact." };
  }

  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const existing = await getOutputArtifactForMatter(supabase, matterId, outputArtifactId);
  if (!existing) {
    return { id: null, error: "Output artifact not found." };
  }
  if (existing.status === "archived" || existing.status === "superseded") {
    return { id: null, error: "Cannot edit an archived or superseded output artifact." };
  }

  const title = String(form.get("title") ?? "").trim() || "Revised output (draft)";
  const contentMarkdown = String(form.get("content_markdown") ?? "") || null;
  const notes = String(form.get("notes") ?? "").trim() || null;

  const statusRaw = String(form.get("status") ?? "draft");
  const status = OUTPUT_STATUSES.has(statusRaw) ? statusRaw : "draft";
  if (status === "archived" || status === "superseded") {
    return { id: null, error: "Use archive action for archived or superseded status." };
  }

  const reviewRaw = String(form.get("review_status") ?? "not_reviewed");
  const review_status = REVIEW_STATUSES.has(reviewRaw) ? reviewRaw : "not_reviewed";

  const sections = parseRevisedSectionsFromForm(form);
  const prevMeta =
    existing.metadata && typeof existing.metadata === "object" && !Array.isArray(existing.metadata)
      ? (existing.metadata as Record<string, unknown>)
      : {};
  const mergedMeta = mergeRevisedSectionsMetadata(existing.metadata, sections) as Record<string, unknown>;
  if (typeof prevMeta.argument_draft_id === "string") {
    mergedMeta.argument_draft_id = prevMeta.argument_draft_id;
  }
  if (typeof prevMeta.adversarial_critique_id === "string") {
    mergedMeta.adversarial_critique_id = prevMeta.adversarial_critique_id;
  }

  const newSnapshot = await buildCaveatSnapshot(supabase, matterId);
  const prevSnap = JSON.stringify(prevMeta.caveat_snapshot ?? null);
  const nextSnap = JSON.stringify(newSnapshot);
  mergedMeta.caveat_snapshot = newSnapshot;

  const patch: Database["public"]["Tables"]["output_artifacts"]["Update"] = {
    title,
    content_markdown: contentMarkdown,
    notes,
    status,
    review_status,
    updated_by: ctx.userId,
    metadata: mergedMeta as Json,
  };

  const { error } = await supabase.from("output_artifacts").update(patch).eq("id", outputArtifactId).eq("matter_id", matterId);
  if (error) {
    return { id: null, error: error.message };
  }

  await insertAuditEvent(supabase, {
    event_type: "output_artifact_updated",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: bundle.matter.client_id,
    matter_id: matterId,
    target_object_type: "output_artifacts",
    target_object_id: outputArtifactId,
    summary: "Revised output updated",
    metadata: {
      output_artifact_id: outputArtifactId,
      matter_id: matterId,
      status,
      review_status,
      caveat_snapshot_changed: prevSnap !== nextSnap,
    } as Json,
  });

  if (prevSnap !== nextSnap) {
    await insertAuditEvent(supabase, {
      event_type: "w9_caveat_carried_forward",
      actor_id: ctx.userId,
      actor_type: "user",
      client_id: bundle.matter.client_id,
      matter_id: matterId,
      target_object_type: "output_artifacts",
      target_object_id: outputArtifactId,
      summary: "Caveat snapshot refreshed on revised output",
      metadata: {
        output_artifact_id: outputArtifactId,
        matter_id: matterId,
      } as Json,
    });
  }

  return { id: outputArtifactId, error: null };
}

export type ArchiveOutputArtifactInput = {
  matterId: string;
  outputArtifactId: string;
  mode: "archived" | "superseded";
};

export async function archiveOutputArtifact(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: ArchiveOutputArtifactInput
): Promise<OutputArtifactMutationResult> {
  const { matterId, outputArtifactId, mode } = input;
  if (!isValidUuid(matterId) || !isValidUuid(outputArtifactId)) {
    return { id: null, error: "Invalid matter or output artifact." };
  }

  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const existing = await getOutputArtifactForMatter(supabase, matterId, outputArtifactId);
  if (!existing) {
    return { id: null, error: "Output artifact not found." };
  }
  if (existing.status === "archived" || existing.status === "superseded") {
    return { id: null, error: "Already archived or superseded." };
  }

  const status = mode === "superseded" ? "superseded" : "archived";
  const meta =
    existing.metadata && typeof existing.metadata === "object" && !Array.isArray(existing.metadata)
      ? { ...(existing.metadata as Record<string, unknown>) }
      : {};
  meta.archived_at = new Date().toISOString();

  const { error } = await supabase
    .from("output_artifacts")
    .update({
      status,
      updated_by: ctx.userId,
      metadata: meta as Json,
    })
    .eq("id", outputArtifactId)
    .eq("matter_id", matterId);

  if (error) {
    return { id: null, error: error.message };
  }

  await insertAuditEvent(supabase, {
    event_type: "output_artifact_archived",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: bundle.matter.client_id,
    matter_id: matterId,
    target_object_type: "output_artifacts",
    target_object_id: outputArtifactId,
    summary: status === "superseded" ? "Revised output superseded" : "Revised output archived",
    metadata: {
      output_artifact_id: outputArtifactId,
      matter_id: matterId,
      status,
    } as Json,
  });

  return { id: outputArtifactId, error: null };
}
