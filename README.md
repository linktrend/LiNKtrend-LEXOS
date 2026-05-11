# LiNKtrend LEXOS

LEXOS (Legal EXecution Operating System) is LiNKtrend’s **object-centric** legal cognition platform. The MVP proves a structured spine — client/matter, case story, evidence and extraction, assertions, support matrix, strategy, research, argument draft, adversarial review, and revised output — without collapsing into a generic chatbot over files.

## What this repository is

This repository holds the **LEXOS MVP implementation** effort: build specifications, schema, work packets, and agent guidance, alongside the **canonical system specifications** and a **legacy briefing** for historical context.

## Documentation layout

### Thirteen canonical system-specification documents

Location: **`docs/lexos-system-spec/`**

Numbered documents `01` through `13` (for example, institutional doctrine, canonical object model, workflow, security, MVP scope, technical architecture, agents, UI/UX, testing, deployment). These are the **architectural authority** for LEXOS.

### Implementation-control documents

Location: **`docs/implementation/`**

Includes, among others:

- `00 MVP Implementation Roadmap.md` — MVP build sequence and doctrine
- `01 Database Schema v0.md` — schema execution authority
- `02 W4-lite Enhanced Ingestion Build Spec.md` — ingestion module authority
- `04 MVP Acceptance Test Plan.md` — MVP completion review authority
- `03 Agent Prompt Registry v0.md` — prompt registry
- `05 Work Packet Register.md` — task packets, branches, allowed paths

**Development is controlled by `docs/implementation/`** and the active work packet. Follow `.cursor/rules/` for agent behavior and boundaries.

### Legacy briefing

Location: **`docs/source-briefings/`**

Historical source material (including the legacy LEXOS briefing). It is **not** authoritative for implementation decisions; use the canonical specs and implementation docs instead.

## Tooling roles

- **Cursor** is the **lead implementation IDE** for LEXOS.
- **Codex** is an **isolated coding worker**: one work packet, one branch, defined file scope — see `docs/implementation/05 Work Packet Register.md` and `.cursor/rules/02-coding-agent-workflow.mdc`.

## Canonical documents and coding

Do **not** modify the thirteen canonical documents under `docs/lexos-system-spec/` during routine coding unless the **human operator** explicitly instructs you. The same applies to `docs/source-briefings/` unless instructed. See `.cursor/rules/00-lexos-master-rule.mdc`.

## Project state and handoff

- Current snapshot: **`PROJECT_STATE.md`**
- Agent coordination: **`AGENT_HANDOFF.md`**

## Environment setup (later phases)

Copy `.env.example` to a local ignored env file and fill values when the app and integrations exist. Never commit secrets.

## Application (WP-01)

Next.js (App Router) lives under `src/app/`. UI shell components are under `src/components/`; Supabase browser placeholder is `src/lib/supabase/client.ts` (public anon key only — never use the service role in client code).

From the repository root:

```bash
pnpm install
pnpm run dev
```

Quality checks (required before marking WP-01 complete):

```bash
pnpm run lint
pnpm run build
```

Production start after build: `pnpm run start`.

**shadcn/ui:** Not added in WP-01 to avoid Tailwind v4 friction; can be introduced in a later packet if compatible with the chosen stack.
