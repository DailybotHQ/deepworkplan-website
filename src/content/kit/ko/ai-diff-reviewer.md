---
title: AI Diff Reviewer
description: "선택적 DWP 애드온: 로컬 AI Diff Reviewer 패스로 보안 검토 강화, 선택적 Flow B CI 병합 게이트(v2), 공유 확장 파일, apply-review 컴패니언."
kind: addon
lang: ko
order: 5
---

# AI Diff Reviewer 애드온

Deep Work Plan 실행을 **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**（마켓플레이스 목록 **"AI Diff Reviewer"**, 현재 버전 **v2.0.0**）에 연결하여 필수 최종 작업인 **보안 검토**에 구조화된 로컬 검토 — 판정, 결과 표, 심각도 — 를 추가합니다. Flow B를 선택하면 모든 풀 리퀘스트를 CI에서 동일한 검토로 게이트할 수 있습니다. **선택적** 애드온으로 AI-first 적합성에는 결코 필요하지 않습니다.

Deep Work Plan의 핵심 방법론은 AI Diff Reviewer에 대한 의존성이 **제로**입니다. 애드온이 없는 저장소도 완전히 적합합니다. 개발자나 팀이 구조화된 검토 품질을 원할 때만 이 애드온을 제공하세요. 모든 사람에게 자동으로 설치하지 마세요. 항상 Flow A와 Flow B 중 무엇을 원하는지 확인하세요 — 기본값을 가정하지 마세요.

## 사용 시기

| 신호 | 조치 |
|--------|--------|
| 팀이 구조화된 결과가 있는 CI PR 병합 게이트를 원함 | 온보딩 시 **Flow B 권장** |
| 개인 또는 실험적 저장소; 로컬 사전 푸시 검토로 충분 | **Flow A 제공** |
| 추가 검토 면에 대한 의향이 없음 | **건너뜀** — 기본 보안 검토는 계속 적용 |

## 두 가지 채택 플로우

| 플로우 | 제공 내용 |
|------|----------------|
| **A — 로컬 전용** | 벤더 관리 스킬 + 필수 `.review/extension.md`（`generate-extension` 경유）. 로컬 패스로 보안 검토 강화. GitHub Actions 워크플로우 없음. |
| **B — 이중 서피스** | Flow A에 추가로 `setup`이 `.github/workflows/pr-review.yml`（Action `@v2`）을 작성. 로컬 및 CI에 동일한 확장 파일 사용. CI가 결과를 게시한 후 선택적 `apply-review` 컴패니언 사용 가능. |

보안 검토 강화 감지에는 다음 중 하나에 **스킬 + 확장 파일**이 필요합니다: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md`, 또는 `.github/ai-pr-reviewer/extension.md`. 스킬만으로는 충분하지 않습니다.

## 이 애드온이 연결하는 내용（의도적으로 제한）

DWP 애드온은 리뷰어를 **재발명하지 않습니다**. 설치, 방법론, CI 마법사, 확장 작성, PR 초안 작성, CI 후 워크스루를 업스트림 스킬의 5개 서브 스킬（부모 기본 플로우, `generate-extension`, `setup`, `open-pr`, `apply-review`）에 위임합니다.

### 보안 검토 강화

감지되면 `create` / `execute`가 필수 보안 검토 작업에 로컬 검토 단계를 추가합니다. 출력은 `analysis_results/SECURITY_REVIEW.md`의 `## AI Diff Reviewer local review` 아래에 추가됩니다.

- **소프트 실패（호출만）:** 스킬 없음, 확장 없음, 또는 호출 오류 → 한 번 경고하고 계속; 이로 인해 작업을 실패시키지 않음.
- **완료된 패스 후 게이트:** `critical` 결과는 수정되거나 명시적으로 수락될 때까지 보안 검토 완료를 계속 차단합니다（기존 SR 계약）. `warning` / `info`는 문서화되지만 차단하지 않습니다.
- **Flow A는 CI 시크릿이 필요 없습니다.** 설정되지 않은 `CURSOR_API_KEY`가 로컬 패스를 억제해서는 안 됩니다.

### Flow B CI 게이트（선택적）

고정된 Action `DailybotHQ/ai-diff-reviewer@v2`, 일반적으로 레이블 게이트（`ready`）, 브랜치 보호를 위한 안정적으로 명명된 **AI review gate** 작업, 선택적 건너뜀 레이블 `skip-review-label: skip-ai-review`. 공유 `prompt.md` + 확장으로 방법론 및 심각도 정렬; 반복 인식 검토에서 CI 2+ 라운드가 더 짧을 수 있고 로컬 패스는 완전하게 유지됩니다.

### 선택적 `apply-review` 컴패니언

CI가 검토를 게시한 후 개발자는 `execute` 중에 `apply-review`를 호출하여 결과를 하나씩（적용 / 연기 / 건너뜀）동의하에 검토할 수 있습니다. 기본적으로 읽기 전용; 플랜 작업 파일이 아님（필수 최종 작업 순서를 깨트림）.

## 동작

- **플로우를 확인; 절대 추측하지 않음.** 요청 없이 워크플로우를 설치하는 것은 Flow A에 머무는 것보다 더 큰 영향을 줍니다.
- **조정하고, 덮어쓰지 않음.** 기존 스킬, 확장, 또는 `pr-review.yml`은 보존; 빈틈만 채움.
- **인증 연기.** CI의 프로바이더 시크릿은 메인테이너가 구성; 이 애드온은 자격 증명을 저장하지 않음.
- **벤더 중립.** 거절해도 완전한 AI-first 저장소가 남습니다.

## 참고

선택적이며 결코 필요하지 않습니다. 업스트림 스킬: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). 스펙 페이지: [Add-ons](/spec/addons).
