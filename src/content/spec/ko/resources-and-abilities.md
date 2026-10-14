---
title: 리소스와 능력
description: "작업별 컨텍스트 매니페스트, 리소스 한도, 호스트 능력, .dwp/config.json 애드온 레지스트리, 활성화된 애드온이 더하는 능력."
order: 10
lang: ko
section: Record layer
---

# 리소스와 능력

> **버전 범위:** 이 페이지는 릴리스 `v7.8.1` 기준 현재 표준인 DWP 7.0.0의 네 가지 규범 문서를 다시 서술합니다: [`V6_CONTEXT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_CONTEXT.md), [`V6_RESOURCES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_RESOURCES.md), [`CONFIG.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/CONFIG.md), [`V7_ABILITIES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V7_ABILITIES.md). 이 페이지와 해당 파일이 다를 경우 파일이 우선합니다.

**상태: 안정(Stable)(컨텍스트와 리소스는 6.0.0부터, 구성과 능력은 7.0.0부터).** 이 규칙은 v6 계열 계획([기록 레이어](/spec/record-layer))에 적용되며, v5 표준은 변경되지 않습니다. 키워드 MUST, MUST NOT, SHOULD, SHOULD NOT, MAY는 RFC 2119에 기술된 대로 해석됩니다.

## 작업별 컨텍스트 매니페스트

각 작업 전에 에이전트는 계약과 전체 저널로부터 **컨텍스트 매니페스트**를 도출합니다(`context_manifest.py`). 이것은 파생 뷰이며 상태로 저장되는 일은 결코 없습니다: 같은 기록에서 두 번 도출하면 동일한 바이트가 나와야(MUST) 하며, 매니페스트는 계획과 그 리포지토리 밖을 읽어서는 안 됩니다(MUST NOT). 그 형태는 [`context-manifest/v6`](https://deepworkplan.com/schema/context-manifest/v6.json)으로 게시됩니다.

| 섹션 | 도출 근거 |
| --- | --- |
| `identity` | 계획 이름, 라이브 계약 id와 개정 |
| `authorization` | 동의 체크포인트를 포함한 승인 이벤트, 원문 그대로 |
| `repository_rules` | 계약 범위와 현재 평가 상태를 갖춘 불변 조건 |
| `acceptance` | 종결 상태를 갖춘 작업의 기준 |
| `touched_surface` | 현재 콘텐츠 해시를 갖춘 선언된 파일. 없는 파일은 없음으로 표시 |
| `evidence` | 디스크에서 해석되는 창 내 증거 포인터 |
| `dead_ends` | 실패한 게이트, 거부, 거부된 적응, 판별력 없는 대조 |
| `freshness` | 매니페스트가 요약하는 입력의 지문 |
| `next_action` | 구체적인 명령을 갖춘 정확히 하나의 다음 단계 |

`authorization`, `repository_rules`, `acceptance`는 **필수**입니다: 컨텍스트 가지치기로 인수나 승인의 경계를 숨기는 일은 결코 있을 수 없습니다. 다음 행동 사다리는 순서가 정해져 있으며(승인, 시작, 권한, 대조, 증거, 완료), 평범한 통과 게이트를 대조 기준을 종결하는 것으로 제시하는 일은 결코 없습니다.

**막다른 길은 보존됩니다.** 항목은 입증된 기록 사실(같은 지문이 나중에 통과함, 더 새로운 중복 거부가 이를 대체함, 또는 계약 개정으로 기한이 지남)이 있을 때만 다이제스트에서 빠집니다. 단순한 표면 변경으로 항목을 제거해서는 안 됩니다(MUST NOT). **신선도는 검사됩니다:** 기록된 입력 지문이 더 이상 일치하지 않는 요약은 오래된 것이며, 지문이 없는 요약은 구조상 오래된 것입니다. **이력은 트리거가 있을 때만 로드됩니다** — 기록된 인계나 작업에 영향을 주는 수정이 있을 때뿐이며, 그 외에는 매니페스트만이 작업의 컨텍스트입니다.

## 네 가지 양의 회계

지시문 부하와 비용은 네 가지 별개의 양으로 보고됩니다: 정적 **지시문 바이트**, **공급자 토큰**(호스트 미터가 기록한 경우에만), **금전 비용**(기록된 실제 요율 샘플로부터만), **경과 시간**(이벤트 타임스탬프로부터). 없는 양은 이유와 함께 없음으로 보고되며 결코 추정되지 않고, 바이트가 토큰이나 금액으로 환산되는 일은 결코 없습니다.

## 호스트 능력

런타임 호스트는 닫힌 집합에서 자신의 **능력**을 명시합니다: `stop_agent`, `meter_spend`, `meter_tokens`, `meter_wall_clock`, `cancel_children`, `model_routing`, `subagents`, `telemetry`. 알 수 없는 능력은 거부되어야(MUST) 하며, 명시되지 않은 능력은 `false`입니다. **최소 호스트** — 모델 전환 없음, 서브에이전트 없음, 텔레메트리 없음, 중지 없음 — 는 지원되는 자세이며 결코 오류가 아닙니다. 없는 능력이 필요한 모든 한도는 해당 능력의 이름을 명시한 채 권고 수준으로 낮아집니다.

능력은 권한 부여가 아닙니다. 계약 안의 권한 부여(grant)가 권한이며, 능력은 환경이 실제로 할 수 있는 것입니다. 능력이 필요한 모든 자세는 여전히 그에 해당하는 권한 부여도 필요합니다.

## 리소스 한도

계약은 리소스 한도(envelope)에 한도를 선언할 수(MAY) 있습니다. 한도는 실제 계측 소스를 명시할 때만 **강제**되며, 그렇지 않으면 **권고**입니다. 호스트 간 강제 수준이 같다고 주장하는 일은 결코 없습니다.

- **카운터 소스.** 저널에서 관찰 가능한 카운터(경과 시간 범위, 게이트 재시도, 디스패치 호출)는 계획 자체의 기록으로부터 계산됩니다. 호스트 전용 카운터(지출, 공급자 토큰)는 해당 미터 능력과 호스트 어댑터의 observed 샘플이 필요합니다. 없는 카운터는 무료 사용량이 아닙니다.
- **예비분.** 한도는 `reserve`를 선언하여(MAY) 검증, 재시도, 재개가 일반 작업 때문에 고갈되지 않도록 할 수 있습니다: 소비량과 대기 중인 양의 합이 한도에서 예비분을 뺀 값을 넘으면 디스패치가 거부됩니다.
- **소진.** 한도에 도달하면 미완료 체크포인트를 저장하고, `LIMIT: exhausted <id>: <detail>`을 기록하며, 명시적인 `LIMIT: recovered <id>` 기록이 있을 때까지 디스패치를 보류합니다. 소진이 인수 기준을 충족하는 일은 결코 없습니다.
- **취소 정산.** 진행 중인 예약은 해제 또는 확정으로 정확히 한 번 정산됩니다. 충돌하는 두 번째 정산은 중재되지 않고 거부됩니다.
- **라우팅 자세.** 기본값은 고정 모델입니다. 모델 등급 전환에는 `model_routing` 권한 부여와 같은 이름의 능력이 모두 필요하고, 병렬 디스패치에는 `agent_delegation` 권한 부여와 `subagents` 능력이 모두 필요합니다. 라우팅 자세는 권한에 관한 진술이며, 결코 효용에 관한 주장이 아닙니다.

## 구성 파일과 애드온 레지스트리

`.dwp/config.json`(리포지토리)과 `~/.dwp/config.json`(사용자)은 [`dwp-config/v1`](https://deepworkplan.com/schema/dwp-config/v1.json)으로 게시된 하나의 형태와 하나의 파서(`config.py`)를 공유합니다. **방법론은 구성 파일도 애드온도 없이 동작합니다.** 파일의 어떤 내용도 계획, 플로우 또는 적합성이 애드온에 의존하게 만들 수 없습니다.

- **기본적으로 추적됨.** 리포지토리 파일은 비밀이 아니라 결정을 담으며, 팀원과 CI가 같은 레지스트리를 읽도록 추적됩니다: 온보딩은 `.gitignore` 규칙 `.dwp/*`와 `!.dwp/config.json`을 작성합니다. 계획과 벤치마크 기록은 계속 무시됩니다.
- **우선순위.** 리포지토리 파일이 사용자 파일보다 우선하며, 파일이 없으면 모든 것이 비활성화된 것입니다. `addons` 키는 애드온 키별로 해석되고, `benchmark` 키는 통째로 해석됩니다.
- **레지스트리 키**는 팩 내 애드온 디렉터리 이름입니다: `ai-diff-reviewer`, `agentkit`, `dailybot`, `dependency-upgrade`, `design-system`, `devcontainer`, `herdr`, `vim`. 각 항목에는 `enabled`(`true`만 활성화함), 선택적 `version`, 선택적 한 줄 `note`가 있습니다. 알 수 없는 키는 한 번의 경고와 함께 무시됩니다.
- **없으면 활성화되지 않은 것.** 무언가를 활성화할 수 있는 것은 개발자의 동의를 받은 온보딩, 애드온 자체의 설치 단계, 또는 사람뿐입니다. 활성화되었지만 감지되지 않고 메모가 있는 애드온은 연기된 것으로 보고됩니다.
- **실패 시 닫힘 읽기.** 읽을 수 없는 파일이나 잘못된 값은 아무것도 기여하지 않으며 정확히 한 번의 경고를 냅니다. 리더는 결코 플로우를 중단하지 않으며, 버린 것에 대해 결코 침묵하지 않습니다. 라이터는 원자적으로 조정하며, 파싱할 수 없는 파일을 덮어쓰기를 거부합니다.
- **호스트 기록.** 선택적 `host` 키는 머신이 선언한 능력(닫힌 집합의 불리언)을 기록합니다. `telemetry: true`에는 여전히 개발자의 동의가 필요합니다.
- **기준선은 변하지 않습니다.** AI Diff Reviewer 로컬 리뷰는 레지스트리가 그것을 명시하든 아니든 모든 Final Review의 일부로 남습니다.

## 애드온이 제공하는 능력

7.0.0부터 활성화된 애드온은 런타임에 능력을 추가할 수 있습니다:

`effective abilities = host-declared abilities ∪ abilities provided by every addon that is enabled, described by a valid addon.json, detected, and on a compatible interface version`

- **디스크립터.** 팩 내의 각 애드온은 자신의 키, 제공하는 것, 감지 방법을 선언하는 `addon.json`([`addon-descriptor/v1`](https://deepworkplan.com/schema/addon-descriptor/v1.json))을 함께 배포합니다.
- **감지는 읽기 전용입니다.** 감지 명령은 셸 없이, stdin이 닫힌 상태로, 10초 타임아웃으로 실행되며, 출력된 어떤 내용도 실행되지 않습니다. 보고된 인터페이스 메이저 버전이 고정된 것과 다른 제품은 한 번의 경고와 함께 사용할 수 없는 것으로 처리됩니다.
- **활성화되지 않으면 참조하지 않습니다.** 비활성화된 애드온의 디스크립터는 열리지 않으며 감지 명령도 실행되지 않습니다. 합집합은 단조적입니다: 애드온을 활성화하면 능력이 추가될 수만 있습니다.
- **결코 영속화되지 않습니다.** 유효 능력은 매 호출마다 다시 계산되며 계획에 기록되어서는 안 됩니다(MUST NOT). 계획은 사용 가능했던 것이 아니라 실제로 사용한 것을 기록합니다 — 위임 이벤트가 그 전송 방식과 애드온을 명시합니다.
- **능력은 권한이 아닙니다.** agentkit 애드온은 `subagents`, `cancel_children`, `model_routing`을 제공할 수 있고, Herdr 애드온은 `subagents`와 `cancel_children`을 제공할 수 있습니다. 위임에는 여전히 계약의 `agent_delegation` 권한 부여가 필요합니다([위임](/spec/delegation)).

`resources.py abilities`는 유효 능력 집합과 각 능력의 출처를 출력하며, 읽기 전용입니다.

## 관련 문서

- [기록 레이어](/spec/record-layer) — 계약, 저널, 증거.
- [위임](/spec/delegation) — 계획이 `subagents` 능력을 사용하는 방법.
- [애드온](/spec/addons) — 선택적 애드온 자체.
