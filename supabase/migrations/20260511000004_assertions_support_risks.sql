-- =============================================================================
-- LEXOS MVP — Migration 004: Case Stories, Assertions, Support Matrix, Risks
-- Schema authority: docs/implementation/01 Database Schema v0.md §7.13–7.16
-- RLS: deferred to WP-03. Fields client_id, matter_id, created_by,
--       privilege_status, confidentiality_status present for future policy use.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- §7.13 case_stories
-- W2 Case Story artifacts — structured narrative, not a chat transcript.
-- ---------------------------------------------------------------------------
create table if not exists case_stories (
  id                     uuid primary key default gen_random_uuid(),
  client_id              uuid not null references clients(id),
  matter_id              uuid not null references matters(id),
  title                  text,
  content_markdown       text,
  version                integer default 1,
  status                 text check (status in (
                           'draft','under_review','approved_internal',
                           'final_internal','superseded','archived')),
  workflow_origin        text,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  created_by             uuid references user_profiles(id),
  updated_by             uuid references user_profiles(id),
  model_used             text,
  prompt_version         text,
  confidentiality_status text check (confidentiality_status in (
                           'unknown','public','internal','confidential',
                           'highly_confidential','restricted')),
  privilege_status       text check (privilege_status in (
                           'unknown','not_privileged','potentially_privileged',
                           'privileged','work_product','restricted')),
  notes                  text,
  metadata               jsonb
);

create index if not exists idx_case_stories_client_id        on case_stories(client_id);
create index if not exists idx_case_stories_matter_id        on case_stories(matter_id);
create index if not exists idx_case_stories_status           on case_stories(status);
create index if not exists idx_case_stories_version          on case_stories(version);
create index if not exists idx_case_stories_workflow_origin  on case_stories(workflow_origin);
create index if not exists idx_case_stories_created_at       on case_stories(created_at);

create trigger trg_case_stories_updated_at
  before update on case_stories
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.14 assertions
-- Atomic factual/legal assertions. Must have truth_state and support_state.
-- Client narrative assertions are not verified facts.
-- ---------------------------------------------------------------------------
create table if not exists assertions (
  id                     uuid primary key default gen_random_uuid(),
  client_id              uuid not null references clients(id),
  matter_id              uuid not null references matters(id),
  case_story_id          uuid references case_stories(id),
  assertion_text         text not null,
  assertion_type         text,
  truth_state            text check (truth_state in (
                           'verified','client_confirmed','opposing_party_alleged',
                           'partially_supported','pending_verification',
                           'unsupported','contradicted','rejected','superseded')),
  support_state          text check (support_state in (
                           'supported','partially_supported','unsupported',
                           'contradicted','pending')),
  use_status             text check (use_status in (
                           'usable','use_with_caution','do_not_use',
                           'pending_review','superseded')),
  contradiction_flag     boolean default false,
  confidence             numeric,
  source_ids             jsonb,
  evidence_ids           jsonb,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  created_by             uuid references user_profiles(id),
  updated_by             uuid references user_profiles(id),
  confidentiality_status text check (confidentiality_status in (
                           'unknown','public','internal','confidential',
                           'highly_confidential','restricted')),
  privilege_status       text check (privilege_status in (
                           'unknown','not_privileged','potentially_privileged',
                           'privileged','work_product','restricted')),
  notes                  text,
  metadata               jsonb
);

create index if not exists idx_assertions_client_id         on assertions(client_id);
create index if not exists idx_assertions_matter_id         on assertions(matter_id);
create index if not exists idx_assertions_case_story_id     on assertions(case_story_id);
create index if not exists idx_assertions_truth_state       on assertions(truth_state);
create index if not exists idx_assertions_support_state     on assertions(support_state);
create index if not exists idx_assertions_use_status        on assertions(use_status);
create index if not exists idx_assertions_contradiction     on assertions(contradiction_flag);
create index if not exists idx_assertions_created_at        on assertions(created_at);

create trigger trg_assertions_updated_at
  before update on assertions
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.15 support_matrix_items
-- Links assertions to evidence and support reasoning (W5 core table).
-- QA-flagged or failed extraction must not be treated as reliable support
-- without a visible caveat.
-- ---------------------------------------------------------------------------
create table if not exists support_matrix_items (
  id                     uuid primary key default gen_random_uuid(),
  client_id              uuid not null references clients(id),
  matter_id              uuid not null references matters(id),
  assertion_id           uuid not null references assertions(id),
  evidence_id            uuid references evidence(id),
  extraction_id          uuid references evidence_extractions(id),
  support_state          text check (support_state in (
                           'supported','partially_supported','unsupported',
                           'contradicted','pending')),
  support_explanation    text,
  evidence_excerpt       text,
  page_reference         text,
  timecode_reference     text,
  frame_reference        text,
  risk_level             text check (risk_level in ('low','moderate','high','critical')),
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  created_by             uuid references user_profiles(id),
  updated_by             uuid references user_profiles(id),
  confidentiality_status text check (confidentiality_status in (
                           'unknown','public','internal','confidential',
                           'highly_confidential','restricted')),
  privilege_status       text check (privilege_status in (
                           'unknown','not_privileged','potentially_privileged',
                           'privileged','work_product','restricted')),
  notes                  text,
  metadata               jsonb
);

create index if not exists idx_support_matrix_client_id     on support_matrix_items(client_id);
create index if not exists idx_support_matrix_matter_id     on support_matrix_items(matter_id);
create index if not exists idx_support_matrix_assertion_id  on support_matrix_items(assertion_id);
create index if not exists idx_support_matrix_evidence_id   on support_matrix_items(evidence_id);
create index if not exists idx_support_matrix_extraction_id on support_matrix_items(extraction_id);
create index if not exists idx_support_matrix_support_state on support_matrix_items(support_state);
create index if not exists idx_support_matrix_risk_level    on support_matrix_items(risk_level);

create trigger trg_support_matrix_items_updated_at
  before update on support_matrix_items
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.16 risks
-- Legal, factual, evidentiary, workflow, security, and operational risks.
-- ---------------------------------------------------------------------------
create table if not exists risks (
  id                     uuid primary key default gen_random_uuid(),
  client_id              uuid references clients(id),
  matter_id              uuid references matters(id),
  risk_title             text,
  risk_type              text,
  severity               text check (severity in ('low','moderate','high','critical')),
  status                 text check (status in (
                           'open','mitigated','accepted','closed','superseded')),
  linked_object_type     text,
  linked_object_id       uuid,
  description            text,
  mitigation             text,
  owner_user_id          uuid references user_profiles(id),
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  created_by             uuid references user_profiles(id),
  updated_by             uuid references user_profiles(id),
  confidentiality_status text check (confidentiality_status in (
                           'unknown','public','internal','confidential',
                           'highly_confidential','restricted')),
  privilege_status       text check (privilege_status in (
                           'unknown','not_privileged','potentially_privileged',
                           'privileged','work_product','restricted')),
  notes                  text,
  metadata               jsonb
);

create index if not exists idx_risks_client_id           on risks(client_id);
create index if not exists idx_risks_matter_id           on risks(matter_id);
create index if not exists idx_risks_severity            on risks(severity);
create index if not exists idx_risks_status              on risks(status);
create index if not exists idx_risks_risk_type           on risks(risk_type);
create index if not exists idx_risks_linked_object_type  on risks(linked_object_type);
create index if not exists idx_risks_linked_object_id    on risks(linked_object_id);
create index if not exists idx_risks_owner_user_id       on risks(owner_user_id);
create index if not exists idx_risks_created_at          on risks(created_at);

create trigger trg_risks_updated_at
  before update on risks
  for each row execute function set_updated_at();

-- intake_tasks.risk_id FK — added now that risks table exists
alter table intake_tasks
  add constraint fk_intake_tasks_risk_id
  foreign key (risk_id)
  references risks(id);

-- RLS: deferred to WP-03.
