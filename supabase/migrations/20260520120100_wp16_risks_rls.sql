-- Pre-WP-16: RLS for risks (matter-scoped and optional client-only rows).
-- Schema allows nullable matter_id / client_id; policies must cover both shapes.
-- No DELETE policy - hard delete not supported for MVP.

alter table public.risks enable row level security;

drop policy if exists "risks_select_access" on public.risks;
create policy "risks_select_access" on public.risks
  for select to authenticated
  using (
    (
      risks.matter_id is not null
      and exists (
        select 1 from public.matters m
        left join public.clients c on c.id = m.client_id
        where m.id = risks.matter_id
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
    or (
      risks.matter_id is null
      and risks.client_id is not null
      and exists (
        select 1 from public.clients c
        where c.id = risks.client_id
          and (
            c.created_by = (select auth.uid())
            or exists (
              select 1 from public.user_profiles p
              where p.id = (select auth.uid()) and p.role = 'admin'
            )
          )
      )
    )
  );

drop policy if exists "risks_insert_access" on public.risks;
create policy "risks_insert_access" on public.risks
  for insert to authenticated
  with check (
    (
      matter_id is not null
      and (
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
      )
    )
    or (
      matter_id is null
      and client_id is not null
      and (
        exists (
          select 1 from public.clients c
          where c.id = client_id and c.created_by = (select auth.uid())
        )
        or exists (
          select 1 from public.user_profiles p
          where p.id = (select auth.uid()) and p.role = 'admin'
        )
      )
    )
  );

drop policy if exists "risks_update_access" on public.risks;
create policy "risks_update_access" on public.risks
  for update to authenticated
  using (
    (
      risks.matter_id is not null
      and exists (
        select 1 from public.matters m
        left join public.clients c on c.id = m.client_id
        where m.id = risks.matter_id
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
    or (
      risks.matter_id is null
      and risks.client_id is not null
      and exists (
        select 1 from public.clients c
        where c.id = risks.client_id
          and (
            c.created_by = (select auth.uid())
            or exists (
              select 1 from public.user_profiles p
              where p.id = (select auth.uid()) and p.role = 'admin'
            )
          )
      )
    )
  )
  with check (
    (
      risks.matter_id is not null
      and exists (
        select 1 from public.matters m
        left join public.clients c on c.id = m.client_id
        where m.id = risks.matter_id
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
    or (
      risks.matter_id is null
      and risks.client_id is not null
      and exists (
        select 1 from public.clients c
        where c.id = risks.client_id
          and (
            c.created_by = (select auth.uid())
            or exists (
              select 1 from public.user_profiles p
              where p.id = (select auth.uid()) and p.role = 'admin'
            )
          )
      )
    )
  );
