# LEXOS — Agent Handoff

Coordination between Cursor (lead IDE), Codex (isolated worker), and the human operator. Update this file after every material task per `.cursor/rules/02-coding-agent-workflow.mdc`.

---

## Latest handoff summary

**WP-03 — Auth and User Profile Foundation** — Auth flow implemented on `dev/cursor-auth`. Key deliverables:

- `src/lib/supabase/server.ts` — `@supabase/ssr` cookie-based server client (Server Components, Server Actions, Route Handlers).
- `src/lib/supabase/admin.ts` — service-role admin client (server-only; `SUPABASE_SERVICE_ROLE_KEY`; `persistSession: false`).
- `src/lib/supabase/client.ts` — updated with `Database` type generic.
- `src/types/auth.ts` — `UserRole`, `UserStatus`, `UserProfile` TypeScript types.
- `src/proxy.ts` — Next.js 16 proxy (route protection + session refresh); unauthenticated requests redirected to `/login`; already-authenticated `/login` redirected to `/dashboard`.
- `src/app/login/page.tsx`, `LoginForm.tsx`, `actions.ts` — email+password login via `signInWithPassword` Server Action (`useActionState`).
- `src/app/logout/route.ts` — POST Route Handler; `signOut` + redirect `/login`.
- `src/app/dashboard/page.tsx` — fetches `user_profiles` row (name + role); admin-client fallback profile creation with `audit_events` log; logout button.
- `supabase/migrations/20260511000007_wp03_auth_rls_trigger.sql` — `user_profiles` RLS enabled; `users_read_own_profile` + `users_update_own_profile` policies; `handle_new_auth_user` `SECURITY DEFINER` trigger on `auth.users`. **Applied to live project via MCP.**

Verification: `pnpm run lint` — clean. `pnpm run build` — clean (TypeScript pass, no warnings). Migration 007 confirmed applied via MCP `{"success":true}`.

**Pending operator action before manual testing:** Create `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (from Supabase dashboard → API Settings). Run manual auth verification checklist below.

**Manual auth verification checklist:**
- [ ] Visit `http://localhost:3000/dashboard` → redirected to `/login`
- [ ] Visit `http://localhost:3000/matters` → redirected to `/login`
- [ ] Login with valid test credentials → redirected to `/dashboard`
- [ ] Dashboard shows `display_name` and `role` from `user_profiles`
- [ ] Logout → redirected to `/login`
- [ ] Visit `/dashboard` after logout → redirected to `/login`
- [ ] Visit `/login` when already authenticated → redirected to `/dashboard`

**RLS spot-check (Supabase dashboard SQL editor):**
```sql
select tablename, rowsecurity from pg_tables where schemaname = 'public' order by tablename;
select policyname, cmd, roles, qual from pg_policies where schemaname = 'public' and tablename = 'user_profiles';
```

**Known blocker:** RLS is enabled only on `user_profiles`. All 25 other tables remain open to authenticated queries. Must be resolved in WP-04+ before production use.

Next packet: **WP-04 — Client/Matter/Intake Core** on branch `dev/cursor-intake`.

---

## Handoff log

| Date (UTC) | Agent / tool | Work packet | Summary |
|------------|--------------|---------------|---------|
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
