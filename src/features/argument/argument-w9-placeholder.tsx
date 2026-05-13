import Link from "next/link";

export function ArgumentW9Placeholder({ matterId }: { matterId: string }) {
  return (
    <section className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
      <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Adversarial review (W9)</h3>
      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
        Mandatory adversarial critique is operator-driven in the Adversarial workspace (WP-15). It consumes this
        argument draft under a separate review flow — not auto-started from W8, and it does not auto-generate revised
        output.
      </p>
      <p className="mt-2 text-xs text-zinc-500">
        <Link
          href={`/matters/${matterId}/adversarial`}
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Open adversarial critiques
        </Link>
        {" · "}
        <Link href={`/matters/${matterId}`} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
          Matter overview
        </Link>
      </p>
    </section>
  );
}
