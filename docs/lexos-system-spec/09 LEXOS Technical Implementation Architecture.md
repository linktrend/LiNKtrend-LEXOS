# Document 9 — LEXOS Technical Implementation Architecture


Insert the following **Agent Navigation Index** at the beginning of Document 9, immediately after the document title and document status.

```markdown id="u3p8bn"
# Document Index and Agent Navigation Guide

## Purpose of This Index

This index helps human readers, AI coding agents, technical architects, product agents, security agents, and system builders quickly locate relevant technical implementation rules in **Document 9 — LEXOS Technical Implementation Architecture**.

Document 9 translates the LEXOS doctrine, object model, governance rules, workflow specification, security architecture, model/tool specification, and MVP scope into a technical architecture.

Agents should use this index before performing any coding, schema, frontend, backend, storage, retrieval, deployment, or technical planning task.

---

# Quick Navigation by Task

## If the task is about overall technical architecture

Read:

- **Section 1 — Purpose and Scope**
- **Section 2 — System Architecture Overview**
- **Section 26 — Summary**

Use these sections to understand the technical doctrine and high-level architecture.

Key concepts:

- technical architecture must preserve legal architecture;
- frontend/backend/database/storage/model/retrieval layers;
- MVP vs target-state architecture;
- technical red lines.

---

## If the task is about technology stack

Read:

- **Section 3 — Recommended MVP Technology Stack**

Use this section when selecting or validating frontend, backend, database, storage, vector, model, parser, and deployment technologies.

Key concepts:

- Next.js;
- Supabase Postgres;
- Supabase Storage;
- pgvector;
- LLM provider abstraction;
- document parser;
- TypeScript.

---

## If the task is about application layering

Read:

- **Section 4 — Application Layer Architecture**

Use this section when organizing code, service layers, domain services, workflow services, agent services, adapters, or repositories.

Key concepts:

- UI layer;
- domain service layer;
- workflow service layer;
- agent service layer;
- model/tool adapter layer;
- repository layer.

---

## If the task is about frontend or UI routing

Read:

- **Section 5 — Frontend Architecture**

Use this section when designing Next.js routes, Matter Workspace, evidence UI, assertion UI, artifact UI, or persistent risk/workflow panels.

Key concepts:

- Matter Workspace;
- required MVP pages;
- persistent status panel;
- Evidence UI;
- Assertion UI;
- Artifact UI;
- UI red lines.

---

## If the task is about backend or APIs

Read:

- **Section 6 — Backend/API Architecture**

Use this section when designing API routes, server actions, service validation, matter-scoped APIs, or backend red lines.

Key concepts:

- API categories;
- authenticated actor;
- matter access;
- service-level validation;
- backend enforcement of legal integrity.

---

## If the task is about database architecture

Read:

- **Section 7 — Database Architecture**

Use this section when designing Supabase schema, tables, foreign keys, JSONB use, indexes, RLS, or migrations.

Key concepts:

- required MVP tables;
- optional early tables;
- common columns;
- foreign keys;
- indexes;
- RLS.

---

## If the task is about object storage

Read:

- **Section 8 — Object Storage Architecture**

Use this section when designing storage buckets, file paths, evidence originals, extraction files, artifact files, storage metadata, or temporary files.

Key concepts:

- evidence-originals;
- evidence-extractions;
- artifacts;
- matter-aware paths;
- original preservation.

---

## If the task is about evidence processing

Read:

- **Section 9 — Evidence Processing Architecture**

Use this section when designing evidence upload, extraction jobs, processing statuses, extraction outputs, failure handling, or document parser integration.

Key concepts:

- Evidence Object creation;
- extraction flow;
- processing status;
- failed extraction;
- extraction output.

---

## If the task is about vector search or retrieval

Read:

- **Section 10 — Vector and Retrieval Architecture**

Use this section when designing pgvector, embedding chunks, matter-scoped retrieval, retrieval metadata, or retrieval result formats.

Key concepts:

- vector chunk table;
- retrieval filters;
- active matter;
- no global retrieval;
- retrieval result structure.

---

## If the task is about agent execution

Read:

- **Section 11 — Agent Execution Architecture**

Use this section when designing agent runs, prompt context construction, model call flow, structured output validation, or agent write permissions.

Key concepts:

- agent run flow;
- scoped context;
- output validation;
- service-layer writes;
- required MVP agent runs.

---

## If the task is about workflow orchestration

Read:

- **Section 12 — Workflow Orchestration Architecture**

Use this section when designing workflow state, workflow actions, status transitions, blocked states, and target-state orchestration.

Key concepts:

- workflow_states table;
- workflow action pattern;
- blocked flag;
- next action;
- target-state workflow engine.

---

## If the task is about model/tool integrations

Read:

- **Section 13 — Model and Tool Integration Architecture**

Use this section when designing model adapters, parser adapters, storage adapters, tool adapters, configuration, and logging.

Key concepts:

- LLMAdapter;
- EmbeddingAdapter;
- ParserAdapter;
- StorageAdapter;
- provider abstraction;
- model/tool logs.

---

## If the task is about authentication or authorization

Read:

- **Section 14 — Authentication and Authorization Architecture**

Use this section when implementing login, roles, matter access, restricted actions, or target-state RBAC/ABAC.

Key concepts:

- MVP roles;
- matter access;
- role permission;
- privilege/confidentiality compatibility;
- target-state access grants.

---

## If the task is about audit logging

Read:

- **Section 15 — Audit and Logging Architecture**

Use this section when implementing audit events, model-use logs, artifact status logs, workflow logs, or sensitive logging controls.

Key concepts:

- MVP audit events;
- audit event fields;
- no sensitive content in insecure logs.

---

## If the task is about observability or error handling

Read:

- **Section 16 — Observability Architecture**

Use this section when designing dashboards, agent run status, evidence processing status, failed jobs, risks, blocked workflows, or error visibility.

Key concepts:

- workflow status;
- evidence processing status;
- agent run status;
- failed extractions;
- blocked workflows;
- actionable errors.

---

## If the task is about environment variables or secrets

Read:

- **Section 17 — Environment Configuration**

Use this section when configuring local/dev/staging/prod environments, `.env` files, secrets, API keys, or real-data safety.

Key concepts:

- required environment variables;
- secret handling;
- environment separation;
- no secrets in repository.

---

## If the task is about deployment

Read:

- **Section 18 — Deployment Architecture**

Use this section when choosing Vercel, DigitalOcean, Docker, Supabase deployment, private deployment, or target-state deployment.

Key concepts:

- MVP deployment options;
- private/internal deployment;
- managed Supabase;
- target-state containerized services.

---

## If the task is about repository organization or coding workflow

Read:

- **Section 19 — Development Workflow**

Use this section when organizing repo folders, app structure, coding standards, branches, or coding-agent instructions.

Key concepts:

- `/apps`;
- `/packages`;
- `/src/features`;
- domain services;
- TypeScript;
- no direct DB writes from UI;
- coding-agent rules.

---

## If the task is about MVP technical build order

Read:

- **Section 20 — MVP Build Order**

Use this section when creating implementation plans, coding-agent prompts, task breakdowns, or development milestones.

Key concepts:

- project setup;
- auth;
- database schema;
- storage;
- Client/Matter CRUD;
- Evidence;
- Assertions;
- Support Matrix;
- Argument;
- W9;
- hardening.

---

## If the task is about migrations or versioning

Read:

- **Section 21 — Data Migration and Versioning**

Use this section when designing migrations, artifact versions, object versions, or status transition history.

Key concepts:

- migration files;
- artifact versioning;
- supersedes ID;
- audit history.

---

## If the task is about backup or recovery

Read:

- **Section 22 — Backup and Recovery**

Use this section when designing database backups, storage backups, recovery, rollback, or real legal data readiness.

Key concepts:

- managed database backup;
- storage backup;
- recovery from deletion/migration/storage error;
- MVP caution with real evidence.

---

## If the task is about testing

Read:

- **Section 23 — Testing Architecture**

Use this section when creating technical tests, legal cognition tests, security tests, retrieval tests, or workflow tests.

Key concepts:

- schema tests;
- service tests;
- workflow tests;
- retrieval-scope tests;
- evidence upload tests;
- legal cognition tests.

---

## If the task is about target-state architecture

Read:

- **Section 24 — Target-State Technical Architecture**

Use this section when designing future services, workflow engine, event bus, policy engine, agent runtime, or autonomous architecture.

Key concepts:

- workflow engine;
- agent runtime;
- model routing service;
- evidence workers;
- audit ledger;
- event-driven architecture;
- policy-as-code.

---

## If the task is about technical red lines

Read:

- **Section 25 — Technical Red Lines**

Use this section before approving implementation decisions.

Key concepts:

- no chat-only build;
- no anonymous evidence;
- no global retrieval;
- no unrestricted agent DB mutation;
- no missing artifact/workflow/security fields;
- no autonomous external communication in MVP.

---

# Section-by-Section Index

## Section 1 — Purpose and Scope

Use for:

- technical doctrine;
- legal architecture preservation;
- scope boundaries.

## Section 2 — System Architecture Overview

Use for:

- high-level architecture;
- MVP architecture;
- target-state architecture;
- red lines.

## Section 3 — Recommended MVP Technology Stack

Use for:

- tech stack decisions;
- Next.js/Supabase/vector/parser/model choices.

## Section 4 — Application Layer Architecture

Use for:

- service structure;
- domain layer;
- workflow layer;
- agent layer;
- adapters.

## Section 5 — Frontend Architecture

Use for:

- routes;
- Matter Workspace;
- UI panels;
- evidence/assertion/artifact displays.

## Section 6 — Backend/API Architecture

Use for:

- APIs;
- backend validation;
- service-layer rules.

## Section 7 — Database Architecture

Use for:

- tables;
- columns;
- indexes;
- RLS;
- foreign keys.

## Section 8 — Object Storage Architecture

Use for:

- file buckets;
- evidence paths;
- artifact storage;
- original preservation.

## Section 9 — Evidence Processing Architecture

Use for:

- file processing;
- extraction;
- processing statuses;
- failure handling.

## Section 10 — Vector and Retrieval Architecture

Use for:

- pgvector;
- embedding chunks;
- scoped retrieval.

## Section 11 — Agent Execution Architecture

Use for:

- agent runs;
- prompt context;
- structured outputs;
- validation.

## Section 12 — Workflow Orchestration Architecture

Use for:

- workflow state;
- workflow action pattern;
- blocked status.

## Section 13 — Model and Tool Integration Architecture

Use for:

- model adapters;
- tool adapters;
- provider abstraction.

## Section 14 — Authentication and Authorization Architecture

Use for:

- login;
- roles;
- matter access;
- permissions.

## Section 15 — Audit and Logging Architecture

Use for:

- audit events;
- material action logs;
- sensitive log avoidance.

## Section 16 — Observability Architecture

Use for:

- dashboards;
- status panels;
- errors;
- failed jobs.

## Section 17 — Environment Configuration

Use for:

- environment variables;
- secrets;
- local/dev/staging/prod.

## Section 18 — Deployment Architecture

Use for:

- hosting;
- managed Supabase;
- private deployment;
- target-state deployment.

## Section 19 — Development Workflow

Use for:

- repo structure;
- folder structure;
- coding standards;
- branch rules.

## Section 20 — MVP Build Order

Use for:

- implementation sequence;
- coding-agent planning.

## Section 21 — Data Migration and Versioning

Use for:

- migrations;
- artifact versioning;
- status history.

## Section 22 — Backup and Recovery

Use for:

- backup planning;
- storage recovery;
- real evidence caution.

## Section 23 — Testing Architecture

Use for:

- technical tests;
- legal cognition tests;
- retrieval/security tests.

## Section 24 — Target-State Technical Architecture

Use for:

- future services;
- workflow engine;
- policy engine;
- event bus.

## Section 25 — Technical Red Lines

Use for:

- implementation review;
- architecture compliance.

## Section 26 — Summary

Use for:

- compressed doctrine;
- final technical compliance check.

---

# Fast Lookup Table

| Topic | Primary Sections |
|---|---|
| Technical overview | Sections 1, 2, 26 |
| Stack | Section 3 |
| App layers | Section 4 |
| Frontend | Section 5 |
| Backend/API | Section 6 |
| Database | Section 7 |
| Storage | Section 8 |
| Evidence processing | Section 9 |
| Vector/retrieval | Section 10 |
| Agent execution | Section 11 |
| Workflow orchestration | Section 12 |
| Model/tool integration | Section 13 |
| Auth/authorization | Section 14 |
| Audit/logging | Section 15 |
| Observability | Section 16 |
| Environment/secrets | Section 17 |
| Deployment | Section 18 |
| Development workflow | Section 19 |
| MVP build order | Section 20 |
| Migration/versioning | Section 21 |
| Backup/recovery | Section 22 |
| Testing | Section 23 |
| Target-state architecture | Section 24 |
| Red lines | Section 25 |

---

# Agent Reading Protocol

Before performing any task based on Document 9, an agent should:

1. **Identify the technical domain.**

   Determine whether the task concerns stack, frontend, backend, database, storage, retrieval, agents, workflow orchestration, model/tool integration, auth, audit, deployment, testing, or build order.

2. **Read the relevant topic section.**

   Use the Quick Navigation above.

3. **Read Section 25 before making architecture changes.**

   The technical red lines control implementation decisions.

4. **Read Section 7 if changing schema.**

   Required tables and common columns must be preserved.

5. **Read Section 10 if implementing retrieval.**

   Retrieval must remain matter-scoped and permission-filtered.

6. **Read Section 20 if planning implementation tasks.**

   MVP build order matters.

7. **Read Section 26 before final recommendations.**

   Section 26 gives the compressed technical doctrine.

---

# Mandatory Cross-Checks for Agents

## For schema/database tasks

Read:

- Section 7;
- Section 21;
- Section 25.

Mandatory check:

- Are Client, Matter, Evidence, Assertion, Output Artifact, Workflow State, Risk, Agent Output, and Audit Event preserved?

## For frontend tasks

Read:

- Section 5;
- Section 16.

Mandatory check:

- Does the UI expose workflow state, risks, unsupported facts, artifact status, and evidence/assertion links?

## For backend/API tasks

Read:

- Section 6;
- Section 14;
- Section 15.

Mandatory check:

- Does the backend enforce matter scope, service validation, permissions, and audit logging?

## For evidence tasks

Read:

- Section 8;
- Section 9.

Mandatory check:

- Is original evidence preserved and extraction stored as derived output?

## For retrieval tasks

Read:

- Section 10.

Mandatory check:

- Are `client_id`, `matter_id`, privilege, confidentiality, object type, and current-version filters applied before retrieval?

## For agent tasks

Read:

- Section 11;
- Section 13.

Mandatory check:

- Does the agent run use scoped context, structured output validation, and service-layer writes?

## For deployment tasks

Read:

- Section 17;
- Section 18;
- Section 22.

Mandatory check:

- Are secrets protected, environments separated, and backups considered before real legal data is used?

## For coding-agent implementation tasks

Read:

- Section 19;
- Section 20;
- Section 25.

Mandatory check:

- Does the implementation sequence build the object spine before AI features and avoid all technical red lines?

---

# Final Instruction to Agents

Document 9 defines how LEXOS should be technically built.

Agents must not implement LEXOS as a generic chat app.

When building LEXOS, preserve:

- object-centric architecture;
- client/matter separation;
- Evidence Objects;
- Assertion Objects;
- support states;
- Output Artifacts;
- Workflow State;
- Risk Records;
- source/evidence links;
- scoped retrieval;
- privilege/confidentiality fields;
- audit events;
- agent/model/tool traceability;
- artifact versioning.

The technical build should begin with records, workflows, evidence, assertions, artifacts, and state.

Only then should agentic automation be layered on top.

## Document Status

**Document Name:** LEXOS Technical Implementation Architecture  
**Document Number:** Document 9  
**Version:** v1.0 Draft  
**Purpose:** Define the technical architecture required to implement the LEXOS MVP and preserve a clean path toward the target-state autonomous legal institution.  
**Depends On:**  
- Document 1 — LEXOS Institutional Doctrine  
- Document 2 — LEXOS Canonical Object Model  
- Document 3 — LEXOS Governance and Epistemic Integrity Rules  
- Document 4 — LEXOS Cognitive Architecture  
- Document 5 — LEXOS Workflow Specification  
- Document 6 — LEXOS Security and Privilege Architecture  
- Document 7 — LEXOS Model, Tool, and Automation Specification  
- Document 8 — LEXOS MVP Scope and Build Specification  

**Primary Use:** MVP engineering implementation, database design, frontend/backend architecture, Supabase schema planning, storage design, retrieval architecture, workflow orchestration, agent execution, deployment planning, and coding-agent implementation prompts.

---

# Section 1 — Purpose and Scope

## 1.1 Purpose of This Document

This document defines the technical implementation architecture for LEXOS.

The purpose is to translate the institutional, object, governance, cognitive, workflow, security, model/tool, and MVP specifications into a buildable software architecture.

LEXOS must not be implemented as a loose chat interface over uploaded documents.

It must be implemented as an object-centric, workflow-driven, evidence-grounded, matter-scoped, agent-assisted legal operating system.

The technical architecture must preserve:

- Client and Matter separation;
- Evidence Object structure;
- Assertion-level truth and support states;
- Source and provenance links;
- Workflow State;
- Output Artifact status;
- Risk Records;
- scoped retrieval;
- privilege/confidentiality fields;
- auditability;
- model/tool traceability;
- versioning;
- extensibility toward target-state autonomy.

## 1.2 Scope of This Document

This document defines:

- system architecture;
- recommended MVP stack;
- frontend architecture;
- backend/API architecture;
- database architecture;
- object storage architecture;
- vector/retrieval architecture;
- authentication and authorization;
- workflow orchestration;
- agent execution architecture;
- model/tool integration architecture;
- audit logging;
- observability;
- deployment architecture;
- environment configuration;
- development workflow;
- MVP technical build order;
- target-state expansion.

This document does not define:

- final production code;
- full SQL migrations;
- detailed UI component library;
- final prompt library;
- detailed deployment runbook;
- test suite implementation;
- final legal compliance rules by jurisdiction.

Those belong in later implementation artifacts and operational manuals.

## 1.3 Core Technical Doctrine

The core technical doctrine is:

> Technical architecture must preserve legal architecture.

Engineering convenience must not collapse legal boundaries.

The system must not choose a data model, retrieval method, prompt pattern, or automation shortcut that violates LEXOS foundations.

---

# Section 2 — System Architecture Overview

## 2.1 High-Level Architecture

The MVP should use a modular web application architecture:

1. Frontend application;
2. Backend/API layer;
3. Relational database;
4. Object storage;
5. Evidence extraction service;
6. LLM/model service integration;
7. Optional vector retrieval layer;
8. Workflow state layer;
9. Agent execution layer;
10. Audit/logging layer;
11. Authentication/authorization layer.

## 2.2 Recommended MVP Architecture

Recommended MVP architecture:

- **Frontend:** Next.js application;
- **Backend:** Next.js server actions/API routes or dedicated API service;
- **Database:** Supabase Postgres;
- **Storage:** Supabase Storage or compatible S3-style object storage;
- **Vector:** Supabase pgvector where retrieval is implemented;
- **Auth:** Supabase Auth or equivalent;
- **Extraction:** LlamaParse or equivalent parser;
- **Models:** configurable LLM provider abstraction;
- **Orchestration:** simple workflow state table + server-side workflow handlers;
- **Background Jobs:** simple queue or scheduled worker if needed;
- **Deployment:** initially single app deployment with managed Supabase backend;
- **Audit:** `audit_events` table plus model/tool metadata records.

## 2.3 Target-State Architecture

Target-state architecture should evolve toward:

- modular service architecture;
- policy-controlled workflow engine;
- governed agent runtime;
- model routing service;
- tool authority service;
- retrieval permission engine;
- secure evidence vault;
- audit ledger;
- background job orchestration;
- monitoring/observability stack;
- multi-tenant architecture;
- scalable object storage;
- structured event bus;
- institutional learning subsystem.

## 2.4 Architecture Red Lines

The technical implementation must not:

- store all matter knowledge as chat messages only;
- store evidence as anonymous files;
- use global unfiltered vector retrieval;
- omit `client_id` and `matter_id` from matter-scoped records;
- allow agents unrestricted database access;
- allow output finality by filename;
- overwrite major artifacts without versioning;
- allow AI-generated facts to bypass Assertion truth/support states;
- skip audit events for material actions.

---

# Section 3 — Recommended MVP Technology Stack

## 3.1 Frontend

Recommended:

- Next.js;
- React;
- TypeScript;
- Tailwind CSS;
- shadcn/ui or equivalent component system;
- server components where appropriate;
- client components for interactive workspaces.

## 3.2 Backend

Recommended:

- Next.js API routes/server actions for MVP;
- typed service layer;
- schema validation with Zod or equivalent;
- Supabase client/server SDK;
- explicit domain services for Client, Matter, Evidence, Assertion, Workflow, Artifact, Agent Run.

Target-state may move heavy services to dedicated backend workers.

## 3.3 Database

Recommended:

- Supabase Postgres;
- row-level security where feasible;
- structured relational tables;
- JSONB fields only where flexibility is needed;
- migration files;
- explicit indexes on `client_id`, `matter_id`, status fields, and foreign keys.

## 3.4 Storage

Recommended:

- Supabase Storage or S3-compatible storage;
- matter-aware paths;
- original evidence preservation;
- extracted text stored separately;
- artifact exports stored separately.

## 3.5 Vector Retrieval

Recommended MVP:

- pgvector if retrieval is implemented;
- matter-scoped metadata;
- no global unfiltered retrieval.

## 3.6 Model Providers

MVP should support one primary LLM provider through an abstraction layer.

Target-state should support multiple model providers.

The application should not hard-code model-specific logic into workflow components.

## 3.7 Parsing and OCR

MVP should support:

- **LlamaParse/equivalent PDF parsing** licensed as primary for supported document surfaces;
- DOCX/text parsing mirrored through the same disciplined dual-artifact emitter;
- **pixel OCR + vision overlays** routed as **support** for screenshots/scanned composites—not accepted finals without markdown + JSON and QA disposition when structure/materiality demands it;
- markdown + structured JSON extraction where pathway policies require it;
- extraction status and quality flags.

Advanced multimodal processing can be deferred.

---

# Section 4 — Application Layer Architecture

## 4.1 Layered Application Structure

Recommended layers:

1. UI layer;
2. domain service layer;
3. workflow service layer;
4. agent service layer;
5. model/tool adapter layer;
6. database/repository layer;
7. audit/logging layer.

## 4.2 UI Layer

The UI layer should:

- display canonical objects;
- expose workflow state;
- show risks and unsupported facts;
- allow human review/correction;
- trigger workflow actions;
- show artifact versions and status.

It should not contain business-critical governance logic.

## 4.3 Domain Service Layer

Domain services should manage core objects:

- ClientService;
- MatterService;
- EvidenceService;
- AssertionService;
- RiskService;
- ArtifactService;
- ResearchService;
- StrategyService;
- ArgumentService;
- WorkflowService;
- AuditService;

When W0-lite or target-state onboarding is exercised:

- IntakeService;
- IntakeOrchestratorService;
- CandidateClientService;
- CandidateMatterService;
- IntakeTaskService.

## 4.4 Workflow Service Layer

Workflow services execute W1-lite through W11-lite.

Examples:

- CaseStoryWorkflow;
- EvidenceIngestWorkflow;
- SupportMatrixWorkflow;
- StrategyWorkflow;
- ResearchWorkflow;
- ArgumentWorkflow;
- AdversarialReviewWorkflow;
- RevisionWorkflow.

## 4.5 Agent Service Layer

Agent services prepare model prompts, pass scoped context, receive structured outputs, validate outputs, and create/update records.

Agents should not directly write arbitrary database records without service-layer validation.

## 4.6 Model/Tool Adapter Layer

Adapters isolate external providers.

Examples:

- LLMAdapter;
- EmbeddingAdapter;
- ParserAdapter;
- StorageAdapter;
- SearchAdapter;
- ExportAdapter.

This allows providers to be replaced without rewriting workflows.

## 4.7 Repository Layer

Repository functions should handle database reads/writes.

They must enforce:

- matter scoping;
- client scoping;
- status filters;
- privilege/confidentiality filters where applicable;
- audit hooks where material.

---

# Section 5 — Frontend Architecture

## 5.1 Frontend Purpose

The frontend must make legal cognition inspectable.

The UI should not hide:

- unsupported facts;
- contradictions;
- risks;
- workflow status;
- artifact status;
- source/evidence links;
- privilege/confidentiality fields.

## 5.2 Required MVP Pages

Required pages:

1. `/clients`;
2. `/clients/[clientId]`;
3. `/matters`;
4. `/matters/[matterId]`;
5. `/matters/[matterId]/story`;
6. `/matters/[matterId]/evidence`;
7. `/matters/[matterId]/assertions`;
8. `/matters/[matterId]/strategy`;
9. `/matters/[matterId]/research`;
10. `/matters/[matterId]/argument`;
11. `/matters/[matterId]/adversarial`;
12. `/matters/[matterId]/output`;
13. `/matters/[matterId]/workflow`;
14. `/matters/[matterId]/risks`.

These may be implemented as routes or tabs inside a Matter Workspace.

## 5.3 Matter Workspace

The Matter Workspace should be the primary UI container.

It should display:

- matter header;
- client link;
- posture;
- jurisdiction;
- current workflow;
- status;
- open risks;
- active artifacts;
- navigation tabs.

## 5.4 Persistent Status Panel

The Matter Workspace should include a persistent status panel showing:

- current workflow;
- next action;
- blockers;
- unsupported assertions;
- critical risks;
- unresolved contradictions;
- latest artifact status.

## 5.5 Evidence UI

Evidence UI must show:

- file name;
- evidence type;
- upload time;
- processing status;
- extraction status;
- source;
- privilege/confidentiality;
- linked assertions;
- extracted text view.

## 5.6 Assertion UI

Assertion UI must show:

- assertion text;
- assertion type;
- truth state;
- support state;
- linked evidence;
- source links;
- contradiction flag;
- use status;
- notes.

## 5.7 Artifact UI

Artifact UI must show:

- artifact type;
- title;
- workflow origin;
- status;
- version;
- source basis;
- linked evidence/sources;
- created by;
- created at;
- updated at.

## 5.8 UI Red Lines

The UI must not:

- hide support state;
- hide risks;
- display drafts as final;
- obscure matter scope;
- allow evidence deletion without guardrails;
- allow unreviewed external export as if approved.

---

# Section 6 — Backend/API Architecture

## 6.1 Backend Purpose

The backend enforces system behavior.

It must not rely on the frontend or prompts to enforce core integrity.

## 6.2 API Categories

MVP APIs should include:

- Client APIs;
- Matter APIs;
- Evidence APIs;
- Evidence Extraction APIs;
- Assertion APIs;
- Support Matrix APIs;
- Risk APIs;
- Research APIs;
- Strategy APIs;
- Argument APIs;
- Adversarial Critique APIs;
- Artifact APIs;
- Workflow State APIs;
- Agent Run APIs;
- Audit APIs;

Optional when intake/onboarding scaffolding is shipped:

- Intake Orchestrator routing APIs (`intake_id` scoped);
- Client Candidate APIs;
- Matter Candidate APIs;
- Intake Group APIs;
- Intake Task APIs.

All matter-scoped API operations must verify:

- authenticated actor;
- client access;
- matter access;
- object permission;
- workflow permission where applicable.

## 6.4 Service-Level Validation

Before database writes, services must validate:

- required fields;
- matter/client linkage;
- allowed status transitions;
- valid truth/support states;
- artifact status;
- workflow state;
- privilege/confidentiality default values.

## 6.5 Backend Red Lines

Backend must not allow:

- evidence without matter ID;
- assertions without matter ID;
- artifact without status;
- workflow completion without required outputs;
- supported assertion without source/evidence link;
- unfiltered retrieval across matters.

---

# Section 7 — Database Architecture

## 7.1 Database Purpose

The database is the authoritative structured memory of LEXOS.

It stores canonical objects, workflow state, artifacts, risks, audit logs, and model/tool traces.

## 7.2 Required MVP Tables

Required MVP tables:

- `clients`;
- `matters`;
- `sources`;
- `evidence`;
- `evidence_extractions`;
- `assertions`;
- `risks`;
- `research_memos`;
- `strategy_memos`;
- `argument_drafts`;
- `adversarial_critiques`;
- `output_artifacts`;
- `workflow_states`;
- `agent_outputs`;
- `audit_events`.

## 7.3 Optional Early Tables

Optional:

- `persons`;
- `entities`;
- `timeline_events`;
- `legal_authorities`;
- `translations`;
- `review_events`;
- `model_records`;
- `prompt_records`;
- `tool_calls`;
- `embedding_chunks`;
- optional onboarding/W0 scaffolding: `intake_records`, `client_candidates`, `matter_candidates`, `intake_groups`, `intake_tasks` (see Document 2, Section 43).

## 7.4 Common Columns

Most tables should include:

- `id`;
- `client_id`;
- `matter_id`;
- `status`;
- `created_at`;
- `created_by`;
- `updated_at`;
- `updated_by`;
- `version`;
- `confidentiality_status`;
- `privilege_status`;
- `notes`.

Not every table requires all fields, but matter-scoped sensitive tables should include most of them.

## 7.5 Foreign Keys

Important relationships should use foreign keys where practical:

- Matter → Client;
- Evidence → Matter;
- Evidence → Source;
- Extraction → Evidence;
- Assertion → Matter;
- Artifact → Matter;
- Risk → Matter;
- Workflow State → Matter.

For many-to-many relationships, use join tables or JSON arrays only as MVP simplification.

## 7.6 JSONB Use

JSONB may be used for:

- extracted metadata;
- model output payloads;
- tool call details;
- flexible prompt outputs;
- source/evidence link arrays in MVP.

Do not use JSONB to avoid modeling core legal objects.

## 7.7 Indexing

MVP indexes should include:

- `client_id`;
- `matter_id`;
- `status`;
- `current_workflow`;
- `processing_status`;
- `truth_state`;
- `support_state`;
- `artifact_type`;
- `created_at`;
- `intake_id` plus `client_candidate_id`, `matter_candidate_id`, `intake_group_id` on intake-scope tables once enabled.

## 7.8 Row-Level Security

If using Supabase, implement RLS progressively.

MVP minimum:

- authenticated access only;
- matter/client scope enforced in services;
- RLS for high-risk tables where feasible.

Implementation rule (**W0 / intake scaffolding**): APIs and repositories MUST constrain reads/writes by `intake_id`. Intake-group endpoints MUST expose per–Client Candidate segregation (status, privilege, conflicts) rather than collapsing unrelated dossiers into a single hydration payload. **Accepted** onboarding MUST flow through deterministic promotion helpers that instantiate canonical Client/Matter rows; **rejected/abandoned** paths MUST forbid silent embedding promotion into generalized W1 memory.

Target-state:

- RLS based on tenant/client/matter/role/privilege/confidentiality.

---

# Section 8 — Object Storage Architecture

## 8.1 Storage Purpose

Object storage holds original evidence, extracted text, generated artifacts, exports, and possibly large JSON/markdown processing results.

## 8.2 Storage Buckets

Recommended buckets:

- `evidence-originals`;
- `evidence-extractions`;
- `artifacts`;
- `exports`;
- `temporary-processing`.

For MVP, these may be one bucket with strict paths and metadata, but separate buckets are cleaner.

## 8.3 Path Structure

Recommended conceptual path:

`/client/{client_id}/matter/{matter_id}/evidence/{evidence_id}/original/{filename}`

Extraction:

`/client/{client_id}/matter/{matter_id}/evidence/{evidence_id}/extraction/{extraction_id}.md`

Artifacts:

`/client/{client_id}/matter/{matter_id}/artifacts/{artifact_id}/v{version}.{ext}`

## 8.4 Original Preservation

Original evidence must not be overwritten.

Updated extraction results or translations must be stored as derived files.

## 8.5 Storage Metadata

Stored objects should include metadata:

- client ID;
- matter ID;
- evidence/artifact ID;
- privilege status;
- confidentiality status;
- uploaded by;
- created at;
- file hash if available.

## 8.6 Temporary Files

Temporary processing files should be short-lived and not treated as authoritative evidence.

---

# Section 9 — Evidence Processing Architecture

## 9.1 Evidence Processing Flow

MVP flow (enhanced ingestion):

1. User uploads file.
2. System creates Source Object if needed (shared provenance envelope).
3. System creates Evidence Object with client/matter/privilege scaffolding.
4. Original file persists in object storage **without overwrite** — it remains the evidentiary anchor.
5. Classifier assigns **media type** and ingestion pathway (text-bearing document, scanned/screenshot composites, standalone image-with-text, image-without-text, optional audio, limited/deferred video).
6. Extraction orchestration selects **LlamaParse-class or equivalent parsers** plus supporting **OCR, vision layouts, speech-to-text**, or multimodal tooling per pathway—**parser-first** for document-like files, OCR **supporting**.
7. Primary extraction emits dual artifacts: **markdown extraction** plus **structured JSON extraction** persisted on Evidence Extraction Object rows.
8. Extraction QA comparator (rules + optional models) validates coverage and consistency where enabled.
9. Evidence Extraction Object stores tool/model/confidence/QC metadata, quality score, QA flags, and human review directives.
10. Processing + extraction statuses updated with explicit enums (`accepted`, `QA flagged`, `failed`, etc.).
11. If retrieval subsystem is active, embeddings chunk accepted/current text with **evidence_id** + **extraction_id** lineage.
12. Audit Event captures inputs, toolchain versions, QA outcome, retries, suppressions.
13. Workflow engine advances W4 state toward W5 handoff readiness.

### Evidence processing pathway table

| File Type | MVP Handling | Target-State Handling |
|---|---|---|
| PDF/DOCX/TXT | **LlamaParse/equivalent layout-aware parser** → markdown + structured JSON → QA → optional embeddings | Same backbone with richer forensic QA/certified outputs |
| Scanned PDF | **Parser-first OCR/vision-assisted** extraction (LlamaParse-class + OCR/Vision QA) → markdown/JSON → QA | Stronger layout/forensic QA + calibration suites |
| PDF of screenshots / chat screenshots | **Parser-first OCR/vision-assisted** extraction → reconstructed markdown + JSON capturing sender attribution, timestamps, message boundaries/screenshot references where feasible → QA | Advanced messenger reconstruction tooling + bilingual transcript QA |
| Standalone screenshot / image-with-text | **Vision/OCR + structure reconstruction parser stack** toward markdown + JSON → QA/`human_review_required` | Specialist multimodal recon + calibrated comparators |
| Photo with no text | Visual description + metadata JSON + mandatory human-review flagging when legally material | Expert imaging review + biometric/civil recon modules |
| Audio | Preserve original + optional MVP transcription → timestamped markdown/JSON + QA flags | Diarization, translation, certified transcript workflows |
| Video | Preserve metadata + defer heavy visual analytics unless explicitly enabled | Full stack: transcripts, keyframes, OCR over frames, visual timelines |

## 9.2 Processing Status

MVP pipeline values for Evidence / W4-lite (align with Document 2 Evidence Object and Document 8 Section 11.4):

- `uploaded`;
- `queued`;
- `processing`;
- `processed`;
- `qa_flagged`;
- `failed`;
- `requires_human_review`;
- `superseded`.

Additional operational values (for example **`requires_reupload`**, **`archived`**) may appear in extended builds but are outside the core MVP-required set.

## 9.3 Failure Handling

If extraction fails:

- Evidence `processing_status` becomes `failed` or `qa_flagged`, or moves to `requires_human_review` when review is mandatory before reliance;
- Evidence Extraction **`extraction_quality_status`** becomes `failed`, `qa_flagged`, or `human_review_required` as applicable;
- error note stored;
- retry action available;
- W5 should not assume evidence content is usable;
- risk created if material.

## 9.4 Extraction Output

Extraction must produce Evidence Extraction Object records referencing the immutable original and containing:

- dedicated **markdown extraction** blobs or URIs;
- **structured JSON extraction** adhering to LEXOS schemas;
- optional transcript JSON, OCR bundles, scene descriptors depending on modality;
- page, timecode, or frame anchors when obtainable;
- quality notes enriched by QA comparator findings;
- tool/model identifiers for parser, OCR, QA, embeddings;
- lineage metadata enabling supersession/versioning (`is_current`, `supersedes_extraction_id`).

**OCR rule:** consolidated **OCR text** (if stored) is an **intermediate signal** for QA and diagnostics—not the accepted **Evidence Extraction** deliverable by itself. Accepted runs must still surface **structured markdown + JSON** derived from **parser-first OCR/vision-assisted** workflows, or must carry explicit **`qa_flagged` / `requires_human_review` / `human_review_required`** (or human-reviewed acceptance) when only raw OCR persists.

Agents must treat markdown/JSON as **derived**. When QA flags remain unresolved, retrieval and drafting layers must degrade gracefully per Governance rules rather than hallucinating closure.

## 9.5 MVP Limit

MVP must still deliver the enhanced spine for PDF, DOCX, TXT, scanned PDFs and **PDF/screenshot composites**, **parser-first OCR/vision-assisted messenger captures**, and photos-with-text pathways.

Audio transcription may ship as optional with explicit QA.

Video beyond preservation + rudimentary metadata may stay limited unless configuration enables additional workers; multimodal-heavy targets defer to roadmap modules without contradicting originals-first doctrine.

# Section 10 — Vector and Retrieval Architecture

## 10.1 Retrieval Purpose

Retrieval supports evidence search, context construction, support mapping, drafting, and adversarial review.

Retrieval is not authority.

## 10.2 MVP Retrieval Options

MVP may use:

1. no vector retrieval initially, using direct evidence text selection;
2. Postgres full-text search;
3. pgvector with strict metadata filters.

If speed is critical, direct text retrieval and scoped search are acceptable.

## 10.3 Vector Chunk Table

If implemented, create `embedding_chunks` with:

- `chunk_id`;
- `client_id`;
- `matter_id`;
- `evidence_id`;
- `extraction_id` (FK to authoritative Evidence Extraction run that produced embedded text);
- `source_object_type` (Evidence Extraction chunk, Assertion excerpt, Artifact note, etc.);
- `source_object_id`;
- `artifact_id`;
- `chunk_text`;
- `chunk_index`;
- `page_reference`;
- `timecode_reference`;
- `frame_reference`;
- privilege + confidentiality lineage copied from originating evidence/extraction reviews;
- `language`;
- `privilege_status`;
- `confidentiality_status`;
- `embedding_model`;
- `embedding_vector`;
- `created_at`;
- `is_current`.

> Embeddings are generated from derived extraction content and must always point back to original evidence plus the superseding Evidence Extraction record. Retrieval hits surface snippets for convenience, never as standalone legal proof.

## 10.4 Retrieval Filter Rule

All retrieval must filter by:

- active matter ID;
- client ID;
- object type where relevant;
- privilege/confidentiality status;
- current version.

Only then should semantic similarity run.

## 10.5 Retrieval Result Structure

Retrieval should return:

- object ID;
- source type;
- source title;
- evidence ID;
- page/section reference;
- text snippet;
- confidence/similarity;
- privilege/confidentiality status.

## 10.6 Retrieval Red Lines

Do not:

- retrieve across all matters by default;
- feed unfiltered chunks to LLM;
- rely on embedding similarity as proof;
- retrieve superseded materials as current without explicit request.

---

# Section 11 — Agent Execution Architecture

## 11.1 Purpose

Agent execution coordinates prompts, scoped context, model calls, structured outputs, validation, database writes, and artifacts.

## 11.2 Agent Run Flow

Recommended MVP flow:

1. User triggers agent action.
2. System identifies matter and workflow.
3. System collects scoped context.
4. System builds prompt using approved template.
5. System calls model.
6. System receives structured output.
7. System validates output.
8. System writes generated objects/artifacts.
9. System creates Agent Output.
10. System creates Audit Event.
11. Workflow State updates.

## 11.3 Agent Context Construction

Agent context should include only:

- current matter data;
- relevant objects;
- required evidence excerpts;
- workflow-specific artifacts;
- risks and support states;
- prompt instructions.

Avoid passing entire file sets unless necessary.

## 11.4 Agent Output Validation

Before writing outputs:

- validate schema;
- check required fields;
- ensure matter ID matches;
- verify allowed status values;
- flag unsupported claims where possible;
- create error state if invalid.

## 11.5 Agent Write Permissions

Agents should not directly write arbitrary records.

They submit proposed outputs to service-layer validators.

## 11.6 MVP Agent Runs

Required MVP agent runs:

- Generate Case Story;
- Extract Assertions;
- Generate Support Matrix;
- Generate Strategy Memo;
- Generate Research Memo;
- Generate Argument Draft;
- Generate Adversarial Critique;
- Generate Revised Output.

---

# Section 12 — Workflow Orchestration Architecture

## 12.1 Purpose

Workflow orchestration tracks and coordinates matter progression.

## 12.2 MVP Orchestration Model

MVP can use simple orchestration:

- `workflow_states` table;
- manual action buttons;
- workflow service functions;
- status updates;
- next-action field;
- blocked flag;
- audit event.

## 12.3 Workflow State Transitions

Each workflow action should update:

- current workflow;
- workflow status;
- last completed step;
- next action;
- blocked flag;
- block reason;
- timestamps.

## 12.4 Workflow Action Pattern

Each workflow action should:

1. validate matter scope;
2. validate required inputs;
3. execute task;
4. create or update objects;
5. create artifact if applicable;
6. create audit event;
7. update workflow state;
8. return next action.

## 12.5 Target-State Orchestration

Target-state should include:

- workflow engine;
- task queue;
- event bus;
- agent scheduler;
- retry engine;
- dependency graph;
- policy checks;
- autonomy-level enforcement.

---

# Section 13 — Model and Tool Integration Architecture

## 13.1 Purpose

Model and tool integration should be abstracted and logged.

## 13.2 Model Adapter

Model adapter should expose:

- `generateStructuredOutput`;
- `generateText`;
- `summarize`;
- `translate`;
- `critique`;
- `embed`;
- `classify`.

## 13.3 Tool Adapter

Tool adapters may include:

- ParserAdapter;
- StorageAdapter;
- SearchAdapter;
- ExportAdapter;
- EmailAdapter target-state only;
- FilingAdapter target-state only.

## 13.4 Configuration

Model/tool settings should be configurable via:

- environment variables;
- database registry;
- admin configuration;
- workflow policy.

## 13.5 Logging

Major calls should log:

- provider;
- model/tool;
- workflow;
- matter;
- input object IDs;
- output object IDs;
- status;
- error;
- cost/latency where available.

---

# Section 14 — Authentication and Authorization Architecture

## 14.1 MVP Authentication

MVP requires authenticated access.

Minimum:

- user login;
- user ID;
- role field;
- session management.

## 14.2 MVP Authorization

MVP authorization should enforce:

- user role;
- matter access;
- client access;
- restricted actions;
- evidence deletion restrictions.

## 14.3 Role Types

MVP roles:

- admin;
- operator;
- reviewer;
- read-only;
- system/agent.

## 14.4 Authorization Checks

Before sensitive actions:

- verify authenticated user;
- verify matter access;
- verify role permission;
- verify privilege/confidentiality compatibility;
- verify workflow state where relevant.

## 14.5 Target-State Authorization

Target-state should include:

- RBAC;
- ABAC;
- RLS;
- Access Grants;
- privilege boundary engine;
- tenant isolation;
- audit trails.

---

# Section 15 — Audit and Logging Architecture

## 15.1 Purpose

Audit logging records material system activity.

## 15.2 MVP Audit Events

Log:

- client created/updated;
- matter created/updated;
- evidence uploaded;
- evidence processed;
- assertion created/updated;
- truth/support state changed;
- artifact generated/status changed;
- risk created/updated;
- workflow state changed;
- agent output generated;
- model used for major output;
- export/download if implemented.

## 15.3 Audit Event Fields

Minimum:

- `audit_event_id`;
- `event_type`;
- `actor_type`;
- `actor_id`;
- `client_id`;
- `matter_id`;
- `target_object_type`;
- `target_object_id`;
- `timestamp`;
- `summary`.

## 15.4 Logging Red Line

Do not log sensitive content into insecure logs.

Application logs should avoid dumping full evidence text, prompts, or privileged outputs unless logs are secured.

---

# Section 16 — Observability Architecture

## 16.1 Purpose

Operators must know what the system is doing.

## 16.2 MVP Observability

Show:

- workflow status;
- evidence processing status;
- agent run status;
- open risks;
- blocked workflows;
- latest artifacts;
- failed extractions;
- failed agent runs.

## 16.3 Target-State Observability

Add:

- model usage;
- token/cost;
- tool calls;
- latency;
- failure rates;
- retrieval events;
- security events;
- audit activity;
- autonomy actions.

## 16.4 Error Handling

Errors should be visible and actionable.

Do not silently fail agent runs, extraction jobs, or workflow actions.

---

# Section 17 — Environment Configuration

## 17.1 Required Environment Variables

MVP likely requires:

- database URL;
- Supabase URL;
- Supabase anon key;
- Supabase service role key;
- storage bucket names;
- LLM provider API key;
- parser API key;
- embedding model key if used;
- application URL;
- auth secret/session secret;
- environment name.

## 17.2 Secret Handling

Secrets must not be committed to repository.

Use:

- `.env.local` for local development;
- deployment provider secret manager;
- environment variable template without secret values.

## 17.3 Environment Separation

Recommended environments:

- local;
- development;
- staging;
- production.

MVP may start with local/development, but should not mix test and real legal data casually.

## 17.4 Data Safety Rule

Do not use real privileged matter data in development unless the environment is secured and access-controlled.

---

# Section 18 — Deployment Architecture

## 18.1 MVP Deployment

MVP may deploy as:

- Next.js app;
- managed Supabase project;
- object storage;
- environment secrets;
- optional background worker.

## 18.2 Deployment Options

Acceptable MVP options:

- Vercel + Supabase;
- DigitalOcean App Platform + Supabase;
- self-hosted Docker + Supabase;
- private Tailscale-only deployment for internal use.

For sensitive legal data, private deployment may be preferable.

## 18.3 Internal Deployment Option

For internal law-firm/behind-closed-doors operation:

- restrict app access;
- avoid public unauthenticated endpoints;
- use VPN/Tailscale where appropriate;
- use private storage policies;
- avoid broad public file URLs.

## 18.4 Target-State Deployment

Target-state may require:

- containerized services;
- private network;
- separate worker services;
- managed database;
- backup/restore;
- observability stack;
- queue service;
- secure object storage;
- deployment pipeline;
- tenant-aware architecture.

---

# Section 19 — Development Workflow

## 19.1 Repository Structure

Recommended structure:

```text
/apps
  /web
/packages
  /db
  /ui
  /domain
  /agents
  /workflows
  /tools
  /config
/docs
  /architecture
  /prompts
  /workflows
  /schema

  For a simple MVP, this may be a single Next.js repo with organized folders.

  19.2 Suggested App Folder Structure

  /src
  /app
  /components
  /features
    /clients
    /matters
    /evidence
    /assertions
    /strategy
    /research
    /arguments
    /adversarial
    /artifacts
    /workflow
    /risks
  /lib
    /supabase
    /auth
    /validation
    /models
    /tools
    /audit
  /server
    /services
    /workflows
    /agents
    /repositories
  /types

  19.3 Coding Standards

MVP should use:

TypeScript;
strict typing where practical;
schema validation;
clear domain services;
no direct database writes from UI components;
explicit error handling;
audit helper for material actions.
19.4 Branching

Recommended:

main for stable;
development for integrated development;
dev/<developer-or-agent> for active work.
19.5 Coding-Agent Rules

Coding agents must:

read Document 8 and Document 9 before MVP implementation;
preserve object names;
not remove required fields;
not bypass service-layer validation;
not collapse workflows into chat only;
not implement global retrieval;
not remove privilege/confidentiality fields;
not create external-action features unless explicitly scoped.
Section 20 — MVP Build Order
20.1 Build Phase Order

Recommended technical build order:

Project setup;
Auth baseline;
Database schema;
Storage setup;
Client/Matter CRUD;
Workflow State;
Evidence upload + ingestion classification service;
Integrated parser/OCR/Vision toolchain (feature-flag optional audio/video workers);
Evidence extraction pipeline emitting markdown **and** JSON + QA comparator hooks;
Evidence Extraction Object persistence + versioning;
Extraction QA automation + surfaced quality enums;
Assertion creation;
Support Matrix;
Artifact system;
Strategy Memo generation;
Research Memo generation;
Argument Draft generation;
Adversarial Critique generation;
Revised Output generation;
Risk panel;
Audit events;
Retrieval/search if not already implemented;
MVP hardening.
20.2 Build Principle

Build the object spine before the AI polish.

Do not start with a general chat interface.

Start with:

records;
forms;
tables;
status;
evidence;
assertions;
artifacts;
workflows.

Then add agents.

20.3 Early Proof Requirement

The first technical proof should demonstrate:

create Client;
create Matter;
upload Evidence;
create Assertion;
link Assertion to Evidence;
generate Output Artifact;
update Workflow State.

This proves the core skeleton.

Section 21 — Data Migration and Versioning
21.1 Migration Rule

Database schema changes should be versioned.

Use migration files or equivalent schema tracking.

21.2 Artifact Versioning

Major artifacts must support versioning.

MVP may use:

version number;
supersedes ID;
artifact status.

Target-state should support full artifact history.

21.3 Object Versioning

MVP should version:

Case Story Artifact;
Support Matrix;
Strategy Memo;
Research Memo;
Argument Draft;
Adversarial Critique;
Revised Output.
21.4 Status Transition History

Target-state should track status transitions.

MVP may track through audit events.

Section 22 — Backup and Recovery
22.1 MVP Backup

MVP should rely on managed database backups where available.

If using Supabase, confirm backup availability for the plan.

For real legal data, backup strategy must be explicit.

22.2 Storage Backup

Evidence files and artifacts must be backed up or stored in reliable managed storage.

22.3 Recovery Requirement

The system should be recoverable from:

accidental deletion;
failed migration;
storage error;
deployment rollback;
model/tool outage.
22.4 MVP Caution

Do not use MVP with irreplaceable real evidence unless backup and access controls are adequate.

Section 23 — Testing Architecture
23.1 MVP Test Types

MVP should include:

schema tests;
service tests;
workflow tests;
retrieval-scope tests;
evidence upload tests;
extraction failure tests;
assertion support tests;
artifact version tests;
security role tests;
prompt-injection basic tests.
23.2 Legal Cognition Tests

Test:

unsupported facts remain visible;
evidence links are preserved;
W8 draft does not invent facts;
W9 critique identifies weaknesses;
W11 does not erase caveats.
23.3 Technical Tests

Test:

Client/Matter CRUD;
Evidence upload;
Evidence extraction;
Assertion creation;
Support Matrix generation;
Artifact creation;
Workflow State update;
Audit Event creation.
23.4 Target-State Tests

Later add:

model benchmark tests;
citation verification tests;
translation tests;
privilege leakage tests;
cross-matter retrieval red-team tests;
workflow autonomy tests.
Section 24 — Target-State Technical Architecture
24.1 Target-State Components

Target-state may include:

Web application;
API service;
workflow engine;
agent runtime;
model routing service;
tool authority service;
retrieval service;
evidence processing workers;
legal research service;
audit ledger;
policy engine;
notification service;
export/document generation service;
institutional learning service;
observability stack.
24.2 Service Separation

As scale increases, separate:

synchronous UI/API;
background evidence processing;
long-running agent workflows;
retrieval/indexing;
model calls;
audit logging;
export generation.
24.3 Event-Driven Architecture

Target-state may use events such as:

evidence.uploaded;
evidence.processed;
assertion.created;
support_matrix.completed;
risk.created;
artifact.generated;
workflow.blocked;
review.completed;
critique.completed;
learning.proposed.
24.4 Policy Engine

Target-state should introduce policy-as-code for:

retrieval permission;
workflow gates;
output status transitions;
tool authority;
privilege rules;
autonomy levels.
24.5 Scalability Rule

Scale only after the object and workflow architecture is correct.

Premature distributed architecture will slow MVP.

Section 25 — Technical Red Lines

The implementation must not:

Build only chat over files.
Store evidence without Evidence Objects.
Store matter information without Matter IDs.
Allow global retrieval across all matters.
Let agents directly mutate arbitrary database records.
Omit artifact status.
Omit workflow state.
Omit privilege/confidentiality fields.
Treat extracted text as original evidence.
Treat model output as verified truth.
Skip audit events for material actions.
Permit autonomous external communication in MVP.
Hard-code one model/provider into legal architecture.
Store secrets in source control.
Hide errors from users/operators.
Mark filing-ready output without governance.
Delete evidence without restriction and audit.
Section 26 — Summary

The LEXOS technical implementation must preserve the legal architecture.

The MVP should use a pragmatic architecture:

Next.js frontend;
Supabase Postgres;
object storage;
evidence extraction service;
configurable LLM provider;
optional pgvector retrieval;
workflow state table;
agent execution services;
audit events;
matter-scoped workspaces.

The first build should prioritize:

Client/Matter records;
Evidence Objects;
Assertions;
Support Matrix;
Output Artifacts;
Workflow State;
Risks;
scoped retrieval;
auditability.

The system should not begin as a chatbot.

The correct technical build sequence is:

object spine;
evidence spine;
assertion/support spine;
artifact/workflow spine;
agentic workflows;
adversarial critique;
hardening;
target-state expansion.

The final technical doctrine is:

LEXOS technical architecture must make legal cognition structured, inspectable, scoped, secure, auditable, and expandable toward autonomous legal operation.

