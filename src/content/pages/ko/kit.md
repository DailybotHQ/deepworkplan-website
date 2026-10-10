---
title: "Deep Work Plan 키트"
description: "Deep Work Plan을 어디서든 실행 가능하게 만드는 스킬과 아홉 개의 하위 스킬, 명령, 에이전트 어댑터, 온보딩 프리셋, 선택형 애드온, 예시."
lastUpdated: 2026-10-09
---

## Deep Work Plan 키트

키트는 방법론을 실제로 실행하는 데 필요한 모든 것입니다.
`DailybotHQ/deepworkplan-skill`에서 설치됩니다.

```bash
npx --yes skills add https://github.com/DailybotHQ/deepworkplan-skill/tree/v7.1.0 --skill deepworkplan -y
```

현재 7.x 팩은 새 계획을 기본적으로 v7로 생성합니다. 기존 계획은 기록된 세대를 유지하며, 마이그레이션에는 명시적 요청이 필요합니다.

### 스킬과 그 하위 스킬

Deep Work Plan 스킬은 라우터와 아홉 개의 하위 스킬입니다.

- **create** — 목표를 구조화된 계획으로 분해합니다(`/dwp-create`).
- **execute** — 계획을 task 단위로 실행하며 각 게이트를 검증합니다(`/dwp-execute`).
- **refine** — 완료된 작업을 보존하면서 task를 추가, 제거, 재배열합니다(`/dwp-refine`).
- **resume** — 상태를 재구성하고 중단된 계획을 계속합니다(`/dwp-resume`).
- **status** — 변경 없이 진행 상황을 보고합니다(`/dwp-status`).
- **verify** — 리포지토리와 계획의 적합성을 객관적으로 확인합니다(`/dwp-verify`).
- **onboard** — 리포지토리를 AI-first로 만듭니다(`/deepworkplan-onboard`).
- **author** — 리포지토리 자체의 스킬, 에이전트, 명령을 생성하거나 발전시킵니다(`/skill-create`, `/agent-create`).
- **upgrade** — 설치된 스킬을 새 릴리스로 안전하게 이동합니다 (`/dwp-upgrade`).

### 명령

얇은 슬래시 명령이 하위 스킬과 애드온에 위임합니다.

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — 계획-실행-검증 루프.
- `skill-create`, `agent-create` — author 하위 스킬에 위임합니다.
- `lib-upgrade` — dependency-upgrade 애드온에 위임합니다(그 애드온이 채택될 때만 설치됨).

### 어댑터

Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini, OpenCode, Windsurf, Cline, Antigravity, OpenClaw, Hermes, 그리고 클라우드/백그라운드 에이전트(Claude Code 원격 작업, Codex 클라우드, Jules 클래스)를 위한 얇은 에이전트별 통합. OpenClaw와 Hermes는 하트비트 또는 크론 스케줄링으로 무인 실행 프로필 하에서 계획을 실행하는 자율 에이전트 플랫폼입니다.

### 온보딩 프리셋

onboard 흐름이 문서, 스킬, 검증 명령을 적응시킬 때 사용하는 스택별 추론 가이드 —
결코 템플릿이 아닙니다. 여섯 개의 프리셋: Django, Vue + Vite, Astro/Svelte, Node/TS 서비스, Python 패키지/CLI,
그리고 범용 폴백.

### 애드온

onboard 흐름이 리포지토리에 얹는 기능들입니다. 일곱 가지는 선택형이며 AI-first 기준선의 일부가 결코 아니고, AI Diff Reviewer 로컬 리뷰는 표준 2.3.0부터 필수입니다:

- **Devcontainer** — 영속적 AI-CLI 인증을 갖춘 재현 가능하고 격리된 개발 컨테이너.
- **Dailybot** — Dailybot을 사용하는 팀을 위한 계획 라이프사이클 보고(kickoff, 중요 작업, 블로킹, 완료), 더하기 전체 Dailybot 에이전트 스킬(3.23.3: 채팅, 체크인, 폼, AI 질의, Plan, 저장소별 API 키 등) 접근.
- **Dependency upgrade** — 패키지 관리자 비종속, 배치 단위, 검증되고 되돌릴 수 있는 업그레이드.
- **Design system** — 리포지토리의 실제 디자인 소스에서 추론된 인터페이스 범위의 `DESIGN.md`(`docs/DESIGN.md`에 위치하며 `AGENTS.md`에서 참조됨)로, 비주얼 UI, 스타일이 입혀진 CLI 출력, 대화형 메시징을 위한 프로필을 갖추어 에이전트가 브랜드에 맞는 인터페이스 출력을 생성합니다. 디자인 시스템이 감지되면 제안은 필수이지만 설치는 수락으로 제어됩니다: 비주얼 프로필은 감지 시 강력히 권장되고, CLI와 대화형 프로필은 감지 시 권장되며 언제나 먼저 물어봅니다.
- **AI Diff Reviewer** — 필수 로컬 리뷰입니다: 온보딩이 [AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) v3 + `.review/extension.md`를 설치하고, 모든 Final Review의 보안 점검이 이를 실행합니다; 선택적인 Flow B는 동일한 extension을 공유하는 CI PR 병합 게이트를 추가하며, 명시적으로 제안되고 요청 없이 설치되지 않습니다.
- **[Herdr](/ko/kit/herdr)** — 대화형 위임: 계획이 경계가 정해진 작업을 다른 Herdr 페인의 코딩 에이전트에게 넘기고, 승인된 단일 응답을 기록합니다.
- **[DeepWorkPlan Vim](/ko/kit/vim)** — Deep Work Plan을 위한 터미널 편집기로, 명령 색인, 읽기 전용 계획 브라우저, Markdown 뷰어를 갖추고 있습니다.
- **[Agentkit](/ko/kit/agentkit)** — 모든 터미널 코딩 에이전트를 위한 하나의 `ak` 명령과, 경계가 정해진 계획 작업의 헤드리스 위임.

### 생태계

**방법론은 단독으로 작동합니다. 애드온은 이를 강화합니다.** 각 애드온은 Deep Work Plan 스킬 내부의 얇은 통합 계층으로, 자체 리포지토리, 릴리스, 인터페이스 버전을 갖춘 제품에 태그로 고정됩니다. 모든 제품은 Deep Work Plan 없이도 작동하며, 필수 애드온은 없습니다.

- **Deep Work Plan 스킬** — 계획을 생성, 실행, 검증, 재개, 개선합니다. 애드온이 필요하지 않습니다.
- **[herdr](/ko/kit/herdr)** — 어떤 머신에서든 Herdr 페인에 있는 피어: 승인된 응답 한 번으로 이루어지는 대화형 위임. 고정 버전 `herdr-peers@v0.1.0`.
- **[agentkit](/ko/kit/agentkit)** — 모든 터미널 코딩 에이전트를 위한 하나의 ak 명령: 기본은 자율 실행(옵트아웃 가능), 그리고 worktree에서의 헤드리스 위임. 고정 버전 `coding-agents-kit@v0.3.0`.
- **[devcontainer](/ko/kit/devcontainer)** — 하나의 템플릿으로 만드는 리포지토리별 개발 컨테이너: 에이전트는 ak로, Herdr는 양방향, 내부에 SSH 키 없음. 고정 버전 `devcontainer-kit@v0.2.2`.
- **[vim](/ko/kit/vim)** — 읽기 전용 계획 브라우저와 Markdown 뷰어를 갖춘 터미널 편집기. 고정 버전 `deepworkplan-vim@v0.5.1`.

애드온 레지스트리와 디스크립터는 Deep Work Plan v7에 포함되어 있습니다: `v7.0.0`

### 예시

실제로 작업한 전후 비교 워크스루.

- [키트 둘러보기](/kit)
- [빠른 시작](/quickstart)
- [예시 보기](/examples)
