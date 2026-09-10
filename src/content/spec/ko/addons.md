---
title: 애드온
description: "DWP 애드온: 네 가지 옵트인 확장(devcontainer, Dailybot, dependency-upgrade, design-system), 선택적 CI 표면을 갖는 필수 AI Diff Reviewer 로컬 리뷰, 애드온 계약 및 키트 개념을 설명합니다."
order: 5
lang: ko
section: Addons
---

# 애드온

**버전 2.1.** 애드온은 핵심 Deep Work Plan 방법론에 대한 확장입니다. 다섯 가지 중 네 가지는 선택적이며 **적합성에 절대 필요하지 않습니다** — 선택적 애드온이 없는 저장소도 완전히 AI-first이며 DWP 적합합니다. 각 선택적 애드온은 온보딩 중 제안되며 명시적으로 수락 또는 거부되고, — 수락 시 — 기존 설정을 덮어쓰지 않고 **조정**합니다. 한 가지 구성 요소가 명시된 예외입니다: 표준 2.3.0부터 **AI Diff Reviewer 로컬 리뷰**는 필수 기준선의 일부입니다 — 온보딩이 이를 설치하고 모든 Final Review가 이를 실행합니다 — 반면 그 CI 표면은 옵트인으로 남습니다.

## 애드온 계약

출시되는 모든 애드온은 네 가지 필수 구성 요소를 제공합니다:

| 구성 요소 | 목적 |
|-----------|------|
| **Spec** | 애드온이 제공하는 것과 «이 애드온에 적합»의 의미에 대한 RFC-2119 규범 설명 |
| **Reasoning templates** | 대상 저장소 스택에 대해 에이전트가 추론하여 채우는 가이드 — 복사-붙여넣기 아님 |
| **Onboarding hook** | 개발자가 수락할 때 `onboard` 흐름이 호출하는 `SKILL.md` 진입점 |
| **Validation step** | 애드온이 올바르게 적용되었는지 확인하는 체크리스트 |

발견: `onboard` 흐름은 `skills/deepworkplan/addons/`를 열거하고 핵심 스캐폴딩 후 **7b 단계**에서 각 애드온을 옵트인 단계로 제시합니다.

## 출시 애드온(다섯 가지)

현재 다섯 가지 애드온이 출시됩니다 — 네 가지 옵트인과 필수 로컬 리뷰입니다. 각각 **키트 카탈로그 페이지**(사용자 대상 세부)와 Deep Work Plan 스킬 내 **규범 스펙**이 있습니다.

### Devcontainer(첫 번째 애드온)

감지된 스택에서 추론한 compose 기반 `.devcontainer/` + `docker/` 설정.

- **키트 페이지:** [Devcontainer](/kit/devcontainer)
- **추가 내용:** 영구 AI-CLI 인증 볼륨(Claude, Codex, Cursor, gh, Dailybot), `dailybot-project-network`, `DOCKER_DEV_ENV=vscode`, 검증 별칭(`codecheck`, `check`, `fix`, `test`), 공개 OSS 시크릿 위생
- **동작:** 약 85% 안정 스켈레톤; 약 15% 스택별 추론. 기존 devcontainer는 조정되며 절대 덮어쓰지 않음
- **제안 시점:** Docker 또는 격리 개발 컨테이너가 유익한 서비스가 있는 대부분의 저장소

### Dailybot(두 번째 애드온)

에이전트 진행 가시성을 위한 개발자 **Dailybot 팀**에 대한 옵트인 연결.

- **키트 페이지:** [Dailybot](/kit/dailybot) — 전체 기능 참조
- **DWP 애드온이 연결하는 것:** dailybot `report` 서브스킬을 통한 네 가지 플랜 라이프사이클 보고(kickoff, significant task, blocked, completion); 선택적 결정론적 훅 강제(`dailybot hook`, CLI `>= 3.7.0`)
- **페어링 스킬:** [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill)(현재 **3.10.3**) 설치 시 **14가지 기능** — Slack/Teams/Discord/Google Chat 채팅, 체크인, 폼 작성, Ask AI, kudos, 저장소별 API 키(`.dailybot/env.json`), 이메일 등. DWP 애드온은 **report**만 연결; 다른 기능은 Dailybot 스킬을 직접 호출
- **인증:** Dailybot 스킬에 완전 위임(`dailybot login` 또는 `DAILYBOT_API_KEY`); 이 애드온은 자격 증명을 저장하지 않음
- **벤더 중립 가드레일:** 핵심 DWP는 Dailybot 의존성 **제로**; 모든 사람에게 자동 설치하지 않음
- **제안 시점:** 개발자나 팀이 이미 Dailybot을 사용하거나 팀 보고를 명시적으로 요청

### Dependency upgrade(세 번째 애드온)

패키지 관리자 무관, 배치화, 검증, 되돌릴 수 있는 의존성 업그레이드.

- **키트 페이지:** [Dependency upgrade](/kit/dependency-upgrade)
- **추가 내용:** 저장소의 **실제** 관리자 감지(npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer…), semver 분류 배치로 업그레이드, 각 배치 후 저장소 검증 게이트 실행, 실패 배치 되돌리기, 자동 커밋 없이 요약
- **명령:** 수락 시에만 `.agents/commands/`에 `/lib-upgrade` 설치
- **제안 시점:** lockfile 존재 및 의존성이 많은 스택; 관련 있을 때만 권장

### Design system(네 번째 애드온)

인터페이스 표면 범위의 `DESIGN.md`. 모든 코딩 에이전트가 일관된 UI, CLI 또는 대화 출력을 위해 읽음.

- **키트 페이지:** [Design system](/kit/design-system)
- **추가 내용:** `docs/DESIGN.md`(`AGENTS.md`에서 참조), 하나의 파일에 최대 세 **프로필** 적층: **visual-ui**(렌더링 UI 토큰 및 컴포넌트), **cli-output**(의미적 터미널 스타일, TTY/`NO_COLOR` 저하), **conversational**(목소리, 메시지 구조, 플랫폼별 렌더링 및 일반 텍스트 폴백)
- **프로필 강도:** visual-ui는 감지 시 **기본 켜짐**; cli-output과 conversational은 감지 시 **권장, 항상 질문, 자동 적용 안 함**
- **제안 시점:** 사용자 대상 인터페이스 표면이 감지된 경우에만 — 순수 라이브러리, 헤드리스 서비스 또는 인프라 전용 저장소에는 해당 없음

### AI Diff Reviewer(다섯 번째 애드온 — 필수 로컬 리뷰, 선택적 CI 표면)

**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**(marketplace **"AI Diff Reviewer"**, 현재 버전 **v2.0.0**)는 필수 Final Review 보안 점검에 구조화된 로컬 리뷰를 부여하고, 선택적으로 CI에서 pull request를 게이트합니다. 표준 2.3.0부터 **로컬 리뷰는 기준선의 일부**입니다; 옵트인인 것은 CI 표면뿐입니다.

- **키트 페이지:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — 전체 기능 참조
- **온보딩 시 필수(7a 단계):** 온보딩 동의 아래 벤더 스킬의 태그 고정 설치(`npx --yes skills add DailybotHQ/ai-diff-reviewer@v2.0.0 --skill ai-diff-reviewer -y`) 더하기 저장소 맞춤 `.review/extension.md`(`generate-extension` 경유); 표적 하니스 업그레이드는 둘 중 무엇이 누락되었는지 조정; 거부는 선언된 예외로 기록되며 설치될 때까지 `verify`가 보고
- **모든 Final Review에서 필수:** 보안 점검은 누적 변경 집합에 대해 upstream 부모 기본 플로우를 실행하고 그 출력을 `analysis_results/SECURITY_REVIEW.md`에 덧붙임; 누락된 스킬 또는 확장은 기록된 `local reviewer not installed` 발견 사항 — 실행이 하니스에 쓸 수 있을 때 설치됨 — 절대 조용한 건너뜀이 아님; 완료된 패스의 `critical` 발견은 수정되거나 명시적으로 수락될 때까지 완료를 차단
- **선택적 CI 표면(Flow B):** upstream `setup` 서브스킬을 통한 `pr-review.yml`(`DailybotHQ/ai-diff-reviewer@v2`), 더해서 개발자 호출 컴패니언으로 `apply-review` — 명시적으로 제안되며 요청하지 않으면 설치하지 않고, 절대 기본값이 아니며, 절대 플랜 작업이 아님
- **차단 없음(호출만):** 시작할 수 있었지만 오류가 난 로컬 리뷰는 한 번 경고하고 기록한 뒤 계속; 그 작업을 실패시키지 않음
- **동일성(Flow B):** 공유 `prompt.md` + 확장으로 방법론/심각도 정렬; CI Iteration-Aware Review는 로컬 패스가 완전한 채로 남는 동안 2 라운드 이상을 줄일 수 있음
- **벤더 중립 가드레일:** 어떤 Deep Work Plan 흐름도 상업 서비스, CI 공급자 또는 시크릿을 요구하지 않음 — 이 리뷰어는 개발자 자신의 코딩 에이전트가 실행하는 MIT 라이선스의 태그 고정 스킬
- **적합성:** `verify`는 표준 2.3.0 이상을 선언한 저장소에 대해서는 누락된 로컬 리뷰어를 실패로 보고하고, 레거시 저장소에 대해서는 하니스 버전 발견 사항으로 보고

## 스킬

스킬은 이름으로 호출하는 재사용 가능한 절차. 스킬은 반복 가능한 워크플로(테스트 실행, lint 수정, 컴포넌트 생성)를 패키징합니다.

방법론은 소수의 핵심 서브스킬을 제공합니다. 그중 **author** 서브스킬은 저장소가 **자체 키트를 키우게** 합니다: `/skill-create` 및 `/agent-create`로 호출되며 기존 `.agents/` 레이아웃과 규약에 대해 추론한 뒤 맞는 새 스킬, 에이전트 또는 얇은 명령 위임자를 작성하고 카탈로그를 동기화합니다. 동일 서브스킬이 필수 Skills & Agents Discovery 작업을 실행합니다.

키트 항목: [Skill create](/kit/skill-create), [Agent create](/kit/agent-create).

## 에이전트

에이전트는 정의된 역할을 가진 전문 작업자(reviewer, executor, architect). `.agents/agents/`에 있으며 `.agents/docs/`에 카탈로그화됩니다.

## 유지보수 애드온

위의 **dependency-upgrade** 애드온이 주요 유지보수 애드온입니다. npm을 가정하지 않고 저장소의 실제 패키지 관리자에 대해 추론하며, semver로 업그레이드를 분류하고, 안전한 배치로 업그레이드하며, 각 배치 후 검증을 실행하고 실패한 배치를 되돌립니다.

## Design-system 애드온

출시 애드온의 [Design system](/kit/design-system)을 참조하세요. 저장소 수준 `DESIGN.md`는 기능별 기술 설계 문서와 다릅니다: DWP의 플랜 README, 작업 수락 기준 및 검증 게이트가 이미 기능별 설계를 다룹니다. design-system 애드온은 지속적이고 저장소 네이티브인 **인터페이스** 설계 컨텍스트를 채웁니다.

## 프리셋

프리셋은 DWP를 특정 기술 스택(Django, React, Go, Astro + Svelte 등)에 맞춥니다. [키트 카탈로그](/kit)를 탐색하세요.

## 어댑터

어댑터는 DWP 명령을 특정 에이전트의 명령 시스템(Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw 등)에 매핑합니다. 어댑터 항목은 각 에이전트 이름 아래 키트에 있습니다.

## 예제

예제는 DWP 실천을 보여줍니다: 전후 비교, 샘플 플랜, 사례 연구. [Examples](/examples) 및 [Dogfood this site](/kit/dogfood-this-site)를 참조하세요.

## 적합성 알림

저장소는 애드온 **제로**로 완전히 적합해야 합니다(MUST). 애드온은 계층적 옵트인 기능 — 전제 조건이 아닙니다. [Conformance](/spec/conformance)를 참조하세요.
