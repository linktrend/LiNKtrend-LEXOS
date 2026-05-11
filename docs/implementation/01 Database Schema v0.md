
# 01 Database Schema v0

## Document Status

**Document Name:** Database Schema v0  
**Version:** v0.1  
**Project:** LiNKtrend LEXOS  
**Purpose:** Define the first buildable database schema for the LEXOS MVP.  
**Primary Audience:** Cursor Composer, Codex worker agents, Supabase implementation agent, human technical operator.  
**Authoritative Architecture Source:** `docs/lexos-system-spec/02 LEXOS Canonical Object Model.md`  
**Primary MVP Source:** `docs/lexos-system-spec/08 LEXOS MVP Scope and Build Specification.md`  
**Primary Technical Source:** `docs/lexos-system-spec/09 LEXOS Technical Implementation Architecture.md`  
**Primary QA Source:** `docs/lexos-system-spec/12 LEXOS Testing, Evaluation, and Quality Assurance Specification.md`

---

# 1. Purpose

This document defines the initial LEXOS MVP database schema.

The purpose is to give coding agents a clear first schema target for Supabase Postgres.

This schema must support:

- W0-lite intake, if enabled;
- Client Records;
- Matter Records;
- W2 Case Story;
- W4-lite Enhanced Evidence Ingest;
- Evidence Extraction;
- optional Embedding Chunks;
- Assertions;
- Support Matrix;
- Strategy Memos;
- Research Memos;
- Argument Drafts;
- Adversarial Critiques;
- Revised Output Artifacts;
- Risks;
- Workflow State;
- Agent Outputs;
- Audit Events.

This document is not the final production schema. It is the first buildable MVP schema.

---

# 2. Schema Doctrine

## 2.1 Object-Centric Schema

LEXOS must not store legal work only as chat messages or unstructured blobs.

The schema must preserve canonical legal objects:

- Client;
- Matter;
- Evidence;
- Evidence Extraction;
- Assertion;
- Risk;
- Artifact;
- Workflow State;
- Agent Output;
- Audit Event.

## 2.2 Matter Scope Is Mandatory

Matter-scoped records must include `matter_id`.

Client-scoped records must include `client_id`.

Sensitive derived objects should normally include both `client_id` and `matter_id`.

## 2.3 Evidence and Extraction Are Separate

Original evidence and extracted content are different objects.

The original file is the evidentiary anchor.

Markdown, JSON, OCR, transcripts, visual descriptions, embeddings, and summaries are derived artifacts.

## 2.4 Embeddings Are Retrieval Aids

Embeddings are not evidence.

Embedding chunks must always link back to their source object, Evidence Object, and Evidence Extraction Object where applicable.

## 2.5 W0 Intake Is Ephemeral Until Accepted

W0 intake data must not become persistent W1 client memory until the intake is accepted and handed off.

Unrelated prospective clients must use separate `intake_id` values.

Related prospective clients may be grouped through an `intake_group_id`.

## 2.6 Status Values Must Be Controlled

Use enums or controlled text values for:

- workflow status;
- evidence processing status;
- extraction quality status;
- truth state;
- support state;
- artifact status;
- risk severity;
- review status;
- intake status.

For MVP speed, controlled text with check constraints is acceptable.

---

# 3. Implementation Assumptions

## 3.1 Database

Use:

- Supabase Postgres;
- UUID primary keys;
- `created_at`;
- `updated_at`;
- foreign keys where practical;
- indexes on `client_id`, `matter_id`, status fields, and workflow fields.

## 3.2 Storage

Original evidence and large derived artifacts may be stored in Supabase Storage.

The database should store:

- storage URI/path;
- metadata;
- status;
- provenance;
- quality flags;
- links between objects.

## 3.3 JSONB

Use `jsonb` for flexible metadata and structured extraction payloads where necessary.

Do not use JSONB to avoid modeling core objects.

JSONB is acceptable for:

- extraction JSON;
- metadata;
- model/tool payloads;
- quality flags;
- prompt inputs/outputs;
- flexible legal authority/source data in MVP.

## 3.4 RLS

MVP may start with service-layer access control, but schema must support future RLS.

Tables should include enough fields for RLS:

- `tenant_id`, optional for future;
- `client_id`;
- `matter_id`;
- `created_by`;
- `assigned_user_id`;
- `privilege_status`;
- `confidentiality_status`.

For MVP single-tenant use, `tenant_id` may be nullable or omitted initially. If included, use it consistently.

---

# 4. Common Fields

Most tables should include:

```text
id
created_at
updated_at
created_by
updated_by
status
notes
````

Matter-scoped tables should include:

```text
client_id
matter_id
privilege_status
confidentiality_status
```

Generated/derived tables should include:

```text
source_object_type
source_object_id
model_used
tool_used
prompt_version
workflow_origin
quality_status
human_review_required
```

Not every table requires every common field. Use judgment, but do not omit `client_id` / `matter_id` where legal isolation requires them.

---

# 5. Required MVP Tables

The MVP schema should include these tables:

```text
user_profiles

intake_records
client_candidates
matter_candidates
intake_groups
intake_tasks

clients
matters

sources
evidence
evidence_extractions
embedding_chunks

case_stories
assertions
support_matrix_items

strategy_memos
research_memos
argument_drafts
adversarial_critiques
output_artifacts

risks
workflow_states
agent_outputs
audit_events
tool_calls
model_runs
```

Some tables can be implemented after the first migration if required, but the schema plan should account for them from the beginning.

---

# 6. Enums / Controlled Values

Use database enums or check constraints. For early MVP, check constraints are acceptable.

## 6.1 User Role

```text
admin
operator
reviewer
read_only
system_agent
```

## 6.2 Intake Status

```text
new
in_progress
waiting_for_information
conflict_check_pending
kyc_pending
engagement_pending
lead_attorney_review
accepted
rejected
abandoned
archived
```

## 6.3 Conflict Status

```text
unknown
pending
clear
potential_conflict
conflict_identified
waiver_required
blocked
```

## 6.4 KYC Status

```text
unknown
not_required
pending
in_progress
passed
failed
requires_review
```

## 6.5 Engagement Status

```text
not_started
pending
sent
signed
declined
not_required
blocked
```

## 6.6 Matter Posture

```text
plaintiff
defence
defense
regulatory
criminal_defence
commercial_dispute
advisory
internal
unknown
```

Note: Use one canonical spelling in the database. Recommended canonical value: `defence`, because existing LEXOS docs use defence-side framing. If UI needs US spelling, map display labels separately.

## 6.7 Matter Status

```text
draft
active
paused
blocked
under_review
closed
archived
```

## 6.8 Workflow Name

```text
W0
W1
W2
W3
W4
W5
W6
W7
W8
W9
W10
W11
```

## 6.9 Workflow Status

```text
not_started
active
waiting_for_input
blocked
under_review
complete
returned_for_revision
archived
```

## 6.10 Evidence Processing Status

MVP-required values:

```text
uploaded
queued
processing
processed
qa_flagged
failed
requires_human_review
superseded
```

Optional extension values:

```text
requires_reupload
archived
```

## 6.11 Extraction Quality Status

MVP-required values:

```text
accepted
qa_flagged
failed
human_review_required
```

## 6.12 Evidence Media Type

```text
pdf
docx
txt
markdown
image
screenshot
audio
video
spreadsheet
email_export
message_export
unknown
```

## 6.13 Extraction Type

```text
text_document
scanned_document
image_with_text
image_without_text
audio_transcript
video_transcript
video_visual_timeline
metadata_only
manual_extraction
```

## 6.14 Truth State

```text
verified
client_confirmed
opposing_party_alleged
partially_supported
pending_verification
unsupported
contradicted
rejected
superseded
```

## 6.15 Support State

```text
supported
partially_supported
unsupported
contradicted
pending
```

## 6.16 Use Status

```text
usable
use_with_caution
do_not_use
pending_review
superseded
```

## 6.17 Risk Severity

```text
low
moderate
high
critical
```

## 6.18 Risk Status

```text
open
mitigated
accepted
closed
superseded
```

## 6.19 Artifact Status

```text
draft
under_review
approved_internal
final_internal
superseded
archived
```

## 6.20 Review Status

```text
not_reviewed
under_review
approved
approved_with_changes
rejected
needs_more_evidence
needs_more_research
needs_client_clarification
risk_accepted
deferred
```

## 6.21 Agent Run Status

```text
queued
running
completed
failed
cancelled
needs_review
```

## 6.22 Privilege Status

```text
unknown
not_privileged
potentially_privileged
privileged
work_product
restricted
```

## 6.23 Confidentiality Status

```text
unknown
public
internal
confidential
highly_confidential
restricted
```

---

# 7. Table Definitions

The following are logical table definitions. Coding agents should convert them into Supabase migrations.

---

# 7.1 `user_profiles`

Purpose:

Store application user profile and role data.

Fields:

```text
id uuid primary key references auth.users(id)
email text
display_name text
role text
status text
created_at timestamptz
updated_at timestamptz
```

Indexes:

```text
role
status
email
```

Notes:

* Supabase Auth stores authentication.
* `user_profiles` stores app-specific role and display metadata.

---

# 7.2 `intake_records`

Purpose:

Store W0 intake workflow records.

Fields:

```text
id uuid primary key
intake_type text
intake_status text
source text
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
assigned_operator uuid
urgency_level text
conflict_status text
kyc_status text
engagement_status text
lead_attorney_review_status text
handoff_status text
accepted_at timestamptz
rejected_at timestamptz
abandoned_at timestamptz
notes text
metadata jsonb
```

Relationships:

```text
created_by -> user_profiles.id
assigned_operator -> user_profiles.id
```

Indexes:

```text
intake_status
conflict_status
kyc_status
engagement_status
assigned_operator
created_at
```

Rules:

* Every W0 intake gets one `intake_records.id`.
* Multiple unrelated prospective clients must use separate intake records.
* Accepted intake may produce Client and Matter records.
* Rejected/abandoned intake must not automatically create persistent W1 client memory.

---

# 7.3 `intake_groups`

Purpose:

Represent related prospective clients in the same matter or related onboarding.

Fields:

```text
id uuid primary key
intake_id uuid references intake_records(id)
relationship_type text
shared_matter_candidate_id uuid
joint_representation_flag boolean
potential_internal_conflict_flag boolean
group_conflict_status text
group_consent_status text
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
notes text
metadata jsonb
```

Indexes:

```text
intake_id
joint_representation_flag
potential_internal_conflict_flag
group_conflict_status
```

Rules:

* Use for co-defendants, joint plaintiffs, company/director, spouse pairs, investor groups, buyer consortiums, or related parties.
* Each Client Candidate inside the group still requires separate checks.

---

# 7.4 `client_candidates`

Purpose:

Store prospective client records during W0 before formal client creation.

Fields:

```text
id uuid primary key
intake_id uuid references intake_records(id)
intake_group_id uuid references intake_groups(id)
name text
client_type text
contact_details jsonb
identity_status text
kyc_status text
conflict_status text
authority_status text
representative_status text
engagement_status text
consent_status text
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
notes text
metadata jsonb
```

Indexes:

```text
intake_id
intake_group_id
name
client_type
kyc_status
conflict_status
engagement_status
```

Rules:

* Client Candidate facts are not persistent Client Facts.
* Client Candidate may become Client only after accepted onboarding.

---

# 7.5 `matter_candidates`

Purpose:

Store candidate matter records during W0 before formal matter creation.

Fields:

```text
id uuid primary key
intake_id uuid references intake_records(id)
intake_group_id uuid references intake_groups(id)
proposed_matter_name text
matter_type text
posture text
jurisdiction text
adverse_parties jsonb
related_parties jsonb
deadline_flags jsonb
urgency_level text
engagement_status text
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
notes text
metadata jsonb
```

Indexes:

```text
intake_id
intake_group_id
posture
jurisdiction
urgency_level
engagement_status
```

Rules:

* Matter Candidate facts are not accepted Matter Facts.
* Accepted Matter Candidate may create a Matter record.

---

# 7.6 `intake_tasks`

Purpose:

Track W0 subagent/manual tasks.

Fields:

```text
id uuid primary key
intake_id uuid references intake_records(id)
intake_group_id uuid references intake_groups(id)
client_candidate_id uuid references client_candidates(id)
matter_candidate_id uuid references matter_candidates(id)
assigned_agent text
assigned_user_id uuid
task_type text
status text
result_summary text
risk_id uuid
created_at timestamptz
updated_at timestamptz
due_at timestamptz
completed_at timestamptz
metadata jsonb
```

Indexes:

```text
intake_id
intake_group_id
client_candidate_id
matter_candidate_id
assigned_agent
assigned_user_id
task_type
status
due_at
```

Rules:

* Intake tasks are scoped to one intake record or intake group.
* W0 subagents must not use unrelated intake context.

---

# 7.7 `clients`

Purpose:

Store accepted client records.

Fields:

```text
id uuid primary key
client_name text not null
client_type text
primary_contact jsonb
jurisdiction text
status text
client_master_story text
created_from_intake_id uuid references intake_records(id)
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
confidentiality_status text
privilege_status text
notes text
metadata jsonb
```

Indexes:

```text
client_name
client_type
status
created_from_intake_id
```

Rules:

* Client is created only after intake acceptance or authorized direct entry.
* Client Master Story must not automatically import all matter facts.

---

# 7.8 `matters`

Purpose:

Store legal matters under clients.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_name text not null
matter_type text
posture text
jurisdiction text
status text
current_workflow text
created_from_intake_id uuid references intake_records(id)
created_from_matter_candidate_id uuid references matter_candidates(id)
opened_at timestamptz
closed_at timestamptz
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
confidentiality_status text
privilege_status text
notes text
metadata jsonb
```

Indexes:

```text
client_id
matter_name
posture
jurisdiction
status
current_workflow
created_from_intake_id
```

Rules:

* Every matter belongs to a client.
* Matter scope controls retrieval, workflow, agents, evidence, and artifacts.

---

# 7.9 `sources`

Purpose:

Represent source containers or origins for evidence.

Examples:

* client upload;
* court file;
* opposing party production;
* prosecution file;
* email export;
* messaging export;
* public registry;
* manually entered source.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
source_name text
source_type text
provided_by text
received_at timestamptz
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
confidentiality_status text
privilege_status text
notes text
metadata jsonb
```

Indexes:

```text
client_id
matter_id
source_type
received_at
```

Rules:

* Evidence may link to a Source.
* Source does not replace Evidence Object.

---

# 7.10 `evidence`

Purpose:

Store canonical Evidence Objects.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
source_id uuid references sources(id)
evidence_label text
file_name text
file_type text
evidence_media_type text
source_type text
language text
original_file_uri text
original_file_hash text
processing_status text
extraction_status text
quality_status text
human_review_required boolean
uploaded_by uuid
uploaded_at timestamptz
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
confidentiality_status text
privilege_status text
legal_hold boolean
notes text
metadata_json jsonb
```

Indexes:

```text
client_id
matter_id
source_id
processing_status
extraction_status
quality_status
human_review_required
evidence_media_type
file_type
uploaded_at
legal_hold
```

Rules:

* Original file must be preserved unchanged.
* Evidence is not replaced by extraction.
* `original_file_hash` is optional in MVP but target-state required.
* Evidence deletion should be restricted; archive/supersede preferred.

---

# 7.11 `evidence_extractions`

Purpose:

Store derived extraction artifacts from Evidence.

Fields:

```text
id uuid primary key
evidence_id uuid references evidence(id)
client_id uuid references clients(id)
matter_id uuid references matters(id)
extraction_type text
markdown_uri text
markdown_text text
json_uri text
json_content jsonb
transcript_uri text
transcript_json jsonb
visual_description text
ocr_text text
timecoded_segments jsonb
frame_references jsonb
extraction_tool text
extraction_model text
qa_model text
extraction_quality_score numeric
extraction_quality_status text
quality_flags jsonb
human_review_required boolean
is_current boolean
supersedes_extraction_id uuid references evidence_extractions(id)
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
confidentiality_status text
privilege_status text
notes text
metadata jsonb
```

Indexes:

```text
evidence_id
client_id
matter_id
extraction_type
extraction_quality_status
human_review_required
is_current
created_at
```

Rules:

* Extraction is derivative, not original evidence.
* Supported files should produce markdown and structured JSON where applicable.
* Raw OCR-only output is not accepted final extraction for document-like evidence where structure matters unless QA-flagged or human-reviewed.
* Failed or QA-flagged extraction must not silently support assertions.

---

# 7.12 `embedding_chunks`

Purpose:

Store vector chunks for retrieval.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
evidence_id uuid references evidence(id)
extraction_id uuid references evidence_extractions(id)
source_object_type text
source_object_id uuid
chunk_text text
chunk_index integer
page_reference text
timecode_reference text
frame_reference text
language text
privilege_status text
confidentiality_status text
embedding_model text
embedding_vector vector
is_current boolean
created_at timestamptz
metadata jsonb
```

Indexes:

```text
client_id
matter_id
evidence_id
extraction_id
source_object_type
source_object_id
is_current
language
privilege_status
confidentiality_status
```

Vector index:

```text
embedding_vector
```

Rules:

* Requires pgvector extension.
* Embeddings are retrieval aids, not evidence.
* Retrieval must filter by `client_id`, `matter_id`, privilege, confidentiality, and current status before vector similarity.
* Low-quality extraction chunks should be excluded from normal retrieval or flagged.

---

# 7.13 `case_stories`

Purpose:

Store W2 Case Story artifacts.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
title text
content_markdown text
version integer
status text
workflow_origin text
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
model_used text
prompt_version text
confidentiality_status text
privilege_status text
notes text
metadata jsonb
```

Indexes:

```text
client_id
matter_id
status
version
workflow_origin
created_at
```

Rules:

* Client narrative is not verified by default.
* Case Story should generate Assertions.

---

# 7.14 `assertions`

Purpose:

Store atomic factual/legal assertions.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
case_story_id uuid references case_stories(id)
assertion_text text not null
assertion_type text
truth_state text
support_state text
use_status text
contradiction_flag boolean
confidence numeric
source_ids jsonb
evidence_ids jsonb
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
confidentiality_status text
privilege_status text
notes text
metadata jsonb
```

Indexes:

```text
client_id
matter_id
case_story_id
truth_state
support_state
use_status
contradiction_flag
created_at
```

Rules:

* Assertions must be atomic.
* Client narrative assertions are not verified facts.
* Opposing allegations must be classified as allegations.
* Supported assertions require support links in support matrix.

---

# 7.15 `support_matrix_items`

Purpose:

Link assertions to evidence and support reasoning.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
assertion_id uuid references assertions(id)
evidence_id uuid references evidence(id)
extraction_id uuid references evidence_extractions(id)
support_state text
support_explanation text
evidence_excerpt text
page_reference text
timecode_reference text
frame_reference text
risk_level text
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
confidentiality_status text
privilege_status text
notes text
metadata jsonb
```

Indexes:

```text
client_id
matter_id
assertion_id
evidence_id
extraction_id
support_state
risk_level
```

Rules:

* Supported assertions must have evidence/source support.
* QA-flagged or failed extraction should not be treated as reliable support without visible caveat.
* This table is central to W5.

---

# 7.16 `risks`

Purpose:

Store legal, factual, evidentiary, workflow, security, and operational risks.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
risk_title text
risk_type text
severity text
status text
linked_object_type text
linked_object_id uuid
description text
mitigation text
owner_user_id uuid
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
confidentiality_status text
privilege_status text
notes text
metadata jsonb
```

Indexes:

```text
client_id
matter_id
severity
status
risk_type
linked_object_type
linked_object_id
owner_user_id
created_at
```

Rules:

* Unsupported core facts, contradictions, failed extractions, unclear jurisdiction, and privilege issues should create or update risks.

---

# 7.17 `strategy_memos`

Purpose:

Store W6 Strategy Memos.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
title text
content_markdown text
strategy_points jsonb
research_questions jsonb
version integer
status text
workflow_origin text
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
model_used text
prompt_version text
confidentiality_status text
privilege_status text
notes text
metadata jsonb
```

Indexes:

```text
client_id
matter_id
status
version
created_at
```

Rules:

* Strategy must be based on support matrix and risks.
* Unsupported assumptions must be visible.

---

# 7.18 `research_memos`

Purpose:

Store W7 Research Memos.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
title text
research_question text
jurisdiction text
short_answer text
content_markdown text
authorities jsonb
adverse_authority_note text
limitations text
verification_status text
version integer
status text
workflow_origin text
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
model_used text
prompt_version text
confidentiality_status text
privilege_status text
notes text
metadata jsonb
```

Indexes:

```text
client_id
matter_id
jurisdiction
verification_status
status
version
created_at
```

Rules:

* Legal research must state jurisdiction.
* Unverified citations must be labeled.
* Research is not filing-ready unless verified.

---

# 7.19 `argument_drafts`

Purpose:

Store W8 Argument Drafts.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
title text
intended_audience text
content_markdown text
strategy_memo_id uuid references strategy_memos(id)
research_memo_id uuid references research_memos(id)
version integer
status text
workflow_origin text
unsupported_claims jsonb
source_basis jsonb
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
model_used text
prompt_version text
confidentiality_status text
privilege_status text
notes text
metadata jsonb
```

Indexes:

```text
client_id
matter_id
strategy_memo_id
research_memo_id
status
version
created_at
```

Rules:

* Draft status must not imply filing-ready.
* W8 routes to W9.

---

# 7.20 `adversarial_critiques`

Purpose:

Store W9 Adversarial Critiques.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
argument_draft_id uuid references argument_drafts(id)
title text
content_markdown text
attack_matrix jsonb
loop_decision text
severity_summary text
version integer
status text
workflow_origin text
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
model_used text
prompt_version text
confidentiality_status text
privilege_status text
notes text
metadata jsonb
```

Indexes:

```text
client_id
matter_id
argument_draft_id
loop_decision
status
version
created_at
```

Rules:

* W9 is mandatory in MVP.
* W9 must be non-deferential.
* Critical issues must remain visible.

---

# 7.21 `output_artifacts`

Purpose:

Store generated/revised work product artifacts.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
artifact_type text
title text
content_markdown text
content_uri text
workflow_origin text
status text
version integer
supersedes_artifact_id uuid references output_artifacts(id)
source_ids jsonb
evidence_ids jsonb
assertion_ids jsonb
risk_ids jsonb
review_status text
reviewed_by uuid
reviewed_at timestamptz
created_at timestamptz
updated_at timestamptz
created_by uuid
updated_by uuid
model_used text
prompt_version text
confidentiality_status text
privilege_status text
notes text
metadata jsonb
```

Indexes:

```text
client_id
matter_id
artifact_type
workflow_origin
status
version
review_status
created_at
```

Rules:

* Artifact status controls finality.
* Export does not imply approval.
* Superseded versions must remain traceable.

---

# 7.22 `workflow_states`

Purpose:

Store active workflow status per matter.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
current_workflow text
workflow_status text
last_completed_step text
next_action text
blocked_flag boolean
block_reason text
assigned_agent text
assigned_user_id uuid
created_at timestamptz
updated_at timestamptz
metadata jsonb
```

Indexes:

```text
client_id
matter_id
current_workflow
workflow_status
blocked_flag
assigned_user_id
updated_at
```

Rules:

* Every active matter should have workflow state.
* Workflow completion requires required outputs, not just generated text.

---

# 7.23 `agent_outputs`

Purpose:

Store major AI agent outputs.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
intake_id uuid references intake_records(id)
agent_name text
agent_role text
workflow text
status text
input_object_refs jsonb
output_object_refs jsonb
output_markdown text
output_json jsonb
model_used text
prompt_version text
tool_calls jsonb
error_message text
started_at timestamptz
completed_at timestamptz
created_at timestamptz
confidentiality_status text
privilege_status text
metadata jsonb
```

Indexes:

```text
client_id
matter_id
intake_id
agent_name
workflow
status
created_at
```

Rules:

* Major agent outputs must be traceable.
* Failed agent runs must not disappear.

---

# 7.24 `audit_events`

Purpose:

Store material audit events.

Fields:

```text
id uuid primary key
event_type text
actor_type text
actor_id uuid
client_id uuid references clients(id)
matter_id uuid references matters(id)
intake_id uuid references intake_records(id)
target_object_type text
target_object_id uuid
summary text
created_at timestamptz
metadata jsonb
```

Indexes:

```text
event_type
actor_type
actor_id
client_id
matter_id
intake_id
target_object_type
target_object_id
created_at
```

Rules:

Audit events should be created for:

* client created/updated;
* matter created/updated;
* intake accepted/rejected/abandoned;
* evidence uploaded;
* extraction created;
* extraction failed/QA flagged;
* assertion created/updated;
* support state changed;
* artifact generated/status changed;
* risk created/updated;
* workflow changed;
* agent output generated;
* export if implemented.

---

# 7.25 `tool_calls`

Purpose:

Store material tool calls.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
intake_id uuid references intake_records(id)
tool_name text
tool_type text
workflow text
actor_type text
actor_id uuid
input_summary text
input_object_refs jsonb
output_summary text
output_object_refs jsonb
status text
error_message text
started_at timestamptz
completed_at timestamptz
created_at timestamptz
metadata jsonb
```

Indexes:

```text
client_id
matter_id
intake_id
tool_name
tool_type
workflow
status
created_at
```

Rules:

* Do not store sensitive full prompts or evidence text in insecure logs.
* Material tool failures must remain visible.

---

# 7.26 `model_runs`

Purpose:

Store material model usage records.

Fields:

```text
id uuid primary key
client_id uuid references clients(id)
matter_id uuid references matters(id)
intake_id uuid references intake_records(id)
model_provider text
model_name text
model_version text
workflow text
agent_name text
prompt_version text
input_object_refs jsonb
output_object_refs jsonb
token_input integer
token_output integer
cost_estimate numeric
latency_ms integer
status text
error_message text
created_at timestamptz
metadata jsonb
```

Indexes:

```text
client_id
matter_id
intake_id
model_provider
model_name
workflow
agent_name
status
created_at
```

Rules:

* Store model metadata for major outputs.
* Avoid storing full privileged prompt content unless secured.

---

# 8. Relationship Summary

## 8.1 W0 Relationships

```text
intake_records
  → client_candidates
  → matter_candidates
  → intake_groups
  → intake_tasks
```

Accepted W0 creates:

```text
clients
matters
workflow_states
```

Rejected/abandoned W0 does not create W1 persistent memory.

## 8.2 Client / Matter Relationships

```text
clients
  → matters
  → sources
  → evidence
  → evidence_extractions
  → embedding_chunks
```

## 8.3 Story / Support Relationships

```text
matters
  → case_stories
  → assertions
  → support_matrix_items
  → evidence / evidence_extractions
```

## 8.4 Strategy / Drafting Relationships

```text
support_matrix_items
  → strategy_memos
  → research_memos
  → argument_drafts
  → adversarial_critiques
  → output_artifacts
```

## 8.5 Cross-Cutting Relationships

```text
risks
workflow_states
agent_outputs
audit_events
tool_calls
model_runs
```

These may link to any major object through `linked_object_type`, `target_object_type`, object refs, or metadata.

---

# 9. Required Indexes

At minimum, index:

```text
client_id
matter_id
intake_id
status
created_at
updated_at
current_workflow
workflow_status
processing_status
extraction_quality_status
truth_state
support_state
artifact_type
risk severity/status
```

For vector search, create a vector index on:

```text
embedding_chunks.embedding_vector
```

with the chosen pgvector index type.

---

# 10. Required Extensions

Likely required:

```sql
create extension if not exists "uuid-ossp";
create extension if not exists vector;
```

Optional:

```sql
create extension if not exists pgcrypto;
```

Use Supabase-compatible extension syntax.

---

# 11. Storage Buckets

Recommended Supabase Storage buckets:

```text
evidence-originals
evidence-extractions
artifacts
exports
temporary-processing
```

MVP may combine buckets if implementation requires, but metadata/path structure must preserve:

```text
client_id
matter_id
evidence_id
extraction_id
artifact_id
```

Recommended paths:

```text
client/{client_id}/matter/{matter_id}/evidence/{evidence_id}/original/{filename}
client/{client_id}/matter/{matter_id}/evidence/{evidence_id}/extraction/{extraction_id}.md
client/{client_id}/matter/{matter_id}/artifacts/{artifact_id}/v{version}.{ext}
```

---

# 12. RLS / Security Notes

MVP may initially enforce access in the service layer, but schema should support future RLS.

Future RLS policies should enforce:

* authenticated users only;
* client/matter access;
* intake access;
* role permissions;
* privilege/confidentiality compatibility;
* no cross-matter retrieval by default;
* service-role restricted to server-side operations.

Do not expose Supabase service-role key client-side.

---

# 13. Migration Strategy

## 13.1 First Migration

The first migration should create:

1. extensions;
2. controlled enums/check constraints or enum tables;
3. user_profiles;
4. intake tables;
5. clients;
6. matters;
7. sources;
8. evidence;
9. evidence_extractions;
10. assertions;
11. support_matrix_items;
12. risks;
13. workflow_states;
14. core artifact tables;
15. audit_events;
16. tool/model logs.

## 13.2 Practical Implementation Note

If the first migration is too large, split into:

```text
001_extensions_and_enums.sql
002_identity_intake_clients_matters.sql
003_evidence_and_extractions.sql
004_assertions_support_risks.sql
005_artifacts_workflows_audit.sql
006_embeddings_tool_model_logs.sql
```

---

# 14. Seed Data

Create optional seed data for development:

* one admin user profile placeholder;
* one sample client;
* one sample matter;
* one sample workflow state;
* one sample evidence metadata record;
* one sample assertion;
* one sample risk.

Do not seed real legal data.

---

# 15. Schema Acceptance Criteria

The schema is accepted when:

1. all required MVP tables exist;
2. core foreign keys exist;
3. matter-scoped records include `matter_id`;
4. client-scoped records include `client_id`;
5. evidence and extraction are separate;
6. extraction quality status is represented;
7. human review flag exists for evidence/extractions;
8. embedding chunks link to `evidence_id` and `extraction_id`;
9. assertions have truth/support states;
10. support matrix links assertions to evidence/extractions;
11. artifacts have status/version;
12. workflow state exists per matter;
13. risks can link to matter and object;
14. agent/model/tool outputs can be logged;
15. audit events can be created;
16. W0 intake objects support isolated multi-client intake.

---

# 16. Schema Red Lines

Do not implement a schema that:

1. stores evidence only as file paths;
2. merges evidence and extraction into one object;
3. omits `matter_id` from evidence, assertions, artifacts, or risks;
4. omits `extraction_id` from embedding chunks;
5. omits truth/support states;
6. omits workflow state;
7. omits artifact status;
8. treats embeddings as evidence;
9. treats raw OCR as accepted extraction without QA/review fields;
10. creates W1 client memory directly from rejected/abandoned intake;
11. makes global retrieval the default;
12. lacks audit events for material actions.

---

# 17. First Coding Task Prompt

When ready to implement this schema, give Cursor or Codex a task similar to:

```markdown
You are implementing the initial Supabase database schema for LEXOS.

Read:
- docs/implementation/01 Database Schema v0.md
- docs/implementation/00 MVP Implementation Roadmap.md
- docs/lexos-system-spec/02 LEXOS Canonical Object Model.md
- docs/lexos-system-spec/08 LEXOS MVP Scope and Build Specification.md
- docs/lexos-system-spec/09 LEXOS Technical Implementation Architecture.md

Task:
Create Supabase migration files for the MVP schema.

Do not create UI.
Do not create app logic.
Do not remove or edit documentation.
Do not use real legal data.

Deliver:
- migration files under supabase/migrations
- optional seed file under supabase/seed
- short report explaining tables, enums/checks, indexes, and any deviations.
```

---

# 18. Next Step

After this schema document, create:

```text
docs/implementation/02 W4-lite Enhanced Ingestion Build Spec.md
```

That document controls the critical evidence ingestion implementation.

