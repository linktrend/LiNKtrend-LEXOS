import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { getResearchMemoForMatter } from "@/server/research/queries";
import { getResearchWorkspaceSummary } from "@/server/research/summary";
import { ResearchBanners } from "@/features/research/research-banners";
import { ResearchInputSummaryPanel } from "@/features/research/research-input-summary";
import { ResearchW8Placeholder } from "@/features/research/research-w8-placeholder";
import { ResearchMemoWorkspace } from "@/features/research/research-memo-workspace";
import { StrategyIssuePanels } from "@/features/strategy/strategy-issue-panels";

export const metadata = { title: "Research memo — LEXOS" };

type PageProps = { params: Promise<{ matterId: string; researchMemoId: string }> };

export default async function ResearchMemoDetailPage({ params }: PageProps) {
  const { matterId, researchMemoId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId) || !isValidUuid(researchMemoId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const [memo, summary] = await Promise.all([
    getResearchMemoForMatter(supabase, matterId, researchMemoId),
    getResearchWorkspaceSummary(supabase, matterId),
  ]);

  if (!memo || !summary) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Link
          href={`/matters/${matterId}/research`}
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          ← All research memos
        </Link>
      </div>

      <ResearchBanners />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <ResearchMemoWorkspace matterId={matterId} memo={memo} />
          <StrategyIssuePanels matterId={matterId} summary={summary} />
          <ResearchW8Placeholder matterId={matterId} />
        </div>
        <aside className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Input summary</h3>
          <div className="mt-3">
            <ResearchInputSummaryPanel matterId={matterId} summary={summary} />
          </div>
        </aside>
      </div>
    </div>
  );
}
