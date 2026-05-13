import type { Json } from "@/types/database";
import {
  RESEARCH_ISSUE_STATUSES,
  RESEARCH_TEMPLATE_KEYS,
  type ResearchIssueStatus,
  type ResearchTemplateKey,
} from "@/features/research/template-keys";

export type ResearchIssue = {
  id: string;
  title: string;
  description?: string | null;
  status: ResearchIssueStatus;
  priority?: string | null;
  linked_assertion_ids?: string[];
  linked_strategy_memo_id?: string | null;
  notes?: string | null;
};

const ISSUE_STATUS_SET = new Set<string>(RESEARCH_ISSUE_STATUSES);

export function emptyResearchSectionsRecord(): Record<ResearchTemplateKey, string> {
  return Object.fromEntries(RESEARCH_TEMPLATE_KEYS.map((k) => [k, ""])) as Record<
    ResearchTemplateKey,
    string
  >;
}

export function researchSectionsFromJson(j: Json | null): Record<ResearchTemplateKey, string> {
  const out = emptyResearchSectionsRecord();
  if (!j || typeof j !== "object" || Array.isArray(j)) return out;
  const o = j as Record<string, unknown>;
  for (const k of RESEARCH_TEMPLATE_KEYS) {
    const v = o[k];
    if (typeof v === "string") {
      out[k] = v;
    }
  }
  return out;
}

export function researchSectionsToJson(record: Record<ResearchTemplateKey, string>): Json {
  const o: Record<string, string> = {};
  for (const k of RESEARCH_TEMPLATE_KEYS) {
    const t = (record[k] ?? "").trim();
    if (t) o[k] = t;
  }
  return o as Json;
}

function parseIssue(raw: unknown): ResearchIssue | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const o = raw as Record<string, unknown>;
  const id = typeof o.id === "string" ? o.id.trim() : "";
  const title = typeof o.title === "string" ? o.title.trim() : "";
  if (!id || !title) return null;
  const statusRaw = typeof o.status === "string" ? o.status.trim() : "pending";
  const status = ISSUE_STATUS_SET.has(statusRaw) ? (statusRaw as ResearchIssueStatus) : "pending";
  const description = typeof o.description === "string" ? o.description : null;
  const priority = typeof o.priority === "string" ? o.priority.trim() || null : null;
  const notes = typeof o.notes === "string" ? o.notes : null;
  let linked_assertion_ids: string[] | undefined;
  if (Array.isArray(o.linked_assertion_ids)) {
    linked_assertion_ids = o.linked_assertion_ids.filter((x): x is string => typeof x === "string");
  }
  const linked_strategy_memo_id =
    typeof o.linked_strategy_memo_id === "string" && o.linked_strategy_memo_id.trim()
      ? o.linked_strategy_memo_id.trim()
      : null;
  return {
    id,
    title,
    description,
    status,
    priority: priority ?? undefined,
    linked_assertion_ids,
    linked_strategy_memo_id,
    notes,
  };
}

export function researchIssuesFromMetadata(meta: Json | null): ResearchIssue[] {
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) return [];
  const raw = (meta as Record<string, unknown>).research_issues;
  if (!Array.isArray(raw)) return [];
  const out: ResearchIssue[] = [];
  for (const item of raw) {
    const p = parseIssue(item);
    if (p) out.push(p);
  }
  return out;
}

export function researchIssuesToJson(issues: ResearchIssue[]): Json {
  return issues as unknown as Json;
}

export function parseResearchIssuesJson(text: string): ResearchIssue[] {
  const t = text.trim();
  if (!t) return [];
  try {
    const parsed = JSON.parse(t) as unknown;
    if (!Array.isArray(parsed)) return [];
    const out: ResearchIssue[] = [];
    for (const item of parsed) {
      const p = parseIssue(item);
      if (p) out.push(p);
    }
    return out;
  } catch {
    return [];
  }
}

export function parseAuthoritiesJson(text: string): Json | null {
  const t = text.trim();
  if (!t) return null;
  try {
    const parsed = JSON.parse(t) as unknown;
    if (Array.isArray(parsed)) return parsed as Json;
    if (parsed && typeof parsed === "object") return parsed as Json;
  } catch {
    /* fall through */
  }
  const lines = t.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return null;
  return lines as unknown as Json;
}
