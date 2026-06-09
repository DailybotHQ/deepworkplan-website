---
title: OpenClaw
description: "OpenClaw용 DWP 어댑터: 네이티브 .agents/skills 스캔, 무인 실행 매핑, 자율 에이전트 작업 공간을 위한 크론 기반 계획 계속 실행."
kind: adapter
lang: ko
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# OpenClaw 어댑터

OpenClaw는 예약된 턴으로 장기 실행 작업 공간을 운영하는 자율 에이전트 플랫폼입니다. 설치된 스킬 팩을 위해 `<workspace>/.agents/skills/`를 네이티브로 스캔하므로, DWP 스킬은 별도의 어댑터 심 없이 로드됩니다 — 거기에 설치하면 OpenClaw가 자동으로 인식합니다.

## 지원 수준

**Full** — OpenClaw는 `AGENTS.md`를 읽고 AgentSkills 표준을 통해 스킬을 로드합니다. 모든 DWP 하위 스킬(`onboard`, `create`, `execute`, `refine`, `resume`, `status`, `verify`)을 사용할 수 있습니다.

## 설치

```bash
openclaw skills install deepworkplan
```

또는 수동으로: `DailybotHQ/deepworkplan-skill`을 `<workspace>/.agents/skills/deepworkplan/`에 클론합니다.

## 호출

플레인 텍스트 — OpenClaw는 슬래시 명령 접두사를 사용하지 않습니다.

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## 무인 실행 매핑

OpenClaw의 스케줄링 프리미티브는 DWP의 계속 실행 모델에 직접 매핑됩니다.

| OpenClaw 프리미티브 | DWP 역할 |
|--------------------|----------|
| 작업 공간 루트 | [에이전트 작업 공간](/spec/archetypes) 아키타입: `AGENTS.md`, `.agents/`, `.dwp/`가 작업 공간 루트에 위치 |
| `<workspace>/.agents/skills/` (네이티브 tier-2 스캔) | 이 팩이 위치하는 곳 — 어댑터 심 불필요 |
| 하트비트 또는 크론 턴 | 하나의 [예약된 계속 실행](/spec/agent-protocol#scheduled-continuation) 턴: 깨어남 → DWP 재개 프로토콜 → 다음 원자적 작업 → 상태 갱신 → 양보 |
| `HEARTBEAT.md` 검사 | 한 줄 추가: "`.dwp/plans/`에 열린 계획이 있으면 한 작업 재개." |
| 상시 지시 | 계획 승인 경계 및 무인 프로필의 제한된 권한 |

운영상:

1. 사람이 대화형으로 계획을 생성하고 승인합니다. 승인이 제어 지점입니다 — 무인 턴은 한 턴에 생성과 실행을 동시에 하지 않습니다.
2. 계획은 기계 가독 상태 레이어(`manifest.json` + `state.json`)를 담아야 합니다. git이 없는 작업 공간에서는 `state.json`이 충돌 안전 재개를 가능하게 합니다. 참고: [계획 상태](/spec/plan-state).
3. 각 하트비트 또는 크론 턴은 최대 하나의 작업을 실행하고, 검증 게이트를 통과하며, `state.json`을 원자적으로 갱신하고, 양보합니다.
4. 정지 조건이 발생하면 에이전트는 `state.json`의 `blocked` 필드를 작성하고 작업 공간의 일반 채널을 통해 보고합니다. 다음 사람의 확인 — 또는 하트비트 보고 — 에서 필요한 것이 정확히 표시됩니다.

결과: 데몬이 야간에 실행하는, 재시작, 모델 변경, 세션 경계에서 살아남는 다중 일 계획 — 사람이 감독하는 실행과 동일한 게이트를 적용합니다.

## 참고

OpenClaw의 작업 공간은 [에이전트 작업 공간](/spec/archetypes) 아키타입의 표준 예시입니다. DWP 스킬 팩의 `HEARTBEAT.md` 통합과 `state.json` 요구 사항은 이 플랫폼을 염두에 두고 설계되었습니다.
