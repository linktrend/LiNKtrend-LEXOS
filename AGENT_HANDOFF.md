# LEXOS — Agent Handoff

Coordination between Cursor (lead IDE), Codex (isolated worker), and the human operator. Update this file after every material task per `.cursor/rules/02-coding-agent-workflow.mdc`.

---

## Latest handoff summary

**WP-04 — Client / Matter / Workflow Foundation** — Implemented on `dev/cursor-client-matter`. Key deliverables:

- `src/server/auth/context.ts` — `getAuthContext()`, `assertCanMutate()` (`read_only` cannot mutate).
- `src/server/audit/log.ts` — `insertAuditEvent()` for `audit_events` (RLS allows `actor_id = auth.uid()`).
- `src/server/clients/*`, `src/server/matters/*` — list/get/create with **non-admin scoped by `created_by`**; admin sees all; matter create initializes `workflow_states` (`current_workflow` **W2**, `workflow_status` **not_started**, `next_action` **Create or review Case Story**); **best-effort rollback** if workflow or audit insert fails after matter insert.
- `src/types/domain.ts` — posture constants; canonical DB value **`defence`** (UI label “Defence”).
- Routes: `/clients`, `/clients/new`, `/clients/[clientId]`, `/clients/[clientId]/matters/new`, `/matters`, `/matters/[matterId]/overview` (+ matter layout nav shells); dashboard lists recent matters via `listMattersForDashboard`.
- `supabase/migrations/20260512000001_wp04_clients_matters_workflow_audit_rls.sql` — RLS + policies on **`clients`**, **`matters`**, **`workflow_states`**, **`audit_events`** (owner + admin via `user_profiles.role = 'admin'`). **Applied to live project via MCP.**
- **Pre-merge security hardening** — `supabase/migrations/20260512100000_wp04_security_profile_lock_and_delete_policies.sql`: blocks **`user_profiles` self-promotion** (drop `users_update_own_profile`, revoke table UPDATE from `authenticated`/`anon`, BEFORE UPDATE trigger + `update_own_user_display_name` RPC); **DELETE** policies on `clients` / `matters` / `workflow_states` for rollback parity. Live DDL applied via MCP **`execute_sql`** (three statements). `handle_new_auth_user()` unchanged.

**Audit event types (verified on demo flow):** `client_created`, `matter_created`, `workflow_state_initialized`.

Verification: `pnpm run lint` — clean. `pnpm run build` — clean. Manual browser: create client → create matter → `/matters/.../overview` shows **Posture Defence · Status active · Current W2 · Flow not_started**; SQL confirms workflow row and three audit types for the test client/matter.

**RLS status:** `user_profiles` (WP-03) + **four WP-04 tables** above now have policies; **`user_profiles` role/status are no longer client-updatable** (service role + RPC path only). **Remaining legal-domain tables** (evidence, stories, assertions, etc.) still **without** RLS — not production-grade for those objects.

**Limitation:** Matter + workflow + audits are **not** one atomic DB transaction from the app; rollback is best-effort (documented in `PROJECT_STATE.md`).

Next packet: **WP-05 — W0-lite Intake Foundation** on branch `dev/cursor-w0-intake` (per register).

---

## Handoff log

| Date (UTC) | Agent / tool | Work packet | Summary |
|------------|--------------|---------------|---------|
| 2026-05-12 | Cursor | WP-04 hardening | `20260512100000_wp04_security_profile_lock_and_delete_policies.sql`: user_profiles self-update locked (trigger + revoke + RPC); DELETE RLS clients/matters/workflow_states; live DDL via MCP `execute_sql` (3 parts); lint+build green; PROJECT_STATE + handoff updated. |
| 2026-05-12 | Cursor | WP-04 | Client/matter CRUD UI + server modules; workflow init on matter create; audit events (three types); RLS migration `20260512000001` on clients/matters/workflow_states/audit_events (MCP applied); lint+build green; browser + SQL verification; WP-04 → `ready_for_review`. |
| 2026-05-12 | Cursor | WP-03 follow-up | Test auth user repaired for GoTrue: `instance_id` zero-UUID, `auth.identities` email row, NULL token columns coalesced to empty string; browser verified login → `/dashboard` (Signed-in User). |
| 2026-05-11 | Cursor | WP-03 | Auth foundation: server/admin clients, proxy route protection, login page (Server Action), logout route, user_profiles RLS + trigger (migration 007 applied via MCP), dashboard profile display; lint+build green; WP-03 → `ready_for_review`. |
| 2026-05-11 | Cursor | WP-02 (push) | 6 migrations applied to live project `iqoelotzvdcjifajfuto` via MCP; 26 tables confirmed; full types auto-generated; lint+build green; WP-02 → `ready_for_review` (live). |
| 2026-05-11 | Cursor | WP-02 | 26-table Supabase schema; 6 migrations; vector(3072) Gemini; RLS deferred; demo seed (no real data); type stub; lint+build green; WP-02 → `ready_for_review`. |
| 2026-05-11 | Cursor | WP-01 | Next.js + TS + Tailwind app shell; matter/client routes; Supabase placeholder; README/.gitignore merged; lint+build green; WP-01 → `ready_for_review`. |
| 2026-05-11 | Cursor | WP-00 | Established project state, handoff structure, README, env template, gitignore; WP-00 → `ready_for_review`. |

(Add new rows above the template section or continue the table.)

---

## Reusable handoff template — Cursor

Copy and fill before starting work:

```markdown
## Handoff — Cursor

- **Date:**
- **Work packet:** (ID and title from `docs/implementation/05 Work Packet Register.md`)
- **Branch:** `dev/cursor-<task>` (must match packet)
- **Allowed paths:** (paste from packet)
- **Prohibited paths:** (paste from packet)
- **Sources read:** PROJECT_STATE.md, AGENT_HANDOFF.md, roadmap, packet register, packet-specific implementation doc(s)
- **Acceptance criteria:** (from packet)
- **Verification run:** (lint / typecheck / tests / manual checklist — or explicit “none yet”)
- **Outcome:** (done / blocked / partial)
- **Updates made:** PROJECT_STATE.md (Y/N), AGENT_HANDOFF.md (Y/N), other paths
```

---

## Reusable handoff template — Codex

Copy and fill before starting work:

```markdown
## Handoff — Codex

- **Date:**
- **Work packet:** (single packet ID — Codex is bounded to one packet)
- **Branch:** `dev/codex-<task>` or as specified in packet (must match packet)
- **Allowed paths:** (paste exactly from packet; do not expand scope)
- **Prohibited paths:** (paste exactly; includes `docs/lexos-system-spec/` unless human explicitly instructs)
- **Sources read:** (packet “Source Documents to Read” list)
- **Acceptance criteria:** (from packet)
- **Tests / verification:** (per packet; attach results or manual report)
- **Outcome:** (done / blocked — stop and report if packet requires prohibited files)
- **Handoff:** Append row to Handoff log; update PROJECT_STATE if phase/blockers/next step changed
```

---

## Quick pointers

- Work packets and status: `docs/implementation/05 Work Packet Register.md`
- MVP sequence and doctrine: `docs/implementation/00 MVP Implementation Roadmap.md`
- Canonical architecture (read-only for agents): `docs/lexos-system-spec/`
