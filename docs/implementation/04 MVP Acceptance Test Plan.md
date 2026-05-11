
# 04 MVP Acceptance Test Plan

## Document Status

**Document Name:** MVP Acceptance Test Plan  
**Version:** v0.1  
**Project:** LiNKtrend LEXOS  
**Purpose:** Define the acceptance criteria, test scenarios, failure conditions, and validation process for the LEXOS MVP.  
**Primary Audience:** Cursor Composer, Codex worker agents, QA agent, human technical operator, implementation reviewer.  
**Authoritative QA Source:** `docs/lexos-system-spec/12 LEXOS Testing, Evaluation, and Quality Assurance Specification.md`  
**Primary MVP Source:** `docs/lexos-system-spec/08 LEXOS MVP Scope and Build Specification.md`  
**Primary Technical Source:** `docs/lexos-system-spec/09 LEXOS Technical Implementation Architecture.md`  
**Primary Workflow Source:** `docs/lexos-system-spec/05 LEXOS Workflow Specification.md`  
**Primary Schema Source:** `docs/implementation/01 Database Schema v0.md`  
**Primary W4 Source:** `docs/implementation/02 W4-lite Enhanced Ingestion Build Spec.md`

---

# 1. Purpose

This document defines how the LEXOS MVP will be accepted.

The MVP is accepted only if it proves the core legal cognition spine:

```text
Client → Matter → Case Story → Evidence → Evidence Extraction → Assertions → Support Matrix → Strategy → Research → Argument Draft → Adversarial Review → Revised Output
````

The MVP must not be accepted merely because the UI looks complete or the system can generate fluent text.

LEXOS quality is measured by whether legal cognition is:

* structured;
* matter-scoped;
* evidence-grounded;
* traceable;
* workflow-controlled;
* risk-visible;
* adversarially tested;
* auditable;
* secure enough for internal MVP use.

---

# 2. Acceptance Doctrine

## 2.1 Fluency Is Not Acceptance

Generated prose is not enough.

An argument draft is acceptable only if the user can trace material claims back to:

```text
Argument section → Assertion → Evidence Extraction → Evidence Object → Original File
```

## 2.2 Evidence Ingestion Is a Gate

The MVP cannot pass if W4-lite is weak.

The system must prove enhanced evidence ingestion for supported file types:

* original file preservation;
* Evidence Object;
* Evidence Extraction Object;
* markdown extraction;
* structured JSON extraction;
* extraction quality status;
* human review flag;
* quality flags;
* no silent reliance on failed or QA-flagged extraction.

## 2.3 W9 Is Mandatory

The MVP cannot pass if W9 is skipped.

The MVP must produce an adversarial critique that identifies weaknesses, unsupported claims, evidence problems, legal/citation risks, and a loop decision.

## 2.4 Object Spine Controls Acceptance

The MVP fails if records exist only as generated text or file blobs.

The system must persist canonical objects.

## 2.5 Internal MVP Only

Passing this test means the system is acceptable for internal MVP experimentation.

It does not mean the system is ready for:

* external legal advice;
* client-facing autonomous use;
* court filing;
* regulator submission;
* autonomous external communication;
* production multi-tenant deployment.

---

# 3. MVP Acceptance Levels

## 3.1 Level 0 — Repo / Documentation Ready

Accepted when:

* docs are organized;
* implementation-control docs exist;
* project-state files exist;
* no app code required yet.

## 3.2 Level 1 — App Foundation Ready

Accepted when:

* app runs locally;
* environment variables are documented;
* Supabase connection is configured;
* app shell renders;
* no secrets are committed.

## 3.3 Level 2 — Object Spine Ready

Accepted when:

* schema exists;
* core tables exist;
* foreign keys and indexes exist where practical;
* clients and matters can be created;
* workflow state can be initialized;
* audit events can be created.

## 3.4 Level 3 — W4-lite Ready

Accepted when:

* evidence upload works;
* original files are preserved;
* Evidence Objects are created;
* Evidence Extraction Objects are created;
* markdown/JSON extraction exists for supported files;
* extraction quality status is visible;
* QA-flagged/failure states are visible.

## 3.5 Level 4 — Legal Cognition Spine Ready

Accepted when:

* assertions are extracted;
* support matrix exists;
* strategy memo exists;
* research memo exists;
* argument draft exists;
* W9 critique exists;
* revised output exists.

## 3.6 Level 5 — MVP Demo Ready

Accepted when:

* one full test matter runs end-to-end;
* risks are visible;
* workflow state is visible;
* artifacts have status/version;
* audit events exist;
* acceptance tests pass.

---

# 4. Required Test Matter

## 4.1 Purpose

The MVP requires at least one controlled test matter.

This test matter is used to validate the end-to-end legal cognition spine.

## 4.2 Test Matter Minimum Contents

The test matter must include:

* one Client;
* one Matter;
* one Case Story narrative;
* at least three Evidence Objects;
* at least three Evidence Extractions;
* at least ten Assertions;
* at least three supported Assertions;
* at least three unsupported Assertions;
* at least one partially supported Assertion;
* at least one contradiction or weakness;
* one Strategy Memo;
* one Research Memo;
* one Argument Draft;
* one Adversarial Critique;
* one Revised Output;
* at least one Risk;
* one Workflow State;
* audit events for material actions.

## 4.3 Recommended Evidence Types

The test matter should include:

1. one digital PDF or DOCX;
2. one screenshot/message-style evidence item, preferably a PDF composed of screenshots;
3. one simple TXT or markdown note.

If parser support is not yet available, the system may use controlled placeholder extraction, but it must still create Evidence Extraction Objects and quality statuses.

## 4.4 Messiness Requirement

The test matter must not be perfectly clean.

It should include at least one of:

* missing evidence;
* unsupported client claim;
* ambiguous date;
* weak document;
* QA-flagged extraction;
* contradicted assertion;
* research limitation;
* W9 critique blocker.

---

# 5. End-to-End MVP Acceptance Test

## 5.1 Test Name

`E2E_MVP_Legal_Cognition_Spine`

## 5.2 Objective

Prove that a matter can move through the MVP spine from Client creation to Revised Output.

## 5.3 Steps

1. Create Client.
2. Create Matter under Client.
3. Initialize Workflow State.
4. Enter Case Story narrative.
5. Generate Case Story Artifact.
6. Extract Assertions.
7. Upload Evidence.
8. Preserve original evidence file.
9. Create Evidence Object.
10. Create Evidence Extraction Object.
11. Generate markdown extraction.
12. Generate structured JSON extraction.
13. Assign processing status.
14. Assign extraction quality status.
15. Create or show quality flags.
16. Link Assertions to Evidence/Extraction.
17. Generate Support Matrix.
18. Generate Strategy Memo.
19. Generate Research Memo.
20. Generate Argument Draft.
21. Generate W9 Adversarial Critique.
22. Generate Revised Output.
23. View Risks.
24. View Workflow State.
25. View Artifact status/version.
26. View Audit Events.

## 5.4 Pass Criteria

The test passes if:

* all required objects are created;
* original evidence is preserved;
* markdown/JSON extraction exists where applicable;
* assertions are visible;
* support states are visible;
* unsupported facts are visible;
* risks are visible;
* W9 critique exists;
* revised output exists;
* workflow state updates;
* artifacts have status/version;
* audit events exist;
* no cross-matter retrieval occurs.

## 5.5 Fail Criteria

The test fails if:

* evidence exists only as files;
* Evidence Extraction Object is missing;
* markdown/JSON extraction is missing for supported file type;
* assertions are missing;
* support matrix is missing;
* unsupported facts are hidden;
* W9 is skipped;
* revised output ignores W9;
* workflow state is absent;
* artifact status is absent;
* audit events are absent for material actions;
* generated argument invents material facts;
* raw OCR-only screenshot extraction is accepted without QA flag or human review;
* retrieval crosses matter scope by default.

---

# 6. W4-lite Evidence Ingestion Acceptance Checklist

This checklist is governed by:

```text
docs/implementation/02 W4-lite Enhanced Ingestion Build Spec.md
docs/lexos-system-spec/08 LEXOS MVP Scope and Build Specification.md, Section 11.4
docs/lexos-system-spec/12 LEXOS Testing, Evaluation, and Quality Assurance Specification.md, Section 7.8
```

## 6.1 Checklist

W4-lite passes only if the system proves the following for supported MVP file types:

1. Evidence Object is created.
2. Evidence Extraction Object is created.
3. Original file is preserved unchanged.
4. Markdown extraction is generated where applicable.
5. Structured JSON extraction is generated where applicable.
6. `processing_status` uses MVP-required values:

   * `uploaded`
   * `queued`
   * `processing`
   * `processed`
   * `qa_flagged`
   * `failed`
   * `requires_human_review`
   * `superseded`
7. `extraction_quality_status` uses MVP-required values:

   * `accepted`
   * `qa_flagged`
   * `failed`
   * `human_review_required`
8. `human_review_required` flag exists.
9. Quality flags are visible.
10. Failed or QA-flagged extraction cannot silently support assertions.
11. Embedding chunks, if enabled, link to:

* `client_id`
* `matter_id`
* `evidence_id`
* `extraction_id`
* chunk index
* privilege status
* confidentiality status

12. Agents retrieve extraction chunks only through matter-scoped retrieval.
13. Original evidence remains the evidentiary anchor.
14. Markdown, JSON, OCR, transcripts, visual descriptions, and embeddings are derivative artifacts, not original evidence.
15. PDF screenshots / chat screenshots are handled as parser-first OCR/vision-assisted extraction, not OCR-only extraction.
16. Raw OCR-only fallback is `qa_flagged` or `human_review_required` unless human-reviewed and accepted.

## 6.2 W4 Failure Conditions

W4-lite fails if:

* original file is overwritten;
* Evidence Object is missing;
* Evidence Extraction Object is missing;
* extraction quality status is missing;
* human review flag is missing;
* screenshot-based evidence is accepted as raw OCR-only output while losing material structure;
* failed extraction appears as processed without caveat;
* QA-flagged extraction silently supports assertions;
* embedding chunks lack evidence/extraction linkage.

---

# 7. Object Model Acceptance Tests

## 7.1 Test Name

`SCHEMA_Core_Object_Spine`

## 7.2 Required Tables

The schema must include:

* `clients`;
* `matters`;
* `intake_records`;
* `client_candidates`;
* `matter_candidates`;
* `intake_groups`;
* `intake_tasks`;
* `sources`;
* `evidence`;
* `evidence_extractions`;
* `embedding_chunks`;
* `case_stories`;
* `assertions`;
* `support_matrix_items`;
* `risks`;
* `strategy_memos`;
* `research_memos`;
* `argument_drafts`;
* `adversarial_critiques`;
* `output_artifacts`;
* `workflow_states`;
* `agent_outputs`;
* `audit_events`;
* `tool_calls`;
* `model_runs`.

## 7.3 Pass Criteria

Passes if:

* tables exist;
* primary keys exist;
* core foreign keys exist;
* matter-scoped tables contain `matter_id`;
* client-scoped tables contain `client_id`;
* evidence and extraction are separate;
* artifact status/version exists;
* workflow state exists;
* audit event table exists.

## 7.4 Fail Criteria

Fails if:

* schema stores evidence only as file path;
* schema merges evidence and extraction;
* schema omits assertions;
* schema omits support matrix;
* schema omits workflow state;
* schema omits audit events;
* schema omits artifact status;
* schema omits W0 intake isolation objects where W0-lite is enabled.

---

# 8. W0-lite Intake Acceptance Tests

## 8.1 Test Name

`W0_Intake_Isolation`

## 8.2 Required Scenarios

Test these scenarios:

1. one client / one matter;
2. existing client / new matter;
3. multiple unrelated prospective clients;
4. multiple related prospective clients in same matter;
5. ambiguous client identity;
6. rejected or abandoned intake.

## 8.3 Pass Criteria

Passes if:

* one client / one matter creates one Intake Record, one Client Candidate, one Matter Candidate;
* existing client / new matter references existing Client and creates Matter Candidate;
* multiple unrelated prospective clients create separate Intake Records and separate W0 Intake Instances;
* related clients in same matter create Intake Group with multiple Client Candidates;
* each Client Candidate has separate conflict/KYC/authority status;
* ambiguous client identity blocks or escalates intake;
* rejected/abandoned intake does not create persistent W1 memory;
* accepted intake creates controlled W1 handoff;
* W0 subagent cannot access unrelated intake context;
* audit events record acceptance, rejection, abandonment, and handoff.

## 8.4 Fail Criteria

Fails if:

* unrelated prospective clients are processed in one shared agent context;
* Client Candidate facts become persistent Client Facts before acceptance;
* related-client conflict risk is not flagged;
* rejected/abandoned intake creates Client Record automatically;
* Intake Group fails to preserve per-client checks.

---

# 9. W2 Case Story Acceptance Tests

## 9.1 Test Name

`W2_Case_Story_and_Assertions`

## 9.2 Pass Criteria

Passes if:

* Case Story Artifact is created;
* client narrative is not marked as verified fact by default;
* material assertions are extracted;
* assertions are atomic;
* assertions include truth state;
* assertions include support state;
* gaps are visible;
* vulnerabilities are visible;
* preliminary risks can be created.

## 9.3 Fail Criteria

Fails if:

* client narrative is treated as verified fact;
* assertions are vague paragraphs;
* multiple propositions are merged into one assertion;
* unsupported facts disappear;
* no gaps or vulnerabilities are identified;
* Case Story is just freeform chat output with no objects.

---

# 10. W5 Support Matrix Acceptance Tests

## 10.1 Test Name

`W5_Support_Matrix`

## 10.2 Pass Criteria

Passes if:

* assertions are linked to evidence/extractions;
* supported assertions require evidence support;
* partially supported assertions explain missing support;
* unsupported assertions are visible;
* contradicted assertions are visible;
* extraction quality caveats are visible;
* support matrix can identify evidence gaps;
* W5 can return matter to W4 when extraction is inadequate.

## 10.3 Fail Criteria

Fails if:

* assertions become supported without evidence;
* failed/QA-flagged extraction is silently treated as reliable support;
* support state is missing;
* unsupported assertions are hidden;
* contradictions are hidden;
* evidence overreading is obvious and unflagged.

---

# 11. W6 Strategy Acceptance Tests

## 11.1 Test Name

`W6_Strategy_Memo`

## 11.2 Pass Criteria

Passes if:

* Strategy Memo is created;
* Strategy Points are identified;
* strongest points are listed;
* weakest points are listed;
* support dependencies are visible;
* unsupported dependencies are visible;
* research questions are created for W7;
* risks are visible.

## 11.3 Fail Criteria

Fails if:

* strategy depends silently on unsupported facts;
* strategy ignores weak evidence;
* strategy ignores obvious opposing response;
* no research questions are generated;
* strategy reads as polished advice without support basis.

---

# 12. W7 Research Acceptance Tests

## 12.1 Test Name

`W7_Research_Memo`

## 12.2 Pass Criteria

Passes if:

* Research Memo is created;
* jurisdiction is stated;
* research question is stated;
* short answer is provided;
* source/authority list exists;
* verification status is visible;
* adverse authority or limitation note exists;
* factual assumptions are stated.

## 12.3 Fail Criteria

Fails if:

* jurisdiction is missing;
* citations are invented;
* unverified authority is treated as verified;
* foreign authority is treated as binding without explanation;
* adverse authority limitations are hidden;
* research depends on unsupported facts without caveat.

---

# 13. W8 Argument Draft Acceptance Tests

## 13.1 Test Name

`W8_Argument_Draft`

## 13.2 Pass Criteria

Passes if:

* Argument Draft is created;
* intended audience is stated;
* argument summary exists;
* evidence/source basis exists;
* legal authority basis exists;
* unsupported or weak claims are listed;
* artifact status is `draft`;
* W8 routes to W9.

## 13.3 Fail Criteria

Fails if:

* argument invents material facts;
* argument invents citations;
* unsupported facts are presented as established;
* draft is marked final or filing-ready;
* W9 can be bypassed without warning;
* source basis is missing.

---

# 14. W9 Adversarial Review Acceptance Tests

## 14.1 Test Name

`W9_Adversarial_Critique`

## 14.2 Pass Criteria

Passes if:

* Adversarial Critique is created;
* critique is non-deferential;
* Attack Matrix exists;
* severity classification exists;
* unsupported claims are attacked;
* weak evidence is identified;
* extraction quality risks are considered;
* legal/citation risks are identified;
* loop decision is provided.

Loop decision must be one of:

* Return to W5;
* Return to W6;
* Return to W7;
* Return to W8;
* Proceed to W11 with caveats.

## 14.3 Fail Criteria

Fails if:

* W9 simply praises or lightly edits W8;
* obvious unsupported claims are missed;
* severity is missing;
* recommended fixes are vague;
* critical issues are softened or hidden;
* W9 is optional decoration.

---

# 15. W11 Revised Output Acceptance Tests

## 15.1 Test Name

`W11_Revised_Output`

## 15.2 Pass Criteria

Passes if:

* Revised Output is created;
* revision summary exists;
* issues addressed are listed;
* remaining risks are listed;
* unresolved issues are listed;
* recommended artifact status exists;
* caveats are preserved;
* output remains internal unless reviewed.

## 15.3 Fail Criteria

Fails if:

* W11 erases W9 unresolved issues;
* W11 converts weak claims into strong claims;
* W11 removes caveats without basis;
* W11 creates new facts;
* W11 marks output final improperly.

---

# 16. UI Acceptance Tests

## 16.1 Test Name

`UI_Operator_Comprehension`

## 16.2 Operator Must Be Able to Answer

From the UI, a new operator should be able to answer:

1. What matter am I in?
2. What client does it belong to?
3. What workflow stage is active?
4. What is the next action?
5. What evidence has been uploaded?
6. What extractions failed or are QA-flagged?
7. What assertions are unsupported?
8. What assertions are contradicted?
9. What evidence supports this argument?
10. What risks block progress?
11. What output is current?
12. Is this draft reviewed?

## 16.3 Pass Criteria

Passes if:

* matter scope is visible;
* workflow state is visible;
* risk panel is visible;
* evidence workspace shows original and extraction;
* support matrix is visible;
* artifact status is visible;
* W9 critique status is visible.

## 16.4 Fail Criteria

Fails if:

* UI centers chat over objects;
* unsupported facts are hidden;
* risks are hidden;
* extraction failures are hidden;
* drafts appear final;
* search/retrieval scope is unclear.

---

# 17. Retrieval / Embedding Acceptance Tests

## 17.1 Test Name

`RETRIEVAL_Matter_Scope`

## 17.2 Required Only If Retrieval Is Enabled

If embeddings/vector retrieval are enabled, test:

* query returns only active matter chunks by default;
* chunks link to evidence/extraction;
* privilege/confidentiality labels exist;
* superseded chunks are excluded by default;
* failed/QA-flagged extraction chunks are excluded or flagged;
* search scope is visible.

## 17.3 Pass Criteria

Passes if:

* retrieval filters by `client_id`;
* retrieval filters by `matter_id`;
* retrieval filters by privilege/confidentiality where applicable;
* retrieval filters by `is_current`;
* retrieval results include source references.

## 17.4 Fail Criteria

Fails if:

* global retrieval is default;
* unrelated matter content appears;
* vector result lacks evidence/extraction reference;
* privileged content appears to unauthorized user;
* superseded extraction is treated as current.

---

# 18. Security / Privilege Acceptance Tests

## 18.1 Test Name

`SECURITY_MVP_Minimum`

## 18.2 Pass Criteria

Passes if:

* unauthenticated users cannot access app workspace;
* Supabase service-role key is not client-side;
* sensitive records include privilege/confidentiality status;
* extraction artifacts inherit source evidence labels;
* embeddings inherit source evidence labels if enabled;
* prompt context labels QA-flagged or low-confidence extraction;
* evidence deletion is restricted or unavailable in MVP.

## 18.3 Fail Criteria

Fails if:

* app is publicly accessible without authentication;
* service-role key is exposed;
* evidence bucket is public by default;
* privileged material is retrieved across matters;
* extraction artifacts lose privilege/confidentiality labels;
* raw logs store full privileged prompts insecurely.

---

# 19. Audit / Observability Acceptance Tests

## 19.1 Test Name

`AUDIT_Material_Actions`

## 19.2 Required Audit Events

Audit Events should be created for:

* client created;
* matter created;
* intake accepted/rejected/abandoned if W0 enabled;
* evidence uploaded;
* extraction created;
* extraction failed;
* extraction QA-flagged;
* assertion created;
* support state changed;
* risk created;
* workflow changed;
* artifact generated;
* W9 critique generated.

## 19.3 Pass Criteria

Passes if:

* material actions create audit events;
* audit events link to client/matter/intake where applicable;
* failed agent/tool runs are visible;
* workflow blockers are visible.

## 19.4 Fail Criteria

Fails if:

* failed extractions disappear;
* failed agent runs disappear;
* artifact status changes are unlogged;
* no audit trail exists for material events.

---

# 20. Manual MVP Demo Script

Use this script for a human walkthrough.

## 20.1 Setup

1. Start local app.
2. Log in.
3. Open dashboard.
4. Confirm test user profile exists.

## 20.2 Create Matter

1. Create Client: `Demo Client`.
2. Create Matter: `Demo Matter`.
3. Set posture: `defence` or `plaintiff`.
4. Set jurisdiction.
5. Confirm workflow state initialized.

## 20.3 Create Story

1. Paste case story narrative.
2. Generate Case Story.
3. Extract Assertions.
4. Confirm unsupported facts visible.

## 20.4 Upload Evidence

1. Upload digital PDF or DOCX.
2. Upload screenshot/chat evidence.
3. Confirm originals stored.
4. Confirm Evidence Objects created.
5. Confirm Evidence Extractions created.
6. Confirm markdown/JSON visible.
7. Confirm quality status visible.

## 20.5 Build Support

1. Open Assertions / Support Matrix.
2. Link evidence to assertions.
3. Mark supported/partially supported/unsupported/contradicted.
4. Confirm support matrix visible.

## 20.6 Generate Legal Work Product

1. Generate Strategy Memo.
2. Generate Research Memo.
3. Generate Argument Draft.
4. Generate W9 Adversarial Critique.
5. Generate Revised Output.

## 20.7 Final Review

1. Open Risks.
2. Open Workflow State.
3. Open Artifacts.
4. Open Audit Events.
5. Confirm final output remains internal unless reviewed.

---

# 21. Final MVP Acceptance Checklist

MVP is complete only if all are true:

```text id="h62t5o"
[ ] App runs locally.
[ ] Auth protects app workspace.
[ ] Core schema exists.
[ ] Client can be created.
[ ] Matter can be created.
[ ] Workflow State initializes.
[ ] Evidence can be uploaded.
[ ] Original evidence is preserved.
[ ] Evidence Object is created.
[ ] Evidence Extraction Object is created.
[ ] Markdown extraction exists for supported files.
[ ] Structured JSON extraction exists for supported files.
[ ] Extraction quality status is visible.
[ ] Human review flag exists.
[ ] Raw OCR-only screenshot extraction is not silently accepted.
[ ] Assertions can be extracted.
[ ] Support Matrix exists.
[ ] Unsupported facts are visible.
[ ] Contradictions are visible.
[ ] Strategy Memo exists.
[ ] Research Memo exists.
[ ] Argument Draft exists.
[ ] W9 Adversarial Critique exists.
[ ] Revised Output exists.
[ ] Risks are visible.
[ ] Artifact status/version exists.
[ ] Audit Events exist.
[ ] Retrieval is matter-scoped if enabled.
[ ] W0 intake isolation works if W0-lite is enabled.
[ ] No external autonomous legal action exists in MVP.
```

---

# 22. MVP Non-Acceptance Red Lines

Do not accept MVP if:

1. it is primarily chat over uploaded files;
2. evidence exists only as stored files;
3. Evidence Extraction Object is missing;
4. assertions are missing;
5. Support Matrix is missing;
6. unsupported facts are hidden;
7. contradictions are hidden;
8. W9 is missing or optional;
9. workflow state is missing;
10. artifact status is missing;
11. raw OCR is accepted as final for chat/screenshot evidence without QA/human review;
12. retrieval is global by default;
13. service-role key is exposed;
14. generated drafts are treated as final;
15. original evidence can be overwritten by extraction;
16. rejected W0 intake becomes persistent client memory.

---

# 23. Test Result Report Template

Use this template after a test run:

```markdown id="j1o2wm"
# MVP Acceptance Test Result

## Test Date

## Branch / Commit

## Tester

## Environment

## Test Matter

## Tests Run

## Passed

## Failed

## Blockers

## Evidence Ingestion Result

## Support Matrix Result

## W9 Result

## Security / Retrieval Result

## Audit Result

## Overall Decision
Choose one:
- accepted
- accepted_with_limitations
- rejected
- blocked

## Required Fixes

## Notes
```

---

# 24. Coding Agent Prompt for Acceptance Test Implementation

When ready to implement tests, give Cursor or Codex:

```markdown id="f6epzg"
You are implementing the LEXOS MVP acceptance test suite.

Read:
- docs/implementation/04 MVP Acceptance Test Plan.md
- docs/implementation/00 MVP Implementation Roadmap.md
- docs/implementation/01 Database Schema v0.md
- docs/implementation/02 W4-lite Enhanced Ingestion Build Spec.md
- docs/lexos-system-spec/12 LEXOS Testing, Evaluation, and Quality Assurance Specification.md

Task:
Create MVP acceptance tests and/or manual verification scripts matching the acceptance plan.

Scope:
- object spine tests;
- W4-lite ingestion tests;
- support matrix tests;
- W9 critique tests;
- UI/manual test checklist if automated UI tests are not yet practical.

Do not modify the canonical 13 documents.
Do not use real legal data.
Do not create external communication tools.

Deliver:
- test files or manual test scripts;
- sample test data if appropriate;
- final report listing implemented tests and remaining manual checks.
```

---

# 25. Next Step

After this test plan, create:

```text id="pzrric"
docs/implementation/05 Work Packet Register.md
```

That document controls how Cursor and Codex divide work.


