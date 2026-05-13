"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  createAssertionAction,
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

type Props = {
  matterId: string;
  caseStoryId: string | null;
  storyExcerpt: string | null;
};

export function AssertionCreateForm({ matterId, caseStoryId, storyExcerpt }: Props) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    createAssertionAction,
    ASSERTION_MUTATION_INITIAL as AssertionMutationState
  );
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">New assertion</h3>
      <p className="mt-1 text-xs text-zinc-500">
        Manual entry only (WP-10). Optional prefill copies the first paragraph of the case story — it does not change
        truth or support states.
      </p>
      {storyExcerpt ? (
        <button
          type="button"
          data-testid="assertion-prefill-from-story"
          className="mt-2 text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          onClick={() => {
            if (textRef.current) textRef.current.value = storyExcerpt;
          }}
        >
          Prefill from case story (first paragraph)
        </button>
      ) : null}
      {state.error ? (
        <p data-testid="assertion-create-error" className="mt-2 text-sm text-red-700 dark:text-red-300">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p data-testid="assertion-create-success" className="mt-2 text-sm text-emerald-800 dark:text-emerald-200">
          {state.success}
        </p>
      ) : null}
      <form action={formAction} className="mt-4 space-y-3">
        <input type="hidden" name="matter_id" value={matterId} />
        {caseStoryId ? <input type="hidden" name="case_story_id" value={caseStoryId} /> : null}
        <div>
          <label htmlFor="assertion_text" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Assertion text
          </label>
          <textarea
            ref={textRef}
            id="assertion_text"
            name="assertion_text"
            required
            rows={4}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            placeholder="Atomic claim in plain language…"
          />
        </div>
        <div>
          <label htmlFor="assertion_type" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Type / category
          </label>
          <input
            id="assertion_type"
            name="assertion_type"
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            placeholder="e.g. fact, legal, procedural"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Truth state</label>
            <select
              name="truth_state"
              defaultValue="pending_verification"
              className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
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
              defaultValue="pending"
              className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
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
              defaultValue="pending_review"
              className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
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
              defaultValue="medium"
              className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
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
              defaultValue="none"
              className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
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
          <label htmlFor="gaps" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Gaps / open questions
          </label>
          <textarea id="gaps" name="gaps" rows={2} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" />
        </div>
        <div>
          <label htmlFor="vulnerability" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Vulnerability notes
          </label>
          <textarea
            id="vulnerability"
            name="vulnerability"
            rows={2}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            General notes
          </label>
          <textarea id="notes" name="notes" rows={2} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" />
        </div>
        <label className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
          <input type="checkbox" name="contradiction_flag" className="rounded border-zinc-400" />
          Contradiction flagged
        </label>
        <button
          type="submit"
          data-testid="assertion-create-submit"
          disabled={pending}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {pending ? "Creating…" : "Create assertion"}
        </button>
      </form>
    </section>
  );
}
