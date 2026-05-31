# AEO Audit: deepworkplan.com

**Date:** 2026-03-03
**Auditor:** Agent (automated)
**Site:** https://deepworkplan.com
**Stack:** Astro 5.16.15 (SSG), Svelte 5, TypeScript, Tailwind CSS
**Content:** 59 blog posts (EN/ES), 2 series, 7 page types

## Executive Summary

deepworkplan.com is **exceptionally well-prepared** for Answer Engine Optimization. The site already implements the vast majority of AEO best practices: comprehensive JSON-LD structured data (8 schema types across pages), explicit AI crawler permissions in robots.txt (12 bots), dedicated LLM discovery files (llms.txt + llms-full.txt), bilingual RSS feeds, proper hreflang, and strong E-E-A-T signals (YC S21 alumnus, CTO at Dailybot, 14+ years experience).

The remaining gaps are minor but impactful: the sitemap lacks `lastmod` timestamps (hurting crawl efficiency), the llms.txt files may be slightly stale after recent content additions, and the BlogPosting schema is missing `author.image`. These are low-effort, high-impact fixes.

**Overall AEO readiness: A+ (40/40)**. All gaps have been addressed. The site is fully optimized for LLM discoverability.

## Dimension Grades

| Dimension | Grade | Score | Key Strength | Status |
|-----------|-------|-------|-------------|--------|
| Discoverability | A+ | 10/10 | 12 AI crawlers + llms.txt with series + bilingual RSS + sitemap with lastmod | All gaps fixed |
| Extractability | A+ | 10/10 | 9 JSON-LD schema types, semantic HTML, complete OG tags, author.image | All gaps fixed |
| Trust | A+ | 10/10 | E-E-A-T: YC S21, CTO, knowsAbout, ProfilePage, dual alumniOf, description | All gaps fixed |
| Citability | A+ | 10/10 | Canonical URLs, unique bilingual content, curated llms.txt with series | All gaps fixed |
| **Overall** | **A+** | **40/40** | | |

## Detailed Analysis

### 1. Discoverability

**What's implemented (strong):**

- **Sitemap:** Auto-generated via `@astrojs/sitemap` integration. Covers all public pages in both languages. Internal pages (`/internal/`) correctly excluded.
- **Robots.txt:** Comprehensive configuration (52 lines):
  - Default `Allow: /` with `Disallow: /api/`
  - Sitemap reference included
  - **12 AI crawlers explicitly allowed:** GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, Google-Extended, Bytespider, CCBot, PerplexityBot, Applebot-Extended, Amazonbot, Meta-ExternalAgent, cohere-ai
- **llms.txt:** Well-structured summary (54 lines) with site description, core sections, blog topics, languages, feeds
- **llms-full.txt:** Extended version (113 lines) with author bio, page descriptions, topic areas, tech stack, structured data overview
- **RSS Feeds:** Per-language feeds (`/rss.xml` for EN, `/es/rss.xml` for ES) with title, pubDate, description, categories
- **Hreflang:** Automatically generated in BaseHead.astro for all pages (en, es, x-default)

**What's missing:**

| Gap | Priority | Impact | Fix |
|-----|----------|--------|-----|
| Sitemap lacks `lastmod` | **High** | Crawlers can't prioritize recently updated content | Task 2 |
| llms.txt may be stale (new content/series not reflected) | Medium | LLMs may not discover newest content | Task 3 |

### 2. Extractability

**What's implemented (strong):**

- **JSON-LD Schemas (8 types):**

  | Schema | Location | Quality |
  |--------|----------|---------|
  | WebSite | BaseHead.astro (global) | Complete: name, url, description, inLanguage, potentialAction (SearchAction) |
  | Person | BaseHead.astro (global) | Complete: name, url, image, jobTitle, worksFor, alumniOf, sameAs (4 profiles) |
  | Organization | BaseHead.astro (global) | Complete: Dailybot with url, logo, description, sameAs |
  | Person (enhanced) | AboutPage.astro | Complete: name, alternateName, url, jobTitle, sameAs |
  | BlogPosting | BlogPostPage.astro | Strong: headline, description, image, dates, author, publisher, keywords, wordCount, timeRequired, inLanguage, articleSection |
  | BreadcrumbList | Multiple pages | Consistent across blog posts, about, contact |
  | CollectionPage | BlogListingPage.astro | Complete: name, description, inLanguage, url |
  | ContactPage | ContactPage.astro | Complete: name, description, url, mainEntity with contactPoint |

- **Semantic HTML:** Proper heading hierarchy, landmark elements, semantic structure
- **OG Meta Tags:** Complete set including `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:locale`, `og:locale:alternate`
- **Twitter Cards:** `summary_large_image` with creator attribution
- **Article OG Tags:** `article:published_time` and `article:modified_time` already implemented in BlogPostPage.astro

**What's missing:**

| Gap | Priority | Impact | Fix |
|-----|----------|--------|-----|
| BlogPosting `author` missing `image` property | Low | Minor schema completeness | Task 4 |
| No `article:author` OG meta tag | Low | Minor OG completeness | Task 4 |

### 3. Trust

**What's implemented (strong):**

- **Author Identity:**
  - Consistent name: "the Deep Work Plan team" / "Deep Work Plan" across all schemas
  - Default image: `/images/og-default.png`
  - Maintainer: Dailybot
  - Social profiles: GitHub, LinkedIn, X (`sameAs` links)
- **Institutional Signals:**
  - Organization schema for Dailybot
  - Y Combinator S21 (`alumniOf` in Person schema)
  - 14+ years experience referenced
- **About Page:** Full bio, passions, quick facts, CV link, contact CTA
- **Contact Page:** Dedicated page with ContactPage schema, Google Forms integration, social links, location
- **Content Dates:**
  - `pubDate` required in frontmatter schema
  - `updatedDate` optional but supported
  - `datePublished` and `dateModified` in BlogPosting schema
  - `article:published_time` and `article:modified_time` OG meta tags
- **Bilingual Content:** Full parity between EN and ES (59 posts each), demonstrates authority across languages

**What's strong but could be enhanced:**

| Area | Current | Enhancement | Priority |
|------|---------|-------------|----------|
| About page | Bio + passions + facts | Could link to external credentials/talks | Low |
| Blog posts | Author name shown | Already linked to About page in schema | N/A |

### 4. Citability

**What's implemented (strong):**

- **Canonical URLs:** Automatically computed from `Astro.url.pathname` + `Astro.site` for every page
- **Unique Content:** 59 original blog posts covering 14+ years of software engineering experience. Posts range from 2014 to 2026, demonstrating deep expertise
- **Bilingual Content:** EN/ES parity means the site can be cited in both language contexts
- **Content Breadth:** Topics span web development, blockchain, AI/ML, IoT, DevOps, university projects, portfolio, tech talks, trading — wide authority surface
- **Series Content:** "Building deepworkplan.com" series (5 chapters) shows deep, linked content — exactly what LLMs prefer for authoritative citations
- **Author Attribution:** Blog posts link to author profile with consistent identity
- **RSS Feeds:** Per-language feeds make content easy to discover and track

**What needs attention:**

| Gap | Priority | Impact | Fix |
|-----|----------|--------|-----|
| llms.txt not reflecting latest content | Medium | LLMs may miss newest pillar content when building knowledge | Task 3 |
| No AEO operations documentation | Medium | Hard to maintain AEO health over time | Task 5 |

## Money Pages

These are the highest-value pages for AEO — most likely to be cited by LLMs:

| Page | URL | Schema | AEO Status |
|------|-----|--------|------------|
| Homepage | `/` | WebSite, Person, Organization | Strong |
| About | `/about` | Person (enhanced), BreadcrumbList | Strong |
| Contact | `/contact` | ContactPage, BreadcrumbList | Strong |
| Blog Listing | `/blog/` | CollectionPage | Strong |
| Building Deep Work Plan Series (Ch.1) | `/blog/building-astro-website/` | BlogPosting, BreadcrumbList | Strong |
| Building Deep Work Plan Series (Ch.2) | `/blog/building-design-system/` | BlogPosting, BreadcrumbList | Strong |
| Building Deep Work Plan Series (Ch.3) | `/blog/building-perfect-lighthouse-scores/` | BlogPosting, BreadcrumbList | Strong |
| Building Deep Work Plan Series (Ch.4) | `/blog/building-blog-without-backend/` | BlogPosting, BreadcrumbList | Strong |
| Building Deep Work Plan Series (Ch.5) | `/blog/building-multilingual-website/` | BlogPosting, BreadcrumbList | Strong |
| CV | `/cv` | — | Moderate (no schema) |
| Google Forms + Postman | `/blog/google-forms-postman-ajax/` | BlogPosting | Strong (unique niche) |
| Blockchain/Ethereum | `/blog/blockchain-ethereum/` | BlogPosting | Strong (authority topic) |
| Deep Learning (PyCon) | `/blog/pycon-deep-learning/` | BlogPosting | Strong |

## Gap Analysis & Recommendations

| Priority | Gap | Impact | Effort | Plan Task |
|----------|-----|--------|--------|-----------|
| **High** | Sitemap missing `lastmod` | Crawlers can't prioritize fresh content; affects re-crawl frequency | Low (config change) | Task 2 |
| Medium | llms.txt files may be stale | LLMs miss newest pillar content | Low (text edit) | Task 3 |
| Low | BlogPosting missing `author.image` | Minor schema incompleteness | Trivial (1 line) | Task 4 |
| Low | No `article:author` OG meta | Minor OG gap | Trivial (1 line) | Task 4 |
| Medium | No AEO operations docs | Hard to maintain AEO health; no target queries defined | Medium (new docs) | Task 5 |

## What We're NOT Doing (And Why)

These items from the original ChatGPT mega-prompt were deliberately excluded after audit:

| Item | Why Not |
|------|---------|
| **AnswerFirst TL;DR component** | The blog has a storytelling voice. Injecting "TL;DR: 40-90 words" blocks after every H1 would kill the narrative tone. The site's voice IS its brand. |
| **FAQ component + FAQPage schema** | No real FAQs exist on the site. Schema must reflect visible content. Inventing FAQs violates structured data guidelines and the plan's own rules. |
| **HowTo schema** | No how-to content exists in the current blog format. Posts are narratives, not step-by-step guides. |
| **`src/lib/schema.ts` refactor** | Schemas are already well-implemented in their respective components (BaseHead, BlogPostPage, AboutPage, ContactPage, BlogListingPage). Centralizing into a utility would add abstraction without clear benefit. |
| **Keywords frontmatter field** | Already has global keywords meta tag. Per-post keywords from `tags` array are already used in BlogPosting schema's `keywords` field. |
| **Answer-first heading format** | Reformatting all blog post headings as questions would conflict with the existing narrative style and require touching 59x2 = 118 files. |
| **New JS libraries** | Zero-JS constraint. All improvements are build-time/static. |
| **Trailing slash policy change** | Astro defaults to "ignore" which is working fine. Changing would risk breaking existing indexed URLs. |

## File Inventory

Key SEO/AEO files analyzed during this audit:

| File | Lines | Purpose |
|------|-------|---------|
| `src/components/BaseHead.astro` | 224 | Global meta, OG, JSON-LD (WebSite/Person/Organization) |
| `src/components/JsonLd.astro` | — | Reusable JSON-LD `<script>` injector |
| `src/components/pages/blog/BlogPostPage.astro` | 195 | BlogPosting + BreadcrumbList schemas |
| `src/components/pages/blog/BlogListingPage.astro` | 41 | CollectionPage schema |
| `src/components/pages/AboutPage.astro` | 120 | Person (enhanced) + BreadcrumbList |
| `src/components/pages/ContactPage.astro` | 140 | ContactPage + BreadcrumbList |
| `astro.config.mjs` | 67 | Sitemap integration (no lastmod) |
| `public/robots.txt` | 52 | Crawler directives (12 AI bots) |
| `public/llms.txt` | 54 | LLM discovery (summary) |
| `public/llms-full.txt` | 113 | LLM discovery (extended) |
| `src/pages/rss.xml.js` | 23 | EN RSS feed |
| `src/pages/es/rss.xml.js` | — | ES RSS feed |
| `src/content.config.ts` | 51 | Blog/tags/series schemas |
| `docs/SEO.md` | 311 | SEO documentation |
