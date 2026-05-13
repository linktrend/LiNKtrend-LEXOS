import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";
import { insertAuditEvent } from "@/server/audit/log";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { advanceWorkflowToW8AfterFirstArgumentDraft } from "@/server/workflow/mutations";
import { countArgumentDraftsForMatter, getArgumentDraftForMatter } from "@/server/argument/queries";
import { getResearchMemoForMatter } from "@/server/research/queries";
import { getStrategyMemoForMatter } from "@/server/strategy/queries";
import {
  mergeArgumentMetadata,
  countArgumentSectionKeys,
} from "@/features/argument/template-json";
import { ARGUMENT_TEMPLATE_KEYS, type ArgumentTemplateKey } from "@/features/argument/template-keys";

const DRAFT_STATUSES = new Set([
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

export type ArgumentDraftMutationResult = { id: string | null; error: string | null };

function parseArgumentSectionsFromForm(form: FormData): Record<ArgumentTemplateKey, string> {
  const out = Object.fromEntries(ARGUMENT_TEMPLATE_KEYS.map((k) => [k, ""])) as Record<
    ArgumentTemplateKey,
    string
  >;
  for (const k of ARGUMENT_TEMPLATE_KEYS) {
    out[k] = String(form.get(`argument_section_${k}`) ?? "");
  }
  return out;
}

export async function createArgumentDraft(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  matterId: string
): Promise<ArgumentDraftMutationResult> {
  if (!isValidUuid(matterId)) {
    return { id: null, error: "Invalid matter." };
  }

  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const { matter } = bundle;
  const before = await countArgumentDraftsForMatter(supabase, matterId);

  const initialMeta: Json = {
    argument_sections: {},
  } as Json;

  const row: Database["public"]["Tables"]["argument_drafts"]["Insert"] = {
    client_id: matter.client_id,
    matter_id: matterId,
    title: "Untitled argument draft",
    intended_audience: null,
    content_markdown: null,
    strategy_memo_id: null,
    research_memo_id: null,
    version: 1,
    status: "draft",
    workflow_origin: "W8",
    unsupported_claims: null,
    source_basis: null,
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
    metadata: initialMeta,
  };

  const { data, error } = await supabase.from("argument_drafts").insert(row).select("id").single();
  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to create argument draft." };
  }

  await insertAuditEvent(supabase, {
    event_type: "argument_draft_created",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: matter.client_id,
    matter_id: matterId,
    target_object_type: "argument_drafts",
    target_object_id: data.id,
    summary: "Argument draft created",
    metadata: {
      argument_draft_id: data.id,
      matter_id: matterId,
      status: "draft",
      title_len: (row.title ?? "").length,
      argument_section_keys: 0,
    } as Json,
  });

  if (before === 0) {
    await advanceWorkflowToW8AfterFirstArgumentDraft(supabase, matterId);
  }

  return { id: data.id, error: null };
}

export type UpdateArgumentDraftInput = {
  matterId: string;
  argumentDraftId: string;
  title: string;
  contentMarkdown: string;
  notes: string | null;
  status: string;
  intendedAudience: string | null;
  strategyMemoId: string | null;
  researchMemoId: string | null;
  argumentSections: Record<ArgumentTemplateKey, string>;
};

export async function updateArgumentDraft(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: UpdateArgumentDraftInput
): Promise<ArgumentDraftMutationResult> {
  if (!isValidUuid(input.matterId) || !isValidUuid(input.argumentDraftId)) {
    return { id: null, error: "Invalid matter or draft." };
  }

  const bundle = await getMatterBundle(supabase, input.matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const existing = await getArgumentDraftForMatter(supabase, input.matterId, input.argumentDraftId);
  if (!existing) {
    return { id: null, error: "Argument draft not found." };
  }

  if (existing.status === "archived" || existing.status === "superseded") {
    return { id: null, error: "Archived or superseded drafts cannot be edited." };
  }

  const status = DRAFT_STATUSES.has(input.status) ? input.status : "draft";
  if (status === "archived" || status === "superseded") {
    return { id: null, error: "Use archive to set archived or superseded status." };
  }

  let strategyMemoId: string | null = null;
  if (input.strategyMemoId && isValidUuid(input.strategyMemoId)) {
    const sm = await getStrategyMemoForMatter(supabase, input.matterId, input.strategyMemoId);
    if (!sm) {
      return { id: null, error: "Strategy memo not found for this matter." };
    }
    strategyMemoId = sm.id;
  }

  let researchMemoId: string | null = null;
  if (input.researchMemoId && isValidUuid(input.researchMemoId)) {
    const rm = await getResearchMemoForMatter(supabase, input.matterId, input.researchMemoId);
    if (!rm) {
      return { id: null, error: "Research memo not found for this matter." };
    }
    researchMemoId = rm.id;
  }

  const title = input.title.trim() || "Untitled argument draft";
  const content = input.contentMarkdown.trim();
  const notes = input.notes?.trim() || null;
  const intendedAudience = input.intendedAudience?.trim() || null;

  const mergedMeta = mergeArgumentMetadata(existing.metadata, input.argumentSections);

  const nextVersion = (existing.version ?? 1) + 1;

  const { data, error } = await supabase
    .from("argument_drafts")
    .update({
      title,
      content_markdown: content || null,
      notes,
      status,
      intended_audience: intendedAudience,
      strategy_memo_id: strategyMemoId,
      research_memo_id: researchMemoId,
      metadata: mergedMeta,
      version: nextVersion,
      updated_by: ctx.userId,
    })
    .eq("id", input.argumentDraftId)
    .eq("matter_id", input.matterId)
    .select("id")
    .single();

  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to update argument draft." };
  }

  await insertAuditEvent(supabase, {
    event_type: "argument_draft_updated",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: bundle.matter.client_id,
    matter_id: input.matterId,
    target_object_type: "argument_drafts",
    target_object_id: data.id,
    summary: "Argument draft updated",
    metadata: {
      argument_draft_id: data.id,
      matter_id: input.matterId,
      status,
      title_len: title.length,
      content_len: content.length,
      argument_section_keys: countArgumentSectionKeys(mergedMeta),
    } as Json,
  });

  return { id: data.id, error: null };
}

export async function updateArgumentDraftFromForm(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  formData: FormData
): Promise<ArgumentDraftMutationResult> {
  const matterId = String(formData.get("matter_id") ?? "");
  const argumentDraftId = String(formData.get("argument_draft_id") ?? "");
  const strategyRaw = String(formData.get("strategy_memo_id") ?? "").trim();
  const researchRaw = String(formData.get("research_memo_id") ?? "").trim();

  return updateArgumentDraft(supabase, ctx, {
    matterId,
    argumentDraftId,
    title: String(formData.get("title") ?? ""),
    contentMarkdown: String(formData.get("content_markdown") ?? ""),
    notes: String(formData.get("notes") ?? "").trim() || null,
    status: String(formData.get("status") ?? "draft"),
    intendedAudience: String(formData.get("intended_audience") ?? "").trim() || null,
    strategyMemoId: strategyRaw && strategyRaw !== "__none__" ? strategyRaw : null,
    researchMemoId: researchRaw && researchRaw !== "__none__" ? researchRaw : null,
    argumentSections: parseArgumentSectionsFromForm(formData),
  });
}

export type ArchiveArgumentDraftInput = {
  matterId: string;
  argumentDraftId: string;
  mode: "archived" | "superseded";
};

export async function archiveArgumentDraft(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: ArchiveArgumentDraftInput
): Promise<ArgumentDraftMutationResult> {
  if (!isValidUuid(input.matterId) || !isValidUuid(input.argumentDraftId)) {
    return { id: null, error: "Invalid matter or draft." };
  }

  const bundle = await getMatterBundle(supabase, input.matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const existing = await getArgumentDraftForMatter(supabase, input.matterId, input.argumentDraftId);
  if (!existing) {
    return { id: null, error: "Argument draft not found." };
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
    .from("argument_drafts")
    .update({
      status,
      metadata: meta as Json,
      updated_by: ctx.userId,
      version: (existing.version ?? 1) + 1,
    })
    .eq("id", input.argumentDraftId)
    .eq("matter_id", input.matterId)
    .select("id")
    .single();

  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to archive argument draft." };
  }

  await insertAuditEvent(supabase, {
    event_type: "argument_draft_archived",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: bundle.matter.client_id,
    matter_id: input.matterId,
    target_object_type: "argument_drafts",
    target_object_id: data.id,
    summary: status === "superseded" ? "Argument draft superseded" : "Argument draft archived",
    metadata: {
      argument_draft_id: data.id,
      matter_id: input.matterId,
      status,
      title_len: (existing.title ?? "").length,
      content_len: (existing.content_markdown ?? "").length,
    } as Json,
  });

  return { id: data.id, error: null };
}
