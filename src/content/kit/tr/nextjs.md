---
title: Next.js
description: "Next.js projeleri için App ve Pages Router arasındaki fark, Sunucu ve İstemci Bileşenleri, rota işleyicileri ve teste yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 12
stack: Next.js (React)
---

# Next.js ön ayarı

Onboarding akışının Next.js projeleri için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `package.json` içinde `next` ve `react`, artı `next.config.js`/`next.config.mjs`/`next.config.ts`.
- `app/` (App Router, Sunucu/İstemci Bileşenleri, rota işleyicileri) veya `pages/` (Pages Router, API rotaları) — hangisinin kullanıldığı saptanır.
- Paket yöneticisi, var olan kilit dosyasından çıkarılır (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Neyin üzerine akıl yürütülmeli

- Gerçek lint (`next/core-web-vitals` ile `eslint`), test (Jest/Vitest, artı Playwright/Cypress uçtan uca) ve derleme (`next build`) betikleri — birebir kaydedilir.
- Yönlendirici modeli (App ile Pages arası), Sunucu ile İstemci Bileşeni ayrımı ve veri getirme ile rota işleyicilerinin nerede yer aldığı.
- Yığına uygun skill'ler: `page`/`route`, `server-component`, `route-handler`, `component`.

## Notlar

Skill'leri oluşturmadan önce yönlendiriciyi saptayın — App Router ve Pages Router'ın farklı dosya kuralları ve veri getirme modelleri vardır.
