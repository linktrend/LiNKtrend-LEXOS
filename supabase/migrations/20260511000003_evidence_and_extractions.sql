-- =============================================================================
-- LEXOS MVP — Migration 003: Sources, Evidence, Evidence Extractions
-- Schema authority: docs/implementation/01 Database Schema v0.md §7.9–7.11
-- Architecture rule: Evidence and Evidence Extraction are SEPARATE objects.
--   Original evidence is never replaced by extraction artifacts.
-- RLS: deferred to WP-03. Fields client_id, matter_id, created_by,
--       privilege_status, confidentiality_status present for future policy use.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- §7.9 sources
-- Source containers or origins for evidence (uploads, court files, etc.).
-- ---------------------------------------------------------------------------
create table if not exists sources (
  id                     uuid primary key default gen_random_uuid(),
  client_id              uuid not null references clients(id),
  matter_id              uuid not null references matters(id),
  source_name            text,
  source_type            text,
  provided_by            text,
  received_at            timestamptz,
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

create index if not exists idx_sources_client_id    on sources(client_id);
create index if not exists idx_sources_matter_id    on sources(matter_id);
create index if not exists idx_sources_source_type  on sources(source_type);
create index if not exists idx_sources_received_at  on sources(received_at);

create trigger trg_sources_updated_at
  before update on sources
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03.

-- ---------------------------------------------------------------------------
-- §7.10 evidence
-- Canonical Evidence Objects. Original file is the evidentiary anchor.
-- Evidence is NOT replaced by extractions, OCR, markdown, or summaries.
-- ---------------------------------------------------------------------------
create table if not exists evidence (
  id                     uuid primary key default gen_random_uuid(),
  client_id              uuid not null references clients(id),
  matter_id              uuid not null references matters(id),
  source_id              uuid references sources(id),
  evidence_label         text,
  file_name              text,
  file_type              text,
  evidence_media_type    text check (evidence_media_type in (
                           'pdf','docx','txt','markdown','image','screenshot',
                           'audio','video','spreadsheet','email_export',
                           'message_export','unknown')),
  source_type            text,
  language               text,
  original_file_uri      text,
  original_file_hash     text,
  processing_status      text check (processing_status in (
                           'uploaded','queued','processing','processed',
                           'qa_flagged','failed','requires_human_review',
                           'superseded','requires_reupload','archived')),
  extraction_status      text,
  quality_status         text,
  human_review_required  boolean default false,
  uploaded_by            uuid references user_profiles(id),
  uploaded_at            timestamptz,
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
  legal_hold             boolean default false,
  notes                  text,
  metadata_json          jsonb
);

create index if not exists idx_evidence_client_id             on evidence(client_id);
create index if not exists idx_evidence_matter_id             on evidence(matter_id);
create index if not exists idx_evidence_source_id             on evidence(source_id);
create index if not exists idx_evidence_processing_status     on evidence(processing_status);
create index if not exists idx_evidence_extraction_status     on evidence(extraction_status);
create index if not exists idx_evidence_quality_status        on evidence(quality_status);
create index if not exists idx_evidence_human_review          on evidence(human_review_required);
create index if not exists idx_evidence_media_type            on evidence(evidence_media_type);
create index if not exists idx_evidence_file_type             on evidence(file_type);
create index if not exists idx_evidence_uploaded_at           on evidence(uploaded_at);
create index if not exists idx_evidence_legal_hold            on evidence(legal_hold);

create trigger trg_evidence_updated_at
  before update on evidence
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03. Future policies scope to client_id, matter_id, privilege_status.

-- ---------------------------------------------------------------------------
-- §7.11 evidence_extractions
-- Derived extraction artifacts from Evidence. SEPARATE from the Evidence Object.
-- Raw OCR-only output must be marked qa_flagged / human_review_required.
-- Failed/QA-flagged extraction must not silently support assertions (W5).
-- ---------------------------------------------------------------------------
create table if not exists evidence_extractions (
  id                          uuid primary key default gen_random_uuid(),
  evidence_id                 uuid not null references evidence(id),
  client_id                   uuid not null references clients(id),
  matter_id                   uuid not null references matters(id),
  extraction_type             text check (extraction_type in (
                                'text_document','scanned_document','image_with_text',
                                'image_without_text','audio_transcript','video_transcript',
                                'video_visual_timeline','metadata_only','manual_extraction')),
  markdown_uri                text,
  markdown_text               text,
  json_uri                    text,
  json_content                jsonb,
  transcript_uri              text,
  transcript_json             jsonb,
  visual_description          text,
  ocr_text                    text,
  timecoded_segments          jsonb,
  frame_references            jsonb,
  extraction_tool             text,
  extraction_model            text,
  qa_model                    text,
  extraction_quality_score    numeric,
  extraction_quality_status   text check (extraction_quality_status in (
                                'accepted','qa_flagged','failed','human_review_required')),
  quality_flags               jsonb,
  human_review_required       boolean default false,
  is_current                  boolean default true,
  supersedes_extraction_id    uuid references evidence_extractions(id),
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now(),
  created_by                  uuid references user_profiles(id),
  updated_by                  uuid references user_profiles(id),
  confidentiality_status      text check (confidentiality_status in (
                                'unknown','public','internal','confidential',
                                'highly_confidential','restricted')),
  privilege_status            text check (privilege_status in (
                                'unknown','not_privileged','potentially_privileged',
                                'privileged','work_product','restricted')),
  notes                       text,
  metadata                    jsonb
);

create index if not exists idx_evidence_extractions_evidence_id         on evidence_extractions(evidence_id);
create index if not exists idx_evidence_extractions_client_id           on evidence_extractions(client_id);
create index if not exists idx_evidence_extractions_matter_id           on evidence_extractions(matter_id);
create index if not exists idx_evidence_extractions_extraction_type     on evidence_extractions(extraction_type);
create index if not exists idx_evidence_extractions_quality_status      on evidence_extractions(extraction_quality_status);
create index if not exists idx_evidence_extractions_human_review        on evidence_extractions(human_review_required);
create index if not exists idx_evidence_extractions_is_current          on evidence_extractions(is_current);
create index if not exists idx_evidence_extractions_created_at          on evidence_extractions(created_at);

create trigger trg_evidence_extractions_updated_at
  before update on evidence_extractions
  for each row execute function set_updated_at();

-- RLS: deferred to WP-03. Future policies scope to client_id, matter_id,
--      evidence_id, privilege_status, confidentiality_status.
