---
title: Lite 계획
description: "Lite 계획: README.md 안에 인라인으로 존재하는 간결하고 완전히 실행 가능한 작업 레코드, 그 생성과 형식 선택, 그리고 Full 계획으로의 승격을 규정한다."
order: 3
lang: ko
section: Workflow
---

# Lite 계획

**버전 4.0.0. 상태: 안정(Stable).** 이 문서는 [DWP 스펙](/spec/dwp-specification)과 함께 도입된 Lite 계획 표현 형식을 명시합니다: 실행 불가능한 초안 단계 없이 곧바로 구체화되는, 소규모에서 중간 규모의 경계가 분명한 작업을 위한 계획 포맷입니다. 키워드 MUST, MUST NOT, SHOULD, SHOULD NOT, MAY는 RFC 2119에 기술된 대로 해석됩니다.

## 표현 형식과 라이프사이클

계획은 다음 두 표현 형식 중 하나여야(MUST) 하며, `manifest.json`에 `plan_format`으로 한 번 기록됩니다: **Full**은 `<n>.task_<slug>.md` 아래에 작업당 하나의 파일을 저장합니다; **Lite**는 간결하고 실행 가능한 작업 레코드를 `README.md`에 인라인으로 저장하며, 각 레코드는 안정적인 `{#task-N}` 앵커 뒤에 있습니다. Lite 계획은 부분적이거나 비공식적인 Full 계획이 아닙니다: 모든 작업 레코드는 [작업 구조](/spec/dwp-specification#task-anatomy)가 Full에 대해 정의하는 것과 동일한 규범적 형태로 목표, 변경 표면, 인수 기준, 검증 게이트, 완료 로그를 여전히 담아야(MUST) 합니다.

계획의 상태는 네 가지 축으로 기술되며, 뒤섞이지 않고 독립적으로 추적되어야(MUST) 합니다:

| 축 | 값 | 의미 |
|------|--------|---------|
| 형식 | `lite`, `full` | 작업 레코드가 어디에 있는지 |
| 구체화 | `materializing`, `ready`, `promoting` | 계획 폴더가 작성 중인지, 완료되었는지, 승격 도중인지 |
| 승인 | `pending`, `approved`, `pre_approved` | 사람이 계획을 검토했는지, 신뢰 모드가 사전 승인했는지 |
| 실행 | `pending`, `in_progress`, `blocked`, `completed` | 작업별 및 전체 진행 상황 |

안내형 create는 **검토 가능한 대기 중 제안**을 작성합니다 — Lite든 Full이든, 이미 진짜 계획이며 버려질 초안이 아닙니다. 신뢰 모드는 **준비 완료되고 사전 승인된** 계획을 곧바로 구체화하고 즉시 제어를 돌려줍니다. `create`와 승격은 제품 작업을 결코 실행하지 않습니다; 명시적인 `execute` 또는 `resume` 요청은 계획의 현재 준비된 범위를 승인하며, 작업 시작 전에 그 승인을 기록해야(MUST) 합니다. 그 요청이 없으면 `pending` 제안은 실행 가능하지 않으며, 진행 중인 미해결 승격은 제품 작업 전에 먼저 복구되어야(MUST) 합니다.

## 생성과 형식 선택

`/dwp-create`는 대규모 작업뿐 아니라 모든 규모에서 계획 의도를 충족합니다. 규모가 작고 경계가 분명한 작업 — 단일 관심사, 대략 한 번의 작업, 조율 불필요 — 은 Lite 계획의 대상입니다; 실질적 범위를 가진 다단계 작업은 [비례적 엄격도](/spec/dwp-specification#proportional-rigor)에 따라 기본적으로 Full이 됩니다. 직접 편집, 설명, 상태 확인, 재개, 또는 명시적인 계획 불필요 요청은 각자의 경로를 유지하며 계획이 되는 일은 결코 없습니다.

`lite`와 `full`은 **형식 선호**입니다; `trust`와 `auto`는 별개의 **상호작용 옵션**이며, 두 종류의 옵션 모두 요청의 어느 쪽 끝에도, 어떤 순서로도 나타날 수 있습니다(MAY):

```text
/dwp-create trust fix the label
/dwp-create lite trust fix the label
/dwp-create fix the label trust lite
/dwp-create fix the migration full trust
```

같은 옵션을 반복하는 것은 멱등적입니다; `lite`와 `full`을 함께 요청하는 것은 오류입니다. `--`는 옵션 파싱을 종료합니다.

형식 선호가 주어지지 않으면, `create`는 하나를 추천하고 이유를 설명합니다. 명시적인 **Full** 요청은 항상 우선합니다. 명시적인 **Lite** 요청은 그 작업의 요건이나 검증 게이트가 간결한 인라인 레코드에 담기지 않는 경우를 제외하고 받아들여집니다 — 그 경우 `create`는 왜 대신 Full이 필요한지 기록합니다. 그 선택은 관찰된 범위, 의존성, 필요한 지시 세부 사항, 그리고 알려지지 않은 요소들을 선택의 근거로 기록해야(MUST) 합니다 — 이는 감사 가능한 판단이지, 모든 모델이나 에이전트에서 성립하는 보장이 아닙니다.

## 승격과 호환성

Lite 계획은 `/dwp-refine promote {plan_name}`을 통해 언제든 Full로 **승격**되어도(MAY) 됩니다(참고: [dwp-refine](/kit/dwp-refine)). 승격은 **표현 형식에만 관련**됩니다: 그것은 의도를 기록하고, 목적지 작업 파일을 작성하고, Lite 레코드가 담고 있던 모든 요건과 게이트가 여전히 커버되는지 검증하고, 권위 있는 사본을 인라인 README 레코드에서 작업 파일로 전환한 다음, 진행 중 마커를 지웁니다. 승격 마커가 설정되어 있는 동안 `execute`와 `resume`은 진행을 거부해야(MUST) 합니다. 이미 기록된 작업 ID와 완료 증거는 승격에 의해 다시 쓰여서는 안 됩니다(MUST NOT); 승격 중에 발견된 새로운 범위는 대신 `refine`을 거치며 그것이 영향을 미치는 증거만 무효화합니다.

승격은 반대 방향으로 자동으로 실행되는 일이 결코 없습니다: Full 계획이 조용히 Lite로 축소되지 않습니다. 이전 스펙 버전에서 작성된 계획 — `plan_format` 필드가 전혀 없는 v1 Full 계획을 포함 — 은 기록된 형태를 그대로 유지하며 적합한 상태로 남습니다; `refine` 세션이 의도적으로 그것을 마이그레이션할 수(MAY) 있지만, 암묵적으로 그렇게 하는 장치는 없습니다.

`manifest.json`의 `plan_format`은 한 번 작성되면 불변입니다; 승격은 `state.json`의 `format`을 변경하고 그 `promotion` 마커를 지우며, 매니페스트를 다시 쓰는 일은 결코 없습니다. 정확한 `plan_format`, `format`, `materialization`, `approval`, `promotion`, `locator` 필드와 그 v2 스키마 URL은 [계획 상태](/spec/plan-state)를 참고하십시오.
