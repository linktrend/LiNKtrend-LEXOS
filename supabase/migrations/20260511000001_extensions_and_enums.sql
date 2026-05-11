-- =============================================================================
-- LEXOS MVP — Migration 001: Extensions, Triggers, Controlled Values
-- Schema authority: docs/implementation/01 Database Schema v0.md
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "uuid-ossp";
create extension if not exists "vector";   -- pgvector; required for embedding_chunks
-- create extension if not exists "pgcrypto"; -- optional; uncomment if needed

-- ---------------------------------------------------------------------------
-- Shared updated_at trigger function
-- Applied per-table below; later tables reference this function.
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Controlled value documentation (§6 of schema doc)
-- These comments are the canonical source of allowed check-constraint values.
-- Each table column references the relevant section.
-- ---------------------------------------------------------------------------

-- §6.1  user_role         : admin | operator | reviewer | read_only | system_agent
-- §6.2  intake_status     : new | in_progress | waiting_for_information | conflict_check_pending
--                           kyc_pending | engagement_pending | lead_attorney_review
--                           accepted | rejected | abandoned | archived
-- §6.3  conflict_status   : unknown | pending | clear | potential_conflict
--                           conflict_identified | waiver_required | blocked
-- §6.4  kyc_status        : unknown | not_required | pending | in_progress
--                           passed | failed | requires_review
-- §6.5  engagement_status : not_started | pending | sent | signed | declined
--                           not_required | blocked
-- §6.6  matter_posture    : plaintiff | defence | defense | regulatory
--                           criminal_defence | commercial_dispute | advisory | internal | unknown
--                           (canonical DB value: 'defence'; map display labels in UI)
-- §6.7  matter_status     : draft | active | paused | blocked | under_review | closed | archived
-- §6.8  workflow_name     : W0 | W1 | W2 | W3 | W4 | W5 | W6 | W7 | W8 | W9 | W10 | W11
-- §6.9  workflow_status   : not_started | active | waiting_for_input | blocked
--                           under_review | complete | returned_for_revision | archived
-- §6.10 evidence_processing_status :
--                           uploaded | queued | processing | processed
--                           qa_flagged | failed | requires_human_review | superseded
--                           (optional: requires_reupload | archived)
-- §6.11 extraction_quality_status : accepted | qa_flagged | failed | human_review_required
-- §6.12 evidence_media_type :
--                           pdf | docx | txt | markdown | image | screenshot
--                           audio | video | spreadsheet | email_export | message_export | unknown
-- §6.13 extraction_type   : text_document | scanned_document | image_with_text
--                           image_without_text | audio_transcript | video_transcript
--                           video_visual_timeline | metadata_only | manual_extraction
-- §6.14 truth_state       : verified | client_confirmed | opposing_party_alleged
--                           partially_supported | pending_verification | unsupported
--                           contradicted | rejected | superseded
-- §6.15 support_state     : supported | partially_supported | unsupported | contradicted | pending
-- §6.16 use_status        : usable | use_with_caution | do_not_use | pending_review | superseded
-- §6.17 risk_severity     : low | moderate | high | critical
-- §6.18 risk_status       : open | mitigated | accepted | closed | superseded
-- §6.19 artifact_status   : draft | under_review | approved_internal | final_internal
--                           superseded | archived
-- §6.20 review_status     : not_reviewed | under_review | approved | approved_with_changes
--                           rejected | needs_more_evidence | needs_more_research
--                           needs_client_clarification | risk_accepted | deferred
-- §6.21 agent_run_status  : queued | running | completed | failed | cancelled | needs_review
-- §6.22 privilege_status  : unknown | not_privileged | potentially_privileged | privileged
--                           work_product | restricted
-- §6.23 confidentiality_status : unknown | public | internal | confidential
--                                highly_confidential | restricted
