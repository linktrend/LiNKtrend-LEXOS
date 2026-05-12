/** intake_records.intake_status (DB check constraint). */
export const INTAKE_STATUSES = [
  "new",
  "in_progress",
  "waiting_for_information",
  "conflict_check_pending",
  "kyc_pending",
  "engagement_pending",
  "lead_attorney_review",
  "accepted",
  "rejected",
  "abandoned",
  "archived",
] as const;
export type IntakeStatus = (typeof INTAKE_STATUSES)[number];

/** Shared conflict_status / kyc_status / engagement_status where DB uses same enum. */
export const INTAKE_CONFLICT_STATUSES = [
  "unknown",
  "pending",
  "clear",
  "potential_conflict",
  "conflict_identified",
  "waiver_required",
  "blocked",
] as const;

export const INTAKE_KYC_STATUSES = [
  "unknown",
  "not_required",
  "pending",
  "in_progress",
  "passed",
  "failed",
  "requires_review",
] as const;

export const INTAKE_ENGAGEMENT_STATUSES = [
  "not_started",
  "pending",
  "sent",
  "signed",
  "declined",
  "not_required",
  "blocked",
] as const;

/** Free-text columns in DB; MVP allowlist for UI selects. */
export const LEAD_ATTORNEY_REVIEW_STATUSES = [
  "not_started",
  "pending",
  "approved",
  "needs_changes",
  "blocked",
] as const;

export const HANDOFF_STATUSES = [
  "none",
  "prepared",
  "completed",
  "blocked",
] as const;

export const IDENTITY_STATUSES = ["unknown", "verified", "ambiguous", "needs_documents"] as const;
export const AUTHORITY_STATUSES = ["unknown", "confirmed", "pending", "denied"] as const;
export const REPRESENTATIVE_STATUSES = ["unknown", "confirmed", "acting_without_authority"] as const;
export const CONSENT_STATUSES = ["unknown", "pending", "granted", "denied", "not_applicable"] as const;

export const TERMINAL_INTAKE_STATUSES: readonly IntakeStatus[] = [
  "rejected",
  "abandoned",
  "archived",
] as const;

export function isIntakeFrozen(intakeStatus: string | null): boolean {
  if (!intakeStatus) return false;
  return (
    intakeStatus === "accepted" ||
    (TERMINAL_INTAKE_STATUSES as readonly string[]).includes(intakeStatus)
  );
}
