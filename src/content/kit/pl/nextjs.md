---
title: Next.js
description: "Preset onboardingowy dla projektów Next.js, ze wskazówkami do rozumowania o App vs Pages Router, komponentach Server i Client, handlerach tras i testowaniu."
kind: preset
lang: pl
order: 12
stack: Next.js (React)
---

# Preset Next.js

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla projektów Next.js. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `package.json` z `next` i `react` oraz plik `next.config.js`/`next.config.mjs`/`next.config.ts`.
- `app/` (App Router, komponenty Server/Client, handlery tras) lub `pages/` (Pages Router, trasy API) — wykryj, który jest w użyciu.
- Menedżer pakietów wnioskowany z istniejącego pliku blokady (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## O czym należy rozumować

- Rzeczywiste skrypty lint (`eslint` z `next/core-web-vitals`), test (Jest/Vitest plus Playwright/Cypress e2e) i build (`next build`) — zapisane dosłownie.
- Model routera (App vs Pages), podział na komponenty Server i Client oraz miejsce pobierania danych i handlerów tras.
- Skille właściwe dla stosu: `page`/`route`, `server-component`, `route-handler`, `component`.

## Uwagi

Wykryj router przed generowaniem skilli — App Router i Pages Router mają różne konwencje plików i modele pobierania danych.
