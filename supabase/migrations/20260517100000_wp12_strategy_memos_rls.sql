-- WP-12: RLS for strategy_memos (matter owner, client creator, or admin).
-- No DELETE policy — hard delete not supported for MVP.

alter table public.strategy_memos enable row level security;

drop policy if exists "strategy_memos_select_access" on public.strategy_memos;
create policy "strategy_memos_select_access" on public.strategy_memos
  for select to authenticated
  using (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = strategy_memos.matter_id
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

drop policy if exists "strategy_memos_insert_access" on public.strategy_memos;
create policy "strategy_memos_insert_access" on public.strategy_memos
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

drop policy if exists "strategy_memos_update_access" on public.strategy_memos;
create policy "strategy_memos_update_access" on public.strategy_memos
  for update to authenticated
  using (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = strategy_memos.matter_id
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
      where m.id = strategy_memos.matter_id
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
