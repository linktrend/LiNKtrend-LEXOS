"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Database } from "@/types/database";
import { SUPPORT_STATE_OPTIONS } from "@/features/assertions/fields";
import { isAssertionArchivedRow } from "@/features/assertions/assertion-utils";
import {
  archiveSupportMatrixItemAction,
  createSupportMatrixItemAction,
  updateSupportMatrixItemAction,
} from "@/app/matters/[matterId]/support/actions";
import {
  SUPPORT_MUTATION_INITIAL,
  type SupportMutationState,
} from "@/app/matters/[matterId]/support/support-mutation-state";
import {
  extractionQaWarning,
  isSupportMatrixItemArchivedClient,
  type SupportMatrixItemRow,
} from "@/features/support/support-matrix-utils";

type AssertionOption = Pick<
  Database["public"]["Tables"]["assertions"]["Row"],
  "id" | "assertion_text" | "support_state" | "truth_state" | "use_status" | "metadata"
>;

type EvidenceOption = Pick<
  Database["public"]["Tables"]["evidence"]["Row"],
  "id" | "evidence_label" | "file_name"
>;

type ExtractionOption = Pick<
  Database["public"]["Tables"]["evidence_extractions"]["Row"],
  "id" | "evidence_id" | "extraction_quality_status" | "human_review_required" | "is_current"
>;

export type SupportMatrixWorkspaceProps = {
  matterId: string;
  initialAssertionId: string | null;
  assertions: AssertionOption[];
  evidence: EvidenceOption[];
  extractions: ExtractionOption[];
  rows: {
    item: SupportMatrixItemRow;
    assertion_text: string | null;
    evidence_label: string | null;
    evidence_file_name: string | null;
    extraction: ExtractionOption | null;
  }[];
};

const RISK_OPTIONS = ["", "low", "moderate", "high", "critical"] as const;
const RELEVANCE_OPTIONS = ["", "low", "medium", "high"] as const;

function evidenceLabel(e: EvidenceOption): string {
  return (e.evidence_label || e.file_name || e.id).slice(0, 80);
}

export function SupportMatrixWorkspace({
  matterId,
  initialAssertionId,
  assertions,
  evidence,
  extractions,
  rows,
}: SupportMatrixWorkspaceProps) {
  const router = useRouter();
  const [showArchived, setShowArchived] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [createState, createAction, createPending] = useActionState(
    createSupportMatrixItemAction,
    SUPPORT_MUTATION_INITIAL as SupportMutationState
  );
  const [updateState, updateAction, updatePending] = useActionState(
    updateSupportMatrixItemAction,
    SUPPORT_MUTATION_INITIAL as SupportMutationState
  );
  const [archiveState, archiveAction, archivePending] = useActionState(
    archiveSupportMatrixItemAction,
    SUPPORT_MUTATION_INITIAL as SupportMutationState
  );

  useEffect(() => {
    if (!createState.success && !updateState.success && !archiveState.success) return;
    const id = window.setTimeout(() => {
      router.refresh();
    }, 400);
    return () => window.clearTimeout(id);
  }, [archiveState.success, createState.success, router, updateState.success]);

  const activeRows = useMemo(
    () => rows.filter((r) => showArchived || !isSupportMatrixItemArchivedClient(r.item.metadata)),
    [rows, showArchived]
  );

  const linkCountByAssertion = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of rows) {
      if (isSupportMatrixItemArchivedClient(r.item.metadata)) continue;
      m.set(r.item.assertion_id, (m.get(r.item.assertion_id) ?? 0) + 1);
    }
    return m;
  }, [rows]);

  const openAssertions = useMemo(() => assertions.filter((a) => !isAssertionArchivedRow(a)), [assertions]);

  const unsupportedAssertions = useMemo(
    () => openAssertions.filter((a) => !linkCountByAssertion.has(a.id)),
    [linkCountByAssertion, openAssertions]
  );

  const contradictedOrRisky = useMemo(() => {
    const ids = new Set<string>();
    for (const r of rows) {
      if (isSupportMatrixItemArchivedClient(r.item.metadata)) continue;
      if (r.item.support_state === "contradicted") ids.add(r.item.assertion_id);
      if (r.item.risk_level === "high" || r.item.risk_level === "critical") ids.add(r.item.assertion_id);
    }
    return openAssertions.filter((a) => ids.has(a.id));
  }, [openAssertions, rows]);

  const materialSummary = useMemo(() => {
    let highNoLink = 0;
    for (const a of openAssertions) {
      const m = a.metadata as Record<string, unknown> | null;
      const mat = m && typeof m.materiality === "string" ? m.materiality : null;
      if (mat === "high" && !linkCountByAssertion.has(a.id)) highNoLink += 1;
    }
    return { highMaterialUnsupported: highNoLink, totalAssertions: openAssertions.length, linkedAssertions: linkCountByAssertion.size };
  }, [linkCountByAssertion, openAssertions]);

  const editingRow = editingId ? rows.find((r) => r.item.id === editingId) : null;

  return (
    <div data-testid="support-matrix-workspace" className="space-y-10">
      <section className="rounded-lg border border-amber-200 bg-amber-50/80 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
        <h3 className="text-sm font-semibold text-amber-950 dark:text-amber-100">Support mapping is not verification</h3>
        <p className="mt-1 text-xs text-amber-900/90 dark:text-amber-200/90">
          Links record how evidence relates to assertions. Original evidence remains the anchor; extractions are
          derivative aids. Assertion <span className="font-medium">truth</span> state is never auto-verified from
          support links. Rollup may overwrite assertion <span className="font-medium">support</span> state when links
          change.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Unsupported assertions</h3>
          <p className="mt-1 text-xs text-zinc-500">
            No active support link (archived-only counts as unsupported for coverage).
          </p>
          <ul className="mt-3 max-h-48 list-inside list-disc space-y-1 overflow-y-auto text-xs text-zinc-700 dark:text-zinc-300">
            {unsupportedAssertions.length === 0 ? (
              <li className="list-none text-zinc-500">All open assertions have at least one active link.</li>
            ) : (
              unsupportedAssertions.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/matters/${matterId}/assertions/${a.id}`}
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {(a.assertion_text ?? "").slice(0, 120)}
                    {(a.assertion_text?.length ?? 0) > 120 ? "…" : ""}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Contradicted / high-risk links</h3>
          <ul className="mt-3 max-h-48 list-inside list-disc space-y-1 overflow-y-auto text-xs text-zinc-700 dark:text-zinc-300">
            {contradictedOrRisky.length === 0 ? (
              <li className="list-none text-zinc-500">No contradicted or critical/high-risk active links.</li>
            ) : (
              contradictedOrRisky.map((a) => (
                <li key={a.id}>
                  <span className="font-medium">{(a.assertion_text ?? "").slice(0, 100)}</span>
                  {a.metadata && typeof a.metadata === "object" && !Array.isArray(a.metadata) ? (
                    <span className="ml-1 text-zinc-500">
                      {String((a.metadata as Record<string, unknown>).vulnerability ?? "").slice(0, 80)}
                    </span>
                  ) : null}
                </li>
              ))
            )}
          </ul>
        </section>
      </div>

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Materiality snapshot</h3>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          High-material assertions without any active support link:{" "}
          <span className="font-mono font-medium">{materialSummary.highMaterialUnsupported}</span> · Open assertions:{" "}
          <span className="font-mono">{materialSummary.totalAssertions}</span> · With active links:{" "}
          <span className="font-mono">{materialSummary.linkedAssertions}</span>
        </p>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Follow-up indicators (assertion metadata)</h3>
        <ul className="mt-2 flex flex-wrap gap-2 text-xs">
          {openAssertions.map((a) => {
            const m = a.metadata as Record<string, unknown> | null;
            const next = m && typeof m.next_support_action === "string" ? m.next_support_action : "none";
            if (next === "none") return null;
            return (
              <li
                key={a.id}
                className="rounded-full bg-zinc-100 px-2 py-1 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
              >
                <span className="font-medium">{next}</span>
                <span className="text-zinc-500"> · </span>
                {(a.assertion_text ?? "").slice(0, 40)}…
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Strategy (W6)</h3>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          Draft internal strategy memos from your support mapping and assertions. This is not a filing or client-ready
          advice.
        </p>
        <Link
          href={`/matters/${matterId}/strategy`}
          className="mt-3 inline-flex rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500"
        >
          Open strategy workspace
        </Link>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">New support link</h3>
        {createState.error ? (
          <p data-testid="support-create-error" className="mt-2 text-sm text-red-700 dark:text-red-300">
            {createState.error}
          </p>
        ) : null}
        {createState.success ? (
          <p data-testid="support-create-success" className="mt-2 text-sm text-emerald-800 dark:text-emerald-200">
            {createState.success}
          </p>
        ) : null}
        <SupportLinkForm
          key="create-support-link"
          matterId={matterId}
          assertions={openAssertions}
          evidence={evidence}
          extractions={extractions}
          defaultAssertionId={initialAssertionId}
          formAction={createAction}
          pending={createPending}
          submitLabel="Create link"
          showItemId={false}
        />
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Support matrix</h3>
          <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <input
              type="checkbox"
              checked={showArchived}
              onChange={(e) => setShowArchived(e.target.checked)}
              className="rounded border-zinc-300"
            />
            Show archived
          </label>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          {archiveState.error ? (
            <p className="border-b border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
              {archiveState.error}
            </p>
          ) : null}
          {archiveState.success ? (
            <p className="border-b border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
              {archiveState.success}
            </p>
          ) : null}
          <table data-testid="support-matrix-table" className="min-w-full divide-y divide-zinc-200 text-xs dark:divide-zinc-800">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-zinc-700 dark:text-zinc-300">Assertion</th>
                <th className="px-3 py-2 text-left font-medium text-zinc-700 dark:text-zinc-300">Evidence</th>
                <th className="px-3 py-2 text-left font-medium text-zinc-700 dark:text-zinc-300">Link status</th>
                <th className="px-3 py-2 text-left font-medium text-zinc-700 dark:text-zinc-300">QA</th>
                <th className="px-3 py-2 text-left font-medium text-zinc-700 dark:text-zinc-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 bg-white dark:divide-zinc-800 dark:bg-zinc-950">
              {activeRows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-zinc-500">
                    No support links yet. Create one above.
                  </td>
                </tr>
              ) : (
                activeRows.map((r) => {
                  const qa = extractionQaWarning(r.extraction);
                  const archived = isSupportMatrixItemArchivedClient(r.item.metadata);
                  return (
                    <tr key={r.item.id}>
                      <td className="px-3 py-2 align-top text-zinc-800 dark:text-zinc-200">
                        {(r.assertion_text ?? "").slice(0, 100)}
                        {archived ? (
                          <span className="ml-2 rounded bg-zinc-200 px-1 text-[10px] font-medium uppercase dark:bg-zinc-800">
                            Archived
                          </span>
                        ) : null}
                      </td>
                      <td className="px-3 py-2 align-top text-zinc-700 dark:text-zinc-300">
                        {evidence.find((e) => e.id === r.item.evidence_id)
                          ? evidenceLabel(evidence.find((e) => e.id === r.item.evidence_id)!)
                          : r.item.evidence_id}
                      </td>
                      <td className="px-3 py-2 align-top">
                        <span className="font-medium">{r.item.support_state}</span>
                        {r.item.risk_level ? (
                          <span className="ml-1 text-zinc-500">· risk {r.item.risk_level}</span>
                        ) : null}
                      </td>
                      <td className="px-3 py-2 align-top text-amber-800 dark:text-amber-200">
                        {qa ?? (r.item.extraction_id ? "—" : "Evidence only")}
                      </td>
                      <td className="px-3 py-2 align-top">
                        {!archived ? (
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              className="text-indigo-600 hover:underline dark:text-indigo-400"
                              onClick={() => setEditingId(r.item.id === editingId ? null : r.item.id)}
                            >
                              {editingId === r.item.id ? "Close" : "Edit"}
                            </button>
                            <form action={archiveAction} className="inline">
                              <input type="hidden" name="matter_id" value={matterId} />
                              <input type="hidden" name="item_id" value={r.item.id} />
                              <button
                                type="submit"
                                disabled={archivePending}
                                className="text-red-700 hover:underline disabled:opacity-50 dark:text-red-400"
                              >
                                Archive
                              </button>
                            </form>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {editingRow && !isSupportMatrixItemArchivedClient(editingRow.item.metadata) ? (
        <section className="rounded-lg border border-indigo-200 bg-indigo-50/40 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Edit support link</h3>
          {updateState.error ? (
            <p className="mt-2 text-sm text-red-700 dark:text-red-300">{updateState.error}</p>
          ) : null}
          {updateState.success ? (
            <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-200">{updateState.success}</p>
          ) : null}
          <SupportLinkForm
            key={editingRow.item.id}
            matterId={matterId}
            assertions={openAssertions}
            evidence={evidence}
            extractions={extractions}
            defaultAssertionId={editingRow.item.assertion_id}
            lockedAssertionId={editingRow.item.assertion_id}
            initialRow={editingRow.item}
            formAction={updateAction}
            pending={updatePending}
            submitLabel="Save changes"
            showItemId
          />
        </section>
      ) : null}
    </div>
  );
}

type FormProps = {
  matterId: string;
  assertions: AssertionOption[];
  evidence: EvidenceOption[];
  extractions: ExtractionOption[];
  defaultAssertionId: string | null;
  lockedAssertionId?: string;
  initialRow?: SupportMatrixItemRow;
  formAction: (formData: FormData) => void;
  pending: boolean;
  submitLabel: string;
  showItemId: boolean;
};

function SupportLinkForm({
  matterId,
  assertions,
  evidence,
  extractions,
  defaultAssertionId,
  lockedAssertionId,
  initialRow,
  formAction,
  pending,
  submitLabel,
  showItemId,
}: FormProps) {
  const [evidenceId, setEvidenceId] = useState(initialRow?.evidence_id ?? evidence[0]?.id ?? "");

  const filteredExtractions = useMemo(
    () => extractions.filter((x) => x.evidence_id === evidenceId),
    [evidenceId, extractions]
  );

  const meta = initialRow?.metadata as Record<string, unknown> | undefined;
  const initialRelevance = meta && typeof meta.relevance === "string" ? meta.relevance : "";

  return (
    <form action={formAction} className="mt-4 space-y-3">
      <input type="hidden" name="matter_id" value={matterId} />
      {showItemId && initialRow ? <input type="hidden" name="item_id" value={initialRow.id} /> : null}

      <div>
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Assertion</label>
        {lockedAssertionId ? (
          <>
            <input type="hidden" name="assertion_id" value={lockedAssertionId} />
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              {assertions.find((a) => a.id === lockedAssertionId)?.assertion_text?.slice(0, 200)}
            </p>
          </>
        ) : (
          <select
            name="assertion_id"
            required
            defaultValue={defaultAssertionId ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          >
            <option value="" disabled>
              Select assertion
            </option>
            {assertions.map((a) => (
              <option key={a.id} value={a.id}>
                {(a.assertion_text ?? a.id).slice(0, 80)}
              </option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Evidence (anchor)</label>
        <select
          name="evidence_id"
          required
          value={evidenceId}
          onChange={(e) => setEvidenceId(e.target.value)}
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        >
          {evidence.map((e) => (
            <option key={e.id} value={e.id}>
              {evidenceLabel(e)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Extraction (optional)</label>
        <select
          name="extraction_id"
          defaultValue={initialRow?.extraction_id ?? ""}
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        >
          <option value="">None — evidence anchor only</option>
          {filteredExtractions.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.id.slice(0, 8)}… {ex.is_current ? "(current)" : ""} · {ex.extraction_quality_status ?? "—"}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Per-link support state</label>
          <select
            name="support_state"
            required
            defaultValue={initialRow?.support_state ?? "pending"}
            className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          >
            {SUPPORT_STATE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Risk level</label>
          <select
            name="risk_level"
            defaultValue={initialRow?.risk_level ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          >
            {RISK_OPTIONS.map((r) => (
              <option key={r || "none"} value={r}>
                {r || "—"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Relevance (metadata)</label>
        <select
          name="relevance"
          defaultValue={initialRelevance}
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        >
          {RELEVANCE_OPTIONS.map((r) => (
            <option key={r || "none"} value={r}>
              {r || "—"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Support explanation</label>
        <textarea
          name="support_explanation"
          rows={2}
          defaultValue={initialRow?.support_explanation ?? ""}
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Evidence excerpt (short)</label>
        <textarea
          name="evidence_excerpt"
          rows={2}
          defaultValue={initialRow?.evidence_excerpt ?? ""}
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Notes / gaps</label>
        <textarea
          name="notes"
          rows={2}
          defaultValue={initialRow?.notes ?? ""}
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        data-testid={showItemId ? "support-update-submit" : "support-create-submit"}
        className="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {submitLabel}
      </button>
    </form>
  );
}
