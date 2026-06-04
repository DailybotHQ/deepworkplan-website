---
title: Antigravity
description: "Antigravity를 위한 DWP 어댑터로, Markdown 명령 절차와 순차 워크플로를 이끄는 해시 접두어를 통해 부분적으로 지원합니다."
kind: adapter
lang: ko
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# Antigravity 어댑터

Antigravity는 Markdown 명령 절차를 통해 DWP를 지원합니다.

## 지원 수준

**부분** — 핵심 명령이 절차 파일을 통해 작동합니다.

## 설치

DWP 명령은 에이전트가 호출 시 읽는 Markdown 절차로 존재합니다.

## 호출

`#` 접두어를 사용하세요.

```
#dwp-create <goal>
#dwp-execute
```

## 참고

Antigravity는 절차 파일을 읽고 순차 DWP 워크플로를 실행합니다.
