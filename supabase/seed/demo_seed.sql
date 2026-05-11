-- =============================================================================
-- LEXOS MVP — Demo Seed Data
-- DEMO ONLY / fake data — no real legal data, no real persons, no real matters.
-- =============================================================================

-- user_profiles: SKIPPED intentionally.
-- user_profiles.id references auth.users(id). A fake UUID seed row will fail with
-- a foreign key violation unless the matching Supabase Auth user exists.
-- To seed a user profile after creating a dev auth user, run:
--
--   INSERT INTO user_profiles (id, email, display_name, role, status)
--   VALUES ('<paste-auth-user-uuid>', 'demo@example.invalid', 'Demo Admin', 'admin', 'active');

-- ---------------------------------------------------------------------------
-- Demo client
-- ---------------------------------------------------------------------------
INSERT INTO clients (
  id,
  client_name,
  client_type,
  status,
  confidentiality_status,
  privilege_status,
  notes
) VALUES (
  'aaaaaaaa-0000-0000-0000-000000000001',
  'Demo Client Ltd',
  'company',
  'active',
  'internal',
  'unknown',
  'DEMO ONLY — fake data'
)
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Demo matter
-- ---------------------------------------------------------------------------
INSERT INTO matters (
  id,
  client_id,
  matter_name,
  matter_type,
  posture,
  jurisdiction,
  status,
  current_workflow,
  confidentiality_status,
  privilege_status,
  notes
) VALUES (
  'bbbbbbbb-0000-0000-0000-000000000001',
  'aaaaaaaa-0000-0000-0000-000000000001',
  'Demo Matter 001',
  'commercial_dispute',
  'plaintiff',
  'England and Wales',
  'active',
  'W2',
  'confidential',
  'work_product',
  'DEMO ONLY — fake data'
)
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Demo workflow state
-- ---------------------------------------------------------------------------
INSERT INTO workflow_states (
  id,
  client_id,
  matter_id,
  current_workflow,
  workflow_status,
  next_action,
  blocked_flag
) VALUES (
  'cccccccc-0000-0000-0000-000000000001',
  'aaaaaaaa-0000-0000-0000-000000000001',
  'bbbbbbbb-0000-0000-0000-000000000001',
  'W2',
  'active',
  'Draft initial case story',
  false
)
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Demo evidence (metadata only — no real file)
-- ---------------------------------------------------------------------------
INSERT INTO evidence (
  id,
  client_id,
  matter_id,
  evidence_label,
  file_name,
  file_type,
  evidence_media_type,
  original_file_uri,
  processing_status,
  human_review_required,
  confidentiality_status,
  privilege_status,
  notes
) VALUES (
  'dddddddd-0000-0000-0000-000000000001',
  'aaaaaaaa-0000-0000-0000-000000000001',
  'bbbbbbbb-0000-0000-0000-000000000001',
  'Demo contract document',
  'demo_contract.pdf',
  'pdf',
  'pdf',
  'demo://placeholder/no-real-file',
  'uploaded',
  true,
  'confidential',
  'work_product',
  'DEMO ONLY — fake data, no real file'
)
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Demo assertion
-- ---------------------------------------------------------------------------
INSERT INTO assertions (
  id,
  client_id,
  matter_id,
  assertion_text,
  assertion_type,
  truth_state,
  support_state,
  use_status,
  contradiction_flag,
  confidentiality_status,
  privilege_status,
  notes
) VALUES (
  'eeeeeeee-0000-0000-0000-000000000001',
  'aaaaaaaa-0000-0000-0000-000000000001',
  'bbbbbbbb-0000-0000-0000-000000000001',
  'The parties entered into a written agreement on [DEMO DATE].',
  'factual',
  'pending_verification',
  'pending',
  'pending_review',
  false,
  'confidential',
  'work_product',
  'DEMO ONLY — fake assertion, no real legal content'
)
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Demo risk
-- ---------------------------------------------------------------------------
INSERT INTO risks (
  id,
  client_id,
  matter_id,
  risk_title,
  risk_type,
  severity,
  status,
  description,
  confidentiality_status,
  privilege_status,
  notes
) VALUES (
  'ffffffff-0000-0000-0000-000000000001',
  'aaaaaaaa-0000-0000-0000-000000000001',
  'bbbbbbbb-0000-0000-0000-000000000001',
  'Key assertion pending verification',
  'evidentiary',
  'moderate',
  'open',
  'Primary factual assertion has not yet been verified against evidence.',
  'confidential',
  'work_product',
  'DEMO ONLY — fake risk, no real legal content'
)
ON CONFLICT (id) DO NOTHING;
