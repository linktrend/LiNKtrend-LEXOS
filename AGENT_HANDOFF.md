# LEXOS — Agent Handoff

Coordination between Cursor (lead IDE), Codex (isolated worker), and the human operator. Update this file after every material task per `.cursor/rules/02-coding-agent-workflow.mdc`.

---

## Latest handoff summary

**WP-22 — W11 Revised Output Foundation** — Implemented on **`dev/cursor-revised-output`** (register **`ready_for_review`**):

- **Routes:** [`/matters/[matterId]/output`](src/app/matters/[matterId]/output/page.tsx), [`/matters/[matterId]/output/[outputArtifactId]`](src/app/matters/[matterId]/output/[outputArtifactId]/page.tsx); MatterNav **Output**; **`AdversarialOutputPlaceholder`** links to the output list.
- **Server:** [`src/server/output/queries.ts`](src/server/output/queries.ts), [`mutations.ts`](src/server/output/mutations.ts), [`summary.ts`](src/server/output/summary.ts) — list/detail, `getOutputWorkspaceSummary`, `buildCaveatSnapshot`; create/update/archive on **`output_artifacts`**; W9 gate (≥1 active `adversarial_critiques` **or** `metadata.operator_override_w9_prereq` + reason ≥8 chars); [`advanceWorkflowToW11AfterFirstRevisedOutput`](src/server/workflow/mutations.ts) (strict **W9→W11** on first active output); audits `output_artifact_created` / `updated` / `archived` / `w9_caveat_carried_forward` (metadata only — no full markdown).
- **UI:** [`src/features/output/*`](src/features/output/) — internal-work-product banners, create form (argument draft + adversarial critique, optional override), workspace editor (`metadata.revised_sections` + narrative markdown), read-only caveat panels.
- **E2E:** [`e2e/wp22-revised-output.spec.ts`](e2e/wp22-revised-output.spec.ts) — argument → adversarial → output create path.
- **RLS:** Existing **`20260520120000_wp16_output_artifacts_rls.sql`** (no new migration).

Verification: **`pnpm run lint`** — clean. **`pnpm run build`** — clean. **`CI=true pnpm test:e2e`** — **9 passed**.

---

**Pre-WP-16 cleanup (2026-05-13)** — Readiness before WP-16 (no WP-16 product implementation):

- **`docs/implementation/MIGRATION_HISTORY_NOTES.md`** — Repo vs live Supabase migration names; MCP-only WP-12 hotfix rows; WP-07 filename drift; warning not to duplicate DDL.
- **Migrations:** `supabase/migrations/20260520120000_wp16_output_artifacts_rls.sql`, `20260520120100_wp16_risks_rls.sql` — RLS + SELECT/INSERT/UPDATE (matter owner / client creator / admin; `risks` supports client-only rows); **no DELETE**; no anon policies.
- **Live apply:** Supabase MCP `apply_migration` **`wp16_output_artifacts_rls`** and **`wp16_risks_rls`** on project `iqoelotzvdcjifajfuto` (same SQL as repo files).
- **`PROJECT_STATE.md`** — Phase 12 / branch `development`; active WP-16 per register on **`dev/cursor-risk-workflow-audit`** (distinct from WP-22 branch `dev/cursor-revised-output`); pre-WP-16 verification + cleanup noted; RLS blockers updated for `output_artifacts`/`risks`.
- **Verification:** `pnpm run lint`, `pnpm run build` (E2E not re-run in this cleanup pass).

**WP-15 — W9 Adversarial Review Foundation** — Implemented on `dev/cursor-w9-adversarial` (merged to `development`). Key deliverables:

- **Routes / nav:** [`/matters/[matterId]/adversarial`](src/app/matters/[matterId]/adversarial/page.tsx), [`/matters/[matterId]/adversarial/[adversarialCritiqueId]`](src/app/matters/[matterId]/adversarial/[adversarialCritiqueId]/page.tsx); MatterNav **Adversarial** unchanged; **ArgumentW9Placeholder** links to adversarial list.
- **Server:** [`src/server/adversarial/queries.ts`](src/server/adversarial/queries.ts), [`mutations.ts`](src/server/adversarial/mutations.ts), [`summary.ts`](src/server/adversarial/summary.ts) (`getAdversarialWorkspaceSummary` = argument workspace summary + non-archived argument draft options); [`advanceWorkflowToW9AfterFirstAdversarialCritique`](src/server/workflow/mutations.ts) (strict **W8→W9** on first `adversarial_critiques` insert when matter at W8; `W9_NEXT_ACTION` constant); loop-decision optional `workflow_states.next_action` sync + audit `adversarial_loop_decision_recorded`.
- **UI:** [`src/features/adversarial/*`](src/features/adversarial/) — banners, create form, critique workspace (attack matrix + markdown + severity + loop decision + archive/supersede), **Output (W11)** link card (**WP-22**); list/detail pages mirror argument/research patterns; **StrategyIssuePanels** + **ArgumentInputSummaryPanel** with `workflowAdvanceHint="adversarial"`.
- **RLS:** [`20260520100000_wp15_adversarial_critiques_rls.sql`](supabase/migrations/20260520100000_wp15_adversarial_critiques_rls.sql) — mirror WP-14 spirit; **no DELETE**; apply to live DB for non-skipped WP-15 E2E.
- **Audits:** `adversarial_critique_created` / `updated` / `archived` / `adversarial_loop_decision_recorded` (metadata only — no full critique body).
- **Register:** **WP-15** = W9 (full packet); former **WP-21** stub superseded; **WP-22** = W11 Revised Output (renumbered from old WP-15).
- **E2E:** [`e2e/wp15-adversarial-critique.spec.ts`](e2e/wp15-adversarial-critique.spec.ts) — creates argument draft first, then adversarial; conditional skip when RLS denies `adversarial_critiques` insert.

Verification (WP-15 era): `pnpm run lint` — clean. `pnpm run build` — clean. **`CI=true pnpm test:e2e`** — 7 passed, 1 skipped when `adversarial_critiques` RLS absent on E2E DB (pre-cleanup live may now be 8/8; see `PROJECT_STATE`).

**Manual smoke (operator):** login → matter with W8 argument draft → **Adversarial** → create critique → editor saves matrix / loop decision / severity → issue panels still show gaps → **Output** workspace creates revised artifact (W9 gate or override); optional: confirm workflow **W8→W9** after first critique when matter was in W8.

Next: merge **`dev/cursor-revised-output`** after review; start **WP-16** on `dev/cursor-risk-workflow-audit` per register.

---

## Handoff log

| Date (UTC) | Agent / tool | Work packet | Summary |
|------------|--------------|-------------|---------|
| 2026-05-13 | Cursor | WP-22 | W11 revised output list/detail, `src/server/output/*` + workflow W9→W11 on first output, W9 gate + override, caveat snapshot + audits, `src/features/output/*`, adversarial link to output, Playwright `wp22-revised-output`; lint+build+E2E 9 passed; register WP-22 `ready_for_review`; PROJECT_STATE updated. |
| 2026-05-13 | Cursor | Pre-WP-16 cleanup | `MIGRATION_HISTORY_NOTES.md`; `output_artifacts` + `risks` RLS migrations (repo + MCP apply on `iqoelotzvdcjifajfuto`); PROJECT_STATE refresh (WP-16 vs WP-22 branch clarity); lint+build; no WP-16 UI. |
| 2026-05-13 | Cursor | WP-15 | W9 adversarial list/detail, server CRUD + summary + workflow W8→W9 on first critique, RLS migration, argument W9 link + output placeholder, audits + Playwright wp15 (after argument draft); lint+build+E2E; PROJECT_STATE + register + handoff. |
| 2026-05-13 | Cursor | WP-14 | W8 argument list/detail, server CRUD + summary + workflow W7→W8 on first draft, RLS migration, research W8 link + W9 placeholder, audits + Playwright wp14; strategy `argument` workflow hint; register WP-14/WP-21 reconciliation; lint+build+E2E; PROJECT_STATE + register + handoff. |
| 2026-05-12 | Cursor | WP-13 | W7 research memo list/detail, server CRUD + summary + workflow W6→W7 on first memo, RLS migration (repo + MCP on live), strategy W7 link, audits + issue status audits, Playwright wp13; lint+build+E2E; PROJECT_STATE + register `ready_for_review` + handoff. |
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
