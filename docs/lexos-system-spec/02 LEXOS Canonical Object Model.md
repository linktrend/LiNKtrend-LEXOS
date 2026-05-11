# Document 2 — LEXOS Canonical Object Model

# Document Index and Agent Navigation Guide

## Purpose of This Index

This index helps human readers, AI agents, coding agents, legal agents, and system architects quickly locate relevant parts of **Document 2 — LEXOS Canonical Object Model** without reading the entire document each time.

Document 2 converts the LEXOS Institutional Doctrine into the core legal objects required to build the MVP and preserve the target-state architecture.

Agents should use this index before performing any object-modeling, schema-design, workflow, prompt, UI, or MVP implementation task.

---

# Quick Navigation by Task

## If the task is about why the object model matters

Read:

- **Section 1 — Purpose and Scope**
- **Section 2 — Object Model Overview**
- **Section 46 — Summary**

Use these sections to understand why LEXOS must be object-centric rather than prompt-centric, document-centric, or chatbot-centric.

Key concepts:

- object model before technical build;
- legal skeleton of the system;
- MVP object foundations;
- target-state object set;
- object lifecycle.

---

## If the task is about common fields or shared metadata

Read:

- **Section 3 — Common Fields Shared Across Objects**

Use this section when designing database columns, common schema patterns, metadata conventions, status fields, privilege fields, confidentiality fields, or versioning fields.

Key concepts:

- `client_id`;
- `matter_id`;
- status;
- source links;
- evidence links;
- workflow origin;
- confidentiality status;
- privilege status;
- versioning;
- object lifecycle metadata.

---

## If the task is about clients or client-level memory

Read:

- **Section 4 — Client Object**
- **Section 30 — Promotion Request Object**
- **Section 41 — Object Ownership and Workflow Control**

Use these sections when designing client records, W1 client memory, client facts, client master story, KYC/Cdd extensions, or fact promotion into client-level memory.

Key concepts:

- Client Object;
- Client Master Record;
- Client Master Story;
- Client Facts;
- W1 ownership;
- controlled promotion from matter to client memory.

---

## If the task is about matters or matter silos

Read:

- **Section 5 — Matter Object**
- **Section 28 — Workflow State Object**
- **Section 42 — MVP Object Set**

Use these sections when designing matter records, matter workspace, matter status, workflow stage, matter-level retrieval, or matter isolation.

Key concepts:

- Matter Object;
- matter ID;
- plaintiff/defense posture;
- jurisdiction;
- matter silo;
- current workflow;
- matter-scoped objects.

---

## If the task is about persons, entities, parties, witnesses, companies, or relationships

Read:

- **Section 6 — Person Object**
- **Section 7 — Entity Object**
- **Section 8 — Relationship Object**

Use these sections when designing people, companies, beneficial owners, witnesses, opposing parties, directors, shareholders, corporate structures, or relationship graphs.

Key concepts:

- Person;
- Entity;
- Relationship;
- formal role vs practical control;
- candidate vs verified persons/entities;
- relationship truth state.

---

## If the task is about sources or source reliability

Read:

- **Section 9 — Source Object**
- **Section 12 — Assertion Object**
- **Section 18 — Legal Authority Object**

Use these sections when designing source records, source hierarchy, source reliability, legal authorities, court records, client statements, AI outputs, or external materials.

Key concepts:

- Source Object;
- source type;
- source reliability;
- original vs derivative source;
- source-to-evidence relationship;
- source-to-assertion relationship.

---

## If the task is about evidence ingest

Read:

- **Section 10 — Evidence Object**
- **Section 11 — Evidence Extraction Object**
- **Section 42 — MVP Object Set**
- **Section 45 — Implementation Guidance for MVP**

Use these sections when designing W4-lite, digital document upload, evidence register, file metadata, OCR/extraction, markdown output, JSON extraction, or evidence processing state.

Key concepts:

- Evidence Object;
- Evidence Extraction;
- evidence ID;
- matter linkage;
- source linkage;
- original file;
- extracted text;
- processing status;
- extraction quality;
- exhibit ID;
- authenticity/admissibility placeholders.

---

## If the task is about facts, allegations, assertions, truth states, or support matrices

Read:

- **Section 12 — Assertion Object**
- **Section 13 — Fact Object**
- **Section 14 — Timeline Event Object**
- **Section 15 — Contradiction Object**

Use these sections when designing W2, W3, W5, assertion extraction, fact support, evidence mapping, contradiction tracking, or case chronology.

Key concepts:

- Assertion Object;
- Assertion Type;
- Truth State;
- Support State;
- Use Status;
- Fact Object;
- Timeline Event;
- Contradiction Object;
- support matrix;
- verified fact vs assertion.

---

## If the task is about risk

Read:

- **Section 16 — Risk Object**

Use this section when designing risk records, risk dashboard, workflow blockers, risk severity, risk status, escalation logic, or risk-linked outputs.

Key concepts:

- Risk Object;
- risk type;
- severity;
- probability;
- status;
- mitigation;
- risk acceptance;
- linked object;
- workflow control.

---

## If the task is about client instructions or client authority

Read:

- **Section 17 — Client Instruction Object**

Use this section when designing client approvals, client corrections, settlement authority, filing authorization, evidence-production instructions, client preferences, or client refusals.

Key concepts:

- Client Instruction;
- authority status;
- instruction type;
- channel;
- confirmation status;
- scope;
- client authorization.

---

## If the task is about legal research

Read:

- **Section 18 — Legal Authority Object**
- **Section 19 — Research Memo Object**

Use these sections when designing W7, legal research records, authority lists, adverse authority, citation verification, jurisdiction-scoped research, or research memo outputs.

Key concepts:

- Legal Authority;
- Research Memo;
- jurisdiction;
- authority type;
- treatment status;
- citation confidence;
- adverse authority;
- research question;
- authority hierarchy.

---

## If the task is about strategy or legal theories

Read:

- **Section 20 — Strategy Point Object**
- **Section 21 — Strategy Memo Object**
- **Section 16 — Risk Object**
- **Section 24 — Adversarial Critique Object**

Use these sections when designing W6, strategy memos, attack lines, defense lines, strategy risk, or strategy-to-argument mapping.

Key concepts:

- Strategy Point;
- Strategy Memo;
- supporting assertions;
- evidence links;
- research links;
- risk links;
- priority;
- adversarial score.

---

## If the task is about arguments or legal drafting

Read:

- **Section 22 — Argument Node Object**
- **Section 23 — Argument Draft Object**
- **Section 25 — Output Artifact Object**
- **Section 24 — Adversarial Critique Object**

Use these sections when designing W8, argument generation, argument nodes, allegation-response matrices, filing drafts, revised drafts, or legal writing outputs.

Key concepts:

- Argument Node;
- Argument Draft;
- strategy-to-argument mapping;
- evidence citations;
- legal authority citations;
- unsupported assertions;
- filing readiness;
- versioning.

---

## If the task is about adversarial review

Read:

- **Section 24 — Adversarial Critique Object**
- **Section 22 — Argument Node Object**
- **Section 16 — Risk Object**

Use these sections when designing W9, red-team critiques, attack matrices, weakness registers, revision checklists, or loop exit conditions.

Key concepts:

- Adversarial Critique;
- attack type;
- severity;
- recommended fix;
- opponent perspective;
- unresolved critique;
- critical critique blocking finality.

---

## If the task is about legal artifacts, outputs, drafts, or finality

Read:

- **Section 25 — Output Artifact Object**

Use this section when designing artifact registry, document status, draft/final distinction, workflow-origin metadata, audience classification, or output versioning.

Key concepts:

- Output Artifact;
- artifact type;
- artifact status;
- intended audience;
- workflow origin;
- source basis;
- dependencies;
- versioning;
- finality as system status.

---

## If the task is about translation or bilingual English/Chinese records

Read:

- **Section 26 — Translation Object**
- **Section 27 — Jurisdiction Profile Object**

Use these sections when designing translated evidence, parallel text, court-ready translation, client-facing translation, translation confidence, or bilingual artifacts.

Key concepts:

- Translation Object;
- source language;
- target language;
- original text;
- translated text;
- translation type;
- legal term notes;
- ambiguity notes;
- parallel text.

---

## If the task is about jurisdiction

Read:

- **Section 27 — Jurisdiction Profile Object**
- **Section 18 — Legal Authority Object**
- **Section 19 — Research Memo Object**
- **Section 5 — Matter Object**

Use these sections when designing jurisdiction fields, jurisdiction profiles, forum rules, governing law, legal research scope, or cross-border matter handling.

Key concepts:

- Jurisdiction Profile;
- matter jurisdiction;
- forum;
- governing law;
- procedural law;
- legal authority scope;
- citation style;
- evidence rules.

---

## If the task is about workflow state, workflow events, or handoffs

Read:

- **Section 28 — Workflow State Object**
- **Section 29 — Workflow Event Object**
- **Section 41 — Object Ownership and Workflow Control**

Use these sections when designing workflow state machines, W0–W11 status, handoffs, workflow blocking, workflow reopening, or workflow audit.

Key concepts:

- Workflow State;
- current workflow;
- workflow status;
- next action;
- blocked flag;
- entry/exit conditions;
- Workflow Event;
- handoff;
- reopening.

---

## If the task is about memory promotion

Read:

- **Section 30 — Promotion Request Object**
- **Section 4 — Client Object**
- **Section 12 — Assertion Object**
- **Section 13 — Fact Object**

Use these sections when designing fact promotion from matter to client memory, assertion-to-fact promotion, institutional learning promotion, or W1 Custodian review.

Key concepts:

- Promotion Request;
- source layer;
- target layer;
- verification state;
- approved/rejected promotion;
- client-level fact promotion.

---

## If the task is about review, approval, or human/system validation

Read:

- **Section 31 — Review Event Object**
- **Section 25 — Output Artifact Object**
- **Section 16 — Risk Object**

Use these sections when designing human review, system review, governance review, approval status, waiver, risk acceptance, or structured comments.

Key concepts:

- Review Event;
- review scope;
- review decision;
- required changes;
- override;
- approval;
- risk acceptance.

---

## If the task is about agents, model outputs, tools, prompts, or tool calls

Read:

- **Section 32 — Agent Output Object**
- **Section 33 — Model Record Object**
- **Section 34 — Tool Record Object**
- **Section 35 — Prompt Record Object**
- **Section 36 — Tool Call Object**

Use these sections when designing agent logs, model registry, prompt versioning, tool permissions, tool-call audit, or model output traceability.

Key concepts:

- Agent Output;
- Model Record;
- Tool Record;
- Prompt Record;
- Tool Call;
- model used;
- prompt version;
- tool authority;
- created/modified objects.

---

## If the task is about access control, privilege, or confidentiality

Read:

- **Section 37 — Access Grant Object**
- **Section 38 — Privilege Classification Object**
- **Section 3 — Common Fields Shared Across Objects**

Use these sections when designing permissions, RBAC, ABAC, privilege fields, confidentiality fields, or access grants.

Key concepts:

- Access Grant;
- permission level;
- subject type;
- object access;
- privilege classification;
- privilege status;
- confidentiality status.

---

## If the task is about institutional learning

Read:

- **Section 39 — Learning Object**

Use this section when designing learning notes, outcome learning, model-error learning, strategy learning, procedural learning, or governed institutional knowledge.

Key concepts:

- Learning Object;
- learning type;
- source matter;
- confidence;
- scope;
- privilege-aware reuse;
- validation;
- revalidation.

---

## If the task is about audit logs

Read:

- **Section 40 — Audit Event Object**
- **Section 29 — Workflow Event Object**
- **Section 36 — Tool Call Object**

Use these sections when designing audit logs, access logs, mutation logs, model-use logs, workflow logs, or external action logs.

Key concepts:

- Audit Event;
- actor;
- target object;
- event type;
- timestamp;
- before/after state;
- permission basis.

---

## If the task is about object ownership

Read:

- **Section 41 — Object Ownership and Workflow Control**

Use this section when deciding which workflow or agent owns an object, who can mutate it, and how workflow responsibility should be assigned.

Key concepts:

- W0/W1 ownership;
- W4 evidence ownership;
- W5 assertion/support ownership;
- W6 strategy ownership;
- W7 research ownership;
- W8 argument ownership;
- W9 critique ownership;
- governance/system ownership.

---

## If the task is about onboarding, prospective clients, or W0 intake before W1 memory

Read:

- **Section 43 — Intake and Onboarding Objects (W0)**
- **Section 41 — Object Ownership and Workflow Control**
- **Sections 42 and 45 — MVP Object Set and Implementation Guidance**

Use these sections when modeling **Client Candidate**, **Matter Candidate**, **Intake Group**, **Intake Tasks**, queues, orchestration payloads, UX cards, promotions into Client/Matter, or intake isolation doctrines.

---

## If the task is about MVP object scope

Read:

- **Section 42 — MVP Object Set**
- **Section 45 — Implementation Guidance for MVP**
- **Section 46 — Summary**

Use these sections when planning the first database schema, MVP build sequence, or coding-agent implementation task.

Key concepts:

- required MVP objects;
- simplified objects;
- minimum schema discipline;
- MVP red lines;
- recommended Supabase tables;
- MVP build order;
- object dependencies.

---

## If the task is about target-state architecture

Read:

- **Section 44 — Target-State Object Architecture**
- **Section 46 — Summary**

Use these sections when designing future graph architecture, provenance graph, institutional learning, autonomy, or expanded legal intelligence.

Key concepts:

- relational legal object store;
- evidence object store;
- vector retrieval layer;
- provenance graph;
- audit ledger;
- workflow state engine;
- risk graph;
- jurisdictional knowledge base;
- institutional learning layer.

---

# Section-by-Section Index

## Section 1 — Purpose and Scope

Use for:

- understanding why Document 2 exists;
- explaining why object model precedes build;
- clarifying what this document includes and excludes.

## Section 2 — Object Model Overview

Use for:

- reviewing object families;
- identifying required MVP objects;
- identifying target-state objects;
- understanding object relationships and lifecycle.

## Section 3 — Common Fields Shared Across Objects

Use for:

- shared schema fields;
- metadata design;
- status values;
- confidentiality and privilege fields.

## Section 4 — Client Object

Use for:

- client records;
- W1 client memory;
- client master story;
- client-level facts.

## Section 5 — Matter Object

Use for:

- matter records;
- matter silos;
- jurisdiction;
- plaintiff/defense posture;
- current workflow.

## Section 6 — Person Object

Use for:

- individuals;
- witnesses;
- representatives;
- directors;
- prosecutors;
- judges;
- experts.

## Section 7 — Entity Object

Use for:

- companies;
- trusts;
- regulators;
- courts;
- funds;
- corporate groups.

## Section 8 — Relationship Object

Use for:

- ownership;
- control;
- representation;
- witness relationships;
- entity maps.

## Section 9 — Source Object

Use for:

- source tracking;
- source reliability;
- original vs derivative sources.

## Section 10 — Evidence Object

Use for:

- evidence records;
- document upload;
- evidence metadata;
- exhibit IDs.

## Section 11 — Evidence Extraction Object

Use for:

- OCR;
- parsing;
- markdown extraction;
- JSON extraction;
- extraction quality.

## Section 12 — Assertion Object

Use for:

- assertions;
- truth states;
- support states;
- use status;
- fact discipline.

## Section 13 — Fact Object

Use for:

- promoted facts;
- verified assertions;
- client-level facts;
- matter-level facts.

## Section 14 — Timeline Event Object

Use for:

- chronologies;
- event mapping;
- date precision;
- timeline support.

## Section 15 — Contradiction Object

Use for:

- conflicts;
- contradictions;
- unresolved inconsistencies;
- contradiction severity.

## Section 16 — Risk Object

Use for:

- structured risk;
- severity;
- mitigation;
- workflow blocking.

## Section 17 — Client Instruction Object

Use for:

- client approvals;
- client authority;
- settlement authority;
- factual confirmations.

## Section 18 — Legal Authority Object

Use for:

- statutes;
- cases;
- regulations;
- legal authority metadata;
- citation verification.

## Section 19 — Research Memo Object

Use for:

- research notes;
- W7 research;
- jurisdiction-scoped research;
- authority lists.

## Section 20 — Strategy Point Object

Use for:

- legal theories;
- attack points;
- defense points;
- strategy objects.

## Section 21 — Strategy Memo Object

Use for:

- W6 strategy memos;
- strategy artifacts;
- assumption and risk summaries.

## Section 22 — Argument Node Object

Use for:

- structured legal arguments;
- argument sections;
- fact-law-evidence linkage.

## Section 23 — Argument Draft Object

Use for:

- W8 drafts;
- legal argument outputs;
- draft versioning.

## Section 24 — Adversarial Critique Object

Use for:

- W9 red-team critique;
- attack matrix;
- weakness registry.

## Section 25 — Output Artifact Object

Use for:

- legal artifacts;
- document status;
- finality;
- artifact registry.

## Section 26 — Translation Object

Use for:

- bilingual records;
- English/Chinese translation;
- parallel text;
- translation confidence.

## Section 27 — Jurisdiction Profile Object

Use for:

- jurisdiction knowledge;
- procedural rules;
- evidence rules;
- citation style.

## Section 28 — Workflow State Object

Use for:

- workflow tracking;
- W0–W11 state;
- current stage;
- blocked status.

## Section 29 — Workflow Event Object

Use for:

- workflow audit;
- state changes;
- reopening;
- handoffs.

## Section 30 — Promotion Request Object

Use for:

- matter-to-client fact promotion;
- memory layer promotion;
- W1 review.

## Section 31 — Review Event Object

Use for:

- human review;
- system review;
- approvals;
- overrides.

## Section 32 — Agent Output Object

Use for:

- agent-generated outputs;
- model output tracking;
- workflow-generated records.

## Section 33 — Model Record Object

Use for:

- model registry;
- model governance;
- model routing.

## Section 34 — Tool Record Object

Use for:

- tool registry;
- tool access;
- approved workflows.

## Section 35 — Prompt Record Object

Use for:

- prompt versioning;
- prompt governance;
- agent prompts.

## Section 36 — Tool Call Object

Use for:

- tool-use logs;
- agent tool calls;
- tool failure tracking.

## Section 37 — Access Grant Object

Use for:

- access permissions;
- RBAC/ABAC;
- object access.

## Section 38 — Privilege Classification Object

Use for:

- privilege classification;
- waiver;
- privilege review.

## Section 39 — Learning Object

Use for:

- institutional learning;
- outcome learning;
- model-error learning.

## Section 40 — Audit Event Object

Use for:

- audit logs;
- access logs;
- mutation logs;
- external action logs.

## Section 41 — Object Ownership and Workflow Control

Use for:

- workflow ownership;
- mutation authority;
- object responsibility.

## Section 42 — MVP Object Set

Use for:

- MVP schema planning;
- required MVP objects;
- MVP simplifications.

## Section 43 — Intake and Onboarding Objects (W0)

Use for:

- prospective client intake;
- `intake_id` instances;
- Client/Matter Candidate records;
- Intake Group scaffolding;
- W0 isolation prior to promotion.

## Section 44 — Target-State Object Architecture

Use for:

- target-state legal object architecture;
- provenance graph;
- autonomy support.

## Section 45 — Implementation Guidance for MVP

Use for:

- first Supabase table planning;
- MVP build sequence;
- object dependencies.

## Section 46 — Summary

Use for:

- quick recap;
- object model principles;
- implementation readiness.

---

# Fast Lookup Table

| Topic | Primary Sections |
|---|---|
| Why object model matters | Sections 1, 2, 46 |
| W0 onboarding / intake | Section 43 |
| Common fields | Section 3 |
| Client | Section 4 |
| Matter | Section 5 |
| Person | Section 6 |
| Entity | Section 7 |
| Relationships | Section 8 |
| Sources | Section 9 |
| Evidence | Sections 10, 11 |
| Assertions / truth states | Section 12 |
| Facts | Section 13 |
| Timeline | Section 14 |
| Contradictions | Section 15 |
| Risks | Section 16 |
| Client instructions | Section 17 |
| Legal authorities | Section 18 |
| Research memos | Section 19 |
| Strategy | Sections 20, 21 |
| Arguments | Sections 22, 23 |
| Adversarial critique | Section 24 |
| Output artifacts | Section 25 |
| Translation | Section 26 |
| Jurisdiction | Section 27 |
| Workflow state | Sections 28, 29 |
| Promotion requests | Section 30 |
| Reviews | Section 31 |
| Agent outputs | Section 32 |
| Models | Section 33 |
| Tools | Sections 34, 36 |
| Prompts | Section 35 |
| Access control | Sections 37, 38 |
| Learning | Section 39 |
| Audit | Section 40 |
| Object ownership | Section 41 |
| MVP object set | Sections 42, 45 |
| Target-state architecture | Section 44 |

---

# Agent Reading Protocol

Before performing any task based on this document, an agent should follow this protocol:

1. **Identify the task type.**

   Determine whether the task concerns schema, objects, workflows, MVP, agents, evidence, risk, research, drafting, security, or implementation.

2. **Read the relevant index entry.**

   Use the topic map above to identify the relevant sections.

3. **Read Section 3 if creating or modifying schema fields.**

   Section 3 defines shared fields and metadata.

4. **Read Section 42 and Section 45 if the task affects MVP.**

   These sections define required MVP objects, simplifications, red lines, and build sequence.

5. **Read Section 41 if the task affects object ownership or mutation authority.**

   This section identifies which workflow owns which object.

6. **Read Section 46 for summary constraints.**

   Section 46 provides the compressed object-model doctrine.

7. **Do not infer permission from silence.**

   If a shortcut is not expressly permitted, check whether it violates Client/Matter separation, Evidence Object structure, Assertion truth states, Output Artifact status, Workflow State, Risk tracking, or provenance.

---

# Mandatory Cross-Checks for Agents

## For database schema tasks

Read:

- Section 3;
- Section 42;
- Section 45.

Mandatory check:

- Does every matter-scoped table include `matter_id`?
- Does every client-scoped table include `client_id`?
- Are status, source, version, confidentiality, and privilege fields included where appropriate?

## For evidence-ingest tasks

Read:

- Section 10;
- Section 11;
- Section 12;
- Section 45.

Mandatory check:

- Does every uploaded file become an Evidence Object?
- Is the original file preserved?
- Is extracted text stored separately?
- Is processing status tracked?
- Can evidence link to assertions?

## For assertion/fact tasks

Read:

- Section 12;
- Section 13;
- Section 15.

Mandatory check:

- Does each assertion have type, truth state, support state, source, and matter link?
- Are contradictions represented structurally?

## For workflow tasks

Read:

- Section 28;
- Section 29;
- Section 41.

Mandatory check:

- Does the matter have workflow state?
- Are workflow events logged?
- Is ownership clear?

## For legal drafting tasks

Read:

- Section 20;
- Section 22;
- Section 23;
- Section 25.

Mandatory check:

- Does the argument draft link to strategy, assertions, evidence, legal authorities, and artifact status?

## For adversarial review tasks

Read:

- Section 24;
- Section 16;
- Section 23.

Mandatory check:

- Does the critique identify target object, attack type, severity, recommended fix, and status?

## For security/access tasks

Read:

- Section 3;
- Section 37;
- Section 38.

Mandatory check:

- Are privilege, confidentiality, and access permissions represented as structured fields or objects?

## For agent/model/tool tasks

Read:

- Section 32;
- Section 33;
- Section 34;
- Section 35;
- Section 36.

Mandatory check:

- Are model, prompt, tool, and agent outputs traceable?

## For institutional learning tasks

Read:

- Section 39.

Mandatory check:

- Is learning scoped, sourced, confidence-rated, and privilege-aware?

---

# Final Instruction to Agents

This document defines the canonical object architecture of LEXOS.

Agents must not reduce LEXOS to unstructured documents, chat history, or prompt outputs.

When implementing or modifying LEXOS, agents must preserve:

- Client objects;
- Matter objects;
- Evidence objects;
- Assertion objects;
- Output Artifact objects;
- Workflow State objects;
- Risk objects;
- Source links;
- Truth/support states;
- Matter-scoped retrieval;
- Versioning;
- Privilege/confidentiality fields;
- Agent/model/tool traceability;
- Auditability.

The MVP may simplify fields.

The MVP must not remove the core objects.

## Document Status

**Document Name:** LEXOS Canonical Object Model  
**Document Number:** Document 2  
**Version:** v1.0 Draft  
**Purpose:** Define the canonical legal objects required to build LEXOS from MVP through target-state autonomous legal institution.  
**Depends On:** Document 1 — LEXOS Institutional Doctrine  
**Primary Use:** Database schema design, workflow specification, agent prompt design, MVP build planning, retrieval architecture, governance rules, and technical implementation.

---

# Section 1 — Purpose and Scope

## 1.1 Purpose of This Document

This document defines the canonical object model for LEXOS.

LEXOS is an autonomous legal cognition and execution operating system designed to become the institutional intelligence core of an AI-native law firm. To build it correctly, the system must not begin as a collection of prompts, agents, documents, or chat interfaces. It must begin with a stable object model.

The object model defines the legal entities, records, artifacts, states, relationships, and lifecycle rules that LEXOS uses to reason, remember, act, audit, and evolve.

This document translates the institutional doctrine into implementation-ready objects.

The core purpose is to ensure that the MVP and all later versions preserve the correct legal architecture from the beginning.

## 1.2 Why the Object Model Comes Before Technical Build

The object model must precede database schema, UI, workflow automation, agent prompts, and technical architecture.

If the object model is wrong, everything downstream becomes fragile.

For example:

- if Client and Matter are not separate, cross-matter contamination becomes likely;
- if Evidence is stored only as files, evidence cannot be reliably linked to assertions;
- if Assertions do not exist, legal drafting cannot remain evidence-grounded;
- if Output Artifacts have no status, drafts may be mistaken for final work;
- if Workflow State is not modeled, the system cannot become autonomous;
- if Risk is not structured, risk cannot control workflow behavior;
- if Provenance is missing, legal outputs cannot be defended;
- if Privilege is not a field, retrieval cannot be safely governed.

The object model is therefore not a technical detail.

It is the legal skeleton of the system.

## 1.3 Scope of This Document

This document defines:

- core objects;
- object purpose;
- required MVP fields;
- target-state fields;
- relationships;
- lifecycle;
- ownership;
- permitted mutations;
- status values;
- privilege and confidentiality fields;
- versioning rules;
- and implementation notes.

This document does not define:

- final database SQL;
- API endpoints;
- UI screen layouts;
- agent prompts;
- workflow state machine logic in full detail;
- deployment architecture;
- or full security implementation.

Those belong in later documents.

However, this document should directly inform all of them.

## 1.4 Object Model Design Doctrine

The object model follows these rules:

1. **Legal objects are primary.**

   The system stores legal meaning, not merely files or chat messages.

2. **Client and Matter must remain separate.**

   Client-level memory and matter-level memory are related but distinct.

3. **Evidence must be structured.**

   Uploaded files become Evidence Objects.

4. **Assertions are the core epistemic unit.**

   Facts, allegations, inferences, legal propositions, and risks must not be collapsed into generic notes.

5. **Outputs are Legal Artifacts.**

   Drafts, memos, reports, arguments, and final bundles require status, version, source basis, and workflow origin.

6. **Risk is an object.**

   Risk must control workflow behavior.

7. **Workflow State is mandatory.**

   LEXOS must know what stage each matter is in.

8. **Provenance must be preserved.**

   Every important object must know where it came from and what depends on it.

9. **Security and privilege must be fields, not afterthoughts.**

   Access and retrieval depend on object metadata.

10. **MVP may simplify fields, not object boundaries.**

   The first version may use fewer fields, but it must not merge objects that need to remain separate.

---

# Section 2 — Object Model Overview

## 2.1 Core Object Families

The LEXOS object model is organized into the following object families:

1. Identity and Relationship Objects;
2. Matter and Workflow Objects;
3. Evidence and Source Objects;
4. Epistemic Objects;
5. Legal Research Objects;
6. Strategy and Argument Objects;
7. Output and Artifact Objects;
8. Risk and Governance Objects;
9. Security and Access Objects;
10. Translation and Jurisdiction Objects;
11. Agent, Model, and Tool Objects;
12. Learning and Audit Objects.

## 2.2 Core MVP Objects

The MVP must include at least the following objects:

1. Client;
2. Matter;
3. Evidence;
4. Assertion;
5. Source;
6. Output Artifact;
7. Workflow State;
8. Risk;
9. Research Note;
10. Strategy Memo;
11. Argument Draft;
12. Adversarial Critique;
13. Agent Output;
14. Audit Event.

Without these, the MVP becomes structurally weak.

## 2.3 Target-State Object Set

The target-state system should include:

1. Client;
2. Matter;
3. Person;
4. Entity;
5. Relationship;
6. Client Instruction;
7. Evidence;
8. Source;
9. Evidence Extraction;
10. Assertion;
11. Fact;
12. Timeline Event;
13. Contradiction;
14. Legal Authority;
15. Research Memo;
16. Strategy Point;
17. Strategy Memo;
18. Argument Node;
19. Argument Draft;
20. Adversarial Critique;
21. Visual Artifact;
22. Output Artifact;
23. Translation;
24. Jurisdiction Profile;
25. Workflow State;
26. Workflow Event;
27. Risk;
28. Promotion Request;
29. Review Event;
30. Agent Output;
31. Model Record;
32. Tool Record;
33. Prompt Record;
34. Access Grant;
35. Privilege Classification;
36. Learning Object;
37. Audit Event.

The MVP can start with a reduced version of this set, but the target-state relationships should be anticipated.

## 2.4 Object Relationship Summary

At a high level:

- A Client may have many Matters.
- A Matter belongs to one Client.
- A Matter may contain many Evidence Objects.
- Evidence may support, partially support, contradict, or contextualize Assertions.
- Assertions may form Facts once verified or promoted.
- Assertions may belong to Timeline Events.
- Contradictions connect conflicting Assertions or Sources.
- Research Memos attach Legal Authorities to legal issues.
- Strategy Points depend on Assertions, Evidence, Legal Authorities, and Risks.
- Argument Nodes depend on Strategy Points, Assertions, Evidence, and Legal Authorities.
- Output Artifacts are generated from workflows and depend on underlying objects.
- Workflow State tracks the matter’s current process.
- Risks attach to any object.
- Agent Outputs create or modify objects.
- Audit Events record object access, creation, mutation, and external actions.
- Learning Objects abstract lessons from matters, workflows, models, errors, and outcomes.

## 2.5 Object Lifecycle Pattern

Most important LEXOS objects follow a lifecycle:

1. Created;
2. Classified;
3. Linked;
4. Reviewed or validated;
5. Used by workflows;
6. Updated or versioned;
7. Promoted, demoted, superseded, or archived.

Not every object requires all stages.

However, no important legal object should be silently overwritten.

---

# Section 3 — Common Fields Shared Across Objects

## 3.1 Purpose of Common Fields

Many LEXOS objects share common fields. These fields support traceability, security, lifecycle management, versioning, and workflow control.

Common fields should be standardized where possible.

## 3.2 Core Common Fields

Most objects should include:

| Field | Purpose |
|---|---|
| `id` | Unique object identifier |
| `object_type` | Canonical type of object |
| `client_id` | Link to Client where applicable |
| `matter_id` | Link to Matter where applicable |
| `title` | Human-readable title |
| `description` | Short description |
| `status` | Current object status |
| `created_at` | Creation timestamp |
| `created_by_type` | Human, agent, system, import |
| `created_by_id` | Creator identifier |
| `updated_at` | Last update timestamp |
| `updated_by_type` | Human, agent, system |
| `updated_by_id` | Last updater identifier |
| `version` | Current version number or label |
| `is_current` | Whether this is the current version |
| `supersedes_id` | Prior object version if applicable |
| `superseded_by_id` | Later object version if applicable |
| `source_ids` | Linked source objects |
| `evidence_ids` | Linked evidence objects where applicable |
| `workflow_id` | Workflow that created or owns object |
| `workflow_stage` | Workflow stage at creation/update |
| `confidentiality_status` | Confidentiality classification |
| `privilege_status` | Privilege classification |
| `access_scope` | Who or what may access it |
| `jurisdiction_id` | Jurisdiction link where applicable |
| `language` | Source or primary language |
| `notes` | Human/system notes |

## 3.3 MVP Common Fields

For MVP, most objects should include at minimum:

| Field | Purpose |
|---|---|
| `id` | Unique identifier |
| `client_id` | Client link where applicable |
| `matter_id` | Matter link where applicable |
| `title` | Human-readable title |
| `status` | Current state |
| `created_at` | Creation timestamp |
| `updated_at` | Update timestamp |
| `version` | Version |
| `source_ids` | Source links where applicable |
| `evidence_ids` | Evidence links where applicable |
| `confidentiality_status` | Basic confidentiality |
| `privilege_status` | Basic privilege |
| `notes` | Notes |

## 3.4 Confidentiality Status Values

Suggested values:

- `public`;
- `client_facing`;
- `internal`;
- `confidential`;
- `highly_confidential`;
- `restricted`;
- `sealed`;
- `archived_restricted`;
- `unknown`.

MVP may use:

- `internal`;
- `client_facing`;
- `confidential`;
- `restricted`;
- `unknown`.

## 3.5 Privilege Status Values

Suggested values:

- `unknown`;
- `not_privileged`;
- `confidential_not_privileged`;
- `attorney_client_privileged`;
- `attorney_work_product`;
- `common_interest_privileged`;
- `partially_privileged`;
- `privilege_disputed`;
- `privilege_waived_or_disclosed`.

MVP may use:

- `unknown`;
- `not_privileged`;
- `privileged`;
- `work_product`;
- `confidential`.

## 3.6 Object Status Pattern

Objects should have status values appropriate to their type.

However, common status values include:

- `draft`;
- `active`;
- `pending_review`;
- `approved`;
- `rejected`;
- `blocked`;
- `superseded`;
- `withdrawn`;
- `archived`.

---

# Section 4 — Client Object

## 4.1 Object Purpose

The Client Object represents the persistent client-level identity in LEXOS.

A Client may be an individual, company, group, trust, foundation, government entity, fund, partnership, estate, family office, or other legal actor.

The Client Object is the anchor for client-level memory.

It must remain distinct from Matter Objects.

## 4.2 Why Client Object Is Required

Without a Client Object:

- matters cannot be grouped correctly;
- client-level facts cannot be maintained;
- KYC/CDD cannot be tracked;
- cross-matter continuity becomes impossible;
- conflict checks are weakened;
- client memory contaminates matter memory;
- institutional learning becomes unsafe.

## 4.3 MVP Fields

| Field | Description |
|---|---|
| `client_id` | Unique client identifier |
| `client_name` | Legal or working client name |
| `client_type` | Individual, company, group, trust, etc. |
| `primary_contact_name` | Main contact |
| `primary_contact_email` | Main email |
| `primary_contact_phone` | Main phone |
| `jurisdiction` | Primary jurisdiction or residence/incorporation |
| `status` | Prospect, active, inactive, declined, archived |
| `client_master_story` | Basic narrative summary |
| `notes` | Internal notes |
| `created_at` | Created timestamp |
| `updated_at` | Updated timestamp |
| `confidentiality_status` | Basic confidentiality |
| `privilege_status` | Usually confidential or unknown |

## 4.4 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `legal_name` | Formal legal name |
| `preferred_name` | Preferred display name |
| `registration_number` | Company or legal registration number |
| `date_of_birth_or_incorporation` | Individual DOB or entity incorporation date |
| `nationality_or_incorporation_jurisdiction` | Nationality or incorporation jurisdiction |
| `addresses` | Structured address list |
| `authorized_representatives` | Linked Person records |
| `beneficial_owners` | Linked Person/Entity records |
| `related_entities` | Linked Entity records |
| `kyc_status` | KYC/CDD status |
| `risk_rating` | Client risk rating |
| `sanctions_status` | Sanctions screening status |
| `pep_status` | Politically exposed person status where applicable |
| `client_facts` | Linked Fact records |
| `client_master_story_artifact_id` | Linked artifact |
| `active_matters` | Linked matters |
| `closed_matters` | Linked matters |
| `client_fact_audit_log_ids` | Linked audit records |
| `data_retention_policy` | Retention classification |
| `relationship_owner` | Human or system owner |
| `access_group_ids` | Authorized access groups |

## 4.5 Relationships

A Client:

- has many Matters;
- has many Client Facts;
- may have many Persons;
- may have many Entities;
- may have many Client Instructions;
- may have many Risks;
- may have many Output Artifacts;
- may have many Audit Events.

## 4.6 Lifecycle

Suggested lifecycle:

1. Prospect;
2. Intake pending;
3. Active client;
4. Inactive client;
5. Declined prospect;
6. Archived;
7. Restricted or legal hold.

## 4.7 Permitted Mutations

MVP:

- user or admin may create Client;
- user or admin may edit basic details;
- system may append notes;
- system may create Client Master Story draft.

Target-state:

- W0 may create Draft Client;
- W1 controls persistent Client Master Record;
- W1 controls promotion of Client Facts;
- governance layer controls archival, restriction, and deletion.

## 4.8 Implementation Notes

Client data must not be stored only inside a Matter.

Client is a persistent object.

Matter-specific facts should not automatically update the Client Object.

Promotions from matters to client-level memory should use Promotion Request objects.

---

# Section 5 — Matter Object

## 5.1 Object Purpose

The Matter Object represents a specific legal case, dispute, transaction, investigation, advisory engagement, regulatory issue, or legal project for a Client.

A Client may have many Matters.

Each Matter must be its own silo.

## 5.2 Why Matter Object Is Required

The Matter Object protects:

- matter-specific facts;
- evidence;
- strategy;
- privilege;
- workflow state;
- risk;
- outputs;
- and retrieval scope.

Without Matter Objects, LEXOS cannot safely handle multiple cases.

## 5.3 MVP Fields

| Field | Description |
|---|---|
| `matter_id` | Unique matter identifier |
| `client_id` | Parent client |
| `matter_name` | Human-readable name |
| `matter_type` | Criminal, civil, corporate, regulatory, etc. |
| `posture` | Plaintiff-side, defense-side, advisory, transactional |
| `jurisdiction` | Primary jurisdiction |
| `forum` | Court, tribunal, regulator, or internal |
| `status` | Open, active, paused, closed, archived |
| `description` | Matter summary |
| `case_master_story_artifact_id` | Linked case story artifact |
| `current_workflow` | Current workflow stage |
| `created_at` | Created timestamp |
| `updated_at` | Updated timestamp |
| `confidentiality_status` | Confidentiality classification |
| `privilege_status` | Privilege classification |

## 5.4 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `matter_number` | Firm-style matter number |
| `lead_lawyer_id` | Human or system lead |
| `assigned_team_ids` | Team or agents |
| `opposing_parties` | Linked Person/Entity records |
| `court_or_authority` | Linked forum record |
| `governing_law` | Governing law |
| `procedural_law` | Procedural law |
| `evidence_jurisdiction` | Evidence jurisdiction |
| `enforcement_jurisdiction` | Enforcement jurisdiction |
| `language_requirements` | Required languages |
| `deadline_profile` | Key deadline information |
| `workflow_state_id` | Linked workflow state |
| `risk_summary` | Linked risks |
| `evidence_register_id` | Linked register |
| `support_matrix_id` | Linked artifact |
| `strategy_status` | Strategy state |
| `external_action_authority` | Whether external actions allowed |
| `legal_hold_status` | Legal hold state |
| `data_retention_policy` | Retention class |

## 5.5 Relationships

A Matter:

- belongs to one Client;
- has many Evidence Objects;
- has many Assertions;
- has many Timeline Events;
- has many Contradictions;
- has many Risks;
- has many Research Memos;
- has many Strategy Points;
- has many Argument Nodes;
- has many Output Artifacts;
- has one or many Workflow States over time;
- has many Audit Events.

## 5.6 Lifecycle

Suggested lifecycle:

1. Draft;
2. Open;
3. Active;
4. Waiting for client;
5. Waiting for evidence;
6. Waiting for research;
7. Under review;
8. Paused;
9. Closed;
10. Archived;
11. Legal hold.

## 5.7 Permitted Mutations

MVP:

- user creates Matter under Client;
- user or system updates status;
- system updates current workflow;
- system links outputs and evidence.

Target-state:

- W0 opens Matter after onboarding;
- W1 provides client-level facts;
- workflow engine controls matter state;
- governance controls closure, legal hold, and archival.

## 5.8 Implementation Notes

Every matter-scoped object must include `matter_id`.

No evidence, assertion, artifact, risk, or research memo should exist without a Matter unless explicitly institutional or client-level.

---

# Section 6 — Person Object

## 6.1 Object Purpose

The Person Object represents a human individual relevant to a Client or Matter.

Persons may include:

- client;
- representative;
- witness;
- director;
- shareholder;
- beneficial owner;
- opposing party;
- lawyer;
- judge;
- prosecutor;
- regulator;
- expert;
- employee;
- family member;
- intermediary;
- contact.

## 6.2 MVP Treatment

Person can be simplified in MVP.

Minimum MVP may store persons as text fields in Matter, Assertion, or Evidence notes.

However, if the first MVP involves complex litigation, corporate structures, or criminal defense, Person should be implemented early.

## 6.3 MVP Fields

| Field | Description |
|---|---|
| `person_id` | Unique person identifier |
| `client_id` | Related client where applicable |
| `matter_id` | Related matter where applicable |
| `full_name` | Name |
| `role` | Witness, director, opposing party, etc. |
| `contact_info` | Basic contact if available |
| `notes` | Notes |
| `status` | Active, inactive, disputed, unknown |
| `created_at` | Created timestamp |
| `updated_at` | Updated timestamp |

## 6.4 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `aliases` | Other names |
| `language_preferences` | Preferred language |
| `nationality` | Nationality |
| `residence_jurisdiction` | Residence |
| `identity_verified_status` | Identity verification |
| `relationship_to_client` | Structured relationship |
| `relationship_to_matter` | Structured relationship |
| `authority_status` | Whether authorized to instruct |
| `witness_status` | Potential, confirmed, hostile, unavailable |
| `credibility_notes` | Restricted credibility notes |
| `confidentiality_status` | Confidentiality |
| `privilege_status` | Privilege |
| `source_ids` | Sources supporting identity/role |

## 6.5 Relationships

A Person may be linked to:

- Client;
- Matter;
- Entity;
- Evidence;
- Assertion;
- Timeline Event;
- Client Instruction;
- Risk;
- Output Artifact.

## 6.6 Implementation Notes

Do not treat all named individuals as verified Persons.

A name extracted from a document may begin as a candidate Person until confirmed.

---

# Section 7 — Entity Object

## 7.1 Object Purpose

The Entity Object represents a legal or organizational entity.

Entities may include:

- companies;
- partnerships;
- trusts;
- foundations;
- funds;
- government bodies;
- regulators;
- courts;
- associations;
- DAOs or digital organizations;
- informal business groups.

## 7.2 MVP Treatment

Entity may be optional in the earliest MVP unless the initial legal matters involve corporate structures.

For corporate, regulatory, or financial disputes, Entity should be implemented early.

## 7.3 MVP Fields

| Field | Description |
|---|---|
| `entity_id` | Unique entity identifier |
| `client_id` | Related client where applicable |
| `matter_id` | Related matter where applicable |
| `entity_name` | Entity name |
| `entity_type` | Company, trust, regulator, etc. |
| `jurisdiction` | Incorporation or operating jurisdiction |
| `role` | Client entity, counterparty, related company, etc. |
| `status` | Active, dissolved, disputed, unknown |
| `notes` | Notes |
| `created_at` | Created timestamp |
| `updated_at` | Updated timestamp |

## 7.4 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `registration_number` | Registry number |
| `incorporation_date` | Incorporation date |
| `registered_address` | Registered address |
| `operating_address` | Operating address |
| `beneficial_owners` | Linked Persons/Entities |
| `directors` | Linked Persons |
| `shareholders` | Linked Persons/Entities |
| `control_persons` | Linked Persons |
| `source_registry` | Registry source |
| `verification_status` | Verified, pending, disputed |
| `related_entities` | Linked entities |
| `risk_rating` | Entity risk rating |
| `source_ids` | Sources |

## 7.5 Relationships

An Entity may be linked to:

- Client;
- Matter;
- Person;
- Evidence;
- Assertion;
- Timeline Event;
- Risk;
- Legal Authority;
- Output Artifact.

## 7.6 Implementation Notes

Formal legal role and practical control must be separated.

Example:

- “Person X is not a registered director” is a formal registry assertion.
- “Person X exercised de facto control” is a different assertion requiring separate support.

---

# Section 8 — Relationship Object

## 8.1 Object Purpose

The Relationship Object represents a structured relationship between two objects.

Examples:

- Person controls Entity;
- Person represents Client;
- Entity owns Entity;
- Person is witness in Matter;
- Entity is counterparty to Client;
- Evidence relates to Person;
- Matter involves Entity.

## 8.2 MVP Treatment

Relationship can be deferred in basic MVP and represented through fields.

However, for complex matters, a Relationship object should be introduced early.

## 8.3 MVP Fields

| Field | Description |
|---|---|
| `relationship_id` | Unique ID |
| `subject_type` | Person, Entity, Client, Matter |
| `subject_id` | Subject object |
| `relationship_type` | Director, owner, witness, counterparty, etc. |
| `object_type` | Related object type |
| `object_id` | Related object |
| `matter_id` | Matter scope where applicable |
| `truth_state` | Verified, alleged, disputed, etc. |
| `source_ids` | Supporting sources |
| `notes` | Notes |

## 8.4 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `valid_from` | Start date |
| `valid_until` | End date |
| `jurisdiction_id` | Jurisdiction |
| `confidence` | Confidence level |
| `supporting_evidence_ids` | Evidence |
| `contradiction_ids` | Contradictions |
| `created_by_workflow` | Workflow origin |
| `version` | Version |

## 8.5 Implementation Notes

Relationships should not be assumed from proximity.

Example:

Being copied on an email does not automatically prove authority.

A relationship may be alleged, inferred, or verified.

---

# Section 9 — Source Object

## 9.1 Object Purpose

The Source Object represents the origin of information.

A Source may be:

- uploaded document;
- court filing;
- client statement;
- witness statement;
- public registry;
- statute;
- case law;
- email;
- message export;
- audio recording;
- website;
- legal research database;
- human note;
- AI output;
- external counsel opinion.

Source and Evidence are related but not identical.

A Source may become Evidence if used to support or contradict legal assertions.

## 9.2 MVP Fields

| Field | Description |
|---|---|
| `source_id` | Unique source identifier |
| `client_id` | Client link |
| `matter_id` | Matter link where applicable |
| `source_type` | Document, statement, registry, law, AI output, etc. |
| `title` | Source title |
| `origin` | Client, court, registry, system, etc. |
| `date_of_source` | Date source was created where known |
| `date_received` | Date received by LEXOS |
| `language` | Source language |
| `reliability_status` | Reliable, unknown, disputed, etc. |
| `confidentiality_status` | Confidentiality |
| `privilege_status` | Privilege |
| `notes` | Notes |

## 9.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `source_uri` | Internal or external location |
| `source_author` | Creator |
| `source_holder` | Holder or custodian |
| `official_status` | Official, unofficial, draft, etc. |
| `authentication_status` | Authenticated, unauthenticated, disputed |
| `jurisdiction_id` | Jurisdiction |
| `retrieval_method` | Upload, API, search, manual |
| `accessed_at` | Access timestamp |
| `hash` | File or content hash where applicable |
| `chain_of_custody_id` | Custody record |
| `related_evidence_id` | Evidence link |
| `related_authority_id` | Legal authority link |
| `version` | Version |

## 9.4 Source Reliability Values

Suggested values:

- `authoritative_official`;
- `authenticated_original`;
- `verified_internal`;
- `reliable_external`;
- `client_provided`;
- `opposing_party_source`;
- `informal_source`;
- `ai_generated_derivative`;
- `unknown`;
- `unreliable`;
- `disputed`.

## 9.5 Relationships

A Source may link to:

- Evidence;
- Assertion;
- Legal Authority;
- Research Memo;
- Translation;
- Output Artifact;
- Risk;
- Audit Event.

## 9.6 Implementation Notes

Search snippets should not be treated as Source Objects unless stored with context.

An AI-generated summary is a derivative source, not original evidence.

---

# Section 10 — Evidence Object

## 10.1 Object Purpose

The Evidence Object represents material that may support, contradict, contextualize, or otherwise affect legal assertions in a Matter.

Evidence is not merely an uploaded file.

It is a structured legal object.

## 10.2 MVP Fields

| Field | Description |
|---|---|
| `evidence_id` | Unique evidence identifier |
| `client_id` | Client link |
| `matter_id` | Matter link |
| `source_id` | Source link |
| `file_name` | Original file name |
| `file_type` | PDF, DOCX, image, audio, video, etc. |
| `evidence_media_type` | Text-bearing document, scanned document, image-with-text, image-without-text, audio, video, other |
| `source_type` | How the item entered LEXOS (upload, import, integration, etc.) |
| `evidence_type` | Contract, email, court filing, bank record, etc. |
| `uploaded_by` | Human or system uploader |
| `uploaded_at` | Upload timestamp |
| `original_file_uri` | **Evidentiary anchor** — durable storage link to the unchanged original upload |
| `original_file_hash` | Optional MVP; **required in target-state** for integrity checking |
| `extracted_text_uri` | Legacy/auxiliary pointer — primary markdown/JSON should live on Evidence Extraction Objects |
| `processing_status` | MVP pipeline state; normative values: `uploaded`, `queued`, `processing`, `processed`, `qa_flagged`, `failed`, `requires_human_review`, `superseded` (see Document 8 W4-lite normative list; extensions may add values such as `requires_reupload`, `archived`) |
| `extraction_status` | Extraction run disposition aligned to processing pipeline (may mirror or refine `processing_status` per implementation) |
| `language` | Primary language |
| `privilege_status` | Privilege |
| `confidentiality_status` | Confidentiality |
| `quality_status` | Mirror for operator UX; align with latest `extraction_quality_status` from current Evidence Extraction where applicable |
| `human_review_required` | Boolean (or enum) — **human review flag**; must surface when material |
| `metadata_json` | File metadata (MIME, dimensions, duration, capture device, etc.; MVP may be partial) |
| `notes` | Notes |

## 10.3 Target-State Fields

Additional target-state fields:

| Field | Description |
|---|---|
| `exhibit_id` | Exhibit number or label |
| `hash` | Cryptographic hash (**required** at target-state if not captured in MVP optional field) |
| `metadata_json` | File metadata |
| `extraction_id` | Linked extraction object |
| `embedding_ids` | Vector chunks |
| `chain_of_custody_id` | Custody records |
| `authenticity_status` | Authenticity classification |
| `admissibility_status` | Admissibility status |
| `redaction_status` | Redaction state |
| `translation_ids` | Linked translations |
| `linked_assertion_ids` | Supported/contradicted assertions |
| `linked_argument_ids` | Arguments using evidence |
| `quality_flags` | OCR or processing issues |
| `version` | Version |
| `is_original_preserved` | Whether original is preserved |

## 10.4 Evidence Type Values

Examples:

- `contract`;
- `court_filing`;
- `court_order`;
- `prosecution_file`;
- `complaint`;
- `indictment`;
- `email`;
- `message_export`;
- `bank_record`;
- `accounting_record`;
- `invoice`;
- `receipt`;
- `corporate_registry`;
- `identity_document`;
- `photograph`;
- `screenshot`;
- `audio`;
- `video`;
- `transcript`;
- `witness_statement`;
- `expert_report`;
- `internal_note`;
- `other`.

## 10.5 Processing Status Values

### MVP-required values (Evidence / W4-lite pipeline)

- `uploaded`;
- `queued`;
- `processing`;
- `processed`;
- `qa_flagged`;
- `failed`;
- `requires_human_review`;
- `superseded`.

### Additional operational / target-state values

Implementations may add values such as:

- `requires_reupload`;
- `archived`;

See **Document 8 — MVP Scope and Build Specification**, Section **11.4**, for the authoritative W4-lite MVP statement of required processing statuses.

## 10.6 Authenticity Status Values

Suggested target-state values:

- `unknown`;
- `appears_authentic`;
- `authenticated`;
- `disputed`;
- `suspected_altered`;
- `rejected`;
- `not_applicable`.

## 10.7 Admissibility Status Values

Suggested target-state values:

- `unknown`;
- `likely_admissible`;
- `admissibility_issue`;
- `inadmissible`;
- `privileged`;
- `internal_only`;
- `jurisdiction_dependent`;
- `not_assessed`.

## 10.8 Relationships

Evidence links to:

- Client;
- Matter;
- Source;
- Evidence Extraction;
- Assertion;
- Timeline Event;
- Contradiction;
- Argument Node;
- Output Artifact;
- Translation;
- Risk.

## 10.9 Permitted Mutations

MVP:

- Evidence may be uploaded;
- processing status may change;
- extracted text may be added;
- metadata may be edited;
- evidence may be linked to assertions.

Target-state:

- original file should not be modified;
- derived artifacts may be versioned;
- authenticity/admissibility may be updated;
- evidence may be superseded but not silently deleted.

## 10.10 Implementation Notes

Every evidence item must have `matter_id`.

No anonymous uploads.

Evidence should never be interpreted as proving more than its linked Assertions state.

---

# Section 11 — Evidence Extraction Object

## 11.1 Object Purpose

The Evidence Extraction Object records the output of processing evidence.

This includes OCR, parsing, markdown extraction, JSON extraction, transcription, metadata extraction, and quality flags.

## 11.2 MVP Fields

Structured extractions are **derived artifacts**. The original evidence file referenced by the Evidence Object remains the evidentiary anchor.

| Field | Description |
|---|---|
| `extraction_id` | Unique extraction identifier |
| `evidence_id` | Parent evidence |
| `client_id` | Client link (for security, retrieval, embeddings) |
| `matter_id` | Matter link |
| `extraction_type` | Pathway label (see **Extraction Type Values** below) |
| `markdown_uri` **or** `markdown_text` | Derived markdown extraction |
| `json_uri` **or** `json_content` | Structured JSON extraction |
| `transcript_uri` / `transcript_json` | Timestamped transcript segments when applicable |
| `visual_description` | Machine-generated description for non-text imagery when applicable |
| `ocr_text` | Consolidated **OCR-derived pixel-text overlay / interim bundle** when applicable—supports QA and lineage; **never** substitutes alone for finalized **markdown + JSON** extraction unless flagged per parser-first OCR/vision-assisted doctrine |
| `timecoded_segments` | Structured timecodes for audio/video |
| `frame_references` | Frame or keyframe pointers for video |
| `extraction_tool` | **Parser-first toolchain identifier** (LlamaParse/equivalent plus OCR/vision adjuncts) |
| `extraction_model` | Primary model identifier |
| `qa_model` | Model or rule-set used for QA comparator when applicable |
| `extraction_quality_score` | Numeric score when available |
| `extraction_quality_status` | MVP normative: `accepted`, `qa_flagged`, `failed`, `human_review_required` |
| `quality_flags` | Specific extraction issues |
| `human_review_required` | Boolean/enum for legally material machine output |
| `is_current` | Whether this extraction is the active view for agents |
| `supersedes_extraction_id` | Prior extraction superseded by this run |
| `privilege_status` | Copied from Evidence unless reviewed |
| `confidentiality_status` | Copied from Evidence unless reviewed |
| `created_at` | Timestamp |
| `notes` | Notes |

## 11.3 Target-State Fields

Additional fields (non-exhaustive):

| Field | Description |
|---|---|
| `tool_version` | Tool version |
| `model_version` | Model version |
| `prompt_id` | Prompt used |
| `page_count` | Number of pages |
| `detected_language` | Language |
| `layout_confidence` | Layout confidence |
| `ocr_confidence` | OCR confidence |
| `table_confidence` | Table confidence |
| `handwriting_confidence` | Handwriting confidence |
| `speaker_confidence` | Audio/video speaker confidence |
| `review_status` | Reviewed, not reviewed, corrected |
| `corrected_extraction_id` | Corrected version |
| `supersedes_id` | Prior extraction (alias of `supersedes_extraction_id` if implemented) |

## 11.4 Extraction Type Values

Suggested `extraction_type` values:

- `text_document`;
- `scanned_document`;
- `image_with_text`;
- `image_without_text`;
- `audio_transcript`;
- `video_transcript`;
- `video_visual_timeline`;
- `metadata_only`;
- `manual_extraction`.

**MVP extraction quality status (`extraction_quality_status` on Evidence Extraction Object):**

- `accepted`;
- `qa_flagged`;
- `failed`;
- `human_review_required`.

Authoritative statement: **Document 8 — LEXOS MVP Scope and Build Specification**, Section **11.4** (W4-lite normative build requirements).

## 11.5 Relationships

Extraction links to:

- Evidence;
- Source;
- Assertion;
- Translation;
- Audit Event;
- Model Record;
- Tool Record;
- Embedding chunks (vector objects) where retrieval is enabled.

## 11.6 Implementation Notes

Extracted text is not the original evidence.

It is a derived artifact.

> The original file remains the evidentiary anchor. Markdown, JSON, transcripts, visual descriptions, OCR, embeddings, summaries, and agent outputs are derived artifacts that must link back to the original Evidence Object.

Low-quality extraction should affect confidence of downstream assertions.

## 11.7 Embedding Chunk (Vector) Object

Each **EmbeddingChunk** (or equivalent row in `embedding_chunks`) stores a retrievable slice of **derived** extraction content. Embeddings are retrieval aids, not substitute evidence.

| Field | Description |
|---|---|
| `chunk_id` | Unique chunk identifier |
| `client_id` | Client scope |
| `matter_id` | Matter scope |
| `evidence_id` | Parent evidence |
| `extraction_id` | Extraction run that produced the chunk text |
| `source_object_type` | Evidence Extraction, Assertion, etc. |
| `source_object_id` | Identifier for the source object |
| `chunk_text` | Text embedded (from markdown, JSON string, transcript, visual description, etc.) |
| `chunk_index` | Ordinal within the extraction |
| `page_reference` | Page pointer when applicable |
| `timecode_reference` | Timecode when applicable |
| `frame_reference` | Frame pointer when applicable |
| `language` | Language of chunk text |
| `privilege_status` | Copied from evidence unless reviewed |
| `confidentiality_status` | Copied from evidence unless reviewed |
| `embedding_model` | Model identifier |
| `embedding_vector` | Vector payload (stored in pgvector or equivalent) |
| `is_current` | Whether chunk is active for retrieval |
| `created_at` | Timestamp |

---

# Section 12 — Assertion Object

## 12.1 Object Purpose

The Assertion Object is the core epistemic unit of LEXOS.

An Assertion is any legally significant proposition that may be supported, contradicted, verified, inferred, argued, translated, researched, or rejected.

Assertions are required for evidence-grounded legal cognition.

## 12.2 MVP Fields

| Field | Description |
|---|---|
| `assertion_id` | Unique assertion identifier |
| `client_id` | Client link |
| `matter_id` | Matter link |
| `assertion_text` | Proposition |
| `assertion_type` | Factual, legal, procedural, etc. |
| `truth_state` | Verified, pending, unsupported, etc. |
| `support_state` | Supported, partial, unsupported, etc. |
| `source_ids` | Sources |
| `evidence_ids` | Supporting evidence |
| `contradiction_flag` | Whether contradiction exists |
| `confidence` | Simple confidence value |
| `use_status` | Internal, draft usable, filing usable, etc. |
| `created_at` | Created timestamp |
| `updated_at` | Updated timestamp |
| `notes` | Notes |

## 12.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `canonical_text` | Normalized assertion |
| `original_text` | Original language/source wording |
| `language` | Language |
| `jurisdiction_id` | Jurisdiction scope |
| `temporal_valid_from` | Start date |
| `temporal_valid_until` | End date |
| `event_date` | Date of event if factual |
| `knowledge_date` | Date known to system |
| `source_confidence` | Source confidence |
| `evidentiary_confidence` | Evidence confidence |
| `legal_confidence` | Legal confidence if legal assertion |
| `translation_confidence` | Translation confidence |
| `admissibility_confidence` | Admissibility confidence |
| `linked_timeline_event_id` | Timeline event |
| `linked_fact_id` | Fact record if promoted |
| `linked_risk_ids` | Risks |
| `linked_argument_ids` | Arguments |
| `review_status` | Review state |
| `version` | Version |
| `supersedes_id` | Prior assertion |
| `superseded_by_id` | Later assertion |

## 12.4 Assertion Type Values

Suggested:

- `factual`;
- `client_narrative`;
- `opposing_allegation`;
- `procedural`;
- `evidentiary`;
- `legal`;
- `strategic`;
- `inferential`;
- `translation`;
- `risk`;
- `background`;
- `expert`;
- `unknown`.

## 12.5 Truth State Values

Suggested:

- `verified`;
- `internally_corroborated`;
- `externally_corroborated`;
- `client_confirmed`;
- `opposing_party_alleged`;
- `court_recorded`;
- `judicially_determined`;
- `partially_supported`;
- `pending_verification`;
- `witness_anticipated`;
- `inferred`;
- `unsupported`;
- `contradicted`;
- `rejected`;
- `superseded`.

MVP may use:

- `verified`;
- `client_confirmed`;
- `opposing_party_alleged`;
- `partially_supported`;
- `pending_verification`;
- `unsupported`;
- `contradicted`;
- `rejected`;
- `superseded`.

## 12.6 Support State Values

Suggested:

- `directly_supported`;
- `indirectly_supported`;
- `partially_supported`;
- `contextually_supported`;
- `negatively_supported`;
- `unsupported`;
- `contradicted`;
- `not_applicable`.

MVP may use:

- `supported`;
- `partially_supported`;
- `unsupported`;
- `contradicted`;
- `pending`.

## 12.7 Use Status Values

Suggested:

- `internal_only`;
- `client_facing`;
- `strategy_usable`;
- `draft_usable`;
- `filing_usable`;
- `evidence_request_usable`;
- `research_usable`;
- `blocked`.

## 12.8 Relationships

Assertions link to:

- Client;
- Matter;
- Source;
- Evidence;
- Fact;
- Timeline Event;
- Contradiction;
- Risk;
- Strategy Point;
- Argument Node;
- Output Artifact;
- Translation;
- Promotion Request.

## 12.9 Permitted Mutations

Assertions may be:

- created;
- classified;
- supported;
- contradicted;
- promoted;
- demoted;
- superseded;
- rejected;
- archived.

Truth state changes must be logged.

## 12.10 Implementation Notes

Assertions should be short, atomic, and legally meaningful.

Avoid compound assertions where possible.

Bad assertion:

> The client did not control the company and therefore the court has no jurisdiction.

Better:

1. The client was not listed as a director of the company.
2. The client did not hold shares in the company.
3. The opposing party alleges the client exercised de facto control.
4. Lack of formal role supports the jurisdiction argument.
5. The court lacks jurisdiction over the client.

These are different assertion types.

---

# Section 13 — Fact Object

## 13.1 Object Purpose

The Fact Object represents a promoted, verified, or institutionally accepted factual assertion.

All Facts originate from Assertions, but not all Assertions become Facts.

## 13.2 MVP Treatment

Fact Object can be deferred in the earliest MVP.

The MVP may use Assertion with `truth_state = verified`.

However, the target-state architecture should include Fact Object to separate promoted facts from all assertions.

## 13.3 MVP Fields if Implemented

| Field | Description |
|---|---|
| `fact_id` | Unique fact identifier |
| `assertion_id` | Source assertion |
| `client_id` | Client link |
| `matter_id` | Matter link if matter-specific |
| `fact_text` | Fact statement |
| `scope` | Client-level, matter-level, institutional |
| `verification_basis` | Evidence/source basis |
| `source_ids` | Sources |
| `evidence_ids` | Evidence |
| `status` | Active, superseded, rejected |
| `created_at` | Timestamp |

## 13.4 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `fact_type` | Identity, event, relationship, procedural, etc. |
| `valid_from` | Start validity |
| `valid_until` | End validity |
| `verification_method` | Internal, external, client, judicial |
| `verification_date` | Verification date |
| `verified_by` | Agent/human/system |
| `confidence` | Confidence |
| `promotion_request_id` | Promotion source |
| `contradiction_ids` | Contradictions |
| `version` | Version |
| `restriction_status` | Use restrictions |

## 13.5 Relationships

Facts link to:

- Assertion;
- Client;
- Matter;
- Source;
- Evidence;
- Timeline Event;
- Promotion Request;
- Risk;
- Output Artifact.

## 13.6 Implementation Notes

Client-level Facts should be controlled by W1.

Matter-level Facts may be controlled by matter workflows.

---

# Section 14 — Timeline Event Object

## 14.1 Object Purpose

The Timeline Event Object represents a legally relevant event in time.

Timeline Events allow LEXOS to build chronologies, identify gaps, reconcile narratives, and support arguments.

## 14.2 MVP Fields

| Field | Description |
|---|---|
| `timeline_event_id` | Unique ID |
| `matter_id` | Matter link |
| `client_id` | Client link |
| `event_title` | Short title |
| `event_description` | Description |
| `event_date` | Date or approximate date |
| `date_precision` | Exact, approximate, range, unknown |
| `assertion_ids` | Linked assertions |
| `evidence_ids` | Linked evidence |
| `truth_state` | Event truth state |
| `notes` | Notes |

## 14.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `start_datetime` | Start timestamp |
| `end_datetime` | End timestamp |
| `timezone` | Timezone |
| `location` | Location |
| `participants` | Linked Persons/Entities |
| `event_type` | Meeting, payment, filing, communication, etc. |
| `source_ids` | Sources |
| `confidence` | Confidence |
| `contradiction_ids` | Contradictions |
| `procedural_effect` | Procedural consequence |
| `legal_effect` | Legal consequence |
| `version` | Version |

## 14.4 Event Type Values

Examples:

- `meeting`;
- `communication`;
- `payment`;
- `contract_execution`;
- `filing`;
- `service`;
- `court_order`;
- `deadline`;
- `corporate_event`;
- `identity_event`;
- `evidence_event`;
- `client_instruction`;
- `other`.

## 14.5 Implementation Notes

Timeline Events should not assume facts are verified.

An event can be alleged, disputed, or contradicted.

---

# Section 15 — Contradiction Object

## 15.1 Object Purpose

The Contradiction Object records conflicts between assertions, evidence, sources, translations, facts, timelines, or outputs.

Contradictions are legal intelligence.

They must be structured, not hidden.

## 15.2 MVP Fields

| Field | Description |
|---|---|
| `contradiction_id` | Unique ID |
| `matter_id` | Matter link |
| `client_id` | Client link |
| `contradiction_title` | Short title |
| `description` | Description |
| `object_a_type` | First object type |
| `object_a_id` | First object ID |
| `object_b_type` | Second object type |
| `object_b_id` | Second object ID |
| `severity` | Minor, material, critical |
| `status` | Open, under review, resolved, accepted |
| `notes` | Notes |
| `created_at` | Timestamp |

## 15.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `contradiction_type` | Factual, evidentiary, legal, translation, procedural |
| `affected_workflows` | Workflow IDs |
| `affected_outputs` | Artifact IDs |
| `possible_explanations` | Explanation notes |
| `resolution_summary` | Resolution |
| `resolved_by` | Human/agent/system |
| `resolved_at` | Timestamp |
| `risk_ids` | Linked risks |
| `reopened_count` | Number of reopenings |
| `version` | Version |

## 15.4 Severity Values

Suggested:

- `minor`;
- `material`;
- `critical`.

## 15.5 Status Values

Suggested:

- `open`;
- `under_review`;
- `resolved`;
- `accepted_risk`;
- `superseded`;
- `reopened`;
- `archived`.

## 15.6 Relationships

Contradictions link to:

- Assertion;
- Evidence;
- Source;
- Fact;
- Timeline Event;
- Translation;
- Research Memo;
- Argument Node;
- Risk;
- Workflow State.

## 15.7 Implementation Notes

Critical contradictions should block finalization unless resolved or explicitly accepted.

---

# Section 16 — Risk Object

## 16.1 Object Purpose

The Risk Object represents structured legal, operational, technical, evidentiary, strategic, or institutional risk.

Risk must govern workflow progression and autonomy.

## 16.2 MVP Fields

| Field | Description |
|---|---|
| `risk_id` | Unique ID |
| `client_id` | Client link |
| `matter_id` | Matter link |
| `risk_type` | Factual, legal, procedural, etc. |
| `title` | Risk title |
| `description` | Risk description |
| `linked_object_type` | Related object type |
| `linked_object_id` | Related object |
| `severity` | Low, moderate, high, critical, existential |
| `status` | Identified, mitigated, accepted, blocked, resolved |
| `mitigation_note` | Mitigation |
| `created_at` | Created timestamp |
| `updated_at` | Updated timestamp |

## 16.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `probability` | Likelihood |
| `confidence` | Confidence in assessment |
| `affected_workflows` | Workflows affected |
| `affected_artifacts` | Artifacts affected |
| `owner_type` | Human, agent, workflow |
| `owner_id` | Owner |
| `escalation_rule` | Escalation |
| `accepted_by` | Accepting authority |
| `accepted_at` | Acceptance timestamp |
| `acceptance_reason` | Reason |
| `review_due_at` | Review date |
| `resolution_summary` | Resolution |
| `learning_object_id` | Learning link if applicable |

## 16.4 Risk Type Values

Suggested:

- `factual`;
- `evidentiary`;
- `legal`;
- `procedural`;
- `jurisdictional`;
- `citation`;
- `translation`;
- `privilege_confidentiality`;
- `client_instruction`;
- `strategy`;
- `ethical`;
- `reputational`;
- `operational`;
- `security`;
- `model`;
- `memory`;
- `autonomy`;
- `institutional_learning`.

## 16.5 Severity Values

Suggested:

- `low`;
- `moderate`;
- `high`;
- `critical`;
- `existential`.

## 16.6 Status Values

Suggested:

- `identified`;
- `under_review`;
- `accepted`;
- `mitigated`;
- `blocked`;
- `escalated`;
- `resolved`;
- `superseded`;
- `reopened`;
- `archived`.

## 16.7 Implementation Notes

Risk must not live only inside prose.

Risks should be visible in matter workspace and workflow handoffs.

---

# Section 17 — Client Instruction Object

## 17.1 Object Purpose

The Client Instruction Object records instructions, approvals, refusals, preferences, authorizations, or confirmations given by the client or authorized representative.

Client instructions are legally significant.

## 17.2 MVP Fields

| Field | Description |
|---|---|
| `instruction_id` | Unique ID |
| `client_id` | Client link |
| `matter_id` | Matter link |
| `instruction_type` | Fact confirmation, authorization, preference, etc. |
| `instruction_text` | Instruction |
| `given_by_person_id` | Person giving instruction |
| `authority_status` | Authorized, unknown, disputed |
| `received_at` | Timestamp |
| `channel` | Email, meeting, chat, document, phone |
| `status` | Active, unclear, superseded, withdrawn |
| `notes` | Notes |

## 17.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `source_id` | Source record |
| `recording_uri` | Recording if any |
| `transcript_id` | Transcript if any |
| `confirmation_status` | Confirmed, pending, disputed |
| `scope` | What instruction applies to |
| `expires_at` | Expiration |
| `linked_artifact_ids` | Outputs relying on instruction |
| `linked_risk_ids` | Risks |
| `translation_id` | Translation if bilingual |
| `version` | Version |

## 17.4 Instruction Type Values

Suggested:

- `factual_confirmation`;
- `evidence_production`;
- `strategy_preference`;
- `settlement_authority`;
- `filing_authorization`;
- `communication_authorization`;
- `scope_limitation`;
- `risk_acceptance`;
- `correction`;
- `refusal`;
- `general_instruction`.

## 17.5 Implementation Notes

Do not treat every client message as an instruction.

The system must classify whether the client is giving fact, preference, instruction, approval, or authorization.

---

# Section 18 — Legal Authority Object

## 18.1 Object Purpose

The Legal Authority Object represents a source of law or legal authority.

This may include statutes, regulations, cases, court rules, administrative guidance, treaties, official commentary, or other legal authority.

## 18.2 MVP Fields

| Field | Description |
|---|---|
| `authority_id` | Unique ID |
| `matter_id` | Matter link where used |
| `jurisdiction` | Jurisdiction |
| `authority_type` | Statute, case, regulation, etc. |
| `title` | Authority title |
| `citation` | Citation |
| `source_uri` | Link or reference |
| `summary` | Short summary |
| `relevance_note` | Why relevant |
| `verification_status` | Unverified, verified, disputed |
| `created_at` | Timestamp |

## 18.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `court_or_body` | Issuing court/body |
| `date_issued` | Date |
| `authority_level` | Binding, persuasive, commentary |
| `treatment_status` | Good law, overruled, questioned, etc. |
| `pinpoint_references` | Pinpoints |
| `quoted_text` | Verified quotes |
| `adverse_flag` | Whether adverse |
| `issue_ids` | Linked issues |
| `research_memo_ids` | Linked research |
| `citation_confidence` | Citation confidence |
| `last_verified_at` | Last check |
| `verified_by` | Agent/human/system |

## 18.4 Authority Type Values

Suggested:

- `statute`;
- `regulation`;
- `case_law`;
- `court_rule`;
- `administrative_guidance`;
- `treaty`;
- `official_commentary`;
- `secondary_source`;
- `practice_note`;
- `expert_opinion`;
- `other`.

## 18.5 Treatment Status Values

Suggested:

- `not_checked`;
- `current`;
- `overruled`;
- `amended`;
- `distinguished`;
- `questioned`;
- `superseded`;
- `unknown`.

## 18.6 Implementation Notes

Legal Authority must be jurisdiction-scoped.

AI-generated summaries should not be stored as authorities unless linked to primary sources.

---

# Section 19 — Research Memo Object

## 19.1 Object Purpose

The Research Memo Object stores legal, factual, procedural, technical, or contextual research generated for a Matter or institutional use.

## 19.2 MVP Fields

| Field | Description |
|---|---|
| `research_memo_id` | Unique ID |
| `client_id` | Client link where applicable |
| `matter_id` | Matter link |
| `title` | Memo title |
| `research_question` | Research question |
| `jurisdiction` | Jurisdiction |
| `summary` | Summary |
| `authority_ids` | Linked legal authorities |
| `source_ids` | Sources |
| `status` | Draft, reviewed, approved, superseded |
| `created_by` | Agent/human |
| `created_at` | Timestamp |

## 19.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `issue_ids` | Legal issue links |
| `strategy_point_ids` | Strategy links |
| `adverse_authority_ids` | Adverse authorities |
| `citation_confidence` | Citation quality |
| `legal_confidence` | Legal confidence |
| `scope_limitations` | Limits |
| `last_verified_at` | Verification date |
| `review_status` | Review |
| `model_used` | Model |
| `prompt_id` | Prompt |
| `version` | Version |
| `supersedes_id` | Prior version |

## 19.4 Status Values

Suggested:

- `draft`;
- `under_review`;
- `approved_internal`;
- `needs_more_research`;
- `superseded`;
- `rejected`;
- `archived`.

## 19.5 Relationships

Research Memo links to:

- Matter;
- Legal Authority;
- Source;
- Assertion;
- Strategy Point;
- Argument Node;
- Risk;
- Output Artifact.

## 19.6 Implementation Notes

Research memos must state jurisdiction and research question.

Research without jurisdiction scope is unsafe.

---

# Section 20 — Strategy Point Object

## 20.1 Object Purpose

The Strategy Point Object represents a discrete legal or tactical strategy.

Examples:

- jurisdiction objection;
- lack of causation;
- absence of intent;
- corporate separateness;
- limitation defense;
- damages attack;
- evidentiary exclusion;
- procedural objection;
- settlement leverage point.

## 20.2 MVP Fields

| Field | Description |
|---|---|
| `strategy_point_id` | Unique ID |
| `matter_id` | Matter link |
| `client_id` | Client link |
| `title` | Strategy title |
| `posture` | Plaintiff, defense, advisory |
| `description` | Strategy description |
| `supporting_assertion_ids` | Supporting assertions |
| `evidence_ids` | Evidence links |
| `research_memo_ids` | Research links |
| `risk_ids` | Risk links |
| `status` | Proposed, active, rejected, superseded |
| `confidence` | Confidence |
| `created_at` | Timestamp |

## 20.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `legal_basis_authority_ids` | Authorities |
| `adverse_authority_ids` | Adverse authority |
| `required_evidence_ids` | Required evidence |
| `missing_evidence_note` | Gaps |
| `opposing_attack_summary` | Anticipated attack |
| `adversarial_score` | Weakness score |
| `priority` | Priority |
| `strategic_value` | Value rating |
| `reputational_risk` | Reputation risk |
| `procedural_availability` | Available/waived/etc. |
| `version` | Version |

## 20.4 Status Values

Suggested:

- `proposed`;
- `active`;
- `needs_research`;
- `needs_evidence`;
- `under_adversarial_review`;
- `approved`;
- `rejected`;
- `superseded`;
- `archived`.

## 20.5 Relationships

Strategy Point links to:

- Matter;
- Assertion;
- Evidence;
- Research Memo;
- Legal Authority;
- Risk;
- Argument Node;
- Adversarial Critique;
- Output Artifact.

## 20.6 Implementation Notes

Strategy Points should preserve assumptions and weaknesses.

Do not reduce strategy to polished prose only.

---

# Section 21 — Strategy Memo Object

## 21.1 Object Purpose

The Strategy Memo Object is a legal artifact that organizes one or more Strategy Points into an analytical memorandum.

## 21.2 MVP Fields

| Field | Description |
|---|---|
| `strategy_memo_id` | Unique ID |
| `matter_id` | Matter link |
| `title` | Memo title |
| `strategy_point_ids` | Linked strategy points |
| `summary` | Summary |
| `assumptions` | Assumptions |
| `risks` | Risk summary |
| `status` | Draft, approved, superseded |
| `artifact_id` | Linked Output Artifact |
| `created_at` | Timestamp |

## 21.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `support_matrix_id` | Linked support matrix |
| `research_memo_ids` | Linked research |
| `adversarial_critique_ids` | Critiques |
| `human_review_status` | Review |
| `system_review_status` | Governance review |
| `version` | Version |
| `supersedes_id` | Prior version |

## 21.4 Implementation Notes

The Strategy Memo may also be modeled as an Output Artifact with `artifact_type = strategy_memo`.

For MVP, either approach is acceptable if artifact metadata is preserved.

---

# Section 22 — Argument Node Object

## 22.1 Object Purpose

The Argument Node Object represents a discrete unit of legal argument.

An argument is not merely a paragraph.

It is a structured reasoning unit linking facts, evidence, law, and strategy.

## 22.2 MVP Fields

| Field | Description |
|---|---|
| `argument_node_id` | Unique ID |
| `matter_id` | Matter link |
| `strategy_point_id` | Strategy link |
| `title` | Argument title |
| `argument_text` | Argument text |
| `supporting_assertion_ids` | Assertions |
| `evidence_ids` | Evidence |
| `authority_ids` | Legal authorities |
| `risk_ids` | Risks |
| `status` | Draft, reviewed, challenged, approved |
| `created_at` | Timestamp |

## 22.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `argument_type` | Fact, law, mixed, procedural, rebuttal |
| `claim_or_defense_element` | Element mapping |
| `opposing_allegation_ids` | Allegations addressed |
| `citation_ids` | Citations |
| `adversarial_challenge_ids` | Challenges |
| `revision_history` | Revisions |
| `confidence` | Argument confidence |
| `filing_readiness` | Readiness |
| `version` | Version |

## 22.4 Argument Type Values

Suggested:

- `factual`;
- `legal`;
- `mixed_fact_law`;
- `procedural`;
- `rebuttal`;
- `affirmative_claim`;
- `defense`;
- `relief`;
- `damages`;
- `jurisdiction`;
- `evidentiary`;
- `credibility`.

## 22.5 Relationships

Argument Node links to:

- Strategy Point;
- Assertion;
- Evidence;
- Legal Authority;
- Research Memo;
- Risk;
- Adversarial Critique;
- Output Artifact.

## 22.6 Implementation Notes

Arguments should be composable.

A final brief can be assembled from Argument Nodes.

---

# Section 23 — Argument Draft Object

## 23.1 Object Purpose

The Argument Draft Object represents a structured draft argument artifact produced from Strategy Points, Research Memos, Assertions, Evidence, and Legal Authorities.

## 23.2 MVP Fields

| Field | Description |
|---|---|
| `argument_draft_id` | Unique ID |
| `matter_id` | Matter link |
| `title` | Draft title |
| `artifact_id` | Linked Output Artifact |
| `argument_node_ids` | Linked nodes |
| `draft_text` | Full draft text |
| `status` | Draft, under review, revised, superseded |
| `version` | Version |
| `created_at` | Timestamp |
| `created_by` | Agent/human |

## 23.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `source_basis_summary` | Source basis |
| `support_matrix_id` | Support matrix |
| `research_memo_ids` | Research |
| `citation_confidence` | Citation confidence |
| `unsupported_assertion_ids` | Unsupported claims if any |
| `adversarial_critique_ids` | Critiques |
| `review_status` | Review |
| `filing_readiness` | Readiness |
| `supersedes_id` | Prior version |

## 23.4 Implementation Notes

Argument Draft may be implemented as Output Artifact with specific type.

But LEXOS should preserve argument-specific dependencies.

---

# Section 24 — Adversarial Critique Object

## 24.1 Object Purpose

The Adversarial Critique Object records attacks, weaknesses, objections, and counterarguments against a Strategy Point, Argument Node, Argument Draft, or final Output Artifact.

## 24.2 MVP Fields

| Field | Description |
|---|---|
| `critique_id` | Unique ID |
| `matter_id` | Matter link |
| `target_object_type` | Argument, strategy, artifact, etc. |
| `target_object_id` | Target object |
| `critique_text` | Critique |
| `attack_type` | Factual, legal, evidentiary, procedural, etc. |
| `severity` | Low, moderate, high, critical |
| `recommended_fix` | Recommended action |
| `status` | Open, addressed, accepted, rejected |
| `created_at` | Timestamp |
| `created_by` | Agent/human |

## 24.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `opponent_perspective` | Opposing counsel, judge, regulator, prosecutor |
| `linked_assertion_ids` | Affected assertions |
| `linked_evidence_ids` | Evidence |
| `linked_authority_ids` | Authorities |
| `risk_ids` | Risks |
| `revision_artifact_id` | Revised output |
| `resolution_summary` | Resolution |
| `loop_iteration` | W8/W9 loop count |
| `confidence` | Confidence |
| `version` | Version |

## 24.4 Attack Type Values

Suggested:

- `factual`;
- `evidentiary`;
- `legal`;
- `procedural`;
- `jurisdictional`;
- `citation`;
- `translation`;
- `credibility`;
- `strategy`;
- `rhetorical`;
- `privilege`;
- `ethical`;
- `other`.

## 24.5 Implementation Notes

W9 output should be structured into Adversarial Critique records, not just prose.

Unresolved critical critiques should block finalization.

---

# Section 25 — Output Artifact Object

## 25.1 Object Purpose

The Output Artifact Object represents any meaningful work product created by LEXOS.

Examples:

- Client Onboarding File;
- Client Master Story;
- Case Master Story;
- Evidence Register;
- Support Matrix;
- Strategy Memo;
- Research Memo;
- Argument Draft;
- Adversarial Critique;
- Final Bundle;
- Client Report;
- Translation Bundle;
- Visual Exhibit.

## 25.2 MVP Fields

| Field | Description |
|---|---|
| `artifact_id` | Unique ID |
| `client_id` | Client link |
| `matter_id` | Matter link where applicable |
| `artifact_type` | Type |
| `title` | Title |
| `workflow_origin` | W0–W11 or system |
| `content_uri` | Stored file/text |
| `content_text` | Inline content if stored |
| `status` | Draft, final, superseded, etc. |
| `version` | Version |
| `source_ids` | Sources |
| `evidence_ids` | Evidence |
| `created_by` | Agent/human |
| `created_at` | Timestamp |
| `updated_at` | Timestamp |
| `confidentiality_status` | Confidentiality |
| `privilege_status` | Privilege |

## 25.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `intended_audience` | Internal, client, court, etc. |
| `dependency_object_ids` | Dependencies |
| `assertion_ids` | Assertions used |
| `authority_ids` | Legal authorities |
| `risk_ids` | Risks |
| `review_status` | Review |
| `approval_status` | Approval |
| `filing_status` | Filing state |
| `supersedes_id` | Prior version |
| `superseded_by_id` | Later version |
| `withdrawal_status` | Withdrawn or active |
| `export_format` | PDF, DOCX, MD, etc. |
| `language` | Language |
| `translation_ids` | Translations |

## 25.4 Artifact Type Values

Suggested:

- `client_onboarding_file`;
- `client_master_story`;
- `case_master_story`;
- `evidence_register`;
- `opposing_case_index`;
- `reconciliation_report`;
- `support_matrix`;
- `client_gap_report`;
- `research_memo`;
- `strategy_memo`;
- `argument_draft`;
- `adversarial_critique`;
- `visual_exhibit`;
- `translation_bundle`;
- `client_update`;
- `court_filing_draft`;
- `final_presentation_bundle`;
- `audit_report`;
- `learning_note`;
- `other`.

## 25.5 Artifact Status Values

Suggested:

- `working_draft`;
- `internal_draft`;
- `pending_review`;
- `returned_for_revision`;
- `approved_internal`;
- `client_facing_draft`;
- `client_facing_final`;
- `court_facing_draft`;
- `filing_ready`;
- `externally_sent`;
- `filed`;
- `superseded`;
- `withdrawn`;
- `archived`.

MVP may use:

- `draft`;
- `under_review`;
- `approved_internal`;
- `final_internal`;
- `superseded`;
- `archived`.

## 25.6 Implementation Notes

Do not rely on filenames for finality.

Artifact status controls use.

---

# Section 26 — Translation Object

## 26.1 Object Purpose

The Translation Object preserves translated text, original text, translation purpose, confidence, and legal ambiguity.

Translation is interpretation.

## 26.2 MVP Fields

| Field | Description |
|---|---|
| `translation_id` | Unique ID |
| `client_id` | Client link |
| `matter_id` | Matter link |
| `source_object_type` | Evidence, assertion, artifact, etc. |
| `source_object_id` | Source object |
| `source_language` | Original language |
| `target_language` | Target language |
| `original_text` | Source text |
| `translated_text` | Translation |
| `translation_type` | Raw, literal, legal-functional, etc. |
| `confidence` | Confidence |
| `status` | Draft, reviewed, approved |
| `created_at` | Timestamp |

## 26.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `segment_id` | Segment reference |
| `parallel_text_group_id` | Parallel text bundle |
| `translator_type` | Human, model, hybrid |
| `translator_id` | Translator/model |
| `legal_term_notes` | Term notes |
| `ambiguity_notes` | Ambiguity |
| `jurisdiction_id` | Jurisdiction |
| `reviewer_id` | Reviewer |
| `review_status` | Review |
| `source_uri` | Source passage |
| `version` | Version |
| `supersedes_id` | Prior version |

## 26.4 Translation Type Values

Suggested:

- `raw`;
- `literal`;
- `legal_functional`;
- `court_ready`;
- `client_facing`;
- `internal_analytical`.

## 26.5 Implementation Notes

Original text must never be overwritten by translation.

Important multilingual materials should preserve parallel text.

---

# Section 27 — Jurisdiction Profile Object

## 27.1 Object Purpose

The Jurisdiction Profile Object stores structured knowledge about a legal jurisdiction.

It supports legal research, workflow rules, procedure, filing style, evidence rules, and translation choices.

## 27.2 MVP Treatment

Jurisdiction Profile can be deferred in earliest MVP.

MVP must still have jurisdiction fields on Matter and Research Memo.

## 27.3 MVP Fields if Implemented

| Field | Description |
|---|---|
| `jurisdiction_id` | Unique ID |
| `name` | Jurisdiction name |
| `country_or_region` | Country/region |
| `legal_tradition` | Civil law, common law, hybrid |
| `notes` | Notes |
| `status` | Draft, active, outdated |

## 27.4 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `court_hierarchy` | Court hierarchy |
| `procedural_rules` | Procedure summary |
| `evidence_rules` | Evidence rules |
| `privilege_rules` | Privilege rules |
| `citation_style` | Citation style |
| `filing_requirements` | Filing rules |
| `language_requirements` | Language |
| `limitation_rules` | Limitations |
| `professional_rules` | Professional rules |
| `ai_disclosure_rules` | AI disclosure where relevant |
| `last_verified_at` | Verification |
| `source_ids` | Sources |
| `version` | Version |

## 27.5 Implementation Notes

Jurisdiction Profiles must be versioned.

Do not treat jurisdictional rules as static.

---

# Section 28 — Workflow State Object

## 28.1 Object Purpose

The Workflow State Object records where a Matter is in the LEXOS workflow system.

LEXOS cannot become autonomous without Workflow State.

## 28.2 MVP Fields

| Field | Description |
|---|---|
| `workflow_state_id` | Unique ID |
| `matter_id` | Matter link |
| `client_id` | Client link |
| `current_workflow` | W0–W11 |
| `workflow_status` | Not started, active, blocked, complete |
| `last_completed_step` | Last completed step |
| `next_action` | Next action |
| `blocked_flag` | Whether blocked |
| `block_reason` | Reason |
| `assigned_agent` | Agent |
| `created_at` | Timestamp |
| `updated_at` | Timestamp |

## 28.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `workflow_iteration` | Iteration number |
| `entry_conditions_met` | Boolean/details |
| `exit_conditions_met` | Boolean/details |
| `required_input_ids` | Inputs |
| `required_output_ids` | Outputs |
| `risk_ids` | Risks |
| `contradiction_ids` | Contradictions |
| `handoff_package_id` | Handoff |
| `reopened_from_state_id` | Reopening |
| `autonomy_level` | Autonomy level |
| `human_review_required` | Boolean |
| `system_gate_status` | Gate status |

## 28.4 Workflow Values

Suggested:

- `W0_onboarding`;
- `W1_client_master_record`;
- `W2_case_story`;
- `W3_opposing_file_reconciliation`;
- `W4_evidence_intake`;
- `W5_story_evidence_alignment`;
- `W6_strategy`;
- `W7_research_loop`;
- `W8_argument_engineering`;
- `W9_adversarial_review`;
- `W10_visual_exhibits`;
- `W11_persuasive_refinement`.

## 28.5 Workflow Status Values

Suggested:

- `not_started`;
- `active`;
- `waiting_for_input`;
- `blocked`;
- `escalated`;
- `under_review`;
- `returned_for_revision`;
- `complete`;
- `superseded`;
- `reopened`;
- `archived`.

## 28.6 Implementation Notes

Workflow State is a core MVP requirement.

Without it, LEXOS becomes tools, not an operating system.

---

# Section 29 — Workflow Event Object

## 29.1 Object Purpose

The Workflow Event Object records a significant state change, handoff, failure, reopening, or decision in a workflow.

## 29.2 MVP Treatment

Workflow Event can be simplified as Audit Event in MVP.

## 29.3 MVP Fields

| Field | Description |
|---|---|
| `workflow_event_id` | Unique ID |
| `matter_id` | Matter link |
| `workflow` | W0–W11 |
| `event_type` | Started, completed, blocked, reopened |
| `description` | Description |
| `created_by` | Agent/human/system |
| `created_at` | Timestamp |

## 29.4 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `from_status` | Prior status |
| `to_status` | New status |
| `trigger_object_id` | Object that triggered event |
| `risk_ids` | Risks |
| `artifact_ids` | Outputs |
| `handoff_data` | Handoff |
| `gate_result` | Gate validation |
| `notes` | Notes |

## 29.5 Implementation Notes

Workflow Events provide operational auditability.

---

# Section 30 — Promotion Request Object

## 30.1 Object Purpose

The Promotion Request Object records a proposed movement of information from one memory layer to another.

Examples:

- matter-level assertion to client-level fact;
- case-specific learning to institutional learning;
- evidence-supported assertion to verified fact;
- research note to jurisdiction profile.

## 30.2 MVP Fields

| Field | Description |
|---|---|
| `promotion_request_id` | Unique ID |
| `source_object_type` | Source object type |
| `source_object_id` | Source object |
| `source_layer` | Matter, client, institutional, etc. |
| `target_layer` | Target memory layer |
| `reason` | Reason |
| `status` | Proposed, approved, rejected |
| `created_by` | Agent/human |
| `created_at` | Timestamp |
| `review_notes` | Notes |

## 30.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `client_id` | Client |
| `matter_id` | Matter |
| `verification_state` | Verification |
| `source_ids` | Sources |
| `evidence_ids` | Evidence |
| `risk_ids` | Risks |
| `reviewed_by` | Reviewer |
| `reviewed_at` | Review timestamp |
| `approval_basis` | Basis |
| `target_object_id` | Created/promoted object |
| `restriction_status` | Restrictions |

## 30.4 Status Values

Suggested:

- `proposed`;
- `under_review`;
- `approved`;
- `rejected`;
- `needs_more_support`;
- `superseded`;
- `archived`.

## 30.5 Implementation Notes

High-risk promotions should not be automatic.

W1 should control client-level promotions.

---

# Section 31 — Review Event Object

## 31.1 Object Purpose

The Review Event Object records review by a human, agent, governance module, or system check.

Review Events support accountability and quality control.

## 31.2 MVP Fields

| Field | Description |
|---|---|
| `review_event_id` | Unique ID |
| `target_object_type` | Object reviewed |
| `target_object_id` | Object ID |
| `reviewer_type` | Human, agent, system |
| `reviewer_id` | Reviewer |
| `review_decision` | Approved, rejected, needs changes |
| `review_notes` | Notes |
| `created_at` | Timestamp |

## 31.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `review_scope` | Factual, legal, citation, privilege, etc. |
| `required_changes` | Changes |
| `risk_ids` | Risks |
| `confidence_after_review` | Confidence |
| `override_flag` | Override |
| `override_reason` | Reason |
| `next_action` | Next action |
| `version_reviewed` | Version |

## 31.4 Review Decision Values

Suggested:

- `approved`;
- `approved_with_changes`;
- `rejected`;
- `needs_more_research`;
- `needs_more_evidence`;
- `needs_client_clarification`;
- `escalated`;
- `deferred`;
- `risk_accepted`;
- `waived`;
- `invalid`.

## 31.5 Implementation Notes

Human review should be structured.

“Looks good” should not be the only review record.

---

# Section 32 — Agent Output Object

## 32.1 Object Purpose

The Agent Output Object records a meaningful output generated by an agent.

This may later become an Artifact, Assertion, Risk, Research Memo, or other object.

## 32.2 MVP Fields

| Field | Description |
|---|---|
| `agent_output_id` | Unique ID |
| `agent_name` | Agent |
| `agent_role` | Role |
| `matter_id` | Matter link |
| `workflow` | Workflow |
| `output_type` | Draft, summary, extraction, critique, etc. |
| `output_text` | Output |
| `created_at` | Timestamp |
| `model_used` | Model |
| `status` | Draft, accepted, rejected, superseded |

## 32.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `prompt_id` | Prompt |
| `model_version` | Model version |
| `input_object_ids` | Inputs |
| `created_object_ids` | Objects created |
| `modified_object_ids` | Objects modified |
| `confidence` | Confidence |
| `risk_ids` | Risks |
| `review_event_ids` | Reviews |
| `tool_call_ids` | Tools used |
| `version` | Version |

## 32.4 Implementation Notes

Not every raw model response needs to become a permanent Agent Output.

But major legal outputs should be tracked.

---

# Section 33 — Model Record Object

## 33.1 Object Purpose

The Model Record Object records AI models used by LEXOS.

It supports model governance, auditability, and routing.

## 33.2 MVP Fields

| Field | Description |
|---|---|
| `model_id` | Unique ID |
| `model_name` | Name |
| `provider` | Provider |
| `version` | Version if known |
| `approved_use` | Approved use notes |
| `status` | Active, deprecated, experimental |
| `notes` | Notes |

## 33.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `context_window` | Context window |
| `modalities` | Text, image, audio, etc. |
| `language_strengths` | Language notes |
| `workflow_approvals` | Approved workflows |
| `workflow_prohibitions` | Prohibited workflows |
| `confidentiality_rating` | Data handling rating |
| `cost_profile` | Cost |
| `latency_profile` | Latency |
| `benchmark_results` | Evaluation |
| `known_failure_modes` | Failure modes |
| `last_evaluated_at` | Evaluation date |
| `drift_status` | Drift |

## 33.4 Implementation Notes

MVP can start with a simple table of models used.

Major outputs should record model used.

---

# Section 34 — Tool Record Object

## 34.1 Object Purpose

The Tool Record Object records tools available to agents and workflows.

## 34.2 MVP Fields

| Field | Description |
|---|---|
| `tool_id` | Unique ID |
| `tool_name` | Name |
| `tool_type` | Parser, search, storage, email, etc. |
| `provider` | Provider |
| `approved_workflows` | Workflows |
| `status` | Active, disabled, experimental |
| `notes` | Notes |

## 34.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `approved_agents` | Agents |
| `required_permissions` | Permissions |
| `data_sensitivity_rating` | Sensitivity |
| `external_data_transfer` | Whether data leaves system |
| `logging_behavior` | Logs |
| `failure_modes` | Failures |
| `cost_profile` | Cost |
| `security_review_status` | Security |
| `last_reviewed_at` | Review date |

## 34.4 Implementation Notes

High-risk tools must be tightly permissioned.

---

# Section 35 — Prompt Record Object

## 35.1 Object Purpose

The Prompt Record Object stores significant prompts used by LEXOS agents or workflows.

Prompts affect legal output and must be versioned where material.

## 35.2 MVP Fields

| Field | Description |
|---|---|
| `prompt_id` | Unique ID |
| `prompt_name` | Name |
| `agent_role` | Agent role |
| `workflow` | Workflow |
| `prompt_text` | Prompt |
| `version` | Version |
| `status` | Active, deprecated, draft |
| `created_at` | Timestamp |

## 35.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `model_id` | Model |
| `input_schema` | Expected input |
| `output_schema` | Expected output |
| `constraints` | Constraints |
| `evaluation_results` | Evaluation |
| `approved_by` | Approval |
| `change_summary` | Changes |
| `supersedes_id` | Prior prompt |

## 35.4 Implementation Notes

Prompt versioning is especially important for W5, W7, W8, and W9.

---

# Section 36 — Tool Call Object

## 36.1 Object Purpose

The Tool Call Object records an agent or system’s use of a tool.

## 36.2 MVP Fields

| Field | Description |
|---|---|
| `tool_call_id` | Unique ID |
| `tool_id` | Tool |
| `agent_output_id` | Agent output if applicable |
| `matter_id` | Matter |
| `workflow` | Workflow |
| `purpose` | Purpose |
| `status` | Success, failed |
| `created_at` | Timestamp |
| `summary` | Summary |

## 36.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `input_parameters` | Parameters |
| `output_reference` | Output |
| `error_message` | Error |
| `retry_count` | Retries |
| `risk_ids` | Risks |
| `created_objects` | Objects created |
| `modified_objects` | Objects modified |

## 36.4 Implementation Notes

Tool calls involving external communication or evidence mutation must be audited.

---

# Section 37 — Access Grant Object

## 37.1 Object Purpose

The Access Grant Object defines who or what may access a Client, Matter, object, workflow, or memory layer.

## 37.2 MVP Fields

| Field | Description |
|---|---|
| `access_grant_id` | Unique ID |
| `subject_type` | User, agent, role, group |
| `subject_id` | Subject |
| `object_type` | Client, Matter, Evidence, etc. |
| `object_id` | Object |
| `permission_level` | Read, write, admin |
| `created_at` | Timestamp |
| `status` | Active, revoked |

## 37.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `conditions` | Attribute-based conditions |
| `expires_at` | Expiration |
| `granted_by` | Grantor |
| `revoked_by` | Revoker |
| `reason` | Reason |
| `privilege_scope` | Privilege scope |
| `workflow_scope` | Workflow scope |
| `audit_event_ids` | Access audits |

## 37.4 Permission Values

Suggested:

- `read`;
- `write`;
- `comment`;
- `review`;
- `approve`;
- `admin`;
- `external_action`;
- `restricted_read`.

## 37.5 Implementation Notes

MVP may rely on simple role permissions, but object model should anticipate finer access control.

---

# Section 38 — Privilege Classification Object

## 38.1 Object Purpose

The Privilege Classification Object records privilege analysis or classification for an object.

In MVP, privilege may be a field only.

In target-state, privilege may require its own object.

## 38.2 MVP Treatment

Use `privilege_status` field on major objects.

## 38.3 Target-State Fields

| Field | Description |
|---|---|
| `privilege_classification_id` | Unique ID |
| `target_object_type` | Object classified |
| `target_object_id` | Object ID |
| `privilege_status` | Status |
| `basis` | Basis for classification |
| `jurisdiction_id` | Jurisdiction |
| `classified_by` | Human/agent/system |
| `classified_at` | Timestamp |
| `review_status` | Review status |
| `waiver_status` | Waiver |
| `notes` | Notes |

## 38.4 Implementation Notes

Privilege may differ by jurisdiction.

Privilege classification should be cautious where unknown.

---

# Section 39 — Learning Object

## 39.1 Object Purpose

The Learning Object stores governed institutional learning.

Learning must be scoped, sourced, and privilege-aware.

## 39.2 MVP Fields

| Field | Description |
|---|---|
| `learning_id` | Unique ID |
| `learning_type` | Legal, workflow, model, etc. |
| `title` | Title |
| `description` | Learning |
| `source_matter_id` | Source matter if any |
| `jurisdiction` | Scope |
| `status` | Proposed, approved, rejected |
| `confidence` | Observed, plausible, validated |
| `created_at` | Timestamp |
| `notes` | Notes |

## 39.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `source_artifact_ids` | Source artifacts |
| `source_risk_ids` | Source risks |
| `source_outcome` | Outcome |
| `workflow_relevance` | Relevant workflows |
| `reuse_permission` | Reuse allowed/restricted |
| `privilege_status` | Privilege |
| `confidentiality_status` | Confidentiality |
| `limitations` | Limits |
| `last_validated_at` | Validation |
| `revalidation_due_at` | Revalidation |
| `supersedes_id` | Prior learning |

## 39.4 Learning Type Values

Suggested:

- `legal_doctrine`;
- `procedural`;
- `strategic`;
- `evidentiary`;
- `adversarial`;
- `drafting_rhetorical`;
- `translation`;
- `model_performance`;
- `workflow`;
- `operational`;
- `security`;
- `risk`.

## 39.5 Confidence Values

Suggested:

- `observed`;
- `plausible`;
- `validated`;
- `high_confidence`;
- `deprecated`.

## 39.6 Implementation Notes

MVP can use manual learning notes.

Do not automatically learn from privileged matter data.

---

# Section 40 — Audit Event Object

## 40.1 Object Purpose

The Audit Event Object records significant system events.

Audit Events support accountability, security, governance, debugging, and legal defensibility.

## 40.2 MVP Fields

| Field | Description |
|---|---|
| `audit_event_id` | Unique ID |
| `event_type` | Created, updated, accessed, exported, etc. |
| `actor_type` | Human, agent, system |
| `actor_id` | Actor |
| `target_object_type` | Target object |
| `target_object_id` | Target object |
| `matter_id` | Matter where applicable |
| `client_id` | Client where applicable |
| `timestamp` | Timestamp |
| `summary` | Summary |

## 40.3 Target-State Fields

Additional fields:

| Field | Description |
|---|---|
| `before_state` | Before change |
| `after_state` | After change |
| `permission_basis` | Permission |
| `workflow` | Workflow |
| `tool_call_id` | Tool |
| `model_id` | Model |
| `risk_ids` | Risks |
| `ip_address` | Technical metadata |
| `session_id` | Session |
| `sensitivity_level` | Sensitivity |

## 40.4 Event Type Values

Suggested:

- `object_created`;
- `object_updated`;
- `object_deleted`;
- `object_archived`;
- `object_accessed`;
- `object_exported`;
- `workflow_started`;
- `workflow_completed`;
- `workflow_blocked`;
- `risk_created`;
- `risk_accepted`;
- `truth_state_changed`;
- `evidence_uploaded`;
- `evidence_processed`;
- `artifact_generated`;
- `artifact_finalized`;
- `tool_called`;
- `model_used`;
- `external_action`;
- `access_granted`;
- `access_revoked`.

## 40.5 Implementation Notes

Audit logs may contain sensitive information.

They require access control.

---

# Section 41 — Object Ownership and Workflow Control

## 41.1 Purpose

This section identifies which workflow primarily owns each object.

Ownership does not always mean exclusive control. It means primary responsibility for lifecycle and integrity.

## 41.2 Ownership Table

| Object | Primary Owner |
|---|---|
| Client | W1, after W0 handoff |
| Matter | W0/W1 initially, then workflow engine |
| Person | W1 or matter workflow depending scope |
| Entity | W1 or matter workflow depending scope |
| Relationship | W1 or matter workflow depending scope |
| Source | Workflow that ingests source |
| Evidence | W4 |
| Evidence Extraction | W4 |
| Assertion | W2/W3/W5 depending origin |
| Fact | W1 for client-level; W5 for matter-level |
| Timeline Event | W2/W3/W5 |
| Contradiction | W3/W5/W9 |
| Risk | Any workflow may create; governance controls |
| Client Instruction | Client communication workflow / matter owner |
| Legal Authority | W7 |
| Research Memo | W7 |
| Strategy Point | W6 |
| Strategy Memo | W6 |
| Argument Node | W8 |
| Argument Draft | W8 |
| Adversarial Critique | W9 |
| Output Artifact | Creating workflow |
| Translation | Translation workflow or relevant workflow |
| Workflow State | Workflow engine |
| Promotion Request | Proposing workflow; reviewed by target owner |
| Review Event | Reviewer/governance |
| Agent Output | Agent/workflow |
| Model Record | System governance |
| Tool Record | System governance |
| Prompt Record | System governance |
| Tool Call | System/tooling layer |
| Access Grant | Security/governance |
| Privilege Classification | Security/governance |
| Learning Object | Learning/governance |
| Audit Event | System |

## 41.3 Implementation Notes

Agents should not modify objects outside their authority.

Object mutation rules should be enforced by application logic, not just prompt instructions.

---

# Section 42 — MVP Object Set

## 42.1 Required MVP Objects

The MVP should implement the following objects:

1. Client;
2. Matter;
3. Evidence;
4. Evidence Extraction;
5. Assertion;
6. Source;
7. Output Artifact;
8. Workflow State;
9. Risk;
10. Research Memo or Research Note;
11. Strategy Memo or Strategy Point;
12. Argument Draft;
13. Adversarial Critique;
14. Agent Output;
15. Audit Event.

## 42.2 MVP Object Simplification

The MVP may simplify:

- Person and Entity as text fields;
- Relationship as notes;
- Fact as verified Assertion;
- Legal Authority as part of Research Memo;
- Translation as fields in Evidence or Artifact;
- Review Event as Audit Event;
- Tool Call as Agent Output metadata;
- Learning Object as manual notes.

## 42.3 MVP Minimum Schema Discipline

Even if simplified, every MVP record should preserve:

- `client_id` where client-scoped;
- `matter_id` where matter-scoped;
- status;
- source links where applicable;
- version or timestamp;
- confidentiality/privilege status where possible;
- workflow origin where applicable.

## 42.4 MVP Red Lines

The MVP must not:

- merge Client and Matter;
- store evidence without matter linkage;
- omit Assertion objects;
- omit Output Artifact status;
- use global unscoped retrieval;
- generate arguments without support states;
- overwrite important records without versioning;
- treat model output as verified fact;
- ignore risk;
- ignore workflow state.

---

# Section 43 — Intake and Onboarding Objects (W0)

## 43.1 Purpose

These objects model **pre-acceptance onboarding** (`intake_id` instances), **candidate** parties and matters before promotion into authoritative Client/Matter surfaces, and optional **grouped intake** scaffolding for materially related prospective co-parties. They operationalize Institutional Doctrine (**Document 1**), Governance intake isolation (**Document 3**, Section 11.6), Security intake isolation (**Document 6**, Section 5.6), Workflow routing (**Document 05**), and MVP **W0-lite** expectations (**Document 8**, Section 5.3).

## 43.2 Intake Record

```text
intake_id
intake_type
intake_status
source
created_at
created_by
assigned_operator
urgency_level
conflict_status
kyc_status
engagement_status
lead_attorney_review_status
handoff_status
notes
```

## 43.3 Client Candidate

```text
client_candidate_id
intake_id
intake_group_id
name
client_type
contact_details
identity_status
kyc_status
conflict_status
authority_status
representative_status
engagement_status
consent_status
notes
```

## 43.4 Matter Candidate

```text
matter_candidate_id
intake_id
intake_group_id
proposed_matter_name
matter_type
posture
jurisdiction
adverse_parties
related_parties
deadline_flags
urgency_level
engagement_status
notes
```

## 43.5 Intake Group

```text
intake_group_id
relationship_type
shared_matter_candidate_id
joint_representation_flag
potential_internal_conflict_flag
client_candidate_ids
matter_candidate_ids
group_conflict_status
group_consent_status
notes
```

## 43.6 Intake Task

```text
intake_task_id
intake_id
intake_group_id
client_candidate_id
matter_candidate_id
assigned_agent
task_type
status
result_summary
risk_id
created_at
updated_at
```

## 43.7 Relationships and Promotion Rules

- An **Intake Record** may link to one **W0 Intake Instance** workload and aggregates **Client Candidate** / **Matter Candidate** rows tied to its `intake_id`.
- **Intake Group** may connect multiple candidates when prospective clients are materially related within the **same proposed matter**, while still preserving **distinct** identities, privilege boundaries, conflicts, KYB/KYC artefacts, consent, authority paths, representative status, engagement analysis **per candidate**.
- **Intake Task** MUST belong to a parent intake workflow and MAY optionally reference `client_candidate_id`, `matter_candidate_id`, `intake_group_id`, `risk_id`, and assigned automation / human queues.
- **Accepted** onboarding MUST promote into canonical **Client** + **Matter** entities only via governed handoff artefacts—candidate rows remain non-authoritative hypotheses until uplifted.

- **Rejected** or **abandoned** intakes MUST **not** auto-spawn enduring **W1** client cognition rows, unrestricted embeddings in general retrieval surfaces, or matter-level memory equivalents until expressly permitted—retention follows archival / deletion doctrine (**Document 13**).

---

# Section 44 — Target-State Object Architecture

## 44.1 Target-State Direction

The target-state object architecture should evolve toward:

- relational legal object store;
- evidence object store;
- vector retrieval layer;
- provenance graph;
- audit ledger;
- workflow state engine;
- risk graph;
- jurisdictional knowledge base;
- institutional learning layer;
- security and privilege boundary engine.

## 44.2 Graph Relationships

Eventually, LEXOS should support graph-style relationships among:

- clients;
- entities;
- persons;
- matters;
- evidence;
- assertions;
- facts;
- timelines;
- authorities;
- arguments;
- risks;
- outputs;
- learning objects.

This may be implemented through graph database technology or relational tables with graph-style relationship modeling.

## 44.3 Provenance Graph

Every important output should eventually trace back to:

- source;
- evidence;
- assertion;
- fact;
- research;
- authority;
- strategy;
- argument;
- adversarial review;
- agent;
- model;
- prompt;
- workflow;
- review;
- and artifact version.

## 44.4 Autonomy Support

The object model must support autonomy by enabling the system to know:

- what exists;
- what is missing;
- what is supported;
- what is contradicted;
- what is risky;
- what is final;
- what is draft;
- what can move next;
- what is blocked;
- what requires escalation.

Autonomy depends on structured object state.

---

# Section 45 — Implementation Guidance for MVP

## 45.1 Recommended First Supabase Tables

A practical first Supabase schema may include tables named:

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

Optional early tables:

- `persons`;
- `entities`;
- `translations`;
- `legal_authorities`;
- `review_events`;
- `tool_calls`;

Optional **W0-lite / intake scaffolding** tables (recommended when onboarding flow is exercised; see **Section 43** definitions):

- `intake_records`;
- `client_candidates`;
- `matter_candidates`;
- `intake_groups`;
- `intake_tasks`.

## 45.2 Suggested MVP Build Order

Build objects in this order:

1. Client;
2. Matter;
3. Workflow State;
4. Source;
5. Evidence;
6. Evidence Extraction;
7. Assertion;
8. Output Artifact;
9. Risk;
10. Research Memo;
11. Strategy Memo;
12. Argument Draft;
13. Adversarial Critique;
14. Agent Output;
15. Audit Event.

Intake scaffolding may be inserted:

- immediately after Matter/Workflow scaffolding if manual onboarding gates precede cognition loops; **or**
- as a gated Phase 2 expansion—provided once enabled it still enforces per-`intake_id` isolation (see **Section 43.7**).

This order supports the MVP cognition loop.

## 45.3 MVP Object Dependencies

Minimum dependencies:

- Matter requires Client.
- Evidence requires Matter.
- Evidence Extraction requires Evidence.
- Assertion requires Matter.
- Output Artifact requires Matter.
- Workflow State requires Matter.
- Risk requires Matter or object link.
- Research Memo requires Matter.
- Strategy Memo requires Matter.
- Argument Draft requires Matter.
- Adversarial Critique requires target object.
- Audit Event requires actor and target where applicable.

Intake scaffolding dependencies (when used):

- **Client Candidate** / **Matter Candidate** MUST reference controlling `intake_id`.
- Promotion to Client/Matter requires completion path through acceptance + handoff, not autonomous candidate writes.

## 45.4 Avoid Premature Complexity

Do not overbuild:

- full privilege object;
- full legal hold;
- full chain-of-custody;
- graph database;
- automated jurisdiction profiles;
- model drift monitoring;
- full learning engine.

But preserve fields and architecture where cheap.

## 45.5 Build for Future Migration

Even MVP should include stable IDs.

Avoid using file names, titles, or human-readable labels as primary identifiers.

Use UUIDs or equivalent stable identifiers.

---

# Section 46 — Summary

The Canonical Object Model defines the legal skeleton of LEXOS.

The most important objects are:

- Client;
- Matter;
- Evidence;
- Assertion;
- Output Artifact;
- Workflow State;
- Risk;
- Research Memo;
- Strategy Point;
- Argument Node;
- Adversarial Critique;
- Agent Output;
- Audit Event;
- optional onboarding structures defined in Section 43 whenever W0-lite is active.

The most important architectural rules are:

1. Client and Matter must remain separate.
2. Every matter-scoped object must carry `matter_id`.
3. Evidence must be structured.
4. Assertions must carry truth/support state.
5. Outputs must be artifacts with status and version.
6. Risk must be structured.
7. Workflow State is mandatory.
8. Provenance must be preserved.
9. Privilege/confidentiality must be fields.
10. Model and agent outputs are not truth.
11. MVP may simplify fields, not object boundaries.
12. Target-state architecture must support autonomous legal cognition.
13. Unrelated onboarding workflows must stay isolated (`intake_id` instances); related co-parties use **Intake Group** scaffolding without collapsing per-candidate protections.

This document should now be used to create:

- MVP database schema;
- workflow specification;
- agent prompt requirements;
- UI/UX screens;
- technical implementation architecture;
- and testing requirements.