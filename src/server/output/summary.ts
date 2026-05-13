import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/types/database";
import { listAdversarialCritiquesForMatter } from "@/server/adversarial/queries";
import { getArgumentWorkspaceSummary, type ArgumentWorkspaceSummary } from "@/server/argument/summary";
import { listEvidenceForMatter, listCurrentExtractionSummariesForMatter } from "@/server/evidence/queries";
import { isValidUuid } from "@/server/matters/queries";

const TERMINAL_ADVERSARIAL = new Set(["archived", "superseded"]);

export type ActiveAdversarialRef = {
  id: string;
  title: string | null;
  status: string | null;
  loop_decision: string | null;
  severity_summary: string | null;
};

export type EvidenceQaConcernRef = {
  evidenceId: string;
  title: string | null;
  human_review_required: boolean | null;
  extraction_quality_status: string | null;
};

export type OutputWorkspaceSummary = ArgumentWorkspaceSummary & {
  activeAdversarialCritiques: ActiveAdversarialRef[];
  activeAdversarialCount: number;
  evidenceQaConcerns: EvidenceQaConcernRef[];
};

function isActiveAdversarialStatus(status: string | null): boolean {
  const s = status ?? "";
  return !TERMINAL_ADVERSARIAL.has(s);
}

/**
 * Deterministic caveat snapshot for metadata (ids/counts/flags only).
 */
export async function buildCaveatSnapshot(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<Json> {
  if (!isValidUuid(matterId)) return {} as Json;

  const summary = await getArgumentWorkspaceSummary(supabase, matterId);
  if (!summary) return {} as Json;

  const evidenceRows = await listEvidenceForMatter(supabase, matterId);
  const ids = evidenceRows.map((e) => e.id);
  const extMap = await listCurrentExtractionSummariesForMatter(supabase, matterId, ids);

  const evidenceHumanReviewIds: string[] = [];
  let evidenceQaFlaggedCount = 0;
  for (const e of evidenceRows) {
    const x = extMap.get(e.id);
    if (!x) continue;
    if (x.human_review_required) evidenceHumanReviewIds.push(e.id);
    const qs = x.extraction_quality_status ?? "";
    if (qs === "qa_flagged" || qs === "failed" || qs === "human_review_required") {
      evidenceQaFlaggedCount += 1;
    }
  }

  return {
    recorded_at: new Date().toISOString(),
    unsupported_assertion_ids: summary.unsupportedAssertions.map((a) => a.id),
    contradicted_assertion_ids: summary.contradictedAssertions.map((a) => a.id),
    support_qa_link_count: summary.supportQaConcernLinkCount,
    open_research_issue_count: summary.openResearchIssues.length,
    evidence_human_review_ids: evidenceHumanReviewIds,
    evidence_qa_flagged_count: evidenceQaFlaggedCount,
  } as Json;
}

export async function getOutputWorkspaceSummary(
  supabase: SupabaseClient<Database>,
  matterId: string
): Promise<OutputWorkspaceSummary | null> {
  if (!isValidUuid(matterId)) return null;

  const [base, critiques, evidenceRows] = await Promise.all([
    getArgumentWorkspaceSummary(supabase, matterId),
    listAdversarialCritiquesForMatter(supabase, matterId),
    listEvidenceForMatter(supabase, matterId),
  ]);

  if (!base) return null;

  const activeAdversarialCritiques = critiques
    .filter((c) => isActiveAdversarialStatus(c.status))
    .map((c) => ({
      id: c.id,
      title: c.title,
      status: c.status,
      loop_decision: c.loop_decision,
      severity_summary: c.severity_summary,
    }));

  const ids = evidenceRows.map((e) => e.id);
  const extMap = await listCurrentExtractionSummariesForMatter(supabase, matterId, ids);

  const evidenceQaConcerns: EvidenceQaConcernRef[] = [];
  for (const e of evidenceRows) {
    const x = extMap.get(e.id);
    if (!x) continue;
    const qs = x.extraction_quality_status ?? "";
    const qa =
      x.human_review_required === true ||
      qs === "qa_flagged" ||
      qs === "failed" ||
      qs === "human_review_required";
    if (!qa) continue;
    evidenceQaConcerns.push({
      evidenceId: e.id,
      title: e.evidence_label ?? e.file_name ?? null,
      human_review_required: x.human_review_required,
      extraction_quality_status: x.extraction_quality_status,
    });
  }

  return {
    ...base,
    activeAdversarialCritiques,
    activeAdversarialCount: activeAdversarialCritiques.length,
    evidenceQaConcerns,
  };
}
