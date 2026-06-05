---
title: Next.js
description: "Next.js 프로젝트를 위한 온보딩 프리셋으로, App 라우터 대 Pages 라우터, 서버 및 클라이언트 컴포넌트, 라우트 핸들러, 테스트에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 12
stack: Next.js (React)
---

# Next.js 프리셋

onboard 흐름이 Next.js 프로젝트에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `next`와 `react`가 포함된 `package.json`, 그리고 `next.config.js`/`next.config.mjs`/`next.config.ts`.
- `app/`(App 라우터, 서버/클라이언트 컴포넌트, 라우트 핸들러) 또는 `pages/`(Pages 라우터, API 라우트) — 어느 것이 사용 중인지 감지합니다.
- 존재하는 락파일(`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`)에서 패키지 관리자를 추론합니다.

## 추론할 사항

- 실제 린트(`next/core-web-vitals`와 함께 `eslint`), 테스트(Jest/Vitest, Playwright/Cypress e2e), 빌드(`next build`) 스크립트 — 그대로 포착합니다.
- 라우터 모델(App 대 Pages), 서버 대 클라이언트 컴포넌트 분리, 데이터 페칭과 라우트 핸들러의 위치.
- 적합한 스킬: `page`/`route`, `server-component`, `route-handler`, `component`.

## 참고

스킬 생성 전에 라우터를 감지하세요 — App 라우터와 Pages 라우터는 파일 관례와 데이터 페칭 모델이 다릅니다.
