---
title: DeepWorkPlan Vim
description: "옵트인 DWP 애드온: DeepWorkPlan Vim — DWP 터미널 에디터. 명령 인덱스, 플랜 브라우저, Neovim Markdown 읽기."
kind: addon
lang: ko
order: 6
---

# DeepWorkPlan Vim 애드온

**DeepWorkPlan Vim**은 Deep Work Plan의 터미널 에디터입니다: Neovim 설정 그 자체(저장소 파일이 아니라 에디터 본체)로, 방법론의 작업 면을 키 입력 한 번 거리에 둡니다. kit의 다른 항목이 저장소에 harness를 설치하는 동안, 이 애드온은 사람에게 — 그리고 headless로 Neovim을 구동하는 모든 에이전트에게 — DWP를 기본 언어로 말하는 에디터를 쥐여 줍니다.

**Neovim 0.12 이상**이 필요하고, **macOS와 Linux**에서 동작하며(Windows는 문서화된 수동 경로로 지원), **GPL-3.0**으로 라이선스됩니다 — 사용하고, 연구하고, 수정할 자유가 있습니다.

## 무엇을 더하나

| # | 기능 | 하는 일 | 매핑 |
|---|---------|--------------|---------|
| F1 | **생성형 명령 인덱스** | 에디터 전체를 목록으로: 모든 명령에 매핑과 한 줄 설명을 붙여, 살아 있는 설정에서 생성하므로 인덱스가 에디터에서 어긋날 수 없습니다. | `SPC h h` |
| F2 | **VS Code식 제스처** | 전체 선택, 복사, 클립보드 yank을 근육 기억이 이미 아는 코드에 얹습니다. | `<C-a>`, `y`, `<leader>y` |
| F3 | **Deep Work Plan 브라우저** | 저장소를 이끄는 플랜 — 작업, 검증 게이트, 완료 상태 — 를 에디터를 나가지 않고 엽니다. | `SPC P` |
| F4 | **Markdown 뷰어** | 에이전트가 읽듯 Markdown을 읽습니다: 렌더링된 미리보기, 또는 복사-붙여넣기 충실도를 위한 날 원본. | `SPC m p`, `SPC m r` |
| F5 | **한 줄 설치 프로그램** | macOS와 Linux용 consent-first `install.sh`; 문서화된 수동 경로가 Windows를 맡습니다. | `curl -fsSL https://deepworkplan.com/vim/install.sh \| bash` |

## 설치

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

설치 프로그램은 **consent-first**입니다: 이미 있는 남의 Neovim 설정은 결코 덮어쓰지 않습니다. 터미널 없는 파이프로 흘려보내면 아무것도 건드리지 않고 안내와 함께 중단하고, 대화형으로는 기존 설정을 치우기 전에 묻습니다. 플러그인은 첫 실행 때 headless로 설치됩니다 — 껐다 다시 켜는 수작은 없습니다.

Windows는 `curl | bash` 대상이 아닙니다. 문서화된 수동 경로(winget 더하기 Git Bash, 또는 WSL)는 저장소 README에 있습니다.

전체 모습, 스크린샷 없이 계약 범위로 한정: [/vim 페이지](/vim).

## 언제 손을 뻗나

| 신호 | 행동 |
|--------|--------|
| 개발자가 터미널에 살고 플랜으로 저장소를 구동한다 | 애드온을 **제안**합니다 |
| 플랜 브라우저(`SPC P`)가 상태를 보이게 하는 긴 수명의 DWP 실행 | **권합니다** |
| 개발자의 에디터는 이미 설정돼 있고 협상의 여지가 없다 | **건너뜁니다** — 애드온은 설계상 옵트인입니다 |
| WSL 없는 Windows 전용 팀 | **건너뛰거나** 문서화된 수동 경로를 가리킵니다 |

## 관련 kit 항목

- [Devcontainer](/kit/devcontainer) — 재현 가능한 개발 환경(첫 번째 애드온)
- [Dailybot](/kit/dailybot) — 팀에 보이는 플랜 수명 주기 보고(두 번째 애드온)
- [AI Diff Reviewer](/kit/ai-diff-reviewer) — 플랜 Final Review 동안의 로컬 리뷰(다섯 번째 애드온)
