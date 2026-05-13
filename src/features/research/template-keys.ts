export const RESEARCH_TEMPLATE_KEYS = [
  "objective",
  "relevant_assertions_summary",
  "support_state_summary",
  "unresolved_questions",
  "evidence_deficiencies",
  "contradictions_issues",
  "research_tasks",
  "client_follow_up",
  "external_research_required",
  "preliminary_observations",
  "risks_limitations",
  "next_steps",
] as const;

export type ResearchTemplateKey = (typeof RESEARCH_TEMPLATE_KEYS)[number];

export const RESEARCH_TEMPLATE_LABELS: Record<ResearchTemplateKey, string> = {
  objective: "Research objective",
  relevant_assertions_summary: "Relevant assertions (summary / IDs — not proof)",
  support_state_summary: "Current support state (summary + link to support matrix)",
  unresolved_questions: "Unresolved questions",
  evidence_deficiencies: "Evidence deficiencies",
  contradictions_issues: "Contradictions / issues",
  research_tasks: "Research tasks",
  client_follow_up: "Client follow-up required",
  external_research_required: "External research required (checklist only — no pipeline)",
  preliminary_observations: "Preliminary observations",
  risks_limitations: "Risks and limitations",
  next_steps: "Next research steps",
};

export const RESEARCH_ISSUE_STATUSES = [
  "pending",
  "in_progress",
  "unresolved",
  "resolved",
  "blocked",
  "needs_client_input",
  "needs_evidence",
  "needs_external_research",
] as const;

export type ResearchIssueStatus = (typeof RESEARCH_ISSUE_STATUSES)[number];
