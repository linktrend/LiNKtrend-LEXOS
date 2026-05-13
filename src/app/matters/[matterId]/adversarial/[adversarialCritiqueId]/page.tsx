import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext } from "@/server/auth/context";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { getAdversarialCritiqueForMatter } from "@/server/adversarial/queries";
import { getAdversarialWorkspaceSummary } from "@/server/adversarial/summary";
import { getArgumentDraftForMatter } from "@/server/argument/queries";
import { AdversarialBanners } from "@/features/adversarial/adversarial-banners";
import { AdversarialCritiqueWorkspace } from "@/features/adversarial/adversarial-critique-workspace";
import { AdversarialOutputPlaceholder } from "@/features/adversarial/adversarial-output-placeholder";
import { StrategyIssuePanels } from "@/features/strategy/strategy-issue-panels";
import { ArgumentInputSummaryPanel } from "@/features/argument/argument-input-summary";

export const metadata = { title: "Adversarial critique — LEXOS" };

type PageProps = { params: Promise<{ matterId: string; adversarialCritiqueId: string }> };

export default async function MatterAdversarialCritiqueDetailPage({ params }: PageProps) {
  const { matterId, adversarialCritiqueId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId) || !isValidUuid(adversarialCritiqueId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const [critique, summary] = await Promise.all([
    getAdversarialCritiqueForMatter(supabase, matterId, adversarialCritiqueId),
    getAdversarialWorkspaceSummary(supabase, matterId),
  ]);

  if (!critique || !summary) notFound();

  const draftId = critique.argument_draft_id;
  const linkedDraft =
    draftId && isValidUuid(draftId) ? await getArgumentDraftForMatter(supabase, matterId, draftId) : null;
  const linkedDraftTitle = linkedDraft?.title ?? null;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-zinc-500">
          <Link href={`/matters/${matterId}/adversarial`} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            All adversarial critiques
          </Link>
          {" · "}
          <Link href={`/matters/${matterId}/argument`} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Argument (W8)
          </Link>
        </p>
        <h2 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {(critique.title ?? "Untitled adversarial critique").slice(0, 160)}
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          {critique.status} · v{critique.version ?? 1} · updated {new Date(critique.updated_at).toLocaleString()}
        </p>
      </div>

      <AdversarialBanners />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <AdversarialCritiqueWorkspace
            matterId={matterId}
            critique={critique}
            argumentDraftOptions={summary.argumentDraftOptions}
            linkedDraftTitle={linkedDraftTitle}
          />
          <AdversarialOutputPlaceholder matterId={matterId} />
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Context</h3>
            <div className="mt-3">
              <ArgumentInputSummaryPanel
                matterId={matterId}
                summary={summary}
                workflowAdvanceHint="adversarial"
                argumentDraftOptions={summary.argumentDraftOptions}
              />
            </div>
          </div>
          <StrategyIssuePanels matterId={matterId} summary={summary} />
        </aside>
      </div>
    </div>
  );
}
