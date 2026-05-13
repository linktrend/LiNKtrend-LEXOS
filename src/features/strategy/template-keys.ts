export const STRATEGY_TEMPLATE_KEYS = [
  "posture_objective",
  "narrative_summary",
  "strong_supported",
  "weak_unsupported",
  "contradictions_vulnerabilities",
  "evidence_gaps",
  "client_followup",
  "research_needed",
  "strategic_options",
  "next_steps",
] as const;

export type StrategyTemplateKey = (typeof STRATEGY_TEMPLATE_KEYS)[number];

export const STRATEGY_TEMPLATE_LABELS: Record<StrategyTemplateKey, string> = {
  posture_objective: "Matter posture and objective",
  narrative_summary: "Current narrative summary",
  strong_supported: "Strong supported positions",
  weak_unsupported: "Weak or unsupported positions",
  contradictions_vulnerabilities: "Contradictions and vulnerabilities",
  evidence_gaps: "Evidence gaps",
  client_followup: "Client follow-up needed",
  research_needed: "Research needed (planning — not W7 records)",
  strategic_options: "Strategic options",
  next_steps: "Next steps",
};
