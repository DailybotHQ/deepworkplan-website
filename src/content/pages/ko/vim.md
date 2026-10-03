---
title: "DeepWorkPlan Vim"
description: "Deep Work Plan의 터미널 에디터. 명령 인덱스, 플랜 브라우저, Markdown 뷰어를 갖춘 Neovim 0.12+ 설정."
lastUpdated: 2026-10-03
---

## 소개

터미널에서 일하는 사람과 코딩 에이전트를 위한 Neovim 설정 — Deep Work Plans, 문서, 명령 인덱스가 키 입력 한 번 거리에 있습니다.

## 설치

한 줄의 명령으로 DeepWorkPlan Vim을 Neovim 설정으로 설치합니다. 설치 프로그램은 무엇을 할지 설명하고, 기존 설정을 건드리기 전에 묻습니다.

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

동의가 먼저입니다. 기존 Neovim 설정은 명시적인 승인 없이는 절대 덮어쓰지 않습니다. 설치 프로그램은 중단하고 수동 경로를 안내합니다.

Windows에서는 한 줄 명령이 적용되지 않으며, 리포지토리 README에 수동 경로가 문서화되어 있습니다. [Windows 설치 경로](https://github.com/DailybotHQ/deepworkplan-vim#install-host)

## 하는 일

다섯 가지 기능, 의도적으로 좁게 한정되어 있습니다. 각 기능은 생성된 명령 인덱스에서 확인할 수 있는 키 바인딩에 대응합니다.

| 기능 | 설명 | 매핑 |
|---|---|---|
| 생성형 명령 인덱스 | 명령 인덱스는 활성 설정에서 생성되므로 키 바인딩 목록이 항상 최신 상태입니다. | `SPC h h` |
| VS Code식 제스처 | 그래픽 에디터에서 다듬어진 편집 제스처: 전체 선택과 시스템 클립보드로 복사. | `<C-a>`, `y`, `<leader>y` |
| Deep Work Plan 브라우저 | 리포지토리의 플랜을 탐색하는 패널 — 에디터를 떠나지 않고도 플랜, 작업, 검증 게이트를 읽을 수 있습니다. | `SPC P` |
| Markdown 뷰어 | Markdown을 브라우저에서 미리 보거나 버퍼에서 렌더링합니다 — 문서와 플랜이 일이 일어나는 곳에 머뭅니다. | `SPC m p`, `SPC m r` |
| 한 줄 설치 프로그램 | macOS와 Linux용 자체 완결 설치 프로그램으로, Windows용으로는 문서화된 수동 경로를 제공합니다. | — |

## 요구 사항

- Neovim 0.12 이상, Lua(lua, lua5.4 또는 luajit) 사용 가능
- macOS와 Linux. Windows는 문서화된 수동 경로로 지원됩니다
- GPL-3.0 라이선스 — 사용, 연구, 수정의 자유

## 관련 자료

- [키트 애드온 문서 읽기](/kit/vim)
- [소스 리포지토리 보기](https://github.com/DailybotHQ/deepworkplan-vim)
- DeepWorkPlan Vim을 설치하고 Neovim을 열어, 에이전트와 같은 터미널에서 Deep Work Plans를 읽으세요.
