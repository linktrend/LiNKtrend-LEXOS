-- =============================================================================
-- LEXOS MVP — Migration 005: Artifacts, Workflows, Audit Events
-- Schema authority: docs/implementation/01 Database Schema v0.md §7.17–7.24
-- RLS: deferred to WP-03. Scoping fields present on all tables.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- §7.17 strategy_memos
-- W6 Strategy Memos. Must be based on support matrix and visible risks.
-- ---------------------------------------------------------------------------
create table if not exists strategy_memos (
  id                     uuid primary key default gen_random_uuid(),
  client_id              uuid not null references clients(id),
  matter_id              uuid not null references matters(id),
  title                  text,
  content_markdown       text,
  strategy_points        jsonb,
  research_questions     jsonb,
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

create index if not exists idx_strategy_memos_client_id   on strategy_memos(client_id);
create index if not exists idx_strategy_memos_matter_id   on strategy_memos(matter_id);
create index if not exists idx_strategy_memos_status      on strategy_memos(status);
create index if not exists idx_strategy_memos_version     on strategy_memos(version);
create index if not exists idx_strategy_memos_created_at  on strategy_memos(created_at);

create trigger trg_strategy_memos_updated_at
  before update on strategy_memos
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.18 research_memos
-- W7 Research Memos. Must state jurisdiction; unverified citations must be labeled.
-- ---------------------------------------------------------------------------
create table if not exists research_memos (
  id                     uuid primary key default gen_random_uuid(),
  client_id              uuid not null references clients(id),
  matter_id              uuid not null references matters(id),
  title                  text,
  research_question      text,
  jurisdiction           text,
  short_answer           text,
  content_markdown       text,
  authorities            jsonb,
  adverse_authority_note text,
  limitations            text,
  verification_status    text check (verification_status in (
                           'not_reviewed','under_review','approved',
                           'approved_with_changes','rejected','needs_more_evidence',
                           'needs_more_research','needs_client_clarification',
                           'risk_accepted','deferred')),
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

create index if not exists idx_research_memos_client_id          on research_memos(client_id);
create index if not exists idx_research_memos_matter_id          on research_memos(matter_id);
create index if not exists idx_research_memos_jurisdiction       on research_memos(jurisdiction);
create index if not exists idx_research_memos_verification       on research_memos(verification_status);
create index if not exists idx_research_memos_status             on research_memos(status);
create index if not exists idx_research_memos_version            on research_memos(version);
create index if not exists idx_research_memos_created_at         on research_memos(created_at);

create trigger trg_research_memos_updated_at
  before update on research_memos
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.19 argument_drafts
-- W8 Argument Drafts. Draft status must NOT imply filing-ready.
-- Routes to W9 adversarial review.
-- ---------------------------------------------------------------------------
create table if not exists argument_drafts (
  id                     uuid primary key default gen_random_uuid(),
  client_id              uuid not null references clients(id),
  matter_id              uuid not null references matters(id),
  title                  text,
  intended_audience      text,
  content_markdown       text,
  strategy_memo_id       uuid references strategy_memos(id),
  research_memo_id       uuid references research_memos(id),
  version                integer default 1,
  status                 text check (status in (
                           'draft','under_review','approved_internal',
                           'final_internal','superseded','archived')),
  workflow_origin        text,
  unsupported_claims     jsonb,
  source_basis           jsonb,
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

create index if not exists idx_argument_drafts_client_id        on argument_drafts(client_id);
create index if not exists idx_argument_drafts_matter_id        on argument_drafts(matter_id);
create index if not exists idx_argument_drafts_strategy_memo_id on argument_drafts(strategy_memo_id);
create index if not exists idx_argument_drafts_research_memo_id on argument_drafts(research_memo_id);
create index if not exists idx_argument_drafts_status           on argument_drafts(status);
create index if not exists idx_argument_drafts_version          on argument_drafts(version);
create index if not exists idx_argument_drafts_created_at       on argument_drafts(created_at);

create trigger trg_argument_drafts_updated_at
  before update on argument_drafts
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.20 adversarial_critiques
-- W9 Adversarial Critiques. W9 is mandatory in MVP; must be non-deferential.
-- Critical issues must remain visible.
-- ---------------------------------------------------------------------------
create table if not exists adversarial_critiques (
  id                     uuid primary key default gen_random_uuid(),
  client_id              uuid not null references clients(id),
  matter_id              uuid not null references matters(id),
  argument_draft_id      uuid references argument_drafts(id),
  title                  text,
  content_markdown       text,
  attack_matrix          jsonb,
  loop_decision          text,
  severity_summary       text,
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

create index if not exists idx_adversarial_critiques_client_id         on adversarial_critiques(client_id);
create index if not exists idx_adversarial_critiques_matter_id         on adversarial_critiques(matter_id);
create index if not exists idx_adversarial_critiques_argument_draft_id on adversarial_critiques(argument_draft_id);
create index if not exists idx_adversarial_critiques_loop_decision     on adversarial_critiques(loop_decision);
create index if not exists idx_adversarial_critiques_status            on adversarial_critiques(status);
create index if not exists idx_adversarial_critiques_version           on adversarial_critiques(version);
create index if not exists idx_adversarial_critiques_created_at        on adversarial_critiques(created_at);

create trigger trg_adversarial_critiques_updated_at
  before update on adversarial_critiques
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.21 output_artifacts
-- Generated/revised work product. Artifact status controls finality.
-- Export does NOT imply approval. Superseded versions remain traceable.
-- ---------------------------------------------------------------------------
create table if not exists output_artifacts (
  id                        uuid primary key default gen_random_uuid(),
  client_id                 uuid not null references clients(id),
  matter_id                 uuid not null references matters(id),
  artifact_type             text,
  title                     text,
  content_markdown          text,
  content_uri               text,
  workflow_origin           text,
  status                    text check (status in (
                              'draft','under_review','approved_internal',
                              'final_internal','superseded','archived')),
  version                   integer default 1,
  supersedes_artifact_id    uuid references output_artifacts(id),
  source_ids                jsonb,
  evidence_ids              jsonb,
  assertion_ids             jsonb,
  risk_ids                  jsonb,
  review_status             text check (review_status in (
                              'not_reviewed','under_review','approved',
                              'approved_with_changes','rejected','needs_more_evidence',
                              'needs_more_research','needs_client_clarification',
                              'risk_accepted','deferred')),
  reviewed_by               uuid references user_profiles(id),
  reviewed_at               timestamptz,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now(),
  created_by                uuid references user_profiles(id),
  updated_by                uuid references user_profiles(id),
  model_used                text,
  prompt_version            text,
  confidentiality_status    text check (confidentiality_status in (
                              'unknown','public','internal','confidential',
                              'highly_confidential','restricted')),
  privilege_status          text check (privilege_status in (
                              'unknown','not_privileged','potentially_privileged',
                              'privileged','work_product','restricted')),
  notes                     text,
  metadata                  jsonb
);

create index if not exists idx_output_artifacts_client_id        on output_artifacts(client_id);
create index if not exists idx_output_artifacts_matter_id        on output_artifacts(matter_id);
create index if not exists idx_output_artifacts_artifact_type    on output_artifacts(artifact_type);
create index if not exists idx_output_artifacts_workflow_origin  on output_artifacts(workflow_origin);
create index if not exists idx_output_artifacts_status           on output_artifacts(status);
create index if not exists idx_output_artifacts_version          on output_artifacts(version);
create index if not exists idx_output_artifacts_review_status    on output_artifacts(review_status);
create index if not exists idx_output_artifacts_created_at       on output_artifacts(created_at);

create trigger trg_output_artifacts_updated_at
  before update on output_artifacts
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.22 workflow_states
-- Active workflow status per matter.
-- Every active matter should have workflow state.
-- Completion requires required outputs, not just generated text.
-- ---------------------------------------------------------------------------
create table if not exists workflow_states (
  id                 uuid primary key default gen_random_uuid(),
  client_id          uuid not null references clients(id),
  matter_id          uuid not null references matters(id),
  current_workflow   text check (current_workflow in (
                       'W0','W1','W2','W3','W4','W5','W6',
                       'W7','W8','W9','W10','W11')),
  workflow_status    text check (workflow_status in (
                       'not_started','active','waiting_for_input','blocked',
                       'under_review','complete','returned_for_revision','archived')),
  last_completed_step text,
  next_action        text,
  blocked_flag       boolean default false,
  block_reason       text,
  assigned_agent     text,
  assigned_user_id   uuid references user_profiles(id),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  metadata           jsonb
);

create index if not exists idx_workflow_states_client_id        on workflow_states(client_id);
create index if not exists idx_workflow_states_matter_id        on workflow_states(matter_id);
create index if not exists idx_workflow_states_current_workflow on workflow_states(current_workflow);
create index if not exists idx_workflow_states_workflow_status  on workflow_states(workflow_status);
create index if not exists idx_workflow_states_blocked_flag     on workflow_states(blocked_flag);
create index if not exists idx_workflow_states_assigned_user_id on workflow_states(assigned_user_id);
create index if not exists idx_workflow_states_updated_at       on workflow_states(updated_at);

create trigger trg_workflow_states_updated_at
  before update on workflow_states
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.24 audit_events
-- Material audit events. Append-only; no updated_at by design.
-- See schema doc §7.24 for required event types.
-- ---------------------------------------------------------------------------
create table if not exists audit_events (
  id                  uuid primary key default gen_random_uuid(),
  event_type          text not null,
  actor_type          text,
  actor_id            uuid,
  client_id           uuid references clients(id),
  matter_id           uuid references matters(id),
  intake_id           uuid references intake_records(id),
  target_object_type  text,
  target_object_id    uuid,
  summary             text,
  created_at          timestamptz not null default now(),
  metadata            jsonb
);

create index if not exists idx_audit_events_event_type         on audit_events(event_type);
create index if not exists idx_audit_events_actor_type         on audit_events(actor_type);
create index if not exists idx_audit_events_actor_id           on audit_events(actor_id);
create index if not exists idx_audit_events_client_id          on audit_events(client_id);
create index if not exists idx_audit_events_matter_id          on audit_events(matter_id);
create index if not exists idx_audit_events_intake_id          on audit_events(intake_id);
create index if not exists idx_audit_events_target_object_type on audit_events(target_object_type);
create index if not exists idx_audit_events_target_object_id   on audit_events(target_object_id);
create index if not exists idx_audit_events_created_at         on audit_events(created_at);

-- No updated_at trigger: audit events are append-only.
-- RLS: deferred to WP-03.
