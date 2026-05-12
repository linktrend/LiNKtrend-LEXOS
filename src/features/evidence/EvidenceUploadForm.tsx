"use client";

import { useActionState } from "react";
import { uploadEvidenceAction } from "@/app/matters/[matterId]/evidence/actions";
import { EVIDENCE_UPLOAD_INITIAL } from "@/app/matters/[matterId]/evidence/upload-state";

type Props = {
  matterId: string;
};

export function EvidenceUploadForm({ matterId }: Props) {
  const bound = uploadEvidenceAction.bind(null, matterId);
  const [state, formAction, pending] = useActionState(bound, EVIDENCE_UPLOAD_INITIAL);

  return (
    <section id="evidence-upload" className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Upload evidence</h2>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
        Original file is stored unchanged. Extraction and QA are WP-07.
      </p>
      <form action={formAction} className="mt-4 space-y-3">
        {state.error ? (
          <p
            data-testid="evidence-upload-error"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
          >
            {state.error}
          </p>
        ) : null}
        {state.success ? (
          <p
            data-testid="evidence-upload-success"
            className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"
          >
            {state.success}
          </p>
        ) : null}
        <div>
          <label htmlFor="evidence_label" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Label (optional)
          </label>
          <input
            id="evidence_label"
            name="evidence_label"
            disabled={pending}
            className="mt-1 w-full max-w-md rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="Defaults to file name"
          />
        </div>
        <div>
          <label htmlFor="file" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            File <span className="text-red-600">*</span>
          </label>
          <input
            id="file"
            name="file"
            type="file"
            required
            disabled={pending}
            className="mt-1 block w-full max-w-md text-sm text-zinc-700 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100 dark:text-zinc-300 dark:file:bg-indigo-950 dark:file:text-indigo-200"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {pending ? "Uploading…" : "Upload"}
        </button>
      </form>
    </section>
  );
}
