---
title: Nuxt
description: "Nuxt 프로젝트를 위한 온보딩 프리셋으로, 페이지, 서버 API 라우트, 컴포저블, Nitro 서버 엔진, 테스트에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 14
stack: Nuxt (Vue)
---

# Nuxt 프리셋

onboard 흐름이 Nuxt 프로젝트에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `nuxt.config.ts`와 의존성의 `nuxt`, `app.vue` 진입점.
- `pages/`(파일 기반 라우팅), `server/api/`(Nitro 엔드포인트), `composables/`, 자동 임포트되는 `components/`.
- 존재하는 락파일(`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`)에서 패키지 관리자를 추론합니다.

## 추론할 사항

- 실제 린트(`eslint`), 타입 검사(`nuxi typecheck`), 테스트(`@nuxt/test-utils`와 함께 Vitest), 빌드(`nuxt build`) 스크립트 — 그대로 포착합니다.
- 라우팅과 데이터 페칭(`useFetch`/`useAsyncData`), Nitro `server/api/` 라우트, 컴포저블, 자동 임포트 관례; 렌더링 모드(SSR/SSG/SPA).
- 적합한 스킬: `page`/`route`, `server-route`(`server/api`), `composable`, `component`.

## 참고

자동 임포트(컴포넌트, 컴포저블, 유틸리티)는 Nuxt 관례입니다 — 명시적 임포트를 일일이 추가하는 대신 이를 반영하세요.
