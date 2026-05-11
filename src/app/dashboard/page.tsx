import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { UserProfile } from "@/types/auth";
import { logoutAction } from "@/app/login/actions";

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
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const profile = await getOrCreateUserProfile(user.id, user.email ?? "");

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Matter-scoped summaries, workflow state, and risk visibility (WP-04+)
          </p>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>

      {profile ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Signed-in User
          </h2>
          <dl className="grid grid-cols-1 gap-y-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium text-gray-500">Name</dt>
              <dd className="mt-0.5 text-sm text-gray-900">
                {profile.display_name ?? <span className="italic text-gray-400">Not set</span>}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Email</dt>
              <dd className="mt-0.5 text-sm text-gray-900">{profile.email}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Role</dt>
              <dd className="mt-0.5">
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200">
                  {roleLabels[profile.role] ?? profile.role}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Status</dt>
              <dd className="mt-0.5">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                    profile.status === "active"
                      ? "bg-green-50 text-green-700 ring-green-200"
                      : "bg-yellow-50 text-yellow-700 ring-yellow-200"
                  }`}
                >
                  {profile.status}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      ) : (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5 text-sm text-yellow-800">
          <strong>Warning:</strong> User profile could not be loaded or created. Role-based access is unavailable. Contact an administrator.
        </div>
      )}

      <p className="mt-8 text-xs text-gray-400">
        Full RBAC enforcement, matter summaries, workflow state, and risk panels are planned for WP-04+.
      </p>
    </main>
  );
}
