import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { getStrategyMemoForMatter } from "@/server/strategy/queries";
import { getStrategyWorkspaceSummary } from "@/server/strategy/summary";
import { StrategyBanners } from "@/features/strategy/strategy-banners";
import { StrategyInputSummaryPanel } from "@/features/strategy/strategy-input-summary";
import { StrategyIssuePanels } from "@/features/strategy/strategy-issue-panels";
import { StrategyW7Placeholder } from "@/features/strategy/strategy-w7-placeholder";
import { StrategyMemoWorkspace } from "@/features/strategy/strategy-memo-workspace";

export const metadata = { title: "Strategy memo — LEXOS" };

type PageProps = { params: Promise<{ matterId: string; strategyMemoId: string }> };

export default async function StrategyMemoDetailPage({ params }: PageProps) {
  const { matterId, strategyMemoId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId) || !isValidUuid(strategyMemoId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const [memo, summary] = await Promise.all([
    getStrategyMemoForMatter(supabase, matterId, strategyMemoId),
    getStrategyWorkspaceSummary(supabase, matterId),
  ]);

  if (!memo || !summary) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Link href={`/matters/${matterId}/strategy`} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
          ← All strategy memos
        </Link>
      </div>

      <StrategyBanners />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <StrategyMemoWorkspace matterId={matterId} memo={memo} />
          <StrategyIssuePanels matterId={matterId} summary={summary} />
          <StrategyW7Placeholder />
        </div>
        <aside className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Input summary</h3>
          <div className="mt-3">
            <StrategyInputSummaryPanel matterId={matterId} summary={summary} />
          </div>
        </aside>
      </div>
    </div>
  );
}
