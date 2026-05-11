# LEXOS — Project State

Last updated: 2026-05-11

## Project

- **Name:** LiNKtrend LEXOS (MVP)
- **Local repo path:** `/Users/linktrend/Projects/LiNKtrend-LEXOS`
- **GitHub repo URL (intended):** `https://github.com/linktrend/LiNKtrend-LEXOS.git`

## Phase and branch

- **Current phase:** Phase 2 — Database Schema and Object Spine
- **Current branch:** `dev/cursor-schema`

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
- WP-02: Supabase schema — 26 tables across 6 migration files; `supabase init` with `config.toml`; demo seed (no real data); `src/types/database.ts` stub; RLS deferred to WP-03; `vector(3072)` for Gemini embeddings; lint and build still passing.

## Work packets

- **Active work packet:** WP-02 — Supabase Schema Migration (`ready_for_review` until accepted).
- **Next:** WP-03 Auth and Basic Access, then WP-04 Client/Matter/Intake Core — per `docs/implementation/05 Work Packet Register.md`.

## Blockers

- **Supabase:** No live project linked. Migrations are created but not applied. Operator must `supabase db push` or `supabase start` once a Supabase project ID is set in `supabase/config.toml`.
- **pgvector:** Extension required for `embedding_chunks.embedding_vector vector(3072)`. Will fail at migration apply time if pgvector is not enabled on the target project.
- **Auth:** RLS deliberately deferred to WP-03; schema is open (no policies) until then.
- **Types:** `src/types/database.ts` is a minimal stub; regenerate with `supabase gen types typescript` after project is linked.

## Environment status

- **Package manager:** `pnpm` (lockfile `pnpm-lock.yaml`).
- Local dev: `pnpm run dev` on port 3000 (default).

## Supabase status

- `supabase/` tree initialized (`config.toml`, `migrations/`, `seed/`).
- Six migration files created; not yet applied to any live DB.
- Demo seed in `supabase/seed/demo_seed.sql` (fake data only; no user_profiles row).
- `supabase db push` or `supabase start` required to apply. Set `project_id` in `supabase/config.toml` first.

## App status

- Running. App Router under `src/app/`; static shell only — no business logic, no auth, no agents.

## Known risks

- pgvector must be enabled on the Supabase project before migration 006 is applied.
- Embedding dimension `vector(3072)` targets Gemini default; change to 1536 or 768 for scaled Gemini output or other providers before first embedding write.
- RLS is off — do not expose this schema to a public network without WP-03 policies.
- `src/types/database.ts` stub will drift if migrations change; regenerate after project link.

## Next recommended step

1. Accept WP-02; set register status to `done` or equivalent.
2. Set `project_id` in `supabase/config.toml`, enable pgvector on the Supabase project, then run `supabase db push`.
3. Regenerate `src/types/database.ts` using the Supabase CLI.
4. Start **WP-03 — Auth and Basic Access** on its assigned branch to implement RLS policies.
