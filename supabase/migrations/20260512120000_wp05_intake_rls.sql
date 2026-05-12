-- WP-05: RLS for W0 intake tables (owner via intake_records.created_by + admin).
-- MVP scaffolding — not full ABAC. Pattern aligned with WP-04 clients/matters policies.

-- ---------------------------------------------------------------------------
-- intake_records
-- ---------------------------------------------------------------------------
alter table public.intake_records enable row level security;

drop policy if exists "intake_records_select_access" on public.intake_records;
create policy "intake_records_select_access" on public.intake_records
  for select to authenticated
  using (
    created_by = auth.uid()
    or exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "intake_records_insert_own" on public.intake_records;
create policy "intake_records_insert_own" on public.intake_records
  for insert to authenticated
  with check (created_by = auth.uid());

drop policy if exists "intake_records_insert_admin" on public.intake_records;
create policy "intake_records_insert_admin" on public.intake_records
  for insert to authenticated
  with check (
    exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "intake_records_update_access" on public.intake_records;
create policy "intake_records_update_access" on public.intake_records
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

drop policy if exists "intake_records_delete_access" on public.intake_records;
create policy "intake_records_delete_access" on public.intake_records
  for delete to authenticated
  using (
    created_by = auth.uid()
    or exists (
      select 1 from public.user_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ---------------------------------------------------------------------------
-- intake_groups (scoped via parent intake_records)
-- ---------------------------------------------------------------------------
alter table public.intake_groups enable row level security;

drop policy if exists "intake_groups_select_access" on public.intake_groups;
create policy "intake_groups_select_access" on public.intake_groups
  for select to authenticated
  using (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "intake_groups_insert_access" on public.intake_groups;
create policy "intake_groups_insert_access" on public.intake_groups
  for insert to authenticated
  with check (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "intake_groups_update_access" on public.intake_groups;
create policy "intake_groups_update_access" on public.intake_groups
  for update to authenticated
  using (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  )
  with check (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "intake_groups_delete_access" on public.intake_groups;
create policy "intake_groups_delete_access" on public.intake_groups
  for delete to authenticated
  using (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

-- ---------------------------------------------------------------------------
-- client_candidates
-- ---------------------------------------------------------------------------
alter table public.client_candidates enable row level security;

drop policy if exists "client_candidates_select_access" on public.client_candidates;
create policy "client_candidates_select_access" on public.client_candidates
  for select to authenticated
  using (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "client_candidates_insert_access" on public.client_candidates;
create policy "client_candidates_insert_access" on public.client_candidates
  for insert to authenticated
  with check (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "client_candidates_update_access" on public.client_candidates;
create policy "client_candidates_update_access" on public.client_candidates
  for update to authenticated
  using (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  )
  with check (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "client_candidates_delete_access" on public.client_candidates;
create policy "client_candidates_delete_access" on public.client_candidates
  for delete to authenticated
  using (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

-- ---------------------------------------------------------------------------
-- matter_candidates
-- ---------------------------------------------------------------------------
alter table public.matter_candidates enable row level security;

drop policy if exists "matter_candidates_select_access" on public.matter_candidates;
create policy "matter_candidates_select_access" on public.matter_candidates
  for select to authenticated
  using (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "matter_candidates_insert_access" on public.matter_candidates;
create policy "matter_candidates_insert_access" on public.matter_candidates
  for insert to authenticated
  with check (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "matter_candidates_update_access" on public.matter_candidates;
create policy "matter_candidates_update_access" on public.matter_candidates
  for update to authenticated
  using (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  )
  with check (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "matter_candidates_delete_access" on public.matter_candidates;
create policy "matter_candidates_delete_access" on public.matter_candidates
  for delete to authenticated
  using (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

-- ---------------------------------------------------------------------------
-- intake_tasks
-- ---------------------------------------------------------------------------
alter table public.intake_tasks enable row level security;

drop policy if exists "intake_tasks_select_access" on public.intake_tasks;
create policy "intake_tasks_select_access" on public.intake_tasks
  for select to authenticated
  using (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "intake_tasks_insert_access" on public.intake_tasks;
create policy "intake_tasks_insert_access" on public.intake_tasks
  for insert to authenticated
  with check (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "intake_tasks_update_access" on public.intake_tasks;
create policy "intake_tasks_update_access" on public.intake_tasks
  for update to authenticated
  using (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  )
  with check (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "intake_tasks_delete_access" on public.intake_tasks;
create policy "intake_tasks_delete_access" on public.intake_tasks
  for delete to authenticated
  using (
    exists (
      select 1 from public.intake_records r
      where r.id = intake_id
        and (
          r.created_by = auth.uid()
          or exists (
            select 1 from public.user_profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );
