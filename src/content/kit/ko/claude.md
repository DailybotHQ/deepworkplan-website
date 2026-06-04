---
title: Claude Code
description: "Claude Code를 위한 DWP 어댑터로, 네이티브 슬래시 명령과 스킬을 통해 완전히 지원하며, 전체 기능을 위한 서브에이전트와 팀 에이전트를 포함합니다."
kind: adapter
lang: ko
order: 1
agent: Claude Code
support: full
prefix: /
---

# Claude Code 어댑터

Claude Code는 네이티브 슬래시 명령과 스킬을 통해 DWP를 **완전히** 지원합니다.

## 지원 수준

**완전** — 다섯 개의 DWP 명령 모두가 네이티브 Claude Code 슬래시 명령에 매핑됩니다.

## 설치

DWP는 `.agents/skills/` 아래의 스킬로 제공됩니다(`.claude/` 심링크를 통해 해석됨). Claude Code가 자동으로 발견합니다.

## 호출

`/` 접두어를 사용하세요.

```
/dwp-create <goal>
/dwp-execute
```

## 참고

Claude Code는 스킬, 서브에이전트, 팀 에이전트를 지원합니다 — 전체 DWP 기능 집합입니다.
