import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";
import { insertAuditEvent } from "@/server/audit/log";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { advanceWorkflowToW7AfterFirstResearchMemo } from "@/server/workflow/mutations";
import { countResearchMemosForMatter, getResearchMemoForMatter } from "@/server/research/queries";
import {
  emptyResearchSectionsRecord,
  parseAuthoritiesJson,
  parseResearchIssuesJson,
  researchIssuesFromMetadata,
  researchIssuesToJson,
  researchSectionsToJson,
  type ResearchIssue,
} from "@/features/research/template-json";
import { RESEARCH_TEMPLATE_KEYS, type ResearchTemplateKey } from "@/features/research/template-keys";

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

export type ResearchMemoMutationResult = { id: string | null; error: string | null };

function countResearchSectionKeys(obj: Json | null): number {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return 0;
  return Object.keys(obj as Record<string, unknown>).length;
}

function parseResearchSectionsFromForm(form: FormData): Record<ResearchTemplateKey, string> {
  const out = emptyResearchSectionsRecord();
  for (const k of RESEARCH_TEMPLATE_KEYS) {
    out[k] = String(form.get(`research_section_${k}`) ?? "");
  }
  return out;
}

function mergeResearchMetadata(
  existing: Json | null,
  sections: Record<ResearchTemplateKey, string>,
  issues: ResearchIssue[],
  researchWorkflowStatus: string | null
): Json {
  const base: Record<string, unknown> =
    existing && typeof existing === "object" && !Array.isArray(existing)
      ? { ...(existing as Record<string, unknown>) }
      : {};

  base.research_sections = researchSectionsToJson(sections);
  base.research_issues = researchIssuesToJson(issues);

  const rw = researchWorkflowStatus?.trim();
  if (rw) {
    base.research_workflow_status = rw;
  } else {
    delete base.research_workflow_status;
  }

  return base as Json;
}

export async function createResearchMemo(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  matterId: string
): Promise<ResearchMemoMutationResult> {
  if (!isValidUuid(matterId)) {
    return { id: null, error: "Invalid matter." };
  }

  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const { matter } = bundle;
  const before = await countResearchMemosForMatter(supabase, matterId);

  const initialMeta: Json = {
    research_sections: researchSectionsToJson(emptyResearchSectionsRecord()),
    research_issues: [],
  } as Json;

  const row: Database["public"]["Tables"]["research_memos"]["Insert"] = {
    client_id: matter.client_id,
    matter_id: matterId,
    title: "Untitled research memo",
    research_question: null,
    jurisdiction: null,
    short_answer: null,
    content_markdown: null,
    authorities: null,
    adverse_authority_note: null,
    limitations: null,
    verification_status: "not_reviewed",
    version: 1,
    status: "draft",
    workflow_origin: "W7",
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
    metadata: initialMeta,
  };

  const { data, error } = await supabase.from("research_memos").insert(row).select("id").single();
  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to create research memo." };
  }

  await insertAuditEvent(supabase, {
    event_type: "research_memo_created",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: matter.client_id,
    matter_id: matterId,
    target_object_type: "research_memos",
    target_object_id: data.id,
    summary: "Research memo created",
    metadata: {
      research_memo_id: data.id,
      matter_id: matterId,
      status: "draft",
      title_len: (row.title ?? "").length,
      content_len: 0,
      research_section_keys: 0,
      research_issues_count: 0,
    } as Json,
  });

  if (before === 0) {
    await advanceWorkflowToW7AfterFirstResearchMemo(supabase, matterId);
  }

  return { id: data.id, error: null };
}

export type UpdateResearchMemoInput = {
  matterId: string;
  researchMemoId: string;
  title: string;
  contentMarkdown: string;
  notes: string | null;
  status: string;
  researchQuestion: string | null;
  shortAnswer: string | null;
  jurisdiction: string | null;
  limitations: string | null;
  adverseAuthorityNote: string | null;
  authoritiesJson: string;
  researchSections: Record<ResearchTemplateKey, string>;
  researchIssuesJson: string;
  researchWorkflowStatus: string | null;
};

async function auditResearchIssueStatusChanges(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  matterId: string,
  clientId: string,
  researchMemoId: string,
  oldIssues: ResearchIssue[],
  newIssues: ResearchIssue[]
): Promise<void> {
  const oldMap = new Map(oldIssues.map((i) => [i.id, i]));
  for (const n of newIssues) {
    const o = oldMap.get(n.id);
    if (!o || o.status === n.status) continue;
    await insertAuditEvent(supabase, {
      event_type: "research_issue_status_updated",
      actor_id: ctx.userId,
      actor_type: "user",
      client_id: clientId,
      matter_id: matterId,
      target_object_type: "research_memos",
      target_object_id: researchMemoId,
      summary: "Research issue status changed",
      metadata: {
        research_memo_id: researchMemoId,
        issue_id: n.id,
        old_status: o.status,
        new_status: n.status,
      } as Json,
    });
  }
}

export async function updateResearchMemo(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: UpdateResearchMemoInput
): Promise<ResearchMemoMutationResult> {
  if (!isValidUuid(input.matterId) || !isValidUuid(input.researchMemoId)) {
    return { id: null, error: "Invalid matter or memo." };
  }

  const bundle = await getMatterBundle(supabase, input.matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const existing = await getResearchMemoForMatter(supabase, input.matterId, input.researchMemoId);
  if (!existing) {
    return { id: null, error: "Research memo not found." };
  }

  if (existing.status === "archived" || existing.status === "superseded") {
    return { id: null, error: "Archived or superseded memos cannot be edited." };
  }

  const status = MEMO_STATUSES.has(input.status) ? input.status : "draft";
  if (status === "archived" || status === "superseded") {
    return { id: null, error: "Use archive to set archived or superseded status." };
  }

  const title = input.title.trim() || "Untitled research memo";
  const content = input.contentMarkdown.trim();
  const notes = input.notes?.trim() || null;
  const researchQuestion = input.researchQuestion?.trim() || null;
  const shortAnswer = input.shortAnswer?.trim() || null;
  const jurisdiction = input.jurisdiction?.trim() || null;
  const limitations = input.limitations?.trim() || null;
  const adverseAuthorityNote = input.adverseAuthorityNote?.trim() || null;
  const authorities = parseAuthoritiesJson(input.authoritiesJson);

  const oldIssues = researchIssuesFromMetadata(existing.metadata);
  const newIssues = parseResearchIssuesJson(input.researchIssuesJson);

  const sectionsJson = researchSectionsToJson(input.researchSections);
  const mergedMeta = mergeResearchMetadata(
    existing.metadata,
    input.researchSections,
    newIssues,
    input.researchWorkflowStatus
  );

  const nextVersion = (existing.version ?? 1) + 1;

  const { data, error } = await supabase
    .from("research_memos")
    .update({
      title,
      content_markdown: content || null,
      notes,
      status,
      research_question: researchQuestion,
      short_answer: shortAnswer,
      jurisdiction,
      limitations,
      adverse_authority_note: adverseAuthorityNote,
      authorities,
      metadata: mergedMeta,
      version: nextVersion,
      updated_by: ctx.userId,
    })
    .eq("id", input.researchMemoId)
    .eq("matter_id", input.matterId)
    .select("id")
    .single();

  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to update research memo." };
  }

  await auditResearchIssueStatusChanges(
    supabase,
    ctx,
    input.matterId,
    bundle.matter.client_id,
    input.researchMemoId,
    oldIssues,
    newIssues
  );

  await insertAuditEvent(supabase, {
    event_type: "research_memo_updated",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: bundle.matter.client_id,
    matter_id: input.matterId,
    target_object_type: "research_memos",
    target_object_id: data.id,
    summary: "Research memo updated",
    metadata: {
      research_memo_id: data.id,
      matter_id: input.matterId,
      status,
      title_len: title.length,
      content_len: content.length,
      research_section_keys: countResearchSectionKeys(sectionsJson),
      research_issues_count: newIssues.length,
    } as Json,
  });

  return { id: data.id, error: null };
}

export async function updateResearchMemoFromForm(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  formData: FormData
): Promise<ResearchMemoMutationResult> {
  const matterId = String(formData.get("matter_id") ?? "");
  const researchMemoId = String(formData.get("research_memo_id") ?? "");
  const researchSections = parseResearchSectionsFromForm(formData);
  const researchIssuesJson = String(formData.get("research_issues_json") ?? "[]");
  const researchWorkflowStatus = String(formData.get("research_workflow_status") ?? "").trim() || null;

  return updateResearchMemo(supabase, ctx, {
    matterId,
    researchMemoId,
    title: String(formData.get("title") ?? ""),
    contentMarkdown: String(formData.get("content_markdown") ?? ""),
    notes: String(formData.get("notes") ?? "").trim() || null,
    status: String(formData.get("status") ?? "draft"),
    researchQuestion: String(formData.get("research_question") ?? "").trim() || null,
    shortAnswer: String(formData.get("short_answer") ?? "").trim() || null,
    jurisdiction: String(formData.get("jurisdiction") ?? "").trim() || null,
    limitations: String(formData.get("limitations") ?? "").trim() || null,
    adverseAuthorityNote: String(formData.get("adverse_authority_note") ?? "").trim() || null,
    authoritiesJson: String(formData.get("authorities_json") ?? ""),
    researchSections,
    researchIssuesJson,
    researchWorkflowStatus,
  });
}

export type ArchiveResearchMemoInput = {
  matterId: string;
  researchMemoId: string;
  mode: "archived" | "superseded";
};

export async function archiveResearchMemo(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: ArchiveResearchMemoInput
): Promise<ResearchMemoMutationResult> {
  if (!isValidUuid(input.matterId) || !isValidUuid(input.researchMemoId)) {
    return { id: null, error: "Invalid matter or memo." };
  }

  const bundle = await getMatterBundle(supabase, input.matterId, ctx);
  if (!bundle) {
    return { id: null, error: "Matter not found or access denied." };
  }

  const existing = await getResearchMemoForMatter(supabase, input.matterId, input.researchMemoId);
  if (!existing) {
    return { id: null, error: "Research memo not found." };
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
    .from("research_memos")
    .update({
      status,
      metadata: meta as Json,
      updated_by: ctx.userId,
      version: (existing.version ?? 1) + 1,
    })
    .eq("id", input.researchMemoId)
    .eq("matter_id", input.matterId)
    .select("id")
    .single();

  if (error || !data) {
    return { id: null, error: error?.message ?? "Failed to archive research memo." };
  }

  await insertAuditEvent(supabase, {
    event_type: "research_memo_archived",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: bundle.matter.client_id,
    matter_id: input.matterId,
    target_object_type: "research_memos",
    target_object_id: data.id,
    summary: status === "superseded" ? "Research memo superseded" : "Research memo archived",
    metadata: {
      research_memo_id: data.id,
      matter_id: input.matterId,
      status,
      title_len: (existing.title ?? "").length,
      content_len: (existing.content_markdown ?? "").length,
    } as Json,
  });

  return { id: data.id, error: null };
}
