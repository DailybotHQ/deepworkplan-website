---
title: Node / TS service
description: "Node 및 TypeScript 서비스와 서버리스 API를 위한 온보딩 프리셋으로, 요청 수명 주기, 연동, 테스트에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 4
stack: Node / TS service
---

# Node / TS service 프리셋

onboard 흐름이 Node/TypeScript 서비스와 서버리스 API에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `tsconfig.json`과 서버 프레임워크(`express`, `fastify`, `@nestjs/*`) 또는 서버리스 핸들러(`serverless.yml`, `template.yaml`, `functions/` 디렉터리).
- 존재하는 lockfile에서 추론된 패키지 관리자.

## 무엇을 추론할 것인가

- 실제 lint, 타입 검사(`tsc --noEmit`), test(Jest/Vitest), build 스크립트 — 그대로 포착합니다.
- 장기 실행 서비스인지 서버리스인지 — 이것이 아키텍처와 성능 문서의 형태를 결정합니다.
- 스택에 맞는 스킬: `endpoint`/`handler`, `service`, `middleware`, `integration`, 또는 `lambda-fn`.

## 참고

요청 또는 이벤트 수명 주기, 연동 지점, 그리고 비밀 값과 설정이 어디에 있는지 포착하세요.
