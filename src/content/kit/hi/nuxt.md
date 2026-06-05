---
title: Nuxt
description: "Nuxt प्रोजेक्ट के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें pages, server API routes, composables, Nitro server engine और testing के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 14
stack: Nuxt (Vue)
---

# Nuxt preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह Nuxt प्रोजेक्ट के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `nuxt.config.ts` और dependencies में `nuxt`, साथ में एक `app.vue` entrypoint।
- `pages/` (file-based routing), `server/api/` (Nitro endpoints), `composables/`, और auto-imported `components/`।
- Package manager को मौजूद lockfile से अनुमानित किया जाता है (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`)।

## किस बारे में तर्क करें

- वास्तविक lint (`eslint`), type-check (`nuxi typecheck`), test (Vitest with `@nuxt/test-utils`), और build (`nuxt build`) scripts — हूबहू दर्ज किए गए।
- Routing और data fetching (`useFetch`/`useAsyncData`), Nitro `server/api/` routes, composables, और auto-import परिपाटियाँ; rendering mode (SSR/SSG/SPA)।
- Stack-उपयुक्त skills: `page`/`route`, `server-route` (`server/api`), `composable`, `component`।

## टिप्पणियाँ

Auto-imports (components, composables, utils) एक Nuxt परिपाटी है — हर जगह explicit imports जोड़ने के बजाय उनका ध्यान रखें।
