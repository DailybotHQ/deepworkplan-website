---
title: Google Gemini
description: "Google Gemini를 위한 DWP 어댑터로, Markdown 명령 절차와 전체 Deep Work Plan 루프를 실행하는 해시 명령 접두어를 통해 완전."
kind: adapter
lang: ko
order: 5
agent: Google Gemini
support: full
prefix: '#'
---

# Google Gemini 어댑터

Gemini는 Markdown 명령 절차를 통해 DWP를 지원합니다.

## 지원 수준

**완전 지원** (설치 검증됨) — 모든 dwp-* 명령은 프로시저 파일에서 실행됩니다. 자동화된 테스트 제품군에 의해 경로가 확인되었으며, 동작 워크플로는 순차적 기준선에서 실행됩니다. 도구 실행 및 작업 공간 파일 액세스가 필요합니다.

## 설치

DWP 명령은 에이전트가 호출 시 읽는 Markdown 절차로 존재합니다.

## 호출

`#` 접두어를 사용하세요.

```
#dwp-create <goal>
#dwp-execute
```

## 참고

Gemini는 절차 파일을 읽고 완전한 순차 Deep Work Plan 루프를 실행합니다.
