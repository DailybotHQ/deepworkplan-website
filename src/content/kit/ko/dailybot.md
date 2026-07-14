---
title: Dailybot
description: "옵트인 DWP 애드온: 플랜 라이프사이클을 Dailybot 팀에 연결하고, 선택적 훅 강제 및 전체 Dailybot 에이전트 스킬 3.10.3(채팅, 체크인, 폼, Ask AI 등)을 제공합니다."
kind: addon
lang: ko
order: 2
---

# Dailybot 애드온

Deep Work Plan 실행을 **Dailybot 팀**에 연결하여 사람들이 에이전트가 무엇을 구축하는지 파악할 수 있게 합니다 — 킥오프, 플랜 중간 진행, 차단, 완료 — 미팅이나 두 번째 툴체인을 추가하지 않고. 이미 [Dailybot](https://www.dailybot.com)을 사용하는 팀을 위한 **옵트인** 애드온입니다.

핵심 Deep Work Plan 방법론은 Dailybot에 대한 의존성이 **제로**입니다. 애드온이 없는 저장소도 완전히 적합합니다. 개발자나 팀이 이미 Dailybot을 사용할 때만 이 애드온을 제공하고, 모든 사람에게 자동 설치하지 마세요.

## 사용 시점

| 신호 | 조치 |
|------|------|
| 팀이 이미 Dailybot 사용(Slack, Teams, Discord, Google Chat 또는 대시보드) | 온보딩 중 **권장** |
| 개발자가 에이전트 진행 가시성 또는 스탠드업 형식 업데이트 요청 | 애드온 **제안** |
| Dailybot 계정이 없는 그린필드 저장소 | **건너뛰기** — 벤더 중립 기준선으로 충분 |
| 진행 상황이 저장소 밖으로 나가면 안 되는 NDA 하의 클라이언트 작업 | **건너뛰기**, 또는 `.dailybot/disabled`를 커밋하여 로컬 킬 스위치로 사용 |

## 이 애드온이 연결하는 것(의도적으로 좁은 설계)

DWP Dailybot 애드온은 Dailybot을 **재발명하지 않습니다**. 플랜 실행을 dailybot **`report`** 서브스킬에 연결하고 선택적으로 harness 훅을 커밋합니다. 나머지 — 설치, 동의, 인증, 작성 스타일 — 는 모두 공식 [Dailybot 에이전트 스킬](https://github.com/DailybotHQ/agent-skill)(현재 **3.10.3**)에 **위임**됩니다.

### 네 가지 라이프사이클 이벤트

DWP `create` / `execute` 중 애드온은 **네 가지 최선 노력 에이전트 업데이트**를 연결합니다. 각 이벤트는 조건부(Dailybot 존재 및 인증됨), 비차단이며 `.dailybot/disabled`를 존중합니다.

| 이벤트 | 트리거 | 레벨 | 요구사항 |
|--------|--------|------|----------|
| **Kickoff** | 플랜 구체화 및 승인, 또는 첫 `execute` 턴 | regular | SHOULD |
| **Significant task** | 기능, 버그 수정 또는 주요 리팩터 완료 — 설정 잡무 아님 | regular | MAY |
| **Blocked** | 플랜 중단; `state.json.blocked` 채워짐(`reason`, `needs`) | regular + blockers | SHOULD |
| **Completion** | 모든 작업 완료; 플랜 종료 | **milestone** | SHOULD |

플랜의 상태 계층(`state.json`)이 있을 때 페이로드는 여기서 파생: `completed`는 성과(작업 번호 아님), `in_progress`는 현재 작업에서, `blockers`는 `state.json.blocked`에서. 메시지는 **무엇을 구축했고 왜**를 설명 — 파일 경로, git 통계, 브랜치 이름, 플랜 ID는 절대 포함하지 않음.

### 선택적 훅 강제

`dailybot-cli >= 3.7.0`에서 애드온은 저장소 수준 harness 훅(`dailybot hook session-start | activity | post-commit | stop | dismiss`)을 **커밋할 수 있음**. 로컬 저장소별 원장으로 지원. 라이프사이클 이벤트를 놓쳤을 때 harness가 턴 종료 시 에이전트에게 알림 — 프롬프트 지시가 약해지는 긴 무인 세션에 중요.

성공한 라이프사이클 보고는 훅 원장을 **재설정**하므로 두 계층이 이중 보고하지 않음. 훅 명령은 로컬 상태만 읽고 항상 `0`으로 종료.

### 저장소 ID 및 보고 정책

선택적으로 `.dailybot/profile.json`(또는 템플릿으로 `.dailybot_example/profile.json`)을 커밋하여 모든 기여자와 에이전트가 동일한 방식으로 보고에 서명. 해당 파일에 자격 증명을 **절대** 넣지 않음 — `key` 필드는 하드 오류.

같은 파일에 훅이 따르는 보고 정책을 담을 수 있음:

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"`는 연구 또는 문서 중심 저장소에 특히 유용: 커밋이 아닌 작업(분석, 설계 문서, 플랜)이 더 빨리 넛지됨.

## 설치(모두 옵트인)

애드온은 설치 경로를 **제안**합니다. Dailybot 스킬이 동의와 검증을 소유합니다.

| 구성 요소 | 명령 / 경로 |
|-----------|-------------|
| **Dailybot 에이전트 스킬**(권장) | `npx skills add DailybotHQ/agent-skill` |
| **기존 스킬 업데이트** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git 클론** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI**(최소 `>= 3.7.0`) | 첫 사용 시 스킬이 검증된 `shared/auth.md`를 통해 설치; 또는 `pip install 'dailybot-cli>=3.7.0'`, Homebrew, 또는 [cli.dailybot.com](https://cli.dailybot.com)의 체크섬 검증 설치 프로그램 |

버전 확인: `dailybot --version` 및 `dailybot version --check`. 업그레이드: `dailybot upgrade`.

## 인증 — 위임

이 애드온은 이메일, OTP 또는 API 키를 **절대** 요청하지 않고 자격 증명을 **절대** 저장하지 않습니다. 인증은 Dailybot 스킬의 [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md)가 소유:

- `dailybot login`(이메일 OTP), 또는
- `DAILYBOT_API_KEY` / `dailybot config key=...`, 또는
- 옵트인, gitignore된 `.dailybot/env.json` 저장소별 키 파일(`dailybot env add/use`, CLI `>= 3.7.0`) — 개발자가 서로 다른 저장소에서 서로 다른 조직에 로그인할 수 있게 함.

인증 해석은 **Bearer 우선**입니다: 세션 토큰이 우선하며, `401`/`403` 시 투명한 Bearer→API 키 재시도로 오래된 토큰이 유효한 키를 절대 차단하지 않습니다. 인증이 거부되거나 사용 불가하면 보고는 조용히 건너뜀 — 작업은 계속됨.

## 페어링된 Dailybot 스킬 — 14가지 기능(3.10.3)

Dailybot 에이전트 스킬 설치는 DWP 애드온이 연결하는 것 이상을 제공합니다. 공식 스킬 팩(스킬 **3.10.3**, CLI 기준 **>= 3.7.0**, 현재 게시 **3.7.3**)은 **14개의 조율된 서브스킬**을 노출:

| 서브스킬 | 기능 |
|----------|------|
| **Progress reports** | Dailybot 대시보드로 스탠드업 형식 에이전트 업데이트 |
| **Ask the AI** | Dailybot AI 어시스턴트에 원샷 헤드리스 쿼리 |
| **Message polling** | 세션 시작 또는 유휴 시 팀 지시 확인 |
| **Email** | 필수 전송 전 안전 검사가 있는 이메일 전송 |
| **Chat** | Slack, Microsoft Teams, Discord 또는 Google Chat에서 전송/편집 — 채널, DM, 팀, 보고 형식 스레드, 사용자로 전송(Slack, 관리자) |
| **Conversations** | 봇과 지정 팀원과의 Slack 그룹 DM 열기 또는 재사용; 동일 호출에서 보고 게시 |
| **Health and status** | 장시간 세션용 에이전트 온라인/오프라인 알림 |
| **Check-ins** | 스탠드업 완료; 체크인 **작성**(일정, 참가자, 질문, 알림, AI 설정) |
| **Kudos** | 팀원 또는 전체 팀 인정; 인정 피드, 조직 피드, 명예의 전당 탐색 |
| **Teams** | 팀 목록, 멤버 조회, 이름을 UUID로 해석; `me`, `org`, 사용자 프로필 |
| **Forms** | 폼 목록(이제 기본적으로 **조직 범위**, `--mine` 및 `--owner`로 범위 좁히기), 제출, 업데이트, 전환; 폼 **작성**(워크플로 상태, 권한, ChatOps); 페이지네이션, 검색, 날짜 필터 |
| **Workflows** | 조직 워크플로 읽기(`workflow list` / `workflow get`; 읽기 전용) |
| **Report channels** | 폼 또는 체크인용 채널 UUID 발견 |
| **Per-repo API keys** | `.dailybot/env.json` 관리 — 환경별 API 키 + URL의 옵트인, gitignore된 파일(`dailybot env add / use / show / list / remove / off / on`, CLI `>= 3.7.0`) |

**DWP 애드온은 `report`만 플랜 실행에 연결합니다.** 나머지는 Dailybot 스킬을 직접 호출 — 예: `#releases`에 배포 요약 게시, 스탠드업 완료, Dailybot AI에 체크인 트렌드 요약 요청.

공개 참조: [dailybot.com/skill.md](https://www.dailybot.com/skill.md). 소스: [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill). 신뢰 모델: 스킬 팩의 [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md).

## 동작 — 위임, 절대 차단하지 않음

| 규칙 | 세부 |
|------|------|
| **위임** | Dailybot 스킬이 설치, 동의, 인증, 훅 템플릿, 작성 스타일 소유 |
| **절대 차단하지 않음** | CLI 없음, 인증 실패, 네트워크 오류 → 한 번 경고, 주요 작업 계속 |
| **재시도 없음** | 진단 루프에 들어가지 않음; 보고는 최선 노력 |
| **조정** | 기존 스킬, CLI, 프로필, 훅 또는 보고 연결 보존 — 격차만 채움 |
| **벤더 중립** | DWP는 Dailybot을 요구하지 않음; 이 애드온은 추가 팀 가시성 |

## 온보딩 흐름

DWP `onboard` **7b 단계**에서 핵심 AI-first 스캐폴딩 후 네 가지 옵트인 애드온을 제안. 개발자가 Dailybot을 수락하면:

1. 기존 설정 감지(스킬, CLI, `.dailybot/profile.json`, 훅, 보고 단계).
2. Dailybot 동의 흐름을 통해 스킬/CLI 설치 제안.
3. 인증을 `shared/auth.md`에 위임.
4. 네 가지 라이프사이클 이벤트를 `AGENTS.md` / `docs/AI_AGENT_COLLAB.md`에 연결.
5. 선택적으로 훅 강제 및 `.dailybot/profile.json` 제안.
6. 검증 실행(스킬의 `addons/dailybot/SPEC.md`에서 SPEC §8).

Deep Work Plan 스킬의 규범 계약: `addons/dailybot/SPEC.md`(버전 **2.3.0**).

## 관련 키트 항목

- [Devcontainer](/kit/devcontainer) — Dailybot CLI 지속성이 있는 재현 가능한 개발 환경(첫 번째 애드온)
- [Dependency upgrade](/kit/dependency-upgrade) — 배치화·검증된 의존성 업그레이드(세 번째 애드온)
- [Design system](/kit/design-system) — 인터페이스 표면용 에이전트 대상 `DESIGN.md`(네 번째 애드온)
- [Deep Work Plan onboard](/kit/deepworkplan-onboard) — 애드온을 제안하는 온보딩 서브스킬
