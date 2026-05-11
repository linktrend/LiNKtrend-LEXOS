# LEXOS Cursor Configuration

This `.cursor` folder contains LEXOS-specific Cursor rules, selected imported skills, and specialist agents.

## Folder Structure

```text
.cursor/
  rules/
  skills/
  agents/
  README.md
  LEXOS_IMPORTED_SKILLS_POLICY.md
```

## Priority Order

For LEXOS development, follow this priority order:

1. `.cursor/rules/`
2. `PROJECT_STATE.md` and `AGENT_HANDOFF.md`
3. `docs/implementation/`
4. `docs/lexos-system-spec/`
5. `.cursor/skills/` and `.cursor/agents/`
6. `docs/source-briefings/`

The `.cursor/skills/` and `.cursor/agents/` files are selected reference capabilities only. They do not override LEXOS project rules or implementation-control documents.

## Imported Skills

- `skills/architecture/`
- `skills/plan-writing/`
- `skills/database-design/`
- `skills/api-patterns/`
- `skills/nodejs-best-practices/`
- `skills/nextjs-react-expert/`
- `skills/frontend-design/`
- `skills/tailwind-patterns/`
- `skills/web-design-guidelines/`
- `skills/testing-patterns/`
- `skills/tdd-workflow/`
- `skills/webapp-testing/`
- `skills/systematic-debugging/`
- `skills/lint-and-validate/`
- `skills/code-review-checklist/`
- `skills/vulnerability-scanner/`
- `skills/clean-code/`
- `skills/documentation-templates/`
- `skills/bash-linux/`
- `skills/parallel-agents/`

## Imported Specialist Agents

- `agents/project-planner.md`
- `agents/database-architect.md`
- `agents/backend-specialist.md`
- `agents/frontend-specialist.md`
- `agents/test-engineer.md`
- `agents/qa-automation-engineer.md`
- `agents/security-auditor.md`
- `agents/debugger.md`
- `agents/code-archaeologist.md`
- `agents/documentation-writer.md`
- `agents/devops-engineer.md`

## Mandatory Constraints

Before coding, Cursor or any specialist agent must read:

1. `PROJECT_STATE.md`
2. `AGENT_HANDOFF.md`
3. `docs/implementation/00 MVP Implementation Roadmap.md`
4. `docs/implementation/05 Work Packet Register.md`
5. the implementation document relevant to the active work packet.

Do not use imported generic agent behavior to bypass LEXOS work packets.

## Parallel Agents Constraint

The `parallel-agents` skill is included only under LEXOS work-packet control. Each parallel task must have:

- a work packet;
- a branch;
- allowed files;
- prohibited files;
- acceptance criteria;
- verification requirements;
- final handoff.

## Missing Items

No selected skills or specialist agents are missing from this folder.
