"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createAdversarialCritiqueAction } from "@/app/matters/[matterId]/adversarial/actions";
import {
  ADVERSARIAL_MUTATION_INITIAL,
  type AdversarialMutationState,
} from "@/app/matters/[matterId]/adversarial/adversarial-mutation-state";
import type { AdversarialWorkspaceSummary } from "@/server/adversarial/summary";

export function CreateAdversarialCritiqueForm({
  matterId,
  summary,
}: {
  matterId: string;
  summary: AdversarialWorkspaceSummary;
}) {
  const [state, action, pending] = useActionState(
    createAdversarialCritiqueAction,
    ADVERSARIAL_MUTATION_INITIAL as AdversarialMutationState
  );

  const options = summary.argumentDraftOptions;

  return (
    <form
      action={action}
      className="space-y-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <input type="hidden" name="matter_id" value={matterId} />
      <div>
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">New adversarial critique</p>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          Select the argument draft to stress-test. Operator-authored critique only — no autonomous adversary model.
        </p>
      </div>
      {options.length === 0 ? (
        <p className="text-xs text-amber-800 dark:text-amber-200">
          No active argument drafts for this matter.{" "}
          <Link href={`/matters/${matterId}/argument`} className="font-medium underline">
            Create an argument draft first
          </Link>
          .
        </p>
      ) : (
        <label className="block text-sm">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">Argument draft</span>
          <select
            name="argument_draft_id"
            required
            disabled={pending}
            className="mt-1 w-full max-w-md rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          >
            {options.map((d) => (
              <option key={d.id} value={d.id}>
                {(d.title ?? "Untitled").slice(0, 80)} · {d.status}
              </option>
            ))}
          </select>
        </label>
      )}
      {state.error ? (
        <p className="text-xs text-red-700 dark:text-red-300" data-testid="adversarial-create-error">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending || options.length === 0}
        data-testid="adversarial-create-submit"
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {pending ? "Creating…" : "Create critique"}
      </button>
    </form>
  );
}
