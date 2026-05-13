import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { getPrimaryCaseStoryForMatter } from "@/server/story/queries";
import { CaseStoryEditor } from "@/features/story/CaseStoryEditor";

export const metadata = { title: "Case story — LEXOS" };

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterStoryPage({ params }: PageProps) {
  const { matterId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const story = await getPrimaryCaseStoryForMatter(supabase, matterId);

  return <CaseStoryEditor matterId={matterId} initial={story} />;
}
