-- WP-07: RLS on evidence_extractions (matter owner + admin), aligned with evidence/sources (WP-06).

alter table public.evidence_extractions enable row level security;

drop policy if exists "evidence_extractions_select_access" on public.evidence_extractions;
create policy "evidence_extractions_select_access" on public.evidence_extractions
  for select to authenticated
  using (
    exists (
      select 1 from public.matters m
      where m.id = evidence_extractions.matter_id
        and (
          m.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "evidence_extractions_insert_access" on public.evidence_extractions;
create policy "evidence_extractions_insert_access" on public.evidence_extractions
  for insert to authenticated
  with check (
    exists (
      select 1 from public.matters m
      where m.id = evidence_extractions.matter_id
        and m.client_id = evidence_extractions.client_id
        and (
          m.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "evidence_extractions_update_access" on public.evidence_extractions;
create policy "evidence_extractions_update_access" on public.evidence_extractions
  for update to authenticated
  using (
    exists (
      select 1 from public.matters m
      where m.id = evidence_extractions.matter_id
        and (
          m.created_by = (select auth.uid())
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
      where m.id = evidence_extractions.matter_id
        and m.client_id = evidence_extractions.client_id
        and (
          m.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );
