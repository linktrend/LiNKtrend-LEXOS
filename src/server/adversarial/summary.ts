import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { listArgumentDraftsForMatter } from "@/server/argument/queries";
import {
  getArgumentWorkspaceSummary,
  type ArgumentWorkspaceSummary,
} from "@/server/argument/summary";
import { isValidUuid } from "@/server/matters/queries";

export type AdversarialWorkspaceSummary = ArgumentWorkspaceSummary & {
  argumentDraftOptions: { id: string; title: string | null; status: string | null }[];
};

export async function getAdversarialWorkspaceSummary(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<AdversarialWorkspaceSummary | null> {
  if (!isValidUuid(matterId)) return null;

  const [summary, drafts] = await Promise.all([
    getArgumentWorkspaceSummary(supabase, matterId),
    listArgumentDraftsForMatter(supabase, matterId),
  ]);

  if (!summary) return null;

  const argumentDraftOptions = drafts
    .filter((d) => d.status !== "archived" && d.status !== "superseded")
    .map((d) => ({
      id: d.id,
      title: d.title,
      status: d.status,
    }));

  return {
    ...summary,
    argumentDraftOptions,
  };
}
