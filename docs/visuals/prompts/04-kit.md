# Prompt Pack — Kit Visuals

> **Inherits:** [STYLE_GUIDE.md](../STYLE_GUIDE.md) — house style (§1), palette
> (§2), light/dark (§3), typography (§4), dimensions (§5), asset paths (§6),
> EN/ES policy (§7), accessibility (§8), negative boilerplate (§9), schema (§10).
>
> **Slots covered:** KT-01 … KT-10.
>
> **Flagship:** KT-01 (framework-migration before/after + decomposition).
> **Shared template:** KT-04 … KT-09 (the six `dwp-*` commands) all use ONE
> input → process → output visual language — defined once below, then specialized
> per command so they read as a family.

---

### KT-01 — Framework migration: before / after + decomposition (flagship)

- **Target surface:** `src/content/kit/en/framework-migration.md` → contrasting "Without a plan" vs "As a Deep Work Plan" sections, rendered at `/kit/framework-migration`.
- **Type:** diagram
- **Priority:** flagship
- **Purpose / trust rationale:** The single most persuasive "show, don't tell" visual: one big risky change versus a goal decomposed into ordered, gated, committed tasks. Seeing the decomposition makes the methodology's payoff concrete and earns trust that long-horizon work becomes safe and auditable.
- **Aspect & dimensions:** 16:10 · 960 × 600 px displayed · generate @2x (1920 × 1200 px)
- **Light/dark strategy:** transparent (ink line art on alpha, invertible).
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched hairlines, monochrome warm ink (`#1B1A17`) on a **transparent background**, a single **oxblood** (`#7A1F1F`) accent reserved for the "WITHOUT A PLAN" failure mark. Editorial, flat 2D, print-quality, sober. No gradients, no shadows, no 3D.
  >
  > **Subject:** A wide 16:10 two-panel comparison divided by a thin vertical hairline. **Left panel — "WITHOUT A PLAN":** one large monolithic box labelled "BIG MIGRATION" with many tangled arrows pointing into it at once, an **oxblood** broken/crossed mark (a small ✗ or fracture) at its corner signalling drift and a failed build. Cramped, chaotic but still engraved-clean. **Right panel — "AS A DEEP WORK PLAN":** the same goal broken into a vertical ladder of five small ordered task boxes labelled "TASK 1 … TASK 5", each followed by a small engraved checkmark and a tiny "commit" tick mark, joined top-to-bottom by a single clean spine arrow; a small gate glyph (hexagon) sits between tasks to denote validation gates. Header band over the whole figure: **"ONE BIG CHANGE → ORDERED, GATED TASKS"**. Outline only; the contrast between tangle (left) and ladder (right) must read instantly.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy or cluttered backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.
- **In-image text (EN):** ONE BIG CHANGE → ORDERED, GATED TASKS · WITHOUT A PLAN · BIG MIGRATION · AS A DEEP WORK PLAN · TASK 1 · TASK 2 · TASK 3 · TASK 4 · TASK 5 · commit · gate
- **In-image text (ES):** UN GRAN CAMBIO → TAREAS ORDENADAS Y CON COMPUERTAS · SIN UN PLAN · GRAN MIGRACIÓN · COMO UN DEEP WORK PLAN · TAREA 1 · TAREA 2 · TAREA 3 · TAREA 4 · TAREA 5 · commit · compuerta
- **Suggested asset path:** `public/images/visuals/kit/migration-before-after.webp` (EN) · `public/images/visuals/kit/migration-before-after-es.webp` (ES)
- **Alt text (EN):** Two-panel comparison of a framework migration: without a plan, one big tangled change that fails; as a Deep Work Plan, the goal decomposed into five ordered tasks with validation gates and commits.
- **Alt text (ES):** Comparación de dos paneles de una migración de framework: sin un plan, un gran cambio enredado que falla; como un Deep Work Plan, el objetivo descompuesto en cinco tareas ordenadas con compuertas de validación y commits.
- **Caption (EN):** A migration as one big change drifts and breaks; the same migration as ordered, gated tasks lands safely and auditably.
- **Caption (ES):** Una migración como un único gran cambio se desvía y se rompe; la misma migración como tareas ordenadas y con compuertas llega de forma segura y auditable.
- **Integration note:** `Figure` between the "Without a plan" and "As a Deep Work Plan" sections. EN/ES asset by page language. `width="960" height="600"`.

---

### KT-02 — Before & after: unguided agent vs DWP

- **Target surface:** `src/content/kit/en/before-after.md` → "Before DWP" vs "After DWP" sections, rendered at `/kit/before-after`.
- **Type:** diagram
- **Priority:** high
- **Purpose / trust rationale:** Generalizes the migration story into the core behavioral contrast: an unguided agent drifts and loses context; a DWP-guided agent executes ordered tasks with logged progress and passing gates. High-trust, legible at a glance.
- **Aspect & dimensions:** 16:10 · 960 × 600 px displayed · generate @2x (1920 × 1200 px)
- **Light/dark strategy:** transparent (ink on alpha, invertible).
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving, monochrome warm ink (`#1B1A17`) on a **transparent background**, a single **oxblood** (`#7A1F1F`) accent on the "before" failure mark only. Editorial, flat 2D, print-quality. No gradients, no shadows, no 3D.
  >
  > **Subject:** A 16:10 side-by-side. **Left — "BEFORE DWP":** a single agent figure with a thought-trail that frays and scatters (lost context), an overflowing context-window meter, and an **oxblood** crossed-out build mark ("BUILD ✗"). **Right — "AFTER DWP":** the same agent advancing along a clean numbered track of task cards, each stamped with an engraved check, a small "PROGRESS.md" ledger beside it, and gate hexagons passed ("GATES PASS"). Header band: **"DRIFT → DIRECTED EXECUTION"**. The visual mood: left = scattered, right = orderly. Outline only.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon, drop shadows, busy backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, corporate-memphis vector, clip-art, emoji.
- **In-image text (EN):** DRIFT → DIRECTED EXECUTION · BEFORE DWP · BUILD ✗ · context full · AFTER DWP · PROGRESS.md · GATES PASS
- **In-image text (ES):** DESVÍO → EJECUCIÓN DIRIGIDA · ANTES DE DWP · BUILD ✗ · contexto lleno · DESPUÉS DE DWP · PROGRESS.md · COMPUERTAS OK
- **Suggested asset path:** `public/images/visuals/kit/unguided-vs-dwp.webp` (EN) · `public/images/visuals/kit/unguided-vs-dwp-es.webp` (ES)
- **Alt text (EN):** Side-by-side: before DWP an agent drifts with lost context and a failing build; after DWP the agent advances along ordered tasks with logged progress and passing validation gates.
- **Alt text (ES):** Lado a lado: antes de DWP un agente se desvía con contexto perdido y un build que falla; después de DWP el agente avanza por tareas ordenadas con progreso registrado y compuertas de validación superadas.
- **Caption (EN):** Without structure, agents drift; with a Deep Work Plan, execution is ordered, logged, and gated.
- **Caption (ES):** Sin estructura, los agentes se desvían; con un Deep Work Plan, la ejecución es ordenada, registrada y con compuertas.
- **Integration note:** `Figure` between "Before DWP" and "After DWP". EN/ES asset by page language. `width="960" height="600"`.

---

### KT-03 — Onboarding a legacy service (process flow)

- **Target surface:** `src/content/kit/en/onboard-legacy-service.md` → "The run" section, rendered at `/kit/onboard-legacy-service`.
- **Type:** diagram
- **Priority:** high
- **Purpose / trust rationale:** Shows the non-destructive onboarding of an undocumented repo as a clear four-stage flow, reassuring readers that adoption reasons about the real codebase and verifies the result rather than overwriting.
- **Aspect & dimensions:** 16:9 · 880 × 495 px displayed · generate @2x (1760 × 990 px)
- **Light/dark strategy:** transparent (ink on alpha, invertible).
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched hairlines, monochrome warm ink (`#1B1A17`) on a **transparent background**, a single **oxblood** (`#7A1F1F`) accent on the final "VERIFY" gate. Editorial, flat 2D, print-quality. No gradients, no shadows, no 3D.
  >
  > **Subject:** A 16:9 horizontal four-stage process flow joined by ink arrows: **"ANALYZE"** (a magnifier over a tangled legacy codebase) → **"REASON"** (gears inferring the real stack/commands) → **"ONBOARD (NON-DESTRUCTIVE)"** (documents and an `.agents/` tree added beside untouched existing files) → **"VERIFY"** (a checkmark-in-hexagon gate, the lone **oxblood** mark). Small-caps labels under each stage; a thin note under "ONBOARD" reads *"reconcile, never overwrite"*. Outline only, even spacing, generous margins.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon, drop shadows, busy backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, corporate-memphis vector, clip-art, emoji.
- **In-image text (EN):** ANALYZE · REASON · ONBOARD (NON-DESTRUCTIVE) · reconcile, never overwrite · VERIFY
- **In-image text (ES):** ANALIZAR · RAZONAR · INCORPORAR (NO DESTRUCTIVO) · reconciliar, nunca sobrescribir · VERIFICAR
- **Suggested asset path:** `public/images/visuals/kit/onboard-flow.webp` (EN) · `public/images/visuals/kit/onboard-flow-es.webp` (ES)
- **Alt text (EN):** Four-stage onboarding flow for a legacy service: analyze, reason about the stack, onboard non-destructively (reconcile, never overwrite), and verify.
- **Alt text (ES):** Flujo de incorporación de cuatro etapas para un servicio heredado: analizar, razonar sobre el stack, incorporar de forma no destructiva (reconciliar, nunca sobrescribir) y verificar.
- **Caption (EN):** Legacy onboarding reasons about the real codebase and reconciles rather than overwriting — then verifies conformance.
- **Caption (ES):** La incorporación de código heredado razona sobre el código real y reconcilia en lugar de sobrescribir — luego verifica la conformidad.
- **Integration note:** `Figure` in "The run" section. EN/ES asset by page language. `width="880" height="495"`.

---

## Shared template — command sequences (KT-04 … KT-09)

All six `dwp-*` command visuals use ONE layout so they read as a family: a wide
16:9 three-stage band — **INPUT → PROCESS → OUTPUT** — three outline panels joined
by two ink arrows, a small-caps command title as a kicker top-left (e.g.
`/dwp-create`), and a single **oxblood** accent on the OUTPUT panel. Same panel
sizing, same arrow style, same typography across all six; only the labels and the
small inner glyph change. Asset size for each: 16:9 · 880 × 495 px · @2x
(1760 × 990 px). Light/dark: transparent (ink on alpha, invertible). EN/ES assets
per command. Negative boilerplate (STYLE_GUIDE §9) applies to every one.

> **Reusable prompt skeleton (specialize the bracketed parts per command):**
>
> **HOUSE STYLE —** Fine ink-line engraving / etched hairlines, monochrome warm ink (`#1B1A17`) on a **transparent background**, one **oxblood** (`#7A1F1F`) accent on the OUTPUT panel only. Editorial, flat 2D, print-quality, sober. No gradients, no shadows, no 3D. **Subject:** a wide 16:9 three-panel band — **INPUT → PROCESS → OUTPUT** — outline panels joined by two right-pointing ink arrows; kicker top-left reads **"[/command]"** in small-caps; INPUT panel shows **"[input label + glyph]"**, PROCESS panel shows **"[process label + glyph]"**, OUTPUT panel (oxblood-accented) shows **"[output label + glyph]"**. Uniform sizing, generous margins, outline only. **AVOID —** gradients, 3D, photographic realism, neon, drop shadows, busy backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, corporate-memphis vector, clip-art, emoji.

---

### KT-04 — `/dwp-create`

- **Target surface:** `src/content/kit/en/dwp-create.md` → top of the doc, rendered at `/kit/dwp-create`.
- **Type:** diagram · **Priority:** medium
- **Purpose / trust rationale:** Shows create turns a goal into a structured plan on disk.
- **Aspect & dimensions:** 16:9 · 880 × 495 · @2x (1760 × 990)
- **Light/dark strategy:** transparent (invertible)
- **Prompt:** Use the shared skeleton with: kicker **"/dwp-create"**; INPUT = **"GOAL + CONTEXT"** (a target glyph); PROCESS = **"DECOMPOSE → REFINED DRAFT"** (branching glyph); OUTPUT = **"PLAN ON DISK"** (a `PLAN_<name>/` folder glyph, oxblood).
- **In-image text (EN):** /dwp-create · GOAL + CONTEXT · DECOMPOSE → REFINED DRAFT · PLAN ON DISK
- **In-image text (ES):** /dwp-create · OBJETIVO + CONTEXTO · DESCOMPONER → BORRADOR REFINADO · PLAN EN DISCO
- **Suggested asset path:** `public/images/visuals/kit/cmd-create.webp` (+ `-es`)
- **Alt text (EN):** Input-process-output figure for dwp-create: a goal and context are decomposed into a refined draft, producing a plan on disk.
- **Alt text (ES):** Figura entrada-proceso-salida de dwp-create: un objetivo y contexto se descomponen en un borrador refinado, produciendo un plan en disco.
- **Caption (EN):** `/dwp-create` turns a goal into an ordered plan.
- **Caption (ES):** `/dwp-create` convierte un objetivo en un plan ordenado.
- **Integration note:** `Figure` at the top of the dwp-create doc. `width="880" height="495"`.

---

### KT-05 — `/dwp-execute`

- **Target surface:** `src/content/kit/en/dwp-execute.md` → top of the doc, rendered at `/kit/dwp-execute`.
- **Type:** diagram · **Priority:** medium
- **Purpose / trust rationale:** Shows execute runs tasks one at a time with validation and commits.
- **Aspect & dimensions:** 16:9 · 880 × 495 · @2x (1760 × 990)
- **Light/dark strategy:** transparent (invertible)
- **Prompt:** Shared skeleton with: kicker **"/dwp-execute"**; INPUT = **"PLAN"** (folder glyph); PROCESS = **"TASK → VALIDATE → COMMIT (loop)"** (a small loop glyph with a gate hexagon); OUTPUT = **"COMPLETED, COMMITTED WORK"** (checked task stack, oxblood).
- **In-image text (EN):** /dwp-execute · PLAN · TASK → VALIDATE → COMMIT · COMPLETED, COMMITTED WORK
- **In-image text (ES):** /dwp-execute · PLAN · TAREA → VALIDAR → COMMIT · TRABAJO COMPLETADO Y CONFIRMADO
- **Suggested asset path:** `public/images/visuals/kit/cmd-execute.webp` (+ `-es`)
- **Alt text (EN):** Input-process-output figure for dwp-execute: a plan runs task by task through validate-and-commit, producing completed, committed work.
- **Alt text (ES):** Figura entrada-proceso-salida de dwp-execute: un plan se ejecuta tarea por tarea mediante validar-y-confirmar, produciendo trabajo completado y confirmado.
- **Caption (EN):** `/dwp-execute` runs the plan task by task, validating and committing each.
- **Caption (ES):** `/dwp-execute` ejecuta el plan tarea por tarea, validando y confirmando cada una.
- **Integration note:** `Figure` at the top of the dwp-execute doc. `width="880" height="495"`.

---

### KT-06 — `/dwp-refine`

- **Target surface:** `src/content/kit/en/dwp-refine.md` → top of the doc, rendered at `/kit/dwp-refine`.
- **Type:** diagram · **Priority:** medium
- **Purpose / trust rationale:** Shows refine modifies a draft or plan while preserving completed work.
- **Aspect & dimensions:** 16:9 · 880 × 495 · @2x (1760 × 990)
- **Light/dark strategy:** transparent (invertible)
- **Prompt:** Shared skeleton with: kicker **"/dwp-refine"**; INPUT = **"DRAFT OR PLAN"** (document glyph); PROCESS = **"MODIFY · PRESERVE DONE TASKS"** (an edit glyph beside locked/checked tasks); OUTPUT = **"REVISED PLAN"** (updated folder, oxblood).
- **In-image text (EN):** /dwp-refine · DRAFT OR PLAN · MODIFY · PRESERVE DONE TASKS · REVISED PLAN
- **In-image text (ES):** /dwp-refine · BORRADOR O PLAN · MODIFICAR · PRESERVAR TAREAS HECHAS · PLAN REVISADO
- **Suggested asset path:** `public/images/visuals/kit/cmd-refine.webp` (+ `-es`)
- **Alt text (EN):** Input-process-output figure for dwp-refine: a draft or plan is modified while completed tasks are preserved, producing a revised plan.
- **Alt text (ES):** Figura entrada-proceso-salida de dwp-refine: un borrador o plan se modifica preservando las tareas completadas, produciendo un plan revisado.
- **Caption (EN):** `/dwp-refine` edits the plan without losing completed work.
- **Caption (ES):** `/dwp-refine` edita el plan sin perder el trabajo completado.
- **Integration note:** `Figure` at the top of the dwp-refine doc. `width="880" height="495"`.

---

### KT-07 — `/dwp-resume`

- **Target surface:** `src/content/kit/en/dwp-resume.md` → top of the doc, rendered at `/kit/dwp-resume`.
- **Type:** diagram · **Priority:** medium
- **Purpose / trust rationale:** Shows resume reconstructs state from disk and continues from the first unfinished task.
- **Aspect & dimensions:** 16:9 · 880 × 495 · @2x (1760 × 990)
- **Light/dark strategy:** transparent (invertible)
- **Prompt:** Shared skeleton with: kicker **"/dwp-resume"**; INPUT = **"INTERRUPTED PLAN"** (a plan with a broken/paused mark); PROCESS = **"READ STATE · FIND FIRST [ ] TASK"** (a checkbox list with cursor on the first empty box); OUTPUT = **"EXECUTION CONTINUES"** (arrow resuming along the track, oxblood).
- **In-image text (EN):** /dwp-resume · INTERRUPTED PLAN · READ STATE · FIND FIRST [ ] TASK · EXECUTION CONTINUES
- **In-image text (ES):** /dwp-resume · PLAN INTERRUMPIDO · LEER ESTADO · ENCONTRAR PRIMERA TAREA [ ] · LA EJECUCIÓN CONTINÚA
- **Suggested asset path:** `public/images/visuals/kit/cmd-resume.webp` (+ `-es`)
- **Alt text (EN):** Input-process-output figure for dwp-resume: an interrupted plan has its state read to find the first unchecked task, and execution continues.
- **Alt text (ES):** Figura entrada-proceso-salida de dwp-resume: a un plan interrumpido se le lee el estado para encontrar la primera tarea sin marcar, y la ejecución continúa.
- **Caption (EN):** `/dwp-resume` reconstructs state and continues from the first unfinished task.
- **Caption (ES):** `/dwp-resume` reconstruye el estado y continúa desde la primera tarea sin terminar.
- **Integration note:** `Figure` at the top of the dwp-resume doc. `width="880" height="495"`.

---

### KT-08 — `/dwp-verify`

- **Target surface:** `src/content/kit/en/dwp-verify.md` → top of the doc, rendered at `/kit/dwp-verify`.
- **Type:** diagram · **Priority:** medium
- **Purpose / trust rationale:** Shows verify checks a repository or plan against the spec and emits a pass/fail report.
- **Aspect & dimensions:** 16:9 · 880 × 495 · @2x (1760 × 990)
- **Light/dark strategy:** transparent (invertible)
- **Prompt:** Shared skeleton with: kicker **"/dwp-verify"**; INPUT = **"REPOSITORY OR PLAN"** (folder glyph); PROCESS = **"CHECK AGAINST SPEC"** (a checklist against a standard plate); OUTPUT = **"PASS / FAIL REPORT"** (a report with a check and a cross, oxblood).
- **In-image text (EN):** /dwp-verify · REPOSITORY OR PLAN · CHECK AGAINST SPEC · PASS / FAIL REPORT
- **In-image text (ES):** /dwp-verify · REPOSITORIO O PLAN · COMPROBAR CONTRA LA ESPECIFICACIÓN · INFORME APROBADO / FALLIDO
- **Suggested asset path:** `public/images/visuals/kit/cmd-verify.webp` (+ `-es`)
- **Alt text (EN):** Input-process-output figure for dwp-verify: a repository or plan is checked against the specification, producing a pass/fail conformance report.
- **Alt text (ES):** Figura entrada-proceso-salida de dwp-verify: un repositorio o plan se comprueba contra la especificación, produciendo un informe de conformidad aprobado/fallido.
- **Caption (EN):** `/dwp-verify` produces an objective pass/fail report against the spec.
- **Caption (ES):** `/dwp-verify` produce un informe objetivo de aprobado/fallido contra la especificación.
- **Integration note:** `Figure` at the top of the dwp-verify doc. `width="880" height="495"`.

---

### KT-09 — `/dwp-status`

- **Target surface:** `src/content/kit/en/dwp-status.md` → top of the doc, rendered at `/kit/dwp-status`.
- **Type:** diagram · **Priority:** medium
- **Purpose / trust rationale:** Shows status reports progress without executing — a read-only view.
- **Aspect & dimensions:** 16:9 · 880 × 495 · @2x (1760 × 990)
- **Light/dark strategy:** transparent (invertible)
- **Prompt:** Shared skeleton with: kicker **"/dwp-status"**; INPUT = **"PLAN"** (folder glyph); PROCESS = **"READ CHECKBOXES + GIT LOG (no execution)"** (an eye/read glyph over a checkbox list); OUTPUT = **"STATUS REPORT"** (a progress summary with a count like "3/8", oxblood). Add a small "read-only" tag.
- **In-image text (EN):** /dwp-status · PLAN · READ CHECKBOXES + GIT LOG · read-only · STATUS REPORT · 3/8
- **In-image text (ES):** /dwp-status · PLAN · LEER CASILLAS + REGISTRO GIT · solo lectura · INFORME DE ESTADO · 3/8
- **Suggested asset path:** `public/images/visuals/kit/cmd-status.webp` (+ `-es`)
- **Alt text (EN):** Input-process-output figure for dwp-status: a plan's checkboxes and git log are read without executing, producing a status report.
- **Alt text (ES):** Figura entrada-proceso-salida de dwp-status: se leen las casillas y el registro git de un plan sin ejecutar, produciendo un informe de estado.
- **Caption (EN):** `/dwp-status` reports progress read-only — it never executes tasks.
- **Caption (ES):** `/dwp-status` informa del progreso en modo solo lectura — nunca ejecuta tareas.
- **Integration note:** `Figure` at the top of the dwp-status doc. `width="880" height="495"`.

---

### KT-10 — Kit composition overview

- **Target surface:** the kit index page (`KitPage.astro` / `/kit`) — how presets, adapters, commands, and addons compose into an installed kit.
- **Type:** diagram
- **Priority:** high
- **Purpose / trust rationale:** Orients visitors to the kit catalog: the four kinds of building block and how they assemble into the kit installed in a repository. A clear composition diagram makes the catalog feel designed and navigable.
- **Aspect & dimensions:** 16:9 · 880 × 495 px displayed · generate @2x (1760 × 990 px)
- **Light/dark strategy:** transparent (ink on alpha, invertible).
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched hairlines, monochrome warm ink (`#1B1A17`) on a **transparent background**, a single **oxblood** (`#7A1F1F`) accent on the assembled "INSTALLED KIT" node. Editorial, flat 2D, print-quality. No gradients, no shadows, no 3D.
  >
  > **Subject:** A 16:9 composition diagram. Four labelled source blocks on the left, stacked: **"PRESETS"**, **"ADAPTERS"**, **"COMMANDS"**, **"ADD-ONS"**, each with a tiny engraved glyph (a preset card, a plug, a slash-command chevron, a puzzle piece). Ink arrows from all four converge to the right into a single larger node **"INSTALLED KIT"** (the lone **oxblood** outline), which in turn points to a small repository glyph labelled **"YOUR REPOSITORY"**. Small-caps labels; outline only; balanced left-to-right flow; generous margins.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon, drop shadows, busy backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, corporate-memphis vector, clip-art, emoji.
- **In-image text (EN):** PRESETS · ADAPTERS · COMMANDS · ADD-ONS · INSTALLED KIT · YOUR REPOSITORY
- **In-image text (ES):** PRESETS · ADAPTADORES · COMANDOS · COMPLEMENTOS · KIT INSTALADO · TU REPOSITORIO
- **Suggested asset path:** `public/images/visuals/kit/kit-composition.webp` (EN) · `public/images/visuals/kit/kit-composition-es.webp` (ES)
- **Alt text (EN):** Composition diagram: presets, adapters, commands, and add-ons combine into an installed kit that is applied to your repository.
- **Alt text (ES):** Diagrama de composición: presets, adaptadores, comandos y complementos se combinan en un kit instalado que se aplica a tu repositorio.
- **Caption (EN):** The kit composes presets, adapters, commands, and add-ons into one installed kit for your repository.
- **Caption (ES):** El kit compone presets, adaptadores, comandos y complementos en un único kit instalado para tu repositorio.
- **Integration note:** `Figure` near the top of the kit index page. EN/ES asset by page language. `width="880" height="495"`.

---

## Coverage (kit)

| ID | Status | ID | Status |
| :-- | :-- | :-- | :-- |
| KT-01 | done (flagship) | KT-06 | done (shared template) |
| KT-02 | done | KT-07 | done (shared template) |
| KT-03 | done | KT-08 | done (shared template) |
| KT-04 | done (shared template) | KT-09 | done (shared template) |
| KT-05 | done (shared template) | KT-10 | done |
