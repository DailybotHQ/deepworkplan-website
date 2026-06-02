# Prompt Pack — Methodology Diagrams

> **Inherits:** [STYLE_GUIDE.md](../STYLE_GUIDE.md) — house style block (§1), palette (§2),
> light/dark strategy (§3), typography rules (§4), dimensions (§5), asset paths (§6),
> bilingual EN/ES policy (§7), accessibility (§8), negative boilerplate (§9), and
> prompt entry schema (§10). Every entry below is schema-complete. Each **Prompt**
> field is copy-paste-ready; paste it directly to an image-generation agent.
>
> **Slots covered:** ME-01 · ME-02 · ME-03 · ME-04 · ME-05 · ME-06 (all six
> methodology slots from VISUAL_INVENTORY.md).
>
> **Flagships:** ME-01 (repo-as-harness architecture diagram) and ME-02 (core-loop
> circular flow) receive the richest treatment. Both carry the full EN + ES label sets
> with correct Spanish diacritics.

---

### ME-01 — Repository as harness

- **Target surface:** `src/content/methodology/en/01-manifesto.md` → "The repository becomes the harness" section (the five-element table: Context, Tools, Control loop, Guardrails, State/Resumability), rendered in the Methodology reader at `/methodology/manifesto`
- **Type:** diagram
- **Priority:** flagship
- **Purpose / trust rationale:** Makes the central conceptual claim of the manifesto concrete and visual — the repository is not a passive store of code but an active harness that encapsulates everything an agent needs. Readers can see at a glance the five constituent elements and understand how they compose around the agent. A clean architecture diagram builds trust that the methodology is designed, not improvised.
- **Aspect & dimensions:** 1:1 · 640 × 640 px displayed · generate @2x (1280 × 1280 px)
- **Light/dark strategy:** transparent (ink line art on transparent canvas, ink color `#1B1A17`; CSS `invert(1) sepia(…)` filter or dark-mode CSS applied by the site to recolor for dark backgrounds; the integrator records this in the component)
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome warm ink (`#1B1A17`) drawn on a **transparent background** (no paper fill — pure alpha channel ground), with a single restrained **oxblood** accent (`#7A1F1F`) used only for one or two small emphasis marks — never as a fill. Calm, authoritative, editorial. Sharp, legible, print-quality line work. Flat 2D, no perspective tricks, no gradients, no drop shadows, no glossy 3D.
  >
  > **Subject:** An architecture diagram — square composition, 1:1 — showing a large outer rectangle labelled **"REPOSITORY"** (small-caps, centred top edge, hairline border). Inside this outer rectangle, five smaller labelled boxes are arranged symmetrically in two rows: top row (left to right) **"CONTEXT"**, **"TOOLS"**, **"CONTROL LOOP"**; bottom row **"GUARDRAILS"**, **"STATE / RESUMABILITY"**. Each box is rendered as a fine ruled panel with its label in small-caps inside. Thin ink arrows connect each box to a central node — a small solid diamond or gear glyph — located at the geometric centre. From that central node, a single bold arrow with an **oxblood arrowhead** points outward (downward or to the right) to a small figure representing **"AGENT"** (a simplified person icon or compact labelled oval), positioned just outside the outer rectangle. The outer rectangle's border is heavier than the inner-box borders to read as a containing structure. A single hairline oxblood rule underscores the "REPOSITORY" label at the top. No extra decoration; generous internal margins; all labels in an editorial serif with small-caps kickers.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy or cluttered backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.
- **In-image text (EN):** REPOSITORY · CONTEXT · TOOLS · CONTROL LOOP · GUARDRAILS · STATE / RESUMABILITY · AGENT
- **In-image text (ES):** REPOSITORIO · CONTEXTO · HERRAMIENTAS · BUCLE DE CONTROL · BARRERAS · ESTADO / REANUDABILIDAD · AGENTE
- **Suggested asset path:** `public/images/visuals/methodology/repo-as-harness.webp` (EN) · `public/images/visuals/methodology/repo-as-harness-es.webp` (ES)
- **Alt text (EN):** Architecture diagram showing the repository enclosing five harness elements — Context, Tools, Control Loop, Guardrails, and State/Resumability — with an arrow pointing outward to the Agent that pilots it.
- **Alt text (ES):** Diagrama de arquitectura que muestra el repositorio como contenedor de cinco elementos de harness — Contexto, Herramientas, Bucle de control, Barreras y Estado/Reanudabilidad — con una flecha hacia el Agente que lo opera.
- **Caption (EN):** The repository as harness: five structural elements that give any agent the context, tools, and control it needs to operate autonomously.
- **Caption (ES):** El repositorio como harness: cinco elementos estructurales que proveen al agente el contexto, las herramientas y el control necesarios para operar de forma autónoma.
- **Integration note:** Drop in as a `Figure` component in the manifesto reader immediately after the five-element table ("The repository becomes the harness"). EN page uses `repo-as-harness.webp`; ES page uses `repo-as-harness-es.webp`. Width/height attributes: `width="640" height="640"`.

---

### ME-02 — Core loop

- **Target surface:** `src/content/methodology/en/02-core-loop.md` → "The operations" section, rendered in the Methodology reader at `/methodology/core-loop`
- **Type:** diagram
- **Priority:** flagship
- **Purpose / trust rationale:** The five-operation loop (create → execute → refine → resume → status) plus verify is the operational spine of DWP. A circular flow makes the loop immediately legible and reinforces that execution is resumable and iterative — not a one-shot waterfall. Seeing the loop as a diagram accelerates comprehension and anchors subsequent reading of each operation's prose.
- **Aspect & dimensions:** 1:1 · 640 × 640 px displayed · generate @2x (1280 × 1280 px)
- **Light/dark strategy:** transparent (same as ME-01; ink on alpha, invertible for dark mode)
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome warm ink (`#1B1A17`) drawn on a **transparent background** (pure alpha channel ground), with a single restrained **oxblood** accent (`#7A1F1F`) used only for one or two emphasis marks — never as a fill. Calm, authoritative, editorial. Flat 2D, no perspective tricks, no gradients, no drop shadows, no glossy 3D.
  >
  > **Subject:** A circular flow diagram — square 1:1 composition — with five primary nodes arranged clockwise on an invisible circle: **"CREATE"** at 12 o'clock, **"EXECUTE"** at roughly 2 o'clock, **"RESUME"** at 4 o'clock, **"STATUS"** at 8 o'clock, **"REFINE"** at 10 o'clock. Each node is a small rounded rectangle with its label in small-caps editorial serif inside. Bold ink arrows with clear arrowheads connect adjacent nodes clockwise, tracing the loop. A sixth node, **"VERIFY"**, sits at the geometric centre of the circle — smaller than the ring nodes, rendered as a hexagonal or diamond badge — connected to the ring by a single dashed hairline spoke with an **oxblood arrowhead** (oxblood used exclusively on this one arrow to mark verify as the conformance check that is apart from the main flow). A thin ink circle traces the path of the outer nodes. All five outer arrows flow clockwise. Generous margins. No filled grounds inside the nodes — outline panels only.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy or cluttered backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.
- **In-image text (EN):** CREATE · EXECUTE · REFINE · RESUME · STATUS · VERIFY
- **In-image text (ES):** CREAR · EJECUTAR · REFINAR · REANUDAR · ESTADO · VERIFICAR
- **Suggested asset path:** `public/images/visuals/methodology/core-loop.webp` (EN) · `public/images/visuals/methodology/core-loop-es.webp` (ES)
- **Alt text (EN):** Circular flow diagram of the DWP core loop: Create, Execute, Refine, Resume, and Status arranged clockwise, with Verify at the centre as the conformance check.
- **Alt text (ES):** Diagrama de flujo circular del bucle principal de DWP: Crear, Ejecutar, Refinar, Reanudar y Estado dispuestos en sentido horario, con Verificar en el centro como comprobación de conformidad.
- **Caption (EN):** The DWP core loop: five operations that move a plan from goal to completed work, with Verify as the conformance gate.
- **Caption (ES):** El bucle principal de DWP: cinco operaciones que llevan un plan desde el objetivo hasta el trabajo completado, con Verificar como puerta de conformidad.
- **Integration note:** Drop in as a `Figure` component in the core-loop reader immediately before or after the "The operations" bullet list. EN page uses `core-loop.webp`; ES page uses `core-loop-es.webp`. Width/height attributes: `width="640" height="640"`.

---

### ME-03 — Task anatomy

- **Target surface:** `src/content/methodology/en/02-core-loop.md` → "The nine-section task anatomy" section, rendered in the Methodology reader at `/methodology/core-loop`
- **Type:** diagram
- **Priority:** high
- **Purpose / trust rationale:** The nine ordered sections of a task file are the atomic unit of DWP execution. A horizontal diagram that names all nine sections in sequence shows readers the completeness and regularity of the structure — every task is self-contained and reviewable, with no guesswork about what goes where.
- **Aspect & dimensions:** 16:9 · 880 × 495 px displayed · generate @2x (1760 × 990 px)
- **Light/dark strategy:** transparent (ink line art on alpha channel, invertible)
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome warm ink (`#1B1A17`) on a **transparent background**, with a single **oxblood** accent (`#7A1F1F`) on one emphasis mark only. Flat 2D, editorial, print-quality. No gradients, no shadows, no 3D.
  >
  > **Subject:** A wide horizontal diagram — 16:9 — showing nine numbered panels in a single horizontal row from left to right, each panel representing one section of a DWP task file. The panels are narrow vertical rectangles connected by short horizontal arrows pointing right. Label each panel with its number (1 through 9) at the top in a small tabular numeral and its section name below in small-caps editorial serif. The nine labels in order: **1 GOAL · 2 CONTEXT · 3 STEPS · 4 ACCEPTANCE CRITERIA · 5 VALIDATION · 6 FILES · 7 DEPENDENCIES · 8 RISKS · 9 COMPLETION & LOG**. Use a single **oxblood** hairline rule or bracket on panel **9 COMPLETION & LOG** to mark it as the status-bearing terminal section. The panels are outline-only (no fills), uniformly sized. Above the row, a light hairline arch or brace spanning all nine panels carries the label **"TASK FILE"** in small-caps. Generous margins top and bottom.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy or cluttered backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.
- **In-image text (EN):** TASK FILE · 1 GOAL · 2 CONTEXT · 3 STEPS · 4 ACCEPTANCE CRITERIA · 5 VALIDATION · 6 FILES · 7 DEPENDENCIES · 8 RISKS · 9 COMPLETION & LOG
- **In-image text (ES):** ARCHIVO DE TAREA · 1 OBJETIVO · 2 CONTEXTO · 3 PASOS · 4 CRITERIOS DE ACEPTACIÓN · 5 VALIDACIÓN · 6 ARCHIVOS · 7 DEPENDENCIAS · 8 RIESGOS · 9 FINALIZACIÓN Y REGISTRO
- **Suggested asset path:** `public/images/visuals/methodology/task-anatomy.webp` (EN) · `public/images/visuals/methodology/task-anatomy-es.webp` (ES)
- **Alt text (EN):** Horizontal diagram of the nine task-file sections in order: Goal, Context, Steps, Acceptance Criteria, Validation, Files, Dependencies, Risks, and Completion & Log.
- **Alt text (ES):** Diagrama horizontal de las nueve secciones de un archivo de tarea en orden: Objetivo, Contexto, Pasos, Criterios de aceptación, Validación, Archivos, Dependencias, Riesgos y Finalización y registro.
- **Caption (EN):** Every DWP task file follows the same nine-section structure, guaranteeing each unit of work is self-contained and reviewable.
- **Caption (ES):** Cada archivo de tarea de DWP sigue la misma estructura de nueve secciones, lo que garantiza que cada unidad de trabajo sea autónoma y revisable.
- **Integration note:** Drop in as a `Figure` component immediately below the "The nine-section task anatomy" heading in the core-loop reader. EN page uses `task-anatomy.webp`; ES page uses `task-anatomy-es.webp`. Width/height attributes: `width="880" height="495"`.

---

### ME-04 — Plan directory tree

- **Target surface:** `src/content/methodology/en/03-templates.md` → "Plan structure" section and the code block showing `.dwp/plans/PLAN_<slug>/` layout, rendered in the Methodology reader at `/methodology/plan-and-task-templates`
- **Type:** diagram
- **Priority:** medium
- **Purpose / trust rationale:** Shows the concrete on-disk shape of a DWP plan — the `.dwp/` parent, the `PLAN_<slug>/` directory, and its three constituent files (README, PROGRESS, task files). Readers who see the file tree before reading the prose absorb the structure faster and trust that the methodology produces a tangible, inspectable artifact.
- **Aspect & dimensions:** 16:9 · 880 × 495 px displayed · generate @2x (1760 × 990 px)
- **Light/dark strategy:** transparent (ink on alpha, invertible)
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome warm ink (`#1B1A17`) on a **transparent background**, with a single **oxblood** accent (`#7A1F1F`) on one emphasis element only. Flat 2D, editorial, print-quality. No gradients, no shadows, no 3D.
  >
  > **Subject:** A wide 16:9 diagram rendering a file-system tree in an editorial monospaced/engraved style. The tree root is the label **".dwp/"** at the top left, in small-caps. Below it, indented by one level with a vertical hairline and a horizontal branch rule, is **"plans/"**. Below that, indented a further level, is a single directory node **"PLAN_<slug>/"** rendered with angle-bracket styling to signal a variable name. Below `PLAN_<slug>/`, indented one more level, are four leaf entries connected by hairline tree rules:
  > - **"README.md"** — followed by a small italic annotation: "goal · task table · status"
  > - **"PROGRESS.md"** — annotation: "append-only execution log"
  > - **"1.task_<slug>.md"** — annotation: "task file (nine sections)"
  > - **"2.task_<slug>.md"** — same annotation style; a short ellipsis below ("…") implies more tasks
  >
  > An **oxblood** hairline bracket or rule highlights `PLAN_<slug>/` as the key grouping element. The diagram is left-aligned, leaving generous right-side white space. Use consistent engraved hairlines for tree branches, not modern rounded connectors. A small label **"PLAN DIRECTORY"** in small-caps editorial serif sits as a kicker above the tree.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy or cluttered backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.
- **In-image text (EN):** PLAN DIRECTORY · .dwp/ · plans/ · PLAN_<slug>/ · README.md · PROGRESS.md · 1.task_<slug>.md · 2.task_<slug>.md · goal · task table · status · append-only execution log · task file (nine sections)
- **In-image text (ES):** DIRECTORIO DEL PLAN · .dwp/ · plans/ · PLAN_<slug>/ · README.md · PROGRESS.md · 1.task_<slug>.md · 2.task_<slug>.md · objetivo · tabla de tareas · estado · registro de ejecución (solo anexar) · archivo de tarea (nueve secciones)
- **Suggested asset path:** `public/images/visuals/methodology/plan-tree.webp` (EN) · `public/images/visuals/methodology/plan-tree-es.webp` (ES)
- **Alt text (EN):** File-system tree diagram showing the .dwp/plans/PLAN_slug/ directory structure containing README.md, PROGRESS.md, and numbered task files.
- **Alt text (ES):** Diagrama de árbol del sistema de archivos que muestra la estructura del directorio .dwp/plans/PLAN_slug/ con README.md, PROGRESS.md y archivos de tarea numerados.
- **Caption (EN):** A DWP plan is a directory of markdown files: a README overview, an append-only PROGRESS log, and one file per task.
- **Caption (ES):** Un plan de DWP es un directorio de archivos Markdown: un README de resumen, un registro PROGRESS de solo anexar y un archivo por tarea.
- **Integration note:** Drop in as a `Figure` component immediately below the "Plan structure" heading in the plan-and-task-templates reader, replacing or complementing the code block. EN page uses `plan-tree.webp`; ES page uses `plan-tree-es.webp`. Width/height attributes: `width="880" height="495"`.

---

### ME-05 — Skills vs agents and the `.agents/` symlink

- **Target surface:** `src/content/methodology/en/04-skills-agents.md` → "Skills versus agents" and "The `.agents/` directory and the `.claude → .agents` symlink" sections, rendered at `/methodology/skills-and-agents`
- **Type:** diagram
- **Priority:** medium
- **Purpose / trust rationale:** Clarifies the skill/agent distinction (how vs who) and visualises the `.claude → .agents` symlink that makes the kit backward-compatible with Claude Code tooling. Readers often conflate skills and agents; a two-column comparison with an annotated directory label prevents that confusion and demonstrates that the kit layout is deliberate and tool-agnostic.
- **Aspect & dimensions:** 16:9 · 880 × 495 px displayed · generate @2x (1760 × 990 px)
- **Light/dark strategy:** transparent (ink on alpha, invertible)
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome warm ink (`#1B1A17`) on a **transparent background**, with a single **oxblood** accent (`#7A1F1F`) on one emphasis mark only. Flat 2D, editorial, print-quality. No gradients, no shadows, no 3D.
  >
  > **Subject:** A wide 16:9 diagram split into two regions separated by a thin vertical hairline rule at the horizontal centre.
  >
  > **Left panel — Skills vs Agents comparison:** Two columns under a shared heading **"BUILDING BLOCKS"** in small-caps. Left column header: **"SKILL"** with sub-label *"HOW — a reusable procedure"*. Listed below as bullet items in fine italic: "fix-lint · add-component · run-tests · dwp-create". Right column header: **"AGENT"** with sub-label *"WHO — a specialized worker"*. Bullet items: "reviewer · executor · architect · i18n-guardian". A thin double-headed arrow between the two column headers labels the distinction.
  >
  > **Right panel — Directory symlink diagram:** Under a heading **".AGENTS/ DIRECTORY"** in small-caps, draw a simple annotated file-tree: a top node **".agents/"** (canonical, heavier border) with three child entries shown as hairline tree branches — **"skills/"**, **"agents/"**, **"commands/"**. Below the tree, a separate entry **".claude"** with a dashed arrow pointing right to **".agents"** and the annotation **"symlink → backward compat"** in small italic. A single **oxblood** bracket highlights the symlink arrow. Keep both panels uncluttered; label sizes consistent; no fills, outline panels only.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy or cluttered backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.
- **In-image text (EN):** BUILDING BLOCKS · SKILL · HOW — a reusable procedure · AGENT · WHO — a specialized worker · fix-lint · add-component · run-tests · dwp-create · reviewer · executor · architect · i18n-guardian · .AGENTS/ DIRECTORY · .agents/ · skills/ · agents/ · commands/ · .claude · symlink → backward compat
- **In-image text (ES):** COMPONENTES · SKILL · CÓMO — un procedimiento reutilizable · AGENTE · QUIÉN — un trabajador especializado · fix-lint · add-component · run-tests · dwp-create · reviewer · executor · architect · i18n-guardian · DIRECTORIO .AGENTS/ · .agents/ · skills/ · agents/ · commands/ · .claude · enlace simbólico → compatibilidad retroactiva
- **Suggested asset path:** `public/images/visuals/methodology/skills-agents.webp` (EN) · `public/images/visuals/methodology/skills-agents-es.webp` (ES)
- **Alt text (EN):** Two-panel diagram: left panel compares Skills (reusable procedures) to Agents (specialized workers) with examples; right panel shows the .agents/ directory tree and the .claude symlink pointing to it.
- **Alt text (ES):** Diagrama de dos paneles: el panel izquierdo compara Skills (procedimientos reutilizables) con Agentes (trabajadores especializados) con ejemplos; el panel derecho muestra el árbol de directorios .agents/ y el enlace simbólico .claude que apunta a él.
- **Caption (EN):** Skills define how to do recurring work; agents define who is responsible. Both live under `.agents/`, which `.claude` aliases for backward compatibility.
- **Caption (ES):** Los skills definen cómo realizar el trabajo recurrente; los agentes definen quién es responsable. Ambos residen en `.agents/`, al que `.claude` apunta como alias para compatibilidad retroactiva.
- **Integration note:** Drop in as a `Figure` component in the skills-and-agents reader, positioned between the "Skills versus agents" prose and the ".agents/ directory" section. EN page uses `skills-agents.webp`; ES page uses `skills-agents-es.webp`. Width/height attributes: `width="880" height="495"`.

---

### ME-06 — Repository archetypes classification

- **Target surface:** `src/content/methodology/en/05-archetypes.md` → "Classification heuristic" and "How onboarding differs" sections, rendered at `/methodology/repository-archetypes`
- **Type:** diagram
- **Priority:** medium
- **Purpose / trust rationale:** The individual vs orchestrator distinction is the first decision in any engagement, and getting it wrong scopes all subsequent work incorrectly. A branching classification diagram reinforces the heuristic visually and maps each archetype's key characteristics, so agents and readers internalise the decision rule before reading the prose table.
- **Aspect & dimensions:** 1:1 · 640 × 640 px displayed · generate @2x (1280 × 1280 px)
- **Light/dark strategy:** transparent (ink on alpha, invertible)
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome warm ink (`#1B1A17`) on a **transparent background**, with a single **oxblood** accent (`#7A1F1F`) on one key element only. Flat 2D, editorial, print-quality. No gradients, no shadows, no 3D.
  >
  > **Subject:** A square 1:1 branching-tree / decision diagram. At the top, a single root node — a rounded rectangle labelled **"REPOSITORY"** in small-caps. A short vertical ink line descends from it to a diamond decision node bearing the label **"multiple nested repos or hub registry?"**. Two branches leave the diamond: the left branch, labelled **"NO"**, leads down-left to a box labelled **"INDIVIDUAL REPOSITORY"**; the right branch, labelled **"YES"**, leads down-right to a box labelled **"ORCHESTRATOR HUB"** with an **oxblood** border to distinguish it. Below each archetype box, three fine bullet-point annotations in small italic:
  >
  > Under **INDIVIDUAL REPOSITORY**: "single codebase · plans modify local files · .dwp/ at repo root".
  > Under **ORCHESTRATOR HUB**: "coordinates sub-repos · plans delegate to child plans · cross-repo .dwp/ state".
  >
  > The two archetype boxes are the same height; the composition is balanced left–right. A thin hairline horizontal rule separates the decision zone (top half) from the characteristics zone (bottom half). No fills — outline panels only.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy or cluttered backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.
- **In-image text (EN):** REPOSITORY · multiple nested repos or hub registry? · NO · YES · INDIVIDUAL REPOSITORY · single codebase · plans modify local files · .dwp/ at repo root · ORCHESTRATOR HUB · coordinates sub-repos · plans delegate to child plans · cross-repo .dwp/ state
- **In-image text (ES):** REPOSITORIO · ¿múltiples repositorios anidados o registro de hub? · NO · SÍ · REPOSITORIO INDIVIDUAL · código base único · los planes modifican archivos locales · .dwp/ en la raíz del repositorio · HUB ORQUESTADOR · coordina sub-repositorios · los planes delegan en planes hijos · estado .dwp/ entre repositorios
- **Suggested asset path:** `public/images/visuals/methodology/archetypes-tree.webp` (EN) · `public/images/visuals/methodology/archetypes-tree-es.webp` (ES)
- **Alt text (EN):** Decision tree classifying a repository as either an Individual Repository (single codebase, local plans) or an Orchestrator Hub (multiple sub-repositories, delegating child plans).
- **Alt text (ES):** Árbol de decisión que clasifica un repositorio como Repositorio Individual (código base único, planes locales) o Hub Orquestador (múltiples sub-repositorios, planes hijos delegados).
- **Caption (EN):** Classify the repository first: an Individual Repository scopes plans to its own files; an Orchestrator Hub coordinates plans across multiple sub-repositories.
- **Caption (ES):** Clasifica primero el repositorio: un Repositorio Individual delimita los planes a sus propios archivos; un Hub Orquestador coordina planes entre múltiples sub-repositorios.
- **Integration note:** Drop in as a `Figure` component in the repository-archetypes reader, positioned between the "Individual repository" and "Orchestrator hub" prose sections, or immediately before the "Classification heuristic" heading. EN page uses `archetypes-tree.webp`; ES page uses `archetypes-tree-es.webp`. Width/height attributes: `width="640" height="640"`.
