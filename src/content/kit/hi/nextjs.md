---
title: Next.js
description: "Next.js प्रोजेक्ट के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें App बनाम Pages Router, Server और Client Components, route handlers और testing के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 12
stack: Next.js (React)
---

# Next.js preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह Next.js प्रोजेक्ट के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `package.json` में `next` और `react`, साथ में एक `next.config.js`/`next.config.mjs`/`next.config.ts`।
- `app/` (App Router, Server/Client Components, route handlers) या `pages/` (Pages Router, API routes) — पता लगाएं कि कौन-सा उपयोग में है।
- Package manager को मौजूद lockfile से अनुमानित किया जाता है (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`)।

## किस बारे में तर्क करें

- वास्तविक lint (`eslint` with `next/core-web-vitals`), test (Jest/Vitest, साथ में Playwright/Cypress e2e), और build (`next build`) scripts — हूबहू दर्ज किए गए।
- Router model (App बनाम Pages), Server बनाम Client Component विभाजन, और data fetching तथा route handlers कहाँ रहते हैं।
- Stack-उपयुक्त skills: `page`/`route`, `server-component`, `route-handler`, `component`।

## टिप्पणियाँ

Skills उत्पन्न करने से पहले router पता लगाएं — App Router और Pages Router की अलग-अलग file परिपाटियाँ और data-fetching model हैं।
