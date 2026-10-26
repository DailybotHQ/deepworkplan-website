---
title: 위임
description: "v7 계획이 agent_delegation 권한 아래 parallel_safe 작업을 다른 코딩 에이전트에 넘기는 방식, 위임 기록과 관찰된 증거."
order: 11
lang: ko
section: Record layer
---

# 위임

> **버전 범위:** 이 페이지는 릴리스 `v7.9.0` 기준 v7 계약 세대를 다시 서술합니다. 정식 출처: [`V7_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_CONTRACT.md)와 execute 플로우의 [`delegation.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/execute/delegation.md). 이 페이지와 해당 파일이 다를 경우 파일이 우선합니다.

**버전 7.0.0. 상태: 안정(Stable).** v7은 새로운 수명 주기가 아니라 [기록 레이어](/spec/record-layer)의 새로운 계약 세대입니다: 이 페이지가 달리 말하지 않는 한 v6의 계약, 수명 주기, 컨텍스트, 리소스 문서의 모든 내용이 적용됩니다. 위임하지 않는 것은 언제나 올바릅니다. 키워드 MUST, MUST NOT, SHOULD, SHOULD NOT, MAY는 RFC 2119에 기술된 대로 해석됩니다.

## v7이 추가하는 것

v7은 기록 레이어에 정확히 두 가지를 추가합니다:

1. **계약 안의 선택적 작업 필드 하나**, `parallel_safe`. [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json)에 게시됩니다.
2. **저널 이벤트 타입 하나**, `delegation`. [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json)에 게시됩니다.

v1, v2, v5, v6 스키마의 바이트는 변경되지 않습니다. 위임하지 않는 계획은 스키마 URL을 제외하면 v6 계획과 구별되지 않습니다.

## `parallel_safe`

`parallel_safe`(불리언, 기본값 `false`)는 작업이 형제 작업과 뒤섞이지 않고 위임 대상(delegate)에서 실행될 수 있다는 주장입니다. 이 값은 실행 중에 추론되는 일 없이 `create`가 설정하며, 다음 조건이 모두 충족될 때만 설정됩니다:

- 리포지토리가 [애드온 레지스트리](/ko/spec/resources-and-abilities#구성-파일과-애드온-레지스트리)에서 위임 애드온(agentkit 또는 Herdr)을 활성화했습니다.
- 작업의 변경 표면이 동시에 진행 중일 수 있는 형제 작업과 겹치지 않습니다.
- 작업이 한정된 출력을 선언합니다.
- 작업의 게이트가 이 계획 안에서 실행됩니다.

작업에 표시를 하는 것은 어떤 권한도 바꾸지 않습니다: `agent_delegation` 권한 부여가 없는 계약도 표시를 담을 수 있으며, 그 표시는 아무것도 허가하지 않습니다.

## `delegation` 이벤트

위임 대상 하나의 상태 전환마다 이벤트 하나가 기록됩니다:

| 필드 | 의미 |
| --- | --- |
| `task` | 위임 대상이 작업하는 `T-*` 작업 |
| `delegation_id` | 시작과 그 종단 전환을 연결함 |
| `transport` | `headless`(agentkit) 또는 `interactive`(Herdr) |
| `via` | 위임을 전달한 애드온 키 |
| `state` | `launched`, 그다음 `completed`, `failed`, `cancelled` 중 정확히 하나 |
| `kind`, `profile` | 선택 사항: 코딩 에이전트의 종류와 프로필 |
| `target` | 선택 사항: 작업 디렉터리(headless) 또는 `machine:pane`(interactive) |
| `worktree` | 위임 대상 자신의 git 워크트리, 읽기 전용 위임 대상이면 `null` |
| `prompt_digest` | 시작 시: 프롬프트의 SHA-256, 위임 대상에 의존하기 전에 기록됨 |
| `result_path`, `result_digest` | 완료 또는 실패 시: 수집된 결과와 그 다이제스트 |

전환은 닫혀 있습니다: 위임 하나당 `launched` 하나, 그다음 정확히 하나의 종단 상태입니다. 위임 이벤트를 저널에 직접 추가하는 것은 거부되어야(MUST) 하며, 위임 이벤트는 오직 게이트된 라이터를 통해서만 존재합니다.

## 위임은 증거가 아닙니다

위임은 신뢰 라벨도 증거 경로도 갖지 않으며, 어떤 종결도 이를 읽지 않습니다. 위임 대상의 결과는 이 계획 자체의 게이트 러너가 관찰할 때까지 **asserted**로 남습니다: 부모가 작업을 통합한 다음 작업의 게이트(`ledger.py gate`)를 실행하며, 이것이 `observed` 증거를 만드는 유일한 수단이자 작업이 완료될 수 있는 유일한 방법입니다. 완료된 위임이 기준을 종결하는 일은 결코 없습니다. 실패한 위임은 기록된 결과이며, 그 경우 작업은 부모가 구현합니다.

## 게이트된 라이터

`ledger.py --plan <dir> delegate launch|observe|collect|cancel --task <T-id>`:

| 연산 | 쓰기 | 효과 |
| --- | --- | --- |
| `launch` | 예 | 아래 검사 후 `launched` 기록 |
| `observe` | 아니요 | 각 위임의 최신 상태 출력 |
| `collect` | 예 | 결과 경로와 그 다이제스트와 함께 `completed` 또는 `failed` 기록 |
| `cancel` | 예 | `cancelled` 기록 |

다음이 **모두** 충족되지 않는 한 `launch`는 거부되어야(MUST) 하며, 그 거부는 기록됩니다:

1. 계약이 v7입니다.
2. 계약이 `agent_delegation`을 부여합니다.
3. 작업이 존재하고, 시작되었으며, 완료되지 않았습니다.
4. 작업이 `parallel_safe`이거나, **또는** 위임 대상이 읽기 전용(워크트리 없음)입니다.
5. 명명된 애드온의 디스크립터가 요청된 전송 방식을 선언합니다.
6. 유효 능력이 해당 애드온을 `subagents`의 출처로 나열합니다([리소스와 능력](/ko/spec/resources-and-abilities#애드온이-제공하는-능력)).

`collect`와 `cancel`은 알 수 없는 위임, 다른 작업의 위임, 또는 이미 종단 상태인 위임에 대해 거부되어야(MUST) 합니다. 거부된 시작은 차단 요인이 아닙니다: 작업은 순차적으로 실행됩니다.

## 전송 방식

원장은 위임 대상을 실행하지 않으며, 실행은 전송 애드온이 합니다.

- **Headless**(`via: agentkit`) — 출력이 선언된 한정된 `parallel_safe` 작업용: 전용 git 워크트리에서 `ak run`을 한 번 실행한 뒤 종료합니다. 읽기 전용 위임 대상은 `--ask`로 시작됩니다.
- **Interactive**(`via: herdr`) — 상호작용이 필요하거나, 오래 실행되거나, 다른 머신에서 실행되는 작업용: Herdr 창의 herdr-peers 피어로, 정확히 하나의 승인된 응답을 돌려줍니다.

## 가드레일

- **경로당 하나의 라이터.** 쓰기를 하는 위임 대상은 자신의 워크트리 안에서만 작업하며, 부모 세션만이 유일한 저널 라이터입니다.
- **깊이 1.** 위임 대상은 결코 다시 위임하지 않습니다. 팬아웃은 전송 방식에 의해 제한됩니다.
- **결과는 데이터입니다.** 위임 대상이 반환하는 것은 어떤 권한도 부여하지 않고, 범위를 넓히지 않으며, 인수를 결코 바꾸지 않습니다.
- **자기 완결적인 지시.** 시작 프롬프트는 작업의 목표, 원문 그대로의 인수 기준, 쓸 수 있는 워크트리를 명시하며, 비밀 값을 결코 담지 않습니다.

## 오케스트레이터

오케스트레이터는 **자식 계획의** 작업을 결코 위임하지 않습니다: 자식 계획은 리포지토리당 하나의 에이전트로 각자의 세션에서 실행됩니다. 위 규칙에 따라 계획 **자신의** 작업을 위임하는 것은 오케스트레이터 계획과 개별 계획 모두에서 허용됩니다. 장기 실행 레인을 여럿 운영하고, 계정 한도를 넘어 유지하며, 리더십을 넘겨주는 일은 [오케스트레이션](/ko/methodology/06-orchestration)과 [스웜 자율성](/ko/methodology/07-swarm-autonomy)에 관한 방법론 장에서 다룹니다.

## 관련 문서

- [기록 레이어](/spec/record-layer) — 이 페이지가 확장하는 계약과 저널.
- [리소스와 능력](/spec/resources-and-abilities) — 능력, 권한 부여, 애드온 레지스트리.
- [Herdr 애드온](/kit/herdr)과 [Agentkit 애드온](/kit/agentkit) — 두 가지 전송 방식.
