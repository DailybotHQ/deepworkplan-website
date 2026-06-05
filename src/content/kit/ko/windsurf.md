---
title: Windsurf
description: "Windsurf를 위한 DWP 어댑터로, 규칙 시스템과 해시 명령 접두어로 호출하는 Markdown 명령 절차를 통해 완전히 지원합니다."
kind: adapter
lang: ko
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Windsurf 어댑터

Windsurf는 규칙 시스템과 Markdown 명령 절차를 통해 DWP를 지원합니다.

## 지원 수준

**완전** — Windsurf는 프로젝트 규칙을 읽고 모든 dwp-* 명령을 절차 파일에서 실행합니다.

## 설치

DWP 명령은 Windsurf의 규칙 시스템을 통해 에이전트가 읽는 Markdown 절차로 존재합니다.

## 호출

`#` 접두어를 사용하세요.

```
#dwp-create <goal>
#dwp-execute
```

## 참고

Windsurf는 절차 파일을 읽고 완전한 순차 Deep Work Plan 루프를 실행합니다.
