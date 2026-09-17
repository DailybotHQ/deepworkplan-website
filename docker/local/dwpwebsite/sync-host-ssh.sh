#!/bin/bash
# Mirror the host's SSH material into the container.
#
# ${HOME}/.ssh on the host is bind-mounted read-only at ~/.ssh_host (see
# docker-compose.yaml). ssh(1) needs a writable ~/.ssh — it appends to
# known_hosts and drops control sockets there — so the mount is mirrored into
# ~/.ssh instead of being used directly.
#
# Run automatically by entrypoint.sh on every container start, and on demand via
# the `ssh-sync` shell command (docker/custom_commands.sh) when a key or a
# `Host` entry is added on the host while the container is already running.
#
# The mirror is unconditional and idempotent: the host is the source of truth,
# so every key (private and public) and the config are re-copied on each run.
# Keys generated inside the container are never deleted — only overwritten when
# the host has a file of the same name.
#
# Not mirrored: known_hosts (seeded once, then container-owned and writable),
# authorized_keys (rebuilt from the host public keys), directories and sockets
# such as the host's agent/ (`[ -f ]` skips both).
#
# Usage: sync-host-ssh [USER_HOME]   (default: $HOME)

set -u

USER_HOME="${1:-$HOME}"
SSH_HOST_DIR="${USER_HOME}/.ssh_host"
SSH_DIR="${USER_HOME}/.ssh"

mkdir -p "${SSH_DIR}"

if [ ! -d "${SSH_HOST_DIR}" ]; then
    echo "  ⚠ ${SSH_HOST_DIR} not mounted — skipping host SSH sync"
    echo "    Expected '\${HOME}/.ssh:${SSH_HOST_DIR}:ro' in docker/local/docker-compose.yaml"
    exit 0
fi

key_count=0
pub_count=0

for src in "${SSH_HOST_DIR}"/*; do
    # Regular files only: skips the host's agent/ directory and agent sockets.
    [ -f "$src" ] || continue
    name=$(basename "$src")
    case "$name" in
        known_hosts|known_hosts.old|authorized_keys) continue ;;
    esac
    cp -f "$src" "${SSH_DIR}/${name}" 2>/dev/null || continue
    case "$name" in
        *.pub)
            chmod 644 "${SSH_DIR}/${name}"
            pub_count=$((pub_count + 1))
            ;;
        *)
            # Private keys and config: ssh refuses anything group/world readable.
            chmod 600 "${SSH_DIR}/${name}"
            [ "$name" = "config" ] || key_count=$((key_count + 1))
            ;;
    esac
done

# known_hosts must stay writable (ssh appends to it), so seed it only when absent.
if [ ! -f "${SSH_DIR}/known_hosts" ] && [ -f "${SSH_HOST_DIR}/known_hosts" ]; then
    cp "${SSH_HOST_DIR}/known_hosts" "${SSH_DIR}/known_hosts" 2>/dev/null || true
fi
chmod 600 "${SSH_DIR}/known_hosts" 2>/dev/null || true

# authorized_keys lets the host SSH back INTO the container
# (herdr --remote: host:22022 -> container:22).
if ls "${SSH_HOST_DIR}"/*.pub >/dev/null 2>&1; then
    cat "${SSH_HOST_DIR}"/*.pub > "${SSH_DIR}/authorized_keys" 2>/dev/null || true
fi
# sshd refuses to authenticate when authorized_keys is missing.
[ -f "${SSH_DIR}/authorized_keys" ] || touch "${SSH_DIR}/authorized_keys"
chmod 600 "${SSH_DIR}/authorized_keys"

chmod 700 "${SSH_DIR}"
# Only meaningful when running as root (entrypoint); a no-op as the node user.
chown -R node:node "${SSH_DIR}" 2>/dev/null || true

echo "  ✓ SSH synced from host: ${key_count} private key(s), ${pub_count} public key(s), config, known_hosts"
