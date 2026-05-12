/** Client + server action shared shape. Lives outside `actions.ts` because `use server` modules may only export async functions. */
export type EvidenceUploadState = { error: string | null; success: string | null };

export const EVIDENCE_UPLOAD_INITIAL: EvidenceUploadState = { error: null, success: null };
