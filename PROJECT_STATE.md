# LEXOS — Project State

Last updated: 2026-05-11 (WP-02 migrations applied to live Supabase project)

## Project

- **Name:** LiNKtrend LEXOS (MVP)
- **Local repo path:** `/Users/linktrend/Projects/LiNKtrend-LEXOS`
- **GitHub repo URL (intended):** `https://github.com/linktrend/LiNKtrend-LEXOS.git`

## Phase and branch

- **Current phase:** Phase 2 — Database Schema and Object Spine (migrations live)
- **Current branch:** `development` (WP-02 merged)

## Documentation structure

| Path | Role |
|------|------|
| `docs/lexos-system-spec/` | Thirteen canonical LEXOS system-specification documents (architectural authority). Read-only for implementation agents unless explicitly instructed otherwise. |
| `docs/implementation/` | MVP implementation control: roadmap, database schema, W4-lite spec, acceptance test plan, agent prompt registry, work packet register. |
| `docs/source-briefings/` | Legacy briefing and historical material only; not authoritative for implementation. |
| `.cursor/rules/` | LEXOS agent and architecture rules for Cursor. |
| `.cursor/skills/` | Project-scoped skills for Cursor. |
| `src/app/` | Next.js App Router routes and layouts (LEXOS UI shell). |
| `supabase/migrations/` | Postgres migrations (WP-02). |
| `supabase/seed/` | Demo seed data (fake only). |

## Completed setup work

- Canonical specs and implementation documents under `docs/`.
- WP-00: project control files, `.gitignore`, `.env.example`.
- WP-01: Next.js 16 + React 19 + TypeScript + Tailwind v4 app scaffold; all matter sub-route shells; Supabase browser client placeholder; `pnpm run lint` and `pnpm run build` passing.
- WP-02: Supabase schema — 26 tables across 6 migration files applied to live project `iqoelotzvdcjifajfuto`; `vector(3072)` for Gemini embeddings; RLS deferred to WP-03; full TypeScript types auto-generated from live schema; lint and build passing.

## Work packets

- **Active work packet:** WP-02 — Supabase Schema Migration (`ready_for_review`; migrations live).
- **Next:** WP-03 Auth and Basic Access, then WP-04 Client/Matter/Intake Core — per `docs/implementation/05 Work Packet Register.md`.

## Blockers

- **Credentials:** Operator to cycle Supabase credentials after dev session (as noted when provided).
- **Auth:** RLS deliberately deferred to WP-03; schema is open (no policies) until then. Do not expose to public network without WP-03.
- **`supabase link`:** CLI link (`supabase link --project-ref`) requires a Supabase personal access token (PAT). Direct CLI `db push` via IPv4 was not possible (project is IPv6-only direct connection). Migrations were applied successfully via Supabase MCP (`apply_migration`). Types were generated via MCP (`generate_typescript_types`).

## Environment status

- **Package manager:** `pnpm` (lockfile `pnpm-lock.yaml`).
- Local dev: `pnpm run dev` on port 3000 (default).

## Supabase status

- **Project:** `iqoelotzvdcjifajfuto` — `ACTIVE_HEALTHY`, region `ap-southeast-1`, Postgres 17.6.
- All 6 migrations applied successfully via MCP. 26 tables live in public schema.
- `src/types/database.ts` fully regenerated from live schema (auto-generated, not hand-written).
- Demo seed in `supabase/seed/demo_seed.sql` — NOT yet applied; must be run manually against live project after a dev auth user exists (for `user_profiles` FK safety).
- pgvector enabled and `vector(3072)` column confirmed live.

## App status

- Running. App Router under `src/app/`; static shell only — no business logic, no auth, no agents.

## Known risks

- RLS is off — do not expose this schema to a public network without WP-03 policies.
- Embedding dimension `vector(3072)` targets Gemini default; change to 1536 or 768 for scaled output or other providers before first embedding write (ALTER TABLE required before data inserted).
- Demo seed not applied — run manually after creating a dev auth user to avoid user_profiles FK violations.
- Credentials should be cycled after dev session.

## Next recommended step

1. Accept WP-02; set register status to `done`.
2. Start **WP-03 — Auth and Basic Access** on `dev/cursor-auth` to implement RLS policies and auth flows.
3. Optionally: create a dev Supabase auth user and apply `supabase/seed/demo_seed.sql` manually for testing.
