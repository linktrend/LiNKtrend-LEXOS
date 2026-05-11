# **Functional Briefing: LiNKtrend Legal Operating System (LEXOS)**

## **Introduction**

LiNKtrend LEXOS is a high-fidelity, agentic legal operating system designed to replicate the functions of a professional law firm through deterministic, high-accuracy AI workflows. The system is built for a collaborative environment where agents execute complex legal maneuvers under the strategic oversight of a human lawyer. LEXOS prioritizes 98%+ accuracy, bilingual nuance (English/Chinese), and the creation of a persistent "Life Intelligence" asset for each client.

## **1\. System Architecture & Logical Boundaries**

The architecture is structured to ensure absolute data integrity and multi-tenant security:

* Client Level: Managing the Client Master Record (Client Facts).  
* Case Level: Isolated silos for specific legal matters (Plaintiff or Defense). **Matter routing:** **plaintiff-side** matters flow **W2 → W4**; **defence-side** matters flow **W2 → W3 → W4** (opposing file intake and reconciliation before client evidence production).  
* Workflow Level: Sequential modules (**W0–W11**) executed by specialized agents with distinct toolsets.

## **2\. Client-Level Workflow**

### **W0: Client Onboarding Workflow**

Description: This workflow handles the initial lead acquisition, pre-screening, ethical clearance, and formal engagement of a new client. It is a stateless, ephemeral process designed to filter and verify before any data is committed to the firm's persistent database.

Agents:

Agent: The Intake Specialist

Purpose: To conduct inquiries, handle KYC/AML verification, and manage the engagement letter process.

AI Models: Kimi K2.5 (Conversational/Reasoning Mode), Gemini 1.5 Flash (KYC/Verification).

Tools: Supabase (Temporary Intake Tables), DocuSign API, Identity Verification API, Accounting Agent interface, Office Admin Agent interface.

Skills: Bilingual Client Inquiry, Conflict Checking Logic, KYC Compliance Verification, Engagement Drafting.

Output: Certified Onboarding Dossier, Signed Engagement Letter.

Operational Flow:

Phase 1 (Screening): The agent collects identification and contact details and performs a mandatory conflict check against all existing internal case IDs. If a potential conflict appears, the agent suspends further automated screening until a human clears it; if it is not cleared, the client is declined with a brief explanation that a conflict prevents the engagement. Once there is no conflict (or a human has documented clearance), the agent runs any available sanctions, watchlist, or analogous database checks and conducts a thorough online review (web and social media) for adverse reporting or other material negative information about the prospective client. If any preliminary check produces a negative outcome, the default is rejection unless a human, after review, explicitly authorizes an override; without that override, the client is informed of rejection. If screening is satisfactory—or a human has approved proceeding despite adverse signals—the workflow continues to Phase 2. Throughout Phase 1, the agent creates and maintains a Client Onboarding File that records the results of each check, the phase outputs, and every human decision (including conflict clearances, screening overrides, approvals to proceed, and declinations).

Phase 2 (Agreement): The Intake Specialist and a human lawyer conduct a structured consultation with the prospective client. The session gathers any information still missing after Phase 1, addresses questions or red flags from the screening record, and defines the scope of work (matter boundaries, objectives, and limits of the retainer). The agent records the discussion, outcomes, and outstanding items in the Client Onboarding File. Only a human may decide whether the firm will offer engagement. If the firm offers engagement, the agent determines the firm's team that will handle the client (through the independent workload assignment process) and sends the client a personalised engagement package—typically the engagement letter and retainer (if used)—plus an explicit checklist of KYC/AML information and documents needed to open the matter; the human’s decision, the team assigned and each outbound package are logged in the Client Onboarding File. If the firm declines or the client refuses the terms, the intake is closed per firm policy and the Client Onboarding File is completed with the reason, the client is informed and the Client Onboarding File is archived (would be used as firm's knowledge in the future to conduct future onboarding checks for other clients). If the client accepts, signs the engagement documents, and supplies the KYC materials requested in Phase 2 (or a human has approved a documented partial or phased submission that is sufficient to begin verification), the workflow advances to Phase 3. If the client is unresponsive or fails to provide requested materials without adequate explanation, the agent issues up to three follow-up requests; if the gap persists, the file is escalated to a human to decide whether to abandon the intake, extend deadlines, pursue further direct contact or approve a documented partial or phased submission.

Phase 3 (KYC & client file opening): Phase 3 completes customer due diligence and moves toward formal file opening only after Phase 2’s engagement package is executed and the client has supplied the requested KYC/AML materials (or a human-approved partial/phased set). The Intake Specialist collates a verification pack, checks it against the Phase 2 checklist, and clears gaps through human-directed follow-up. **Identity and authenticity:** for natural persons, verify identity using reliable, independent sources (for example government-issued ID, national ID databases or accredited e-ID providers where available, and liveness or document-authenticity signals supported by the firm’s tools). For legal entities and trusts, identify and verify **beneficial owners, control persons, and authorised signatories** to a standard consistent with the matter risk—not merely collecting formation documents. Documents must be genuine, current, legible, and convincingly tied to the party they represent. **Risk-based due diligence:** apply the firm’s risk framework (geography, industry, PEP/sanctions exposure, transaction type, and source-of-funds / source-of-wealth indicators where policy requires); apply **enhanced due diligence** when red flags, high-risk profiles, or unusual structures demand it, and escalate material doubt or EDD outcomes to a human. **Purpose and monitoring baseline:** record the stated purpose and expected nature of the engagement (aligned with Phase 2 scope) for ongoing monitoring.

**Retainer verification and accounting setup:** before the appointed **lead / handling lawyer** may give final file-opening sign-off, the Intake Specialist must contact the **Accounting Agent** with sufficient particulars—client and matter identifiers, engagement and fee terms, expected retainer amount and currency, payment rails, and any billing notes—so Accounting can confirm whether the retainer has been **received** and, if not, can say so and update the Intake Specialist when it is. In that same collaboration, Intake and Accounting **establish the client’s accounting record**: billing identifiers, payment terms, matter/fee mapping, and other finance master data the firm requires.

**Lead-attorney sign-off gate:** before any final file-opening sign-off, Intake prepares a **sign-off pack** for the **lead attorney** that reflects the **entire onboarding status at that time**—not only retainer—covering **all Phase 3 requirements**, **KYC/AML completeness** (including missing documents or data), verification and risk outcomes, open escalations, Accounting’s **retainer received / not received** position (with dates and references when available), and **any other material blockers or issues**. The lead attorney may **sign off** file opening; **wait** until named gaps are satisfied; **waive** specific **KYC/CDD gaps or deficiencies** and proceed subject to firm policy and documented rationale in the **Client Onboarding File**; **waive** the requirement that retainer be **received** before proceeding (likewise documented); or **give instructions** to Intake on priorities, contacts, or next steps.

If the attorney **waits** or **gives instructions**, Intake follows up **respectively** with the **client**, **Accounting**, or other addressees as directed, in a measured way (**proactive but not pushy**), and **keeps the lead attorney informed** promptly when any **blocker that caused the wait** is **cleared**. If, after a **reasonable period** and **appropriate follow-ups**, a blocker is **still not cleared**, Intake **informs the lead attorney** with an updated full-status view so the attorney can sign off, wait, waive, or issue new instructions. Intake **refreshes the sign-off pack** after each material change. The agent must not treat the client file as production-ready until the lead attorney has signed off.

**After lead-attorney sign-off:** Intake **finalises the Client Onboarding File** in the **client database**—complete, auditable, and retained per applicable regulation and firm policy—including verification artefacts, risk classification, retainer/payment status from Accounting, and all human decisions. From that verified intake record only, Intake drafts the **Client Master Story First Draft** (no uncorroborated allegations). The **Draft Master Record** delivered to **W1 (The Custodian)** is the combination of the **finalised Client Onboarding File** and this **initial Client Master Story**, together forming the first structured version of **Client Facts** and engagement metadata for ongoing custody.

**Office administration and access:** when handing over to W1, Intake coordinates the **Office Admin Agent**: confirm full onboarding, physical/digital file opening, that Accounting has been notified and set up, and transmit **all client and firm-team details** the admin function needs (contacts, service addresses, matter references, assigned roster). Intake instructs Office Admin to apply **access control** so only authorised personnel can reach the client’s records and matter silo. **Intake lifecycle:** after **successful handover** to W1, or after a human **closes or abandons** the intake (with the Client Onboarding File archived per firm policy), the Intake Specialist **does not retain client-specific operational memory** for ongoing matters—it becomes **stateless** again and moves on to the next prospect. **W1 (The Custodian)** is the workflow that **stays with the client** for the rest of the relationship.

Work Product:

Certified Onboarding Dossier, Finalised Client Onboarding File (client database), Client Master Story First Draft, Accounting-confirmed retainer status and receipt references, Draft Master Record package for W1 (finalised onboarding file plus initial Client Master Story).

### **W1: Client Master Record Management Workflow**

Description: **W1 is client-scoped, not case-scoped.** A client may have **many matters** (**W2–W11** case silos) over time; **W1 is the persistent workflow** that remains attached to the **client** for the **full lifecycle** with the firm—unlike **W0**, which is **ephemeral** and, after handover or after a human closes or abandons intake, **releases client-specific context** and processes the next prospect. **W1 maintains the firm’s authoritative, cross-matter view of the client:** the **Client Master Story File**, underlying **Client Facts**, and **Client Master Record** metadata. It stewards **internal** coordination (which lawyers, teams, and systems need a consistent client picture) and **external** touchpoints with the **client** when facts must be confirmed or KYC must be refreshed. Facts may **arrive** from any active or historical **case** handled for that client, from **human** instructions or uploads, from **other agents’** research, or from **external** sources; each candidate fact is **logged**, **verified** before promotion when policy requires it, and then merged into the Master Story and Client Facts. **W1 also keeps client KYC/AML profiles current** on the schedule and triggers demanded by **regulation and firm policy** (including material-change events).

Agents:

Agent: The Custodian (Client Steward)

Purpose: To act as the **long-running custodian** for one client (or one logical client relationship) at a time: maintain the **Client Master Story File** and **Client Facts**, ingest and reconcile facts from **all** of that client’s cases and from non-case sources, apply a **verification ladder** before promoting sensitive or disputed facts, run **ongoing KYC maintenance**, and support **relationship continuity** between the client and the firm.

AI Models: Gemini 1.5 Pro (Accuracy / verification over structured records), Kimi K2.5 (Bilingual nuance, client-safe drafting).

Tools: Supabase (**client-level** Master Tables and Master Story), **read access to case-level** evidence and story repositories for that client’s matters, Perplexity API (external verification), OSINT Tools, human/task routing for approvals and client outreach.

Skills: Client-lifecycle continuity (vs. intake ephemerality), cross-matter fact reconciliation, verification ladder execution (internal → external → client), story merge & deduplication, conflict detection across cases, regulatory KYC refresh, bilingual client communications.

Output: Updated **Client Master Story File**, augmented **Client Facts**, **Client Fact Audit Log**, rolling **KYC / client-risk status** summaries.

Operational Flow:

Phase 1 (Handoff from W0): Receives the **Draft Master Record** from W0—the **finalised Client Onboarding File** plus **Client Master Story First Draft**—and ingests it into the **permanent client record**. Confirms linkage to **matter IDs** and the **assigned client / relationship team** from onboarding; establishes the **baseline** Client Facts and Master Story that all later case work will reconcile against.

Phase 2 (Continuous fact intake): **Pulls or accepts** candidate facts from **every case** the firm runs for this client (for example fact promotions from **W2**, **W3**, **W5**, exhibits, pleadings, and verified case-story assertions), from **human** lawyers and staff, from **other agents** commissioned on research or diligence, and from **monitored external** feeds (news, corporate filings, sanctions/PEP updates where used). Each item is **time-stamped, sourced, and queued** as a **pending or provisional** update to the Client Master Story / Client Facts; duplicates and conflict with existing Client Facts are **flagged** for resolution before promotion.

Phase 3 (Verification & promotion): For each candidate fact, the Custodian applies the **verification ladder**: **(1)** search **internal** firm materials first—the client’s **case files, evidence indexes, and case-level story files** for corroboration; **(2)** if still **unsupported or ambiguous**, conduct **external** research (Perplexity, OSINT, registry checks) within policy; **(3)** if still **unsupported or unverified**, route a **focused request to the client** (or to the responsible human to put to the client) for documents or confirmation. Facts that meet verification standard—or that a **human expressly waives or accepts** with rationale—are **promoted** into the **Client Master Story File** and **Client Facts**; everything else remains **provisional** with reason codes. All steps are written to the **Client Fact Audit Log**.

Phase 4 (KYC & regulatory maintenance): On **fixed schedules** and on **material-change triggers** (new UBO, change of address or control, new high-risk matter type, or Accounting/Compliance flags), refreshes **KYC/AML** data and screenings, reconciles outcomes to the Client Master Record, escalates **EDD** or anomalies to humans, and updates the **Client Master Story** only where verification allows (no uncorroborated client narrative).

Phase 5 (Relationship & internal coordination): Keeps the **firm-side** picture of the client coherent across matters—**team roster changes**, new matters opened or closed, and **client-facing** summaries or fact sheets where the relationship team needs an approved, single source of truth. Does **not** replace **case** strategy (**W2–W11**); it **feeds** verified Client Facts **into** those workflows when case agents pull from the master.

Work Product:

Client Master Story File (authoritative client-level narrative), Client Facts dataset, Client Fact Audit Log, Verified Fact Manifest (or equivalent promotion register), KYC / client-risk status reports, periodic compliance refresh dossiers.

## **3\. Case-Level Workflows**

### **W2: Case-Client Story Workflow**

Description: **W1 coordination:** At **any** point in W2, the Story Architect may submit **Fact Promotion Requests** to **W1 (The Custodian)** to update the **Client Master Story**, **Client Facts**, or broader **client master record** when **client-level** (cross-matter) truths emerge—**not only** at the closing phase; **Phase 8** still **consolidates** any remaining promotions. **W2 is the initial case intake for a specific matter** and always **bootstraps** the **Case Master Story File**—the case-level counterpart to **W1**’s client-level master story. The agent **draws first** on **W1** (Client Master Story, Client Facts), **W0** where relevant, and **matter header** data. At matter open the firm classifies the matter as **plaintiff-side** (the client is pursuing a claim or is **not** the accused in a prosecution / formal defence posture) versus **defence-side** (the client is **defendant**, **accused**, or comparable **respondent**, and the **opposing** prosecution / plaintiff / court case file is expected to be ingested **after** this workflow). **Routing:** **Plaintiff-side** → **W2** then **W4** (evidence intake). **Defence-side** → **W2** then **W3** (opposing case file intake and reconciliation); **W4** only **after** W3 completes. **During W2** the client may **describe or mention** evidence (**mention only**); **files** are **not** produced. **Plaintiff-side** W2 ends with a **written evidence-needs register** for **W4**. **Defence-side** W2 **does not** ask the client for an **evidence-production** schedule—**only** the **story** is developed, confirmed, and stress-tested; **evidence requests** wait until **after** W3.

Agents:

Agent: The Story Architect

Purpose: To run **three client meetings** with **internal review-and-research** between them; build and confirm the **Case Master Story File**; **stress-test** narrative support with **red / yellow / green** readiness; issue **Fact Promotion Requests** to **W1** **whenever** warranted as well as in **Phase 8**; **plaintiff-side:** issue **evidence-needs register** and hand off to **W4**; **defence-side:** hand off **without** a client-facing evidence list and route to **W3**.

AI Models: Kimi K2.5 (thinking mode for investigative logic and meeting agendas), Claude 3.5 Sonnet (structured narrative synthesis and long-form Case Master Story drafting).

Tools: Supabase (**case-specific** tables tied to the matter), **read-only** pulls from **W1** client master data, **W1 Fact Promotion Request** channel (to The Custodian), LlamaIndex (RAG over **existing** firm texts—client master, prior filings, notes—not over raw W4 evidence that does not yet exist), Perplexity API (external case-context and open-source research during internal rounds).

Skills: Investigative questioning, bilingual narrative synthesis (CN/EN), three-pass meeting design, internal research briefing, client confirmation facilitation, plaintiff vs defence routing, support-percent estimation against a defined rubric, consistency and vulnerability stress-testing, fact-promotion packaging for W1, plaintiff-track evidence-needs authoring for W4.

Output: **Case Master Story File** (W2 version), **Client confirmation log** (confirm / add / modify), **support & traffic-light report** (red / yellow / green with rationale), **Fact Promotion Request** (to W1), **Case-Fact Audit Log**; **plaintiff-side:** **evidence-needs register** for W4; **defence-side:** **W3 handoff brief** (story + flags, **no** client evidence demand).

Operational Flow:

Phase 1 (Meeting 1 — initial fact finding): A **human lawyer** and the Story Architect hold the **first** structured session with the client. The agent preloads **W1 / W0 context** and an agenda of known gaps. The goal is **initial fact finding**—who, what, when, where, why—and capturing the client’s **oral narrative** and **references** to documents or third parties (**mention only**, no file production required).

Phase 2 (Internal review & research — after Meeting 1): The firm **pauses** client contact while the agent consolidates notes, reconciles against the **Client Master Story**, runs **targeted internal** review, and executes **external / OSINT-style research** (Perplexity and allowed tools) to prepare **verification questions** and hypotheses for Meeting 2.

Phase 3 (Meeting 2 — fact verification): **Second** human+agent+client session to **verify** facts from Meeting 1, resolve inconsistencies, and press understudied areas surfaced by internal work.

Phase 4 (Internal review & research — after Meeting 2): **Second** internal round: update the working Case Master Story draft, note remaining doubts, and design the **final** question set for Meeting 3.

Phase 5 (Meeting 3 — final fact finding): **Third** session to lock **final fact finding** as far as oral intake allows; confirm chronology, cast of characters, and the client’s **theory of the matter** in outline.

Phase 6 (Case Master Story File — draft & confirm): The agent assembles a **fairly accurate and detailed Case Master Story File** synthesising all three meetings and internal research. The **client is presented** the story to **confirm, add, or modify**. The client may respond **in writing** or in a **follow-up meeting** with **human and agent**; all changes are logged in the **Client confirmation log**. **Plaintiff-side:** the client also receives a **written list** of **information, documents, and evidence** to be produced in **W4**. **Defence-side:** **no** client-facing list—**story confirmation only**; internal notes may capture **oral mentions** for staff use, **not** as a production request to the client.

Phase 7 (Support scoring, stress test, and traffic light): The agent **tags** assertions with a **provisional support posture** (e.g. client-confirmed, internally corroborated, cited-but-not-yet-produced, or gap). It estimates an overall **support percentage** for material facts in the Case Master Story File—meaning “**supported for intake purposes**” (acknowledgments, firm records, client-identified sources, and coherent narrative **without** treating W4 artefacts as already present). The agent runs a **stress test** for **logical consistency, factual gaps, weak points, and vulnerabilities**; if support is **below 70%**, the agent **re-engages** the client (writing or meeting) with **targeted requests** until the gap narrows or a human accepts the residual risk. **Readiness flags (may proceed to next workflow):** **below 70%** — **red** (explicit list of weaknesses, unsupported or unverified facts, and gaps); **70%–89%** — **yellow**; **90% or above** — **green**; the annexed issues list is always visible downstream.

Phase 8 (Promote client-level facts to W1 — consolidation): Facts that belong in the **Client Master Story / Client Facts** (biographical, institutional, or cross-matter truths—not case-only tactical detail) are packaged in **Fact Promotion Requests** and sent to **W1 (The Custodian)** for verification and merge under W1’s ladder. This phase **captures any promotions not already sent** during earlier W2 work.

Phase 9a — **Plaintiff-side handoff:** Issue **consolidated evidence request** / **evidence-needs register**; **version-stamp** the Case Master Story File; **route to** **W4**.

Phase 9b — **Defence-side handoff:** **No** client-facing evidence demand. **Version-stamp** the Case Master Story File; prepare **W3** input (story, traffic light, narrative-only gap notes); **route to** **W3**.

Work Product:

Case Master Story File (W2-complete intake version), Client confirmation log, support-percentage & traffic-light report (red / yellow / green), stress-test / vulnerability memorandum, Fact Promotion List (to W1), Case-Fact Audit Log; **plaintiff-side:** evidence-needs register → **W4**; **defence-side:** W3 handoff brief (no client evidence schedule).

### **W3: Opposing Case File Intake & Story Reconciliation (Defence track)**

Description: **W1 coordination:** During W3, the **Story Architect** may submit **Fact Promotion Requests** to **W1 (The Custodian)** whenever **client-level** facts crystallise from meetings or reconciliation, in addition to any **final sweep** at handoff. **W3 runs only on the defence-side path** after **defence-track W2**. **Plaintiff-side matters skip W3** and go **W2 → W4**. Here the firm ingests the **opposing** formal **case file**—**prosecution**, **indictment**, **plaintiff** complaint or pleadings, **court** register entries, and closely related official bundles as the matter type requires—and transforms them into a **structured, paragraph-level digital matter record** (target **≥98%** fidelity on extraction). W3’s second half is a **deep reconciliation** of that record against the **W2 Case Master Story File**: **gap analysis**, **inconsistency and contradiction checks**, timeline alignment, cast-of-parties mapping, and vulnerability identification. The client is **not** asked for **evidence production** until **after** this reconciliation cycle produces a **final** analysis and **evidence-needs register** grounded in **both** the client story and the **known** opposing file.

Agents:

Agent: The Intake Clerk

Purpose: To **extract and index** formal filings and court-facing materials into a **searchable case database** with layout fidelity, docket discipline, and unique paragraph IDs.

Agent: The Story Architect

Purpose: To **crosswalk** the ingested **opposing case narrative** to the **defence** **Case Master Story**, produce **analytical reports** (gaps, inconsistencies, theory stress tests), **facilitate client meetings** with human counsel on the findings, refresh the **Case Master Story** where justified, submit **Fact Promotion Requests** to **W1** as needed, and author the **evidence-needs register** that will **enter** **W4**.

Tools: LlamaParse, Supabase (Matter Folders), Python, **read-only** access to **W2 Case Master Story** and case tables, **W1 Fact Promotion Request** channel (Story Architect), Perplexity API (optional **public-record** cross-checks with human approval).

Skills: Multi-page OCR verification, stamp/signature detection, legal filing taxonomy, **story–pleading alignment**, gap and inconsistency analysis, bilingual client Q&A design, evidence-needs structuring for W4.

Output: **Structured opposing-case docket**, **verified markdown / structured filings**, **Reconciliation Report v1**, **Reconciliation Report v2** (post-meeting), **updated Case Master Story File** (if revised), **Fact Promotion Requests** (to W1, as issued), **evidence-needs register** (W4 input).

Operational Flow:

Phase 1 (Bundle intake & structural extraction): Collect prosecution / plaintiff / court materials; process through LlamaParse (or equivalent) to **preserve layout**; normalise filenames, dates of service/filing where visible, and chain of custody metadata.

Phase 2 (Vision audit & indexing): Vision pass on **stamps, seals, signatures, and marginalia**; confirm filing dates and service indicators where present; **index each substantive paragraph** of the opposing case with a **stable ID** in the case database; build **Indictment/Complaint Summary** and **Filing Timeline**.

Phase 3 (Internal mastery & first-pass analysis): Intake Clerk + Story Architect **read** the indexed file **against** the **W2 Case Master Story**; flag **direct conflicts**, **missing explanations**, **unsupported prosecution allegations** vs client silence in story, and **chronology breaks**; draft internal Q-set for the client.

Phase 4 (Reconciliation Report v1 — to client): Produce a **thorough** written report: **gaps**, **inconsistencies**, **weak points**, **open questions**, and **provisional** vulnerability assessment **versus** the W2 story. **Transmit to the client** together with a **request for a meeting** with **human lawyer** and **Story Architect** to work through the issues (**same discipline as the opening meetings in W2**—structured Q&A and clarification, **not** yet a demand to produce exhibits).

Phase 5 (Client meeting — clarification pass): Hold the scheduled session(s); capture answers; update working notes; where the story changes, **revise** the **Case Master Story File** under human oversight.

Phase 6 (Internal review — second analysis pass): Internal consolidation and optional **external / OSINT** checks approved by human counsel; prepare **Reconciliation Report v2**.

Phase 7 (Reconciliation Report v2 + evidence-needs register — to client): Issue **Reconciliation Report v2** (gap/inconsistency analysis updated after the client meeting). Attach the **list of information, documents, and evidence** the client must **now** gather—**explicitly keyed** to **proving** or **rebutting** items revealed by **both** the **opposing file** and the **refined story**. **Version-stamp** the Case Master Story File.

Phase 8 (W1 sweep, handoff to W4): Story Architect issues any **remaining Fact Promotion Requests** to **W1** for client-level facts surfaced during reconciliation. **Route** the **evidence-needs register** and matter context to **W4**; **W3 closes** opposing-file intake for this cycle (subject to later amendments if the prosecution pleading changes).

Work Product:

Digital opposing-case file, structured docket, verified structured filings, indictment/complaint & timeline summaries, **Reconciliation Report v1**, **Reconciliation Report v2**, revised **Case Master Story File** (as applicable), **Fact Promotion traffic to W1** (interim + sweep), **evidence-needs register** → **W4**, paragraph-level case index suitable for **W5–W11** citation.

### **W4: Evidence Intake Workflow**

Description: **Entry:** **plaintiff-side** matters arrive from **W2** with the **evidence-needs register**; **defence-side** matters arrive from **W3** after **story–pleading reconciliation**, likewise with an **evidence-needs register** (there is **no** defence-track shortcut into W4 before W3 completes). **W4 ingests discovery** supplied by or on behalf of the client in **any medium**—**physical documents**, **native electronic files**, **scans**, **photographs**, **audio** and **video** recordings, **messaging exports**, **spreadsheets**, and other formats the client can produce. **Physical originals** are **not** read by the agent directly: **firm staff** or the client’s agents **digitise** them (scan, photograph, or other approved capture) and upload the **digital surrogate** into the pipeline. **Already-digital** artefacts are uploaded **as-is** (subject to malware and access checks per firm policy). For **every** ingested item, the **Evidence Archivist** runs **LlamaParse** plus **Gemini vision-capable** models to produce a **markdown** rendition and a companion **JSON** extract—together targeting **≈98%** fidelity to the **source surrogate** (layout, headings, lists, tables, and visible text where practicable). Items are **catalogued** and **indexed** in **Supabase** (matter-scoped tables, stable exhibit IDs, chain-of-custody fields, links back to the evidence-needs register). **Gemini embeddings** are computed on the chunked text (and multimodal chunks where the stack allows) and stored **alongside** the markdown and JSON so each evidence record carries **both** human-readable structured content and **pgvector** columns for semantic search and later RAG (**W5+**).

Agents:

Agent: The Evidence Archivist

Purpose: To **receive** digitised or born-digital evidence, **normalise** each item into **high-fidelity markdown + JSON**, **preserve** metadata (EXIF, duration, hash, provenance), **catalogue** and **persist** in the case database, and **embed** with **Gemini** vectors for retrieval—without substituting legal judgment for admissibility.

AI Models: **Gemini 1.5 Pro** (vision + layout understanding for OCR-class extraction into md/json), **Gemini embedding model** (vector generation), **Gemini 1.5 Flash** (lightweight metadata passes where useful), **Whisper** (transcription for **audio/video** prior to or in parallel with structured extraction).

Tools: **LlamaParse**, **Supabase** (relational + **pgvector**), **ffmpeg** (AV normalisation), optional **LlamaIndex** (orchestration over the case vector index).

Skills: Multimedia intake hygiene, layout-faithful extraction, exhibit cataloguing, hashing and provenance, semantic chunking, bilingual text handling, cross-referencing to the **evidence-needs register**.

Output: **Per-item markdown artefact**, **per-item JSON artefact**, **evidence catalogue record**, **embedding payload** (Gemini, stored in pgvector), **Metadata Manifest**, **processing / QA log**.

Operational Flow:

Phase 1 (Receipt & human digitisation gate): Items arrive against the **evidence-needs register**. **Physical** items route through **human digitisation** (scan / photo / approved service bureau); uploads are stamped with uploader, datetime, and source. **Digital** items ingest directly. Unsupported or corrupt files are quarantined and returned with a **re-ingest** instruction.

Phase 2 (Normalisation & extraction): **LlamaParse** handles document-class surrogates; **Gemini vision** assists on **scans, photos, and mixed layouts** so each piece yields a **markdown** file and **JSON** (fields such as pages, blocks, tables, detected dates, and key-value pairs) at **≈98%** fidelity targets. **Audio/video** passes through **ffmpeg** and **Whisper** to produce time-stamped transcripts feeding the same md/json pipeline.

Phase 3 (Catalogue & database persistence): Assign **exhibit IDs**, link to **matter** and **register line-items**, store **markdown**, **JSON**, **hashes**, **metadata**, and **QA flags** in **Supabase**; maintain cross-links for later citation in **W5–W11**.

Phase 4 (Embedding & vector store): Run **Gemini embeddings** on approved text chunks (and policy-allowed multimodal representations); write vectors to **pgvector** **adjacent to** the markdown/JSON pointers so search and retrieval layers read a **single logical evidence record**.

Work Product:

Versioned **Evidence Catalog**, **per-artefact markdown + JSON library**, **Gemini-backed vector index** (pgvector), **Metadata Manifest**, transcription logs for AV, intake QA report.

### **W5: Story–Evidence Alignment & Fact Support Workflow**

Description: After **W4**, the matter has a **Case Master Story File** (from **W2** / **W3**), a **Client Master Story File** (from **W1**), and a **searchable evidence corpus**. **W5**’s job is to **support as many material facts as possible** by cross-linking narrative assertions to **W4** exhibits (and firm-internal sources), then **prompt** verified, supported facts for inclusion—via **Fact Promotion Requests**—in **both** the **Case Master Story File** and the **Client Master Story** through **W1** where a fact is client-level. The agent **catalogues gaps**, **unsupported**, and **unverified** assertions; for those it first **tasks a research agent** (**The Librarian** / research stack) to try to **support or verify** from **external** authorities and open sources within policy. Findings that **can** be supported or verified are **promoted** into the case and client master narratives (through **W1** for client-global items). For what **remains**, W5 issues a **client report** asking for **items** (documents, identifiers, confirmations) needed to reach at least **70%** aggregate **support** for the **material** fact set, as defined by the firm’s rubric. The client may offer **anything** helpful, including a promise of **future witness testimony**: such offers are **logged**; only what is **immediately confirmable** is **promoted** now. **Future testimony** may be **inserted** into story files with an explicit **`pending verification — anticipated testimony`** label until the testimony occurs and is accepted, then it is upgraded to **confirmed**. At **closure** of W5, **both** story files are **as supported as the record allows** before strategic legal work.

Agents:

Agent: The Analyst

Purpose: To **map** story assertions to evidence, **score** support, **draft** promotion payloads for the **Case Master Story** and **W1**, **orchestrate** gap research, and **author** the **client gap** report against the **70%** target.

Agent: The Librarian (research execution under W5)

Purpose: To **research** flagged **unsupported / unverified** facts and return **research memoranda** with sources so the Analyst can decide promotions and updates.

AI Models: Kimi K2.5 (fact–exhibit reasoning), Gemini 1.5 Pro (verification over structured excerpts), Perplexity API & authorised search (external research).

Tools: Supabase (case + evidence vectors, story versions), **W1 Fact Promotion Request** channel, LlamaIndex / RAG over **W4** artefacts.

Skills: Assertion-level grounding, bilingual nuance, rubric-based support %, client-safe reporting, research commissioning, labelling **pending** vs **confirmed** testimony.

Output: **Support matrix** (fact ↔ evidence / research / gap), **updated Case Master Story File** (draft promotions applied after human gate as required), **Fact Promotion Requests** to **W1**, **Client gap & 70% report**, **Librarian addenda** for unresolved lines.

Operational Flow:

Phase 1 (Ingest narratives & evidence): Load **Client Master Story**, **Case Master Story**, and **W4** catalogue; align matter IDs and person/entity keys.

Phase 2 (Maximal grounding pass): For each material assertion, seek **best** exhibit or internal proof; auto-tag **supported**, **partially supported**, **unsupported**.

Phase 3 (Research escalation): Queue **unsupported / unverified** lines to **The Librarian**; merge research hits that **lift** status; **promote** what clears the bar into drafts for **case** and **client** stories.

Phase 4 (Client report & 70% gate): Compute **aggregate support %**; if **below 70%**, send **targeted client request** listing **residual** needs; incorporate client responses; apply **pending testimony** labelling rules.

Phase 5 (Handoff): **Version-stamp** story files; pass **supported-fact package** to **W6**.

Work Product:

Story–evidence support matrix, revised **Case Master Story File**, **W1** promotion traffic, client 70% gap report, pending-testimony register, W6 input dossier.

### **W6: Case Strategy — Angles & Memos Workflow**

Description: **Plaintiff-side:** the strategist derives, from **substantive law** and the fact record, the **main points of attack** for the lawsuit—theories, causes, and narrative lines that organise the case. **Defence-side:** the strategist derives the **main points to defend**—responses to each material allegation cluster and affirmative **defence** lines. For **each** point, **W6** produces a **memorandum** (facts, law sketch, risks) and sends it **(a)** to the **human lawyer** for awareness and **(b)** to **W7** for **deep research** attachment. **W6** and **W7** **do not** finalise court arguments—that is **W8**.

Agents:

Agent: The Strategist

Purpose: To **prioritise** **angles of attack** (plaintiff) or **angles of defence** (defence), **author** **per-point memos**, and **feed** the **W7** research loop and **human** review.

AI Models: Kimi K2.5 (adversarial / affirmative logic), Claude 3.5 Sonnet (memo drafting).

Tools: Supabase, outputs from **W5**, custom legal taxonomy / charge sheets as loaded for the matter.

Skills: Issue spotting, theory selection, memo discipline, plaintiff vs defence framing.

Output: **Strategic point list**, **per-point strategy memos** (human + W7 bound).

Operational Flow:

Phase 1 (Record review): Absorb **W5** outputs and **W3** indices if defence.

Phase 2 (Point generation): Enumerate **all** initial attack or defence points with short rationale.

Phase 3 (Memo packaging): One **memo** per point; route to **human** and **W7**.

Phase 4 (Enter research loop): Stand by for **W7** research bundles; when **W5** completes re-processing, accept updated memo stacks or new-point triggers from **W6**.

Work Product:

Strategic memo set (v1…vn), point index for W7/W8.

### **W7: Memo Research & Strategy Loop Workflow**

Description: **W7** receives each **W6** memo, runs **authoritative research** for that point (statutes, cases, commentary, technical background as needed), and **attaches** a **research report** to **each** memo. The **bundle** returns to **W5** for **re-processing**: **strengthen** story–evidence links, **tighten** facts, and **refine** point strength. If **new angles** appear, **W5** routes them to **W6**, which may **add** memos or **split** points—**W7** researches anew. The **loop** (**W6 → W7 → W5 → optionally W6…**) continues until **no** new material points or angles remain **or** a **human** calls **clearance** to proceed. **Then** the matter advances to **W8** (**argument construction**).

Agents:

Agent: The Librarian

Purpose: To **deep-research** each strategy memo, **attach** a **cited research report**, and **return** the augmented bundle to **W5** / **W6** participants.

AI Models: Perplexity API (deep research), Gemini 1.5 Pro (source audit), Kimi K2.5 (synthesis).

Tools: Google Search API, Westlaw/Lexis or equivalent as licensed, Supabase (research storage).

Skills: Source grading, citation integrity, issue-limited research scope control.

Output: **Memo + Research Report** pairs, loop status log, clearance recommendation to human.

Operational Flow:

Phase 1 (Per-memo research): For each incoming **W6** memo, execute scoped research; **append** report with **authority list**.

Phase 2 (Return to W5): **W5** integrates research-supported facts; updates support matrix; may trigger **W1** promotions.

Phase 3 (New-angle fork): If **W5** or **human** identifies **new** point → **W6** drafts **additional** memo → back to Phase 1.

Phase 4 (Loop exit): When **stable**, **human** acknowledged where required, **hand all memo+research packages** to **W8**.

Work Product:

Research-enriched memo bundle, research compendium, loop iteration manifest, **W8** intake package.

### **W8: Argument Engineering Workflow (Plaintiff / Defence)**

Description: **W8** builds **substantive arguments** for each strategy point using the memo-and-research packets from **W7**, the fact record, and **W4** evidence citations. **Plaintiff-side:** for each point, state facts and events clearly in sequence, each tied to specific exhibit references; state what the suit seeks (relief, quantum where applicable); then develop legal arguments grounded in law, jurisprudence, facts, and evidence with citations. **Defence-side:** for each prosecution or plaintiff allegation, respond with rebuttal facts—accepting, rejecting, or clarifying—with evidence citations for each; then build legal and jurisprudential defence arguments anchored in the same record. Drafts go to the **human lawyer** for review, verification, and comments; **W8** incorporates feedback, finalises the argument artefacts, and passes them to **W9**.

Agents:

Agent: The Advocate

Purpose: To draft structured argument sets (plaintiff or defence pattern), ground every material statement in exhibit IDs, and iterate with human revision marks.

AI Models: Claude 3.5 Sonnet / Claude 4 (long-form legal drafting), Kimi K2.5 (citation and consistency passes).

Tools: Supabase, document templates, memo-and-research bundle from **W7**.

Skills: Pleading-grade organisation, evidentiary citation, bilingual outputs if required.

Output: Argument artefact set (per-point briefs / schedules), human-reviewed versions.

Operational Flow:

Phase 1 (Skeleton from memos): Map each strategy point to an argument section.

Phase 2 (Fact–evidence spine): Insert numbered fact statements with exhibit references.

Phase 3 (Law and jurisprudence): Integrate authorities from **W7** research reports.

Phase 4 (Human review cycle): Send to human counsel; merge comments into the next revision.

Phase 5 (Handoff to adversarial): Transmit the latest argument artefacts to **W9**.

Work Product:

Plaintiff: fact schedule, prayer for relief, per-point argument memos. Defence: allegation-response matrix, per-accusation argument memos. Human-reviewed master bundle → **W9**.

### **W9: Adversarial Stress-Test Workflow**

Description: **W9** applies specialised adversarial logic: it models the opposing party’s strongest attacks on the **W8** argument artefacts and tries to break or expose weaknesses. Its output goes to the **human lawyer** and to **W8** (the Advocate), which must address each adversarial line in the underlying artefacts—patching facts, evidence hooks, or law as needed. The **W8 ↔ W9** loop repeats until **W9** cannot surface additional credible attacks or **W8** (with human concurrence where required) certifies that no further material rebuttal is available—**loop exit**. After another human review pass, **W8** finalises the artefacts and forwards the bundle to **W10**.

Agents:

Agent: The Adversary

Purpose: To red-team **W8** outputs from opposing counsel’s perspective and produce actionable challenge memos for revision or signed closure.

AI Models: Kimi K2.5 (red-teaming), Claude 3.5 Sonnet (counter-memo drafting).

Tools: Supabase, full **W8** bundle, **W3** opposition text where defence.

Skills: Devil’s advocacy, issue spotting, knowing when to stop the loop.

Output: Adversarial challenge memos, revision tick-list, loop-exit note (conditions met).

Operational Flow:

Phase 1 (Attack generation): Target the weakest evidence and legal steps.

Phase 2 (W8 revision): Advocate patches artefacts; increment version.

Phase 3 (Termination): Exit when stop conditions are met; human sign-off on the final **W8** pack before graphics.

Work Product:

Adversarial matrix, fortified **W8** bundle (final for visuals), human clearance note.

### **W10: Visual Exhibit Production Workflow**

Description: **W10** reviews the final **W8**-class arguments (after **W9** hardening) and identifies segments that are overly complex or would benefit from visual explanation—timelines, money flows, relationship graphs, comparison tables, and similar. It produces those visual artefacts and attaches them to the argument bundle. The combined package proceeds to **W11**.

Agents:

Agent: The Visualizer

Purpose: To spec, script, and render trial- or filing-grade graphics mapped to argument paragraphs or exhibits.

AI Models: Gemini 1.5 Pro (Python execution / layout QA), Claude 3.5 Sonnet (chart annotation text).

Tools: Python (Matplotlib, NetworkX, Pandas), slide/PDF export per firm standard.

Skills: Quantitative visual literacy, evidentiary mapping, bilingual labelling.

Output: Visual exhibit pack and attachment index tied to **W8** sections.

Operational Flow:

Phase 1 (Complexity scan): Flag dense factual or numeric passages.

Phase 2 (Build visuals): Render draft graphics; optional human QC.

Phase 3 (Attach and handoff): Merge into master bundle → **W11**.

Work Product:

Chart/graph/slide set, exhibit index, unified dossier (arguments + visuals) for polishing.

### **W11: Persuasive Refinement Workflow**

Description: **W11** is the persuasive-argument specialist. It takes the full bundle—**W8** arguments, **W9** hardening, and **W10** visuals—and refines language, emphasis, structure, and rhetorical flow so ideas read clearly and compellingly, with visuals aligned to the text (no orphan charts). Final outputs are court- or filing-ready subject to human sign-off.

Agents:

Agent: The Rhetorician

Purpose: To polish for maximum clarity and persuasion without inventing fact or authority.

AI Models: Claude 3.5 Sonnet / Claude 4, Kimi K2.5 (rhetorical stress test).

Tools: Supabase, templates, linked visual manifest from **W10**.

Skills: Legal rhetoric, plain-language upgrades, bilingual polish.

Output: Final persuasive package (briefs, memos, talking points, visual callouts).

Operational Flow:

Phase 1 (Holistic read): Map narrative arc across all points and visuals.

Phase 2 (Refine): Tighten headings, transitions, and emphasis; align captions to argument numbering.

Phase 3 (Human sign-off): Deliver master submission pack; archive version.

Work Product:

LEXOS **final case presentation bundle** (writing + visuals), rhetorical change log.
