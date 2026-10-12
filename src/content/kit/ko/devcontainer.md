---
title: Devcontainer
description: "모든 저장소에 재현 가능한 개발 컨테이너를 하나의 템플릿으로. ak로 호스트 계정을 쓰는 에이전트, 양방향 Herdr, SSH 키는 옵트인할 때만."
kind: addon
lang: ko
order: 1
---

# Devcontainer 애드온

사람, 편집기, 코딩 에이전트 모두가 사용할 수 있는, 재현 가능하고 격리된 개발 컨테이너를 리포지토리에 제공합니다. **DWP v7**(팩 `v7.6.2`)에서 이 애드온은 Deep Work Plan 없이도 동작하는 MIT 제품인 [**devcontainer-kit**](https://github.com/DailybotHQ/devcontainer-kit)을 통합합니다. 선택형이며, 리포지토리는 이것 없이도 완전히 적합합니다.

## devcontainer-kit이 제공하는 것

- **템플릿.** [Dev Containers](https://containers.dev) 사양을 기반으로 하며, `dck init`이 하나의 고정된 레이아웃으로 리포지토리에 렌더링합니다: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml`, `dev.sh`. 나중에 다시 실행하면 조정할 뿐 여러분의 수정 사항을 결코 덮어쓰지 않습니다. 기존 파일에 대한 모든 변경은 먼저 표시되며 동의가 필요합니다.
- **리포지토리 자체의 컨테이너.** Dockerfile은 다이제스트로 고정된 런타임 공식 이미지 — `node-24`, `python-3.13` 또는 `debian` — 에서 시작하며, 키트의 빌드 단계를 `docker/local/<service>/dck/`에 복사합니다. 공유 베이스 이미지는 전혀 사용하지 않습니다.
- **`dev.sh`와 `dck`.** `bash dev.sh up`은 일반 터미널에서 컨테이너를 빌드하고 시작하고 연결합니다. `shell`, `rebuild`, `doctor` 등 나머지 명령은 VS Code나 Cursor가 있든 없든 동작합니다.
- **Herdr 양방향.** 호스트의 [Herdr](https://herdr.dev)는 루프백 전용 SSH 서버를 통해 각 컨테이너를 하나의 머신으로 연결하며, 컨테이너는 표준 사이드바(App, Editor, Development, Agents)와 함께 열립니다. 모든 워크스페이스와 패인은 나중에 연 것까지 포함해 앱 경로(기본값 `/app`)에서 시작합니다. 컨테이너 안에서는 [herdr-peers](/kit/herdr)를 통해 에이전트가 호스트와 다른 컨테이너의 에이전트에게 질문할 수 있습니다.
- **`dck-dockerfile` 스킬.** 에이전트가 요청에 따라 리포지토리의 컨테이너를 생성하거나 다시 생성하고, 실제 빌드로 이를 증명합니다.

## 설치

```bash
git clone --branch v0.3.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

요구 사항: Linux 또는 macOS 호스트의 `bash` 3.2 이상과 `python3` 3.11 이상, 그리고 컨테이너 명령을 위한 Docker와 Compose v2. 릴리스는 해당 `SHA256SUMS` 자산으로 검증하세요. `v0.3.2`에 고정하세요. `v0.2.0`은 지원되지 않습니다.

| 항목 | 값 |
|---|---|
| 제품 | `DailybotHQ/devcontainer-kit`, 태그 `v0.3.2`, 인터페이스 2 |
| 레지스트리 키 | `.dwp/config.json`의 `devcontainer` |
| 리포지토리별 설정 | `.devcontainer/dck.toml` |
| 감지 | `dck doctor --json` |

## 레이어

모든 컨테이너에는 개발 도구 — git, gh, ripgrep, SSH 서버, Herdr, herdr-peers — 가 들어 있으며, [호스트 계정](#컨테이너-안의-호스트-계정)을 옵트인하지 않는 한 비밀 값은 없습니다. 나머지는 `dck.toml`에서 선택하는 레이어입니다:

| 레이어 | 기본값 | 추가되는 것 |
|---|---|---|
| `agents` | 꺼짐 | 검증된 릴리스에서 가져온 [coding-agents-kit](/kit/agentkit)과 여러분이 나열한 CLI. 각 CLI는 자체 영속 볼륨을 가지며, `classic`(`claudex`, `codexx`, …)과 `providers`(`claude-glm`, `codex-azure`, …) 프리셋이 함께 제공됩니다. 에이전트는 기본적으로 자율 모드로 실행됩니다 — 컨테이너가 곧 샌드박스입니다. 옵트아웃: 서비스 `.env`의 `AGENTKIT_PERMISSIONS=ask`. |
| `editor` | 켜짐 | 태그로 고정된 [DeepWorkPlan Vim](/kit/vim)이 포함된 Neovim. 끄면 일반 편집기가 제공됩니다. |
| `dailybot` | 꺼짐 | dailybot 애드온을 위한 Dailybot CLI. |

로그인, `gh`, Herdr 설정, git 신원 정보는 `bash dev.sh rebuild` 후에도 유지됩니다. `agents` 레이어를 켜면 이미지에 coding-agents-kit의 세 가지 스킬(`agentkit`, `agentkit-setup`, `agentkit-orchestrate`)도 포함되며, 시작할 때마다 모든 에이전트의 스킬 디렉터리에 링크되므로 다시 만든 컨테이너에서도 유지됩니다.

상태 볼륨(SSH 호스트 키, `~/.ssh`, `gh` 로그인, Herdr 클라이언트 상태, 기록)의 이름은 `state`입니다. 여러 서비스가 하나의 compose 프로젝트를 공유한다면 `dck.toml`의 `[compose] state_volume`(또는 `dck init --state-volume NAME`)으로 각 서비스에 고유한 이름을 지정하세요. 그렇지 않으면 모두 같은 볼륨을 마운트하며, `dck doctor`가 이를 알려 줍니다.

## 머신을 넘나드는 에이전트

`v0.2.3`부터 Docker Desktop에서 `dck up`은 수작업 없이 양방향 메시를 구성합니다.

- **컨테이너와 호스트.** 컨테이너 안의 에이전트는 호스트, 다른 모든 dck 컨테이너, 그리고 호스트의 Herdr가 이미 관리하는 다른 루프백 컨테이너에 있는 Herdr 에이전트에 접근할 수 있으며, 그쪽에서도 다시 접근할 수 있습니다. 모든 피어는 고정된 호스트 키를 가지며, 최초 사용 시 신뢰되는 것은 없습니다.
- **선택적 호스트 리스너.** `dck setup`은 `127.0.0.1`에서 동작하는 사용자 수준 SSH 서버를 한 번 제안합니다. 이 서버는 dck 키만 받아들이며 launchd(macOS)가 계속 실행되도록 유지합니다. 이미 루프백 리스너를 운영 중이라면 대신 호스트 프로필이 그것을 가리키도록 하세요. `dck host listener disable`로 제거할 수 있습니다.
- **재빌드 후에도 유지.** 컨테이너의 Herdr 머신 카탈로그는 볼륨에 있으므로, `bash dev.sh rebuild` 후에도 내부에 등록된 모든 머신이 유지됩니다. `v0.3.2`부터 `rebuild`, `start`, `restart`는 `up`과 같은 단계를 실행합니다. 컨테이너가 호스트의 Herdr에 다시 등록되고, 호스트 키가 다시 고정되며, 메시가 다시 배포되므로, 처음부터 빌드한 컨테이너도 곧바로 호스트와 피어에 접근할 수 있습니다.
- **컨테이너 안의 Codex 창.** `v0.3.2`에서는 컨테이너 안의 Codex 에이전트가 다른 머신의 피어에게 묻기 전에 `HERDR_PEERS_SELF`를 호스트에 저장된 컨테이너의 머신 id로 설정합니다. 이 id는 리드의 지시에 적혀 있으며, 이후 키트 릴리스에서는 키트가 이를 설정합니다.
- **호스트에서도 응답.** `dck setup`은 호스트에 검증된 [herdr-peers](/kit/herdr)를 설치하므로 호스트에서도 `dck agents`와 `dck ask`가 동작하고, 호스트 에이전트는 `herdr-peers reply`로 응답합니다.
- **키트가 만들지 않은 컨테이너.** 그 컨테이너들이 로그인에 쓰는 공개 키를 호스트 프로필의 `[ssh] authorized_extra` 아래에 나열하면, 그 컨테이너들도 dck 컨테이너에 접근할 수 있습니다.

호스트와 컨테이너 양쪽에서 [coding-agents-kit](/kit/agentkit)과 함께 사용하면, 같은 `ak`로 양쪽에서 에이전트를 실행할 수 있습니다.

## 컨테이너 안의 호스트 계정

컨테이너는 호스트에 이미 있는 계정을 사용할 수 있습니다. git이 이미 호스트의 SSH 에이전트를 통해 동작하는 것과 같은 방식이며, 컨테이너 안에서 로그인할 필요가 없습니다. 이는 옵트인이며 설정은 여러분의 **호스트 프로필**에 있고, 리포지토리의 `dck.toml`에는 결코 두지 않습니다.

```toml
[agents]
host_profiles = true          # 기본값 false
host_env_keys = ["ZAI_CODING_API_KEY"]   # 공유할 환경 변수 이름의 허용 목록
```

`host_profiles`를 켜면 `dck up`은 리포지토리가 설치하는 CLI의 프로필만 공유합니다.

- **Claude Code**는 프로필마다 하나의 장기 토큰으로 공유합니다. `@default`에는 `CLAUDE_CODE_OAUTH_TOKEN`, `@name`에는 `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>`를 사용합니다(접미사는 대문자로 바꾸고, `A-Z`, `0-9`, `_` 이외의 문자는 `_`로 바꿉니다).
- **Codex**는 인증 파일로, `@default`와 각 프로필에 대해 공유합니다.
- **키트의 env 파일**은 읽기 전용이며 `host_env_keys`에 있는 이름으로만 줄입니다.

agentkit home 전체는 결코 마운트하지 않으며, 호스트 절대 경로를 담은 프로필은 건너뜁니다. 읽기-쓰기로 공유한 Codex 로그인은 두 작성자가 동시에 갱신할 수 있으므로, Codex 계정마다 활성 에이전트를 하나만 두십시오. 컨테이너 안에서도 같은 `ak <kind> @<profile>`이 호스트에서와 같은 계정으로 실행되며, 덕분에 리드는 `ak pick`이 고른 계정을 컨테이너 레인에 넘길 수 있습니다. [여러 에이전트 운영하기](/methodology/06-orchestration)를 참고하십시오.

## 컨테이너 안의 호스트 SSH 키

일부 도구는 키 파일만 읽고 전달된 에이전트는 무시합니다. 예를 들어 `gh auth login`은 새 키를 생성하겠다고 제안합니다. `v0.3.2`부터 옵트인할 수 있으며, **호스트 프로필**에서만 설정할 수 있습니다(리포지토리의 `dck.toml`로는 설정할 수 없으며, `dck setup`이 한 번 묻고 기본값은 아니요입니다):

```toml
[ssh]
copy_keys = true              # default false
```

켜져 있는 동안 `dck up`은 호스트의 `~/.ssh`를 읽기 전용으로 `~/.ssh_host`에 바인딩하고, 시작할 때마다 그 안의 `id_*` 키를 컨테이너의 `~/.ssh`로 복사하여(개인 키는 `0600`) 호스트와 맞춰 둡니다. 에이전트 전달은 그대로이며, 끄면 다음 시작 때 복사본이 제거됩니다. 대가는 호스트의 `~/.ssh` 전체를 컨테이너 안에서 읽을 수 있고, 개인 키가 상태 볼륨에 저장된다는 점입니다.

## 보안 기본값

- 공개되는 모든 포트는 `dck.toml`이 `bind`를 설정하지 않는 한 `127.0.0.1`에 바인딩됩니다.
- SSH를 통한 git은 호스트의 SSH 에이전트를 거칩니다 — 그 소켓을 사용하며, 키 파일이나 마운트된 `~/.ssh` 또는 `~/.gitconfig`는 결코 사용하지 않습니다. 단, 호스트 프로필에서 [`copy_keys`](#컨테이너-안의-호스트-ssh-키)를 켠 경우는 예외입니다. git 신원 정보는 `dck setup`이 채우는 `DCK_GIT_*` 값에서 가져옵니다.
- SSH 호스트 키는 실행 시점에 프로젝트별 볼륨에 생성되며, 결코 이미지에 구워 넣지 않습니다. 서버는 공개 키만 받아들이며, root 로그인과 비밀번호를 허용하지 않습니다.
- 템플릿은 `cap_add`, `privileged` 모드, Docker 소켓 중 어느 것도 추가하지 않습니다.
- 모든 다운로드는 버전으로 고정되고 체크섬으로 검증됩니다. 베이스 이미지는 다이제스트로 고정됩니다.
- 한 컨테이너의 에이전트가 다른 컨테이너에 접근할 수 있게 하는 Herdr 메시는 기본적으로 켜져 있으며, 이를 끄는 방법은 키트의 위협 모델에 문서화되어 있습니다. 호스트 리스너는 실행 중인 컨테이너 안의 코드가 사용자 본인으로서 호스트에서 셸을 열 수 있게 합니다. 이는 옵트인 방식이고, 루프백 전용이며, dck 키만 받아들이고, `dck host listener disable`로 제거할 수 있습니다.

## 참고

선택형이며 결코 필수가 아닙니다. 리포지토리는 선택적 애드온이 하나도 없어도 완전히 적합합니다. v0.2는 Linux와 macOS 호스트를 지원하며, 컨테이너 간 메시에는 Docker Desktop이 필요합니다.
