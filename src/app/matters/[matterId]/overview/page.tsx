import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { MATTER_POSTURE_LABELS, type MatterPosture } from "@/types/domain";

type PageProps = { params: Promise<{ matterId: string }> };

function postureLabel(posture: string | null): string {
  if (!posture) return "—";
  return MATTER_POSTURE_LABELS[posture as MatterPosture] ?? posture;
}

export default async function MatterOverviewPage({ params }: PageProps) {
  const { matterId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const { matter, workflow } = bundle;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Matter summary</h2>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-zinc-500">Matter name</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{matter.matter_name}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Client</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">
              {matter.clients?.client_name && matter.client_id ? (
                <Link href={`/clients/${matter.client_id}`} className="text-indigo-600 hover:underline">
                  {matter.clients.client_name}
                </Link>
              ) : (
                "—"
              )}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">Posture</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{postureLabel(matter.posture)}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Jurisdiction</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{matter.jurisdiction ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Matter status</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{matter.status ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Current workflow (matter)</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{matter.current_workflow ?? "—"}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Workflow state</h2>
        {workflow ? (
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-zinc-500">Current workflow</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100">{workflow.current_workflow ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Workflow status</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100">{workflow.workflow_status ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Blocked</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                {workflow.blocked_flag ? "Yes" : "No"}
                {workflow.block_reason ? ` — ${workflow.block_reason}` : ""}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500">Next action</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100">{workflow.next_action ?? "—"}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-3 text-sm text-amber-800 dark:text-amber-200">
            No workflow state row found. This should not happen for matters created in LEXOS MVP; create workflow from
            admin tools or re-create the matter.
          </p>
        )}
      </section>

      <section className="rounded-lg border border-dashed border-zinc-300 p-5 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
        <p className="font-medium text-zinc-800 dark:text-zinc-200">Next steps (placeholders)</p>
        <p className="mt-2">
          Story, Evidence, Assertions, and downstream tabs are route shells until later work packets (W4, W5, …). Use
          the navigation above to explore placeholders.
        </p>
      </section>
    </div>
  );
}
