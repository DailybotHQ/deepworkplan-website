# Documentation Inventory

Tracking documentation coverage for deepworkplan.com.

## Documentation Files

### Core Documentation

| File | Status | Last Updated | Description |
|------|--------|--------------|-------------|
| [AGENTS.md](../AGENTS.md) | ✅ Current | 2026-01 | Main AI agent guidance |
| [CLAUDE.md](../CLAUDE.md) | ✅ Current | 2026-01 | Claude Code wrapper |
| [README.md](../README.md) | ✅ Current | - | Project overview |

### docs/ Folder

| File | Status | Description |
|------|--------|-------------|
| [README.md](README.md) | ✅ Current | Documentation index |
| [PRODUCT_SPEC.md](PRODUCT_SPEC.md) | ✅ Current | Product vision and features |
| [ARCHITECTURE.md](ARCHITECTURE.md) | ✅ Current | Technical architecture |
| [STANDARDS.md](STANDARDS.md) | ✅ Current | Coding conventions |
| [DEVELOPMENT_COMMANDS.md](DEVELOPMENT_COMMANDS.md) | ✅ Current | npm scripts reference |
| [TESTING_GUIDE.md](TESTING_GUIDE.md) | ✅ Current | Testing setup (future) |
| [SECURITY.md](SECURITY.md) | ✅ Current | Security best practices |
| [PERFORMANCE.md](PERFORMANCE.md) | ✅ Current | Performance optimization |
| [I18N_GUIDE.md](I18N_GUIDE.md) | ✅ Current | Internationalization |
| [API_REFERENCE.md](API_REFERENCE.md) | ✅ Current | API endpoints |
| [AI_AGENT_ONBOARDING.md](AI_AGENT_ONBOARDING.md) | ✅ Current | Quick start for AI agents |
| [AI_AGENT_COLLAB.md](AI_AGENT_COLLAB.md) | ✅ Current | Multi-agent coordination |
| [DOCUMENTATION_GUIDE.md](DOCUMENTATION_GUIDE.md) | ✅ Current | Documentation standards |
| [BRAND_GUIDE.md](BRAND_GUIDE.md) | ✅ Current | Color palette, typography, logo, visual identity |
| [DOCUMENTATION_INVENTORY.md](DOCUMENTATION_INVENTORY.md) | ✅ Current | This file |

### docs/features/ Folder

| File | Status | Description |
|------|--------|-------------|
| [README.md](features/README.md) | ✅ Current | Features index |
| [DARK_MODE.md](features/DARK_MODE.md) | ✅ Current | Theme toggle and persistence |
| [IMAGE_OPTIMIZATION.md](features/IMAGE_OPTIMIZATION.md) | ✅ Current | Sharp-based image pipeline |
| [I18N.md](features/I18N.md) | ✅ Current | Multi-language support |
| [PUBLIC_ASSETS.md](features/PUBLIC_ASSETS.md) | ✅ Current | Static assets structure |

### docs/aeo/ Folder

| File | Status | Description |
|------|--------|-------------|
| [CHECKLIST.md](aeo/CHECKLIST.md) | ✅ Current | AEO monthly maintenance checklist |
| [MARKDOWN_FOR_AGENTS.md](aeo/MARKDOWN_FOR_AGENTS.md) | ✅ Current | Native Markdown endpoints for agents |

### src/ README Files

| File | Status | Description |
|------|--------|-------------|
| [src/README.md](../src/README.md) | ✅ Current | Source folder overview |
| [src/components/README.md](../src/components/README.md) | ✅ Current | Components overview |
| [src/components/layout/README.md](../src/components/layout/README.md) | ✅ Current | Layout components |
| [src/lib/README.md](../src/lib/README.md) | ✅ Current | Utility functions |
| [src/pages/README.md](../src/pages/README.md) | ✅ Current | Routing and pages |
| [src/layouts/README.md](../src/layouts/README.md) | ✅ Current | Page layouts |
| [src/content/README.md](../src/content/README.md) | ✅ Current | Content Collections |
| [src/styles/README.md](../src/styles/README.md) | ✅ Current | Styling guide |

### Deep Work Plan Documentation

| File | Status | Description |
|------|--------|-------------|
| [deepworkplan skill](../.agents/skills/deepworkplan/) | ✅ Current | Installed DWP skill (create/execute/refine/resume plans) — git-ignored, not vendored |
| [author sub-skill](../.agents/skills/deepworkplan/author/SKILL.md) | ✅ Current | Skills/agents/commands creation system |
| [dependency-upgrade addon](../.agents/skills/deepworkplan/addons/dependency-upgrade/SKILL.md) | ✅ Current | Dependency upgrade addon |
| `.dwp/` | ✅ Current | Deep Work Plan output (plans/drafts) — git-ignored working state |

### .agents/ Documentation

| File | Status | Description |
|------|--------|-------------|
| [README.md](../.agents/README.md) | ✅ Current | Claude commands overview |
| [skills/](../.agents/skills/) | ✅ Current | Reusable skills (9 total) |
| [agents/](../.agents/agents/) | ✅ Current | Specialized agents (4 total) |
| [docs/skills_agents_catalog.md](../.agents/docs/skills_agents_catalog.md) | ✅ Current | Catalog of skills/agents |

## Coverage Summary

### By Category

| Category | Files | Coverage |
|----------|-------|----------|
| Core | 3 | 100% |
| docs/ | 15 | 100% |
| docs/features/ | 5 | 100% |
| docs/aeo/ | 2 | 100% |
| src/ READMEs | 8 | 100% |
| public/ | 1 | 100% |
| Agent Commands | 5 | 100% |
| Claude System | 4 | 100% |

### Total

- **Documentation Files:** ~43
- **Current:** all
- **Needs Review:** 0

## AI Interoperability Checklist

| Area | Status | Description |
|------|--------|-------------|
| Root Documentation | ✅ | AGENTS.md, CLAUDE.md, README.md |
| Architecture Docs | ✅ | Full technical documentation |
| Component Docs | ✅ | README.md in each component folder |
| Feature Docs | ✅ | docs/features/ feature docs |
| Agent Commands | ✅ | Deep work plans, skills, upgrades |
| Skills & Agents | ✅ | 9 skills, 4 agents documented |
| Example Plans | ✅ | Astro-specific example plan |

**AI Interoperability: 100%**

## Recently Removed Files

Blog-engine documentation was removed when the blog functionality was retired:

- `features/BLOG_POSTS.md`, `features/BLOG_CONTENT_LIFECYCLE.md`, `features/BLOG_SEARCH.md`
- `features/AUTHORS.md`, `features/RSS_FEED.md`, `features/PAGINATION.md`
- `WRITING_CRAFT_GUIDE.md`, `WRITING_VOICE_GUIDE.md` - blog article writing craft/voice
- `aeo/AUDIT.md`, `aeo/QUERIES.md` - stale point-in-time blog/personal-site AEO artifacts

Earlier, the following serverless-specific files were removed:

- `DATABASE_SCHEMAS.md` - DynamoDB (not applicable)
- `SERVERLESS_CONFIGURATION.md` - Not applicable
- `API_ENDPOINTS.md` - Replaced by API_REFERENCE.md
- `ERROR_HANDLING.md` - Generic patterns in STANDARDS.md
- `ENVIRONMENT_VARIABLES.md` - Minimal env vars for static site

## Documentation Maintenance

- [ ] Review quarterly for accuracy
- [ ] Update after major changes
- [ ] Keep synchronized with code

## How to Update This Inventory

1. When adding new docs, add row to appropriate table
2. When removing docs, move to "Recently Removed" section
3. When updating docs, update "Last Updated" if significant
4. Review status monthly

## Status Legend

| Status | Meaning |
|--------|---------|
| ✅ Current | Up to date with codebase |
| ⚠️ Review | May need updates |
| ❌ Outdated | Known to be out of date |
| 📝 Draft | Work in progress |
