FROM node:24.20.0-trixie-slim
LABEL maintainer="developers@dailybot.com"

# System packages (apt requires root)
RUN apt-get update -y && \
    apt-get install -y less git curl gnupg ca-certificates openssh-client openssh-server sudo nano \
    # pipx / python3 / python3-pip / python-is-python3: Dailybot CLI install path (PEP 668 enforced on trixie)
    pipx python3 python3-pip python-is-python3 \
    # Chromium for Lighthouse CI local audits
    chromium && \
    # Install GitHub CLI (binary is system-wide; per-user config lives in ~/.config/gh)
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg && \
    chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null && \
    apt-get update && \
    apt-get install -y gh && \
    # --- Clean ---
    apt-get clean -y && \
    rm -rf /var/cache/apk/* && \
    rm -rf /var/lib/apt/lists/* && \
    # --- SSH server setup (for herdr --remote access) ---
    mkdir -p /var/run/sshd && \
    # Host keys are required; without them sshd accepts the TCP connect then closes it.
    ssh-keygen -A && \
    # Drop-in config for key auth (herdr --remote via host port 2222)
    printf '%s\n' \
      'PasswordAuthentication no' \
      'PubkeyAuthentication yes' \
      'PermitRootLogin no' \
      'UsePAM yes' \
      'AllowTcpForwarding yes' \
      'Subsystem sftp /usr/lib/openssh/sftp-server' \
      > /etc/ssh/sshd_config.d/herdr.conf

# Default terminal editor inside container (used by Git for merge/commit messages)
ENV EDITOR=nano
ENV VISUAL=nano
ENV GIT_EDITOR=nano

# Chromium path for Lighthouse CI (chrome-launcher)
ENV CHROME_PATH=/usr/bin/chromium
ENV CHROMIUM_FLAGS="--no-sandbox"

# Add node user to sudoers (node user already exists in official node images with uid 1000)
RUN echo 'node ALL=(root) NOPASSWD:ALL' > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

# Enable corepack so pnpm is provisioned from the version pinned in
# package.json's "packageManager" field. Avoid `npm install -g pnpm` —
# it defeats the pin.
RUN corepack enable

# pnpm global install location. pnpm writes binaries to ${PNPM_HOME}/bin,
# so that subdirectory must be on PATH for `corepack pnpm add -g <pkg>` to succeed.
ENV PNPM_HOME=/usr/local/share/pnpm
RUN mkdir -p "${PNPM_HOME}/bin" \
    && chown -R node:node "${PNPM_HOME}"

# Make node user's CLI install dirs available on PATH
# (pnpm globals, Claude, Cursor agent, OpenCode official installer, Cline global install, Grok/xAI)
ENV PATH=${PNPM_HOME}/bin:${PNPM_HOME}:/home/node/.local/bin:/home/node/.cursor/bin:/home/node/.opencode/bin:/home/node/.grok/bin:$PATH

# Keep Cline's session/settings store on a persistent path inside the mounted ~/.cline volume.
ENV CLINE_DATA_DIR=/home/node/.cline/data

# Ensure the container's image-installed Node (/usr/local/bin) precedes any
# IDE-bundled Node that gets prepended to PATH at shell startup — Cursor Server
# (~/.cursor-server/bin/<commit>/node), VS Code Server, etc. Without this,
# `node`/`npx`/`pnpm` in agent shells resolve to the IDE's bundled binary
# (an older LTS) even though `FROM node:<X>-...` installs the right one.
# Login shells source /etc/profile.d/*; this is the most universal anchor.
RUN printf '%s\n' \
    '# Container-installed Node must win over IDE-bundled Node (Cursor Server, etc.).' \
    '# This drop-in is idempotent and safe for any POSIX-ish shell.' \
    'if [ -x /usr/local/bin/node ]; then' \
    '  case "${PATH}" in' \
    '    /usr/local/bin:*) : ;;  # already at the front' \
    '    *) PATH="/usr/local/bin:${PATH}" ;;' \
    '  esac' \
    '  export PATH' \
    'fi' \
    > /etc/profile.d/00-container-node-first.sh \
    && chmod 0644 /etc/profile.d/00-container-node-first.sh

# Redirect any `npm` invocation to pnpm — this repo uses pnpm exclusively,
# so running npm would corrupt node_modules and pnpm-lock.yaml. Replace the
# real npm symlink at /usr/local/bin/npm (always in PATH, regardless of how
# the shell is launched — interactive, Remote SSH, exec, scripts).
RUN rm -f /usr/local/bin/npm && \
    printf '#!/bin/bash\necho "[npm→pnpm] Redirecting \"npm $*\" to pnpm (this repo uses pnpm)." >&2\nexec corepack pnpm "$@"\n' \
    > /usr/local/bin/npm \
    && chmod +x /usr/local/bin/npm

# Source custom commands for node user
RUN echo 'source /app/docker/custom_commands.sh' >> /home/node/.bashrc \
    && chown node:node /home/node/.bashrc

# Pre-create persistent data dirs so the named volumes inherit node ownership on first mount
RUN mkdir -p /home/node/.claude_data /home/node/.codex_data /home/node/.cursor_data /home/node/.gh_data \
    /home/node/.dailybot_data /home/node/.chelper_data /home/node/.cline /home/node/.opencode_data /home/node/.pi_data /home/node/.herdr_data /home/node/.ssh \
    && chown -R node:node /home/node

# Install AI CLIs and configure git as node user
USER node

# Install Claude Code CLI (native installer, npm method is deprecated).
# Remove fresh install artifacts so the persistent volume isn't overwritten on rebuild.
RUN curl -fsSL https://claude.ai/install.sh | bash \
    && rm -rf /home/node/.claude /home/node/.claude.json

# Install Cursor CLI (provides the 'agent' command in ~/.cursor/bin)
RUN curl -fsSL https://cursor.com/install | bash

# Install OpenCode CLI (official installer — https://opencode.ai/).
# Binary lands in ~/.opencode/bin (on PATH). --no-modify-path: we own PATH via ENV
# and .bashrc; do not let the installer append duplicate PATH exports.
# Auth/config persists via the opencode_data volume (see entrypoint).
RUN curl -fsSL https://opencode.ai/install | bash -s -- --no-modify-path \
    && opencode --version

# Install Codex, Cline, Pi, and Z.AI Coding Tool Helper globally via pnpm
# (resolves under ${PNPM_HOME}). Pi needs --ignore-scripts per upstream docs.
RUN corepack pnpm add -g @openai/codex cline @z_ai/coding-helper \
	&& corepack pnpm add -g --ignore-scripts @earendil-works/pi-coding-agent \
	&& pi --version

# Dailybot CLI — official installer handles PEP 668 internally (uses pipx),
# avoiding the click 8.x conflict with the system-provided python3-click.
# Binary lands in ~/.local/bin (already on PATH); auth/config lives in
# ~/.config/dailybot, persisted across rebuilds via the dailybot_data volume.
RUN curl -fsSL https://cli.dailybot.com/install.sh | DAILYBOT_VERSION='>=3.7.3' bash

# Herdr — terminal runtime for coding agents (https://herdr.dev/).
# Binary lands in ~/.local/bin/herdr (already on PATH). Config/logs live in
# ~/.config/herdr, persisted across rebuilds via the herdr_data volume.
# Seed terminal.default_shell=/bin/bash so panes source ~/.bashrc
# (custom_commands.sh). Without this, Herdr falls back to /bin/sh and
# wrappers like claudex / pi-azure are "not found".
RUN curl -fsSL https://herdr.dev/install.sh | sh \
	&& herdr --version \
	&& mkdir -p /home/node/.config/herdr \
	&& printf '%s\n' \
		'# Seeded by Dockerfile for DWP website container.' \
		'# Ensures panes use bash so ~/.bashrc (custom_commands.sh) is sourced.' \
		'# Docs: https://herdr.dev/docs/configuration/' \
		'' \
		'onboarding = false' \
		'' \
		'[terminal]' \
		'default_shell = "/bin/bash"' \
		'# Linux interactive non-login bash sources ~/.bashrc.' \
		'shell_mode = "non_login"' \
		'# New panes/tabs/workspaces land in the mounted repo root.' \
		'new_cwd = "/app"' \
		'' \
		'[ui]' \
		'# Capture mouse so sidebar workspace/tab clicks work in the terminal.' \
		'mouse_capture = true' \
		'' \
		'[experimental]' \
		'# Allow herdr --remote from a host herdr pane (SSH inherits HERDR_ENV=1).' \
		'allow_nested = true' \
		'' \
		> /home/node/.config/herdr/config.toml

# Configure Git for node user (can be overridden by mounted .gitconfig)
RUN git config --global init.defaultBranch main \
    && git config --global pull.rebase false \
    && git config --global safe.directory '*'

USER root

# Copy and setup entrypoint script
COPY dwpwebsite/entrypoint.sh /usr/local/bin/entrypoint.sh
# Host SSH mirror (~/.ssh_host -> ~/.ssh). Run by the entrypoint on every start
# and on demand by the `ssh-sync` shell command.
COPY dwpwebsite/sync-host-ssh.sh /usr/local/bin/sync-host-ssh
RUN chmod +x /usr/local/bin/entrypoint.sh /usr/local/bin/sync-host-ssh

# Set the entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
