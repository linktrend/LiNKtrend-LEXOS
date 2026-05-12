# LEXOS — Project State

Last updated: 2026-05-12 (WP-05 W0-lite intake UI + intake-table RLS)

## Project

- **Name:** LiNKtrend LEXOS (MVP)
- **Local repo path:** `/Users/linktrend/Projects/LiNKtrend-LEXOS`
- **GitHub repo URL (intended):** `https://github.com/linktrend/LiNKtrend-LEXOS.git`

## Phase and branch

- **Current phase:** Phase 4 — Client / Matter / Workflow + W0-lite intake (MVP data + UI)
- **Current branch:** `dev/cursor-w0-intake` (WP-05 implementation)

## Documentation structure

| Path | Role |
|------|------|
| `docs/lexos-system-spec/` | Thirteen canonical LEXOS system-specification documents (architectural authority). Read-only for implementation agents unless explicitly instructed otherwise. |
| `docs/implementation/` | MVP implementation control: roadmap, database schema, W4-lite spec, acceptance test plan, agent prompt registry, work packet register. |
| `docs/source-briefings/` | Legacy briefing and historical material only; not authoritative for implementation. |
| `.cursor/rules/` | LEXOS agent and architecture rules for Cursor. |
| `.cursor/skills/` | Project-scoped skills for Cursor. |
| `src/app/` | Next.js App Router routes and layouts (LEXOS UI). |
| `supabase/migrations/` | Postgres migrations (WP-02 schema + WP-03 auth + **WP-04 RLS** + **WP-04 security hardening** + **WP-05 intake RLS**). |
| `supabase/seed/` | Demo seed data (fake only). |

## Completed setup work

- Canonical specs and implementation documents under `docs/`.
- WP-00 through WP-03 as previously recorded (app shell, live schema, auth, `user_profiles` RLS + trigger).
- **WP-04:** Client list/create/detail; matter list; matter create under client; matter layout + overview with posture/jurisdiction/status/workflow; `workflow_states` initialized on matter create (`W2` / `not_started` / next action); dashboard recent matters; server modules under `src/server/`; `created_by` scoping for non-admin with admin override; audit events `client_created`, `matter_created`, `workflow_state_initialized`; **RLS MVP policies** on `clients`, `matters`, `workflow_states`, `audit_events` (migration `20260512000001_wp04_clients_matters_workflow_audit_rls.sql`, applied to live project via MCP). **Pre-merge security hardening** (migration `20260512100000_wp04_security_profile_lock_and_delete_policies.sql`): `user_profiles` — `users_update_own_profile` removed; `authenticated`/`anon` **UPDATE revoked** on the table; **BEFORE UPDATE** trigger blocks changes to `id`, `role`, `status`, `email` unless `auth.role() = 'service_role'`; **`update_own_user_display_name(text)`** SECURITY DEFINER RPC for safe `display_name` self-service (`EXECUTE` granted to `authenticated`); **DELETE** RLS on `clients`, `matters`, `workflow_states` aligned with owner/admin so app rollback deletes work. Live DDL for `20260512100000` applied via Supabase MCP **`execute_sql`** in three statements (same SQL as the committed migration file). `pnpm run lint` and `pnpm run build` pass. Manual browser smoke: create client → create matter → overview shows workflow.
- **WP-05:** W0-lite intake routes (`/intake`, `/intake/new`, `/intake/[intakeId]`), `src/server/intake/*`, `src/features/intake/*`, handoff prepare + explicit W1 materialize with `created_from_intake_id` / `created_from_matter_candidate_id`, reject/abandon without W1 writes; **RLS** on five intake tables (`20260512120000_wp05_intake_rls.sql`, applied live via MCP **`apply_migration`** `wp05_intake_rls`); SiteHeader **Intake** link; intake audit event types as in `AGENT_HANDOFF.md`. `pnpm run lint` / `pnpm run build` green after implementation.

## Work packets

- **Active work packet:** WP-05 — W0-lite Intake Foundation (`ready_for_review`).
- **Next:** Human review of WP-05; merge to `development` when satisfied; then next roadmap packet.

## Blockers

- **Credentials:** `.env.local` remains local-only; never commit.
- **RLS — remaining tables:** MVP RLS covers **`clients`**, **`matters`**, **`workflow_states`**, **`audit_events`**, and **W0 intake tables** (`intake_records`, `intake_groups`, `client_candidates`, `matter_candidates`, `intake_tasks` — migration `20260512120000_wp05_intake_rls.sql`, applied via Supabase MCP `apply_migration`). **Other legal-domain tables** (evidence, assertions, stories, etc.) remain **without row policies** until a dedicated RLS packet. **Do not treat as production-grade isolation**; matter-team ABAC is not implemented yet.
- **Matter + workflow + audits:** Not a single DB transaction from the app; mutations use **best-effort rollback** (delete workflow then matter if audit insert fails after row creation). **DELETE** policies on `clients` / `matters` / `workflow_states` allow owner/admin cleanup under the user JWT (WP-04 security migration). Residual orphan risk from failed deletes should be low; document if adding concurrent writers.
- **`supabase link` / CLI:** PAT and IPv6 issues may persist; migrations can be applied via Supabase MCP when needed.

## Environment status

- **Package manager:** `pnpm` (lockfile `pnpm-lock.yaml`).
- Local dev: `pnpm run dev` on port 3000 (default).

## Supabase status

- **Project:** `iqoelotzvdcjifajfuto` — `ACTIVE_HEALTHY`, region `ap-southeast-1`, Postgres 17.6.
- **Migrations:** WP-02 (6) + WP-03 (1) + **WP-04 RLS (1)** + **WP-04 security hardening (1)** + **WP-05 intake RLS (1)** on live DB. WP-04 RLS applied via `apply_migration` MCP; hardening file `20260512100000_wp04_security_profile_lock_and_delete_policies.sql` applied via MCP **`execute_sql`** (three sequential statements; idempotent with migration file). **`20260512120000_wp05_intake_rls.sql`** applied via MCP **`apply_migration`** (`wp05_intake_rls`).
- `src/types/database.ts` — regenerate after future DDL (`supabase gen types typescript …` or MCP).
- Demo seed file unchanged; optional for local testing.

## App status

- Auth + profile (WP-03) unchanged.
- **Clients / matters:** CRUD foundation live; matter tabs beyond overview remain placeholders (no W4, no agents).
- **W0-lite intake:** Routes `/intake`, `/intake/new`, `/intake/[intakeId]`; server modules `src/server/intake/*`; explicit prepare-handoff + materialize W1 (client/matter with `created_from_intake_id` / `created_from_matter_candidate_id`); reject/abandon with no W1 side effects; read-only intake tasks section.

## Known risks

- RLS on evidence, stories, assertions, etc. is **still absent** — same network-exposure rules as before for those objects. Intake tables now have MVP owner/admin RLS (WP-05); that is **not** full ABAC.
- Admin detection in RLS uses **`user_profiles.role = 'admin'`** subquery; **`role` and `status` are not user-updatable via PostgREST** on `user_profiles` (UPDATE revoked for `authenticated`/`anon`; BEFORE UPDATE trigger blocks `id`/`role`/`status`/`email` changes except under `auth.role() = 'service_role'`; use RPC **`update_own_user_display_name`** for `display_name` only). Promote/demote roles via **service-role server paths** only.
- Embedding dimension `vector(3072)` unchanged; revisit before first embedding write if provider changes.

## Next recommended step

1. Review WP-05 on `dev/cursor-w0-intake`; merge when satisfied; set WP-05 to `done` in register.
2. Manual browser smoke on live: login → `/intake` → create intake → candidates → prepare handoff → create W1; confirm audit rows include `intake_id` where applicable.
