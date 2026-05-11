# Document 11 — LEXOS UI/UX and Operator Experience Specification

# Document Index and Agent Navigation Guide

## Purpose of This Index

This index helps human readers, AI coding agents, UI/UX agents, frontend agents, product agents, legal agents, and system architects quickly locate relevant UI/UX and operator experience rules in **Document 11 — LEXOS UI/UX and Operator Experience Specification**.

Document 11 defines the LEXOS interface, matter workspace, screen architecture, workflow visibility, risk visibility, evidence interface, support matrix, artifact review experience, agent-run visibility, and MVP UI requirements.

Agents should use this index before performing any UI, frontend, UX, product, MVP, workflow, or operator-experience task.

---

# Quick Navigation by Task

## If the task is about overall UI doctrine

Read:

- **Section 1 — Purpose and Scope**
- **Section 2 — UI/UX Design Principles**
- **Section 24 — Summary**

Use these sections to understand what the interface must accomplish.

Key concepts:

- expose legal cognition;
- object-centric interface;
- matter-first operation;
- status visibility;
- unsupported facts visible;
- draft finality discipline.

---

## If the task is about navigation or information architecture

Read:

- **Section 3 — Information Architecture**

Use this section when designing global navigation, matter navigation, tabs, routes, or workspace structure.

Key concepts:

- Dashboard;
- Clients;
- Matters;
- Evidence;
- Workflows;
- Risks;
- Artifacts;
- Matter Workspace tabs.

---

## If the task is about dashboard

Read:

- **Section 4 — Dashboard**

Use this section when designing the landing page, active matters view, blocker dashboard, risk summary, or agent activity summary.

Key concepts:

- active matters;
- blocked matters;
- high/critical risks;
- failed evidence processing;
- pending reviews;
- next actions.

---

## If the task is about client screens

Read:

- **Section 5 — Client Workspace**

Use this section when designing client detail, linked matters, client master story, client notes, or client-level memory UI.

Key concepts:

- Client Detail;
- linked matters;
- client-level memory;
- no automatic matter-to-client merge.

---

## If the task is about the Matter Workspace

Read:

- **Section 6 — Matter Workspace**

Use this section when designing matter overview, matter header, matter status cards, matter timeline, or the central workspace container.

Key concepts:

- persistent matter header;
- matter posture;
- jurisdiction;
- current workflow;
- risk summary;
- next action.

---

## If the task is about workflow UI

Read:

- **Section 7 — Workflow UI**

Use this section when designing workflow steppers, workflow states, workflow action buttons, workflow gates, or step completion logic.

Key concepts:

- W-lite workflow steps;
- step status;
- required inputs;
- outputs;
- blockers;
- gates;
- next action.

---

## If the task is about Case Story UI

Read:

- **Section 8 — Case Story Workspace**

Use this section when designing W2-lite UI, client narrative input, Case Story Artifact viewer, assertion extraction panel, gaps, vulnerabilities, or story generation buttons.

Key concepts:

- narrative input;
- Case Master Story;
- assertion extraction;
- gaps;
- vulnerabilities;
- preliminary risks.

---

## If the task is about Evidence UI

Read:

- **Section 9 — Evidence Workspace**

Use this section when designing upload flows, evidence tables, evidence detail, extracted text viewer, metadata editor, processing status, or evidence failure UI.

Key concepts:

- upload area;
- evidence table;
- original file;
- extracted text;
- processing status;
- privilege/confidentiality fields.

---

## If the task is about Assertions or Support Matrix UI

Read:

- **Section 10 — Assertion and Support Matrix Workspace**

Use this section when designing assertion tables, support-state filters, evidence linkage, unsupported facts panel, contradiction panel, or support matrix view.

Key concepts:

- assertion table;
- truth state;
- support state;
- use status;
- evidence links;
- unsupported facts;
- contradictions.

---

## If the task is about Strategy or Research UI

Read:

- **Section 11 — Strategy and Research Workspace**

Use this section when designing Strategy Memo viewer, Strategy Points, Research Questions, Research Memo, authorities/sources table, or strategy risk display.

Key concepts:

- Strategy Memo;
- Strategy Points;
- Research Questions;
- Research Memo;
- jurisdiction;
- authority verification status.

---

## If the task is about Argument Draft UI

Read:

- **Section 12 — Argument Draft Workspace**

Use this section when designing W8 UI, Argument Draft viewer, source basis panel, linked strategy/research/evidence, unsupported claim panel, or send-to-W9 action.

Key concepts:

- Argument Draft;
- source basis;
- linked Assertions;
- linked Evidence;
- artifact status;
- no filing-ready implication.

---

## If the task is about Adversarial Review UI

Read:

- **Section 13 — Adversarial Review Workspace**

Use this section when designing W9 UI, Attack Matrix, severity filters, revision checklist, loop decision, or unresolved blocker display.

Key concepts:

- Adversarial Critique;
- Attack Matrix;
- severity;
- recommended fixes;
- loop decision.

---

## If the task is about Revised Output UI

Read:

- **Section 14 — Revised Output Workspace**

Use this section when designing W11 UI, revised output viewer, revision summary, remaining risks, review status, artifact status controls, or export warnings.

Key concepts:

- Revised Output;
- revision summary;
- remaining risks;
- artifact status;
- review marker;
- export does not equal approval.

---

## If the task is about Risk or Governance UI

Read:

- **Section 15 — Risk and Governance UI**

Use this section when designing risk panels, governance checks, blocker banners, mitigation notes, or risk severity display.

Key concepts:

- Risk Panel;
- severity;
- blocker banner;
- governance check;
- required fixes.

---

## If the task is about Agent Run UI

Read:

- **Section 16 — Agent Run and Automation UI**

Use this section when designing agent-run cards, model-use display, input/output object links, failed run states, re-run controls, or agent output inspection.

Key concepts:

- agent run status;
- model used;
- input objects;
- output objects;
- failed runs;
- versioned re-runs.

---

## If the task is about Artifact or Version UI

Read:

- **Section 17 — Artifact and Version UI**

Use this section when designing artifact lists, artifact detail, source basis, version history, supersession, or artifact metadata.

Key concepts:

- artifact type;
- workflow origin;
- status;
- version;
- source basis;
- version history.

---

## If the task is about Activity or Audit UI

Read:

- **Section 18 — Activity and Audit UI**

Use this section when designing activity timelines, audit detail, status changes, evidence upload history, or agent-run activity.

Key concepts:

- activity timeline;
- audit detail;
- actor;
- event type;
- target object;
- sensitive audit access.

---

## If the task is about Search or Retrieval UI

Read:

- **Section 19 — Search and Retrieval UI**

Use this section when designing search bars, filters, retrieval results, search scope controls, or matter-scoped search.

Key concepts:

- active matter default;
- search scope;
- object-type filters;
- privilege/confidentiality labels;
- no global search by default.

---

## If the task is about MVP UI

Read:

- **Section 20 — MVP UI Requirements**
- **Section 23 — UI Testing and Acceptance Criteria**

Use these sections when implementing MVP frontend, coding UI tasks, or deciding whether the MVP UI is complete.

Key concepts:

- required MVP screens;
- required UI capabilities;
- UI deferrals;
- MVP UI red lines;
- end-to-end UI acceptance.

---

## If the task is about target-state UI

Read:

- **Section 21 — Target-State UI Direction**

Use this section when designing future UI modules beyond MVP.

Key concepts:

- Agent Operations Center;
- Governance Center;
- Evidence Vault;
- Model and Tool Registry UI;
- Privilege and Security Center;
- Learning Center;
- Filing Console.

---

## If the task is about frontend implementation components

Read:

- **Section 22 — UI Implementation Guidance**

Use this section when designing component architecture, reusable components, status badges, progressive disclosure, empty states, or error states.

Key concepts:

- MatterHeader;
- WorkflowStepper;
- RiskPanel;
- ArtifactViewer;
- EvidenceTable;
- AssertionTable;
- SupportMatrix;
- AgentRunCard.

---

## If the task is about UI testing

Read:

- **Section 23 — UI Testing and Acceptance Criteria**

Use this section when writing UI acceptance tests, QA plans, workflow tests, or operator comprehension checks.

Key concepts:

- MVP UI acceptance test;
- visibility criteria;
- safety criteria;
- operator comprehension.

---

# Section-by-Section Index

## Section 1 — Purpose and Scope

Use for:

- UI doctrine;
- document scope;
- legal cognition visibility.

## Section 2 — UI/UX Design Principles

Use for:

- object-centric UI;
- status visibility;
- evidence transparency;
- unsupported facts;
- agent inspectability.

## Section 3 — Information Architecture

Use for:

- global navigation;
- Matter Workspace navigation;
- dashboard default.

## Section 4 — Dashboard

Use for:

- active matters;
- blockers;
- risk summary;
- agent activity.

## Section 5 — Client Workspace

Use for:

- client detail;
- linked matters;
- client master story.

## Section 6 — Matter Workspace

Use for:

- matter header;
- overview;
- status cards;
- matter timeline.

## Section 7 — Workflow UI

Use for:

- workflow stepper;
- statuses;
- gates;
- workflow actions.

## Section 8 — Case Story Workspace

Use for:

- narrative input;
- Case Story Artifact;
- assertion extraction;
- gaps/vulnerabilities.

## Section 9 — Evidence Workspace

Use for:

- upload;
- evidence table;
- extraction viewer;
- processing status.

## Section 10 — Assertion and Support Matrix Workspace

Use for:

- assertions;
- truth/support states;
- evidence links;
- unsupported facts;
- contradictions.

## Section 11 — Strategy and Research Workspace

Use for:

- Strategy Memo;
- Research Memo;
- Strategy Points;
- authorities/sources.

## Section 12 — Argument Draft Workspace

Use for:

- Argument Draft;
- source basis;
- unsupported claim panel.

## Section 13 — Adversarial Review Workspace

Use for:

- W9 critique;
- Attack Matrix;
- loop decision.

## Section 14 — Revised Output Workspace

Use for:

- revised artifact;
- review status;
- export warning.

## Section 15 — Risk and Governance UI

Use for:

- risk panel;
- governance checks;
- blocker banner.

## Section 16 — Agent Run and Automation UI

Use for:

- agent run status;
- re-run controls;
- output inspection.

## Section 17 — Artifact and Version UI

Use for:

- artifact list;
- artifact detail;
- version history.

## Section 18 — Activity and Audit UI

Use for:

- activity timeline;
- audit events;
- sensitive audit display.

## Section 19 — Search and Retrieval UI

Use for:

- matter-scoped search;
- retrieval results;
- search scope warnings.

## Section 20 — MVP UI Requirements

Use for:

- MVP required screens;
- required capabilities;
- deferrals and red lines.

## Section 21 — Target-State UI Direction

Use for:

- future UI modules;
- autonomous institution oversight.

## Section 22 — UI Implementation Guidance

Use for:

- component structure;
- badges;
- empty states;
- error states.

## Section 23 — UI Testing and Acceptance Criteria

Use for:

- QA;
- acceptance tests;
- operator comprehension.

## Section 24 — Summary

Use for:

- compressed UI doctrine;
- final UI compliance check.

---

# Fast Lookup Table

| Topic | Primary Sections |
|---|---|
| UI doctrine | Sections 1, 2, 24 |
| Navigation | Section 3 |
| Dashboard | Section 4 |
| Client UI | Section 5 |
| Matter Workspace | Section 6 |
| Workflow UI | Section 7 |
| Case Story UI | Section 8 |
| Evidence UI | Section 9 |
| Assertions / Support Matrix | Section 10 |
| Strategy / Research | Section 11 |
| Argument Draft | Section 12 |
| Adversarial Review | Section 13 |
| Revised Output | Section 14 |
| Risk / Governance | Section 15 |
| Agent Runs | Section 16 |
| Artifacts / Versions | Section 17 |
| Activity / Audit | Section 18 |
| Search / Retrieval | Section 19 |
| MVP UI | Section 20 |
| Target-state UI | Section 21 |
| Components / implementation | Section 22 |
| UI testing | Section 23 |

---

# Agent Reading Protocol

Before performing any task based on Document 11, an agent should:

1. **Identify the UI domain.**

   Determine whether the task concerns dashboard, client, matter workspace, workflow, story, evidence, assertions, support matrix, strategy, research, argument, adversarial review, revised output, risks, agents, artifacts, audit, search, MVP, target-state, or components.

2. **Read the relevant topic section.**

   Use the Quick Navigation above.

3. **Read Section 2 if making product/design decisions.**

   UI decisions must preserve legal cognition visibility.

4. **Read Section 20 if implementing MVP UI.**

   MVP UI requirements and red lines are non-negotiable.

5. **Read Section 23 before claiming UI completion.**

   Acceptance criteria determine whether the UI is usable for MVP.

6. **Read Section 24 before final recommendations.**

   Section 24 provides the compressed UI doctrine.

---

# Mandatory Cross-Checks for Agents

## For Matter Workspace tasks

Read:

- Section 6;
- Section 7;
- Section 15.

Mandatory check:

- Does the workspace show current matter, workflow state, risks, blockers, and next action?

## For Evidence UI tasks

Read:

- Section 9.

Mandatory check:

- Does the UI distinguish original evidence from extracted text and show processing status?

## For Support Matrix UI tasks

Read:

- Section 10.

Mandatory check:

- Are unsupported facts, contradicted facts, evidence links, truth states, and support states visible?

## For Argument UI tasks

Read:

- Section 12;
- Section 13;
- Section 14.

Mandatory check:

- Does the argument flow through W9 critique before revised output?

## For Risk UI tasks

Read:

- Section 15.

Mandatory check:

- Are high/critical risks and blockers visible without digging?

## For Agent Run UI tasks

Read:

- Section 16.

Mandatory check:

- Are agent outputs, failures, inputs, outputs, and re-runs traceable?

## For MVP UI tasks

Read:

- Section 20;
- Section 23.

Mandatory check:

- Can a user complete the full MVP legal cognition spine through the interface?

---

# Final Instruction to Agents

Document 11 defines how LEXOS should be experienced by operators.

Agents must not design LEXOS as a generic chat UI.

When designing or implementing UI, preserve:

- matter-first workspace;
- object-centric navigation;
- visible workflow state;
- visible risks;
- visible unsupported facts;
- visible contradictions;
- inspectable evidence links;
- artifact status and versioning;
- agent-run transparency;
- active-matter search scope;
- draft/finality distinction.

The LEXOS UI must expose the legal state of the matter, not merely present generated prose.

## Document Status

**Document Name:** LEXOS UI/UX and Operator Experience Specification  
**Document Number:** Document 11  
**Version:** v1.0 Draft  
**Purpose:** Define the user interface, operator experience, matter workspace, screen structure, navigation model, workflow visibility, risk visibility, evidence handling, assertion support interface, artifact review experience, and MVP UI requirements for LEXOS.  
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

**Primary Use:** MVP UI design, product planning, frontend implementation, coding-agent UI prompts, operator workflow design, legal workspace design, navigation decisions, information hierarchy, and target-state operator experience.

---

# Section 1 — Purpose and Scope

## 1.1 Purpose of This Document

This document defines the UI/UX and operator experience for LEXOS.

LEXOS is not a normal legal document management system. It is not a chatbot. It is not merely a file repository. It is an agentic legal operating system that turns legal matter work into structured, inspectable, evidence-grounded workflows.

The UI must therefore do more than display documents.

It must make legal cognition visible.

The user must be able to see:

- what matter is active;
- what workflow stage is active;
- what the system believes;
- what is only alleged;
- what is unsupported;
- what evidence supports each assertion;
- what risks are open;
- what contradictions exist;
- what agents produced;
- what outputs are drafts;
- what has been reviewed;
- what remains blocked;
- what the next action is.

The UI must make the system controllable, not magical.

## 1.2 Core UI Doctrine

The core UI doctrine is:

> The LEXOS interface must expose the state of legal cognition, not hide it behind polished prose.

The operator should never have to guess:

- whether a fact is supported;
- whether an output is final;
- whether a contradiction exists;
- whether a document has been processed;
- whether a workflow is blocked;
- whether an agent invented or sourced a claim;
- whether an artifact is safe to use externally.

## 1.3 Scope of This Document

This document defines:

- UI principles;
- information architecture;
- navigation model;
- matter workspace;
- client workspace;
- workflow workspace;
- evidence workspace;
- assertion/support matrix workspace;
- strategy/research workspace;
- argument/adversarial workspace;
- output workspace;
- risk and governance panels;
- agent-run visibility;
- artifact review experience;
- MVP screen requirements;
- target-state UI direction.

This document does not define:

- exact visual design system;
- final colors;
- final component code;
- final responsive breakpoints;
- final accessibility implementation;
- final user onboarding copy;
- final production UI text.

Those belong in implementation design files and frontend tasks.

---

# Section 2 — UI/UX Design Principles

## 2.1 Object-Centric Interface

The UI must be organized around canonical legal objects.

Primary objects:

- Client;
- Matter;
- Evidence;
- Assertion;
- Risk;
- Research Memo;
- Strategy Memo;
- Argument Draft;
- Adversarial Critique;
- Output Artifact;
- Workflow State.

The UI must not be organized only around chats, folders, or documents.

## 2.2 Matter-First Operation

Most legal work happens inside a Matter.

The Matter Workspace should be the core operating environment.

A user should always know:

- current client;
- current matter;
- matter posture;
- jurisdiction;
- active workflow;
- open risks;
- next action.

## 2.3 Status Visibility

Every major object must display status clearly.

Examples:

- Evidence: uploaded, processing, processed, failed;
- Assertion: verified, pending, unsupported, contradicted;
- Artifact: draft, under review, final internal, superseded;
- Workflow: active, blocked, complete;
- Risk: low, moderate, high, critical.

Status should be visible without opening every object.

## 2.4 Evidence Transparency

Users must be able to move from:

> Argument → Assertion → Evidence → Source → Extracted Text → Original File.

The interface must support backward traceability.

## 2.5 Unsupported Facts Must Be Visible

Unsupported facts are not secondary.

They are legal risk.

The UI must show unsupported, partially supported, contradicted, and pending assertions prominently.

## 2.6 Draft Finality Discipline

The UI must never imply finality where none exists.

A document title, file name, or export format must not control final status.

Artifact status controls finality.

## 2.7 Agent Inspectability

Agent outputs must be inspectable.

Users should be able to see:

- agent name;
- workflow;
- model used where available;
- input objects;
- output artifact;
- created objects;
- risks or warnings.

## 2.8 Human Control Without Cognitive Overload

The UI should allow human review and correction without forcing the user to manually inspect every low-level event.

Use layered visibility:

- top-level status;
- expandable details;
- object-level records;
- audit trail only when needed.

---

# Section 3 — Information Architecture

## 3.1 Primary Navigation Areas

MVP primary navigation should include:

1. Dashboard;
2. Clients;
3. Matters;
4. Evidence;
5. Workflows;
6. Risks;
7. Artifacts;
8. Settings.

These can be global navigation items.

Matter-specific screens should be accessed through the Matter Workspace.

## 3.2 Matter Workspace Navigation

Inside a Matter, navigation should include:

1. Overview;
2. Story;
3. Evidence;
4. Assertions;
5. Support Matrix;
6. Strategy;
7. Research;
8. Argument;
9. Adversarial Review;
10. Output;
11. Workflow;
12. Risks;
13. Audit / Activity.

MVP may combine some tabs:

- Strategy + Research;
- Argument + Output;
- Workflow + Risks.

## 3.3 Global vs Matter-Level Views

Global views answer:

- What clients exist?
- What matters exist?
- What is blocked?
- What risks are critical?
- What evidence processing failed?
- What agent runs failed?

Matter-level views answer:

- What is happening in this matter?
- What facts are supported?
- What evidence exists?
- What output is current?
- What is the next action?

## 3.4 Operator Default Landing Page

For MVP, default landing page should be either:

- Matter List with status/risk summary; or
- Dashboard with active matters and blockers.

Recommended MVP:

> Dashboard → Active Matters → open Matter Workspace.

## 3.5 Target-State Navigation

Target-state may include:

- Client Intelligence;
- Matter Operations;
- Agent Operations;
- Governance;
- Knowledge / Learning;
- Model and Tool Registry;
- Security and Access;
- Reports and Metrics.

MVP should not overbuild this.

---

# Section 4 — Dashboard

## 4.1 Purpose

The Dashboard gives the operator a system-level view.

It should show what needs attention.

## 4.2 MVP Dashboard Components

MVP Dashboard should show:

- active matters;
- blocked matters;
- open critical/high risks;
- failed evidence processing;
- pending reviews;
- latest artifacts;
- recent agent runs;
- next actions.

## 4.3 Active Matters Table

Columns:

- Matter Name;
- Client;
- Posture;
- Jurisdiction;
- Current Workflow;
- Status;
- Open Risks;
- Last Updated;
- Next Action.

## 4.4 Risk Summary

Risk summary should show:

- critical risks;
- high risks;
- blocked workflows;
- unresolved contradictions;
- unsupported core facts.

## 4.5 Agent Activity Summary

MVP may show:

- latest agent run;
- status;
- workflow;
- output created;
- failure if any.

## 4.6 Dashboard Red Lines

Dashboard must not:

- present generated outputs as final merely because they exist;
- hide blocked workflows;
- hide failed processing;
- hide critical risks.

---

# Section 5 — Client Workspace

## 5.1 Purpose

The Client Workspace displays persistent client-level information.

It should remain separate from matter-specific work.

## 5.2 MVP Client Detail Fields

Display:

- Client Name;
- Client Type;
- Status;
- Primary Contact;
- Jurisdiction / Residence / Incorporation;
- Notes;
- Linked Matters;
- Created At;
- Updated At.

## 5.3 Client Matter List

Show linked matters with:

- Matter Name;
- Posture;
- Jurisdiction;
- Status;
- Current Workflow;
- Open Risks;
- Last Updated.

## 5.4 Client Master Story

MVP may include:

- Client Master Story text field;
- last updated timestamp;
- source note;
- warning that client-level facts are not automatically imported from matters.

## 5.5 Client Workspace Red Lines

The UI must not:

- merge matter story into client story automatically;
- imply all matter facts are client-level facts;
- allow cross-matter access without clear scope.

---

# Section 6 — Matter Workspace

## 6.1 Purpose

The Matter Workspace is the central LEXOS operating environment.

It is where the user manages a matter from story through revised output.

## 6.2 Matter Header

Every Matter Workspace screen should show a persistent header with:

- Matter Name;
- Client Name;
- Matter Posture;
- Jurisdiction;
- Matter Status;
- Current Workflow;
- Artifact Status;
- Risk Summary;
- Next Action.

## 6.3 Matter Overview Screen

The Overview screen should show:

- matter summary;
- current workflow;
- latest Case Story;
- evidence count;
- assertion count;
- support matrix status;
- strategy memo status;
- research memo status;
- argument draft status;
- adversarial critique status;
- revised output status;
- open risks;
- recent activity.

## 6.4 Matter Status Cards

Recommended cards:

- Workflow State;
- Evidence Processing;
- Assertions / Support;
- Risks;
- Latest Artifact;
- Next Action.

## 6.5 Matter Timeline

MVP may include a simple activity timeline:

- matter created;
- story generated;
- evidence uploaded;
- assertions extracted;
- support matrix generated;
- strategy generated;
- argument drafted;
- critique generated;
- output revised.

## 6.6 Matter Workspace Red Lines

The Matter Workspace must not:

- allow the user to lose sight of active matter scope;
- hide workflow state;
- hide risks;
- hide unsupported facts;
- imply that an argument is safe merely because it is polished.

---

# Section 7 — Workflow UI

## 7.1 Purpose

The Workflow UI shows where the matter is in W0–W11 or MVP-lite workflows.

## 7.2 MVP Workflow Steps

Display MVP workflow steps:

1. Client / Matter Setup;
2. Case Story;
3. Assertion Extraction;
4. Evidence Ingest;
5. Support Matrix;
6. Strategy;
7. Research;
8. Argument Draft;
9. Adversarial Review;
10. Revised Output;
11. Internal Review.

## 7.3 Workflow Step Status

Each workflow step should show:

- not started;
- active;
- waiting for input;
- blocked;
- under review;
- complete;
- returned for revision.

## 7.4 Workflow Action Buttons

Possible actions:

- Start;
- Generate;
- Re-run;
- Mark Reviewed;
- Return for Revision;
- Create Risk;
- Continue to Next Step.

Actions must respect permissions and workflow state.

## 7.5 Workflow Gate Visibility

For each workflow step, UI should show:

- required inputs;
- outputs created;
- blockers;
- risks;
- next step.

## 7.6 Workflow Red Lines

The UI must not:

- mark a workflow complete merely because text was generated;
- hide missing required inputs;
- allow skipped W9 adversarial review in MVP completion;
- allow final status without review status.

---

# Section 8 — Case Story Workspace

## 8.1 Purpose

The Case Story Workspace supports W2-lite.

It converts client narrative into a structured Case Master Story and Assertions.

## 8.2 MVP Components

The screen should include:

- matter summary;
- client narrative input;
- source notes;
- Case Story generated output;
- material assertions table;
- gaps;
- vulnerabilities;
- preliminary risks;
- action buttons.

## 8.3 Story Input Area

Allow:

- typed narrative;
- pasted notes;
- uploaded notes;
- structured fields for parties, dates, events, objectives.

## 8.4 Case Story Artifact Viewer

Show:

- artifact title;
- version;
- status;
- generated by;
- created at;
- content;
- source basis.

## 8.5 Assertion Extraction Panel

Show extracted Assertions with:

- assertion text;
- assertion type;
- preliminary truth state;
- support state;
- evidence needed;
- notes;
- accept/edit/reject controls.

## 8.6 Gaps and Vulnerabilities Panel

Show:

- missing facts;
- missing documents;
- internal inconsistencies;
- weak points;
- urgent issues.

## 8.7 Case Story Red Lines

The UI must not:

- classify client narrative as verified by default;
- hide gaps;
- hide vulnerabilities;
- allow accepted assertions without truth/support state.

---

# Section 9 — Evidence Workspace

## 9.1 Purpose

The Evidence Workspace supports W4-lite.

It allows users to upload, process, inspect, and manage digital evidence.

## 9.2 MVP Components

The screen should include:

- upload area with immutable-original messaging;
- evidence table enriched with ingestion pathway + extraction types;
- processing + extraction statuses;
- paired viewers for **markdown extraction** (derived) versus **structured JSON** (technical tab);
- **Extraction toolchain / method badges** surfaced on each Evidence row + detail pane: primary **layout-aware parser** (e.g., LlamaParse-class), OCR support flag (yes/no + role), vision/QC usage, **`raw OCR fallback`** indicator when intermediates lacked parser output;
- original file viewer/download that never shows extracted layers as substitutes;
- metadata editor enforcing privilege/confidentiality propagation;
- linked assertions panel respecting extraction quality eligibility;
- processing failure panel;
- embeddings / retrieval status indicators when retrieval is enabled.

## 9.3 Evidence Table Columns

Columns:

- Evidence ID / Label;
- File Name;
- Evidence Type;
- Source Type;
- Language;
- Processing Status;
- Extraction Quality Status;
- Extraction Pathway / Type (text, scan, image, optional audio/video);
- QA Flag Summary (icon + tooltip);
- Human Review Required?;
- Embedding Status (enabled systems);
- Privilege Status;
- Confidentiality Status;
- Linked Assertions;
- Uploaded At.

## 9.4 Evidence Detail View

Organize detailed review using clearly labeled tabs/panels:

1. **Original** — immutable file viewer/downloader referencing `original_file_uri`.
2. **Markdown Extraction** — derived markdown with provenance badges.
3. **Structured JSON** — schema-aware inspector (pretty JSON, diff vs prior extraction if superseded).
4. **Metadata** — canonical Evidence Object fields (`source_type`, `evidence_media_type`, language hashes, cryptographic hash placeholder, etc.).
5. **Quality / QA** — extraction quality status, numeric score (if any), comparator notes that distinguish **structured parser outputs** versus **raw OCR intermediates/tooling lineage**, parser/OCR/Vision toolchain badges surfaced inline, human review hooks.
6. **Embeddings / Retrieval Chunks** — when enabled, list chunk indices, models, freshness (`is_current`), and highlight suppressed QA-flagged chunks.
7. **Linked Assertions** — cross-links honoring support eligibility rules for degraded extractions.

Provide additional affordances—without collapsing tabs—for **PDF/screenshot composites of chats/messages**: inline preview tying reconstructed markdown bubbles to originating screenshot indices, companion JSON excerpts (messages/attachments), and explicit warnings when only OCR text exists.

Each tab must restate the doctrine that markdown/JSON/transcripts/OCR/visual descriptions are **derivatives** unless counsel marks otherwise.

## 9.4.1 Extraction confidence UI rule

Low-confidence, failed, or QA-flagged extractions must use **highly visible** warning affordances (color, iconography, sticky banners) and must **not** visually resemble accepted extractions. Operators should never conclude parity between `accepted` and `QA flagged` states without deliberate interaction.

## 9.4.2 Raw OCR fallback visibility

Whenever extraction metadata records **parser-unavailable OCR-only intermediates**:

- banners must label **`raw OCR fallback`** visibly on list rows + detail drawers;
- default interpretation must classify the item **`qa_flagged`** or **`human_review_required`** until operators reconcile against originals;
- prompt-driven agents must see explicit warnings in UI exports so they do **not over-trust OCR-only payloads** for materially structured chats/tables.

## 9.5 Upload Flow

Upload flow should require:

- active matter;
- source type;
- evidence type if known;
- privilege status;
- confidentiality status.

Defaults may exist, but missing classifications should be visible.

## 9.6 Extraction Status

Show lifecycle signals for the **Evidence pipeline** and the **Evidence Extraction quality** record. Surface machine enums consistently with **Document 8 — MVP Scope**, Section **11.4**.

**Evidence `processing_status` (MVP core set):** `uploaded`, `queued`, `processing`, `processed`, `qa_flagged`, `failed`, `requires_human_review`, `superseded`. (UX may add **`requires_reupload`** or **`archived`** as extensions.)

**Evidence Extraction `extraction_quality_status` (MVP):** `accepted`, `qa_flagged`, `failed`, `human_review_required`.

Also surface the **`human_review_required`** human-review flag on Evidence and/or Evidence Extraction regardless of pipeline vs quality enum distinctions.

Failed or `qa_flagged` extraction must remain visually loud in list and detail views (see Section 9.4.1).

## 9.7 Evidence Workspace Red Lines

The UI must not:

- treat markdown extraction, JSON extraction, transcripts, OCR dumps, or embeddings as equivalent stand-ins for the original evidence viewer;
- allow anonymous evidence;
- hide failed extraction;
- allow ordinary deletion without warning/audit;
- hide privilege/confidentiality status.

---

# Section 10 — Assertion and Support Matrix Workspace

## 10.1 Purpose

This is one of the most important MVP screens.

It shows the epistemic status of the matter.

## 10.2 MVP Components

The screen should include:

- assertion table;
- support state filters;
- evidence linkage controls;
- contradiction flags;
- unsupported fact list;
- evidence gap list;
- support matrix artifact viewer.

## 10.3 Assertion Table Columns

Columns:

- Assertion ID;
- Assertion Text;
- Assertion Type;
- Truth State;
- Support State;
- Use Status;
- Evidence Links;
- Source Links;
- Contradiction;
- Confidence;
- Notes.

## 10.4 Filters

Required filters:

- all;
- supported;
- partially supported;
- unsupported;
- contradicted;
- pending;
- client-confirmed;
- opposing-party alleged;
- filing-usable if implemented.

## 10.5 Evidence Link View

For each assertion, user should be able to see:

- linked evidence;
- evidence excerpt;
- source document;
- page/section reference where available;
- support explanation.

## 10.6 Unsupported Facts Panel

Display unsupported facts prominently.

Include:

- assertion;
- why unsupported;
- evidence needed;
- risk level;
- next action.

## 10.7 Contradictions Panel

Display contradicted assertions with:

- contradiction summary;
- conflicting object;
- severity;
- resolution status;
- next action.

## 10.8 Support Matrix Red Lines

The UI must not:

- bury unsupported facts;
- bury contradictions;
- show support state without evidence link;
- allow final argument drafting without visible support matrix status;
- overemphasize polished story over support state.

---

# Section 11 — Strategy and Research Workspace

## 11.1 Purpose

This workspace supports W6-lite and W7-lite.

It connects support state to legal strategy and research.

## 11.2 MVP Components

The screen should include:

- Strategy Memo viewer/editor;
- Strategy Points table;
- Research Questions list;
- Research Memo viewer/editor;
- Legal Authorities / Sources table;
- Risks and assumptions panel.

## 11.3 Strategy Points Table

Columns:

- Strategy Point;
- Type;
- Supporting Assertions;
- Supporting Evidence;
- Research Needed;
- Risk Level;
- Status.

## 11.4 Research Questions

Each research question should show:

- question text;
- jurisdiction;
- linked strategy point;
- status;
- research memo link;
- limitations.

## 11.5 Research Memo Viewer

Show:

- research question;
- jurisdiction;
- short answer;
- authorities/sources;
- adverse authority note;
- limitations;
- verification status.

## 11.6 Research Source Table

Columns:

- Source / Authority;
- Type;
- Jurisdiction;
- Relevance;
- Verification Status;
- Notes.

## 11.7 Strategy/Research Red Lines

The UI must not:

- allow strategy to hide unsupported dependencies;
- allow research without jurisdiction field;
- display unverified research as settled law;
- hide adverse authority limitations.

---

# Section 12 — Argument Draft Workspace

## 12.1 Purpose

The Argument Draft Workspace supports W8-lite.

It allows the operator to review the draft and inspect its source basis.

## 12.2 MVP Components

The screen should include:

- Argument Draft viewer/editor;
- linked Strategy Memo;
- linked Research Memo;
- linked Assertions;
- linked Evidence;
- unsupported/weak claim panel;
- artifact metadata.

## 12.3 Argument Viewer

Show:

- argument title;
- version;
- artifact status;
- generated by;
- created at;
- intended audience;
- draft content.

## 12.4 Source Basis Panel

Show:

- assertions used;
- evidence used;
- legal authorities used;
- research memo link;
- unsupported or weak claims.

## 12.5 Action Buttons

Possible actions:

- Generate Draft;
- Re-run Draft;
- Send to Adversarial Review;
- Mark for Human Review;
- Create Risk;
- Supersede Draft.

## 12.6 Argument Workspace Red Lines

The UI must not:

- hide unsupported claims;
- imply filing-ready status;
- allow draft to skip W9 in MVP;
- allow argument to present unsupported facts as verified.

---

# Section 13 — Adversarial Review Workspace

## 13.1 Purpose

The Adversarial Review Workspace supports W9-lite.

It displays the red-team critique and revision instructions.

## 13.2 MVP Components

The screen should include:

- Adversarial Critique viewer;
- Attack Matrix;
- severity filters;
- revision checklist;
- loop decision;
- unresolved blocker panel.

## 13.3 Attack Matrix Columns

Columns:

- Issue;
- Attack Type;
- Severity;
- Why It Matters;
- Recommended Fix;
- Target Section;
- Status.

## 13.4 Severity Filters

Filters:

- critical;
- high;
- moderate;
- low;
- all.

## 13.5 Loop Decision

Show one of:

- return to W5;
- return to W6;
- return to W7;
- return to W8;
- proceed to W11 with caveats.

## 13.6 Action Buttons

Possible actions:

- Generate Critique;
- Send Fixes to Revision;
- Create Risk;
- Return to Research;
- Return to Support Matrix;
- Mark Issue Accepted;
- Mark Issue Resolved.

## 13.7 Adversarial Review Red Lines

The UI must not:

- hide critical critique;
- allow W9 critique to be overwritten without versioning;
- allow unresolved critical critique to disappear;
- present critique as optional decoration.

---

# Section 14 — Revised Output Workspace

## 14.1 Purpose

The Revised Output Workspace supports W11-lite.

It shows the revised legal output after adversarial critique.

## 14.2 MVP Components

The screen should include:

- Revised Output viewer/editor;
- revision summary;
- issues addressed;
- remaining risks;
- unresolved issues;
- artifact status;
- review status.

## 14.3 Artifact Status Controls

Available statuses:

- draft;
- under review;
- approved internal;
- final internal;
- superseded;
- archived.

MVP should not expose court-filed or filing-ready as normal user status unless governance supports it.

## 14.4 Review Panel

Show:

- reviewer;
- review status;
- review notes;
- required changes;
- approval date.

MVP may use simple review marker.

## 14.5 Export Controls

If export exists, UI should show:

- export format;
- artifact status;
- warning if not externally approved;
- export log if implemented.

## 14.6 Revised Output Red Lines

The UI must not:

- allow W11 to erase W9 unresolved issues;
- allow final internal status without review marker;
- treat export as external approval;
- hide remaining risks.

---

# Section 15 — Risk and Governance UI

## 15.1 Purpose

Risk and governance UI makes blockers and uncertainties visible.

## 15.2 Risk Panel

Risk panel should show:

- risk title;
- risk type;
- severity;
- linked object;
- status;
- mitigation note;
- owner;
- next action.

## 15.3 Risk Severity Display

Severity values:

- low;
- moderate;
- high;
- critical.

Critical and high risks should be visually prominent.

## 15.4 Governance Check View

Show:

- pass/fail/conditional;
- blocking issues;
- non-blocking issues;
- required fixes;
- recommended artifact status.

## 15.5 Blocker Banner

If matter or workflow is blocked, show a persistent banner:

- blocked reason;
- linked risk;
- required action;
- responsible workflow or actor.

## 15.6 Risk UI Red Lines

The UI must not:

- hide high/critical risks behind tabs only;
- allow blocked workflow to appear normal;
- remove risk without status change or audit;
- allow “accepted risk” without visibility.

---

# Section 16 — Agent Run and Automation UI

## 16.1 Purpose

Agent-run UI shows what agents have done and what failed.

## 16.2 Agent Run Display

Each agent run should show:

- agent name;
- workflow;
- status;
- model used where available;
- started at;
- completed at;
- input objects;
- output objects;
- errors;
- risks created.

## 16.3 Agent Run Status Values

Statuses:

- queued;
- running;
- completed;
- failed;
- cancelled;
- needs review.

## 16.4 Agent Output Inspection

User should be able to inspect:

- generated content;
- structured output;
- linked artifacts;
- created assertions/risks;
- validation errors.

## 16.5 Re-run Controls

Re-run should be controlled.

When re-running:

- preserve prior output;
- create new version;
- explain reason for re-run;
- do not silently overwrite.

## 16.6 Agent UI Red Lines

The UI must not:

- make agent output invisible;
- silently overwrite agent output;
- hide failed runs;
- allow agent output to mutate records without traceability.

---

# Section 17 — Artifact and Version UI

## 17.1 Purpose

Artifact UI controls legal work product.

## 17.2 Artifact List

Show:

- artifact title;
- type;
- workflow origin;
- status;
- version;
- created by;
- created at;
- updated at.

## 17.3 Artifact Detail

Show:

- content;
- metadata;
- source basis;
- evidence links;
- assertions used;
- risks;
- review status;
- version history.

## 17.4 Version History

Version history should show:

- version number;
- date;
- created by;
- change summary;
- supersedes;
- status.

## 17.5 Artifact UI Red Lines

The UI must not:

- rely on file name for finality;
- overwrite versions silently;
- hide superseded artifacts;
- hide source basis for generated artifacts.

---

# Section 18 — Activity and Audit UI

## 18.1 Purpose

Activity and audit UI gives operational traceability.

## 18.2 MVP Activity Timeline

Show:

- object created;
- evidence uploaded;
- evidence processed;
- assertion updated;
- support matrix generated;
- artifact generated;
- workflow state changed;
- risk created;
- agent run completed.

## 18.3 Audit Detail

MVP may expose audit detail only to admin/reviewer.

Audit detail may include:

- actor;
- event type;
- target object;
- timestamp;
- summary.

## 18.4 Audit UI Red Lines

The UI must not:

- expose sensitive audit logs to unauthorized users;
- hide material status changes;
- allow material changes without activity trace.

---

# Section 19 — Search and Retrieval UI

## 19.1 Purpose

Search UI allows users to find matter-scoped objects.

## 19.2 MVP Search Scope

Search should default to active matter.

Filters:

- object type;
- evidence;
- assertions;
- artifacts;
- risks;
- research;
- status.

## 19.3 Search Result Display

Each result should show:

- object type;
- title/snippet;
- source;
- matter;
- status;
- privilege/confidentiality label;
- link to object.

## 19.4 Retrieval Warning

If search can include broader scope, UI must show scope clearly.

Example:

- Active Matter Only;
- Current Client;
- All Authorized Matters.

MVP should default to Active Matter Only.

## 19.5 Search UI Red Lines

The UI must not:

- search all matters by default;
- hide search scope;
- display restricted objects without permission;
- show snippets from privileged material to unauthorized users.

---

# Section 20 — MVP UI Requirements

## 20.1 MVP Required Screens

MVP must include:

1. Dashboard or Matter List;
2. Client Detail;
3. Matter Detail / Matter Workspace;
4. Case Story Workspace;
5. Evidence Workspace;
6. Assertion / Support Matrix Workspace;
7. Strategy / Research Workspace;
8. Argument Draft Workspace;
9. Adversarial Review Workspace;
10. Revised Output Workspace;
11. Risk / Workflow Status Panel;
12. Optional **Intake Workspace** (recommended when W0-lite onboarding objects are enabled).

## 20.2 MVP Required UI Capabilities

MVP must allow user to:

- create Client;
- create Matter;
- input Case Story;
- generate Case Story Artifact;
- extract Assertions;
- upload Evidence;
- view Evidence Extraction;
- view Assertions;
- assign/view support states;
- generate Strategy Memo;
- generate Research Memo;
- generate Argument Draft;
- generate Adversarial Critique;
- generate Revised Output;
- view Risks;
- view Workflow State;
- view Artifact Status.

## 20.3 MVP UI May Defer

MVP may defer:

- full dashboard analytics;
- advanced client portal;
- external sharing;
- court filing workflow;
- visual exhibit builder;
- advanced audit explorer;
- complex RBAC management UI;
- model/tool registry UI;
- billing/admin UI;
- institutional learning UI.

## 20.4 MVP UI Red Lines

MVP UI must not:

- hide the Support Matrix;
- hide unsupported facts;
- hide workflow state;
- hide risks;
- hide artifact status;
- hide evidence processing failures;
- hide matter scope;
- present chat as the primary system of record.

## 20.5 Intake Workspace Requirements (W0)

When onboarding scaffolding is active, the **Intake Workspace** must present:

- intake list + `intake_status` queue;
- Candidate/Matter cards keyed to `intake_id`;
- **Intake Group** summary when multiple related prospective clients share a proposed matter;
- per-candidate statuses: conflict, KYC/CDD, representative/authority, consent, engagement, urgency/deadline badges;
- accounting setup + office admin completion signals;
- lead-attorney / governance review status;
- rejected/abandoned/handoff states that never masquerade as production W1 contexts.

UX rules:

- unrelated prospective clients appear as **separate rows / sessions** even if the orchestrator surface unifies them visually in a queue—the detail panes remain isolated;
- grouped co-parties collapse into a **group header** with expandable per-candidate rails to avoid implicit memory merging;
- operator affordances must label the intake archetype: solo prospect, existing client new matter, ambiguous identity, Intake Group co-party, or superseded duplicate.

## 20.6 Intake UI Red Lines

- MUST NOT merge unrelated prospective clients into shared composable fields that encourage one LLM context;
- MUST NOT show abandoned/rejected intake dossiers as canonical clients in W1 dashboards;
- MUST NOT imply embeddings or memory promotion equivalent to accepted clients before handoff artefacts exist;
- MUST NOT hide conflict/KYC/authority blocks on any Client Candidate card inside an Intake Group.

---

# Section 21 — Target-State UI Direction

## 21.1 Target-State Goal

Target-state UI should support a full autonomous legal institution.

It should let humans operate as:

- supervisors;
- reviewers;
- exception handlers;
- strategic controllers;
- final approvers where required;
- client relationship managers;
- system governors.

## 21.2 Future UI Modules

Target-state may include:

- Agent Operations Center;
- Governance Center;
- Model and Tool Registry UI;
- Privilege and Security Center;
- Citation Verification Console;
- Evidence Vault;
- Institutional Learning Center;
- Client Portal;
- Court/Regulator Filing Console;
- Analytics and Metrics Dashboard.

## 21.3 Agent Operations Center

Should show:

- active agent runs;
- queued tasks;
- failed tasks;
- agent performance;
- model/tool usage;
- human overrides;
- autonomy actions.

## 21.4 Governance Center

Should show:

- open blockers;
- critical risks;
- unsupported facts;
- unresolved contradictions;
- privilege issues;
- citation issues;
- output certification status.

## 21.5 Evidence Vault

Should show:

- original evidence;
- derived extractions;
- hashes;
- chain of custody target-state;
- redactions;
- exports;
- legal hold.

## 21.6 Target-State UI Rule

As autonomy increases, UI must increase oversight, not reduce it.

Autonomous systems require more observability.

---

# Section 22 — UI Implementation Guidance

## 22.1 Frontend Architecture

UI should follow the technical architecture in Document 9.

Recommended:

- Next.js;
- React;
- TypeScript;
- componentized workspaces;
- reusable status badges;
- reusable risk panels;
- reusable artifact viewers;
- reusable object tables.

## 22.2 Component Families

Suggested component families:

- MatterHeader;
- WorkflowStepper;
- RiskPanel;
- ArtifactViewer;
- EvidenceTable;
- EvidenceDetail;
- AssertionTable;
- SupportMatrix;
- AgentRunCard;
- StatusBadge;
- ReviewPanel;
- SourceLinkPanel;
- ActivityTimeline.

## 22.3 Status Badge System

Use consistent badges for:

- workflow status;
- artifact status;
- support state;
- truth state;
- risk severity;
- evidence processing status;
- review status.

## 22.4 Progressive Disclosure

Use progressive disclosure for complex information:

- show summary first;
- expand for evidence;
- expand for source text;
- expand for audit trail.

Do not overwhelm the operator with all fields at once.

## 22.5 Empty States

Every workspace should have useful empty states.

Examples:

- No evidence uploaded yet. Upload evidence to begin W4.
- No assertions extracted yet. Generate assertions from Case Story.
- Support Matrix not created. Run W5-lite after evidence processing.
- No adversarial critique. Run W9 before revised output.

## 22.6 Error States

Error states must be actionable.

Bad:

> Something went wrong.

Better:

> Evidence extraction failed. The file is still preserved. Re-run extraction, upload a cleaner copy, or mark extraction as unavailable.

---

# Section 23 — UI Testing and Acceptance Criteria

## 23.1 MVP UI Acceptance Test

A user must be able to complete:

1. Create Client;
2. Create Matter;
3. Enter Case Story;
4. Generate Assertions;
5. Upload Evidence;
6. View Extraction;
7. Map Assertions to Evidence;
8. View Support Matrix;
9. Generate Strategy Memo;
10. Generate Research Memo;
11. Generate Argument Draft;
12. Generate W9 Critique;
13. Generate Revised Output;
14. View Risks and Workflow State.

## 23.2 Visibility Acceptance Criteria

The UI must visibly expose:

- current matter;
- current workflow;
- unsupported facts;
- contradicted facts;
- evidence processing failures;
- open risks;
- artifact status;
- W9 critique status.

## 23.3 Safety Acceptance Criteria

The UI must prevent or warn against:

- deleting evidence;
- exporting unreviewed outputs;
- marking unsupported outputs final;
- skipping W9;
- using global search by default;
- ignoring critical risks.

## 23.4 Operator Comprehension Criteria

A new operator with no prior context should be able to answer:

- What matter am I in?
- What workflow stage is this?
- What is the next action?
- What facts are unsupported?
- What evidence supports this argument?
- What risks block progress?
- What output is current?
- Is this draft reviewed?

---

# Section 24 — Summary

The LEXOS UI must make legal cognition visible, inspectable, and controllable.

The MVP UI must center on the Matter Workspace and expose:

- Client;
- Matter;
- Case Story;
- Evidence;
- Assertions;
- Support Matrix;
- Strategy;
- Research;
- Argument Draft;
- Adversarial Critique;
- Revised Output;
- Workflow State;
- Risks;
- Artifact Status.

The UI must not become a generic chat interface.

The core UI rules are:

1. Matter scope must always be visible.
2. Workflow state must always be visible.
3. Unsupported facts must be visible.
4. Contradictions must be visible.
5. Risks must be visible.
6. Evidence links must be inspectable.
7. Artifacts must show status and version.
8. Agent outputs must be inspectable.
9. Drafts must not appear final.
10. Search must default to active matter.
11. External use must not be implied by export.
12. UI must support human review without hiding system uncertainty.

The final UI doctrine is:

> LEXOS UI must expose the legal state of the matter, not merely display generated legal prose.