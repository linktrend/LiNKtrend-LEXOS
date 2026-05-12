-- WP-04: RLS policies for clients, matters, workflow_states, audit_events
-- Authenticated users may access rows they created; admins may access all (via user_profiles.role).
-- This is MVP scaffolding — tighten ABAC by matter membership in a later packet.

-- ---------------------------------------------------------------------------
-- clients
-- ---------------------------------------------------------------------------
alter table public.clients enable row level security;

drop policy if exists "clients_select_access" on public.clients;
create policy "clients_select_access" on public.clients
  for select to authenticated
  using (
    created_by = auth.uid()
    or exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "clients_insert_own" on public.clients;
create policy "clients_insert_own" on public.clients
  for insert to authenticated
  with check (created_by = auth.uid());

drop policy if exists "clients_insert_admin" on public.clients;
create policy "clients_insert_admin" on public.clients
  for insert to authenticated
  with check (
    exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "clients_update_access" on public.clients;
create policy "clients_update_access" on public.clients
  for update to authenticated
  using (
    created_by = auth.uid()
    or exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    created_by = auth.uid()
    or exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ---------------------------------------------------------------------------
-- matters
-- ---------------------------------------------------------------------------
alter table public.matters enable row level security;

drop policy if exists "matters_select_access" on public.matters;
create policy "matters_select_access" on public.matters
  for select to authenticated
  using (
    created_by = auth.uid()
    or exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "matters_insert_own" on public.matters;
create policy "matters_insert_own" on public.matters
  for insert to authenticated
  with check (created_by = auth.uid());

drop policy if exists "matters_insert_admin" on public.matters;
create policy "matters_insert_admin" on public.matters
  for insert to authenticated
  with check (
    exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "matters_update_access" on public.matters;
create policy "matters_update_access" on public.matters
  for update to authenticated
  using (
    created_by = auth.uid()
    or exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    created_by = auth.uid()
    or exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ---------------------------------------------------------------------------
-- workflow_states
-- ---------------------------------------------------------------------------
alter table public.workflow_states enable row level security;

drop policy if exists "workflow_states_select_access" on public.workflow_states;
create policy "workflow_states_select_access" on public.workflow_states
  for select to authenticated
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

drop policy if exists "workflow_states_insert_access" on public.workflow_states;
create policy "workflow_states_insert_access" on public.workflow_states
  for insert to authenticated
  with check (
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

drop policy if exists "workflow_states_update_access" on public.workflow_states;
create policy "workflow_states_update_access" on public.workflow_states
  for update to authenticated
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
  )
  with check (
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

-- ---------------------------------------------------------------------------
-- audit_events (insert + read own / admin)
-- ---------------------------------------------------------------------------
alter table public.audit_events enable row level security;

drop policy if exists "audit_events_select_access" on public.audit_events;
create policy "audit_events_select_access" on public.audit_events
  for select to authenticated
  using (
    actor_id = auth.uid()
    or exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "audit_events_insert_own" on public.audit_events;
create policy "audit_events_insert_own" on public.audit_events
  for insert to authenticated
  with check (actor_id = auth.uid());

drop policy if exists "audit_events_insert_admin" on public.audit_events;
create policy "audit_events_insert_admin" on public.audit_events
  for insert to authenticated
  with check (
    exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
