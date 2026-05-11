# LEXOS — Project State

Last updated: 2026-05-11

## Project

- **Name:** LiNKtrend LEXOS (MVP)
- **Local repo path:** `/Users/linktrend/Projects/LiNKtrend-LEXOS`
- **GitHub repo URL (intended):** `https://github.com/linktrend/LiNKtrend-LEXOS.git`

## Phase and branch

- **Current phase:** Phase 1 — App Foundation (see `docs/implementation/00 MVP Implementation Roadmap.md`, section 7)
- **Current branch:** `dev/cursor-foundation`

## Documentation structure

| Path | Role |
|------|------|
| `docs/lexos-system-spec/` | Thirteen canonical LEXOS system-specification documents (architectural authority). Read-only for implementation agents unless explicitly instructed otherwise. |
| `docs/implementation/` | MVP implementation control: roadmap, database schema, W4-lite spec, acceptance test plan, agent prompt registry, work packet register, and related build docs. |
| `docs/source-briefings/` | Legacy briefing and historical material only; not authoritative for implementation. |
| `.cursor/rules/` | LEXOS agent and architecture rules for Cursor. |
| `.cursor/skills/` | Project-scoped skills for Cursor. |
| `src/app/` | Next.js App Router routes and layouts (LEXOS UI shell). |

## Completed setup work

- Canonical specs and implementation documents under `docs/`.
- WP-00: project control files and baseline `.gitignore` / `.env.example`.
- WP-01: Next.js 16 + React 19 + TypeScript + Tailwind v4 app scaffold; route shells for dashboard, clients, matters (including matter sub-spine); site header navigation; Supabase **browser** client placeholder (`@supabase/ssr` + `@supabase/supabase-js`); `pnpm run lint` and `pnpm run build` passing.

## Work packets

- **Active work packet:** WP-01 — App Foundation (`ready_for_review` until accepted).
- **Next:** WP-02 — Supabase schema / object spine (per `docs/implementation/05 Work Packet Register.md`; exact title may vary by register revision), then WP-03 Auth, WP-04 Client/Matter.

## Blockers

- **Supabase:** No linked project in runtime; env vars unset until operator copies `.env.example` to `.env.local` (gitignored).
- **Schema / auth / W4:** Intentionally not started (later work packets).

## Environment status

- **Package manager:** `pnpm` (lockfile `pnpm-lock.yaml`).
- Local dev: `pnpm run dev` on port 3000 (default).

## Supabase status

- Dependencies installed (`@supabase/supabase-js`, `@supabase/ssr`). Browser helper returns `null` when public URL/anon key missing. **Service role key must never be used in client bundles** (see `.cursor/rules/04-security-and-privacy-rules.mdc`).

## App status

- **Initialized.** App Router under `src/app/`; static shell only — no business logic, no DB, no auth, no agents.

## Known risks

- **shadcn/ui:** Deferred in WP-01 (Tailwind v4 compatibility); add later if desired.
- **Scaffold path:** `create-next-app` ran in a lowercase temp folder then files were moved to preserve repo root naming and avoid touching `docs/` or `.cursor/`.

## Next recommended step

1. Review and merge WP-01; set register status to `done` or equivalent per team convention.
2. Start **WP-02** on the branch named in the Work Packet Register (`dev/cursor-schema` or `dev/codex-schema` as assigned).
