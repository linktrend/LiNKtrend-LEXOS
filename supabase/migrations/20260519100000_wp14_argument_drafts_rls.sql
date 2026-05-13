-- WP-14: RLS for argument_drafts (matter owner, client creator, or admin).
-- No DELETE policy — hard delete not supported for MVP.

alter table public.argument_drafts enable row level security;

drop policy if exists "argument_drafts_select_access" on public.argument_drafts;
create policy "argument_drafts_select_access" on public.argument_drafts
  for select to authenticated
  using (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = argument_drafts.matter_id
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

drop policy if exists "argument_drafts_insert_access" on public.argument_drafts;
create policy "argument_drafts_insert_access" on public.argument_drafts
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

drop policy if exists "argument_drafts_update_access" on public.argument_drafts;
create policy "argument_drafts_update_access" on public.argument_drafts
  for update to authenticated
  using (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = argument_drafts.matter_id
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
      where m.id = argument_drafts.matter_id
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
