"use client";

import { useActionState } from "react";
import { createArgumentDraftAction } from "@/app/matters/[matterId]/argument/actions";
import {
  ARGUMENT_MUTATION_INITIAL,
  type ArgumentMutationState,
} from "@/app/matters/[matterId]/argument/argument-mutation-state";

export function CreateArgumentDraftForm({ matterId }: { matterId: string }) {
  const [state, action, pending] = useActionState(
    createArgumentDraftAction,
    ARGUMENT_MUTATION_INITIAL as ArgumentMutationState
  );

  return (
    <form
      action={action}
      className="flex flex-wrap items-end gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <input type="hidden" name="matter_id" value={matterId} />
      <div>
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">New argument draft</p>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          Creates a draft you edit on the next screen. No automated legal generation — you supply structure and text.
        </p>
      </div>
      {state.error ? (
        <p className="w-full text-xs text-red-700 dark:text-red-300" data-testid="argument-create-error">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        data-testid="argument-create-submit"
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {pending ? "Creating…" : "Create draft"}
      </button>
    </form>
  );
}
