# Document 13 — LEXOS Deployment and Operations Manual

# Document Index and Agent Navigation Guide

## Purpose of This Index

This index helps human readers, AI coding agents, DevOps agents, security agents, operations agents, legal agents, and system architects quickly locate relevant deployment and operations rules in **Document 13 — LEXOS Deployment and Operations Manual**.

Document 13 defines how LEXOS is deployed, configured, secured, operated, monitored, backed up, restored, updated, maintained, and scaled from MVP through target-state autonomous legal institution.

Agents should use this index before performing any deployment, infrastructure, operations, backup, monitoring, release, security, or production-readiness task.

---

# Quick Navigation by Task

## If the task is about overall operations doctrine

Read:

- **Section 1 — Purpose and Scope**
- **Section 2 — Operational Principles**
- **Section 27 — Summary**

Use these sections to understand how LEXOS must be operated.

Key concepts:

- legal infrastructure;
- operational reliability;
- separation;
- recoverability;
- observability;
- change control.

---

## If the task is about environments

Read:

- **Section 3 — Environment Model**

Use this section when setting up local, development, staging, or production environments.

Key concepts:

- local;
- development;
- staging;
- production;
- environment separation;
- no real legal data in unsecured environments.

---

## If the task is about MVP deployment options

Read:

- **Section 4 — MVP Deployment Options**

Use this section when choosing between managed app deployment, private VPS/droplet, or fully self-hosted deployment.

Key concepts:

- managed web app + Supabase;
- private VPS + Supabase;
- fully self-hosted;
- recommended MVP path.

---

## If the task is about infrastructure components

Read:

- **Section 5 — Infrastructure Components**

Use this section when identifying required app, database, storage, auth, model, parser, vector, worker, or target-state components.

Key concepts:

- web application;
- database;
- object storage;
- model/tool providers;
- background workers;
- target-state components.

---

## If the task is about configuration

Read:

- **Section 6 — Configuration Management**

Use this section when setting environment variables, feature flags, model settings, parser settings, storage buckets, or deployment URLs.

Key concepts:

- app environment;
- database connection;
- storage buckets;
- model/provider keys;
- feature flags;
- public vs secret config.

---

## If the task is about secrets

Read:

- **Section 7 — Secret Management**

Use this section when handling API keys, Supabase service role keys, database credentials, model keys, parser keys, or key rotation.

Key concepts:

- `.env.local`;
- `.env.example`;
- service role key;
- server-side only;
- key rotation;
- secret audit.

---

## If the task is about database operations

Read:

- **Section 8 — Database Operations**

Use this section when running migrations, managing backups, monitoring database health, correcting data, or changing schema.

Key concepts:

- migration rules;
- backup;
- database monitoring;
- data correction;
- no destructive migration without backup.

---

## If the task is about storage operations

Read:

- **Section 9 — Storage Operations**

Use this section when setting storage buckets, access policies, original evidence preservation, storage backup, or temporary processing files.

Key concepts:

- private buckets;
- original evidence;
- signed URLs;
- temporary files;
- no public evidence URLs by default.

---

## If the task is about evidence operations

Read:

- **Section 10 — Evidence Operations**

Use this section when operating evidence intake, extraction failures, evidence QA, evidence deletion, or evidence export.

Key concepts:

- evidence upload flow;
- processing failure;
- failed extraction;
- restricted deletion;
- export logging.

---

## If the task is about model/tool operations

Read:

- **Section 11 — Model and Tool Operations**

Use this section when changing model provider, prompt version, parser, embedding tool, external tool availability, cost monitoring, or provider outage handling.

Key concepts:

- model configuration;
- prompt versioning;
- high-risk tools disabled in MVP;
- provider outage;
- model drift;
- cost monitoring.

---

## If the task is about workflow operations

Read:

- **Section 12 — Workflow Operations**

Use this section when managing workflow state, blockers, re-entry, completion, stale workflows, or next actions.

Key concepts:

- current workflow;
- blocked flag;
- next action;
- workflow re-entry;
- completion requires outputs.

---

## If the task is about agent operations

Read:

- **Section 13 — Agent Operations**

Use this section when handling agent runs, failed runs, re-runs, role drift, or agent performance review.

Key concepts:

- agent run metadata;
- failed agent runs;
- re-run versioning;
- role drift;
- prompt failures.

---

## If the task is about user access

Read:

- **Section 14 — Access Administration**

Use this section when adding users, assigning roles, granting matter access, offboarding users, or reviewing access.

Key concepts:

- admin/operator/reviewer/read-only/system roles;
- matter access;
- offboarding;
- access review.

---

## If the task is about monitoring or observability

Read:

- **Section 15 — Monitoring and Observability Operations**

Use this section when setting alerts, dashboards, logs, failed job monitoring, cost monitoring, or operational visibility.

Key concepts:

- failed extractions;
- failed agent runs;
- blocked workflows;
- cost spikes;
- security alerts;
- no invisible failures.

---

## If the task is about backup or restore

Read:

- **Section 16 — Backup and Restore Operations**

Use this section when planning backups, storage recovery, restore testing, or real matter readiness.

Key concepts:

- database backup;
- storage backup;
- restore testing;
- MVP backup minimum;
- no irreplaceable evidence without backup.

---

## If the task is about release management

Read:

- **Section 17 — Release Management**

Use this section when deploying changes, classifying release risk, running pre-release checks, post-release checks, or rollback plans.

Key concepts:

- release types;
- risk classes;
- pre-release checklist;
- post-release checklist;
- rollback.

---

## If the task is about incident response

Read:

- **Section 18 — Incident Response Operations**

Use this section when handling unauthorized access, retrieval leakage, evidence deletion, hallucinated citation used externally, compromised key, or storage/database issue.

Key concepts:

- incident definition;
- incident types;
- severity;
- detect/contain/preserve logs/remediate;
- MVP incident records.

---

## If the task is about security operations

Read:

- **Section 19 — Security Operations**

Use this section when reviewing users, admin accounts, dependency updates, storage policies, environment variables, provider keys, or data exposure.

Key concepts:

- routine security operations;
- dependency updates;
- data exposure review;
- no service key exposure.

---

## If the task is about data lifecycle

Read:

- **Section 20 — Data Lifecycle Operations**

Use this section when closing matters, archiving, de-indexing, deleting, or changing data states.

Key concepts:

- active;
- archived;
- restricted;
- superseded;
- de-indexed;
- legal hold;
- deletion exceptional.

---

## If the task is about legal hold

Read:

- **Section 21 — Legal Hold Operations**

Use this section when activating or releasing legal hold or blocking deletion.

Key concepts:

- legal hold boolean MVP;
- scope;
- deletion blocked;
- release authority;
- audit event.

---

## If the task is about exports or external use

Read:

- **Section 22 — Export and External Use Operations**

Use this section when exporting artifacts/evidence, using outputs externally, or considering future external-action tools.

Key concepts:

- export does not imply approval;
- export controls;
- export logging;
- external use requirements;
- target-state external action.

---

## If the task is about maintenance routines

Read:

- **Section 23 — Operational Maintenance Routines**

Use this section when setting daily, weekly, monthly, or post-matter operational routines.

Key concepts:

- daily checks;
- weekly checks;
- monthly checks;
- after matter completion;
- access and backup review.

---

## If the task is about production readiness

Read:

- **Section 24 — Production Readiness Checklist**

Use this section when deciding whether LEXOS is ready for internal MVP use, real matter use, external use, or autonomous external action.

Key concepts:

- internal MVP readiness;
- real matter readiness;
- external use readiness;
- autonomy readiness;
- readiness red line.

---

## If the task is about target-state operations

Read:

- **Section 25 — Target-State Operations Architecture**

Use this section when designing future operating model, Operations Center, governance operations, model/prompt operations, multi-tenant operations, or operations maturity.

Key concepts:

- Operations Center;
- governance operations;
- model/prompt operations;
- multi-tenant operations;
- operations maturity levels.

---

## If the task is about operational red lines

Read:

- **Section 26 — Operational Red Lines**

Use this section before approving deployment, release, production use, real matter use, or autonomy increase.

Key concepts:

- no real matters without auth;
- no public evidence buckets;
- no exposed service keys;
- no global retrieval;
- no invisible failures;
- no autonomous external action in MVP.

---

# Section-by-Section Index

## Section 1 — Purpose and Scope

Use for:

- operations doctrine;
- document scope;
- deployment/operations purpose.

## Section 2 — Operational Principles

Use for:

- legal infrastructure principle;
- separation;
- recoverability;
- observability;
- change control.

## Section 3 — Environment Model

Use for:

- local/dev/staging/production;
- environment separation;
- real data safety.

## Section 4 — MVP Deployment Options

Use for:

- managed deployment;
- private VPS;
- self-hosted options;
- recommended MVP path.

## Section 5 — Infrastructure Components

Use for:

- core components;
- target-state infrastructure.

## Section 6 — Configuration Management

Use for:

- environment variables;
- feature flags;
- public vs secret config.

## Section 7 — Secret Management

Use for:

- API keys;
- service role keys;
- key rotation;
- secret audit.

## Section 8 — Database Operations

Use for:

- migrations;
- backup;
- monitoring;
- data correction.

## Section 9 — Storage Operations

Use for:

- buckets;
- private storage;
- original evidence preservation.

## Section 10 — Evidence Operations

Use for:

- evidence upload;
- extraction failure;
- evidence deletion/export.

## Section 11 — Model and Tool Operations

Use for:

- model config;
- prompt versions;
- provider outage;
- model drift;
- cost monitoring.

## Section 12 — Workflow Operations

Use for:

- workflow state;
- blockers;
- re-entry;
- completion.

## Section 13 — Agent Operations

Use for:

- agent runs;
- failed runs;
- re-runs;
- role drift.

## Section 14 — Access Administration

Use for:

- user roles;
- matter access;
- offboarding;
- access reviews.

## Section 15 — Monitoring and Observability Operations

Use for:

- alerts;
- failed jobs;
- cost spikes;
- security alerts.

## Section 16 — Backup and Restore Operations

Use for:

- database backups;
- storage backups;
- restore tests.

## Section 17 — Release Management

Use for:

- release risk;
- pre-release checklist;
- rollback.

## Section 18 — Incident Response Operations

Use for:

- incident classification;
- containment;
- remediation;
- incident records.

## Section 19 — Security Operations

Use for:

- routine security;
- dependency updates;
- data exposure review.

## Section 20 — Data Lifecycle Operations

Use for:

- matter closure;
- archival;
- de-indexing;
- deletion.

## Section 21 — Legal Hold Operations

Use for:

- legal hold;
- deletion blocking;
- legal hold release.

## Section 22 — Export and External Use Operations

Use for:

- exports;
- external use;
- export logging;
- target-state external actions.

## Section 23 — Operational Maintenance Routines

Use for:

- daily/weekly/monthly routines;
- post-matter completion.

## Section 24 — Production Readiness Checklist

Use for:

- internal MVP readiness;
- real matter readiness;
- external use readiness;
- autonomy readiness.

## Section 25 — Target-State Operations Architecture

Use for:

- future operations center;
- governance operations;
- multi-tenant operations.

## Section 26 — Operational Red Lines

Use for:

- deployment blockers;
- operational blockers.

## Section 27 — Summary

Use for:

- compressed operations doctrine;
- final operations compliance check.

---

# Fast Lookup Table

| Topic | Primary Sections |
|---|---|
| Operations doctrine | Sections 1, 2, 27 |
| Environments | Section 3 |
| Deployment options | Section 4 |
| Infrastructure | Section 5 |
| Configuration | Section 6 |
| Secrets | Section 7 |
| Database ops | Section 8 |
| Storage ops | Section 9 |
| Evidence ops | Section 10 |
| Model/tool ops | Section 11 |
| Workflow ops | Section 12 |
| Agent ops | Section 13 |
| Access admin | Section 14 |
| Monitoring | Section 15 |
| Backup/restore | Section 16 |
| Release management | Section 17 |
| Incident response | Section 18 |
| Security ops | Section 19 |
| Data lifecycle | Section 20 |
| Legal hold | Section 21 |
| Export/external use | Section 22 |
| Maintenance routines | Section 23 |
| Production readiness | Section 24 |
| Target-state ops | Section 25 |
| Operational red lines | Section 26 |

---

# Agent Reading Protocol

Before performing any task based on Document 13, an agent should:

1. **Identify the operational domain.**

   Determine whether the task concerns environments, deployment, infrastructure, configuration, secrets, database, storage, evidence, model/tool operations, workflows, agents, access, monitoring, backups, releases, incidents, security, data lifecycle, legal hold, exports, readiness, or target-state operations.

2. **Read the relevant topic section.**

   Use the Quick Navigation above.

3. **Read Section 26 before approving operational changes.**

   Operational red lines are blockers.

4. **Read Section 24 before real matter use or production deployment.**

   Readiness requirements differ for internal MVP, real matters, external use, and autonomous action.

5. **Read Section 16 before processing irreplaceable real evidence.**

   Backup and restore must be understood.

6. **Read Section 27 before final recommendations.**

   Section 27 provides the compressed operations doctrine.

---

# Mandatory Cross-Checks for Agents

## For deployment tasks

Read:

- Section 3;
- Section 4;
- Section 5;
- Section 24;
- Section 26.

Mandatory check:

- Is the deployment environment appropriate for the data sensitivity and operational stage?

## For secret/config tasks

Read:

- Section 6;
- Section 7;
- Section 19.

Mandatory check:

- Are secrets server-side only, absent from repo, absent from frontend, and stored securely?

## For database/storage tasks

Read:

- Section 8;
- Section 9;
- Section 16.

Mandatory check:

- Are migrations tested, originals preserved, storage private, and backups/restores understood?

## For evidence operations tasks

Read:

- Section 10;
- Section 20;
- Section 21.

Mandatory check:

- Is evidence preserved, extraction failure visible, deletion restricted, and legal hold respected?

## For model/prompt/tool changes

Read:

- Section 11;
- Section 17.

Mandatory check:

- Are changes versioned, tested, and rollbackable?

## For workflow/agent operations

Read:

- Section 12;
- Section 13;
- Section 15.

Mandatory check:

- Are failures visible, re-runs versioned, workflow blockers preserved, and workflow completion controlled?

## For production readiness

Read:

- Section 24;
- Section 26.

Mandatory check:

- Is the system ready for the specific use level: internal MVP, real matter, external use, or autonomous external action?

## For incident response

Read:

- Section 18.

Mandatory check:

- Has the incident been detected, contained, logged, scoped, remediated, reviewed, and closed?

---

# Final Instruction to Agents

Document 13 defines how LEXOS is operated.

Agents must not treat deployment and operations as secondary to product features.

When deploying or operating LEXOS, preserve:

- environment separation;
- secret protection;
- private storage;
- database integrity;
- original evidence preservation;
- scoped retrieval;
- visible workflow state;
- visible agent failures;
- audit events;
- backup and restore readiness;
- controlled releases;
- incident handling;
- restricted deletion;
- controlled exports;
- access review;
- no autonomous external legal action in MVP.

LEXOS becomes operationally trustworthy only when deployment, data, access, storage, models, tools, workflows, agents, logs, backups, releases, incidents, and exports are controlled, observable, recoverable, and auditable.

## Document Status

**Document Name:** LEXOS Deployment and Operations Manual  
**Document Number:** Document 13  
**Version:** v1.0 Draft  
**Purpose:** Define how LEXOS is deployed, configured, operated, monitored, backed up, secured, updated, maintained, and scaled from MVP through target-state autonomous legal institution.  
**Depends On:**  
- Document 1 — LEXOS Institutional Doctrine  
- Document 2 — LEXOS Canonical Object Model  
- Document 3 — LEXOS Governance and Epistemic Integrity Rules  
- Document 4 — LEXOS Cognitive Architecture  
- Document 5 — LEXOS Workflow Specification  
- Document 6 — LEXOS Security and Privilege Architecture  
- Document 7 — LEXOS Model, Tool, and Automation Specification  
- Document 8 — LEXOS MVP Scope and Build Specification  
- Document 9 — LEXOS Technical Implementation Architecture  
- Document 10 — LEXOS Agent Role and Prompt Library  
- Document 11 — LEXOS UI/UX and Operator Experience Specification  
- Document 12 — LEXOS Testing, Evaluation, and Quality Assurance Specification  

**Primary Use:** MVP deployment, operations planning, environment setup, production readiness, backup and restore planning, monitoring, incident response, security operations, release management, data protection, service maintenance, and target-state operational scaling.

---

# Section 1 — Purpose and Scope

## 1.1 Purpose of This Document

This document defines the deployment and operational architecture for LEXOS.

The prior documents define what LEXOS is, how it thinks, what objects it uses, how workflows operate, how security works, how models and tools are governed, how the MVP is scoped, how the system is technically built, how agents operate, how the UI works, and how quality is tested.

This document defines how LEXOS is actually run.

A legal AI system can be conceptually strong but operationally unsafe if it lacks:

- environment separation;
- secret management;
- deployment discipline;
- backup and restore controls;
- monitoring;
- access review;
- incident response;
- model/tool configuration controls;
- release management;
- audit preservation;
- operational checklists;
- data lifecycle controls.

LEXOS must be operated as a legal infrastructure system, not as an experimental chatbot.

## 1.2 Core Operations Doctrine

The core operations doctrine is:

> LEXOS may only be trusted operationally if its deployment, data, access, models, tools, workflows, storage, logs, backups, and releases are controlled, observable, recoverable, and auditable.

Operational reliability is part of legal reliability.

If the system loses evidence, leaks privileged data, retrieves from the wrong matter, silently changes prompts, runs unapproved models, or deploys broken workflow gates, the legal cognition layer becomes unreliable.

## 1.3 Scope of This Document

This document defines:

- deployment principles;
- environment model;
- MVP deployment options;
- infrastructure components;
- configuration management;
- secret management;
- database operations;
- storage operations;
- evidence operations;
- model/tool operations;
- workflow operations;
- agent operations;
- monitoring and observability;
- backup and restore;
- access administration;
- release management;
- incident response;
- maintenance routines;
- production readiness;
- target-state operations.

This document does not define:

- exact cloud vendor commands;
- exact Docker Compose files;
- exact CI/CD pipeline code;
- exact Supabase migrations;
- exact server hardening scripts;
- exact jurisdiction-specific compliance program.

Those belong in implementation runbooks and infrastructure-specific deployment files.

---

# Section 2 — Operational Principles

## 2.1 Legal Infrastructure Principle

LEXOS handles legal cognition and legal material.

It must be operated with stronger discipline than a generic productivity app.

The system may contain:

- privileged communications;
- litigation strategy;
- criminal defense material;
- personal data;
- financial records;
- business secrets;
- court files;
- bilingual legal evidence;
- adversarial critiques;
- unsupported allegations;
- model-generated work product.

Operational shortcuts can create legal harm.

## 2.2 Separation Principle

Separate:

- environments;
- clients;
- matters;
- roles;
- secrets;
- storage paths;
- model configurations;
- deployment stages;
- test data and real data.

Do not let convenience collapse boundaries.

## 2.3 Recoverability Principle

The system must be recoverable.

Recoverability requires:

- database backups;
- storage backups or managed durability;
- exportability of key records;
- migration rollback strategy;
- versioned artifacts;
- audit records;
- operational documentation.

## 2.4 Observability Principle

Operators must know:

- what is running;
- what failed;
- what changed;
- which agent acted;
- which model/tool was used;
- which matters are blocked;
- which evidence extraction failed;
- which risks are critical;
- whether retrieval boundaries are functioning.

## 2.5 Change Control Principle

Changes to prompts, models, workflow gates, retrieval filters, database schema, security policies, and deployment configuration are operationally significant.

They must be versioned, tested, and auditable.

## 2.6 Human-Controlled Externality Principle

In MVP, external legal action must remain outside autonomous system control.

No autonomous:

- client advice;
- opposing counsel communication;
- court filing;
- regulator submission;
- evidence disclosure;
- settlement communication.

These require target-state maturity and governance gates.

---

# Section 3 — Environment Model

## 3.1 Required Environments

Recommended environments:

1. Local;
2. Development;
3. Staging;
4. Production.

MVP may begin with:

- Local;
- Development.

But before real legal data is used, environment boundaries must be explicit.

## 3.2 Local Environment

Purpose:

- developer testing;
- UI work;
- schema iteration;
- prompt experiments with synthetic data.

Rules:

- no real privileged matter data unless secured;
- no production service keys;
- no uncontrolled cloud logging of sensitive prompts;
- test data should be synthetic or sanitized.

## 3.3 Development Environment

Purpose:

- integration development;
- feature testing;
- coding-agent implementation;
- test matters.

Rules:

- use development database;
- use development storage;
- use development model/tool keys if possible;
- avoid real sensitive data;
- test migrations here first.

## 3.4 Staging Environment

Purpose:

- production-like testing;
- release validation;
- regression testing;
- QA sign-off.

Rules:

- mirror production configuration where practical;
- use sanitized or controlled test matters;
- run regression suite before production deployment;
- validate retrieval boundaries and workflow gates.

## 3.5 Production Environment

Purpose:

- real internal use;
- real matters if approved;
- controlled legal operations.

Rules:

- secure authentication;
- restricted access;
- backup confirmed;
- production secrets isolated;
- monitoring enabled;
- no untested migrations;
- no experimental prompts/models without approval.

## 3.6 Environment Red Lines

Do not:

- mix production and development databases;
- use production secrets locally;
- run test migrations directly on production first;
- process real legal data in unsecured environments;
- use public storage links for confidential evidence;
- deploy prompt/model changes without regression testing once real data is involved.

---

# Section 4 — MVP Deployment Options

## 4.1 Deployment Decision

MVP deployment should balance:

- speed;
- security;
- cost;
- operational simplicity;
- future migration path;
- data sensitivity.

## 4.2 Option A — Managed Web App + Supabase

Typical stack:

- Next.js app hosted on Vercel, Netlify, or similar;
- Supabase Postgres;
- Supabase Storage;
- Supabase Auth;
- LLM provider APIs.

Advantages:

- fastest build;
- low operational burden;
- easy frontend deployment;
- managed database/storage.

Risks:

- public web exposure must be controlled;
- vendor logging/privacy must be understood;
- service role key handling must be strict;
- sensitive legal data requires careful configuration.

Best for:

- early MVP with synthetic or controlled internal data.

## 4.3 Option B — Private VPS / Droplet + Supabase

Typical stack:

- containerized Next.js app on VPS;
- Supabase managed backend;
- private network or VPN/Tailscale access;
- reverse proxy;
- environment secrets on server.

Advantages:

- more private access model;
- better behind-closed-doors operation;
- easier to restrict app access;
- fits internal deployment.

Risks:

- more server operations;
- backups and updates need discipline;
- server hardening required.

Best for:

- internal law-firm/private MVP with sensitive data.

## 4.4 Option C — Fully Self-Hosted

Typical stack:

- self-hosted app;
- self-hosted Postgres;
- self-hosted object storage;
- self-hosted vector service;
- local or private model options.

Advantages:

- maximum control;
- better for highly sensitive data;
- private network operation.

Risks:

- highest operational burden;
- backup/restore responsibility;
- security burden;
- slower MVP.

Best for:

- later target-state or highly confidential deployment.

## 4.5 Recommended MVP Path

Recommended initial path:

> Private internal app deployment with managed Supabase backend, strict authentication, matter-scoped data, private storage, and no autonomous external action.

For fast MVP:

- use managed Supabase;
- use a Next.js app;
- use matter-scoped storage paths;
- use environment-secret controls;
- restrict access to internal users;
- use synthetic/test matters first;
- move to real matter only after readiness checks.

---

# Section 5 — Infrastructure Components

## 5.1 Core Components

MVP infrastructure includes:

- Web application;
- Database;
- Object storage;
- Authentication;
- Evidence parser/extraction service;
- LLM provider;
- optional embedding/vector retrieval;
- audit table/logging;
- deployment host;
- environment secret store.

## 5.2 Web Application

Responsibilities:

- UI;
- API routes/server actions;
- workflow handlers;
- agent trigger functions;
- matter workspace;
- artifact rendering;
- operator controls.

## 5.3 Database

Responsibilities:

- canonical objects;
- workflow states;
- audit events;
- risk records;
- artifact metadata;
- model/tool records where implemented.

## 5.4 Object Storage

Responsibilities:

- original evidence;
- extracted text/markdown;
- generated artifacts;
- exports;
- temporary processing files.

## 5.5 Model/Tool Providers

Responsibilities:

- LLM generation;
- extraction;
- embeddings;
- translation;
- research support where implemented.

## 5.6 Background Workers

MVP may avoid complex workers initially.

Workers become useful for:

- evidence extraction;
- embedding generation;
- long agent runs;
- batch processing;
- retries;
- scheduled checks.

## 5.7 Target-State Components

Target-state may add:

- workflow engine;
- queue service;
- event bus;
- policy engine;
- model routing service;
- tool authority service;
- retrieval permission engine;
- secure evidence vault;
- audit ledger;
- monitoring stack;
- incident management service.

---

# Section 6 — Configuration Management

## 6.1 Configuration Categories

LEXOS configuration includes:

- app environment;
- database connection;
- storage bucket names;
- auth settings;
- model provider keys;
- parser/tool keys;
- embedding configuration;
- enabled workflows;
- autonomy level;
- prompt versions;
- model routing rules;
- feature flags;
- deployment URLs.

## 6.2 Environment Variables

Typical MVP variables:

- `NEXT_PUBLIC_SUPABASE_URL`;
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`;
- `SUPABASE_SERVICE_ROLE_KEY`;
- `DATABASE_URL`;
- `LLM_PROVIDER`;
- `LLM_API_KEY`;
- `PARSER_PROVIDER`;
- `PARSER_API_KEY`;
- `EMBEDDING_PROVIDER`;
- `EMBEDDING_API_KEY`;
- `APP_ENV`;
- `APP_URL`;
- `AUTH_SECRET`;
- `STORAGE_BUCKET_EVIDENCE`;
- `STORAGE_BUCKET_ARTIFACTS`.

## 6.3 Secret vs Public Config

Public variables may be exposed to browser only when safe.

Secret variables must never be exposed client-side.

Critical secrets:

- service role keys;
- database passwords;
- model API keys;
- parser API keys;
- webhook signing secrets;
- encryption keys.

## 6.4 Feature Flags

Use feature flags for:

- vector retrieval;
- W3-lite;
- W10 visuals;
- exports;
- external communication tools;
- model provider changes;
- prompt versions;
- advanced governance checks.

## 6.5 Configuration Red Lines

Do not:

- commit secrets;
- expose service role keys to browser;
- hard-code API keys;
- use production keys in local test code;
- change model provider silently;
- enable external-action tools accidentally.

---

# Section 7 — Secret Management

## 7.1 Purpose

Secret management protects credentials and system access.

## 7.2 MVP Secret Handling

MVP must:

- use `.env.local` for local secrets;
- keep `.env.example` without real values;
- store production secrets in hosting provider secret manager;
- restrict access to service role keys;
- rotate exposed or suspected compromised keys.

## 7.3 Service Role Key Rule

Supabase service role key is high-risk.

It must:

- never be exposed to client-side code;
- never be committed to repo;
- only be used server-side;
- be limited to necessary operations where possible;
- be rotated if leaked.

## 7.4 Model/API Keys

Model and parser API keys must be treated as sensitive.

Risks include:

- cost abuse;
- data exposure;
- unauthorized model calls;
- leakage through logs.

## 7.5 Key Rotation

Rotate keys when:

- employee/agent access changes;
- repo leak suspected;
- logs expose key;
- provider indicates compromise;
- moving from development to production.

## 7.6 Secret Audit

Periodically verify:

- no secrets in repository;
- no secrets in frontend bundle;
- no secrets in logs;
- access to deployment secrets is restricted.

---

# Section 8 — Database Operations

## 8.1 Database Purpose

The database is LEXOS’s authoritative structured memory.

Operational integrity of the database is critical.

## 8.2 Database Migration Rules

All schema changes should be:

- versioned;
- reviewed;
- tested in development/staging;
- backed up before production;
- reversible where practical.

## 8.3 Migration Red Lines

Do not:

- run destructive production migrations without backup;
- remove required fields from canonical objects;
- drop privilege/confidentiality fields;
- drop matter/client scope fields;
- change status enum values without migration plan;
- delete audit records casually.

## 8.4 Database Backup

Before real matter use, confirm:

- backup frequency;
- restore process;
- retention period;
- whether storage files are included or separate;
- backup access controls.

## 8.5 Database Monitoring

Monitor:

- connection failures;
- slow queries;
- storage growth;
- failed migrations;
- RLS/policy errors;
- unexpected table growth;
- error logs.

## 8.6 Data Correction

Data correction must be auditable.

If a record is wrong:

- update via proper service;
- preserve prior version where material;
- create audit event;
- do not silently edit critical truth/support states.

---

# Section 9 — Storage Operations

## 9.1 Storage Purpose

Storage holds original legal files and derived artifacts.

Storage loss or misconfiguration can destroy evidence integrity.

## 9.2 Storage Buckets

Recommended buckets:

- evidence originals;
- evidence extractions;
- artifacts;
- exports;
- temporary processing.

## 9.3 Access Controls

Storage must enforce:

- authenticated access;
- matter-aware paths or metadata;
- private access by default;
- no public evidence URLs unless deliberately created and safe;
- signed URLs with limited lifetime if needed.

## 9.4 Original Evidence Rule

Original evidence must be preserved.

Do not:

- overwrite originals;
- replace originals with OCR text;
- delete originals after extraction;
- allow ordinary users to hard-delete originals without authority.

## 9.5 Storage Backup

Confirm whether storage provider includes:

- durability;
- versioning;
- backup;
- retention;
- recovery.

If not, create backup process.

## 9.6 Temporary Files

Temporary files must:

- not become system of record;
- be deleted or expired after processing;
- avoid containing unrestricted privileged material where possible.

---

# Section 10 — Evidence Operations

## 10.1 Evidence Intake Operations

For each evidence upload:

1. Confirm active matter, client scope, privilege/confidentiality capture.
2. Create Source object if new provenance envelope is required.
3. Create Evidence Object with immutable `original_file_uri` linkage.
4. Store original bytes in object storage with write-once semantics.
5. Record metadata + ingestion classification (pathway).
6. Dispatch extraction job (**LlamaParse/equivalent parser-first** ingestion with OCR/vision/audio/video support per pathway policy).
7. Produce **markdown extraction** + **structured JSON extraction** artifacts on Evidence Extraction Object.
8. Run extraction QA comparator hooks; persist quality score/flags.
9. If retrieval enabled, enqueue embedding chunk jobs with evidence_id + extraction_id metadata.
10. Record extraction lifecycle states separately from raw upload states.
11. Create audit event with toolchain versions, durations, failures, retries.
12. Update workflow state only when failure modes are visible to operators.

## 10.2 Evidence Processing Failure

If processing fails:

- keep original file;
- set processing status to failed;
- record error;
- allow retry;
- flag risk if material;
- do not allow W5 to assume content is processed.

## 10.3 Evidence QA

Operators should periodically review:

- failed extractions;
- QA flagged extractions;
- embeddings backlog / stalled chunk generation;
- ingestion reprocessing workflows (duplicate runs, superseded extractions);
- parser/model provider incidents impacting QA outcomes;
- missing privilege status;
- missing confidentiality status;
- evidence without linked assertions once W5 begins;
- evidence without source envelopes.

Maintain operational dashboards or ticket queues for **failed extraction** and **QA-flagged extraction** workloads so they cannot age silently.

## 10.4 Evidence Deletion

Deletion must be restricted.

Preferred operational alternatives:

- archive;
- restrict;
- supersede;
- de-index;
- mark duplicate;
- legal hold.

Hard deletion requires:

- authority;
- confirmation;
- legal hold check;
- audit event.

When deleting derived layers (markdown, JSON transcripts, embeddings) ensure referential pointers are retired or flagged to prevent dangling retrieval results.

## 10.5 Evidence Export

Evidence export should be controlled.

Export log should record:

- evidence ID;
- user;
- matter;
- timestamp;
- purpose;
- recipient if external;
- approval if required.

MVP may defer external evidence export.

## 10.6 Intake Operations (W0)

Daily / shift operations for enabled onboarding surfaces:

- sweep open **intake queues** for stale `intake_status`;
- triage **blocked** dossiers (conflict, KYC, authority, ambiguous identity);
- reconcile **Intake Group** records to ensure per-candidate statuses remain unsynced errors;
- confirm **abandoned/rejected** dossiers follow retention (restrict, archive, purge) with audit trail;
- verify **accepted** intakes produced complete W1/W2 handoffs without silent candidate→client mirroring;
- monitor alerts for **wrong-client attribution**, **cross-intake contamination**, **rogue embedding promotion**, **missing conflict/KYC escalation**.

Maintenance doctrine:

- embeddings and knowledge-base promotion only after acceptance + governance policy;
- rerun access reviews for operators with intake-wide privileges;
- document incidents in security/governance trackers per Document 6/3 playbooks.

---

# Section 11 — Model and Tool Operations

## 11.1 Model Configuration

Operational model configuration should record:

- provider;
- model name;
- purpose;
- approved workflows;
- data sensitivity allowed;
- status;
- cost profile where available.

MVP may use simple environment configuration plus documentation.

## 11.2 Prompt Version Operations

Prompt changes should be:

- versioned;
- documented;
- tested against sample matter;
- rolled back if regression occurs.

High-risk prompts:

- W5 Support Matrix;
- W7 Research;
- W8 Argument;
- W9 Adversarial Review;
- W11 Revision;
- Governance Checker.

## 11.3 Tool Configuration

Tools should be enabled only when needed.

High-risk tools must remain disabled in MVP:

- external email;
- court filing;
- external sharing;
- evidence deletion automation;
- billing actions if not implemented.

## 11.4 Provider Outage

If model/parser provider fails:

- show clear error;
- preserve current workflow state;
- allow retry;
- do not mark workflow complete;
- log failure;
- consider fallback provider only if approved.

## 11.5 Model Drift

When provider model behavior changes:

- rerun regression tests;
- compare output quality;
- check structured output compliance;
- check citation hallucination rate;
- check W9 critique quality.

## 11.6 Cost Monitoring

Monitor:

- model API cost;
- parser cost;
- embedding cost;
- repeated reruns;
- long-context waste;
- failed-run cost.

Cost spikes may indicate loop bug, prompt bug, or misuse.

## 11.7 Ingestion pipeline monitoring

Track health metrics for:

- hosted parser / LlamaParse-class failure rates and latency;
- OCR and vision job failures (timeouts, GPU quota, corrupt inputs);
- speech-to-text outages for optional audio lane;
- extraction QA comparator failures or rule regressions;
- embedding encoder errors and pgvector write failures;
- proportion of evidence items in `QA flagged` vs `accepted` (sudden shifts imply model/provider drift);
- cost attribution per ingestion stage (parse, OCR, QA, embedding) to catch runaway jobs.

---

# Section 12 — Workflow Operations

## 12.1 Workflow State Operations

Each active matter should show:

- current workflow;
- status;
- next action;
- blocked flag;
- block reason;
- assigned agent/operator;
- last updated.

## 12.2 Workflow Blocker Handling

When workflow is blocked:

1. Identify blocker.
2. Link risk or issue.
3. Assign responsible actor/workflow.
4. Define next action.
5. Do not mark complete until resolved or accepted.
6. Preserve audit trail.

## 12.3 Workflow Re-entry

Workflows may reopen when:

- new evidence arrives;
- research changes strategy;
- W9 critique identifies weakness;
- client corrects facts;
- extraction is corrected;
- contradiction appears.

Re-entry must create or update workflow state.

## 12.4 Workflow Completion

Workflow completion requires:

- required output exists;
- status updated;
- risks recorded;
- handoff ready;
- audit event created.

Generated text alone is insufficient.

## 12.5 Workflow Operations Review

Operators should periodically review:

- blocked workflows;
- stale active workflows;
- failed agent runs;
- missing next actions;
- W9 not completed;
- W5 not completed before argument.

---

# Section 13 — Agent Operations

## 13.1 Agent Run Operations

Each agent run should record:

- agent;
- workflow;
- matter;
- status;
- input objects;
- output objects;
- model used;
- prompt version where practical;
- start time;
- end time;
- errors.

## 13.2 Failed Agent Runs

If agent run fails:

- preserve failure record;
- show error;
- allow retry;
- do not overwrite prior successful output;
- do not mark workflow complete;
- create risk if material.

## 13.3 Agent Re-runs

Re-runs should:

- create new output version;
- preserve prior output;
- record reason;
- identify changed input or prompt/model;
- update artifact status.

## 13.4 Agent Role Drift Operations

If agent output exceeds role:

- reject or mark needs review;
- create risk if material;
- adjust prompt or agent authority;
- rerun after correction if needed.

Examples:

- Evidence Archivist makes legal conclusion;
- Advocate invents facts;
- Rhetorician removes caveats;
- Research Agent invents authority.

## 13.5 Agent Operations Review

Review:

- failure rates;
- hallucination incidents;
- role drift;
- unsupported claim generation;
- poor W9 critiques;
- repeated prompt failures;
- cost-heavy runs.

---

# Section 14 — Access Administration

## 14.1 User Administration

Operations must control:

- user creation;
- user role assignment;
- matter access;
- deactivation;
- password/session reset;
- MFA target-state;
- access review.

## 14.2 MVP Roles

Minimum roles:

- admin;
- operator;
- reviewer;
- read-only;
- system/agent.

## 14.3 Matter Access

Matter access should be explicit or derived from role/assignment.

Do not assume every authenticated user may access every matter.

## 14.4 Offboarding

When a user leaves or no longer needs access:

- disable account;
- revoke sessions where possible;
- rotate shared secrets if exposed;
- review audit logs if necessary;
- reassign active tasks.

## 14.5 Access Review

Periodic review should check:

- active users;
- admin users;
- service accounts;
- matter access;
- storage access;
- deployment secret access;
- model/tool provider access.

---

# Section 15 — Monitoring and Observability Operations

## 15.1 Monitoring Goals

Monitoring should reveal:

- outages;
- failed extractions;
- failed agent runs;
- blocked workflows;
- unauthorized access attempts;
- retrieval failures;
- cost spikes;
- storage growth;
- database errors.

## 15.2 MVP Monitoring

MVP monitoring may include:

- application error logs;
- dashboard status panels;
- failed extraction list;
- failed agent run list;
- open risk list;
- audit event table;
- model/tool failure records.

## 15.3 Target-State Monitoring

Target-state should include:

- uptime monitoring;
- error tracking;
- performance metrics;
- queue monitoring;
- model/tool latency;
- cost dashboards;
- retrieval logs;
- security alerts;
- incident dashboards.

## 15.4 Alert Conditions

Alert on:

- production app down;
- database unavailable;
- storage unavailable;
- repeated extraction failures;
- repeated agent failures;
- critical risk created;
- unauthorized access attempt;
- retrieval boundary failure;
- cost spike;
- failed backup;
- service key exposure.

## 15.5 Observability Red Lines

Do not:

- let failures disappear;
- hide extraction failures;
- hide agent failures;
- log privileged content into insecure logs;
- ignore cost spikes;
- operate real matters without knowing whether backups exist.

---

# Section 16 — Backup and Restore Operations

## 16.1 Backup Purpose

Backups protect legal records, evidence metadata, artifacts, workflow state, risks, and audit logs.

## 16.2 Backup Scope

Back up:

- database (including embedding metadata tables);
- object storage housing **original evidence**;
- derivative storage containers for markdown, JSON transcripts, OCR bundles, screenshots of QA outputs;
- pgvector payloads or exports per infrastructure capabilities;
- prompt library;
- configuration;
- migration files;
- generated artifacts;
- audit records;
- critical operational documentation.

## 16.3 Database Backup

Confirm:

- backup frequency;
- retention period;
- point-in-time restore availability;
- restore process;
- access controls;
- backup encryption.

## 16.4 Storage Backup

Confirm:

- evidence object durability;
- artifact durability;
- versioning if available;
- recovery process;
- deletion recovery.

## 16.5 Restore Testing

A backup is not reliable until restored.

Test restore periodically:

- restore database to test environment;
- confirm key tables;
- confirm artifact metadata;
- confirm evidence files;
- confirm workflow state;
- confirm user access restrictions.

## 16.6 MVP Backup Minimum

Before using real matter data, MVP must have:

- confirmed database backup;
- confirmed storage durability/recovery;
- export or recovery path for critical artifacts;
- documented restore steps.

## 16.7 Restore Red Lines

Do not:

- assume managed provider backup without verifying plan;
- process irreplaceable evidence without backup;
- test restore directly over production;
- restore production data into insecure environment.

---

# Section 17 — Release Management

## 17.1 Purpose

Release management controls changes to production.

## 17.2 Release Types

Release types:

- UI change;
- schema change;
- workflow change;
- prompt change;
- model/tool change;
- retrieval logic change;
- security/access change;
- deployment infrastructure change.

## 17.3 Release Risk Classes

Low risk:

- cosmetic UI changes;
- copy changes not affecting legal output;
- internal documentation.

Moderate risk:

- new UI workflow;
- new artifact view;
- non-destructive schema addition;
- prompt wording change for low-risk task.

High risk:

- support mapping logic;
- retrieval filters;
- privilege/confidentiality logic;
- W7 research prompt;
- W8 argument prompt;
- W9 adversarial prompt;
- artifact status logic;
- security policy changes;
- destructive migrations.

## 17.4 Pre-Release Checklist

Before release:

- tests pass;
- migration tested;
- backup confirmed for high-risk release;
- prompt/model changes regression-tested;
- retrieval boundary tests pass;
- security review for access changes;
- rollback plan exists;
- release notes written.

## 17.5 Post-Release Checklist

After release:

- confirm app loads;
- confirm auth works;
- confirm matter workspace loads;
- confirm evidence access;
- confirm agent run works if affected;
- confirm logs show no major errors;
- monitor for failures.

## 17.6 Rollback

Rollback plan should include:

- code rollback;
- database migration rollback where possible;
- prompt version rollback;
- model provider fallback;
- feature flag disable.

---

# Section 18 — Incident Response Operations

## 18.1 Incident Definition

An incident is any event that may affect:

- confidentiality;
- privilege;
- integrity;
- availability;
- evidence preservation;
- workflow correctness;
- output reliability;
- system security;
- client/matter isolation.

## 18.2 Incident Types

Examples:

- unauthorized access;
- cross-matter retrieval;
- cross-client leakage;
- privileged material exposure;
- wrong-recipient export;
- evidence deletion;
- failed backup;
- compromised key;
- prompt injection success;
- hallucinated citation used externally;
- workflow gate bypass;
- database corruption;
- storage loss;
- model/tool provider leak concern.

## 18.3 Incident Severity

Suggested:

- low;
- moderate;
- high;
- critical;
- existential.

## 18.4 Incident Response Flow

1. Detect.
2. Classify severity.
3. Contain.
4. Preserve logs.
5. Identify affected clients/matters/objects.
6. Restrict access if needed.
7. Correct or mitigate.
8. Notify responsible humans where required.
9. Record incident.
10. Conduct root cause review.
11. Create corrective action.
12. Close incident.

## 18.5 MVP Incident Handling

MVP may use Risk records for incidents.

Minimum incident record:

- type;
- severity;
- affected matter/client;
- affected objects;
- discovered at;
- discovered by;
- containment action;
- remediation;
- status.

## 18.6 Incident Red Lines

Do not:

- delete logs during incident;
- hide incident from responsible operator;
- continue external use if integrity is compromised;
- silently correct output without record;
- ignore privilege exposure.

---

# Section 19 — Security Operations

## 19.1 Routine Security Operations

Regularly review:

- active users;
- admin accounts;
- service role keys;
- storage policies;
- database access policies;
- environment variables;
- failed login attempts;
- unusual exports;
- external provider keys.

## 19.2 Vulnerability Management

Track:

- dependency updates;
- framework vulnerabilities;
- package vulnerabilities;
- provider security notices;
- deployment platform warnings.

## 19.3 Dependency Updates

Apply updates carefully.

For major dependency updates:

- test locally;
- run regression tests;
- check build;
- check auth;
- check database access;
- check agent workflows;
- deploy to staging first where possible.

## 19.4 Data Exposure Review

Review whether sensitive data may appear in:

- browser console logs;
- server logs;
- model prompts;
- model provider logs;
- error traces;
- exported files;
- audit summaries;
- analytics tools.

## 19.5 Security Red Lines

Do not:

- expose service role key;
- make evidence bucket public;
- log full privileged prompts into unsecured logs;
- allow broad admin access casually;
- allow external-action tools without governance;
- ignore dependency vulnerability in production.

---

# Section 20 — Data Lifecycle Operations

## 20.1 Data States

Operational states:

- active;
- archived;
- restricted;
- superseded;
- de-indexed;
- retained under legal hold;
- scheduled for deletion;
- deleted;
- sanitized.

## 20.2 Matter Closure

When a matter closes:

- update matter status;
- preserve evidence;
- archive active workflows;
- preserve artifacts;
- preserve audit events;
- review risks;
- decide whether any facts promote to client memory;
- apply retention/legal hold rules.

## 20.3 Archival

Archived material should:

- remain retrievable by authorized users;
- be excluded from active workflow retrieval by default if appropriate;
- preserve source links;
- preserve audit history.

## 20.4 De-indexing

De-index from vector retrieval when:

- material is superseded;
- material should not be retrieved in active workflows;
- privilege/confidentiality changes;
- legal hold/retention requires storage but not normal retrieval.

## 20.5 Deletion

Deletion must be exceptional.

Before deletion:

- check legal hold;
- check retention needs;
- check evidence status;
- check artifact dependencies;
- check audit requirements;
- record deletion decision.

---

# Section 21 — Legal Hold Operations

## 21.1 Purpose

Legal hold prevents deletion or alteration of relevant records.

## 21.2 MVP Legal Hold

MVP may use:

- `legal_hold` boolean field;
- manual operator note;
- restricted deletion rule.

## 21.3 Legal Hold Activation

When legal hold is activated:

- identify scope;
- mark matter/evidence/artifacts;
- block deletion;
- preserve audit logs;
- suspend routine destruction;
- notify relevant operators.

## 21.4 Legal Hold Release

When released:

- record releasing authority;
- record date;
- restore normal retention policy;
- preserve audit event.

## 21.5 Legal Hold Red Line

Do not delete or alter held material except through controlled, versioned, auditable process.

---

# Section 22 — Export and External Use Operations

## 22.1 MVP Export Rule

MVP exports are internal convenience outputs.

Export does not imply:

- final legal approval;
- client approval;
- court readiness;
- filing readiness;
- external disclosure authorization.

## 22.2 Export Controls

Before export, operator should see:

- artifact status;
- review status;
- privilege status;
- confidentiality status;
- unresolved risks;
- intended audience.

## 22.3 Export Logging

Log:

- exported artifact/evidence;
- user;
- timestamp;
- matter;
- format;
- purpose;
- recipient if external.

## 22.4 External Use

External use requires:

- human decision;
- review status;
- privilege/confidentiality clearance;
- risk review;
- citation/legal review where applicable;
- client authority where required.

## 22.5 Target-State External Action

Target-state external action may include:

- client email;
- opposing counsel email;
- court filing;
- regulator submission.

These require:

- tool authority engine;
- workflow gate;
- output certification;
- audit record;
- rollback/correction plan;
- jurisdiction-specific compliance.

---

# Section 23 — Operational Maintenance Routines

## 23.1 Daily Checks

For active internal use:

- check blocked matters;
- check high/critical risks;
- check failed evidence extractions;
- check failed agent runs;
- check pending reviews;
- check storage/database errors.

## 23.2 Weekly Checks

- review open risks;
- review stale workflows;
- review user access;
- review model/tool costs;
- review failed jobs;
- review backup status;
- review recent deployments.

## 23.3 Monthly Checks

- test restore process where practical;
- review dependencies;
- review prompt/model performance;
- review security settings;
- review access list;
- review audit anomalies;
- update documentation.

## 23.4 After Major Matter Completion

- archive matter if appropriate;
- preserve final artifacts;
- review learning candidates;
- review risks;
- review outcome notes;
- check whether any client facts should be promoted;
- de-index irrelevant drafts if needed.

## 23.5 Maintenance Red Lines

Do not:

- ignore repeated failed agent runs;
- leave critical risks unresolved without owner;
- leave old admin accounts active;
- accumulate unreviewed real matter data in test environments;
- skip backup review once real data is used.

---

# Section 24 — Production Readiness Checklist

## 24.1 Internal MVP Readiness

Before internal MVP use:

- app deploys successfully;
- authentication works;
- database schema deployed;
- storage works;
- evidence upload works;
- extraction works or failure visible;
- workflows operate end-to-end;
- audit events created;
- risks visible;
- artifact status visible;
- W9 critique works;
- retrieval matter scope tested if retrieval enabled.

## 24.2 Real Matter Readiness

Before real sensitive matter use:

- backups confirmed;
- restore process documented;
- storage durability understood;
- access controls tested;
- secrets protected;
- service role key server-side only;
- privilege/confidentiality fields active;
- export controls understood;
- logs checked for sensitive exposure;
- model/provider data handling reviewed;
- human review required before external use.

## 24.3 External Use Readiness

Before using outputs externally:

- Review Event workflow exists;
- artifact status reliable;
- citation status visible;
- privilege review performed;
- confidentiality review performed;
- unresolved risks visible;
- export logged;
- human approval recorded.

## 24.4 Target-State Autonomy Readiness

Before autonomous external action:

- policy-as-code gates;
- tool authority engine;
- privilege boundary engine;
- retrieval permission engine;
- output certification;
- citation verification;
- audit ledger;
- incident response;
- rollback/correction path;
- jurisdiction-specific review.

## 24.5 Readiness Red Line

Do not use LEXOS as autonomous external legal actor until governance, security, QA, and operational controls support that level of autonomy.

---

# Section 25 — Target-State Operations Architecture

## 25.1 Target-State Operating Model

Target-state LEXOS should operate as a governed autonomous legal institution.

Operations must support:

- multi-tenant isolation;
- policy-as-code;
- autonomous workflow execution;
- agent operations center;
- secure evidence vault;
- model/tool registry;
- prompt registry;
- QA regression harness;
- incident management;
- audit ledger;
- cost and performance monitoring;
- client/matter lifecycle controls.

## 25.2 Operations Center

Target-state Operations Center should show:

- active workflows;
- active agents;
- blocked matters;
- critical risks;
- failed tools;
- model/tool costs;
- security alerts;
- pending reviews;
- external action queue.

## 25.3 Governance Operations

Governance operations should manage:

- workflow gates;
- privilege policies;
- retrieval policies;
- output certification;
- risk acceptance;
- legal hold;
- audit review;
- model/tool approval.

## 25.4 Model and Prompt Operations

Target-state should support:

- model registry;
- prompt registry;
- prompt version rollback;
- benchmark testing;
- drift monitoring;
- model replacement;
- routing changes;
- cost controls.

## 25.5 Multi-Tenant Operations

For multi-tenant deployment:

- tenant provisioning;
- tenant isolation;
- tenant admin roles;
- tenant billing;
- tenant-specific model policies;
- tenant data export;
- tenant deletion/retention;
- cross-tenant incident isolation.

## 25.6 Operations Maturity Levels

Suggested maturity levels:

1. Manual internal MVP operations;
2. Structured internal operations;
3. Staging/production discipline;
4. Real matter controlled operations;
5. Multi-user law firm operations;
6. Autonomous internal workflow operations;
7. External-action controlled operations;
8. Multi-tenant autonomous legal platform operations.

---

# Section 26 — Operational Red Lines

LEXOS operations must not:

1. Run real matters without authentication.
2. Run real matters without backup awareness.
3. Store evidence in public buckets.
4. Expose service role keys.
5. Use global retrieval by default.
6. Let agent failures disappear.
7. Treat exports as legal approval.
8. Deploy prompt/model changes without regression testing after real use begins.
9. Delete evidence without authority and audit.
10. Hide high/critical risks.
11. Ignore privilege/confidentiality status.
12. Operate without workflow state.
13. Mark generated drafts final without review.
14. Allow autonomous external action in MVP.
15. Restore production data into insecure environments.
16. Log privileged content into unsecured logs.
17. Treat managed infrastructure as a substitute for operational responsibility.
18. Scale autonomy faster than governance and QA maturity.

---

# Section 27 — Summary

LEXOS operations turn architecture into a reliable legal system.

The core operational requirements are:

1. Separate environments.
2. Protect secrets.
3. Preserve database integrity.
4. Preserve original evidence.
5. Keep storage private.
6. Scope retrieval by matter.
7. Monitor workflow state.
8. Monitor agent runs.
9. Monitor evidence extraction.
10. Preserve audit events.
11. Confirm backups and restore process.
12. Control releases.
13. Version prompts and model changes.
14. Handle incidents explicitly.
15. Restrict deletion.
16. Control exports.
17. Review access.
18. Run regression tests after high-risk changes.
19. Require stronger readiness for real matters than demos.
20. Require much stronger readiness for external use than internal use.
21. Require target-state controls before autonomous external action.

The final operations doctrine is:

> LEXOS may become operationally trustworthy only when its deployment, data, access, storage, models, tools, workflows, agents, logs, backups, releases, incidents, and exports are controlled, observable, recoverable, and auditable.