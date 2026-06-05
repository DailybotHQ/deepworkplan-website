---
title: TypeScript Lambda
description: "서버리스 TypeScript Lambda 프로젝트를 위한 온보딩 프리셋으로, 핸들러, Serverless/SAM/CDK 툴체인, IAM 최소 권한에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 22
stack: TS Lambda (Serverless)
---

# TypeScript Lambda 프리셋

onboard 흐름이 서버리스 TypeScript Lambda 프로젝트에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- 배포 디스크립터: `serverless.yml`(Serverless Framework), `template.yaml`(AWS SAM), 또는 `cdk.json`(AWS CDK), `tsconfig.json`과 함께.
- `handler`를 내보내는 핸들러 함수, 주로 `src/functions/` 또는 `src/handlers/` 아래에 있으며 함수당 하나의 진입점.

## 추론할 사항

- 실제 게이트: 린트(`eslint`), 타입 검사(`tsc --noEmit`), 테스트(Jest/Vitest), 번들(esbuild/tsc), 합성/패키징(`sls package`, `sam build`, `cdk synth`) — 그대로 포착합니다.
- 함수별 구조, 이벤트 소스(API Gateway, SQS, EventBridge), 콜드 스타트/번들 크기 예산.
- IAM 범위 — 함수별 최소 권한 — 그리고 시크릿과 설정의 위치(SSM, Secrets Manager, env).

## 참고

SECURITY 문서에서 최소 권한 IAM을 강조하세요. 합성/패키징은 안전한 게이트입니다; 배포는 계정을 변경하므로 검증으로 실행해서는 안 됩니다.
