# LEXOS — Project State

Last updated: 2026-05-12 (WP-11 W5 support matrix; RLS on support_matrix_items; Playwright +4 specs)

## Project

- **Name:** LiNKtrend LEXOS (MVP)
- **Local repo path:** `/Users/linktrend/Projects/LiNKtrend-LEXOS`
- **GitHub repo URL (intended):** `https://github.com/linktrend/LiNKtrend-LEXOS.git`

## Phase and branch

- **Current phase:** Phase 7 — W5 Support Matrix foundation (W6 strategy next)
- **Current branch:** `dev/cursor-w5-support` (WP-11 implementation)

## Documentation structure

| Path | Role |
|------|------|
| `docs/lexos-system-spec/` | Thirteen canonical LEXOS system-specification documents (architectural authority). Read-only for implementation agents unless explicitly instructed otherwise. |
| `docs/implementation/` | MVP implementation control: roadmap, database schema, W4-lite spec, acceptance test plan, agent prompt registry, work packet register. |
| `docs/source-briefings/` | Legacy briefing and historical material only; not authoritative for implementation. |
| `.cursor/rules/` | LEXOS agent and architecture rules for Cursor. |
| `.cursor/skills/` | Project-scoped skills for Cursor. |
| `src/app/` | Next.js App Router routes and layouts (LEXOS UI). |
| `supabase/migrations/` | Postgres migrations (WP-02 … WP-11 **`support_matrix_items` RLS**). |
| `supabase/seed/` | Demo seed data (fake only). |

## Completed setup work

- Canonical specs and implementation documents under `docs/`.
- WP-00 through WP-03 as previously recorded (app shell, live schema, auth, `user_profiles` RLS + trigger).
- **WP-04:** Client list/create/detail; matter list; matter create under client; matter layout + overview with posture/jurisdiction/status/workflow; `workflow_states` initialized on matter create (`W2` / `not_started` / next action); dashboard recent matters; server modules under `src/server/`; `created_by` scoping for non-admin with admin override; audit events `client_created`, `matter_created`, `workflow_state_initialized`; **RLS MVP policies** on `clients`, `matters`, `workflow_states`, `audit_events` (migration `20260512000001_wp04_clients_matters_workflow_audit_rls.sql`, applied to live project via MCP). **Pre-merge security hardening** (migration `20260512100000_wp04_security_profile_lock_and_delete_policies.sql`): `user_profiles` lock + RPC `update_own_user_display_name`; DELETE RLS aligned for rollback. `pnpm run lint` and `pnpm run build` pass.
- **WP-05:** W0-lite intake routes (`/intake`, `/intake/new`, `/intake/[intakeId]`), `src/server/intake/*`, `src/features/intake/*`, handoff prepare + explicit W1 materialize; intake RLS (`20260512120000_wp05_intake_rls.sql`, applied live via MCP **`apply_migration`** `wp05_intake_rls`); SiteHeader **Intake** link.
- **WP-06:** Evidence upload under matter (`/matters/[matterId]/evidence`, detail `/matters/[matterId]/evidence/[evidenceId]`); `src/server/evidence/*`, `src/lib/storage/evidence-originals.ts`, `src/features/evidence/*`; Server Action upload → insert `evidence` → Storage upload (`evidence-originals`, path `client/{client_id}/matter/{matter_id}/evidence/{evidence_id}/original/{filename}`) → patch `original_file_uri`; audit `evidence_uploaded`; signed download URL on detail page; **`original_file_hash` deferred** (null). Migration **`20260513120000_wp06_evidence_storage_and_rls.sql`**: private bucket + `storage.objects` policies + RLS on **`sources`** and **`evidence`** (matter owner / admin). `.env.example`: optional `STORAGE_BUCKET_EVIDENCE_ORIGINALS`. `pnpm run lint` / `pnpm run build` green.
- **WP-07:** W4-lite extraction runner (`src/server/extraction/runner.ts`), classification (`src/lib/extraction/classify.ts`), parser adapters (`src/lib/parser/*`), `runExtractionAction` + Evidence Detail tabs (Markdown / JSON / Quality / WP-08 placeholder); `evidence_extractions` writes + parent `evidence` status updates; audits `evidence_extraction_*`. Migrations **`20260513130000_wp07_evidence_extractions_rls.sql`** (initial RLS) and **`20260514100000_wp07_evidence_extractions_rls_via_evidence.sql`** (policies join parent `evidence` so inserts are not denied when denormalized `client_id` differs from `matters.client_id`). Live project: follow-up migration applied via Supabase MCP **`apply_migration`** `wp07_evidence_extractions_rls_via_evidence` (2026-05-14). `.env.example`: optional `PARSER_API_KEY` / `PARSER_PROVIDER` / `PARSER_API_BASE_URL`. `pnpm lint`, `pnpm build`, `pnpm test:e2e` (with `CI=true` recommended when `.env.local` sets `LEXOS_E2E_SKIP_WEBSERVER=1`; Playwright config clears that flag under CI unless `LEXOS_E2E_ALLOW_SKIP_WEBSERVER_IN_CI=1`).
- **WP-08:** Deterministic extraction QA (`src/lib/extraction/qa/types.ts`, `comparator.ts`; `src/server/extraction/run-qa.ts`): structural checks, merged `quality_flags`, `extraction_quality_status` (`failed` / `qa_flagged` / `human_review_required` / narrow **`accepted`** for `text_document` + `local_utf8` without parser-risk flags); `metadata.last_qa` audit trail on extraction row; parent `evidence` processing/quality updates; audits `evidence_extraction_qa_started` / `evidence_extraction_qa_completed` / `evidence_extraction_qa_failed`; **`runExtractionQaAction`** + QA tab in Evidence Detail. No embeddings, no W5, no LLM/visual comparator. **`CI=true pnpm test:e2e`** green (includes upload → extract → QA).
- **WP-09:** Evidence workspace UI on `dev/cursor-ui-evidence`: `src/components/evidence/*` (status badges, stacked warning banners, W5 assertions placeholder); evidence list columns (processing, extraction, extraction quality from batched current-extraction query, matter quality, review); richer empty state + `#evidence-upload`; detail merges **Quality & QA** tab (preserves `quality-flags-panel`, `qa-status-line`, `qa-flags-panel`, `run-extraction-qa`); original vs derivative copy; `listCurrentExtractionSummariesForMatter` in `src/server/evidence/queries.ts`. **`pnpm lint`**, **`pnpm build`**, **`CI=true pnpm test:e2e`** green.

- **WP-10:** W2 case story + assertions on `dev/cursor-w2-story`: matter routes **`/matters/[matterId]/story`** and **`/matters/[matterId]/assertions`** (+ detail **`/assertions/[assertionId]`**); `src/server/story/*`, `src/server/assertions/*`, `src/server/workflow/mutations.ts` (W2 milestone `next_action`); manual assertion CRUD, archive via `use_status` + `metadata.archived` (no hard delete); audits `case_story_*`, `assertion_*`; deterministic “prefill from story” excerpt only (no LLM); migration **`20260515100000_wp10_case_stories_assertions_rls.sql`** (RLS: matter `created_by` **or** client `created_by` **or** admin). Live project: applied via Supabase MCP **`apply_migration`** `wp10_case_stories_assertions_rls`. **`pnpm lint`**, **`pnpm build`**, **`CI=true pnpm test:e2e`** green (includes **`e2e/wp10-story-assertions.spec.ts`**).

- **WP-11:** W5 Support Matrix on `dev/cursor-w5-support`: route **`/matters/[matterId]/support`**; `src/server/support/*` (queries, mutations, validation, rollup), `src/server/workflow/mutations.ts` (first active link → **`current_workflow` W2→W5** on `workflow_states` + **`matters`**, **`next_action`** `Review support gaps and decide W6 strategy readiness`); assertion **`support_state`** rollup from active links (QA cap; **`truth_state`** never auto-verified); **`contradiction_flag`** set true when any active contradicted link (never auto-cleared false); soft archive via `metadata.archived` (no hard delete); audits `support_matrix_item_*`, `assertion_support_status_updated`; migration **`20260516100000_wp11_support_matrix_items_rls.sql`**. Live project: applied via Supabase MCP **`apply_migration`** `wp11_support_matrix_items_rls`. **`pnpm lint`**, **`pnpm build`**, **`CI=true pnpm test:e2e`** green (includes **`e2e/wp11-support-matrix.spec.ts`**).

## Work packets

- **Active work packet:** WP-11 — W5 Support Matrix Foundation (`ready_for_review` on branch `dev/cursor-w5-support`).
- **Next:** Operator review/merge WP-11; set WP-11 `done` when merged; WP-12 Strategy/Research when scheduled.

## Blockers

- **Credentials:** `.env.local` remains local-only; never commit.
- **WP-06 migration on live DB:** Applied via Supabase MCP **`apply_migration`** `wp06_evidence_storage_and_rls` (2026-05-13). Re-apply from repo file if drift.
- **WP-07 RLS on live DB:** Initial `evidence_extractions` RLS plus follow-up **`wp07_evidence_extractions_rls_via_evidence`** applied via MCP (2026-05-14). Other environments: run migrations from repo in order.
- **RLS — remaining tables:** MVP RLS includes **`sources`**, **`evidence`**, **`evidence_extractions`**, **`case_stories`**, **`assertions`**, and **`support_matrix_items`** (WP-06–11). Other spine tables may still lack policies. **Not production-grade ABAC**; creator/admin matter model only.
- **Matter + workflow + audits:** Not a single DB transaction from the app; evidence upload uses **best-effort rollback** (delete row + remove storage object + skip audit if a step fails after partial progress).
- **`supabase link` / CLI:** PAT and IPv6 issues may persist; migrations can be applied via Supabase MCP when needed.

## Environment status

- **Package manager:** `pnpm` (lockfile `pnpm-lock.yaml`).
- Local dev: `pnpm run dev` on port 3000 (default).
- Optional: `STORAGE_BUCKET_EVIDENCE_ORIGINALS` (defaults to `evidence-originals` in code).

## Supabase status

- **Project:** `iqoelotzvdcjifajfuto` — `ACTIVE_HEALTHY`, region `ap-southeast-1`, Postgres 17.6.
- **Migrations:** Repo includes WP-02 (6) + WP-03 (1) + WP-04 RLS + WP-04 hardening + WP-05 intake RLS + **WP-06 evidence storage + RLS** (`20260513120000_wp06_evidence_storage_and_rls.sql`) + **WP-07 evidence_extractions RLS** (`20260513130000_wp07_evidence_extractions_rls.sql`, `20260514100000_wp07_evidence_extractions_rls_via_evidence.sql`) + **WP-10 case_stories/assertions RLS** (`20260515100000_wp10_case_stories_assertions_rls.sql`) + **WP-11 support_matrix_items RLS** (`20260516100000_wp11_support_matrix_items_rls.sql`). **Live DB:** WP-06 + WP-07 follow-up + WP-10 + **WP-11 support matrix RLS** applied on project `iqoelotzvdcjifajfuto` (see handoff).
- `src/types/database.ts` — unchanged by WP-06 (no new public tables/RPC); regenerate after future DDL.
- Demo seed file unchanged; optional for local testing.

## App status

- Auth + profile (WP-03) unchanged.
- **Clients / matters / intake:** As in WP-04 / WP-05.
- **Evidence (WP-06–09):** Matter **Evidence** tab: list with processing / extraction / current extraction quality / review badges; upload (`#evidence-upload`); detail with status strip, stacked contextual banners, tabs (Original, Markdown, JSON, **Quality & QA**), **Run extraction** and **Run QA** (in Quality & QA), signed original download, **Linked assertions (W5)** link card to Support workspace. Local text extraction for `.txt`/`.md`; optional layout parser; placeholder `metadata_only` when unsupported. Deterministic QA updates extraction quality + flags; narrow machine **`accepted`** for local UTF-8 text path only. No embeddings; no full semantic/visual QA.
- **Story / assertions (WP-10):** Matter **Story** tab: case story editor (markdown), narrative warnings, save + version bump, audits. **Assertions** tab: table (unsupported and archived remain visible; optional hide archived), create + detail/edit + archive; materiality and next support action in `metadata`; links to **Support** workspace for W5 mapping.
- **Support matrix (WP-11):** Matter **Support** tab: create/edit/archive support links (assertion → evidence, optional extraction), per-link status and risk, QA warnings for linked extractions, unsupported/contradicted/material panels, W6 placeholder only; assertion `support_state` rollup; workflow may advance to **W5** after first active link.
- **E2E (Playwright):** `pnpm test:e2e` runs `e2e/wp05-intake.spec.ts`, `e2e/wp06-evidence-upload.spec.ts`, **`e2e/wp10-story-assertions.spec.ts`**, and **`e2e/wp11-support-matrix.spec.ts`**. Requires `LEXOS_E2E_EMAIL` / `LEXOS_E2E_PASSWORD` (or `LEXOS_E2E_PASSWORD_FILE`) in `.env.local` or `.env.e2e.local`; optional `LEXOS_E2E_MATTER_ID`, `LEXOS_E2E_BASE_URL`, `LEXOS_E2E_SKIP_WEBSERVER`, **`LEXOS_E2E_BOOTSTRAP_AUTH=1`** (with `SUPABASE_SERVICE_ROLE_KEY`) to sync the Auth user password and seed a minimal client+matter when missing. **`CI=true`** (e.g. GitHub Actions) clears `LEXOS_E2E_SKIP_WEBSERVER` so Playwright starts `pnpm run dev` unless `LEXOS_E2E_ALLOW_SKIP_WEBSERVER_IN_CI=1`. `next.config.ts`: `allowedDevOrigins: ['127.0.0.1']` for dev when the browser uses 127.0.0.1. **Verification:** `pnpm lint`, `pnpm build`, `pnpm test:e2e` — all green.

## Known risks

- **Denormalized `client_id`:** `evidence.client_id` and `matters.client_id` should match; if they drift, prefer the evidence-join RLS migration (`20260514100000_…`) on all environments.
- Signed URLs are **time-bounded bearer links**; treat as sensitive.
- Storage policy path parsing must stay aligned with `buildOriginalObjectKey` in [`src/lib/storage/evidence-originals.ts`](src/lib/storage/evidence-originals.ts).
- Admin detection in RLS uses **`user_profiles.role = 'admin'`** subquery; **`role` and `status` are not user-updatable via PostgREST** on `user_profiles` (WP-04 hardening). Promote/demote roles via **service-role server paths** only.
- **W4 §11 vs WP-08:** Deterministic structural QA only; no automated semantic/visual comparator against originals yet.
- Embedding dimension `vector(3072)` unchanged; revisit before first embedding write if provider changes.

## Next recommended step

1. Operator review WP-11 on `dev/cursor-w5-support`; merge to `development` when satisfied; set WP-11 to `done` in the work packet register.
2. Other environments: apply migration `20260516100000_wp11_support_matrix_items_rls.sql` if not yet applied (RLS for `support_matrix_items`).
3. Proceed to WP-12 W6 Strategy / W7 Research when scheduled.
