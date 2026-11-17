# Skills and agents catalog

This catalog reflects the current `.agents/skills/`, `.agents/agents/`, and `.agents/commands/` trees. Procedure files are authoritative; descriptions here are summaries. The Claude Code model field is tool-specific and does not guarantee routing in other agents.

Counts: **20 skills**, **5 agent definitions**, and **17 command files**.

## Skills

| Skill | Invocation | Summary |
|---|---|---|
| [add-component](../skills/add-component/SKILL.md) | `/add-component` | Create new Astro or Svelte components with correct patterns. Use proactively when creating new UI components. |
| [add-diagram-component](../skills/add-diagram-component/SKILL.md) | `/add-diagram-component` | Create an editorial HTML/CSS/SVG diagram component (Editorial Interactive Asset) and embed it in-body via MDX. Use proactively when adding a diagram/figure to a methodolo |
| [add-language](../skills/add-language/SKILL.md) | `/add-language` | Add a new language to the site end-to-end (scaffold → translate → native review → QA). Use when adding a locale beyond the active set. |
| [add-page](../skills/add-page/SKILL.md) | `/add-page` | Create new pages with correct routing and MainLayout usage. Use proactively when creating new pages. |
| [ai-diff-reviewer](../skills/ai-diff-reviewer/SKILL.md) | `/ai-diff-reviewer` | Local & CI companion to the AI Diff Reviewer GitHub Action (DailybotHQ/ai-diff-reviewer). Router for six capabilities — (1) review the current branch diff locally (same m |
| [dailybot](../skills/dailybot/SKILL.md) | `/dailybot` | Official Dailybot agent skill pack — report progress, check messages, send emails, announce agent status, complete check-ins, give kudos (to users or teams), resolve team |
| [deepworkplan](../skills/deepworkplan/SKILL.md) | `/deepworkplan` | DeepWorkPlan — turn any repo AI-first and run Deep Work Plans. Routes to create, execute, refine, resume, status, verify, upgrade, and repo-onboarding sub-skills based on |
| [doc-edit](../skills/doc-edit/SKILL.md) | `/doc-edit` | Update documentation files including README, comments, and inline docs. Use proactively for documentation updates. |
| [fix-lint](../skills/fix-lint/SKILL.md) | `/fix-lint` | Fix Biome linting/formatting errors in 1-3 files using auto-fix and minimal manual edits. Use proactively for lint issues. |
| [git-commit-push](../skills/git-commit-push/SKILL.md) | `/git-commit-push` | Commit all staged/unstaged changes and push to remote. Use proactively for committing and pushing changes. |
| [herdr-peers](../skills/herdr-peers/SKILL.md) | `/herdr-peers` | Ask another coding agent in a Herdr pane — on this machine or another one — and get exactly one authorized reply back, with a loop guard, depth limit 1, a fan-out cap and |
| [pr-review-lite](../skills/pr-review-lite/SKILL.md) | `/pr-review-lite` | Quick checklist review of a PR for style, obvious bugs, and missing tests. Use proactively for lightweight PR reviews. |
| [quick-fix](../skills/quick-fix/SKILL.md) | `/quick-fix` | Fix small bugs and issues in 1-3 files following existing patterns. Use proactively for simple bug fixes. |
| [refactor-safe](../skills/refactor-safe/SKILL.md) | `/refactor-safe` | Safe refactor in bounded scope (1-10 files, no behavior change). Use proactively for safe, bounded refactoring tasks. |
| [responsive-lighthouse-audit](../skills/responsive-lighthouse-audit/SKILL.md) | `/responsive-lighthouse-audit` | Audit the site's responsiveness across breakpoints and drive Lighthouse to near-100 on mobile AND desktop. Use proactively for responsive/performance/accessibility audits |
| [security-check](../skills/security-check/SKILL.md) | `/security-check` | Quick security checklist for a PR or set of files (secrets, input, logging). Use proactively for security reviews. |
| [translate-sync](../skills/translate-sync/SKILL.md) | `/translate-sync` | Synchronize content from English across all active languages. Use proactively when content needs multilingual synchronization. |
| [type-fix](../skills/type-fix/SKILL.md) | `/type-fix` | Fix TypeScript type errors in 1-3 files (explicit types, prefer no any). Use proactively for TypeScript type issues. |
| [update-styles](../skills/update-styles/SKILL.md) | `/update-styles` | Update Tailwind styles with dark mode support. Use proactively for styling updates. |
| [write-tests](../skills/write-tests/SKILL.md) | `/write-tests` | Add or expand unit/integration tests for existing code (when testing is configured). Use proactively when tests need to be added or expanded. |

## Agent definitions

| Agent | Definition | Summary |
|---|---|---|
| architect | [architect.md](../agents/architect.md) | Planning-only architect for system design, architecture decisions, and complex planning. Use proactively for architectural decisions and system design. |
| executor | [executor.md](../agents/executor.md) | Plan execution specialist that follows defined plans strictly without deviation. Use proactively for executing predefined task plans. |
| i18n-guardian | [i18n-guardian.md](../agents/i18n-guardian.md) | Translation quality specialist and multilingual consistency enforcer. Use proactively for multilingual content audits and translation quality reviews. |
| reviewer | [reviewer.md](../agents/reviewer.md) | Thorough code review specialist focused on quality, maintainability, and best practices. Use proactively after code changes for quality review. |
| security-auditor | [security-auditor.md](../agents/security-auditor.md) | Security-focused reviewer for static sites, API routes, secrets, and input validation. Use proactively for security reviews of PRs and code changes. |

## Commands

Command files in `.agents/commands/` are native slash commands in Claude Code. Other tools may use a hash prefix or the plain command name. Read and follow each procedure before invocation.

| Command | Procedure |
|---|---|
| `/agent-create` | [agent-create.md](../commands/agent-create.md) |
| `/agent-list` | [agent-list.md](../commands/agent-list.md) |
| `/branch` | [branch.md](../commands/branch.md) |
| `/code-review` | [code-review.md](../commands/code-review.md) |
| `/commit` | [commit.md](../commands/commit.md) |
| `/doc` | [doc.md](../commands/doc.md) |
| `/dwp-create` | [dwp-create.md](../commands/dwp-create.md) |
| `/dwp-execute` | [dwp-execute.md](../commands/dwp-execute.md) |
| `/dwp-refine` | [dwp-refine.md](../commands/dwp-refine.md) |
| `/dwp-resume` | [dwp-resume.md](../commands/dwp-resume.md) |
| `/dwp-status` | [dwp-status.md](../commands/dwp-status.md) |
| `/dwp-upgrade` | [dwp-upgrade.md](../commands/dwp-upgrade.md) |
| `/dwp-verify` | [dwp-verify.md](../commands/dwp-verify.md) |
| `/lib-upgrade` | [lib-upgrade.md](../commands/lib-upgrade.md) |
| `/pr` | [pr.md](../commands/pr.md) |
| `/skill-create` | [skill-create.md](../commands/skill-create.md) |
| `/skill-list` | [skill-list.md](../commands/skill-list.md) |

## Repository workflows

- **Execution modes:** [Team Agents Reference](../../docs/technical/TEAM_AGENTS_REFERENCE.md) covers Sequential, Subagents, Team Agents, and Orchestrator selection.
- DWP plans and tasks: use the installed [DeepWorkPlan skill](../skills/deepworkplan/SKILL.md) and its sub-skills. Plan state lives under git-ignored `.dwp/plans/`.
- Documentation: see [Documentation Guide](../../docs/DOCUMENTATION_GUIDE.md).
- Translations: synchronize all active locales; see [I18N Guide](../../docs/I18N_GUIDE.md).
- Validation commands: see [Development Commands](../../docs/DEVELOPMENT_COMMANDS.md) and [Testing Guide](../../docs/TESTING_GUIDE.md).
