"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Database, Json } from "@/types/database";
import {
  RESEARCH_TEMPLATE_KEYS,
  RESEARCH_TEMPLATE_LABELS,
} from "@/features/research/template-keys";
import { researchIssuesFromMetadata, researchSectionsFromJson } from "@/features/research/template-json";
import {
  archiveResearchMemoAction,
  updateResearchMemoAction,
} from "@/app/matters/[matterId]/research/actions";
import {
  RESEARCH_MUTATION_INITIAL,
  type ResearchMutationState,
} from "@/app/matters/[matterId]/research/research-mutation-state";
import { ResearchIssuesEditor } from "@/features/research/research-issues-editor";

type ResearchMemoRow = Database["public"]["Tables"]["research_memos"]["Row"];

const STATUS_EDIT_OPTIONS = ["draft", "under_review", "approved_internal", "final_internal"] as const;

const MEMO_WORKFLOW_STATUS_OPTIONS = [
  "",
  "pending",
  "in_progress",
  "blocked",
  "needs_evidence",
  "needs_client_input",
  "needs_external_research",
  "complete",
] as const;

function readResearchWorkflowStatus(meta: Json | null): string {
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) return "";
  const v = (meta as Record<string, unknown>).research_workflow_status;
  return typeof v === "string" ? v : "";
}

function authoritiesToText(a: Json | null): string {
  if (a == null) return "";
  try {
    return JSON.stringify(a, null, 2);
  } catch {
    return "";
  }
}

export function ResearchMemoWorkspace({ matterId, memo }: { matterId: string; memo: ResearchMemoRow }) {
  const router = useRouter();
  const readOnly = memo.status === "archived" || memo.status === "superseded";
  const sections = researchSectionsFromJson(
    memo.metadata && typeof memo.metadata === "object" && !Array.isArray(memo.metadata)
      ? ((memo.metadata as Record<string, unknown>).research_sections as Json) ?? null
      : null
  );
  const initialIssues = researchIssuesFromMetadata(memo.metadata);
  const workflowStatus = readResearchWorkflowStatus(memo.metadata);
  const formKey = `${memo.id}-v${memo.version ?? 1}`;

  const [updateState, updateAction, updatePending] = useActionState(
    updateResearchMemoAction,
    RESEARCH_MUTATION_INITIAL as ResearchMutationState
  );
  const [archiveState, archiveAction, archivePending] = useActionState(
    archiveResearchMemoAction,
    RESEARCH_MUTATION_INITIAL as ResearchMutationState
  );

  useEffect(() => {
    if (updateState.success || archiveState.success) {
      router.refresh();
    }
  }, [updateState.success, archiveState.success, router]);

  return (
    <div data-testid="research-memo-workspace" className="space-y-6">
      {readOnly ? (
        <div className="rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200">
          This memo is <span className="font-semibold">{memo.status}</span> and cannot be edited.
        </div>
      ) : null}

      {updateState.error ? (
        <p className="text-sm text-red-700 dark:text-red-300" data-testid="research-memo-save-error">
          {updateState.error}
        </p>
      ) : null}
      {updateState.success ? (
        <p className="text-sm text-emerald-800 dark:text-emerald-200" data-testid="research-memo-save-success">
          {updateState.success}
        </p>
      ) : null}

      {archiveState.error ? <p className="text-sm text-red-700 dark:text-red-300">{archiveState.error}</p> : null}
      {archiveState.success ? (
        <p className="text-sm text-emerald-800 dark:text-emerald-200">{archiveState.success}</p>
      ) : null}

      {!readOnly ? (
        <form action={updateAction} className="space-y-4">
          <input type="hidden" name="matter_id" value={matterId} />
          <input type="hidden" name="research_memo_id" value={memo.id} />

          <div>
            <label htmlFor="research-title" className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Title
            </label>
            <input
              id="research-title"
              key={`${formKey}-title`}
              name="title"
              type="text"
              defaultValue={memo.title ?? ""}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            />
          </div>

          <div>
            <label htmlFor="research-status" className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Memo status
            </label>
            <select
              id="research-status"
              key={`${formKey}-status`}
              name="status"
              defaultValue={memo.status ?? "draft"}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            >
              {STATUS_EDIT_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="research-workflow-status"
              className="block text-xs font-medium text-zinc-600 dark:text-zinc-400"
            >
              Operator research workflow (stored in metadata)
            </label>
            <select
              id="research-workflow-status"
              key={`${formKey}-rwf`}
              name="research_workflow_status"
              defaultValue={workflowStatus}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            >
              {MEMO_WORKFLOW_STATUS_OPTIONS.map((s) => (
                <option key={s || "unset"} value={s}>
                  {s || "(unset)"}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="research-question"
                className="block text-xs font-medium text-zinc-600 dark:text-zinc-400"
              >
                Research question (hook)
              </label>
              <input
                id="research-question"
                key={`${formKey}-rq`}
                name="research_question"
                type="text"
                defaultValue={memo.research_question ?? ""}
                className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
            </div>
            <div>
              <label
                htmlFor="jurisdiction"
                className="block text-xs font-medium text-zinc-600 dark:text-zinc-400"
              >
                Jurisdiction / scope note
              </label>
              <input
                id="jurisdiction"
                key={`${formKey}-jur`}
                name="jurisdiction"
                type="text"
                defaultValue={memo.jurisdiction ?? ""}
                className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="short-answer"
              className="block text-xs font-medium text-zinc-600 dark:text-zinc-400"
            >
              Short answer (internal)
            </label>
            <textarea
              id="short-answer"
              key={`${formKey}-sa`}
              name="short_answer"
              rows={2}
              defaultValue={memo.short_answer ?? ""}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            />
          </div>

          <div>
            <label
              htmlFor="limitations"
              className="block text-xs font-medium text-zinc-600 dark:text-zinc-400"
            >
              Limitations (column)
            </label>
            <textarea
              id="limitations"
              key={`${formKey}-lim`}
              name="limitations"
              rows={2}
              defaultValue={memo.limitations ?? ""}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            />
          </div>

          <div>
            <label
              htmlFor="adverse-authority"
              className="block text-xs font-medium text-zinc-600 dark:text-zinc-400"
            >
              Adverse authority note
            </label>
            <textarea
              id="adverse-authority"
              key={`${formKey}-adv`}
              name="adverse_authority_note"
              rows={2}
              defaultValue={memo.adverse_authority_note ?? ""}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            />
          </div>

          <div>
            <label
              htmlFor="research-content"
              className="block text-xs font-medium text-zinc-600 dark:text-zinc-400"
            >
              Narrative (markdown)
            </label>
            <textarea
              id="research-content"
              key={`${formKey}-content`}
              name="content_markdown"
              rows={6}
              defaultValue={memo.content_markdown ?? ""}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-950"
            />
          </div>

          <div>
            <label htmlFor="research-notes" className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Notes (internal)
            </label>
            <textarea
              id="research-notes"
              key={`${formKey}-notes`}
              name="notes"
              rows={3}
              defaultValue={memo.notes ?? ""}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            />
          </div>

          <div>
            <label
              htmlFor="authorities-json"
              className="block text-xs font-medium text-zinc-600 dark:text-zinc-400"
            >
              Authorities (JSON array or object — operator-entered, not scraped)
            </label>
            <textarea
              id="authorities-json"
              key={`${formKey}-auth`}
              name="authorities_json"
              rows={4}
              defaultValue={authoritiesToText(memo.authorities)}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-950"
            />
          </div>

          <div className="space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Research template (metadata)</h3>
            {RESEARCH_TEMPLATE_KEYS.map((k) => (
              <div key={k}>
                <label htmlFor={`rs-${k}`} className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  {RESEARCH_TEMPLATE_LABELS[k]}
                </label>
                <textarea
                  id={`rs-${k}`}
                  name={`research_section_${k}`}
                  rows={k === "external_research_required" || k === "research_tasks" ? 4 : 3}
                  defaultValue={sections[k]}
                  className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                />
              </div>
            ))}
          </div>

          <ResearchIssuesEditor
            key={formKey}
            formKey={formKey}
            matterId={matterId}
            initialIssues={initialIssues}
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={updatePending}
              data-testid="research-memo-save"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
            >
              {updatePending ? "Saving…" : "Save memo"}
            </button>
          </div>
        </form>
      ) : (
        <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-zinc-800 dark:text-zinc-200">
          <p className="font-medium">{memo.title}</p>
          <p className="text-xs text-zinc-500">Status: {memo.status}</p>
          {memo.content_markdown ? (
            <pre className="whitespace-pre-wrap font-sans">{memo.content_markdown}</pre>
          ) : null}
        </div>
      )}

      {!readOnly ? (
        <div className="flex flex-wrap gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <form action={archiveAction} className="inline">
            <input type="hidden" name="matter_id" value={matterId} />
            <input type="hidden" name="research_memo_id" value={memo.id} />
            <input type="hidden" name="archive_mode" value="archived" />
            <button
              type="submit"
              disabled={archivePending}
              className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
            >
              Archive
            </button>
          </form>
          <form action={archiveAction} className="inline">
            <input type="hidden" name="matter_id" value={matterId} />
            <input type="hidden" name="research_memo_id" value={memo.id} />
            <input type="hidden" name="archive_mode" value="superseded" />
            <button
              type="submit"
              disabled={archivePending}
              className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
            >
              Supersede
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
