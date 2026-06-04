---
title: Astro / Svelte
description: "Astro siteleri için, isteğe bağlı Svelte adaları içeren bir onboarding ön ayarı; içerik koleksiyonları, şema doğrulama ve ada hidrasyonu için akıl yürütme ipuçları sunar."
kind: preset
lang: tr
order: 3
stack: Astro / Svelte
---

# Astro / Svelte ön ayarı

Onboarding akışının, isteğe bağlı olarak Svelte adaları içeren Astro siteleri için kullandığı akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `astro.config.*`; isteğe bağlı olarak `@astrojs/svelte` ve `.svelte` bileşenleri.
- `src/content/` altında Zod şemalı Content Collections.

## Neyin üzerine akıl yürütülmeli

- Gerçek lint, tür denetimi (`astro check`), test ve build betikleri — birebir kaydedilir.
- İçerik koleksiyonu şemaları ve ada hidrasyonu kuralları (`client:load` yerine `client:visible`).
- Bileşenler, sayfalar ve içerik girdileri için yığına uygun skill’ler.

## Notlar

Astro’nun ada mimarisini seçici etkileşimle kullanan, içerik odaklı siteler için yararlıdır.
