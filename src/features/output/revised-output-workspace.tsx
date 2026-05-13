"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/database";
import {
  REVISED_OUTPUT_TEMPLATE_KEYS,
  REVISED_OUTPUT_SECTION_LABELS,
} from "@/features/output/template-keys";
import { revisedSectionsFromMetadata } from "@/features/output/template-json";
import {
  archiveRevisedOutputAction,
  updateRevisedOutputAction,
} from "@/app/matters/[matterId]/output/actions";
import {
  OUTPUT_MUTATION_INITIAL,
  type OutputMutationState,
} from "@/app/matters/[matterId]/output/output-mutation-state";

type OutputArtifactRow = Database["public"]["Tables"]["output_artifacts"]["Row"];

const STATUS_EDIT_OPTIONS = ["draft", "under_review", "approved_internal", "final_internal"] as const;

const REVIEW_EDIT_OPTIONS = [
  "not_reviewed",
  "under_review",
  "approved",
  "approved_with_changes",
  "rejected",
  "needs_more_evidence",
  "needs_more_research",
  "needs_client_clarification",
  "risk_accepted",
  "deferred",
] as const;

export function RevisedOutputWorkspace({
  matterId,
  artifact,
}: {
  matterId: string;
  artifact: OutputArtifactRow;
}) {
  const router = useRouter();
  const readOnly = artifact.status === "archived" || artifact.status === "superseded";
  const sections = revisedSectionsFromMetadata(artifact.metadata);
  const formKey = `${artifact.id}-v${artifact.version ?? 1}`;

  const [updateState, updateAction, updatePending] = useActionState(
    updateRevisedOutputAction,
    OUTPUT_MUTATION_INITIAL as OutputMutationState
  );
  const [archiveState, archiveAction, archivePending] = useActionState(
    archiveRevisedOutputAction,
    OUTPUT_MUTATION_INITIAL as OutputMutationState
  );

  useEffect(() => {
    if (updateState.success || archiveState.success) {
      router.refresh();
    }
  }, [updateState.success, archiveState.success, router]);

  return (
    <div data-testid="revised-output-workspace" className="space-y-6">
      {readOnly ? (
        <div className="rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200">
          This artifact is <span className="font-semibold">{artifact.status}</span> and cannot be edited.
        </div>
      ) : null}

      {updateState.error ? (
        <p className="text-sm text-red-700 dark:text-red-300" data-testid="revised-output-save-error">
          {updateState.error}
        </p>
      ) : null}
      {updateState.success ? (
        <p className="text-sm text-emerald-800 dark:text-emerald-200" data-testid="revised-output-save-success">
          {updateState.success}
        </p>
      ) : null}

      {archiveState.error ? <p className="text-sm text-red-700 dark:text-red-300">{archiveState.error}</p> : null}
      {archiveState.success ? (
        <p className="text-sm text-emerald-800 dark:text-emerald-200">{archiveState.success}</p>
      ) : null}

      <form key={formKey} action={updateAction} className="space-y-6">
        <input type="hidden" name="matter_id" value={matterId} />
        <input type="hidden" name="output_artifact_id" value={artifact.id} />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Title</span>
            <input
              name="title"
              defaultValue={artifact.title ?? ""}
              disabled={readOnly}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Artifact status</span>
            <select
              name="status"
              defaultValue={artifact.status ?? "draft"}
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
          <span className="font-medium text-zinc-900 dark:text-zinc-100">Review status (internal)</span>
          <select
            name="review_status"
            defaultValue={artifact.review_status ?? "not_reviewed"}
            disabled={readOnly}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          >
            {REVIEW_EDIT_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-zinc-500">
            Internal review markers only — not external approval or filing clearance.
          </p>
        </label>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Structured sections</h3>
          {REVISED_OUTPUT_TEMPLATE_KEYS.map((key) => (
            <div key={key} className="rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
              <label className="block text-xs font-medium text-zinc-800 dark:text-zinc-200">
                Section title ({REVISED_OUTPUT_SECTION_LABELS[key]})
              </label>
              <input
                name={`output_section_title_${key}`}
                defaultValue={sections[key].title}
                disabled={readOnly}
                className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
              <label className="mt-2 block text-xs font-medium text-zinc-800 dark:text-zinc-200">Body</label>
              <textarea
                name={`output_section_body_${key}`}
                defaultValue={sections[key].body}
                disabled={readOnly}
                rows={4}
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
            </div>
          ))}
        </div>

        <label className="block text-sm">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">Narrative / synthesis (markdown)</span>
          <textarea
            name="content_markdown"
            defaultValue={artifact.content_markdown ?? ""}
            disabled={readOnly}
            rows={10}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">Operator notes</span>
          <textarea
            name="notes"
            defaultValue={artifact.notes ?? ""}
            disabled={readOnly}
            rows={3}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>

        {!readOnly ? (
          <button
            type="submit"
            disabled={updatePending}
            data-testid="revised-output-save"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {updatePending ? "Saving…" : "Save"}
          </button>
        ) : null}
      </form>

      {!readOnly ? (
        <div className="flex flex-wrap gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <form action={archiveAction} className="inline">
            <input type="hidden" name="matter_id" value={matterId} />
            <input type="hidden" name="output_artifact_id" value={artifact.id} />
            <input type="hidden" name="archive_mode" value="archived" />
            <button
              type="submit"
              disabled={archivePending}
              className="rounded-md border border-zinc-400 px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              Archive
            </button>
          </form>
          <form action={archiveAction} className="inline">
            <input type="hidden" name="matter_id" value={matterId} />
            <input type="hidden" name="output_artifact_id" value={artifact.id} />
            <input type="hidden" name="archive_mode" value="superseded" />
            <button
              type="submit"
              disabled={archivePending}
              className="rounded-md border border-zinc-400 px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              Mark superseded
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
