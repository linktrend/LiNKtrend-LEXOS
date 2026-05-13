import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { getAssertionForMatter } from "@/server/assertions/queries";
import { getPrimaryCaseStoryForMatter } from "@/server/story/queries";
import { AssertionEditForm } from "@/features/assertions/AssertionEditForm";

export const metadata = { title: "Assertion detail — LEXOS" };

type PageProps = { params: Promise<{ matterId: string; assertionId: string }> };

export default async function MatterAssertionDetailPage({ params }: PageProps) {
  const { matterId, assertionId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId) || !isValidUuid(assertionId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const [row, story] = await Promise.all([
    getAssertionForMatter(supabase, matterId, assertionId),
    getPrimaryCaseStoryForMatter(supabase, matterId),
  ]);

  if (!row) notFound();

  return (
    <div className="space-y-6">
      <Link
        href={`/matters/${matterId}/assertions`}
        className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
      >
        ← Assertions list
      </Link>
      <Link
        href={`/matters/${matterId}/support?assertionId=${encodeURIComponent(assertionId)}`}
        className="block text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
      >
        Support links for this assertion →
      </Link>
      <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Assertion</h1>
      <p className="text-xs text-zinc-500">
        ID <span className="font-mono">{row.id}</span> · Updated {new Date(row.updated_at).toLocaleString()}
      </p>
      <AssertionEditForm matterId={matterId} row={row} primaryCaseStoryId={story?.id ?? null} />
    </div>
  );
}
