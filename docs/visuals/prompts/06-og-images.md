# OG image prompts — English baseline + 16 localizations

Generate the Open Graph hero image used by every page of deepworkplan.com.
This file is the **single source of truth** for the design, the strings to draw,
and the per-language variants.

- **Format:** PNG · **Dimensions:** 1200 × 630
- **Target file size:** 250 – 400 KB (compress with `cwebp`/`pngquant` if larger)
- **Output path:**
  - English (default): `public/images/og/og-default.png`
  - Localized: `public/images/og/og-default-<code>.png` (e.g. `og-default-es.png`,
    `og-default-pt.png`, `og-default-zh.png`, …)

`BaseHead.astro` detects localized variants automatically via `existsSync`
(`resolveDefaultOgImage(lang)`), so just dropping the file in is enough — no
code change required. Languages without a localized file fall back to
`og-default.png`.

---

## Global rules — apply to EVERY prompt below

These elements are **the same in every locale** (the localized variants share
the English design entirely, only the text strings change):

- **Logo monogram** `DWP` — keep as-is, never translate.
- **Wordmark** `Deep Work Plan` — brand name, never translate.
- **URL** `deepworkplan.com` — never translate.
- **Phrase** `MIT LICENSE` — keep as-is in the top strip (it is a software-licence legal term, not prose).
- **Lighthouse engraving** (right side of the canvas) — keep the same illustration, same warm-grey woodcut style, same composition.
- **Layout** — same masthead kicker strip, same headline + body block on the left, same italic pull-quote position, same URL footer.
- **Palette** — warm cream paper `#F7F4EC` background, ink near-black `#1A1A1A` body, oxblood `#7A1F1F` accent, hairline rules.
- **Typography** — editorial serif display for the wordmark, headline pair, and pull-quote (a stack like Iowan Old Style / Newsreader / Source Serif 4 / Charter / Georgia); small-caps with wide letter-spacing for the top kicker strip; italic for the pull-quote.

The four **localizable surfaces** per language are:

1. The top kicker strip — three small-caps tokens separated by `·`. The middle
   one is always `MIT LICENSE`; the first and third are translated.
2. A right-aligned tagline on the top strip.
3. The editorial **headline pair** (two lines, the second line in oxblood).
4. The body paragraph and the italic **pull-quote**.

Each prompt below provides the exact text to draw for those four surfaces. The
strings come from the verified site translations (`src/lib/translations/<code>.ts`)
so the OG image is consistent with what every page actually says.

---

## 0. English baseline — `og-default.png`

> This is the **reference**. Generate this one first; every other variant is
> built from it.

**Native name:** English · **Script:** Latin · **Register:** professional, editorial.

```
Design a 1200×630 PNG Open Graph image in an editorial "Broadsheet" newspaper aesthetic.

LAYOUT (left two-thirds = type, right one-third = engraving):
- Background: warm cream paper #F7F4EC. Subtle paper grain ok, no heavy texture.
- A hairline horizontal rule about 60px from the top.
- ABOVE the hairline: a single small-caps kicker strip in ink near-black #1A1A1A, wide letter-spacing (~0.18em). Three tokens separated by middle dots ` · `, all caps, plus a right-aligned tagline.
- A second hairline at the bottom (footer rule).
- BELOW the top hairline, in the left 2/3 of the canvas: the brand lockup (DWP monogram on the left, vertical hairline divider, "Deep Work Plan" serif wordmark stacked over the editorial headline pair).
- A short body paragraph in serif, ~3 lines, just below the headline.
- An italic pull-quote in the lower portion of the left column, set off by a thin oxblood vertical bar on its left.
- In the right 1/3 of the canvas: a vintage woodcut/engraving of a coastal LIGHTHOUSE on a rocky shore, with a single beam reaching out across calm water toward a small sailing vessel. Warm-grey ink on cream, no color.
- Bottom-left footer: the URL `deepworkplan.com` in a small monospace or serif, near-black.

PALETTE:
- Paper: #F7F4EC (warm cream)
- Ink: #1A1A1A (near-black, all body text and the DWP monogram + wordmark)
- Oxblood accent: #7A1F1F (used ONLY for the second headline line and the pull-quote's left vertical bar)

TYPOGRAPHY:
- Serif display (e.g. Iowan Old Style, Newsreader, Source Serif 4, Charter, Georgia) for the wordmark, the headline pair, and the pull-quote.
- Small-caps with ~0.18em letter-spacing for the top kicker strip.
- Italic serif for the pull-quote.

TEXT TO DRAW (exact):
- Top strip (small-caps, separated by " · "):
  "OPEN METHODOLOGY · MIT LICENSE · AGENT-AGNOSTIC"
- Right-aligned tagline on the top strip:
  "BUILD WITH CLARITY. SHIP WITH CONFIDENCE."
- DWP monogram on the left of the brand lockup.
- Serif wordmark: "Deep Work Plan"
- Editorial headline pair (two lines, very large serif, the second in oxblood):
  Line 1: "Models matter."
  Line 2 (oxblood accent): "Context matters more."
- Body paragraph below the headline:
  "A structured environment — context, guardrails, and a durable plan — where any coding agent finishes long-horizon work."
- Italic pull-quote (lower left, with oxblood left rule):
  "Spec-driven development where the repository itself becomes the harness."
- URL in the bottom-left footer:
  "deepworkplan.com"

OUTPUT: single PNG at exactly 1200×630, ~250–400 KB.
```

---

## How to localize — same design, swapped strings

For every other language, use `og-default.png` as the **visual reference** and
keep the layout, lighthouse engraving, palette, and typography **identical**.
Replace ONLY the four localizable surfaces with the per-language strings
listed below. Apply the locale-specific typography notes (CJK serif fallback,
Devanagari/Thai/Vietnamese diacritic-aware fonts, dotted-İ casing for Turkish,
etc.) when relevant.

> Each prompt below is **ready to copy/paste**. Attach `public/images/og/og-default.png`
> as the visual reference and paste the prompt.

---

### 1. Spanish — `og-default-es.png`

**Native name:** Español · **Script:** Latin · **Register:** professional, tuteo (informal-professional, matches the site)

**Locale notes:**
- Full diacritics: á, é, í, ó, ú, ñ, ¿/¡.
- Quotes typically «…» or "…" — keep simple in editorial OG.

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in Spanish at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values:

- Top strip (small-caps, in this order):
  "METODOLOGÍA ABIERTA · MIT LICENSE · INDEPENDIENTE DEL AGENTE"
- Right-aligned tagline on the top strip:
  "CONSTRUYE CON CLARIDAD. DESPLIEGA CON CONFIANZA."
- Editorial headline pair (large serif, the second line in oxblood, both on their own lines):
  Line 1: "Los modelos importan."
  Line 2 (oxblood accent): "El contexto importa más."
- Body paragraph (below the headline):
  "Un entorno estructurado — contexto, guardrails y un plan duradero — donde cualquier agente de código completa el trabajo de largo aliento."
- Italic pull-quote (bottom-right of the body block):
  "Desarrollo guiado por especificación donde el propio repositorio se convierte en el harness."

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 2. Portuguese — `og-default-pt.png`

**Native name:** Português · **Script:** Latin · **Register:** Brazilian Portuguese, professional

**Locale notes:**
- Use Brazilian register (avoid stiff European forms).
- Full diacritics: ã, õ, ç, á, ê, ó.

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in Brazilian Portuguese at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values:

- Top strip (small-caps, in this order):
  "METODOLOGIA ABERTA · MIT LICENSE · INDEPENDENTE DO AGENTE"
- Right-aligned tagline on the top strip:
  "CONSTRUA COM CLAREZA. ENVIE COM CONFIANÇA."
- Editorial headline pair (large serif, the second line in oxblood, both on their own lines):
  Line 1: "Os modelos importam."
  Line 2 (oxblood accent): "O contexto importa mais."
- Body paragraph (below the headline):
  "Um ambiente estruturado — contexto, salvaguardas e um plano duradouro — onde qualquer agente de código conclui trabalhos de longo prazo."
- Italic pull-quote (bottom-right of the body block):
  "Desenvolvimento orientado a especificação no qual o próprio repositório se torna o harness."

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 3. Chinese (Simplified) — `og-default-zh.png`

**Native name:** 中文 (简体) · **Script:** Simplified Han · **Punctuation:** full-width 。，

**Locale notes:**
- Simplified characters only (never Traditional).
- Full-width punctuation 。，：；！？
- No inter-word spaces. Use a serif CJK font (e.g. Source Han Serif SC, Noto Serif CJK SC) for the headline pair so it pairs with the Latin serif display.

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in Simplified Chinese at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Use a CJK serif (Source Han Serif SC / Noto Serif CJK SC) for Chinese characters and the existing Latin serif for the English brand elements. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values (full-width punctuation 。，throughout):

- Top strip (small-caps style for the Latin tokens, native characters for Chinese):
  "开放方法论 · MIT LICENSE · 智能体无关"
- Right-aligned tagline:
  "以清晰构建。以信心交付。"
- Editorial headline pair (the second line in oxblood):
  Line 1: "模型很重要。"
  Line 2 (oxblood accent): "上下文更重要。"
- Body paragraph:
  "一个结构化的环境 —— 上下文、防护栏与持久的计划 —— 让任意编码代理都能精准执行并完成长周期工作。"
- Italic pull-quote:
  "规范驱动的开发方式，在其中代码仓库本身成为执行的 harness。"

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 4. Japanese — `og-default-ja.png`

**Native name:** 日本語 · **Script:** Kanji + Hiragana + Katakana · **Punctuation:** full-width 。、

**Locale notes:**
- Polite form (です・ます調).
- Quotes `「…」`, full-width punctuation 。、.
- Use a Japanese serif (e.g. Source Han Serif JP, Noto Serif CJK JP).

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in Japanese at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Use a Japanese serif (Source Han Serif JP / Noto Serif CJK JP) for Japanese characters. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values (full-width punctuation 。、):

- Top strip:
  "オープンな方法論 · MIT LICENSE · エージェント非依存"
- Right-aligned tagline:
  "明快に構築し、自信を持って出荷する。"
- Editorial headline pair (the second line in oxblood):
  Line 1: "モデルは重要です。"
  Line 2 (oxblood accent): "コンテキストはさらに重要です。"
- Body paragraph:
  "構造化された環境 — コンテキスト、ガードレール、そして永続的な計画 — があれば、どのコーディングエージェントも長期にわたる作業をやり遂げます。"
- Italic pull-quote:
  "リポジトリそのものがハーネス（harness）になる、仕様駆動開発です。"

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 5. German — `og-default-de.png`

**Native name:** Deutsch · **Script:** Latin · **Register:** formal (Sie), capitalize nouns

**Locale notes:**
- Quotes „…".
- German nouns are capitalized.
- Watch line-breaks: compound nouns can be long.

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in German at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values (capitalize all German nouns):

- Top strip:
  "OFFENE METHODIK · MIT LICENSE · AGENTEN­UNABHÄNGIG"
- Right-aligned tagline:
  "MIT KLARHEIT BAUEN. MIT VERTRAUEN AUSLIEFERN."
- Editorial headline pair (the second line in oxblood):
  Line 1: "Modelle zählen."
  Line 2 (oxblood accent): "Kontext zählt mehr."
- Body paragraph:
  "Eine strukturierte Umgebung — Kontext, Leitplanken und ein dauerhafter Plan — in der jeder Coding-Agent langfristige Aufgaben abschließt."
- Italic pull-quote:
  "Spec-driven Development, bei der das Repository selbst zum Harness wird."

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 6. French — `og-default-fr.png`

**Native name:** Français · **Script:** Latin · **Register:** formal (vous)

**Locale notes:**
- Quotes « … » with **non-breaking spaces** inside.
- Non-breaking space before colons and high-punctuation `: ; ! ?`.
- Correct accents (é, è, ê, ç, œ) and typographic apostrophes (l'agent → l'agent).

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in French at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Use typographic apostrophes (' not ') and non-breaking spaces before high-punctuation. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values:

- Top strip:
  "MÉTHODOLOGIE OUVERTE · MIT LICENSE · INDÉPENDANT DE L'AGENT"
- Right-aligned tagline:
  "CONSTRUIRE AVEC CLARTÉ. LIVRER EN CONFIANCE."
- Editorial headline pair (the second line in oxblood):
  Line 1: "Les modèles comptent."
  Line 2 (oxblood accent): "Le contexte compte davantage."
- Body paragraph:
  "Un environnement structuré — contexte, garde-fous et un plan durable — où tout agent de code mène à terme un travail de longue haleine."
- Italic pull-quote:
  "Développement piloté par la spécification, où le dépôt lui-même devient le harness."

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 7. Korean — `og-default-ko.png`

**Native name:** 한국어 · **Script:** Hangul · **Register:** polite 해요체

**Locale notes:**
- Polite 해요체 (consistent register).
- Correct Hangul spacing (띄어쓰기).
- Use a Korean serif (e.g. Source Han Serif K, Noto Serif KR).

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in Korean at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Use a Korean serif (Source Han Serif K / Noto Serif KR) for Hangul. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values:

- Top strip:
  "오픈 방법론 · MIT LICENSE · 에이전트 독립적"
- Right-aligned tagline:
  "명료함으로 만들고, 확신으로 출시하세요."
- Editorial headline pair (the second line in oxblood):
  Line 1: "모델은 중요합니다."
  Line 2 (oxblood accent): "컨텍스트는 더 중요합니다."
- Body paragraph:
  "구조화된 환경 — 컨텍스트, 가드레일, 견고한 계획 — 에서 어떤 코딩 에이전트든 장시간 작업을 끝까지 완수합니다."
- Italic pull-quote:
  "리포지토리 자체가 하니스(harness)가 되는 스펙 주도 개발입니다."

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 8. Russian — `og-default-ru.png`

**Native name:** Русский · **Script:** Cyrillic · **Register:** formal (вы)

**Locale notes:**
- Quotes « … » (ёлочки).
- Use ё where it belongs (не e).
- Use a Cyrillic-capable serif.

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in Russian at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Use a Cyrillic-capable serif. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values:

- Top strip:
  "ОТКРЫТАЯ МЕТОДОЛОГИЯ · MIT LICENSE · НЕЗАВИСИМО ОТ АГЕНТА"
- Right-aligned tagline:
  "СТРОЙТЕ С ЯСНОСТЬЮ. ВЫПУСКАЙТЕ С УВЕРЕННОСТЬЮ."
- Editorial headline pair (the second line in oxblood):
  Line 1: "Модели важны."
  Line 2 (oxblood accent): "Контекст важнее."
- Body paragraph:
  "Структурированная среда — контекст, ограничители и долговечный план — в которой любой агент разработки доводит до конца долгосрочные задачи."
- Italic pull-quote:
  "Spec-driven-разработка, в которой сам репозиторий становится harness."

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 9. Italian — `og-default-it.png`

**Native name:** Italiano · **Script:** Latin · **Register:** formal (Lei) for direct address

**Locale notes:**
- Quotes « … » or "…".
- Correct accents (à, è, é, ì, ò, ù).

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in Italian at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values:

- Top strip:
  "METODOLOGIA APERTA · MIT LICENSE · INDIPENDENTE DALL'AGENTE"
- Right-aligned tagline:
  "COSTRUISCI CON CHIAREZZA. RILASCIA CON FIDUCIA."
- Editorial headline pair (the second line in oxblood):
  Line 1: "I modelli contano."
  Line 2 (oxblood accent): "Il contesto conta di più."
- Body paragraph:
  "Un ambiente strutturato — contesto, salvaguardie e un piano duraturo — in cui ogni agente di coding porta a termine il lavoro a lungo termine."
- Italic pull-quote:
  "Spec-driven development in cui il repository stesso diventa la harness."

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 10. Turkish — `og-default-tr.png`

**Native name:** Türkçe · **Script:** Latin · **Register:** standard professional

**Locale notes:**
- **Critical:** dotted/dotless İ/ı casing — `İ` uppercases from `i`, `I` uppercases from `ı`. Never lowercase `I` to `i`.
- Diacritics: ş, ğ, ç, ö, ü.

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in Turkish at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE". CRITICAL: preserve Turkish dotted/dotless İ/ı casing exactly — never lowercase I to i.

Replace ONLY the localized strings with these exact values:

- Top strip:
  "AÇIK METODOLOJİ · MIT LICENSE · AJANDAN BAĞIMSIZ"
- Right-aligned tagline:
  "NETLİKLE İNŞA EDİN. GÜVENLE YAYINLAYIN."
- Editorial headline pair (the second line in oxblood):
  Line 1: "Modeller önemlidir."
  Line 2 (oxblood accent): "Bağlam daha da önemlidir."
- Body paragraph:
  "Yapılandırılmış bir ortam — bağlam, güvenlik bariyerleri ve kalıcı bir plan — herhangi bir kodlama ajanının uzun soluklu işi tamamladığı yer."
- Italic pull-quote:
  "Deponun kendisinin harness haline geldiği spec odaklı geliştirme."

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 11. Indonesian — `og-default-id.png`

**Native name:** Bahasa Indonesia · **Script:** Latin · **Register:** standard professional (EYD)

**Locale notes:**
- Standard Indonesian (EYD) spelling.
- Keep widely-used English dev terms (repository, agent) where natural.

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in Bahasa Indonesia at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values:

- Top strip:
  "METODOLOGI TERBUKA · MIT LICENSE · AGEN-AGNOSTIK"
- Right-aligned tagline:
  "BANGUN DENGAN KEJELASAN. RILIS DENGAN KEYAKINAN."
- Editorial headline pair (the second line in oxblood):
  Line 1: "Model itu penting."
  Line 2 (oxblood accent): "Konteks lebih penting."
- Body paragraph:
  "Lingkungan terstruktur — konteks, pengaman, dan rencana yang tahan lama — tempat coding agent mana pun menyelesaikan pekerjaan jangka panjang."
- Italic pull-quote:
  "Spec-driven development tempat repositori itu sendiri menjadi harness."

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 12. Vietnamese — `og-default-vi.png`

**Native name:** Tiếng Việt · **Script:** Latin with extensive diacritics

**Locale notes:**
- **Critical:** every tone mark and diacritic must be intact (ắ, ằ, ệ, ơ, ư, đ, …). Dropped diacritics are an error.
- Use a serif that supports the full Vietnamese diacritic range (e.g. Source Serif 4).

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in Vietnamese at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Use a serif font that supports the full Vietnamese diacritic set (e.g. Source Serif 4, Spectral). CRITICAL: every tone mark and diacritic must render correctly — dropped diacritics are an error. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values:

- Top strip:
  "PHƯƠNG PHÁP LUẬN MỞ · MIT LICENSE · ĐỘC LẬP VỚI AGENT"
- Right-aligned tagline:
  "XÂY DỰNG RÕ RÀNG. PHÁT HÀNH TỰ TIN."
- Editorial headline pair (the second line in oxblood):
  Line 1: "Mô hình quan trọng."
  Line 2 (oxblood accent): "Ngữ cảnh quan trọng hơn."
- Body paragraph:
  "Một môi trường có cấu trúc — ngữ cảnh, hàng rào bảo vệ và một kế hoạch bền vững — nơi bất kỳ agent lập trình nào cũng hoàn thành công việc dài hơi."
- Italic pull-quote:
  "Phát triển dựa trên đặc tả, nơi bản thân repository trở thành harness."

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 13. Hindi — `og-default-hi.png`

**Native name:** हिन्दी · **Script:** Devanagari

**Locale notes:**
- Devanagari script throughout. Use a Devanagari-capable serif (e.g. Noto Serif Devanagari, Tiro Devanagari Hindi).
- Established English dev terms may stay in Latin (e.g. `repository`, `harness`) — the body prose itself must be Devanagari.

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in Hindi at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Use a Devanagari-capable serif (Noto Serif Devanagari / Tiro Devanagari Hindi) for Hindi text and the existing Latin serif for English brand elements. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values:

- Top strip:
  "ओपन मेथडोलॉजी · MIT LICENSE · एजेंट-न्यूट्रल"
- Right-aligned tagline:
  "स्पष्टता से बनाएँ। आत्मविश्वास से शिप करें।"
- Editorial headline pair (the second line in oxblood):
  Line 1: "मॉडल मायने रखते हैं।"
  Line 2 (oxblood accent): "कॉन्टेक्स्ट और भी ज़्यादा।"
- Body paragraph:
  "एक संरचित वातावरण — कॉन्टेक्स्ट, सुरक्षा-कवच और एक टिकाऊ योजना — जहाँ कोई भी कोडिंग एजेंट लंबे समय तक चलने वाला काम पूरा करता है।"
- Italic pull-quote:
  "स्पेक-ड्रिवन डेवलपमेंट, जहाँ रिपॉज़िटरी स्वयं हार्नेस बन जाती है।"

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 14. Polish — `og-default-pl.png`

**Native name:** Polski · **Script:** Latin · **Register:** formal

**Locale notes:**
- Polish diacritics: ą, ć, ę, ł, ń, ó, ś, ź, ż.
- Quotes „…".
- Correct case declension.

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in Polish at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values:

- Top strip:
  "OTWARTA METODOLOGIA · MIT LICENSE · NIEZALEŻNE OD AGENTA"
- Right-aligned tagline:
  "BUDUJ Z JASNOŚCIĄ. WYPUSZCZAJ Z PEWNOŚCIĄ."
- Editorial headline pair (the second line in oxblood):
  Line 1: "Modele mają znaczenie."
  Line 2 (oxblood accent): "Kontekst znaczy więcej."
- Body paragraph:
  "Uporządkowane środowisko — kontekst, zabezpieczenia i trwały plan — w którym każdy agent kodujący kończy długodystansową pracę."
- Italic pull-quote:
  "Spec-driven development, w którym samo repozytorium staje się harness."

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 15. Ukrainian — `og-default-uk.png`

**Native name:** Українська · **Script:** Cyrillic · **NOT Russian** — use Ukrainian letters

**Locale notes:**
- **Critical:** Ukrainian — uses ї, є, і, ґ. Never substitute Russian forms (и, ы, э).
- Quotes « … ».

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in Ukrainian at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Use a Cyrillic-capable serif. CRITICAL: this is UKRAINIAN, not Russian — use ї, є, і, ґ where appropriate, never Russian и/ы/э equivalents. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values:

- Top strip:
  "ВІДКРИТА МЕТОДОЛОГІЯ · MIT LICENSE · НЕЗАЛЕЖНО ВІД АГЕНТА"
- Right-aligned tagline:
  "БУДУЙТЕ З ЯСНІСТЮ. ВИПУСКАЙТЕ З УПЕВНЕНІСТЮ."
- Editorial headline pair (the second line in oxblood):
  Line 1: "Моделі важливі."
  Line 2 (oxblood accent): "Контекст важливіший."
- Body paragraph:
  "Структуроване середовище — контекст, запобіжники та стійкий план — де будь-який агент програмування доводить тривалі завдання до кінця."
- Italic pull-quote:
  "Spec-driven розробка, у якій сам репозиторій стає harness."

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

### 16. Thai — `og-default-th.png`

**Native name:** ไทย · **Script:** Thai (no inter-word spaces)

**Locale notes:**
- Thai script. Use a Thai-capable serif/display (e.g. Sarabun, Mitr, Noto Serif Thai).
- No spaces between words inside a clause — segment by phrase for line breaks.

```
Using the attached image (og-default.png) as the visual reference, generate an Open Graph variant in Thai at 1200×630 PNG. Keep the exact composition, lighthouse engraving, warm-paper palette, serif typography, hairline rules, and oxblood accent. Use a Thai-capable display/serif (Sarabun, Mitr, Noto Serif Thai) for Thai text and the existing Latin serif for English brand elements. Thai has no spaces between words within a clause — segment by phrase only at natural line breaks. Do NOT translate: "DWP", "Deep Work Plan", "deepworkplan.com", and the phrase "MIT LICENSE".

Replace ONLY the localized strings with these exact values:

- Top strip:
  "วิธีการแบบเปิด · MIT LICENSE · อิสระจากเอเจนต์"
- Right-aligned tagline:
  "สร้างด้วยความชัดเจน ส่งมอบด้วยความมั่นใจ"
- Editorial headline pair (the second line in oxblood):
  Line 1: "โมเดลสำคัญ"
  Line 2 (oxblood accent): "บริบทสำคัญกว่า"
- Body paragraph:
  "สภาพแวดล้อมที่มีโครงสร้าง พร้อมบริบท ราวกั้นความปลอดภัย และแผนงานที่คงทน ที่ coding agent ใดก็ทำงานระยะยาวจนเสร็จ"
- Italic pull-quote:
  "Spec-driven development ที่ตัว repository เองกลายเป็น harness"

Maintain identical proportions, padding, and visual hierarchy. Output a single PNG at 1200×630, ~250–400 KB.
```

---

## After generating

1. Drop each file into `public/images/og/og-default-<code>.png`.
2. **Verify file size** is in the 250 – 400 KB range. If your generator outputs heavier PNGs (some tools default to ~2 MB), compress with `pngquant --quality=70-90 --speed=1 -o out.png in.png` or convert via `cwebp` and re-encode. Social platforms (LinkedIn, X, WhatsApp) cache poorly above ~1 MB and may refuse to render previews >2 MB.
3. Run `pnpm run build` and grep `dist/<code>/index.html` for `og-default-<code>.png` — the build picks it up automatically through `BaseHead.astro`'s `existsSync` check. No code change is needed.
4. Spot-check by sharing a `/<lang>/` URL on Facebook/LinkedIn/X debug tools to confirm the correct OG image renders.
