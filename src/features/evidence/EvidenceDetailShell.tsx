import type { Database } from "@/types/database";
import { EvidenceDetailClient } from "@/features/evidence/EvidenceDetailClient";

type EvidenceRow = Database["public"]["Tables"]["evidence"]["Row"];
type EvidenceExtractionRow = Database["public"]["Tables"]["evidence_extractions"]["Row"];

type Props = {
  matterId: string;
  evidenceId: string;
  row: EvidenceRow;
  downloadUrl: string | null;
  downloadError: string | null;
  extractions: EvidenceExtractionRow[];
};

export function EvidenceDetailShell(props: Props) {
  return <EvidenceDetailClient {...props} />;
}
