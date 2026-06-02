# Prompt Pack — Spec Figures

> **Inherits:** [STYLE_GUIDE.md](../STYLE_GUIDE.md) — house style (§1), palette
> (§2), light/dark (§3), typography (§4), dimensions (§5), asset paths (§6),
> EN/ES policy (§7), accessibility (§8), negative boilerplate (§9), schema (§10).
>
> **Register note:** the specification is the **normative** reference. These
> figures must read like figures in an engineering standard — quiet, precise,
> hairline arrows, minimal ornament. No marketing flourish. Even quieter than the
> methodology diagrams.
>
> **Slots covered:** SP-01 … SP-05. SP-02 and SP-03 deliberately **reuse** the
> methodology assets (ME-03, ME-02) to avoid duplicating art — see each entry.

---

### SP-01 — Agent protocol lifecycle

- **Target surface:** `src/content/spec/en/agent-protocol.md` → top of the document (the seven behavioral phases: Onboarding, Planning, Execution, Refinement, Resumption, Communication, Safety), rendered at `/spec/agent-protocol`.
- **Type:** diagram
- **Priority:** high
- **Purpose / trust rationale:** The agent protocol is a behavioral contract. A clean lifecycle figure naming all phases shows the contract is complete and ordered, and that "Safety" governs throughout — reinforcing that autonomy is bounded, not reckless.
- **Aspect & dimensions:** 16:9 · 880 × 495 px displayed · generate @2x (1760 × 990 px)
- **Light/dark strategy:** transparent (ink line art on alpha, invertible).
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched hairlines in a restrained, figure-like register (an engineering-standard plate, not an illustration). Monochrome warm ink (`#1B1A17`) on a **transparent background**, a single **oxblood** (`#7A1F1F`) accent on the "SAFETY" band only. Flat 2D, print-quality, sober. No gradients, no shadows, no 3D, no ornament.
  >
  > **Subject:** A wide 16:9 lifecycle figure. Five sequential phase nodes left-to-right joined by thin ink arrows: **"ONBOARDING"** → **"PLANNING"** → **"EXECUTION"** → **"REFINEMENT"** → **"RESUMPTION"**. A return hairline arrow loops from RESUMPTION back to EXECUTION (the resumable loop). Spanning beneath all five nodes, a full-width labelled band **"SAFETY"** rendered with the lone **oxblood** hairline rule (safety governs every phase). Above the nodes, a thin bracket labelled **"COMMUNICATION"** indicates it runs alongside throughout. Nodes are plain ruled rectangles with small-caps labels; uniform sizing; generous margins. Sober and exact.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy or cluttered backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.
- **In-image text (EN):** ONBOARDING · PLANNING · EXECUTION · REFINEMENT · RESUMPTION · COMMUNICATION · SAFETY
- **In-image text (ES):** INCORPORACIÓN · PLANIFICACIÓN · EJECUCIÓN · REFINAMIENTO · REANUDACIÓN · COMUNICACIÓN · SEGURIDAD
- **Suggested asset path:** `public/images/visuals/spec/agent-lifecycle.webp` (EN) · `public/images/visuals/spec/agent-lifecycle-es.webp` (ES)
- **Alt text (EN):** Lifecycle figure of the agent protocol: Onboarding, Planning, Execution, Refinement, and Resumption in sequence with a loop back to Execution, Communication running throughout, and Safety governing every phase.
- **Alt text (ES):** Figura del ciclo de vida del protocolo del agente: Incorporación, Planificación, Ejecución, Refinamiento y Reanudación en secuencia con un bucle de regreso a Ejecución, Comunicación a lo largo de todo el proceso y Seguridad gobernando cada fase.
- **Caption (EN):** The agent protocol as a lifecycle: ordered phases, a resumable loop, communication throughout, and safety governing every step.
- **Caption (ES):** El protocolo del agente como ciclo de vida: fases ordenadas, un bucle reanudable, comunicación constante y seguridad que gobierna cada paso.
- **Integration note:** `Figure` near the top of the agent-protocol reader. EN/ES asset by page language. `width="880" height="495"`.

---

### SP-02 — Task anatomy (spec register)

- **Target surface:** `src/content/spec/en/dwp-specification.md` → "Task anatomy" section, rendered at `/spec/dwp-specification`.
- **Type:** diagram
- **Priority:** medium
- **Purpose / trust rationale:** Normatively fixes the ordered sections of a task file. Visual repetition of the methodology anatomy figure (ME-03) in the spec reinforces it as the standard, not a one-off teaching aid.
- **Aspect & dimensions:** 16:9 · 880 × 495 px displayed · generate @2x (1760 × 990 px)
- **Light/dark strategy:** transparent (ink on alpha, invertible).
- **Prompt:**
  > **REUSE —** Prefer reusing the methodology asset **ME-03** (`methodology/task-anatomy.webp` / `-es`). If a spec-register variant is wanted (quieter, no oxblood accent, plate-style caption "FIG. — TASK ANATOMY"), regenerate with the ME-03 subject but: remove the oxblood mark, render all nine panels in uniform ink, and add a small-caps plate label. Same nine labels and order as ME-03.
  >
  > **HOUSE STYLE —** Restrained engraving plate, monochrome warm ink (`#1B1A17`) on a **transparent background**, no accent. Flat 2D, sober. No gradients, no shadows, no 3D.
  >
  > **Subject:** Nine numbered panels in one horizontal row, joined by short right-pointing arrows, under a small-caps plate label **"TASK ANATOMY"**: **1 GOAL · 2 CONTEXT · 3 STEPS · 4 ACCEPTANCE CRITERIA · 5 VALIDATION · 6 FILES · 7 DEPENDENCIES · 8 RISKS · 9 COMPLETION & LOG**. Outline only, uniform sizing.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon, drop shadows, busy backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, corporate-memphis vector, clip-art, emoji.
- **In-image text (EN):** TASK ANATOMY · 1 GOAL · 2 CONTEXT · 3 STEPS · 4 ACCEPTANCE CRITERIA · 5 VALIDATION · 6 FILES · 7 DEPENDENCIES · 8 RISKS · 9 COMPLETION & LOG
- **In-image text (ES):** ANATOMÍA DE LA TAREA · 1 OBJETIVO · 2 CONTEXTO · 3 PASOS · 4 CRITERIOS DE ACEPTACIÓN · 5 VALIDACIÓN · 6 ARCHIVOS · 7 DEPENDENCIAS · 8 RIESGOS · 9 FINALIZACIÓN Y REGISTRO
- **Suggested asset path:** reuse `methodology/task-anatomy.webp` — or `public/images/visuals/spec/task-anatomy-spec.webp` (+ `-es`) for the variant
- **Alt text (EN):** Figure of the nine ordered task-file sections: Goal, Context, Steps, Acceptance Criteria, Validation, Files, Dependencies, Risks, and Completion & Log.
- **Alt text (ES):** Figura de las nueve secciones ordenadas de un archivo de tarea: Objetivo, Contexto, Pasos, Criterios de aceptación, Validación, Archivos, Dependencias, Riesgos y Finalización y registro.
- **Caption (EN):** Normative task anatomy: every task file declares these nine sections in order.
- **Caption (ES):** Anatomía normativa de la tarea: cada archivo de tarea declara estas nueve secciones en orden.
- **Integration note:** Prefer reusing ME-03 to keep one canonical figure; only generate the variant if the spec page needs the quieter plate styling. `width="880" height="495"`.

---

### SP-03 — Five-operation execution loop (spec register)

- **Target surface:** `src/content/spec/en/dwp-specification.md` → "The execution loop" section, rendered at `/spec/dwp-specification`.
- **Type:** diagram
- **Priority:** medium
- **Purpose / trust rationale:** Normatively fixes the operation cycle. Reusing the methodology core-loop figure (ME-02) in the spec asserts it as the standard cycle.
- **Aspect & dimensions:** 1:1 · 640 × 640 px displayed · generate @2x (1280 × 1280 px)
- **Light/dark strategy:** transparent (ink on alpha, invertible).
- **Prompt:**
  > **REUSE —** Prefer reusing the methodology asset **ME-02** (`methodology/core-loop.webp` / `-es`). If a spec-register variant is wanted, regenerate the ME-02 subject as a quieter plate: remove the oxblood spoke (render Verify in plain ink), add a small-caps plate label **"EXECUTION LOOP"**. Same node labels and clockwise order.
  >
  > **HOUSE STYLE —** Restrained engraving plate, monochrome warm ink (`#1B1A17`) on a **transparent background**, no accent (or a single hairline). Flat 2D, sober. No gradients, no shadows, no 3D.
  >
  > **Subject:** A circular flow with five outer nodes clockwise — **"CREATE" → "EXECUTE" → "REFINE" → "RESUME" → "STATUS"** — and **"VERIFY"** at the centre on a dashed spoke. Outline nodes, ink arrows, plate label **"EXECUTION LOOP"**.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon, drop shadows, busy backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, corporate-memphis vector, clip-art, emoji.
- **In-image text (EN):** EXECUTION LOOP · CREATE · EXECUTE · REFINE · RESUME · STATUS · VERIFY
- **In-image text (ES):** BUCLE DE EJECUCIÓN · CREAR · EJECUTAR · REFINAR · REANUDAR · ESTADO · VERIFICAR
- **Suggested asset path:** reuse `methodology/core-loop.webp` — or `public/images/visuals/spec/five-operations.webp` (+ `-es`) for the variant
- **Alt text (EN):** Circular figure of the five-operation execution loop — Create, Execute, Refine, Resume, Status — with Verify at the centre.
- **Alt text (ES):** Figura circular del bucle de ejecución de cinco operaciones — Crear, Ejecutar, Refinar, Reanudar, Estado — con Verificar en el centro.
- **Caption (EN):** Normative execution loop: five operations cycle a plan to completion; Verify checks conformance.
- **Caption (ES):** Bucle de ejecución normativo: cinco operaciones llevan un plan a su finalización; Verificar comprueba la conformidad.
- **Integration note:** Prefer reusing ME-02. Generate the variant only if the spec page needs the plate styling without the accent. `width="640" height="640"`.

---

### SP-04 — Output workspace tree (`.dwp/`)

- **Target surface:** `src/content/spec/en/dwp-specification.md` → "Output workspace" section, rendered at `/spec/dwp-specification`.
- **Type:** diagram
- **Priority:** medium
- **Purpose / trust rationale:** Fixes the gitignored `.dwp/` workspace layout — `drafts/` and `plans/PLAN_<name>/` with its analysis outputs. Distinct from the methodology plan-tree (ME-04), this view is the **workspace root** (drafts + plans siblings), showing where every artifact lives and that it is disposable/gitignored.
- **Aspect & dimensions:** 16:9 · 880 × 495 px displayed · generate @2x (1760 × 990 px)
- **Light/dark strategy:** transparent (ink on alpha, invertible).
- **Prompt:**
  > **HOUSE STYLE —** Restrained engraving plate, monochrome warm ink (`#1B1A17`) on a **transparent background**, a single **oxblood** (`#7A1F1F`) mark on the "gitignored" annotation only. Flat 2D, sober, engraved hairline tree branches (not rounded connectors). No gradients, no shadows, no 3D.
  >
  > **Subject:** A 16:9 file-system tree, left-aligned, plate label **"OUTPUT WORKSPACE"** as a small-caps kicker. Root node **".dwp/"** with a small **oxblood** annotation in italics: *"gitignored · disposable"*. Two child branches: **"drafts/"** (annotation: *"refined draft staging"*) and **"plans/"**. Under `plans/`, one node **"PLAN_<name>/"** with leaf children: **"README.md"**, **"PROGRESS.md"**, **"N.task_<slug>.md"**, and a sub-node **"analysis_results/"** containing **"EXECUTIVE_REPORT.md"**. Engraved hairline tree rules; generous right-side margin; outline only.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon, drop shadows, busy backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, corporate-memphis vector, clip-art, emoji.
- **In-image text (EN):** OUTPUT WORKSPACE · .dwp/ · gitignored · disposable · drafts/ · refined draft staging · plans/ · PLAN_<name>/ · README.md · PROGRESS.md · N.task_<slug>.md · analysis_results/ · EXECUTIVE_REPORT.md
- **In-image text (ES):** ESPACIO DE TRABAJO DE SALIDA · .dwp/ · ignorado por git · desechable · drafts/ · preparación del borrador refinado · plans/ · PLAN_<name>/ · README.md · PROGRESS.md · N.task_<slug>.md · analysis_results/ · EXECUTIVE_REPORT.md
- **Suggested asset path:** `public/images/visuals/spec/output-workspace.webp` (EN) · `public/images/visuals/spec/output-workspace-es.webp` (ES)
- **Alt text (EN):** File tree of the gitignored .dwp/ output workspace: a drafts/ folder and a plans/ folder containing PLAN_name/ with README, PROGRESS, task files, and an analysis_results folder holding the executive report.
- **Alt text (ES):** Árbol de archivos del espacio de trabajo de salida .dwp/ (ignorado por git): una carpeta drafts/ y una carpeta plans/ que contiene PLAN_name/ con README, PROGRESS, archivos de tarea y una carpeta analysis_results con el informe ejecutivo.
- **Caption (EN):** All plan output lives under a gitignored `.dwp/` workspace — drafts and plans kept separate from tracked source.
- **Caption (ES):** Toda la salida de los planes reside en un espacio de trabajo `.dwp/` ignorado por git — borradores y planes separados del código versionado.
- **Integration note:** `Figure` in the "Output workspace" section. EN/ES asset by page language. `width="880" height="495"`.

---

### SP-05 — Archetype classification (spec register)

- **Target surface:** `src/content/spec/en/archetypes.md` → "Classification heuristic" section, rendered at `/spec/archetypes`.
- **Type:** diagram
- **Priority:** medium
- **Purpose / trust rationale:** Normatively fixes the individual-vs-orchestrator classification. A quiet decision figure (companion to methodology ME-06, in the standard's register) makes the heuristic unambiguous.
- **Aspect & dimensions:** 1:1 · 640 × 640 px displayed · generate @2x (1280 × 1280 px)
- **Light/dark strategy:** transparent (ink on alpha, invertible).
- **Prompt:**
  > **REUSE —** May reuse the methodology asset **ME-06** (`methodology/archetypes-tree.webp` / `-es`). If a spec-register variant is wanted: drop the oxblood border (render the hub box in plain ink), add a small-caps plate label **"CLASSIFICATION"**, keep the same decision and labels.
  >
  > **HOUSE STYLE —** Restrained engraving plate, monochrome warm ink (`#1B1A17`) on a **transparent background**, no accent. Flat 2D, sober. No gradients, no shadows, no 3D.
  >
  > **Subject:** A square decision figure: root **"REPOSITORY"** → diamond **"multiple nested repos or hub registry?"** → **"NO"** to **"INDIVIDUAL REPOSITORY"**, **"YES"** to **"ORCHESTRATOR HUB"**. Plate label **"CLASSIFICATION"**. Outline only, balanced, engraved hairlines.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon, drop shadows, busy backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, corporate-memphis vector, clip-art, emoji.
- **In-image text (EN):** CLASSIFICATION · REPOSITORY · multiple nested repos or hub registry? · NO · YES · INDIVIDUAL REPOSITORY · ORCHESTRATOR HUB
- **In-image text (ES):** CLASIFICACIÓN · REPOSITORIO · ¿múltiples repositorios anidados o registro de hub? · NO · SÍ · REPOSITORIO INDIVIDUAL · HUB ORQUESTADOR
- **Suggested asset path:** reuse `methodology/archetypes-tree.webp` — or `public/images/visuals/spec/archetypes-spec.webp` (+ `-es`) for the variant
- **Alt text (EN):** Decision figure classifying a repository as an Individual Repository or an Orchestrator Hub based on whether it nests multiple repositories or acts as a hub registry.
- **Alt text (ES):** Figura de decisión que clasifica un repositorio como Repositorio Individual o Hub Orquestador según si anida múltiples repositorios o actúa como registro de hub.
- **Caption (EN):** Normative classification: one repository, or a hub coordinating sub-repositories.
- **Caption (ES):** Clasificación normativa: un solo repositorio, o un hub que coordina sub-repositorios.
- **Integration note:** Prefer reusing ME-06; generate the variant only for the quieter spec plate. `width="640" height="640"`.

---

## Coverage (spec)

| ID | Status | Note |
| :-- | :-- | :-- |
| SP-01 | done | new figure (agent lifecycle) |
| SP-02 | done | reuse ME-03 (variant optional) |
| SP-03 | done | reuse ME-02 (variant optional) |
| SP-04 | done | new figure (`.dwp/` workspace root) |
| SP-05 | done | reuse ME-06 (variant optional) |
