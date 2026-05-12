# LEXOS — Agent Handoff

Coordination between Cursor (lead IDE), Codex (isolated worker), and the human operator. Update this file after every material task per `.cursor/rules/02-coding-agent-workflow.mdc`.

---

## Latest handoff summary

**WP-09 — Evidence Workspace UI** — Implemented on `dev/cursor-ui-evidence`. Key deliverables:

- **`src/components/evidence/`** — `evidenceBadgeStyles.ts` (shared badge classes); **`EvidenceStatusBadges`** (detail status strip + `evidence-status-line`); **`EvidenceWarningBanners`** (stacked alerts: no original, no extraction, placeholder, failed, QA-flagged, parser-risk, accepted caveat, `human-review-banner`); **`EvidenceAssertionsPlaceholder`** (W5 static copy + disabled CTA).
- **`src/server/evidence/queries.ts`** — **`listCurrentExtractionSummariesForMatter`** batched current-extraction fields for list badges (no N+1).
- **`EvidenceTable`** — columns: processing, extraction, extraction quality, matter quality, review; `data-testid` `evidence-table`, `evidence-list-empty`, `evidence-row-{id}`; empty state links to `#evidence-upload`.
- **`EvidenceDetailClient`** — merged **Quality & QA** tab (keeps `quality-flags-panel`, `qa-status-line`, `qa-flags-panel`, `run-extraction-qa`); original “evidentiary anchor” copy; metadata → run extraction → assertions placeholder.
- **`EvidenceUploadForm`** — `id="evidence-upload"` on section for anchor.
- **E2E:** [`e2e/wp06-evidence-upload.spec.ts`](e2e/wp06-evidence-upload.spec.ts) — tab button **Quality & QA** (was QA WP-08).

Verification: `pnpm run lint` — clean. `pnpm run build` — clean. **`CI=true pnpm test:e2e`** — 2 tests passed.

Next: operator merge WP-09; register WP-09 → `done` when merged; W5 when scheduled.

---

## Handoff log

| Date (UTC) | Agent / tool | Work packet | Summary |
|------------|--------------|---------------|---------|
| 2026-05-12 | Cursor | WP-09 | Evidence workspace UI: components, batched extraction summaries for list, table + empty state, detail merge Quality&QA + banners + W5 placeholder; E2E selector update; lint+build+E2E green; PROJECT_STATE + register `ready_for_review` + handoff. |
| 2026-05-14 | Cursor | WP-08 | Deterministic extraction QA comparator, run-qa server path, QA tab + server action, audit events, E2E upload→extract→QA; lint+build+E2E green; PROJECT_STATE + register `ready_for_review`. |
| 2026-05-14 | Cursor | WP-07 | W4-lite extraction runner, parser adapters, evidence detail UI + server action, `evidence_extractions` RLS + follow-up join policies (MCP applied live), E2E extraction path + Playwright CI webServer fix; lint + build + E2E green; PROJECT_STATE + register → `ready_for_review`. |
| 2026-05-12 | Cursor | E2E / WP-06 | Fixed Playwright login + WP-06: moved `EVIDENCE_UPLOAD_INITIAL` out of `actions.ts` (invalid `use server` export); `next.config.ts` `allowedDevOrigins: ['127.0.0.1']`; optional `e2e/global-setup.ts` (`LEXOS_E2E_BOOTSTRAP_AUTH=1`); WP-06 spec + `data-testid` upload errors; `pnpm test:e2e` + lint + build green. |
| 2026-05-13 | Cursor | E2E tooling | Playwright: `@playwright/test` + `dotenv`; `playwright.config.ts` (loads `.env.local` / `.env.e2e.local` quietly); `e2e/wp05-intake.spec.ts`, `e2e/wp06-evidence-upload.spec.ts` (`setInputFiles`); fixtures + `pnpm test:e2e`; `tsconfig` excludes `e2e`; `.env.example` documents `LEXOS_E2E_*`. Tests skip without credentials. |
| 2026-05-13 | Cursor | WP-06 | W4-lite evidence upload UI, Storage originals path, `evidence` + audit `evidence_uploaded`, signed download, migration bucket+storage policies+RLS on sources/evidence; `.env.example` bucket var; lint+build green; PROJECT_STATE + register + handoff; WP-06 → `ready_for_review`. |
| 2026-05-12 | Cursor | WP-04 hardening | `20260512100000_wp04_security_profile_lock_and_delete_policies.sql`: user_profiles self-update locked (trigger + revoke + RPC); DELETE RLS clients/matters/workflow_states; live DDL via MCP `execute_sql` (3 parts); lint+build green; PROJECT_STATE + handoff updated. |
| 2026-05-12 | Cursor | WP-04 | Client/matter CRUD UI + server modules; workflow init on matter create; audit events (three types); RLS migration `20260512000001` on clients/matters/workflow_states/audit_events (MCP applied); lint+build green; browser + SQL verification; WP-04 → `ready_for_review`. |
| 2026-05-12 | Cursor | WP-03 follow-up | Test auth user repaired for GoTrue: `instance_id` zero-UUID, `auth.identities` email row, NULL token columns coalesced to empty string; browser verified login → `/dashboard` (Signed-in User). |
| 2026-05-11 | Cursor | WP-03 | Auth foundation: server/admin clients, proxy route protection, login page (Server Action), logout route, user_profiles RLS + trigger (migration 007 applied via MCP), dashboard profile display; lint+build green; WP-03 → `ready_for_review`. |
| 2026-05-11 | Cursor | WP-02 (push) | 6 migrations applied to live project `iqoelotzvdcjifajfuto` via MCP; 26 tables confirmed; full types auto-generated; lint+build green; WP-02 → `ready_for_review` (live). |
| 2026-05-11 | Cursor | WP-02 | 26-table Supabase schema; 6 migrations; vector(3072) Gemini; RLS deferred; demo seed (no real data); type stub; lint+build green; WP-02 → `ready_for_review`. |
| 2026-05-11 | Cursor | WP-01 | Next.js + TS + Tailwind app shell; matter/client routes; Supabase placeholder; README/.gitignore merged; lint+build green; WP-01 → `ready_for_review`. |
| 2026-05-11 | Cursor | WP-00 | Established project state, handoff structure, README, env template, gitignore; WP-00 → `ready_for_review`. |

(Add new rows above the template section or continue the table.)

---

## Reusable handoff template — Cursor

Copy and fill before starting work:

```markdown
## Handoff — Cursor

- **Date:**
- **Work packet:** (ID and title from `docs/implementation/05 Work Packet Register.md`)
- **Branch:** `dev/cursor-<task>` (must match packet)
- **Allowed paths:** (paste from packet)
- **Prohibited paths:** (paste from packet)
- **Sources read:** PROJECT_STATE.md, AGENT_HANDOFF.md, roadmap, packet register, packet-specific implementation doc(s)
- **Acceptance criteria:** (from packet)
- **Verification run:** (lint / typecheck / tests / manual checklist — or explicit “none yet”)
- **Outcome:** (done / blocked / partial)
- **Updates made:** PROJECT_STATE.md (Y/N), AGENT_HANDOFF.md (Y/N), other paths
```

---

## Reusable handoff template — Codex

Copy and fill before starting work:

```markdown
## Handoff — Codex

- **Date:**
- **Work packet:** (single packet ID — Codex is bounded to one packet)
- **Branch:** `dev/codex-<task>` or as specified in packet (must match packet)
- **Allowed paths:** (paste exactly from packet; do not expand scope)
- **Prohibited paths:** (paste exactly; includes `docs/lexos-system-spec/` unless human explicitly instructs)
- **Sources read:** (packet “Source Documents to Read” list)
- **Acceptance criteria:** (from packet)
- **Tests / verification:** (per packet; attach results or manual report)
- **Outcome:** (done / blocked — stop and report if packet requires prohibited files)
- **Handoff:** Append row to Handoff log; update PROJECT_STATE if phase/blockers/next step changed
```

---

## Quick pointers

- Work packets and status: `docs/implementation/05 Work Packet Register.md`
- MVP sequence and doctrine: `docs/implementation/00 MVP Implementation Roadmap.md`
- Canonical architecture (read-only for agents): `docs/lexos-system-spec/`
