---
title: Cline
description: "오픈 소스 에이전트인 Cline을 위한 DWP 어댑터로, Markdown 규칙과 해시 명령 접두어로 호출하는 명령 절차를 통해 완전히 지원합니다."
kind: adapter
lang: ko
order: 9
agent: Cline
support: full
prefix: '#'
---

# Cline 어댑터

오픈 소스 코딩 에이전트인 Cline은 Markdown 규칙과 명령 절차를 통해 DWP를 지원합니다.

## 지원 수준

**완전** — Cline은 Markdown 규칙을 읽고 모든 dwp-* 명령을 절차 파일에서 실행합니다.

## 설치

DWP 명령은 Cline의 규칙을 통해 에이전트가 읽는 Markdown 절차로 존재합니다.

## 호출

`#` 접두어를 사용하세요.

```
#dwp-create <goal>
#dwp-execute
```

## 참고

Cline은 절차 파일을 읽고 완전한 순차 Deep Work Plan 루프를 실행합니다.
