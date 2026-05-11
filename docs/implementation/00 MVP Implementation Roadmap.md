
# 00 MVP Implementation Roadmap

## Document Status

**Document Name:** MVP Implementation Roadmap  
**Version:** v0.1  
**Project:** LiNKtrend LEXOS  
**Purpose:** Convert the 13 canonical LEXOS system-specification documents into a buildable MVP implementation sequence for Cursor, Codex, and human operators.  
**Primary Audience:** Cursor Composer, Codex worker agents, human technical operator, software architect, implementation reviewer.  
**Authoritative Architecture Source:** `docs/lexos-system-spec/`  
**Primary MVP Scope Source:** `docs/lexos-system-spec/08 LEXOS MVP Scope and Build Specification.md`  
**Primary Technical Source:** `docs/lexos-system-spec/09 LEXOS Technical Implementation Architecture.md`  
**Primary QA Source:** `docs/lexos-system-spec/12 LEXOS Testing, Evaluation, and Quality Assurance Specification.md`

---

# 1. Purpose

This document defines the implementation roadmap for the first working LEXOS MVP.

The MVP must prove the core legal cognition spine:

**Client / Matter → Case Story → Evidence Ingest → Evidence Extraction → Assertions → Support Matrix → Strategy → Research → Argument Draft → Adversarial Review → Revised Output.**

The MVP must not become a generic chatbot over files.

The MVP must implement the canonical object spine, workflow state, evidence ingestion, assertion support mapping, artifact status, risk visibility, and basic auditability before advanced autonomous features.

---

# 2. Source of Truth

The 13 numbered system-specification documents are the architectural authority.

They are located at:

```text
docs/lexos-system-spec/
````

The implementation-control documents in this folder convert those specifications into build tasks.

If there is a conflict:

1. The 13 numbered system-specification documents control architectural doctrine.
2. This implementation roadmap controls MVP build sequencing.
3. The database schema document controls initial schema execution.
4. The W4-lite ingestion build spec controls the ingestion module.
5. The acceptance test plan controls MVP completion review.

The legacy briefing in `docs/source-briefings/` is historical source material only and does not control implementation.

---

# 3. MVP Implementation Doctrine

## 3.1 Build the Object Spine First

The MVP must begin with structured records, not chat.

Build in this order:

1. database schema;
2. client/matter/intake records;
3. evidence objects;
4. evidence extraction objects;
5. assertions;
6. support states;
7. artifacts;
8. workflow state;
9. risks;
10. audit events;
11. agents;
12. UI polish.

## 3.2 Preserve Legal Architecture

Engineering convenience must not collapse legal boundaries.

Do not merge:

* Client and Matter;
* Evidence and Extraction;
* Assertion and Argument;
* Original Evidence and Markdown Extraction;
* Risk and Workflow Status;
* Draft and Final Artifact;
* W0 intake memory and W1 persistent client memory.

## 3.3 MVP May Be Simple, But Must Be Structurally Correct

The MVP may use:

* manual buttons;
* simple forms;
* basic tables;
* limited automation;
* simple role controls;
* one primary LLM provider;
* one primary parser provider;
* basic audit events.

The MVP must not omit:

* Evidence Object;
* Evidence Extraction Object;
* Assertion Object;
* Support Matrix;
* Workflow State;
* Risk Record;
* Output Artifact;
* matter-scoped retrieval;
* artifact status;
* W9 adversarial critique.

## 3.4 W4-lite Is Critical MVP Infrastructure

W4-lite Enhanced Evidence Ingest is mandatory for MVP.

It must include:

* original file preservation;
* Evidence Object creation;
* Evidence Extraction Object creation;
* parser-first extraction for supported document-like files;
* markdown extraction;
* structured JSON extraction;
* extraction quality status;
* quality flags;
* human review flag;
* optional embedding chunks where retrieval is enabled;
* audit event;
* no silent reliance on failed or QA-flagged extraction.

LlamaParse or equivalent layout-aware parser is the primary document extraction layer for supported document-like evidence. OCR is support/fallback only.

---

# 4. MVP Scope

## 4.1 Required MVP Workflows

The MVP must include:

| Workflow | MVP Name                 | Required |
| -------- | ------------------------ | -------- |
| W1-lite  | Client Record            | Yes      |
| W2-lite  | Case Story               | Yes      |
| W4-lite  | Enhanced Evidence Ingest | Yes      |
| W5-lite  | Assertion Support Matrix | Yes      |
| W6-lite  | Strategy Memo            | Yes      |
| W7-lite  | Research Memo            | Yes      |
| W8-lite  | Argument Draft           | Yes      |
| W9-lite  | Adversarial Critique     | Yes      |
| W11-lite | Revised Output           | Yes      |

## 4.2 Optional / Minimal MVP Workflows

| Workflow | MVP Treatment                                                               |
| -------- | --------------------------------------------------------------------------- |
| W0-lite  | Optional/manual but structurally correct if implemented                     |
| W3-lite  | Optional unless defense-side opposing-file workflow is required immediately |
| W10-lite | Optional simple timeline/evidence table only                                |

## 4.3 Deferred Full Capabilities

The MVP may defer:

* full KYC/CDD integrations;
* automated conflict checks;
* sanctions screening;
* client portal;
* billing integration;
* full W1 verification ladder;
* full W3 court/prosecution file automation;
* full forensic chain of custody;
* advanced video processing;
* court filing;
* external communication automation;
* full citation verification engine;
* model/tool registry UI;
* multi-tenant SaaS administration.

---

# 5. Recommended Technical Stack

## 5.1 MVP Stack

Use:

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Supabase Postgres**
* **Supabase Storage**
* **Supabase Auth**
* **pgvector**, if retrieval is enabled
* **LlamaParse or equivalent parser**
* **LLM provider abstraction**
* **Gemini Embeddings or equivalent**, if embeddings are enabled

## 5.2 Deployment Assumption

Initial development is local.

Target deployment can be:

* private internal deployment;
* managed web app + Supabase;
* private VPS + Supabase.

Do not build autonomous external action in MVP.

---

# 6. Repository Structure

The intended repository structure is:

```text
LiNKtrend-LEXOS/
  README.md
  PROJECT_STATE.md
  AGENT_HANDOFF.md

  docs/
    source-briefings/
    lexos-system-spec/
    implementation/

  src/
    app/
    components/
    features/
    lib/
    server/
    types/

  supabase/
    migrations/
    seed/
```

The exact framework structure may be created when the app is initialized.

---

# 7. Build Phases

## Phase 0 — Repository and Implementation Control

### Objective

Prepare the repo for coding agents and implementation.

### Deliverables

* documentation organized under `docs/`;
* implementation-control documents created;
* `PROJECT_STATE.md`;
* `AGENT_HANDOFF.md`;
* no app code yet.

### Acceptance Criteria

* 13 canonical docs are under `docs/lexos-system-spec/`;
* legacy briefing is under `docs/source-briefings/`;
* implementation docs exist under `docs/implementation/`;
* root is clean.

---

## Phase 1 — App Foundation

### Objective

Initialize the application foundation.

### Deliverables

* Next.js app;
* TypeScript;
* Tailwind CSS;
* shadcn/ui;
* Supabase client setup;
* environment variable template;
* basic layout shell;
* basic route structure.

### Initial Routes

```text
/
 /dashboard
 /clients
 /clients/[clientId]
 /matters
 /matters/[matterId]
 /matters/[matterId]/overview
 /matters/[matterId]/story
 /matters/[matterId]/evidence
 /matters/[matterId]/assertions
 /matters/[matterId]/strategy
 /matters/[matterId]/research
 /matters/[matterId]/argument
 /matters/[matterId]/adversarial
 /matters/[matterId]/output
 /matters/[matterId]/risks
 /matters/[matterId]/workflow
```

### Acceptance Criteria

* app runs locally;
* Supabase environment variables are defined in `.env.example`;
* no secrets are committed;
* app shell renders.

---

## Phase 2 — Database Schema and Object Spine

### Objective

Create the initial database schema.

### Required Tables

Minimum MVP tables:

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
* `assertions`;
* `risks`;
* `research_memos`;
* `strategy_memos`;
* `argument_drafts`;
* `adversarial_critiques`;
* `output_artifacts`;
* `workflow_states`;
* `agent_outputs`;
* `audit_events`.

### Acceptance Criteria

* schema migration exists;
* enums or controlled status values are defined;
* foreign keys exist where practical;
* major tables include `client_id` and/or `matter_id` where applicable;
* privilege/confidentiality fields exist on sensitive records;
* migration runs locally or in development Supabase.

---

## Phase 3 — Auth and Basic Access

### Objective

Implement basic authenticated access.

### Deliverables

* Supabase Auth integration;
* login/logout flow;
* protected app routes;
* user role field or profile table;
* basic role handling.

### MVP Roles

* `admin`;
* `operator`;
* `reviewer`;
* `read_only`;
* `system_agent`.

### Acceptance Criteria

* unauthenticated user cannot access app workspace;
* authenticated user can access dashboard;
* service-role key is not exposed client-side;
* basic user profile/role is available.

---

## Phase 4 — Client / Matter / Intake Core

### Objective

Implement core Client, Matter, and W0-lite intake structures.

### Deliverables

* Client CRUD;
* Matter CRUD;
* optional W0-lite intake records;
* Client Candidate;
* Matter Candidate;
* Intake Group where applicable;
* Workflow State initialized for each matter.

### Acceptance Criteria

* user can create Client;
* user can create Matter under Client;
* matter shows posture, jurisdiction, status, current workflow;
* W0-lite objects exist if enabled;
* unrelated prospective clients cannot share an intake context.

---

## Phase 5 — W4-lite Enhanced Evidence Ingestion

### Objective

Implement the critical evidence ingestion pipeline.

### Deliverables

* upload original file;
* store original unchanged;
* create Source Object;
* create Evidence Object;
* classify file/media type;
* run parser-first extraction where supported;
* generate markdown extraction;
* generate structured JSON extraction;
* create Evidence Extraction Object;
* assign `processing_status`;
* assign `extraction_quality_status`;
* assign `human_review_required`;
* show quality flags;
* optional embedding chunks;
* audit event.

### Supported MVP File Types

Required where tooling permits:

* PDF;
* DOCX;
* TXT;
* scanned PDF;
* PDF composed of screenshots;
* screenshot/image with text.

Optional:

* image without text;
* audio.

Deferred or limited:

* advanced video processing;
* forensic chain of custody;
* certified transcription/translation.

### Acceptance Criteria

* original file preserved;
* markdown and JSON generated for supported file types;
* raw OCR alone is not accepted for screenshot/chat evidence unless QA-flagged or human-reviewed;
* extraction status visible;
* QA-flagged extraction cannot silently support assertions;
* embeddings, if enabled, link to `client_id`, `matter_id`, `evidence_id`, and `extraction_id`.

---

## Phase 6 — Case Story and Assertion Extraction

### Objective

Implement W2-lite story and assertion extraction.

### Deliverables

* Case Story workspace;
* story input;
* Case Story Artifact;
* Assertion extraction;
* assertion table;
* gaps;
* vulnerabilities;
* preliminary risks.

### Acceptance Criteria

* client narrative is not treated as verified fact;
* assertions are atomic;
* assertions have truth/support states;
* unsupported facts remain visible;
* Case Story links to Matter.

---

## Phase 7 — W5 Support Matrix

### Objective

Implement evidence-to-assertion mapping.

### Deliverables

* assertion support table;
* evidence linking;
* support state assignment;
* contradiction flag;
* unsupported facts panel;
* evidence gaps panel;
* Support Matrix Artifact.

### Acceptance Criteria

* supported assertions require evidence/source link;
* partially supported assertions explain missing support;
* unsupported assertions remain visible;
* contradicted assertions remain visible;
* failed/QA-flagged extraction is not silently used as reliable support.

---

## Phase 8 — W6 Strategy and W7 Research

### Objective

Implement simplified strategy and research workspaces.

### Deliverables

* Strategy Memo;
* Strategy Points;
* Research Questions;
* Research Memo;
* authority/source list;
* limitations section.

### Acceptance Criteria

* strategy references support state;
* research has jurisdiction;
* unverified law/citations are marked preliminary;
* research limitations are visible;
* adverse authority can be noted.

---

## Phase 9 — W8 Argument Draft

### Objective

Generate structured argument draft from strategy, research, assertions, and evidence.

### Deliverables

* Argument Draft Artifact;
* source basis panel;
* unsupported/weak claims panel;
* artifact status;
* version.

### Acceptance Criteria

* argument uses supported facts where possible;
* unsupported claims are flagged;
* draft is not filing-ready;
* artifact status is `draft`;
* W8 routes to W9.

---

## Phase 10 — W9 Adversarial Review

### Objective

Implement mandatory adversarial review.

### Deliverables

* Adversarial Critique;
* Attack Matrix;
* severity classification;
* recommended fixes;
* loop decision.

### Acceptance Criteria

* W9 critique is non-deferential;
* unsupported claims are attacked;
* weak evidence is identified;
* legal/citation risks are identified;
* loop decision is one of:

  * return to W5;
  * return to W6;
  * return to W7;
  * return to W8;
  * proceed to W11 with caveats.

---

## Phase 11 — W11 Revised Output

### Objective

Generate revised output after W9.

### Deliverables

* Revised Output Artifact;
* revision summary;
* issues addressed;
* remaining risks;
* unresolved issues;
* artifact status.

### Acceptance Criteria

* W11 does not erase caveats;
* unresolved risks remain visible;
* revised output is internal unless reviewed;
* final internal status requires review marker.

---

## Phase 12 — Dashboard, Risk, Workflow, and Audit

### Objective

Expose system state.

### Deliverables

* dashboard;
* open matters;
* blocked matters;
* high/critical risks;
* failed extractions;
* failed agent runs;
* workflow status;
* audit timeline.

### Acceptance Criteria

* operator can see blocked matters;
* unsupported facts are visible;
* extraction failures are visible;
* audit events exist for material actions;
* workflow state is visible.

---

## Phase 13 — MVP QA and Demo Matter

### Objective

Prove MVP works end-to-end.

### Deliverables

* sample test matter;
* sample evidence;
* generated assertions;
* support matrix;
* strategy memo;
* research memo;
* argument draft;
* W9 critique;
* revised output;
* acceptance test results.

### Acceptance Criteria

A user can complete:

```text
Client → Matter → Story → Evidence → Extraction → Assertions → Support Matrix → Strategy → Research → Argument → W9 → Revised Output
```

The MVP fails if:

* evidence exists only as files;
* assertions are missing;
* support matrix is missing;
* unsupported facts are hidden;
* W9 is skipped;
* workflow state is absent;
* artifact status is absent;
* raw OCR-only screenshot extraction is accepted without QA flag or review;
* retrieval crosses matter scope by default.

---

# 8. Cursor / Codex Operating Model

## 8.1 Cursor Role

Cursor is the lead development IDE.

Cursor owns:

* implementation planning;
* schema integration;
* major architectural decisions;
* branch coordination;
* final integration;
* acceptance review;
* documentation control.

## 8.2 Codex Role

Codex is an isolated coding worker.

Codex may work on:

* specific services;
* tests;
* individual UI components;
* W4 ingestion module;
* isolated API routes;
* bug fixes;
* review tasks.

Codex must not be asked to build the entire MVP in one task.

## 8.3 GitHub as Source of Truth

The repo is:

```text
https://github.com/linktrend/LiNKtrend-LEXOS
```

All work must be committed through Git.

Do not rely on IDE memory as the source of truth.

---

# 9. Branching Strategy

Use this branch model:

```text
main
  development
    dev/cursor-foundation
    dev/cursor-schema
    dev/cursor-w4-ingestion
    dev/codex-w4-tests
    dev/codex-support-matrix
    dev/cursor-ui-workspaces
    dev/cursor-integration
```

## Branch Rules

* `main` is stable.
* `development` is integration.
* `dev/<tool>-<task>` is work in progress.
* Each AI worker gets one branch and one work packet.
* No worker may edit unrelated files without explicit permission.
* Each worker must update `AGENT_HANDOFF.md`.

---

# 10. Required Agent Handoff Format

Every coding agent must report:

```markdown
# Agent Handoff

## Branch

## Task

## Files Changed

## What Was Implemented

## Decisions Made

## Tests Run

## Known Issues

## Blockers

## Next Recommended Step
```

---

# 11. Required Work Packet Format

Every work packet must include:

```markdown
# Work Packet

## Objective

## Branch

## Files / Folders Allowed

## Files / Folders Prohibited

## Source Documents to Read

## Tasks

## Acceptance Criteria

## Tests Required

## Final Report Required

## Stop Conditions
```

---

# 12. Stop Conditions for Coding Agents

A coding agent must stop and report if:

* required source documents are missing;
* schema conflicts with canonical object model;
* task requires touching files outside scope;
* secrets are needed;
* extraction provider credentials are unavailable;
* migration fails;
* app cannot run;
* tests fail and cannot be resolved within task scope;
* implementation would weaken matter isolation;
* implementation would treat original evidence and extraction as the same object;
* implementation would allow global retrieval by default;
* implementation would bypass W9.

---

# 13. MVP Red Lines

The MVP must not:

1. become a chatbot over files;
2. store evidence only as files;
3. omit Evidence Extraction Objects;
4. omit Assertions;
5. omit Support Matrix;
6. hide unsupported facts;
7. hide contradictions;
8. skip W9;
9. allow global retrieval by default;
10. treat raw OCR as accepted extraction where structure matters;
11. treat embeddings as evidence;
12. treat generated draft as final;
13. create W1 memory from rejected W0 intake;
14. allow autonomous external legal communication;
15. expose service-role keys client-side;
16. store secrets in repo.

---

# 14. Implementation Priorities

## Highest Priority

1. schema;
2. evidence ingestion;
3. support matrix;
4. workflow state;
5. risks;
6. W9;
7. auditability.

## Medium Priority

1. strategy/research;
2. argument drafting;
3. revised output;
4. UI polish;
5. embeddings;
6. W0-lite.

## Lower Priority / Later

1. W10 visual exhibits;
2. advanced video processing;
3. client portal;
4. court filing;
5. automated KYC/CDD;
6. full model/tool registry UI.

---

# 15. First Coding Milestone

The first technical milestone is not the full MVP.

The first milestone is:

```text
App runs locally
Supabase connected
Core schema exists
Client can be created
Matter can be created
Evidence can be uploaded
Evidence Object exists
Evidence Extraction placeholder exists
Workflow State exists
Audit Event exists
```

This proves the foundation.

---

# 16. Final MVP Completion Definition

The MVP is complete only when:

* one matter completes the end-to-end cognition spine;
* W4-lite ingestion works for supported files;
* assertions are extracted;
* support matrix exists;
* strategy memo exists;
* research memo exists;
* argument draft exists;
* W9 critique exists;
* revised output exists;
* risks are visible;
* workflow state is visible;
* artifacts have status/version;
* original evidence is preserved;
* extracted markdown/JSON are derivative;
* retrieval is matter-scoped if enabled;
* acceptance tests pass.

---

# 17. Next Step

After this roadmap, create:

```text
docs/implementation/01 Database Schema v0.md
```

That document must define the first buildable database schema.

