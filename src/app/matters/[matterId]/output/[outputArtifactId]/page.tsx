import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { getOutputArtifactForMatter } from "@/server/output/queries";
import { getOutputWorkspaceSummary } from "@/server/output/summary";
import { getArgumentDraftForMatter } from "@/server/argument/queries";
import { getAdversarialCritiqueForMatter } from "@/server/adversarial/queries";
import { OutputBanners } from "@/features/output/output-banners";
import { RevisedOutputWorkspace } from "@/features/output/revised-output-workspace";
import { OutputCaveatPanels } from "@/features/output/output-caveat-panels";
import { OutputLinkedContextPanel } from "@/features/output/output-linked-context-panel";
import { ArgumentInputSummaryPanel } from "@/features/argument/argument-input-summary";
import { getArgumentWorkspaceSummary } from "@/server/argument/summary";

export const metadata = { title: "Revised output detail — LEXOS" };

type PageProps = { params: Promise<{ matterId: string; outputArtifactId: string }> };

export default async function OutputArtifactDetailPage({ params }: PageProps) {
  const { matterId, outputArtifactId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId) || !isValidUuid(outputArtifactId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const [artifact, summary, argSummary] = await Promise.all([
    getOutputArtifactForMatter(supabase, matterId, outputArtifactId),
    getOutputWorkspaceSummary(supabase, matterId),
    getArgumentWorkspaceSummary(supabase, matterId),
  ]);

  if (!artifact || !summary || !argSummary) notFound();

  const meta =
    artifact.metadata && typeof artifact.metadata === "object" && !Array.isArray(artifact.metadata)
      ? (artifact.metadata as Record<string, unknown>)
      : {};
  const argId = typeof meta.argument_draft_id === "string" ? meta.argument_draft_id : null;
  const critId = typeof meta.adversarial_critique_id === "string" ? meta.adversarial_critique_id : null;

  const [linkedDraft, linkedCritique] = await Promise.all([
    argId ? getArgumentDraftForMatter(supabase, matterId, argId) : Promise.resolve(null),
    critId ? getAdversarialCritiqueForMatter(supabase, matterId, critId) : Promise.resolve(null),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Link
          href={`/matters/${matterId}/output`}
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          ← All revised outputs
        </Link>
      </div>

      <OutputBanners />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <RevisedOutputWorkspace matterId={matterId} artifact={artifact} />
          <OutputCaveatPanels summary={summary} />
        </div>
        <aside className="space-y-4">
          <OutputLinkedContextPanel matterId={matterId} draft={linkedDraft} critique={linkedCritique} />
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Input summary</h3>
            <div className="mt-3">
              <ArgumentInputSummaryPanel matterId={matterId} summary={argSummary} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
