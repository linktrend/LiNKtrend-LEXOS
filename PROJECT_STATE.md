# LEXOS — Project State

Last updated: 2026-05-11 (WP-03 auth and user profile foundation complete)

## Project

- **Name:** LiNKtrend LEXOS (MVP)
- **Local repo path:** `/Users/linktrend/Projects/LiNKtrend-LEXOS`
- **GitHub repo URL (intended):** `https://github.com/linktrend/LiNKtrend-LEXOS.git`

## Phase and branch

- **Current phase:** Phase 3 — Auth and User Profile Foundation
- **Current branch:** `dev/cursor-auth` (WP-03 in progress)

## Documentation structure

| Path | Role |
|------|------|
| `docs/lexos-system-spec/` | Thirteen canonical LEXOS system-specification documents (architectural authority). Read-only for implementation agents unless explicitly instructed otherwise. |
| `docs/implementation/` | MVP implementation control: roadmap, database schema, W4-lite spec, acceptance test plan, agent prompt registry, work packet register. |
| `docs/source-briefings/` | Legacy briefing and historical material only; not authoritative for implementation. |
| `.cursor/rules/` | LEXOS agent and architecture rules for Cursor. |
| `.cursor/skills/` | Project-scoped skills for Cursor. |
| `src/app/` | Next.js App Router routes and layouts (LEXOS UI shell). |
| `supabase/migrations/` | Postgres migrations (WP-02 + WP-03). |
| `supabase/seed/` | Demo seed data (fake only). |

## Completed setup work

- Canonical specs and implementation documents under `docs/`.
- WP-00: project control files, `.gitignore`, `.env.example`.
- WP-01: Next.js 16 + React 19 + TypeScript + Tailwind v4 app scaffold; all matter sub-route shells; Supabase browser client placeholder; `pnpm run lint` and `pnpm run build` passing.
- WP-02: Supabase schema — 26 tables across 6 migration files applied to live project `iqoelotzvdcjifajfuto`; `vector(3072)` for Gemini embeddings; RLS deferred; full TypeScript types auto-generated from live schema; lint and build passing.
- WP-03: Auth foundation — `@supabase/ssr` server/admin clients, `src/proxy.ts` route protection, login page (email+password Server Action), logout route, `user_profiles` RLS + auto-create trigger (migration 007 applied via MCP), dashboard profile display; lint and build passing.

## Work packets

- **Active work packet:** WP-03 — Auth and User Profile Foundation (`ready_for_review`).
- **Next:** WP-04 — Client/Matter/Intake Core — per `docs/implementation/05 Work Packet Register.md`.

## Blockers

- **Credentials:** Operator must populate `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` before running locally. Never commit `.env.local`.
- **RLS — 25 remaining tables:** Only `user_profiles` has RLS enabled. All other tables remain open to authenticated queries. Safe during MVP dev (no real legal data, private network). **Must be resolved in WP-04+ before production use or any external access. Tracked blocker.**
- **`supabase link`:** CLI link requires Supabase PAT. IPv4 direct connection not available (project is IPv6-only). Migrations applied via MCP. Types generated via MCP.
- **Manual auth verification:** Cannot be performed without a live `.env.local` and a test Supabase auth user. Operator should run the checklist (see AGENT_HANDOFF.md) after configuring credentials.

## Environment status

- **Package manager:** `pnpm` (lockfile `pnpm-lock.yaml`).
- Local dev: `pnpm run dev` on port 3000 (default).

## Supabase status

- **Project:** `iqoelotzvdcjifajfuto` — `ACTIVE_HEALTHY`, region `ap-southeast-1`, Postgres 17.6.
- 7 migrations applied (6 WP-02 schema + 1 WP-03 RLS/trigger). 26 tables live.
- `user_profiles` RLS enabled. `handle_new_auth_user` trigger live.
- `src/types/database.ts` auto-generated from live schema (WP-02). No regeneration required for WP-03 (trigger/policy only, no new columns).
- Demo seed in `supabase/seed/demo_seed.sql` — NOT yet applied. Run manually after creating a dev auth user.

## App status

- Auth flow complete: `/login` → Server Action → session cookie → `/dashboard` → `user_profiles` display + logout.
- Route protection active via `src/proxy.ts` (Next.js 16 proxy convention).
- No business logic, no W4 ingestion, no agents.

## Known risks

- **RLS on 25 tables is off** — do not expose to a public network without WP-04 policies.
- Embedding dimension `vector(3072)` targets Gemini default; change before first embedding write if using a different provider.
- Demo seed not applied — run manually after creating a dev auth user.
- New users default to role `operator`; admin must manually update roles via service-role server code.

## Next recommended step

1. Accept WP-03; set register status to `done`.
2. Configure `.env.local` and run manual auth verification checklist (see AGENT_HANDOFF.md).
3. Start **WP-04 — Client/Matter/Intake Core** on `dev/cursor-intake`.
