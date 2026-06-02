# Visual Inventory — Deep Work Plan

> Master list of every planned visual slot across the site, with a stable `ID`
> and metadata. The **Prompt link** column points to the per-area file + anchor
> where the full schema-complete prompt lives (filled in Tasks 2–5; status
> cross-checked in Task 6). See [STYLE_GUIDE.md](./STYLE_GUIDE.md) for the schema,
> palette, dimensions, and light/dark + EN/ES policies.

> **⚠️ Diagrams (▦) are now components.** Per `PLAN_interactive_diagram_components`,
> every ▦ diagram slot (HP-03/04/05, all ME/SP/KT) is built as an HTML/CSS component
> under `src/components/diagrams/` (see [`docs/DIAGRAM_COMPONENTS.md`](../DIAGRAM_COMPONENTS.md));
> these prompt entries are kept as the **component specs / i18n seed**. Only the
> 🖼 illustrations (HP-01, HP-02, HP-06–09) are generated as images.

**Priority key:** ★ flagship · H high · M medium · L low.
**Type:** 🖼 illustration (→ image) · ▦ diagram (→ component).
**Status:** `todo` (no prompt yet) · `done` (schema-complete prompt written) ·
`skip` (intentionally no visual — reason noted).

---

## Homepage — `src/components/home/` → prompts/[01-homepage.md](./prompts/01-homepage.md)

| ID | Surface | Type | Pri | Aspect/size | Light/dark | Asset path | Status |
| :-- | :-- | :-: | :-: | :-- | :-- | :-- | :-- |
| HP-01 | `Hero.astro` → right column (empty on `lg`; currently `max-w-3xl` text — needs a grid to expose the column) | 🖼 | ★ | 4:5 · 520×650 | pair | `home/hero-harness.webp` | done |
| HP-02 | `Pitch.astro` → beside problem→answer copy | 🖼 | M | 1:1 · 96×96 | transparent | `home/pitch-mark.webp` | done |
| HP-03 | `Quickstart.astro` → above/beside the 4 steps | ▦ | H | 16:9 · 880×495 | transparent | `home/quickstart-flow.webp` | done |
| HP-04 | `Onboarding.astro` → beside numbered steps | ▦ | M | 16:9 · 880×495 | transparent | `home/onboarding-sequence.webp` | done |
| HP-05 | `Archetypes.astro` → between the two cards | ▦ | M | 1:1 · 640×640 | transparent | `home/archetypes-compare.webp` | done |
| HP-06 | `Agents.astro` → per-card glyphs | 🖼 | L | 1:1 · 96×96 | transparent | `home/agent-glyphs.webp` | done |
| HP-07 | `Outcomes.astro` → benefit marks | 🖼 | L | 1:1 · 96×96 | transparent | `home/outcome-marks.webp` | done |
| HP-08 | `Stacks.astro` → tech marks | 🖼 | L | 1:1 · 96×96 | transparent | `home/stack-marks.webp` | done |
| HP-09 | `FinalCta.astro` → accent above CTAs | 🖼 | L | 16:9 · 880×495 | transparent | `home/finalcta-accent.webp` | done |

> `Comparison.astro` and `Origin.astro`: candidate `skip` — Comparison is a table
> (status marks may be CSS, not an asset); Origin already carries the Dailybot
> logo. Task 2 confirms or replaces with a justified entry.

---

## Methodology — `src/content/methodology/en/` → prompts/[02-methodology.md](./prompts/02-methodology.md)

| ID | Surface | Type | Pri | Aspect/size | Light/dark | Asset path | Status |
| :-- | :-- | :-: | :-: | :-- | :-- | :-- | :-- |
| ME-01 | `01-manifesto` → repo-as-harness section | ▦ | ★ | 1:1 · 640×640 | transparent | `methodology/repo-as-harness.webp` | done |
| ME-02 | `02-core-loop` → the operations section | ▦ | ★ | 1:1 · 640×640 | transparent | `methodology/core-loop.webp` | done |
| ME-03 | `02-core-loop` → task anatomy (nine sections) | ▦ | H | 16:9 · 880×495 | transparent | `methodology/task-anatomy.webp` | done |
| ME-04 | `03-templates` → plan directory structure | ▦ | M | 16:9 · 880×495 | transparent | `methodology/plan-tree.webp` | done |
| ME-05 | `04-skills-agents` → skills vs agents + symlink | ▦ | M | 16:9 · 880×495 | transparent | `methodology/skills-agents.webp` | done |
| ME-06 | `05-archetypes` → classification | ▦ | M | 1:1 · 640×640 | transparent | `methodology/archetypes-tree.webp` | done |

---

## Spec — `src/content/spec/en/` → prompts/[03-spec.md](./prompts/03-spec.md)

| ID | Surface | Type | Pri | Aspect/size | Light/dark | Asset path | Status |
| :-- | :-- | :-: | :-: | :-- | :-- | :-- | :-- |
| SP-01 | `agent-protocol` → lifecycle phases | ▦ | H | 16:9 · 880×495 | transparent | `spec/agent-lifecycle.webp` | done |
| SP-02 | `dwp-specification` → task anatomy figure | ▦ | M | 16:9 · 880×495 | transparent | `spec/task-anatomy-spec.webp` | done |
| SP-03 | `dwp-specification` → five-operation loop | ▦ | M | 1:1 · 640×640 | transparent | `spec/five-operations.webp` | done |
| SP-04 | `dwp-specification` → `.dwp/` output workspace tree | ▦ | M | 16:9 · 880×495 | transparent | `spec/output-workspace.webp` | done |
| SP-05 | `archetypes` → classification (normative) | ▦ | M | 1:1 · 640×640 | transparent | `spec/archetypes-spec.webp` | done |

> Spec figures use the restrained, figure-like register (see STYLE_GUIDE §1
> note). SP-02/SP-03 may consolidate with methodology equivalents — Task 4
> decides and notes any reuse rather than duplicating.

---

## Kit — `src/content/kit/en/` → prompts/[04-kit.md](./prompts/04-kit.md)

| ID | Surface | Type | Pri | Aspect/size | Light/dark | Asset path | Status |
| :-- | :-- | :-: | :-: | :-- | :-- | :-- | :-- |
| KT-01 | `framework-migration` → before/after + decomposition | ▦ | ★ | 16:10 · 960×600 | transparent | `kit/migration-before-after.webp` | done |
| KT-02 | `before-after` → unguided vs DWP comparison | ▦ | H | 16:10 · 960×600 | transparent | `kit/unguided-vs-dwp.webp` | done |
| KT-03 | `onboard-legacy-service` → onboarding flow | ▦ | H | 16:9 · 880×495 | transparent | `kit/onboard-flow.webp` | done |
| KT-04 | `dwp-create` → input→process→output sequence | ▦ | M | 16:9 · 880×495 | transparent | `kit/cmd-create.webp` | done |
| KT-05 | `dwp-execute` → sequence | ▦ | M | 16:9 · 880×495 | transparent | `kit/cmd-execute.webp` | done |
| KT-06 | `dwp-refine` → sequence | ▦ | M | 16:9 · 880×495 | transparent | `kit/cmd-refine.webp` | done |
| KT-07 | `dwp-resume` → sequence | ▦ | M | 16:9 · 880×495 | transparent | `kit/cmd-resume.webp` | done |
| KT-08 | `dwp-verify` → sequence | ▦ | M | 16:9 · 880×495 | transparent | `kit/cmd-verify.webp` | done |
| KT-09 | `dwp-status` → sequence | ▦ | M | 16:9 · 880×495 | transparent | `kit/cmd-status.webp` | done |
| KT-10 | kit index → kit composition overview (presets/adapters/commands/addons) | ▦ | H | 16:9 · 880×495 | transparent | `kit/kit-composition.webp` | done |

> KT-04…KT-09 (the six `dwp-*` commands) must share ONE visual language so they
> read as a family. Task 5 may template them.

---

## Coverage summary (updated in Task 6)

| Area | Slots | Flagships | Done | Skip |
| :-- | :-: | :-- | :-: | :-: |
| Homepage | 9 (+2 candidates) | HP-01 | 9 | 2 (Comparison → CSS ticks; Origin → has logo) |
| Methodology | 6 | ME-01, ME-02 | 6 | — |
| Spec | 5 | — | 5 (SP-02/03/05 reuse ME assets) | — |
| Kit | 10 | KT-01 | 10 | — |
| **Total** | **30 (+2)** | **4** | **30** | **2** |

_Reconciled in Task 6 (2026-06-02): every inventory slot ID maps to a
schema-complete prompt entry; EN/ES label, alt, and caption fields are balanced
across all four prompt files (9 / 6 / 5 / 10). The two homepage candidates are
intentional skips. SP-02/SP-03/SP-05 reuse methodology assets ME-03/ME-02/ME-06._
