---
title: Angular
description: "Angular 프로젝트를 위한 온보딩 프리셋으로, 컴포넌트, 모듈 또는 스탠드얼론 API, 서비스, RxJS, 테스트 러너에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 15
stack: Angular
---

# Angular 프리셋

onboard 흐름이 Angular 프로젝트에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `angular.json`과 의존성의 `@angular/core`; `src/app/`에 `@Component`/`@NgModule` 또는 스탠드얼론 컴포넌트.
- `@Injectable` 서비스, RxJS 옵저버블, 의존성 주입.
- 존재하는 락파일에서 패키지 관리자를 추론합니다.

## 추론할 사항

- 실제 테스트(`ng test` / Karma+Jasmine `*.spec.ts` 또는 Jest), 린트(`ng lint` / `@angular-eslint`), 빌드(`ng build`) 명령 — 그대로 포착합니다.
- 앱이 NgModules를 사용하는지 스탠드얼론 컴포넌트 API를 사용하는지, 그리고 라우팅과 DI 관례.
- 적합한 스킬: `component`, `service`, `module`/`standalone`, `guard`/`resolver`.

## 참고

CLI 프로젝트 레이아웃을 따르는 Angular 앱에 유용합니다. 존재하는 설정에서 Karma/Jasmine 대 Jest를 확인하세요.
