import type { OutputWorkspaceSummary } from "@/server/output/summary";

export function OutputCaveatPanels({ summary }: { summary: OutputWorkspaceSummary }) {
  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
          W9 / adversarial context
        </h4>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          Active critiques: <span className="font-medium">{summary.activeAdversarialCount}</span>. Loop decisions and
          severity are shown on the linked critique; unresolved items must stay visible in your sections below.
        </p>
        {summary.activeAdversarialCritiques.length > 0 ? (
          <ul className="mt-2 space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
            {summary.activeAdversarialCritiques.map((c) => (
              <li key={c.id}>
                <span className="font-medium">{(c.title ?? "Critique").slice(0, 80)}</span>
                {c.loop_decision ? (
                  <span className="text-zinc-500"> — loop: {c.loop_decision}</span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-xs text-amber-800 dark:text-amber-200">
            No active adversarial critiques — create output only with an explicit operator override on the create
            form.
          </p>
        )}
      </section>

      <section className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
          Unsupported assertions
        </h4>
        {summary.unsupportedAssertions.length === 0 ? (
          <p className="mt-1 text-xs text-zinc-500">None listed (verify Support tab).</p>
        ) : (
          <ul className="mt-2 list-inside list-disc text-xs text-zinc-700 dark:text-zinc-300">
            {summary.unsupportedAssertions.map((a) => (
              <li key={a.id}>{a.snippet}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
          Contradictions / contested assertions
        </h4>
        {summary.contradictedAssertions.length === 0 ? (
          <p className="mt-1 text-xs text-zinc-500">None flagged.</p>
        ) : (
          <ul className="mt-2 list-inside list-disc text-xs text-zinc-700 dark:text-zinc-300">
            {summary.contradictedAssertions.map((a) => (
              <li key={a.id}>{a.snippet}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
          Evidence / extraction QA caveats
        </h4>
        {summary.evidenceQaConcerns.length === 0 ? (
          <p className="mt-1 text-xs text-zinc-500">No current extraction QA flags on listed evidence.</p>
        ) : (
          <ul className="mt-2 space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
            {summary.evidenceQaConcerns.map((e) => (
              <li key={e.evidenceId}>
                {(e.title ?? e.evidenceId).slice(0, 100)} — {e.extraction_quality_status ?? "review"}{" "}
                {e.human_review_required ? "(human review)" : ""}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
          Open research issues
        </h4>
        {summary.openResearchIssues.length === 0 ? (
          <p className="mt-1 text-xs text-zinc-500">None open.</p>
        ) : (
          <ul className="mt-2 list-inside list-disc text-xs text-zinc-700 dark:text-zinc-300">
            {summary.openResearchIssues.map((i) => (
              <li key={`${i.memoId}-${i.issueId}`}>
                {i.issueTitle} <span className="text-zinc-500">({i.status})</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
          Support matrix QA concerns
        </h4>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          Links with extraction QA concerns:{" "}
          <span className="font-medium">{summary.supportQaConcernLinkCount}</span>
        </p>
      </section>
    </div>
  );
}
