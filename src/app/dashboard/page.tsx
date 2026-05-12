import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { UserProfile } from "@/types/auth";
import { logoutAction } from "@/app/login/actions";
import { listMattersForDashboard } from "@/server/matters/queries";
import { getAuthContext } from "@/server/auth/context";

export const metadata = { title: "Dashboard — LEXOS" };

async function getOrCreateUserProfile(userId: string, email: string): Promise<UserProfile | null> {
  const supabase = await createSupabaseServerClient();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("id, email, display_name, role, status, created_at, updated_at")
    .eq("id", userId)
    .single();

  if (profile) return profile as UserProfile;

  // Fallback: profile missing (pre-trigger user) — create via admin client
  const admin = createSupabaseAdminClient();
  const displayName = email.split("@")[0];
  const { data: created, error } = await admin
    .from("user_profiles")
    .insert({
      id: userId,
      email,
      display_name: displayName,
      role: "operator",
      status: "active",
    })
    .select("id, email, display_name, role, status, created_at, updated_at")
    .single();

  if (error) {
    console.error("[dashboard] profile fallback creation failed:", error.message);
    return null;
  }

  // Log audit event for auto-created profile
  await admin.from("audit_events").insert({
    client_id: null,
    matter_id: null,
    actor_id: userId,
    actor_type: "user",
    event_type: "profile_auto_created",
    target_object_type: "user_profiles",
    target_object_id: userId,
    metadata: { reason: "missing_profile_fallback" },
  });

  return created as UserProfile;
}

const roleLabels: Record<string, string> = {
  admin: "Administrator",
  operator: "Operator",
  reviewer: "Reviewer",
  read_only: "Read Only",
  system_agent: "System Agent",
};

export default async function DashboardPage() {
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");

  const supabase = await createSupabaseServerClient();
  const recentMatters = await listMattersForDashboard(supabase, ctx, 10);
  const profile = await getOrCreateUserProfile(ctx.userId, ctx.email ?? "");

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
            Recent matters and account summary (WP-04). Risk panels and full RBAC come in later packets.
          </p>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {profile ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-400">
              Signed-in User
            </h2>
            <dl className="grid grid-cols-1 gap-y-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-gray-500 dark:text-zinc-400">Name</dt>
                <dd className="mt-0.5 text-sm text-gray-900 dark:text-zinc-100">
                  {profile.display_name ?? <span className="italic text-gray-400">Not set</span>}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 dark:text-zinc-400">Email</dt>
                <dd className="mt-0.5 text-sm text-gray-900 dark:text-zinc-100">{profile.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 dark:text-zinc-400">Role</dt>
                <dd className="mt-0.5">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200 dark:bg-indigo-950 dark:text-indigo-200 dark:ring-indigo-800">
                    {roleLabels[profile.role] ?? profile.role}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 dark:text-zinc-400">Status</dt>
                <dd className="mt-0.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                      profile.status === "active"
                        ? "bg-green-50 text-green-700 ring-green-200 dark:bg-green-950 dark:text-green-200"
                        : "bg-yellow-50 text-yellow-700 ring-yellow-200 dark:bg-yellow-950 dark:text-yellow-200"
                    }`}
                  >
                    {profile.status}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        ) : (
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5 text-sm text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-100">
            <strong>Warning:</strong> User profile could not be loaded or created. Role-based access is unavailable.
            Contact an administrator.
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-400">
              Recent matters
            </h2>
            <Link href="/matters" className="text-xs font-medium text-indigo-600 hover:underline">
              View all
            </Link>
          </div>
          {recentMatters.length === 0 ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No matters yet.{" "}
              <Link href="/clients" className="font-medium text-indigo-600 hover:underline">
                Create a client and matter
              </Link>
              .
            </p>
          ) : (
            <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {recentMatters.map((m) => (
                <li key={m.id} className="py-3 first:pt-0">
                  <Link
                    href={`/matters/${m.id}/overview`}
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {m.matter_name}
                  </Link>
                  <p className="text-xs text-zinc-500">
                    {m.clients?.client_name ?? "Client"} · {m.status ?? "—"} · {m.current_workflow ?? "—"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-400 dark:text-zinc-500">
        Legal-table RLS is still deferred for MVP dev; access is app-layer (creator + admin). Do not deploy with real
        legal data until RLS is implemented.
      </p>
    </main>
  );
}
