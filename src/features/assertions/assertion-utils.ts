import type { Database } from "@/types/database";

export type AssertionArchiveFields = Pick<
  Database["public"]["Tables"]["assertions"]["Row"],
  "metadata" | "use_status"
>;

export function isAssertionArchivedRow(row: AssertionArchiveFields): boolean {
  if (row.use_status === "superseded") return true;
  const meta = row.metadata;
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) return false;
  return (meta as Record<string, unknown>).archived === true;
}
