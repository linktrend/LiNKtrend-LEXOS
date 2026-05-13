"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Database } from "@/types/database";
import {
  ADVERSARIAL_TEMPLATE_KEYS,
  ADVERSARIAL_TEMPLATE_LABELS,
  LOOP_DECISION_LABELS,
  LOOP_DECISION_VALUES,
} from "@/features/adversarial/template-keys";
import { adversarialSectionsFromAttackMatrix } from "@/features/adversarial/template-json";
import {
  archiveAdversarialCritiqueAction,
  updateAdversarialCritiqueAction,
} from "@/app/matters/[matterId]/adversarial/actions";
import {
  ADVERSARIAL_MUTATION_INITIAL,
  type AdversarialMutationState,
} from "@/app/matters/[matterId]/adversarial/adversarial-mutation-state";

type AdversarialCritiqueRow = Database["public"]["Tables"]["adversarial_critiques"]["Row"];

const STATUS_EDIT_OPTIONS = ["draft", "under_review", "approved_internal", "final_internal"] as const;

const SEVERITY_OPTIONS = ["", "low", "medium", "high", "critical"] as const;

type DraftOpt = { id: string; title: string | null; status: string | null };

export function AdversarialCritiqueWorkspace({
  matterId,
  critique,
  argumentDraftOptions,
  linkedDraftTitle,
}: {
  matterId: string;
  critique: AdversarialCritiqueRow;
  argumentDraftOptions: DraftOpt[];
  linkedDraftTitle: string | null;
}) {
  const router = useRouter();
  const readOnly = critique.status === "archived" || critique.status === "superseded";
  const sections = adversarialSectionsFromAttackMatrix(critique.attack_matrix);
  const formKey = `${critique.id}-v${critique.version ?? 1}`;

  const [updateState, updateAction, updatePending] = useActionState(
    updateAdversarialCritiqueAction,
    ADVERSARIAL_MUTATION_INITIAL as AdversarialMutationState
  );
  const [archiveState, archiveAction, archivePending] = useActionState(
    archiveAdversarialCritiqueAction,
    ADVERSARIAL_MUTATION_INITIAL as AdversarialMutationState
  );

  useEffect(() => {
    if (updateState.success || archiveState.success) {
      router.refresh();
    }
  }, [updateState.success, archiveState.success, router]);

  const draftVal = critique.argument_draft_id ?? "";

  return (
    <div data-testid="adversarial-critique-workspace" className="space-y-6">
      {readOnly ? (
        <div className="rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200">
          This critique is <span className="font-semibold">{critique.status}</span> and cannot be edited.
        </div>
      ) : null}

      <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-300">
        Linked argument draft:{" "}
        <span className="font-medium">{linkedDraftTitle ?? critique.argument_draft_id ?? "—"}</span>
        <span className="text-zinc-500"> (full draft text is edited in the Argument workspace — not duplicated here)</span>
      </div>

      {updateState.error ? (
        <p className="text-sm text-red-700 dark:text-red-300" data-testid="adversarial-save-error">
          {updateState.error}
        </p>
      ) : null}
      {updateState.success ? (
        <p className="text-sm text-emerald-800 dark:text-emerald-200" data-testid="adversarial-save-success">
          {updateState.success}
        </p>
      ) : null}
      {archiveState.error ? <p className="text-sm text-red-700 dark:text-red-300">{archiveState.error}</p> : null}
      {archiveState.success ? (
        <p className="text-sm text-emerald-800 dark:text-emerald-200">{archiveState.success}</p>
      ) : null}

      <form key={formKey} action={updateAction} className="space-y-6">
        <input type="hidden" name="matter_id" value={matterId} />
        <input type="hidden" name="adversarial_critique_id" value={critique.id} />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Title</span>
            <input
              name="title"
              defaultValue={critique.title ?? ""}
              disabled={readOnly}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Artifact status</span>
            <select
              name="status"
              defaultValue={critique.status ?? "draft"}
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
          <span className="font-medium text-zinc-900 dark:text-zinc-100">Argument draft (required)</span>
          <select
            name="argument_draft_id"
            defaultValue={draftVal}
            disabled={readOnly}
            required
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          >
            {argumentDraftOptions.map((d) => (
              <option key={d.id} value={d.id}>
                {(d.title ?? "Untitled").slice(0, 80)} · {d.status}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Severity summary</span>
            <select
              name="severity_summary"
              defaultValue={critique.severity_summary ?? ""}
              disabled={readOnly}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            >
              {SEVERITY_OPTIONS.map((s) => (
                <option key={s || "unset"} value={s}>
                  {s ? s : "Not set"}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Loop decision (recommendation)</span>
            <select
              name="loop_decision"
              defaultValue={critique.loop_decision ?? ""}
              disabled={readOnly}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            >
              <option value="">Not set</option>
              {LOOP_DECISION_VALUES.map((v) => (
                <option key={v} value={v}>
                  {LOOP_DECISION_LABELS[v]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Attack matrix</h3>
          {ADVERSARIAL_TEMPLATE_KEYS.map((key) => (
            <label key={key} className="block text-sm">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">{ADVERSARIAL_TEMPLATE_LABELS[key]}</span>
              <textarea
                name={`adversarial_matrix_${key}`}
                defaultValue={sections[key]}
                disabled={readOnly}
                rows={3}
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
            </label>
          ))}
        </div>

        <label className="block text-sm">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">Non-deferential narrative (markdown)</span>
          <textarea
            name="content_markdown"
            defaultValue={critique.content_markdown ?? ""}
            disabled={readOnly}
            rows={10}
            placeholder="Attack the draft: unsupported claims, weak evidence, QA risks, citations — do not praise or lightly edit."
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">Notes</span>
          <textarea
            name="notes"
            defaultValue={critique.notes ?? ""}
            disabled={readOnly}
            rows={2}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>

        {!readOnly ? (
          <button
            type="submit"
            disabled={updatePending}
            data-testid="adversarial-save"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {updatePending ? "Saving…" : "Save critique"}
          </button>
        ) : null}
      </form>

      {!readOnly ? (
        <div className="flex flex-wrap gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <form action={archiveAction} className="inline">
            <input type="hidden" name="matter_id" value={matterId} />
            <input type="hidden" name="adversarial_critique_id" value={critique.id} />
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
            <input type="hidden" name="adversarial_critique_id" value={critique.id} />
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
