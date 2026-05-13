import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { listArgumentDraftsForMatter } from "@/server/argument/queries";
import { getArgumentWorkspaceSummary } from "@/server/argument/summary";
import { ArgumentBanners } from "@/features/argument/argument-banners";
import { ArgumentInputSummaryPanel } from "@/features/argument/argument-input-summary";
import { CreateArgumentDraftForm } from "@/features/argument/create-argument-draft-form";
import { StrategyIssuePanels } from "@/features/strategy/strategy-issue-panels";
import { ArgumentW9Placeholder } from "@/features/argument/argument-w9-placeholder";

export const metadata = { title: "Argument — LEXOS" };

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterArgumentPage({ params }: PageProps) {
  const { matterId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const [drafts, summary] = await Promise.all([
    listArgumentDraftsForMatter(supabase, matterId),
    getArgumentWorkspaceSummary(supabase, matterId),
  ]);

  if (!summary) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Argument (W8)</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Operator-driven argument drafts from the case story, assertions, support matrix, strategy, and research.
          This is internal synthesis — not autonomous legal reasoning and not filing-ready.
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          <Link
            href={`/matters/${matterId}/research`}
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Research (W7)
          </Link>
        </p>
      </div>

      <ArgumentBanners />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Argument drafts</h3>
            {drafts.length === 0 ? (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">No argument drafts yet.</p>
            ) : (
              <ul
                data-testid="argument-draft-list"
                className="mt-2 divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800"
              >
                {drafts.map((d) => (
                  <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-sm">
                    <Link
                      href={`/matters/${matterId}/argument/${d.id}`}
                      className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      {(d.title ?? "Untitled").slice(0, 120)}
                    </Link>
                    <span className="text-xs text-zinc-500">
                      {d.status} · v{d.version ?? 1} · {new Date(d.updated_at).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <CreateArgumentDraftForm matterId={matterId} />

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
