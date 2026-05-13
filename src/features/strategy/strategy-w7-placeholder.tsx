export function StrategyW7Placeholder() {
  return (
    <section className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
      <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Research (W7)</h3>
      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
        Research memos, jurisdiction, and authority lists are not implemented in this work packet. The list below is
        planning-only text stored on this memo, not W7 records.
      </p>
      <button
        type="button"
        disabled
        className="mt-3 cursor-not-allowed rounded-md bg-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-600"
      >
        Open research workspace (disabled)
      </button>
    </section>
  );
}
