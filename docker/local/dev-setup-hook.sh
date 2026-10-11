#!/usr/bin/env bash
# The site's own start hook: devcontainer-kit runs it as the container user, from
# /app, at every container start (dck_repo_hook).
#
# Build output on the container's filesystem. A checkout may keep `.astro` and
# `dist` as symlinks into /tmp/ov/ (gitignored, created by hand), which keeps
# Astro's cache and build output off the macOS bind mount, where writes are slow
# and racy. /tmp is not persisted, so the targets are recreated at every start;
# a checkout with plain directories is left alone.
set -eu
for d in astro dist; do
  mkdir -p "/tmp/ov/$d"
done
# Astro's prerender step imports packages from the build output's location; from
# /tmp/ov/dist, Node finds them through /tmp/ov/node_modules.
ln -sfn /app/node_modules /tmp/ov/node_modules

# Herdr keeps its machine catalog (the SSH machines this container's agents can
# reach: the Mac, other containers) in ~/.local/state/herdr/client, which is not on
# a volume, so `rebuild` would drop every machine added inside. Keep it on the
# state volume, next to ~/.config/herdr, so the catalog survives like the logins do.
state_vol="$HOME/.dck/volumes/state"
if [ -d "$state_vol" ]; then
  keep="$state_vol/state_herdr_client"
  live="$HOME/.local/state/herdr/client"
  mkdir -p "$keep" "$(dirname "$live")"
  if [ -d "$live" ] && [ ! -L "$live" ]; then
    cp -an "$live/." "$keep/" 2>/dev/null || true
    rm -rf "$live"
  fi
  ln -sfn "$keep" "$live"
fi

# Git, gh and ssh keep working exactly as on the host. devcontainer-kit mounts the
# host's SSH agent at /run/dck/ssh-agent.sock (public keys only inside the container;
# signing happens on the host). Herdr points its panes' SSH_AUTH_SOCK at its own
# forwarded-agent link, which dangles ("...sock.unavailable") whenever the client that
# attached did not forward an agent. This idempotent block makes every new shell fall
# back to the mounted host agent in that case, and repairs Herdr's link right away.
DCK_AGENT=/run/dck/ssh-agent.sock
if [ -S "$DCK_AGENT" ]; then
  link="$HOME/.config/herdr/herdr.sock.agent"
  if [ -L "$link" ] && [ ! -S "$link" ]; then ln -sfn "$DCK_AGENT" "$link"; fi
  marker='# dwp-ssh-agent-fallback'
  for rc in "$HOME/.profile" "$HOME/.bashrc"; do
    [ -f "$rc" ] || touch "$rc"
    grep -qF "$marker" "$rc" || cat >> "$rc" <<'RC'

# dwp-ssh-agent-fallback
if [ -S /run/dck/ssh-agent.sock ] && { [ -z "${SSH_AUTH_SOCK:-}" ] || [ ! -S "${SSH_AUTH_SOCK}" ]; }; then
  export SSH_AUTH_SOCK=/run/dck/ssh-agent.sock
fi
RC
  done
fi
