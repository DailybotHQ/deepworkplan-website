# Visual Prompt Pack — Deep Work Plan

A brand-consistent set of **AI-image-generation prompts** plus a placement
inventory for adding illustrations and diagrams across deepworkplan.com. The pack
is **documentation only** — it does not change the site or generate images. You
run the prompts with your image agent, drop the returned assets into the paths
below, and wire them in following the integration guide.

The visual identity follows the "Broadsheet" editorial system: warm-paper,
ink-line **engraving** style anchored to the existing lighthouse in
`public/images/og-default.png`.

> **⚠️ Update — diagrams are now components, not images.** Following
> `PLAN_interactive_diagram_components`, the **24 diagrams** in this pack
> (HP-03/04/05, all ME, SP, KT) are being built as **HTML/CSS components** under
> `src/components/diagrams/` (text in the codebase → cheap multi-language), per
> [`docs/DIAGRAM_COMPONENTS.md`](../DIAGRAM_COMPONENTS.md). The diagram prompt
> entries below are kept as the **component specs** (their nodes, arrows, and EN/ES
> labels seed each component's i18n map). Only the **6 illustrations** — HP-01 (the
> faro hero), HP-02, HP-06, HP-07, HP-08, HP-09 — remain **AI-generated images**;
> generate those with your image agent using the prompts here.

## Contents

| File | What it is |
| :-- | :-- |
| [STYLE_GUIDE.md](./STYLE_GUIDE.md) | The canonical **house style** (engraving look, exact palette, light/dark + EN/ES policies, dimensions, asset paths) and the **prompt entry schema** every prompt follows. |
| [VISUAL_INVENTORY.md](./VISUAL_INVENTORY.md) | Master list of every visual **slot** across the site, each with a stable ID, type, priority, size, and status. |
| [prompts/01-homepage.md](./prompts/01-homepage.md) | Homepage prompts (HP-01 … HP-09). |
| [prompts/02-methodology.md](./prompts/02-methodology.md) | Methodology prompts (ME-01 … ME-06). |
| [prompts/03-spec.md](./prompts/03-spec.md) | Spec figures (SP-01 … SP-05). |
| [prompts/04-kit.md](./prompts/04-kit.md) | Kit prompts (KT-01 … KT-10). |
| [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) | How to wire the returned assets into the site (later — separate work). |

## How to use it

1. **Pick a slot** from `VISUAL_INVENTORY.md` (start with the flagships).
2. **Open its entry** in the matching `prompts/*.md` file.
3. **Copy the `Prompt` field** verbatim into your image agent. It is
   self-contained (house style + subject + exact labels + negative prompt).
4. For a **text-bearing diagram**, generate it **twice** — once with the EN label
   set, once with the ES set — and save as `{slug}.webp` and `{slug}-es.webp`.
5. For an entry with a **light+dark pair**, generate both grounds and save as
   `{slug}.webp` and `{slug}-dark.webp`.
6. **Save** to the entry's `Suggested asset path` under
   `public/images/visuals/{area}/`.
7. **Integrate** later using `INTEGRATION_GUIDE.md`.

## Generate these first (flagships)

| ID | What | Where |
| :-- | :-- | :-- |
| **HP-01** | Hero lighthouse / repository-as-harness illustration | Homepage hero right column |
| **ME-01** | Repository-as-harness architecture diagram | Methodology · Manifesto |
| **ME-02** | Core loop (create→execute→refine→resume→status) | Methodology · Core loop |
| **KT-01** | Before/after + task decomposition | Kit · Framework migration |

## Coverage

| Area | Slots with prompts | Flagships | Skips |
| :-- | :-: | :-- | :-- |
| Homepage | 9 (HP-01…HP-09) | HP-01 | `Comparison.astro` (table → CSS ticks), `Origin.astro` (already has logo) |
| Methodology | 6 (ME-01…ME-06) | ME-01, ME-02 | — |
| Spec | 5 (SP-01…SP-05) | — | SP-02/03/05 reuse methodology assets |
| Kit | 10 (KT-01…KT-10) | KT-01 | — |
| **Total** | **30** | **4** | **2 (homepage)** |

Coverage cross-check (Task 6): every inventory slot ID maps to a schema-complete
prompt entry; EN/ES label, alt, and caption fields are balanced across all four
prompt files. The two homepage skips are intentional and documented.

> This pack was produced by `PLAN_site_visual_prompt_pack` (a Deep Work Plan).
> Integrating the generated assets into the site is a separate follow-up.
