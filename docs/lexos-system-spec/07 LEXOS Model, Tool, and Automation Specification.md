# Document 7 — LEXOS Model, Tool, and Automation Specification

# Document Index and Agent Navigation Guide

## Purpose of This Index

This index helps human readers, AI agents, coding agents, legal agents, automation agents, and system architects quickly locate relevant model, tool, prompt, and automation rules in **Document 7 — LEXOS Model, Tool, and Automation Specification**.

Document 7 defines how LEXOS governs models, tools, prompts, automations, orchestration, structured outputs, logging, cost, latency, observability, evaluation, and MVP/target-state model-tool architecture.

Agents should use this index before performing any model-routing, prompt, tool, automation, agent, MVP, workflow, or technical implementation task.

---

# Quick Navigation by Task

## If the task is about overall model/tool doctrine

Read:

- **Section 1 — Purpose and Scope**
- **Section 2 — Core Model/Tool Doctrine**
- **Section 27 — Summary**

Use these sections to understand why LEXOS treats models and tools as governed resources.

Key concepts:

- model-agnostic but model-aware;
- tool-agnostic but tool-governed;
- model output is not truth;
- tool execution is not authority;
- automation requires governance.

---

## If the task is about the model registry

Read:

- **Section 3 — Model Registry**

Use this section when designing model registry tables, model metadata, approved/prohibited use cases, model status, or model type fields.

Key concepts:

- model ID;
- provider;
- model type;
- approved workflows;
- approved tasks;
- prohibited tasks;
- confidentiality rating;
- model status.

---

## If the task is about choosing models for legal tasks

Read:

- **Section 4 — Model Task Suitability**
- **Section 5 — Model Routing**
- **Section 6 — Model Risk Management**

Use these sections when deciding which model should handle extraction, research, drafting, translation, adversarial critique, or governance checks.

Key concepts:

- task categories;
- high-risk task categories;
- extraction models;
- legal research models;
- translation models;
- routing by risk, language, jurisdiction, sensitivity, cost, and latency.

---

## If the task is about model risk

Read:

- **Section 6 — Model Risk Management**
- **Section 24 — Evaluation and Benchmarking**

Use these sections when designing model-risk records, hallucination controls, citation-risk handling, drift monitoring, or model evaluation.

Key concepts:

- hallucinated facts;
- hallucinated citations;
- wrong jurisdiction;
- mistranslation;
- context omission;
- model drift;
- model-risk controls.

---

## If the task is about prompt versioning

Read:

- **Section 7 — Prompt Registry**

Use this section when designing prompt records, prompt versions, prompt metadata, prompt safety requirements, or workflow prompt IDs.

Key concepts:

- prompt ID;
- workflow;
- agent role;
- prompt text;
- version;
- input/output schema;
- prohibited actions;
- prompt safety requirements.

---

## If the task is about the tool registry

Read:

- **Section 8 — Tool Registry**

Use this section when designing tool records, approved workflows, approved agents, tool risk classes, and tool status.

Key concepts:

- tool ID;
- tool type;
- approved workflows;
- approved agents;
- risk class;
- status;
- failure modes.

---

## If the task is about which agent may use which tool

Read:

- **Section 9 — Tool Authority Matrix**

Use this section when designing agent permissions, tool access control, workflow tool restrictions, or prohibited tool usage.

Key concepts:

- agent-tool matrix;
- prohibited tool use;
- high-risk tools;
- role-specific tool permissions.

---

## If the task is about structured outputs

Read:

- **Section 10 — Structured Output Specification**

Use this section when designing JSON outputs, schema validation, database-ready records, support matrix generation, risk records, adversarial critiques, or workflow handoffs.

Key concepts:

- JSON;
- fixed markdown;
- database-ready outputs;
- schema validation;
- structured outputs for legal cognition.

---

## If the task is about deterministic logic vs AI reasoning

Read:

- **Section 11 — Deterministic Systems vs AI Systems**

Use this section when deciding whether a task should be handled by code, database constraints, policy checks, or AI.

Key concepts:

- deterministic validation;
- AI cognition;
- deterministic controls govern AI;
- permissions and status checks should not rely on AI.

---

## If the task is about workflow automation

Read:

- **Section 12 — Automation Architecture**
- **Section 13 — Workflow Orchestration**

Use these sections when designing automated workflow transitions, task queues, evidence processing, retries, artifact generation, or autonomous agents.

Key concepts:

- automation types;
- automation risk classes;
- low/moderate/high-risk automation;
- orchestration responsibilities;
- MVP orchestration;
- target-state orchestration.

---

## If the task is about tool-call logs

Read:

- **Section 14 — Tool Call Logging**

Use this section when designing tool-call audit records, tool failures, retries, created objects, modified objects, or tool-call observability.

Key concepts:

- tool name;
- actor/agent;
- workflow;
- matter ID;
- purpose;
- status;
- failure rule.

---

## If the task is about model-use logs

Read:

- **Section 15 — Model Use Logging**

Use this section when designing model-run logs, prompt context logs, model output metadata, cost/latency logs, or output traceability.

Key concepts:

- model name;
- provider;
- workflow;
- agent;
- output artifact;
- prompt ID;
- retrieved context object IDs;
- cost and latency.

---

## If the task is about external search or legal research tools

Read:

- **Section 16 — External Search and Legal Research Tools**

Use this section when designing public search, legal research, source discovery, citation verification, authority classification, or W7 tooling.

Key concepts:

- search snippets are not authority;
- primary vs secondary authority;
- citation verification;
- AI research as draft;
- MVP research memo requirements.

---

## If the task is about evidence processing tools

Read:

- **Section 17 — Evidence Processing Tools**

Use this section when designing document upload, OCR, parsing, transcription, metadata extraction, hashing, embeddings, or extraction quality fields.

Key concepts:

- evidence tool types;
- Evidence Object linkage;
- extraction quality;
- MVP evidence tooling.

---

## If the task is about embeddings or retrieval tools

Read:

- **Section 18 — Embedding and Retrieval Tools**

Use this section when designing pgvector, chunk metadata, matter-scoped retrieval, chunking, embedding updates, or retrieval filters.

Key concepts:

- embedding metadata;
- structured filters before vector similarity;
- chunking rule;
- re-embedding rule.

---

## If the task is about translation tools

Read:

- **Section 19 — Translation Tools**

Use this section when designing bilingual workflows, translation objects, translation routing, or legal translation review.

Key concepts:

- source language;
- target language;
- original text;
- translated text;
- translation type;
- confidence;
- court-ready not assumed.

---

## If the task is about document generation or export

Read:

- **Section 20 — Document Generation and Export Tools**

Use this section when designing markdown/DOCX/PDF generation, export logs, artifact status, external sharing, or final document generation.

Key concepts:

- artifact ID;
- version;
- source basis;
- workflow origin;
- export logging;
- export does not imply finality.

---

## If the task is about cost control

Read:

- **Section 21 — Cost Governance**

Use this section when designing token budgets, model routing by cost, caching, local model use, batching, or cost dashboards.

Key concepts:

- cost by matter/workflow/model/tool;
- context minimization;
- retrieval narrowing;
- spend where risk justifies it.

---

## If the task is about latency

Read:

- **Section 22 — Latency Governance**

Use this section when deciding whether a task should be real-time, standard, deep, or batch.

Key concepts:

- latency classes;
- real-time vs deep work;
- latency matched to legal risk.

---

## If the task is about observability

Read:

- **Section 23 — Observability**

Use this section when designing dashboards, workflow status, processing status, model/tool monitoring, risk visibility, or agent run visibility.

Key concepts:

- workflow status;
- model used;
- tool calls;
- risk trends;
- audit events;
- autonomous action explanation.

---

## If the task is about evaluation or benchmarking

Read:

- **Section 24 — Evaluation and Benchmarking**

Use this section when designing model tests, prompt tests, workflow QA, extraction accuracy, support matrix evaluation, adversarial review quality, or regression tests.

Key concepts:

- extraction accuracy;
- citation accuracy;
- translation quality;
- adversarial critique quality;
- hallucination rate;
- retrieval boundary compliance.

---

## If the task is about MVP model/tool requirements

Read:

- **Section 25 — MVP Model, Tool, and Automation Requirements**

Use this section when building the first version or scoping which model/tool governance features are mandatory vs deferred.

Key concepts:

- model-use recording;
- evidence extraction tool;
- matter-scoped retrieval;
- structured outputs;
- W9 critique;
- no autonomous external action;
- MVP red lines.

---

## If the task is about target-state model/tool architecture

Read:

- **Section 26 — Target-State Model, Tool, and Automation Architecture**

Use this section when designing model routing engines, tool authority engines, policy-based automation, autonomous retry, or target-state orchestration.

Key concepts:

- model routing engine;
- tool authority engine;
- automation policy engine;
- governance-aware external actions;
- automation must not exceed governance maturity.

---

# Section-by-Section Index

## Section 1 — Purpose and Scope

Use for:

- understanding why models/tools are governed components;
- defining document scope;
- distinguishing LEXOS from a prompt/model stack.

## Section 2 — Core Model/Tool Doctrine

Use for:

- model-agnostic architecture;
- tool governance;
- model output not truth;
- tool execution not authority.

## Section 3 — Model Registry

Use for:

- model records;
- approved/prohibited model use;
- model status;
- model metadata.

## Section 4 — Model Task Suitability

Use for:

- task-specific model use;
- high-risk model tasks;
- extraction, research, translation, embedding, evaluation models.

## Section 5 — Model Routing

Use for:

- model selection;
- routing by workflow, language, jurisdiction, sensitivity, cost, and latency.

## Section 6 — Model Risk Management

Use for:

- hallucination risk;
- citation risk;
- model drift;
- model-risk controls.

## Section 7 — Prompt Registry

Use for:

- prompt versioning;
- prompt metadata;
- prompt safety requirements.

## Section 8 — Tool Registry

Use for:

- tool records;
- approved workflows;
- risk classes;
- tool metadata.

## Section 9 — Tool Authority Matrix

Use for:

- agent-tool permissions;
- prohibited tool use;
- role-based tool boundaries.

## Section 10 — Structured Output Specification

Use for:

- JSON outputs;
- schema validation;
- database-ready records.

## Section 11 — Deterministic Systems vs AI Systems

Use for:

- deciding when to use code vs AI;
- deterministic validation;
- permission and status logic.

## Section 12 — Automation Architecture

Use for:

- workflow automation;
- automation risk classes;
- MVP automation boundaries.

## Section 13 — Workflow Orchestration

Use for:

- orchestrator design;
- workflow state;
- task queues;
- handoffs.

## Section 14 — Tool Call Logging

Use for:

- tool-call audit;
- tool failures;
- retries.

## Section 15 — Model Use Logging

Use for:

- model logs;
- prompt context logs;
- model output traceability.

## Section 16 — External Search and Legal Research Tools

Use for:

- web/legal research;
- source discovery;
- citation verification.

## Section 17 — Evidence Processing Tools

Use for:

- OCR;
- parsing;
- metadata;
- evidence extraction.

## Section 18 — Embedding and Retrieval Tools

Use for:

- embeddings;
- pgvector;
- retrieval filters;
- chunk metadata.

## Section 19 — Translation Tools

Use for:

- bilingual workflows;
- Translation Objects;
- legal translation confidence.

## Section 20 — Document Generation and Export Tools

Use for:

- DOCX/PDF/markdown export;
- artifact generation;
- export logging.

## Section 21 — Cost Governance

Use for:

- token budgets;
- model-cost routing;
- cost dashboards.

## Section 22 — Latency Governance

Use for:

- real-time vs deep processing;
- latency classes.

## Section 23 — Observability

Use for:

- dashboards;
- agent/model/tool monitoring;
- risk and workflow visibility.

## Section 24 — Evaluation and Benchmarking

Use for:

- model testing;
- prompt testing;
- workflow QA;
- benchmark matters.

## Section 25 — MVP Model, Tool, and Automation Requirements

Use for:

- MVP requirements;
- MVP deferrals;
- MVP red lines.

## Section 26 — Target-State Model, Tool, and Automation Architecture

Use for:

- future automation engines;
- model routing engine;
- tool authority engine.

## Section 27 — Summary

Use for:

- compressed doctrine;
- implementation compliance check.

---

# Fast Lookup Table

| Topic | Primary Sections |
|---|---|
| Model/tool doctrine | Sections 1, 2, 27 |
| Model registry | Section 3 |
| Model suitability | Section 4 |
| Model routing | Section 5 |
| Model risk | Section 6 |
| Prompt registry | Section 7 |
| Tool registry | Section 8 |
| Tool authority | Section 9 |
| Structured outputs | Section 10 |
| Deterministic vs AI | Section 11 |
| Automation | Section 12 |
| Orchestration | Section 13 |
| Tool logs | Section 14 |
| Model logs | Section 15 |
| Legal research tools | Section 16 |
| Evidence tools | Section 17 |
| Embeddings/retrieval | Section 18 |
| Translation tools | Section 19 |
| Document generation/export | Section 20 |
| Cost | Section 21 |
| Latency | Section 22 |
| Observability | Section 23 |
| Evaluation | Section 24 |
| MVP requirements | Section 25 |
| Target-state architecture | Section 26 |

---

# Agent Reading Protocol

Before performing any task based on Document 7, an agent should:

1. **Identify the component type.**

   Determine whether the task concerns models, tools, prompts, automation, orchestration, retrieval, evidence processing, translation, exports, cost, latency, observability, evaluation, MVP, or target-state architecture.

2. **Read the relevant topic section.**

   Use the Quick Navigation above.

3. **Read Section 2 if the task affects authority or truth.**

   Models are not truth. Tools are not authority.

4. **Read Section 10 if the task produces structured records.**

   Legal cognition requires structured outputs.

5. **Read Section 25 if the task affects MVP.**

   MVP may simplify registries and orchestration but must preserve traceability, scoped retrieval, and no autonomous external action.

6. **Read Section 27 before final recommendations.**

   Section 27 provides the compressed model/tool doctrine.

---

# Mandatory Cross-Checks for Agents

## For model-routing tasks

Read:

- Section 3;
- Section 4;
- Section 5;
- Section 6.

Mandatory check:

- Is the model approved for the task, workflow, sensitivity level, language, and jurisdiction?

## For prompt tasks

Read:

- Section 7;
- Section 10.

Mandatory check:

- Is the prompt versioned, scoped, structured, and constrained against unsupported invention?

## For tool-access tasks

Read:

- Section 8;
- Section 9;
- Section 14.

Mandatory check:

- Is the tool approved for the agent, workflow, matter, and data sensitivity?
- Is the tool call logged?

## For automation tasks

Read:

- Section 12;
- Section 13;
- Section 26.

Mandatory check:

- Does automation have governance gates, failure handling, object dependencies, and auditability?

## For retrieval tasks

Read:

- Section 18;
- Section 13.

Mandatory check:

- Are embeddings metadata-rich and filtered before semantic retrieval?
- Is prompt context minimized?

## For legal research tasks

Read:

- Section 16;
- Section 6.

Mandatory check:

- Are sources verified, jurisdiction scoped, and AI research treated as draft until confirmed?

## For MVP tasks

Read:

- Section 25;
- Section 27.

Mandatory check:

- Does MVP record model use, use structured outputs, maintain matter-scoped retrieval, log major actions, and prohibit autonomous external legal action?

---

# Final Instruction to Agents

Document 7 defines how LEXOS uses models, tools, prompts, and automation.

Agents must not treat models or tools as autonomous sources of truth or authority.

When working on LEXOS, preserve these rules:

- model output is not truth;
- tool execution is not legal authority;
- models must be routed by task, sensitivity, language, jurisdiction, cost, latency, and reliability;
- important prompts must be versioned;
- important tools must be registered;
- high-risk tools require gates and audit;
- structured outputs are required for internal legal cognition;
- deterministic controls govern AI reasoning;
- workflow orchestration must manage state, dependencies, failures, and handoffs;
- model and tool use must be logged for material outputs;
- legal research must be source-verified;
- evidence tools must preserve originals;
- retrieval tools must filter before semantic search;
- document export does not imply finality;
- MVP may simplify but must preserve traceability, scoped retrieval, structured outputs, and no autonomous external legal action.

## Document Status

**Document Name:** LEXOS Model, Tool, and Automation Specification  
**Document Number:** Document 7  
**Version:** v1.0 Draft  
**Purpose:** Define how LEXOS governs AI models, tools, prompts, automations, structured outputs, orchestration, logging, cost, latency, reliability, and model/tool risk from MVP through target-state autonomous legal institution.  
**Depends On:**  
- Document 1 — LEXOS Institutional Doctrine  
- Document 2 — LEXOS Canonical Object Model  
- Document 3 — LEXOS Governance and Epistemic Integrity Rules  
- Document 4 — LEXOS Cognitive Architecture  
- Document 5 — LEXOS Workflow Specification  
- Document 6 — LEXOS Security and Privilege Architecture  

**Primary Use:** Model routing, prompt management, agent-tool permissions, workflow automation, MVP agent implementation, AI provider selection, legal research tooling, evidence extraction pipelines, observability, cost controls, and target-state automation architecture.

---

# Section 1 — Purpose and Scope

## 1.1 Purpose of This Document

This document defines how LEXOS uses AI models, tools, prompts, automations, and orchestration systems.

LEXOS is not a model.

LEXOS is not a prompt library.

LEXOS is not a collection of tools.

LEXOS is a governed legal cognition institution that uses models and tools as execution resources.

This distinction is critical.

A powerful AI model can still hallucinate facts, invent citations, misread evidence, mistranslate legal language, ignore jurisdiction, overstate confidence, or leak privileged context.

A powerful tool can still cause legal harm if used without authority, logging, scope, or review.

Therefore, LEXOS must treat models, tools, prompts, and automations as governed components inside the legal architecture.

The central rule is:

> Models may reason and tools may act, but neither models nor tools are sources of legal truth or institutional authority.

## 1.2 Scope of This Document

This document defines:

- model registry;
- model task suitability;
- model routing;
- model risk;
- tool registry;
- tool authority;
- prompt registry;
- prompt versioning;
- structured outputs;
- deterministic validation;
- automation rules;
- orchestration;
- tool-call logging;
- model-use logging;
- cost governance;
- latency governance;
- observability;
- MVP requirements;
- target-state architecture.

This document does not define:

- exact provider contracts;
- final API code;
- final agent prompts;
- final workflow engine implementation;
- database schema SQL;
- UI screens;
- deployment configuration.

Those belong in later technical documents.

---

# Section 2 — Core Model/Tool Doctrine

## 2.1 Model-Agnostic but Model-Aware

LEXOS must be model-agnostic at the architectural level.

The system should be able to replace:

- LLM provider;
- embedding model;
- OCR model;
- vision model;
- speech-to-text model;
- legal research model;
- summarization model;
- translation model;
- local model;
- cloud model.

However, LEXOS must be model-aware operationally.

For every major output, the system should know:

- which model was used;
- which version was used where known;
- what prompt was used;
- what context was provided;
- what tool calls occurred;
- what objects were created or modified;
- what verification occurred.

## 2.2 Tool-Agnostic but Tool-Governed

LEXOS should be able to replace tools over time.

Examples:

- LlamaParse may be replaced by another parser;
- Gemini vision may be replaced by another vision model;
- Supabase pgvector may be replaced or supplemented;
- legal research tools may change;
- document generation libraries may change.

But every tool must remain governed by:

- approved workflows;
- permitted agents;
- permission scope;
- data sensitivity;
- logging requirements;
- failure handling;
- cost and reliability controls.

## 2.3 Model Output Is Not Truth

A model output is a generated artifact.

It may be:

- extraction;
- summary;
- hypothesis;
- classification;
- translation;
- research draft;
- strategy draft;
- argument draft;
- adversarial critique;
- risk signal.

It is not automatically:

- verified fact;
- legal authority;
- admissible evidence;
- final translation;
- court-ready filing;
- client instruction;
- institutional learning.

## 2.4 Tool Execution Is Not Authority

A successful tool call means an action technically occurred.

It does not mean the action was legally authorized.

Example:

- An email tool may successfully send an email.
- That does not mean the communication was authorized, reviewed, or strategically sound.

Therefore, high-risk tool calls must be gated.

## 2.5 Automation Requires Governance

Automation is permitted only where:

- input scope is clear;
- object permissions are defined;
- output status is controlled;
- risk handling exists;
- audit logging exists;
- rollback/review is possible where needed.

---

# Section 3 — Model Registry

## 3.1 Purpose

The Model Registry records which AI models LEXOS may use, for what tasks, under what constraints.

## 3.2 MVP Model Registry Fields

MVP should record:

| Field | Description |
|---|---|
| `model_id` | Unique model record |
| `model_name` | Model name |
| `provider` | Provider |
| `model_type` | LLM, embedding, OCR, vision, speech, etc. |
| `approved_workflows` | Workflows where model may be used |
| `approved_tasks` | Approved task types |
| `prohibited_tasks` | Prohibited task types |
| `confidentiality_rating` | Data sensitivity allowed |
| `status` | Active, experimental, deprecated |
| `notes` | Known caveats |

## 3.3 Target-State Model Registry Fields

Target-state should also include:

| Field | Description |
|---|---|
| `version` | Version or release ID |
| `context_window` | Context length |
| `modalities` | Text, image, audio, video |
| `language_strengths` | Language performance notes |
| `jurisdiction_strengths` | Jurisdiction-specific notes |
| `known_failure_modes` | Known risks |
| `cost_profile` | Cost per token/page/minute |
| `latency_profile` | Speed |
| `privacy_profile` | Data retention/training terms |
| `deployment_mode` | Cloud, local, private endpoint |
| `benchmark_results` | Evaluation scores |
| `last_evaluated_at` | Last model evaluation |
| `drift_status` | Stable, changed, degraded, unknown |
| `owner` | System owner responsible for model record |

## 3.4 Model Status Values

Suggested:

- `active`;
- `experimental`;
- `restricted`;
- `deprecated`;
- `disabled`;
- `under_review`.

## 3.5 Model Type Values

Suggested:

- `general_llm`;
- `legal_reasoning_llm`;
- `local_llm`;
- `embedding_model`;
- `ocr_model`;
- `vision_model`;
- `speech_to_text`;
- `translation_model`;
- `reranker`;
- `classifier`;
- `code_model`;
- `evaluation_model`.

---

# Section 4 — Model Task Suitability

## 4.1 Purpose

No model should be assumed suitable for all legal tasks.

LEXOS must route tasks based on model strengths, weaknesses, sensitivity, cost, and risk.

## 4.2 Task Categories

LEXOS should classify model tasks as:

- intake conversation;
- document classification;
- OCR/extraction;
- summarization;
- assertion extraction;
- evidence support mapping;
- legal research drafting;
- citation verification;
- legal reasoning;
- strategy generation;
- argument drafting;
- adversarial critique;
- translation;
- visual description;
- client communication drafting;
- governance checking;
- model output evaluation.

## 4.3 High-Risk Task Categories

High-risk model tasks include:

- legal research;
- citation generation;
- filing-ready drafting;
- privilege review;
- external client advice;
- settlement recommendation;
- court/regulator submission drafting;
- factual truth-state changes;
- memory promotion;
- institutional learning approval.

High-risk tasks require stronger verification.

## 4.4 Model Suitability Rules

### Extraction Models

May extract text, layout, tables, metadata.

Should not make final legal conclusions.

### General LLMs

May summarize, classify, draft, and reason.

Must not be treated as citation authority.

### Legal Research Models

May assist research.

Must cite real sources.

Legal propositions remain draft until source-verified.

### Translation Models

May translate.

Court-ready or legally material translations require review or confidence classification.

### Embedding Models

May support retrieval.

Must not determine permission or truth.

### Evaluation Models

May critique outputs.

Their critique is not final governance unless authorized.

---

# Section 5 — Model Routing

## 5.1 Purpose

Model routing determines which model handles which task.

## 5.2 Routing Inputs

Model routing should consider:

- workflow;
- task type;
- jurisdiction;
- language;
- confidentiality status;
- privilege status;
- required accuracy;
- required latency;
- cost budget;
- output audience;
- model availability;
- model performance history.

## 5.3 MVP Routing

MVP may use simple routing:

- one strong LLM for drafting/reasoning;
- one extraction/parser tool for documents;
- one embedding model for retrieval;
- one translation model or LLM for bilingual work;
- optional separate model for adversarial critique.

The MVP must record model used for major outputs.

## 5.4 Target-State Routing

Target-state routing should be policy-based.

Example:

- privileged criminal-defense matter → approved private/high-confidentiality model only;
- public legal research → legal research model plus citation verifier;
- routine summarization → lower-cost model;
- filing-ready argument → high-quality model plus adversarial review plus citation verification;
- Chinese-English legal translation → bilingual legal translation model plus review.

## 5.5 Multi-Model Use

LEXOS may use multiple models for high-risk tasks.

Examples:

- one model drafts;
- another critiques;
- a third checks citations;
- a fourth checks translation.

Multi-model agreement is not proof.

It is a confidence signal only where independently grounded.

---

# Section 6 — Model Risk Management

## 6.1 Purpose

Model Risk is the risk that a model produces inaccurate, misleading, unsafe, unsupported, stale, biased, or legally defective output.

## 6.2 Model Risk Categories

Model risk includes:

- hallucinated facts;
- hallucinated citations;
- wrong jurisdiction;
- outdated law;
- overconfident reasoning;
- mistranslation;
- bad extraction;
- context omission;
- failure to preserve caveats;
- privilege leakage;
- role drift;
- unsupported conclusions;
- inconsistent outputs;
- provider drift;
- prompt sensitivity;
- hidden bias;
- refusal or over-blocking behavior.

## 6.3 Model Risk Controls

Controls include:

- model registry;
- approved/prohibited use cases;
- prompt versioning;
- structured output schemas;
- source verification;
- citation verification;
- adversarial review;
- human review for high-risk outputs;
- model evaluation benchmarks;
- drift monitoring;
- audit logs.

## 6.4 MVP Model Risk Controls

MVP must include:

- model used recorded for major outputs;
- prompt/workflow version where practical;
- output status as draft unless reviewed;
- citation status visible;
- unsupported claims visible;
- W9 adversarial review;
- no autonomous external legal output.

---

# Section 7 — Prompt Registry

## 7.1 Purpose

Prompts are part of the legal operating system.

A prompt can affect truth state, risk, tone, citation behavior, evidence discipline, and legal output quality.

Important prompts must be versioned.

## 7.2 MVP Prompt Registry Fields

MVP should record:

| Field | Description |
|---|---|
| `prompt_id` | Unique prompt ID |
| `prompt_name` | Human-readable name |
| `workflow` | W0–W11 |
| `agent_role` | Agent role |
| `prompt_text` | Prompt |
| `version` | Prompt version |
| `status` | Draft, active, deprecated |
| `created_at` | Timestamp |
| `notes` | Notes |

## 7.3 Target-State Prompt Registry Fields

Target-state should also include:

| Field | Description |
|---|---|
| `model_id` | Approved model |
| `input_schema` | Expected input |
| `output_schema` | Required output |
| `tools_allowed` | Tool list |
| `memory_scope` | Retrieval scope |
| `prohibited_actions` | Explicit restrictions |
| `evaluation_results` | Test results |
| `approval_status` | Approved/rejected |
| `supersedes_id` | Prior prompt |
| `change_summary` | Version change summary |

## 7.4 Prompt Versioning Rule

Major legal outputs should record the prompt or workflow version used.

This is especially important for:

- W2 story generation;
- W5 support mapping;
- W6 strategy;
- W7 research;
- W8 drafting;
- W9 adversarial review;
- W11 refinement.

## 7.5 Prompt Safety Requirements

Prompts should include:

- role boundary;
- object scope;
- truth-state rules;
- source-link requirements;
- prohibited invention;
- uncertainty handling;
- escalation triggers;
- external-content-as-data rule;
- output format.

---

# Section 8 — Tool Registry

## 8.1 Purpose

The Tool Registry records available tools and governs their permitted use.

## 8.2 MVP Tool Registry Fields

MVP should record:

| Field | Description |
|---|---|
| `tool_id` | Unique tool ID |
| `tool_name` | Name |
| `tool_type` | Parser, OCR, search, storage, etc. |
| `provider` | Provider |
| `approved_workflows` | Workflows |
| `approved_agents` | Agents |
| `risk_class` | Low, moderate, high |
| `status` | Active, disabled, experimental |
| `notes` | Notes |

## 8.3 Target-State Tool Registry Fields

Target-state should also include:

| Field | Description |
|---|---|
| `required_permissions` | Permissions |
| `data_sensitivity_rating` | Allowed data classes |
| `external_data_transfer` | Whether data leaves system |
| `logging_behavior` | Logging details |
| `failure_modes` | Known failures |
| `cost_profile` | Cost |
| `latency_profile` | Speed |
| `security_review_status` | Review status |
| `last_reviewed_at` | Review date |
| `owner` | System owner |

## 8.4 Tool Risk Classes

### Low Risk

Examples:

- internal formatting;
- schema validation;
- local calculations;
- internal markdown conversion.

### Moderate Risk

Examples:

- OCR;
- document parsing;
- translation;
- internal retrieval;
- diagram generation;
- non-external document generation.

### High Risk

Examples:

- email sending;
- client messaging;
- external file sharing;
- court filing;
- database deletion;
- access-control modification;
- billing action;
- external publication;
- evidence export.

## 8.5 High-Risk Tool Rule

High-risk tools require:

- approved workflow;
- approved agent or human role;
- authorization basis;
- object scope;
- review status;
- audit event;
- rollback/containment plan where applicable.

---

# Section 9 — Tool Authority Matrix

## 9.1 Purpose

Tool authority determines which agents may use which tools.

## 9.2 Suggested Authority Matrix

| Agent | Permitted Tool Categories |
|---|---|
| Intake Specialist | intake forms, conflict/KYC tools, scheduling, document upload |
| Custodian | client record tools, promotion review, KYC refresh, approved registry search |
| Story Architect | matter retrieval, story drafting, assertion extraction |
| Intake Clerk | document upload, OCR, parsing, paragraph indexing |
| Evidence Archivist | storage, OCR, parsing, metadata, embeddings |
| Analyst | retrieval, support matrix, contradiction detection |
| Strategist | support matrix retrieval, strategy templates, risk tools |
| Librarian | legal research, source storage, citation tools |
| Advocate | drafting, citation retrieval, evidence references |
| Adversary | retrieval, critique tools, contradiction/risk tools |
| Visualizer | diagram, chart, timeline, exhibit tools |
| Rhetorician | document editing, style refinement, export draft tools |
| Governance Agent | audit, policy checks, risk checks, review tools |
| Accounting Agent | billing and payment status tools only |
| Office Admin Agent | matter setup, access setup, admin checklist tools |

## 9.3 Prohibited Tool Use Examples

- Accounting Agent must not access litigation strategy.
- Rhetorician must not use evidence mutation tools.
- Advocate must not delete evidence.
- Evidence Archivist must not send client advice.
- Librarian must not file court documents.
- Any agent without external-action authority must not send external communications.

---

# Section 10 — Structured Output Specification

## 10.1 Purpose

LEXOS requires structured outputs for internal workflows.

Freeform prose is insufficient for autonomous legal cognition.

## 10.2 Structured Output Use Cases

Structured outputs are required for:

- assertion extraction;
- evidence classification;
- support mapping;
- contradiction detection;
- risk creation;
- research memo metadata;
- legal authority lists;
- strategy points;
- argument nodes;
- adversarial critique;
- workflow handoffs;
- review events;
- audit summaries.

## 10.3 Output Formats

Allowed formats:

- JSON;
- markdown with fixed headings;
- database-ready records;
- tables;
- object update payloads.

## 10.4 Schema Validation Rule

Where possible, structured outputs should be schema-validated before database write.

If validation fails:

- create tool/model failure record;
- request regeneration or correction;
- do not silently write malformed data.

## 10.5 MVP Structured Outputs

MVP should require structured outputs for:

- Assertions;
- Evidence metadata;
- Support Matrix;
- Risks;
- Strategy Memo metadata;
- Research Memo metadata;
- Adversarial Critique;
- Output Artifact metadata.

---

# Section 11 — Deterministic Systems vs AI Systems

## 11.1 Purpose

LEXOS should use deterministic systems where rules are clear.

AI should not replace deterministic control logic.

## 11.2 Deterministic Functions

Use deterministic logic for:

- required field validation;
- status transition validation;
- permission checks;
- client/matter scoping;
- date calculations where rules are encoded;
- file hash generation;
- schema validation;
- artifact version increments;
- audit event creation;
- retrieval filters;
- export permission checks.

## 11.3 AI Functions

Use AI for:

- summarization;
- classification;
- extraction assistance;
- issue spotting;
- strategy generation;
- argument drafting;
- adversarial critique;
- translation;
- rhetorical refinement.

## 11.4 Rule

> Deterministic control should govern AI cognition.

AI may propose.

Deterministic policy decides whether the system may proceed.

---

# Section 12 — Automation Architecture

## 12.1 Purpose

Automation allows LEXOS to execute workflows without continuous manual intervention.

## 12.2 Automation Types

LEXOS automation may include:

- task creation;
- workflow transition;
- evidence processing;
- extraction retry;
- assertion extraction;
- support mapping;
- research queue generation;
- risk flag creation;
- review request routing;
- artifact versioning;
- audit logging;
- notification;
- cost tracking;
- deadline reminders.

## 12.3 Automation Risk Classes

### Low-Risk Automation

Examples:

- create audit event;
- update processing status;
- generate internal task;
- validate schema;
- create draft artifact.

### Moderate-Risk Automation

Examples:

- classify evidence;
- extract assertions;
- map evidence support;
- draft internal research memo;
- generate strategy draft.

### High-Risk Automation

Examples:

- send external communication;
- mark artifact filing-ready;
- accept critical risk;
- promote fact to client memory;
- file legal document;
- disclose privileged material.

## 12.4 MVP Automation

MVP should automate:

- evidence processing status;
- text extraction;
- draft artifact generation;
- assertion extraction;
- support matrix draft;
- strategy draft;
- adversarial critique draft;
- audit event creation where practical.

MVP should not automate:

- external legal communication;
- court filing;
- final legal approval;
- critical risk acceptance;
- unrestricted memory promotion.

## 12.5 W0 Intake Automation

W0 automation is **queue-aware** and MUST remain **scoped to discrete Intake Instances** (plus sanctioned Intake Groups).

Automation MAY:

- originate Intake Records;
- classify intake archetypes (solo client, multi-unrelated prospects, grouped co-parties, existing client new matter);
- spawn Intake Tasks for conflict/KYC/accounting/office-admin/collection sub-steps;
- raise urgency/deadline flags linked to Matter Candidates or Intake Group metadata;
- prepare routing packages for governance and lead-attorney review;
- marshal accepted payloads into deterministic handoff templates.

Automation MAY NOT:

- merge unrelated prospective clients into shared agent reasoning payloads;
- auto-approve representation or waive conflicts absent explicit governance artefacts;
- clear conflict/KYC/authority states without deterministic review artefacts;
- promote Client/Matter embeddings or factual memory into W1 before acceptance;
- send external advice or client-facing engagements.

**Tooling surfaces for subagents:** conflict registers, KYB/KYC gateways, sanctions registries (target-state), identity verification tooling, cadastral/registry APIs, calendars/billing scaffolding, uploads, questionnaires. Most advanced connectors remain **future-state integrations** gated by MVP scope.

---

# Section 13 — Workflow Orchestration

## 13.1 Purpose

Workflow orchestration coordinates agents, tools, objects, status transitions, retries, failures, and handoffs.

## 13.2 Orchestration Responsibilities

The orchestrator should manage:

- active workflow;
- required inputs;
- assigned agents;
- tool permissions;
- model routing;
- object dependencies;
- output requirements;
- status transitions;
- blockers;
- retry logic;
- escalation;
- handoff package;
- audit events.

## 13.3 MVP Orchestration

MVP may use simple orchestration:

- manual workflow buttons;
- status fields;
- queue records;
- agent runs triggered by user;
- basic workflow state table.

## 13.4 Target-State Orchestration

Target-state should support:

- autonomous workflow engine;
- task queue;
- agent assignment;
- tool-call control;
- policy checks;
- retry/failure handling;
- state machine;
- dependency graph;
- event-driven workflows;
- autonomy-level enforcement.

## 13.5 Orchestration Rule

The orchestrator must not rely on the agent to remember workflow rules.

Workflow rules must be encoded in system logic where possible.

---

# Section 14 — Tool Call Logging

## 14.1 Purpose

Tool calls must be auditable.

## 14.2 MVP Tool Call Log

MVP should log material tool calls with:

- tool name;
- actor/agent;
- workflow;
- matter ID;
- purpose;
- status;
- timestamp;
- output reference where applicable.

## 14.3 Target-State Tool Call Log

Target-state should also log:

- input parameters;
- output summary;
- error message;
- retry count;
- affected objects;
- created objects;
- modified objects;
- risk generated;
- permission basis.

## 14.4 Failure Rule

Failed tool calls must not disappear.

They should create:

- failure status;
- error note;
- retry decision;
- risk if material.

---

# Section 15 — Model Use Logging

## 15.1 Purpose

Model use must be traceable for legal defensibility and model-risk management.

## 15.2 MVP Model Use Log

MVP should record for major outputs:

- model name;
- provider;
- workflow;
- agent;
- output artifact;
- timestamp.

## 15.3 Target-State Model Use Log

Target-state should also record:

- model version;
- prompt ID;
- retrieved context object IDs;
- tool calls;
- token usage;
- cost;
- latency;
- confidence signal;
- validation result;
- risks generated.

## 15.4 Prompt Context Logging

Prompt context logs may contain privileged material.

Where full prompt logging is unsafe, store:

- prompt ID;
- context object IDs;
- context summary;
- sensitivity classification;
- model used;
- output ID.

---

# Section 16 — External Search and Legal Research Tools

## 16.1 Purpose

LEXOS may use search and legal research tools, but search results are not truth.

## 16.2 External Search Rule

External search may be used for:

- source discovery;
- public records;
- corporate registries;
- factual background;
- legal updates;
- adverse media;
- jurisdiction research.

Search snippets are not authority.

Follow through to underlying sources where possible.

## 16.3 Legal Research Tool Rule

Legal research tools should distinguish:

- primary authority;
- secondary authority;
- commentary;
- news;
- AI summary;
- unofficial source.

## 16.4 Citation Verification Rule

No court-facing output may rely on an unverified citation unless explicitly labeled and approved as risk-accepted.

## 16.5 MVP Legal Research Tooling

MVP may use manually verified research.

But Research Memo must include:

- jurisdiction;
- research question;
- source/authority list;
- confidence or limitation note.

---

# Section 17 — Evidence Processing Tools

## 17.1 Purpose

Evidence processing tools convert files into usable structured content.

### Parser-First / OCR-Assisted Doctrine

For **supported document-like** files—including normal PDFs, scanned PDFs (where tooling supports them), **PDFs composed of screenshots**, standalone **chat/message screenshots**, and **image-based document pages**—LEXOS expects **LlamaParse or an equivalent layout-aware parser** as the **primary extraction layer** where tooling permits.

**OCR** is a **supporting** capability for pixel-visible text and reconciliation; **vision** supports layout/message/thread/table reconstruction and comparator QA against originals. Accepted final extraction remains **markdown + structured JSON**, not raw OCR text alone unless explicitly flagged as **`qa_flagged`** / **`human_review_required`** fallback (or reviewed and accepted).

## 17.2 Tool Types

Evidence tools may include:

- file upload;

- secure object storage that preserves immutable originals;

- file-type classifiers and ingestion routers;

- deterministic or hosted **document parsers** (for example LlamaParse or equivalent) as **primary document extractors** for PDF/DOCX/DOC and similar **including scanned/screenshot composites** where multimodal parsers are available;

- **OCR** pipelines for pixel-visible text scans, photographs, screenshots, frame grabs—and **fallback** plaintext signals when parsers are unavailable—not as substitutes for finalized structured extraction when parsers/vision are material;

- multimodal **vision** models for layout repair, handwriting hints, messaging UI reconstruction (e.g., sender attribution, timestamps, bubbles), chart reading, and **structured-output QA against original screenshots/PDF pages**;

- speech-to-text engines, diarization helpers, and transcript structurers for audio-heavy matters (optional MVP toggle);

- lightweight **video metadata** extractors, audio track extractors, frame sampling, keyframe summarizers, and OCR-on-frame passes (generally target-state unless MVP explicitly enables limited passes);

- markdown renderers that store **lawyer-facing markdown extractions** separately from JSON;

- structured **JSON extraction serializers** bound to LEXOS Evidence Extraction schemas;

- table, layout, handwriting, seal, and metadata extractors as risk-aware modules;

- hashing and integrity utilities (hash may be optional MVP but must be planned);

- **embedding** encoders that always receive client/matter/evidence/extraction metadata;

- deterministic **schema validators** for extraction JSON;

- scripted or model-based **extraction QA comparators** that compare **accepted structured markdown + JSON against original document/PDF/screenshot fidelity**, not OCR text alone where visual originals exist;

- malware scanning where enterprise policy demands it.

## 17.3 Evidence Processing Rule

Processing output must link back to the Evidence Object **and** populate an Evidence Extraction Object that records markdown, JSON, transcripts, OCR consolidations, visual descriptions, embeddings (if any), and QA metadata as **derived artifacts**—never overwriting the original upload.

## 17.4 Extraction Quality Rule

Tools must report or allow recording of:

- success/failure plus **extraction_quality_status** enums (`accepted`, `QA flagged`, `failed`, `human review required`);

- parser versus OCR disagreement signals;

- comparator warnings from the Extraction QA toolchain;

- extraction quality scores when models provide them;

- page completeness;

- table fidelity;

- OCR error hotspots;

- transcript confidence by segment;

- language detection;

- warnings and human review flags.

## 17.5 Extraction QA Comparator

**Purpose:** compare **accepted structured markdown + JSON** against **original raster pages, screenshots, PDF pages, waveform segments, surrogate renders** (for example rasterized PDF pages)—**not OCR text strings alone when visual originals remain available**—to detect silent corruption before agents rely on derived text.

**Core functions:**

- detect missing text spans or blank pages;

- detect layout or table reconstruction errors;

- detect likely date, name, currency, or jurisdictional label errors;

- surface probable OCR confusions (I/l, 0/O, etc.);

- compare markdown narrative against JSON field population for internal consistency;

- assign a machine-explainable **quality score** and escalate to `QA flagged` or `failed` when thresholds trip;

- recommend operator actions: **accepted**, **QA flagged**, **failed**, or **human review required**.

The comparator never replaces human judgment on legally material disputes, but it must block “silent success” paths for known failure classes.

## 17.6 MVP Evidence Tooling

MVP requires the **enhanced ingestion toolchain**, not single-pass “text extraction only” shortcuts:

- immutable upload/storage tied to Evidence Objects;

- classification + **parser-first** stack (LlamaParse-class or equivalent layout-aware parsers) for supported office/PDF/text types—including **scanner/screenshot composites** routed through parsers when supported;

- **OCR/vision support** layered for pixel text, messenger layouts, handwriting assists, QA reconciliation—never treated as interchangeable with full structured extraction when parsers/vision are material;

- dual storage of **markdown extraction** and **structured JSON extraction** on Evidence Extraction Objects;

- QA comparator (rule-based and/or model-assisted) for supported ingest classes;

- embeddings only when retrieval is enabled, with mandatory client/matter/evidence/extraction linkage;

- explicit processing and quality flags surfaced to Workflow W4 and downstream agents.

**MVP red line:** when layout, messenger structure, attribution, timestamps, attachments, tables, or similar structure is materially significant, ingestion must **not** treat **raw OCR text alone** as final accepted extraction—it must arrive as **structured markdown + JSON derived from parser/vision workflows** or be flagged **`qa_flagged`** / **`human_review_required`** until reviewed.

Optional toggles (explicitly configured) may enable audio transcription and limited video handling without implying full forensic or studio post-production readiness.

---

# Section 18 — Embedding and Retrieval Tools

## 18.1 Purpose

Embeddings support semantic retrieval, but they are not the source of truth and **must not be cited as legal evidence**. They should be generated from **current, accepted** markdown, JSON, transcripts, visual descriptions, OCR segments, or concatenated agent-searchable derived material that already references the Evidence Extraction Object.

## 18.2 Embedding Metadata Rule

Every embedded chunk must carry:

- tenant ID if applicable;
- client ID;
- matter ID;
- **evidence_id**;
- **extraction_id** tied to the originating Evidence Extraction run;
- chunk index / sequence;
- source object ID / `source_object_type` (for example Evidence Extraction chunk row);
- artifact ID when an artifact rather than evidence is embedded;
- object type;
- privilege status;
- confidentiality status;
- language;
- created timestamp;
- embedding model.

## 18.3 Retrieval Filter Rule

Apply structured filters before vector similarity.

## 18.4 Chunking Rule

Chunking should preserve:

- source document / original evidence reference;
- Evidence Extraction linkage;
- **extraction_id**;
- page/section anchors;
- paragraph or block IDs;
- transcript timecodes or frame references when applicable;
- language;
- evidence ID;
- semantic context.

Vector hits must return pointers so operators and agents can reopen the **original evidence** and authoritative extraction record, not merely the chunk text.

Embeddings are retrieval aids; retrieval answers must still honor privilege filters and must never be treated as substitutes for verified factual findings.

## 18.5 Re-Embedding Rule

If source content changes materially or extraction is corrected, embeddings should be regenerated or superseded.

---

# Section 19 — Translation Tools

## 19.1 Purpose

Translation tools support bilingual legal cognition.

## 19.2 Translation Tool Rule

Translation output must preserve:

- source language;
- target language;
- original text;
- translated text;
- translation type;
- confidence;
- review status;
- source object.

## 19.3 Translation Type Routing

Different translation types may use different models or review requirements:

- raw translation;
- literal translation;
- legal-functional translation;
- client-facing translation;
- court-ready translation;
- internal analytical translation.

## 19.4 MVP Translation

MVP may use LLM translation but must store original and translation separately.

Court-ready translation should not be assumed.

---

# Section 20 — Document Generation and Export Tools

## 20.1 Purpose

Document generation tools produce legal artifacts in usable formats.

## 20.2 Document Generation Rule

Generated documents must preserve:

- artifact ID;
- version;
- source basis;
- workflow origin;
- status;
- intended audience;
- confidentiality/privilege status.

## 20.3 Export Rule

Exports must be logged.

External exports require review and permission.

## 20.4 MVP Export

MVP may export markdown, DOCX, or PDF manually.

Export should not imply filing-ready status.

---

# Section 21 — Cost Governance

## 21.1 Purpose

Autonomous legal systems can become expensive without controls.

## 21.2 Cost Tracking

MVP should track approximate cost by:

- matter;
- workflow;
- model;
- tool;
- run.

Target-state should track exact token/tool/API cost.

## 21.3 Cost Controls

Cost controls include:

- model routing by task risk;
- context minimization;
- caching;
- retrieval narrowing;
- batching;
- avoiding repeated full-file analysis;
- using local models for lower-risk tasks;
- using premium models for high-risk tasks;
- stopping loops when marginal value declines.

## 21.4 Cost vs Reliability Rule

Cost control must not compromise legal reliability on high-risk outputs.

Spend where risk justifies it.

---

# Section 22 — Latency Governance

## 22.1 Purpose

Some workflows need speed; others need depth.

## 22.2 Latency Classes

Suggested:

- real-time;
- near-real-time;
- standard;
- deep;
- overnight/batch.

## 22.3 Task Examples

Real-time:

- status lookup;
- simple retrieval;
- basic client/matter display.

Standard:

- evidence classification;
- case story drafting;
- strategy draft.

Deep:

- legal research;
- adversarial review;
- complex argument drafting;
- cross-border analysis.

## 22.4 Rule

Latency class should match legal risk and user need.

Do not use shallow fast processing for high-risk legal conclusions.

---

# Section 23 — Observability

## 23.1 Purpose

LEXOS must be observable.

Operators must know what agents, models, tools, automations, and workflows are doing.

## 23.2 MVP Observability

MVP should show:

- current workflow status;
- active/failed processing;
- generated artifacts;
- agent outputs;
- risks;
- model used for major outputs;
- evidence processing status;
- support matrix status.

## 23.3 Target-State Observability

Target-state should show:

- model usage;
- token/cost usage;
- tool calls;
- latency;
- failure rates;
- workflow bottlenecks;
- agent performance;
- risk trends;
- retrieval events;
- audit events;
- autonomy actions;
- human overrides.

## 23.4 Observability Rule

Autonomous systems must not be opaque.

If LEXOS acts, the system should be able to explain:

- what happened;
- why it happened;
- which object triggered it;
- which agent/model/tool acted;
- what changed;
- what risk was created.

---

# Section 24 — Evaluation and Benchmarking

## 24.1 Purpose

Models, prompts, tools, and workflows must be evaluated.

## 24.2 Evaluation Areas

Evaluate:

- extraction accuracy;
- assertion extraction quality;
- support mapping accuracy;
- citation accuracy;
- translation quality;
- adversarial critique quality;
- drafting quality;
- role compliance;
- hallucination rate;
- unsupported assertion rate;
- retrieval boundary compliance;
- workflow completion quality.

## 24.3 MVP Evaluation

MVP should use manual review and sample test matters.

Minimum tests:

- evidence extraction review;
- assertion extraction review;
- support matrix accuracy;
- W8 draft source support;
- W9 critique usefulness;
- no cross-matter retrieval.

## 24.4 Target-State Evaluation

Target-state should include:

- regression test suites;
- benchmark matters;
- gold-standard outputs;
- model comparison;
- prompt A/B testing;
- red-team evaluations;
- drift monitoring.

---

# Section 25 — MVP Model, Tool, and Automation Requirements

## 25.1 MVP Must Include

MVP must include:

1. Model-use recording for major outputs;
2. Basic prompt/workflow versioning;
3. Evidence upload paired with **enhanced extraction tooling** (`markdown_uri`/`markdown_text` + structured JSON extraction + QA pass on supported ingest classes—not “text scrape only”);
4. Visible **extraction quality status**, quality flags, and explicit failure handling for ingestion outputs;
5. Optional embeddings anchored to **Evidence Extraction records** whenever retrieval ships;
6. Matter-scoped retrieval;
7. Structured output for Assertions and Support Matrix;
8. Risk creation;
9. Artifact creation and versioning;
10. Adversarial critique generation;
11. Basic audit logging;
12. No autonomous external legal action;
13. No unfiltered global retrieval;
14. Human review status for outputs;
15. Schema validation for extraction JSON on supported ingest classes;
16. **No silent reliance** on failed, missing, or QA-flagged extraction artifacts in downstream drafting or support mapping—the UI and agent prompts must expose the degraded state;
17. Basic cost awareness.

MVP may defer:

- full model registry;
- full tool registry;
- full prompt registry UI;
- advanced orchestration engine;
- citation verification automation;
- model drift monitoring;
- automated learning;
- autonomous external communication;
- court filing tools;
- advanced cost dashboards;
- multi-model benchmarking.

## 25.3 MVP Red Lines

MVP must not:

- allow models to determine truth without evidence;
- allow tools to act externally without permission;
- allow agents unrestricted tool access;
- skip model/tool logging for major outputs;
- generate final legal filings without review;
- retrieve from all matters globally;
- treat AI legal research as verified law;
- overwrite source files with extracted outputs.

---

# Section 26 — Target-State Model, Tool, and Automation Architecture

## 26.1 Target-State Direction

Target-state LEXOS should support:

- model registry;
- tool registry;
- prompt registry;
- model routing engine;
- tool authority engine;
- structured output validation;
- workflow orchestration;
- policy-as-code automation;
- audit logging;
- cost and latency monitoring;
- model evaluation;
- prompt evaluation;
- model drift monitoring;
- autonomous retry/failure handling;
- governance-aware external actions.

## 26.2 Model Routing Engine

The routing engine should choose models based on:

- task;
- workflow;
- sensitivity;
- jurisdiction;
- language;
- cost;
- latency;
- reliability;
- availability;
- evaluation history.

## 26.3 Tool Authority Engine

The tool authority engine should decide whether a tool call is permitted based on:

- actor;
- role;
- workflow;
- object;
- matter;
- client;
- privilege;
- confidentiality;
- autonomy level;
- risk status.

## 26.4 Automation Policy Engine

The automation policy engine should determine whether the system may:

- proceed;
- retry;
- escalate;
- create object;
- modify object;
- promote memory;
- finalize artifact;
- communicate externally;
- file externally.

## 26.5 Target-State Rule

Automation must not exceed governance maturity.

---

# Section 27 — Summary

LEXOS uses models, tools, prompts, and automations as governed execution resources.

The core rules are:

1. LEXOS is model-agnostic but model-aware.
2. Model output is not truth.
3. Tool execution is not legal authority.
4. Important models must be registered.
5. Important tools must be registered.
6. Important prompts must be versioned.
7. Models must be routed by task, risk, sensitivity, language, jurisdiction, cost, and reliability.
8. Tools must be permissioned by workflow, agent, and object scope.
9. High-risk tools require stronger gates.
10. Structured outputs are required for internal legal cognition.
11. Deterministic controls should govern AI cognition.
12. Workflow orchestration must manage status, dependencies, failures, handoffs, and audit events.
13. Model use and tool calls must be logged for material outputs.
14. Legal research tools require source verification.
15. Evidence processing tools must preserve original evidence.
16. Retrieval tools must filter by matter/client/security metadata before semantic search.
17. Translation tools must preserve original and translated text separately.
18. Document export must not imply finality.
19. Cost and latency must be governed.
20. Model/tool performance must be evaluated.
21. MVP may be simple but must preserve model/tool governance foundations.
22. Target-state LEXOS should use policy-controlled model routing, tool authority, and automation.

The final model/tool doctrine is:

> LEXOS may use increasingly powerful models and tools only if their use remains traceable, permissioned, source-grounded, risk-aware, auditable, and subordinate to the system’s legal governance architecture.