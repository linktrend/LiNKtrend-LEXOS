export const TRUTH_STATE_OPTIONS = [
  "pending_verification",
  "unsupported",
  "partially_supported",
  "verified",
  "client_confirmed",
  "opposing_party_alleged",
  "contradicted",
  "rejected",
  "superseded",
] as const;

export const SUPPORT_STATE_OPTIONS = ["pending", "unsupported", "partially_supported", "supported", "contradicted"] as const;

export const USE_STATUS_OPTIONS = [
  "pending_review",
  "usable",
  "use_with_caution",
  "do_not_use",
  "superseded",
] as const;

export const MATERIALITY_OPTIONS = ["low", "medium", "high"] as const;

export const NEXT_SUPPORT_OPTIONS = [
  { value: "none", label: "None" },
  { value: "evidence", label: "Evidence needed" },
  { value: "research", label: "Research needed" },
  { value: "client", label: "Client follow-up needed" },
] as const;
