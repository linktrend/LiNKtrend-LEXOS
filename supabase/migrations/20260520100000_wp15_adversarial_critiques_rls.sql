-- WP-15: RLS for adversarial_critiques (matter owner, client creator, or admin).
-- No DELETE policy — hard delete not supported for MVP.

alter table public.adversarial_critiques enable row level security;

drop policy if exists "adversarial_critiques_select_access" on public.adversarial_critiques;
create policy "adversarial_critiques_select_access" on public.adversarial_critiques
  for select to authenticated
  using (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = adversarial_critiques.matter_id
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

drop policy if exists "adversarial_critiques_insert_access" on public.adversarial_critiques;
create policy "adversarial_critiques_insert_access" on public.adversarial_critiques
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

drop policy if exists "adversarial_critiques_update_access" on public.adversarial_critiques;
create policy "adversarial_critiques_update_access" on public.adversarial_critiques
  for update to authenticated
  using (
    exists (
      select 1 from public.matters m
      left join public.clients c on c.id = m.client_id
      where m.id = adversarial_critiques.matter_id
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
      where m.id = adversarial_critiques.matter_id
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
