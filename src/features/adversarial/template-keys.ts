export const ADVERSARIAL_TEMPLATE_KEYS = [
  "target_argument",
  "main_vulnerabilities",
  "unsupported_claims",
  "weak_evidence",
  "qa_flagged_extractions",
  "contradictions",
  "missing_evidence",
  "research_gaps",
  "opponent_counterarguments",
  "procedural_jurisdictional",
  "reputational_strategic_risks",
  "recommended_return_path",
  "required_fixes_before_revised_output",
] as const;

export type AdversarialTemplateKey = (typeof ADVERSARIAL_TEMPLATE_KEYS)[number];

export const ADVERSARIAL_TEMPLATE_LABELS: Record<AdversarialTemplateKey, string> = {
  target_argument: "Target argument (summary / focus)",
  main_vulnerabilities: "Main vulnerabilities",
  unsupported_claims: "Unsupported claims",
  weak_evidence: "Weak evidence",
  qa_flagged_extractions: "QA-flagged evidence / extractions",
  contradictions: "Contradictions",
  missing_evidence: "Missing evidence",
  research_gaps: "Research gaps",
  opponent_counterarguments: "Opponent / counter-party likely counterarguments",
  procedural_jurisdictional: "Procedural / jurisdictional vulnerabilities",
  reputational_strategic_risks: "Reputational or strategic risks",
  recommended_return_path: "Recommended return path",
  required_fixes_before_revised_output: "Required fixes before revised output",
};

export const LOOP_DECISION_VALUES = [
  "return_to_W5_support",
  "return_to_W6_strategy",
  "return_to_W7_research",
  "return_to_W8_argument",
  "proceed_to_revised_output_with_caveats",
] as const;

export type LoopDecisionValue = (typeof LOOP_DECISION_VALUES)[number];

export const LOOP_DECISION_LABELS: Record<LoopDecisionValue, string> = {
  return_to_W5_support: "Return to W5 — support matrix",
  return_to_W6_strategy: "Return to W6 — strategy",
  return_to_W7_research: "Return to W7 — research",
  return_to_W8_argument: "Return to W8 — argument draft",
  proceed_to_revised_output_with_caveats: "Proceed to revised output with caveats (WP-22 — not implemented here)",
};
