---
title: Google Gemini
description: "Google Gemini를 위한 DWP 어댑터로, Markdown 명령 절차와 전체 Deep Work Plan 루프를 실행하는 해시 명령 접두어를 통해 완전히 지원합니다."
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

**완전** — 모든 dwp-* 명령이 절차 파일에서 실행됩니다. 네이티브 WebFetch를 사용하려면 Gemini 2.5 Pro 이상이 필요합니다.

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
