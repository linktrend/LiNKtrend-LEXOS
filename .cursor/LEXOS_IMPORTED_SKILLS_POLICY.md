# LEXOS Imported Skills Use Policy

These imported skills and agents are advisory reference material.

They must not be treated as autonomous operating rules for LEXOS.

## Control Rule

If any imported skill or agent conflicts with LEXOS project rules, the LEXOS rules control.

Priority order:

1. `.cursor/rules/`
2. `PROJECT_STATE.md` and `AGENT_HANDOFF.md`
3. `docs/implementation/`
4. `docs/lexos-system-spec/`
5. `.cursor/skills/` and `.cursor/agents/`
6. `docs/source-briefings/`

## Work Packet Rule

No imported skill or agent may be used to execute coding work unless the task maps to a work packet in:

`docs/implementation/05 Work Packet Register.md`

## Forbidden Uses

Do not use imported skills or agents to:

- modify canonical system specs without explicit instruction;
- modify source briefings without explicit instruction;
- bypass W4 ingestion rules;
- bypass W9 adversarial review;
- merge unrelated W0 intake contexts;
- expose secrets;
- use real client/legal data in tests;
- create autonomous external legal communication;
- create court filing tools;
- make evidence buckets public by default;
- run offensive security/pentest behavior unless explicitly requested and scoped;
- execute broad parallel autonomous work outside work-packet control.

## Parallel Agents Constraint

The imported `parallel-agents` skill is permitted only under LEXOS work-packet control. Each parallel task must have:

- branch;
- allowed files;
- prohibited files;
- acceptance criteria;
- tests;
- final handoff.

## Completion Rule

Imported skills and specialist agents must not claim completion unless available checks were run or a manual verification report was produced.
