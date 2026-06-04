---
title: Astro / Svelte
description: "Astro 사이트(선택적으로 Svelte 아일랜드 포함)를 위한 온보딩 프리셋으로, 콘텐츠 컬렉션, 스키마 검증, 아일랜드 하이드레이션에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 3
stack: Astro / Svelte
---

# Astro / Svelte 프리셋

onboard 흐름이 Astro 사이트(선택적으로 Svelte 아일랜드 포함)에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `astro.config.*`. 선택적으로 `@astrojs/svelte`와 `.svelte` 컴포넌트.
- Zod 스키마를 갖춘 `src/content/` 아래의 Content Collections.

## 무엇을 추론할 것인가

- 실제 lint, 타입 검사(`astro check`), test, build 스크립트 — 그대로 포착합니다.
- 콘텐츠 컬렉션 스키마와 아일랜드 하이드레이션 관례(`client:load`보다 `client:visible`).
- 컴포넌트, 페이지, 콘텐츠 항목을 위한 스택에 맞는 스킬.

## 참고

선택적 상호작용과 함께 Astro의 아일랜드 아키텍처를 사용하는 콘텐츠 중심 사이트에 유용합니다.
