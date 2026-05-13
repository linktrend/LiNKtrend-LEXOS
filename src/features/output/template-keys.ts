/** Deterministic revised-output section keys (operator-editable; no LLM). */
export const REVISED_OUTPUT_TEMPLATE_KEYS = [
  "revised_objective_posture",
  "revised_argument_summary",
  "w9_addressed",
  "w9_unresolved",
  "evidence_support_caveats",
  "research_dependencies",
  "remaining_vulnerabilities",
  "operator_notes",
  "final_review_checklist",
  "next_steps_before_external_use",
] as const;

export type RevisedOutputTemplateKey = (typeof REVISED_OUTPUT_TEMPLATE_KEYS)[number];

export const REVISED_OUTPUT_SECTION_LABELS: Record<RevisedOutputTemplateKey, string> = {
  revised_objective_posture: "Revised objective and posture",
  revised_argument_summary: "Revised argument summary",
  w9_addressed: "W9 criticisms addressed",
  w9_unresolved: "W9 criticisms unresolved",
  evidence_support_caveats: "Evidence and support caveats",
  research_dependencies: "Research dependencies",
  remaining_vulnerabilities: "Remaining vulnerabilities",
  operator_notes: "Operator notes",
  final_review_checklist: "Final-review checklist (markdown)",
  next_steps_before_external_use: "Next steps before external use",
};
