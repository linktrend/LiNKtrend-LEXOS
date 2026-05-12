import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getClientById } from "@/server/clients/queries";
import { isValidUuid } from "@/server/matters/queries";
import { MatterCreateForm } from "@/features/matters/MatterCreateForm";

type PageProps = { params: Promise<{ clientId: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { clientId } = await params;
  return { title: `New matter — ${clientId.slice(0, 8)}… — LEXOS` };
}

export default async function NewMatterUnderClientPage({ params }: PageProps) {
  const { clientId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(clientId)) notFound();

  const supabase = await createSupabaseServerClient();
  const client = await getClientById(supabase, clientId, ctx);
  if (!client) notFound();

  if (!ctx.canMutate) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Your role cannot create matters.
        </p>
        <Link href={`/clients/${clientId}`} className="mt-4 inline-block text-sm text-indigo-600 hover:underline">
          Back to client
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <div className="mb-6">
        <Link href={`/clients/${clientId}`} className="text-sm text-indigo-600 hover:underline">
          ← {client.client_name}
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">New matter</h1>
        <p className="mt-1 text-sm text-zinc-500">Workflow will start at W2 (Case Story). Demo data only.</p>
      </div>
      <MatterCreateForm clientId={clientId} clientName={client.client_name} />
    </main>
  );
}
