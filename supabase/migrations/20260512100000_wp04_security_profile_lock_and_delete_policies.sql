-- =============================================================================
-- WP-04 security hardening (pre-merge): user_profiles immutability + DELETE RLS
--
-- 1) user_profiles: authenticated users must NOT self-promote role/status or
--    rewrite id/email. WP-04 admin RLS policies on clients/matters/workflow_states
--    and audit_events trust user_profiles.role = 'admin'; that trust requires
--    role/status to remain server/service-role controlled.
--
-- 2) clients / matters / workflow_states: DELETE policies aligned with SELECT so
--    owner (created_by / matter ownership) and admin can remove rows; matches
--    app rollback paths (best-effort delete after partial inserts).
--
-- handle_new_auth_user() trigger is NOT modified here (profile auto-create preserved).
-- =============================================================================

-- ---------------------------------------------------------------------------
-- A) BEFORE UPDATE guard: block privilege-sensitive column changes for JWT users
--     Service role (admin client, migrations) bypasses guard entirely.
-- ---------------------------------------------------------------------------
create or replace function public.enforce_user_profiles_mutability()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  -- Server / admin Supabase client: allow full row updates (role changes, etc.).
  if auth.role() = 'service_role' then
    return new;
  end if;

  if new.id is distinct from old.id then
    raise exception 'user_profiles: id may not be changed'
      using errcode = 'check_violation';
  end if;

  if new.role is distinct from old.role then
    raise exception 'user_profiles: role is server/admin-controlled; self-promotion is not allowed'
      using errcode = 'check_violation';
  end if;

  if new.status is distinct from old.status then
    raise exception 'user_profiles: status is server/admin-controlled'
      using errcode = 'check_violation';
  end if;

  if new.email is distinct from old.email then
    raise exception 'user_profiles: email may not be changed via profile self-update'
      using errcode = 'check_violation';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_user_profiles_mutability on public.user_profiles;
create trigger trg_user_profiles_mutability
  before update on public.user_profiles
  for each row
  execute function public.enforce_user_profiles_mutability();

-- ---------------------------------------------------------------------------
-- B) SECURITY DEFINER RPC: safe self-service display_name only (invoker JWT).
--     Direct UPDATE on user_profiles is revoked from authenticated/anon below.
-- ---------------------------------------------------------------------------
create or replace function public.update_own_user_display_name(p_display_name text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    raise exception 'Not authenticated'
      using errcode = 'check_violation';
  end if;

  update public.user_profiles
  set
    display_name = nullif(trim(p_display_name), ''),
    updated_at = now()
  where id = v_uid;

  if not found then
    raise exception 'user_profiles row not found'
      using errcode = 'check_violation';
  end if;
end;
$$;

revoke all on function public.update_own_user_display_name(text) from public;
grant execute on function public.update_own_user_display_name(text) to authenticated;

-- Remove broad table UPDATE from browser/session JWT roles; service_role keeps ALL.
revoke update on table public.user_profiles from authenticated;
revoke update on table public.user_profiles from anon;

drop policy if exists "users_update_own_profile" on public.user_profiles;

-- ---------------------------------------------------------------------------
-- C) DELETE RLS (clients, matters, workflow_states): owner + admin; no audit_events DELETE
-- ---------------------------------------------------------------------------
drop policy if exists "clients_delete_access" on public.clients;
create policy "clients_delete_access" on public.clients
  for delete to authenticated
  using (
    created_by = auth.uid()
    or exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "matters_delete_access" on public.matters;
create policy "matters_delete_access" on public.matters
  for delete to authenticated
  using (
    created_by = auth.uid()
    or exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "workflow_states_delete_access" on public.workflow_states;
create policy "workflow_states_delete_access" on public.workflow_states
  for delete to authenticated
  using (
    exists (
      select 1 from public.matters m
      where m.id = matter_id
        and (
          m.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

-- Live project: DDL applied 2026-05-12 via Supabase MCP execute_sql (three statements).
-- Fresh environments: apply this file with supabase db push / normal migration tooling.
