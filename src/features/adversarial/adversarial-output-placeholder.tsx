import Link from "next/link";

export function AdversarialOutputPlaceholder({ matterId }: { matterId: string }) {
  return (
    <section className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
      <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Revised output (W11)</h3>
      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
        Post-adversarial revised output is operator-authored on the Output tab. Nothing is generated automatically; loop
        decisions may point here as a workflow hint only.
      </p>
      <p className="mt-2 text-xs text-zinc-500">
        <Link
          href={`/matters/${matterId}/output`}
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Open revised output workspace
        </Link>
      </p>
    </section>
  );
}
