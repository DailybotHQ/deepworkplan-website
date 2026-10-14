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

**완전 지원** (동작 검증됨) — DWP 하위 스킬 및 수명 주기 명령 전체 제품군이 기본 Claude Code 슬래시 명령에 매핑되며, 양방향 인계 벤치마크에서 입증되었습니다.

## 설치

DWP는 `.agents/skills/` 아래의 스킬로 제공됩니다(`.claude/` 심링크를 통해 해석됨). Claude Code가 자동으로 발견합니다.

선택 사항: [coding-agents-kit](/kit/agentkit)로 이 CLI를 설치하고 `ak claude`로 실행할 수 있습니다. 공급업체의 공식 설치 프로그램도 똑같이 사용할 수 있습니다.

```bash
git clone --branch v1.0.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install claude
```

## 호출

`/` 접두어를 사용하세요.

```
/dwp-create <goal>
/dwp-execute
```

## 참고

Claude Code는 스킬, 서브에이전트, 팀 에이전트를 지원합니다 — 전체 DWP 기능 집합입니다.
