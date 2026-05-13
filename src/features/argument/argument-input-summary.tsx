import Link from "next/link";
import type { ArgumentWorkspaceSummary } from "@/server/argument/summary";
import { ResearchInputSummaryPanel } from "@/features/research/research-input-summary";

export function ArgumentInputSummaryPanel({
  matterId,
  summary,
}: {
  matterId: string;
  summary: ArgumentWorkspaceSummary;
}) {
  return (
    <div className="space-y-4">
      <ResearchInputSummaryPanel matterId={matterId} summary={summary} workflowAdvanceHint="argument" />
      <div className="border-t border-zinc-200 pt-4 text-sm dark:border-zinc-800">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Research memos (read-only)
        </h3>
        {summary.researchMemos.length === 0 ? (
          <p className="mt-1 text-xs text-zinc-500">None yet.</p>
        ) : (
          <ul className="mt-2 space-y-1 text-xs">
            {summary.researchMemos.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/matters/${matterId}/research/${m.id}`}
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  {(m.title ?? "Untitled").slice(0, 80)}
                </Link>
                <span className="text-zinc-500"> · {m.status}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2">
          <Link
            href={`/matters/${matterId}/research`}
            className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            All research memos
          </Link>
        </p>
      </div>
      <div className="border-t border-zinc-200 pt-4 text-sm dark:border-zinc-800">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Open research issues
        </h3>
        {summary.openResearchIssues.length === 0 ? (
          <p className="mt-1 text-xs text-zinc-500">None (or all resolved).</p>
        ) : (
          <ul className="mt-2 max-h-48 space-y-2 overflow-y-auto text-xs">
            {summary.openResearchIssues.map((i) => (
              <li key={`${i.memoId}-${i.issueId}`} className="rounded border border-zinc-200 p-2 dark:border-zinc-700">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">{i.issueTitle}</span>
                <span className="text-zinc-500"> · {i.status}</span>
                <p className="mt-0.5 text-zinc-500">
                  Memo:{" "}
                  <Link
                    href={`/matters/${matterId}/research/${i.memoId}`}
                    className="text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {i.memoTitle.slice(0, 60)}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
