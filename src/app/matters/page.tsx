import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { listAllMatters } from "@/server/matters/queries";

export const metadata = { title: "Matters — LEXOS" };

export default async function MattersPage() {
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");

  const supabase = await createSupabaseServerClient();
  const matters = await listAllMatters(supabase, ctx);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Matters</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {ctx.isAdmin ? "All matters (admin)" : "Your matters"} — scoped by creator for MVP.
          </p>
        </div>
        <Link
          href="/clients"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          Manage clients →
        </Link>
      </div>

      {matters.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">No matters yet. Create a client, then add a matter.</p>
          <Link href="/clients" className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline">
            Go to clients
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs font-semibold uppercase text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-2">Matter</th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Workflow</th>
                <th className="px-4 py-2">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {matters.map((m) => (
                <tr key={m.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="px-4 py-2">
                    <Link href={`/matters/${m.id}/overview`} className="font-medium text-indigo-600 hover:underline">
                      {m.matter_name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                    {m.clients?.client_name ? (
                      <Link href={`/clients/${m.clients.id}`} className="hover:underline">
                        {m.clients.client_name}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-2 text-zinc-600">{m.status ?? "—"}</td>
                  <td className="px-4 py-2 text-zinc-600">{m.current_workflow ?? "—"}</td>
                  <td className="px-4 py-2 text-xs text-zinc-500">
                    {m.updated_at ? new Date(m.updated_at).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
