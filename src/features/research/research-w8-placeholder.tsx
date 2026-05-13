import Link from "next/link";

export function ResearchW8Placeholder({ matterId }: { matterId: string }) {
  return (
    <section className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
      <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Argument (W8)</h3>
      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
        Open the argument workspace to create or edit internal argument drafts. Adversarial review (W9) is a separate
        packet and does not start automatically.
      </p>
      <Link
        href={`/matters/${matterId}/argument`}
        className="mt-3 inline-flex rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500"
      >
        Open argument drafts
      </Link>
    </section>
  );
}
