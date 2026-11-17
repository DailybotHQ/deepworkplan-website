# `.agents/` — cross-agent configuration

This is the canonical home for shared agent skills, command procedures, agent definitions, and their catalogs. Edit files under `.agents/`, never through compatibility symlinks such as `.claude/` or `.cursor/`.

## Layout

- `.agents/skills/<name>/SKILL.md`: reusable procedures, including the installed, repo-adapted DeepWorkPlan skill.
- `.agents/commands/<name>.md`: command procedures and thin delegators.
- `.agents/agents/<name>.md`: specialist agent definitions.
- `.agents/docs/`: the skills and agents catalog and commands reference.
- `.agents/settings.json`: shared Claude Code hooks and settings. Local settings files are not tracked.

The [catalog](docs/skills_agents_catalog.md) lists current files. A `SKILL.md` is a procedure, not a command file.

## Invoking a command

Command files are native slash commands in Claude Code. Other tools can use a hash prefix or the plain command name. Before invocation, find the procedure in the [commands reference](docs/COMMANDS_REFERENCE.md), read it fully, and follow it; the procedure is the specification. Skills are invoked according to each tool's support and their `SKILL.md` description.

## Maintaining this directory

When a skill, command, or agent is added or removed, update the catalog and this guide as needed. Command files belong in `commands/`; other documentation does not, because each `.md` there becomes a command. Use the installed DeepWorkPlan author sub-skill for reusable skills and agent definitions.

## Related guidance

- [AGENTS.md](../AGENTS.md) — repository-wide rules
- [AI Agent Collaboration](../docs/AI_AGENT_COLLAB.md) — cross-agent coordination
- [Development Commands](../docs/DEVELOPMENT_COMMANDS.md) — scripts and validation
- [DeepWorkPlan skill](skills/deepworkplan/SKILL.md) — structured plans and execution
