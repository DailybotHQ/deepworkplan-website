---
title: Devcontainer
description: "devcontainer-kit 기반 선택형 애드온: 템플릿 하나로 리포지토리별 개발 컨테이너, 에이전트는 ak로, Herdr 양방향, SSH 키 없음."
kind: addon
lang: ko
order: 1
---

# Devcontainer 애드온

사람, 편집기, 코딩 에이전트 모두가 사용할 수 있는, 재현 가능하고 격리된 개발 컨테이너를 리포지토리에 제공합니다. **DWP v7**(팩 `v7.1.4`)에서 이 애드온은 Deep Work Plan 없이도 동작하는 MIT 제품인 [**devcontainer-kit**](https://github.com/DailybotHQ/devcontainer-kit)을 통합합니다. 선택형이며, 리포지토리는 이것 없이도 완전히 적합합니다.

## devcontainer-kit이 제공하는 것

- **템플릿.** [Dev Containers](https://containers.dev) 사양을 기반으로 하며, `dck init`이 하나의 고정된 레이아웃으로 리포지토리에 렌더링합니다: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml`, `dev.sh`. 나중에 다시 실행하면 조정할 뿐 여러분의 수정 사항을 결코 덮어쓰지 않습니다. 기존 파일에 대한 모든 변경은 먼저 표시되며 동의가 필요합니다.
- **리포지토리 자체의 컨테이너.** Dockerfile은 다이제스트로 고정된 런타임 공식 이미지 — `node-24`, `python-3.13` 또는 `debian` — 에서 시작하며, 키트의 빌드 단계를 `docker/local/<service>/dck/`에 복사합니다. 공유 베이스 이미지는 전혀 사용하지 않습니다.
- **`dev.sh`와 `dck`.** `bash dev.sh up`은 일반 터미널에서 컨테이너를 빌드하고 시작하고 연결합니다. `shell`, `rebuild`, `doctor` 등 나머지 명령은 VS Code나 Cursor가 있든 없든 동작합니다.
- **Herdr 양방향.** 호스트의 [Herdr](https://herdr.dev)는 루프백 전용 SSH 서버를 통해 각 컨테이너를 하나의 머신으로 연결하며, 컨테이너는 표준 사이드바(Home, Editor, Development, Agents)와 함께 열립니다. 컨테이너 안에서는 [herdr-peers](/kit/herdr)를 통해 에이전트가 호스트와 다른 컨테이너의 에이전트에게 질문할 수 있습니다.
- **`dck-dockerfile` 스킬.** 에이전트가 요청에 따라 리포지토리의 컨테이너를 생성하거나 다시 생성하고, 실제 빌드로 이를 증명합니다.

## 설치

```bash
git clone --branch v0.2.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

요구 사항: Linux 또는 macOS 호스트의 `bash` 3.2 이상과 `python3` 3.11 이상, 그리고 컨테이너 명령을 위한 Docker와 Compose v2. 릴리스는 해당 `SHA256SUMS` 자산으로 검증하세요. `v0.2.2`에 고정하세요. `v0.2.0`은 지원되지 않습니다.

| 항목 | 값 |
|---|---|
| 제품 | `DailybotHQ/devcontainer-kit`, 태그 `v0.2.2`, 인터페이스 2 |
| 레지스트리 키 | `.dwp/config.json`의 `devcontainer` |
| 리포지토리별 설정 | `.devcontainer/dck.toml` |
| 감지 | `dck doctor --json` |

## 레이어

모든 컨테이너에는 개발 도구 — git, gh, ripgrep, SSH 서버, Herdr, herdr-peers — 가 들어 있으며, 비밀 값은 없습니다. 나머지는 `dck.toml`에서 선택하는 레이어입니다:

| 레이어 | 기본값 | 추가되는 것 |
|---|---|---|
| `agents` | 꺼짐 | 검증된 릴리스에서 가져온 [coding-agents-kit](/kit/agentkit)과 여러분이 나열한 CLI. 각 CLI는 자체 영속 볼륨을 가지며, `classic`(`claudex`, `codexx`, …)과 `providers`(`claude-glm`, `codex-azure`, …) 프리셋이 함께 제공됩니다. 에이전트는 기본적으로 자율 모드로 실행됩니다 — 컨테이너가 곧 샌드박스입니다. 옵트아웃: 서비스 `.env`의 `AGENTKIT_PERMISSIONS=ask`. |
| `editor` | 켜짐 | 태그로 고정된 [DeepWorkPlan Vim](/kit/vim)이 포함된 Neovim. 끄면 일반 편집기가 제공됩니다. |
| `dailybot` | 꺼짐 | dailybot 애드온을 위한 Dailybot CLI. |

로그인, `gh`, Herdr 설정, git 신원 정보는 `bash dev.sh rebuild` 후에도 유지됩니다.

## 보안 기본값

- 공개되는 모든 포트는 `dck.toml`이 `bind`를 설정하지 않는 한 `127.0.0.1`에 바인딩됩니다.
- SSH를 통한 git은 호스트의 SSH 에이전트를 거칩니다 — 그 소켓을 사용하며, 키 파일이나 마운트된 `~/.ssh` 또는 `~/.gitconfig`는 결코 사용하지 않습니다. git 신원 정보는 `dck setup`이 채우는 `DCK_GIT_*` 값에서 가져옵니다.
- SSH 호스트 키는 실행 시점에 프로젝트별 볼륨에 생성되며, 결코 이미지에 구워 넣지 않습니다. 서버는 공개 키만 받아들이며, root 로그인과 비밀번호를 허용하지 않습니다.
- 템플릿은 `cap_add`, `privileged` 모드, Docker 소켓 중 어느 것도 추가하지 않습니다.
- 모든 다운로드는 버전으로 고정되고 체크섬으로 검증됩니다. 베이스 이미지는 다이제스트로 고정됩니다.
- 한 컨테이너의 에이전트가 다른 컨테이너에 접근할 수 있게 하는 Herdr 메시는 기본적으로 켜져 있으며, 이를 끄는 방법은 키트의 위협 모델에 문서화되어 있습니다.

## 참고

선택형이며 결코 필수가 아닙니다. 리포지토리는 선택적 애드온이 하나도 없어도 완전히 적합합니다. v0.2는 Linux와 macOS 호스트를 지원하며, 컨테이너 간 메시에는 Docker Desktop이 필요합니다.
