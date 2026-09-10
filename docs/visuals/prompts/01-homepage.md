# Prompt Pack — Homepage Visuals

> **Inherits:** [STYLE_GUIDE.md](../STYLE_GUIDE.md) — house style block (§1),
> palette (§2), light/dark strategy (§3), typography (§4), dimensions (§5), asset
> paths (§6), bilingual EN/ES policy (§7), accessibility (§8), negative
> boilerplate (§9), and the prompt entry schema (§10). Every entry below is
> schema-complete; each **Prompt** field is copy-paste-ready.
>
> **Slots covered:** HP-01, HP-02, HP-06…HP-09 (illustrations) · HP-03, HP-04, HP-05
> (diagram components) + skip decisions for `Comparison.astro` and `Origin.astro`.
>
> **Flagship:** HP-01 — the Hero right-column illustration — gets the richest
> treatment and is the single highest-value asset on the site.

> **🔤 ILLUSTRATIONS ARE WORDLESS — and only some entries here are illustrations.**
> Generated illustrations must contain **ZERO text** (no words, letters, numbers,
> or labels), because they are a single asset reused for **every language** — we
> never want to regenerate art per locale. **Generate as images only:** HP-01 and
> HP-02 (both wordless). **Do NOT generate:** HP-03,
> HP-04, HP-05 — those need text labels, so they are **diagrams built as HTML/CSS
> components** (`src/components/diagrams/home/`), already live on the homepage and
> translated from the codebase. Rule of thumb: **needs text → HTML/CSS component;
> wordless vibe art → generated image.**

> **⚠️ UNIVERSAL EDGES & FRAMING RULE (applies to every illustration below).**
> No image may have a **border, frame, rectangle, box, or outline** around it, and
> **nothing may touch or be cut off by the edges**. The artwork sits centered with
> generous margin and its detail **fades / feathers softly into the background** on
> all sides so it blends seamlessly into the page.
>
> **🎯 EXACT BACKGROUND COLOR (this is the #1 thing agents get wrong — read carefully).**
> For every **filled** illustration you generate **two separate images**, and the
> background must be filled **edge-to-edge (every pixel, all four corners and
> margins) with these EXACT hex colors — not approximations:**
> - **`light.png` → background EXACTLY `#F7F4EC`** (a warm off-white / cream paper).
>   **NOT** pure white `#FFFFFF`, **not** bright white, **not** grey, **not** generic
>   beige. It must read as `#F7F4EC`.
> - **`dark.png` → background EXACTLY `#14140F`** (a warm near-black). **NOT** pure
>   black `#000000`, **not** a cool/blue black, **not** dark grey. It must read as
>   `#14140F`.
> The faded edges must dissolve into that exact color so the image is
> indistinguishable from the site's page background (test: the corners must equal
> the hex). Getting this wrong leaves a visible rectangle/halo on the page.
>
> - **Marks / icons / ornaments** (transparent): instead of a color fill, use a
>   **true transparent background** (alpha) — no off-white or grey fill at all —
>   with soft (not hard-cropped) edges, centered with margin.
> This is the default for the whole pack — already folded into each prompt below.

### HP-01 — Hero illustration (repository as harness / guiding light)

- **Target surface:** `src/components/home/Hero.astro` → the right column. The hero currently constrains content to `max-w-3xl` on the left; integration exposes a right column on `lg` to hold this illustration.
- **Type:** illustration
- **Priority:** flagship
- **Purpose / trust rationale:** The hero is the first impression. An engraving that visually rhymes with the existing `og-default.png` lighthouse gives the site instant editorial credibility and warmth, and dramatizes the core promise — the repository as a steady harness that guides any agent through long-horizon work. Atmosphere over labels: it should feel like the frontispiece of a serious engineering standard.
- **Aspect & dimensions:** 4:5 portrait · 520 × 650 px displayed · generate @2x (1040 × 1300 px)
- **Light/dark strategy:** light+dark pair — `hero-harness.webp` (warm ink on `#F7F4EC` paper) and `hero-harness-dark.webp` (paper-ink `#ECE7DA` on `#14140F` ground). This is an atmospheric illustration with a filled ground, so a matched pair reads better than a transparent cutout.
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome warm ink (`#1B1A17`) on warm off-white newsprint paper (`#F7F4EC`), with a single restrained **oxblood** accent (`#7A1F1F`) — used only for one small mark (e.g. the beam or a single hairline rule), never as a fill. Subtle paper grain. Calm, authoritative, editorial. Flat 2D, print-quality line work. No gradients, no glossy 3D, no photographic realism, no drop shadows.
  >
  > **EDGES / BACKGROUND (critical — generate TWO images):** No border, frame, rectangle, or outline. Fill the **entire** canvas (every pixel, all four corners and margins) with the EXACT page color — **LIGHT version: exactly `#F7F4EC`** (warm off-white paper, NOT pure white `#FFFFFF`, not grey); **DARK version: exactly `#14140F`** (warm near-black, NOT pure black `#000000`, not blue-black). The scene **fades / feathers softly into that exact background** on all four sides — the edges dissolve into the page with no visible boundary or halo. Keep the whole scene comfortably inside with generous margin; **nothing touches or is cut off by any edge**.
  >
  > **Subject:** A portrait 4:5 frontispiece vignette. A tall lighthouse rendered in fine engraved line work stands on a rocky promontory; from its lantern a single calm beam sweeps across the composition, the beam picked out as the lone **oxblood** accent. Below and around the base, suggest — in the same engraved idiom, subtly, not literally — the idea of an ordered repository: a few neat stacked strata / shelves / ledger lines that read as structured foundations the lighthouse rests on. A small sailing vessel (the "agent") is guided by the beam toward safe passage. No text inside the image. Quiet, balanced, timeless.
  >
  > **AVOID —** any border / frame / rectangle / outline / box, elements touching or clipped by the edges, hard straight edges, gradients (other than the soft edge-fade into the background), glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy or cluttered backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.
- **In-image text (EN):** none (atmospheric illustration)
- **In-image text (ES):** none (single asset serves both languages)
- **Suggested asset path:** `public/images/visuals/home/hero-harness.webp` (light) · `public/images/visuals/home/hero-harness-dark.webp` (dark)
- **Alt text (EN):** A lighthouse on a rocky shore casts a single beam guiding a small vessel — an engraving evoking the repository as a steady harness that guides any agent.
- **Alt text (ES):** Un faro en una costa rocosa proyecta un único haz que guía a una pequeña embarcación — un grabado que evoca el repositorio como un harness estable que guía a cualquier agente.
- **Caption (EN):** — (used as a standalone hero illustration, no caption)
- **Caption (ES):** —
- **Integration note:** Convert the Hero into a two-column grid on `lg` (text `max-w-3xl` left, illustration right); place this image in the right column with `<picture>` swapping light/dark by color scheme (same mechanism as the brand logos). Because there is no in-image text, one pair serves EN and ES. `width="520" height="650"`.

---

### HP-02 — Pitch illustration (nautical chart with a plotted course)

- **Target surface:** `src/components/home/Pitch.astro` → **right column** of a two-column layout (text left, illustration right), mirroring the hero faro. Fills the empty right-side space of the "problem and the answer" section.
- **Type:** illustration
- **Priority:** medium
- **Purpose / trust rationale:** A second "vibe" illustration in the faro's maritime engraving family. Meaning: agents **drift** on long-horizon work (the problem); the **plan/spec is the chart that gives direction** (the answer) — a single confident plotted course threads safely past the hazards. Reinforces "the plan is the durable source of truth" and visually rhymes with the lighthouse.
- **Aspect & dimensions:** 4:5 portrait · ~420 × 525 px displayed · generate @2x (≥ 1040 × 1300 px)
- **Light/dark strategy:** light + dark pair (filled background that blends with the page) — `pitch-chart.webp` (ink on warm paper `#F7F4EC`) and `pitch-chart-dark.webp` (paper-ink `#ECE7DA` on `#14140F`). Same approach as the hero faro.
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched hairlines, in the manner of a 19th-century nautical chart or scientific broadsheet — the SAME engraving style and family as the site's lighthouse illustration. **LIGHT version:** warm sepia-ink line work on warm off-white paper (`#F7F4EC`). **(For the dark version: paper-colored ink lines `#ECE7DA` on a warm near-black ground `#14140F`.)** A single restrained **oxblood** (`#7A1F1F`) accent — used ONLY for the plotted course line. Calm, authoritative, editorial, detailed line engraving with subtle paper grain. No gradients, no glossy 3D, no photographic realism, no extra colors.
  >
  > **EDGES / BACKGROUND (critical — generate TWO images):** There is **NO border, NO frame, NO rectangle, NO outline** around the artwork. Fill the **entire** canvas (every pixel, all four corners and margins) with the EXACT page color — **LIGHT version: exactly `#F7F4EC`** (warm off-white paper, NOT pure white `#FFFFFF`, not grey, not beige); **DARK version: exactly `#14140F`** (warm near-black, NOT pure black `#000000`, not blue-black). The illustration sits centered and its detail **fades / feathers / vignettes softly into that exact background** on all four sides, dissolving seamlessly into the page with no visible boundary or halo. Keep ALL elements (compass rose, dividers, the full course) comfortably inside with generous margin — **nothing touches or is cut off by any edge**. The corners must equal the exact background hex.
  >
  > **Subject:** An antique engraved **nautical sea chart** scene, portrait 4:5, with soft faded edges (no border). Within it: a faint latitude/longitude hairline grid that fades out toward the margins; an ornate **compass rose** in the upper area; lightly stippled coastlines, a small island or two, and scattered depth-sounding dots and tiny hazard marks (rocks) — all kept well away from the edges. Across the chart runs a single confident **plotted course** — a clean line in **oxblood** with small waypoint crosses/dots — threading safely from a start point, past the hazards, to a destination (a small anchor or harbor mark). Optionally a pair of brass dividers / parallel rule resting on the chart, fully inside the margins. The course line is the only oxblood element and the clear focal point. **No readable words, numbers, or letters anywhere** — only decorative engraved marks.
  >
  > **AVOID —** any border / frame / rectangle / outline / box around the image, elements touching or clipped by the edges, hard straight edges, gradients (other than the soft edge-fade into the background), glossy/3D render, photographic realism, neon or saturated colors, drop shadows, watermark, signature, extra logos, any readable text / numbers / letters / labels, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.
- **In-image text (EN):** none (wordless)
- **In-image text (ES):** none
- **Suggested asset path:** `public/images/visuals/home/pitch-chart.webp` (light) · `public/images/visuals/home/pitch-chart-dark.webp` (dark)
- **Alt text (EN):** A nautical chart with a single plotted course threading safely past hazards — an engraving evoking the plan as the direction that keeps work on course.
- **Alt text (ES):** Una carta náutica con un único rumbo trazado que sortea los peligros con seguridad — un grabado que evoca el plan como la dirección que mantiene el trabajo en curso.
- **Caption (EN):** — (standalone right-column illustration)
- **Caption (ES):** —
- **Integration note:** Place in the Pitch right column (two-column grid on `lg`, like the hero); `<picture>`/dual-img light-dark swap. Replaces the earlier small inline "pitch-mark". `width="1040" height="1300"`, displayed ~420px wide.

---

### HP-03 — Quickstart flow (the four steps)

> **⚠️ DIAGRAM — NOT an illustration. Do NOT generate this as an image.** It is
> already **built as a live component** at
> `src/components/diagrams/home/QuickstartFlow.astro` and rendered in the Quickstart
> section. Diagrams *have text labels by design* and are HTML/CSS in the codebase
> (so they translate for free). This entry is kept only as the component's spec.

- **Target surface:** `src/components/home/Quickstart.astro` → above or beside the four numbered steps.
- **Type:** diagram
- **Priority:** high
- **Purpose / trust rationale:** The quickstart's promise is "one instruction, the repository does the rest." A clean horizontal four-step flow makes the path legible instantly and shows there is a real, finite sequence — building confidence that adoption is simple. (Distinct from the methodology core loop ME-02; these are the four high-level adoption steps.)
- **Aspect & dimensions:** 16:9 · 880 × 495 px displayed · generate @2x (1760 × 990 px)
- **Light/dark strategy:** transparent (ink line art on alpha, invertible).
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched hairlines, monochrome warm ink (`#1B1A17`) on a **transparent background**, a single **oxblood** (`#7A1F1F`) accent on the final step only. Editorial, flat 2D, print-quality. No gradients, no shadows, no 3D.
  >
  > **Subject:** A wide 16:9 horizontal flow of four equal panels connected left-to-right by ink arrows. Each panel is an outline rectangle with a small tabular numeral (01–04) top-left and a short small-caps label. Labels, in order: **"01 OPEN /init.md"**, **"02 INSTALL THE SKILL"**, **"03 ADAPT YOUR REPO"**, **"04 PLAN & EXECUTE"**. Inside each panel, a tiny engraved glyph hints at the action (an open document; a downloading package/box; a wrench fitting gears to a folder; a checklist with a forward arrow). The fourth panel's border or its arrow-in is the single **oxblood** accent, marking the payoff. Outline panels only, uniform sizing, generous margins.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon, drop shadows, busy backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, corporate-memphis vector, clip-art, emoji.
- **In-image text (EN):** 01 OPEN /init.md · 02 INSTALL THE SKILL · 03 ADAPT YOUR REPO · 04 PLAN & EXECUTE
- **In-image text (ES):** 01 ABRIR /init.md · 02 INSTALAR EL SKILL · 03 ADAPTAR TU REPO · 04 PLANIFICAR Y EJECUTAR
- **Suggested asset path:** `public/images/visuals/home/quickstart-flow.webp` (EN) · `public/images/visuals/home/quickstart-flow-es.webp` (ES)
- **Alt text (EN):** Four-step flow: open /init.md, install the skill, adapt your repository, then plan and execute.
- **Alt text (ES):** Flujo de cuatro pasos: abrir /init.md, instalar el skill, adaptar tu repositorio y luego planificar y ejecutar.
- **Caption (EN):** One instruction starts a four-step path: open, install, adapt, execute.
- **Caption (ES):** Una sola instrucción inicia un camino de cuatro pasos: abrir, instalar, adaptar, ejecutar.
- **Integration note:** Place above the Quickstart steps grid as a `Figure`, or inline at the top of the section. EN/ES asset by page language. `width="880" height="495"`.

---

### HP-04 — Onboarding sequence (reasoning, not copy-paste)

> **⚠️ DIAGRAM — NOT an illustration. Do NOT generate this as an image.** Already
> **built as a component** at `src/components/diagrams/home/OnboardingSequence.astro`
> and rendered in the Onboarding section. Entry kept only as the component's spec.

- **Target surface:** `src/components/home/Onboarding.astro` → beside the numbered onboarding steps ("Point it at any repository. It reasons — it does not copy-paste.").
- **Type:** diagram
- **Priority:** medium
- **Purpose / trust rationale:** The onboarding section's key trust claim is that artifacts are reasoned from the real stack, not stamped from a template. A vertical numbered sequence that ends in a "verify" gate shows the process is deliberate and checkable. Visually distinct from HP-03 (vertical timeline vs horizontal flow).
- **Aspect & dimensions:** 16:9 · 880 × 495 px displayed · generate @2x (1760 × 990 px)
- **Light/dark strategy:** transparent (ink on alpha, invertible).
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched hairlines, monochrome warm ink (`#1B1A17`) on a **transparent background**, a single **oxblood** (`#7A1F1F`) accent on the final "verify" node only. Editorial, flat 2D, print-quality. No gradients, no shadows, no 3D.
  >
  > **Subject:** A 16:9 stepped sequence (a numbered timeline) reading top-to-bottom-left then continuing, or a clean left-to-right numbered band of four stages joined by a single spine rule with tick marks. Four stages with small-caps labels: **"01 REASON ABOUT YOUR STACK"**, **"02 GENERATE AGENTS.md & DOCS"**, **"03 SCAFFOLD .agents/ (+ .claude symlink)"**, **"04 VERIFY CONFORMANCE"**. Each stage has a tiny engraved glyph (a magnifier over manifests; a stack of documents; a small directory tree with a dashed symlink arrow; a checkmark inside a hexagon). The "04 VERIFY" node carries the lone **oxblood** mark. Outline only; even spacing; generous margins.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon, drop shadows, busy backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, corporate-memphis vector, clip-art, emoji.
- **In-image text (EN):** 01 REASON ABOUT YOUR STACK · 02 GENERATE AGENTS.md & DOCS · 03 SCAFFOLD .agents/ (+ .claude symlink) · 04 VERIFY CONFORMANCE
- **In-image text (ES):** 01 RAZONAR SOBRE TU STACK · 02 GENERAR AGENTS.md Y DOCS · 03 ANDAMIAR .agents/ (+ enlace .claude) · 04 VERIFICAR CONFORMIDAD
- **Suggested asset path:** `public/images/visuals/home/onboarding-sequence.webp` (EN) · `public/images/visuals/home/onboarding-sequence-es.webp` (ES)
- **Alt text (EN):** Four-stage onboarding sequence: reason about the stack, generate AGENTS.md and docs, scaffold the .agents directory with the .claude symlink, and verify conformance.
- **Alt text (ES):** Secuencia de incorporación de cuatro etapas: razonar sobre el stack, generar AGENTS.md y documentación, andamiar el directorio .agents con el enlace .claude y verificar la conformidad.
- **Caption (EN):** Onboarding reasons about your repository and ends in an objective conformance check — no template stamping.
- **Caption (ES):** La incorporación razona sobre tu repositorio y termina en una comprobación objetiva de conformidad — sin plantillas genéricas.
- **Integration note:** Place beside or below the Onboarding steps as a `Figure`. EN/ES asset by page language. `width="880" height="495"`.

---

### HP-05 — Archetypes comparison (individual vs orchestrator)

> **⚠️ DIAGRAM — NOT an illustration. Do NOT generate this as an image.** Already
> **built as a component** at `src/components/diagrams/home/ArchetypesCompare.astro`
> and rendered in the Archetypes section. Entry kept only as the component's spec.

- **Target surface:** `src/components/home/Archetypes.astro` → between the two archetype cards (Individual vs Orchestrator).
- **Type:** diagram
- **Priority:** medium
- **Purpose / trust rationale:** A compact side-by-side mark distinguishing a single repo from a hub coordinating sub-repos helps visitors self-identify which mode applies to them. (A homepage-register companion to the fuller methodology diagram ME-06.)
- **Aspect & dimensions:** 1:1 · 640 × 640 px displayed · generate @2x (1280 × 1280 px)
- **Light/dark strategy:** transparent (ink on alpha, invertible).
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving, monochrome warm ink (`#1B1A17`) on a **transparent background**, a single **oxblood** (`#7A1F1F`) accent on the hub's central node only. Editorial, flat 2D, print-quality. No gradients, no shadows, no 3D.
  >
  > **Subject:** A square 1:1 composition split by a thin vertical hairline into two balanced halves. Left half, header **"INDIVIDUAL REPOSITORY"**: a single outlined box containing a small folder glyph — one self-contained codebase. Right half, header **"ORCHESTRATOR HUB"**: a central node (with the lone **oxblood** outline) connected by three short ink branches to three smaller satellite boxes (sub-repos). Both headers in small-caps editorial serif. Symmetric, uncluttered, outline only.
  >
  > **AVOID —** gradients, glossy/3D render, photographic realism, neon, drop shadows, busy backgrounds, watermark, signature, extra logos, garbled/misspelled text, lorem ipsum, corporate-memphis vector, clip-art, emoji.
- **In-image text (EN):** INDIVIDUAL REPOSITORY · ORCHESTRATOR HUB
- **In-image text (ES):** REPOSITORIO INDIVIDUAL · HUB ORQUESTADOR
- **Suggested asset path:** `public/images/visuals/home/archetypes-compare.webp` (EN) · `public/images/visuals/home/archetypes-compare-es.webp` (ES)
- **Alt text (EN):** Side-by-side comparison: an individual repository as one self-contained codebase versus an orchestrator hub coordinating three sub-repositories.
- **Alt text (ES):** Comparación lado a lado: un repositorio individual como un código base autónomo frente a un hub orquestador que coordina tres sub-repositorios.
- **Caption (EN):** Two archetypes: a single repository, or a hub that coordinates plans across sub-repositories.
- **Caption (ES):** Dos arquetipos: un solo repositorio, o un hub que coordina planes entre sub-repositorios.
- **Integration note:** Place centered between the two Archetypes cards as a `Figure`. EN/ES asset by page language. `width="640" height="640"`.

---

## Skip decisions

- **`Comparison.astro` — SKIP (no image asset).** This section is a feature
  comparison **table**; status/check marks are best rendered as CSS/inline SVG
  ticks for crispness and dark-mode parity, not a generated raster. Recommend
  styling the existing table rather than commissioning an image.
- **`Origin.astro` — SKIP (already visual).** This section already carries the
  Dailybot logo (light/dark SVG). Adding a generated illustration would compete
  with that brand mark. No new asset.

---


---

## HP-06…HP-09 — Home story plates (four-act narrative)

> **Provenance:** generated during `PLAN_home_storytelling_upgrade` and mirrored
> here as the canonical durable home of these prompts (the plan-local pack under
> `.dwp/` is disposable). Each plate generates TWO transparent-background PNGs
> (light + dark ink variant, identical composition) — no ground, no text. Entries
> below are schema-complete; each **Prompt** block is self-contained.

### HP-06 — Humans steer, agents execute (ship's wheel)

- **Target surface:** `src/components/diagrams/home/HumansSteer.astro` → Act I plate art (site renders the text layer around it).
- **Type:** illustration
- **Priority:** ★ flagship (first act of the homepage story)
- **Purpose / trust rationale:** The division of labor that defines the method — humans choose the course, agents do the hours. The wheel-and-crew metaphor makes the abstract contract concrete in one glance.
- **Aspect & dimensions:** 16:10 · ~800 × 500 px displayed · generate @2x (1600 × 1000 px)
- **Light/dark strategy:** transparent — dual-ink pair (light file: dark ink `#1B1A17` + oxblood `#7A1F1F`; dark file: light ink `#ECE7DA` + oxblood `#C2554D`; identical composition).
- **In-image text (EN):** none
- **In-image text (ES):** none
- **Suggested asset path:** `public/images/visuals/home/plate-humans-steer.png` (light) · `plate-humans-steer-dark.png` (dark)
- **Alt text (EN):** An engraved ship's wheel held by a captain's hand while the crew works the sails behind — an engraving evoking humans steering and agents executing.
- **Alt text (ES):** Un timón de barco grabado sostenido por la mano de un capitán mientras la tripulación trabaja en las velas — un grabado que evoca a los humanos dirigiendo y los agentes ejecutando.
- **Caption (EN):** —
- **Caption (ES):** —
- **Integration note:** `<img>` pair inside the `editorial-plate` frame (light `dark:hidden`, dark `hidden dark:block`), `width="1600" height="1000"`, `loading="lazy"`, class `plate-frame-img`. Statement/points render as the HTML text layer.

**HP-06 LIGHT — Prompt (copy-paste):**

> **HOUSE STYLE (transparent plate art) —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome warm ink (`#1B1A17`) line work on a **fully transparent background** (alpha channel — no canvas fill of any color), with a single restrained **oxblood** accent (`#7A1F1F`) used for one small emphasis mark only. Calm, authoritative, editorial. Flat 2D, print-quality line work. No gradients, no glossy 3D, no photographic realism, no drop shadows, no ground or backdrop of any kind.
>
> **EDGES / BACKGROUND (critical):** The background must be **100% transparent** — alpha, not white, not cream, not any solid color or paper texture. The composition sits centered with generous margin; linework thins and feathers softly toward the margins; **nothing touches or is clipped by any edge**. No border, no frame, no rectangle, no outline, no vignette fill.
>
> **Subject:** A landscape 16:10 engraved vignette. Dominating the left-center, a large ship's wheel (helm) rendered in fine engraved line work — eight spokes with turned handles, a carved hub — gripped by a captain's hand in a period coat sleeve. Behind and to the right, suggested in slightly lighter, finer hatching: three crew members at work on ropes and sails, drawn smaller and quieter than the wheel. A single bold course line — the lone **oxblood** accent — sweeps from behind the wheel across the lower composition toward the horizon at right, ending in a small oxblood arrowhead. Quiet sea-horizon hairlines low in the frame, well inside the margins. Balanced, calm, timeless.
>
> **AVOID —** any solid, filled, or textured background (transparent only), any border / frame / rectangle / box / outline, elements touching or clipped by the edges, hard straight edges, gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy backgrounds, watermark, signature, extra logos, **any text, letters, words, numbers, typography, captions, or labels**, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.

**HP-06 DARK — Prompt (copy-paste):**

> **HOUSE STYLE (transparent plate art) —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome **light ink (`#ECE7DA`)** line work on a **fully transparent background** (alpha channel — no canvas fill of any color), with a single restrained **oxblood** accent (`#C2554D`) used for one small emphasis mark only. Calm, authoritative, editorial. Flat 2D, print-quality line work. No gradients, no glossy 3D, no photographic realism, no drop shadows, no ground or backdrop of any kind.
>
> **EDGES / BACKGROUND (critical):** The background must be **100% transparent** — alpha, not white, not cream, not black, not any solid color or texture. The composition sits centered with generous margin; linework thins and feathers softly toward the margins; **nothing touches or is clipped by any edge**. No border, no frame, no rectangle, no outline, no vignette fill.
>
> **Subject:** A landscape 16:10 engraved vignette. Dominating the left-center, a large ship's wheel (helm) rendered in fine engraved line work — eight spokes with turned handles, a carved hub — gripped by a captain's hand in a period coat sleeve. Behind and to the right, suggested in slightly lighter, finer hatching: three crew members at work on ropes and sails, drawn smaller and quieter than the wheel. A single bold course line — the lone **oxblood** accent — sweeps from behind the wheel across the lower composition toward the horizon at right, ending in a small oxblood arrowhead. Quiet sea-horizon hairlines low in the frame, well inside the margins. Balanced, calm, timeless.
>
> **AVOID —** any solid, filled, or textured background (transparent only), any border / frame / rectangle / box / outline, elements touching or clipped by the edges, hard straight edges, gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy backgrounds, watermark, signature, extra logos, **any text, letters, words, numbers, typography, captions, or labels**, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.

---

### HP-07 — A plan agents can't drift from (the loop)

- **Target surface:** `src/components/diagrams/home/PlanNoDrift.astro` → Act II plate art.
- **Type:** illustration
- **Priority:** high
- **Purpose / trust rationale:** The mechanism plate: a plan is a closed loop — plan, atomic tasks, validation gates, completion, resumable state — and the loop is what keeps a context-limited agent on course. The trailing dashed wake shows drift being prevented, not just omitted.
- **Aspect & dimensions:** 16:10 · ~800 × 500 px displayed · generate @2x (1600 × 1000 px)
- **Light/dark strategy:** transparent — dual-ink pair (same rules as HP-06).
- **In-image text (EN):** none
- **In-image text (ES):** none
- **Suggested asset path:** `public/images/visuals/home/plate-plan-no-drift.png` (light) · `plate-plan-no-drift-dark.png` (dark)
- **Alt text (EN):** A gyroscope ringed by five engraved emblems joined in a loop — an engraving evoking a plan agents cannot drift from.
- **Alt text (ES):** Un giróscopo rodeado por cinco emblemas grabados unidos en un bucle — un grabado que evoca un plan del que los agentes no pueden desviarse.
- **Caption (EN):** —
- **Caption (ES):** —
- **Integration note:** Same pair wiring as HP-06; the five loop stages render as the HTML ordered list beside/below the art.

**HP-07 LIGHT — Prompt (copy-paste):**

> **HOUSE STYLE (transparent plate art) —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome warm ink (`#1B1A17`) line work on a **fully transparent background** (alpha channel — no canvas fill of any color), with a single restrained **oxblood** accent (`#7A1F1F`) used for one small emphasis mark only. Calm, authoritative, editorial. Flat 2D, print-quality line work. No gradients, no glossy 3D, no photographic realism, no drop shadows, no ground or backdrop of any kind.
>
> **EDGES / BACKGROUND (critical):** The background must be **100% transparent** — alpha, not white, not cream, not any solid color or paper texture. The composition sits centered with generous margin; linework thins and feathers softly toward the margins; **nothing touches or is clipped by any edge**. No border, no frame, no rectangle, no outline, no vignette fill.
>
> **Subject:** A landscape 16:10 engraved emblem ring. At center, a small standing **gyroscope** in fine engraved line work (gimbal rings, balanced rotor). Around it, five small engraved emblems arranged evenly on an invisible ellipse and joined by thin directional arrows into a closed clockwise **loop**: a mariner's compass; a document scroll with four blank check boxes; a small arched gate; a planted flag; a small treasure chest. The **gate** emblem (and the arrow returning to it) carries the lone **oxblood** accent. One faint **dashed** line trails off the loop outward and fades to nothing within the lower margin — drift being caught back by the loop. Quiet, symmetrical, print-quality.
>
> **AVOID —** any solid, filled, or textured background (transparent only), any border / frame / rectangle / box / outline, elements touching or clipped by the edges, hard straight edges, gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy backgrounds, watermark, signature, extra logos, **any text, letters, words, numbers, typography, captions, or labels**, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.

**HP-07 DARK — Prompt (copy-paste):**

> **HOUSE STYLE (transparent plate art) —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome **light ink (`#ECE7DA`)** line work on a **fully transparent background** (alpha channel — no canvas fill of any color), with a single restrained **oxblood** accent (`#C2554D`) used for one small emphasis mark only. Calm, authoritative, editorial. Flat 2D, print-quality line work. No gradients, no glossy 3D, no photographic realism, no drop shadows, no ground or backdrop of any kind.
>
> **EDGES / BACKGROUND (critical):** The background must be **100% transparent** — alpha, not white, not cream, not black, not any solid color or texture. The composition sits centered with generous margin; linework thins and feathers softly toward the margins; **nothing touches or is clipped by any edge**. No border, no frame, no rectangle, no outline, no vignette fill.
>
> **Subject:** A landscape 16:10 engraved emblem ring. At center, a small standing **gyroscope** in fine engraved line work (gimbal rings, balanced rotor). Around it, five small engraved emblems arranged evenly on an invisible ellipse and joined by thin directional arrows into a closed clockwise **loop**: a mariner's compass; a document scroll with four blank check boxes; a small arched gate; a planted flag; a small treasure chest. The **gate** emblem (and the arrow returning to it) carries the lone **oxblood** accent. One faint **dashed** line trails off the loop outward and fades to nothing within the lower margin — drift being caught back by the loop. Quiet, symmetrical, print-quality.
>
> **AVOID —** any solid, filled, or textured background (transparent only), any border / frame / rectangle / box / outline, elements touching or clipped by the edges, hard straight edges, gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy backgrounds, watermark, signature, extra logos, **any text, letters, words, numbers, typography, captions, or labels**, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.

---

### HP-08 — Done is a contract, not a vibe (the seal)

- **Target surface:** `src/components/diagrams/home/DoneIsAContract.astro` → Act III plate art.
- **Type:** illustration
- **Priority:** high
- **Purpose / trust rationale:** Verification is the product: tasks close on evidence, not on feeling. The wax seal on a contract with blank check rows says "acceptance criteria, met and recorded" without a single word.
- **Aspect & dimensions:** 16:10 · ~800 × 500 px displayed · generate @2x (1600 × 1000 px)
- **Light/dark strategy:** transparent — dual-ink pair (same rules as HP-06).
- **In-image text (EN):** none
- **In-image text (ES):** none
- **Suggested asset path:** `public/images/visuals/home/plate-done-is-a-contract.png` (light) · `plate-done-is-a-contract-dark.png` (dark)
- **Alt text (EN):** A hand pressing a wax seal onto a contract document with blank check rows — an engraving evoking done as a contract, not a vibe.
- **Alt text (ES):** Una mano presionando un sello de laca sobre un documento de contrato con filas de casillas en blanco — un grabado que evoca que hecho es un contrato, no una sensación.
- **Caption (EN):** —
- **Caption (ES):** —
- **Integration note:** Same pair wiring as HP-06; the four contract terms render as the HTML list.

**HP-08 LIGHT — Prompt (copy-paste):**

> **HOUSE STYLE (transparent plate art) —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome warm ink (`#1B1A17`) line work on a **fully transparent background** (alpha channel — no canvas fill of any color), with a single restrained **oxblood** accent (`#7A1F1F`) used for one small emphasis mark only. Calm, authoritative, editorial. Flat 2D, print-quality line work. No gradients, no glossy 3D, no photographic realism, no drop shadows, no ground or backdrop of any kind.
>
> **EDGES / BACKGROUND (critical):** The background must be **100% transparent** — alpha, not white, not cream, not any solid color or paper texture. The composition sits centered with generous margin; linework thins and feathers softly toward the margins; **nothing touches or is clipped by any edge**. No border, no frame, no rectangle, no outline, no vignette fill.
>
> **Subject:** A landscape 16:10 engraved vignette. Center-right: a contract document drawn in fine line work, lying at a slight angle, its face carrying **four blank check rows** (empty square boxes with hairline rules — no writing). Above it, a dignified hand in a period sleeve presses a round **wax seal** stamp; the seal — the lone **oxblood** element — sits pressed onto the document's lower corner with a scalloped wax edge and a simple heraldic mark. At the left margin, a small engraved inkwell with a quill. Hairline ruling and quiet cross-hatching only; calm, ceremonial, print-quality.
>
> **AVOID —** any solid, filled, or textured background (transparent only), any border / frame / rectangle / box / outline, elements touching or clipped by the edges, hard straight edges, gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy backgrounds, watermark, signature, extra logos, **any text, letters, words, numbers, typography, captions, or labels** (the check rows are empty boxes), lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.

**HP-08 DARK — Prompt (copy-paste):**

> **HOUSE STYLE (transparent plate art) —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome **light ink (`#ECE7DA`)** line work on a **fully transparent background** (alpha channel — no canvas fill of any color), with a single restrained **oxblood** accent (`#C2554D`) used for one small emphasis mark only. Calm, authoritative, editorial. Flat 2D, print-quality line work. No gradients, no glossy 3D, no photographic realism, no drop shadows, no ground or backdrop of any kind.
>
> **EDGES / BACKGROUND (critical):** The background must be **100% transparent** — alpha, not white, not cream, not black, not any solid color or texture. The composition sits centered with generous margin; linework thins and feathers softly toward the margins; **nothing touches or is clipped by any edge**. No border, no frame, no rectangle, no outline, no vignette fill.
>
> **Subject:** A landscape 16:10 engraved vignette. Center-right: a contract document drawn in fine line work, lying at a slight angle, its face carrying **four blank check rows** (empty square boxes with hairline rules — no writing). Above it, a dignified hand in a period sleeve presses a round **wax seal** stamp; the seal — the lone **oxblood** element — sits pressed onto the document's lower corner with a scalloped wax edge and a simple heraldic mark. At the left margin, a small engraved inkwell with a quill. Hairline ruling and quiet cross-hatching only; calm, ceremonial, print-quality.
>
> **AVOID —** any solid, filled, or textured background (transparent only), any border / frame / rectangle / box / outline, elements touching or clipped by the edges, hard straight edges, gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy backgrounds, watermark, signature, extra logos, **any text, letters, words, numbers, typography, captions, or labels** (the check rows are empty boxes), lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.

---

### HP-09 — The repository is the harness (the chest)

- **Target surface:** `src/components/diagrams/home/RepoAsHarnessPlate.astro` → Act IV plate art.
- **Type:** illustration
- **Priority:** high
- **Purpose / trust rationale:** The where-does-it-live plate: context, tasks, checks, state, and tools are plain files in the repository — the chest makes "durable, inspectable, survives context resets" physical. The blank hang-tags are deliberate: the site renders the real labels (SPEC, TASKS, CHECKS, STATE, TOOLS) as live text over the art.
- **Aspect & dimensions:** 16:10 · ~800 × 500 px displayed · generate @2x (1600 × 1000 px)
- **Light/dark strategy:** transparent — dual-ink pair (same rules as HP-06).
- **In-image text (EN):** none
- **In-image text (ES):** none
- **Suggested asset path:** `public/images/visuals/home/plate-repo-as-harness.png` (light) · `plate-repo-as-harness-dark.png` (dark)
- **Alt text (EN):** An engraved archive chest with five blank hang-tags tied by string — an engraving evoking the repository as the harness.
- **Alt text (ES):** Un arcón archivo grabado con cinco etiquetas colgantes en blanco atadas con cordel — un grabado que evoca el repositorio como el harness.
- **Caption (EN):** —
- **Caption (ES):** —
- **Integration note:** Same pair wiring as HP-06; the five tag labels (SPEC, TASKS, CHECKS, STATE, TOOLS) render as HTML small-caps chips positioned over/near the tags — keep the tag faces blank and uncluttered so the labels land cleanly.

**HP-09 LIGHT — Prompt (copy-paste):**

> **HOUSE STYLE (transparent plate art) —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome warm ink (`#1B1A17`) line work on a **fully transparent background** (alpha channel — no canvas fill of any color), with a single restrained **oxblood** accent (`#7A1F1F`) used for one small emphasis mark only. Calm, authoritative, editorial. Flat 2D, print-quality line work. No gradients, no glossy 3D, no photographic realism, no drop shadows, no ground or backdrop of any kind.
>
> **EDGES / BACKGROUND (critical):** The background must be **100% transparent** — alpha, not white, not cream, not any solid color or paper texture. The composition sits centered with generous margin; linework thins and feathers softly toward the margins; **nothing touches or is clipped by any edge**. No border, no frame, no rectangle, no outline, no vignette fill.
>
> **Subject:** A landscape 16:10 engraved vignette. Centered, a sturdy **archive chest** in fine engraved line work — banded wood, lock hasp, two small drawers — its lid slightly open showing neat ledger folders standing inside. **Five blank hang-tags** (small rectangles with a hole and short string, completely blank faces) fan out from the chest, tied by string, two on the left, one on top, two on the right, each angled differently and held fully inside the composition. The chest's central **hasp** carries the lone **oxblood** accent. Quiet, grounded, print-quality; generous margin all around.
>
> **AVOID —** any solid, filled, or textured background (transparent only), any border / frame / rectangle / box / outline, elements touching or clipped by the edges, hard straight edges, gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy backgrounds, watermark, signature, extra logos, **any text, letters, words, numbers, typography, captions, or labels** (the hang-tags are blank), lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.

**HP-09 DARK — Prompt (copy-paste):**

> **HOUSE STYLE (transparent plate art) —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome **light ink (`#ECE7DA`)** line work on a **fully transparent background** (alpha channel — no canvas fill of any color), with a single restrained **oxblood** accent (`#C2554D`) used for one small emphasis mark only. Calm, authoritative, editorial. Flat 2D, print-quality line work. No gradients, no glossy 3D, no photographic realism, no drop shadows, no ground or backdrop of any kind.
>
> **EDGES / BACKGROUND (critical):** The background must be **100% transparent** — alpha, not white, not cream, not black, not any solid color or texture. The composition sits centered with generous margin; linework thins and feathers softly toward the margins; **nothing touches or is clipped by any edge**. No border, no frame, no rectangle, no outline, no vignette fill.
>
> **Subject:** A landscape 16:10 engraved vignette. Centered, a sturdy **archive chest** in fine engraved line work — banded wood, lock hasp, two small drawers — its lid slightly open showing neat ledger folders standing inside. **Five blank hang-tags** (small rectangles with a hole and short string, completely blank faces) fan out from the chest, tied by string, two on the left, one on top, two on the right, each angled differently and held fully inside the composition. The chest's central **hasp** carries the lone **oxblood** accent. Quiet, grounded, print-quality; generous margin all around.
>
> **AVOID —** any solid, filled, or textured background (transparent only), any border / frame / rectangle / box / outline, elements touching or clipped by the edges, hard straight edges, gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy backgrounds, watermark, signature, extra logos, **any text, letters, words, numbers, typography, captions, or labels** (the hang-tags are blank), lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.


---

## HP-10…HP-11 — Problem/answer diptych + context economy (user-directed amendment)

> **Provenance:** generated during `PLAN_home_storytelling_upgrade` (Task 15) and mirrored here as canonical.

### HP-10 — The problem and the answer (drift vs charted course)

- **Target surface:** `src/components/home/Pitch.astro` → section illustration (text right, art left).
- **Type:** illustration · **Priority:** high
- **Purpose:** The problem and the answer in one image: drift in the fog versus a plotted course to harbor.
- **Aspect & dimensions:** 16:10 · 1600 × 1000 px · PNG transparent · ≤ 400 KB
- **Light/dark strategy:** transparent — dual-ink pair.
- **In-image text (EN):** none · **(ES):** none
- **Suggested asset path:** `public/images/visuals/home/plate-pitch-problem.png` (light) · `plate-pitch-problem-dark.png` (dark)
- **Alt text (EN):** An engraved diptych: a ship adrift in fog beside jagged rocks on one side, and the same ship steady on a plotted course toward a harbor beacon on the other.
- **Alt text (ES):** Un díptico grabado: un barco a la deriva en la niebla junto a rocas escarpadas a un lado, y el mismo barco firme sobre un rumbo trazado hacia una baliza de puerto al otro.
- **Integration note:** img pair (light `dark:hidden`, dark `hidden dark:block`) in the Pitch left column, `width="1600" height="1000"`, `loading="lazy"`.

**HP-10 LIGHT — Prompt (copy-paste):**

> **HOUSE STYLE (transparent plate art) —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome warm ink (`#1B1A17`) line work on a **fully transparent background** (alpha channel — no canvas fill of any color), with a single restrained **oxblood** accent (`#7A1F1F`) used for one small emphasis mark only. Calm, authoritative, editorial. Flat 2D, print-quality line work. No gradients, no glossy 3D, no photographic realism, no drop shadows, no ground or backdrop of any kind.
>
> **EDGES / BACKGROUND (critical):** The background must be **100% transparent** — alpha, not white, not cream, not any solid color or paper texture. The composition sits centered with generous margin; linework thins and feathers softly toward the margins; **nothing touches or is clipped by any edge**. No border, no frame, no rectangle, no outline, no vignette fill.
>
> **Subject:** A landscape 16:10 engraved diptych split by a soft vertical fade (no hard line). LEFT: a sailing ship adrift in a fog bank amid jagged rocks — sails slack and askew, hull listing, an oar drifting loose — hatched denser to feel lost and heavy. RIGHT: the same class of ship steady and upright on calm swells, sails set with purpose, following a single **oxblood** plotted course line that sweeps from the lower left up toward a small harbor beacon with a tiny flame at the far right. The fog only troubles the left half; the right half breathes calm, open water. Quiet storytelling, print-quality.
>
> **AVOID —** any solid, filled, or textured background (transparent only), any border / frame / rectangle / box / outline, elements touching or clipped by the edges, hard straight edges, gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy backgrounds, watermark, signature, extra logos, **any text, letters, words, numbers, typography, captions, or labels**, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.

**HP-10 DARK — Prompt (copy-paste):**

> **HOUSE STYLE (transparent plate art) —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome **light ink (`#ECE7DA`)** line work on a **fully transparent background** (alpha channel — no canvas fill of any color), with a single restrained **oxblood** accent (`#C2554D`) used for one small emphasis mark only. Calm, authoritative, editorial. Flat 2D, print-quality line work. No gradients, no glossy 3D, no photographic realism, no drop shadows, no ground or backdrop of any kind.
>
> **EDGES / BACKGROUND (critical):** The background must be **100% transparent** — alpha, not white, not black, not any solid color or texture. The composition sits centered with generous margin; linework thins and feathers softly toward the margins; **nothing touches or is clipped by any edge**. No border, no frame, no rectangle, no outline, no vignette fill.
>
> **Subject:** A landscape 16:10 engraved diptych split by a soft vertical fade (no hard line). LEFT: a sailing ship adrift in a fog bank amid jagged rocks — sails slack and askew, hull listing, an oar drifting loose — hatched denser to feel lost and heavy. RIGHT: the same class of ship steady and upright on calm swells, sails set with purpose, following a single **oxblood** plotted course line that sweeps from the lower left up toward a small harbor beacon with a tiny flame at the far right. The fog only troubles the left half; the right half breathes calm, open water. Quiet storytelling, print-quality.
>
> **AVOID —** any solid, filled, or textured background (transparent only), any border / frame / rectangle / box / outline, elements touching or clipped by the edges, hard straight edges, gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy backgrounds, watermark, signature, extra logos, **any text, letters, words, numbers, typography, captions, or labels**, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.

### HP-11 — Every token counts (the context economy)

- **Target surface:** `src/components/diagrams/home/ContextEconomy.astro` → Act V plate art (new fifth act).
- **Type:** illustration · **Priority:** high
- **Purpose:** The efficiency story made physical: context is measured supply — loaded progressively, spent deliberately, tallied where it happens.
- **Aspect & dimensions:** 16:10 · 1600 × 1000 px · PNG transparent · ≤ 400 KB
- **Light/dark strategy:** transparent — dual-ink pair.
- **In-image text (EN):** none · **(ES):** none
- **Suggested asset path:** `public/images/visuals/home/plate-context-economy.png` (light) · `plate-context-economy-dark.png` (dark)
- **Alt text (EN):** An engraved purser's cabin: a balance scale weighing cargo crates against a strongbox beside an open ledger with blank tally rows — an engraving evoking that every token counts.
- **Alt text (ES):** La cabina del contramastrer grabada: una balanza que pesa cajas de carga contra una caja fuerte junto a un libro de cuentas con filas de tally en blanco — un grabado que evoca que cada token cuenta.
- **Integration note:** img pair in the Act V editorial-plate frame (light `dark:hidden`, dark `hidden dark:block`), `width="1600" height="1000"`, `loading="lazy"`, class `plate-frame-img`.

**HP-11 LIGHT — Prompt (copy-paste):**

> **HOUSE STYLE (transparent plate art) —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome warm ink (`#1B1A17`) line work on a **fully transparent background** (alpha channel — no canvas fill of any color), with a single restrained **oxblood** accent (`#7A1F1F`) used for one small emphasis mark only. Calm, authoritative, editorial. Flat 2D, print-quality line work. No gradients, no glossy 3D, no photographic realism, no drop shadows, no ground or backdrop of any kind.
>
> **EDGES / BACKGROUND (critical):** The background must be **100% transparent** — alpha, not white, not cream, not any solid color or paper texture. The composition sits centered with generous margin; linework thins and feathers softly toward the margins; **nothing touches or is clipped by any edge**. No border, no frame, no rectangle, no outline, no vignette fill.
>
> **Subject:** A landscape 16:10 engraved vignette of a ship's purser cabin. Center-right: a fine engraved **balance scale** weighing a small stack of cargo crates against a compact strongbox, its pointer perfectly level — the pointer is the lone **oxblood** accent. Left: an open **ledger book** with blank tally rows (no writing) and a few loose counting discs beside it. Behind, a round porthole framing a calm sea horizon, high in the composition. Everything measured, orderly, deliberate — supply counted, nothing wasted. Print-quality.
>
> **AVOID —** any solid, filled, or textured background (transparent only), any border / frame / rectangle / box / outline, elements touching or clipped by the edges, hard straight edges, gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy backgrounds, watermark, signature, extra logos, **any text, letters, words, numbers, typography, captions, or labels** (ledger rows and tally marks are blank), lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.

**HP-11 DARK — Prompt (copy-paste):**

> **HOUSE STYLE (transparent plate art) —** Fine ink-line engraving / etched cross-hatching, in the manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome **light ink (`#ECE7DA`)** line work on a **fully transparent background** (alpha channel — no canvas fill of any color), with a single restrained **oxblood** accent (`#C2554D`) used for one small emphasis mark only. Calm, authoritative, editorial. Flat 2D, print-quality line work. No gradients, no glossy 3D, no photographic realism, no drop shadows, no ground or backdrop of any kind.
>
> **EDGES / BACKGROUND (critical):** The background must be **100% transparent** — alpha, not white, not black, not any solid color or texture. The composition sits centered with generous margin; linework thins and feathers softly toward the margins; **nothing touches or is clipped by any edge**. No border, no frame, no rectangle, no outline, no vignette fill.
>
> **Subject:** A landscape 16:10 engraved vignette of a ship's purser cabin. Center-right: a fine engraved **balance scale** weighing a small stack of cargo crates against a compact strongbox, its pointer perfectly level — the pointer is the lone **oxblood** accent. Left: an open **ledger book** with blank tally rows (no writing) and a few loose counting discs beside it. Behind, a round porthole framing a calm sea horizon, high in the composition. Everything measured, orderly, deliberate — supply counted, nothing wasted. Print-quality.
>
> **AVOID —** any solid, filled, or textured background (transparent only), any border / frame / rectangle / box / outline, elements touching or clipped by the edges, hard straight edges, gradients, glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy backgrounds, watermark, signature, extra logos, **any text, letters, words, numbers, typography, captions, or labels** (ledger rows and tally marks are blank), lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.


## Coverage (homepage)

| ID | Kind | Status |
| :-- | :-- | :-- |
| HP-01 | illustration (image) | done — hero faro |
| HP-02 | illustration (image) | done — pitch chart |
| HP-03 | diagram (component) | done — `QuickstartFlow` |
| HP-04 | diagram (component) | done — `OnboardingSequence` |
| HP-05 | diagram (component) | done — `ArchetypesCompare` |
| HP-06 | illustration (image) | done — `HumansSteer` (integrated) |
| HP-07 | illustration (image) | done — `PlanNoDrift` (integrated) |
| HP-08 | illustration (image) | done — `DoneIsAContract` (integrated) |
| HP-09 | illustration (image) | done — `RepoAsHarnessPlate` (integrated) |
| HP-10 | illustration (image) | done — `Pitch` problem/answer diptych |
| HP-11 | illustration (image) | done — `ContextEconomy` Act V |
| Comparison | — | skip (table → CSS ticks) |
| Origin | — | skip (already has logo) |
