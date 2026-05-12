# LEXOS — Project State

Last updated: 2026-05-12 (WP-04 Client / Matter / Workflow Foundation complete)

## Project

- **Name:** LiNKtrend LEXOS (MVP)
- **Local repo path:** `/Users/linktrend/Projects/LiNKtrend-LEXOS`
- **GitHub repo URL (intended):** `https://github.com/linktrend/LiNKtrend-LEXOS.git`

## Phase and branch

- **Current phase:** Phase 4 — Client / Matter / Workflow Foundation (MVP data + UI)
- **Current branch:** `dev/cursor-client-matter` (WP-04 implementation)

## Documentation structure

| Path | Role |
|------|------|
| `docs/lexos-system-spec/` | Thirteen canonical LEXOS system-specification documents (architectural authority). Read-only for implementation agents unless explicitly instructed otherwise. |
| `docs/implementation/` | MVP implementation control: roadmap, database schema, W4-lite spec, acceptance test plan, agent prompt registry, work packet register. |
| `docs/source-briefings/` | Legacy briefing and historical material only; not authoritative for implementation. |
| `.cursor/rules/` | LEXOS agent and architecture rules for Cursor. |
| `.cursor/skills/` | Project-scoped skills for Cursor. |
| `src/app/` | Next.js App Router routes and layouts (LEXOS UI). |
| `supabase/migrations/` | Postgres migrations (WP-02 schema + WP-03 auth + **WP-04 RLS**). |
| `supabase/seed/` | Demo seed data (fake only). |

## Completed setup work

- Canonical specs and implementation documents under `docs/`.
- WP-00 through WP-03 as previously recorded (app shell, live schema, auth, `user_profiles` RLS + trigger).
- **WP-04:** Client list/create/detail; matter list; matter create under client; matter layout + overview with posture/jurisdiction/status/workflow; `workflow_states` initialized on matter create (`W2` / `not_started` / next action); dashboard recent matters; server modules under `src/server/`; `created_by` scoping for non-admin with admin override; audit events `client_created`, `matter_created`, `workflow_state_initialized`; **RLS MVP policies** on `clients`, `matters`, `workflow_states`, `audit_events` (migration `20260512000001_wp04_clients_matters_workflow_audit_rls.sql`, applied to live project via MCP). `pnpm run lint` and `pnpm run build` pass. Manual browser smoke: create client → create matter → overview shows workflow.

## Work packets

- **Active work packet:** WP-04 — Client / Matter / Workflow Foundation (`ready_for_review`).
- **Next:** WP-05 — W0-lite Intake Foundation — per `docs/implementation/05 Work Packet Register.md`.

## Blockers

- **Credentials:** `.env.local` remains local-only; never commit.
- **RLS — remaining tables:** MVP RLS now covers **`clients`**, **`matters`**, **`workflow_states`**, and **`audit_events`** (owner + admin via `user_profiles.role`). **All other legal-domain tables** (evidence, assertions, stories, etc.) remain **without row policies** until a dedicated RLS packet. **Do not treat as production-grade isolation**; matter-team ABAC is not implemented yet.
- **Matter + workflow + audits:** Not a single DB transaction from the app; mutations use **best-effort rollback** (delete workflow then matter if audit insert fails after row creation). Residual orphan risk is low but non-zero; document if adding concurrent writers.
- **`supabase link` / CLI:** PAT and IPv6 issues may persist; migrations can be applied via Supabase MCP when needed.

## Environment status

- **Package manager:** `pnpm` (lockfile `pnpm-lock.yaml`).
- Local dev: `pnpm run dev` on port 3000 (default).

## Supabase status

- **Project:** `iqoelotzvdcjifajfuto` — `ACTIVE_HEALTHY`, region `ap-southeast-1`, Postgres 17.6.
- **Migrations:** WP-02 (6) + WP-03 (1) + **WP-04 RLS (1)** on live DB (`apply_migration` MCP for WP-04 RLS file).
- `src/types/database.ts` — regenerate after future DDL (`supabase gen types typescript …` or MCP).
- Demo seed file unchanged; optional for local testing.

## App status

- Auth + profile (WP-03) unchanged.
- **Clients / matters:** CRUD foundation live; matter tabs beyond overview remain placeholders (no W4, no W0 intake, no agents).

## Known risks

- RLS on evidence, stories, assertions, etc. is **still absent** — same network-exposure rules as before for those tables.
- Admin detection in RLS uses **`user_profiles.role = 'admin'`** subquery; keep profile roles accurate.
- Embedding dimension `vector(3072)` unchanged; revisit before first embedding write if provider changes.

## Next recommended step

1. Review WP-04; merge `dev/cursor-client-matter` when satisfied; set WP-04 to `done` in register.
2. Start **WP-05 — W0-lite Intake Foundation** on `dev/cursor-w0-intake` if intake is next priority.
