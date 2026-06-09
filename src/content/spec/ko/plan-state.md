---
title: 계획 상태
description: "기계 가독 계획 상태 레이어: manifest.json과 state.json, 게이트 기록, 에피소드 메모리로서의 결과 기록, 조정, 그리고 필요한 시점."
order: 7
lang: ko
section: State
---

# 계획 상태

**버전 1.0. 상태: 안정(Stable).** 이 문서는 Deep Work Plan 방법론의 기계 가독 계획 상태 레이어를 명시합니다. 키워드 MUST, MUST NOT, SHOULD, SHOULD NOT, MAY는 RFC 2119에 기술된 대로 해석됩니다.

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

`state.json`은 에이전트가 다음 각 프로토콜 지점마다 재작성해야(MUST) 합니다: 계획 구체화(`pending` 모든 작업), 작업 시작(`in_progress`), 각 검증 게이트 실행(게이트 기록 추가 또는 갱신), 작업 완료(`completed`, [DWP 스펙](/spec/dwp-specification#task-completion-protocol)의 작업 완료 프로토콜의 일부로).

두 파일 모두 원자적으로 작성해야(MUST) 합니다: 같은 디렉터리의 임시 파일에 쓴 다음 대상 파일 위로 이름을 변경합니다. 충돌된 쓰기는 잘린 JSON 파일을 남겨서는 안 됩니다(MUST NOT).

## 레이어가 필요한 시점

- git 리포지토리에서 **대화형(interactive)** 실행의 경우, 상태 레이어는 새 계획에 대해 RECOMMENDED이며 v1.2 이전 계획에 대해 OPTIONAL입니다. 상태 레이어가 없는 계획도 적합한 상태로 유지됩니다.
- **무인(unattended)** 실행의 경우, 상태 레이어는 REQUIRED입니다.
- git이 없는 **에이전트 작업 공간**에서는, 상태 레이어가 REQUIRED입니다: `state.json`이 리포지토리에서 git 로그가 담당하는 복구 정보를 담습니다.

## `manifest.json` — 계획 식별 정보

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v1.json",
  "spec_version": "2.2.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at`, `task_count`는 REQUIRED입니다.

`archetype`은 `individual`, `orchestrator-hub`, `agent-workspace` 중 하나여야(MUST) 합니다.

`rigor`는 `micro`, `standard`, `deep` 중 하나여야(MUST) 합니다(참고: [비례적 엄격도](/spec/dwp-specification#proportional-rigor)).

`parent_plan`은 자식 계획을 오케스트레이터 계획에 연결합니다(`{repo}:{plan_name}`, 또는 `null`).

`created_by`는 생성하는 에이전트와 모델을 식별해야(SHOULD) 합니다. 표시 이름 이상의 비밀 값, 토큰, 사용자 식별자를 담아서는 안 됩니다(MUST NOT).

## `state.json` — 라이브 실행 상태

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v1.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "tasks": [
    {
      "id": 1,
      "file": "1.task_webhook_endpoint.md",
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
      "file": "3.task_retry_queue.md",
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

### 작업 항목

계획의 모든 작업 파일은 `tasks`에 정확히 하나의 항목을 가져야(MUST) 하며, 번호(`id`)와 파일 이름(`file`)으로 키를 가집니다.

`status`는 `pending`, `in_progress`, `completed`, `blocked`, `skipped` 중 하나여야(MUST) 합니다. `skipped`는 사용자가 `refine`을 통해 명시적으로 작업을 범위에서 제거했을 때만 유효합니다; `state.json`을 작업을 조용히 건너뛰는 데 사용해서는 안 됩니다(MUST NOT).

`completed` 항목은 `completed_at`을 담아야(MUST) 하며, 계획이 커밋하는 경우 짧은 `commit` 해시도 담아야 합니다 — 이것이 계획과 코드 간의 추적 가능성 링크입니다.

### 게이트 기록

검증 명령의 각 실행은 게이트 기록으로 기록해야(SHOULD) 합니다: `command`, `passes`(불리언), `exit_code`, `last_run`, 그리고 짧은 사람이 읽을 수 있는 `evidence` 문자열(요약 줄 또는 `analysis_results/` 아래 경로, 전체 명령 출력은 절대 안 됨).

작업은 게이트 기록 중 `passes: false`인 것이 있고 이후 통과 실행이 없는 한 `state.json`에서 `completed`로 표시해서는 안 됩니다(MUST NOT). 게이트 기록은 "증거 없이 완료로 표시하지 않는다"의 기계 등가물입니다 — 조기 완료를 막는 항목별 `passes` 플래그 패턴입니다.

### 에피소드 메모리로서의 결과 기록

`completed` 작업은 `outcome` 기록을 담아야(SHOULD) 합니다: `tried`(시도한 것), `failed`(실패한 것), `worked`(작동한 것), 그리고 자유 형식의 `notes`. 각 항목을 한 줄로 유지합니다.

결과 기록은 완료된 계획을 검색 가능한 **에피소드 메모리**로 만듭니다: 에이전트(또는 메모리 인덱싱 플랫폼)가 나중에 문제가 해결되었다는 것만이 아니라 어떻게 해결되었는지를 회상할 수 있습니다. 결과 기록은 필수 스킬 및 에이전트 탐색 작업에 피드되며, 이 작업은 패턴을 발굴할 때 결과 기록을 읽어야(SHOULD) 합니다. Hermes와 같이 에이전트 메모리를 인덱싱하는 플랫폼에서, `state.json`의 결과 기록은 완료된 계획을 미래 세션에서 직접 검색 가능하게 만듭니다.

### 체크포인트와 차단 상태

`checkpoint`는 현재 작업 내 가장 세밀한 재개 지점을 기록합니다: 작업 `id`, 자유 형식의 `step` 위치 지정자, 타임스탬프, 그리고 한 줄 메모. 에이전트는 작업 내에서 일시 중지할 때마다 업데이트해야(SHOULD) 하며, 무인 모드에서 계획된 중단 전에는 반드시 업데이트해야(MUST) 합니다.

`blocked`는 `null` 또는 `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`입니다. 정지 조건에 도달한 무인 에이전트는 정지하기 전에 `blocked`를 채워야(MUST) 합니다 — 이것이 데몬의 다음 하트비트나 사람이 계획이 왜 멈췄는지를 아는 방법입니다.

## 프로젝션과 조정

Markdown은 모든 불일치에서 이겨야(MUST) 합니다. `state.json`이 작업 4를 `completed`로 표시하지만 계획 README가 체크 해제된 박스를 보여준다면, 상태 파일은 낡은 것입니다.

재개하는 에이전트는 계속하기 전에 README 체크박스 목록을 `state.json`과 비교해야(MUST) 합니다. 비동기 시에는 Markdown으로부터(그리고 사용 가능한 경우 git 로그로부터) `state.json`을 재생성하고, `PROGRESS.md`에 조정을 기록한 다음에만 진행해야(MUST) 합니다.

`verify` 하위 스킬은 비동기를 적합성 발견으로 취급해야(MUST) 합니다: 어떤 작업이 어떤 방향으로 불일치하는지 보고합니다.

실행 에이전트 이외의 도구는 두 JSON 파일을 읽기 전용으로 취급해야(MUST) 합니다.

## 스키마 버전 관리

두 스키마 모두 URL로 버전이 관리됩니다(`/v1.json`). 추가 필드는 버전 내에서 허용됩니다; 필드의 이름 변경 또는 타입 변경은 `/v2.json`과 스펙 변경 로그의 마이그레이션 메모가 필요합니다. 매니페스트의 `spec_version` 필드는 계획이 생성된 DWP 스펙 버전을 고정합니다; 설치된 스펙보다 최신 계획을 만난 에이전트는 추측하는 대신 그렇다고 알려야(SHOULD) 합니다.
