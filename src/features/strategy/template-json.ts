import type { Json } from "@/types/database";
import {
  STRATEGY_TEMPLATE_KEYS,
  type StrategyTemplateKey,
} from "@/features/strategy/template-keys";

export function emptyStrategyPointsRecord(): Record<StrategyTemplateKey, string> {
  return Object.fromEntries(STRATEGY_TEMPLATE_KEYS.map((k) => [k, ""])) as Record<
    StrategyTemplateKey,
    string
  >;
}

export function strategyPointsFromJson(j: Json | null): Record<StrategyTemplateKey, string> {
  const out = emptyStrategyPointsRecord();
  if (!j || typeof j !== "object" || Array.isArray(j)) return out;
  const o = j as Record<string, unknown>;
  for (const k of STRATEGY_TEMPLATE_KEYS) {
    const v = o[k];
    if (typeof v === "string") {
      out[k] = v;
    } else if (v && typeof v === "object" && !Array.isArray(v)) {
      const t = (v as Record<string, unknown>).text;
      if (typeof t === "string") out[k] = t;
    }
  }
  return out;
}

export function strategyPointsToJson(record: Record<StrategyTemplateKey, string>): Json {
  const o: Record<string, string> = {};
  for (const k of STRATEGY_TEMPLATE_KEYS) {
    const t = (record[k] ?? "").trim();
    if (t) o[k] = t;
  }
  return o as Json;
}

/** Derive planning-only `research_questions` JSON from the research_needed section text. */
export function researchQuestionsFromResearchNeeded(text: string): Json {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  return lines as unknown as Json;
}
