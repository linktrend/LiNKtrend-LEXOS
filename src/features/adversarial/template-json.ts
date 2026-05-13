import type { Json } from "@/types/database";
import { ADVERSARIAL_TEMPLATE_KEYS, type AdversarialTemplateKey } from "@/features/adversarial/template-keys";

export function emptyAdversarialSectionsRecord(): Record<AdversarialTemplateKey, string> {
  return Object.fromEntries(ADVERSARIAL_TEMPLATE_KEYS.map((k) => [k, ""])) as Record<
    AdversarialTemplateKey,
    string
  >;
}

/** Parse `attack_matrix` jsonb (flat key → string sections). */
export function adversarialSectionsFromAttackMatrix(j: Json | null): Record<AdversarialTemplateKey, string> {
  const out = emptyAdversarialSectionsRecord();
  if (!j || typeof j !== "object" || Array.isArray(j)) return out;
  const o = j as Record<string, unknown>;
  for (const k of ADVERSARIAL_TEMPLATE_KEYS) {
    const v = o[k];
    if (typeof v === "string") {
      out[k] = v;
    }
  }
  return out;
}

export function adversarialSectionsToAttackMatrix(record: Record<AdversarialTemplateKey, string>): Json {
  const o: Record<string, string> = {};
  for (const k of ADVERSARIAL_TEMPLATE_KEYS) {
    const t = (record[k] ?? "").trim();
    if (t) o[k] = t;
  }
  return o as Json;
}

export function countAdversarialMatrixKeys(j: Json | null): number {
  if (!j || typeof j !== "object" || Array.isArray(j)) return 0;
  return Object.keys(j as Record<string, unknown>).length;
}
