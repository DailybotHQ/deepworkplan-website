# Writing Voice Guide

> **Companion doc:** [Writing Craft Guide](./WRITING_CRAFT_GUIDE.md) — covers narrative structure, fact verification, quote handling, figure markup, refinement patterns, and case studies. This guide focuses on **voice** (vocabulary, tone, anti-AI-slop); the craft guide focuses on **how to build an article**. Both are mandatory reading.

## 1. Purpose

Avoiding AI slop in blog content is critical. An internal audit identified 6 specific patterns that trigger the perception of AI-generated writing, and this document captures the author's authentic voice characteristics and provides a checklist to prevent AI-sloppy content going forward.

## 2. The Author's Voice (Based on Older Posts)

**Source posts:** "How We Got Into Y Combinator" (2024), "Looking for Product Market Fit" (2024)

### Authority
Hard-won, not assumed. "We learned..." not "Studies show..." Authority comes from lived experience, not citations.

### Sentence Rhythm
High variance. Short punchy openers ("We applied. And got rejected.") mixed with longer explanatory sentences. Not every sentence is the same length.

### Tangents and Asides
Strategic em-dash interruptions for mid-thought corrections: "Not to pitch. To listen." Parenthetical asides that show the author thinking out loud.

### Failure Voice
Direct, clinical, not self-pitying. Failure = data. "Most of them went nowhere." "Unit economics never worked." Failure is stated matter-of-factly, not dramatized.

### Roughness
Run-on sentences, thinking-out-loud moments. "Here's what I remember:" — not every transition is smooth. Some sentences trail off into observation rather than landing with a clean conclusion.

### Humor
Dry, self-aware. "We built the tool, but didn't build the audience."

### Specificity
Names products that failed (Bootstrup, Club Kechef, Lanzador, Neurocicla, Moli Market, KidTrix). Cites specific metrics ($1K to $5K to $15K MRR). Uses real project names, dates, and places.

### Signature Phrases
- "The problem:" diagnostic framing
- "Lesson:" after each failure
- "Let's keep building." as closer

### Confidence
Grounded in evidence, admits uncertainty ("I think that answer landed"). Never bluffs past what he knows.

### Things the Voice NEVER Does
- Hides uncertainty
- Exaggerates accomplishments
- Blames others
- Uses marketing language in the body
- Claims false modesty
- Uses voseo in Spanish (no `tenés`, `podés`, `sabés` — always tuteo: `tienes`, `puedes`, `sabes`)

## 3. AI Slop Patterns to AVOID

| Pattern | Example (BAD) | Example (GOOD) |
|---------|---------------|-----------------|
| Over-polishing | "That simplicity wasn't a limitation — it was the web's greatest feature. The barrier to entry was low. The feedback loop was instant." | "It worked. No bundlers, no transpilers, no configuration ritual before you could render Hello World." |
| Data obsession | 5 subsections of survey citations with tables: State of JS, Rising Stars, Stack Overflow, Aggregate Picture | "The surveys all point the same way: 88% retention. That's rare in JavaScript land." |
| Structural regularity | Every post: Hook > Problem > Solution > Data > Conclusion. Every section: Statement > Explanation > Code > Transition | Vary structure: sometimes code first, sometimes a question, sometimes just a 2-sentence section |
| No failure narratives | "Astro changed everything for me. When I first discovered it, the feeling was immediate" | "I spent hours on a broken config. Nothing rendered. Then I found the docs." |
| Length explosion | 5,000-10,000 word posts covering every angle | 2,500-4,000 words. Cut redundant evidence, merge similar sections |
| AI vocabulary | "genuinely," "comprehensive," "this is where X shines," "radical premise," "beautifully simple" | "actually," "real," "this is where they win," "simple bet," "small" |
| Series recap dump | "In chapter one I did X. In chapter two I did Y. In chapter three I did Z. In chapter four I did W." — enumerating every prior chapter at the opening of each new one | Open with the new chapter's own hook. Reference prior chapters only when directly relevant — a phrase, a link, a sentence. The series navigation shows the full list; the opening should feel like a conversation, not an index. |
| Bridge/teaser sections | "## The Bridge to Chapter 7" — ending a chapter with a long preview of the next one, naming specific features, creating a cliffhanger | End each chapter on its own conclusion. The series navigation shows what's next. A brief forward-looking sentence ("Let's keep building.") is fine; a multi-paragraph teaser is not. |
| Excessive cross-references | "In chapter three I covered X. In chapter six I mentioned Y. As I explained in chapter one..." — multiple explicit "chapter N" references throughout the body | Weave context naturally: state the fact, optionally link it. "The analytics stack uses Umami" is better than "In chapter three, I set up Umami." Each post should stand on its own. |

## 4. Humanization Patterns to INCLUDE

- At least 1 failure or struggle per post (something that went wrong, took too long, or surprised you)
- At least 2 tangents or asides (em-dash interruptions, parenthetical thoughts)
- Mix of sentence lengths (some 5-word, some 30-word)
- At least 1 moment of uncertainty ("I'm not sure," "looking back," "honestly")
- Personal specifics (names, dates, places, project names, version numbers)
- Rough transitions (not every section needs a smooth bridge)
- At least 1 opinion stated without evidence ("I think," "in my experience")

## 5. No Placeholder Content (MANDATORY)

**Published posts must NEVER contain placeholder text.** Placeholders like `[AUTHOR: ...]`, `[TODO: ...]`, `[TBD]`, `[FIXME]`, or any bracketed instruction to "fill in later" destroy credibility — they are a visible signal that content was not fully reviewed.

- Replace placeholders with real content or remove the section entirely
- Run the grep below before publishing

```bash
grep -rn '\[AUTHOR:\|\[AUTOR:\|\[TODO:\|\[TBD\]\|\[FIXME\]' src/content/blog/
```

Expected: zero matches. If any match is found, fix before committing.

## 6. Pre-Publish Checklist

```
[ ] Does the post include at least 1 failure or struggle?
[ ] Is there at least 1 tangent or aside?
[ ] Are there moments of uncertainty or "I think"?
[ ] Is the data-to-opinion ratio balanced? (not stat > stat > stat)
[ ] Does the structure differ from the last 3 posts?
[ ] Is the word count under 5000? (or justified if longer)
[ ] Would the opening paragraph make sense as a text to a friend?
[ ] Read it aloud — does it sound like you talking, or a report?
[ ] Does every section have at least some sentence length variety?
[ ] Is there at least 1 sentence that starts with "Honestly" or "I think"?
[ ] Spanish content uses tuteo (tú), not voseo (vos)?
```

## 7. AI Vocabulary Blocklist

Words and phrases to search for and replace before publishing:

| Phrase | Replace with |
|--------|-------------|
| "In the ever-evolving world of..." | Cut entirely |
| "The answer is clear:" | Just state the answer |
| "This is where X shines" | "this is where they win" or state the advantage |
| "leveraging" / "harnessing" | "using" |
| "revolutionary" / "game-changer" | Cut or be specific about what changed |
| "genuinely" (as intensifier) | "actually" or "real" or cut |
| "comprehensive" | Use specific count or cut |
| "best-in-class" | "best free option" or be specific |
| "radical premise" | "simple bet" or "obvious idea" |
| "beautifully simple" | "small" or "clean" |
| "worth highlighting" / "worth calling out" | Just state the thing |
| "the key insight" / "the key takeaway" | State the insight directly |
| "One of the key architectural decisions" | Just describe the decision |
| "It's like a law of..." | Cut forced metaphors |
| "X with superpowers" | Describe the actual capabilities |
| "What makes this X remarkable" | Just state the facts |
| "genuine architectural advantage" | "real advantage" |
| Three-part negation ("No X. No Y. No Z.") | Use 2-part, or a single sentence |
| "What excites me most about X isn't just Y. It's what they represent:" | "What I like about this stack isn't the benchmarks. It's the direction." |
| "I am particularly pleased with" | Cut — just show the thing |

### Quick search command

```bash
grep -rn 'genuinely\|comprehensive\|best-in-class\|beautifully\|radical premise\|worth highlighting\|worth calling out\|key insight\|key takeaway\|this is where.*shines\|game-changer\|revolutionary\|leveraging\|harnessing' src/content/blog/en/
```

## 8. Voice for Accessible Technical Writing

**Principle:** Every post on this blog is technical by default, but the voice should let anyone follow along — not only a reader who already knows the domain. This section covers the vocabulary and register moves that keep the voice approachable without softening the argument.

> For the full refinement patterns (describe-before-name, "Traducción:" bridges, concrete analogies, narrative openers, etc.), see **[Writing Craft Guide § 15 — Making technical content accessible](./WRITING_CRAFT_GUIDE.md#making-technical-content-accessible-from-the-agentic-web-refinement)**. That section has before/after examples. This section covers the *voice* side of the same problem.

### Avoid regional slang in broad claims

Colombian / Caribbean colloquialisms are great in personal asides ("nos la pegó", "la jugada fue") but weaken broad claims where the reader expects precision. Use universal verbs when the sentence is making a case, not telling a personal story.

| Avoid (regional) | Prefer (universal) |
|------------------|--------------------|
| "se va a pegar" / "se pegan" (meaning *catch on, take hold*) | "va a funcionar", "se va a imponer", "prospera", "prende" |
| "el balde completo de..." (as intensifier) | "el bloque completo de...", "toda la categoría de..." |
| "cuaja" (works in some contexts, regional in others) | "funciona", "se consolida" |
| "nos la pegaron" (as "they succeeded") | "les salió", "funcionó" |

**Rule of thumb:** if the sentence is a diagnosis or an argument, the verb should be one a Spanish-speaking reader from any country can parse without looking up. Save the regional color for personal asides.

### No Spanglish in headings or claims

A single English word dropped into a Spanish sentence reads as jargon-theatre. It's especially jarring in headings, which the reader parses slower.

- **Bad**: `## 6. Los estándares: este es el turn real de la semana` — "turn" mid-Spanish sentence.
- **Good**: `## 6. Los estándares: aquí la semana da el giro más interesante` — same meaning, fully Spanish.

Exceptions: brand names, product names, technical terms without a clean Spanish equivalent (MCP, OAuth, RFC, webhook). These are accepted — what's not accepted is English verbs / adjectives used where Spanish has a clean alternative.

### Prefer universal intensifiers over regional ones

| Avoid | Prefer |
|-------|--------|
| "el balde completo" | "el bloque completo", "toda la categoría" |
| "full" (in Spanish) | "al máximo", "completo", "en su totalidad" |
| "cabal" (some regions) | "completo", "entero" |

### Specific subjects in closers

Closers that rely on abstractions ("la web", "el ecosistema", "la industria") land flat because there's nobody accountable in the sentence. Replace with a specific collective that includes the reader — and use first-person plural when it's honest.

- **Abstract**: *"gane o pierda, la web queda mejor."*
- **Concrete**: *"gane o pierda, los que construimos en la web salimos ganando."*

The second version puts the reader in the sentence via "los que construimos" + "salimos" (we). It also makes the claim falsifiable — you're saying something about builders, not about an abstract system.

### Bridge jargon with one familiar anchor, not three

The temptation when a term is unfamiliar is to explain it at length. Don't. Pair it with **one** well-known reference and move on.

- **Too much**: *"Huffman coding — a lossless compression scheme invented in 1952 by David Huffman at MIT, based on variable-length codes derived from symbol frequency distributions — applied to the model's weights."*
- **Right**: *"Huffman coding — the same lossless trick a `.zip` file uses — applied to the model's weights."*

One em-dash aside. One familiar anchor (`.zip`, `HTTPS`, `DNS`, `HTTP`, `HTML`). The reader learns enough to keep reading without feeling quizzed.

### Signal the translation

When you follow a dense technical paragraph with a plain-language restatement, mark it explicitly. `Traducción:` / `Translation:` as a sentence opener tells scanning readers "here's the takeaway" and signals to careful readers "I heard you, the previous paragraph was dense."

- **Example**: *"Managed OAuth for Access y los nuevos formatos de tokens le dan a los agentes credenciales reales y revocables. Cloudflare Mesh les da una red privada… **Traducción: el agente ya puede entrar como un usuario más, con permisos auditables.**"*

Use sparingly — once per major section at most. If you need it after every paragraph, the paragraphs are too dense.

### Accessibility does not mean dumbing down

The goal is not to remove technical substance. It's to make sure a reader who doesn't already know the term can still follow the argument. Keep the specs, keep the RFC numbers, keep the precise claims — but around each dense beat, leave a breadcrumb that a non-specialist can follow.

**Pre-publish check for this section:**

- [ ] Does the post have at least one concrete analogy per major technical term?
- [ ] Is there at least one "Traducción:" / "Translation:" bridge after the densest section?
- [ ] Are headings fully in their target language (no Spanglish)?
- [ ] Does the closer use a specific subject (not "la web" / "the ecosystem")?
- [ ] If a reader skimmed only the first sentence of each paragraph, would they still get the argument?
