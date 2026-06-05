---
title: SvelteKit
description: "SvelteKit projeleri için rotalar, yükleme fonksiyonları, sunucu uç noktaları, seçilen adaptör ve teste yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 13
stack: SvelteKit
---

# SvelteKit ön ayarı

Onboarding akışının SvelteKit projeleri için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `svelte.config.js` ve bir `vite.config.*`, bağımlılıklarda `@sveltejs/kit`.
- `src/routes/` içinde `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte` ve `+server.ts` uç noktaları.
- Paket yöneticisi, var olan kilit dosyasından çıkarılır (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Neyin üzerine akıl yürütülmeli

- Gerçek lint (`eslint`), tür denetimi (`svelte-check`), test (Vitest, artı Playwright uçtan uca) ve derleme (`vite build`) betikleri — birebir kaydedilir.
- Yönlendirme ve `load` modeli (sunucu veya evrensel yüklemeler), form eylemleri ve `+server.ts` API uç noktaları; yapılandırılmış adaptör.
- Yığına uygun skill'ler: `route` (`+page` + `load`), `endpoint` (`+server.ts`), `component`.

## Notlar

Yapılandırılmış adaptörü kaydedin (`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel) — bu, derleme ve dağıtım sürecini şekillendirir.
