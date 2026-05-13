import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";
import { insertAuditEvent } from "@/server/audit/log";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { advanceWorkflowToW6AfterFirstStrategyMemo } from "@/server/workflow/mutations";
import { countStrategyMemosForMatter, getStrategyMemoForMatter } from "@/server/strategy/queries";
import {
  emptyStrategyPointsRecord,
  researchQuestionsFromResearchNeeded,
  strategyPointsToJson,
} from "@/features/strategy/template-json";
import type { StrategyTemplateKey } from "@/features/strategy/template-keys";
import { STRATEGY_TEMPLATE_KEYS } from "@/features/strategy/template-keys";

const MEMO_STATUSES = new Set([
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

export type StrategyMemoMutationResult = { id: string | null; error: string | null };

function countStrategyPointKeys(obj: Json | null): number {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return 0;
  return Object.keys(obj as Record<string, unknown>).length;
}

function parseStrategyPointsFromForm(form: FormData): Record<StrategyTemplateKey, string> {
  const out = emptyStrategyPointsRecord();
  for (const k of STRATEGY_TEMPLATE_KEYS) {
    out[k] = String(form.get(`strategy_point_${k}`) ?? "");
  }
  return out;
}

export async function createStrategyMemo(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  matterId: string
): Promise<StrategyMemoMutationResult> {
  if (!isValidUuid(matterId)) {
    return { id: null, error: "Invalid matter." };
  }

  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const { matter } = bundle;
  const before = await countStrategyMemosForMatter(supabase, matterId);

  const row: Database["public"]["Tables"]["strategy_memos"]["Insert"] = {
    client_id: matter.client_id,
    matter_id: matterId,
    title: "Untitled strategy memo",
    content_markdown: null,
    strategy_points: strategyPointsToJson(emptyStrategyPointsRecord()),
    research_questions: [] as unknown as Json,
    version: 1,
    status: "draft",
    workflow_origin: "W6",
    created_by: ctx.userId,
    updated_by: ctx.userId,
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

  const { data, error } = await supabase.from("strategy_memos").insert(row).select("id").single();
  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to create strategy memo." };
  }

  await insertAuditEvent(supabase, {
    event_type: "strategy_memo_created",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: matter.client_id,
    matter_id: matterId,
    target_object_type: "strategy_memos",
    target_object_id: data.id,
    summary: "Strategy memo created",
    metadata: {
      strategy_memo_id: data.id,
      matter_id: matterId,
      status: "draft",
      title_len: (row.title ?? "").length,
      content_len: 0,
      strategy_points_keys: 0,
    } as Json,
  });

  if (before === 0) {
    await advanceWorkflowToW6AfterFirstStrategyMemo(supabase, matterId);
  }

  return { id: data.id, error: null };
}

export type UpdateStrategyMemoInput = {
  matterId: string;
  strategyMemoId: string;
  title: string;
  contentMarkdown: string;
  notes: string | null;
  status: string;
  strategyPoints: Record<StrategyTemplateKey, string>;
};

export async function updateStrategyMemo(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: UpdateStrategyMemoInput
): Promise<StrategyMemoMutationResult> {
  if (!isValidUuid(input.matterId) || !isValidUuid(input.strategyMemoId)) {
    return { id: null, error: "Invalid matter or memo." };
  }

  const bundle = await getMatterBundle(supabase, input.matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const existing = await getStrategyMemoForMatter(supabase, input.matterId, input.strategyMemoId);
  if (!existing) {
    return { id: null, error: "Strategy memo not found." };
  }

  if (existing.status === "archived" || existing.status === "superseded") {
    return { id: null, error: "Archived or superseded memos cannot be edited." };
  }

  const status = MEMO_STATUSES.has(input.status) ? input.status : "draft";
  if (status === "archived" || status === "superseded") {
    return { id: null, error: "Use archive to set archived or superseded status." };
  }

  const title = input.title.trim() || "Untitled strategy memo";
  const content = input.contentMarkdown.trim();
  const notes = input.notes?.trim() || null;
  const spJson = strategyPointsToJson(input.strategyPoints);
  const researchNeeded = (input.strategyPoints.research_needed ?? "").trim();
  const rqJson = researchQuestionsFromResearchNeeded(input.strategyPoints.research_needed ?? "");

  const nextVersion = (existing.version ?? 1) + 1;

  const { data, error } = await supabase
    .from("strategy_memos")
    .update({
      title,
      content_markdown: content || null,
      notes,
      status,
      strategy_points: spJson,
      research_questions: rqJson,
      version: nextVersion,
      updated_by: ctx.userId,
    })
    .eq("id", input.strategyMemoId)
    .eq("matter_id", input.matterId)
    .select("id")
    .single();

  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to update strategy memo." };
  }

  await insertAuditEvent(supabase, {
    event_type: "strategy_memo_updated",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: bundle.matter.client_id,
    matter_id: input.matterId,
    target_object_type: "strategy_memos",
    target_object_id: data.id,
    summary: "Strategy memo updated",
    metadata: {
      strategy_memo_id: data.id,
      matter_id: input.matterId,
      status,
      title_len: title.length,
      content_len: content.length,
      strategy_points_keys: countStrategyPointKeys(spJson),
      research_questions_count: Array.isArray(rqJson) ? rqJson.length : 0,
      research_needed_len: researchNeeded.length,
    } as Json,
  });

  return { id: data.id, error: null };
}

export async function updateStrategyMemoFromForm(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  formData: FormData
): Promise<StrategyMemoMutationResult> {
  const matterId = String(formData.get("matter_id") ?? "");
  const strategyMemoId = String(formData.get("strategy_memo_id") ?? "");
  const strategyPoints = parseStrategyPointsFromForm(formData);

  return updateStrategyMemo(supabase, ctx, {
    matterId,
    strategyMemoId,
    title: String(formData.get("title") ?? ""),
    contentMarkdown: String(formData.get("content_markdown") ?? ""),
    notes: String(formData.get("notes") ?? "").trim() || null,
    status: String(formData.get("status") ?? "draft"),
    strategyPoints,
  });
}

export type ArchiveStrategyMemoInput = {
  matterId: string;
  strategyMemoId: string;
  mode: "archived" | "superseded";
};

export async function archiveStrategyMemo(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: ArchiveStrategyMemoInput
): Promise<StrategyMemoMutationResult> {
  if (!isValidUuid(input.matterId) || !isValidUuid(input.strategyMemoId)) {
    return { id: null, error: "Invalid matter or memo." };
  }

  const bundle = await getMatterBundle(supabase, input.matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const existing = await getStrategyMemoForMatter(supabase, input.matterId, input.strategyMemoId);
  if (!existing) {
    return { id: null, error: "Strategy memo not found." };
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
    .from("strategy_memos")
    .update({
      status,
      metadata: meta as Json,
      updated_by: ctx.userId,
      version: (existing.version ?? 1) + 1,
    })
    .eq("id", input.strategyMemoId)
    .eq("matter_id", input.matterId)
    .select("id")
    .single();

  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to archive strategy memo." };
  }

  await insertAuditEvent(supabase, {
    event_type: "strategy_memo_archived",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: bundle.matter.client_id,
    matter_id: input.matterId,
    target_object_type: "strategy_memos",
    target_object_id: data.id,
    summary: status === "superseded" ? "Strategy memo superseded" : "Strategy memo archived",
    metadata: {
      strategy_memo_id: data.id,
      matter_id: input.matterId,
      status,
      title_len: (existing.title ?? "").length,
      content_len: (existing.content_markdown ?? "").length,
    } as Json,
  });

  return { id: data.id, error: null };
}
