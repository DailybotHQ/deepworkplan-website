---
title: "Deep Work Plan 키트"
description: "Deep Work Plan을 어디서든 실행 가능하게 만드는 스킬과 여덟 개의 하위 스킬, 명령, 에이전트 어댑터, 온보딩 프리셋, 선택형 애드온, 예시."
lastUpdated: 2026-05-31
---

## Deep Work Plan 키트

키트는 방법론을 실제로 실행하는 데 필요한 모든 것입니다.
`DailybotHQ/deepworkplan-skill`에서 설치됩니다.

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### 스킬과 그 하위 스킬

Deep Work Plan 스킬은 라우터와 여덟 개의 하위 스킬입니다.

- **create** — 목표를 구조화된 계획으로 분해합니다(`/dwp-create`).
- **execute** — 계획을 task 단위로 실행하며 각 게이트를 검증합니다(`/dwp-execute`).
- **refine** — 완료된 작업을 보존하면서 task를 추가, 제거, 재배열합니다(`/dwp-refine`).
- **resume** — 상태를 재구성하고 중단된 계획을 계속합니다(`/dwp-resume`).
- **status** — 변경 없이 진행 상황을 보고합니다(`/dwp-status`).
- **verify** — 리포지토리와 계획의 적합성을 객관적으로 확인합니다(`/dwp-verify`).
- **onboard** — 리포지토리를 AI-first로 만듭니다(`/deepworkplan-onboard`).
- **author** — 리포지토리 자체의 스킬, 에이전트, 명령을 생성하거나 발전시킵니다(`/skill-create`, `/agent-create`).

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

### 애드온 (선택형)

onboard 흐름이 리포지토리에 얹을 수 있는 선택 기능 — AI-first 기준선의 일부는 결코 아닙니다.

- **Devcontainer** — 영속적 AI-CLI 인증을 갖춘 재현 가능하고 격리된 개발 컨테이너.
- **Dailybot** — Dailybot을 사용하는 팀을 위한 최선 노력 기반의 진행 및 마일스톤 보고.
- **Dependency upgrade** — 패키지 관리자 비종속, 배치 단위, 검증되고 되돌릴 수 있는 업그레이드.
- **Design system** — 리포지토리의 실제 디자인 소스에서 추론된 인터페이스 범위의 `DESIGN.md`(`docs/DESIGN.md`에 위치하며 `AGENTS.md`에서 참조됨)로, 비주얼 UI, 스타일이 입혀진 CLI 출력, 대화형 메시징을 위한 프로필을 갖추어 에이전트가 브랜드에 맞는 인터페이스 출력을 생성합니다. 디자인 시스템이 감지되면 비주얼 프로필은 기본 활성이고, CLI와 대화형 프로필은 감지 시 권장되며 언제나 먼저 물어봅니다.
- **AI Diff Reviewer** — 구조화된 로컬 검토([AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) v2 + 필수 `.review/extension.md`)로 Security Review를 강화합니다. 선택적인 Flow B는 동일한 extension을 공유하는 CI PR 병합 게이트를 추가합니다. 항상 Flow A 대 Flow B를 질문하세요. 절대 자동 설치하지 마세요.

### 예시

실제로 작업한 전후 비교 워크스루.

- [키트 둘러보기](/kit)
- [빠른 시작](/quickstart)
- [예시 보기](/examples)
