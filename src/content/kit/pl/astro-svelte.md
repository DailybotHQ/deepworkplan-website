---
title: Astro / Svelte
description: "Preset onboardingowy dla witryn Astro, opcjonalnie z wyspami Svelte, z wskazówkami do rozumowania o kolekcjach treści, walidacji schematów i hydracji wysp."
kind: preset
lang: pl
order: 3
stack: Astro / Svelte
---

# Preset Astro / Svelte

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla witryn Astro, opcjonalnie z wyspami Svelte. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `astro.config.*`; opcjonalnie `@astrojs/svelte` i komponenty `.svelte`.
- Kolekcje treści (Content Collections) w `src/content/` ze schematami Zod.

## O czym należy rozumować

- Rzeczywiste skrypty lint, sprawdzania typów (`astro check`), testów i builda — zapisane dosłownie.
- Schematy kolekcji treści oraz konwencje hydracji wysp (`client:visible` zamiast `client:load`).
- Skille odpowiednie dla stacku do obsługi komponentów, stron i wpisów treści.

## Uwagi

Przydatny dla witryn opartych na treści, korzystających z architektury wysp Astro z selektywną interaktywnością.
