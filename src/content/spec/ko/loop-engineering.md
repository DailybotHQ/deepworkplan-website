---
title: 루프 엔지니어링 (loop engineering)
description: "기록된 권한, 사람이 시작하는 지속 실행, 승계, 차단, 대기열, 알림 및 플릿 가시성을 다루는 v8 루프 규범입니다."
order: 12
lang: ko
section: 루프 엔지니어링
---

# 루프 엔지니어링 (loop engineering)

이 페이지는 루프 엔지니어링의 계획 계약을 정의합니다. **계획**이 계속 권한의 근거이며 루프는 지속성과 가시성을 제공합니다. 애드온은 방법을 확장할 수 있지만 계획에 기록된 권한을 넓힐 수 없습니다.

## 1. v8 규칙

승인된 계획은 사람이 계속 지켜보지 않아도 끝까지 실행됩니다. 자율성은 **계획에 기록된 권한 안에서** 작동합니다. 로그인과 자격 증명, 그리고 계획 자체의 C1–C7 게이트(예: 게시, 푸시, 외부 메시지)는 계획에 사전 승인이 기록되지 않았다면 중단됩니다. 인간은 기다리게 하지 않고 알림을 받습니다. v7 규칙은 그대로입니다. 핵심 방법은 단독으로 작동하고 애드온은 이를 확장합니다.

## 루프 의미

### 등록과 관찰

Herdr 애드온을 사용하면 v8 팩의 `execute` 흐름이 lead 기록을 확보하고 계획의 승계 목록을 기록합니다. lead 기록과 읽을 수 있는 상태가 있는 계획만 관찰됩니다. 사람은 `herdr-peers autopilot --loop`을 시작합니다. 이는 daemon이지 로그인 항목이나 시스템 서비스가 아닙니다. 한 daemon이 활성화된 모든 Herdr 머신의 계획을 관찰할 수 있습니다. lead 기록이 없는 계획은 관찰하지 않습니다.

### 지속 실행, 정체 및 인계

열린 계획에서 daemon은 유휴 검사를 통과한 뒤 lead만 알립니다. lead가 5분 동안 유휴 또는 완료 상태이고, 작업 중인 lane과 대기 중 답변이 없으며, pane이 범위 내이고 제외되지 않고, 대화상자·로그인·사용량 제한 화면 또는 입력 줄의 사람 초안이 없어야 합니다. 고정 프롬프트는 기록된 권한과 게이트를 지키며 계획을 끝까지 진행하라고 요청합니다. 프롬프트는 권한을 추가하지 않습니다. 계획 상태에 진전 없이 세 번 프롬프트하면 daemon은 `plan_stalled`를 기록하고 상태가 바뀔 때까지 멈춥니다. 차단된 계획은 알림만 받고 프롬프트되지 않습니다.

lead가 사라지면 daemon은 승계 목록에서 처음으로 연결 가능한 후임자에게 `herdr-peers lead takeover --plan <id>` 실행을 요청합니다. 도구가 승계를 검증하고 epoch를 올립니다. daemon은 lead 기록을 쓰거나 목록에 없는 pane을 선택하지 않습니다. 사용량 제한만으로 lead 부재를 판단하지 않습니다. 프로토콜 2는 계획 lane에서 lead 임명도 지원하지만, 사람이 `lead claim --allow-appointment`로 명시적 허가를 기록하고 daemon을 `--appoint`로 시작한 경우에만 가능합니다. merge, tag, release 전에는 현재 lead가 `herdr-peers lead verify --plan <id>`를 실행해야 합니다.

### brain, 이벤트 및 플릿

선택 사항인 `--brain`은 daemon 규칙으로 판단할 수 없는 경우에 전용 판단 에이전트를 시작합니다. brain은 닫힌 동작 목록에서만 선택합니다. daemon만 실제 행위자이며 허용된 선택을 검증해 실행합니다. 자유 형식 brain 텍스트를 실행하지 않습니다. 계획의 `autonomy` 블록도 brain을 허용해야 합니다.

루프는 정체, 차단, lead 손실, 완료 및 대기열 결과 등의 계획 이벤트를 기록합니다. 선택적 `--notify` 통합을 사용하면 daemon이 설정된 알림기로 `plan-event-v1` 객체를 보냅니다. 팩의 Dailybot 알림기는 지원되는 이벤트를 팀 업데이트로 바꿉니다. 알림은 승인이나 계획 기록 변경이 아닙니다. 플릿 맵과 `herdr-peers fleet ui`는 여러 머신의 에이전트와 계획을 표시합니다. UI는 읽기 전용이며 계획 상태를 바꾸거나 에이전트를 프롬프트하지 않습니다. 자세한 내용은 [herdr-peers v2.0.0 autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.0.0/skills/herdr-peers/autopilot.md) 및 [프로토콜](https://github.com/DailybotHQ/herdr-peers/blob/v2.0.0/skills/herdr-peers/protocol.md)을 참조하세요.

## 2. `autonomy` 블록 (plan-contract/v8)

선택적 최상위 `autonomy` 객체는 폐쇄형이므로 알 수 없는 키는 유효하지 않습니다. 정식 필드 이름과 형식은 [plan-contract/v8 스키마](https://deepworkplan.com/schema/plan-contract/v8.json)에 있습니다. 블록이 없으면 모든 기본값이 적용되고, 블록이 있으면 생략된 각 필드는 자체 기본값을 유지합니다. 소비자는 추측해서는 안 됩니다.

| 필드 | 형식 및 허용 값 | 생략 시 기본값 |
|---|---|---|
| `stall_budget` | 1~10 정수 | 진전 없는 루프 프롬프트 `3`회 |
| `promptable` | 비어 있지 않은 Herdr pane 주소 배열 | 계획 lead만 |
| `notify` | 비어 있지 않은 배열, 현재 `dailybot` | 대상 없음; 이벤트는 계속 기록 |
| `brain` | 불리언 | `false`; brain이 계획에 작용할 수 없음 |
| `queue` | `prompt-lead`, `launch`, `none` | `none`; 계획은 대기열에 없음 |

pane 주소는 Herdr의 정확한 형식을 사용합니다: `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`. 머신 ID는 `-`로 시작할 수 없습니다. 설정은 프롬프트 대상, 이벤트 수신자, brain 허용 여부와 대기열 참여를 제한합니다. 승인 기준이나 게이트는 바꾸지 않습니다.

## 3. 구조화된 차단 및 진행

차단된 계획은 `state.json`의 `blocked` 또는 `blocker` 레코드에 C 등급과 선택적 `resolver` 필드를 기록합니다. `resolver`는 `lead` 또는 `human`이며 생략하면 `human`입니다. `lead`는 자격 증명, 로그인, 동의, 결제, main 푸시, release 또는 삭제 없이 기록된 권한 안에서 해결 가능함을 뜻합니다. 루프와 brain은 `lead`로 표시된 차단만 해결하도록 lead에게 요청할 수 있습니다. 나머지는 사람에게 알리고 프롬프트로 우회하지 않습니다.

태그된 Herdr 플릿 맵은 계획 `PROGRESS.md` 최대 14줄을 정리된 요약으로 표시할 수 있습니다. 이는 관찰 데이터이지 권한 부여나 기계 판독 진행 헤더의 공개 스키마가 아닙니다. 팩 v8 브랜치의 계획된 헤더 형식은 규범으로 보기 전에 8.0.0 태그에서 확인해야 합니다.

## 4. 계획 대기열

대기열은 `dwp-queue-v1` 스키마를 사용하는 `.dwp/queue.json`입니다. 팩만 씁니다. 승인 시 `create`가 추가하고, 사람 또는 lead가 계획 흐름에서 순서를 바꾸며, `execute`는 lead(주소 포함)를 확보할 때 `started`를 표시하고, 완료 시 `done`으로 표시합니다. `create` 또는 `refine`은 한 줄 메모와 함께 `skipped`로 표시할 수 있습니다. 항목에는 계획, 이미 대기열에 있는 계획을 가리키는 선택적 `after`, 상태, lead 및 시작 모드가 있습니다. `parallel: true`가 명시되지 않으면 저장소는 한 번에 하나의 계획만 실행합니다.

daemon은 크기가 제한된 읽기 전용 소비자입니다. 사용할 수 없는 대기열은 실행을 깨뜨리지 않고 빈 대기열로 취급합니다. 의존성이 없거나 완료되고, 승인되었으며, lead가 지정되고, 병렬 실행이 허용되지 않는 한 다른 계획이 실행 중이지 않을 때만 시작할 수 있습니다. `prompt-lead` 모드는 지정된 lead에게 다음 고정 메시지를 보냅니다: “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” daemon은 대기열에 쓰지 않습니다. 공개 계약이 명시적으로 추가하지 않는 한 이 루프는 `launch` 모드를 실행하지 않습니다.

## 5. v8에서 유지되는 것

v8은 v7 계약의 `tasks[].parallel_safe`, 위임 및 journal을 유지합니다. v8 journal 이벤트 집합은 v7과 같고 세대 순서에 따라 v7 기능은 v8 및 이후 버전에서도 유지됩니다. 레코드 계층에서 v8은 v7 manifest 및 journal-event 스키마 URL을 유지하고 새 세대에 `plan-contract/v8` URL만 추가합니다. v5, v6, v7 계획은 기록된 세대를 유지하며 조용히 마이그레이션되지 않습니다.

v8은 애드온을 필수로 만들지 않습니다. Herdr가 없어도 핵심 방법과 기록된 권한으로 계획을 실행합니다. Herdr를 사용하면 등록, 제한된 지속 실행, 승계, 알림, 대기열 및 읽기 전용 플릿 뷰가 같은 계획 수명 주기를 확장합니다.
