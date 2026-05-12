import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { getEvidenceForMatter } from "@/server/evidence/queries";
import { createEvidenceOriginalSignedUrl } from "@/lib/storage/evidence-originals";
import { EvidenceDetailShell } from "@/features/evidence/EvidenceDetailShell";

export const metadata = { title: "Evidence detail — LEXOS" };

type PageProps = { params: Promise<{ matterId: string; evidenceId: string }> };

export default async function MatterEvidenceDetailPage({ params }: PageProps) {
  const { matterId, evidenceId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId) || !isValidUuid(evidenceId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const row = await getEvidenceForMatter(supabase, matterId, evidenceId);
  if (!row) notFound();

  let downloadUrl: string | null = null;
  let downloadError: string | null = null;
  if (row.original_file_uri) {
    const signed = await createEvidenceOriginalSignedUrl(supabase, row.original_file_uri, 300);
    downloadUrl = signed.url;
    downloadError = signed.error;
  }

  return <EvidenceDetailShell matterId={matterId} row={row} downloadUrl={downloadUrl} downloadError={downloadError} />;
}
