import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/types/database";
import { getAssertionForMatter, type AssertionRow } from "@/server/assertions/queries";
import { getEvidenceForMatter, getExtractionByIdForMatterEvidence } from "@/server/evidence/queries";
import { isValidUuid } from "@/server/matters/queries";

function isArchivedAssertionRow(row: AssertionRow): boolean {
  if (row.use_status === "superseded") return true;
  const meta = row.metadata as Json | null;
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) return false;
  return (meta as Record<string, unknown>).archived === true;
}

export type SupportLinkValidation = {
  ok: true;
  assertion: AssertionRow;
  clientId: string;
} | { ok: false; error: string };

export async function validateSupportMatrixLink(
  supabase: SupabaseClient<Database>,
  matterId: string,
  clientId: string,
  assertionId: string,
  evidenceId: string,
  extractionId: string | null
): Promise<SupportLinkValidation> {
  if (!isValidUuid(matterId) || !isValidUuid(assertionId) || !isValidUuid(evidenceId)) {
    return { ok: false, error: "Invalid identifiers." };
  }

  const assertion = await getAssertionForMatter(supabase, matterId, assertionId);
  if (!assertion) {
    return { ok: false, error: "Assertion not found for this matter." };
  }
  if (assertion.client_id !== clientId) {
    return { ok: false, error: "Assertion client mismatch." };
  }
  if (isArchivedAssertionRow(assertion)) {
    return { ok: false, error: "Cannot link an archived assertion." };
  }

  const evidence = await getEvidenceForMatter(supabase, matterId, evidenceId);
  if (!evidence) {
    return { ok: false, error: "Evidence not found for this matter." };
  }
  if (evidence.client_id !== clientId) {
    return { ok: false, error: "Evidence client mismatch." };
  }

  if (extractionId && isValidUuid(extractionId)) {
    const extraction = await getExtractionByIdForMatterEvidence(
      supabase,
      matterId,
      evidenceId,
      extractionId
    );
    if (!extraction) {
      return { ok: false, error: "Extraction not found for this evidence and matter." };
    }
    if (extraction.client_id !== clientId) {
      return { ok: false, error: "Extraction client mismatch." };
    }
  }

  return { ok: true, assertion, clientId };
}
