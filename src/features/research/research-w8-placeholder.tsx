export function ResearchW8Placeholder() {
  return (
    <section className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
      <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Argument (W8)</h3>
      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
        Argument drafting is not in this work packet. When implemented, it will consume research and strategy artifacts
        under separate review workflows.
      </p>
      <button
        type="button"
        disabled
        className="mt-3 cursor-not-allowed rounded-md bg-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-600"
      >
        Open argument draft (not available)
      </button>
    </section>
  );
}
