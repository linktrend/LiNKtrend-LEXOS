# LEXOS — Agent Handoff

Coordination between Cursor (lead IDE), Codex (isolated worker), and the human operator. Update this file after every material task per `.cursor/rules/02-coding-agent-workflow.mdc`.

---

## Latest handoff summary

**WP-05 — W0-lite Intake Foundation** — Implemented on `dev/cursor-w0-intake`. Key deliverables:

- `supabase/migrations/20260512120000_wp05_intake_rls.sql` — RLS + owner/admin policies on **`intake_records`**, **`intake_groups`**, **`client_candidates`**, **`matter_candidates`**, **`intake_tasks`**. **Applied to live project via MCP `apply_migration`** (`wp05_intake_rls`).
- `src/server/intake/queries.ts`, `src/server/intake/mutations.ts` — list/bundle; create intake, candidates, groups; link shared matter; prepare handoff; reject/abandon; `materializeW1FromIntake` (solo or one group + shared matter); group flags-only updates.
- `src/types/intake.ts` — status allowlists, frozen intake helper.
- `src/app/intake/*` — list, new, detail + Server Actions (`prepareHandoffFormAction`, `materializeW1FormAction`, lifecycle form actions for Next form typing).
- `src/features/intake/*` — detail UI, badges, forms.
- `src/server/clients/mutations.ts`, `src/server/matters/mutations.ts` — optional `created_from_intake_id` / `created_from_matter_candidate_id` for handoff provenance; audit passes `intake_id` when set.
- `src/components/layout/site-header.tsx` — **Intake** nav → `/intake`.
- Audit event types used in WP-05 flows: `intake_created`, `client_candidate_created`, `matter_candidate_created`, `intake_group_created`, `intake_rejected`, `intake_abandoned`, `intake_accepted`, `intake_handoff_prepared` (plus existing client/matter events on materialize).

Verification: `pnpm run lint` — clean. `pnpm run build` — clean. **Manual browser:** not re-run in this session after final fixes; operator should run the checklist in the WP-05 plan before merge.

**RLS status:** WP-04 tables + **five W0 intake tables** now have MVP policies; other legal-domain tables unchanged.

Next: human review WP-05; merge to `development` when satisfied; set WP-05 to `done` in register.

---

## Handoff log

| Date (UTC) | Agent / tool | Work packet | Summary |
|------------|--------------|---------------|---------|
| 2026-05-12 | Cursor | WP-05 | W0-lite intake UI (`/intake`), server intake module, handoff + W1 materialize with provenance FKs, intake RLS migration applied via MCP `apply_migration`; SiteHeader Intake link; lint+build green; PROJECT_STATE + register + handoff updated; WP-05 → `ready_for_review`. |
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
