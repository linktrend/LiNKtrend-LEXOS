import Link from "next/link";
import type { EvidenceCurrentExtractionSummary, EvidenceRow } from "@/server/evidence/queries";
import {
  extractionQualityBadgeClass,
  extractionStatusLabelClass,
  processingStatusBadgeClass,
} from "@/components/evidence/evidenceBadgeStyles";

type Props = {
  matterId: string;
  rows: EvidenceRow[];
  extractionSummaries: Map<string, EvidenceCurrentExtractionSummary>;
};

export function EvidenceTable({ matterId, rows, extractionSummaries }: Props) {
  if (rows.length === 0) {
    return (
      <div
        data-testid="evidence-list-empty"
        className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50/50 px-4 py-8 text-center dark:border-zinc-700 dark:bg-zinc-900/30"
      >
        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">No evidence for this matter yet</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Upload an original file above. LEXOS keeps the upload unchanged as the evidentiary anchor; extractions are
          separate objects (W4-lite).
        </p>
        <Link
          href="#evidence-upload"
          className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Go to upload
        </Link>
      </div>
    );
  }

  return (
    <div
      data-testid="evidence-table"
      className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800"
    >
      <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
        <thead className="bg-zinc-50 dark:bg-zinc-900/50">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
              Label / file
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">Media</th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">Processing</th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">Extraction</th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
              Extraction quality
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">Quality</th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">Review</th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">Uploaded</th>
            <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wide text-zinc-500">Detail</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-950">
          {rows.map((row) => {
            const sum = extractionSummaries.get(row.id);
            const extQ = sum?.extraction_quality_status ?? null;
            const reviewNeeded =
              row.human_review_required ||
              sum?.human_review_required ||
              extQ === "human_review_required" ||
              extQ === "qa_flagged" ||
              extQ === "failed";
            return (
              <tr key={row.id} data-testid={`evidence-row-${row.id}`}>
                <td className="px-3 py-2 text-zinc-900 dark:text-zinc-100">
                  <div className="font-medium">{row.evidence_label ?? row.file_name ?? "—"}</div>
                  {row.file_name && row.evidence_label ? (
                    <div className="text-xs text-zinc-500">{row.file_name}</div>
                  ) : null}
                </td>
                <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{row.evidence_media_type ?? "—"}</td>
                <td className="px-3 py-2">
                  <span className={processingStatusBadgeClass(row.processing_status)}>
                    {row.processing_status ?? "—"}
                  </span>
                </td>
                <td className="px-3 py-2">
                  {row.extraction_status ? (
                    <span className={extractionStatusLabelClass(row.extraction_status)}>{row.extraction_status}</span>
                  ) : (
                    <span className={extractionStatusLabelClass(null)}>none</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  <span className={extractionQualityBadgeClass(extQ)}>{extQ ?? "—"}</span>
                </td>
                <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{row.quality_status ?? "—"}</td>
                <td className="px-3 py-2">
                  {reviewNeeded ? (
                    <span className="inline-flex rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-950 dark:bg-orange-950/50 dark:text-orange-100">
                      Review
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-400">—</span>
                  )}
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
