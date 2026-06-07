---
title: "빠른 시작 — Deep Work Plan"
description: "스킬을 설치하고 리포지토리를 온보딩한 뒤 어떤 에이전트로든 계획하고 실행하세요 — 리포지토리를 스펙 주도이며 에이전트가 조종 가능하게 만드는 단계."
lastUpdated: 2026-05-31
---

## 빠른 시작

스킬을 설치하고 리포지토리를 온보딩한 뒤 어떤 에이전트로든 계획하고 실행하세요 — 리포지토리를
스펙 주도이며 에이전트가 조종 가능하게 만드는 단계입니다.

## 채택 경로

### 1. Deep Work Plan 스킬 설치

리포지토리에 스킬을 추가하세요. 라우터와 여덟 개의 하위 스킬 — create, execute, refine,
resume, status, verify, onboard, author — 을 제공합니다. 가장 빠른 경로로 Skills CLI를 사용하세요.

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

또는 리포지토리를 클론하고 git과 셸을 사용할 수 있는 곳에서 setup을 실행하세요.

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### 2. 리포지토리 온보딩

onboard 하위 스킬을 실행하고 에이전트가 실제 리포지토리 — 스택, 패키지
관리자, 실제 검증 명령 — 를 추론하게 하세요.

```bash
/deepworkplan-onboard
```

`AGENTS.md`, `docs/` 지식 베이스, 모듈별 문서, 교차 에이전트용 `.agents/` 홈
(`.claude → .agents` 심링크 포함)을 생성하고, 얇은 `dwp-*` 명령을 연결하며, 계획과 초안을 위한
gitignore된 `.dwp/`를 구성합니다. 어떤 것도 템플릿이 아니라 모두 리포지토리에 맞게 적응됩니다.

### 3. 키트 발전과 애드온 채택

`/skill-create`와 `/agent-create`(author 하위 스킬)로 스택에 맞는 스킬,
에이전트, 명령을 키우세요. 온보딩은 또한 네 가지 선택형 애드온 — devcontainer, Dailybot,
dependency-upgrade, design-system — 을 제안하며, 맞을 때만 채택하면 됩니다. 리포지토리는 애드온이 하나도 없어도 완전히 적합합니다.

### 4. 계획하고 실행

Deep Work Plan을 생성하고 task 단위로 실행하세요.

```bash
/dwp-create <goal>
/dwp-execute
```

작업이 진행됨에 따라 `/dwp-status`, `/dwp-refine`, `/dwp-resume`를 사용하세요. 각 계획은 번호 매겨진 task,
검증 게이트, 완료 프로토콜을 담아 작업이 구조화되고 세션을 넘어 재개 가능하도록 유지합니다.

## 결과

리포지토리가 스펙 주도이며 에이전트가 조종 가능해집니다. 계획이 견고한 진실 공급원이 되고,
리포지토리 자체가 어떤 에이전트든 실행하는 하니스가 됩니다.

- [방법론 읽기](/methodology)
- [스펙 둘러보기](/spec)
- [키트 둘러보기](/kit)
