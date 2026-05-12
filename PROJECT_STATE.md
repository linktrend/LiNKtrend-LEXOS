# LEXOS — Project State

Last updated: 2026-05-12 (Playwright E2E WP-05/WP-06 green; `use server` upload action export fix; optional E2E bootstrap)

## Project

- **Name:** LiNKtrend LEXOS (MVP)
- **Local repo path:** `/Users/linktrend/Projects/LiNKtrend-LEXOS`
- **GitHub repo URL (intended):** `https://github.com/linktrend/LiNKtrend-LEXOS.git`

## Phase and branch

- **Current phase:** Phase 5 — W4-lite evidence ingestion (upload foundation; extraction in WP-07)
- **Current branch:** `dev/cursor-w4-upload` (WP-06 implementation)

## Documentation structure

| Path | Role |
|------|------|
| `docs/lexos-system-spec/` | Thirteen canonical LEXOS system-specification documents (architectural authority). Read-only for implementation agents unless explicitly instructed otherwise. |
| `docs/implementation/` | MVP implementation control: roadmap, database schema, W4-lite spec, acceptance test plan, agent prompt registry, work packet register. |
| `docs/source-briefings/` | Legacy briefing and historical material only; not authoritative for implementation. |
| `.cursor/rules/` | LEXOS agent and architecture rules for Cursor. |
| `.cursor/skills/` | Project-scoped skills for Cursor. |
| `src/app/` | Next.js App Router routes and layouts (LEXOS UI). |
| `supabase/migrations/` | Postgres migrations (WP-02 … WP-05 + **WP-06 evidence storage + RLS**). |
| `supabase/seed/` | Demo seed data (fake only). |

## Completed setup work

- Canonical specs and implementation documents under `docs/`.
- WP-00 through WP-03 as previously recorded (app shell, live schema, auth, `user_profiles` RLS + trigger).
- **WP-04:** Client list/create/detail; matter list; matter create under client; matter layout + overview with posture/jurisdiction/status/workflow; `workflow_states` initialized on matter create (`W2` / `not_started` / next action); dashboard recent matters; server modules under `src/server/`; `created_by` scoping for non-admin with admin override; audit events `client_created`, `matter_created`, `workflow_state_initialized`; **RLS MVP policies** on `clients`, `matters`, `workflow_states`, `audit_events` (migration `20260512000001_wp04_clients_matters_workflow_audit_rls.sql`, applied to live project via MCP). **Pre-merge security hardening** (migration `20260512100000_wp04_security_profile_lock_and_delete_policies.sql`): `user_profiles` lock + RPC `update_own_user_display_name`; DELETE RLS aligned for rollback. `pnpm run lint` and `pnpm run build` pass.
- **WP-05:** W0-lite intake routes (`/intake`, `/intake/new`, `/intake/[intakeId]`), `src/server/intake/*`, `src/features/intake/*`, handoff prepare + explicit W1 materialize; intake RLS (`20260512120000_wp05_intake_rls.sql`, applied live via MCP **`apply_migration`** `wp05_intake_rls`); SiteHeader **Intake** link.
- **WP-06:** Evidence upload under matter (`/matters/[matterId]/evidence`, detail `/matters/[matterId]/evidence/[evidenceId]`); `src/server/evidence/*`, `src/lib/storage/evidence-originals.ts`, `src/features/evidence/*`; Server Action upload → insert `evidence` → Storage upload (`evidence-originals`, path `client/{client_id}/matter/{matter_id}/evidence/{evidence_id}/original/{filename}`) → patch `original_file_uri`; audit `evidence_uploaded`; signed download URL on detail page; **`original_file_hash` deferred** (null). Migration **`20260513120000_wp06_evidence_storage_and_rls.sql`**: private bucket + `storage.objects` policies + RLS on **`sources`** and **`evidence`** (matter owner / admin). `.env.example`: optional `STORAGE_BUCKET_EVIDENCE_ORIGINALS`. `pnpm run lint` / `pnpm run build` green.

## Work packets

- **Active work packet:** WP-06 — W4-lite Evidence Upload Foundation (`ready_for_review`).
- **Next:** Operator applies WP-06 migration to live Supabase (if not yet applied), runs manual upload checklist, merges when satisfied; WP-07 extraction next.

## Blockers

- **Credentials:** `.env.local` remains local-only; never commit.
- **WP-06 migration on live DB:** Applied via Supabase MCP **`apply_migration`** `wp06_evidence_storage_and_rls` (2026-05-13). Re-apply from repo file if drift.
- **RLS — remaining tables:** MVP RLS now includes **`sources`** and **`evidence`** (WP-06). **`evidence_extractions`**, stories, assertions, and other legal-domain tables** still have **no** row policies unless listed above. **Not production-grade ABAC**; creator/admin matter model only.
- **Matter + workflow + audits:** Not a single DB transaction from the app; evidence upload uses **best-effort rollback** (delete row + remove storage object + skip audit if a step fails after partial progress).
- **`supabase link` / CLI:** PAT and IPv6 issues may persist; migrations can be applied via Supabase MCP when needed.

## Environment status

- **Package manager:** `pnpm` (lockfile `pnpm-lock.yaml`).
- Local dev: `pnpm run dev` on port 3000 (default).
- Optional: `STORAGE_BUCKET_EVIDENCE_ORIGINALS` (defaults to `evidence-originals` in code).

## Supabase status

- **Project:** `iqoelotzvdcjifajfuto` — `ACTIVE_HEALTHY`, region `ap-southeast-1`, Postgres 17.6.
- **Migrations:** Repo includes WP-02 (6) + WP-03 (1) + WP-04 RLS + WP-04 hardening + WP-05 intake RLS + **WP-06 evidence storage + RLS** (`20260513120000_wp06_evidence_storage_and_rls.sql`). **Live DB:** WP-06 applied via Supabase MCP **`apply_migration`** (`wp06_evidence_storage_and_rls`) on project `iqoelotzvdcjifajfuto` (2026-05-13).
- `src/types/database.ts` — unchanged by WP-06 (no new public tables/RPC); regenerate after future DDL.
- Demo seed file unchanged; optional for local testing.

## App status

- Auth + profile (WP-03) unchanged.
- **Clients / matters / intake:** As in WP-04 / WP-05.
- **Evidence (WP-06):** Matter **Evidence** tab is functional UI: list, upload, detail shell, processing badge (`uploaded`), signed original download, WP-07 extraction placeholder. No extraction pipeline, OCR, or embeddings.
- **E2E (Playwright):** `pnpm test:e2e` runs `e2e/wp05-intake.spec.ts` and `e2e/wp06-evidence-upload.spec.ts` (evidence uses `setInputFiles`). Requires `LEXOS_E2E_EMAIL` / `LEXOS_E2E_PASSWORD` (or `LEXOS_E2E_PASSWORD_FILE`) in `.env.local` or `.env.e2e.local`; optional `LEXOS_E2E_MATTER_ID`, `LEXOS_E2E_BASE_URL`, `LEXOS_E2E_SKIP_WEBSERVER`, **`LEXOS_E2E_BOOTSTRAP_AUTH=1`** (with `SUPABASE_SERVICE_ROLE_KEY`) to sync the Auth user password and seed a minimal client+matter when missing. `next.config.ts`: `allowedDevOrigins: ['127.0.0.1']` for dev when the browser uses 127.0.0.1. **Verification:** `pnpm lint`, `pnpm build`, `pnpm test:e2e` — all green.

## Known risks

- **`evidence_extractions`** RLS not added in WP-06 — table still exposed per global grants until a follow-up packet; no app writes yet.
- Signed URLs are **time-bounded bearer links**; treat as sensitive.
- Storage policy path parsing must stay aligned with `buildOriginalObjectKey` in [`src/lib/storage/evidence-originals.ts`](src/lib/storage/evidence-originals.ts).
- Admin detection in RLS uses **`user_profiles.role = 'admin'`** subquery; **`role` and `status` are not user-updatable via PostgREST** on `user_profiles` (WP-04 hardening). Promote/demote roles via **service-role server paths** only.
- Embedding dimension `vector(3072)` unchanged; revisit before first embedding write if provider changes.

## Next recommended step

1. Manual checklist: login → matter → Evidence → upload fake `.txt` → verify Storage object, `evidence` row, `audit_events` (`evidence_uploaded`), second upload does not overwrite first path.
2. Human review WP-06; merge to `development` when satisfied; set WP-06 to `done` in register; start WP-07.
