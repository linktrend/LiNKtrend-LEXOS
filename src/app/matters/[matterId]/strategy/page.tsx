import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { listStrategyMemosForMatter } from "@/server/strategy/queries";
import { getStrategyWorkspaceSummary } from "@/server/strategy/summary";
import { StrategyBanners } from "@/features/strategy/strategy-banners";
import { StrategyInputSummaryPanel } from "@/features/strategy/strategy-input-summary";
import { StrategyIssuePanels } from "@/features/strategy/strategy-issue-panels";
import { StrategyW7Placeholder } from "@/features/strategy/strategy-w7-placeholder";
import { CreateStrategyMemoForm } from "@/features/strategy/create-strategy-memo-form";

export const metadata = { title: "Strategy — LEXOS" };

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterStrategyPage({ params }: PageProps) {
  const { matterId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const [memos, summary] = await Promise.all([
    listStrategyMemosForMatter(supabase, matterId),
    getStrategyWorkspaceSummary(supabase, matterId),
  ]);

  if (!summary) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Strategy (W6)</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Manual strategy memos based on the case story, assertions, and support matrix. No autonomous agents or
          external filings.
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          <Link href={`/matters/${matterId}/support`} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Support matrix (W5)
          </Link>
        </p>
      </div>

      <StrategyBanners />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Memos</h3>
            {memos.length === 0 ? (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">No strategy memos yet.</p>
            ) : (
              <ul data-testid="strategy-memo-list" className="mt-2 divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                {memos.map((m) => (
                  <li key={m.id} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-sm">
                    <Link
                      href={`/matters/${matterId}/strategy/${m.id}`}
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

          <CreateStrategyMemoForm matterId={matterId} />

          <StrategyIssuePanels matterId={matterId} summary={summary} />
          <StrategyW7Placeholder matterId={matterId} />
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
