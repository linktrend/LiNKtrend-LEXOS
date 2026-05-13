import Link from "next/link";

export function StrategyW7Placeholder({ matterId }: { matterId: string }) {
  return (
    <section className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
      <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Research (W7)</h3>
      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
        Open the matter research workspace for structured memos, issues, and operator-entered authorities. Strategy
        template &quot;research needed&quot; text remains planning-only until copied into W7.
      </p>
      <Link
        href={`/matters/${matterId}/research`}
        className="mt-3 inline-flex rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500"
      >
        Open research workspace
      </Link>
    </section>
  );
}
