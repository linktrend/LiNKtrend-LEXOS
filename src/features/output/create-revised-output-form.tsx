"use client";

import { useActionState } from "react";
import type { Database } from "@/types/database";
import { createRevisedOutputAction } from "@/app/matters/[matterId]/output/actions";
import {
  OUTPUT_MUTATION_INITIAL,
  type OutputMutationState,
} from "@/app/matters/[matterId]/output/output-mutation-state";

type ArgumentDraftRow = Database["public"]["Tables"]["argument_drafts"]["Row"];
type AdversarialRow = Database["public"]["Tables"]["adversarial_critiques"]["Row"];

const TERMINAL = new Set(["archived", "superseded"]);

export function CreateRevisedOutputForm({
  matterId,
  drafts,
  critiques,
  activeCritiqueCount,
}: {
  matterId: string;
  drafts: ArgumentDraftRow[];
  critiques: AdversarialRow[];
  activeCritiqueCount: number;
}) {
  const [state, action, pending] = useActionState(
    createRevisedOutputAction,
    OUTPUT_MUTATION_INITIAL as OutputMutationState
  );

  const activeDrafts = drafts.filter((d) => !TERMINAL.has(d.status ?? ""));
  const activeCritiques = critiques.filter((c) => !TERMINAL.has(c.status ?? ""));
  const missingPrereqArtifacts =
    activeDrafts.length === 0 || (activeCritiqueCount > 0 && activeCritiques.length === 0);

  return (
    <form
      action={action}
      className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <input type="hidden" name="matter_id" value={matterId} />
      <div>
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">New revised output</p>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          Links an argument draft and adversarial critique. At least one active critique is required unless you
          confirm override with a reason (edge case: empty matter state).
        </p>
      </div>

      {activeCritiqueCount === 0 ? (
        <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
          No active adversarial critiques on this matter. Add a critique on the Adversarial tab, or use override
          below (matter owner / admin responsibility).
        </div>
      ) : null}

      <label className="block text-sm">
        <span className="font-medium text-zinc-900 dark:text-zinc-100">Title</span>
        <input
          name="title"
          placeholder="Revised output (draft)"
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>

      <label className="block text-sm">
        <span className="font-medium text-zinc-900 dark:text-zinc-100">Argument draft</span>
        <select
          name="argument_draft_id"
          required
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          defaultValue=""
        >
          <option value="" disabled>
            Select draft…
          </option>
          {activeDrafts.map((d) => (
            <option key={d.id} value={d.id}>
              {(d.title ?? "Untitled").slice(0, 80)} ({d.status})
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="font-medium text-zinc-900 dark:text-zinc-100">Adversarial critique</span>
        <select
          name="adversarial_critique_id"
          required
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          defaultValue=""
        >
          <option value="" disabled>
            Select critique…
          </option>
          {activeCritiques.map((c) => (
            <option key={c.id} value={c.id}>
              {(c.title ?? "Critique").slice(0, 80)} — {c.loop_decision ?? "no loop"}
            </option>
          ))}
        </select>
      </label>

      {activeCritiqueCount === 0 ? (
        <div className="space-y-2 rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
          <label className="flex items-start gap-2 text-xs text-zinc-800 dark:text-zinc-200">
            <input type="checkbox" name="override_w9_prereq" value="1" className="mt-0.5" />
            <span>
              I confirm override: there is no active adversarial critique and I accept the risk of drafting revised
              output without W9 review.
            </span>
          </label>
          <label className="block text-xs">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Override reason (8+ characters)</span>
            <textarea
              name="override_reason"
              rows={2}
              className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-950"
              placeholder="Why is revised output needed without an active critique?"
            />
          </label>
        </div>
      ) : null}

      {state.error ? (
        <p className="text-xs text-red-700 dark:text-red-300" data-testid="revised-output-create-error">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending || missingPrereqArtifacts}
        data-testid="revised-output-create-submit"
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
        title={
          missingPrereqArtifacts
            ? "Need at least one active argument draft" +
              (activeCritiqueCount > 0 ? " and one active adversarial critique" : "")
            : undefined
        }
      >
        {pending ? "Creating…" : "Create revised output"}
      </button>

      {missingPrereqArtifacts ? (
        <p className="text-xs text-zinc-500">
          {activeDrafts.length === 0
            ? "Create an argument draft first."
            : "Add an active adversarial critique, or use override when none exist."}
        </p>
      ) : null}
    </form>
  );
}
