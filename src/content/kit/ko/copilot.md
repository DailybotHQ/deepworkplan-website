---
title: GitHub Copilot
description: "GitHub Copilot를 위한 DWP 어댑터로, Markdown 명령 절차와 해시 접두어를 통해 부분적으로 지원합니다. 일부 자동화는 수동으로 이루어집니다."
kind: adapter
lang: ko
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# GitHub Copilot 어댑터

GitHub Copilot는 Markdown 명령 절차를 통해 DWP를 지원합니다.

## 지원 수준

**부분** — 핵심 명령은 절차 파일을 통해 작동하지만 일부 자동화는 수동입니다.

## 설치

DWP 명령은 리포지토리 안에 Markdown 절차로 존재합니다.

## 호출

`#` 접두어를 사용하세요.

```
#dwp-create <goal>
#dwp-execute
```

## 참고

Copilot는 절차 파일을 읽지만 Claude Code보다 자율 실행 능력이 낮습니다.
