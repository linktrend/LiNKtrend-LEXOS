import Link from "next/link";
import type { ResearchWorkspaceSummary } from "@/server/research/summary";
import { StrategyInputSummaryPanel } from "@/features/strategy/strategy-input-summary";

export function ResearchInputSummaryPanel({
  matterId,
  summary,
  workflowAdvanceHint = "research",
}: {
  matterId: string;
  summary: ResearchWorkspaceSummary;
  /** W7 research pages: W6→W7 hint. Argument (W8) pages: W7→W8 hint. Adversarial (W9): W8→W9 hint. */
  workflowAdvanceHint?: "research" | "argument" | "adversarial";
}) {
  return (
    <div className="space-y-4">
      <StrategyInputSummaryPanel matterId={matterId} summary={summary} workflowAdvanceHint={workflowAdvanceHint} />
      <div className="border-t border-zinc-200 pt-4 text-sm dark:border-zinc-800">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Strategy memos (read-only)
        </h3>
        {summary.strategyMemos.length === 0 ? (
          <p className="mt-1 text-xs text-zinc-500">None yet.</p>
        ) : (
          <ul className="mt-2 space-y-1 text-xs">
            {summary.strategyMemos.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/matters/${matterId}/strategy/${m.id}`}
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
            href={`/matters/${matterId}/strategy`}
            className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            All strategy memos
          </Link>
        </p>
      </div>
    </div>
  );
}
