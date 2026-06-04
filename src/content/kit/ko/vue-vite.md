---
title: Vue + Vite
description: "Vue + Vite 프로젝트를 위한 온보딩 프리셋으로, 단일 파일 컴포넌트, Composition API, Pinia 스토어, Vitest 테스트에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 2
stack: Vue + Vite
---

# Vue + Vite 프리셋

onboard 흐름이 Vue + Vite 프로젝트에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- 의존성의 `vite.config.*`와 `vue`(Vue 3, `<script setup>`).
- `@vitejs/plugin-vue`, `vue-tsc`, `vue-router`, `pinia`.
- 존재하는 lockfile에서 추론된 패키지 관리자.

## 무엇을 추론할 것인가

- 실제 lint, 타입 검사(`vue-tsc --noEmit`), test(Vitest/Jest), build 스크립트 — 그대로 포착합니다.
- 테스트 관례(`*.spec.ts` / `*.test.ts`)와 `@vue/test-utils` 패턴.
- 스택에 맞는 스킬: `component`, `store-module`, `composable`, `view`/`route`.

## 참고

`vue` 대신 `react`가 의존성에 있으면, 같은 추론을 React 형태의 스킬과 함께 재사용하세요.
