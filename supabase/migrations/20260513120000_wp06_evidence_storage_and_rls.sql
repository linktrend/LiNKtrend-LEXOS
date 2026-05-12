-- WP-06: Private bucket for original evidence, storage policies, RLS on sources + evidence
-- Path: client/{client_id}/matter/{matter_id}/evidence/{evidence_id}/original/{filename}
-- MVP access: matter.created_by = auth.uid() OR user_profiles.role = 'admin'

-- ---------------------------------------------------------------------------
-- Storage bucket
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('evidence-originals', 'evidence-originals', false, null, null)
on conflict (id) do update set public = excluded.public;

-- ---------------------------------------------------------------------------
-- storage.objects policies (bucket evidence-originals)
-- ---------------------------------------------------------------------------
drop policy if exists "evidence_originals_select" on storage.objects;
create policy "evidence_originals_select"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'evidence-originals'
    and split_part(name, '/', 1) = 'client'
    and split_part(name, '/', 3) = 'matter'
    and split_part(name, '/', 5) = 'evidence'
    and split_part(name, '/', 7) = 'original'
    and exists (
      select 1
      from public.evidence e
      inner join public.matters m on m.id = e.matter_id
      where e.id = (split_part(name, '/', 6))::uuid
        and e.matter_id = (split_part(name, '/', 4))::uuid
        and e.client_id = (split_part(name, '/', 2))::uuid
        and (
          m.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "evidence_originals_insert" on storage.objects;
create policy "evidence_originals_insert"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'evidence-originals'
    and split_part(name, '/', 1) = 'client'
    and split_part(name, '/', 3) = 'matter'
    and split_part(name, '/', 5) = 'evidence'
    and split_part(name, '/', 7) = 'original'
    and exists (
      select 1
      from public.evidence e
      inner join public.matters m on m.id = e.matter_id
      where e.id = (split_part(name, '/', 6))::uuid
        and e.matter_id = (split_part(name, '/', 4))::uuid
        and e.client_id = (split_part(name, '/', 2))::uuid
        and (
          m.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );

-- No UPDATE/DELETE for authenticated on originals in MVP (immutable anchor).

-- ---------------------------------------------------------------------------
-- sources — RLS (matter-scoped, creator or admin)
-- ---------------------------------------------------------------------------
alter table public.sources enable row level security;

drop policy if exists "sources_select_access" on public.sources;
create policy "sources_select_access" on public.sources
  for select to authenticated
  using (
    exists (
      select 1 from public.matters m
      where m.id = sources.matter_id
        and (
          m.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "sources_insert_access" on public.sources;
create policy "sources_insert_access" on public.sources
  for insert to authenticated
  with check (
    exists (
      select 1 from public.matters m
      where m.id = sources.matter_id
        and m.client_id = sources.client_id
        and (
          m.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "sources_update_access" on public.sources;
create policy "sources_update_access" on public.sources
  for update to authenticated
  using (
    exists (
      select 1 from public.matters m
      where m.id = sources.matter_id
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
      where m.id = sources.matter_id
        and (
          m.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );

-- ---------------------------------------------------------------------------
-- evidence — RLS (matter-scoped, creator or admin)
-- ---------------------------------------------------------------------------
alter table public.evidence enable row level security;

drop policy if exists "evidence_select_access" on public.evidence;
create policy "evidence_select_access" on public.evidence
  for select to authenticated
  using (
    exists (
      select 1 from public.matters m
      where m.id = evidence.matter_id
        and (
          m.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "evidence_insert_access" on public.evidence;
create policy "evidence_insert_access" on public.evidence
  for insert to authenticated
  with check (
    exists (
      select 1 from public.matters m
      where m.id = evidence.matter_id
        and m.client_id = evidence.client_id
        and (
          m.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );

drop policy if exists "evidence_update_access" on public.evidence;
create policy "evidence_update_access" on public.evidence
  for update to authenticated
  using (
    exists (
      select 1 from public.matters m
      where m.id = evidence.matter_id
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
      where m.id = evidence.matter_id
        and m.client_id = evidence.client_id
        and (
          m.created_by = (select auth.uid())
          or exists (
            select 1 from public.user_profiles p
            where p.id = (select auth.uid()) and p.role = 'admin'
          )
        )
    )
  );
