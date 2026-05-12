import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext } from "@/server/auth/context";
import { listIntakeRecords } from "@/server/intake/queries";

export const metadata = { title: "Intake — LEXOS" };

export default async function IntakeListPage() {
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");

  const supabase = await createSupabaseServerClient();
  const rows = await listIntakeRecords(supabase, ctx, 100);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Intake (W0-lite)</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Prospective clients and matter candidates. Demo data only. Unrelated prospects use separate intakes.
          </p>
        </div>
        <Link
          href="/intake/new"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
        >
          New intake
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-lg border border-zinc-200 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          No intake records yet.{" "}
          <Link href="/intake/new" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Create one
          </Link>
          .
        </p>
      ) : (
        <ul className="divide-y divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
          {rows.map((r) => (
            <li key={r.id}>
              <Link
                href={`/intake/${r.id}`}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 transition hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
              >
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {r.intake_type?.trim() || "Intake"}{" "}
                    <span className="font-mono text-xs text-zinc-400">{r.id.slice(0, 8)}…</span>
                  </p>
                  <p className="text-xs text-zinc-500">
                    {r.intake_status} · handoff {r.handoff_status ?? "—"}
                  </p>
                </div>
                <span className="text-xs text-zinc-400">{new Date(r.updated_at).toLocaleString()}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
