import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { listClients } from "@/server/clients/queries";

export const metadata = { title: "Clients — LEXOS" };

export default async function ClientsPage() {
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");

  const supabase = await createSupabaseServerClient();
  const clients = await listClients(supabase, ctx);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Clients</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {ctx.isAdmin ? "All clients (admin)" : "Your clients"} — demo data only.
          </p>
        </div>
        {ctx.canMutate ? (
          <Link
            href="/clients/new"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
          >
            New client
          </Link>
        ) : null}
      </div>

      {clients.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">No clients yet.</p>
          {ctx.canMutate ? (
            <Link
              href="/clients/new"
              className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline"
            >
              Create your first client
            </Link>
          ) : null}
        </div>
      ) : (
        <ul className="divide-y divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
          {clients.map((c) => (
            <li key={c.id}>
              <Link
                href={`/clients/${c.id}`}
                className="flex flex-col gap-0.5 px-4 py-3 transition hover:bg-zinc-50 dark:hover:bg-zinc-800/80 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{c.client_name}</span>
                <span className="text-xs text-zinc-500">
                  {c.status ?? "—"}
                  {c.jurisdiction ? ` · ${c.jurisdiction}` : ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
