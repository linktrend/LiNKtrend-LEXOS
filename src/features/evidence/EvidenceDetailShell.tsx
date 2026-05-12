import Link from "next/link";
import type { EvidenceRow } from "@/server/evidence/queries";

type Props = {
  matterId: string;
  row: EvidenceRow;
  downloadUrl: string | null;
  downloadError: string | null;
};

export function EvidenceDetailShell({ matterId, row, downloadUrl, downloadError }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/matters/${matterId}/evidence`}
          className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          ← Evidence list
        </Link>
        <h1 className="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {row.evidence_label ?? row.file_name ?? "Evidence"}
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          ID {row.id} · Media {row.evidence_media_type ?? "—"} · Processing {row.processing_status ?? "—"}
        </p>
      </div>

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Metadata</h2>
        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-zinc-500">File name</dt>
            <dd className="text-zinc-900 dark:text-zinc-100">{row.file_name ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">MIME / type</dt>
            <dd className="text-zinc-900 dark:text-zinc-100">{row.file_type ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Source type</dt>
            <dd className="text-zinc-900 dark:text-zinc-100">{row.source_type ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Privilege / confidentiality</dt>
            <dd className="text-zinc-900 dark:text-zinc-100">
              {row.privilege_status ?? "—"} / {row.confidentiality_status ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Storage path</dt>
            <dd className="break-all font-mono text-xs text-zinc-800 dark:text-zinc-200">
              {row.original_file_uri ?? "— (pending)"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Original file</h2>
        <p className="mt-1 text-xs text-zinc-500">
          Signed link expires in a few minutes. Refresh the page for a new link.
        </p>
        {downloadError ? (
          <p className="mt-2 text-sm text-red-700 dark:text-red-300">{downloadError}</p>
        ) : downloadUrl ? (
          <a
            href={downloadUrl}
            className="mt-3 inline-flex rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            rel="noreferrer"
          >
            Download original
          </a>
        ) : (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">No original stored yet.</p>
        )}
      </section>

      <section className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Extraction (WP-07)</h2>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          Markdown, structured JSON, extraction QA, and quality flags will appear here after the W4-lite extraction
          packet.
        </p>
      </section>
    </div>
  );
}
