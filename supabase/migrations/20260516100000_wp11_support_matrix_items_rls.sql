-- WP-11: RLS for support_matrix_items (matter owner, client creator, or admin).
-- No DELETE policy — hard delete not supported for MVP.

alter table public.support_matrix_items enable row level security;

drop policy if exists "support_matrix_items_select_access" on public.support_matrix_items;
create policy "support_matrix_items_select_access" on public.support_matrix_items
  for select to authenticated
  using (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = support_matrix_items.matter_id
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

drop policy if exists "support_matrix_items_insert_access" on public.support_matrix_items;
create policy "support_matrix_items_insert_access" on public.support_matrix_items
  for insert to authenticated
  with check (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = support_matrix_items.matter_id
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

drop policy if exists "support_matrix_items_update_access" on public.support_matrix_items;
create policy "support_matrix_items_update_access" on public.support_matrix_items
  for update to authenticated
  using (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = support_matrix_items.matter_id
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
      where m.id = support_matrix_items.matter_id
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
