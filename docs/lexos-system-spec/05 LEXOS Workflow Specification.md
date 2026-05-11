# Document 5 — LEXOS Workflow Specification

# Document Index and Agent Navigation Guide

## Purpose of This Index

This index helps human readers, AI agents, coding agents, workflow agents, legal agents, and system architects quickly locate relevant workflow rules in **Document 5 — LEXOS Workflow Specification**.

Document 5 converts W0–W11 into implementation-ready workflow modules. It defines workflow purpose, entry conditions, required inputs, objects, agents, tools, outputs, exit conditions, gates, handoffs, MVP reductions, and target-state expansion.

Agents should use this index before performing any workflow, MVP, UI, prompt, orchestration, or technical implementation task.

---

# Quick Navigation by Task

## If the task is about the overall workflow system

Read:

- **Section 1 — Purpose and Scope**
- **Section 2 — Common Workflow Structure**
- **Section 21 — Summary**

Use these sections to understand the workflow doctrine and common workflow design pattern.

Key concepts:

- W0–W11 workflow spine;
- workflow as controlled transformation;
- entry conditions;
- exit conditions;
- handoff package;
- workflow status;
- MVP workflow scope.

---

## If the task is about plaintiff-side vs defense-side routing

Read:

- **Section 3 — Workflow Routing and Matter Posture**
- **Section 6 — W2 Case-Client Story**
- **Section 7 — W3 Opposing Case File Intake and Story Reconciliation**

Use these sections when deciding whether a matter should go W2 → W4 or W2 → W3 → W4.

Key concepts:

- matter posture;
- plaintiff-side routing;
- defense-side routing;
- W3 requirement for defense;
- evidence request timing.

---

## If the task is about client onboarding

Read:

- **Section 4 — W0 Client Onboarding**

Use this section when designing intake, conflict, KYC/CDD, engagement, accounting setup, office admin setup, or client acceptance workflow.

Key concepts:

- W0 ephemeral intake;
- conflict status;
- KYC/CDD status;
- engagement status;
- Draft Client Master Record;
- W0-to-W1 handoff.

---

## If the task is about persistent client memory

Read:

- **Section 5 — W1 Client Master Record Management**

Use this section when designing client master record, client facts, client master story, fact promotion, KYC refresh, or W1 Custodian workflows.

Key concepts:

- W1 Custodian;
- Client Master Record;
- Client Facts;
- Client Master Story;
- Promotion Requests;
- W1-to-W2 context.

---

## If the task is about case story creation

Read:

- **Section 6 — W2 Case-Client Story**

Use this section when designing case story generation, client narrative, assertion extraction, chronology, gaps, vulnerabilities, and initial routing.

Key concepts:

- Case Master Story;
- Assertions;
- gaps;
- vulnerabilities;
- routing decision;
- plaintiff vs defense handoff.

---

## If the task is about opposing-file intake or defense-side reconciliation

Read:

- **Section 7 — W3 Opposing Case File Intake and Story Reconciliation**

Use this section when designing prosecution/plaintiff/court-file ingestion, allegation extraction, contradiction detection, reconciliation reports, or defense evidence-needs registers.

Key concepts:

- opposing file;
- allegation list;
- paragraph/section index;
- reconciliation report;
- evidence-needs register;
- W3-to-W4 handoff.

---

## If the task is about evidence intake

Read:

- **Section 8 — W4 Evidence Intake**

Use this section when designing digital document upload, evidence register, extraction, metadata, evidence processing, evidence status, or evidence handoff.

Key concepts:

- Evidence Objects;
- Evidence Extraction;
- Evidence Register;
- original preservation;
- processing status;
- quality flags;
- W4-to-W5 handoff.

---

## If the task is about support matrix or fact-evidence mapping

Read:

- **Section 9 — W5 Story-Evidence Alignment and Fact Support**

Use this section when designing assertion support, evidence mapping, unsupported facts, contradictions, fact promotion, or support matrix artifacts.

Key concepts:

- Story-Evidence Support Matrix;
- support states;
- unsupported fact list;
- contradiction list;
- evidence gaps;
- W5-to-W6 handoff.

---

## If the task is about legal strategy

Read:

- **Section 10 — W6 Case Strategy**

Use this section when designing strategy memos, attack lines, defense lines, research questions, strategy risk, or strategy point generation.

Key concepts:

- Strategy Points;
- Strategy Memo;
- strongest/weakest points;
- missing evidence;
- research questions;
- W6-to-W7 handoff.

---

## If the task is about legal research

Read:

- **Section 11 — W7 Memo Research and Strategy Loop**

Use this section when designing legal research memos, authority lists, adverse authority, jurisdiction-scoped research, citation confidence, or W7-to-W6/W8 loops.

Key concepts:

- Research Memo;
- Legal Authority;
- adverse authority;
- jurisdiction;
- legal confidence;
- citation confidence;
- strategy revision.

---

## If the task is about argument drafting

Read:

- **Section 12 — W8 Argument Engineering**

Use this section when designing argument drafts, argument nodes, evidence-linked arguments, legal authorities, unsupported claim flags, or W8-to-W9 handoff.

Key concepts:

- Argument Draft;
- Argument Nodes;
- evidence-linked claims;
- legal authority references;
- unsupported claim flags;
- W8 may not alter truth/evidence records.

---

## If the task is about adversarial review

Read:

- **Section 13 — W9 Adversarial Stress-Test**

Use this section when designing red-team critique, attack matrix, weakness register, revision checklist, or W8/W9 loop.

Key concepts:

- Adversarial Critique;
- attack list;
- weakness severity;
- revision checklist;
- loop decision;
- W9 must not be deferential.

---

## If the task is about visual exhibits

Read:

- **Section 14 — W10 Visual Exhibit Production**

Use this section when designing timelines, evidence charts, entity maps, transaction diagrams, visual exhibits, or W10-to-W11 handoff.

Key concepts:

- Visual Artifact;
- source linkage;
- assumptions note;
- visual evidence discipline;
- MVP deferral.

---

## If the task is about final drafting or persuasive refinement

Read:

- **Section 15 — W11 Persuasive Refinement**

Use this section when designing revised final outputs, rhetorical polish, final bundles, source preservation, caveat preservation, or output certification.

Key concepts:

- Revised Output Artifact;
- Final Presentation Bundle;
- W11 must not invent facts;
- W11 must not erase caveats;
- final status requires review/certification.

---

## If the task is about cross-workflow artifacts

Read:

- **Section 16 — Cross-Workflow Objects and Artifacts**

Use this section when tracking how Case Master Story, Evidence Register, Support Matrix, Strategy Memo, Research Memo, Argument Draft, Adversarial Critique, and Final Bundle move across workflows.

Key concepts:

- artifact ownership;
- artifact usage;
- workflow dependencies;
- cross-workflow continuity.

---

## If the task is about workflow gates

Read:

- **Section 17 — Workflow Gate Summary**

Use this section when designing validation logic, policy-as-code, workflow completion checks, or UI workflow status.

Key concepts:

- W0 gate;
- W1 gate;
- W2 gate;
- W3 gate;
- W4 gate;
- W5 gate;
- W6 gate;
- W7 gate;
- W8 gate;
- W9 gate;
- W10 gate;
- W11 gate.

---

## If the task is about workflow failures or escalation

Read:

- **Section 18 — Workflow Failure and Escalation**

Use this section when designing blockers, escalation routes, workflow failure records, risk creation, or issue queues.

Key concepts:

- workflow failure;
- Risk Object;
- Workflow Event;
- blocked status;
- escalation destinations.

---

## If the task is about MVP workflows

Read:

- **Section 19 — MVP Workflow Specification**
- **Section 21 — Summary**

Use these sections when building the first version, preparing coding-agent prompts, scoping MVP features, or avoiding MVP red lines.

Key concepts:

- MVP legal cognition spine;
- required MVP workflows;
- MVP outputs;
- MVP screens;
- MVP red lines.

---

## If the task is about target-state workflow architecture

Read:

- **Section 20 — Target-State Workflow Architecture**

Use this section when designing future workflow engine, autonomy, state machines, task queues, agent assignment, retry logic, and autonomous workflow progression.

Key concepts:

- stateful workflows;
- policy-as-code;
- workflow engine;
- autonomy maturity;
- target-state workflow progression.

---

# Section-by-Section Index

## Section 1 — Purpose and Scope

Use for:

- workflow doctrine;
- W0–W11 overview;
- plaintiff/defense routing summary;
- MVP workflow scope.

## Section 2 — Common Workflow Structure

Use for:

- required workflow definition fields;
- workflow status values;
- common governance gates;
- handoff package structure.

## Section 3 — Workflow Routing and Matter Posture

Use for:

- plaintiff-side routing;
- defense-side routing;
- matter posture;
- advisory/transactional routing.

## Section 4 — W0 Client Onboarding

Use for:

- intake;
- conflict/KYC/CDD;
- engagement;
- accounting/admin setup;
- onboarding handoff.

## Section 5 — W1 Client Master Record Management

Use for:

- Client Master Record;
- client memory;
- fact promotion;
- client-level facts;
- W1 Custodian.

## Section 6 — W2 Case-Client Story

Use for:

- Case Master Story;
- client narrative;
- assertion extraction;
- gaps;
- routing decision.

## Section 7 — W3 Opposing Case File Intake and Story Reconciliation

Use for:

- defense-side file intake;
- prosecution/plaintiff/court materials;
- opposing allegations;
- reconciliation report.

## Section 8 — W4 Evidence Intake

Use for:

- digital evidence ingest;
- Evidence Objects;
- extraction;
- Evidence Register.

## Section 9 — W5 Story-Evidence Alignment and Fact Support

Use for:

- support matrix;
- evidence-to-assertion links;
- unsupported facts;
- contradictions.

## Section 10 — W6 Case Strategy

Use for:

- Strategy Points;
- Strategy Memo;
- attack/defense lines;
- research questions.

## Section 11 — W7 Memo Research and Strategy Loop

Use for:

- Research Memo;
- Legal Authority;
- adverse authority;
- citation confidence.

## Section 12 — W8 Argument Engineering

Use for:

- Argument Draft;
- Argument Nodes;
- evidence-linked drafting;
- W8-to-W9 handoff.

## Section 13 — W9 Adversarial Stress-Test

Use for:

- adversarial critique;
- red-team review;
- weakness severity;
- revision checklist.

## Section 14 — W10 Visual Exhibit Production

Use for:

- timelines;
- visual exhibits;
- charts;
- source-linked visuals.

## Section 15 — W11 Persuasive Refinement

Use for:

- final refinement;
- revised output;
- final bundle;
- caveat preservation.

## Section 16 — Cross-Workflow Objects and Artifacts

Use for:

- artifact lifecycle;
- cross-workflow dependencies;
- ownership and usage.

## Section 17 — Workflow Gate Summary

Use for:

- workflow validation;
- entry/exit checks;
- policy-as-code.

## Section 18 — Workflow Failure and Escalation

Use for:

- blockers;
- risk creation;
- escalation route;
- failure states.

## Section 19 — MVP Workflow Specification

Use for:

- MVP build plan;
- required MVP workflows;
- MVP screens;
- MVP red lines.

## Section 20 — Target-State Workflow Architecture

Use for:

- workflow engine design;
- autonomous workflow progression;
- target-state workflow maturity.

## Section 21 — Summary

Use for:

- compressed workflow doctrine;
- quick compliance check.

---

# Fast Lookup Table

| Topic | Primary Sections |
|---|---|
| Workflow doctrine | Sections 1, 2, 21 |
| Plaintiff/defense routing | Section 3 |
| W0 onboarding | Section 4 |
| W1 client memory | Section 5 |
| W2 case story | Section 6 |
| W3 opposing file | Section 7 |
| W4 evidence | Section 8 |
| W5 support matrix | Section 9 |
| W6 strategy | Section 10 |
| W7 research | Section 11 |
| W8 argument | Section 12 |
| W9 adversarial review | Section 13 |
| W10 visuals | Section 14 |
| W11 refinement | Section 15 |
| Cross-workflow artifacts | Section 16 |
| Workflow gates | Section 17 |
| Failures/escalation | Section 18 |
| MVP workflows | Section 19 |
| Target-state workflow engine | Section 20 |

---

# Agent Reading Protocol

Before performing any task based on Document 5, an agent should:

1. **Identify the workflow or workflow group.**

   Determine whether the task concerns W0, W1, W2, W3, W4, W5, W6, W7, W8, W9, W10, W11, routing, gates, MVP, or target-state workflow architecture.

2. **Read the relevant workflow section.**

   Use the Quick Navigation above.

3. **Read Section 2 for common workflow structure.**

   Every workflow must have entry conditions, outputs, exit conditions, status, gates, and handoffs.

4. **Read Section 17 if implementing gates or validation.**

   Section 17 provides the workflow gate summary.

5. **Read Section 19 if the task affects MVP.**

   MVP must prove the legal cognition spine without violating foundations.

6. **Read Section 21 before final recommendations.**

   Section 21 gives the compressed workflow doctrine.

---

# Mandatory Cross-Checks for Agents

## For workflow design tasks

Read:

- Section 2;
- relevant workflow section;
- Section 17.

Mandatory check:

- Does the workflow have entry conditions, inputs, outputs, exit conditions, gates, failure states, and handoff package?

## For MVP tasks

Read:

- Section 19;
- Section 21.

Mandatory check:

- Does the MVP preserve Client → Matter → Story → Evidence → Assertions → Support Matrix → Strategy → Research → Argument → Adversarial Critique → Revised Output?

## For defense-side matters

Read:

- Section 3;
- Section 6;
- Section 7.

Mandatory check:

- Does the workflow include W3 before targeted evidence requests where the opposing file defines the case?

## For evidence tasks

Read:

- Section 8;
- Section 9.

Mandatory check:

- Does W4 create Evidence Objects and W5 map Assertions to Evidence?

## For drafting tasks

Read:

- Section 12;
- Section 13;
- Section 15.

Mandatory check:

- Does drafting proceed from strategy, research, supported assertions, and evidence?
- Is W9 critique performed before final refinement?

## For UI/workspace tasks

Read:

- Section 19;
- Section 16;
- Section 17.

Mandatory check:

- Does the UI expose workflow stage, artifacts, risks, unsupported facts, and gates?

## For workflow engine tasks

Read:

- Section 18;
- Section 20.

Mandatory check:

- Does the engine support status transitions, blockers, failures, handoffs, re-entry, and audit events?

---

# Final Instruction to Agents

Document 5 defines how LEXOS work moves.

Agents must not treat workflows as prompts only.

Every workflow must preserve:

- defined inputs;
- defined outputs;
- canonical objects;
- workflow state;
- risks;
- contradictions;
- artifact versions;
- handoff packages;
- governance gates;
- auditability.

The MVP may simplify workflows.

The MVP must not skip the legal cognition spine or remove workflow state, evidence structure, assertions, support mapping, adversarial critique, or output artifact status.

## Document Status

**Document Name:** LEXOS Workflow Specification  
**Document Number:** Document 5  
**Version:** v1.0 Draft  
**Purpose:** Define W0–W11 as implementation-oriented legal workflows, including purpose, scope, entry conditions, required inputs, outputs, objects, agents, tools, gates, handoffs, failure states, MVP reduction, and target-state expansion.  
**Depends On:**  
- Document 1 — LEXOS Institutional Doctrine  
- Document 2 — LEXOS Canonical Object Model  
- Document 3 — LEXOS Governance and Epistemic Integrity Rules  
- Document 4 — LEXOS Cognitive Architecture  

**Primary Use:** MVP build planning, workflow orchestration, agent design, Supabase schema validation, UI workspace design, task queues, workflow state machine design, and coding-agent implementation prompts.

---

# Section 1 — Purpose and Scope

## 1.1 Purpose of This Document

This document defines the LEXOS workflow system.

LEXOS is organized around W0–W11, a sequence of governed legal workflows that transform client information, matter facts, opposing materials, evidence, research, strategy, arguments, adversarial critique, visuals, and rhetorical refinement into legally structured work product.

Document 1 defines LEXOS as an autonomous legal cognition institution.  
Document 2 defines the canonical objects used by the system.  
Document 3 defines the governance rules controlling those objects.  
Document 4 defines the cognitive architecture.  
Document 5 defines the actual workflow modules that operationalize the system.

The central purpose of this document is to make W0–W11 implementation-ready.

Each workflow must be treated as a controlled transformation of legal knowledge.

A workflow is not merely an AI prompt.

A workflow is a governed process with:

- defined purpose;
- entry conditions;
- required inputs;
- permitted agents;
- permitted tools;
- created objects;
- modified objects;
- required outputs;
- status values;
- governance gates;
- failure states;
- handoff rules;
- re-entry rules;
- MVP version;
- target-state version.

## 1.2 Core Workflow Doctrine

The core workflow doctrine is:

> A LEXOS workflow is valid only if it transforms defined inputs into defined legal objects or legal artifacts under defined governance conditions.

No workflow should be considered complete merely because an agent generated text.

Workflow completion requires:

- required objects exist;
- required statuses are updated;
- required risks are visible;
- unresolved contradictions are recorded;
- required outputs are created;
- handoff package is prepared;
- workflow state is updated;
- audit events exist.

## 1.3 Workflow Spine

The full workflow spine is:

- **W0 — Client Onboarding**
- **W1 — Client Master Record Management**
- **W2 — Case-Client Story**
- **W3 — Opposing Case File Intake and Story Reconciliation**
- **W4 — Evidence Intake**
- **W5 — Story-Evidence Alignment and Fact Support**
- **W6 — Case Strategy**
- **W7 — Memo Research and Strategy Loop**
- **W8 — Argument Engineering**
- **W9 — Adversarial Stress-Test**
- **W10 — Visual Exhibit Production**
- **W11 — Persuasive Refinement**

## 1.4 Plaintiff-Side Routing

Plaintiff-side matters generally follow:

> W0 → W1 → W2 → W4 → W5 → W6 → W7 → W8 → W9 → W10 → W11

W3 is usually not required unless there is an opposing file or procedural record that must be reconciled before evidence collection.

## 1.5 Defense-Side Routing

Defense-side matters generally follow:

> W0 → W1 → W2 → W3 → W4 → W5 → W6 → W7 → W8 → W9 → W10 → W11

W3 is mandatory for defense-side matters where the opposing/prosecution/plaintiff/court file defines the case to be answered.

## 1.6 MVP Workflow Scope

The MVP should not implement all workflows equally.

Recommended MVP workflow spine:

- **W1-lite — Basic Client Record**
- **W2-lite — Case Story Creation**
- **W4-lite — Digital Evidence Ingest**
- **W5-lite — Assertion Support Matrix**
- **W6-lite — Strategy Memo**
- **W7-lite — Research Memo or Research Attachment**
- **W8-lite — Argument Draft**
- **W9-lite — Adversarial Critique**
- **W11-lite — Revised Output**

W0 may be manual.  
W3 may be included if defense-side use cases are the first priority.  
W10 may be deferred.

---

# Section 2 — Common Workflow Structure

## 2.1 Required Workflow Definition Fields

Each workflow should be defined with:

1. Workflow ID;
2. Workflow Name;
3. Purpose;
4. Scope;
5. Entry Conditions;
6. Required Inputs;
7. Optional Inputs;
8. Primary Agents;
9. Permitted Tools;
10. Created Objects;
11. Modified Objects;
12. Required Outputs;
13. Exit Conditions;
14. Governance Gates;
15. Failure States;
16. Handoff Package;
17. Re-entry Triggers;
18. MVP Version;
19. Target-State Version.

## 2.2 Common Workflow Status Values

All workflows should support:

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

## 2.3 Common Workflow Objects

All workflows may interact with:

- Workflow State;
- Workflow Event;
- Audit Event;
- Risk;
- Review Event;
- Output Artifact;
- Agent Output.

## 2.4 Common Governance Gates

All workflows must obey:

- client/matter scope;
- privilege/confidentiality restrictions;
- retrieval filters;
- agent authority boundaries;
- truth/support state rules;
- risk blockers;
- audit logging;
- artifact status rules.

## 2.5 Common Handoff Package

Every workflow handoff should include:

- source workflow;
- target workflow;
- client ID;
- matter ID;
- current artifact versions;
- created objects;
- modified objects;
- unresolved risks;
- unresolved contradictions;
- unsupported assertions;
- required next action;
- handoff timestamp.

---

# Section 3 — Workflow Routing and Matter Posture

## 3.1 Matter Posture Field

Every Matter must include a `posture` field.

Suggested values:

- `plaintiff_side`;
- `defense_side`;
- `advisory`;
- `transactional`;
- `regulatory`;
- `internal_investigation`;
- `unknown`.

## 3.2 Routing Rule

The system must route matters based on posture.

For MVP, at minimum:

- plaintiff-side: W2 → W4;
- defense-side: W2 → W3 → W4, if opposing file exists or is expected.

## 3.3 Defense Routing Rule

Defense-side matters must not request full client evidence production before W3 if the opposing file is necessary to understand the allegations.

Reason:

The system must first determine what the client must answer.

## 3.4 Plaintiff Routing Rule

Plaintiff-side matters may move from W2 to W4 because the client is usually the initiating party and evidence collection must support the claim.

## 3.5 Advisory and Transactional Matters

Advisory and transactional matters may require later alternative workflow branches.

For MVP, they may be treated as modified plaintiff-side routing unless the matter requires opposing-file intake.

---

# Section 4 — W0 Client Onboarding

## 4.1 Workflow ID

`W0_client_onboarding`

## 4.2 Purpose

W0 handles initial client onboarding before persistent client memory begins.

It covers:

- lead intake;
- conflict screening;
- KYC/CDD;
- client identity;
- matter opening;
- engagement preparation;
- accounting setup;
- office administration setup;
- lead-attorney or governance sign-off.

## 4.3 Scope

W0 begins when a potential client or new matter enters the system.

W0 ends when:

- client is accepted and handed to W1;
- matter is opened;
- or intake is declined/abandoned/archived.

## 4.4 Entry Conditions

W0 may begin when:

- new lead exists;
- new client request exists;
- existing client requests new matter;
- human user manually creates intake;
- external form submission creates intake.

## 4.5 Required Inputs

Target-state:

- prospective client identity;
- contact details;
- preliminary matter description;
- adverse parties;
- jurisdiction;
- matter type;
- urgency/deadline indicators;
- identity/KYC data where required;
- conflict check data;
- engagement scope;
- billing/retainer setup information.

MVP:

- client name;
- contact details;
- matter name;
- matter description;
- matter posture;
- jurisdiction;
- manual conflict/KYC status field.

## 4.6 Optional Inputs

- uploaded preliminary documents;
- referral source;
- business development notes;
- risk screening notes;
- preferred language;
- related entities;
- authorized representatives.

## 4.7 Primary Agents

Target-state:

- Intake Specialist;
- Accounting Agent;
- Office Admin Agent;
- Conflict Check Agent;
- KYC/CDD Agent;
- Governance Gatekeeper.

MVP:

- human operator;
- optional Intake Specialist prompt/workflow.

## 4.8 Permitted Tools

Target-state:

- intake form;
- conflict database;
- KYC/CDD tools;
- sanctions screening;
- document upload;
- billing system;
- e-signature;
- email/calendar;
- CRM.

MVP:

- manual form;
- database record creation;
- document upload;
- status fields.

## 4.9 Created Objects

Target-state:

- Intake Record;
- Client Candidate;
- Matter Candidate;
- Intake Group where applicable;
- Intake Task ledger;
- Source Objects;
- preliminary Evidence Objects if documents uploaded;
- Client Instruction Objects;
- Risk Objects;
- Audit Events scoped to `intake_id`;
- Final Client Onboarding File / Draft Master Records only per promotion policy;
- Draft packages prepared for W1 only after acceptance gates.

MVP (when W0-lite is implemented)—objects should follow **Document 2, Section 43 — Intake and Onboarding Objects (W0)** and **Document 8, Section 5.3 — W0-lite MVP Intake Requirements**:

- Intake Record (+ `intake_id`);
- Client Candidate;
- Matter Candidate;
- optional Intake Group;
- Intake Task rows or manual task log;
- Workflow State / status fields;
- Source and preliminary notes as needed;
- Audit Event per material action;

MVP may **still** create authoritative **Client / Matter** rows only after explicit acceptance; if early Client/Matter rows exist for velocity, they remain **non-W1 until handoff** completes per governance (see Document 3).

## 4.10 Modified Objects

- Intake Record / Client Candidate / Matter Candidate / Intake Group;
- Workflow State;
- Risk;
- Audit Event.

## 4.11 Required Outputs

Target-state:

- Final Client Onboarding File;
- Draft Client Master Record;
- initial Matter Record once accepted;
- conflict/KYC/CDD / authority / engagement statuses per candidate;
- accounting + office admin checkpoints;
- packaged W1/W2 handoffs;
- Intake Group dossier when engaged;
- audit trail of escalation and resolution.

MVP (structured W0-lite):

- Intake Record with manual `intake_status`, `conflict_status`, `kyc_status`, `engagement_status`, `lead_attorney_review_status`;
- Client Candidate + Matter Candidate payloads;
- optional Intake Group + per-candidate cards;
- Final Client Onboarding summary artifact (may be manual);
- Draft Master Record pointers **only** after acceptance;
- W1/W2 handoff package when accepted.

## 4.12 Exit Conditions

W0 is complete when:

- intake accepted, rejected, abandoned, or superseded with documented disposition;
- conflict / KYC / representative / engagement blockers resolved or formally escalated per policy;
- accounting/retainer + office admin requirements captured or waived with governance approval;
- governance/lead-attorney sign-off recorded when applicable;
- acceptance triggers **controlled** Client/Matter binding per W1—not silent promotion of candidate facts;
- abandonment/rejection triggers restricted/archive/delete handling per policy without W1 leakage;
- required risks and audit entries exist;
- W1/W2 receive curated packages only on acceptance.

## 4.13 Governance Gates

- conflict/KYC/authority/engagement statuses visible per Client Candidate;
- joint-representation / intra-group conflict hazards visible for Intake Groups;
- accounting/retainer & office admin checkpoints surfaced when required;
- no hidden assumption onboarding is complete while mandatory tasks remain;
- abandoned/rejected intake cannot silently become persistent W1 memory;
- unrelated prospects **never** share a single W0 agent reasoning context—the **W0 Intake Orchestrator** may coordinate queues but must not merge unrelated facts into one cognitive context;
- subagents remain scoped to their Intake Instance or sanctioned Intake Group.

## 4.14 Failure States

- insufficient client identity;
- conflict issue;
- KYC/CDD issue;
- incomplete adverse party information;
- no engagement authority;
- billing/retainer not set;
- intake abandoned;
- urgent deadline detected but not escalated.

## 4.15 Handoff Package

To W1:

- Client Onboarding File;
- Draft Client Master Record;
- client identity;
- contact details;
- representatives;
- KYC/CDD status;
- risk status;
- matter opening data;
- engagement scope.

To W2:

- Matter Record;
- preliminary matter description;
- posture;
- jurisdiction;
- urgency/deadline notes;
- uploaded preliminary documents.

## 4.16 Re-entry Triggers

W0 may reopen if:

- new KYC issue arises;
- conflict issue discovered;
- engagement scope changes;
- new adverse party appears;
- retainer/billing issue blocks work.

## 4.17 MVP Version

W0 may remain mostly manual, but **architecture must still respect isolated Intake Instances**:

- every active intake has an `intake_id` and discrete instance scope;
- optional W0 Intake Orchestrator layer routes tasks without merging unrelated prospect cognition;
- MVP should still model **Intake Record / Client Candidate / Matter Candidate / optional Intake Group / Intake Task** per **Document 8** when W0-lite ships;
- concurrent intakes must remain UI- and service-layer isolated;
- persistent W1 memory cannot begin until intake acceptance + handoff completes.

## 4.18 Target-State Version

Target-state W0 supports autonomous or semi-autonomous onboarding with conflict, KYC/CDD, accounting, office administration, and lead-attorney/governance sign-off.

## 4.19 W0 Multi-Client Intake, Orchestration, and Grouping

### W0 Multi-Client Intake Doctrine

LEXOS W0 must support **multiple simultaneous onboardings** through **isolated intake workflow instances**.

The correct pattern:

- **one W0 Intake Orchestrator** supervising queues, routing, and status (no merged legal reasoning pool for unrelated prospects);
- **one separate W0 Intake Instance** per prospective client, per existing-client new-matter opening, or per sanctioned **Intake Group** when multiple prospects truly share one matter-opening context;
- **scoped W0 subagents** executing only inside the assigned **Intake Instance** or **Intake Group** boundary;
- **no shared reasoning context across unrelated prospective clients** (distinct `intake_id` / intake instance scopes);
- **no persistent W1 client memory until onboarding is accepted and handed off**;
- abandoned/rejected intake memory remains ephemeral, restricted, archived, or deleted according to policy.

### Conceptual architecture (illustrative)

The diagram below is **conceptual**. MVP may realize subagents as **prompt-driven workflow steps**, scripted tasks, or human-operated queues rather than autonomous long-lived agents.

```text
W0 Intake Orchestrator
  ├── W0 Intake Instance A
  │     ├── Conflict Subagent A
  │     ├── KYC/CDD Subagent A
  │     ├── Accounting Setup Subagent A
  │     ├── Office Admin Subagent A
  │     └── Intake Summary Subagent A
  │
  ├── W0 Intake Instance B
  │     ├── Conflict Subagent B
  │     ├── KYC/CDD Subagent B
  │     ├── Accounting Setup Subagent B
  │     ├── Office Admin Subagent B
  │     └── Intake Summary Subagent B
  │
  └── W0 Intake Instance C
        ├── Conflict Subagent C
        ├── KYC/CDD Subagent C
        ├── Accounting Setup Subagent C
        ├── Office Admin Subagent C
        └── Intake Summary Subagent C
```

### W0 Intake Orchestrator

**Responsibilities:**

- receive new intake requests and classify intake type;
- mint **Intake Record** (+ `intake_id`) and **W0 Intake Instance** scopes;
- assign **Intake Tasks** / sub-agent runs inside the assigned instance boundary;
- track queue/state, urgency/deadline flags;
- bundle **related-client** filings into **Intake Group** per governance rules below;
- escalate conflicts, KYC/CDD deficits, ambiguous identity, representative/authority deficits, accounting/retainer hurdles, governance/lead-attorney blockers;
- prepare **controlled W1/W2 handoff** only once acceptance gates satisfy Document 3 W0 isolation rules.

**Limitations:**

- must **not merge unrelated prospective-client facts** into a single cohesive memory or prompt corpus;
- must **not create persistent W1 memory or Client Facts automatically** prior to acceptance;
- must **not accept engagement**, clear conflicts alone, auto-resolve joint-representation risk, or certify KYC/CDD without mandated review thresholds.

### W0 Intake Instance

One scoped workflow instance corresponds to exactly one isolated onboarding story: a **single prospect**, an **existing client opening exactly one Matter Candidate lane**, or a **documented Intake Group** tying multiple prospects to coordinated matter-opening metadata.

Each instance retains its own **`intake_id`**, Candidate object graph, statuses, intake tasks, risk log, audits, packaging artifacts targeted for W1/W2 promotion.

### W0 Subagents (instance-scoped)

Possible subagents (implementation-flexible):

- Intake Information Collector;
- Conflict Data Collector;
- KYC/CDD Collector;
- Urgency / Deadline Screener;
- Matter Classifier;
- Accounting Setup Agent;
- Office Admin Agent;
- Intake Summary Agent;
- Governance / Lead-Attorney Review Gatekeeper.

> **Rule:** W0 subagents operate **only** within their assigned Intake Instance or sanctioned Intake Group; they must not cross-fetch or cross-write intake facts into unrelated intake instances.

### Multiple Clients in Same Matter (Intake Group)

When multiple prospective clients logically share **one impending matter posture**—for example **co-defendants**, **joint plaintiffs**, **company + director**, **parent + subsidiary**, **spouses**, **investor consortiums**, **authorized representative lanes**—operators must instantiate an **Intake Group** tying shared matter-opening metadata **without** collapsing per-person governance.

Examples that still require segmentation:

- co-defendants needing joint-defense assessment;
- joint plaintiffs with aligned timelines;
- company + controlling individuals;
- related entities + beneficial owners flagged for separate KYC/consent regimes.

Even inside **Intake Group**, each prospect remains a discrete **Client Candidate** with standalone **identity, conflict, KYC/CDD, authority/representative, consent, privilege, and engagement posture** pipelines. The UX and object graph must illuminate **joint representation**, **separate-but-related posture**, anticipated **intragroup conflicts**, **entity-vs-individual distinctions**, **authorized representative vs substantive client**, and **beneficial owner vs legal entity**.

### W0 Routing Decision Cases

1. **One client / one matter** — create one Intake Record, one Client Candidate, one Matter Candidate, one isolated W0 Intake Instance.

2. **Existing client / new matter** — create Intake Record, reference authoritative **existing Client**, create Matter Candidate, perform W1-compatible context/conflict freshness checks inside the instance boundary, abbreviated W0-lite steps if policy allows.

3. **Multiple unrelated prospective clients** — fan out **multiple Intake Records** + **distinct W0 Intake Instances**. No pooled agent cognition.

4. **Multiple related prospective clients / shared candidate matter posture** — create **Intake Group**, attach multiple Client Candidates, attach one-or-more Matter Candidates, run **individual** conflict/KYC/authority ladders per candidate plus **group-level** hazard flags (**joint_representation**, **potential_internal_conflict**).

5. **Ambiguous identity / uncertain representation** — create Intake Record, mark Client Candidate `identity_status` / `authority_status` as unclear, escalate, withhold W1 persistence until clarified.

---

# Section 5 — W1 Client Master Record Management

## 5.1 Workflow ID

`W1_client_master_record`

## 5.2 Purpose

W1 maintains the persistent Client Master Record across all matters.

W1 is the Custodian workflow.

It manages:

- Client Facts;
- Client Master Story;
- KYC/CDD refresh;
- cross-matter client continuity;
- fact promotion;
- client-level risk;
- client-level identity and relationship records.

## 5.3 Scope

W1 begins after W0 acceptance or manual Client creation.

W1 continues for the life of the client relationship.

## 5.4 Entry Conditions

W1 may begin when:

- Client Record exists;
- client accepted;
- W0 handoff exists or manual creation complete.

## 5.5 Required Inputs

- Client Record;
- W0 handoff or manual client data;
- client identity information;
- initial client notes;
- matter links.

## 5.6 Optional Inputs

- KYC/CDD records;
- related entities;
- beneficial owners;
- prior matters;
- client corrections;
- promoted facts from W2/W5/W7/W9;
- external verification.

## 5.7 Primary Agents

- Custodian;
- KYC/CDD Agent;
- Memory Promotion Auditor;
- Governance Gatekeeper.

MVP:

- human operator;
- optional Custodian prompt/workflow.

## 5.8 Permitted Tools

- database access to Client objects;
- Promotion Request review;
- KYC/CDD sources;
- public registries;
- client communication tools subject to authority;
- audit logs.

## 5.9 Created Objects

- Client Facts;
- Client Master Story Artifact;
- Promotion Request decisions;
- Risk Objects;
- Review Events;
- Audit Events.

MVP may use:

- Client notes;
- Client Master Story text field;
- manual promotion notes.

## 5.10 Modified Objects

- Client;
- Fact;
- Promotion Request;
- Risk;
- Output Artifact;
- Audit Event.

## 5.11 Required Outputs

Target-state:

- updated Client Master Record;
- verified Client Facts;
- Client Master Story;
- promotion decisions;
- client-level risk summary;
- KYC/CDD status.

MVP:

- Client Record;
- basic client story;
- client notes;
- manual fact promotion log if needed.

## 5.12 Exit Conditions

W1 does not fully exit while client remains active.

Specific W1 tasks complete when:

- promotion request approved/rejected;
- client story updated;
- KYC refresh completed;
- client fact verified/demoted/superseded.

## 5.13 Governance Gates

- matter-specific facts must not automatically become client facts;
- privilege/confidentiality must be preserved;
- client-level memory must be versioned;
- rejected or contradicted facts must not remain active;
- cross-matter retrieval must occur only through authorized client memory.

## 5.14 Failure States

- duplicate client record;
- incorrect fact promotion;
- stale KYC/CDD;
- client/matter memory contamination;
- contradictory client facts;
- unauthorized access to client-level memory.

## 5.15 Handoff Package

W1 provides to W2:

- relevant Client Facts;
- Client Master Story excerpts;
- known related persons/entities;
- client-level risks;
- language preferences;
- prior matter context if authorized.

W1 receives from W2/W5:

- Promotion Requests;
- client corrections;
- new verified facts;
- contradictions affecting client-level memory.

## 5.16 Re-entry Triggers

- new matter opened;
- new verified fact emerges;
- client correction;
- KYC/CDD refresh due;
- contradiction from matter workflow;
- client identity/representative change.

## 5.17 MVP Version

W1-lite includes:

- Client Record;
- client notes;
- Client Master Story field;
- manual updates;
- clear distinction from Matter Record.

## 5.18 Target-State Version

Target-state W1 becomes persistent autonomous Custodian with verification ladder:

1. internal system support;
2. external corroboration;
3. client confirmation;
4. governance approval where needed.

---

# Section 6 — W2 Case-Client Story

## 6.1 Workflow ID

`W2_case_client_story`

## 6.2 Purpose

W2 creates the initial Case Master Story for a Matter.

It captures:

- client narrative;
- parties;
- chronology;
- key assertions;
- known documents;
- vulnerabilities;
- gaps;
- preliminary risks;
- plaintiff/defense routing.

## 6.3 Scope

W2 begins after Matter creation.

W2 ends when:

- Case Master Story Artifact exists;
- material Assertions are created;
- preliminary gaps/risks are identified;
- routing to W3 or W4 is confirmed.

## 6.4 Entry Conditions

Required:

- Client Record exists;
- Matter Record exists;
- matter posture exists;
- jurisdiction field exists;
- W1 client context available where applicable.

## 6.5 Required Inputs

- Matter description;
- client narrative;
- client interview notes or uploaded notes;
- known parties/entities;
- key dates;
- known documents;
- desired objective;
- jurisdiction;
- matter posture.

Target-state W2 may require three structured client meetings.

MVP may use one structured input session.

## 6.6 Optional Inputs

- preliminary evidence;
- W1 Client Facts;
- prior matters;
- public background;
- opposing communications if already available;
- client language preference.

## 6.7 Primary Agents

- Story Architect;
- Custodian support from W1;
- Governance Gatekeeper.

MVP:

- Case Story Agent.

## 6.8 Permitted Tools

- client interview form;
- document upload;
- transcription if meeting recorded;
- entity extraction;
- timeline extraction;
- assertion extraction;
- matter-scoped retrieval;
- output artifact generation.

## 6.9 Created Objects

- Case Master Story Artifact;
- Assertion Objects;
- Timeline Events;
- Person/Entity records if implemented;
- Risk Objects;
- Client Instruction Objects if applicable;
- Promotion Requests to W1;
- Workflow Events;
- Audit Events.

## 6.10 Modified Objects

- Matter;
- Workflow State;
- Client if promotion approved through W1;
- Assertions;
- Risks.

## 6.11 Required Outputs

- Case Master Story Artifact;
- preliminary Assertion list;
- preliminary Timeline;
- known gaps list;
- vulnerability list;
- preliminary Risk list;
- posture/routing decision;
- W3 or W4 handoff package.

## 6.12 Exit Conditions

W2 is complete when:

- Case Master Story exists;
- material Assertions are created;
- unsupported/pending facts are visible;
- gaps are recorded;
- risks are recorded;
- route to W3 or W4 is determined;
- Workflow State updated.

## 6.13 Governance Gates

- client narrative must not be treated as verified fact;
- client-confirmed assertions must be labeled;
- unsupported assertions must be labeled;
- opposing allegations, if present, must be classified separately;
- matter posture must determine routing.

## 6.14 Failure States

- missing client narrative;
- unclear matter posture;
- unclear jurisdiction;
- insufficient party information;
- client story internally inconsistent;
- urgent deadline discovered;
- privilege/confidentiality concern;
- unsupported but material facts.

## 6.15 Handoff Package

Plaintiff-side to W4:

- Case Master Story;
- assertion list;
- evidence-needs list;
- gaps;
- risks;
- preliminary timeline.

Defense-side to W3:

- Case Master Story;
- client assertions;
- client timeline;
- vulnerabilities;
- known opposing materials;
- instruction not to request full client evidence until W3 reconciliation.

## 6.16 Re-entry Triggers

- client correction;
- new evidence;
- W3 opposing-file contradiction;
- W5 support analysis changes story;
- W9 adversarial critique exposes factual weakness;
- translation correction.

## 6.17 MVP Version

W2-lite must include:

- structured case story generation;
- assertion extraction;
- gap list;
- preliminary risks;
- routing decision.

## 6.18 Target-State Version

Target-state W2 includes multiple client meetings, structured interview loops, automated chronology, vulnerability scoring, preliminary evidence-needs generation, and fact-promotion requests to W1.

---

# Section 7 — W3 Opposing Case File Intake and Story Reconciliation

## 7.1 Workflow ID

`W3_opposing_file_reconciliation`

## 7.2 Purpose

W3 ingests and structures prosecution, plaintiff, court, or opposing-party materials in defense-side matters.

It reconciles those materials against the W2 client story.

## 7.3 Scope

W3 is primarily defense-side.

It begins after W2 when opposing materials exist or are expected.

It ends when:

- opposing file is indexed;
- allegations are extracted;
- contradictions/gaps are identified;
- evidence-needs register is created for W4.

## 7.4 Entry Conditions

Required:

- Matter exists;
- matter posture is defense-side or equivalent;
- W2 Case Master Story exists;
- opposing file or court/prosecution/plaintiff materials available.

## 7.5 Required Inputs

- W2 Case Master Story;
- opposing/prosecution/plaintiff/court materials;
- matter jurisdiction;
- procedural posture.

## 7.6 Optional Inputs

- court docket;
- translations;
- prior filings;
- public records;
- prosecution exhibits;
- plaintiff exhibits;
- client comments on opposing allegations.

## 7.7 Primary Agents

- Intake Clerk;
- Story Architect;
- Analyst;
- Governance Gatekeeper.

MVP:

- Opposing File Reconciliation Agent if defense MVP.

## 7.8 Permitted Tools

- document upload;
- OCR/parsing;
- markdown extraction;
- paragraph indexing;
- allegation extraction;
- timeline extraction;
- translation;
- matter-scoped retrieval;
- contradiction detection.

## 7.9 Created Objects

- Source Objects;
- Evidence Objects for opposing materials;
- Evidence Extractions;
- opposing Allegation Assertions;
- Timeline Events;
- Contradiction Objects;
- Risk Objects;
- Opposing Case Index Artifact;
- Reconciliation Report Artifact;
- Evidence-Needs Register Artifact.

## 7.10 Modified Objects

- Matter;
- Case Master Story if updated;
- Assertions;
- Risks;
- Workflow State.

## 7.11 Required Outputs

- structured opposing-case docket/index;
- paragraph or section index;
- allegation list;
- procedural timeline;
- reconciliation report;
- contradiction list;
- evidence-needs register for W4;
- updated routing to W4.

## 7.12 Exit Conditions

W3 is complete when:

- opposing materials are processed;
- allegations are classified as opposing-party alleged;
- contradictions with W2 story are recorded;
- material gaps are identified;
- evidence-needs register exists;
- W4 handoff package is ready.

## 7.13 Governance Gates

- opposing allegations must not become verified facts;
- source references must be preserved;
- client story changes must be versioned;
- contradictions must be visible;
- defense evidence requests should be targeted after reconciliation.

## 7.14 Failure States

- incomplete opposing file;
- unreadable materials;
- missing translations;
- unclear procedural posture;
- critical contradiction with client story;
- unsupported client denial;
- urgent procedural deadline.

## 7.15 Handoff Package

To W4:

- evidence-needs register;
- opposing allegation list;
- contradiction list;
- target evidence categories;
- procedural timeline;
- source index;
- updated Case Master Story if changed.

## 7.16 Re-entry Triggers

- new court filing;
- new prosecution/plaintiff evidence;
- amended complaint/indictment;
- client correction;
- W5 identifies missing opposing material;
- W9 identifies unaddressed allegation.

## 7.17 MVP Version

W3-lite is optional unless defense-side MVP is first.

If included, minimum:

- upload opposing file;
- extract text;
- create allegation list;
- compare to W2 story;
- create reconciliation report;
- produce evidence-needs list.

## 7.18 Target-State Version

Target-state W3 supports full docket ingestion, paragraph-level indexing, multilingual court-file handling, allegation-response mapping, and automated contradiction detection.

---

# Section 8 — W4 Evidence Intake

## 8.1 Workflow ID

`W4_evidence_intake`

## 8.2 Purpose

W4 ingests, processes, catalogs, classifies, and extracts evidence using pathway-specific tooling.

It creates structured Evidence Objects and Evidence Extraction Objects and must never substitute derived markdown/JSON for the preserved original upload.

## 8.3 Scope

W4 begins when an evidence-needs register or evidence upload exists.

W4 ends when evidence is stored, processed, classified into an extraction pathway, converted into lawful derived artifacts (markdown, structured JSON, transcripts, OCR, visual descriptions where applicable), and ready for W5 support mapping under visible quality discipline.

## 8.4 W4 Extraction Pathways

### Parser-First / OCR-Assisted Doctrine

For **supported document-like** files—including normal PDFs, **scanned PDFs** (where tooling supports them), **PDFs composed of screenshots**, **chat or message screenshots** (standalone or bundled in PDFs), and **image-based document pages**—LEXOS uses **LlamaParse or an equivalent layout-aware parser as the primary extraction layer** where supported.

**OCR** is a **supporting** capability used to detect visible text from pixels. **Vision/layout models** may support structure recovery, message reconstruction, table fidelity, handwriting hints, comparator QA, and evidentiary context. **OCR alone is not sufficient** for accepted final W4 extraction for these document-like items unless no parser/vision pathway is available and the run is explicitly treated as fallback with `qa_flagged` or `human_review_required` (or human-reviewed and accepted).

The required outputs remain: **markdown extraction** + **structured JSON extraction** (not raw OCR text alone as final deliverables), plus page/screenshot anchors, attribution/timestamps **where applicable**, layout/table/message reconstruction **where material**, **extraction quality status**, quality flags, and human-review flags when warranted.

---

W4 must classify each uploaded evidence item and route it through exactly one primary pathway unless the system documents an explicit **secondary pass** (for example OCR as a supporting pixel-text signal alongside parser output, reconciled via QA—not “OCR instead of parsing”).

1. **Text document pathway**  
   - PDF, DOCX, TXT, email export, message export (native/digital text-bearing).  
   - **LlamaParse or equivalent layout-aware parser** as primary extraction where supported.  
   - Markdown output (derived).  
   - Structured JSON output (derived).  
   - Extraction QA pass where supported.

2. **Scanned document / image-with-text / screenshot-PDF pathway**  
   - **Primary:** LlamaParse or an equivalent **layout-aware parser** where supported (including classes of scanned/image PDFs handled by hosted multimodal parsers).  
   - **Supporting:** OCR and/or vision for pixel-visible text detection, bubble/thread layout interpretation, handwriting hints, QA against parser output.  
   - **Required outputs:** markdown + structured JSON that reconstruct or preserve **material layout/evidentiary structure** (tables, headings, message boundaries, attribution where obtainable)—**not accepted final extraction consisting of raw OCR text alone** absent explicit fallback/disposition flags.  
   - Quality flags, low-confidence handling, **`qa_flagged`** / **`human_review_required`** when structure is material but only raw OCR is available.

Example (non-limiting):

   > A **PDF consisting of screenshots of WhatsApp messages** is **document-like** evidence: LEXOS expects **parser-first, OCR/vision-assisted** extraction. The ingestion goal includes reconstructing chat/message structure, timestamps, **sender attribution** where visible, date separators, attachment/placeholder cues, and page/screenshot references into **markdown and JSON**—unless tooling cannot support reconstruction, in which case the item remains **QA-flagged / human-reviewed** rather than silently “complete.”

3. **Image-without-text pathway**  
   - Original image preservation as evidentiary anchor.  
   - Machine-generated visual description; scene/object labels.  
   - Metadata extraction.  
   - Markdown summary.  
   - Structured JSON representation.  
   - Human review flag when legally material.

4. **Audio pathway**  
   - Original audio preservation.  
   - Speech-to-text; timestamped transcript.  
   - Speaker segmentation where possible.  
   - Markdown transcript.  
   - Structured JSON.  
   - Quality flags; human review flag.

5. **Video pathway**  
   - Original video preservation.  
   - Metadata extraction.  
   - Audio extraction and transcription where available.  
   - Keyframe or scene analysis where enabled; **supporting OCR/vision passes on frames** where enabled (still subject to multimodal QA—**not OCR-only substitutes** for structured markdown + JSON excerpts absent pathway policy).  
   - Visual timeline.  
   - Markdown/JSON extraction.  
   - Quality flags.  
   - Target-state unless explicitly enabled for MVP builds.

Across all pathways, **the original file remains the evidentiary anchor**. Markdown, JSON, transcripts, visual descriptions, OCR, embeddings, and agent-readable summaries are **derived artifacts** that must retain provenance to the Evidence Object and Evidence Extraction Object.

## 8.5 Entry Conditions

Required:

- Client exists;
- Matter exists;
- evidence upload or evidence-needs list exists;
- matter scope is clear.

## 8.6 Required Inputs

- uploaded digital documents in MVP;
- evidence source/uploader;
- matter ID;
- evidence type where known;
- privilege/confidentiality status where known.

Target-state may include physical, audio, video, images, and forensic materials.

## 8.7 Optional Inputs

- evidence-needs register;
- exhibit labels;
- translations;
- source notes;
- chain-of-custody data;
- metadata notes.

## 8.8 Primary Agents

- Evidence Archivist;
- Governance Gatekeeper;
- Translation Agent where needed.

MVP:

- Evidence Ingest Agent.

## 8.9 Permitted Tools

- file upload/storage;
- **LlamaParse or equivalent layout-aware document parser** (primary for supported document-like files);
- **OCR / vision tooling** as **supporting** pixel-text detection, layout/message reconstruction, and QA (not substitutes for markdown/JSON final outputs);
- markdown extraction;
- JSON extraction;
- metadata extraction;
- vector embedding;
- malware scanning;
- translation tools where required.

## 8.10 Created Objects

- Evidence Objects;
- Source Objects;
- Evidence Extraction Objects;
- Translation Objects where needed;
- Audit Events;
- Risk Objects for extraction/privilege/security issues;
- Output Artifact: Evidence Register.

## 8.11 Modified Objects

- Matter;
- Workflow State;
- Evidence processing status;
- Evidence-needs register;
- Risk records.

## 8.12 Required Outputs

- Evidence Register;
- Evidence Objects;
- Evidence Extraction Objects;
- markdown extraction (derived);
- structured JSON extraction (derived);
- extraction quality status;
- quality flags;
- processing status;
- optional or current embeddings linked to evidence_id and extraction_id;
- W5 handoff package.

## 8.13 Exit Conditions

W4 is complete when:

- evidence files are stored;
- each evidence item has Evidence Object;
- extraction attempted or `not_applicable` status documented with rationale for explicitly unsupported modalities;
- for supported modalities, Evidence Extraction Object exists capturing markdown + JSON (or flagged failure/disposition);
- processing status updated;
- quality flags recorded;
- evidence is linked to matter;
- W5 can access evidence without mistaking QA-flagged or failed extracts as authoritative.

## 8.14 Governance Gates

- no anonymous evidence;
- original file preserved as the evidentiary anchor;
- extraction outputs (markdown, JSON, OCR, transcripts, embeddings, summaries) remain derived artifacts—they do not replace the original;
- markdown/JSON must be treated explicitly as derived in downstream agents and prompts until reviewed;
- low-confidence extraction must be QA flagged and cannot silently pass as authoritative text;
- **raw OCR text alone is not sufficient as accepted W4 extraction for document-like evidence** where layout, table structure, **message attribution/chronology**, or similar structure is materially significant—unless no parser/vision pathway exists and the item is marked **`qa_flagged`** / **`human_review_required`** or has been human-reviewed and accepted per policy;
- visual descriptions, transcripts, and OCR must not be promoted to verified facts without human review aligned to governance rules;
- embeddings must carry client_id, matter_id, evidence_id, extraction_id, privilege, and confidentiality metadata;
- failed or QA-flagged extraction cannot be silently used by agents as reliable support;
- privilege/confidentiality status recorded at Evidence Object and propagated to derived artifacts unless reviewed;
- failed extraction cannot be marked processed-complete without visible failure disposition.

## 8.15 Failure States

- upload failure;
- unreadable document;
- extraction failure;
- unsupported file type;
- missing matter ID;
- suspected privilege issue;
- suspected security/malware issue;
- low-quality extraction.

## 8.16 Handoff Package

To W5:

- Evidence Register;
- Evidence Objects;
- extraction outputs;
- quality flags;
- evidence types;
- privilege/confidentiality notes;
- missing evidence list;
- processing failures.

## 8.17 Re-entry Triggers

- new evidence uploaded;
- extraction failure corrected;
- W5 requests reprocessing;
- W9 requests evidence review;
- translation correction;
- exhibit preparation requires additional processing.

## 8.18 MVP Version

MVP W4-lite must support enhanced digital document ingestion aligned to **Document 8 — MVP Scope and Build Specification**, Section **11.4** (normative outputs, statuses, quality enums, and file-type matrix).

**Supported MVP file types (markdown + structured JSON when the relevant parser/OCR/vision lane is configured):** PDF; DOCX; TXT; **scanned PDFs and PDFs composed of screenshots/chat or message screenshots** only through **parser-first, OCR/vision-assisted** lanes where tooling permits (**OCR-only** is fallback and must be flagged **`qa_flagged`** / **`requires_human_review`** / **`human_review_required`** unless human-reviewed and accepted); standalone **screenshots or images with visible text** via **parser/vision-assisted structure or reconstruction** toward markdown/JSON—not treated as ordinary **OCR-only** final extraction by default.

**Optional MVP file types (feature-flag pathways; same QA and review discipline):** image without text (description/metadata lane); audio (transcription when tooling is enabled).

**Deferred / limited:** advanced video analysis; forensic chain of custody automation; certified transcription and certified translation workflows (machine outputs remain flagged derivatives).

Across all lanes, W4-lite must preserve originals, produce markdown and structured JSON extraction outputs for supported types, persist `extraction_quality_status` and flags, optionally create embeddings tied to Evidence and Evidence Extraction records, and surface `failed` / `qa_flagged` / `human_review_required` / `requires_human_review` states visibly.

No full forensic chain-of-custody tooling is assumed in MVP, but ingestion quality, provenance linkage, and non-silent failures are mandatory.

## 8.19 Target-State Version

Target-state W4 supports all-media ingest, forensic metadata, chain-of-custody, hashing, authenticity classification, admissibility notes, advanced OCR/vision, and exhibit preparation.

---

# Section 9 — W5 Story-Evidence Alignment and Fact Support

## 9.1 Workflow ID

`W5_story_evidence_alignment`

## 9.2 Purpose

W5 maps the Case Master Story and Assertions to Evidence.

It determines which facts are supported, partially supported, unsupported, contradicted, or pending.

## 9.3 Scope

W5 begins after W4 evidence is available.

W5 ends when:

- support matrix exists;
- unsupported facts are listed;
- contradictions are recorded;
- fact-promotion requests are prepared where appropriate;
- W6 receives supported-fact package.

## 9.4 Entry Conditions

Required:

- Matter exists;
- Case Master Story exists;
- Assertion list exists;
- Evidence Objects exist or W5 is explicitly marked preliminary;
- W4 processing status sufficient for analysis.

## 9.5 Required Inputs

- Case Master Story;
- Assertion Objects;
- Evidence Register;
- Evidence Extractions;
- W3 reconciliation report where applicable;
- jurisdiction/matter posture.

## 9.6 Optional Inputs

- W1 Client Facts;
- research notes;
- translations;
- witness/pending testimony notes;
- client clarification responses.

## 9.7 Primary Agents

- Analyst;
- Evidence Archivist support;
- Story Architect support;
- Governance Gatekeeper.

MVP:

- Fact Support Agent.

## 9.8 Permitted Tools

- matter-scoped retrieval;
- evidence search;
- assertion extraction;
- support matrix generator;
- contradiction detection;
- source linking;
- translation view;
- document viewer.

## 9.9 Created Objects

- Support Matrix Artifact;
- updated Assertion support states;
- Contradiction Objects;
- Risk Objects;
- Client Gap Report;
- Evidence Gap List;
- Fact Promotion Requests;
- Pending Testimony Register if needed;
- Audit Events.

## 9.10 Modified Objects

- Assertions;
- Timeline Events;
- Risks;
- Workflow State;
- Case Master Story if returned for revision.

## 9.11 Required Outputs

- Story-Evidence Support Matrix;
- unsupported facts list;
- partially supported facts list;
- contradicted facts list;
- evidence gap list;
- client clarification list;
- fact promotion requests;
- supported-fact package for W6.

## 9.12 Exit Conditions

W5 is complete when:

- all material assertions have support status;
- evidence links exist where support is claimed;
- contradictions are recorded;
- unresolved gaps are listed;
- risks are updated;
- W6 receives support package.

## 9.13 Governance Gates

- no supported status without evidence/source link;
- partially supported facts must identify missing portion;
- contradicted assertions must not be hidden;
- unsupported material facts must appear in handoff;
- fact promotion to W1 requires Promotion Request.

## 9.14 Failure States

- no usable evidence;
- extraction too poor;
- unsupported core facts;
- critical contradiction;
- missing opposing file;
- unclear assertion granularity;
- privilege limitation prevents evidence use.

## 9.15 Handoff Package

To W6:

- support matrix;
- supported facts;
- partially supported facts;
- unsupported facts;
- contradicted facts;
- key evidence IDs;
- evidence gaps;
- risks;
- pending testimony;
- fact-promotion status.

## 9.16 Re-entry Triggers

- new evidence;
- corrected extraction;
- W7 research changes materiality;
- W8 drafting exposes unsupported claim;
- W9 adversarial critique identifies weak support;
- client correction.

## 9.17 MVP Version

W5-lite is mandatory.

Minimum:

- assertion list;
- evidence links;
- support states;
- unsupported facts;
- contradiction flag;
- support matrix artifact.

## 9.18 Target-State Version

Target-state W5 supports advanced evidence reasoning, support scoring, contradiction severity, testimony tracking, admissibility overlays, and automated fact promotion proposals.

---

# Section 10 — W6 Case Strategy

## 10.1 Workflow ID

`W6_case_strategy`

## 10.2 Purpose

W6 transforms supported facts, risks, and legal posture into strategic legal positions.

Plaintiff-side W6 develops attack lines.  
Defense-side W6 develops defense lines.

## 10.3 Scope

W6 begins after W5 support package exists.

W6 ends when Strategy Points and Strategy Memo are prepared for W7 research and W8 argument development.

## 10.4 Entry Conditions

Required:

- Matter exists;
- support matrix exists;
- material assertions have support state;
- jurisdiction known;
- matter posture known.

## 10.5 Required Inputs

- support matrix;
- supported facts;
- unsupported/gap list;
- contradictions;
- risks;
- matter posture;
- jurisdiction;
- client objectives where available.

## 10.6 Optional Inputs

- preliminary legal research;
- prior similar strategy;
- W1 client context;
- procedural deadlines;
- client risk preferences.

## 10.7 Primary Agents

- Strategist;
- Analyst support;
- Librarian support;
- Governance Gatekeeper.

MVP:

- Strategy Agent.

## 10.8 Permitted Tools

- support matrix retrieval;
- legal issue templates;
- prior approved strategy retrieval if authorized;
- risk assessment;
- research request generator.

## 10.9 Created Objects

- Strategy Points;
- Strategy Memo;
- Research Requests;
- Risk Objects;
- Output Artifact;
- Audit Events.

## 10.10 Modified Objects

- Risk;
- Workflow State;
- Strategy Points;
- Matter strategy status.

## 10.11 Required Outputs

- Strategy Memo;
- list of Strategy Points;
- strongest points;
- weakest points;
- missing evidence;
- legal research questions for W7;
- risk-weighted recommendation;
- W7 handoff.

## 10.12 Exit Conditions

W6 is complete when:

- Strategy Points exist;
- each Strategy Point links to supporting assertions/evidence where applicable;
- major weaknesses are recorded;
- W7 research questions are prepared;
- risks are updated.

## 10.13 Governance Gates

- strategy must identify unsupported dependencies;
- strategy must not assume facts unsupported by W5;
- legal theories needing research must be marked;
- high-risk strategies must create Risk Objects.

## 10.14 Failure States

- no viable supported strategy;
- core facts unsupported;
- critical contradiction unresolved;
- jurisdiction unclear;
- client objective unclear;
- procedural option unavailable.

## 10.15 Handoff Package

To W7:

- Strategy Memo;
- Strategy Points;
- research questions;
- key facts;
- support matrix references;
- adverse issues to check;
- risks and assumptions.

## 10.16 Re-entry Triggers

- W7 adverse authority;
- W9 critique;
- new evidence;
- client changes objective;
- procedural change.

## 10.17 MVP Version

W6-lite produces:

- concise Strategy Memo;
- strategy points;
- strongest/weakest points;
- missing evidence;
- research questions.

## 10.18 Target-State Version

Target-state W6 supports multi-strategy comparison, probability/risk scoring, procedural tactic mapping, leverage analysis, client objective optimization, and strategy simulation.

---

# Section 11 — W7 Memo Research and Strategy Loop

## 11.1 Workflow ID

`W7_memo_research_loop`

## 11.2 Purpose

W7 researches Strategy Points and legal questions generated by W6.

It validates legal theories, identifies authority, checks adverse law, and returns research findings to strategy and argument workflows.

## 11.3 Scope

W7 begins when W6 provides research questions.

W7 ends when Research Memos are complete enough to support W8 or return W6/W5 for revision.

## 11.4 Entry Conditions

Required:

- Strategy Points exist;
- research questions exist;
- jurisdiction known;
- relevant facts identified.

## 11.5 Required Inputs

- Strategy Memo;
- Strategy Points;
- research questions;
- jurisdiction;
- relevant supported facts;
- risk list.

## 11.6 Optional Inputs

- legal authorities already known;
- external counsel notes;
- local practice notes;
- procedural rules;
- foreign-law materials.

## 11.7 Primary Agents

- Librarian;
- Citation Verification Controller target-state;
- Jurisdictional Compliance Controller target-state;
- Strategist support.

MVP:

- Research Agent.

## 11.8 Permitted Tools

- legal research databases;
- web search where allowed;
- public legal sources;
- citation checker;
- source storage;
- authority extraction;
- research memo generator.

## 11.9 Created Objects

- Legal Authority Objects;
- Research Memos;
- adverse authority lists;
- Citation Risk Objects;
- Legal Risk Objects;
- Research Output Artifacts;
- Audit Events.

## 11.10 Modified Objects

- Strategy Points;
- Risks;
- Workflow State;
- Research Memo status.

## 11.11 Required Outputs

- Research Memo per major strategy question;
- authority list;
- adverse authority note;
- jurisdictional scope;
- legal confidence;
- citation confidence where possible;
- recommendation to proceed, revise, or reject strategy.

## 11.12 Exit Conditions

W7 is complete when:

- research question answered or marked unresolved;
- sources/authorities are linked;
- adverse authority considered where available;
- research limitations stated;
- strategy effect identified;
- W6 or W8 handoff prepared.

## 11.13 Governance Gates

- AI-generated research is draft until sources verified;
- jurisdiction must be stated;
- legal authority must not be hallucinated;
- adverse authority risk must be visible;
- unverified citations cannot support filing-ready output.

## 11.14 Failure States

- no reliable sources found;
- jurisdiction unclear;
- legal authority unavailable;
- adverse authority undermines strategy;
- citation cannot be verified;
- research tool failure;
- foreign-law issue requires expert/local counsel.

## 11.15 Handoff Package

To W6:

- research findings requiring strategy revision;
- adverse law;
- legal risk;
- rejected theories.

To W8:

- approved/usable research memo;
- legal authorities;
- legal test/standard;
- argument support;
- limitations and risks.

## 11.16 Re-entry Triggers

- new legal issue;
- adverse authority discovered;
- jurisdiction changes;
- W9 critique identifies research gap;
- court ruling changes law;
- citation verification fails.

## 11.17 MVP Version

W7-lite produces:

- research memo;
- source/authority list;
- jurisdiction assumption;
- adverse authority note where found;
- research limitations.

Full citation verification may be deferred but citation status must be visible.

## 11.18 Target-State Version

Target-state W7 supports comprehensive legal research, citation verification, adverse authority automation, jurisdiction profiles, authority treatment tracking, and recursive strategy updates.

---

# Section 12 — W8 Argument Engineering

## 12.1 Workflow ID

`W8_argument_engineering`

## 12.2 Purpose

W8 converts strategy, supported facts, evidence, and research into structured legal arguments.

## 12.3 Scope

W8 begins after W6 and W7 provide sufficient strategy and research.

W8 ends when Argument Draft and Argument Nodes are ready for W9 adversarial review.

## 12.4 Entry Conditions

Required:

- Strategy Memo exists;
- Research Memo exists or research waived/marked preliminary;
- support matrix exists;
- material assertions have support states;
- jurisdiction known;
- unresolved critical contradictions are not blocking or are marked.

## 12.5 Required Inputs

- Strategy Points;
- Research Memos;
- Legal Authorities;
- supported facts;
- evidence links;
- risks;
- matter posture;
- intended audience.

## 12.6 Optional Inputs

- sample filings;
- jurisdiction-specific style guidance;
- prior arguments;
- client preferences;
- translation requirements.

## 12.7 Primary Agents

- Advocate;
- Librarian support;
- Analyst support;
- Governance Gatekeeper.

MVP:

- Argument Agent.

## 12.8 Permitted Tools

- matter-scoped retrieval;
- document generation;
- citation insertion;
- argument template library;
- legal authority retrieval;
- evidence reference retrieval.

## 12.9 Created Objects

- Argument Nodes;
- Argument Draft;
- Output Artifact;
- Risk Objects for unsupported/weak arguments;
- Audit Events.

## 12.10 Modified Objects

- Strategy Points status;
- Risks;
- Workflow State;
- Output Artifact status.

## 12.11 Required Outputs

- structured Argument Draft;
- argument node list;
- evidence-linked factual propositions;
- legal authority references;
- unsupported claim flags;
- risk notes;
- W9 handoff.

## 12.12 Exit Conditions

W8 is complete when:

- argument draft exists;
- major claims are linked to assertions/evidence/authority;
- unsupported claims are flagged;
- artifact status is `internal_draft` or equivalent;
- W9 target package exists.

## 12.13 Governance Gates

- W8 may not create new unsupported facts without routing them to W5;
- W8 may not mark filing-ready;
- W8 may not alter evidence records;
- citation status must be visible;
- arguments depending on weak facts must be flagged.

## 12.14 Failure States

- insufficient supported facts;
- missing research;
- unverified legal authority;
- critical contradiction;
- unsupported material claim;
- unclear audience;
- jurisdiction/style mismatch.

## 12.15 Handoff Package

To W9:

- Argument Draft;
- Argument Nodes;
- support matrix;
- evidence links;
- research memos;
- legal authorities;
- risk list;
- unsupported claims.

## 12.16 Re-entry Triggers

- W9 critique;
- W7 research update;
- W5 support downgrade;
- client correction;
- new evidence;
- governance review failure.

## 12.17 MVP Version

W8-lite generates:

- argument draft;
- source/evidence references where available;
- unsupported claim flags;
- artifact version.

## 12.18 Target-State Version

Target-state W8 supports modular argument-node assembly, element mapping, allegation-response matrices, citation integration, jurisdiction-specific formatting, and automated dependency tracking.

---

# Section 13 — W9 Adversarial Stress-Test

## 13.1 Workflow ID

`W9_adversarial_stress_test`

## 13.2 Purpose

W9 attacks W8 outputs from opposing counsel, prosecutor, regulator, judge, or skeptical decision-maker perspective.

## 13.3 Scope

W9 begins when W8 provides Argument Draft and support materials.

W9 ends when adversarial critique is created, weaknesses are classified, and W8 revision instructions are prepared.

## 13.4 Entry Conditions

Required:

- Argument Draft exists;
- support matrix available;
- research memo available or marked preliminary;
- evidence links available;
- matter posture known.

## 13.5 Required Inputs

- Argument Draft;
- Argument Nodes;
- support matrix;
- evidence register;
- research memo;
- legal authorities;
- risks;
- contradictions;
- intended audience.

## 13.6 Optional Inputs

- opposing pleadings;
- judge/regulator profile;
- procedural posture;
- prior adverse rulings;
- client risk preferences.

## 13.7 Primary Agents

- Adversary;
- Citation Verification Controller target-state;
- Epistemic Integrity Auditor target-state;
- Jurisdictional Compliance Controller target-state.

MVP:

- Adversarial Review Agent.

## 13.8 Permitted Tools

- matter-scoped retrieval;
- legal authority search;
- evidence review;
- contradiction search;
- critique generator;
- risk updater.

## 13.9 Created Objects

- Adversarial Critique Objects;
- Attack Matrix;
- Weakness Register;
- Revision Checklist;
- Risk Objects;
- Contradiction Objects if discovered;
- Review Events;
- Audit Events.

## 13.10 Modified Objects

- Risks;
- Argument Draft status;
- Workflow State;
- Strategy Points if critique affects strategy.

## 13.11 Required Outputs

- Adversarial Critique Artifact;
- attack list;
- weakness severity;
- recommended fixes;
- unresolved critical issues;
- loop decision: return to W8, W7, W6, W5, or proceed.

## 13.12 Exit Conditions

W9 is complete when:

- critique exists;
- each major weakness has severity;
- recommended fixes are listed;
- unresolved blockers are identified;
- downstream route is decided.

## 13.13 Governance Gates

- W9 must not be deferential;
- W9 must preserve unresolved weaknesses;
- critical unresolved critique blocks finalization;
- W9 may recommend but not silently rewrite final draft.

## 13.14 Failure States

- insufficient source material for critique;
- critique too generic;
- failure to identify obvious unsupported claim;
- missing adverse law review;
- critical weakness with no resolution route.

## 13.15 Handoff Package

To W8:

- critique;
- revision checklist;
- unsupported/overstated claims;
- suggested changes.

To W7:

- legal research gaps;
- adverse authority issues.

To W5:

- support gaps;
- factual contradictions.

To W6:

- strategy-level weakness.

## 13.16 Re-entry Triggers

- revised argument from W8;
- new evidence;
- new authority;
- human reviewer challenge;
- court/opposition development.

## 13.17 MVP Version

W9-lite is mandatory.

Minimum:

- adversarial critique;
- attack type;
- severity;
- recommended fix;
- revision checklist.

## 13.18 Target-State Version

Target-state W9 supports independent adversarial panels, multi-model critique, opponent simulation, judge/regulator skepticism, risk scoring, and loop exit certification.

---

# Section 14 — W10 Visual Exhibit Production

## 14.1 Workflow ID

`W10_visual_exhibit_production`

## 14.2 Purpose

W10 creates visual legal artifacts that clarify facts, evidence, timelines, entities, transactions, procedures, or argument structure.

## 14.3 Scope

W10 begins after arguments and evidence structure are sufficiently stable.

W10 ends when visual exhibits are source-linked and ready for W11 integration.

## 14.4 Entry Conditions

Required:

- argument draft or strategy memo exists;
- evidence and assertions are structured;
- visual need identified;
- source data available.

## 14.5 Required Inputs

- argument draft;
- support matrix;
- evidence links;
- timeline events;
- persons/entities/relationships where applicable;
- intended audience.

## 14.6 Optional Inputs

- style requirements;
- court filing requirements;
- branding;
- translation requirements;
- chart templates.

## 14.7 Primary Agents

- Visualizer;
- Analyst support;
- Advocate support;
- Governance Gatekeeper.

MVP:

- usually deferred.

## 14.8 Permitted Tools

- charting tools;
- diagram generation;
- timeline generation;
- table generation;
- document generation;
- evidence retrieval.

## 14.9 Created Objects

- Visual Artifact;
- Output Artifact;
- source data table;
- risk objects for visual ambiguity;
- Audit Events.

## 14.10 Modified Objects

- Output Artifact;
- Argument Draft if visual references added;
- Risk.

## 14.11 Required Outputs

- timeline;
- entity map;
- transaction flow;
- evidence chart;
- procedural diagram;
- or other visual artifact;
- source linkage;
- assumptions note;
- W11 handoff.

## 14.12 Exit Conditions

W10 is complete when:

- visual artifact exists;
- all visual claims link to source/evidence;
- assumptions are stated;
- artifact status assigned;
- W11 integration package prepared.

## 14.13 Governance Gates

- visuals must not distort evidence;
- unsupported visual claims prohibited;
- assumptions must be visible;
- source data must be preserved;
- translated visuals must preserve meaning.

## 14.14 Failure States

- insufficient source data;
- misleading simplification;
- unsupported visual relationship;
- unclear audience;
- formatting unsuitable for forum.

## 14.15 Handoff Package

To W11:

- visual artifact;
- source data;
- assumptions;
- evidence links;
- caption text;
- risk notes.

## 14.16 Re-entry Triggers

- argument changes;
- evidence changes;
- W11 detects inconsistency;
- court/client format change.

## 14.17 MVP Version

W10 may be deferred.

If included, MVP W10 may generate:

- simple timeline;
- evidence table;
- party/entity chart.

## 14.18 Target-State Version

Target-state W10 supports advanced litigation graphics, dynamic evidence maps, transaction diagrams, bilingual visuals, and court-ready exhibit packages.

---

# Section 15 — W11 Persuasive Refinement

## 15.1 Workflow ID

`W11_persuasive_refinement`

## 15.2 Purpose

W11 refines writing and visuals into a final presentation bundle while preserving truth discipline, evidence support, legal accuracy, and audience fit.

## 15.3 Scope

W11 begins after W8/W9 loop is stable and W10 visuals are available if used.

W11 ends when final internal or external-ready artifact is created, subject to applicable review.

## 15.4 Entry Conditions

Required:

- revised argument draft exists;
- W9 critique addressed or accepted;
- unresolved critical risks absent or accepted;
- source/evidence links available;
- intended audience known.

## 15.5 Required Inputs

- revised argument draft;
- adversarial critique and resolution;
- support matrix;
- research memos;
- evidence links;
- risk list;
- visual artifacts if any;
- audience requirements.

## 15.6 Optional Inputs

- style guide;
- court format rules;
- client communication preferences;
- translation requirements;
- human reviewer comments.

## 15.7 Primary Agents

- Rhetorician;
- Advocate support;
- Visualizer support;
- Output Certification Agent target-state.

MVP:

- Revision/Refinement Agent.

## 15.8 Permitted Tools

- document editor;
- style refinement;
- grammar tools;
- citation formatting;
- translation tools;
- visual integration;
- export tools.

## 15.9 Created Objects

- Revised Output Artifact;
- Final Presentation Bundle;
- Review Event;
- Risk updates;
- Audit Events.

## 15.10 Modified Objects

- Argument Draft;
- Output Artifact status;
- Visual Artifact;
- Risks.

## 15.11 Required Outputs

- refined final internal draft;
- integrated visuals if any;
- caveat preservation check;
- source support check;
- status classification;
- final handoff for human/system certification if required.

## 15.12 Exit Conditions

W11 is complete when:

- refined artifact exists;
- source/evidence support preserved;
- no new unsupported facts introduced;
- artifact status assigned;
- review status recorded;
- final bundle created or deferred.

## 15.13 Governance Gates

- W11 may not invent facts;
- W11 may not erase necessary caveats;
- W11 may not change truth/support state;
- W11 may not convert draft into filing-ready without certification;
- privilege/confidentiality must be checked before external use.

## 15.14 Failure States

- rhetorical edits change meaning;
- unsupported fact introduced;
- caveat removed;
- visual and text inconsistent;
- audience mismatch;
- unresolved W9 critique.

## 15.15 Handoff Package

To final review/certification:

- refined artifact;
- source support summary;
- unresolved risks;
- resolved W9 critique;
- review events;
- intended audience;
- recommended status.

## 15.16 Re-entry Triggers

- human reviewer changes;
- source support issue;
- W9 critique reopened;
- new evidence;
- legal research update;
- translation issue.

## 15.17 MVP Version

W11-lite produces:

- revised argument after W9 critique;
- final internal draft status;
- versioned output artifact.

It does not create court-filing-ready status unless human review is explicitly recorded.

## 15.18 Target-State Version

Target-state W11 supports audience-specific persuasion, court-specific formatting, bilingual finalization, visual integration, output certification, and external-ready package preparation.

---

# Section 16 — Cross-Workflow Objects and Artifacts

## 16.1 Purpose

Some objects span multiple workflows.

This section defines their workflow role.

## 16.2 Case Master Story

Created by:

- W2.

Modified by:

- W2;
- W3 through reconciliation;
- W5 through support analysis;
- W11 only for presentation, not truth.

Used by:

- W3;
- W5;
- W6;
- W8.

## 16.3 Evidence Register

Created by:

- W4.

Modified by:

- W4;
- W5 for linkage;
- W10 for exhibit references.

Used by:

- W5;
- W8;
- W9;
- W10.

## 16.4 Support Matrix

Created by:

- W5.

Used by:

- W6;
- W8;
- W9;
- W11.

Modified by:

- W5 only, unless governance allows.

## 16.5 Strategy Memo

Created by:

- W6.

Updated by:

- W6 after W7/W9 feedback.

Used by:

- W7;
- W8;
- W9.

## 16.6 Research Memo

Created by:

- W7.

Used by:

- W6;
- W8;
- W9;
- W11.

## 16.7 Argument Draft

Created by:

- W8.

Critiqued by:

- W9.

Refined by:

- W11.

## 16.8 Adversarial Critique

Created by:

- W9.

Used by:

- W8;
- W6;
- W7;
- W5;
- W11.

## 16.9 Final Presentation Bundle

Created by:

- W11.

May include:

- argument;
- visuals;
- citations;
- evidence references;
- risk notes;
- translations;
- review status.

---

# Section 17 — Workflow Gate Summary

## 17.1 W0 Gate

Can W0 close?

Required:

- client accepted/declined;
- status recorded;
- Client/Matter created if accepted;
- risk status visible.

## 17.2 W1 Gate

Can W1 update client memory?

Required:

- source or promotion basis;
- verification status;
- privilege/confidentiality check;
- audit event.

## 17.3 W2 Gate

Can W2 close?

Required:

- Case Master Story;
- Assertions;
- gaps;
- risks;
- routing decision.

## 17.4 W3 Gate

Can W3 close?

Required:

- opposing file index;
- allegation list;
- reconciliation report;
- evidence-needs register.

## 17.5 W4 Gate

Can W4 close?

Required:

- Evidence Objects;
- extraction attempted/status recorded;
- Evidence Register;
- processing failures visible.

## 17.6 W5 Gate

Can W5 close?

Required:

- all material assertions assigned support status;
- evidence links where supported;
- unsupported facts listed;
- contradictions recorded;
- support matrix created.

## 17.7 W6 Gate

Can W6 close?

Required:

- Strategy Points;
- Strategy Memo;
- research questions;
- risks/assumptions visible.

## 17.8 W7 Gate

Can W7 close?

Required:

- Research Memo;
- sources/authorities linked;
- jurisdiction stated;
- adverse authority noted or limitation stated.

## 17.9 W8 Gate

Can W8 close?

Required:

- Argument Draft;
- argument nodes or sections;
- source/evidence/legal authority links;
- unsupported claims flagged.

## 17.10 W9 Gate

Can W9 close?

Required:

- Adversarial Critique;
- severity classification;
- recommended fixes;
- loop decision.

## 17.11 W10 Gate

Can W10 close?

Required:

- visual artifact;
- source linkage;
- assumptions note.

## 17.12 W11 Gate

Can W11 close?

Required:

- revised artifact;
- no unauthorized truth changes;
- source support preserved;
- status assigned;
- review/certification status recorded.

---

# Section 18 — Workflow Failure and Escalation

## 18.1 Failure Object Rule

Material workflow failures should create:

- Risk Object;
- Workflow Event;
- Audit Event;
- next action.

## 18.2 Common Failure Types

- missing required input;
- unclear matter scope;
- unclear jurisdiction;
- extraction failure;
- unsupported material assertion;
- critical contradiction;
- privilege issue;
- citation uncertainty;
- agent role drift;
- tool failure;
- workflow timeout;
- human review pending.

## 18.3 Escalation Destinations

Escalation may route to:

- human reviewer;
- Governance Gatekeeper;
- W1 Custodian;
- W4 Evidence Archivist;
- W5 Analyst;
- W7 Librarian;
- W9 Adversary;
- system administrator;
- client clarification queue.

## 18.4 Blocking Rule

If a workflow is blocked, Workflow State must record:

- blocked flag;
- block reason;
- responsible actor/workflow;
- next action;
- risk link.

---

# Section 19 — MVP Workflow Specification

## 19.1 MVP Objective

The MVP should prove the legal cognition spine:

> Client → Matter → Story → Evidence → Assertions → Support Matrix → Strategy → Research → Argument → Adversarial Critique → Revised Output.

## 19.2 Required MVP Workflows

Required:

1. W1-lite;
2. W2-lite;
3. W4-lite;
4. W5-lite;
5. W6-lite;
6. W7-lite;
7. W8-lite;
8. W9-lite;
9. W11-lite.

Optional:

- W0-lite;
- W3-lite if defense-side MVP;
- W10-lite.

## 19.3 MVP Workflow Outputs

The MVP should produce:

- Client Record;
- Matter Record;
- Case Story Artifact;
- Evidence Register;
- Evidence Extractions;
- Assertion List;
- Support Matrix;
- Strategy Memo;
- Research Memo;
- Argument Draft;
- Adversarial Critique;
- Revised Output Artifact;
- Workflow State;
- Risk Records;
- Audit Events.

## 19.4 MVP Workflow Screens

Minimum screens/workspaces:

1. Client/Matter setup;
2. Case Story;
3. Evidence;
4. Assertions/Support Matrix;
5. Strategy/Research;
6. Argument Draft;
7. Adversarial Review;
8. Revised Output;
9. Workflow/Risk status.

## 19.5 MVP Workflow Red Lines

MVP must not:

- skip assertions;
- skip evidence objects;
- skip support matrix;
- skip W9 critique;
- allow unscoped retrieval;
- produce final external outputs;
- hide unsupported facts;
- mark output final by filename.

---

# Section 20 — Target-State Workflow Architecture

## 20.1 Target-State Direction

Target-state workflows should become:

- stateful;
- autonomous;
- recursive;
- risk-aware;
- privilege-aware;
- evidence-grounded;
- source-linked;
- auditable;
- governed by policy-as-code.

## 20.2 Workflow Engine Requirements

The target-state workflow engine should support:

- workflow instances;
- status transitions;
- entry/exit gates;
- task queues;
- agent assignment;
- tool calls;
- retries;
- failures;
- escalations;
- handoffs;
- re-openings;
- dependency tracking;
- artifact version tracking;
- risk blockers;
- autonomy levels.

## 20.3 Workflow Autonomy Maturity

Suggested maturity levels:

1. manual workflow tracking;
2. assisted workflow generation;
3. semi-automated workflow progression;
4. autonomous internal workflow execution;
5. exception-based workflow governance;
6. autonomous client-facing workflow;
7. autonomous external-action workflow.

## 20.4 Target-State Rule

Do not advance workflow autonomy faster than:

- object model maturity;
- governance maturity;
- retrieval safety;
- evidence reliability;
- risk visibility;
- model/tool reliability;
- auditability.

---

# Section 21 — Summary

LEXOS workflows operationalize the legal cognition architecture.

The W0–W11 workflow spine is:

1. W0 — Client Onboarding;
2. W1 — Client Master Record Management;
3. W2 — Case-Client Story;
4. W3 — Opposing Case File Intake and Story Reconciliation;
5. W4 — Evidence Intake;
6. W5 — Story-Evidence Alignment and Fact Support;
7. W6 — Case Strategy;
8. W7 — Memo Research and Strategy Loop;
9. W8 — Argument Engineering;
10. W9 — Adversarial Stress-Test;
11. W10 — Visual Exhibit Production;
12. W11 — Persuasive Refinement.

The MVP should implement a reduced but structurally correct version focused on:

- client/matter records;
- case story;
- digital evidence ingest;
- assertion support matrix;
- strategy memo;
- research memo;
- argument draft;
- adversarial critique;
- revised output.

The core workflow rules are:

1. Workflows transform defined inputs into defined objects and artifacts.
2. Completion requires exit conditions, not merely generated text.
3. Handoffs must include risks, contradictions, unsupported facts, and versions.
4. Defense-side matters require W3 before targeted evidence requests when opposing files define the case.
5. W4 creates evidence structure, not legal meaning.
6. W5 creates support discipline.
7. W6 creates strategy from supported facts.
8. W7 validates legal theories.
9. W8 drafts arguments from facts, law, evidence, and strategy.
10. W9 attacks the draft.
11. W11 refines without mutating truth.
12. MVP simplifies workflows, not foundations.