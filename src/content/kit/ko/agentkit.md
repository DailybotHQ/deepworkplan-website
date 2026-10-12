---
title: Agentkit
description: "모든 터미널 코딩 에이전트를 하나의 명령으로. 프로필마다 계정, 여유가 가장 많은 계정을 고르는 ak pick, 옵트아웃 가능한 자율, 헤드리스 실행."
kind: addon
lang: ko
order: 8
---

# Agentkit 애드온

터미널 코딩 에이전트는 저마다 세션을 이어 가는 고유한 플래그, 두 번째 계정을 분리하는 고유한 방식, 고유한 헤드리스 모드, 그리고 권한 프롬프트를 건너뛰는 고유한 스위치를 갖고 있습니다. [**coding-agents-kit**](https://github.com/DailybotHQ/coding-agents-kit)는 그 모두 위에 하나의 명령 체계를 얹습니다: `ak <kind> [@profile]`.

이 애드온은 이 키트를 **DWP v7**(팩 `v7.7.0`)에 **헤드리스** 위임 전송 방식으로 통합합니다. 선택형이며, 이것이 없으면 모든 작업은 이전과 똑같이 현재 세션에서 실행됩니다. 키트 자체는 Deep Work Plan 없이도 동작하는 MIT 제품입니다.

## 키트가 제공하는 것

- **모든 CLI에 하나의 문법.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline`, `ak grok`, 그리고 제공자 변형(GLM, Azure, xAI)이 같은 세션 플래그를 사용합니다. `-c`는 이어 가고, `-r <id>`는 재개합니다.
- **프로필.** `ak claude @work`는 두 번째 계정을 자체 홈에서 실행해 첫 번째 계정과 분리합니다.
- **헤드리스 실행.** `ak run <kind> -- "<prompt>"`는 하나의 프롬프트를 비대화형으로 실행하고 문서화된 종료 코드를 반환하며, 선택적으로 하나의 JSON 객체로 반환할 수 있습니다.
- **진단 도구.** `ak doctor --json`은 설치된 CLI, 프로필, 그리고 설정된 키의 이름을 보고합니다. 그 값은 결코 보고하지 않습니다.
- **검증된 설치.** `ak install <cli>`는 누락된 CLI를 벤더의 공식 채널에서 고정된 버전으로 설치하며, 고정된 sha256 또는 npm 레지스트리의 무결성 정보와 대조해 확인합니다.
- **익숙한 이름.** 켜기 전까지는 꺼져 있는 두 가지 별칭 프리셋: `classic`(`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`)과 `providers`(`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …). 각각은 하나의 `ak <kind>`입니다.

## 계정, 할당량, 계정 선택

키트는 여러분이 가진 모든 로그인이나 키를 하나의 **계정**으로 취급합니다. CLI 하나 × 프로필 하나입니다. `@default`(또는 `@1`)는 CLI 자체의 home이고, `@2`, `@work`, `@client-x`는 별도의 로그인으로, 각각 프로필 루트 아래의 자체 디렉터리에 있으며 나란히 실행됩니다. `ak profiles`는 이들을 로그인 상태 및 키 이름과 함께 나열하고, `ak profiles --json`은 도구에 같은 목록을 제공합니다(스키마 `profiles-v1`). `v0.5.1`부터는 Claude Code 토큰이 실제로 어디에 있는지 — `file`, `keychain`(macOS), `none`, `unknown` — 를 비밀 값을 읽지 않고 존재 여부만으로 보고하며, 컨테이너 안이든 Linux 호스트든 Linux의 Cursor 로그인도 인식합니다. `v0.5.2`부터는 `AGENTKIT_DEFAULT_PROFILE_<CLI>`가 인자 없는 `ak <cli>`가 사용할 계정을 지정하며(위치 인자 `@profile`이 여전히 우선합니다), 개발 컨테이너는 이 방식으로 공유하는 호스트 계정을 고릅니다. `v0.5.3`부터는 다른 머신과 공유하는 Codex home에 이 머신에 없는 백그라운드 데몬이 기록되어 있으면 `ak codex`가 `--no-daemon`을 추가합니다.

`ak usage`는 키트가 볼 수 있는 모든 계정의 할당량과 사용량을 계정과 프로필마다 한 줄씩 보여 줍니다. Claude Code 구독(5시간, 주간, 모델별 창), ChatGPT로 로그인한 Codex, Z.AI 코딩 플랜 키는 실시간으로 조회하며, Cursor, Grok, xAI, Azure OpenAI는 이유와 함께 `n/d`로 표시합니다. 읽기 전용이므로 로그인을 갱신하지 않고, 토큰을 출력하지 않으며, 프로필 안에 아무것도 쓰지 않습니다. `--json`은 도구에 같은 목록을 제공합니다(스키마 `usage-v1`). 사용량 엔드포인트는 공급업체 내부용이며 비공식입니다.

`ak pick <kind>`는 같은 행을 읽고 여유가 가장 많은 계정을 알려 줍니다. `--count N`은 좋은 순서로 최대 N개의 계정을 반환하고, `--exclude @<profile>`은 바쁜 계정을 제외하며, `--model`은 한 모델의 주간 창으로 계산하고, `--need 5h:40`은 그만큼의 여유가 없으면 선택을 거부합니다. `--json`은 스키마 `pick-v1`을 제공합니다.

```bash
ak usage                   # 모든 계정과 프로필의 할당량
ak pick claude --count 3   # 여유가 가장 많은 Claude 계정 세 개
ak claude @work --trust-cwd  # 두 번째 계정, 폴더 미리 신뢰
ak profiles --json         # 도구용 profiles-v1
ak setup verify            # 순서대로 진행되는 점검, 각각 복구 명령 포함
```

`--trust-cwd`(또는 `AGENTKIT_TRUST_CWD=1`)는 에이전트가 시작하는 폴더를 미리 신뢰하므로, Claude Code와 Codex가 폴더 신뢰 화면 없이 열립니다. `ak setup probe | verify | docker`는 `agentkit-setup` 스킬이 사용하는 읽기 전용 도우미로, 머신을 점검하고 설치를 검증하며 태그로 고정되고 검증된 컨테이너 레시피를 만들어 줍니다.

## 여러 에이전트, 여러 계정

`agentkit-orchestrate` 스킬(`ak --skill orchestrate`)은 에이전트에게 작업을 여러 에이전트, 계정, 벤더에 나누는 방법을 가르칩니다. 배치 전에 `ak usage`를 한 번 실행하고, `ak pick --count N`으로 계정을 고르고, 계정마다 하나의 위임 대상을 두고, 모든 결과에 리포지토리 자체의 게이트를 실행하며, 한 계정이 한도에 걸리면 다음 계정으로 넘어갑니다. 키트는 관찰하고, 계산하고, 실행할 뿐 스케줄링하지 않습니다. 결정은 리드(여러분, 또는 여러분이 요청한 에이전트)가 내리며, 자신의 계정만 사용하고 각 벤더의 약관을 지킵니다.

길고 상호작용이 필요한 레인은 각각 [Herdr](/kit/herdr) 페인에서 자신의 계정으로 실행됩니다. 방법론 장 [여러 에이전트 운영하기](/methodology/06-orchestration)는 전체 모델을 설명합니다. 리드와 레인, 여유량으로 고른 계정, herdr-peers 조율, 그리고 리포지토리마다 하나의 브랜치와 하나의 릴리스입니다. [스웜 자율](/methodology/07-swarm-autonomy)은 여기에 용량 확인, 핸드오프, 리드 승계를 더합니다.

## 용량과 리스

`v0.6.0`부터 에이전트는 모든 작업 경계에서 자신의 계정에 여유가 얼마나 남았는지 적은 비용으로 물을 수 있습니다. 이 신호 덕분에 스웜은 계정이 바닥나기 전에 작업을 넘길 수 있습니다([스웜 자율](/methodology/07-swarm-autonomy)).

- **`ak capacity --self --json`**(스키마 `capacity-v1`)은 실행 중인 계정의 `headroom_pct`, `binding_window`, `resets_at`, 그리고 `verdict`를 제공합니다. `verdict`는 `ok`, `low`(25 % 이하), `critical`(10 % 이하 또는 속도 제한), `unknown`(할당량 출처 없음: Cursor, Grok, Antigravity) 중 하나입니다. `ak pick`과 같은 계산을 쓰므로 둘의 판단은 결코 어긋나지 않으며, 300초 동안 유지되는 사용량 캐시(`--max-age`)를 읽으므로 작업 경계마다 확인해도 비용이 적습니다. `--self`는 `ak`가 시작한 계정을 찾아내며, `ak` 실행 밖에서는 종료 코드 3으로 끝나고 결코 추측하지 않습니다. `ak usage`는 여전히 실시간으로 읽고 캐시를 갱신합니다.
- **임계값과 훈련.** `AGENTKIT_CAPACITY_LOW`와 `AGENTKIT_CAPACITY_CRITICAL`(또는 `--low`와 `--critical`)로 임계값을 옮깁니다. `AGENTKIT_CAPACITY_CAP=@<profile>=<pct>`는 측정값을 낮추기만 할 수 있습니다. 훈련에서 계정을 여유가 없는 것처럼 보이게 하는 방법이며, 계정을 더 여유 있게 보이게 하는 일은 결코 없습니다.
- `ak lease <kind> @<profile> --owner <addr>`는 하나의 레인을 위해 계정을 잡아 둡니다. `ak lease release …`는 후임이 핸드오프를 수락한 뒤 계정을 풀어 주고, `ak lease ls`는 리스를 나열합니다(스키마 `leases-v1`). Codex 프로필은 리스를 하나만 받습니다(인증 파일마다 작성자 하나). 리스를 해제하는 것은 소유자뿐입니다. 리스는 만료되며 숫자, 프로필 이름, 페인 주소만 담는 권고용 기록일 뿐, 결코 자격 증명이 아닙니다.
- `ak pick <kind> --owner <lead>`는 소유자 자신의 리스를 포함해 모든 활성 리스를 셉니다. 후보를 `headroom / (1 + leases)`로 순위를 매기며, 리스된 Codex 계정은 그 보유자에게도 결코 제시하지 않습니다. `--reuse @<profile>`는 소유자 자신의 리스 하나를 넘겨줍니다. 예를 들어 레인의 후임에게 넘길 때 씁니다. `--owner`가 없으면 순위는 바뀌지 않습니다.

```bash
ak capacity --self --json                        # 이 에이전트 자신의 여유와 판정
ak lease claude @work --owner local:w2:p1        # 레인을 위해 계정 잡아 두기
ak pick codex --owner local:w1:p1 --count 2      # 다른 소유자에게 리스된 계정 건너뛰기
```

작업은 계획에 선언한 계정들 사이에서만, 각 벤더의 약관 안에서 이동합니다. 어떤 에이전트도 계정을 만들거나, 로그인을 갱신하거나, Codex 리셋을 소모하지 않습니다. Deep Work Plan 팩은 자체 헬퍼로 판정을 읽고 이를 계속, 준비, 핸드오프 중 하나로 바꿉니다. 키트가 없거나 오래된 키트라면 용량은 unknown으로 보고되며, 결코 ok로 보고되지 않습니다.

## 설치

```bash
git clone --branch v0.6.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

요구 사항: macOS 또는 Linux의 `bash`, 그리고 `python3` 3.9 이상. 그 밖에는 필요 없습니다. Windows는 `install.ps1`을 사용합니다. `v0.6.1`에 고정하세요. `v0.2.0`과 `v0.2.1`은 지원되지 않습니다. 릴리스는 해당 `SHA256SUMS` 자산으로 검증하세요.

| 항목 | 값 |
|---|---|
| 제품 | `DailybotHQ/coding-agents-kit`, 태그 `v0.6.1`, 인터페이스 1 |
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

둘은 함께 쓸 수 있습니다. herdr-peers는 `ak env <kind> @profile`이 출력하는 환경으로 페인 안에 피어를 실행할 수 있습니다. 여러 레인을 한꺼번에 운영하려면 [여러 에이전트 운영하기](/methodology/06-orchestration)를 참고하십시오.

## 참고

선택형이며 결코 필수가 아닙니다. API 키 값은 결코 출력되거나, 로그에 남거나, 설정 파일에 기록되지 않습니다. 문서화된 예외는 Cline으로, 명령줄에서 키를 받습니다. OpenCode, Pi, Cline, Grok의 결과 추출은 벤더 문서를 바탕으로 만들어졌으며 아직 실제 계정을 대상으로 실행해 보지 않았습니다. 알 수 없는 출력은 원시 텍스트로 대체됩니다.
