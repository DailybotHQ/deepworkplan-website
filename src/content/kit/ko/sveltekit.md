---
title: SvelteKit
description: "SvelteKit 프로젝트를 위한 온보딩 프리셋으로, 라우트, load 함수, 서버 엔드포인트, 선택된 어댑터, 테스트에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 13
stack: SvelteKit
---

# SvelteKit 프리셋

onboard 흐름이 SvelteKit 프로젝트에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `svelte.config.js`와 `vite.config.*`, 의존성에 `@sveltejs/kit`.
- `src/routes/`에 `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte`, `+server.ts` 엔드포인트.
- 존재하는 락파일(`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`)에서 패키지 관리자를 추론합니다.

## 추론할 사항

- 실제 린트(`eslint`), 타입 검사(`svelte-check`), 테스트(Vitest, Playwright e2e), 빌드(`vite build`) 스크립트 — 그대로 포착합니다.
- 라우팅과 `load` 모델(서버 대 범용 로드), 폼 액션, `+server.ts` API 엔드포인트; 설정된 어댑터.
- 적합한 스킬: `route`(`+page` + `load`), `endpoint`(`+server.ts`), `component`.

## 참고

설정된 어댑터(`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel)를 기록하세요 — 빌드와 배포 방식을 결정합니다.
