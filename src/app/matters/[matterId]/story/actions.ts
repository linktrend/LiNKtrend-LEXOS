"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext, assertCanMutate } from "@/server/auth/context";
import { saveCaseStory } from "@/server/story/mutations";
import type { SaveStoryState } from "./save-story-state";

export async function saveCaseStoryAction(
  prev: SaveStoryState,
  formData: FormData
): Promise<SaveStoryState> {
  const ctx = await getAuthContext();
  if (!ctx) return { error: "Not signed in.", success: null, storyId: prev.storyId };
  try {
    assertCanMutate(ctx);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Forbidden.", success: null, storyId: prev.storyId };
  }

  const matterId = String(formData.get("matter_id") ?? "");
  const storyIdRaw = String(formData.get("story_id") ?? "").trim();
  const storyId = storyIdRaw.length > 0 ? storyIdRaw : null;

  const supabase = await createSupabaseServerClient();
  const result = await saveCaseStory(supabase, ctx, {
    matterId,
    storyId,
    title: String(formData.get("title") ?? ""),
    contentMarkdown: String(formData.get("content_markdown") ?? ""),
    status: String(formData.get("status") ?? "draft"),
  });

  if (result.error || !result.storyId) {
    return { error: result.error ?? "Save failed.", success: null, storyId: prev.storyId };
  }

  revalidatePath(`/matters/${matterId}/story`);
  revalidatePath(`/matters/${matterId}/assertions`);
  return { error: null, success: "Case story saved.", storyId: result.storyId };
}
