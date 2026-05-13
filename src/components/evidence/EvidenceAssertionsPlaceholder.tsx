import Link from "next/link";

type Props = {
  matterId: string;
};

/**
 * W5 support matrix — link to matter Support workspace (WP-11).
 */
export function EvidenceAssertionsPlaceholder({ matterId }: Props) {
  return (
    <section
      data-testid="evidence-assertions-placeholder"
      className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50/80 p-4 dark:border-zinc-600 dark:bg-zinc-900/40"
    >
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Linked assertions (W5)</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Original evidence remains the anchor; extractions are derivative. Create support links in the Support workspace
        to record how evidence relates to assertions.
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
