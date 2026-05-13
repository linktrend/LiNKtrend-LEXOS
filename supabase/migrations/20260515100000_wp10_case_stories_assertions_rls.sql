-- WP-10: RLS for case_stories and assertions (matter owner, client creator, or admin).
-- No DELETE policies: hard delete is not supported for assertions in MVP.
-- Access matches matter visibility: matters.created_by OR clients.created_by (matters.created_by may be null).

-- ---------------------------------------------------------------------------
-- case_stories
-- ---------------------------------------------------------------------------
alter table public.case_stories enable row level security;

drop policy if exists "case_stories_select_access" on public.case_stories;
create policy "case_stories_select_access" on public.case_stories
  for select to authenticated
  using (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = case_stories.matter_id
        and (
          m.created_by = (select auth.uid())
          or c.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "case_stories_insert_access" on public.case_stories;
create policy "case_stories_insert_access" on public.case_stories
  for insert to authenticated
  with check (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = case_stories.matter_id
        and (
          m.created_by = (select auth.uid())
          or c.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "case_stories_update_access" on public.case_stories;
create policy "case_stories_update_access" on public.case_stories
  for update to authenticated
  using (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = case_stories.matter_id
        and (
          m.created_by = (select auth.uid())
          or c.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  )
  with check (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = case_stories.matter_id
        and (
          m.created_by = (select auth.uid())
          or c.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );

-- ---------------------------------------------------------------------------
-- assertions (no DELETE policy — PostgREST delete denied under RLS)
-- ---------------------------------------------------------------------------
alter table public.assertions enable row level security;

drop policy if exists "assertions_select_access" on public.assertions;
create policy "assertions_select_access" on public.assertions
  for select to authenticated
  using (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = assertions.matter_id
        and (
          m.created_by = (select auth.uid())
          or c.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "assertions_insert_access" on public.assertions;
create policy "assertions_insert_access" on public.assertions
  for insert to authenticated
  with check (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = assertions.matter_id
        and (
          m.created_by = (select auth.uid())
          or c.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "assertions_update_access" on public.assertions;
create policy "assertions_update_access" on public.assertions
  for update to authenticated
  using (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = assertions.matter_id
        and (
          m.created_by = (select auth.uid())
          or c.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  )
  with check (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = assertions.matter_id
        and (
          m.created_by = (select auth.uid())
          or c.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );
