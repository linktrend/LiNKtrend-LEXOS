"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/database";
import {
  ARGUMENT_TEMPLATE_KEYS,
  ARGUMENT_TEMPLATE_LABELS,
} from "@/features/argument/template-keys";
import { argumentSectionsFromJson } from "@/features/argument/template-json";
import {
  archiveArgumentDraftAction,
  updateArgumentDraftAction,
} from "@/app/matters/[matterId]/argument/actions";
import {
  ARGUMENT_MUTATION_INITIAL,
  type ArgumentMutationState,
} from "@/app/matters/[matterId]/argument/argument-mutation-state";

type ArgumentDraftRow = Database["public"]["Tables"]["argument_drafts"]["Row"];

const STATUS_EDIT_OPTIONS = ["draft", "under_review", "approved_internal", "final_internal"] as const;

type MemoRef = { id: string; title: string | null };

export function ArgumentDraftWorkspace({
  matterId,
  draft,
  strategyMemos,
  researchMemos,
}: {
  matterId: string;
  draft: ArgumentDraftRow;
  strategyMemos: MemoRef[];
  researchMemos: MemoRef[];
}) {
  const router = useRouter();
  const readOnly = draft.status === "archived" || draft.status === "superseded";
  const sections = argumentSectionsFromJson(draft.metadata);
  const formKey = `${draft.id}-v${draft.version ?? 1}`;

  const [updateState, updateAction, updatePending] = useActionState(
    updateArgumentDraftAction,
    ARGUMENT_MUTATION_INITIAL as ArgumentMutationState
  );
  const [archiveState, archiveAction, archivePending] = useActionState(
    archiveArgumentDraftAction,
    ARGUMENT_MUTATION_INITIAL as ArgumentMutationState
  );

  useEffect(() => {
    if (updateState.success || archiveState.success) {
      router.refresh();
    }
  }, [updateState.success, archiveState.success, router]);

  const strategyVal = draft.strategy_memo_id ?? "__none__";
  const researchVal = draft.research_memo_id ?? "__none__";

  return (
    <div data-testid="argument-draft-workspace" className="space-y-6">
      {readOnly ? (
        <div className="rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200">
          This draft is <span className="font-semibold">{draft.status}</span> and cannot be edited.
        </div>
      ) : null}

      {updateState.error ? (
        <p className="text-sm text-red-700 dark:text-red-300" data-testid="argument-draft-save-error">
          {updateState.error}
        </p>
      ) : null}
      {updateState.success ? (
        <p className="text-sm text-emerald-800 dark:text-emerald-200" data-testid="argument-draft-save-success">
          {updateState.success}
        </p>
      ) : null}

      {archiveState.error ? <p className="text-sm text-red-700 dark:text-red-300">{archiveState.error}</p> : null}
      {archiveState.success ? (
        <p className="text-sm text-emerald-800 dark:text-emerald-200">{archiveState.success}</p>
      ) : null}

      <form key={formKey} action={updateAction} className="space-y-6">
        <input type="hidden" name="matter_id" value={matterId} />
        <input type="hidden" name="argument_draft_id" value={draft.id} />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Title</span>
            <input
              name="title"
              defaultValue={draft.title ?? ""}
              disabled={readOnly}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Artifact status</span>
            <select
              name="status"
              defaultValue={draft.status ?? "draft"}
              disabled={readOnly}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            >
              {STATUS_EDIT_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block text-sm">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">Intended audience</span>
          <input
            name="intended_audience"
            defaultValue={draft.intended_audience ?? ""}
            disabled={readOnly}
            placeholder="e.g. internal partner review — not a tribunal"
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Linked strategy memo (optional)</span>
            <select
              name="strategy_memo_id"
              defaultValue={strategyVal}
              disabled={readOnly}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            >
              <option value="__none__">None</option>
              {strategyMemos.map((m) => (
                <option key={m.id} value={m.id}>
                  {(m.title ?? "Untitled").slice(0, 80)}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Linked research memo (optional)</span>
            <select
              name="research_memo_id"
              defaultValue={researchVal}
              disabled={readOnly}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            >
              <option value="__none__">None</option>
              {researchMemos.map((m) => (
                <option key={m.id} value={m.id}>
                  {(m.title ?? "Untitled").slice(0, 80)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Structured sections</h3>
          {ARGUMENT_TEMPLATE_KEYS.map((key) => (
            <label key={key} className="block text-sm">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">{ARGUMENT_TEMPLATE_LABELS[key]}</span>
              <textarea
                name={`argument_section_${key}`}
                defaultValue={sections[key]}
                disabled={readOnly}
                rows={4}
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
            </label>
          ))}
        </div>

        <label className="block text-sm">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">Narrative / synthesis (markdown)</span>
          <textarea
            name="content_markdown"
            defaultValue={draft.content_markdown ?? ""}
            disabled={readOnly}
            rows={12}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">Notes</span>
          <textarea
            name="notes"
            defaultValue={draft.notes ?? ""}
            disabled={readOnly}
            rows={3}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>

        {!readOnly ? (
          <button
            type="submit"
            disabled={updatePending}
            data-testid="argument-draft-save"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {updatePending ? "Saving…" : "Save draft"}
          </button>
        ) : null}
      </form>

      {!readOnly ? (
        <div className="flex flex-wrap gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <form action={archiveAction} className="inline">
            <input type="hidden" name="matter_id" value={matterId} />
            <input type="hidden" name="argument_draft_id" value={draft.id} />
            <input type="hidden" name="archive_mode" value="archived" />
            <button
              type="submit"
              disabled={archivePending}
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Archive
            </button>
          </form>
          <form action={archiveAction} className="inline">
            <input type="hidden" name="matter_id" value={matterId} />
            <input type="hidden" name="argument_draft_id" value={draft.id} />
            <input type="hidden" name="archive_mode" value="superseded" />
            <button
              type="submit"
              disabled={archivePending}
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Supersede
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
