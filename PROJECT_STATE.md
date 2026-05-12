# LEXOS — Project State

Last updated: 2026-05-14 (WP-08 deterministic extraction QA; Playwright upload→extract→QA path)

## Project

- **Name:** LiNKtrend LEXOS (MVP)
- **Local repo path:** `/Users/linktrend/Projects/LiNKtrend-LEXOS`
- **GitHub repo URL (intended):** `https://github.com/linktrend/LiNKtrend-LEXOS.git`

## Phase and branch

- **Current phase:** Phase 5 — W4-lite evidence ingestion (upload, extraction, deterministic QA; W5 next)
- **Current branch:** `dev/cursor-w4-qa` (WP-08 implementation)

## Documentation structure

| Path | Role |
|------|------|
| `docs/lexos-system-spec/` | Thirteen canonical LEXOS system-specification documents (architectural authority). Read-only for implementation agents unless explicitly instructed otherwise. |
| `docs/implementation/` | MVP implementation control: roadmap, database schema, W4-lite spec, acceptance test plan, agent prompt registry, work packet register. |
| `docs/source-briefings/` | Legacy briefing and historical material only; not authoritative for implementation. |
| `.cursor/rules/` | LEXOS agent and architecture rules for Cursor. |
| `.cursor/skills/` | Project-scoped skills for Cursor. |
| `src/app/` | Next.js App Router routes and layouts (LEXOS UI). |
| `supabase/migrations/` | Postgres migrations (WP-02 … WP-06 + **WP-07 evidence_extractions RLS**). |
| `supabase/seed/` | Demo seed data (fake only). |

## Completed setup work

- Canonical specs and implementation documents under `docs/`.
- WP-00 through WP-03 as previously recorded (app shell, live schema, auth, `user_profiles` RLS + trigger).
- **WP-04:** Client list/create/detail; matter list; matter create under client; matter layout + overview with posture/jurisdiction/status/workflow; `workflow_states` initialized on matter create (`W2` / `not_started` / next action); dashboard recent matters; server modules under `src/server/`; `created_by` scoping for non-admin with admin override; audit events `client_created`, `matter_created`, `workflow_state_initialized`; **RLS MVP policies** on `clients`, `matters`, `workflow_states`, `audit_events` (migration `20260512000001_wp04_clients_matters_workflow_audit_rls.sql`, applied to live project via MCP). **Pre-merge security hardening** (migration `20260512100000_wp04_security_profile_lock_and_delete_policies.sql`): `user_profiles` lock + RPC `update_own_user_display_name`; DELETE RLS aligned for rollback. `pnpm run lint` and `pnpm run build` pass.
- **WP-05:** W0-lite intake routes (`/intake`, `/intake/new`, `/intake/[intakeId]`), `src/server/intake/*`, `src/features/intake/*`, handoff prepare + explicit W1 materialize; intake RLS (`20260512120000_wp05_intake_rls.sql`, applied live via MCP **`apply_migration`** `wp05_intake_rls`); SiteHeader **Intake** link.
- **WP-06:** Evidence upload under matter (`/matters/[matterId]/evidence`, detail `/matters/[matterId]/evidence/[evidenceId]`); `src/server/evidence/*`, `src/lib/storage/evidence-originals.ts`, `src/features/evidence/*`; Server Action upload → insert `evidence` → Storage upload (`evidence-originals`, path `client/{client_id}/matter/{matter_id}/evidence/{evidence_id}/original/{filename}`) → patch `original_file_uri`; audit `evidence_uploaded`; signed download URL on detail page; **`original_file_hash` deferred** (null). Migration **`20260513120000_wp06_evidence_storage_and_rls.sql`**: private bucket + `storage.objects` policies + RLS on **`sources`** and **`evidence`** (matter owner / admin). `.env.example`: optional `STORAGE_BUCKET_EVIDENCE_ORIGINALS`. `pnpm run lint` / `pnpm run build` green.
- **WP-07:** W4-lite extraction runner (`src/server/extraction/runner.ts`), classification (`src/lib/extraction/classify.ts`), parser adapters (`src/lib/parser/*`), `runExtractionAction` + Evidence Detail tabs (Markdown / JSON / Quality / WP-08 placeholder); `evidence_extractions` writes + parent `evidence` status updates; audits `evidence_extraction_*`. Migrations **`20260513130000_wp07_evidence_extractions_rls.sql`** (initial RLS) and **`20260514100000_wp07_evidence_extractions_rls_via_evidence.sql`** (policies join parent `evidence` so inserts are not denied when denormalized `client_id` differs from `matters.client_id`). Live project: follow-up migration applied via Supabase MCP **`apply_migration`** `wp07_evidence_extractions_rls_via_evidence` (2026-05-14). `.env.example`: optional `PARSER_API_KEY` / `PARSER_PROVIDER` / `PARSER_API_BASE_URL`. `pnpm lint`, `pnpm build`, `pnpm test:e2e` (with `CI=true` recommended when `.env.local` sets `LEXOS_E2E_SKIP_WEBSERVER=1`; Playwright config clears that flag under CI unless `LEXOS_E2E_ALLOW_SKIP_WEBSERVER_IN_CI=1`).
- **WP-08:** Deterministic extraction QA (`src/lib/extraction/qa/types.ts`, `comparator.ts`; `src/server/extraction/run-qa.ts`): structural checks, merged `quality_flags`, `extraction_quality_status` (`failed` / `qa_flagged` / `human_review_required` / narrow **`accepted`** for `text_document` + `local_utf8` without parser-risk flags); `metadata.last_qa` audit trail on extraction row; parent `evidence` processing/quality updates; audits `evidence_extraction_qa_started` / `evidence_extraction_qa_completed` / `evidence_extraction_qa_failed`; **`runExtractionQaAction`** + QA tab in Evidence Detail. No embeddings, no W5, no LLM/visual comparator. **`CI=true pnpm test:e2e`** green (includes upload → extract → QA).

## Work packets

- **Active work packet:** WP-08 — W4-lite Extraction QA Comparator (`ready_for_review`).
- **Next:** Operator review/merge `dev/cursor-w4-qa`; set WP-08 `done` when merged; W5 Support Matrix (separate packet) per roadmap.

## Blockers

- **Credentials:** `.env.local` remains local-only; never commit.
- **WP-06 migration on live DB:** Applied via Supabase MCP **`apply_migration`** `wp06_evidence_storage_and_rls` (2026-05-13). Re-apply from repo file if drift.
- **WP-07 RLS on live DB:** Initial `evidence_extractions` RLS plus follow-up **`wp07_evidence_extractions_rls_via_evidence`** applied via MCP (2026-05-14). Other environments: run migrations from repo in order.
- **RLS — remaining tables:** MVP RLS includes **`sources`**, **`evidence`**, and **`evidence_extractions`** (WP-06–07). Stories, assertions, and other spine tables may still lack policies. **Not production-grade ABAC**; creator/admin matter model only.
- **Matter + workflow + audits:** Not a single DB transaction from the app; evidence upload uses **best-effort rollback** (delete row + remove storage object + skip audit if a step fails after partial progress).
- **`supabase link` / CLI:** PAT and IPv6 issues may persist; migrations can be applied via Supabase MCP when needed.

## Environment status

- **Package manager:** `pnpm` (lockfile `pnpm-lock.yaml`).
- Local dev: `pnpm run dev` on port 3000 (default).
- Optional: `STORAGE_BUCKET_EVIDENCE_ORIGINALS` (defaults to `evidence-originals` in code).

## Supabase status

- **Project:** `iqoelotzvdcjifajfuto` — `ACTIVE_HEALTHY`, region `ap-southeast-1`, Postgres 17.6.
- **Migrations:** Repo includes WP-02 (6) + WP-03 (1) + WP-04 RLS + WP-04 hardening + WP-05 intake RLS + **WP-06 evidence storage + RLS** (`20260513120000_wp06_evidence_storage_and_rls.sql`) + **WP-07 evidence_extractions RLS** (`20260513130000_wp07_evidence_extractions_rls.sql`, `20260514100000_wp07_evidence_extractions_rls_via_evidence.sql`). **Live DB:** WP-06 + WP-07 follow-up RLS applied on project `iqoelotzvdcjifajfuto` (see handoff for MCP names/dates).
- `src/types/database.ts` — unchanged by WP-06 (no new public tables/RPC); regenerate after future DDL.
- Demo seed file unchanged; optional for local testing.

## App status

- Auth + profile (WP-03) unchanged.
- **Clients / matters / intake:** As in WP-04 / WP-05.
- **Evidence (WP-06–08):** Matter **Evidence** tab: list, upload, detail with tabs (Original, Markdown, JSON, Quality, **QA**), **Run extraction** and **Run QA** server actions, signed original download. Local text extraction for `.txt`/`.md`; optional layout parser; placeholder `metadata_only` when unsupported. Deterministic QA updates extraction quality + flags; narrow machine **`accepted`** for local UTF-8 text path only. No embeddings; no full semantic/visual QA.
- **E2E (Playwright):** `pnpm test:e2e` runs `e2e/wp05-intake.spec.ts` and `e2e/wp06-evidence-upload.spec.ts` (upload + run extraction + **Run QA** assertions). Requires `LEXOS_E2E_EMAIL` / `LEXOS_E2E_PASSWORD` (or `LEXOS_E2E_PASSWORD_FILE`) in `.env.local` or `.env.e2e.local`; optional `LEXOS_E2E_MATTER_ID`, `LEXOS_E2E_BASE_URL`, `LEXOS_E2E_SKIP_WEBSERVER`, **`LEXOS_E2E_BOOTSTRAP_AUTH=1`** (with `SUPABASE_SERVICE_ROLE_KEY`) to sync the Auth user password and seed a minimal client+matter when missing. **`CI=true`** (e.g. GitHub Actions) clears `LEXOS_E2E_SKIP_WEBSERVER` so Playwright starts `pnpm run dev` unless `LEXOS_E2E_ALLOW_SKIP_WEBSERVER_IN_CI=1`. `next.config.ts`: `allowedDevOrigins: ['127.0.0.1']` for dev when the browser uses 127.0.0.1. **Verification:** `pnpm lint`, `pnpm build`, `pnpm test:e2e` — all green.

## Known risks

- **Denormalized `client_id`:** `evidence.client_id` and `matters.client_id` should match; if they drift, prefer the evidence-join RLS migration (`20260514100000_…`) on all environments.
- Signed URLs are **time-bounded bearer links**; treat as sensitive.
- Storage policy path parsing must stay aligned with `buildOriginalObjectKey` in [`src/lib/storage/evidence-originals.ts`](src/lib/storage/evidence-originals.ts).
- Admin detection in RLS uses **`user_profiles.role = 'admin'`** subquery; **`role` and `status` are not user-updatable via PostgREST** on `user_profiles` (WP-04 hardening). Promote/demote roles via **service-role server paths** only.
- **W4 §11 vs WP-08:** Deterministic structural QA only; no automated semantic/visual comparator against originals yet.
- Embedding dimension `vector(3072)` unchanged; revisit before first embedding write if provider changes.

## Next recommended step

1. Manual checklist: upload `.txt` → **Run extraction** → **Run QA** → confirm `evidence_extractions` (`extraction_quality_status`, `quality_flags`, `metadata.last_qa`), parent `evidence`, audits `evidence_extraction_qa_*`.
2. Human review WP-08; merge `dev/cursor-w4-qa` to `development` when satisfied; set WP-08 to `done` in register; proceed to W5 packet when scheduled.
