"use client";

import { useActionState } from "react";
import Link from "next/link";
import { MATTER_POSTURE_LABELS, MATTER_POSTURES, type MatterPosture } from "@/types/domain";
import { createMatterAction, type MatterCreateState } from "@/app/clients/[clientId]/matters/new/actions";

const initial: MatterCreateState = { error: null };

type Props = {
  clientId: string;
  clientName: string;
};

export function MatterCreateForm({ clientId, clientName }: Props) {
  const [state, formAction, pending] = useActionState(createMatterAction, initial);

  return (
    <form action={formAction} className="mx-auto max-w-lg space-y-4">
      <input type="hidden" name="client_id" value={clientId} />
      {state.error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      )}
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Client: <span className="font-medium text-zinc-900 dark:text-zinc-100">{clientName}</span>
      </p>
      <div>
        <label htmlFor="matter_name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Matter name <span className="text-red-600">*</span>
        </label>
        <input
          id="matter_name"
          name="matter_name"
          required
          disabled={pending}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="e.g. Contract dispute — Phase 1"
        />
      </div>
      <div>
        <label htmlFor="posture" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Posture
        </label>
        <select
          id="posture"
          name="posture"
          defaultValue="defence"
          disabled={pending}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
        >
          {(MATTER_POSTURES as readonly MatterPosture[]).map((p) => (
            <option key={p} value={p}>
              {MATTER_POSTURE_LABELS[p]}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-zinc-500">Stored as canonical DB value (e.g. defence).</p>
      </div>
      <div>
        <label htmlFor="matter_type" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Matter type
        </label>
        <input
          id="matter_type"
          name="matter_type"
          disabled={pending}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="Optional"
        />
      </div>
      <div>
        <label htmlFor="jurisdiction" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Jurisdiction
        </label>
        <input
          id="jurisdiction"
          name="jurisdiction"
          disabled={pending}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="Optional"
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {pending ? "Creating…" : "Create matter"}
        </button>
        <Link
          href={`/clients/${clientId}`}
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
