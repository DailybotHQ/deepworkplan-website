---
title: "DWP v7: 위임하고 모든 것을 기록하는 계획"
description: "Deep Work Plan v7은 v6의 계약과 저널을 유지하고, 계획이 범위가 정해진 작업을 다른 에이전트에 위임하게 하며 선택 애드온 4개를 더합니다."
date: 2026-10-10
version: "v7 · 증거를 갖춘 위임"
kind: release
lang: ko
order: 0
featured: true
sourceLabel: "게시된 v7 스키마 세트"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
---

Deep Work Plan v7은 v6의 방식을 유지합니다. 계약이 권한의 근거이고, 추가 전용 저널이 기억이며, 스케줄러가 다음에 실행할 작업을 정하고, 기록된 증거가 작업의 기준을 충족할 때만 작업이 종료됩니다. v7은 위임 기능을 더하면서 그 결과에 대해서도 같은 규율을 유지합니다.

`agent_delegation`을 부여한 계획은 작업을 `parallel_safe`로 표시하여 다른 에이전트에 넘길 수 있습니다. 위임받은 쪽의 응답은 지시가 아니라 데이터로 기록되며, 계획 자체의 게이트 러너가 결과를 관찰할 때까지 `asserted` 상태로 남습니다. `observed` 증거는 러너만 생성하므로, 위임은 완료 기준을 낮추지 않으면서 도달 범위를 넓힙니다.

선택 애드온 4개가 위임을 실용적인 자율성으로 바꿉니다. Herdr는 어떤 머신에 있든 패널의 에이전트에게 작업을 넘깁니다. Agentkit은 모든 터미널 코딩 에이전트 위에 `ak` 명령 하나를 두고, 기본적으로 자율 동작하되 끌 수 있으며, 범위가 정해진 작업을 git worktree에서 헤드리스로 실행합니다. Devcontainer는 SSH 키가 전혀 들어 있지 않은 재현 가능한 컨테이너를 각 저장소에 제공합니다. DeepWorkPlan Vim은 계획 브라우저와 Markdown 뷰어를 갖춘 터미널 편집기입니다. 각각 자체 저장소를 가진 제품에 태그로 고정되어 있으며 Deep Work Plan 없이도 동작합니다. 저장소는 이 중 어느 것도 없이 완전히 적합할 수 있고, `.dwp/config.json`의 레지스트리가 어떤 것이 활성화되었는지 기록합니다.

벤치마크 및 학습 모드는 각 계획이 알려 주는 내용을 기록하여 결과를 나중에 분석할 수 있게 합니다. 저장소마다 에이전트 하나를 두고 v7 오케스트레이터 계획으로 수행한 전체 생태계 감사에서는 v6 대비 동작 회귀가 발견되지 않았습니다. 팩 테스트 스위트는 깨끗한 환경에서 807개 중 807개를 통과했고, 명령어 로드는 흐름별로 0.1%에서 3.9% 증가했으며(팩 전체로는 4.6%), 이는 토큰으로 추정한 것이 아니라 두 태그의 바이트 수로 측정한 값입니다.

v7은 오케스트레이션과 감사 가능성에서의 큰 진전이지만, 아직 완전한 무인 자율성은 아닙니다. 벤치마크 및 학습 루프는 아직 v7 계획을 자동으로 측정하지 않으며, 에이전트 결과의 비열등성도 측정되지 않았습니다. 기존 계획은 기록된 세대를 유지하며 암묵적으로 마이그레이션되지 않습니다. 새 계획은 기본적으로 v7 계약을 사용합니다.

설치된 skill 릴리스: **7.1.4**, 7.0.0 이후 안정적입니다.
