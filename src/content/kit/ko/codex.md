---
title: OpenAI Codex
description: "OpenAI Codex를 위한 DWP 어댑터로, Markdown 명령 절차와 전체 Deep Work Plan 루프를 실행하는 해시 명령 접두어를 통해 완전히 지원합니다."
kind: adapter
lang: ko
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# OpenAI Codex 어댑터

Codex는 Markdown 명령 절차를 통해 DWP를 지원합니다.

## 지원 수준

**완전** — 모든 dwp-* 명령이 절차 파일에서 실행됩니다.

## 설치

DWP 명령은 에이전트가 호출 시 읽는 Markdown 절차로 존재합니다. 규칙은 `.codex/` 아래에 설치됩니다.

## 호출

`#` 접두어를 사용하세요.

```
#dwp-create <goal>
#dwp-execute
```

## 참고

Codex는 절차 파일을 읽고 완전한 순차 Deep Work Plan 루프를 실행합니다.
