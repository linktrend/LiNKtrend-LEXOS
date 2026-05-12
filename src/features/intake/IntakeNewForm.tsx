"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createIntakeAction, type IntakeCreateState } from "@/app/intake/new/actions";

const initial: IntakeCreateState = { error: null };

export function IntakeNewForm() {
  const [state, formAction, pending] = useActionState(createIntakeAction, initial);

  return (
    <form action={formAction} className="mx-auto max-w-lg space-y-4">
      {state.error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="intake_type" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Intake type
        </label>
        <input
          id="intake_type"
          name="intake_type"
          disabled={pending}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="e.g. new_engagement"
        />
      </div>
      <div>
        <label htmlFor="source" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Source
        </label>
        <input
          id="source"
          name="source"
          disabled={pending}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="e.g. referral, web_form"
        />
      </div>
      <div>
        <label htmlFor="urgency_level" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Urgency
        </label>
        <input
          id="urgency_level"
          name="urgency_level"
          disabled={pending}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="Optional"
        />
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          disabled={pending}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="Internal notes (optional)"
        />
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Unrelated prospective clients must use separate intake records (W0 isolation).
      </p>
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {pending ? "Creating…" : "Create intake"}
        </button>
        <Link
          href="/intake"
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
