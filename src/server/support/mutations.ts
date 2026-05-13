import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";
import { insertAuditEvent } from "@/server/audit/log";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { getAssertionForMatter } from "@/server/assertions/queries";
import type { EvidenceExtractionRow } from "@/server/evidence/queries";
import { advanceWorkflowToW5AfterFirstSupportItem } from "@/server/workflow/mutations";
import { validateSupportMatrixLink } from "@/server/support/validation";
import {
  anyActiveContradictedLink,
  computeAssertionSupportStateFromLinks,
  type RollupLinkInput,
} from "@/server/support/rollup";
import { isSupportMatrixItemArchived, withArchivedMetadata } from "@/server/support/metadata";
import {
  countActiveSupportItemsForMatter,
  listActiveSupportLinksForAssertion,
  type SupportMatrixItemRow,
} from "@/server/support/queries";

const LINK_SUPPORT_STATES = new Set([
  "supported",
  "partially_supported",
  "unsupported",
  "contradicted",
  "pending",
]);

const RISK_LEVELS = new Set(["low", "moderate", "high", "critical"]);
const RELEVANCE = new Set(["low", "medium", "high"]);

export type MutationResult = { id: string | null; error: string | null };

function mergeMetadata(
  existing: Json | null,
  relevance: string | null
): Record<string, unknown> {
  const base =
    existing && typeof existing === "object" && !Array.isArray(existing)
      ? { ...(existing as Record<string, unknown>) }
      : {};
  if (relevance && RELEVANCE.has(relevance)) {
    base.relevance = relevance;
  } else {
    delete base.relevance;
  }
  return base;
}

async function syncAssertionSupportFromMatrix(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  matterId: string,
  assertionId: string
): Promise<void> {
  const links = await listActiveSupportLinksForAssertion(supabase, matterId, assertionId);
  const rollupInputs: RollupLinkInput[] = links.map((l) => ({
    support_state: l.support_state,
    extraction_id: l.extraction_id,
  }));

  const extIds = [
    ...new Set(
      rollupInputs.map((l) => l.extraction_id).filter((id): id is string => typeof id === "string" && isValidUuid(id))
    ),
  ];
  const extractionById = new Map<string, EvidenceExtractionRow>();
  if (extIds.length > 0) {
    const { data } = await supabase.from("evidence_extractions").select("*").in("id", extIds);
    for (const row of data ?? []) {
      extractionById.set((row as EvidenceExtractionRow).id, row as EvidenceExtractionRow);
    }
  }

  const computed = computeAssertionSupportStateFromLinks(rollupInputs, extractionById);
  const assertion = await getAssertionForMatter(supabase, matterId, assertionId);
  if (!assertion) return;

  const nextContradictionFlag =
    assertion.contradiction_flag === true || anyActiveContradictedLink(rollupInputs);

  const prevSupport = assertion.support_state ?? "";
  const prevFlag = assertion.contradiction_flag === true;

  if (prevSupport === computed && prevFlag === nextContradictionFlag) {
    return;
  }

  const { error } = await supabase
    .from("assertions")
    .update({
      support_state: computed,
      contradiction_flag: nextContradictionFlag,
      updated_by: ctx.userId,
    })
    .eq("id", assertionId)
    .eq("matter_id", matterId);

  if (error) return;

  if (prevSupport !== computed) {
    await insertAuditEvent(supabase, {
      event_type: "assertion_support_status_updated",
      actor_id: ctx.userId,
      client_id: assertion.client_id,
      matter_id: matterId,
      target_object_type: "assertion",
      target_object_id: assertionId,
      summary: "Assertion support_state recomputed from support matrix",
      metadata: {
        assertion_id: assertionId,
        matter_id: matterId,
        previous_support_state: prevSupport,
        support_state: computed,
        active_link_count: links.length,
      } as Json,
    });
  }
}

export type CreateSupportMatrixItemInput = {
  matterId: string;
  assertionId: string;
  evidenceId: string;
  extractionId: string | null;
  supportState: string;
  riskLevel: string | null;
  supportExplanation: string | null;
  evidenceExcerpt: string | null;
  notes: string | null;
  relevance: string | null;
};

export async function createSupportMatrixItem(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: CreateSupportMatrixItemInput
): Promise<MutationResult> {
  if (!isValidUuid(input.matterId)) return { id: null, error: "Invalid matter." };
  if (!LINK_SUPPORT_STATES.has(input.supportState)) {
    return { id: null, error: "Invalid support state." };
  }
  if (!isValidUuid(input.evidenceId)) {
    return { id: null, error: "Evidence is required for every support link." };
  }
  if (input.riskLevel && !RISK_LEVELS.has(input.riskLevel)) {
    return { id: null, error: "Invalid risk level." };
  }

  const bundle = await getMatterBundle(supabase, input.matterId, ctx);
  if (!bundle) return { id: null, error: "Matter not found or access denied." };

  const { matter } = bundle;
  const clientId = matter.client_id;

  const v = await validateSupportMatrixLink(
    supabase,
    input.matterId,
    clientId,
    input.assertionId,
    input.evidenceId,
    input.extractionId?.trim() && isValidUuid(input.extractionId.trim())
      ? input.extractionId.trim()
      : null
  );
  if (!v.ok) return { id: null, error: v.error };

  const activeBefore = await countActiveSupportItemsForMatter(supabase, input.matterId);

  const meta = mergeMetadata(null, input.relevance);
  const row: Database["public"]["Tables"]["support_matrix_items"]["Insert"] = {
    client_id: clientId,
    matter_id: input.matterId,
    assertion_id: input.assertionId,
    evidence_id: input.evidenceId,
    extraction_id:
      input.extractionId?.trim() && isValidUuid(input.extractionId.trim())
        ? input.extractionId.trim()
        : null,
    support_state: input.supportState,
    risk_level: input.riskLevel && RISK_LEVELS.has(input.riskLevel) ? input.riskLevel : null,
    support_explanation: input.supportExplanation?.trim() || null,
    evidence_excerpt: input.evidenceExcerpt?.trim() || null,
    notes: input.notes?.trim() || null,
    metadata: meta as Json,
    created_by: ctx.userId,
    updated_by: ctx.userId,
    privilege_status: v.assertion.privilege_status ?? "unknown",
    confidentiality_status: v.assertion.confidentiality_status ?? "unknown",
  };

  const { data: inserted, error: insErr } = await supabase
    .from("support_matrix_items")
    .insert(row)
    .select("id")
    .single();

  if (insErr || !inserted?.id) {
    return { id: null, error: insErr?.message ?? "Insert failed." };
  }

  if (activeBefore === 0) {
    await advanceWorkflowToW5AfterFirstSupportItem(supabase, input.matterId);
  }

  await syncAssertionSupportFromMatrix(supabase, ctx, input.matterId, input.assertionId);

  await insertAuditEvent(supabase, {
    event_type: "support_matrix_item_created",
    actor_id: ctx.userId,
    client_id: clientId,
    matter_id: input.matterId,
    target_object_type: "support_matrix_item",
    target_object_id: inserted.id,
    summary: "Support matrix item created",
    metadata: {
      support_matrix_item_id: inserted.id,
      assertion_id: input.assertionId,
      evidence_id: input.evidenceId,
      extraction_id: row.extraction_id,
      support_state: input.supportState,
      risk_level: row.risk_level,
      explanation_len: input.supportExplanation?.length ?? 0,
    } as Json,
  });

  return { id: inserted.id, error: null };
}

export type UpdateSupportMatrixItemInput = {
  matterId: string;
  itemId: string;
  evidenceId: string;
  extractionId: string | null;
  supportState: string;
  riskLevel: string | null;
  supportExplanation: string | null;
  evidenceExcerpt: string | null;
  notes: string | null;
  relevance: string | null;
};

export async function updateSupportMatrixItem(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: UpdateSupportMatrixItemInput
): Promise<MutationResult> {
  if (!isValidUuid(input.matterId) || !isValidUuid(input.itemId)) {
    return { id: null, error: "Invalid identifiers." };
  }
  if (!LINK_SUPPORT_STATES.has(input.supportState)) {
    return { id: null, error: "Invalid support state." };
  }
  if (!isValidUuid(input.evidenceId)) {
    return { id: null, error: "Evidence is required." };
  }
  if (input.riskLevel && !RISK_LEVELS.has(input.riskLevel)) {
    return { id: null, error: "Invalid risk level." };
  }

  const bundle = await getMatterBundle(supabase, input.matterId, ctx);
  if (!bundle) return { id: null, error: "Matter not found or access denied." };

  const { data: existing, error: exErr } = await supabase
    .from("support_matrix_items")
    .select("*")
    .eq("id", input.itemId)
    .eq("matter_id", input.matterId)
    .maybeSingle();

  if (exErr || !existing) return { id: null, error: "Support matrix item not found." };
  const prev = existing as SupportMatrixItemRow;
  if (isSupportMatrixItemArchived(prev.metadata)) {
    return { id: null, error: "Archived items cannot be edited." };
  }

  const clientId = bundle.matter.client_id;
  const v = await validateSupportMatrixLink(
    supabase,
    input.matterId,
    clientId,
    prev.assertion_id,
    input.evidenceId,
    input.extractionId?.trim() && isValidUuid(input.extractionId.trim())
      ? input.extractionId.trim()
      : null
  );
  if (!v.ok) return { id: null, error: v.error };

  const meta = mergeMetadata(prev.metadata, input.relevance);

  const { error: upErr } = await supabase
    .from("support_matrix_items")
    .update({
      evidence_id: input.evidenceId,
      extraction_id:
        input.extractionId?.trim() && isValidUuid(input.extractionId.trim())
          ? input.extractionId.trim()
          : null,
      support_state: input.supportState,
      risk_level: input.riskLevel && RISK_LEVELS.has(input.riskLevel) ? input.riskLevel : null,
      support_explanation: input.supportExplanation?.trim() || null,
      evidence_excerpt: input.evidenceExcerpt?.trim() || null,
      notes: input.notes?.trim() || null,
      metadata: meta as Json,
      updated_by: ctx.userId,
    })
    .eq("id", input.itemId)
    .eq("matter_id", input.matterId);

  if (upErr) return { id: null, error: upErr.message };

  await syncAssertionSupportFromMatrix(supabase, ctx, input.matterId, prev.assertion_id);

  await insertAuditEvent(supabase, {
    event_type: "support_matrix_item_updated",
    actor_id: ctx.userId,
    client_id: clientId,
    matter_id: input.matterId,
    target_object_type: "support_matrix_item",
    target_object_id: input.itemId,
    summary: "Support matrix item updated",
    metadata: {
      support_matrix_item_id: input.itemId,
      assertion_id: prev.assertion_id,
      evidence_id: input.evidenceId,
      extraction_id:
        input.extractionId?.trim() && isValidUuid(input.extractionId.trim())
          ? input.extractionId.trim()
          : null,
      support_state: input.supportState,
      risk_level: input.riskLevel,
      explanation_len: input.supportExplanation?.length ?? 0,
    } as Json,
  });

  return { id: input.itemId, error: null };
}

export async function archiveSupportMatrixItem(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  matterId: string,
  itemId: string
): Promise<MutationResult> {
  if (!isValidUuid(matterId) || !isValidUuid(itemId)) {
    return { id: null, error: "Invalid identifiers." };
  }

  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) return { id: null, error: "Matter not found or access denied." };

  const { data: existing, error: exErr } = await supabase
    .from("support_matrix_items")
    .select("*")
    .eq("id", itemId)
    .eq("matter_id", matterId)
    .maybeSingle();
  if (exErr || !existing) return { id: null, error: "Support matrix item not found." };
  const row = existing as SupportMatrixItemRow;
  if (isSupportMatrixItemArchived(row.metadata)) {
    return { id: itemId, error: null };
  }

  const meta = withArchivedMetadata(row.metadata, true);
  const { error: upErr } = await supabase
    .from("support_matrix_items")
    .update({
      metadata: meta as Json,
      updated_by: ctx.userId,
    })
    .eq("id", itemId)
    .eq("matter_id", matterId);

  if (upErr) return { id: null, error: upErr.message };

  await syncAssertionSupportFromMatrix(supabase, ctx, matterId, row.assertion_id);

  await insertAuditEvent(supabase, {
    event_type: "support_matrix_item_archived",
    actor_id: ctx.userId,
    client_id: bundle.matter.client_id,
    matter_id: matterId,
    target_object_type: "support_matrix_item",
    target_object_id: itemId,
    summary: "Support matrix item archived",
    metadata: {
      support_matrix_item_id: itemId,
      assertion_id: row.assertion_id,
      evidence_id: row.evidence_id,
      extraction_id: row.extraction_id,
    } as Json,
  });

  return { id: itemId, error: null };
}
