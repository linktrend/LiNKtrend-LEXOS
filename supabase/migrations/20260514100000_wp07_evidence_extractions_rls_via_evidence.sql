-- WP-07 follow-up: evidence_extractions RLS via parent evidence row.
-- The prior matter-only + client_id equality could deny inserts when evidence.client_id
-- and matters.client_id drift (denormalized columns); storage originals policies already
-- join evidence + matters.

drop policy if exists "evidence_extractions_select_access" on public.evidence_extractions;
create policy "evidence_extractions_select_access" on public.evidence_extractions
  for select to authenticated
  using (
    exists (
      select 1
      from public.evidence e
      inner join public.matters m on m.id = e.matter_id
      where e.id = evidence_extractions.evidence_id
        and e.matter_id = evidence_extractions.matter_id
        and e.client_id = evidence_extractions.client_id
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
      select 1
      from public.evidence e
      inner join public.matters m on m.id = e.matter_id
      where e.id = evidence_extractions.evidence_id
        and e.matter_id = evidence_extractions.matter_id
        and e.client_id = evidence_extractions.client_id
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
      select 1
      from public.evidence e
      inner join public.matters m on m.id = e.matter_id
      where e.id = evidence_extractions.evidence_id
        and e.matter_id = evidence_extractions.matter_id
        and e.client_id = evidence_extractions.client_id
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
      select 1
      from public.evidence e
      inner join public.matters m on m.id = e.matter_id
      where e.id = evidence_extractions.evidence_id
        and e.matter_id = evidence_extractions.matter_id
        and e.client_id = evidence_extractions.client_id
        and (
          m.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );
