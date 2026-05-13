import type { Json } from "@/types/database";
import {
  REVISED_OUTPUT_TEMPLATE_KEYS,
  type RevisedOutputTemplateKey,
} from "@/features/output/template-keys";

export type RevisedSectionEntry = { title: string; body: string };

export function emptyRevisedSections(): Record<RevisedOutputTemplateKey, RevisedSectionEntry> {
  return Object.fromEntries(
    REVISED_OUTPUT_TEMPLATE_KEYS.map((k) => [
      k,
      { title: "", body: "" },
    ])
  ) as Record<RevisedOutputTemplateKey, RevisedSectionEntry>;
}

export function revisedSectionsFromMetadata(meta: unknown): Record<RevisedOutputTemplateKey, RevisedSectionEntry> {
  const base = emptyRevisedSections();
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) return base;
  const m = meta as Record<string, unknown>;
  const raw = m.revised_sections;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return base;
  const rs = raw as Record<string, unknown>;
  for (const k of REVISED_OUTPUT_TEMPLATE_KEYS) {
    const v = rs[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const o = v as Record<string, unknown>;
      base[k] = {
        title: typeof o.title === "string" ? o.title : "",
        body: typeof o.body === "string" ? o.body : "",
      };
    }
  }
  return base;
}

export function mergeRevisedSectionsMetadata(
  existing: Json | null,
  sections: Record<RevisedOutputTemplateKey, RevisedSectionEntry>
): Json {
  const prev =
    existing && typeof existing === "object" && !Array.isArray(existing)
      ? { ...(existing as Record<string, unknown>) }
      : {};
  return {
    ...prev,
    revised_sections: sections,
  } as Json;
}

export function parseRevisedSectionsFromForm(form: FormData): Record<RevisedOutputTemplateKey, RevisedSectionEntry> {
  const out = emptyRevisedSections();
  for (const k of REVISED_OUTPUT_TEMPLATE_KEYS) {
    out[k] = {
      title: String(form.get(`output_section_title_${k}`) ?? ""),
      body: String(form.get(`output_section_body_${k}`) ?? ""),
    };
  }
  return out;
}
