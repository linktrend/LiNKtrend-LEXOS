export function SupportMatrixPlaceholder({ matterId }: { matterId: string }) {
  return (
    <section
      data-testid="support-matrix-placeholder"
      className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50/80 p-4 dark:border-zinc-600 dark:bg-zinc-900/40"
    >
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Support matrix (W5)</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Linking assertions to evidence and extractions is deferred to WP-11. Status fields on assertions describe
        narrative intent only until support mapping exists.
      </p>
      <p className="mt-2 font-mono text-xs text-zinc-500">Matter {matterId}</p>
      <button
        type="button"
        disabled
        className="mt-3 cursor-not-allowed rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-500"
        aria-disabled="true"
      >
        Open support matrix (not available)
      </button>
    </section>
  );
}
