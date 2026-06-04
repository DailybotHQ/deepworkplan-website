---
title: Vue + Vite
description: "Vue + Vite प्रोजेक्ट्स के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें single-file components, Composition API, Pinia stores, और Vitest testing के लिए तर्क संकेत शामिल हैं।"
kind: preset
lang: hi
order: 2
stack: Vue + Vite
---

# Vue + Vite preset

एक तर्क मार्गदर्शिका जिसे onboard प्रवाह Vue + Vite प्रोजेक्ट्स के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- dependencies में `vite.config.*` और `vue` (Vue 3, `<script setup>`)।
- `@vitejs/plugin-vue`, `vue-tsc`, `vue-router`, `pinia`।
- मौजूद lockfile से अनुमानित package manager।

## किस बारे में तर्क करें

- वास्तविक lint, type-check (`vue-tsc --noEmit`), test (Vitest/Jest), और build स्क्रिप्ट — हूबहू दर्ज की गई।
- test परिपाटी (`*.spec.ts` / `*.test.ts`) और `@vue/test-utils` पैटर्न।
- स्टैक-उपयुक्त स्किल्स: `component`, `store-module`, `composable`, `view`/`route`।

## टिप्पणियाँ

यदि `vue` के बजाय deps में `react` है, तो React-आकार के स्किल्स के साथ वही तर्क पुन: उपयोग करें।
