# LEXOS — Supabase migration history notes

**Purpose:** Document how **repo migration files** under `supabase/migrations/` relate to **recorded migration history** on the hosted Supabase project, including entries created via MCP `apply_migration` (custom names / timestamps).

**Last checked:** 2026-05-13 (UTC, operator workspace)

**Supabase project (identifier only, no secrets):** `iqoelotzvdcjifajfuto` — host `https://iqoelotzvdcjifajfuto.supabase.co`

---

## Critical warning

**Do not re-run or duplicate DDL** from an existing migration file just to “fix” a name mismatch in `supabase_migrations.schema_migrations`. That can break idempotency, collide with objects already created, or fork environments. If history and repo filenames diverge, **document the drift** and apply **new forward-only migrations** for any *new* DDL.

---

## Repo migration files (authoritative for new environments)

Apply in filename (timestamp) order:

| Filename |
|----------|
| `20260511000001_extensions_and_enums.sql` |
| `20260511000002_identity_intake_clients_matters.sql` |
| `20260511000003_evidence_and_extractions.sql` |
| `20260511000004_assertions_support_risks.sql` |
| `20260511000005_artifacts_workflows_audit.sql` |
| `20260511000006_embeddings_tool_model_logs.sql` |
| `20260511000007_wp03_auth_rls_trigger.sql` |
| `20260512000001_wp04_clients_matters_workflow_audit_rls.sql` |
| `20260512100000_wp04_security_profile_lock_and_delete_policies.sql` |
| `20260512120000_wp05_intake_rls.sql` |
| `20260513120000_wp06_evidence_storage_and_rls.sql` |
| `20260513130000_wp07_evidence_extractions_rls.sql` |
| `20260514100000_wp07_evidence_extractions_rls_via_evidence.sql` |
| `20260515100000_wp10_case_stories_assertions_rls.sql` |
| `20260516100000_wp11_support_matrix_items_rls.sql` |
| `20260517100000_wp12_strategy_memos_rls.sql` |
| `20260518100000_wp13_research_memos_rls.sql` |
| `20260519100000_wp14_argument_drafts_rls.sql` |
| `20260520100000_wp15_adversarial_critiques_rls.sql` |
| `20260520120000_wp16_output_artifacts_rls.sql` |
| `20260520120100_wp16_risks_rls.sql` |

---

## Live Supabase migration history (MCP `list_migrations` snapshot, 2026-05-13)

Recorded `name` values (and Supabase-assigned `version` timestamps) are **not always identical** to repo filenames. Typical causes: MCP `apply_migration` using a short snake_case `name`, or iterative hotfixes during debugging.

**Snapshot after pre-WP-16 cleanup apply** (same project):

| version (Supabase) | name |
|--------------------|------|
| 20260511122920 | `20260511000001_extensions_and_enums` |
| 20260511123006 | `20260511000002_identity_intake_clients_matters` |
| 20260511123037 | `20260511000003_evidence_and_extractions` |
| 20260511123109 | `20260511000004_assertions_support_risks` |
| 20260511123153 | `20260511000005_artifacts_workflows_audit` |
| 20260511123224 | `20260511000006_embeddings_tool_model_logs` |
| 20260511130230 | `20260511000007_wp03_auth_rls_trigger` |
| 20260512002812 | `wp04_clients_matters_workflow_audit_rls` |
| 20260512003556 | `wp04_security_profile_lock_and_delete_policies` |
| 20260512005140 | `wp05_intake_rls` |
| 20260512011319 | `wp06_evidence_storage_and_rls` |
| 20260512030545 | `wp07_evidence_extractions_rls_via_evidence` |
| 20260513003656 | `wp10_case_stories_assertions_rls` |
| 20260513005546 | `wp11_support_matrix_items_rls` |
| 20260513011647 | `wp12_strategy_memos_insert_policy_fix` |
| 20260513011911 | `wp12_strategy_memos_insert_in_subquery` |
| 20260513012321 | `wp12_strategy_memos_insert_disjunct` |
| 20260513013734 | `wp13_research_memos_rls` |
| 20260513014902 | `wp12_strategy_memos_rls_repo_file` |
| 20260513021855 | `wp14_argument_drafts_rls` |
| 20260513032713 | `wp15_adversarial_critiques_rls` |
| 20260513035530 | `wp16_output_artifacts_rls` |
| 20260513035640 | `wp16_risks_rls` |

**Notes on the live list:**

- `wp04_*` / `wp05_*` / … short names vs repo timestamp prefixes — **harmless naming drift**; content matches repo migrations where paired.
- `wp07_evidence_extractions_rls_via_evidence` only — repo also has `20260513130000_wp07_evidence_extractions_rls.sql`; live may never have recorded the first file as its own row. **Do not re-apply** the first file if policies already match the join-based design.
- **Live-only** `wp12_strategy_memos_*` hotfix rows — not separate files in repo; see classification table below.
- **`wp16_output_artifacts_rls`** / **`wp16_risks_rls`** — applied via MCP `apply_migration` using the same SQL as repo files `20260520120000_wp16_output_artifacts_rls.sql` and `20260520120100_wp16_risks_rls.sql` (MCP-assigned `version` timestamps differ from filename timestamps; **expected**).

---

## Known differences and classification

| Topic | Assessment |
|-------|----------------|
| Repo `20260513130000_wp07_evidence_extractions_rls.sql` vs live row only `wp07_evidence_extractions_rls_via_evidence` | **Harmless drift** if `evidence_extractions` RLS behaves as designed (verify with policy inspection, not duplicate DDL). |
| Extra live-only `wp12_*` MCP migrations | **Documented / unresolved for strict file↔history parity**; live DB is source of applied state; repo WP-12 file remains baseline for new environments. **Action:** prefer future DDL in new timestamped repo files; avoid ad-hoc MCP-only hotfixes without a matching repo migration when possible. |
| WP-16 pre-RLS `output_artifacts` / `risks` | **Repo files** `20260520120000_wp16_output_artifacts_rls.sql`, `20260520120100_wp16_risks_rls.sql`; **live `iqoelotzvdcjifajfuto`** recorded as `wp16_output_artifacts_rls` + `wp16_risks_rls` via MCP `apply_migration` (2026-05-13). Other projects: run repo files once. |

---

## Recommended future practice

1. **Prefer** adding a new file under `supabase/migrations/` with a new timestamp for any DDL change.
2. **Apply** to remote using the same SQL from that file (Supabase CLI `db push` / `migration up`, or MCP `apply_migration` with a **`name` aligned to the repo stem** where possible to reduce confusion).
3. **Avoid** iterative MCP-only migrations without committing an equivalent repo file; if unavoidable, append a row to this note and consider consolidating lessons into the next numbered repo migration (without re-running old DDL).

---

## Related project docs

- `PROJECT_STATE.md` — current phase, branch, and Supabase summary.
- `docs/implementation/05 Work Packet Register.md` — work packet scope (does not replace this technical migration log).
