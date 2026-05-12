import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { MatterNav } from "@/components/layout/matter-nav";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { MATTER_POSTURE_LABELS, type MatterPosture } from "@/types/domain";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ matterId: string }>;
};

function postureLabel(posture: string | null): string {
  if (!posture) return "—";
  return MATTER_POSTURE_LABELS[posture as MatterPosture] ?? posture;
}

export default async function MatterSectionLayout({ children, params }: LayoutProps) {
  const { matterId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const { matter, workflow } = bundle;
  const clientName = matter.clients?.client_name ?? "Client";

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <div className="mb-4">
        <Link href="/matters" className="text-xs font-medium text-indigo-600 hover:underline">
          ← All matters
        </Link>
        {matter.client_id ? (
          <Link
            href={`/clients/${matter.client_id}`}
            className="ml-3 text-xs font-medium text-indigo-600 hover:underline"
          >
            Client: {clientName}
          </Link>
        ) : null}
      </div>
      <header className="mb-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {matter.matter_name}
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          Posture {postureLabel(matter.posture)}
          {matter.jurisdiction ? ` · ${matter.jurisdiction}` : ""} · Status {matter.status ?? "—"} · Current{" "}
          {matter.current_workflow ?? "—"}
          {workflow ? ` · Flow ${workflow.workflow_status ?? "—"}` : ""}
        </p>
      </header>
      <MatterNav matterId={matterId} matterTitle={matter.matter_name} />
      {children}
    </div>
  );
}
