-- =============================================================================
-- WP-03: user_profiles RLS + auth trigger
-- Applied: 2026-05-11 via Supabase MCP apply_migration
-- =============================================================================

-- 1. Enable RLS on user_profiles (all other tables remain RLS-disabled until WP-04+)
alter table public.user_profiles enable row level security;

-- 2. Authenticated users can read their own profile row
create policy "users_read_own_profile"
  on public.user_profiles
  for select
  to authenticated
  using (id = auth.uid());

-- 3. Authenticated users can update their own profile row
create policy "users_update_own_profile"
  on public.user_profiles
  for update
  to authenticated
  using (id = auth.uid());

-- No INSERT policy: handled by SECURITY DEFINER trigger below.
-- No DELETE policy: admin-only via service-role server code.

-- =============================================================================
-- 4. Trigger: auto-create user_profiles row when a new auth.users row is added
-- SECURITY DEFINER allows the function to insert into user_profiles
-- even with RLS enabled, without requiring a client-side INSERT policy.
-- =============================================================================

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_profiles (id, email, display_name, role, status)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    'operator',   -- MVP default; admin promotes/demotes via service-role server code
    'active'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_auth_user();
