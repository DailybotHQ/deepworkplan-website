---
title: Loop engineering
description: "사람이 시작한 daemon이 lead 기록, 알림, 차단 사유, 승계, revive, 대기열로 승인된 Deep Work Plan을 끝까지 진행시키는 방식입니다."
order: 8
lang: ko
summary: 기록된 권한 범위 안에서 승인된 계획을 계속 진행시키는 전체 수명 주기입니다.
icon: repeat
---

# Loop engineering

**스펙 우선, 루프로 완결: 리포지토리가 하니스이며 계획은 스스로 완료까지 실행됩니다.** 이 장은 첫 실행 턴 이후에도 계획을 계속 진행시키는 선택적 장치를 설명합니다. 계획은 지속되는 명세로 남으며, 루프는 연속성을 제공할 뿐 새 권한을 부여하지 않습니다.

규범 텍스트는 [loop engineering 명세](/ko/spec/loop-engineering)에 있습니다. 이 장은 그에 대한 서술형 안내서로, 모든 MUST를 다시 나열하지 않고 수명 주기를 순서대로 따라가며 각 요소가 어떻게 맞물리는지 보여 줍니다.

## 왜 루프인가

DWP의 처음 두 기둥에는 한 가지 빈틈이 남습니다. 스펙 우선 계획은 에피소드가 *무엇을* 전달해야 하고 어떻게 검증되는지를 말합니다. 하니스로서의 리포지토리는 컨텍스트, 도구, gates가 *어디에* 있는지를 말합니다. 그러나 실행 중인 에이전트가 턴을 끝내거나, 사용량 한도에 도달하거나, 창을 닫을 때 *작업이 어떻게 끝나는지는* 어느 쪽도 말하지 않습니다. 루프가 없으면 승인되고 잘 명세된 계획도 누군가 "continue"를 입력하기를 기다립니다.

v8 규칙이 이 빈틈을 메웁니다. 승인된 계획은 해당 계획에 기록된 권한 안에서 일상적인 사람의 개입 없이 완료까지 실행됩니다. 사람은 기다림의 대상이 아니라 알림을 받는 대상이며, 예외는 로그인이나 자격 증명이 필요할 때, 또는 계획 자체의 C1–C7 gates 중 하나가 사전에 승인되지 않은 사람의 입력을 요구할 때뿐입니다. 이러한 예외에서는 입력이 도착할 때까지 실행이 해당 gate에서 멈춥니다.

따라서 루프는 승인 장치가 아니라 연속 장치이며, 선택 사항입니다. Herdr 통합(herdr-peers `autopilot --loop`)은 이미 단일 세션에서 작동하는 방법을 증폭할 뿐입니다.

## 수명 주기 한눈에 보기

승인된 계획 하나는 다음 단계를 거칩니다. 각 단계는 아래에서 자세히 설명합니다.

| 단계 | 일어나는 일 | 행위자 |
|---|---|---|
| 승인 | 계획이 승인되며, 계약에 권한이 기록되고 v8에서는 선택적 `autonomy` 블록도 기록됩니다 | 사람 |
| 등록 | `execute`가 계획의 lead 기록을 확보하며(`resume`은 다시 확보), 계획이 후계자를 지정하면 승계 순서를 함께 기록합니다 | lead agent(팩을 통해) |
| 실행 | lead가 인수 기준과 gates에 따라 작업을 하나씩 수행합니다 | lead와 그 lanes |
| 유휴 | 계획이 열린 상태로 lead의 창이 유휴 상태에 머뭅니다 | — |
| 알림 | daemon이 고정된 계속 진행 프롬프트 하나를 보냅니다 | daemon |
| 차단 | lead가 구조화된 차단 사유를 기록하고 멈추며, daemon은 아무것도 보내지 않습니다 | lead |
| 정체 | 진전 없이 3번 프롬프트를 보낸 뒤 계획이 `plan_stalled`로 기록됩니다 | daemon이 기록 |
| 장애 조치 | 목록의 후계자가 인계받고, 허가가 있으면 lane이 임명되며, `--revive`가 있으면 새 agent가 실행됩니다 | 후계자, lane 또는 revive된 agent(helper를 통해) |
| 완료 | 계획 마무리가 대기열 항목을 완료로 표시하며, 다음 대기 계획이 시작될 수 있습니다 | lead, daemon이 다음 lead에게 프롬프트 |
| 통지 | 정체, 차단, lead 상실, 완료, 대기열 이벤트가 `--notify` 명령으로 전달됩니다 | daemon이 명령을 실행 |

## 승인과 권한 기록

승인은 루프가 관여하기 전에 이루어지며, 루프의 어떤 요소도 계획을 승인하거나, 넓히거나, 수정(amendment)을 대신할 수 없습니다.

v8에서 계획 계약(`plan-contract/v8`)은 선택적이고 닫힌 `autonomy` 블록을 포함할 수 있습니다. 닫혀 있다는 것은 검증기가 알 수 없는 키를 거부하고, v8 이외의 계약 세대에서는 이 블록 자체를 거부한다는 뜻입니다. 빠진 키마다 기록된 기본값이 정확히 하나 있으며, 소비자는 자체 추측이 아니라 그 기본값을 적용합니다.

| 키 | 기록하는 내용 | 없을 때 |
|---|---|---|
| `stall_budget` | 진전 없이 허용되는 루프 프롬프트 수, 1부터 10까지의 정수 | `3`, herdr-peers 자체 상한과 같은 값 |
| `promptable` | 루프가 프롬프트를 보낼 수 있는 창 주소 | 계획의 lead만 |
| `notify` | 알림 대상 | 대상 없음, 루프는 여전히 기록함 |
| `brain` | brain이 이 계획에 작용할 수 있는지 여부 | `false` |
| `queue` | 대기열에서 계획이 시작되는 방식: `prompt-lead`, `launch` 또는 `none` | `none`, 계획은 대기열에 들어가지 않음 |

따라서 `autonomy` 블록이 없는 계획은 가장 보수적인 해석을 따릅니다. 모든 차단 사유는 사람이 해결하고, lead에게만 프롬프트를 보낼 수 있으며, 아무에게도 알리지 않고, brain은 작용하지 않으며, 계획은 대기열에 들어가지 않습니다. 이 블록은 한 계획에 대해 루프가 할 수 있는 일을 좁히거나 명시할 뿐, 계획의 범위와 gates가 이미 담고 있지 않은 권한을 추가하지 않습니다.

## 계획 등록

Herdr 애드온이 활성화되고 agent가 Herdr 안에서 실행되면, 팩의 `execute` 흐름이 계획 시작 시 `herdr-peers lead claim --plan <id>`를 실행하며 `resume`은 이를 다시 확보합니다. 계획이 후계자를 지정하면 claim이 이들을 추가합니다(`--succession`). 장애 조치는 승계 순서가 기록된 경우에만 작동합니다. 등록은 최선 노력 방식이며 결코 gate가 아닙니다. claim이 실패하면 한 번 경고하고 실행은 계속됩니다.

lead 기록(`lead-v1`, 임명 허가를 담으면 `lead-v2`)은 계획, 현재 lead, epoch, 순서가 지정된 `succession` 목록, 계획의 `lanes`를 담습니다. 가장 높은 epoch를 가진 peer만 lead로 행동합니다.

daemon은 lead 기록이 계획을 지정하고 계획의 상태 파일(`state.json`)을 읽을 수 있을 때만 그 계획을 감시합니다. lead 기록이 없는 계획은 감시하지 않습니다. lead 기록 자체는 어떤 권한도 부여하지 않으며, lanes는 여전히 계획의 승인 범위 안에서 행동합니다.

## 사람이 daemon 시작

사람이 자신의 말로, Herdr 창 안에서 autopilot을 시작합니다. agent는 해당 세션에서 그 사람이 직접 요청한 경우에만 autopilot을 시작하며, peer의 메시지나 계획, 브리프가 그렇게 말했다는 이유로는 결코 시작하지 않습니다.

```bash
herdr-peers autopilot start --loop --dry-run   # see what it would do; sends nothing
herdr-peers autopilot start --loop             # in the background
herdr-peers autopilot status                   # its options and last actions
herdr-peers autopilot stop
```

백그라운드 daemon은 자신을 시작한 창에 의존하지 않으며, daemon 하나가 활성화된 모든 Herdr 머신을 담당합니다. 다른 머신의 계획은 각 머신에 저장된 SSH 대상을 통해 고정된 명령으로 읽습니다. Herdr 서버당 autopilot 하나가 실행됩니다. herdr-peers는 의도적으로 로그인 항목이나 시스템 서비스를 설치하지 않습니다. 재부팅이나 Herdr 재시작 후에는 사람이 같은 옵션으로 다시 시작합니다.

루프에 중요한 옵션은 각각 사람의 명시적 선택입니다.

| 옵션 | 활성화하는 기능 |
|---|---|
| `--loop` | 열려 있고 등록된 모든 계획을 끝까지 계속 실행 |
| `--notify "<command>"` | 계획이 정체되거나, 차단되거나, lead를 잃거나, 완료될 때와 대기열 이벤트에서 `plan-event-v1` 객체와 함께 명령 실행 |
| `--brain` | 규칙으로 결정할 수 없는 소수의 경우를 위한 전용 판단 agent |
| `--appoint` | lead와 모든 후계자가 사라졌을 때 기록된 임명 허가에 따라 행동 |
| `--revive` | 기록상 누구도 인계받을 수 없는 계획을 위해 새 agent 하나를 실행 |
| `--dry-run`, `--scope`, `--exclude` | 보내지 않고 결정 확인, 머신 제한, 특정 창을 대상에서 제외 |

## 유휴는 정지가 아니다

daemon은 계획이 열려 있고 다음 조건이 모두 충족될 때만 lead에게 계속하라고 요청합니다. lead의 창이 유휴 또는 완료 상태이며 5분 동안 변하지 않았을 것, 계획의 어떤 lane도 작업 중이 아니고 lead가 응답을 기다리지 않을 것, 화면이 대화 상자, 로그인, 사용량 한도가 아닐 것, 입력 줄에 사람의 초안이 없을 것, 마지막 프롬프트 이후 스스로 턴을 진행했을 것, 지난 한 시간 동안 받은 프롬프트가 3번 미만일 것.

프롬프트는 고정되어 있습니다. 계획 id만 채워집니다.

> "Plan P is not finished and you are its lead. Continue executing it to its end, respecting its gates and the authority already recorded in the plan. Never weaken a gate to pass it. If the plan cannot go on without something only the developer can provide, record the blocker in the plan state and stop."

알림은 요청할 뿐 결코 권한을 부여하지 않습니다. lanes는 lead가 이끌기 때문에 daemon은 lead에게만 프롬프트를 보냅니다. 계획 상태에 진전 없이 루프 프롬프트가 3번 이어지면 계획은 `plan_stalled`로 기록되고 상태가 바뀔 때까지 그대로 둡니다. 열린 계획이 여러 개인 lead는 한 번의 순회마다 프롬프트 하나를 받습니다.

## 구조화된 차단 사유

v8 계획은 계속할 수 없는 이유를 데이터로 기록하므로, 루프, 플릿 맵, 재개하는 agent가 산문을 해석하는 대신 같은 필드를 읽습니다. 차단 사유는 ledger의 helper(`ledger.py block`)로 제기하고 `ledger.py unblock`으로 해결하며, `journal-event/v8`의 `blocker` 이벤트로 기록됩니다. 차단 사유 이벤트를 직접 추가하는 것은 거부됩니다.

| 필드 | 의미 |
|---|---|
| `task` | 차단된 작업. 증거로 이미 닫힌 작업은 차단할 수 없음 |
| `reason` | 작업을 계속할 수 없는 이유(최대 1000자) |
| `needs` | 무엇이 차단을 해제하는지 한 줄로(최대 500자) |
| `class` | 필수: C1–C7 중 하나 |
| `resolver` | 선택: `lead` 또는 `human`. 없으면 `human`으로 읽음 |

`resolver: "lead"`는 자격 증명, 로그인, 동의, 결제, main으로의 push, release, 삭제 없이 계획에 기록된 권한 안에서 차단 사유를 해결할 수 있다는 뜻입니다. C1, C2, C5, C6에는 거부됩니다. 계획당 활성 차단 사유는 최대 하나이며, 해결되지 않은 동안에는 해당 작업을 완료할 수 없습니다.

읽는 쪽은 계획의 `state.json`(`plan-snapshot/v8`)에서 차단 사유를 찾습니다. 활성 차단 사유 또는 `null`이 들어 있고, `blocked`는 파생된 작업 상태입니다. `PROGRESS.md`는 상태가 전환될 때마다 갱신되는 고정 헤더 네 줄로 시작합니다.

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

루프는 차단된 계획을 절제하며 다룹니다. 그 계획에는 아무것도 보내지 않고 `plan_blocked`를 한 번 기록합니다. daemon도 brain도 계획이 `resolver: "lead"`로 표시하지 않은 차단 사유를 해결하라고 lead에게 요청할 수 없으며, 나머지는 모두 사람을 기다립니다. 이전 세대(v6, v7)의 계획은 차단 사유 이벤트를 기록하지 않으며, 그 계획이 보고하는 모든 차단 사유는 사람의 몫입니다.

## daemon이 결코 하지 않는 일

daemon은 결코 다음을 하지 않습니다.

- 로그인, sign-in, API 키 또는 device-code 프롬프트, Claude의 bypass-permissions 확인을 건드리는 일. 로그인은 사람이 합니다.
- 거부 행, 자유 텍스트 행, 또는 agent의 상시 권한을 넓히는 행을 선택하는 일.
- 입력 줄에 사람의 초안이 있는 창이나 범위 밖의 창에 프롬프트를 보내는 일.
- 차단된 계획이나 상태를 읽을 수 없는 계획에 프롬프트를 보내는 일.
- lead 기록을 쓰거나 수정하고, protocol 메시지를 보내거나, 기록에 없는 창을 임명하는 일.
- 계획 대기열을 쓰는 일.

모든 행이 거부하거나 권한을 넓히는 권한 대화 상자는 차단된 채로 두지 않고 거절되며, 그 후 agent에게 계획의 gates 안에서 다른 방법으로 계속하거나 차단 사유를 기록하라고 한 번 알립니다. 모든 행이 거부인 agent 자신의 질문은 작업에 관한 결정이므로 사람에게 남겨 둡니다.

## 리더십: epoch, 승계, takeover

리더십은 epoch로 보호됩니다. lead를 옮기는 모든 변경(인계, takeover, 해제, 임명)은 epoch를 증가시키며, 가장 높은 epoch를 가진 쪽만 lead로 행동합니다. 돌아온 이전 lead는 더 높은 epoch를 발견하고, 그 lead 명령은 거부되며, 다음 lead 통지에 따라 물러납니다.

lead가 사라지면(두 번 연속 목록에서 창이 보이지 않으면), daemon은 기록의 `succession`에서 연락 가능한 첫 주소에 epoch당 한 번 `herdr-peers lead takeover --plan P`를 실행하도록 요청합니다. 이유를 전달하지 않으므로 lead가 정말 사라졌는지는 helper 자체의 검사가 판단합니다. 사용량 한도에 도달한 lead는 사라진 것이 아니며, daemon은 30분마다 다시 시도합니다. 승계 순서의 누구에게도 요청할 수 없으면 daemon은 `plan_no_lead`를 기록합니다.

후계자는 계획, 그 인수 기준, 그 gates를 이어받습니다. 승계는 누가 실행하는지를 바꿀 뿐, 무엇이 승인되었는지는 결코 바꾸지 않습니다.

## 임명과 revive

lead와 후계자가 모두 사라진 계획을 위해 두 가지 경로가 더 있습니다. 각각 사람의 명시적 행위가 필요하며, takeover는 helper의 검사를 받으며 agent 자신이 수행합니다.

**임명(protocol 2).** 사람의 행위 두 가지가 필요합니다. lead 기록에 기록된 허가(`lead claim --allow-appointment`, lead가 그 사람의 말이 있을 때만 실행)와 `--appoint`로 시작한 daemon입니다. daemon은 스스로 이 권한을 부여할 수 없습니다. 최소 15분 간격의 두 번의 관찰에서 lead와 모든 후계자가 사라졌고 진전이 없으면, daemon은 계획의 살아 있는 첫 lane에게 `lead takeover --plan P --as-lane`을 실행하도록 요청합니다. 그 helper는 허가를 다시 확인하고, 그것이 계획의 리포지토리에서 작업하는 lane인지 확인한 뒤, lead, 모든 후계자, 이전의 모든 lane을 1분 간격으로 두 번 확인합니다. 살아 있는 흔적이 하나라도 있으면 거부합니다. 임명은 계획당 최대 두 번까지 허용됩니다.

**Revive(herdr-peers 2.2.0).** `--loop --revive`로 daemon을 시작하는 것 자체가 허가입니다. 계획의 lead와 승계 순서 및 lanes의 모든 구성원이 사라지고 누구도 인계받을 수 없으면, daemon은 계획의 체크아웃에서 새 agent 하나를 실행하고, 일회용 티켓을 작성한 뒤, `lead takeover --plan P --reason revive`를 실행하도록 브리핑할 수 있습니다. helper는 그 티켓이 있을 때만, 그리고 자체 검사에서 모든 구성원이 사라졌음을 확인한 뒤에만 takeover를 수락합니다. revive된 기록은 daemon의 머신에서만 채택됩니다. lead가 아직 살아 있는 정체된 계획은 결코 그 lead에게서 빼앗지 않으며, lead에게 인계를 한 번 요청합니다. Revive는 계획당 6시간에 한 번, 계획당 총 두 번, 플릿 전체에서 시간당 두 번으로 제한됩니다.

**되돌릴 수 없는 단계 전 확인.** 임명되거나 revive된 lead도 다른 lead와 마찬가지로 merge, tag, release 전에 `herdr-peers lead verify --plan <id>`를 실행합니다. 다른 머신이 더 높은 epoch로 계획을 보여 주면 거부하고, 계획의 머신에 연결할 수 없으면 0이 아닌 코드로 종료합니다.

## 선택적 brain

daemon의 규칙이 거의 모든 것을 결정합니다. 규칙으로 결정할 수 없는 소수의 경우를 위해 `--brain`은 daemon이 직접 ask 모드로 실행하는 전용 판단 agent 하나를 유지하며, 닫힌 작업 목록 안에서만 그에 따릅니다. coding-agents-kit 1.3.0 이상이 필요하며, 없으면 `--brain`으로 시작한 daemon은 요청받은 brain 없이 실행하는 대신 시작을 거부합니다.

| 경우 | 허용되는 작업 |
|---|---|
| 계획이 정체됨 | 한 번 더 알림(계획당 한 번), 사람에게 알리기, 또는 그대로 두기 |
| 계획이 `resolver: "lead"`, lead가 처리할 수 있는 class(C3, C4, C7), 민감하지 않은 주제로 차단됨 | 기록된 권한 안에서 해결하도록 lead에게 고정된 요청 한 번, 사람에게 알리기, 또는 그대로 두기 |
| agent가 daemon이 인식하지 못하는 화면에서 대기 중 | 사람에게 알리기, 또는 그대로 두기 |

3분 안에 유효한 답이 오지 않으면 기본값은 그대로 두는 것입니다. brain의 텍스트는 결코 입력되거나 키로 전달되거나 실행되지 않습니다. brain은 lead를 임명하거나, agent를 실행하거나, merge, release, 로그인, 권한 변경을 할 수 없습니다. daemon만이 유일한 실행 주체로 남습니다. v8에서는 계획의 `autonomy.brain`이 brain이 그 계획에 작용할 수 있는지 자체를 기록합니다.

## 계획 대기열

리포지토리는 승인된 계획의 대기열을 `.dwp/queue.json`(스키마 `dwp-queue-v1`)에 유지할 수 있습니다. 팩(`shared/queue.py`)이나 사람이 이를 쓰며, daemon은 크기를 제한하고 전체를 검증한 상태로 읽기만 합니다. create는 개발자가 대기열에 넣으라고 요청할 때(또는 v8 계약이 `none` 이외의 `autonomy.queue`를 기록할 때) 승인 시 계획을 추가합니다. 사람이나 lead가 순서를 바꾸며, execute는 계획이 lead 아래에서 시작될 때 항목을 `started`로, 계획 마무리 후 `done`으로 표시합니다. 대기열은 최대 64개 항목을 담습니다. 의존성은 대기열 내부에서만 정의되며, `after`는 이미 대기열에 있는 계획을 지정합니다. 대기열에 `parallel: true`가 없으면 리포지토리당 한 번에 계획 하나만 실행됩니다.

`--loop`를 사용하면 리포지토리의 현재 계획이 끝났을 때, 대기열이 지정한 lead에게 고정된 프롬프트 하나를 보내 다음 준비된 항목을 시작합니다. "Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates." 항목은 `after` 계획이 완료되었고, 그 리포지토리의 다른 계획이 실행 중이지 않으며, lead를 지정하고, 승인이 여전히 현재 계약에 대한 계획의 최신 승인 또는 수정 이벤트일 때만 준비된 상태입니다. `launch` 항목은 루프가 시작하지 않으며, 승인되지 않은 항목이나 lead가 없는 항목처럼 `queue_blocked`로 보고됩니다. 손상된 대기열은 비어 있는 것으로 읽히며 계획 수명 주기를 결코 깨뜨리지 않습니다.

## 이벤트, 알림, 플릿 맵

daemon은 계획 이벤트를 `--notify` 명령의 표준 입력에 `plan-event-v1` JSON 객체 하나로 보고합니다. 이벤트, 계획, 머신, lead, 리포지토리, 차단 사유의 class가 담깁니다. 이벤트에는 계획과 상황마다 한 번씩 발생하는 `plan_stalled`, `plan_blocked`, `plan_no_lead`, `plan_lead_moved`, `plan_completed`가 있으며, `plan_queued_started`, `queue_blocked`, 임명 및 revive 이벤트, brain의 `needs_human`도 있습니다. 실패는 기록되며 순회를 결코 멈추지 않습니다.

팩의 Herdr 애드온은 Dailybot notifier(`scripts/notify-dailybot.py`)를 제공하며, 이는 완료, 정체, 차단, lead 없음, lead 이동 이벤트를 설치된 Dailybot CLI를 통해 사람이 읽을 수 있는 팀 업데이트 하나로 바꿉니다. CLI가 없거나, 로그인되어 있지 않거나, 전송이 실패하면 조용히 종료합니다. 알림은 진행 상황이나 필요 사항을 보고할 뿐, 결코 작업을 승인하거나 계획 기록을 대신하지 않습니다.

루프를 관찰하려면 `herdr-peers plans`가 한 머신의 계획(`plans-v1`)을 출력하고, `herdr-peers fleet`이 병합된 맵(`fleet-v1`)을 출력합니다. 머신, agent, 계획, 그리고 lead, 후계자, lane으로서의 각 agent 역할이 담깁니다. `herdr-peers fleet ui`는 맵을 실시간으로 보여 주며, 계획, 리포지토리, 머신, 대기열별로 묶고, 주의가 필요한 것, 활성 상태인 것, 대기 중인 것, 완료된 것을 보는 뷰를 제공합니다. UI는 읽기만 합니다. 계획 상태를 쓰지 않으며 어떤 agent에도 프롬프트를 보내지 않습니다.

## 실제 예시: 하룻밤 동안의 계획 하나

다음 과정은 예시이며, 각 단계는 위에서 설명한 규칙을 따릅니다.

1. 저녁에 개발자가 `notify`를 제외하고 기본값을 그대로 둔 `autonomy` 블록이 있는 계획을 승인합니다. agent가 `execute`를 실행해 후계자 하나와 함께 lead 기록을 확보합니다.
2. 개발자가 `herdr-peers autopilot start --loop --notify "<notifier>"`를 시작하고 오프라인이 됩니다.
3. lead가 작업 세 개를 완료하고 턴을 끝냅니다. 5분 뒤, 작업 중인 lane도 대기 중인 응답도 없으므로 daemon이 고정된 계속 진행 프롬프트를 보내고, lead는 다음 작업에서 재개합니다.
4. 한 작업에 계획이 보유하지 않은 비밀이 필요합니다. lead가 resolver 없이(`human`으로 읽힘) C1 차단 사유를 제기하고 멈춥니다. daemon은 계획에 아무것도 보내지 않고 `plan_blocked`를 기록하며, notifier가 차단 사유의 class를 명시한 팀 업데이트 하나를 게시합니다.
5. 아침에 개발자가 입력을 제공하고, lead가 `ledger.py unblock`으로 차단 사유를 해결하며, 실행이 계속됩니다. 나중에 lead의 창이 닫힙니다. 두 번의 목록에서 보이지 않자 daemon이 후계자에게 `lead takeover` 실행을 요청하고, epoch가 증가하며, 후계자가 같은 gates 아래에서 계속합니다.
6. 계획의 최종 merge 전에 새 lead가 `lead verify`를 실행합니다. 계획이 완료되고 `plan_completed`가 notifier에 도달하며, 리포지토리에 대기열이 있으면 다음 승인된 계획의 lead가 고정된 대기열 프롬프트를 받습니다.

어느 시점에도 daemon은 무엇을 승인하거나, 자격 증명을 입력하거나, 작업 내용을 결정하지 않았습니다.

## 권한 경계

루프는 정확히 계획의 권한이 멈추는 곳에서 멈춥니다. 에이전트 프로토콜의 에스컬레이션 class가 그 선을 표시합니다. C1 권한(계획의 승인 범위 밖이거나, 동의 체크포인트에 있거나, 비밀과 관련된 작업), C2 동의 화면(권한, 로그인, 자격 증명, 결제 화면으로, agent가 결코 키를 입력하지 않음), C3 해소할 수 없는 모호성, C4 약화하지 않고는 통과할 수 없는 gate, C5 손상, C6 약관, C7 소진된 용량입니다. 이 중 하나가 사전 승인 없이 발생하면 실행은 해당 gate에서 멈추고, 필요 사항이 기록되고 보고됩니다.

로그인과 자격 증명은 항상 사람의 행위로 남습니다. 사람은 daemon을 시작하고, 임명이나 revive를 명시적으로 허가하며, 기록된 권한으로 충족할 수 없는 필요 사항을 해결합니다. 그 밖의 모든 것에 대해서는 사람이 매 단계를 지켜보도록 요청받는 대신 알림을 받습니다.

## 애드온 없이 작업하기

이 중 어느 것도 필수가 아닙니다. Herdr가 없거나 애드온이 비활성화되면 팩은 루프가 존재하지 않는 것처럼 동작합니다. 계획은 세션에서 실행되거나, `resume`으로 첫 미완료 작업부터 재개되거나, 사람이 조정하는 인계를 통해 다른 agent에게 넘겨집니다. 계획 계약, 구조화된 차단 사유, `PROGRESS.md` 헤더는 똑같이 작동하므로, 사람이나 다른 agent는 루프가 읽었을 것과 같은 상태를 읽습니다.
