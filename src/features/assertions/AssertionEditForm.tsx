"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/database";
import {
  archiveAssertionAction,
  updateAssertionAction,
} from "@/app/matters/[matterId]/assertions/actions";
import {
  ASSERTION_MUTATION_INITIAL,
  type AssertionMutationState,
} from "@/app/matters/[matterId]/assertions/assertion-mutation-state";
import {
  MATERIALITY_OPTIONS,
  NEXT_SUPPORT_OPTIONS,
  SUPPORT_STATE_OPTIONS,
  TRUTH_STATE_OPTIONS,
  USE_STATUS_OPTIONS,
} from "@/features/assertions/fields";
import { isAssertionArchivedRow } from "@/features/assertions/assertion-utils";

type AssertionRow = Database["public"]["Tables"]["assertions"]["Row"];

function metaStr(meta: AssertionRow["metadata"], key: string): string {
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) return "";
  const v = (meta as Record<string, unknown>)[key];
  return typeof v === "string" ? v : "";
}

type Props = {
  matterId: string;
  row: AssertionRow;
  primaryCaseStoryId: string | null;
};

export function AssertionEditForm({ matterId, row, primaryCaseStoryId }: Props) {
  const router = useRouter();
  const [updState, updateAction, updPending] = useActionState(
    updateAssertionAction,
    ASSERTION_MUTATION_INITIAL as AssertionMutationState
  );
  const [archState, archiveAction, archPending] = useActionState(
    archiveAssertionAction,
    ASSERTION_MUTATION_INITIAL as AssertionMutationState
  );

  const archived = isAssertionArchivedRow(row);
  const materiality = metaStr(row.metadata, "materiality") || "medium";
  const nextSupport = metaStr(row.metadata, "next_support_action") || "none";
  const gaps = metaStr(row.metadata, "gaps");
  const vulnerability = metaStr(row.metadata, "vulnerability");

  useEffect(() => {
    if (updState.success || archState.success) {
      router.refresh();
    }
  }, [updState.success, archState.success, router]);

  return (
    <div className="space-y-6">
      {archived ? (
        <p className="rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
          This assertion is archived (superseded). It remains visible for auditability.
        </p>
      ) : null}
      {updState.error ? (
        <p className="text-sm text-red-700 dark:text-red-300" data-testid="assertion-edit-error">
          {updState.error}
        </p>
      ) : null}
      {updState.success ? (
        <p className="text-sm text-emerald-800 dark:text-emerald-200" data-testid="assertion-edit-success">
          {updState.success}
        </p>
      ) : null}
      {archState.error ? (
        <p className="text-sm text-red-700 dark:text-red-300" data-testid="assertion-archive-error">
          {archState.error}
        </p>
      ) : null}
      {archState.success ? (
        <p className="text-sm text-emerald-800 dark:text-emerald-200" data-testid="assertion-archive-success">
          {archState.success}
        </p>
      ) : null}

      <form action={updateAction} className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <input type="hidden" name="matter_id" value={matterId} />
        <input type="hidden" name="assertion_id" value={row.id} />
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Assertion text</label>
          <textarea
            name="assertion_text"
            required
            rows={6}
            defaultValue={row.assertion_text}
            disabled={archived}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Type / category</label>
          <input
            name="assertion_type"
            defaultValue={row.assertion_type ?? ""}
            disabled={archived}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Linked case story</label>
          <select
            name="case_story_id"
            defaultValue={row.case_story_id ?? "none"}
            disabled={archived}
            className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            <option value="none">None</option>
            {primaryCaseStoryId ? (
              <option value={primaryCaseStoryId}>Primary case story</option>
            ) : null}
          </select>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Truth state</label>
            <select
              name="truth_state"
              defaultValue={row.truth_state ?? "pending_verification"}
              disabled={archived}
              className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-xs disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              {TRUTH_STATE_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Support state</label>
            <select
              name="support_state"
              defaultValue={row.support_state ?? "pending"}
              disabled={archived}
              className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-xs disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              {SUPPORT_STATE_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Use status</label>
            <select
              name="use_status"
              defaultValue={row.use_status ?? "pending_review"}
              disabled={archived}
              className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-xs disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              {USE_STATUS_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Materiality</label>
            <select
              name="materiality"
              defaultValue={materiality}
              disabled={archived}
              className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-xs disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              {MATERIALITY_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Next support action</label>
            <select
              name="next_support_action"
              defaultValue={nextSupport}
              disabled={archived}
              className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-xs disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              {NEXT_SUPPORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Gaps / open questions</label>
          <textarea
            name="gaps"
            rows={3}
            defaultValue={gaps}
            disabled={archived}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Vulnerability notes</label>
          <textarea
            name="vulnerability"
            rows={3}
            defaultValue={vulnerability}
            disabled={archived}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">General notes</label>
          <textarea
            name="notes"
            rows={3}
            defaultValue={row.notes ?? ""}
            disabled={archived}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <label className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            name="contradiction_flag"
            defaultChecked={!!row.contradiction_flag}
            disabled={archived}
            className="rounded border-zinc-400 disabled:opacity-60"
          />
          Contradiction flagged
        </label>
        <button
          type="submit"
          data-testid="assertion-edit-submit"
          disabled={updPending || archived}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {updPending ? "Saving…" : "Save changes"}
        </button>
      </form>

      {!archived ? (
        <form action={archiveAction} className="rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-900 dark:bg-red-950/20">
          <input type="hidden" name="matter_id" value={matterId} />
          <input type="hidden" name="assertion_id" value={row.id} />
          <p className="text-sm text-red-900 dark:text-red-100">Archive this assertion (no hard delete).</p>
          <button
            type="submit"
            data-testid="assertion-archive-submit"
            disabled={archPending}
            className="mt-3 rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-900 hover:bg-red-100 dark:border-red-800 dark:bg-zinc-950 dark:text-red-100 dark:hover:bg-red-950/40"
          >
            {archPending ? "Archiving…" : "Archive assertion"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
