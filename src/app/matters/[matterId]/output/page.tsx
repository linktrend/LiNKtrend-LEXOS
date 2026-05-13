import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { listOutputArtifactsForMatter } from "@/server/output/queries";
import { getOutputWorkspaceSummary } from "@/server/output/summary";
import { listArgumentDraftsForMatter } from "@/server/argument/queries";
import { listAdversarialCritiquesForMatter, countActiveAdversarialCritiquesForMatter } from "@/server/adversarial/queries";
import { OutputBanners } from "@/features/output/output-banners";
import { CreateRevisedOutputForm } from "@/features/output/create-revised-output-form";
import { OutputCaveatPanels } from "@/features/output/output-caveat-panels";
import { OutputOutOfScopePlaceholder } from "@/features/output/output-out-of-scope-placeholder";
import { ArgumentInputSummaryPanel } from "@/features/argument/argument-input-summary";
import { getArgumentWorkspaceSummary } from "@/server/argument/summary";

export const metadata = { title: "Revised output — LEXOS" };

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterOutputPage({ params }: PageProps) {
  const { matterId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const [artifacts, summary, argSummary, drafts, critiques, activeCritiqueCount] = await Promise.all([
    listOutputArtifactsForMatter(supabase, matterId),
    getOutputWorkspaceSummary(supabase, matterId),
    getArgumentWorkspaceSummary(supabase, matterId),
    listArgumentDraftsForMatter(supabase, matterId),
    listAdversarialCritiquesForMatter(supabase, matterId),
    countActiveAdversarialCritiquesForMatter(supabase, matterId),
  ]);

  if (!summary || !argSummary) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Revised output (W11)</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Post-adversarial internal synthesis. Operator-driven only — not autonomous generation, not court-ready, not
          final external filing.
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          <Link
            href={`/matters/${matterId}/adversarial`}
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Adversarial (W9)
          </Link>
        </p>
      </div>

      <OutputBanners />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Revised output artifacts</h3>
            {artifacts.length === 0 ? (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">No revised output artifacts yet.</p>
            ) : (
              <ul
                data-testid="output-artifact-list"
                className="mt-2 divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800"
              >
                {artifacts.map((a) => (
                  <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-sm">
                    <Link
                      href={`/matters/${matterId}/output/${a.id}`}
                      className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      {(a.title ?? "Untitled").slice(0, 120)}
                    </Link>
                    <span className="text-xs text-zinc-500">
                      {a.status} · review: {a.review_status ?? "—"} · v{a.version ?? 1} ·{" "}
                      {new Date(a.updated_at).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <CreateRevisedOutputForm
            matterId={matterId}
            drafts={drafts}
            critiques={critiques}
            activeCritiqueCount={activeCritiqueCount}
          />

          <OutputCaveatPanels summary={summary} />
          <OutputOutOfScopePlaceholder />
        </div>

        <aside className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Input summary</h3>
          <div className="mt-3">
            <ArgumentInputSummaryPanel matterId={matterId} summary={argSummary} />
          </div>
        </aside>
      </div>
    </div>
  );
}
