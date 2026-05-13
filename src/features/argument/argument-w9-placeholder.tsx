import Link from "next/link";

export function ArgumentW9Placeholder({ matterId }: { matterId: string }) {
  return (
    <section className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
      <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Adversarial review (W9)</h3>
      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
        Mandatory adversarial critique is not implemented in this work packet. When WP-21 ships, it will consume this
        argument draft under a separate review workflow — not auto-started from W8.
      </p>
      <p className="mt-2 text-xs text-zinc-500">
        Matter overview:{" "}
        <Link href={`/matters/${matterId}`} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
          Back to matter
        </Link>
      </p>
    </section>
  );
}
