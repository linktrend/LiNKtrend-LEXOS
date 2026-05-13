import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { listAssertionsForMatter } from "@/server/assertions/queries";
import { getPrimaryCaseStoryForMatter } from "@/server/story/queries";
import { firstStoryParagraphExcerpt } from "@/server/story/excerpt";
import { AssertionsNotVerifiedBanner } from "@/features/assertions/AssertionsNotVerifiedBanner";
import { AssertionsTable } from "@/features/assertions/AssertionsTable";
import { AssertionCreateForm } from "@/features/assertions/AssertionCreateForm";
import { SupportMatrixPlaceholder } from "@/features/assertions/SupportMatrixPlaceholder";

export const metadata = { title: "Assertions — LEXOS" };

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterAssertionsPage({ params }: PageProps) {
  const { matterId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const [rows, story] = await Promise.all([
    listAssertionsForMatter(supabase, matterId),
    getPrimaryCaseStoryForMatter(supabase, matterId),
  ]);

  const excerpt = firstStoryParagraphExcerpt(story?.content_markdown ?? null);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Assertions</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Atomic claims for this matter. Formal evidence support mapping lives in the{" "}
          <Link href={`/matters/${matterId}/support`} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Support
          </Link>{" "}
          workspace (W5).
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          Need the narrative first?{" "}
          <Link href={`/matters/${matterId}/story`} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Case story
          </Link>
        </p>
      </div>

      <AssertionsNotVerifiedBanner />

      <AssertionsTable matterId={matterId} rows={rows} />

      <AssertionCreateForm matterId={matterId} caseStoryId={story?.id ?? null} storyExcerpt={excerpt} />

      <SupportMatrixPlaceholder matterId={matterId} />
    </div>
  );
}
