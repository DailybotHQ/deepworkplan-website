---
title: "DWP v8: spec-first와 닫힌 루프"
description: "Deep Work Plan v8은 spec-first 계획, 저장소 harness, Loop engineering, 측정 효율을 결합해 계획의 완료를 돕습니다."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: ko
order: 0
featured: true
sourceLabel: "Skill 릴리스 v8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Skill 릴리스 v8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Skill 릴리스 v8.0.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "Skill 릴리스 v8.0.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.2"
  - label: "LOOP_ENGINEERING.md (v8 규범)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "사양 리더의 Loop engineering"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "plan-contract/v8 스키마"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "journal-event/v8 스키마"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "plan-snapshot/v8 스키마"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "계획 대기열 작성기 (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Skill 릴리스 v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill 릴리스 v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill 릴리스 v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.0"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8은 spec-first 개발, 에이전트 harness로서의 저장소, Loop engineering, 측정된 효율이라는 네 가지 아이디어를 결합합니다. 작업 문장은 “Spec-first, loop-closed: 저장소가 harness이며 계획은 완료될 때까지 스스로 진행됩니다.”입니다.

## 네 가지 기둥

1. **Spec-first.** 계획과 명세는 명시적인 승인 기준과 검증 관문을 갖춘 지속 가능한 기준 정보입니다.
2. **저장소가 harness입니다.** 컨텍스트, 도구, 제어 규칙, 재개 가능한 상태를 코드와 함께 두어 서로 다른 에이전트가 같은 저장소에서 작업할 수 있습니다.
3. **Loop engineering.** 승인된 계획은 기록된 수명 주기를 따라 완료될 때까지 진행할 수 있습니다.
4. **측정된 효율.** 효율은 플로우당 지시 바이트로 표시하고 공개된 측정 경로를 제공합니다. 토큰 비율을 추정하지 않습니다.

## Loop engineering의 의미

계획은 리드와 순서가 정해진 승계자를 등록합니다. 사람이 선택 사항인 Herdr daemon을 `herdr-peers autopilot --loop`로 시작합니다. 알림은 새 권한을 부여하지 않고 리드에게 계속 진행하라고 요청합니다. 리드가 떠나면 루프는 등록된 승계자에게 인계를 요청할 수 있습니다. 계획 이벤트는 패키지의 Dailybot 알림기로 전달될 수 있으며 fleet 화면은 활성화된 머신의 에이전트와 계획을 보여 줍니다. daemon 시작은 사람이 담당하며 Herdr addon은 선택 사항입니다.

## 메커니즘을 제공하는 릴리스

패키지 v7.11.0의 강화와 v7.12.x의 계획 등록 및 알림 릴리스가 계획 측 메커니즘을 제공합니다. herdr-peers v1.3.x는 루프, 보고, fleet 화면을 추가하고 v2.0.0은 protocol 2 brain과 큐 소비자를 추가합니다. coding-agents-kit v1.3.0은 pick-v2 실행 계약을 제공하고 v1.4.0은 검증된 업데이트 도구를 추가합니다. herdr-peers v2.1.0은 v8 구조화 blocker를 읽고 coding-agents-kit v1.5.0은 보고된 토큰만 계측합니다. 패키지 8.0.0 addon 설명자는 herdr-peers v2.1.0, coding-agents-kit v1.5.0, devcontainer-kit v1.3.0을 고정합니다. 태그가 붙은 릴리스는 위에 링크되어 있습니다. 이 선택 addon 없이도 패키지를 사용할 수 있습니다.

## v8 계약

릴리스 8.0.0은 DWP 표준 8.0.0을 구현합니다. 새 계획은 `plan-contract/v8`로 생성합니다. v7, v6, v5 계획은 기록된 세대를 유지하며 명시적인 `refine migrate`로만 이전합니다. v8 계획은 `plan-manifest/v7` 계열을 유지하고 기존 계획을 위해 `journal-event/v7`을 계속 지원합니다. 규범 문서는 `LOOP_ENGINEERING.md`이며 공개된 스키마 세 개가 함께 제공됩니다.

- **`autonomy` 블록.** 계획의 루프 권한을 기록하는 `plan-contract/v8`의 선택적이고 닫힌 블록입니다. `stall_budget`(1–10, 기본값 3), `promptable` pane(기본값: 리드만), `notify` 대상(기본값: 없음), `brain`(기본값: `false`), `queue`(`prompt-lead`, `launch`, `none`; 기본값 `none`)를 기록합니다. 블록이 없으면 모든 기본값이 적용되고 사람은 계속 해결 담당자입니다.
- **구조화 blocker.** blocker는 `journal-event/v8`의 `blocker` 이벤트이며 ledger helper를 통해서만 생성 및 해결됩니다. 작업, 이유, 한 줄의 `needs`, 필수 C1–C7 분류, 선택 resolver를 포함합니다. C1, C2, C5, C6에는 `resolver: lead`를 허용하지 않습니다. 루프는 계획이 직접 `resolver: lead`로 표시한 blocker만 리드에게 해결을 요청합니다. `state.json`은 활성 blocker와 파생된 `blocked` 상태를 담는 `plan-snapshot/v8`이 됩니다. `PROGRESS.md`는 목표, 현재 작업, 다음 행동, 필요 사항의 네 줄 헤더로 시작합니다.
- **계획 큐.** `.dwp/queue.json`(`dwp-queue-v1`)은 패키지의 `shared/queue.py` 또는 사람만 씁니다. 승인 시 `create`가 계획을 추가하고 Herdr daemon은 큐를 읽기만 합니다. 큐에는 최대 64개 계획을 담고, 계획이 `parallel: true`를 설정하지 않으면 저장소마다 한 번에 하나씩 실행합니다. 손상된 큐도 수명 주기를 중단시키지 않습니다.

v7의 마지막 릴리스는 **7.12.2**였습니다.

설치된 skill 릴리스: **8.0.2**.
