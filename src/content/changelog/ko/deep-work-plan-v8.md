---
title: "DWP v8: spec-first와 닫힌 루프"
description: "Deep Work Plan v8은 spec-first 계획, 저장소 harness, Loop engineering, 측정 효율을 결합해 계획의 완료를 돕습니다."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: ko
order: 0
featured: true
sourceLabel: "태그된 릴리스와 v8 계약 초안"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
sourceLinks:
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
---

Deep Work Plan v8은 spec-first 개발, 에이전트 harness인 저장소, Loop engineering, 측정된 효율을 결합합니다. 작업 문장: “Spec-first, 루프를 닫다: 저장소가 harness이고 계획은 완료될 때까지 스스로 실행된다.”

## 네 가지 핵심

1. **Spec-first:** 계획과 사양은 명확한 승인 기준과 검증 게이트를 갖춘 지속 가능한 진실의 원천입니다. 2. **저장소가 harness:** 컨텍스트, 도구, 제어 규칙, 재개 상태를 코드와 함께 둡니다. 3. **Loop engineering:** 승인된 계획은 기록된 생애주기를 따라 완료까지 진행됩니다. 4. **측정된 효율:** 공개 측정 경로와 함께 흐름별 지침 바이트로 보고하고 token 비율은 추정하지 않습니다.

## Loop engineering의 의미

계획은 리드와 순서가 지정된 승계를 등록합니다. 사람이 선택 사항인 Herdr daemon을 herdr-peers autopilot --loop로 시작합니다. 알림은 새 권한 없이 진행을 요청하고, 리드가 없으면 등록된 승계자가 인수할 수 있습니다. 계획 이벤트는 팩의 Dailybot 알림기로 전달되며 fleet 화면은 활성 머신의 에이전트와 계획을 보여 줍니다. daemon은 사람이 시작하고 Herdr addon은 선택 사항입니다.

## 기능을 제공하는 릴리스

팩 v7.11.0의 강화와 v7.12.x의 계획 등록 및 알림이 계획 측 기능을 제공합니다. herdr-peers v1.3.x는 루프, 보고, fleet 화면을 추가하고 v2.0.0은 protocol 2 brain과 큐 소비자를 추가합니다. coding-agents-kit v1.3.0은 pick-v2 실행 계약, v1.4.0은 검증된 업데이트 도구를 제공합니다. 릴리스 링크는 위에 있습니다. addon은 선택 사항입니다.

## v8 계약 — RE-VERIFY AT 8.0.0

origin/feat/v8-line 초안은 plan-contract/v8에 autonomy를 추가합니다. 정체 예산, 알림 가능한 pane, 알림 대상, brain 실행 권한, 큐 동작을 기록합니다. .dwp/queue.json용 dwp-queue-v1도 정의하며 팩이 기록하고 Herdr가 읽습니다. 공개 전에 태그된 8.0.0 산출물로 재확인해야 합니다.
