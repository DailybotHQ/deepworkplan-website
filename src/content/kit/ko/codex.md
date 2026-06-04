---
title: OpenAI Codex
description: "OpenAI Codex를 위한 DWP 어댑터로, Markdown 명령 절차와 해시 접두어를 통해 부분적으로 지원합니다. 팀 에이전트 기능은 제공되지 않습니다."
kind: adapter
lang: ko
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# OpenAI Codex 어댑터

OpenAI Codex는 Markdown 명령 절차를 통해 DWP를 지원합니다.

## 지원 수준

**부분** — 핵심 명령은 작동하지만 고급 기능(팀 에이전트)은 제공되지 않습니다.

## 설치

DWP 명령은 에이전트가 호출 시 읽는 Markdown 절차로 존재합니다.

## 호출

`#` 접두어를 사용하세요.

```
#dwp-create <goal>
#dwp-execute
```

## 참고

팀 에이전트 기능은 Claude 전용입니다. Codex는 순차 워크플로를 지원합니다.
