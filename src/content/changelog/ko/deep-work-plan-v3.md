---
title: "DWP v3: 설계로 실현하는 토큰 효율성"
description: "Deep Work Plan v3는 점진적 정보 공개, 영향 범위에 한정된 검증, 단일 필수 Final Review를 통해 컨텍스트 비용을 중심으로 하니스를 재구성하는 동시에 신뢰와 적합성의 최저 기준을 끌어올립니다."
date: 2026-09-10
version: "v3 · 토큰 효율성"
kind: release
lang: ko
order: 3
featured: false
sourceLabel: "Skill release commit d050474"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/d050474bea3a2b7675ce851efb377833b4960367"
---

오늘 Deep Work Plan v3를 출시합니다. 컨텍스트는 에이전트에게 가장 부족한 자원이며, 이번 릴리스는 이를 막연한 약속이 아니라 엔지니어링 문제로 다룹니다. 줄이는 것은 뼈대일 뿐, 지침이 아닙니다.

`GUIDE.md`는 모든 에이전트가 전체를 읽는 문서가 아니라 라우팅 인덱스가 되어, 에이전트가 특정 단계에 실제로 필요한 가이드만 불러오도록 합니다. 검증 게이트는 이제 변경할 때마다 전체 스위트를 다시 실행하는 대신 각 작업의 영향 범위에서 선택됩니다. 그리고 개발자가 원하는 바를 이미 알고 있을 때는 중간 리뷰를 건너뛰고 곧바로 신뢰 모드로 계획을 생성할 수 있습니다. 이 중 어느 것도 게이트를 약화시키지 않습니다. 오히려 반복되는 읽기, 불필요한 컨텍스트 로딩, 실제 변경 사항과 맞지 않는 검증 작업을 없앨 뿐입니다.

효율성 작업과 더불어, 이번 릴리스는 신뢰의 최저 기준도 끌어올립니다. 과거 계획을 마무리하던 세 개의 종료 작업은 단일한 필수 Final Review로 대체됩니다. AI Diff Reviewer 로컬 리뷰는 기본 구성의 필수 요소가 되고, 적합성은 이제 선택적 애드온이 전혀 없는 상태에서 출발합니다——보안과 출처는 선택적인 다듬기가 아니라 요구 사항입니다. `AGENTS.md`는 저장소의 DWP 표준 출처를 기록하며, 레거시 계획은 조용히 다시 작성되는 대신 기록된 형태를 유지한 채 명시적인 마이그레이션 경로를 제공받습니다.

이번 릴리스는 DWP 표준 `2.3.0`을 따릅니다. 명령어 부하와 재현 동작은 지어낸 절감 비율이 아니라 공개 평가 원장을 기준으로 측정됩니다.

[토큰 효율성 아키텍처](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/adr/0001-token-efficiency-architecture.md)와 그 [평가 기록](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/evaluations/token-efficiency.md)을 읽어보거나, [표준 사양](https://deepworkplan.com/spec)과 [키트](https://deepworkplan.com/kit/)를 살펴보세요.
