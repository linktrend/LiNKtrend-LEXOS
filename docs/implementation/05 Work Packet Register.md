
# 05 Work Packet Register

## Document Status

**Document Name:** Work Packet Register  
**Version:** v0.1  
**Project:** LiNKtrend LEXOS  
**Purpose:** Define how Cursor and Codex divide, execute, report, and integrate LEXOS MVP implementation work.  
**Primary Audience:** Cursor Composer, Codex worker agents, human technical operator, implementation reviewer.  
**Primary Roadmap Source:** `docs/implementation/00 MVP Implementation Roadmap.md`  
**Primary Schema Source:** `docs/implementation/01 Database Schema v0.md`  
**Primary W4 Source:** `docs/implementation/02 W4-lite Enhanced Ingestion Build Spec.md`  
**Primary Prompt Source:** `docs/implementation/03 Agent Prompt Registry v0.md`  
**Primary QA Source:** `docs/implementation/04 MVP Acceptance Test Plan.md`  
**Canonical System Specs:** `docs/lexos-system-spec/`

---

# 1. Purpose

This document controls how implementation work is assigned to Cursor and Codex.

Cursor is the lead IDE and integration authority.

Codex is an isolated coding worker used for bounded implementation, tests, refactors, bug fixes, and review tasks.

The purpose of this register is to prevent:

- overlapping edits;
- context loss;
- rate-limit interruption damage;
- undocumented decisions;
- branch conflicts;
- architectural drift;
- incomplete handoffs;
- implementation work that violates the 13 LEXOS specifications.

No agent should begin coding without a work packet.

---

# 2. Operating Model

## 2.1 Cursor Role

Cursor is the lead implementation environment.

Cursor owns:

- roadmap maintenance;
- implementation-control documents;
- project state;
- branch coordination;
- architectural consistency;
- schema integration;
- UI integration;
- final acceptance review;
- merging worker outputs.

Cursor may perform coding directly, but its primary responsibility is integration and continuity.

## 2.2 Codex Role

Codex is an isolated worker.

Codex may receive:

- one bounded task;
- one branch;
- defined file/folder scope;
- clear acceptance criteria;
- required final report.

Codex must not be given broad tasks such as:

> Build the whole MVP.

Codex should receive tasks such as:

> Implement Evidence Extraction service and tests only.

## 2.3 GitHub Role

GitHub is the source of truth.

Repo:

```text
https://github.com/linktrend/LiNKtrend-LEXOS
````

Local project path:

```text
/Users/linktrend/Projects/LiNKtrend-LEXOS
```

All meaningful implementation work should be committed to Git.

IDE chat context is not the source of truth.

---

# 3. Required Control Files

The following files must be maintained during implementation:

```text
PROJECT_STATE.md
AGENT_HANDOFF.md
docs/implementation/00 MVP Implementation Roadmap.md
docs/implementation/01 Database Schema v0.md
docs/implementation/02 W4-lite Enhanced Ingestion Build Spec.md
docs/implementation/03 Agent Prompt Registry v0.md
docs/implementation/04 MVP Acceptance Test Plan.md
docs/implementation/05 Work Packet Register.md
```

## 3.1 PROJECT_STATE.md

Purpose:

Track the current repo state, architecture decisions, completed phases, active branch, active blockers, and next recommended task.

## 3.2 AGENT_HANDOFF.md

Purpose:

Record work completed by Cursor/Codex agents, including files changed, decisions, tests, blockers, and next steps.

Every coding task must update or append a handoff section.

---

# 4. Branching Strategy

Use this branch model:

```text
main
  development
    dev/cursor-foundation
    dev/cursor-schema
    dev/cursor-auth
    dev/cursor-client-matter
    dev/cursor-w4-ingestion
    dev/codex-w4-tests
    dev/codex-schema-review
    dev/codex-support-matrix
    dev/codex-agent-prompts
    dev/cursor-ui-workspaces
    dev/cursor-integration
```

## 4.1 Branch Rules

* `main` is stable.
* `development` is the integration branch.
* `dev/<tool>-<task>` branches are work branches.
* One work packet should use one branch.
* A worker should not switch branches without instruction.
* No worker should edit unrelated files outside its packet scope.
* Integration back into `development` is controlled by Cursor or the human operator.

## 4.2 Commit Rules

Each work packet should produce at least one clear commit.

Commit message format:

```text
<area>: <short description>
```

Examples:

```text
docs: add MVP implementation roadmap
schema: add evidence extraction tables
w4: implement evidence upload service
tests: add W4 ingestion acceptance tests
ui: add evidence workspace shell
```

---

# 5. Work Packet Format

Every task given to Cursor or Codex must use this structure:

```markdown
# Work Packet

## Work Packet ID

## Owner Tool

Cursor / Codex

## Branch

## Objective

## Source Documents to Read

## Files / Folders Allowed

## Files / Folders Prohibited

## Tasks

## Acceptance Criteria

## Tests Required

## Final Report Required

## Stop Conditions
```

---

# 6. Agent Handoff Format

Every worker must report using this format:

```markdown
# Agent Handoff

## Work Packet ID

## Branch

## Task

## Files Changed

## What Was Implemented

## Decisions Made

## Tests Run

## Test Results

## Known Issues

## Blockers

## Deviations From Instructions

## Next Recommended Step
```

The handoff must be appended to `AGENT_HANDOFF.md`.

---

# 7. Universal Stop Conditions

Any coding agent must stop and report if:

1. required source documents are missing;
2. local repo path is incorrect;
3. branch state is unclear;
4. task requires modifying prohibited files;
5. task requires secrets/API keys not available;
6. task requires production credentials;
7. task requires real legal/client data;
8. database migration conflicts with schema document;
9. implementation would collapse Client/Matter separation;
10. implementation would collapse Evidence/Evidence Extraction separation;
11. implementation would treat OCR as final accepted extraction where structure matters;
12. implementation would allow global retrieval by default;
13. implementation would expose service-role key client-side;
14. implementation would skip W9 in MVP spine;
15. tests fail and cannot be resolved within scope;
16. build fails and cannot be resolved within scope;
17. rate limit or tool failure prevents completion.

---

# 8. Universal Red Lines

No work packet may:

1. modify the canonical 13 system-spec documents unless explicitly instructed;
2. modify source briefing files unless explicitly instructed;
3. store secrets in the repo;
4. use real legal data as test data;
5. create autonomous external legal communication;
6. create court filing tools;
7. make evidence buckets public by default;
8. remove auditability;
9. hide unsupported facts;
10. remove W9 adversarial review;
11. treat embeddings as evidence;
12. merge unrelated W0 intake contexts;
13. treat generated drafts as final external work product.

---

# 9. Work Packet Status Values

Use these status values:

```text
not_started
assigned
in_progress
blocked
ready_for_review
needs_revision
accepted
merged
superseded
cancelled
```

---

# 10. MVP Work Packet Register

This section defines the initial implementation sequence.

Each packet can be refined before execution.

---

# WP-00 — Repository Control and State Files

## Status

`ready_for_review`

## Owner Tool

Cursor

## Branch

`dev/cursor-foundation`

## Objective

Initialize project-control files with useful content and create baseline repo instructions.

## Source Documents to Read

```text
docs/implementation/00 MVP Implementation Roadmap.md
docs/implementation/05 Work Packet Register.md
```

## Files / Folders Allowed

```text
PROJECT_STATE.md
AGENT_HANDOFF.md
README.md
.gitignore
.env.example
```

## Files / Folders Prohibited

```text
docs/lexos-system-spec/
docs/source-briefings/
```

## Tasks

1. Populate `PROJECT_STATE.md`.
2. Populate `AGENT_HANDOFF.md` with initial empty handoff structure.
3. Create or update `README.md` with repo overview.
4. Create `.gitignore`.
5. Create `.env.example` with placeholder variables only.

## Acceptance Criteria

* project state explains current status;
* handoff file has template;
* README explains docs layout and MVP objective;
* `.gitignore` excludes `.env.local`, `node_modules`, build artifacts;
* `.env.example` contains no secrets.

## Tests Required

No app tests required.

Manual verification:

* files exist;
* no secrets;
* docs not modified.

## Stop Conditions

Stop if README or state files already contain substantive content that would be overwritten.

---

# WP-01 — App Foundation

## Status

`ready_for_review`

## Owner Tool

Cursor

## Branch

`dev/cursor-foundation`

## Objective

Initialize the Next.js application foundation.

## Source Documents to Read

```text
docs/implementation/00 MVP Implementation Roadmap.md
docs/lexos-system-spec/09 LEXOS Technical Implementation Architecture.md
docs/lexos-system-spec/11 LEXOS UI-UX and Operator Experience Specification.md
```

## Files / Folders Allowed

```text
package.json
package-lock.json
pnpm-lock.yaml
next.config.*
tsconfig.json
tailwind.config.*
postcss.config.*
src/
app/
components/
lib/
types/
.env.example
```

## Files / Folders Prohibited

```text
docs/lexos-system-spec/
docs/source-briefings/
```

## Tasks

1. Initialize Next.js with TypeScript.
2. Add Tailwind CSS.
3. Add shadcn/ui baseline if practical.
4. Create app shell.
5. Create initial route structure.
6. Add basic layout/navigation.
7. Add Supabase client placeholders.

## Acceptance Criteria

* app runs locally;
* TypeScript compiles;
* home/dashboard page renders;
* no secrets committed;
* route structure exists.

## Tests Required

Run:

```text
npm run lint
npm run build
```

or equivalent if scripts exist.

## Stop Conditions

Stop if app initialization would overwrite existing app code.

---

# WP-02 — Supabase Schema Migration

## Status

`ready_for_review`

## Owner Tool

Cursor or Codex

## Branch

`dev/cursor-schema` or `dev/codex-schema`

## Objective

Implement the initial Supabase database schema.

## Source Documents to Read

```text
docs/implementation/01 Database Schema v0.md
docs/implementation/00 MVP Implementation Roadmap.md
docs/lexos-system-spec/02 LEXOS Canonical Object Model.md
docs/lexos-system-spec/08 LEXOS MVP Scope and Build Specification.md
docs/lexos-system-spec/09 LEXOS Technical Implementation Architecture.md
```

## Files / Folders Allowed

```text
supabase/migrations/
supabase/seed/
supabase/config.toml
types/database.ts
src/types/database.ts
```

## Files / Folders Prohibited

```text
docs/lexos-system-spec/
docs/source-briefings/
src/app/
src/components/
```

## Tasks

1. Create migration files.
2. Add required tables.
3. Add controlled status checks or enums.
4. Add indexes.
5. Add pgvector extension if supported.
6. Add seed file with fake/demo data only if useful.
7. Generate or stub database types if practical.

## Acceptance Criteria

* migration creates core schema;
* evidence and extraction are separate;
* intake isolation objects exist;
* assertions/support matrix exist;
* workflow/audit/risk tables exist;
* embedding chunks include `evidence_id` and `extraction_id`;
* no real legal data.

## Tests Required

* migration applies successfully to local/dev Supabase;
* schema inspection confirms tables.

## Stop Conditions

Stop if Supabase project/local database is not configured.

---

# WP-03 — Auth and User Profile Foundation

## Status

`not_started`

## Owner Tool

Cursor

## Branch

`dev/cursor-auth`

## Objective

Implement basic Supabase Auth and user profile handling.

## Source Documents to Read

```text
docs/implementation/00 MVP Implementation Roadmap.md
docs/implementation/01 Database Schema v0.md
docs/lexos-system-spec/06 LEXOS Security and Privilege Architecture.md
```

## Files / Folders Allowed

```text
src/lib/supabase*
src/server/
src/app/login/
src/app/logout/
src/app/dashboard/
src/middleware.ts
src/types/
```

## Tasks

1. Configure browser/server Supabase clients.
2. Implement login/logout.
3. Protect app routes.
4. Load user profile/role.
5. Prevent service-role key exposure.

## Acceptance Criteria

* unauthenticated user cannot access workspace;
* authenticated user can reach dashboard;
* service-role key is server-side only;
* role metadata available.

## Tests Required

* manual auth test;
* build/lint.

## Stop Conditions

Stop if Supabase Auth credentials are unavailable.

---

# WP-04 — Client / Matter / Workflow Foundation

## Status

`not_started`

## Owner Tool

Cursor

## Branch

`dev/cursor-client-matter`

## Objective

Implement Client, Matter, and Workflow State CRUD foundation.

## Source Documents to Read

```text
docs/implementation/00 MVP Implementation Roadmap.md
docs/implementation/01 Database Schema v0.md
docs/lexos-system-spec/05 LEXOS Workflow Specification.md
docs/lexos-system-spec/11 LEXOS UI-UX and Operator Experience Specification.md
```

## Files / Folders Allowed

```text
src/app/clients/
src/app/matters/
src/app/dashboard/
src/features/clients/
src/features/matters/
src/features/workflow/
src/lib/
src/server/
```

## Tasks

1. Create Client list/detail/create.
2. Create Matter list/detail/create.
3. Initialize workflow state when matter is created.
4. Show matter header.
5. Show basic dashboard with active matters.

## Acceptance Criteria

* client can be created;
* matter can be created under client;
* matter has posture/jurisdiction/status/current workflow;
* workflow state exists;
* audit event created for client/matter creation if audit service exists.

## Tests Required

* manual CRUD test;
* build/lint.

## Stop Conditions

Stop if schema tables are missing.

---

# WP-05 — W0-lite Intake Foundation

## Status

`not_started`

## Owner Tool

Cursor or Codex

## Branch

`dev/cursor-w0-intake`

## Objective

Implement optional W0-lite intake object structure and UI shell.

## Source Documents to Read

```text
docs/implementation/01 Database Schema v0.md
docs/implementation/03 Agent Prompt Registry v0.md
docs/lexos-system-spec/05 LEXOS Workflow Specification.md
docs/lexos-system-spec/10 LEXOS Agent Role and Prompt Library.md
```

## Files / Folders Allowed

```text
src/app/intake/
src/features/intake/
src/server/intake/
src/lib/
```

## Tasks

1. Create intake list/detail.
2. Create Intake Record.
3. Create Client Candidate.
4. Create Matter Candidate.
5. Create Intake Group where applicable.
6. Display conflict/KYC/engagement statuses.
7. Prevent unrelated candidates from sharing one intake group unless explicitly grouped.

## Acceptance Criteria

* one client/one matter intake works;
* multiple unrelated clients create separate intake records;
* related clients can be grouped;
* rejected/abandoned intake does not create Client automatically.

## Tests Required

Manual W0 intake isolation test.

## Stop Conditions

Stop if W0 is deferred by project decision.

---

# WP-06 — W4-lite Evidence Upload Foundation

## Status

`not_started`

## Owner Tool

Cursor

## Branch

`dev/cursor-w4-upload`

## Objective

Implement evidence upload, original storage, Evidence Object creation, and audit event foundation.

## Source Documents to Read

```text
docs/implementation/02 W4-lite Enhanced Ingestion Build Spec.md
docs/implementation/01 Database Schema v0.md
docs/lexos-system-spec/08 LEXOS MVP Scope and Build Specification.md
docs/lexos-system-spec/09 LEXOS Technical Implementation Architecture.md
```

## Files / Folders Allowed

```text
src/app/matters/[matterId]/evidence/
src/features/evidence/
src/server/evidence/
src/lib/storage/
src/lib/supabase*
```

## Tasks

1. Create evidence upload UI.
2. Store original file in Supabase Storage.
3. Create Evidence Object.
4. Set initial processing status.
5. Create audit event.
6. Show evidence list/detail.

## Acceptance Criteria

* file upload works;
* original file path saved;
* Evidence Object exists;
* original file is not overwritten;
* processing status visible;
* audit event exists if audit service implemented.

## Tests Required

Manual upload test with fake file.

## Stop Conditions

Stop if storage bucket is not configured.

---

# WP-07 — W4-lite Extraction Foundation

## Status

`not_started`

## Owner Tool

Codex or Cursor

## Branch

`dev/codex-w4-extraction`

## Objective

Implement Evidence Extraction Object creation, parser adapter placeholder, markdown/JSON extraction storage, and quality status.

## Source Documents to Read

```text
docs/implementation/02 W4-lite Enhanced Ingestion Build Spec.md
docs/implementation/01 Database Schema v0.md
docs/implementation/03 Agent Prompt Registry v0.md
docs/lexos-system-spec/07 LEXOS Model, Tool, and Automation Specification.md
```

## Files / Folders Allowed

```text
src/server/evidence/
src/server/extraction/
src/features/evidence/
src/lib/parser/
src/lib/extraction/
src/types/
```

## Tasks

1. Implement file classification.
2. Implement parser adapter interface.
3. If parser key unavailable, generate controlled placeholder extraction marked `human_review_required`.
4. Create Evidence Extraction Object.
5. Store markdown and JSON.
6. Set `extraction_quality_status`.
7. Set `human_review_required`.
8. Display extraction in Evidence Detail.

## Acceptance Criteria

* extraction object created;
* markdown visible;
* JSON visible;
* quality status visible;
* raw OCR-only fallback cannot be marked accepted by default;
* placeholder extraction is clearly flagged.

## Tests Required

* unit tests for classification if test framework exists;
* manual test with TXT/PDF placeholder.

## Stop Conditions

Stop if Evidence Object schema is missing.

---

# WP-08 — W4-lite Extraction QA Comparator

## Status

`not_started`

## Owner Tool

Codex

## Branch

`dev/codex-w4-qa`

## Objective

Implement MVP extraction QA status logic and quality flags.

## Source Documents to Read

```text
docs/implementation/02 W4-lite Enhanced Ingestion Build Spec.md
docs/implementation/03 Agent Prompt Registry v0.md
docs/implementation/04 MVP Acceptance Test Plan.md
```

## Files / Folders Allowed

```text
src/server/extraction/
src/lib/extraction/
src/features/evidence/
tests/
```

## Tasks

1. Implement QA comparator interface.
2. Implement basic deterministic checks.
3. Add quality flags.
4. Add `qa_flagged`, `failed`, and `human_review_required` flows.
5. Ensure failed/QA flagged extraction remains visible.

## Acceptance Criteria

* QA flags can be assigned;
* extraction quality status updates;
* raw OCR fallback flagged;
* failed extraction cannot appear accepted.

## Tests Required

* unit tests for QA status logic;
* manual UI verification if UI exists.

## Stop Conditions

Stop if extraction foundation is not implemented.

---

# WP-09 — Evidence Workspace UI

## Status

`not_started`

## Owner Tool

Cursor

## Branch

`dev/cursor-ui-evidence`

## Objective

Implement Evidence Workspace UI.

## Source Documents to Read

```text
docs/implementation/02 W4-lite Enhanced Ingestion Build Spec.md
docs/lexos-system-spec/11 LEXOS UI-UX and Operator Experience Specification.md
```

## Files / Folders Allowed

```text
src/app/matters/[matterId]/evidence/
src/features/evidence/
src/components/
```

## Tasks

1. Evidence table.
2. Evidence detail page.
3. Original tab/panel.
4. Markdown tab/panel.
5. JSON tab/panel.
6. Quality/QA panel.
7. Linked assertions placeholder.
8. Status badges.

## Acceptance Criteria

* original and extraction are visibly separate;
* markdown/JSON visible;
* quality status visible;
* raw OCR fallback/QA flag visually prominent;
* evidence list shows processing status.

## Tests Required

Manual UI walkthrough.

## Stop Conditions

Stop if W4 extraction foundation is missing.

---

# WP-10 — W2 Case Story and Assertions

## Status

`not_started`

## Owner Tool

Cursor or Codex

## Branch

`dev/cursor-w2-story`

## Objective

Implement Case Story input and assertion extraction foundation.

## Source Documents to Read

```text
docs/implementation/03 Agent Prompt Registry v0.md
docs/implementation/01 Database Schema v0.md
docs/lexos-system-spec/05 LEXOS Workflow Specification.md
```

## Files / Folders Allowed

```text
src/app/matters/[matterId]/story/
src/app/matters/[matterId]/assertions/
src/features/story/
src/features/assertions/
src/server/story/
src/server/assertions/
```

## Tasks

1. Story input UI.
2. Case Story Artifact creation.
3. Assertion extraction using prompt or manual placeholder.
4. Assertion table.
5. Truth/support state fields.
6. Gaps/vulnerabilities display.

## Acceptance Criteria

* Case Story created;
* assertions created;
* assertions are atomic enough for MVP;
* client narrative not marked verified by default;
* unsupported facts visible.

## Tests Required

Manual story/assertion extraction test.

## Stop Conditions

Stop if matter CRUD is missing.

---

# WP-11 — W5 Support Matrix

## Status

`not_started`

## Owner Tool

Codex or Cursor

## Branch

`dev/codex-support-matrix`

## Objective

Implement assertion-to-evidence support matrix.

## Source Documents to Read

```text
docs/implementation/03 Agent Prompt Registry v0.md
docs/implementation/04 MVP Acceptance Test Plan.md
docs/implementation/01 Database Schema v0.md
```

## Files / Folders Allowed

```text
src/app/matters/[matterId]/assertions/
src/features/support-matrix/
src/server/support-matrix/
src/server/assertions/
```

## Tasks

1. Support Matrix table.
2. Link assertion to evidence/extraction.
3. Assign support state.
4. Show unsupported assertions.
5. Show contradicted assertions.
6. Show extraction quality caveats.

## Acceptance Criteria

* supported assertions require evidence/extraction link;
* unsupported facts visible;
* failed/QA-flagged extraction cannot silently support assertion;
* evidence gaps visible.

## Tests Required

Manual support matrix test.

## Stop Conditions

Stop if assertions or evidence tables are missing.

---

# WP-12 — W6 Strategy and W7 Research

## Status

`not_started`

## Owner Tool

Cursor or Codex

## Branch

`dev/cursor-strategy-research`

## Objective

Implement simplified Strategy and Research memo workflows.

## Source Documents to Read

```text
docs/implementation/03 Agent Prompt Registry v0.md
docs/implementation/04 MVP Acceptance Test Plan.md
```

## Files / Folders Allowed

```text
src/app/matters/[matterId]/strategy/
src/app/matters/[matterId]/research/
src/features/strategy/
src/features/research/
src/server/strategy/
src/server/research/
```

## Tasks

1. Strategy Memo create/view.
2. Strategy Points.
3. Research Questions.
4. Research Memo create/view.
5. Source/authority list.
6. Limitations field.

## Acceptance Criteria

* strategy references support matrix;
* research states jurisdiction;
* verification status visible;
* limitations visible.

## Tests Required

Manual strategy/research test.

## Stop Conditions

Stop if W5 support matrix is missing.

---

# WP-13 — W8 Argument Draft

## Status

`not_started`

## Owner Tool

Cursor or Codex

## Branch

`dev/cursor-argument`

## Objective

Implement Argument Draft workflow.

## Source Documents to Read

```text
docs/implementation/03 Agent Prompt Registry v0.md
docs/implementation/04 MVP Acceptance Test Plan.md
```

## Files / Folders Allowed

```text
src/app/matters/[matterId]/argument/
src/features/argument/
src/server/argument/
```

## Tasks

1. Generate/create Argument Draft.
2. Show intended audience.
3. Show evidence/source basis.
4. Show unsupported/weak claims.
5. Set artifact status to draft.
6. Route to W9.

## Acceptance Criteria

* draft created;
* status is draft;
* unsupported claims panel visible;
* W9 route exists;
* no filing-ready status.

## Tests Required

Manual argument draft test.

## Stop Conditions

Stop if W6/W7 artifacts are missing.

---

# WP-14 — W9 Adversarial Review

## Status

`not_started`

## Owner Tool

Codex or Cursor

## Branch

`dev/codex-w9-adversarial`

## Objective

Implement mandatory W9 adversarial critique workflow.

## Source Documents to Read

```text
docs/implementation/03 Agent Prompt Registry v0.md
docs/implementation/04 MVP Acceptance Test Plan.md
docs/lexos-system-spec/12 LEXOS Testing, Evaluation, and Quality Assurance Specification.md
```

## Files / Folders Allowed

```text
src/app/matters/[matterId]/adversarial/
src/features/adversarial/
src/server/adversarial/
```

## Tasks

1. Generate/create Adversarial Critique.
2. Store Attack Matrix.
3. Store loop decision.
4. Show severity.
5. Show blockers.
6. Prevent silent skip to final output.

## Acceptance Criteria

* W9 critique exists;
* Attack Matrix exists;
* loop decision exists;
* critique is visible before W11;
* critical issues remain visible.

## Tests Required

Manual W9 critique test.

## Stop Conditions

Stop if W8 draft is missing.

---

# WP-15 — W11 Revised Output

## Status

`not_started`

## Owner Tool

Cursor or Codex

## Branch

`dev/cursor-revised-output`

## Objective

Implement Revised Output workflow.

## Source Documents to Read

```text
docs/implementation/03 Agent Prompt Registry v0.md
docs/implementation/04 MVP Acceptance Test Plan.md
```

## Files / Folders Allowed

```text
src/app/matters/[matterId]/output/
src/features/output/
src/server/output/
```

## Tasks

1. Generate/create Revised Output.
2. Show revision summary.
3. Show issues addressed.
4. Show remaining risks.
5. Show unresolved issues.
6. Set artifact status.
7. Require review marker for final internal status.

## Acceptance Criteria

* revised output exists;
* W9 issues are not erased;
* risks visible;
* output internal unless reviewed;
* artifact status visible.

## Tests Required

Manual revised output test.

## Stop Conditions

Stop if W9 critique is missing.

---

# WP-16 — Risk, Workflow, Audit Panels

## Status

`not_started`

## Owner Tool

Cursor

## Branch

`dev/cursor-risk-workflow-audit`

## Objective

Expose cross-cutting risk, workflow, and audit visibility.

## Source Documents to Read

```text
docs/implementation/04 MVP Acceptance Test Plan.md
docs/lexos-system-spec/11 LEXOS UI-UX and Operator Experience Specification.md
```

## Files / Folders Allowed

```text
src/app/dashboard/
src/app/matters/[matterId]/risks/
src/app/matters/[matterId]/workflow/
src/features/risks/
src/features/workflow/
src/features/audit/
src/components/
```

## Tasks

1. Risk panel.
2. Workflow state panel.
3. Audit timeline.
4. Blocked matter banner.
5. Failed extraction visibility.
6. Failed agent/tool run visibility.

## Acceptance Criteria

* high/critical risks visible;
* workflow state visible;
* blocked status visible;
* audit events visible;
* extraction failures visible.

## Tests Required

Manual UI test.

## Stop Conditions

Stop if risk/workflow/audit tables are missing.

---

# WP-17 — Prompt Registry Implementation

## Status

`not_started`

## Owner Tool

Codex

## Branch

`dev/codex-prompts`

## Objective

Implement prompt templates as files or code constants.

## Source Documents to Read

```text
docs/implementation/03 Agent Prompt Registry v0.md
docs/lexos-system-spec/10 LEXOS Agent Role and Prompt Library.md
```

## Files / Folders Allowed

```text
docs/prompts/
src/prompts/
src/lib/prompts/
```

## Tasks

1. Create prompt files/constants.
2. Create prompt registry index.
3. Include prompt names and versions.
4. Preserve variables.
5. Do not implement model calls unless instructed.

## Acceptance Criteria

* all MVP prompts are represented;
* versions included;
* required variables listed;
* anti-invention and external-content-as-data rules present.

## Tests Required

No runtime tests required.

Manual prompt review.

## Stop Conditions

Stop if prompt storage location conflicts with existing architecture.

---

# WP-18 — Model Call / Agent Runner Foundation

## Status

`not_started`

## Owner Tool

Cursor

## Branch

`dev/cursor-agent-runner`

## Objective

Implement basic agent runner infrastructure.

## Source Documents to Read

```text
docs/implementation/03 Agent Prompt Registry v0.md
docs/implementation/01 Database Schema v0.md
docs/lexos-system-spec/07 LEXOS Model, Tool, and Automation Specification.md
```

## Files / Folders Allowed

```text
src/server/agents/
src/lib/models/
src/lib/prompts/
src/features/agents/
```

## Tasks

1. Prompt rendering utility.
2. Model provider abstraction.
3. Agent output logging.
4. Model run logging.
5. Error handling.
6. No autonomous external tools.

## Acceptance Criteria

* agent can run with a configured provider or mock provider;
* agent output recorded;
* model run recorded;
* failures visible;
* no secrets client-side.

## Tests Required

Unit/manual model runner test.

## Stop Conditions

Stop if API keys are unavailable and no mock mode exists.

---

# WP-19 — MVP Acceptance Test Suite

## Status

`not_started`

## Owner Tool

Codex

## Branch

`dev/codex-acceptance-tests`

## Objective

Create MVP acceptance tests or manual verification scripts.

## Source Documents to Read

```text
docs/implementation/04 MVP Acceptance Test Plan.md
docs/implementation/00 MVP Implementation Roadmap.md
docs/implementation/01 Database Schema v0.md
docs/implementation/02 W4-lite Enhanced Ingestion Build Spec.md
```

## Files / Folders Allowed

```text
tests/
e2e/
docs/testing/
src/__tests__/
```

## Tasks

1. Create acceptance test checklist.
2. Add object spine tests where practical.
3. Add W4 ingestion tests.
4. Add W5/W9 tests where practical.
5. Add manual demo script if automation incomplete.

## Acceptance Criteria

* tests/checklists map to acceptance plan;
* W4 checklist included;
* W9 required;
* retrieval scope tests included if retrieval enabled.

## Tests Required

Run test suite if implemented.

## Stop Conditions

Stop if app foundation is not ready.

---

# WP-20 — Integration and MVP Demo

## Status

`not_started`

## Owner Tool

Cursor

## Branch

`dev/cursor-integration`

## Objective

Integrate work packets and run full MVP demo.

## Source Documents to Read

```text
docs/implementation/00 MVP Implementation Roadmap.md
docs/implementation/04 MVP Acceptance Test Plan.md
AGENT_HANDOFF.md
PROJECT_STATE.md
```

## Files / Folders Allowed

All implementation files except canonical docs unless explicitly needed.

## Tasks

1. Merge relevant work branches.
2. Resolve conflicts.
3. Run build/lint/tests.
4. Run MVP demo script.
5. Update PROJECT_STATE.md.
6. Create final MVP acceptance report.

## Acceptance Criteria

* app runs;
* demo matter completes;
* W4 works;
* W5 works;
* W9 works;
* revised output exists;
* risks/workflow/audit visible;
* acceptance report created.

## Tests Required

Full MVP acceptance test.

## Stop Conditions

Stop if critical work packet is missing or branch conflict risks data loss.

---

# 11. Suggested Parallelization

Do not parallelize tasks that depend on unfinished schema.

## Safe Early Sequence

1. Cursor: WP-00
2. Cursor: WP-01
3. Cursor/Codex: WP-02
4. Cursor: WP-03
5. Cursor: WP-04

## Safe Parallel Work After Schema

After WP-02 is merged:

* Codex can work on WP-17 Prompt Registry.
* Codex can work on WP-19 test skeleton.
* Cursor can work on WP-04 Client/Matter.
* Cursor can work on WP-06 W4 Upload.

## Safe Parallel Work After W4 Foundation

After WP-06 and WP-07:

* Codex can work on WP-08 W4 QA.
* Cursor can work on WP-09 Evidence UI.
* Codex can prepare W4 tests.

## Do Not Parallelize Too Early

Do not start W5/W6/W8/W9 implementation before:

* schema exists;
* matter exists;
* evidence exists;
* assertions exist.

---

# 12. Codex Task Sizing Rules

Codex tasks should be small.

Good Codex tasks:

* implement one service;
* implement one test suite;
* review one migration;
* add one UI component;
* fix one bug;
* create prompt files.

Bad Codex tasks:

* build full app;
* implement all workflows;
* redesign schema;
* create entire frontend;
* refactor everything.

If Codex hits rate limits, work must be recoverable from:

* branch;
* commit;
* AGENT_HANDOFF.md;
* test output;
* final report.

---

# 13. Cursor Task Sizing Rules

Cursor can handle larger integration tasks but should still work in phases.

Cursor should avoid:

* making broad undocumented edits;
* modifying canonical docs during coding;
* starting many unrelated changes in one Composer session;
* relying on conversation memory instead of files.

Cursor should update:

* `PROJECT_STATE.md`;
* `AGENT_HANDOFF.md`;
* work packet status in this register if needed.

---

# 14. PROJECT_STATE.md Required Structure

Recommended content:

```markdown
# PROJECT_STATE

## Current Branch

## Current Phase

## Completed Work Packets

## Active Work Packet

## Pending Work Packets

## Architecture Decisions

## Current Blockers

## Environment Status

## Supabase Status

## App Status

## Known Risks

## Next Recommended Step
```

---

# 15. AGENT_HANDOFF.md Required Structure

Recommended content:

```markdown
# AGENT_HANDOFF

## Latest Handoff Summary

## Handoff Log

### YYYY-MM-DD — <Tool> — <Work Packet ID>

#### Branch

#### Files Changed

#### What Was Implemented

#### Decisions Made

#### Tests Run

#### Test Results

#### Known Issues

#### Blockers

#### Next Recommended Step
```

---

# 16. First Cursor Prompt After These Documents Are Saved

Use this prompt to start implementation.

```markdown
You are working in the local repo:

`/Users/linktrend/Projects/LiNKtrend-LEXOS`

You are Cursor and you are the lead implementation IDE.

Read first:
1. `docs/implementation/00 MVP Implementation Roadmap.md`
2. `docs/implementation/05 Work Packet Register.md`
3. `PROJECT_STATE.md`
4. `AGENT_HANDOFF.md`

Task:
Execute Work Packet WP-00 — Repository Control and State Files.

Rules:
- Do not modify `docs/lexos-system-spec/`.
- Do not modify `docs/source-briefings/`.
- Do not create app/framework code yet.
- Do not store secrets.
- Do not overwrite existing substantive content without reporting first.

Allowed files:
- `PROJECT_STATE.md`
- `AGENT_HANDOFF.md`
- `README.md`
- `.gitignore`
- `.env.example`

Deliver:
1. Populate `PROJECT_STATE.md`.
2. Populate `AGENT_HANDOFF.md` with initial structure.
3. Create or update `README.md`.
4. Create `.gitignore`.
5. Create `.env.example` with placeholders only.
6. Final report listing files changed and confirming no forbidden docs were modified.
```

---

# 17. Work Packet Register Update Rule

When a work packet starts, update its status from:

```text
not_started
```

to:

```text
in_progress
```

When ready for review, update to:

```text
ready_for_review
```

When accepted, update to:

```text
accepted
```

When merged, update to:

```text
merged
```

This file may be updated by Cursor as the lead IDE.

Codex should not update this register unless explicitly instructed.

---

# 18. Final Notes

The highest-risk implementation areas are:

1. schema correctness;
2. evidence/extraction separation;
3. W4 ingestion quality;
4. assertion/support mapping;
5. W9 adversarial critique;
6. retrieval isolation;
7. privilege/confidentiality propagation;
8. auditability.

Do not rush these.

The MVP should be simple but structurally correct.

A simple structurally correct LEXOS is better than a polished generic chatbot that violates the architecture.

```
```
