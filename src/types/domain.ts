/** Matter posture values stored in DB (migration check). Canonical defence spelling: `defence`. */
export const MATTER_POSTURES = [
  "plaintiff",
  "defence",
  "regulatory",
  "criminal_defence",
  "commercial_dispute",
  "advisory",
  "internal",
  "unknown",
] as const;

export type MatterPosture = (typeof MATTER_POSTURES)[number];

export const MATTER_POSTURE_LABELS: Record<MatterPosture, string> = {
  plaintiff: "Plaintiff",
  defence: "Defence",
  regulatory: "Regulatory",
  criminal_defence: "Criminal defence",
  commercial_dispute: "Commercial dispute",
  advisory: "Advisory",
  internal: "Internal",
  unknown: "Unknown",
};
