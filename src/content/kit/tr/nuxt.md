---
title: Nuxt
description: "Nuxt projeleri için sayfalar, sunucu API rotaları, composable'lar, Nitro sunucu motoru ve teste yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 14
stack: Nuxt (Vue)
---

# Nuxt ön ayarı

Onboarding akışının Nuxt projeleri için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `nuxt.config.ts` ve bağımlılıklarda `nuxt`, bir `app.vue` giriş noktasıyla birlikte.
- `pages/` (dosya tabanlı yönlendirme), `server/api/` (Nitro uç noktaları), `composables/` ve otomatik içe aktarılan `components/`.
- Paket yöneticisi, var olan kilit dosyasından çıkarılır (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Neyin üzerine akıl yürütülmeli

- Gerçek lint (`eslint`), tür denetimi (`nuxi typecheck`), test (`@nuxt/test-utils` ile Vitest) ve derleme (`nuxt build`) betikleri — birebir kaydedilir.
- Yönlendirme ve veri getirme (`useFetch`/`useAsyncData`), Nitro `server/api/` rotaları, composable'lar ve otomatik içe aktarma kuralları; işleme modu (SSR/SSG/SPA).
- Yığına uygun skill'ler: `page`/`route`, `server-route` (`server/api`), `composable`, `component`.

## Notlar

Otomatik içe aktarmalar (bileşenler, composable'lar, utils) Nuxt'un bir kuralıdır — her yere açık içe aktarma eklemek yerine bunları göz önünde bulundurun.
