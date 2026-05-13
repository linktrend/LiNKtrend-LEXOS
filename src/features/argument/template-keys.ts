export const ARGUMENT_TEMPLATE_KEYS = [
  "objective_posture",
  "core_supported_arguments",
  "supporting_evidence_summary",
  "weaknesses_vulnerabilities",
  "contradictions_issues",
  "research_dependencies",
  "unsupported_partial_assertions",
  "counter_risk",
  "recommended_refinements",
  "next_drafting_steps",
] as const;

export type ArgumentTemplateKey = (typeof ARGUMENT_TEMPLATE_KEYS)[number];

export const ARGUMENT_TEMPLATE_LABELS: Record<ArgumentTemplateKey, string> = {
  objective_posture: "Objective and posture",
  core_supported_arguments: "Core supported arguments",
  supporting_evidence_summary: "Supporting evidence summary",
  weaknesses_vulnerabilities: "Weaknesses and vulnerabilities",
  contradictions_issues: "Contradictions and issues",
  research_dependencies: "Research dependencies",
  unsupported_partial_assertions: "Unsupported or partially supported assertions",
  counter_risk: "Counter-risk considerations",
  recommended_refinements: "Recommended refinements",
  next_drafting_steps: "Next drafting steps",
};
