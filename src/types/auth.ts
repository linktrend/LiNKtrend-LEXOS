/**
 * LEXOS MVP auth and user profile types.
 * These mirror the user_profiles table columns in the Supabase schema.
 * Full RBAC enforcement is deferred to WP-04+.
 */

export type UserRole =
  | "admin"
  | "operator"
  | "reviewer"
  | "read_only"
  | "system_agent";

export type UserStatus = "active" | "inactive" | "suspended";

export interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}
