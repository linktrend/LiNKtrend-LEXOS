"use client";

import { useActionState, useMemo } from "react";
import Link from "next/link";
import type { IntakeBundle } from "@/server/intake/queries";
import { isIntakeFrozen } from "@/types/intake";
import {
  INTAKE_CONFLICT_STATUSES,
  INTAKE_ENGAGEMENT_STATUSES,
  INTAKE_KYC_STATUSES,
  INTAKE_STATUSES,
} from "@/types/intake";
import { MATTER_POSTURES, MATTER_POSTURE_LABELS } from "@/types/domain";
import { StatusBadge } from "@/features/intake/StatusBadge";
import {
  abandonIntakeFormAction,
  addClientCandidateAction,
  addMatterCandidateAction,
  createIntakeGroupAction,
  linkSharedMatterAction,
  materializeW1FormAction,
  prepareHandoffFormAction,
  rejectIntakeFormAction,
  type ActionState,
  updateIntakeFieldsAction,
  updateIntakeGroupFlagsFormAction,
} from "@/app/intake/[intakeId]/actions";

const ok: ActionState = { error: null };

function FieldError({ message }: { message: string | null }) {
  if (!message) return null;
  return <p className="text-sm text-red-600 dark:text-red-400">{message}</p>;
}

export function IntakeDetailClient({ bundle }: { bundle: IntakeBundle }) {
  const { intake, groups, clientCandidates, matterCandidates, tasks } = bundle;
  const intakeId = intake.id;
  const frozen = isIntakeFrozen(intake.intake_status);
  const terminal = ["rejected", "abandoned", "archived"].includes(intake.intake_status ?? "");

  const updateAction = useMemo(
    () => (prev: ActionState, fd: FormData) => updateIntakeFieldsAction(intakeId, prev, fd),
    [intakeId]
  );
  const [updState, updForm, updPending] = useActionState(updateAction, ok);

  const addClientAction = useMemo(
    () => (prev: ActionState, fd: FormData) => addClientCandidateAction(intakeId, prev, fd),
    [intakeId]
  );
  const [ccState, ccForm, ccPending] = useActionState(addClientAction, ok);

  const addMatterAction = useMemo(
    () => (prev: ActionState, fd: FormData) => addMatterCandidateAction(intakeId, prev, fd),
    [intakeId]
  );
  const [mcState, mcForm, mcPending] = useActionState(addMatterAction, ok);

  const groupAction = useMemo(
    () => (prev: ActionState, fd: FormData) => createIntakeGroupAction(intakeId, prev, fd),
    [intakeId]
  );
  const [grpState, grpForm, grpPending] = useActionState(groupAction, ok);

  const groupsWithMatters = useMemo(
    () => groups.filter((g) => matterCandidates.some((m) => m.intake_group_id === g.id)),
    [groups, matterCandidates]
  );

  const linkAction = useMemo(
    () => (prev: ActionState, fd: FormData) => linkSharedMatterAction(intakeId, prev, fd),
    [intakeId]
  );
  const [lnkState, lnkForm, lnkPending] = useActionState(linkAction, ok);

  const matAction = useMemo(
    () => (prev: ActionState, fd: FormData) => materializeW1FormAction(intakeId, prev, fd),
    [intakeId]
  );
  const [matState, matForm, matPending] = useActionState(matAction, ok);

  const prepareAct = useMemo(
    () => (prev: ActionState, fd: FormData) => prepareHandoffFormAction(intakeId, prev, fd),
    [intakeId]
  );
  const [prepState, prepForm, prepPending] = useActionState(prepareAct, ok);

  const rejectAct = useMemo(
    () => (prev: ActionState, fd: FormData) => rejectIntakeFormAction(intakeId, prev, fd),
    [intakeId]
  );
  const [rejState, rejForm, rejPending] = useActionState(rejectAct, ok);

  const abandonAct = useMemo(
    () => (prev: ActionState, fd: FormData) => abandonIntakeFormAction(intakeId, prev, fd),
    [intakeId]
  );
  const [abnState, abnForm, abnPending] = useActionState(abandonAct, ok);

  return (
    <div className="space-y-10">
      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Intake summary</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatusBadge label="Intake status" value={intake.intake_status} />
          <StatusBadge label="Conflict" value={intake.conflict_status} />
          <StatusBadge label="KYC" value={intake.kyc_status} />
          <StatusBadge label="Engagement" value={intake.engagement_status} />
          <StatusBadge label="Lead attorney review" value={intake.lead_attorney_review_status} />
          <StatusBadge label="Handoff" value={intake.handoff_status} />
          <StatusBadge label="Urgency" value={intake.urgency_level} />
        </div>
        {intake.notes ? (
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">{intake.notes}</p>
        ) : null}
      </section>

      {!frozen && (
        <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Update intake fields</h2>
          <FieldError message={updState.error} />
          <form action={updForm} className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Intake status</span>
              <select
                name="intake_status"
                defaultValue={intake.intake_status ?? "new"}
                disabled={updPending}
                className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              >
                {INTAKE_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Conflict</span>
              <select
                name="conflict_status"
                defaultValue={intake.conflict_status ?? "unknown"}
                disabled={updPending}
                className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              >
                {INTAKE_CONFLICT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">KYC</span>
              <select
                name="kyc_status"
                defaultValue={intake.kyc_status ?? "unknown"}
                disabled={updPending}
                className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              >
                {INTAKE_KYC_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Engagement</span>
              <select
                name="engagement_status"
                defaultValue={intake.engagement_status ?? "not_started"}
                disabled={updPending}
                className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              >
                {INTAKE_ENGAGEMENT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Lead attorney review</span>
              <input
                name="lead_attorney_review_status"
                defaultValue={intake.lead_attorney_review_status ?? ""}
                disabled={updPending}
                className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
            </label>
            <p className="text-xs text-zinc-500 sm:col-span-2">
              Handoff status is updated via &quot;Prepare handoff&quot; below (not here), so audit events stay consistent.
            </p>
            <label className="text-sm sm:col-span-2">
              <span className="text-zinc-600 dark:text-zinc-400">Notes</span>
              <textarea
                name="notes"
                rows={2}
                defaultValue={intake.notes ?? ""}
                disabled={updPending}
                className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={updPending}
                className="rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-900 disabled:opacity-50 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-white"
              >
                Save intake fields
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Client candidates</h2>
        <ul className="mt-3 space-y-3">
          {clientCandidates.map((c) => (
            <li key={c.id} className="rounded-md border border-zinc-100 p-3 dark:border-zinc-800">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{c.name}</p>
              <p className="text-xs text-zinc-500">
                Group: {c.intake_group_id ? c.intake_group_id.slice(0, 8) + "…" : "none"} · identity {c.identity_status}{" "}
                · KYC {c.kyc_status} · conflict {c.conflict_status}
              </p>
            </li>
          ))}
        </ul>
        {!frozen && (
          <>
            <FieldError message={ccState.error} />
            <form action={ccForm} className="mt-4 space-y-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Add client candidate</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  name="name"
                  required
                  placeholder="Name *"
                  disabled={ccPending}
                  className="rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                />
                <input
                  name="client_type"
                  placeholder="Client type"
                  disabled={ccPending}
                  className="rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                />
              </div>
              <label className="text-xs text-zinc-600 dark:text-zinc-400">
                Optional group ID (paste UUID from Intake groups below)
                <input
                  name="intake_group_id"
                  placeholder="intake_group_id (optional)"
                  disabled={ccPending}
                  className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950"
                />
              </label>
              <button
                type="submit"
                disabled={ccPending}
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
              >
                Add candidate
              </button>
            </form>
          </>
        )}
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Matter candidates</h2>
        <ul className="mt-3 space-y-3">
          {matterCandidates.map((m) => (
            <li key={m.id} className="rounded-md border border-zinc-100 p-3 dark:border-zinc-800">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{m.proposed_matter_name}</p>
              <p className="text-xs text-zinc-500">
                {m.posture} · {m.jurisdiction ?? "no jurisdiction"} · group {m.intake_group_id ? "yes" : "no"}
              </p>
            </li>
          ))}
        </ul>
        {!frozen && (
          <>
            <FieldError message={mcState.error} />
            <form action={mcForm} className="mt-4 space-y-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Add matter candidate</p>
              <input
                name="proposed_matter_name"
                required
                placeholder="Matter name *"
                disabled={mcPending}
                className="w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
              <div className="grid gap-2 sm:grid-cols-2">
                <select
                  name="posture"
                  defaultValue="defence"
                  disabled={mcPending}
                  className="rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                >
                  {MATTER_POSTURES.map((p) => (
                    <option key={p} value={p}>
                      {MATTER_POSTURE_LABELS[p]}
                    </option>
                  ))}
                </select>
                <input
                  name="jurisdiction"
                  placeholder="Jurisdiction"
                  disabled={mcPending}
                  className="rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                />
              </div>
              <input
                name="matter_type"
                placeholder="Matter type"
                disabled={mcPending}
                className="w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
              <label className="text-xs text-zinc-600 dark:text-zinc-400">
                intake_group_id (optional)
                <input
                  name="intake_group_id"
                  disabled={mcPending}
                  className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950"
                />
              </label>
              <button
                type="submit"
                disabled={mcPending}
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
              >
                Add matter candidate
              </button>
            </form>
          </>
        )}
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Intake groups (related prospects)</h2>
        <ul className="mt-3 space-y-4">
          {groups.map((g) => (
            <li key={g.id} className="rounded-md border border-zinc-100 p-3 dark:border-zinc-800">
              <p className="font-mono text-xs text-zinc-500">{g.id}</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                {g.relationship_type ?? "relationship TBD"} · joint rep {String(g.joint_representation_flag)} · internal
                conflict flag {String(g.potential_internal_conflict_flag)}
              </p>
              <p className="text-xs text-zinc-500">
                Shared matter candidate: {g.shared_matter_candidate_id ?? "not linked"}
              </p>
              {!frozen && (
                <GroupFlagsForm intakeId={intakeId} group={g} />
              )}
            </li>
          ))}
        </ul>
        {!frozen && (
          <>
            <FieldError message={grpState.error} />
            <form action={grpForm} className="mt-4 space-y-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Create intake group</p>
              <input
                name="relationship_type"
                placeholder="Relationship (e.g. co_defendants)"
                disabled={grpPending}
                className="w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="joint_representation_flag" disabled={grpPending} />
                Joint representation
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="potential_internal_conflict_flag" disabled={grpPending} />
                Potential internal conflict
              </label>
              <button
                type="submit"
                disabled={grpPending}
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
              >
                Create group
              </button>
            </form>
            {groupsWithMatters.length > 0 && (
              <>
                <FieldError message={lnkState.error} />
                <form action={lnkForm} className="mt-4 space-y-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Link shared matter to group</p>
                  <select
                    name="intake_group_id"
                    required
                    disabled={lnkPending}
                    className="w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                  >
                    <option value="">Select group</option>
                    {groupsWithMatters.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.id.slice(0, 8)}…
                      </option>
                    ))}
                  </select>
                  <select
                    name="matter_candidate_id"
                    required
                    disabled={lnkPending}
                    className="w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                  >
                    <option value="">Select matter candidate in that group</option>
                    {matterCandidates
                      .filter((m) => m.intake_group_id)
                      .map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.proposed_matter_name} ({m.id.slice(0, 8)}…)
                        </option>
                      ))}
                  </select>
                  <button
                    type="submit"
                    disabled={lnkPending}
                    className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
                  >
                    Link shared matter
                  </button>
                </form>
              </>
            )}
          </>
        )}
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Intake tasks (read-only)</h2>
        {tasks.length === 0 ? (
          <p className="mt-2 text-sm text-zinc-500">No tasks. Automation deferred.</p>
        ) : (
          <ul className="mt-2 space-y-2 text-sm">
            {tasks.map((t) => (
              <li key={t.id} className="rounded border border-zinc-100 px-2 py-1 dark:border-zinc-800">
                {t.task_type ?? "task"} · {t.status}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-amber-200 bg-amber-50/80 p-4 dark:border-amber-900 dark:bg-amber-950/30">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Handoff & lifecycle</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          Prepare handoff first, then create W1 client and matter (explicit). Rejected/abandoned intakes never create W1
          records.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {!frozen && !terminal && intake.intake_status !== "accepted" && (
            <>
              <form action={prepForm} className="inline flex flex-col gap-1">
                <FieldError message={prepState.error} />
                <button
                  type="submit"
                  disabled={prepPending}
                  className="rounded-md border border-amber-700 bg-white px-3 py-1.5 text-sm font-medium text-amber-900 hover:bg-amber-100 dark:border-amber-600 dark:bg-zinc-900 dark:text-amber-100 dark:hover:bg-zinc-800 disabled:opacity-50"
                >
                  Prepare handoff
                </button>
              </form>
              <form action={matForm} className="inline flex flex-col gap-1">
                <FieldError message={matState.error} />
                <button
                  type="submit"
                  disabled={matPending}
                  className="rounded-md bg-emerald-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-50"
                >
                  Create W1 client & matter (requires prepared handoff)
                </button>
              </form>
            </>
          )}
          {!frozen && intake.intake_status !== "accepted" && (
            <>
              <form action={rejForm} className="inline flex flex-col gap-1">
                <FieldError message={rejState.error} />
                <button
                  type="submit"
                  disabled={rejPending}
                  className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-800 hover:bg-red-50 dark:border-red-800 dark:text-red-200 dark:hover:bg-red-950/50 disabled:opacity-50"
                >
                  Reject intake
                </button>
              </form>
              <form action={abnForm} className="inline flex flex-col gap-1">
                <FieldError message={abnState.error} />
                <button
                  type="submit"
                  disabled={abnPending}
                  className="rounded-md border border-zinc-400 px-3 py-1.5 text-sm font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-50"
                >
                  Abandon intake
                </button>
              </form>
            </>
          )}
        </div>
        {intake.intake_status === "accepted" && (
          <p className="mt-3 text-sm text-emerald-800 dark:text-emerald-200">
            Accepted. Open{" "}
            <Link href="/clients" className="font-medium underline">
              Clients
            </Link>{" "}
            or{" "}
            <Link href="/matters" className="font-medium underline">
              Matters
            </Link>{" "}
            for W1 records.
          </p>
        )}
      </section>
    </div>
  );
}

function GroupFlagsForm({
  intakeId,
  group,
}: {
  intakeId: string;
  group: IntakeBundle["groups"][0];
}) {
  const action = useMemo(
    () => (prev: ActionState, fd: FormData) => updateIntakeGroupFlagsFormAction(intakeId, prev, fd),
    [intakeId]
  );
  const [state, formAction, pending] = useActionState(action, ok);

  return (
    <form action={formAction} className="mt-3 space-y-2 border-t border-dashed border-zinc-200 pt-3 dark:border-zinc-700">
      <input type="hidden" name="group_id" value={group.id} />
      <FieldError message={state.error} />
      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          name="joint_representation_flag"
          defaultChecked={group.joint_representation_flag ?? false}
          disabled={pending}
        />
        Joint representation
      </label>
      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          name="potential_internal_conflict_flag"
          defaultChecked={group.potential_internal_conflict_flag ?? false}
          disabled={pending}
        />
        Potential internal conflict
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-zinc-200 px-2 py-1 text-xs font-medium text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
      >
        Save group flags
      </button>
    </form>
  );
}
