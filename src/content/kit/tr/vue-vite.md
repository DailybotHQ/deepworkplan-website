---
title: Vue + Vite
description: "Vue + Vite projeleri için bir onboarding ön ayarı; tek dosyalı bileşenler, Composition API, Pinia store’ları ve Vitest testleri için akıl yürütme ipuçları sunar."
kind: preset
lang: tr
order: 2
stack: Vue + Vite
---

# Vue + Vite ön ayarı

Onboarding akışının Vue + Vite projeleri için kullandığı akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `vite.config.*` ve bağımlılıklarda `vue` (Vue 3, `<script setup>`).
- `@vitejs/plugin-vue`, `vue-tsc`, `vue-router`, `pinia`.
- Var olan lockfile’dan çıkarsanan paket yöneticisi.

## Neyin üzerine akıl yürütülmeli

- Gerçek lint, tür denetimi (`vue-tsc --noEmit`), test (Vitest/Jest) ve build betikleri — birebir kaydedilir.
- Test kuralı (`*.spec.ts` / `*.test.ts`) ve `@vue/test-utils` desenleri.
- Yığına uygun skill’ler: `component`, `store-module`, `composable`, `view`/`route`.

## Notlar

Bağımlılıklarda `vue` yerine `react` varsa, aynı akıl yürütmeyi React biçimli skill’lerle yeniden kullanın.
