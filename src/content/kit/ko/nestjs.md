---
title: NestJS
description: "NestJS 애플리케이션을 위한 온보딩 프리셋으로, 모듈, 컨트롤러, 프로바이더, DTO, 데코레이터 모델, 테스트 러너에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 8
stack: NestJS
---

# NestJS 프리셋

onboard 흐름이 NestJS 애플리케이션에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `nest-cli.json`, `package.json`의 `@nestjs/*` 패키지, 그리고 `NestFactory.create`를 호출하는 `main.ts`.
- 데코레이터 모델: `@Module`, `@Controller`, `@Injectable`, 그리고 모듈·컨트롤러·서비스·DTO를 포함하는 기능 폴더.
- 락파일(`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`)에서 패키지 관리자를 추론합니다.

## 추론할 사항

- 실제 테스트 명령(Jest 단위 `*.spec.ts`와 e2e `*.e2e-spec.ts`), 린트 게이트(`eslint`), 빌드 스크립트 — 그대로 포착합니다.
- 모듈 경계, 의존성 주입, 프로바이더, 가드/파이프/인터셉터, 설정의 위치(`@nestjs/config`).
- 모듈, 컨트롤러, 프로바이더, DTO에 적합한 스킬.

## 참고

기능 모듈이 루트 모듈에 연결되는 방식, 그리고 앱이 TypeORM/Prisma, 마이크로서비스, GraphQL을 사용하는지 여부를 포착합니다.
