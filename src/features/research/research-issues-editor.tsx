"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  RESEARCH_ISSUE_STATUSES,
  type ResearchIssueStatus,
} from "@/features/research/template-keys";
import type { ResearchIssue } from "@/features/research/template-json";

function isValidUuid(s: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s.trim());
}

export function ResearchIssuesEditor({
  initialIssues,
  matterId,
  formKey,
}: {
  initialIssues: ResearchIssue[];
  matterId: string;
  /** Used for stable child keys when the memo version changes (parent remounts this component). */
  formKey: string;
}) {
  const [issues, setIssues] = useState<ResearchIssue[]>(initialIssues);

  const issuesJson = useMemo(() => JSON.stringify(issues), [issues]);

  const openIssues = issues.filter((i) => i.status !== "resolved");
  const resolvedIssues = issues.filter((i) => i.status === "resolved");

  const hasBlockedOrEvidence = issues.some(
    (i) => i.status === "blocked" || i.status === "needs_evidence"
  );

  function updateIssue(id: string, patch: Partial<ResearchIssue>) {
    setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }

  function removeIssue(id: string) {
    setIssues((prev) => prev.filter((i) => i.id !== id));
  }

  function addIssue() {
    setIssues((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "New research issue",
        status: "pending" as ResearchIssueStatus,
        description: null,
        notes: null,
      },
    ]);
  }

  return (
    <div className="space-y-3" data-testid="research-issues-editor">
      <input type="hidden" name="research_issues_json" value={issuesJson} readOnly />

      {hasBlockedOrEvidence ? (
        <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
          One or more issues are <span className="font-semibold">blocked</span> or{" "}
          <span className="font-semibold">need evidence</span>. Track resolution before relying on this memo.
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Research issues / tasks</h3>
        <button
          key={`${formKey}-add`}
          type="button"
          onClick={addIssue}
          className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
        >
          Add issue
        </button>
      </div>

      {openIssues.length === 0 ? (
        <p className="text-xs text-zinc-500">No open issues. Add tasks or risks as you work.</p>
      ) : (
        <ul className="space-y-3">
          {openIssues.map((issue) => (
            <li
              key={issue.id}
              className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex flex-wrap gap-2">
                <input
                  aria-label="Issue title"
                  value={issue.title}
                  onChange={(e) => updateIssue(issue.id, { title: e.target.value })}
                  className="min-w-[12rem] flex-1 rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-900"
                />
                <select
                  aria-label="Issue status"
                  value={issue.status}
                  onChange={(e) =>
                    updateIssue(issue.id, { status: e.target.value as ResearchIssueStatus })
                  }
                  className="rounded-md border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-600 dark:bg-zinc-900"
                >
                  {RESEARCH_ISSUE_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeIssue(issue.id)}
                  className="text-xs text-red-700 hover:underline dark:text-red-300"
                >
                  Remove
                </button>
              </div>
              <label className="mt-2 block text-xs text-zinc-500">Description</label>
              <textarea
                value={issue.description ?? ""}
                onChange={(e) => updateIssue(issue.id, { description: e.target.value || null })}
                rows={2}
                className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-600 dark:bg-zinc-900"
              />
              <label className="mt-2 block text-xs text-zinc-500">Notes</label>
              <textarea
                value={issue.notes ?? ""}
                onChange={(e) => updateIssue(issue.id, { notes: e.target.value || null })}
                rows={2}
                className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-600 dark:bg-zinc-900"
              />
              <label className="mt-2 block text-xs text-zinc-500">Linked assertion ID (optional)</label>
              <input
                value={(issue.linked_assertion_ids?.[0] ?? "") as string}
                onChange={(e) => {
                  const v = e.target.value.trim();
                  updateIssue(issue.id, {
                    linked_assertion_ids: v && isValidUuid(v) ? [v] : undefined,
                  });
                }}
                placeholder="UUID"
                className="mt-1 w-full max-w-md rounded-md border border-zinc-300 px-2 py-1 font-mono text-xs dark:border-zinc-600 dark:bg-zinc-900"
              />
              {issue.linked_assertion_ids?.[0] && isValidUuid(issue.linked_assertion_ids[0]) ? (
                <p className="mt-1 text-xs">
                  <Link
                    href={`/matters/${matterId}/assertions/${issue.linked_assertion_ids[0]}`}
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    Open assertion
                  </Link>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {resolvedIssues.length > 0 ? (
        <details className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/30">
          <summary className="cursor-pointer text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Resolved issues ({resolvedIssues.length}) — still visible
          </summary>
          <ul className="mt-3 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
            {resolvedIssues.map((issue) => (
              <li key={issue.id} className="flex flex-wrap items-start gap-2">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">{issue.title}</span>
                <select
                  aria-label="Resolved issue status"
                  value={issue.status}
                  onChange={(e) =>
                    updateIssue(issue.id, { status: e.target.value as ResearchIssueStatus })
                  }
                  className="rounded border border-zinc-300 bg-white px-1 py-0.5 dark:border-zinc-600 dark:bg-zinc-900"
                >
                  {RESEARCH_ISSUE_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeIssue(issue.id)}
                  className="text-red-700 hover:underline dark:text-red-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}
