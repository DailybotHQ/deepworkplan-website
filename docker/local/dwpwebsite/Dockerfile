FROM node:24.20.0-trixie-slim
LABEL org.opencontainers.image.source="https://github.com/DailybotHQ/deepworkplan-website"

# Coding CLIs are opt-in. Only the exact string "true" installs. Flipping one
# flag rebuilds that CLI layer, not this apt layer. herdr stays unconditional.
ARG INSTALL_CLAUDE_CLI=false
ARG INSTALL_CURSOR_CLI=false
ARG INSTALL_CODEX_CLI=false
ARG INSTALL_PI_CLI=false
ARG INSTALL_OPENCODE_CLI=false
ARG INSTALL_CLINE_CLI=false
ARG INSTALL_GROK_CLI=false

# One apt-get update layer: packages, sshd drop-in, lua/rg/fd links, clean.
# Host keys are NOT generated here (private keys must not bake into layers).
# Do not apt-install neovim — the DeepWorkPlan Vim installer (--nvim) puts the
# sha256-verified Neovim release under ~/.local. It runs with --skip-packages,
# so this layer provides everything the editor and its plugins build with:
# git, curl, ca-certificates, lua5.4, ripgrep, fd-find, unzip, python3-venv,
# tar, gzip, gcc, make, libc6-dev, fontconfig (nodejs comes from the base image).
RUN apt-get update -y && \
    apt-get install --no-install-recommends -y \
      less git curl gnupg ca-certificates openssh-client openssh-server \
      sudo nano lua5.4 ripgrep fd-find unzip tar gzip \
      gcc make libc6-dev fontconfig \
      pipx python3 python3-pip python3-venv python-is-python3 python3-neovim luarocks \
      chromium && \
    mkdir -p /var/run/sshd /etc/ssh/sshd_config.d && \
    rm -f /etc/ssh/ssh_host_* && \
    printf '%s\n' \
      'PasswordAuthentication no' \
      'PubkeyAuthentication yes' \
      'PermitRootLogin no' \
      'UsePAM yes' \
      'AllowTcpForwarding yes' \
      'AllowStreamLocalForwarding yes' \
      > /etc/ssh/sshd_config.d/herdr.conf && \
    ln -sf "$(command -v fdfind)" /usr/local/bin/fd && \
    ln -sf "$(command -v lua5.4)" /usr/local/bin/lua && \
    apt-get clean -y && \
    rm -rf /var/cache/apk/* && \
    rm -rf /var/lib/apt/lists/*

# GitHub CLI from the official release tarball (avoids a second apt update).
ARG GH_VERSION=2.83.2
RUN GH_ARCH="$(dpkg --print-architecture)" \
    && curl -fsSL "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_${GH_ARCH}.tar.gz" -o /tmp/gh.tar.gz \
    && tar -xzf /tmp/gh.tar.gz -C /tmp \
    && install -m 0755 "/tmp/gh_${GH_VERSION}_linux_${GH_ARCH}/bin/gh" /usr/local/bin/gh \
    && rm -rf /tmp/gh.tar.gz "/tmp/gh_${GH_VERSION}_linux_${GH_ARCH}" \
    && gh --version

# DeepWorkPlan Vim is the terminal editor. ~/.local/bin stays first on PATH for nvim.
ENV EDITOR=nvim
ENV VISUAL=nvim
ENV GIT_EDITOR=nvim

# Chromium path for Lighthouse CI (chrome-launcher)
ENV CHROME_PATH=/usr/bin/chromium
ENV CHROMIUM_FLAGS="--no-sandbox"

# Add node user to sudoers (node already exists in official node images, uid 1000)
RUN echo 'node ALL=(root) NOPASSWD:ALL' > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

# Enable corepack so pnpm is provisioned from package.json "packageManager".
RUN corepack enable

# pnpm global install location. pnpm writes binaries to ${PNPM_HOME}/bin.
ENV PNPM_HOME=/usr/local/share/pnpm
RUN mkdir -p "${PNPM_HOME}/bin" \
    && chown -R node:node "${PNPM_HOME}"

# Keep Cline's session/settings store on a persistent path inside ~/.cline.
ENV CLINE_DATA_DIR=/home/node/.cline/data

# PATH: ~/.local/bin first (nvim), then pnpm globals and optional CLIs.
ENV PATH=/home/node/.local/bin:${PNPM_HOME}/bin:${PNPM_HOME}:/home/node/.cursor/bin:/home/node/.opencode/bin:/home/node/.grok/bin:$PATH

# Container Node wins over IDE-bundled Node; ~/.local/bin stays first for nvim.
RUN printf '%s\n' \
    '# Container-installed Node must win over IDE-bundled Node (Cursor Server, etc.).' \
    '# ~/.local/bin stays first so the installer'"'"'s Neovim wins over any apt nvim.' \
    'if [ -x /usr/local/bin/node ]; then' \
    '  case ":${PATH}:" in' \
    '    ":/usr/local/bin:"*) : ;;' \
    '    *) PATH="/usr/local/bin:${PATH}" ;;' \
    '  esac' \
    'fi' \
    'for d in "/usr/local/share/pnpm/bin" "$HOME/.local/share/pnpm/bin" "$HOME/.local/bin"; do' \
    '  case ":${PATH}:" in' \
    '    *":${d}:"*) ;;' \
    '    *) [ -d "$d" ] && PATH="${d}:${PATH}" ;;' \
    '  esac' \
    'done' \
    'export PATH' \
    > /etc/profile.d/00-container-node-first.sh \
    && chmod 0644 /etc/profile.d/00-container-node-first.sh

# Redirect npm → pnpm (this repo uses pnpm exclusively).
RUN rm -f /usr/local/bin/npm && \
    printf '#!/bin/bash\necho "[npm→pnpm] Redirecting \"npm $*\" to pnpm (this repo uses pnpm)." >&2\nexec corepack pnpm "$@"\n' \
    > /usr/local/bin/npm \
    && chmod +x /usr/local/bin/npm

# Source custom commands for interactive and login bash.
RUN usermod -s /bin/bash node && \
    echo 'source /app/docker/custom_commands.sh' >> /home/node/.bashrc && \
    printf '%s\n' \
      '# Login shells (dev.sh shell, ssh, herdr remote). Dash cannot parse bash functions.' \
      'if [ -n "${BASH_VERSION:-}" ] && [ -f /app/docker/custom_commands.sh ]; then' \
      '  . /app/docker/custom_commands.sh' \
      'fi' \
      > /etc/profile.d/99-dwp-custom-commands.sh && \
    chmod 0644 /etc/profile.d/99-dwp-custom-commands.sh && \
    chown node:node /home/node/.bashrc

# Pre-create persistent data dirs so named volumes inherit node ownership.
RUN mkdir -p /home/node/.claude_data /home/node/.codex_data /home/node/.cursor_data /home/node/.gh_data \
    /home/node/.dailybot_data /home/node/.chelper_data /home/node/.cline /home/node/.opencode_data \
    /home/node/.pi_data /home/node/.herdr_data /home/node/.grok_data /home/node/.ssh \
    && chown -R node:node /home/node

# Configure Git for node user (can be overridden by mounted .gitconfig).
USER node
RUN git config --global init.defaultBranch main \
    && git config --global pull.rebase false \
    && git config --global safe.directory '*' \
    && git config --global core.editor nvim
USER root
# System-level safe.directory: applies to every user (root included) and survives
# the host ~/.gitconfig bind mount, which replaces the node user's global config.
RUN git config --system safe.directory '*'

# Restore tool dirs that Debian /etc/profile drops from PATH on login shells.
# Appended, never prepended: 00-container-node-first.sh keeps node/nvim order.
RUN printf '%s\n' \
    '# Re-add the tool dirs that Debian'"'"'s /etc/profile drops from PATH.' \
    'export SHELL="${SHELL:-/bin/bash}"' \
    'export PNPM_HOME="${PNPM_HOME:-/usr/local/share/pnpm}"' \
    'for _d in /usr/local/share/pnpm/bin "$HOME/.local/bin" "$HOME/.cursor/bin" "$HOME/.opencode/bin" "$HOME/.grok/bin"; do' \
    '  [ -d "$_d" ] || continue' \
    '  case ":${PATH}:" in' \
    '    *":${_d}:"*) ;;' \
    '    *) PATH="${PATH}:${_d}" ;;' \
    '  esac' \
    'done' \
    'unset _d' \
    'export PATH' \
    > /etc/profile.d/01-container-tool-paths.sh \
    && chmod 0644 /etc/profile.d/01-container-tool-paths.sh

# Each coding CLI is its own RUN and no-ops unless its flag is exactly true.
# Redeclare ARG after USER; Docker drops build args at a user change.
USER node
ARG INSTALL_CLAUDE_CLI=false
RUN if [ "$INSTALL_CLAUDE_CLI" = "true" ]; then \
      curl -fsSL https://claude.ai/install.sh | bash \
      && rm -rf /home/node/.claude /home/node/.claude.json; \
    else echo "INSTALL_CLAUDE_CLI is not true; skipping claude"; fi
USER root

USER node
ARG INSTALL_CURSOR_CLI=false
RUN if [ "$INSTALL_CURSOR_CLI" = "true" ]; then \
      curl -fsSL https://cursor.com/install | bash; \
    else echo "INSTALL_CURSOR_CLI is not true; skipping cursor"; fi
USER root
ARG INSTALL_CURSOR_CLI=false
RUN if [ "$INSTALL_CURSOR_CLI" = "true" ]; then \
      ln -sf /home/node/.cursor/bin/agent /usr/local/bin/agent; \
    else echo "INSTALL_CURSOR_CLI is not true; skipping agent symlink"; fi

USER node
ARG INSTALL_OPENCODE_CLI=false
ARG INSTALL_CLINE_CLI=false
ARG INSTALL_PI_CLI=false
ARG INSTALL_CODEX_CLI=false
ARG INSTALL_GROK_CLI=false
RUN if [ "$INSTALL_OPENCODE_CLI" = "true" ]; then \
      curl -fsSL https://opencode.ai/install | bash -s -- --no-modify-path; \
    else echo "INSTALL_OPENCODE_CLI is not true; skipping opencode"; fi
RUN if [ "$INSTALL_CLINE_CLI" = "true" ]; then \
      corepack pnpm add -g cline; \
    else echo "INSTALL_CLINE_CLI is not true; skipping cline"; fi
RUN if [ "$INSTALL_CODEX_CLI" = "true" ]; then \
      corepack pnpm add -g @openai/codex; \
    else echo "INSTALL_CODEX_CLI is not true; skipping codex"; fi
RUN if [ "$INSTALL_PI_CLI" = "true" ]; then \
      corepack pnpm add -g --ignore-scripts @earendil-works/pi-coding-agent; \
    else echo "INSTALL_PI_CLI is not true; skipping pi"; fi
# Z.AI helper is small and used by optional GLM wrappers in custom_commands.sh.
RUN corepack pnpm add -g @z_ai/coding-helper || true
RUN if [ "$INSTALL_GROK_CLI" = "true" ]; then \
      curl -fsSL https://x.ai/cli/install.sh | bash; \
    else echo "INSTALL_GROK_CLI is not true; skipping grok"; fi

# Dailybot CLI — official installer (pipx under the hood). Auth persists via volume.
RUN curl -fsSL https://cli.dailybot.com/install.sh | DAILYBOT_VERSION='>=3.15.0' bash || \
    echo "dailybot CLI install skipped or failed (non-fatal at build)"

# Herdr — terminal runtime for coding agents (unconditional mesh runtime).
RUN curl -fsSL https://herdr.dev/install.sh | sh \
	&& herdr --version \
	&& mkdir -p /home/node/.config/herdr \
	&& printf '%s\n' \
		'# Seeded by Dockerfile for DWP website container.' \
		'onboarding = false' \
		'' \
		'[terminal]' \
		'default_shell = "/bin/bash"' \
		'shell_mode = "login"' \
		'new_cwd = "/app"' \
		'' \
		'[ui]' \
		'mouse_capture = true' \
		'' \
		'[experimental]' \
		'allow_nested = true' \
		'' \
		> /home/node/.config/herdr/config.toml
USER root
# Non-login SSH only sees /usr/local/bin. node cannot write there.
RUN ln -sfn /home/node/.local/bin/herdr /usr/local/bin/herdr

# DeepWorkPlan Vim from its hosted installer, pinned to a release. The
# installer owns Neovim (--nvim: the official tarball, sha256-verified, in
# ~/.local/opt and linked as ~/.local/bin/nvim), the config at the release tag
# in ~/.config/nvim, pckr, the headless plugin sync and --strict (a failed sync
# or a missing/empty plugin fails the build); --skip-packages relies on the apt
# layer above. The hosted script is downloaded and verified against the
# v${DWP_VIM_VERSION} release's install.sh.sha256 (a second origin); when the
# website already serves a newer release, the release asset itself is used
# (same checksum), so the build always runs the pinned bytes. Never a pipe into
# a shell. Optional BuildKit secret `github_token` authenticates the installer's
# Neovim checksum lookup (GitHub API rate limit); it never lands in a layer.
USER node
ARG DWP_VIM_VERSION=0.5.0
ARG NVIM_VERSION=0.12.5
RUN --mount=type=secret,id=github_token,uid=1000 \
    set -eu; \
    release="https://github.com/DailybotHQ/deepworkplan-vim/releases/download/v${DWP_VIM_VERSION}"; \
    mkdir /tmp/dwp-vim-installer; \
    cd /tmp/dwp-vim-installer; \
    curl -fsSL -o install.sh.sha256 "$release/install.sh.sha256"; \
    curl -fsSL -o install.sh https://vim.deepworkplan.com/install.sh; \
    if ! sha256sum -c --status install.sh.sha256; then \
      echo "hosted installer is not v${DWP_VIM_VERSION}; using the release asset"; \
      curl -fsSL -o install.sh "$release/install.sh"; \
    fi; \
    sha256sum -c install.sh.sha256; \
    token=""; \
    if [ -r /run/secrets/github_token ]; then token="$(cat /run/secrets/github_token)"; fi; \
    GITHUB_TOKEN="$token" bash install.sh \
      --version "${DWP_VIM_VERSION}" --nvim "${NVIM_VERSION}" --skip-packages --strict; \
    cd /; \
    rm -f /tmp/dwp-vim-installer/install.sh /tmp/dwp-vim-installer/install.sh.sha256; \
    rmdir /tmp/dwp-vim-installer; \
    test "$(git -C /home/node/.config/nvim describe --tags --exact-match)" = "v${DWP_VIM_VERSION}"; \
    /home/node/.local/bin/nvim --version | head -1 | grep -qx "NVIM v${NVIM_VERSION}"
USER root

# Copy and setup entrypoint + host SSH mirror helper
COPY dwpwebsite/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY dwpwebsite/sync-host-ssh.sh /usr/local/bin/sync-host-ssh
RUN chmod +x /usr/local/bin/entrypoint.sh /usr/local/bin/sync-host-ssh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
