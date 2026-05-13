import type { Json } from "@/types/database";
import { ARGUMENT_TEMPLATE_KEYS, type ArgumentTemplateKey } from "@/features/argument/template-keys";

export function emptyArgumentSectionsRecord(): Record<ArgumentTemplateKey, string> {
  return Object.fromEntries(ARGUMENT_TEMPLATE_KEYS.map((k) => [k, ""])) as Record<
    ArgumentTemplateKey,
    string
  >;
}

export function argumentSectionsFromJson(j: Json | null): Record<ArgumentTemplateKey, string> {
  const out = emptyArgumentSectionsRecord();
  if (!j || typeof j !== "object" || Array.isArray(j)) return out;
  const root = j as Record<string, unknown>;
  const raw = root.argument_sections;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return out;
  const o = raw as Record<string, unknown>;
  for (const k of ARGUMENT_TEMPLATE_KEYS) {
    const v = o[k];
    if (typeof v === "string") {
      out[k] = v;
    }
  }
  return out;
}

export function argumentSectionsToJson(record: Record<ArgumentTemplateKey, string>): Json {
  const o: Record<string, string> = {};
  for (const k of ARGUMENT_TEMPLATE_KEYS) {
    const t = (record[k] ?? "").trim();
    if (t) o[k] = t;
  }
  return o as Json;
}

export function mergeArgumentMetadata(
  existing: Json | null,
  sections: Record<ArgumentTemplateKey, string>
): Json {
  const base: Record<string, unknown> =
    existing && typeof existing === "object" && !Array.isArray(existing)
      ? { ...(existing as Record<string, unknown>) }
      : {};

  base.argument_sections = argumentSectionsToJson(sections);
  return base as Json;
}

export function countArgumentSectionKeys(obj: Json | null): number {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return 0;
  const root = obj as Record<string, unknown>;
  const sec = root.argument_sections;
  if (!sec || typeof sec !== "object" || Array.isArray(sec)) return 0;
  return Object.keys(sec as Record<string, unknown>).length;
}
