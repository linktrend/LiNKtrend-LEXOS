import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";
import { insertAuditEvent } from "@/server/audit/log";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { advanceWorkflowAfterW2Milestone } from "@/server/workflow/mutations";
import { getAssertionForMatter } from "@/server/assertions/queries";
import { getPrimaryCaseStoryForMatter } from "@/server/story/queries";

const TRUTH_STATES = new Set([
  "verified",
  "client_confirmed",
  "opposing_party_alleged",
  "partially_supported",
  "pending_verification",
  "unsupported",
  "contradicted",
  "rejected",
  "superseded",
]);

const SUPPORT_STATES = new Set(["supported", "partially_supported", "unsupported", "contradicted", "pending"]);

const USE_STATUSES = new Set(["usable", "use_with_caution", "do_not_use", "pending_review", "superseded"]);

const NEXT_SUPPORT = new Set(["none", "evidence", "research", "client"]);
const MATERIALITY = new Set(["low", "medium", "high"]);

function asRecord(meta: Json | null): Record<string, unknown> {
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) return {};
  return { ...(meta as Record<string, unknown>) };
}

function buildMetadataPatch(input: {
  materiality: string | null;
  nextSupportAction: string | null;
  gaps: string | null;
  vulnerability: string | null;
}): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (input.materiality && MATERIALITY.has(input.materiality)) {
    out.materiality = input.materiality;
  }
  if (input.nextSupportAction && NEXT_SUPPORT.has(input.nextSupportAction)) {
    out.next_support_action = input.nextSupportAction;
  } else {
    out.next_support_action = "none";
  }
  if (input.gaps !== undefined && input.gaps !== null) {
    const t = input.gaps.trim();
    out.gaps = t.length ? t.slice(0, 4000) : null;
  }
  if (input.vulnerability !== undefined && input.vulnerability !== null) {
    const t = input.vulnerability.trim();
    out.vulnerability = t.length ? t.slice(0, 4000) : null;
  }
  return out;
}

export type CreateAssertionInput = {
  matterId: string;
  assertionText: string;
  assertionType: string | null;
  truthState: string | null;
  supportState: string | null;
  useStatus: string | null;
  contradictionFlag: boolean;
  notes: string | null;
  caseStoryId: string | null;
  materiality: string | null;
  nextSupportAction: string | null;
  gaps: string | null;
  vulnerability: string | null;
};

export type MutationResult = { id: string | null; error: string | null };

export async function createAssertion(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: CreateAssertionInput
): Promise<MutationResult> {
  if (!isValidUuid(input.matterId)) return { id: null, error: "Invalid matter." };

  const bundle = await getMatterBundle(supabase, input.matterId, ctx);
  if (!bundle) return { id: null, error: "Matter not found or access denied." };

  const text = input.assertionText.trim();
  if (!text) return { id: null, error: "Assertion text is required." };

  const { matter } = bundle;

  let caseStoryId: string | null = null;
  if (input.caseStoryId && isValidUuid(input.caseStoryId)) {
    const story = await getPrimaryCaseStoryForMatter(supabase, input.matterId);
    if (story && story.id === input.caseStoryId) {
      caseStoryId = story.id;
    }
  }

  const truthState =
    input.truthState && TRUTH_STATES.has(input.truthState) ? input.truthState : "pending_verification";
  const supportState =
    input.supportState && SUPPORT_STATES.has(input.supportState) ? input.supportState : "pending";
  const useStatus =
    input.useStatus && USE_STATUSES.has(input.useStatus) ? input.useStatus : "pending_review";

  const metaPatch = buildMetadataPatch({
    materiality: input.materiality,
    nextSupportAction: input.nextSupportAction,
    gaps: input.gaps,
    vulnerability: input.vulnerability,
  });

  const { data: row, error } = await supabase
    .from("assertions")
    .insert({
      client_id: matter.client_id,
      matter_id: input.matterId,
      case_story_id: caseStoryId,
      assertion_text: text,
      assertion_type: input.assertionType?.trim() || null,
      truth_state: truthState,
      support_state: supportState,
      use_status: useStatus,
      contradiction_flag: input.contradictionFlag,
      notes: input.notes?.trim() || null,
      metadata: metaPatch as Json,
      created_by: ctx.userId,
      updated_by: ctx.userId,
      confidentiality_status: matter.confidentiality_status ?? "unknown",
      privilege_status: matter.privilege_status ?? "unknown",
    })
    .select("id")
    .single();

  if (error || !row) return { id: null, error: error?.message ?? "Failed to create assertion." };

  const audit = await insertAuditEvent(supabase, {
    event_type: "assertion_created",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: matter.client_id,
    matter_id: input.matterId,
    target_object_type: "assertions",
    target_object_id: row.id,
    summary: "Assertion created",
    metadata: {
      matter_id: input.matterId,
      assertion_id: row.id,
      case_story_id: caseStoryId,
      text_len: text.length,
    },
  });
  if (audit.error) return { id: null, error: `Audit failure: ${audit.error}` };

  await advanceWorkflowAfterW2Milestone(supabase, input.matterId);

  return { id: row.id, error: null };
}

export type UpdateAssertionInput = CreateAssertionInput & { assertionId: string };

export async function updateAssertion(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: UpdateAssertionInput
): Promise<MutationResult> {
  if (!isValidUuid(input.matterId) || !isValidUuid(input.assertionId)) {
    return { id: null, error: "Invalid matter or assertion." };
  }

  const bundle = await getMatterBundle(supabase, input.matterId, ctx);
  if (!bundle) return { id: null, error: "Matter not found or access denied." };

  const existing = await getAssertionForMatter(supabase, input.matterId, input.assertionId);
  if (!existing) return { id: null, error: "Assertion not found." };

  const text = input.assertionText.trim();
  if (!text) return { id: null, error: "Assertion text is required." };

  const { matter } = bundle;

  let caseStoryId: string | null = existing.case_story_id;
  if (input.caseStoryId === "none" || input.caseStoryId === "") {
    caseStoryId = null;
  } else if (input.caseStoryId && isValidUuid(input.caseStoryId)) {
    const story = await getPrimaryCaseStoryForMatter(supabase, input.matterId);
    if (story && story.id === input.caseStoryId) caseStoryId = story.id;
  }

  const truthState =
    input.truthState && TRUTH_STATES.has(input.truthState) ? input.truthState : existing.truth_state;
  const supportState =
    input.supportState && SUPPORT_STATES.has(input.supportState) ? input.supportState : existing.support_state;
  const useStatus =
    input.useStatus && USE_STATUSES.has(input.useStatus) ? input.useStatus : existing.use_status;

  const prevMeta = asRecord(existing.metadata);
  const metaPatch = buildMetadataPatch({
    materiality: input.materiality,
    nextSupportAction: input.nextSupportAction,
    gaps: input.gaps,
    vulnerability: input.vulnerability,
  });
  const merged: Record<string, unknown> = { ...prevMeta, ...metaPatch };
  if (prevMeta.archived === true) {
    merged.archived = true;
    if (typeof prevMeta.archived_at === "string") merged.archived_at = prevMeta.archived_at;
  }

  const { data: row, error } = await supabase
    .from("assertions")
    .update({
      assertion_text: text,
      assertion_type: input.assertionType?.trim() || null,
      truth_state: truthState,
      support_state: supportState,
      use_status: useStatus,
      contradiction_flag: input.contradictionFlag,
      notes: input.notes?.trim() || null,
      case_story_id: caseStoryId,
      metadata: merged as Json,
      updated_by: ctx.userId,
    })
    .eq("id", input.assertionId)
    .eq("matter_id", input.matterId)
    .select("id")
    .single();

  if (error || !row) return { id: null, error: error?.message ?? "Failed to update assertion." };

  const audit = await insertAuditEvent(supabase, {
    event_type: "assertion_updated",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: matter.client_id,
    matter_id: input.matterId,
    target_object_type: "assertions",
    target_object_id: row.id,
    summary: "Assertion updated",
    metadata: {
      matter_id: input.matterId,
      assertion_id: row.id,
      text_len: text.length,
    },
  });
  if (audit.error) return { id: null, error: `Audit failure: ${audit.error}` };

  return { id: row.id, error: null };
}

export async function archiveAssertion(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  matterId: string,
  assertionId: string
): Promise<MutationResult> {
  if (!isValidUuid(matterId) || !isValidUuid(assertionId)) {
    return { id: null, error: "Invalid matter or assertion." };
  }

  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) return { id: null, error: "Matter not found or access denied." };

  const existing = await getAssertionForMatter(supabase, matterId, assertionId);
  if (!existing) return { id: null, error: "Assertion not found." };

  const { matter } = bundle;
  const merged = asRecord(existing.metadata);
  merged.archived = true;
  merged.archived_at = new Date().toISOString();

  const { data: row, error } = await supabase
    .from("assertions")
    .update({
      use_status: "superseded",
      metadata: merged as Json,
      updated_by: ctx.userId,
    })
    .eq("id", assertionId)
    .eq("matter_id", matterId)
    .select("id")
    .single();

  if (error || !row) return { id: null, error: error?.message ?? "Failed to archive assertion." };

  const audit = await insertAuditEvent(supabase, {
    event_type: "assertion_archived",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: matter.client_id,
    matter_id: matterId,
    target_object_type: "assertions",
    target_object_id: row.id,
    summary: "Assertion archived",
    metadata: {
      matter_id: matterId,
      assertion_id: row.id,
    },
  });
  if (audit.error) return { id: null, error: `Audit failure: ${audit.error}` };

  return { id: row.id, error: null };
}
