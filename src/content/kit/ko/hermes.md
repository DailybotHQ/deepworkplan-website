---
title: Hermes
description: "Hermes용 DWP 어댑터: AgentSkills 표준 스킬 로딩, state.json의 결과 기록을 통한 에피소드 메모리 시너지, 크론 기반 계획 계속 실행."
kind: adapter
lang: ko
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Hermes 어댑터

Hermes는 AgentSkills 표준을 통해 스킬을 로드하고 세션 간에 에피소드 메모리를 유지하는 자율 에이전트 플랫폼입니다. DWP는 두 표면 모두와 통합됩니다: 스킬 팩은 다른 AgentSkills 호환 팩과 같은 방식으로 `.agents/skills/`에서 로드되며, `state.json`의 결과 기록이 Hermes의 메모리 인덱스에 직접 피드됩니다.

## 지원 수준

**Full** — Hermes는 `AGENTS.md`를 읽고 AgentSkills 표준 로딩을 통해 스킬을 로드합니다. 모든 DWP 하위 스킬을 사용할 수 있습니다.

## 설치

스킬 팩을 작업 공간의 `.agents/skills/` 디렉터리에 설치하거나, 플랫폼의 스킬 관리자가 있으면 그것을 사용합니다.

## 호출

플레인 텍스트:

```
create a plan for <goal>
resume the open plan
```

## 에피소드 메모리 시너지

Hermes는 에이전트 메모리를 인덱싱하여 과거 작업을 미래 세션에서 검색 가능하게 합니다. DWP의 `state.json` 결과 기록은 정확히 이 용도로 설계되었습니다: 완료된 각 작업은 구조화된 JSON 필드에 `tried`(시도한 것), `failed`(실패한 것), `worked`(작동한 것), 그리고 자유 형식 메모를 담습니다. Hermes가 작업 공간의 `.dwp/plans/` 상태 파일을 인덱싱하면, 완료된 계획은 검색 가능한 에피소드 메모리가 됩니다 — 에이전트가 나중에 계획이 실행되었다는 것만이 아니라 특정 문제가 어떻게 해결되었는지를 회상할 수 있습니다.

이것은 DWP 계획이 Hermes에서 두 가지 방식으로 내구성을 가진다는 것을 의미합니다: Markdown 파일이 사람이 읽는 기록이고, `state.json` 결과 기록이 기계 인덱싱 가능한 메모리입니다. 참고: [계획 상태](/spec/plan-state#outcome-records-as-episodic-memory).

## 크론 기반 계속 실행

크론 스케줄링이 있는 플랫폼에서, 계속 실행은 다른 자율 플랫폼과 동일한 패턴을 따릅니다: 각 예약된 턴이 깨어나고, DWP 재개 프로토콜을 실행하며, 최대 하나의 작업을 실행하고, `state.json`을 갱신하고, 양보합니다. 계획이, 세션이 아니라, 연속성의 단위입니다.

기계 가독 상태 레이어(`manifest.json` + `state.json`)는 무인 실행에 REQUIRED입니다. 전체 정지 조건과 에스컬레이션 프로토콜은 [에이전트 프로토콜](/spec/agent-protocol#execution-profiles)을 참고합니다.

## 참고

Hermes와 OpenClaw는 모두 [에이전트 프로토콜](/spec/agent-protocol)의 지원 에이전트 표에 있는 자율 에이전트 플랫폼입니다. 둘 다 무인 실행 프로필 하에서 실행되며, 둘 다 에이전트 작업 공간 아키타입의 `state.json`-git 로그 동등성에서 이점을 얻습니다.
