import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getClientById, listMattersForClient } from "@/server/clients/queries";
import { isValidUuid } from "@/server/matters/queries";

type PageProps = { params: Promise<{ clientId: string }> };

export default async function ClientDetailPage({ params }: PageProps) {
  const { clientId } = await params;
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");
  if (!isValidUuid(clientId)) notFound();

  const supabase = await createSupabaseServerClient();
  const client = await getClientById(supabase, clientId, ctx);
  if (!client) notFound();

  const matters = await listMattersForClient(supabase, clientId, ctx);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <div className="mb-6">
        <Link href="/clients" className="text-sm text-indigo-600 hover:underline">
          ← Clients
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">{client.client_name}</h1>
        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-zinc-500">Status</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{client.status ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Jurisdiction</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{client.jurisdiction ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Client type</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{client.client_type ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Privilege</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">{client.privilege_status ?? "—"}</dd>
          </div>
        </dl>
        {client.notes ? (
          <p className="mt-4 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            {client.notes}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Matters</h2>
        {ctx.canMutate ? (
          <Link
            href={`/clients/${clientId}/matters/new`}
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
          >
            New matter
          </Link>
        ) : null}
      </div>

      {matters.length === 0 ? (
        <p className="mt-4 rounded-lg border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          No matters yet.
          {ctx.canMutate ? (
            <>
              {" "}
              <Link href={`/clients/${clientId}/matters/new`} className="font-medium text-indigo-600 hover:underline">
                Create a matter
              </Link>
            </>
          ) : null}
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
          {matters.map((m) => (
            <li key={m.id}>
              <Link
                href={`/matters/${m.id}/overview`}
                className="flex flex-col gap-0.5 px-4 py-3 transition hover:bg-zinc-50 dark:hover:bg-zinc-800/80 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{m.matter_name}</span>
                <span className="text-xs text-zinc-500">
                  {m.status ?? "—"} · {m.current_workflow ?? "—"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
