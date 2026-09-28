---
title: "DWP v6: 같은 방법, 더 엄격한 계약"
description: "Deep Work Plan v6는 v5 방법론을 유지하면서 더 엄격한 실행 구조를 추가합니다. 에이전트 결과 비열등성은 측정되지 않았습니다."
date: 2026-09-28
version: "v6 · 더 엄격한 구조"
kind: release
lang: ko
order: 0
featured: true
sourceLabel: "게시된 v6 스키마 세트"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6는 v5 방법론, 명령 표면, `.dwp/plans/` 위치를 유지합니다. 계획 권한, 실행 증거, 작업 컨텍스트, 스케줄링, 라이브 상태를 표현하는 구조를 더 엄격하게 만듭니다.

v6 스키마 세트는 식별 매니페스트, 결과 및 권한 계약, 추가 전용 저널 이벤트, 작업별 컨텍스트 매니페스트, 라이브 스냅샷을 정의합니다. v6 라이브 프로젝션은 스냅샷이므로 `plan-state/v5.json`은 v5 계획의 상태 스키마로 유지됩니다. `plan-state/v6.json`은 없습니다. 기존 계획은 기록된 세대를 유지하며 조용히 다시 작성되지 않습니다.

아키텍처 결정은 GO입니다. v6는 같은 방법론에 더 엄격한 엔지니어링 구조를 적용합니다. 이는 경험적 우월성 주장이 아닙니다. 에이전트 결과 비열등성은 측정되지 않았습니다.

새 계획에는 최소 세 자리 숫자로 된 단조 증가 ID를 부여합니다(예: `PLAN_001_add_payment_webhooks/`). 고정된 v5 스키마는 숫자 ID를 한 단어로 세므로 v5 슬러그는 2~4단어이고 v6 슬러그는 2~5단어입니다. 기존의 번호 없는 `PLAN_<slug>/` 폴더는 계속 읽을 수 있으며 절대 이름을 바꾸지 않습니다. 번호가 있는 계획이 있으면 `latest`는 숫자 ID가 가장 큰 계획을 가리킵니다.

설치된 skill 릴리스: **6.0.1**. 6.x 팩은 새 계획을 기본적으로 v6으로 생성합니다. 기존 계획은 기록된 세대를 유지하며, 마이그레이션에는 명시적 요청과 미리보기가 필요합니다.
