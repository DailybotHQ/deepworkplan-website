---
title: GitHub Copilot
description: "GitHub Copilot를 위한 DWP 어댑터로, AGENTS.md와 해시 명령 접두어로 호출하는 Markdown 명령 절차를 통해 완전히 지원합니다."
kind: adapter
lang: ko
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# GitHub Copilot 어댑터

GitHub Copilot은 AGENTS.md와 Markdown 명령 절차를 통해 DWP를 지원합니다.

## 지원 수준

**완전** — Copilot은 AGENTS.md와 dwp-* 절차 파일을 읽고 모든 명령을 실행합니다.

## 설치

DWP는 리포지토리에 AGENTS.md와 명령 절차를 제공합니다. Copilot은 이를 리포지토리 컨텍스트로 읽습니다.

## 호출

`#` 접두어를 사용하세요.

```
#dwp-create <goal>
#dwp-execute
```

## 참고

Copilot은 절차 파일을 읽고 완전한 순차 Deep Work Plan 루프를 실행합니다.
