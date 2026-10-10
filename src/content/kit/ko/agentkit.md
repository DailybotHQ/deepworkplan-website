---
title: Agentkit
description: "모든 터미널 코딩 에이전트를 하나의 명령으로. 기본값은 완전 자율(옵트아웃 가능), git worktree에서 헤드리스 실행, 접두사 하나로 두 번째 계정까지."
kind: addon
lang: ko
order: 8
---

# Agentkit 애드온

터미널 코딩 에이전트는 저마다 세션을 이어 가는 고유한 플래그, 두 번째 계정을 분리하는 고유한 방식, 고유한 헤드리스 모드, 그리고 권한 프롬프트를 건너뛰는 고유한 스위치를 갖고 있습니다. [**coding-agents-kit**](https://github.com/DailybotHQ/coding-agents-kit)는 그 모두 위에 하나의 명령 체계를 얹습니다: `ak <kind> [@profile]`.

이 애드온은 이 키트를 **DWP v7**(팩 `v7.1.4`)에 **헤드리스** 위임 전송 방식으로 통합합니다. 선택형이며, 이것이 없으면 모든 작업은 이전과 똑같이 현재 세션에서 실행됩니다. 키트 자체는 Deep Work Plan 없이도 동작하는 MIT 제품입니다.

## 키트가 제공하는 것

- **모든 CLI에 하나의 문법.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline`, `ak grok`, 그리고 제공자 변형(GLM, Azure, xAI)이 같은 세션 플래그를 사용합니다. `-c`는 이어 가고, `-r <id>`는 재개합니다.
- **프로필.** `ak claude @work`는 두 번째 계정을 자체 홈에서 실행해 첫 번째 계정과 분리합니다.
- **헤드리스 실행.** `ak run <kind> -- "<prompt>"`는 하나의 프롬프트를 비대화형으로 실행하고 문서화된 종료 코드를 반환하며, 선택적으로 하나의 JSON 객체로 반환할 수 있습니다.
- **진단 도구.** `ak doctor --json`은 설치된 CLI, 프로필, 그리고 설정된 키의 이름을 보고합니다. 그 값은 결코 보고하지 않습니다.
- **검증된 설치.** `ak install <cli>`는 누락된 CLI를 벤더의 공식 채널에서 고정된 버전으로 설치하며, 고정된 sha256 또는 npm 레지스트리의 무결성 정보와 대조해 확인합니다.
- **익숙한 이름.** 켜기 전까지는 꺼져 있는 두 가지 별칭 프리셋: `classic`(`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`)과 `providers`(`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …). 각각은 하나의 `ak <kind>`입니다.

## 설치

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

요구 사항: macOS 또는 Linux의 `bash`, 그리고 `python3` 3.9 이상. 그 밖에는 필요 없습니다. Windows는 `install.ps1`을 사용합니다. `v0.3.0`에 고정하세요. `v0.2.0`과 `v0.2.1`은 지원되지 않습니다. 릴리스는 해당 `SHA256SUMS` 자산으로 검증하세요.

| 항목 | 값 |
|---|---|
| 제품 | `DailybotHQ/coding-agents-kit`, 태그 `v0.3.0`, 인터페이스 1 |
| 레지스트리 키 | `.dwp/config.json`의 `agentkit` |
| 전송 방식 | 헤드리스: 위임 대상마다 전용 git worktree에서 `ak run` 한 번 |
| 제공 | `subagents`, `cancel_children`, `model_routing` |
| 요구 | 계획 계약의 `agent_delegation` 부여 |

## 기본은 자율 실행, 옵트아웃이 항상 우선한다

`v0.2.0`부터 `ak <kind>`는 모든 에이전트를 **자율 모드**로 실행합니다. CLI 자체의 자율 플래그를 추가하며, 그 플래그는 키트의 `providers.toml`에만 보관됩니다. 자율 모드는 개발 컨테이너처럼 일회용이거나 샌드박스화된 환경을 위한 것입니다.

**옵트아웃이 항상 우선합니다**: 한 명령에 `--ask`를 붙이거나 환경 또는 키트의 env 파일에 `AGENTKIT_PERMISSIONS=ask`를 설정하면, 같은 명령에 `--auto`가 있더라도 플래그가 억제됩니다. 옵트아웃한 세션은 자신이 시작하는 에이전트에게도 옵트아웃을 전달합니다. 호스트에서는 옵트아웃을 설정하세요.

이 애드온은 자율 플래그를 직접 명시하지 않으며 `--auto`를 결코 전달하지 않습니다. 계획에 옵트아웃이 기록되어 있으면 `--ask`를 전달합니다. 호스트에서 `agent_delegation`을 부여하는 계획은 각자의 worktree에 갇힌 자율 위임 대상을 받아들이는 것이며, worktree는 샌드박스가 아닙니다.

## 계획에 무엇을 더하는가

계약이 `agent_delegation`을 부여한 v7 계획에서 `execute`는 `parallel_safe` 작업을 다른 CLI에 넘길 수 있습니다. 전용 git worktree를 만들고, 그 안에서 타임아웃을 걸어 `ak run`을 실행하고, 결과를 계획의 `analysis_results/delegations/`에 수집합니다. 그 결과는 계획 자체의 게이트 러너가 관찰할 때까지 `asserted` 증거입니다. 위임 대상을 취소하면 그 프로세스 트리 전체가 중지됩니다.

## Agentkit 또는 Herdr

| 상황 | 사용 |
|---|---|
| 출력이 선언된, 범위가 정해진 `parallel_safe` 작업 | Agentkit(헤드리스) |
| 작업에 상호작용이 필요하거나, 오래 실행되거나, 다른 머신에 있음 | [Herdr](/kit/herdr)(페인 안의 피어) |

둘은 함께 쓸 수 있습니다. herdr-peers는 `ak env <kind> @profile`이 출력하는 환경으로 페인 안에 피어를 실행할 수 있습니다.

## 참고

선택형이며 결코 필수가 아닙니다. API 키 값은 결코 출력되거나, 로그에 남거나, 설정 파일에 기록되지 않습니다. 문서화된 예외는 Cline으로, 명령줄에서 키를 받습니다. OpenCode, Pi, Cline, Grok의 결과 추출은 벤더 문서를 바탕으로 만들어졌으며 아직 실제 계정을 대상으로 실행해 보지 않았습니다. 알 수 없는 출력은 원시 텍스트로 대체됩니다.
