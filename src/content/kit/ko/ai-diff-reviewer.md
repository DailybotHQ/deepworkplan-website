---
title: AI Diff Reviewer
description: "표준 2.3.0부터 모든 DWP Final Review에 포함되는 필수 로컬 리뷰(온보딩이 설치), Flow B CI 게이트(v2), 공유 extension 파일, apply-review 컴패니언은 선택적으로 유지됩니다."
kind: addon
lang: ko
order: 5
---

# AI Diff Reviewer 애드온

Deep Work Plan 실행을 **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**(마켓플레이스 목록 **"AI Diff Reviewer"**, 현재 버전 **v2.0.1**)에 연결하여, 필수 **Final Review**의 보안 점검이 구조화된 로컬 검토 — 판정, 결과 표, 심각도 — 를 실행하도록 하고, Flow B를 선택하면 모든 풀 리퀘스트를 CI에서 동일한 검토로 게이트할 수 있습니다. 표준 2.3.0부터 **로컬 리뷰는 기준선의 일부**입니다. 온보딩이 이를 설치하고 모든 Final Review가 이를 실행합니다. 옵트인인 것은 CI 표면뿐입니다.

벤더 중립으로 남는 것은 실제로 중요한 경계입니다. 이 리뷰어는 개발자 **자신의** 코딩 에이전트가 실행하는 MIT 라이선스의 태그 고정 스킬입니다 — 어떤 Deep Work Plan 흐름도 상업 서비스, CI 공급자 또는 시크릿을 요구하지 않습니다. Flow A(로컬 전용)는 온보딩된 모든 저장소가 받는 기준선이고, Flow B(CI Action)는 명시적으로 제안되며 요청 없이 설치되는 일이 결코 없습니다. 개발자는 로컬 리뷰어를 거절할 수 있습니다. 거절은 선언된 예외로 기록되며, 설치될 때까지 `verify`는 그 지점에서 저장소를 비적합으로 보고합니다.

## 사용 시기

| 신호 | 조치 |
|--------|--------|
| 온보딩된 모든 저장소 | 온보딩 7a 단계에서 **Flow A가 설치됨**(벤더 스킬 + `.review/extension.md`); 표적 하니스 업그레이드가 이전에 온보딩된 저장소에 이를 추가 |
| 팀이 구조화된 결과가 있는 CI PR 병합 게이트를 원함 | **Flow B 제안** — 명시적 옵트인, 절대 기본값이 아님 |
| 개인 또는 실험적 저장소; 로컬 검토로 충분 | **Flow A 유지** — 기준선은 완전합니다 |

## 두 가지 채택 플로우

| 플로우 | 제공 내용 |
|------|----------------|
| **A — 로컬 전용(기준선)** | 벤더 관리 스킬 + 필수 `.review/extension.md`(`generate-extension` 경유). 모든 Final Review의 보안 점검 안에서 로컬 리뷰를 실행. GitHub Actions 워크플로우 없음. |
| **B — 이중 서피스** | Flow A에 추가로 `setup`이 `.github/workflows/pr-review.yml`(Action `@v2`)을 작성. 로컬 및 CI에 동일한 확장 파일 사용. CI가 결과를 게시한 후 선택적 `apply-review` 컴패니언 사용 가능. |

로컬 리뷰 감지에는 다음 중 하나에 **스킬 + 확장 파일**이 필요합니다: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md`, 또는 `.github/ai-pr-reviewer/extension.md`. 스킬만으로는 충분하지 않습니다.

## 이 애드온이 연결하는 내용(의도적으로 제한)

DWP 애드온은 리뷰어를 **재발명하지 않습니다**. 설치, 방법론, CI 마법사, 확장 작성, PR 초안 작성, CI 후 워크스루를 업스트림 스킬의 5개 서브 스킬(부모 기본 플로우, `generate-extension`, `setup`, `open-pr`, `apply-review`)에 위임합니다.

### 필수 로컬 리뷰

`create`가 모든 Final Review의 보안 점검에 로컬 리뷰 단계를 추가하고 `execute`가 이를 실행합니다. 출력은 플랜 로컬 `analysis_results/SECURITY_REVIEW.md`(플랜 자체 폴더 안에 있으며 저장소 루트가 아님)의 `## AI Diff Reviewer local review` 아래에 추가됩니다.

- **리뷰어 누락 — 기록됨, 절대 조용히 건너뜀 없음:** 누락된 스킬이나 확장은 `local reviewer not installed` 발견 사항이 됩니다. Final Review는 스킬이 있을 때 로컬 패스를 실행하고, 없을 때는 발견 사항을 완료 보고로 전달합니다 — 설치는 온보딩 동의 또는 명시적 애드온 호출에 속하며 절대 깜짝 부트스트랩이 아닙니다.
- **소프트 실패(호출만):** 시작할 수 있었지만 오류가 난 검토 → 한 번 경고하고 기록한 뒤 계속; 그 누락으로 작업을 실패시키지 않음.
- **완료된 패스 후 게이트:** `critical` 결과는 수정되거나 명시적으로 수락될 때까지 Final Review 완료를 계속 차단합니다. `warning` / `info`는 문서화되지만 차단하지 않습니다.
- **Flow A는 CI 시크릿이 필요 없습니다.** 설정되지 않은 `CURSOR_API_KEY`가 로컬 패스를 억제해서는 안 됩니다.

### Flow B CI 게이트(선택적)

Action `DailybotHQ/ai-diff-reviewer@v2`, 일반적으로 레이블 게이트(`ready`), 브랜치 보호를 위한 안정적으로 명명된 **AI review gate** 작업, 선택적 건너뜀 레이블 `skip-review-label: skip-ai-review`. 공유 `prompt.md` + 확장으로 방법론 및 심각도 정렬; 반복 인식 검토에서 CI 2 라운드 이상이 더 짧을 수 있고 로컬 패스는 완전하게 유지됩니다.

### 선택적 `apply-review` 컴패니언

CI가 검토를 게시한 후 개발자는 `execute` 중에 `apply-review`를 호출하여 결과를 하나씩(적용 / 연기 / 건너뜀) 동의하에 검토할 수 있습니다. 기본적으로 읽기 전용; 플랜 작업 파일이 아님(필수 최종 작업 순서를 깨트림).

## 동작

- **Flow A가 기준선; Flow B는 물어보고 결정, 절대 추측하지 않음.** 요청 없이 워크플로우를 설치하는 것은 Flow A에 머무는 것보다 더 큰 영향을 줍니다.
- **조정하고, 덮어쓰지 않음.** 기존 스킬, 확장, 또는 `pr-review.yml`은 보존; 빈틈만 채움.
- **인증 연기.** CI의 프로바이더 시크릿은 메인테이너가 구성; 이 애드온은 자격 증명을 저장하지 않음.
- **벤더 중립.** 상업 서비스, CI 공급자, 시크릿이 결코 필요하지 않음; 프로바이더에 닿는 유일한 조각은 CI 표면입니다.

## 참고

표준 2.3.0부터 로컬 리뷰는 필수; CI 표면은 선택적. 업스트림 스킬: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). 스펙 페이지: [Add-ons](/spec/addons).
