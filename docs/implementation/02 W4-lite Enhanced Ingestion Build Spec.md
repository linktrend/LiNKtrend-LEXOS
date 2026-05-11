
# 02 W4-lite Enhanced Ingestion Build Spec

## Document Status

**Document Name:** W4-lite Enhanced Ingestion Build Spec  
**Version:** v0.1  
**Project:** LiNKtrend LEXOS  
**Purpose:** Define the MVP implementation requirements for W4-lite Enhanced Evidence Ingest.  
**Primary Audience:** Cursor Composer, Codex worker agents, ingestion pipeline implementer, Supabase implementation agent, QA agent.  
**Authoritative MVP Source:** `docs/lexos-system-spec/08 LEXOS MVP Scope and Build Specification.md`, Section 11.4  
**Primary Workflow Source:** `docs/lexos-system-spec/05 LEXOS Workflow Specification.md`, W4  
**Primary Technical Source:** `docs/lexos-system-spec/09 LEXOS Technical Implementation Architecture.md`, Sections 9–10  
**Primary QA Source:** `docs/lexos-system-spec/12 LEXOS Testing, Evaluation, and Quality Assurance Specification.md`, Section 7.8  
**Primary Schema Source:** `docs/implementation/01 Database Schema v0.md`

---

# 1. Purpose

This document defines how the LEXOS MVP must implement W4-lite Enhanced Evidence Ingest.

W4-lite is a critical MVP capability.

The purpose of W4-lite is to convert uploaded legal/evidentiary materials into structured, traceable, quality-scored, agent-usable extraction artifacts while preserving the original evidence unchanged.

W4-lite must support:

- original file preservation;
- Evidence Object creation;
- Evidence Extraction Object creation;
- file/media classification;
- parser-first extraction for supported document-like evidence;
- markdown extraction;
- structured JSON extraction;
- extraction QA;
- extraction quality status;
- quality flags;
- human review flag;
- optional embedding chunks;
- audit events;
- W5-ready extracted content.

W4-lite must not become basic file upload.

W4-lite must not rely on raw OCR as final extraction for document-like evidence where structure matters.

W4-lite must not treat extracted markdown, JSON, OCR, transcripts, visual descriptions, or embeddings as original evidence.

---

# 2. Core Doctrine

## 2.1 Original Evidence Is the Evidentiary Anchor

The uploaded original file remains the evidentiary anchor.

The system must preserve it unchanged.

Derived artifacts include:

- markdown extraction;
- structured JSON extraction;
- OCR text;
- visual descriptions;
- audio transcripts;
- video timelines;
- embedding chunks;
- model summaries;
- QA reports.

Derived artifacts support search, review, analysis, support mapping, and agent reasoning, but they do not replace the original file.

## 2.2 Parser-First / OCR-Assisted Extraction

For supported document-like files, LEXOS uses a layout-aware parser as the primary extraction layer.

Preferred primary tool:

- LlamaParse or equivalent layout-aware parser.

OCR is a supporting capability.

OCR may be used for:

- scanned PDFs;
- PDF pages made of images;
- screenshots;
- chat/message screenshots;
- images with text;
- video frames;
- fallback text detection;
- extraction QA comparison.

OCR alone is not sufficient as final accepted extraction where layout, tables, chronology, sender attribution, or document structure is material.

## 2.3 Markdown + JSON Are Required Outputs

For supported MVP file types, the extraction output must include:

1. human-readable markdown;
2. structured JSON.

Markdown is for review, drafting, and human inspection.

JSON is for structured downstream processing, including assertions, evidence mapping, metadata, messages, tables, timestamps, quality indicators, and retrieval references.

## 2.4 Extraction QA Is Mandatory Where Supported

For supported file types, the system must run an extraction QA step.

The QA step should check:

- missing text;
- distorted tables;
- bad layout reconstruction;
- date/name/number errors;
- missing pages;
- incorrect sender/message attribution;
- unreadable content;
- low-confidence OCR/vision segments;
- parser failure;
- JSON/markdown inconsistency.

If extraction QA cannot be performed, the system must mark the limitation.

## 2.5 Failed or Low-Quality Extraction Cannot Silently Support W5

W5 Support Matrix must not silently rely on:

- failed extraction;
- QA-flagged extraction;
- raw OCR fallback;
- human-review-required extraction;
- low-confidence visual descriptions;
- unverified transcripts.

Such material may be used only with visible caveats or after human review.

## 2.6 Embeddings Are Retrieval Aids Only

Embedding chunks may be created from current accepted extraction content.

They must always link to:

- `client_id`;
- `matter_id`;
- `evidence_id`;
- `extraction_id`;
- source object;
- chunk index;
- privilege status;
- confidentiality status.

Embeddings are not evidence.

---

# 3. MVP Supported File Types

## 3.1 Required MVP Support Where Tooling Permits

W4-lite should support:

| File Type | MVP Handling |
|---|---|
| Digital PDF with selectable text | LlamaParse/equivalent parser → markdown + JSON → QA |
| DOCX | parser/converter → markdown + JSON → QA |
| TXT | direct ingest → markdown + JSON metadata → QA/basic validation |
| Scanned PDF | parser-first with OCR/vision support → markdown + JSON → QA |
| PDF composed of screenshots | parser-first OCR/vision-assisted extraction → markdown + JSON → QA |
| Chat/message screenshot PDF | parser-first OCR/vision-assisted reconstruction → markdown + JSON → QA |
| Standalone screenshot/image with text | vision/OCR + structure reconstruction → markdown + JSON → QA/human review |

## 3.2 Optional MVP Support

Optional in MVP:

| File Type | MVP Handling |
|---|---|
| Image without text | visual description + metadata + JSON + human review flag |
| Audio | speech-to-text transcript + markdown + JSON + quality flags |
| Spreadsheet | parser/export → markdown/table JSON + QA |
| Email/message export | parser → message structure JSON + markdown |

## 3.3 Deferred / Limited MVP Support

Deferred or limited:

| File Type | MVP Handling |
|---|---|
| Advanced video | preserve original; metadata only or limited processing unless enabled |
| Certified transcript | deferred |
| Certified translation | deferred |
| Forensic chain of custody | deferred |
| Advanced image forensics | deferred |

---

# 4. W4-lite End-to-End Flow

## 4.1 Flow Overview

```text
User uploads file
  ↓
Create Source Object if needed
  ↓
Create Evidence Object
  ↓
Store original file unchanged
  ↓
Classify file/media type
  ↓
Select extraction pathway
  ↓
Run primary parser/extraction
  ↓
Generate markdown
  ↓
Generate structured JSON
  ↓
Run extraction QA
  ↓
Assign processing_status and extraction_quality_status
  ↓
Create Evidence Extraction Object
  ↓
Create embedding chunks if enabled and appropriate
  ↓
Create audit events
  ↓
Update workflow state
  ↓
Make extraction available for W5 with quality caveats
````

## 4.2 Required Input

W4-lite ingest requires:

```text
client_id
matter_id
uploaded_file
source_type
evidence_type if known
privilege_status
confidentiality_status
uploaded_by
```

Optional input:

```text
source_id
language
notes
legal_hold
expected_file_type
manual_metadata
```

## 4.3 Required Output

W4-lite must create:

```text
Evidence Object
Evidence Extraction Object
Original file in storage
Markdown extraction
Structured JSON extraction
processing_status
extraction_quality_status
quality_flags
human_review_required
Audit Event
W5-ready extraction reference
```

Optional output:

```text
Embedding Chunks
Tool Call record
Model Run record
Risk record
Workflow State update
```

---

# 5. Required Status Values

## 5.1 Evidence `processing_status`

MVP-required values:

```text
uploaded
queued
processing
processed
qa_flagged
failed
requires_human_review
superseded
```

Optional extension values:

```text
requires_reupload
archived
```

## 5.2 Evidence Extraction `extraction_quality_status`

MVP-required values:

```text
accepted
qa_flagged
failed
human_review_required
```

## 5.3 Human Review Flag

The field:

```text
human_review_required
```

must exist on:

* `evidence`;
* `evidence_extractions`.

It should be `true` when:

* extraction quality is uncertain;
* file type is unsupported or partially supported;
* raw OCR fallback was used;
* chat/message structure is incomplete;
* audio speaker identity is uncertain;
* video/image interpretation is material;
* QA comparator cannot verify extraction;
* extraction is legally important but machine confidence is low.

---

# 6. Extraction Pathways

## 6.1 Text Document Pathway

Applies to:

* digital PDF with selectable text;
* DOCX;
* TXT;
* markdown;
* email/message export where parser-supported.

Process:

1. classify file as document-like;
2. run LlamaParse/equivalent parser;
3. generate markdown;
4. generate structured JSON;
5. run QA;
6. assign quality status;
7. store extraction.

Required markdown should preserve:

* headings;
* paragraphs;
* lists;
* tables where possible;
* page references where possible;
* exhibit labels;
* footnotes/endnotes where material.

Required JSON should include:

```json
{
  "document_type": "",
  "language": "",
  "sections": [],
  "tables": [],
  "dates_detected": [],
  "persons_entities_detected": [],
  "page_references": [],
  "quality_flags": []
}
```

## 6.2 Scanned Document / Image-Based PDF Pathway

Applies to:

* scanned PDF;
* image-based PDF;
* PDF composed of screenshots;
* photo of a document page.

Process:

1. classify file as scanned/image-based document;
2. run LlamaParse/equivalent parser where supported;
3. use OCR as supporting pixel-text detection;
4. use vision/layout model where available;
5. reconstruct document structure;
6. generate markdown;
7. generate structured JSON;
8. run QA against original pages/images;
9. mark low-confidence segments;
10. store extraction.

Rule:

Raw OCR text alone is not acceptable as final extraction where layout or structure matters unless marked:

```text
qa_flagged
human_review_required
```

or reviewed and accepted.

## 6.3 Chat / Message Screenshot Pathway

Applies to:

* WhatsApp screenshots;
* LINE screenshots;
* iMessage screenshots;
* Telegram screenshots;
* SMS screenshots;
* chat screenshots in PDF;
* PDF composed of phone screenshots.

Process:

1. classify as chat/message evidence;
2. preserve original screenshots/PDF;
3. run parser-first extraction where supported;
4. use OCR to detect visible text;
5. use vision/layout analysis to reconstruct message structure;
6. identify sender attribution where visible;
7. identify timestamps;
8. identify date separators;
9. identify message boundaries;
10. identify attachments/placeholders;
11. mark unreadable or uncertain segments;
12. generate markdown transcript;
13. generate structured message JSON;
14. run QA against original pages/screenshots;
15. assign quality status.

Required markdown should look like:

```markdown
# Chat Screenshot Extraction

## Source
Evidence ID: EVD-...

## Page / Screenshot 1

### Date Separator
2024-04-27

### Messages

[10:21] Sender A: Message text.

[10:22] Sender B: Message text.

[10:23] Sender A: [Attachment placeholder: image visible but not extracted]

## Unreadable / Uncertain Segments
- Page 2, lower right message bubble partially cut off.
```

Required JSON should include:

```json
{
  "evidence_type": "chat_screenshot",
  "platform": "whatsapp_or_unknown",
  "screenshots": [
    {
      "page_reference": "",
      "date_separator": "",
      "messages": [
        {
          "message_index": 1,
          "sender_label": "",
          "sender_confidence": null,
          "timestamp": "",
          "message_text": "",
          "message_type": "text",
          "attachment_placeholder": null,
          "is_unreadable": false,
          "confidence": null
        }
      ],
      "quality_flags": []
    }
  ]
}
```

Important:

A PDF containing screenshots of WhatsApp messages is **not** an OCR-only task.

It is a parser-first, OCR/vision-assisted document reconstruction task.

## 6.4 Image Without Text Pathway

Applies to:

* photo of a place;
* photo of an object;
* accident scene;
* damaged property;
* building entrance;
* physical evidence photo;
* no visible text.

Process:

1. preserve original image;
2. extract metadata if available;
3. run visual description model if enabled;
4. produce markdown visual description;
5. produce structured JSON;
6. flag human review if material;
7. embed visual description only if retrieval is enabled and allowed.

Required markdown:

```markdown
# Visual Evidence Description

## Evidence ID

## File Type

## Visual Description

## Detected Text
None detected.

## Detected Objects / Scene Elements

## Metadata

## Potential Evidentiary Relevance

## Quality Flags

## Limitations
```

Required JSON:

```json
{
  "evidence_type": "image_without_text",
  "contains_text": false,
  "visual_description": "",
  "detected_objects": [],
  "metadata": {},
  "quality_flags": [],
  "human_review_required": true
}
```

Rule:

Visual description is not verified fact.

## 6.5 Audio Pathway

Optional MVP.

Applies to:

* audio recordings;
* voice notes;
* call recordings;
* meeting recordings.

Process:

1. preserve original audio;
2. extract metadata;
3. run speech-to-text if enabled;
4. create timestamped transcript;
5. identify speaker segments where possible;
6. detect language;
7. optionally translate;
8. generate markdown transcript;
9. generate structured JSON;
10. assign quality flags;
11. require human review for material reliance.

Required markdown:

```markdown
# Audio Evidence Transcript

## Evidence ID

## Duration

## Language

## Speaker Segmentation

## Transcript

[00:00:03] Speaker 1: ...

## Quality Flags

## Limitations
```

Required JSON:

```json
{
  "evidence_type": "audio",
  "duration": "",
  "language": "",
  "speakers": [],
  "segments": [],
  "quality_flags": [],
  "human_review_required": true
}
```

Rule:

Speaker identity is unverified unless independently reviewed.

## 6.6 Video Pathway

Deferred or limited MVP.

Applies to:

* surveillance video;
* mobile video;
* meeting video;
* screen recordings.

MVP default:

1. preserve original video;
2. create Evidence Object;
3. extract basic metadata if possible;
4. mark advanced extraction as deferred or human review required.

If video extraction is enabled:

* extract audio track;
* transcribe audio;
* sample keyframes;
* OCR visible text in frames;
* create visual timeline;
* generate markdown/JSON;
* assign quality flags.

Rule:

Advanced video analysis is target-state unless explicitly enabled.

---

# 7. Evidence Object Requirements

When ingest starts, create an Evidence Object with at least:

```text
client_id
matter_id
source_id
evidence_label
file_name
file_type
evidence_media_type
source_type
language
original_file_uri
original_file_hash optional MVP
processing_status
extraction_status
quality_status
human_review_required
uploaded_by
uploaded_at
confidentiality_status
privilege_status
metadata_json
```

Initial `processing_status` should normally be:

```text
uploaded
```

Then:

```text
queued
processing
processed / qa_flagged / failed / requires_human_review
```

---

# 8. Evidence Extraction Object Requirements

Each extraction run creates an Evidence Extraction Object.

Required fields:

```text
evidence_id
client_id
matter_id
extraction_type
markdown_uri or markdown_text
json_uri or json_content
ocr_text where applicable
transcript_json where applicable
visual_description where applicable
timecoded_segments where applicable
frame_references where applicable
extraction_tool
extraction_model
qa_model
extraction_quality_score
extraction_quality_status
quality_flags
human_review_required
is_current
supersedes_extraction_id
confidentiality_status
privilege_status
metadata
```

Rules:

* Extraction inherits privilege/confidentiality from Evidence unless reviewed.
* Extraction must link to original Evidence.
* Reprocessing creates a new extraction version or supersedes the prior one.
* Only one extraction should normally be `is_current = true` for a given evidence item and extraction type.

---

# 9. Markdown Extraction Requirements

Markdown extraction should be:

* readable;
* structured;
* traceable;
* page/time/frame referenced where possible;
* suitable for human review;
* suitable for downstream agent context.

Markdown should preserve:

* headings;
* paragraphs;
* lists;
* tables;
* page numbers;
* date separators;
* message boundaries;
* timestamps;
* speaker labels;
* uncertainty markers;
* unreadable segments.

Markdown should not hide:

* missing content;
* uncertain reconstruction;
* low-confidence OCR;
* table errors;
* cropped screenshots;
* unreadable images;
* failed segments.

---

# 10. Structured JSON Requirements

Structured JSON should support downstream processing.

JSON should include, where relevant:

```text
document_type
evidence_type
language
sections
paragraphs
tables
messages
dates_detected
persons_entities_detected
page_references
timecode_references
frame_references
visual_description
detected_objects
transcript_segments
quality_flags
human_review_required
limitations
```

JSON must not invent facts.

If uncertain, use:

```json
{
  "value": null,
  "confidence": null,
  "status": "unknown"
}
```

or equivalent structure.

---

# 11. Extraction QA Requirements

## 11.1 QA Purpose

Extraction QA checks whether markdown and JSON accurately represent the original evidence.

The QA comparator should compare structured output against:

* original PDF pages;
* original screenshots;
* original image;
* original audio transcript confidence;
* original video frames where enabled;
* parser output;
* OCR/vision signals.

QA should not merely compare markdown against OCR text.

## 11.2 QA Checks

The QA step should check:

* missing pages;
* missing text;
* wrong reading order;
* broken tables;
* bad paragraph structure;
* wrong dates;
* wrong numbers;
* wrong names;
* wrong sender attribution;
* missing timestamps;
* missing attachments/placeholders;
* unreadable/cropped messages;
* low-confidence OCR;
* hallucinated content;
* JSON/markdown mismatch.

## 11.3 QA Output

QA should produce:

```text
extraction_quality_status
extraction_quality_score
quality_flags
human_review_required
qa_notes
```

## 11.4 Quality Flags

Suggested quality flags:

```text
missing_text
missing_page
low_ocr_confidence
layout_uncertain
table_structure_uncertain
sender_attribution_uncertain
timestamp_uncertain
cropped_message
unreadable_segment
attachment_not_extracted
language_uncertain
metadata_missing
raw_ocr_fallback
parser_failure
vision_qa_failed
human_review_required
```

---

# 12. Embedding Requirements

Embeddings are optional in early MVP but schema must support them.

## 12.1 What to Embed

Embed only current allowed derived content:

* accepted markdown extraction;
* accepted structured text chunks;
* accepted transcript chunks;
* accepted visual description chunks;
* reviewed or caveated QA-flagged content if allowed.

Do not embed:

* failed extraction;
* raw OCR fallback unless explicitly allowed and flagged;
* privileged content without proper metadata;
* unrelated matters;
* abandoned W0 intake material unless governance permits.

## 12.2 Required Metadata

Each embedding chunk must include:

```text
client_id
matter_id
evidence_id
extraction_id
source_object_type
source_object_id
chunk_text
chunk_index
page_reference
timecode_reference
frame_reference
language
privilege_status
confidentiality_status
embedding_model
is_current
metadata
```

## 12.3 Retrieval Rule

Retrieval must filter by:

```text
client_id
matter_id
privilege_status
confidentiality_status
is_current
source_object_type
```

before semantic similarity is used.

---

# 13. UI Requirements for W4-lite

The Evidence Workspace must show:

* original file;
* Evidence Object metadata;
* processing status;
* extraction quality status;
* human review flag;
* quality flags;
* markdown extraction;
* structured JSON extraction;
* extraction method;
* parser used;
* OCR used as support;
* vision/model QA used;
* raw OCR fallback flag;
* linked assertions;
* embedding status if enabled.

Evidence Detail should have tabs or panels:

```text
Original
Markdown Extraction
Structured JSON
Metadata
Quality / QA
Embeddings / Retrieval Chunks
Linked Assertions
```

If extraction is raw OCR-only, failed, QA-flagged, or human-review-required, the UI must make this visually obvious.

---

# 14. Agent Rules for W4-lite

The Evidence Ingest / Extraction Agent must:

* classify file/media type;
* select extraction pathway;
* preserve original;
* generate markdown;
* generate JSON;
* run or invoke QA;
* assign quality status;
* create quality flags;
* prepare embedding chunks if enabled;
* create audit event;
* mark human review when required.

The agent must not:

* treat extraction as original evidence;
* treat OCR text as final structured extraction where structure matters;
* infer facts beyond the content;
* mark low-confidence extraction as accepted;
* hide unreadable content;
* silently allow failed extraction to support assertions.

---

# 15. Audit Requirements

Create Audit Events for:

* evidence uploaded;
* original file stored;
* extraction started;
* extraction completed;
* extraction failed;
* extraction QA flagged;
* human review required;
* extraction accepted;
* extraction superseded;
* embedding chunks created;
* evidence archived/deleted/exported if implemented.

Audit Event should include:

```text
event_type
actor_type
actor_id
client_id
matter_id
target_object_type
target_object_id
summary
metadata
```

---

# 16. Risk Creation Rules

Create or recommend Risk records when:

* core evidence extraction fails;
* extraction is QA-flagged;
* screenshot/chat reconstruction is uncertain;
* table extraction is uncertain;
* dates/names/numbers are uncertain;
* audio transcript is low confidence;
* visual description is material but unreviewed;
* metadata is missing or inconsistent;
* W5 attempts to rely on failed/QA-flagged extraction.

Suggested risk types:

```text
evidence_extraction_risk
ocr_quality_risk
parser_failure_risk
visual_interpretation_risk
transcript_accuracy_risk
support_mapping_risk
privilege_risk
```

---

# 17. Service / Module Design

Recommended implementation modules:

```text
EvidenceService
EvidenceExtractionService
FileClassificationService
ParserAdapter
OCRAdapter
VisionAdapter
SpeechToTextAdapter
ExtractionQAService
EmbeddingService
StorageService
AuditService
RiskService
WorkflowService
```

## 17.1 EvidenceService

Responsibilities:

* create Evidence Object;
* update processing status;
* link source;
* preserve metadata;
* manage archival/supersession.

## 17.2 EvidenceExtractionService

Responsibilities:

* create extraction record;
* save markdown/JSON;
* manage extraction quality status;
* supersede old extractions.

## 17.3 FileClassificationService

Responsibilities:

* determine file type;
* determine pathway;
* identify unsupported or deferred file type.

## 17.4 ParserAdapter

Responsibilities:

* call LlamaParse or equivalent;
* return structured parser output;
* return markdown where available;
* return table/layout structure where available.

## 17.5 ExtractionQAService

Responsibilities:

* compare extraction against original;
* detect missing/uncertain content;
* assign quality status;
* generate quality flags.

## 17.6 EmbeddingService

Responsibilities:

* chunk current accepted extraction;
* call embedding model;
* store embedding chunks with metadata.

---

# 18. Environment Variables

Potential variables:

```text
PARSER_PROVIDER
PARSER_API_KEY
LLM_PROVIDER
LLM_API_KEY
VISION_PROVIDER
VISION_API_KEY
EMBEDDING_PROVIDER
EMBEDDING_API_KEY
ENABLE_EMBEDDINGS
ENABLE_AUDIO_INGEST
ENABLE_VIDEO_INGEST
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Rules:

* service role key server-side only;
* no secrets committed;
* missing parser/model key should cause clear disabled/error state;
* app should not pretend extraction succeeded when provider is missing.

---

# 19. MVP Implementation Sequence

## Step 1 — Storage + Evidence Object

Implement:

* file upload;
* storage path;
* Evidence Object creation;
* audit event.

## Step 2 — File Classification

Implement:

* media type detection;
* pathway selection;
* unsupported/deferred handling.

## Step 3 — Parser Integration

Implement:

* parser adapter;
* markdown extraction;
* basic JSON extraction;
* status updates.

## Step 4 — Evidence Extraction Object

Implement:

* `evidence_extractions`;
* save markdown/JSON;
* quality status;
* human review flag.

## Step 5 — Extraction QA

Implement:

* QA comparator placeholder or actual model-based QA;
* quality flags;
* QA status;
* visible failure states.

## Step 6 — UI Evidence Workspace

Implement:

* Evidence list;
* Evidence detail;
* original view/link;
* markdown tab;
* JSON tab;
* QA tab.

## Step 7 — Embeddings

Optional early MVP.

Implement only after extraction objects are stable.

## Step 8 — W5 Handoff

Make extraction usable by Support Matrix with quality caveats.

---

# 20. MVP Acceptance Criteria

W4-lite passes when:

1. user can upload supported file;
2. original file is stored unchanged;
3. Evidence Object is created;
4. Evidence Extraction Object is created;
5. markdown extraction exists where applicable;
6. structured JSON exists where applicable;
7. processing status is visible;
8. extraction quality status is visible;
9. human review flag exists;
10. quality flags are visible;
11. raw OCR-only fallback is not silently accepted for screenshot/chat evidence;
12. failed extraction is visible;
13. QA-flagged extraction is visible;
14. accepted extraction can be used for W5;
15. failed/QA-flagged extraction cannot silently support assertions;
16. audit events are created;
17. embeddings, if enabled, link to `client_id`, `matter_id`, `evidence_id`, and `extraction_id`.

---

# 21. W4-lite Failure Conditions

W4-lite fails if:

* original evidence is overwritten;
* evidence exists only as a file path;
* no Evidence Extraction Object is created;
* markdown/JSON are missing for supported file types;
* raw OCR text is accepted as final for chat/message screenshots without QA flag or review;
* extraction quality status is missing;
* human review flag is missing;
* failed extraction appears processed;
* QA-flagged extraction is treated as reliable without caveat;
* embeddings lack evidence/extraction linkage;
* retrieval can cross matters by default;
* agents cannot trace extraction back to original evidence.

---

# 22. Coding Agent Prompt

When ready to implement W4-lite, give Cursor or Codex a task like:

```markdown
You are implementing W4-lite Enhanced Evidence Ingestion for LEXOS.

Read:
- docs/implementation/02 W4-lite Enhanced Ingestion Build Spec.md
- docs/implementation/01 Database Schema v0.md
- docs/implementation/00 MVP Implementation Roadmap.md
- docs/lexos-system-spec/05 LEXOS Workflow Specification.md
- docs/lexos-system-spec/08 LEXOS MVP Scope and Build Specification.md
- docs/lexos-system-spec/09 LEXOS Technical Implementation Architecture.md
- docs/lexos-system-spec/12 LEXOS Testing, Evaluation, and Quality Assurance Specification.md

Task:
Implement the W4-lite ingestion foundation.

Scope:
- create Evidence upload service;
- create Evidence Object;
- store original file unchanged;
- classify file type;
- create Evidence Extraction Object;
- generate placeholder markdown/JSON extraction if parser key is unavailable;
- implement status transitions;
- expose extraction quality status and human review flag;
- create audit event;
- do not implement full W5 yet.

Do not:
- treat OCR as final extraction for screenshot/chat evidence;
- overwrite original files;
- create global retrieval;
- create external communication;
- store secrets in repo.

Deliver:
- code changes;
- tests or manual verification steps;
- final handoff report.
```

---

# 23. Next Step

After this build spec, create:

```text
docs/implementation/03 Agent Prompt Registry v0.md
```

That document defines the first MVP prompt set for LEXOS agents.


