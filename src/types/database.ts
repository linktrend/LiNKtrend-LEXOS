// =============================================================================
// LEXOS MVP — Database Types (Temporary Stub)
// =============================================================================
// This is a minimal stub. Do NOT hand-write the full 26-table type tree.
// Regenerate from the live schema once the Supabase project is linked:
//
//   supabase gen types typescript \
//     --project-id <your-project-id> \
//     --schema public \
//     > src/types/database.ts
//
// Or using a local instance after `supabase start`:
//   supabase gen types typescript --local --schema public > src/types/database.ts
//
// TODO: regenerate with real types after Supabase project is linked (WP-02 acceptance).
// =============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: Record<string, unknown>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
