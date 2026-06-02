# Visual Inventory — Deep Work Plan

> Master list of every planned visual slot across the site, with a stable `ID`
> and metadata. The **Prompt link** column points to the per-area file + anchor
> where the full schema-complete prompt lives (filled in Tasks 2–5; status
> cross-checked in Task 6). See [STYLE_GUIDE.md](./STYLE_GUIDE.md) for the schema,
> palette, dimensions, and light/dark + EN/ES policies.

**Priority key:** ★ flagship · H high · M medium · L low.
**Type:** 🖼 illustration · ▦ diagram.
**Status:** `todo` (no prompt yet) · `done` (schema-complete prompt written) ·
`skip` (intentionally no visual — reason noted).

---

## Homepage — `src/components/home/` → prompts/[01-homepage.md](./prompts/01-homepage.md)

| ID | Surface | Type | Pri | Aspect/size | Light/dark | Asset path | Status |
| :-- | :-- | :-: | :-: | :-- | :-- | :-- | :-- |
| HP-01 | `Hero.astro` → right column (empty on `lg`; currently `max-w-3xl` text — needs a grid to expose the column) | 🖼 | ★ | 4:5 · 520×650 | pair | `home/hero-harness.webp` | todo |
| HP-02 | `Pitch.astro` → beside problem→answer copy | 🖼 | M | 1:1 · 96×96 | transparent | `home/pitch-mark.webp` | todo |
| HP-03 | `Quickstart.astro` → above/beside the 4 steps | ▦ | H | 16:9 · 880×495 | transparent | `home/quickstart-flow.webp` | todo |
| HP-04 | `Onboarding.astro` → beside numbered steps | ▦ | M | 16:9 · 880×495 | transparent | `home/onboarding-sequence.webp` | todo |
| HP-05 | `Archetypes.astro` → between the two cards | ▦ | M | 1:1 · 640×640 | transparent | `home/archetypes-compare.webp` | todo |
| HP-06 | `Agents.astro` → per-card glyphs | 🖼 | L | 1:1 · 96×96 | transparent | `home/agent-glyphs.webp` | todo |
| HP-07 | `Outcomes.astro` → benefit marks | 🖼 | L | 1:1 · 96×96 | transparent | `home/outcome-marks.webp` | todo |
| HP-08 | `Stacks.astro` → tech marks | 🖼 | L | 1:1 · 96×96 | transparent | `home/stack-marks.webp` | todo |
| HP-09 | `FinalCta.astro` → accent above CTAs | 🖼 | L | 16:9 · 880×495 | transparent | `home/finalcta-accent.webp` | todo |

> `Comparison.astro` and `Origin.astro`: candidate `skip` — Comparison is a table
> (status marks may be CSS, not an asset); Origin already carries the Dailybot
> logo. Task 2 confirms or replaces with a justified entry.

---

## Methodology — `src/content/methodology/en/` → prompts/[02-methodology.md](./prompts/02-methodology.md)

| ID | Surface | Type | Pri | Aspect/size | Light/dark | Asset path | Status |
| :-- | :-- | :-: | :-: | :-- | :-- | :-- | :-- |
| ME-01 | `01-manifesto` → repo-as-harness section | ▦ | ★ | 1:1 · 640×640 | transparent | `methodology/repo-as-harness.webp` | todo |
| ME-02 | `02-core-loop` → the operations section | ▦ | ★ | 1:1 · 640×640 | transparent | `methodology/core-loop.webp` | todo |
| ME-03 | `02-core-loop` → task anatomy (nine sections) | ▦ | H | 16:9 · 880×495 | transparent | `methodology/task-anatomy.webp` | todo |
| ME-04 | `03-templates` → plan directory structure | ▦ | M | 16:9 · 880×495 | transparent | `methodology/plan-tree.webp` | todo |
| ME-05 | `04-skills-agents` → skills vs agents + symlink | ▦ | M | 16:9 · 880×495 | transparent | `methodology/skills-agents.webp` | todo |
| ME-06 | `05-archetypes` → classification | ▦ | M | 1:1 · 640×640 | transparent | `methodology/archetypes-tree.webp` | todo |

---

## Spec — `src/content/spec/en/` → prompts/[03-spec.md](./prompts/03-spec.md)

| ID | Surface | Type | Pri | Aspect/size | Light/dark | Asset path | Status |
| :-- | :-- | :-: | :-: | :-- | :-- | :-- | :-- |
| SP-01 | `agent-protocol` → lifecycle phases | ▦ | H | 16:9 · 880×495 | transparent | `spec/agent-lifecycle.webp` | todo |
| SP-02 | `dwp-specification` → task anatomy figure | ▦ | M | 16:9 · 880×495 | transparent | `spec/task-anatomy-spec.webp` | todo |
| SP-03 | `dwp-specification` → five-operation loop | ▦ | M | 1:1 · 640×640 | transparent | `spec/five-operations.webp` | todo |
| SP-04 | `dwp-specification` → `.dwp/` output workspace tree | ▦ | M | 16:9 · 880×495 | transparent | `spec/output-workspace.webp` | todo |
| SP-05 | `archetypes` → classification (normative) | ▦ | M | 1:1 · 640×640 | transparent | `spec/archetypes-spec.webp` | todo |

> Spec figures use the restrained, figure-like register (see STYLE_GUIDE §1
> note). SP-02/SP-03 may consolidate with methodology equivalents — Task 4
> decides and notes any reuse rather than duplicating.

---

## Kit — `src/content/kit/en/` → prompts/[04-kit.md](./prompts/04-kit.md)

| ID | Surface | Type | Pri | Aspect/size | Light/dark | Asset path | Status |
| :-- | :-- | :-: | :-: | :-- | :-- | :-- | :-- |
| KT-01 | `framework-migration` → before/after + decomposition | ▦ | ★ | 16:10 · 960×600 | transparent | `kit/migration-before-after.webp` | todo |
| KT-02 | `before-after` → unguided vs DWP comparison | ▦ | H | 16:10 · 960×600 | transparent | `kit/unguided-vs-dwp.webp` | todo |
| KT-03 | `onboard-legacy-service` → onboarding flow | ▦ | H | 16:9 · 880×495 | transparent | `kit/onboard-flow.webp` | todo |
| KT-04 | `dwp-create` → input→process→output sequence | ▦ | M | 16:9 · 880×495 | transparent | `kit/cmd-create.webp` | todo |
| KT-05 | `dwp-execute` → sequence | ▦ | M | 16:9 · 880×495 | transparent | `kit/cmd-execute.webp` | todo |
| KT-06 | `dwp-refine` → sequence | ▦ | M | 16:9 · 880×495 | transparent | `kit/cmd-refine.webp` | todo |
| KT-07 | `dwp-resume` → sequence | ▦ | M | 16:9 · 880×495 | transparent | `kit/cmd-resume.webp` | todo |
| KT-08 | `dwp-verify` → sequence | ▦ | M | 16:9 · 880×495 | transparent | `kit/cmd-verify.webp` | todo |
| KT-09 | `dwp-status` → sequence | ▦ | M | 16:9 · 880×495 | transparent | `kit/cmd-status.webp` | todo |
| KT-10 | kit index → kit composition overview (presets/adapters/commands/addons) | ▦ | H | 16:9 · 880×495 | transparent | `kit/kit-composition.webp` | todo |

> KT-04…KT-09 (the six `dwp-*` commands) must share ONE visual language so they
> read as a family. Task 5 may template them.

---

## Coverage summary (updated in Task 6)

| Area | Slots | Flagships | Done | Skip |
| :-- | :-: | :-- | :-: | :-: |
| Homepage | 9 (+2 candidates) | HP-01 | 0 | — |
| Methodology | 6 | ME-01, ME-02 | 0 | — |
| Spec | 5 | — | 0 | — |
| Kit | 10 | KT-01 | 0 | — |
| **Total** | **30 (+2)** | **4** | **0** | **—** |

_Status counts are reconciled against the prompt files in Task 6._
