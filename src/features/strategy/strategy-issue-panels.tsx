import Link from "next/link";
import type { StrategyWorkspaceSummary } from "@/server/strategy/summary";

export function StrategyIssuePanels({
  matterId,
  summary,
}: {
  matterId: string;
  summary: StrategyWorkspaceSummary;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Unsupported assertions</h3>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          These remain visible — do not treat as proven until supported.
        </p>
        {summary.unsupportedAssertions.length === 0 ? (
          <p className="mt-2 text-xs text-zinc-500">None in active assertions.</p>
        ) : (
          <ul className="mt-2 space-y-2 text-xs">
            {summary.unsupportedAssertions.map((u) => (
              <li key={u.id}>
                <Link
                  href={`/matters/${matterId}/assertions/${u.id}`}
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Open
                </Link>
                <span className="text-zinc-600 dark:text-zinc-400"> · {u.snippet}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Contradictions / flags</h3>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          Assertions marked contradicted or with active contradiction signals.
        </p>
        {summary.contradictedAssertions.length === 0 ? (
          <p className="mt-2 text-xs text-zinc-500">None flagged.</p>
        ) : (
          <ul className="mt-2 space-y-2 text-xs">
            {summary.contradictedAssertions.map((u) => (
              <li key={u.id}>
                <Link
                  href={`/matters/${matterId}/assertions/${u.id}`}
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Open
                </Link>
                <span className="text-zinc-600 dark:text-zinc-400"> · {u.snippet}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Evidence / support gaps</h3>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          From assertion metadata <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">next_support_action</code>{" "}
          when set.
        </p>
        {summary.evidenceGapHints.length === 0 ? (
          <p className="mt-2 text-xs text-zinc-500">No gap hints recorded.</p>
        ) : (
          <ul className="mt-2 space-y-2 text-xs">
            {summary.evidenceGapHints.map((u) => (
              <li key={u.id}>
                <Link
                  href={`/matters/${matterId}/support?assertionId=${u.id}`}
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Support matrix
                </Link>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {" "}
                  · <span className="font-medium">{u.nextSupportAction}</span> · {u.snippet}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
