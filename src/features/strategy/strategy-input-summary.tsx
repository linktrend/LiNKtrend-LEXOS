import Link from "next/link";
import type { StrategyWorkspaceSummary } from "@/server/strategy/summary";

export function StrategyInputSummaryPanel({
  matterId,
  summary,
  workflowAdvanceHint = "strategy",
}: {
  matterId: string;
  summary: StrategyWorkspaceSummary;
  /** W6 research packet: warn when matter is not in W6/W7 for automatic W7 advance. */
  workflowAdvanceHint?: "strategy" | "research";
}) {
  const states = Object.entries(summary.assertionCountBySupportState).sort(([a], [b]) => a.localeCompare(b));
  const unsupportedCount = summary.unsupportedAssertions.length;
  const manyUnsupported =
    unsupportedCount >= 3 ||
    (summary.assertionTotal >= 4 && unsupportedCount >= Math.ceil(summary.assertionTotal * 0.4));

  const showStrategyW6Hint = summary.currentWorkflow && summary.currentWorkflow !== "W5";
  const showResearchW7Hint =
    summary.currentWorkflow &&
    summary.currentWorkflow !== "W6" &&
    summary.currentWorkflow !== "W7";

  return (
    <div className="space-y-4 text-sm">
      {workflowAdvanceHint === "strategy" && showStrategyW6Hint ? (
        <div className="rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100">
          Matter workflow is <span className="font-semibold">{summary.currentWorkflow}</span>. Advancing to W6
          happens automatically only when the first strategy memo is created while the matter is in W5.
        </div>
      ) : null}
      {workflowAdvanceHint === "research" && showResearchW7Hint ? (
        <div className="rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100">
          Matter workflow is <span className="font-semibold">{summary.currentWorkflow}</span>. Advancing to W7
          happens automatically only when the first research memo is created while the matter is in W6.
        </div>
      ) : null}

      {summary.zeroActiveSupportLinks ? (
        <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
          No active support matrix links for this matter.{" "}
          <Link href={`/matters/${matterId}/support`} className="font-medium underline">
            Open support matrix
          </Link>
        </div>
      ) : null}

      {manyUnsupported ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
          Many assertions are still <span className="font-semibold">unsupported</span> ({unsupportedCount} of{" "}
          {summary.assertionTotal} active). Map evidence in the support matrix before relying on them in strategy or
          downstream drafting.{" "}
          <Link href={`/matters/${matterId}/support`} className="font-medium underline">
            Open support matrix
          </Link>
        </div>
      ) : null}

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Case story
        </h3>
        <p className="mt-1 text-zinc-800 dark:text-zinc-200">
          {summary.storyTitle ? (
            <>
              <span className="font-medium">{summary.storyTitle}</span>
              <span className="text-zinc-500"> · </span>
            </>
          ) : (
            <span className="text-zinc-500">No primary story title · </span>
          )}
          {summary.storyContentLen} characters of markdown
        </p>
        <p className="mt-1">
          <Link href={`/matters/${matterId}/story`} className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Edit story
          </Link>
        </p>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Assertions ({summary.assertionTotal})
        </h3>
        <ul className="mt-1 space-y-0.5 text-xs text-zinc-700 dark:text-zinc-300">
          {states.length === 0 ? <li>None</li> : null}
          {states.map(([k, n]) => (
            <li key={k}>
              <span className="font-medium">{k}</span>: {n}
            </li>
          ))}
        </ul>
        <p className="mt-1">
          <Link
            href={`/matters/${matterId}/assertions`}
            className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Open assertions
          </Link>
        </p>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Support matrix
        </h3>
        <p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300">
          Active links: <span className="font-semibold">{summary.activeSupportLinkCount}</span>
          {summary.supportQaConcernLinkCount > 0 ? (
            <>
              {" "}
              · Links with extraction QA concerns:{" "}
              <span className="font-semibold text-amber-800 dark:text-amber-200">
                {summary.supportQaConcernLinkCount}
              </span>
            </>
          ) : null}
        </p>
        <p className="mt-1">
          <Link href={`/matters/${matterId}/support`} className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Open support matrix
          </Link>
        </p>
      </div>
    </div>
  );
}
