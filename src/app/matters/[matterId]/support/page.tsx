import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { listAssertionsForMatter } from "@/server/assertions/queries";
import { listEvidenceForMatter, listExtractionsForMatter } from "@/server/evidence/queries";
import { listSupportMatrixItemsForMatter } from "@/server/support/queries";
import { SupportMatrixWorkspace } from "@/features/support/SupportMatrixWorkspace";

export const metadata = { title: "Support matrix — LEXOS" };

type PageProps = {
  params: Promise<{ matterId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function MatterSupportPage({ params, searchParams }: PageProps) {
  const { matterId } = await params;
  const sp = await searchParams;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const rawAid = sp.assertionId;
  let assertionFocus: string | null = null;
  if (typeof rawAid === "string" && isValidUuid(rawAid)) {
    assertionFocus = rawAid;
  } else if (Array.isArray(rawAid) && rawAid[0] && isValidUuid(String(rawAid[0]))) {
    assertionFocus = String(rawAid[0]);
  }

  const [assertions, evidence, extractions, rows] = await Promise.all([
    listAssertionsForMatter(supabase, matterId),
    listEvidenceForMatter(supabase, matterId),
    listExtractionsForMatter(supabase, matterId),
    listSupportMatrixItemsForMatter(supabase, matterId, { includeArchived: true }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Support matrix (W5)</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Map assertions to original evidence and optional extractions. This is not legal argument generation (W8) or
          strategy (W6).
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          Assertions:{" "}
          <Link href={`/matters/${matterId}/assertions`} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Open assertions
          </Link>
          {" · "}
          Evidence:{" "}
          <Link href={`/matters/${matterId}/evidence`} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Open evidence
          </Link>
        </p>
      </div>

      {evidence.length === 0 ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
          Upload at least one evidence item before creating support links.{" "}
          <Link href={`/matters/${matterId}/evidence#evidence-upload`} className="font-medium underline">
            Go to evidence
          </Link>
        </div>
      ) : null}

      <SupportMatrixWorkspace
        matterId={matterId}
        initialAssertionId={assertionFocus}
        assertions={assertions}
        evidence={evidence}
        extractions={extractions}
        rows={rows}
      />
    </div>
  );
}
