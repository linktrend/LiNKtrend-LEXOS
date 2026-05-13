import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { listResearchMemosForMatter } from "@/server/research/queries";
import { getResearchWorkspaceSummary } from "@/server/research/summary";
import { ResearchBanners } from "@/features/research/research-banners";
import { ResearchInputSummaryPanel } from "@/features/research/research-input-summary";
import { ResearchW8Placeholder } from "@/features/research/research-w8-placeholder";
import { CreateResearchMemoForm } from "@/features/research/create-research-memo-form";
import { StrategyIssuePanels } from "@/features/strategy/strategy-issue-panels";

export const metadata = { title: "Research — LEXOS" };

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterResearchPage({ params }: PageProps) {
  const { matterId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const [memos, summary] = await Promise.all([
    listResearchMemosForMatter(supabase, matterId),
    getResearchWorkspaceSummary(supabase, matterId),
  ]);

  if (!summary) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Research (W7)</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Manual internal research memos based on the case story, assertions, support matrix, and strategy. No
          autonomous web research or verified legal conclusions.
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          <Link
            href={`/matters/${matterId}/strategy`}
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Strategy (W6)
          </Link>
        </p>
      </div>

      <ResearchBanners />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Memos</h3>
            {memos.length === 0 ? (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">No research memos yet.</p>
            ) : (
              <ul
                data-testid="research-memo-list"
                className="mt-2 divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800"
              >
                {memos.map((m) => (
                  <li key={m.id} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-sm">
                    <Link
                      href={`/matters/${matterId}/research/${m.id}`}
                      className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      {(m.title ?? "Untitled").slice(0, 120)}
                    </Link>
                    <span className="text-xs text-zinc-500">
                      {m.status} · v{m.version ?? 1} · {new Date(m.updated_at).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <CreateResearchMemoForm matterId={matterId} />

          <StrategyIssuePanels matterId={matterId} summary={summary} />
          <ResearchW8Placeholder />
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
