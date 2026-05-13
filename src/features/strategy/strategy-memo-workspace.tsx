"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/database";
import { STRATEGY_TEMPLATE_KEYS, STRATEGY_TEMPLATE_LABELS } from "@/features/strategy/template-keys";
import { strategyPointsFromJson } from "@/features/strategy/template-json";
import {
  archiveStrategyMemoAction,
  updateStrategyMemoAction,
} from "@/app/matters/[matterId]/strategy/actions";
import {
  STRATEGY_MUTATION_INITIAL,
  type StrategyMutationState,
} from "@/app/matters/[matterId]/strategy/strategy-mutation-state";

type StrategyMemoRow = Database["public"]["Tables"]["strategy_memos"]["Row"];

const STATUS_EDIT_OPTIONS = ["draft", "under_review", "approved_internal", "final_internal"] as const;

export function StrategyMemoWorkspace({ matterId, memo }: { matterId: string; memo: StrategyMemoRow }) {
  const router = useRouter();
  const readOnly = memo.status === "archived" || memo.status === "superseded";
  const points = strategyPointsFromJson(memo.strategy_points);
  const formKey = `${memo.id}-v${memo.version ?? 1}`;

  const [updateState, updateAction, updatePending] = useActionState(
    updateStrategyMemoAction,
    STRATEGY_MUTATION_INITIAL as StrategyMutationState
  );
  const [archiveState, archiveAction, archivePending] = useActionState(
    archiveStrategyMemoAction,
    STRATEGY_MUTATION_INITIAL as StrategyMutationState
  );

  useEffect(() => {
    if (updateState.success || archiveState.success) {
      router.refresh();
    }
  }, [updateState.success, archiveState.success, router]);

  return (
    <div data-testid="strategy-memo-workspace" className="space-y-6">
      {readOnly ? (
        <div className="rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200">
          This memo is <span className="font-semibold">{memo.status}</span> and cannot be edited.
        </div>
      ) : null}

      {updateState.error ? (
        <p className="text-sm text-red-700 dark:text-red-300" data-testid="strategy-memo-save-error">
          {updateState.error}
        </p>
      ) : null}
      {updateState.success ? (
        <p className="text-sm text-emerald-800 dark:text-emerald-200" data-testid="strategy-memo-save-success">
          {updateState.success}
        </p>
      ) : null}

      {archiveState.error ? (
        <p className="text-sm text-red-700 dark:text-red-300">{archiveState.error}</p>
      ) : null}
      {archiveState.success ? (
        <p className="text-sm text-emerald-800 dark:text-emerald-200">{archiveState.success}</p>
      ) : null}

      {!readOnly ? (
        <form action={updateAction} className="space-y-4">
          <input type="hidden" name="matter_id" value={matterId} />
          <input type="hidden" name="strategy_memo_id" value={memo.id} />

          <div>
            <label htmlFor="strategy-title" className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Title
            </label>
            <input
              id="strategy-title"
              key={`${formKey}-title`}
              name="title"
              type="text"
              defaultValue={memo.title ?? ""}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            />
          </div>

          <div>
            <label htmlFor="strategy-status" className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Status
            </label>
            <select
              id="strategy-status"
              key={`${formKey}-status`}
              name="status"
              defaultValue={memo.status ?? "draft"}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            >
              {STATUS_EDIT_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="strategy-content"
              className="block text-xs font-medium text-zinc-600 dark:text-zinc-400"
            >
              Executive summary (markdown)
            </label>
            <textarea
              id="strategy-content"
              key={`${formKey}-content`}
              name="content_markdown"
              rows={6}
              defaultValue={memo.content_markdown ?? ""}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-950"
            />
          </div>

          <div>
            <label htmlFor="strategy-notes" className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Notes (internal)
            </label>
            <textarea
              id="strategy-notes"
              key={`${formKey}-notes`}
              name="notes"
              rows={3}
              defaultValue={memo.notes ?? ""}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            />
          </div>

          <div className="space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Strategy template</h3>
            {STRATEGY_TEMPLATE_KEYS.map((k) => (
              <div key={k}>
                <label htmlFor={`sp-${k}`} className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  {STRATEGY_TEMPLATE_LABELS[k]}
                </label>
                <textarea
                  id={`sp-${k}`}
                  name={`strategy_point_${k}`}
                  rows={k === "research_needed" ? 5 : 3}
                  defaultValue={points[k]}
                  className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={updatePending}
              data-testid="strategy-memo-save"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
            >
              {updatePending ? "Saving…" : "Save memo"}
            </button>
          </div>
        </form>
      ) : (
        <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-zinc-800 dark:text-zinc-200">
          <p className="font-medium">{memo.title}</p>
          <p className="text-xs text-zinc-500">Status: {memo.status}</p>
          {memo.content_markdown ? <pre className="whitespace-pre-wrap font-sans">{memo.content_markdown}</pre> : null}
        </div>
      )}

      {!readOnly ? (
        <div className="flex flex-wrap gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <form action={archiveAction} className="inline">
            <input type="hidden" name="matter_id" value={matterId} />
            <input type="hidden" name="strategy_memo_id" value={memo.id} />
            <input type="hidden" name="archive_mode" value="archived" />
            <button
              type="submit"
              disabled={archivePending}
              className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
            >
              Archive
            </button>
          </form>
          <form action={archiveAction} className="inline">
            <input type="hidden" name="matter_id" value={matterId} />
            <input type="hidden" name="strategy_memo_id" value={memo.id} />
            <input type="hidden" name="archive_mode" value="superseded" />
            <button
              type="submit"
              disabled={archivePending}
              className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
            >
              Supersede
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
