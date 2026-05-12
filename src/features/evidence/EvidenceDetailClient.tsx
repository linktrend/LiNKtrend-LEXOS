"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { Database } from "@/types/database";
import { runExtractionAction, runExtractionQaAction } from "@/app/matters/[matterId]/evidence/[evidenceId]/actions";
import { EXTRACTION_RUN_INITIAL } from "@/app/matters/[matterId]/evidence/[evidenceId]/run-extraction-state";
import { EXTRACTION_QA_INITIAL } from "@/app/matters/[matterId]/evidence/[evidenceId]/run-qa-state";

type EvidenceRow = Database["public"]["Tables"]["evidence"]["Row"];
type EvidenceExtractionRow = Database["public"]["Tables"]["evidence_extractions"]["Row"];

function readLastQa(meta: unknown): { at?: string; result?: string } | null {
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) return null;
  const last = (meta as Record<string, unknown>).last_qa;
  if (!last || typeof last !== "object" || Array.isArray(last)) return null;
  const o = last as Record<string, unknown>;
  const at = typeof o.at === "string" ? o.at : undefined;
  const result = typeof o.result === "string" ? o.result : undefined;
  if (!at && !result) return null;
  return { at, result };
}

type TabId = "original" | "markdown" | "json" | "quality" | "qa";

type Props = {
  matterId: string;
  evidenceId: string;
  row: EvidenceRow;
  downloadUrl: string | null;
  downloadError: string | null;
  extractions: EvidenceExtractionRow[];
};

export function EvidenceDetailClient({
  matterId,
  evidenceId,
  row,
  downloadUrl,
  downloadError,
  extractions,
}: Props) {
  const [tab, setTab] = useState<TabId>("original");
  const [state, formAction, pending] = useActionState(runExtractionAction, EXTRACTION_RUN_INITIAL);
  const [qaState, qaFormAction, qaPending] = useActionState(runExtractionQaAction, EXTRACTION_QA_INITIAL);

  const current = extractions.find((e) => e.is_current) ?? extractions[0] ?? null;
  const lastQa = readLastQa(current?.metadata);
  const showReviewBanner =
    row.human_review_required ||
    current?.human_review_required ||
    current?.extraction_quality_status === "human_review_required" ||
    current?.extraction_quality_status === "qa_flagged" ||
    current?.extraction_quality_status === "failed";

  const flags = current?.quality_flags;
  const flagsText = Array.isArray(flags) ? flags.join(", ") : flags ? JSON.stringify(flags) : "—";

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
        <p className="mt-1 text-xs text-zinc-500" data-testid="evidence-status-line">
          ID {row.id} · Media {row.evidence_media_type ?? "—"} · Processing {row.processing_status ?? "—"}
          {row.extraction_status ? ` · Extraction ${row.extraction_status}` : ""}
          {row.quality_status ? ` · Quality ${row.quality_status}` : ""}
        </p>
      </div>

      {showReviewBanner ? (
        <div
          data-testid="human-review-banner"
          className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
        >
          Human review may be required. Do not treat extraction as verified until WP-08 QA and review are complete.
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-2 dark:border-zinc-800">
        {(
          [
            ["original", "Original"],
            ["markdown", "Markdown"],
            ["json", "Structured JSON"],
            ["quality", "Quality / Flags"],
            ["qa", "QA (WP-08)"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium ${
              tab === id
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "original" ? (
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
      ) : null}

      {tab === "markdown" ? (
        <section
          data-testid="markdown-extraction-panel"
          className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
        >
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Markdown extraction</h2>
          {current?.markdown_text ? (
            <pre className="mt-3 max-h-[480px] overflow-auto whitespace-pre-wrap rounded-md bg-zinc-50 p-3 text-xs text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
              {current.markdown_text}
            </pre>
          ) : (
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">No extraction yet. Run extraction below.</p>
          )}
        </section>
      ) : null}

      {tab === "json" ? (
        <section
          data-testid="json-extraction-panel"
          className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
        >
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Structured JSON</h2>
          {current?.json_content != null ? (
            <pre className="mt-3 max-h-[480px] overflow-auto rounded-md bg-zinc-50 p-3 text-xs text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
              {JSON.stringify(current.json_content, null, 2)}
            </pre>
          ) : (
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">No extraction yet.</p>
          )}
        </section>
      ) : null}

      {tab === "quality" ? (
        <section
          data-testid="quality-flags-panel"
          className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
        >
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Quality / Flags</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div>
              <dt className="text-xs text-zinc-500">Extraction quality</dt>
              <dd className="text-zinc-900 dark:text-zinc-100">{current?.extraction_quality_status ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Human review required</dt>
              <dd className="text-zinc-900 dark:text-zinc-100">{current?.human_review_required ? "Yes" : "No"}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Quality flags</dt>
              <dd className="text-zinc-900 dark:text-zinc-100">{flagsText}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Extraction type</dt>
              <dd className="text-zinc-900 dark:text-zinc-100">{current?.extraction_type ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Tool</dt>
              <dd className="text-zinc-900 dark:text-zinc-100">{current?.extraction_tool ?? "—"}</dd>
            </div>
          </dl>
        </section>
      ) : null}

      {tab === "qa" ? (
        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">QA (WP-08)</h2>
          <p className="mt-1 text-xs text-zinc-500">
            Deterministic structural QA only (no vision or full semantic compare). Original evidence remains the
            anchor; extraction stays derivative.
          </p>
          <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400" data-testid="qa-status-line">
            Current extraction: {current?.id ?? "—"} · Quality{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {current?.extraction_quality_status ?? "—"}
            </span>
            {lastQa?.at ? ` · Last QA ${lastQa.at}` : ""}
            {lastQa?.result ? ` · Result ${lastQa.result}` : ""}
          </p>
          <div data-testid="qa-flags-panel" className="mt-2 text-xs text-zinc-700 dark:text-zinc-300">
            <span className="font-medium">Post-QA flags:</span> {flagsText}
          </div>
          {current?.notes ? (
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="font-medium">Notes:</span> {current.notes}
            </p>
          ) : null}
          {qaState.error ? (
            <p data-testid="qa-run-error" className="mt-2 text-sm text-red-700 dark:text-red-300">
              {qaState.error}
            </p>
          ) : null}
          <form action={qaFormAction} className="mt-3">
            <input type="hidden" name="matter_id" value={matterId} />
            <input type="hidden" name="evidence_id" value={evidenceId} />
            <button
              type="submit"
              data-testid="run-extraction-qa"
              disabled={qaPending || !current || !row.original_file_uri}
              className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-violet-700 disabled:opacity-50"
            >
              {qaPending ? "Running QA…" : "Run QA"}
            </button>
            {!current ? (
              <p className="mt-2 text-xs text-zinc-500">Run extraction first, then run QA.</p>
            ) : null}
          </form>
        </section>
      ) : null}

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
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Run extraction</h2>
        <p className="mt-1 text-xs text-zinc-500">
          Server-side W4-lite extraction (WP-07). Parser keys optional; unsupported files receive a flagged placeholder.
        </p>
        {state.error ? (
          <p data-testid="extraction-run-error" className="mt-2 text-sm text-red-700 dark:text-red-300">
            {state.error}
          </p>
        ) : null}
        {state.success ? (
          <p data-testid="extraction-run-success" className="mt-2 text-sm text-emerald-800 dark:text-emerald-200">
            {state.success}
          </p>
        ) : null}
        <form action={formAction} className="mt-3">
          <input type="hidden" name="matter_id" value={matterId} />
          <input type="hidden" name="evidence_id" value={evidenceId} />
          <button
            type="submit"
            data-testid="run-extraction"
            disabled={pending || !row.original_file_uri}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
          >
            {pending ? "Running…" : "Run extraction"}
          </button>
          {!row.original_file_uri ? (
            <p className="mt-2 text-xs text-zinc-500">Upload an original file before running extraction.</p>
          ) : null}
        </form>
      </section>
    </div>
  );
}
