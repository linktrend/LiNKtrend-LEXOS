# Document 4 — LEXOS Cognitive Architecture

# Document Index and Agent Navigation Guide

## Purpose of This Index

This index helps human readers, AI agents, coding agents, legal agents, workflow agents, and system architects quickly locate relevant parts of **Document 4 — LEXOS Cognitive Architecture**.

Document 4 explains how LEXOS thinks: how it perceives legal inputs, extracts information, forms objects, manages truth, retrieves memory, reasons about facts and evidence, researches law, builds strategy, drafts arguments, attacks its own outputs, expresses legal work product, applies governance, and learns.

Agents should use this index before performing any task involving cognition, workflow design, agent orchestration, reasoning architecture, or MVP cognition-loop planning.

---

# Quick Navigation by Task

## If the task is about the overall cognitive architecture

Read:

- **Section 1 — Purpose and Scope**
- **Section 2 — Cognitive Architecture Overview**
- **Section 24 — Summary**

Use these sections to understand the full cognition stack and the MVP cognition spine.

Key concepts:

- cognition stack;
- cognitive flow;
- legal cognition spine;
- cognitive integrity requirements;
- object-centric reasoning.

---

## If the task is about input intake or initial classification

Read:

- **Section 3 — Input Perception Layer**

Use this section when designing uploads, intake classification, source classification, matter linkage, privilege/confidentiality intake, or evidence routing.

Key concepts:

- input perception;
- source classification;
- evidence vs source vs instruction;
- language detection;
- matter linkage;
- processing route.

---

## If the task is about document parsing, OCR, extraction, or markdown/JSON output

Read:

- **Section 4 — Extraction and Structuring Layer**

Use this section when designing W4-lite, extraction pipelines, OCR, markdown conversion, structured JSON extraction, metadata extraction, or extraction quality flags.

Key concepts:

- extraction functions;
- Evidence Extraction Object;
- extracted text;
- extracted JSON;
- extraction confidence;
- original evidence preservation.

---

## If the task is about turning text into legal objects

Read:

- **Section 5 — Object Formation Layer**
- **Section 19 — Cognition-to-Object Mapping**

Use these sections when designing object creation, assertion extraction, entity recognition, evidence-to-object mapping, or legal object generation.

Key concepts:

- object formation;
- Assertion formation;
- Evidence Object;
- Timeline Event;
- Contradiction;
- Risk;
- Output Artifact.

---

## If the task is about truth, support, provenance, or auditability

Read:

- **Section 6 — Truth and Provenance Layer**

Use this section when designing truth states, support states, source links, evidence links, provenance tracking, artifact versioning, or audit events.

Key concepts:

- truth state;
- support state;
- use status;
- source/evidence links;
- confidence;
- provenance;
- transformation history.

---

## If the task is about memory or retrieval

Read:

- **Section 7 — Memory and Retrieval Layer**

Use this section when designing retrieval architecture, matter-scoped RAG, embeddings, memory layers, or retrieval filtering.

Key concepts:

- memory layers;
- scoped retrieval;
- client/matter boundaries;
- privilege/confidentiality filters;
- object-type filtering;
- institutional memory.

---

## If the task is about factual reasoning

Read:

- **Section 8 — Factual Reasoning Layer**

Use this section when designing case story, fact extraction, assertion creation, timeline creation, contradiction detection, or client gap reports.

Key concepts:

- factual reasoning;
- what happened;
- what is alleged;
- what is supported;
- what is missing;
- separating fact from legal conclusion.

---

## If the task is about evidence reasoning

Read:

- **Section 9 — Evidentiary Reasoning Layer**

Use this section when designing evidence support logic, evidence-overreading controls, support matrix, extraction quality effects, authenticity/admissibility placeholders, or evidence risk.

Key concepts:

- what evidence proves;
- what evidence does not prove;
- evidence overreading;
- support state;
- evidentiary risk;
- evidence-to-assertion linkage.

---

## If the task is about legal research

Read:

- **Section 10 — Legal Research Layer**

Use this section when designing W7, research memos, legal authority objects, adverse authority search, citation confidence, or jurisdiction-scoped research.

Key concepts:

- legal research questions;
- Legal Authority;
- Research Memo;
- citation confidence;
- adverse authority;
- AI research as draft.

---

## If the task is about legal reasoning

Read:

- **Section 11 — Legal Reasoning Layer**

Use this section when designing legal element mapping, legal issue spotting, defenses, burdens, remedies, procedural objections, or legal-risk analysis.

Key concepts:

- legal elements;
- burden of proof;
- defenses;
- legal materiality;
- legal risk;
- unsupported factual premises.

---

## If the task is about strategy

Read:

- **Section 12 — Strategy Layer**

Use this section when designing W6, strategy memos, attack lines, defense lines, evidence priorities, procedural strategy, or risk-weighted strategy.

Key concepts:

- strategy questions;
- strongest/weakest points;
- missing evidence;
- opponent response;
- strategy linked to support state;
- risk-aware strategy.

---

## If the task is about adversarial review or red-team critique

Read:

- **Section 13 — Adversarial Layer**

Use this section when designing W9, attack matrices, adversarial critiques, weakness registers, revision checklists, or loop exit recommendations.

Key concepts:

- adversarial questions;
- opposing counsel/prosecutor/judge perspective;
- weakest facts;
- adverse law;
- overstatement;
- adversarial independence.

---

## If the task is about writing, drafting, or final outputs

Read:

- **Section 14 — Expression Layer**

Use this section when designing W8/W11 drafting, client reports, argument drafts, final bundles, rhetorical refinement, or output artifact generation.

Key concepts:

- expression outputs;
- expression must not mutate truth;
- output as artifact;
- source basis;
- artifact status.

---

## If the task is about governance within cognition

Read:

- **Section 15 — Governance Layer**

Use this section when designing cognitive gates, output certification, workflow blocking, risk escalation, autonomy constraints, or system checks.

Key concepts:

- truth/support/use status checks;
- risk checks;
- privilege checks;
- retrieval scope;
- artifact status;
- autonomy level;
- governance output.

---

## If the task is about institutional learning

Read:

- **Section 16 — Learning Layer**

Use this section when designing Learning Objects, model-error learning, workflow improvements, outcome analysis, or correction logs.

Key concepts:

- learning inputs;
- learning outputs;
- scoped learning;
- source-linked learning;
- privilege-aware learning.

---

## If the task is about cognitive modes

Read:

- **Section 17 — Cognitive Modes**

Use this section when designing task-specific agents, prompts, workflow modes, or agent behavior profiles.

Key concepts:

- Intake Mode (multi-intake isolation + orchestrator-led routing);
- Client Memory Mode;
- Case Story Mode;
- Opposing File Mode;
- Evidence Mode;
- Support Mapping Mode;
- Strategy Mode;
- Research Mode;
- Argument Mode;
- Adversarial Mode;
- Visualization Mode;
- Rhetorical Refinement Mode;
- Governance Mode.

---

## If the task is about feedback loops

Read:

- **Section 18 — Cognitive Feedback Loops**

Use this section when designing recursive workflow transitions, reprocessing, W8/W9 loops, W5 evidence gaps, W7/W6 research-strategy loops, or workflow reopening.

Key concepts:

- W2 → W1;
- W3 → W2;
- W5 → W4;
- W7 → W6;
- W8 ↔ W9;
- W11 → W8/W5;
- outcome → learning.

---

## If the task is about object mapping

Read:

- **Section 19 — Cognition-to-Object Mapping**

Use this section when translating cognition into database objects, schemas, or object updates.

Key concepts:

- perception → Source/Evidence;
- extraction → Evidence Extraction;
- factual reasoning → Assertion/Timeline/Contradiction;
- strategy → Strategy Point;
- argument → Argument Node;
- governance → Risk/Review/Workflow State;
- learning → Learning Object.

---

## If the task is about workflow mapping

Read:

- **Section 20 — Cognition-to-Workflow Mapping**

Use this section when mapping cognitive layers to W0–W11 workflows.

Key concepts:

- W0 intake;
- W1 memory;
- W2 story;
- W3 reconciliation;
- W4 extraction;
- W5 support;
- W6 strategy;
- W7 research;
- W8 argument;
- W9 adversarial;
- W10 visuals;
- W11 refinement.

---

## If the task is about agent mapping

Read:

- **Section 21 — Cognition-to-Agent Mapping**

Use this section when designing agent roles, agent prompts, or agent responsibilities.

Key concepts:

- Intake Specialist;
- Custodian;
- Story Architect;
- Evidence Archivist;
- Analyst;
- Strategist;
- Librarian;
- Advocate;
- Adversary;
- Visualizer;
- Rhetorician;
- Governance Agents.

---

## If the task is about MVP cognitive scope

Read:

- **Section 22 — MVP Cognitive Architecture**

Use this section when designing the MVP cognition loop, MVP workflow sequence, MVP exclusions, or MVP red lines.

Key concepts:

- required MVP cognitive functions;
- MVP simplifications;
- MVP red lines;
- no chatbot-over-files shortcut;
- required adversarial critique.

---

## If the task is about target-state cognition

Read:

- **Section 23 — Target-State Cognitive Architecture**

Use this section when designing the future autonomous legal institution, cognitive maturity levels, institutional learning, recursive cognition, or full autonomy.

Key concepts:

- cognitive maturity levels;
- governed agentic cognition;
- recursive legal cognition;
- institutional learning cognition;
- autonomous legal institution.

---

# Section-by-Section Index

## Section 1 — Purpose and Scope

Use for:

- understanding what cognitive architecture means;
- distinguishing cognition from objects, workflows, prompts, and tools;
- identifying the document’s scope.

## Section 2 — Cognitive Architecture Overview

Use for:

- cognition stack;
- cognitive flow;
- legal cognition spine;
- integrity requirements.

## Section 3 — Input Perception Layer

Use for:

- intake classification;
- source/evidence/instruction classification;
- matter linkage;
- language and privilege detection.

## Section 4 — Extraction and Structuring Layer

Use for:

- OCR;
- parsing;
- markdown;
- JSON extraction;
- metadata;
- extraction quality.

## Section 5 — Object Formation Layer

Use for:

- converting extracted material into canonical objects;
- Assertion creation;
- object generation rules.

## Section 6 — Truth and Provenance Layer

Use for:

- truth states;
- support states;
- provenance;
- source/evidence links;
- versioning.

## Section 7 — Memory and Retrieval Layer

Use for:

- memory layers;
- retrieval boundaries;
- vector search;
- matter-scoped retrieval.

## Section 8 — Factual Reasoning Layer

Use for:

- case story;
- chronology;
- factual assertions;
- gaps;
- contradictions.

## Section 9 — Evidentiary Reasoning Layer

Use for:

- evidence support;
- support matrix;
- evidence overreading;
- evidentiary risk.

## Section 10 — Legal Research Layer

Use for:

- research memos;
- legal authorities;
- citation confidence;
- adverse authority.

## Section 11 — Legal Reasoning Layer

Use for:

- legal elements;
- legal conclusions;
- defenses;
- procedural objections.

## Section 12 — Strategy Layer

Use for:

- Strategy Points;
- Strategy Memos;
- attack/defense lines;
- risk-weighted strategy.

## Section 13 — Adversarial Layer

Use for:

- W9;
- red-team;
- attack matrix;
- revision checklist.

## Section 14 — Expression Layer

Use for:

- drafting;
- final outputs;
- persuasive refinement;
- artifact generation.

## Section 15 — Governance Layer

Use for:

- cognitive gates;
- output certification;
- risk blockers;
- autonomy controls.

## Section 16 — Learning Layer

Use for:

- Learning Objects;
- correction logs;
- institutional improvement.

## Section 17 — Cognitive Modes

Use for:

- agent modes;
- prompt modes;
- workflow-specific reasoning profiles.

## Section 18 — Cognitive Feedback Loops

Use for:

- recursive workflows;
- reprocessing;
- W8/W9 loop;
- learning loop.

## Section 19 — Cognition-to-Object Mapping

Use for:

- object model alignment;
- database and schema design.

## Section 20 — Cognition-to-Workflow Mapping

Use for:

- W0–W11 mapping;
- workflow design.

## Section 21 — Cognition-to-Agent Mapping

Use for:

- agent architecture;
- agent prompts;
- role responsibilities.

## Section 22 — MVP Cognitive Architecture

Use for:

- MVP build planning;
- MVP cognition loop;
- MVP exclusions and red lines.

## Section 23 — Target-State Cognitive Architecture

Use for:

- future autonomous cognition;
- maturity levels;
- target-state roadmap.

## Section 24 — Summary

Use for:

- quick recap;
- final cognitive doctrine;
- architectural compliance check.

---

# Fast Lookup Table

| Topic | Primary Sections |
|---|---|
| Cognitive architecture overview | Sections 1, 2, 24 |
| Input classification | Section 3 |
| Extraction / OCR / parsing | Section 4 |
| Object formation | Section 5 |
| Truth / provenance | Section 6 |
| Memory / retrieval | Section 7 |
| Factual reasoning | Section 8 |
| Evidentiary reasoning | Section 9 |
| Legal research | Section 10 |
| Legal reasoning | Section 11 |
| Strategy | Section 12 |
| Adversarial review | Section 13 |
| Drafting / expression | Section 14 |
| Governance | Section 15 |
| Learning | Section 16 |
| Cognitive modes | Section 17 |
| Feedback loops | Section 18 |
| Object mapping | Section 19 |
| Workflow mapping | Section 20 |
| Agent mapping | Section 21 |
| MVP cognition | Section 22 |
| Target-state cognition | Section 23 |

---

# Agent Reading Protocol

Before performing any task based on Document 4, an agent should:

1. **Identify the cognitive function involved.**

   Determine whether the task concerns input classification, extraction, object formation, factual reasoning, evidence reasoning, research, strategy, drafting, adversarial review, governance, or learning.

2. **Read the relevant layer section.**

   Use the Quick Navigation by Task above.

3. **Read Section 19 if the task creates or modifies objects.**

   Cognitive outputs must map to canonical objects.

4. **Read Section 20 if the task affects workflows.**

   Cognitive functions must map correctly to W0–W11.

5. **Read Section 21 if the task affects agents or prompts.**

   Agents execute cognition but do not own the architecture.

6. **Read Section 22 if the task affects MVP.**

   MVP must prove the cognition spine and must not regress into chat over files.

7. **Read Section 24 before final recommendations.**

   Section 24 provides the compressed cognitive doctrine.

---

# Mandatory Cross-Checks for Agents

## For MVP tasks

Read:

- Section 2;
- Section 22;
- Section 24.

Mandatory check:

- Does the MVP prove the cognition spine: Matter → Story → Evidence → Assertions → Support Matrix → Research → Strategy → Argument → Adversarial Review → Revised Artifact?

## For workflow tasks

Read:

- Section 18;
- Section 20;
- Section 22.

Mandatory check:

- Does the workflow preserve feedback loops, required cognitive functions, and structured outputs?

## For agent prompt tasks

Read:

- Section 17;
- Section 21;
- Section 13 if adversarial;
- Section 14 if drafting.

Mandatory check:

- Is the agent executing a defined cognitive mode with clear inputs, outputs, and boundaries?

## For evidence tasks

Read:

- Section 4;
- Section 5;
- Section 9.

Mandatory check:

- Is evidence transformed into structured objects and linked to assertions without overreading?

## For legal drafting tasks

Read:

- Section 11;
- Section 12;
- Section 13;
- Section 14.

Mandatory check:

- Is the draft generated from supported facts, research, strategy, and adversarial review?

## For retrieval/RAG tasks

Read:

- Section 7;
- Section 6;
- Section 15.

Mandatory check:

- Is retrieval scoped, source-linked, and governed before being used for reasoning?

## For institutional learning tasks

Read:

- Section 16;
- Section 18;
- Section 23.

Mandatory check:

- Is learning scoped, source-linked, privilege-aware, and not automatically generalized?

---

# Final Instruction to Agents

Document 4 defines how LEXOS thinks.

Agents must not treat cognition as ordinary prompt completion.

When working on LEXOS, preserve these cognitive rules:

- classify inputs before processing;
- preserve originals;
- extract structured content;
- create canonical objects;
- create explicit assertions;
- assign truth and support states;
- link evidence to assertions;
- separate facts from legal conclusions;
- perform jurisdiction-scoped research;
- build strategy from supported facts and law;
- adversarially attack arguments;
- express outputs without mutating truth;
- govern retrieval, memory, and finality;
- learn only through governed learning.

The MVP must prove the legal cognition spine.

The target-state system must evolve into a governed autonomous legal cognition institution.

## Document Status

**Document Name:** LEXOS Cognitive Architecture  
**Document Number:** Document 4  
**Version:** v1.0 Draft  
**Purpose:** Define how LEXOS performs legal cognition across perception, extraction, object formation, truth management, memory, reasoning, research, strategy, adversarial review, expression, governance, and learning.  
**Depends On:**  
- Document 1 — LEXOS Institutional Doctrine  
- Document 2 — LEXOS Canonical Object Model  
- Document 3 — LEXOS Governance and Epistemic Integrity Rules  

**Primary Use:** Agent orchestration, workflow design, MVP cognition loop, reasoning architecture, retrieval architecture, prompt design, system modularization, and future autonomous operation.

---

# Section 1 — Purpose and Scope

## 1.1 Purpose of This Document

This document defines the cognitive architecture of LEXOS.

The cognitive architecture explains how LEXOS transforms raw legal inputs into structured legal knowledge, strategy, arguments, outputs, risk awareness, and institutional learning.

Document 1 defines LEXOS as an autonomous legal cognition institution.  
Document 2 defines the canonical objects LEXOS uses.  
Document 3 defines the governance rules controlling those objects.  
Document 4 explains how the system thinks and reasons using those objects and rules.

LEXOS must not be designed as a loose collection of agents calling tools. It must be designed as a structured cognition system.

The central question answered by this document is:

> How does LEXOS perceive, structure, verify, reason, challenge, express, and learn legal knowledge?

## 1.2 Scope of This Document

This document defines:

- cognitive layers;
- legal reasoning functions;
- cognitive modes;
- feedback loops;
- object transformations;
- cognition-to-workflow mapping;
- cognition-to-agent mapping;
- cognition-to-MVP reduction;
- and target-state cognitive maturity.

This document does not define:

- final database schema;
- exact prompts;
- workflow state machine details;
- final UI screens;
- deployment architecture;
- model provider selection;
- or legal rules for a specific jurisdiction.

Those belong in later documents.

## 1.3 Core Cognitive Doctrine

The core cognitive doctrine is:

> LEXOS must reason over structured legal objects, source-linked evidence, explicit truth states, governed memory, scoped retrieval, risk controls, and adversarial review. It must not rely on unstructured prompt completion as its primary legal reasoning method.

AI models may assist cognition.

Agents may execute cognition.

Tools may support cognition.

But LEXOS cognition must be governed by object state, provenance, evidence support, and workflow discipline.

---

# Section 2 — Cognitive Architecture Overview

## 2.1 The Cognition Stack

LEXOS cognition is organized into the following layers:

1. Input Perception Layer;
2. Extraction and Structuring Layer;
3. Object Formation Layer;
4. Truth and Provenance Layer;
5. Memory and Retrieval Layer;
6. Factual Reasoning Layer;
7. Evidentiary Reasoning Layer;
8. Legal Research Layer;
9. Legal Reasoning Layer;
10. Strategy Layer;
11. Adversarial Layer;
12. Expression Layer;
13. Governance Layer;
14. Learning Layer.

These layers are conceptual. In MVP, several may be implemented through simplified workflows. In target state, each should become increasingly explicit and modular.

## 2.2 Cognitive Flow

The normal cognitive flow is:

1. Legal input enters system.
2. Input is classified.
3. Text, metadata, structure, and entities are extracted.
4. Legal objects are created.
5. Assertions are identified.
6. Evidence and sources are linked.
7. Truth/support states are assigned.
8. Gaps, contradictions, and risks are identified.
9. Research is conducted.
10. Strategy is generated.
11. Argument is drafted.
12. Argument is attacked.
13. Argument is revised.
14. Output is classified.
15. Learning is captured where appropriate.

This is not always linear. New evidence, contradictions, research, or adversarial findings may send the system backward.

## 2.3 The Cognitive Spine

The minimum LEXOS cognition spine is:

> Matter → Story → Evidence → Assertions → Support Matrix → Research → Strategy → Argument → Adversarial Review → Revised Artifact.

The MVP must prove this spine.

Without this spine, the system is not LEXOS.

## 2.4 Cognitive Integrity Requirements

LEXOS cognition must satisfy:

1. source traceability;
2. truth-state visibility;
3. matter scope;
4. evidence linkage;
5. contradiction awareness;
6. jurisdictional awareness;
7. privilege awareness;
8. risk awareness;
9. adversarial testing;
10. version continuity.

---

# Section 3 — Input Perception Layer

## 3.1 Purpose

The Input Perception Layer receives and initially classifies legal inputs.

It determines what the system is looking at before deeper processing occurs.

## 3.2 Input Types

LEXOS may receive:

- client statements;
- intake notes;
- identity documents;
- court filings;
- prosecution files;
- plaintiff pleadings;
- defense materials;
- contracts;
- emails;
- messaging exports;
- bank records;
- corporate records;
- invoices;
- screenshots;
- photos;
- audio;
- video;
- transcripts;
- legal authorities;
- public registry documents;
- expert reports;
- human instructions;
- AI-generated drafts.

## 3.3 Perception Questions

For every input, the system should ask:

- What is this?
- Who provided it?
- Which client does it relate to?
- Which matter does it relate to?
- Is it evidence, source material, legal authority, instruction, draft, or operational record?
- What language is it in?
- Is it privileged or confidential?
- Is it client-provided, opposing-party-provided, court-provided, public, or system-generated?
- What workflow should receive it?
- What processing is required?

## 3.4 Perception Output

The Input Perception Layer should produce:

- Source Object;
- Evidence Object where applicable;
- preliminary classification;
- matter linkage;
- language detection;
- confidentiality/privilege initial status;
- processing route;
- risk flags if obvious.

## 3.5 MVP Implementation

MVP should implement input perception through:

- upload form;
- client/matter selector;
- evidence type selector;
- source type selector;
- basic language field;
- basic privilege/confidentiality field;
- processing status.

The MVP may use AI classification, but user confirmation should remain available.

---

# Section 4 — Extraction and Structuring Layer

## 4.1 Purpose

The Extraction and Structuring Layer converts raw inputs into machine-usable and human-readable structured content.

## 4.2 Extraction Functions

Extraction functions are **multimodal**.

LEXOS extraction cognition is **parser-first for document-like evidence**: **LlamaParse or equivalent layout-aware parsers** are the preferred primary extraction layer for supported PDFs (including classes of scanned composites and stitched screenshot PDFs hosted by multimodal parsers). **OCR** detects pixel-visible glyphs but **does not by itself reconstruct** lawful layout/messenger/table/evidentiary structure; **vision/layout reasoning** complements parsers for screenshots, chat bubbles, handwriting, overlays, seals, captions, spreadsheets, degraded scans—without treating raw OCR dumps as accepted finals where structure is material absent QA/disposition flags.

Not all evidence produces plain text alone. LEXOS routing must match the ingestion pathway declared in Workflow W4: parser-forward documents, OCR/vision-assisted composites, photographic evidence, audio, optional video tooling, metadata-only stubs, or manual curator extraction.

Operations may include:

- OCR (supporting modality);

- deterministic or model-assisted parsers;

- text extraction distinguished from markdown extraction outputs;

- structured JSON extraction normalized to LEXOS schemas;

- table and layout reconstruction;

- metadata extraction;

- entity, date, and language detection;

- document sectioning and page references;

- speaker identification / diarization (target-state richer than MVP defaults);

- speech-to-transcript conversion with timestamps;

- frame, keyframe, or scene-derived descriptors for imagery/video;

- quality scoring and QA comparator passes;

- multimodal merges (for example parser output + OCR + vision verification).

## 4.3 Extraction Outputs

Extractions emit layered artifacts distinguished for governance:

- Evidence Extraction Object (canonical linkage record);

- **markdown extraction** optimized for lawyer/agent reading;

- **structured JSON extraction** capturing machine-stable fields (`entities`, `dates`, layout tables, OCR segments, transcripts, descriptors);

- timestamped transcripts and diarized segments where audio/video pathways run;

- **visual descriptions**, scene cues, detected objects, charts, or handwriting notes for photographic evidence;

- consolidated **OCR-derived text overlays** captured as segments when parser/vision stacks register pixel-visible glyphs (distinct from finalized markdown narratives);

- **extraction quality status** (`accepted`, `QA flagged`, `failed`, `human review required`);

- **quality flags** with explicit references to questionable spans;

- extractor and QA comparator metadata;

- embeddings / vector chunk references when retrieval is enabled (always derived; never substitutes for originals);

- extraction QA result summary;

- mandated **human review requirement** booleans tied to materially sensitive modalities.

### Multimodal extraction principle

Extraction is multimodal. Not all evidence produces linear text alone. A photo of a scene may legitimately yield visual description metadata and forensic-style labels without traditional paragraphs. Audio yields timestamped transcripts. Video yields metadata timelines, transcripts from audio tracks, keyframe captions, OCR from frames when enabled, and a visual timeline—all treated as derivatives pending review.

### Evidentiary anchor rule

> The original file remains the evidentiary anchor. Markdown, JSON, transcripts, visual descriptions, OCR, embeddings, summaries, and agent outputs are derived artifacts that must link back to the original Evidence Object.

## 4.4 Extraction Integrity Rule

Extraction does not replace original evidence.

The original Evidence Object remains the evidentiary anchor.

Extraction—including markdown dumps, structured JSON payloads, OCR, transcripts, visual descriptions, and embeddings—is a **derived artifact** family that must preserve provenance. Agents must ingest these layers only alongside status flags surfaced from Workflow W4 governance gates.

Machine-generated summaries or narrative shorthand never substitute for opening the anchored original asset when authenticity or precision disputes arise.

### Evidentiary aid warning for downstream cognition

Machine-generated descriptions, OCR, transcripts, embeddings, JSON normalizations, and markdown renderings remain **hypothesis surfaces** usable for search/prompt context. They attain **trusted operational status** only through human review regimes defined in Governance Document 3 and Security Document 6.

## 4.5 MVP Implementation

MVP must support:

- PDF/DOCX/TXT uploads plus scanned/screenshot composites handled via **LlamaParse/equivalent parser-first OCR/vision-assisted** lanes—not OCR-as-final substitutes for structured markdown + JSON absent QA flags when structure is material;

- evidence file classification and routing consistent with Workflow W4-lite;

- simultaneous **markdown extraction** and **structured JSON extraction** stored with an Evidence Extraction Object;

- extraction QA comparator or equivalent scripted checks for supported classes;

- explicit **extraction quality status**, **quality flags**, and **processing status** visible to operators and agents;

- derived artifact storage that never overwrites the original upload;

- optional embeddings generated only from current/accepted extraction chunks when retrieval is enabled, with evidence_id and extraction_id linkage.

Advanced audio/video automation, handwriting experts, seal analysis, full forensic metadata, and certified translation flows may stay partially deferred, but MVP must still preserve originals and represent deferred states honestly in workflow status.

---

# Section 5 — Object Formation Layer

## 5.1 Purpose

The Object Formation Layer converts extracted information into canonical LEXOS objects.

This is the layer that turns documents into legal cognition.

## 5.2 Object Formation Functions

The layer may create:

- Client;
- Matter;
- Source;
- Evidence;
- Evidence Extraction;
- Person;
- Entity;
- Assertion;
- Timeline Event;
- Contradiction;
- Risk;
- Legal Authority;
- Research Memo;
- Strategy Point;
- Argument Node;
- Output Artifact;
- Translation;
- Audit Event.

## 5.3 Object Formation Rule

Agents and workflows must create structured objects when information has continuing legal relevance.

They should not leave legally significant information only in freeform text.

## 5.4 Assertion Formation

Assertions are especially important.

The system should extract legally significant assertions from:

- client stories;
- opposing pleadings;
- court files;
- documents;
- witness statements;
- research memos;
- strategy memos;
- drafts.

Assertions should be atomic where possible.

## 5.5 MVP Implementation

MVP should create:

- Evidence Objects from uploads;
- Assertions from case story;
- Support Matrix from assertions and evidence;
- Output Artifacts from generated work;
- Risks from detected issues;
- Workflow State for matter progression.

---

# Section 6 — Truth and Provenance Layer

## 6.1 Purpose

The Truth and Provenance Layer determines the status of what LEXOS believes, why it believes it, and how that belief has changed.

## 6.2 Truth Functions

This layer assigns and updates:

- truth state;
- support state;
- use status;
- source links;
- evidence links;
- confidence;
- contradiction status;
- version history.

## 6.3 Provenance Functions

This layer tracks:

- source origin;
- evidence origin;
- extraction tool/model;
- workflow origin;
- agent origin;
- model/prompt used;
- transformation history;
- review history;
- dependency mapping.

## 6.4 Truth Discipline Rule

Repeated text does not become truth.

A claim repeated in multiple drafts remains unsupported unless supported by source, evidence, authority, or verified confirmation.

## 6.5 MVP Implementation

MVP must support:

- assertion truth state;
- assertion support state;
- source/evidence links;
- artifact versioning;
- basic audit events;
- contradiction flag.

---

# Section 7 — Memory and Retrieval Layer

## 7.1 Purpose

The Memory and Retrieval Layer stores and retrieves legal information for use by agents and workflows.

## 7.2 Memory Layers

LEXOS memory includes:

- ephemeral execution memory;
- intake memory;
- client memory;
- matter memory;
- evidence memory;
- research memory;
- strategy memory;
- output memory;
- operational memory;
- institutional memory.

## 7.3 Retrieval Rule

Retrieval must be scoped before semantic search.

The system must filter by:

- tenant;
- client;
- matter;
- role;
- workflow;
- privilege;
- confidentiality;
- object type;
- truth/use status;
- jurisdiction.

## 7.4 Memory Use in Cognition

Memory supports:

- client continuity;
- matter history;
- evidence recall;
- contradiction detection;
- legal research reuse;
- strategy refinement;
- drafting consistency;
- adversarial review;
- learning.

## 7.5 MVP Implementation

MVP should implement:

- matter-scoped records;
- evidence-scoped retrieval;
- optional embeddings with matter metadata;
- no global unfiltered vector search;
- basic artifact retrieval by matter.

---

# Section 8 — Factual Reasoning Layer

## 8.1 Purpose

The Factual Reasoning Layer determines what happened, what may have happened, what is alleged, what is supported, what is disputed, and what remains unknown.

## 8.2 Factual Reasoning Questions

The system asks:

- Who was involved?
- What happened?
- When did it happen?
- Where did it happen?
- What documents support it?
- What sources contradict it?
- What is only client-stated?
- What is only opposing-party alleged?
- What is inferred?
- What is missing?
- What needs verification?

## 8.3 Factual Outputs

This layer may produce:

- Assertion Objects;
- Timeline Events;
- Contradiction Objects;
- Support Matrix;
- Client Gap Report;
- Evidence Needs Register;
- Fact Promotion Requests.

## 8.4 Factual Reasoning Rule

Factual reasoning must remain separate from legal conclusion.

Example:

Factual assertion:

> Person X was not listed as director of Company Y.

Legal conclusion:

> Person X did not control Company Y.

These require different reasoning and support.

## 8.5 MVP Implementation

MVP should implement:

- case story assertions;
- evidence support mapping;
- unsupported fact list;
- contradiction list;
- basic timeline where useful.

---

# Section 9 — Evidentiary Reasoning Layer

## 9.1 Purpose

The Evidentiary Reasoning Layer determines what evidence proves, does not prove, contradicts, or contextualizes.

> Machine-generated visual descriptions, OCR dumps, transcripts, embeddings, JSON normalizations, and extraction summaries are **evidentiary aids**, not the original evidence. They may support search, comparison, and drafting, but must not be treated as verified fact unless human review (and linkage back to the original source) satisfies Governance rules.

## 9.2 Evidentiary Reasoning Questions

The system asks:

- What does this evidence directly show?
- What does it indirectly support?
- What does it not prove?
- Is it complete?
- Is it authentic?
- Is extraction reliable?
- Is it privileged?
- Is it admissible?
- Does it contradict another source?
- Is the evidence being overread?

## 9.3 Evidentiary Outputs

This layer may produce:

- Evidence-to-Assertion links;
- support states;
- evidence quality flags;
- contradiction objects;
- evidentiary risks;
- admissibility notes;
- authenticity notes;
- exhibit candidates.

## 9.4 Evidence Overreading Control

The system must prevent evidence from being used to support broader claims than it actually supports.

## 9.5 MVP Implementation

MVP should support:

- direct/partial/unsupported/contradicted support labels;
- evidence notes;
- extraction quality flags;
- evidence-to-assertion support matrix.

---

# Section 10 — Legal Research Layer

## 10.1 Purpose

The Legal Research Layer identifies, retrieves, verifies, and organizes legal authority and external sources.

## 10.2 Research Questions

The system asks:

- What jurisdiction applies?
- What legal issue is being researched?
- What primary authority exists?
- What adverse authority exists?
- Is the authority binding or persuasive?
- Is the authority current?
- Does it support the proposition?
- What procedural rules apply?
- What citation confidence exists?

## 10.3 Research Outputs

This layer may produce:

- Legal Authority Objects;
- Research Memos;
- adverse authority lists;
- citation confidence records;
- legal risk flags;
- jurisdictional assumptions.

## 10.4 Research Integrity Rule

AI legal research is draft research until sources are verified.

No court-facing output should rely on unverified AI-generated legal citations.

## 10.5 MVP Implementation

MVP should implement:

- jurisdiction field;
- research memo object;
- source/authority list;
- legal research summary;
- adverse authority note where available.

Full citation verification may be Phase 2.

---

# Section 11 — Legal Reasoning Layer

## 11.1 Purpose

The Legal Reasoning Layer applies legal rules to factual and evidentiary records.

## 11.2 Legal Reasoning Questions

The system asks:

- What are the legal elements?
- Which facts satisfy or fail each element?
- What burden of proof applies?
- What defenses exist?
- What procedural objections exist?
- What remedies are available?
- What facts are legally material?
- What authorities govern?
- What adverse legal risk exists?

## 11.3 Legal Reasoning Outputs

This layer may produce:

- legal issue list;
- element mapping;
- Strategy Points;
- Legal Risk Objects;
- Argument Nodes;
- Research Memo requests;
- procedural risk flags.

## 11.4 Legal Reasoning Rule

Legal reasoning must not assume unsupported factual premises.

If legal reasoning depends on an unsupported fact, the dependency must be visible.

## 11.5 MVP Implementation

MVP should include:

- strategy memo;
- research memo;
- argument draft;
- visible support dependencies.

---

# Section 12 — Strategy Layer

## 12.1 Purpose

The Strategy Layer determines how LEXOS should pursue or defend the matter based on facts, evidence, law, risk, procedure, and client objectives.

## 12.2 Strategy Questions

The system asks:

- What is the strongest position?
- What is the weakest point?
- What should be emphasized?
- What should be avoided?
- What evidence is missing?
- What legal theory is viable?
- What procedural options exist?
- What will the opponent argue?
- What creates leverage?
- What risks are acceptable?

## 12.3 Strategy Outputs

The Strategy Layer may produce:

- Strategy Points;
- Strategy Memo;
- attack lines;
- defense lines;
- procedural strategy;
- evidence priority list;
- legal research requests;
- adversarial targets;
- risk-weighted strategy map.

## 12.4 Strategy Discipline Rule

Strategy must remain linked to support state and legal authority.

A strategy based on weak facts may still be explored, but it must be marked as fact-dependent or high-risk.

## 12.5 MVP Implementation

MVP should generate:

- Strategy Memo from Support Matrix;
- strongest and weakest points;
- missing evidence;
- key risks;
- research needs.

---

# Section 13 — Adversarial Layer

## 13.1 Purpose

The Adversarial Layer attacks LEXOS’s own reasoning, strategy, arguments, evidence use, and outputs.

## 13.2 Adversarial Questions

The system asks:

- How would opposing counsel attack this?
- How would a prosecutor attack this?
- How would a judge question this?
- What fact is weakest?
- What evidence is missing?
- What law is adverse?
- What is overstated?
- What contradiction remains?
- What alternative explanation exists?
- What procedural defect exists?

## 13.3 Adversarial Outputs

This layer may produce:

- Adversarial Critique Objects;
- attack matrix;
- weakness register;
- revision checklist;
- risk updates;
- contradiction escalation;
- loop exit recommendation.

## 13.4 Adversarial Independence Rule

Adversarial review must not be deferential to the drafting agent.

Where possible, W9 should use different prompt framing, retrieval emphasis, and model strategy from W8.

## 13.5 MVP Implementation

MVP must include at least one adversarial critique after argument draft.

This is a core LEXOS differentiator.

---

# Section 14 — Expression Layer

## 14.1 Purpose

The Expression Layer converts structured cognition into legal work product.

## 14.2 Expression Outputs

Expression may produce:

- client updates;
- case stories;
- evidence requests;
- support matrices;
- research memos;
- strategy memos;
- argument drafts;
- adversarial reports;
- visual exhibits;
- final presentation bundles;
- translations.

## 14.3 Expression Rule

Expression must not mutate truth.

The system may improve clarity, structure, tone, persuasion, and flow.

It may not:

- invent facts;
- remove necessary caveats;
- hide unsupported status;
- misstate evidence;
- misstate law;
- weaken privilege controls;
- convert internal doubts into external certainty.

## 14.4 Artifact Rule

Every material expression output must be an Output Artifact with status, version, workflow origin, and source basis.

## 14.5 MVP Implementation

MVP should produce:

- Case Story Artifact;
- Support Matrix Artifact;
- Strategy Memo;
- Research Memo;
- Argument Draft;
- Adversarial Critique;
- Revised Output.

---

# Section 15 — Governance Layer

## 15.1 Purpose

The Governance Layer controls all other cognitive layers.

It determines whether the system may proceed, retrieve, use, finalize, promote, disclose, learn, or act.

## 15.2 Governance Functions

The Governance Layer checks:

- truth state;
- support state;
- use status;
- source support;
- risk status;
- workflow status;
- privilege/confidentiality;
- retrieval scope;
- artifact status;
- model/tool authority;
- agent authority;
- human review status;
- autonomy level.

## 15.3 Governance Output

The layer may produce:

- approval;
- rejection;
- blocker;
- escalation;
- risk creation;
- review request;
- workflow transition;
- output certification;
- autonomy reduction.

## 15.4 MVP Implementation

MVP governance may be simple but must include:

- blocked/active workflow status;
- artifact status;
- risk flags;
- support-state visibility;
- no filing-ready external action;
- human review marker.

---

# Section 16 — Learning Layer

## 16.1 Purpose

The Learning Layer allows LEXOS to improve over time without contaminating memory.

## 16.2 Learning Inputs

LEXOS may learn from:

- case outcomes;
- human corrections;
- client corrections;
- adversarial findings;
- model errors;
- workflow failures;
- extraction failures;
- citation errors;
- translation corrections;
- risk events;
- security incidents.

## 16.3 Learning Outputs

The Learning Layer may produce:

- Learning Objects;
- model-risk notes;
- workflow improvements;
- prompt improvements;
- jurisdiction updates;
- translation glossary entries;
- strategy patterns;
- risk taxonomy updates;
- testing benchmarks.

## 16.4 Learning Governance Rule

Experience is not automatically knowledge.

Learning must be scoped, source-linked, confidence-rated, and privilege-aware.

## 16.5 MVP Implementation

MVP may use manual Learning Notes.

It should record:

- human corrections;
- model errors;
- workflow failures;
- adversarial findings;
- outcome notes where available.

---

# Section 17 — Cognitive Modes

## 17.1 Purpose

LEXOS should operate in different cognitive modes depending on task.

A cognitive mode is a reasoning configuration with different priorities, inputs, outputs, and safeguards.

## 17.2 Intake Mode

Focus:

- identity;
- conflict;
- KYC/CDD;
- preliminary story;
- engagement scope;
- risk screening.

Cognitive safeguards:

- W0 cognition MUST stay **instance-scoped** to a sanctioned `intake_id` workload (single prospect, sanctioned **Intake Group**, or narrowly scoped existing-client new-matter revisit).
- The **W0 Intake Orchestrator** MAY sequence queues/routing—but MUST NOT consolidate **unrelated** prospective clients into one combined legal-reasoning context.
- Candidate assertions remain **hypotheses**: **persistent W1 client cognition activates only post-acceptance handoff**.
- Related co-parties MAY share curated **group** memory slices **only** when classified into an Intake Group, while preserving **distinct** conflict/KYC/authority cognitions per prospect.

Primary workflows:

- W0.

## 17.3 Client Memory Mode

Focus:

- client facts;
- client history;
- client master story;
- cross-matter continuity;
- fact promotion.

Primary workflows:

- W1.

## 17.4 Case Story Mode

Focus:

- client narrative;
- parties;
- chronology;
- facts;
- vulnerabilities;
- preliminary assertions.

Primary workflows:

- W2.

## 17.5 Opposing File Mode

Focus:

- opposing allegations;
- prosecution/plaintiff materials;
- court file;
- paragraph-level indexing;
- reconciliation.

Primary workflows:

- W3.

## 17.6 Evidence Mode

Focus:

- document ingest;
- extraction;
- metadata;
- evidence classification;
- evidence registry.

Primary workflows:

- W4.

## 17.7 Support Mapping Mode

Focus:

- assertions;
- evidence support;
- unsupported facts;
- contradictions;
- support matrix.

Primary workflows:

- W5.

## 17.8 Strategy Mode

Focus:

- plaintiff attack lines;
- defense lines;
- procedural strategy;
- risk-weighted choices.

Primary workflows:

- W6.

## 17.9 Research Mode

Focus:

- jurisdictional research;
- legal authorities;
- adverse law;
- citation confidence.

Primary workflows:

- W7.

## 17.10 Argument Mode

Focus:

- structured legal argument;
- fact-law-evidence linkage;
- legal drafting.

Primary workflows:

- W8.

## 17.11 Adversarial Mode

Focus:

- attack;
- weakness;
- contradiction;
- adverse authority;
- revision demands.

Primary workflows:

- W9.

## 17.12 Visualization Mode

Focus:

- timelines;
- entity maps;
- transaction flows;
- evidentiary tables.

Primary workflows:

- W10.

## 17.13 Rhetorical Refinement Mode

Focus:

- clarity;
- persuasion;
- audience fit;
- final integration.

Primary workflows:

- W11.

## 17.14 Governance Mode

Focus:

- compliance with system rules;
- risk;
- privilege;
- finality;
- autonomy boundaries.

Primary workflows:

- all workflows.

---

# Section 18 — Cognitive Feedback Loops

## 18.1 Purpose

Legal cognition is recursive.

LEXOS must support feedback loops.

## 18.2 Core Feedback Loops

Required loops include:

1. W2 → W1 fact promotion;
2. W3 → W2 story revision;
3. W4 → W5 evidence support;
4. W5 → W4 evidence gap or reprocessing;
5. W5 → W2 story correction;
6. W6 → W7 research request;
7. W7 → W6 strategy revision;
8. W8 → W9 adversarial review;
9. W9 → W8 revision;
10. W11 → W8/W5 if rhetoric exposes unsupported claims;
11. outcome → learning layer.

## 18.3 Loop Control Rule

Feedback loops must be controlled.

Each loop should record:

- trigger;
- source workflow;
- target workflow;
- affected objects;
- reason;
- required action;
- status;
- timestamp.

## 18.4 MVP Feedback Loops

MVP should implement at least:

- W5 support gaps → evidence/request list;
- W8 argument → W9 critique;
- W9 critique → revised argument;
- human correction → versioned output.

---

# Section 19 — Cognition-to-Object Mapping

## 19.1 Purpose

This section maps cognitive layers to canonical objects.

## 19.2 Mapping Table

| Cognitive Function | Primary Objects |
|---|---|
| Perception | Source, Evidence, Matter |
| Extraction | Evidence Extraction, Source |
| Object Formation | Assertion, Person, Entity, Timeline Event |
| Truth | Assertion, Fact, Contradiction |
| Provenance | Source, Evidence, Audit Event |
| Memory | Client, Matter, Output Artifact, Learning Object |
| Factual Reasoning | Assertion, Timeline Event, Contradiction |
| Evidentiary Reasoning | Evidence, Assertion, Risk |
| Legal Research | Legal Authority, Research Memo |
| Legal Reasoning | Research Memo, Strategy Point, Argument Node |
| Strategy | Strategy Point, Strategy Memo, Risk |
| Adversarial Review | Adversarial Critique, Risk, Contradiction |
| Expression | Output Artifact, Argument Draft |
| Governance | Risk, Review Event, Workflow State |
| Learning | Learning Object, Audit Event |

## 19.3 Implementation Rule

Every cognitive function that produces reusable legal knowledge should create or update canonical objects.

---

# Section 20 — Cognition-to-Workflow Mapping

## 20.1 Purpose

This section maps cognitive layers to W0–W11.

## 20.2 Workflow Mapping Table

| Workflow | Primary Cognitive Functions |
|---|---|
| W0 | Perception, intake classification, risk screening |
| W1 | Memory, truth promotion, client continuity |
| W2 | Factual reasoning, story formation, assertion creation |
| W3 | Perception, opposing-file extraction, reconciliation, contradiction detection |
| W4 | Extraction, evidence object formation |
| W5 | Evidentiary reasoning, support mapping, contradiction detection |
| W6 | Strategy, legal reasoning, risk evaluation |
| W7 | Legal research, citation validation, adverse authority |
| W8 | Argument reasoning, expression |
| W9 | Adversarial reasoning, risk escalation |
| W10 | Visual expression, evidence visualization |
| W11 | Rhetorical expression, final artifact integration |

## 20.3 Workflow Rule

Workflows execute cognitive functions.

They are not the cognition itself.

The cognitive architecture should remain stable even if workflows are split, merged, or reimplemented.

---

# Section 21 — Cognition-to-Agent Mapping

## 21.1 Purpose

This section maps cognitive functions to agent roles.

## 21.2 Agent Mapping Table

| Agent | Primary Cognitive Functions |
|---|---|
| Intake Specialist | perception, intake screening |
| Custodian | memory, promotion, client continuity |
| Story Architect | factual reasoning, narrative formation |
| Intake Clerk | opposing-file perception and indexing |
| Evidence Archivist | extraction, evidence formation |
| Analyst | evidentiary reasoning, support mapping |
| Strategist | strategy and risk reasoning |
| Librarian | research and authority validation |
| Advocate | legal reasoning and argument drafting |
| Adversary | adversarial reasoning |
| Visualizer | visual expression |
| Rhetorician | persuasive expression |
| Governance Agents | governance and certification |

## 21.3 Agent Rule

Agents execute cognitive functions under governance.

Agents do not own the cognitive architecture.

Agents may be replaced without changing the architecture.

---

# Section 22 — MVP Cognitive Architecture

## 22.1 MVP Cognitive Objective

The MVP should prove that LEXOS can perform a complete legal cognition loop in a matter-scoped, evidence-grounded, object-centric way.

## 22.2 Required MVP Cognitive Functions

The MVP cognitive function set must cover at least:

- Matter creation;

- Case story creation;

- **Enhanced digital evidence ingest (W4-lite)** with originals preserved;

- **Evidence file classification and extraction pathways** mapped to LEXOS ingestion doctrine;

- **Markdown extraction** paired with **structured JSON extraction artifacts** housed on Evidence Extraction Objects;

- **Extraction QA** execution where tooling exists, plus surfaced **quality status and flags**;

- **Derived artifact storage** (markdown/JSON/transcripts/visual metadata) distinctly layered from originals;

- **Optional embeddings** generated only when retrieval infrastructure is enabled, always referencing evidence_id and extraction_id;

- Assertion creation;

- Support mapping anchored to trustworthy extraction scopes;

- Strategy memo generation;

- Research memo generation or attachment;

- Argument drafting;

- Adversarial critique;

- Revised output;

- Workflow state tracking;

- Basic risk tracking;

- Artifact versioning.

## 22.3 MVP Cognitive Simplifications

MVP may simplify:

- W0 onboarding;
- W1 verification ladder;
- W3 opposing-file reconciliation unless defense is initial use case;
- all-media evidence;
- full citation verification;
- visual exhibits;
- institutional learning;
- automated governance agents.

## 22.4 MVP Cognitive Red Lines

MVP must not:

- rely only on chat over files;
- skip Assertions;
- skip Evidence Objects;
- skip support states;
- generate arguments without support matrix;
- ignore matter scope;
- skip artifact status;
- skip workflow state;
- use unfiltered global retrieval.

---

# Section 23 — Target-State Cognitive Architecture

## 23.1 Target-State Direction

Target-state LEXOS should become a modular autonomous legal cognition institution.

It should support:

- autonomous input classification;
- multimodal extraction;
- structured legal object formation;
- assertion-level truth management;
- provenance graph;
- governed memory;
- factual reasoning;
- evidentiary reasoning;
- legal research;
- jurisdictional reasoning;
- strategic reasoning;
- adversarial reasoning;
- persuasive expression;
- visual expression;
- governance enforcement;
- institutional learning;
- autonomy calibration.

## 23.2 Cognitive Maturity Levels

Suggested maturity levels:

### Level 1 — Object-Centric MVP

Basic objects, simple workflows, human-supervised outputs.

### Level 2 — Workflow-Centric Legal Cognition

W0–W11 partially automated with state tracking and artifacts.

### Level 3 — Governed Agentic Cognition

Agents autonomously execute workflows under governance.

### Level 4 — Recursive Legal Cognition

System supports feedback loops, contradiction arbitration, and strategy iteration.

### Level 5 — Institutional Learning Cognition

System improves from outcomes and errors.

### Level 6 — Autonomous Legal Institution

System performs most legal cognition and execution with humans as configurable compatibility layer.

## 23.3 Target-State Rule

Do not increase cognitive autonomy faster than governance, evidence discipline, retrieval control, and risk management mature.

---

# Section 24 — Summary

LEXOS cognition is structured through layers:

1. Input Perception;
2. Extraction and Structuring;
3. Object Formation;
4. Truth and Provenance;
5. Memory and Retrieval;
6. Factual Reasoning;
7. Evidentiary Reasoning;
8. Legal Research;
9. Legal Reasoning;
10. Strategy;
11. Adversarial Review;
12. Expression;
13. Governance;
14. Learning.

The MVP must prove the legal cognition spine:

> Matter → Story → Evidence → Assertions → Support Matrix → Research → Strategy → Argument → Adversarial Review → Revised Artifact.

The most important cognitive rules are:

1. Reason over objects, not raw text alone.
2. Preserve original sources.
3. Extract assertions explicitly.
4. Assign truth and support states.
5. Link evidence to assertions.
6. Keep factual reasoning separate from legal conclusion.
7. Treat research as jurisdiction-scoped.
8. Link strategy to support and risk.
9. Red-team arguments before finalization.
10. Prevent persuasion from mutating truth.
11. Govern retrieval and memory.
12. Learn only through governed learning objects.

The target-state system should evolve from a supervised object-centric MVP into a governed autonomous legal cognition institution.