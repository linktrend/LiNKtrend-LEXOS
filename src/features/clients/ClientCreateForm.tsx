"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createClientAction, type ClientCreateState } from "@/app/clients/new/actions";

const initial: ClientCreateState = { error: null };

export function ClientCreateForm() {
  const [state, formAction, pending] = useActionState(createClientAction, initial);

  return (
    <form action={formAction} className="mx-auto max-w-lg space-y-4">
      {state.error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="client_name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Client name <span className="text-red-600">*</span>
        </label>
        <input
          id="client_name"
          name="client_name"
          required
          disabled={pending}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="e.g. Demo Corp Ltd"
        />
      </div>
      <div>
        <label htmlFor="client_type" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Client type
        </label>
        <input
          id="client_type"
          name="client_type"
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
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {pending ? "Creating…" : "Create client"}
        </button>
        <Link
          href="/clients"
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
