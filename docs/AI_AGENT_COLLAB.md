# AI Agent Collaboration Guide

Guidelines for coordinating multiple AI coding assistants working on deepworkplan.com.

## Overview

Multiple AI agents can work on this codebase:

| Agent | Guidance File | Capabilities |
|-------|--------------|--------------|
| **Cursor AI** | `.cursorrules` (if exists), `AGENTS.md` | Full IDE integration |
| **Claude Code** | `CLAUDE.md` → `AGENTS.md` | Terminal access, file editing |
| **ChatGPT/Codex** | `AGENTS.md` | Code generation, review |
| **Gemini** | `AGENTS.md` | Code generation, analysis |
| **GitHub Copilot** | Context-based | Inline completions |

## Single Source of Truth

**`AGENTS.md` is the canonical reference** for all agents.

```
AGENTS.md ← Single source of truth
    │
    ├── CLAUDE.md imports via @AGENTS.md
    ├── Cursor reads directly
    └── Others reference directly
```

### Synchronization Rules

When updating agent guidance:

1. **Update `AGENTS.md`** with the change
2. **Verify `CLAUDE.md`** still imports correctly
3. **Don't duplicate** - Keep info in one place

## Agent Handoff Protocol

When work transfers between agents or sessions:

### 1. Document Current State

Before stopping:

```markdown
## Handoff Notes

### Completed
- [x] Added MethodologyReader component
- [x] Updated content.config.ts

### In Progress
- [ ] Scroll-spy navigation (50% done)

### Blocked
- Waiting for content structure decision

### Files Changed
- src/components/pages/MethodologyPage.astro
- src/content.config.ts

### Next Steps
1. Complete scroll-spy logic
2. Add loading states
3. Write documentation
```

### 2. Commit Incrementally

Don't leave uncommitted work:

```bash
# Commit before handoff
git add -A
git commit -m "wip: methodology reader - scroll-spy in progress"
```

### 3. Clear Context Transfer

New agent should:

1. Read `AGENTS.md` first
2. Check recent commits: `git log --oneline -10`
3. Check uncommitted changes: `git status && git diff`
4. Read handoff notes if any

## Communication Patterns

### Code Comments for Agents

Use clear TODO comments:

```typescript
// TODO: Add error handling for fetch failures
// NOTE: This pattern matches MethodologyCard - keep consistent
// FIXME: Dark mode not working on mobile
```

### Commit Messages

Use conventional commits with clear context:

```bash
# Good - clear what and why
git commit -m "feat: add scroll-spy nav to methodology reader

- Highlights the active section while scrolling
- Uses IntersectionObserver (no scroll listener)
- Bilingual labels via getTranslations(lang)"

# Bad - vague
git commit -m "add nav"
```

### PR Descriptions

Include context for reviewers (human or AI):

```markdown
## Summary
Added scroll-spy navigation to the methodology reader.

## Changes
- New ScrollSpyNav.svelte component (IntersectionObserver-based)
- Wired into MethodologyPage.astro with bilingual labels

## Testing
- [x] Active section highlights correctly
- [x] Works at the top and bottom of the page
- [x] Dark mode supported

## Notes for Reviewers
Navigation is static-first; the only JS is the IntersectionObserver
island. No scroll listeners, no layout shift.
```

## Conflict Resolution

### When Agents Disagree

1. **Check `AGENTS.md`** - Standards take precedence
2. **Follow existing patterns** - Consistency over preference
3. **Document decision** - Add to relevant docs

### Merge Conflicts

If conflicts arise:

1. Understand both changes
2. Merge manually if complex
3. Run validation:
   ```bash
   pnpm run biome:check && pnpm run astro:check && pnpm run build
   ```
4. Test affected features

## Best Practices

### For All Agents

- ✅ Read `AGENTS.md` at start of session
- ✅ Follow established patterns
- ✅ Commit frequently with clear messages
- ✅ Run validation before considering work complete
- ✅ Document non-obvious decisions

### Session Start Checklist

```markdown
1. [ ] Read AGENTS.md
2. [ ] Check git status
3. [ ] Review recent commits
4. [ ] Understand current task scope
5. [ ] Verify dev environment works (pnpm run dev)
```

### Session End Checklist

```markdown
1. [ ] Commit all changes
2. [ ] Run full validation
3. [ ] Document any handoff notes
4. [ ] Update docs if needed
```

## Agent-Specific Notes

### Cursor AI

- Full IDE access
- Can run terminal commands
- Has file context from workspace

### Claude Code

- Terminal and file access
- Reads `CLAUDE.md` which imports `AGENTS.md`
- Good for complex multi-file changes

### ChatGPT/Codex

- Code generation focused
- May need manual file updates
- Reference `AGENTS.md` in prompts

### GitHub Copilot

- Inline completions
- Context from open files
- Follow patterns in visible code

## Documentation Sync

### What to Synchronize

| Content | Location | Notes |
|---------|----------|-------|
| Coding standards | `AGENTS.md`, `docs/STANDARDS.md` | Keep aligned |
| Commands | `AGENTS.md`, `docs/DEVELOPMENT_COMMANDS.md` | Full list in docs |
| Architecture | `AGENTS.md` summary, `docs/ARCHITECTURE.md` full | |

### What NOT to Synchronize

- Agent-specific workflows (keep in respective files)
- Temporary notes (use comments/commits)
- Session-specific context

## Troubleshooting

### Agent Seems Confused

1. Explicitly reference `AGENTS.md`
2. Provide file paths for context
3. Show example from codebase

### Inconsistent Output

1. Check if following different patterns
2. Point to existing code examples
3. Clarify which pattern to follow

### Work Gets Repeated

1. Check commit history
2. Look for handoff notes
3. Review recent file changes

## Resources

- [AGENTS.md](../AGENTS.md) - Main guidance
- [STANDARDS.md](STANDARDS.md) - Coding conventions
- [AI_AGENT_ONBOARDING.md](AI_AGENT_ONBOARDING.md) - Quick start
