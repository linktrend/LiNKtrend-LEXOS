---
name: parallel-agents
description: LEXOS-controlled parallel work patterns. Use only when 2+ independent work packets can be executed without shared mutable state or unresolved dependencies.
allowed-tools: Read, Glob, Grep
---

# LEXOS-Controlled Parallel Agents

This skill is restricted by LEXOS project rules.

It may be used only under:

- `.cursor/rules/`
- `docs/implementation/05 Work Packet Register.md`
- `PROJECT_STATE.md`
- `AGENT_HANDOFF.md`

Do not use this skill to spawn unconstrained autonomous work.

## When Parallel Work Is Allowed

Parallel work is allowed only when all of the following are true:

1. Each task has a work packet.
2. Each task has a separate branch.
3. Each task has allowed files/folders.
4. Each task has prohibited files/folders.
5. Each task has acceptance criteria.
6. Each task has tests or manual verification.
7. Tasks do not edit the same files.
8. Tasks do not depend on unfinished schema or unresolved architecture.
9. Each worker must update `AGENT_HANDOFF.md`.

## Safe LEXOS Parallel Examples

After schema foundation exists:

- Codex writes W4 ingestion tests while Cursor builds Evidence UI.
- Codex implements prompt registry files while Cursor works on Client/Matter UI.
- Codex reviews schema migration while Cursor updates PROJECT_STATE.

## Unsafe Parallel Examples

Do not parallelize:

- two workers editing the same migration;
- W5 before assertions/evidence schema exists;
- W8/W9 before W5 exists;
- schema and UI tasks that depend on unstable table names;
- external communication tools in MVP;
- canonical document edits during coding unless explicitly instructed.

## Required Parallel Task Template

```markdown
# Parallel Work Assignment

## Work Packet ID

## Branch

## Worker

## Allowed Files

## Prohibited Files

## Dependency Check

## Acceptance Criteria

## Verification Required

## Handoff Required
```

## Synthesis Protocol

After parallel tasks complete, Cursor must synthesize:

```markdown
# Parallel Work Synthesis

## Branches Reviewed

## Work Packets Completed

## Files Changed

## Conflicts Found

## Tests Run

## Integration Decision

## Required Follow-Up
```

## Hard Stop Conditions

Stop if:

- tasks overlap files;
- schema is unstable;
- work packet is missing;
- branch is missing;
- acceptance criteria are absent;
- verification cannot be run;
- task would modify canonical specs without instruction;
- task would weaken LEXOS W4, W9, security, retrieval, or audit rules.
