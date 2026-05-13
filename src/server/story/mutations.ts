import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { AuthContext } from "@/server/auth/context";
import { insertAuditEvent } from "@/server/audit/log";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { advanceWorkflowAfterW2Milestone } from "@/server/workflow/mutations";
import { getPrimaryCaseStoryForMatter } from "@/server/story/queries";

export const CASE_STORY_MEANINGFUL_CONTENT_LEN = 40;

const CASE_STORY_STATUSES = new Set([
  "draft",
  "under_review",
  "approved_internal",
  "final_internal",
  "superseded",
  "archived",
]);

export type SaveCaseStoryInput = {
  matterId: string;
  storyId: string | null;
  title: string;
  contentMarkdown: string;
  status: string | null;
};

export type SaveCaseStoryResult = { storyId: string | null; error: string | null };

export async function saveCaseStory(
  supabase: SupabaseClient<Database>,
  ctx: AuthContext,
  input: SaveCaseStoryInput
): Promise<SaveCaseStoryResult> {
  if (!isValidUuid(input.matterId)) {
    return { storyId: null, error: "Invalid matter." };
  }

  const bundle = await getMatterBundle(supabase, input.matterId, ctx);
  if (!bundle) {
    return { storyId: null, error: "Matter not found or access denied." };
  }

  const { matter } = bundle;
  const title = input.title.trim() || null;
  const content = input.contentMarkdown.trim();
  const status =
    input.status && CASE_STORY_STATUSES.has(input.status) ? input.status : "draft";

  const contentLen = content.length;
  const titleLen = title?.length ?? 0;

  const baseRow = {
    title,
    content_markdown: content || null,
    status,
    updated_by: ctx.userId,
    workflow_origin: "W2",
  };

  if (input.storyId && isValidUuid(input.storyId)) {
    const existing = await getPrimaryCaseStoryForMatter(supabase, input.matterId);
    if (!existing || existing.id !== input.storyId) {
      return { storyId: null, error: "Case story not found for this matter." };
    }

    const nextVersion = (existing.version ?? 1) + 1;

    const { data, error } = await supabase
      .from("case_stories")
      .update({
        ...baseRow,
        version: nextVersion,
      })
      .eq("id", input.storyId)
      .eq("matter_id", input.matterId)
      .select("id")
      .single();

    if (error || !data) {
      return { storyId: null, error: error?.message ?? "Failed to update case story." };
    }

    const audit = await insertAuditEvent(supabase, {
      event_type: "case_story_updated",
      actor_id: ctx.userId,
      actor_type: "user",
      client_id: matter.client_id,
      matter_id: input.matterId,
      target_object_type: "case_stories",
      target_object_id: data.id,
      summary: "Case story updated",
      metadata: {
        matter_id: input.matterId,
        case_story_id: data.id,
        title_len: titleLen,
        content_len: contentLen,
      },
    });
    if (audit.error) {
      return { storyId: null, error: `Audit failure: ${audit.error}` };
    }

    if (contentLen >= CASE_STORY_MEANINGFUL_CONTENT_LEN) {
      await advanceWorkflowAfterW2Milestone(supabase, input.matterId);
    }

    return { storyId: data.id, error: null };
  }

  const { data: inserted, error: insErr } = await supabase
    .from("case_stories")
    .insert({
      client_id: matter.client_id,
      matter_id: input.matterId,
      ...baseRow,
      version: 1,
      created_by: ctx.userId,
      confidentiality_status: matter.confidentiality_status ?? "unknown",
      privilege_status: matter.privilege_status ?? "unknown",
    })
    .select("id")
    .single();

  if (insErr || !inserted) {
    return { storyId: null, error: insErr?.message ?? "Failed to create case story." };
  }

  const audit = await insertAuditEvent(supabase, {
    event_type: "case_story_created",
    actor_id: ctx.userId,
    actor_type: "user",
    client_id: matter.client_id,
    matter_id: input.matterId,
    target_object_type: "case_stories",
    target_object_id: inserted.id,
    summary: "Case story created",
    metadata: {
      matter_id: input.matterId,
      case_story_id: inserted.id,
      title_len: titleLen,
      content_len: contentLen,
    },
  });
  if (audit.error) {
    return { storyId: null, error: `Audit failure: ${audit.error}` };
  }

  if (contentLen >= CASE_STORY_MEANINGFUL_CONTENT_LEN) {
    await advanceWorkflowAfterW2Milestone(supabase, input.matterId);
  }

  return { storyId: inserted.id, error: null };
}
