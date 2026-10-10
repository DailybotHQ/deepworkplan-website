---
title: 애드온
description: "DWP 애드온: 일곱 가지 옵트인 확장, 선택적 CI 표면을 갖는 필수 AI Diff Reviewer 로컬 리뷰, 애드온 계약 및 키트 개념."
order: 6
lang: ko
section: Addons
---

# 애드온

> **버전 범위:** 이 문서는 보존된 v5.0.0 기반 문서입니다. 현재 표준인 DWP 7.0.0은 [사양 색인](/spec)에 나열된 해당 `V6_*.md` 및 `V7_*.md` 확장도 요구합니다. 기존 v5 및 v6 계획은 기록된 규칙을 유지합니다.

**버전 2.1.0.** 애드온은 핵심 Deep Work Plan 방법론에 대한 확장입니다. 여덟 가지 중 일곱 가지는 선택적이며 **적합성에 절대 필요하지 않습니다** — 선택적 애드온이 없는 저장소도 완전히 AI-first이며 DWP 적합합니다. 각 선택적 애드온은 온보딩 중 제안되며 명시적으로 수락 또는 거부되고, — 수락 시 — 기존 설정을 덮어쓰지 않고 **조정**합니다. 한 가지 구성 요소가 명시된 예외입니다: 표준 2.3.0부터 **AI Diff Reviewer 로컬 리뷰**는 필수 기준선의 일부입니다 — 온보딩이 이를 설치하고 모든 Final Review가 이를 실행합니다 — 반면 그 CI 표면은 옵트인으로 남습니다.

## 애드온 계약

출시되는 모든 애드온은 네 가지 필수 구성 요소를 제공합니다:

| 구성 요소 | 목적 |
|-----------|------|
| **Spec** | 애드온이 제공하는 것과 «이 애드온에 적합»의 의미에 대한 RFC-2119 규범 설명 |
| **Reasoning templates** | 대상 저장소 스택에 대해 에이전트가 추론하여 채우는 가이드 — 복사-붙여넣기 아님 |
| **Onboarding hook** | 개발자가 수락할 때 `onboard` 흐름이 호출하는 `SKILL.md` 진입점 |
| **Validation step** | 애드온이 올바르게 적용되었는지 확인하는 체크리스트 |

발견: `onboard` 흐름은 `skills/deepworkplan/addons/`를 열거하고 핵심 스캐폴딩 후 **7b 단계**에서 각 애드온을 옵트인 단계로 제시합니다.

## 출시 애드온(여덟 가지)

현재 여덟 가지 애드온이 출시됩니다 — 일곱 가지 옵트인과 필수 로컬 리뷰입니다. 각각 **키트 카탈로그 페이지**(사용자 대상 세부)와 Deep Work Plan 스킬 내 **규범 스펙**이 있습니다. 그중 네 가지 — devcontainer, Herdr, DeepWorkPlan Vim, Agentkit — 는 자체 리포지토리와 릴리스 주기를 가진 제품에 태그로 고정된 얇은 통합 계층이며, 모든 제품은 Deep Work Plan 없이도 작동합니다. 수락된 애드온은 `.dwp/config.json` 애드온 레지스트리(DWP 7.0.0)에 기록되며, 이 레지스트리는 제안하거나 강화할 수만 있을 뿐 적합성이나 계획을 결코 막지 않습니다.

### Devcontainer(첫 번째 애드온)

[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)(`dck`, `v0.2.2`로 고정, 인터페이스 `2`)의 얇은 통합 계층: `dck init`이 저장소 자체의 컨테이너로 저장소에 렌더링하는 Dev Containers 템플릿과 `dck-dockerfile` 스킬.

- **키트 페이지:** [Devcontainer](/kit/devcontainer)
- **추가 내용:** digest로 고정된 런타임 공식 이미지 기반의 `docker/local/<service>/Dockerfile`(`python-3.13`, `node-24` 또는 `debian`, 공유 베이스 이미지 없음), `dck` 런처(`up`, `shell`, `rebuild`, `doctor`) 위에서 동작하는 `dev.sh`, 옵트인 레이어로서의 코딩 에이전트, 루프백 전용 포트, 컨테이너 안에 키 없이 호스트의 에이전트를 통해 SSH로 사용하는 git, 표준 레이아웃을 갖춘 컨테이너별 Herdr 머신
- **동작:** `dck doctor --json`(인터페이스 2)으로 감지; `dck init`은 diff가 승인된 후에만 기존 devcontainer를 조정하며 먼저 파일을 백업함 — 절대 덮어쓰지 않음
- **제안 시점:** Docker 또는 격리 개발 컨테이너가 유익한 서비스가 있는 대부분의 저장소

### Dailybot(두 번째 애드온)

에이전트 진행 가시성을 위한 개발자 **Dailybot 팀**에 대한 옵트인 연결.

- **키트 페이지:** [Dailybot](/kit/dailybot) — 전체 기능 참조
- **DWP 애드온이 연결하는 것:** dailybot `report` 서브스킬을 통한 네 가지 플랜 라이프사이클 보고(kickoff, significant task, blocked, completion); 선택적 결정론적 훅 강제(`dailybot hook`, CLI `>= 3.9.0`)
- **페어링 스킬:** [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill)(현재 **3.23.3**) 설치 시 **17가지 기능** — Slack/Teams/Discord/Google Chat 채팅, 체크인, 폼 작성, Ask AI, kudos, Plan 보드와 작업, 조직 라벨, 저장소별 API 키(`.dailybot/env.json`), 이메일 등. DWP 애드온은 **report**만 연결; 다른 기능은 Dailybot 스킬을 직접 호출
- **인증:** Dailybot 스킬에 완전 위임(`dailybot login` 또는 `DAILYBOT_API_KEY`); 이 애드온은 자격 증명을 저장하지 않음
- **벤더 중립 가드레일:** 핵심 DWP는 Dailybot 의존성 **제로**; 모든 사람에게 자동 설치하지 않음
- **제안 시점:** 개발자나 팀이 이미 Dailybot을 사용하거나 팀 보고를 명시적으로 요청

### Dependency upgrade(세 번째 애드온)

패키지 관리자 무관, 배치화, 검증, 되돌릴 수 있는 의존성 업그레이드.

- **키트 페이지:** [Dependency upgrade](/kit/dependency-upgrade)
- **추가 내용:** 저장소의 **실제** 관리자 감지(npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer…), semver 분류 배치로 업그레이드, 각 배치 후 저장소 검증 게이트 실행, 실패 배치 되돌리기, 자동 커밋 없이 요약
- **명령:** 수락 시에만 `.agents/commands/`에 `/lib-upgrade` 설치
- **제안 시점:** 선언된 의존성이 있는 모든 저장소에 제안; 불활성 `/lib-upgrade` 위임 명령은 명시적으로 거부하지 않는 한 온보딩 동의 아래 설치됨 — 설치 자체는 업그레이드를 실행하지 않음

### Design system(네 번째 애드온)

인터페이스 표면 범위의 `DESIGN.md`. 모든 코딩 에이전트가 일관된 UI, CLI 또는 대화 출력을 위해 읽음.

- **키트 페이지:** [Design system](/kit/design-system)
- **추가 내용:** `docs/DESIGN.md`(`AGENTS.md`에서 참조), 하나의 파일에 최대 세 **프로필** 적층: **visual-ui**(렌더링 UI 토큰 및 컴포넌트), **cli-output**(의미적 터미널 스타일, TTY/`NO_COLOR` 저하), **conversational**(목소리, 메시지 구조, 플랫폼별 렌더링 및 일반 텍스트 폴백)
- **프로필 강도:** 감지되면 제안은 필수가 되며 설치는 수락으로 제어됩니다(가이드 모드와 신뢰 모드 모두에서 동일) — visual-ui는 감지 시 **강력히 권장**; cli-output과 conversational은 감지 시 **권장, 항상 질문, 자동 적용 안 함**
- **제안 시점:** 사용자 대상 인터페이스 표면이 감지된 경우에만 — 순수 라이브러리, 헤드리스 서비스 또는 인프라 전용 저장소에는 해당 없음

### AI Diff Reviewer(다섯 번째 애드온 — 필수 로컬 리뷰, 선택적 CI 표면)

**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**(marketplace **"AI Diff Reviewer"**)는 필수 Final Review 보안 점검에 구조화된 로컬 리뷰를 부여하고, 선택적으로 CI에서 pull request를 게이트합니다. 이 애드온은 릴리스마다 자동으로 갱신되므로, 아래에 표시된 태그는 작성 시점의 것이며 실제 벤더링된 사본보다 뒤처질 수 있습니다 — 실제로 설치된 태그는 애드온 자체의 `SKILL.md`와 GitHub 릴리스가 기준입니다. 설치는 항상 공개된 태그에 고정되며, 움직이는 브랜치를 가리키지 않습니다. 표준 2.3.0부터 **로컬 리뷰는 기준선의 일부**입니다; 옵트인인 것은 CI 표면뿐입니다.

- **키트 페이지:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — 전체 기능 참조
- **온보딩 시 필수(7a 단계):** 온보딩 동의 아래 벤더 스킬의 태그 고정 설치(`npx --yes skills add https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.0 --skill ai-diff-reviewer -y`) 더하기 저장소 맞춤 `.review/extension.md`(`generate-extension` 경유); 표적 하니스 업그레이드는 둘 중 무엇이 누락되었는지 조정; 거부는 선언된 예외로 기록되며 설치될 때까지 `verify`가 보고
- **모든 Final Review에서 필수:** 보안 점검은 누적 변경 집합에 대해 upstream 부모 기본 플로우를 실행하고 그 출력을 플랜 로컬 `analysis_results/SECURITY_REVIEW.md`(플랜 자체 폴더 안에 있으며 저장소 루트가 아님)에 덧붙임; 누락된 스킬 또는 확장은 기록된 `local reviewer not installed` 발견 사항 — 절대 조용한 건너뜀이 아니며 절대 깜짝 부트스트랩이 아님: 설치는 온보딩 동의 또는 명시적 애드온 호출에 속함; 완료된 패스의 **검증된 `critical` 발견**은 수정되거나 명시적으로 수락될 때까지 완료를 차단함(v3, BC-07 — 검증되지 않은 크리티컬 주장은 주석 달린 경고로 표시되며, `incomplete`/`timeout` 검토는 깨끗한 패스가 아님, BC-04)
- **선택적 CI 표면(Flow B):** upstream `setup` 서브스킬을 통한 `pr-review.yml`(`DailybotHQ/ai-diff-reviewer@v3`), 더해서 개발자 호출 컴패니언으로 `apply-review`(읽기 전용)와 `address-review`(커밋·푸시를 수행하고 리뷰어를 재무장하는, v3.1.1의 신규) — 명시적으로 제안되며 요청하지 않으면 설치하지 않고, 절대 기본값이 아니며, 절대 플랜 작업이 아님
- **차단 없음(호출만):** 시작할 수 있었지만 오류가 난 로컬 리뷰는 한 번 경고하고 기록한 뒤 계속; 그 작업을 실패시키지 않음
- **동일성(Flow B):** 공유 `prompt.md` + 확장으로 방법론/심각도 정렬; CI Iteration-Aware Review는 로컬 패스가 완전한 채로 남는 동안 2 라운드 이상을 줄일 수 있음
- **벤더 중립 가드레일:** 어떤 Deep Work Plan 흐름도 상업 서비스, CI 공급자 또는 시크릿을 요구하지 않음 — 이 리뷰어는 개발자 자신의 코딩 에이전트가 실행하는 MIT 라이선스의 태그 고정 스킬
- **적합성:** `verify`는 표준 2.3.0 이상을 선언한 저장소에 대해서는 누락된 로컬 리뷰어를 실패로 보고하고, 레거시 저장소에 대해서는 하니스 버전 발견 사항으로 보고

### Herdr(여섯 번째 애드온)

[herdr-peers](https://github.com/DailybotHQ/herdr-peers)(고정 버전 `v0.1.0`, 프로토콜 `1`)의 얇은 통합 계층으로, v7 계획의 **대화형** 위임 전송 수단입니다.

- **키트 페이지:** [Herdr](/kit/herdr)
- **추가하는 것:** 계획이 경계가 정해진 작업을 같은 머신 또는 Herdr가 SSH로 도달하는 머신의 다른 [Herdr](https://herdr.dev) 페인에 있는 코딩 에이전트에게 넘기고, 승인된 단일 응답을 저널에 기록할 수 있음
- **동작:** 피어 프로토콜(스탬프, 승인, 응답, 루프 가드, 깊이 및 팬아웃 제한)은 팩이 아닌 herdr-peers에 존재함; 모든 사용에는 contract 권한 `agent_delegation`이 필요하며, 위임받은 에이전트의 결과는 계획 자체의 러너가 관찰할 때까지 주장된 상태로 남음
- **제안 시점:** 7b 단계에서 명시적 옵트인; `herdr`와 `herdr-peers`의 읽기 전용 감지; 이 전송 수단은 Herdr 세션 안에서만 사용 가능

### DeepWorkPlan Vim(일곱 번째 애드온)

[DeepWorkPlan Vim](https://github.com/DailybotHQ/deepworkplan-vim)(고정 버전 `v0.5.1`, 인터페이스 `1`)의 얇은 통합 계층으로, Deep Work Plan을 위한 터미널 편집기입니다(Neovim 0.12+).

- **키트 페이지:** [DeepWorkPlan Vim](/kit/vim)
- **추가하는 것:** 에이전트와 사람을 위한 선택적인 머신 수준 편집기 표면 — 생성된 명령 색인, 읽기 전용 계획 브라우저, Markdown 뷰어; 모든 주장은 제품의 고정된 기계 판독 가능 표면에서 읽음
- **동작:** 기존 Neovim 구성은 명시적 동의 없이 결코 덮어쓰지 않음; 감지는 읽기 전용
- **제안 시점:** 7b 단계에서 명시적 옵트인; Neovim 0.12+가 없으면 정보 제공에 그침

### Agentkit(여덟 번째 애드온)

[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)(`ak`, 고정 버전 `v0.3.0`, 인터페이스 `1`)의 얇은 통합 계층으로, v7 계획의 **헤드리스** 위임 전송 수단입니다.

- **키트 페이지:** [Agentkit](/kit/agentkit)
- **추가하는 것:** 터미널 코딩 에이전트 위에 놓인 하나의 `ak` 명령 표면으로, 경계가 정해진 계획 작업을 헤드리스로 실행하는 데 사용됨; `subagents`, `cancel_children`, `model_routing` 능력은 런타임에, 활성화되고 감지되었으며 호환되는 인터페이스일 때만 제공함
- **동작:** 모든 사용에는 contract 권한 `agent_delegation`이 필요함; kit은 기본적으로 에이전트를 자율 모드로 실행하며 그 옵트아웃(`--ask` 또는 `AGENTKIT_PERMISSIONS=ask`)이 항상 우선함 — 애드온은 자율 플래그를 지정하지 않고, 계획이 옵트아웃을 기록한 경우와 읽기 전용 위임 대상에는 항상 `--ask`를 전달함; 코딩 에이전트 CLI를 스스로 설치하지 않으며 제공자 키 값을 결코 읽지 않음
- **제안 시점:** 7b 단계에서 명시적 옵트인; `ak doctor --json`을 통한 읽기 전용 감지

## 스킬

스킬은 이름으로 호출하는 재사용 가능한 절차. 스킬은 반복 가능한 워크플로(테스트 실행, lint 수정, 컴포넌트 생성)를 패키징합니다.

방법론은 소수의 핵심 서브스킬을 제공합니다. 그중 **author** 서브스킬은 저장소가 **자체 키트를 키우게** 합니다: `/skill-create` 및 `/agent-create`로 호출되며 기존 `.agents/` 레이아웃과 규약에 대해 추론한 뒤 맞는 새 스킬, 에이전트 또는 얇은 명령 위임자를 작성하고 카탈로그를 동기화합니다. 동일 서브스킬이 Final Review의 스킬 조정 단계를 뒷받침합니다.

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
