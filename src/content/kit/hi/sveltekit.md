---
title: SvelteKit
description: "SvelteKit प्रोजेक्ट के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें routes, load functions, server endpoints, चुने गए adapter और testing के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 13
stack: SvelteKit
---

# SvelteKit preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह SvelteKit प्रोजेक्ट के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `svelte.config.js` और एक `vite.config.*`, dependencies में `@sveltejs/kit`।
- `src/routes/` में `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte`, और `+server.ts` endpoints।
- Package manager को मौजूद lockfile से अनुमानित किया जाता है (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`)।

## किस बारे में तर्क करें

- वास्तविक lint (`eslint`), type-check (`svelte-check`), test (Vitest, साथ में Playwright e2e), और build (`vite build`) scripts — हूबहू दर्ज किए गए।
- Routing और `load` model (server बनाम universal loads), form actions, और `+server.ts` API endpoints; configured adapter।
- Stack-उपयुक्त skills: `route` (`+page` + `load`), `endpoint` (`+server.ts`), `component`।

## टिप्पणियाँ

Configured adapter (`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel) दर्ज करें — यह build और deploy की कहानी तय करता है।
