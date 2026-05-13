import Link from "next/link";

export function SupportMatrixPlaceholder({ matterId }: { matterId: string }) {
  return (
    <section
      data-testid="support-matrix-placeholder"
      className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50/80 p-4 dark:border-zinc-600 dark:bg-zinc-900/40"
    >
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Support matrix (W5)</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Map assertions to evidence and optional extractions in the Support workspace. Rollup updates assertion support
        state from active links; truth state stays operator-controlled.
      </p>
      <p className="mt-2 font-mono text-xs text-zinc-500">Matter {matterId}</p>
      <Link
        href={`/matters/${matterId}/support`}
        className="mt-3 inline-flex rounded-md border border-indigo-600 bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500"
      >
        Open support matrix
      </Link>
    </section>
  );
}
