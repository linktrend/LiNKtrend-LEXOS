import Link from "next/link";
import type { EvidenceRow } from "@/server/evidence/queries";

function statusBadgeClass(status: string | null): string {
  const base =
    "inline-flex rounded-full px-2 py-0.5 text-xs font-medium";
  switch (status) {
    case "uploaded":
      return `${base} bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-100`;
    case "queued":
    case "processing":
      return `${base} bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100`;
    case "processed":
      return `${base} bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100`;
    case "qa_flagged":
    case "failed":
    case "requires_human_review":
      return `${base} bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-100`;
    default:
      return `${base} bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100`;
  }
}

type Props = {
  matterId: string;
  rows: EvidenceRow[];
};

export function EvidenceTable({ matterId, rows }: Props) {
  if (rows.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        No evidence yet. Upload a file above.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
        <thead className="bg-zinc-50 dark:bg-zinc-900/50">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
              Label / file
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
              Media
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
              Status
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
              Uploaded
            </th>
            <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wide text-zinc-500">
              Detail
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-950">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-3 py-2 text-zinc-900 dark:text-zinc-100">
                <div className="font-medium">{row.evidence_label ?? row.file_name ?? "—"}</div>
                {row.file_name && row.evidence_label ? (
                  <div className="text-xs text-zinc-500">{row.file_name}</div>
                ) : null}
              </td>
              <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{row.evidence_media_type ?? "—"}</td>
              <td className="px-3 py-2">
                <span className={statusBadgeClass(row.processing_status)}>{row.processing_status ?? "—"}</span>
                {row.human_review_required ? (
                  <span className="ml-2 text-xs text-amber-700 dark:text-amber-300">Review</span>
                ) : null}
              </td>
              <td className="whitespace-nowrap px-3 py-2 text-zinc-600 dark:text-zinc-400">
                {row.uploaded_at ? new Date(row.uploaded_at).toLocaleString() : "—"}
              </td>
              <td className="px-3 py-2 text-right">
                <Link
                  href={`/matters/${matterId}/evidence/${row.id}`}
                  className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
