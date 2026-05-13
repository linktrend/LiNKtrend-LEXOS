import type { Json } from "@/types/database";

export function isSupportMatrixItemArchived(metadata: Json | null): boolean {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return false;
  return (metadata as Record<string, unknown>).archived === true;
}

export function withArchivedMetadata(
  existing: Json | null,
  archived: boolean
): Record<string, unknown> {
  const base =
    existing && typeof existing === "object" && !Array.isArray(existing)
      ? { ...(existing as Record<string, unknown>) }
      : {};
  base.archived = archived;
  if (archived) {
    base.archived_at = new Date().toISOString();
  } else {
    delete base.archived_at;
  }
  return base;
}
