import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { getArgumentDraftForMatter } from "@/server/argument/queries";
import { getArgumentWorkspaceSummary } from "@/server/argument/summary";
import { listResearchMemosForMatter } from "@/server/research/queries";
import { listStrategyMemosForMatter } from "@/server/strategy/queries";
import { ArgumentBanners } from "@/features/argument/argument-banners";
import { ArgumentDraftWorkspace } from "@/features/argument/argument-draft-workspace";
import { ArgumentInputSummaryPanel } from "@/features/argument/argument-input-summary";
import { StrategyIssuePanels } from "@/features/strategy/strategy-issue-panels";
import { ArgumentW9Placeholder } from "@/features/argument/argument-w9-placeholder";

export const metadata = { title: "Argument draft — LEXOS" };

type PageProps = { params: Promise<{ matterId: string; argumentDraftId: string }> };

export default async function ArgumentDraftDetailPage({ params }: PageProps) {
  const { matterId, argumentDraftId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId) || !isValidUuid(argumentDraftId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const [draft, summary, strategyMemos, researchMemos] = await Promise.all([
    getArgumentDraftForMatter(supabase, matterId, argumentDraftId),
    getArgumentWorkspaceSummary(supabase, matterId),
    listStrategyMemosForMatter(supabase, matterId),
    listResearchMemosForMatter(supabase, matterId),
  ]);

  if (!draft || !summary) notFound();

  const strategyRefs = strategyMemos.map((m) => ({ id: m.id, title: m.title }));
  const researchRefs = researchMemos.map((m) => ({ id: m.id, title: m.title }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Link
          href={`/matters/${matterId}/argument`}
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          ← All argument drafts
        </Link>
      </div>

      <ArgumentBanners />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <ArgumentDraftWorkspace
            matterId={matterId}
            draft={draft}
            strategyMemos={strategyRefs}
            researchMemos={researchRefs}
          />
          <StrategyIssuePanels matterId={matterId} summary={summary} />
          <ArgumentW9Placeholder matterId={matterId} />
        </div>
        <aside className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Input summary</h3>
          <div className="mt-3">
            <ArgumentInputSummaryPanel matterId={matterId} summary={summary} />
          </div>
        </aside>
      </div>
    </div>
  );
}
