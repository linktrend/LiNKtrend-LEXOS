-- =============================================================================
-- LEXOS MVP — Migration 002: Identity, Intake, Clients, Matters
-- Schema authority: docs/implementation/01 Database Schema v0.md §7.1–7.8
-- RLS: deferred to WP-03. Fields client_id, matter_id, created_by,
--       privilege_status, confidentiality_status are present for future policy use.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- §7.1 user_profiles
-- Stores app-specific role and display metadata; auth is in auth.users.
-- ---------------------------------------------------------------------------
create table if not exists user_profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  email           text,
  display_name    text,
  role            text check (role in ('admin','operator','reviewer','read_only','system_agent')),
  status          text check (status in ('active','inactive','suspended')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists idx_user_profiles_role   on user_profiles(role);
create index if not exists idx_user_profiles_status on user_profiles(status);
create index if not exists idx_user_profiles_email  on user_profiles(email);

create trigger trg_user_profiles_updated_at
  before update on user_profiles
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.
-- Fields: id (= auth.users id) allows per-user policies.

-- ---------------------------------------------------------------------------
-- §7.2 intake_records
-- W0 intake workflow records. Not persistent W1 client memory until accepted.
-- ---------------------------------------------------------------------------
create table if not exists intake_records (
  id                          uuid primary key default gen_random_uuid(),
  intake_type                 text,
  intake_status               text check (intake_status in (
                                'new','in_progress','waiting_for_information',
                                'conflict_check_pending','kyc_pending',
                                'engagement_pending','lead_attorney_review',
                                'accepted','rejected','abandoned','archived')),
  source                      text,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now(),
  created_by                  uuid references user_profiles(id),
  updated_by                  uuid references user_profiles(id),
  assigned_operator           uuid references user_profiles(id),
  urgency_level               text,
  conflict_status             text check (conflict_status in (
                                'unknown','pending','clear','potential_conflict',
                                'conflict_identified','waiver_required','blocked')),
  kyc_status                  text check (kyc_status in (
                                'unknown','not_required','pending','in_progress',
                                'passed','failed','requires_review')),
  engagement_status           text check (engagement_status in (
                                'not_started','pending','sent','signed',
                                'declined','not_required','blocked')),
  lead_attorney_review_status text,
  handoff_status              text,
  accepted_at                 timestamptz,
  rejected_at                 timestamptz,
  abandoned_at                timestamptz,
  notes                       text,
  metadata                    jsonb
);

create index if not exists idx_intake_records_intake_status   on intake_records(intake_status);
create index if not exists idx_intake_records_conflict_status on intake_records(conflict_status);
create index if not exists idx_intake_records_kyc_status      on intake_records(kyc_status);
create index if not exists idx_intake_records_engagement      on intake_records(engagement_status);
create index if not exists idx_intake_records_assigned        on intake_records(assigned_operator);
create index if not exists idx_intake_records_created_at      on intake_records(created_at);

create trigger trg_intake_records_updated_at
  before update on intake_records
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.3 intake_groups
-- Related prospective clients in the same onboarding group.
-- ---------------------------------------------------------------------------
create table if not exists intake_groups (
  id                              uuid primary key default gen_random_uuid(),
  intake_id                       uuid references intake_records(id),
  relationship_type               text,
  shared_matter_candidate_id      uuid, -- FK added after matter_candidates is created (see end of file)
  joint_representation_flag       boolean default false,
  potential_internal_conflict_flag boolean default false,
  group_conflict_status           text,
  group_consent_status            text,
  created_at                      timestamptz not null default now(),
  updated_at                      timestamptz not null default now(),
  created_by                      uuid references user_profiles(id),
  updated_by                      uuid references user_profiles(id),
  notes                           text,
  metadata                        jsonb
);

create index if not exists idx_intake_groups_intake_id        on intake_groups(intake_id);
create index if not exists idx_intake_groups_joint_rep        on intake_groups(joint_representation_flag);
create index if not exists idx_intake_groups_internal_conflict on intake_groups(potential_internal_conflict_flag);
create index if not exists idx_intake_groups_conflict_status  on intake_groups(group_conflict_status);

create trigger trg_intake_groups_updated_at
  before update on intake_groups
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.4 client_candidates
-- Prospective clients during W0 intake (not accepted W1 clients).
-- ---------------------------------------------------------------------------
create table if not exists client_candidates (
  id                    uuid primary key default gen_random_uuid(),
  intake_id             uuid references intake_records(id),
  intake_group_id       uuid references intake_groups(id),
  name                  text,
  client_type           text,
  contact_details       jsonb,
  identity_status       text,
  kyc_status            text check (kyc_status in (
                          'unknown','not_required','pending','in_progress',
                          'passed','failed','requires_review')),
  conflict_status       text check (conflict_status in (
                          'unknown','pending','clear','potential_conflict',
                          'conflict_identified','waiver_required','blocked')),
  authority_status      text,
  representative_status text,
  engagement_status     text check (engagement_status in (
                          'not_started','pending','sent','signed',
                          'declined','not_required','blocked')),
  consent_status        text,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  created_by            uuid references user_profiles(id),
  updated_by            uuid references user_profiles(id),
  notes                 text,
  metadata              jsonb
);

create index if not exists idx_client_candidates_intake_id       on client_candidates(intake_id);
create index if not exists idx_client_candidates_intake_group_id on client_candidates(intake_group_id);
create index if not exists idx_client_candidates_name            on client_candidates(name);
create index if not exists idx_client_candidates_client_type     on client_candidates(client_type);
create index if not exists idx_client_candidates_kyc_status      on client_candidates(kyc_status);
create index if not exists idx_client_candidates_conflict_status on client_candidates(conflict_status);
create index if not exists idx_client_candidates_engagement      on client_candidates(engagement_status);

create trigger trg_client_candidates_updated_at
  before update on client_candidates
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.5 matter_candidates
-- Candidate matters during W0 intake.
-- ---------------------------------------------------------------------------
create table if not exists matter_candidates (
  id                    uuid primary key default gen_random_uuid(),
  intake_id             uuid references intake_records(id),
  intake_group_id       uuid references intake_groups(id),
  proposed_matter_name  text,
  matter_type           text,
  posture               text check (posture in (
                          'plaintiff','defence','defense','regulatory',
                          'criminal_defence','commercial_dispute','advisory','internal','unknown')),
  jurisdiction          text,
  adverse_parties       jsonb,
  related_parties       jsonb,
  deadline_flags        jsonb,
  urgency_level         text,
  engagement_status     text check (engagement_status in (
                          'not_started','pending','sent','signed',
                          'declined','not_required','blocked')),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  created_by            uuid references user_profiles(id),
  updated_by            uuid references user_profiles(id),
  notes                 text,
  metadata              jsonb
);

create index if not exists idx_matter_candidates_intake_id       on matter_candidates(intake_id);
create index if not exists idx_matter_candidates_intake_group_id on matter_candidates(intake_group_id);
create index if not exists idx_matter_candidates_posture         on matter_candidates(posture);
create index if not exists idx_matter_candidates_jurisdiction    on matter_candidates(jurisdiction);
create index if not exists idx_matter_candidates_urgency         on matter_candidates(urgency_level);
create index if not exists idx_matter_candidates_engagement      on matter_candidates(engagement_status);

create trigger trg_matter_candidates_updated_at
  before update on matter_candidates
  for each row execute function set_updated_at();

-- shared_matter_candidate_id self-FK: added after table creation to avoid forward-reference
alter table intake_groups
  add constraint fk_intake_groups_shared_matter_candidate
  foreign key (shared_matter_candidate_id)
  references matter_candidates(id);

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.6 intake_tasks
-- W0 subagent/manual tasks scoped to intake records.
-- ---------------------------------------------------------------------------
create table if not exists intake_tasks (
  id                    uuid primary key default gen_random_uuid(),
  intake_id             uuid references intake_records(id),
  intake_group_id       uuid references intake_groups(id),
  client_candidate_id   uuid references client_candidates(id),
  matter_candidate_id   uuid references matter_candidates(id),
  assigned_agent        text,
  assigned_user_id      uuid references user_profiles(id),
  task_type             text,
  status                text check (status in (
                          'queued','running','completed','failed','cancelled','needs_review')),
  result_summary        text,
  risk_id               uuid, -- FK to risks added in migration 004
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  due_at                timestamptz,
  completed_at          timestamptz,
  metadata              jsonb
);

create index if not exists idx_intake_tasks_intake_id            on intake_tasks(intake_id);
create index if not exists idx_intake_tasks_intake_group_id      on intake_tasks(intake_group_id);
create index if not exists idx_intake_tasks_client_candidate_id  on intake_tasks(client_candidate_id);
create index if not exists idx_intake_tasks_matter_candidate_id  on intake_tasks(matter_candidate_id);
create index if not exists idx_intake_tasks_assigned_agent       on intake_tasks(assigned_agent);
create index if not exists idx_intake_tasks_assigned_user_id     on intake_tasks(assigned_user_id);
create index if not exists idx_intake_tasks_task_type            on intake_tasks(task_type);
create index if not exists idx_intake_tasks_status               on intake_tasks(status);
create index if not exists idx_intake_tasks_due_at               on intake_tasks(due_at);

create trigger trg_intake_tasks_updated_at
  before update on intake_tasks
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.7 clients
-- Accepted client records. Created only after intake acceptance.
-- RLS: deferred to WP-03. Fields: client_id = id; privilege_status, confidentiality_status present.
-- ---------------------------------------------------------------------------
create table if not exists clients (
  id                      uuid primary key default gen_random_uuid(),
  client_name             text not null,
  client_type             text,
  primary_contact         jsonb,
  jurisdiction            text,
  status                  text check (status in ('active','inactive','archived','blocked')),
  client_master_story     text,
  created_from_intake_id  uuid references intake_records(id),
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),
  created_by              uuid references user_profiles(id),
  updated_by              uuid references user_profiles(id),
  confidentiality_status  text check (confidentiality_status in (
                            'unknown','public','internal','confidential',
                            'highly_confidential','restricted')),
  privilege_status        text check (privilege_status in (
                            'unknown','not_privileged','potentially_privileged',
                            'privileged','work_product','restricted')),
  notes                   text,
  metadata                jsonb
);

create index if not exists idx_clients_client_name         on clients(client_name);
create index if not exists idx_clients_client_type         on clients(client_type);
create index if not exists idx_clients_status              on clients(status);
create index if not exists idx_clients_created_from_intake on clients(created_from_intake_id);

create trigger trg_clients_updated_at
  before update on clients
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03. Future policies will scope to client_id and user role.

-- ---------------------------------------------------------------------------
-- §7.8 matters
-- Legal matters scoped under clients.
-- Matter scope controls retrieval, workflow, agents, evidence, and artifacts.
-- RLS: deferred to WP-03. Fields: client_id, matter_id, privilege_status,
--       confidentiality_status present for future policy use.
-- ---------------------------------------------------------------------------
create table if not exists matters (
  id                              uuid primary key default gen_random_uuid(),
  client_id                       uuid not null references clients(id),
  matter_name                     text not null,
  matter_type                     text,
  posture                         text check (posture in (
                                    'plaintiff','defence','defense','regulatory',
                                    'criminal_defence','commercial_dispute','advisory','internal','unknown')),
  jurisdiction                    text,
  status                          text check (status in (
                                    'draft','active','paused','blocked',
                                    'under_review','closed','archived')),
  current_workflow                text check (current_workflow in (
                                    'W0','W1','W2','W3','W4','W5','W6',
                                    'W7','W8','W9','W10','W11')),
  created_from_intake_id          uuid references intake_records(id),
  created_from_matter_candidate_id uuid references matter_candidates(id),
  opened_at                       timestamptz,
  closed_at                       timestamptz,
  created_at                      timestamptz not null default now(),
  updated_at                      timestamptz not null default now(),
  created_by                      uuid references user_profiles(id),
  updated_by                      uuid references user_profiles(id),
  confidentiality_status          text check (confidentiality_status in (
                                    'unknown','public','internal','confidential',
                                    'highly_confidential','restricted')),
  privilege_status                text check (privilege_status in (
                                    'unknown','not_privileged','potentially_privileged',
                                    'privileged','work_product','restricted')),
  notes                           text,
  metadata                        jsonb
);

create index if not exists idx_matters_client_id              on matters(client_id);
create index if not exists idx_matters_matter_name            on matters(matter_name);
create index if not exists idx_matters_posture                on matters(posture);
create index if not exists idx_matters_jurisdiction           on matters(jurisdiction);
create index if not exists idx_matters_status                 on matters(status);
create index if not exists idx_matters_current_workflow       on matters(current_workflow);
create index if not exists idx_matters_created_from_intake    on matters(created_from_intake_id);

create trigger trg_matters_updated_at
  before update on matters
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03. Future policies will scope to client_id, matter_id, and user role.
