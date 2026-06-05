---
title: OpenCode
description: "오픈 소스 에이전트인 OpenCode를 위한 DWP 어댑터로, 네이티브 AGENTS.md와 해시 접두어로 호출하는 Markdown 명령 절차를 통해 완전히 지원합니다."
kind: adapter
lang: ko
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# OpenCode 어댑터

오픈 소스 코딩 에이전트인 OpenCode는 네이티브 AGENTS.md와 Markdown 명령 절차를 통해 DWP를 지원합니다.

## 지원 수준

**완전** — OpenCode는 AGENTS.md를 네이티브로 읽고 모든 dwp-* 명령을 절차 파일에서 실행합니다.

## 설치

DWP는 리포지토리에 AGENTS.md와 명령 절차를 제공합니다. OpenCode는 이를 프로젝트 컨텍스트로 발견합니다.

## 호출

`#` 접두어를 사용하세요.

```
#dwp-create <goal>
#dwp-execute
```

## 참고

OpenCode는 절차 파일을 읽고 완전한 순차 Deep Work Plan 루프를 실행합니다.
