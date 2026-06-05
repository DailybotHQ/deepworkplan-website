---
title: Antigravity
description: "Antigravity를 위한 DWP 어댑터로, Markdown 명령 절차와 전체 Deep Work Plan 루프를 구동하는 해시 명령 접두어를 통해 완전히 지원합니다."
kind: adapter
lang: ko
order: 6
agent: Antigravity
support: full
prefix: '#'
---

# Antigravity 어댑터

Antigravity는 Markdown 명령 절차를 통해 DWP를 지원합니다.

## 지원 수준

**완전** — 모든 dwp-* 명령이 네이티브 명령 표면을 통해 절차 파일에서 실행됩니다.

## 설치

DWP 명령은 에이전트가 호출 시 읽는 Markdown 절차로 존재합니다.

## 호출

`#` 접두어를 사용하세요.

```
#dwp-create <goal>
#dwp-execute
```

## 참고

Antigravity는 절차 파일을 읽고 완전한 순차 Deep Work Plan 루프를 실행합니다.
