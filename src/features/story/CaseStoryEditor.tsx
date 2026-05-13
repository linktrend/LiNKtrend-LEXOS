"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { CaseStoryRow } from "@/server/story/queries";
import { saveCaseStoryAction } from "@/app/matters/[matterId]/story/actions";
import { SAVE_STORY_INITIAL, type SaveStoryState } from "@/app/matters/[matterId]/story/save-story-state";
import { CaseStoryWarnings } from "@/features/story/CaseStoryWarnings";

type Props = {
  matterId: string;
  initial: CaseStoryRow | null;
};

const STATUS_OPTIONS = [
  "draft",
  "under_review",
  "approved_internal",
  "final_internal",
  "superseded",
  "archived",
] as const;

export function CaseStoryEditor({ matterId, initial }: Props) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(saveCaseStoryAction, SAVE_STORY_INITIAL as SaveStoryState);

  const effectiveStoryId = state.storyId ?? initial?.id ?? "";

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <div className="space-y-6" data-testid="case-story-workspace">
      <div>
        <h2
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
          data-testid="case-story-heading"
        >
          Case story (W2)
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Structured narrative for this matter. One primary story per matter in this MVP.
        </p>
      </div>

      <CaseStoryWarnings />

      {!initial && !effectiveStoryId ? (
        <p className="rounded-lg border border-dashed border-zinc-300 px-4 py-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          No case story saved yet. Add a title and narrative below, then save.
        </p>
      ) : null}

      {state.error ? (
        <p data-testid="case-story-save-error" className="text-sm text-red-700 dark:text-red-300">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p data-testid="case-story-save-success" className="text-sm text-emerald-800 dark:text-emerald-200">
          {state.success}
        </p>
      ) : null}

      <form action={formAction} className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <input type="hidden" name="matter_id" value={matterId} />
        <input type="hidden" name="story_id" value={effectiveStoryId} />
        <div>
          <label htmlFor="story_title" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Title
          </label>
          <input
            id="story_title"
            name="title"
            defaultValue={initial?.title ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            placeholder="Short label for this narrative"
          />
        </div>
        <div>
          <label htmlFor="story_status" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Status
          </label>
          <select
            id="story_status"
            name="status"
            defaultValue={initial?.status ?? "draft"}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="story_content" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Narrative (markdown)
          </label>
          <textarea
            id="story_content"
            name="content_markdown"
            defaultValue={initial?.content_markdown ?? ""}
            rows={16}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            placeholder="Write the matter narrative in markdown…"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            data-testid="case-story-save"
            disabled={pending}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save case story"}
          </button>
          {initial?.updated_at ? (
            <span className="text-xs text-zinc-500">Last saved {new Date(initial.updated_at).toLocaleString()}</span>
          ) : null}
          {initial?.version != null ? (
            <span className="text-xs text-zinc-500">Version {initial.version}</span>
          ) : null}
        </div>
      </form>
    </div>
  );
}
