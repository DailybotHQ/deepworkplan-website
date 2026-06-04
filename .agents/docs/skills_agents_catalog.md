# Skills & Agents Catalog

This document serves as the central reference for all available Skills and Agents in this repository.

## Overview

| Type   | Tier 1 (Light) | Tier 2 (Standard) | Tier 3 (Heavy) | Total |
|--------|:--------------:|:------------------:|:--------------:|:-----:|
| Skills | 11             | 4                  | 0              | 15    |
| Agents | 0              | 4                  | 1              | 5     |
| **Total** | **11**      | **8**              | **1**          | **20** |

---

## Skills by Tier

Skills are reusable "how-to" procedures invoked via slash commands.

### Tier 1 (Light/Cheap)

Fast, low-risk, pattern-following tasks.

| Skill           | Intent | Invocation        | Model  | Description                                                                 |
|-----------------|--------|-------------------|--------|-----------------------------------------------------------------------------|
| quick-fix       | fix    | `/quick-fix`      | haiku  | Fix small bugs in 1-3 files following existing patterns                    |
| doc-edit        | docs   | `/doc-edit`       | haiku  | Update documentation (README, comments, MDX, markdown)                      |
| pr-review-lite  | review | `/pr-review-lite` | haiku  | Quick checklist review of a PR (style, obvious bugs, Astro patterns)        |
| fix-lint        | fix    | `/fix-lint`       | haiku  | Fix Biome linting/formatting errors in 1-3 files                           |
| type-fix        | fix    | `/type-fix`       | haiku  | Fix TypeScript type errors in 1-3 files (explicit types, Astro types)      |
| security-check  | review | `/security-check` | haiku  | Quick security checklist (secrets, API routes, client exposure)             |
| git-commit-push | execute| `/git-commit-push`| haiku  | Commit all changes and push to remote                                       |
| add-component   | create | `/add-component`  | haiku  | Create new Astro or Svelte component with correct patterns                  |
| add-page        | create | `/add-page`       | haiku  | Create new page with routing and MainLayout                                 |
| translate-sync  | execute| `/translate-sync` | haiku  | Synchronize content from English across all active languages                |
| update-styles   | fix    | `/update-styles`  | haiku  | Update Tailwind styles with dark mode support                               |

### Tier 2 (Standard)

Everyday development work.

| Skill         | Intent   | Invocation       | Model  | Description                                                              |
|---------------|----------|------------------|--------|--------------------------------------------------------------------------|
| write-tests   | tests    | `/write-tests`   | sonnet | Add or expand tests (*.test.ts) - Vitest/Playwright when configured      |
| refactor-safe | execute  | `/refactor-safe` | sonnet | Safe refactor in bounded scope (1-10 files, no behavior change)          |
| responsive-lighthouse-audit | audit | `/responsive-lighthouse-audit` | sonnet | Audit responsiveness across breakpoints + drive Lighthouse to near-100 on mobile & desktop |
| add-diagram-component | create | `/add-diagram-component` | sonnet | Create an editorial HTML/CSS/SVG diagram component (i18n in-code) and embed it in-body via MDX |
| add-language  | create   | `/add-language`  | sonnet | Add a new language end-to-end (scaffold → translate → native review → QA) |

### Tier 3 (Heavy/Reasoning)

Complex planning and architecture.

| Skill | Intent | Invocation | Model | Description |
|-------|--------|-------------|-------|-------------|
| *Add with /skill-create* | | | | |

> Structured multi-task work (plan creation, execution, refinement, resume, status,
> repo onboarding) is handled by the installed `deepworkplan` skill and its sub-skills,
> invoked through the `dwp-*` commands. See the [Related Documentation](#related-documentation).

---

## Agents by Tier

Agents are specialized personas for different types of work.

### Tier 2 (Standard)

Development and review specialists.

| Agent             | Scope                          | Model  | Description                                                |
|-------------------|---------------------------------|--------|------------------------------------------------------------|
| reviewer          | Code review and quality analysis | sonnet | Thorough PR review; Astro/Svelte patterns, dark mode, quality |
| executor          | Executing predefined plans     | sonnet | Follows plans step by step; implements and validates      |
| security-auditor  | Security review (read-only)    | sonnet | Static site security; API routes, secrets, client exposure |
| i18n-guardian     | Multilingual content & translation quality | sonnet | Translation quality specialist; multilingual consistency enforcer |

### Tier 3 (Heavy/Reasoning)

Planning and architecture specialists.

| Agent     | Scope                                  | Model | Description                                      |
|-----------|----------------------------------------|-------|--------------------------------------------------|
| architect | Architecture, design, planning (no code) | opus  | Component design, routing, Content Collections planning |

---

## Skill-Agent Interaction Map

This diagram shows how skills and agents interact during typical workflows.

```
                        TIER 3 - Planning & Architecture
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │   architect                                                  │
  │   Designs component structure, routing, Content Collections  │
  │   Output: Implementation plans, architecture decisions       │
  │                                                              │
  └──────────────────────┬───────────────────────────────────────┘
                         │ plans flow down
                         ▼
                        TIER 2 - Execution & Review
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │   executor ─────────────── implements using ──────┐          │
  │   Follows plans strictly,                         │          │
  │   validates each step                             ▼          │
  │                                          ┌────────────────┐  │
  │                                          │ Tier 2 Skills  │  │
  │                                          │ write-tests    │  │
  │                                          │ refactor-safe  │  │
  │                                          └────────┬───────┘  │
  │                                                   │          │
  │   reviewer ◄──────── validates output ────────────┘          │
  │   security-auditor ◄─── security review ──────────┘          │
  │   i18n-guardian ◄──── multilingual audit ──────────┘          │
  │                                                              │
  └──────────────────────┬───────────────────────────────────────┘
                         │ uses atomic skills
                         ▼
                        TIER 1 - Atomic Skills
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │   Creation         Fix/Update        Review       Execute    │
  │   ─────────        ──────────        ──────       ───────    │
  │   add-component    quick-fix         pr-review    git-commit │
  │   add-page         fix-lint          security     translate  │
  │                    type-fix          -check       -sync      │
  │                    update-styles                  -push      │
  │                                                              │
  │   Documentation                                              │
  │   ─────────────                                              │
  │   doc-edit                                                   │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘
```

### Typical Workflow

1. **architect** creates an implementation plan (Tier 3)
2. **executor** follows the plan, invoking Tier 1/2 skills as needed (Tier 2)
3. **reviewer**, **security-auditor**, and **i18n-guardian** validate the output (Tier 2)
4. Issues found are fixed using atomic Tier 1 skills

---

## Domain-Specific Skills & Agents

### 1. Documentation

Skills for writing and maintaining the site's documentation and content.

| Resource | Type | Description |
|----------|------|-------------|
| doc-edit | Skill (T1) | Update documentation, README, comments, MDX files |

**Voice:** Serious, neutral, technical — the specification-and-methodology voice. Methodology/spec/kit
content ships in both EN and ES with correct diacritics, and every rendered page keeps a matching
`src/content/pages/{en,es}/*.md` endpoint (`pnpm run md:check:strict`).

### 2. i18n & Translation

Resources for multilingual content management (17 active languages, N-language ready).

| Resource | Type | Description |
|----------|------|-------------|
| add-language | Skill (T2) | Add a new language end-to-end (scaffold → translate → native review → QA) |
| translate-sync | Skill (T1) | Synchronize content from English across active languages |
| add-page | Skill (T1) | Create multilingual pages with shared components + thin wrappers |
| i18n-guardian | Agent (T2) | Translation quality specialist; multilingual consistency enforcer |
| i18n:scaffold / i18n:check | Tooling | `scripts/i18n/` — scaffold a locale skeleton; QA content parity + script sanity |

### 3. Code Quality & Review

Resources for maintaining code quality and reviewing changes.

| Resource | Type | Description |
|----------|------|-------------|
| fix-lint | Skill (T1) | Fix Biome linting/formatting errors |
| type-fix | Skill (T1) | Fix TypeScript type errors |
| pr-review-lite | Skill (T1) | Quick checklist review of a PR |
| quick-fix | Skill (T1) | Fix small bugs in 1-3 files |
| write-tests | Skill (T2) | Add or expand tests (Vitest/Playwright) |
| refactor-safe | Skill (T2) | Safe refactor in bounded scope |
| reviewer | Agent (T2) | Thorough PR review; Astro/Svelte patterns, quality |

### 4. Security

Resources for security review and auditing.

| Resource | Type | Description |
|----------|------|-------------|
| security-check | Skill (T1) | Quick security checklist (secrets, API routes, client exposure) |
| security-auditor | Agent (T2) | Static site security; API routes, secrets, client exposure |

### 5. Component & Page Creation

Resources for creating new UI components and pages.

| Resource | Type | Description |
|----------|------|-------------|
| add-component | Skill (T1) | Create new Astro or Svelte component with correct patterns |
| add-page | Skill (T1) | Create new page with routing and MainLayout |
| update-styles | Skill (T1) | Update Tailwind styles with dark mode support |
| architect | Agent (T3) | Component design, routing, Content Collections planning |
| executor | Agent (T2) | Follow plans step by step; implement and validate |

---

## Decision Guide: Skill vs Agent

Use this table to decide whether to invoke a Skill or an Agent.

| Criteria | Use a Skill | Use an Agent |
|----------|-------------|--------------|
| **Task scope** | Single, well-defined action | Multi-step or judgment-based work |
| **Invocation** | Slash command (`/fix-lint`) | By name or role ("as reviewer") |
| **Autonomy** | Follows procedure exactly | Makes decisions within scope |
| **Duration** | Short, completes quickly | May take longer, multi-phase |
| **Output** | Predictable, templated | Variable, context-dependent |
| **Examples** | Fix lint errors, create a component | Review a PR, plan architecture |

### When to Combine

- **architect** (Agent) produces a plan, then **executor** (Agent) implements it using **add-component**, **add-page**, and **write-tests** (Skills)
- **reviewer** (Agent) finds issues, then **fix-lint**, **type-fix**, or **quick-fix** (Skills) resolve them
- **i18n-guardian** (Agent) audits translations, then **translate-sync** (Skill) synchronizes content

---

## Quick Reference

### How to Use Skills

> See [Commands Reference](COMMANDS_REFERENCE.md) for the complete command list with procedure file paths.

```bash
# List available skills
/skill-list

# Create a new skill
/skill-create
```

### How to Use Agents

```bash
# List available agents
/agent-list

# Create a new agent
/agent-create
```

### File Locations

- **Skills:** `.agents/skills/{skill-name}/SKILL.md`
- **Agents:** `.agents/agents/{agent-name}.md`
- **Catalog:** `.agents/docs/skills_agents_catalog.md`

---

## Compatibility Notes

Skills and agents use the **Agent Skills open standard** (agentskills.io) for cross-tool compatibility.

| Feature | Claude Code | Cursor | Codex |
|---------|-------------|--------|-------|
| Skill invocation (`/skill-name`) | Yes | Yes | Yes |
| Auto-invocation by description | Yes | Yes | Yes |
| Model routing (haiku/sonnet/opus) | Yes | Ignored | Ignored |
| `allowed-tools` (skills) | Yes | Ignored | Ignored |
| `tools`/`disallowedTools` (agents) | Yes | Ignored | Ignored |
| `permissionMode` (agents) | Yes | Ignored | Ignored |
| Custom fields (tier, intent, etc.) | Ignored | Ignored | Ignored |
| Team agents (parallel execution) | Yes | Ignored | Ignored |

**Key insight**: The `model` column above reflects Claude Code routing. Other tools ignore this field and use their default model.

---

## Execution Modes

Plans and tasks can be executed in different modes depending on complexity and parallelism requirements.

| Mode | Support | Token Cost | Best For | Description |
|------|---------|-----------|----------|-------------|
| Sequential | All agents | Lowest | Dependent tasks, simple plans | Default — tasks one at a time, in order |
| Subagents | Claude Code | Low-Medium | Focused research, quick helpers | Helper agents within session, report back only |
| Team Agents | Claude Code only | High | 3+ parallel independent tasks | Multiple instances with shared task list and messaging |
| Orchestrator | All agents | Varies | Multi-repo feature work | Parent DWP spawns child DWPs in sub-repos |

### When to Use Each Mode

| Scenario | Recommended Mode | Why |
|----------|-----------------|-----|
| Tasks depend on each other | Sequential | No parallelism benefit |
| Quick focused sub-task | Subagents | Lower overhead than team agents |
| 3+ independent parallel tasks | Team Agents | Shared coordination, inter-agent messaging |
| Same-file edits | Sequential | Teammates would overwrite each other |
| Multi-repo changes | Orchestrator | Each repo gets own DWP |
| Simple single-session work | Sequential | Team overhead exceeds benefit |

### Execution Mode Integration

```
Sequential (default)     Subagents              Team Agents
---------------------   ----------              -----------
Task 1 -> Task 2 ->    Main --> Sub1            Lead --> Teammate1
Task 3 -> Task 4         |<---- result             |<---- messages
                        Main --> Sub2            Lead --> Teammate2
                          |<---- result             |<---- messages
                                                 Lead --> Teammate3
                                                    |<---- messages
                                                 Shared task list
```

> Team agents are used for DWP parallel task groups. See [Team Agents Reference](../../docs/technical/TEAM_AGENTS_REFERENCE.md).

---

## Astro-Specific Notes

All skills and agents are adapted for this Astro repository:

- **Linting:** Biome (not ESLint)
- **Type checking:** `pnpm run astro:check`
- **Build:** `pnpm run build`
- **Components:** Astro (.astro) and Svelte (.svelte)
- **Styling:** Tailwind CSS with dark mode
- **Content:** Content Collections in `src/content/`
- **i18n:** Multilingual-ready (currently English/Spanish) with centralized config in `src/lib/i18n.ts`, modular translations in `src/lib/translations/`, shared page components in `src/components/pages/`, and thin per-language wrappers
- **Testing:** Vitest (`pnpm run test`)

---

## Changelog

> **Policy:** Keep only the 3 most recent entries. When adding a new entry, remove the oldest.

| Date | Change | Details |
|------|--------|---------|
| 2026-06-02 | `add-diagram-component` skill added | Skills & Agents Discovery for PLAN_interactive_diagram_components. Captured the Editorial Interactive Asset system (`docs/DIAGRAM_COMPONENTS.md`): diagrams as HTML/CSS/SVG components with inline language-keyed i18n (en fallback) + `lang`, `role="img"` + localized aria-label, `.editorial-asset-*` Broadsheet styling, static-first, and **in-body MDX embedding at narrative anchors** (overview after the lead; section figures at their heading; never before the title). New Tier-2 skill (skills 14 → 15). No agent changes warranted (`i18n-guardian`/`translate-sync` already cover the i18n maps). |
| 2026-06-02 | Visual Prompt Pack — no new skills/agents (proposal deferred) | Skills & Agents Discovery for PLAN_site_visual_prompt_pack. Evaluated a reusable `visual-prompt-pack` skill (house-style block + slot inventory + schema-driven AI-image prompts + integration guide). **Deferred creation** — the procedure lives in `docs/visuals/STYLE_GUIDE.md` and had been exercised once; `doc-edit` covers the authoring mechanics. A `/skill-create` candidate for later. |
| 2026-06-02 | `responsive-lighthouse-audit` skill added | Skills & Agents Discovery for PLAN_responsive_quality_audit. Captured the battle-tested procedure (desktop Lighthouse config + dual-form-factor sweep, the breakpoint walk, and the fix playbook). New Tier-2 skill (skills 13 → 14). No agent changes warranted. |

---

## Related Documentation

- [Commands Reference](COMMANDS_REFERENCE.md) — All slash commands with procedure files and cross-agent invocation convention
- [Author sub-skill (skill & agent generation)](../skills/deepworkplan/author/SKILL.md) — provided by the installed `deepworkplan` skill; backs `/skill-create` and `/agent-create`
- [Skill template](../skills/deepworkplan/author/templates/SKILL_TEMPLATE.md)
- [Agent template](../skills/deepworkplan/author/templates/AGENT_TEMPLATE.md)
- [DeepWorkPlan skill (dwp-* flows)](../skills/deepworkplan/SKILL.md) — backs `/dwp-create`, `/dwp-execute`, `/dwp-refine`, `/dwp-resume`, `/dwp-status`
- [Dependency-upgrade add-on](../skills/deepworkplan/addons/dependency-upgrade/SKILL.md) — opt-in maintenance add-on shipped with the `deepworkplan` skill; backs `/lib-upgrade` (package-manager agnostic, validated revertible batches)
- [AGENTS.md](../../AGENTS.md) - Main AI agent guidance
- [docs/STANDARDS.md](../../docs/STANDARDS.md) - Coding standards
