import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { UserProfile, UserRole } from "@/types/auth";

export type AuthContext = {
  userId: string;
  email: string | null;
  profile: UserProfile | null;
  role: UserRole;
  isAdmin: boolean;
  canMutate: boolean;
};

function normalizeRole(role: string | null | undefined): UserRole {
  if (
    role === "admin" ||
    role === "operator" ||
    role === "reviewer" ||
    role === "read_only" ||
    role === "system_agent"
  ) {
    return role;
  }
  return "operator";
}

/**
 * Loads the signed-in user and profile for server-side pages and actions.
 * Returns null if there is no session.
 */
export async function getAuthContext(): Promise<AuthContext | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profileRow } = await supabase
    .from("user_profiles")
    .select("id, email, display_name, role, status, created_at, updated_at")
    .eq("id", user.id)
    .maybeSingle();

  const profile = profileRow as UserProfile | null;
  const role = normalizeRole(profile?.role ?? undefined);
  const isAdmin = role === "admin";
  const canMutate = role !== "read_only";

  return {
    userId: user.id,
    email: user.email ?? null,
    profile,
    role,
    isAdmin,
    canMutate,
  };
}

export function assertCanMutate(ctx: AuthContext): void {
  if (!ctx.canMutate) {
    throw new Error("You do not have permission to create or edit records.");
  }
}
