---
title: 계획 상태
description: "기계 가독 계획 상태 레이어: manifest.json과 state.json, 게이트 기록, 에피소드 메모리로서의 결과 기록, 조정, 그리고 필요한 시점."
order: 8
lang: ko
section: State
---

# 계획 상태

**버전 5.0.0. 상태: 안정(Stable).** 이 문서는 Deep Work Plan 방법론의 기계 가독 계획 상태 레이어를 명시하며, 이제 DWP 표준 자체의 버전과 맞춰져 있습니다 — 이 재번호 매기기로 인해 기존 요건이 약화되는 일은 없습니다. 이번 개정은 또한 보호된 상태 업데이터, 검증된 계획 발행, 그리고 완료된 계획이 충족해야 하는 증거-진실 규칙(아래 참고)을 문서화합니다. 키워드 MUST, MUST NOT, SHOULD, SHOULD NOT, MAY는 RFC 2119에 기술된 대로 해석됩니다.

두 JSON 산출물 — `manifest.json`(계획의 정적 식별 정보)과 `state.json`(검증 게이트 결과를 포함한 라이브 작업별 실행 상태) — 은 모든 계획이 Markdown 파일과 함께 MAY로 담을 수 있으며, 무인(unattended) 실행(참고: [에이전트 프로토콜](/spec/agent-protocol#execution-profiles))과 git이 없는 에이전트 작업 공간(참고: [아키타입](/spec/archetypes) §3)에서는 MUST로 담아야 합니다.

Markdown 계획은 **사람이 읽는 진실 공급원**으로 남습니다. JSON 레이어는 **파생 프로젝션**입니다. 에이전트가 정의된 프로토콜 지점에서 재생성하고, 직접 손으로 편집하지 않으며, Markdown과 조용히 불일치하도록 놔두지 않습니다. 그 목적은 상호 운용성입니다 — 린팅, 적합성 검사, 디핑, 대시보드, 레지스트리 탐색, 외부 세션 인프라와의 동기화 — 이 중 어느 것도 산문에 기반해서는 안정적으로 구축할 수 없습니다.

## 이것이 존재하는 이유

v1.1까지 계획은 산문 Markdown만이었습니다. 그것은 감사 가능하고 에이전트에 종속되지 않게 유지했지만, 도구가 검증하거나, 디프하거나, 소비할 수 있는 것이 없었습니다: 적합성 게이트 없음, `README.md`와 `PROGRESS.md` 간의 비동기 감지 없음, 데몬이나 클라우드 세션이 산문을 파싱하지 않고 계획 상태를 알 수 있는 방법 없음. v1.2는 Markdown을 격하하지 않고 JSON 프로젝션을 추가합니다 — 프로젝션은 Markdown에서 파생되며, lockfile이 매니페스트에서 파생되는 것과 같은 방식입니다.

## 배치

상태 레이어를 사용하는 계획의 레이아웃은 다음과 같습니다.

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← 사람이 읽는 진실 공급원 (변경 없음)
├── PROGRESS.md          ← 서술 로그 (변경 없음)
├── PROMPTS.md           ← 변경 없음
├── manifest.json        ← 정적 식별 정보 (구체화 시 작성)
├── state.json           ← 라이브 상태 (프로토콜 지점마다 재작성)
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json`은 `create` 흐름이 계획을 구체화할 때 정확히 한 번 작성해야(MUST) 하며, 이후 `PROGRESS.md`에 기록된 스펙 버전 마이그레이션을 제외하고는 변경해서는 안 됩니다(MUST NOT).

`state.json`은 에이전트가 다음 각 프로토콜 지점마다 재작성해야(MUST) 합니다: 계획 구체화(`pending` 모든 작업), 작업 시작(`in_progress`), 각 검증 게이트 실행(게이트 기록 추가 또는 갱신), 작업 완료(`completed`, [DWP 스펙](/spec/dwp-specification#task-completion-protocol)의 작업 완료 프로토콜의 일부로), 계획된 중단 전의 체크포인트, 그리고 `blocked` 정지.

두 파일 모두 원자적으로 작성해야(MUST) 합니다: 같은 디렉터리의 임시 파일에 쓴 다음 대상 파일 위로 이름을 변경합니다. 충돌된 쓰기는 잘린 JSON 파일을 남겨서는 안 됩니다(MUST NOT).

## 레이어가 필요한 시점

- git 리포지토리에서 **대화형(interactive)** 실행의 경우, 상태 레이어는 새 계획에 대해 RECOMMENDED이며 v1.2 이전 계획에 대해 OPTIONAL입니다. 상태 레이어가 없는 계획도 적합한 상태로 유지됩니다.
- **무인(unattended)** 실행의 경우, 상태 레이어는 REQUIRED입니다.
- git이 없는 **에이전트 작업 공간**에서는, 상태 레이어가 REQUIRED입니다: `state.json`이 리포지토리에서 git 로그가 담당하는 복구 정보를 담습니다.

## `manifest.json` — 계획 식별 정보

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v2.json",
  "spec_version": "2.4.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "plan_format": "full",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at`, `task_count`, 그리고 `plan_format`은 REQUIRED입니다.

`archetype`은 `individual`, `orchestrator-hub`, `agent-workspace` 중 하나여야(MUST) 합니다.

`rigor`는 `micro`, `standard`, `deep` 중 하나여야(MUST) 합니다(참고: [비례적 엄격도](/spec/dwp-specification#proportional-rigor)).

`plan_format`은 `lite`, `full` 중 하나여야(MUST) 하며 — 생성 시점에 선택된 표현 형식입니다(참고: [Lite 계획](/spec/lite-plans)). 이는 매니페스트 수준에서 불변입니다: 이후의 Lite에서 Full로의 승격은 `state.json`에 기록되며, 매니페스트를 다시 씀으로써 기록되는 일은 결코 없습니다.

`parent_plan`은 자식 계획을 오케스트레이터 계획에 연결합니다(`{repo}:{plan_name}`, 또는 `null`).

`created_by`는 생성하는 에이전트와 모델을 식별해야(SHOULD) 합니다. 표시 이름 이상의 비밀 값, 토큰, 사용자 식별자를 담아서는 안 됩니다(MUST NOT).

## `state.json` — 라이브 실행 상태

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v2.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "format": "full",
  "materialization": "ready",
  "approval": "approved",
  "promotion": null,
  "tasks": [
    {
      "id": 1,
      "locator": { "kind": "file", "value": "1.task_webhook_endpoint.md" },
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "locator": { "kind": "file", "value": "3.task_retry_queue.md" },
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

Lite 계획의 작업 항목은 별도 파일 대신 `README.md` 안의 작업 앵커를 가리키는 `inline` locator를 사용합니다 — 항목의 나머지 부분(게이트, 결과, 상태)은 똑같이 작동합니다:

```json
{
  "format": "lite",
  "materialization": "ready",
  "approval": "pre_approved",
  "promotion": null,
  "tasks": [
    {
      "id": 2,
      "locator": { "kind": "inline", "value": "#task-2" },
      "title": "Add retry queue",
      "status": "pending",
      "gates": []
    }
  ]
}
```

### format, materialization, approval, promotion

`format`은 `lite`, `full` 중 하나여야(MUST) 하며 매니페스트의 `plan_format`을 반영합니다 — 다만 매니페스트와 달리 여기서는 가변적인데, Lite 계획이 나중에 Full로 승격될 수(MAY) 있기 때문입니다. `materialization`은 `materializing`(계획 폴더가 작성되는 중), `ready`(구체화 완료), 또는 `promoting`(Lite에서 Full로의 승격이 진행 중) 중 하나여야(MUST) 합니다. `approval`은 `pending`, `approved`, `pre_approved` 중 하나여야(MUST) 하며, 이 스키마에서는 OPTIONAL입니다. 그것이 기록되기 이전에 작성된 계획도 여전히 검증을 통과하도록 하기 위해서입니다 — 그것이 없을 때는 README의 `Approval` 행을 그 값으로 취급하고, 둘 다 없으면 `pending`으로 취급합니다. `promotion`은 승격 상황이 아닐 때는 `null`이며, `materialization`이 `promoting`인 동안에는 승격의 의도와 목적지 작업들을 기록하는 객체입니다. 이 필드들이 표현하는 전체 라이프사이클은 [Lite 계획](/spec/lite-plans)을 참고하십시오.

### 작업 항목

모든 작업 — Full 계획에서는 별도의 파일, Lite 계획에서는 인라인 `{#task-N}` 레코드 — 은 `tasks`에 정확히 하나의 항목을 가져야(MUST) 하며, 번호(`id`)와 `locator`로 키를 가집니다. `locator.kind`는 `file`(Full — `value`는 작업의 파일 이름) 또는 `inline`(Lite — `value`는 작업의 앵커, `#task-N`) 중 하나여야(MUST) 합니다.

`status`는 `pending`, `in_progress`, `completed`, `blocked`, `skipped` 중 하나여야(MUST) 합니다. `skipped`는 사용자가 `refine`을 통해 명시적으로 작업을 범위에서 제거했을 때만 유효합니다; `state.json`을 작업을 조용히 건너뛰는 데 사용해서는 안 됩니다(MUST NOT).

`completed` 항목은 `completed_at`을 담아야(MUST) 하며, 계획이 커밋하는 경우 짧은 `commit` 해시도 담아야 합니다 — 이것이 계획과 코드 간의 추적 가능성 링크입니다.

### 게이트 기록

검증 명령의 각 실행은 게이트 기록으로 기록해야(SHOULD) 합니다: `command`, `passes`(불리언), `exit_code`, `last_run`, 그리고 짧은 사람이 읽을 수 있는 `evidence` 문자열(요약 줄 또는 플랜 자체 `analysis_results/`(플랜 자체 폴더 안에 있으며 저장소 루트가 아님) 아래 경로, 전체 명령 출력은 절대 안 됨).

작업은 게이트 기록 중 `passes: false`인 것이 있고 이후 통과 실행이 없는 한 `state.json`에서 `completed`로 표시해서는 안 됩니다(MUST NOT). 게이트 기록은 "증거 없이 완료로 표시하지 않는다"의 기계 등가물입니다 — 조기 완료를 막는 항목별 `passes` 플래그 패턴입니다.

### 에피소드 메모리로서의 결과 기록

`completed` 작업은 `outcome` 기록을 담아야(SHOULD) 합니다: `tried`(시도한 것), `failed`(실패한 것), `worked`(작동한 것), 그리고 자유 형식의 `notes`. 각 항목을 한 줄로 유지합니다.

결과 기록은 완료된 계획을 검색 가능한 **에피소드 메모리**로 만듭니다: 에이전트(또는 메모리 인덱싱 플랫폼)가 나중에 문제가 해결되었다는 것만이 아니라 어떻게 해결되었는지를 회상할 수 있습니다. 결과 기록은 작업 안의 스킬 처분과 Final Review의 스킬 조정에 피드되며, 스킬 조정은 패턴을 발굴할 때 결과 기록을 읽습니다. Hermes와 같이 에이전트 메모리를 인덱싱하는 플랫폼에서, `state.json`의 결과 기록은 완료된 계획을 미래 세션에서 직접 검색 가능하게 만듭니다.

### 체크포인트와 차단 상태

`checkpoint`는 현재 작업 내 가장 세밀한 재개 지점을 기록합니다: 작업 `id`, 자유 형식의 `step` 위치 지정자, 타임스탬프, 그리고 한 줄 메모. 에이전트는 작업 내에서 일시 중지할 때마다 업데이트해야(SHOULD) 하며, 무인 모드에서 계획된 중단 전에는 반드시 업데이트해야(MUST) 합니다.

`blocked`는 `null` 또는 `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`입니다. 정지 조건에 도달한 무인 에이전트는 정지하기 전에 `blocked`를 채워야(MUST) 합니다 — 이것이 데몬의 다음 하트비트나 사람이 계획이 왜 멈췄는지를 아는 방법입니다.

## 프로젝션과 조정

Markdown은 모든 불일치에서 이겨야(MUST) 합니다. `state.json`이 작업 4를 `completed`로 표시하지만 계획 README가 체크 해제된 박스를 보여준다면, 상태 파일은 낡은 것입니다.

재개하는 에이전트는 계속하기 전에 README 체크박스 목록을 `state.json`과 비교해야(MUST) 합니다. 비동기 시에는 Markdown으로부터(그리고 사용 가능한 경우 git 로그로부터) `state.json`을 재생성하고, `PROGRESS.md`에 조정을 기록한 다음에만 진행해야(MUST) 합니다.

`verify` 하위 스킬은 비동기를 적합성 발견으로 취급해야(MUST) 합니다: 어떤 작업이 어떤 방향으로 불일치하는지 보고합니다.

실행 에이전트 이외의 도구는 두 JSON 파일을 읽기 전용으로 취급해야(MUST) 합니다.

## 보호된 상태 업데이트

일상적인 진행 기록은 전체 파일을 다시 쓰는 대신 배포된 표적 업데이터를 거칩니다. 이 업데이터는 잘못된 형식의 상태를 즉시 거부하며, 비어 있지 않은 게이트 증거가 첨부되지 않으면 작업을 `completed`로 표시하기를 거부합니다 — 자체 출력에 파이프 문자가 포함된 명령을 위해 `--gate-json` 형식을 사용할 수 있으며, 업데이터는 위에서 설명한 것과 동일한 닫힌 게이트 객체를 받아들입니다. 재시도는 자기 자신의 명령만 대체합니다; 다른 명령은 자신만의 별도 기록을 유지합니다. `--block-reason`은 차단 요인을 기록합니다; `--resolve-blocker`는 오직 현재 작업의 차단 요인만 해결하며, 다른 작업의 것은 결코 해결하지 않습니다. 건너뛴 작업은 결코 계획을 `completed`로 만들 수 없습니다. `--reopen-reason`은 호출자가 `refine`을 통해 계획을 수정하려는 의도를 기록합니다 — 그 수정과 그것이 무효화하는 모든 증거는 먼저 작업 로그에 기록되어야(MUST) 합니다. `--expected-sha256`은 그 이후로 진행된 상태 스냅샷에 대한 쓰기를 거부합니다. 협조적인 `.lock` 디렉터리가 동시 작성자를 직렬화합니다; 충돌한 작성자의 잠금은 제거하기 전에 반드시 점검해야(MUST) 하며, 잠금을 완전히 우회하는 편집기에 대한 보호는 전혀 주장되지 않습니다. 이 기록들은 결과를 단언할 뿐입니다 — 그 자체로 명령이 실행되었다는 것이나 그 출력이 의미적으로 받아들여졌다는 것을 증명하지는 않습니다.

## 검증된 계획 발행

완료를 선언하기 전에, 완성된 작업 로그(각각 자신의 **스킬 처분(Skills disposition)**을, 그리고 Final Review에서는 자신의 **문서화 결정(Documentation decision)**을 담고 있음), README 색인, 그리고 `PROGRESS.md`는 실제로 얻어진 출처와 인수 결과로부터 작성되어야(MUST) 합니다. 계획의 마지막 작업은 그런 다음 배포된 최종화기(finalizer)를 통해 마감됩니다: 그 종단 전환은 상태를 쓰기 전에 완료 후보를 모든 계획 산출물에 대해 검증하고, 이후 파일들을 검증하며, `analysis_results/FINALIZATION.json` 영수증을 기록합니다. 지어낸 통과 게이트는 이 전환을 뒷받침해서는 안 됩니다(MUST NOT) — 이 영수증은 실제로 무엇이 점검되었는지에 대한 외부 증거이며, 결코 그 자체의 전제 조건이 아닙니다. 그다음 `bash ../verify/conformance.sh --plan PLAN_name`이 디스크상의 실제 산출물에 대해 실행됩니다.

중단된 발행은 `.finalizing.json` 마커를 그대로 남깁니다; 증거가 점검되고 복구 도우미가 동일한 후보에 대해 성공할 때까지 일반 검증은 실패합니다 — 어떤 것도 가정에 의해 발행을 재개하지 않습니다. 오래된 협조적 잠금은 제거하기 전에 어떤 작성자도 여전히 활성 상태가 아님을 확인해야 합니다. 이 레이어의 어떤 것도 커밋하거나, 푸시하거나, 저장된 게이트 명령을 실행하거나, 계획의 마크다운을 조용히 수리하지 않습니다. Python 인터프리터가 없으면 `completed`가 아니라 `UNVERIFIED`가 산출됩니다.

## 증거 진실성과 수정

작업의 범위, 인수 기준, 또는 유예에 대한 모든 변경은 하나의 영속적인 수정 기록을 담습니다: 원래 기준 그대로의 문구, 관찰된 것, 처분, 이유, 그 뒤의 권한(사용자, 개발자, 또는 증거), 영향받은 작업들, 그리고 어떤 증거가 무효화되었거나 보존되었는지. 수정은 추가될 뿐 결코 소급 적용되지 않습니다; `manifest.json`은 생성 출처를 그대로 유지하며 변경된 실시간 범위에 맞추기 위해 다시 쓰이는 일은 결코 없습니다.

다섯 가지 증거 상태가 작업 기록이 무엇에 대해 마감될 수 있는지를 설명합니다:

- **완료된 조사(Completed investigation)** — 실제로 기록된 작업; 이는 그것을 명명하는 개정된 기준에 대해서만 작업을 마감하며, 기록된 그대로의 원래 기준에 대해서는 결코 마감하지 않습니다.
- **미실행 시나리오(Unexecuted scenario)** — 수행되지 않은 것으로 기록됨; 어떤 시대에서도 통과 증거로 기여하지 않습니다.
- **유예된 요건(Deferred requirement)** — 기준이 기록된 권한과 함께 명명된 목적지 작업으로 이동합니다; 오직 그 수정만이 원천을 마감합니다.
- **실패한 게이트(Failed gate)** — 동일한 인수 의도가 다시 실행되어 통과할 때까지 실패 상태로 남습니다; 재시도는 자기 자신의 명령만 대체합니다.
- **달성된 제품 결과(Achieved product outcome)** — 기록된 그대로의 기준이 자체 게이트로 검증됨; 작업을 변경 없이 완료시키는 유일한 상태입니다.

집행은 기록이 허용하는 곳에서는 기계적입니다. "refine에 의해 무효화됨"으로 표시된 게이트 증거는 보존된 이력일 뿐 결코 통과 증거가 아니며, 여전히 그것에 의존하는 완료된 작업은 검사기에 의해 보고됩니다. 자체 텍스트가 점검이 결코 실행되지 않았음을 인정하는 통과 기록(예: "결코 진입하지 않음", "실행되지 않음", 또는 "측정할 수 없음")은 모순이며 동일한 방식으로 보고됩니다 — 자신의 로그가 여전히 `Status: pending`으로 읽히는 완료 상태의 작업도 마찬가지입니다. 이를 넘어서는 서술적 모순 — 자신의 체크리스트와 결론이 어긋나는 보고서 — 은 사람 검토자를 필요로 합니다; 검사기는 산문이 의미하는 바가 아니라 기록이 말하는 바를 보고합니다. 사용자는 기록된 권한과 함께 한정된 예외를 명시적으로 수락할 수(MAY) 있습니다; 무인 사전 승인은 결코 핵심 목표를 포기하는 포괄적 허가가 아니며, 충족할 수 없는 필수 기준은 완료된 작업이 아니라 차단 요인입니다.

## 스키마 버전 관리

두 스키마 모두 URL로 버전이 관리됩니다. 추가 필드는 버전 내에서 허용됩니다; 필드의 이름 변경 또는 타입 변경은 새로운 스키마 버전과 스펙 변경 로그의 마이그레이션 메모가 필요합니다. 이번 개정에서는 두 스키마 모두에 `/v2.json`을 도입합니다: 작업 항목의 `file` 필드는 타입이 있는 `locator`(`{"kind": "file" | "inline", "value": ...}`)가 되고, 매니페스트는 `plan_format`을 얻으며, 상태 파일은 `format`, `materialization`, `approval`, `promotion`을 얻습니다 — 이는 모두 합쳐 Lite 계획에 필요한 필드입니다(참고: [Lite 계획](/spec/lite-plans)). `/v1.json` 매니페스트와 상태 파일은 계속 유효하며 조용히 v2로 재작성되는 일은 결코 없습니다; `refine` 세션이 의도적으로 마이그레이션할 수(MAY) 있습니다. 매니페스트의 `spec_version` 필드는 계획이 생성된 DWP 스펙 버전을 고정합니다; 설치된 스펙보다 최신 계획을 만난 에이전트는 추측하는 대신 그렇다고 알려야(SHOULD) 합니다.
