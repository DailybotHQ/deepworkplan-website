---
title: Devcontainer
description: "devcontainer-kit 기반 선택형 애드온: dck init 템플릿(Dev Containers), 에이전트 없는 이미지, 컨테이너별 Herdr 머신."
kind: addon
lang: ko
order: 1
---

# Devcontainer 애드온

사람, 편집기, 코딩 에이전트 모두가 사용할 수 있는, 재현 가능하고 격리된 개발 컨테이너를 리포지토리에 제공합니다. **DWP v7**(`v7.0.0`)에서 이 애드온은 Deep Work Plan 없이도 동작하는 MIT 제품인 [**devcontainer-kit**](https://github.com/DailybotHQ/devcontainer-kit)을 통합하며, 팩이 예전에 담고 있던 템플릿을 대체합니다. 선택형이며, 리포지토리는 이것 없이도 완전히 적합합니다.

## devcontainer-kit이 제공하는 것

- **템플릿.** [Dev Containers](https://containers.dev) 사양을 기반으로 하며, `dck init`이 리포지토리에 렌더링합니다: `devcontainer.json`, compose 파일, `docker/local/`. 나중에 다시 실행하면 조정할 뿐 여러분의 수정 사항을 결코 덮어쓰지 않습니다. 기존 파일에 대한 모든 변경은 먼저 표시되며 동의가 필요합니다.
- **`dck`.** 일반 터미널에서 컨테이너를 실행하는 런처입니다 — `setup`, `up`, `shell`, `ssh`, `rebuild`, `doctor` — VS Code나 Cursor가 있든 없든 사용할 수 있습니다.
- **베이스 이미지.** `python-3.13`, `node-24`, `debian`의 세 가지 종류가 있으며, 코딩 에이전트를 **포함하지 않습니다**.
- **엔트리포인트 라이브러리.** 영속 볼륨, SSH, SSH 세션의 환경을 처리하며, 리포지토리마다 손으로 복사하던 엔트리포인트를 대신합니다.
- **Herdr 머신.** 각 컨테이너는 루프백 전용 SSH 서버를 통해 [Herdr](https://herdr.dev)에 참여할 수 있으며, 그 안의 에이전트는 접근 가능한 피어가 됩니다.

## 설치

```bash
git clone --branch v0.1.4 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

요구 사항: Linux 또는 macOS 호스트의 `bash` 3.2 이상과 `python3` 3.11 이상, 그리고 컨테이너 명령을 위한 Docker와 Compose v2. 릴리스는 해당 `SHA256SUMS` 자산으로 검증하세요.

| 항목 | 값 |
|---|---|
| 제품 | `DailybotHQ/devcontainer-kit`, 태그 `v0.1.4`, 인터페이스 1 |
| 레지스트리 키 | `.dwp/config.json`의 `devcontainer` |
| 리포지토리별 설정 | `.devcontainer/dck.toml` |
| 감지 | `dck doctor --json` |

## 레이어는 옵트인

베이스 이미지에는 개발 도구 — git, gh, ripgrep, SSH 서버, Herdr, 그리고 태그로 고정된 DeepWorkPlan Vim이 포함된 Neovim — 가 들어 있으며, 코딩 에이전트도, 보고용 CLI도, 비밀 값도 없습니다. 그 밖의 모든 것은 `dck.toml`에서 켜는 레이어입니다:

| 레이어 | 기본값 | 추가되는 것 |
|---|---|---|
| `agents` | 꺼짐 | [coding-agents-kit](/kit/agentkit)과 여러분이 나열한 CLI를 설치하며, 각 CLI는 자체 영속 볼륨을 갖습니다. 권한 우회 플래그는 설정되지 않습니다. |
| `editor` | 켜짐 | DeepWorkPlan Vim이 포함된 Neovim. 끄면 일반 편집기가 제공됩니다. |

## 보안 기본값

- 공개되는 모든 포트는 `dck.toml`이 `bind`를 설정하지 않는 한 `127.0.0.1`에 바인딩됩니다.
- 호스트에서 SSH 에이전트를 포워딩합니다. 호스트의 개인 키는 결코 컨테이너로 복사되지 않습니다.
- SSH 호스트 키는 실행 시점에 프로젝트별 볼륨에 생성되며, 결코 이미지에 구워 넣지 않습니다. 서버는 공개 키만 받아들이며, root 로그인과 비밀번호를 허용하지 않습니다.
- 템플릿은 `cap_add`, `privileged` 모드, Docker 소켓 중 어느 것도 추가하지 않습니다.
- 베이스 이미지와 도구는 버전으로 고정되고 체크섬으로 검증됩니다. compose는 다이제스트를 확인할 수 있을 때마다 다이제스트로 베이스 이미지를 참조합니다.

## 참고

선택형이며 결코 필수가 아닙니다. 리포지토리는 선택적 애드온이 하나도 없어도 완전히 적합합니다. v0.1은 Linux와 macOS 호스트를 지원합니다.
