import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Service-role Supabase admin client.
 *
 * SERVER-SIDE ONLY. Never import this in Client Components or any file
 * that could end up in the client bundle. The SUPABASE_SERVICE_ROLE_KEY
 * bypasses Row Level Security and must not be exposed to the browser.
 *
 * Use for:
 * - Server Actions that require elevated access (e.g. profile fallback creation)
 * - Route Handlers performing admin operations
 * - Background/server-only CRUD
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase admin env vars (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY). " +
        "Ensure .env.local is configured and this code runs server-side only."
    );
  }

  return createClient<Database>(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
