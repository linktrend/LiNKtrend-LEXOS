import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { researchIssuesFromMetadata } from "@/features/research/template-json";
import { listResearchMemosForMatter } from "@/server/research/queries";
import {
  getResearchWorkspaceSummary,
  type ResearchWorkspaceSummary,
} from "@/server/research/summary";
import { isValidUuid } from "@/server/matters/queries";

export type OpenResearchIssueRef = {
  memoId: string;
  memoTitle: string;
  issueId: string;
  issueTitle: string;
  status: string;
};

export type ArgumentWorkspaceSummary = ResearchWorkspaceSummary & {
  researchMemos: { id: string; title: string | null; status: string | null }[];
  openResearchIssues: OpenResearchIssueRef[];
};

function isOpenResearchIssueStatus(status: string): boolean {
  return status !== "resolved";
}

export async function getArgumentWorkspaceSummary(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<ArgumentWorkspaceSummary | null> {
  if (!isValidUuid(matterId)) return null;

  const [summary, researchMemos] = await Promise.all([
    getResearchWorkspaceSummary(supabase, matterId),
    listResearchMemosForMatter(supabase, matterId),
  ]);

  if (!summary) return null;

  const openResearchIssues: OpenResearchIssueRef[] = [];
  for (const memo of researchMemos) {
    const issues = researchIssuesFromMetadata(memo.metadata);
    const memoTitle = (memo.title ?? "Untitled").slice(0, 120);
    for (const issue of issues) {
      if (!isOpenResearchIssueStatus(issue.status)) continue;
      openResearchIssues.push({
        memoId: memo.id,
        memoTitle,
        issueId: issue.id,
        issueTitle: issue.title,
        status: issue.status,
      });
    }
  }

  return {
    ...summary,
    researchMemos: researchMemos.map((m) => ({
      id: m.id,
      title: m.title,
      status: m.status,
    })),
    openResearchIssues,
  };
}
