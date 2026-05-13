-- Pre-WP-16: RLS for output_artifacts (matter owner, client creator, or admin).
-- No DELETE policy - hard delete not supported for MVP.
-- Aligns with adversarial_critiques / argument_drafts pattern.

alter table public.output_artifacts enable row level security;

drop policy if exists "output_artifacts_select_access" on public.output_artifacts;
create policy "output_artifacts_select_access" on public.output_artifacts
  for select to authenticated
  using (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = output_artifacts.matter_id
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

drop policy if exists "output_artifacts_insert_access" on public.output_artifacts;
create policy "output_artifacts_insert_access" on public.output_artifacts
  for insert to authenticated
  with check (
    exists (
      select 1 from public.matters m
      where m.id = matter_id and m.created_by = (select auth.uid())
    )
    or exists (
      select 1 from public.matters m
      inner join public.clients c on c.id = m.client_id
      where m.id = matter_id and c.created_by = (select auth.uid())
    )
    or exists (
      select 1 from public.user_profiles p
      where p.id = (select auth.uid()) and p.role = 'admin'
    )
  );

drop policy if exists "output_artifacts_update_access" on public.output_artifacts;
create policy "output_artifacts_update_access" on public.output_artifacts
  for update to authenticated
  using (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = output_artifacts.matter_id
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
      where m.id = output_artifacts.matter_id
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
