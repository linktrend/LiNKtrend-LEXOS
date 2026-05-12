import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMatterBundle, isValidUuid } from "@/server/matters/queries";
import { listEvidenceForMatter } from "@/server/evidence/queries";
import { EvidenceUploadForm } from "@/features/evidence/EvidenceUploadForm";
import { EvidenceTable } from "@/features/evidence/EvidenceTable";

export const metadata = { title: "Evidence — LEXOS" };

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterEvidencePage({ params }: PageProps) {
  const { matterId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(matterId)) notFound();

  const supabase = await createSupabaseServerClient();
  const bundle = await getMatterBundle(supabase, matterId, ctx);
  if (!bundle) notFound();

  const rows = await listEvidenceForMatter(supabase, matterId);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Evidence</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Originals for matter <span className="font-mono text-xs">{matterId}</span>. Files are stored in private
          object storage; extractions are separate objects (WP-07).
        </p>
      </div>
      <EvidenceUploadForm matterId={matterId} />
      <div>
        <h3 className="mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">Evidence list</h3>
        <EvidenceTable matterId={matterId} rows={rows} />
      </div>
    </div>
  );
}
