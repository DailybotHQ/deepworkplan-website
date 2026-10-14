# shellcheck shell=sh
# devcontainer-kit: login-shell PATH (Herdr panes and `ssh` sessions are login
# shells, and Debian's /etc/profile resets PATH). User tool directories first.
for _d in "$HOME/.local/bin" "$HOME/.local/share/agentkit/bin" "/usr/local/share/pnpm/bin"; do
  [ -d "$_d" ] || continue
  case ":${PATH}:" in *":${_d}:"*) ;; *) PATH="${_d}:${PATH}" ;; esac
done
unset _d
export PATH
export EDITOR="${EDITOR:-nvim}" VISUAL="${VISUAL:-nvim}" GIT_EDITOR="${GIT_EDITOR:-nvim}"
# The container's own environment for ssh sessions (written by dck_env_profile).
if [ -r "$HOME/.dck/env.sh" ]; then . "$HOME/.dck/env.sh"; fi
# [agents] node_first: the agents' own Node first, also in login shells (Debian's
# /etc/profile resets the image's ENV PATH). Only when that Node was installed.
if [ "${DCK_NODE_FIRST:-0}" = "1" ] && [ -x /opt/dck/node/bin/node ]; then
  case ":${PATH}:" in *":/opt/dck/node/bin:"*) ;; *) PATH="/opt/dck/node/bin:${PATH}"; export PATH ;; esac
fi
# [agents] default_profile names the account a bare `ak <cli>` uses
# (AGENTKIT_DEFAULT_PROFILE_<CLI>). It does not move CLAUDE_CONFIG_DIR or
# CODEX_HOME: those are how the CLI finds @default, and pointing them at a
# named profile made @default that profile (ak usage hid it; a login landed
# in the named profile). A plain `claude` / `codex` — including one Herdr
# restores — uses the container's own @default home (~/.claude, ~/.codex).
# herdr-peers' reply route: this container's machine id in the host's Herdr catalog
# (written by `dck up` / `dck herdr add|mesh`; dck_herdr_self). Codex panes cannot
# discover it, so asks from them failed with "no reply route" without it.
if [ -z "${HERDR_PEERS_SELF:-}" ] && [ -r "$HOME/.dck/volumes/state/herdr-self" ]; then
  _id="$(head -n 1 "$HOME/.dck/volumes/state/herdr-self")"
  case "$_id" in
    *[!0-9a-f]*|"") ;;
    *) [ "${#_id}" -eq 32 ] && HERDR_PEERS_SELF="$_id" && export HERDR_PEERS_SELF ;;
  esac
  unset _id
fi
# SSH agent. Herdr points SSH_AUTH_SOCK at its forwarded-agent link, which dangles
# ("herdr.sock.unavailable") when the client that attached forwarded no agent; the
# mesh, git and herdr-peers replies then have no key. Fall back to the host agent
# dck mounts for the container's lifetime (ssh_agent = true).
if [ -S /run/dck/ssh-agent.sock ] && { [ -z "${SSH_AUTH_SOCK:-}" ] || [ ! -S "${SSH_AUTH_SOCK}" ]; }; then
  SSH_AUTH_SOCK=/run/dck/ssh-agent.sock
  export SSH_AUTH_SOCK
fi
