#!/bin/bash

# Setup Claude CLI persistence with symlinks for a given user
# This ensures Claude config persists across container rebuilds
setup_claude_persistence_for_user() {
    USER_HOME="$1"
    CLAUDE_DATA_DIR="${USER_HOME}/.claude_data"
    CLAUDE_JSON="${USER_HOME}/.claude.json"
    CLAUDE_DIR="${USER_HOME}/.claude"
    CLAUDE_JSON_BACKUP="${USER_HOME}/.claude.json.backup"

    # Ensure the persistent data directory exists
    mkdir -p "${CLAUDE_DATA_DIR}"

    # Handle .claude.json file
    if [ ! -L "${CLAUDE_JSON}" ]; then
        # If it's a real file, move it to the persistent volume (only if volume is empty)
        if [ -f "${CLAUDE_JSON}" ]; then
            # Only copy if persistent file doesn't exist (preserve existing data)
            if [ ! -f "${CLAUDE_DATA_DIR}/claude.json" ]; then
                cp "${CLAUDE_JSON}" "${CLAUDE_DATA_DIR}/claude.json"
                echo "  → Copied .claude.json to persistent volume"
            else
                echo "  → Preserving existing .claude.json from persistent volume"
            fi
            rm "${CLAUDE_JSON}"
        fi
        # Ensure target file exists (some apps don't follow symlinks to non-existent files)
        touch "${CLAUDE_DATA_DIR}/claude.json"
        # Create symlink
        ln -sf "${CLAUDE_DATA_DIR}/claude.json" "${CLAUDE_JSON}"
        echo "  → Created symlink for .claude.json"
    fi

    # Handle .claude directory
    if [ ! -L "${CLAUDE_DIR}" ]; then
        # If it's a real directory, move it to the persistent volume
        if [ -d "${CLAUDE_DIR}" ]; then
            # Only copy if persistent directory is empty or doesn't exist
            if [ ! -d "${CLAUDE_DATA_DIR}/claude_dir" ] || [ -z "$(ls -A "${CLAUDE_DATA_DIR}/claude_dir" 2>/dev/null)" ]; then
                cp -r "${CLAUDE_DIR}" "${CLAUDE_DATA_DIR}/claude_dir"
            fi
            rm -rf "${CLAUDE_DIR}"
        else
            mkdir -p "${CLAUDE_DATA_DIR}/claude_dir"
        fi
        # Create symlink
        ln -sf "${CLAUDE_DATA_DIR}/claude_dir" "${CLAUDE_DIR}"
    fi

    # Handle .claude.json.backup file if exists
    if [ -f "${CLAUDE_JSON_BACKUP}" ] && [ ! -L "${CLAUDE_JSON_BACKUP}" ]; then
        if [ ! -f "${CLAUDE_DATA_DIR}/claude.json.backup" ]; then
            cp "${CLAUDE_JSON_BACKUP}" "${CLAUDE_DATA_DIR}/claude.json.backup"
        fi
        rm "${CLAUDE_JSON_BACKUP}"
        ln -sf "${CLAUDE_DATA_DIR}/claude.json.backup" "${CLAUDE_JSON_BACKUP}"
    fi

    # Handle .config/claude-code directory (auth tokens from native installer)
    CLAUDE_CONFIG_DIR="${USER_HOME}/.config/claude-code"
    mkdir -p "${USER_HOME}/.config"
    if [ ! -L "${CLAUDE_CONFIG_DIR}" ]; then
        if [ -d "${CLAUDE_CONFIG_DIR}" ]; then
            # Only seed from image if volume has no existing data
            if [ ! -d "${CLAUDE_DATA_DIR}/config_claude_code" ] || [ -z "$(ls -A "${CLAUDE_DATA_DIR}/config_claude_code" 2>/dev/null)" ]; then
                cp -r "${CLAUDE_CONFIG_DIR}" "${CLAUDE_DATA_DIR}/config_claude_code"
            fi
            rm -rf "${CLAUDE_CONFIG_DIR}"
        else
            mkdir -p "${CLAUDE_DATA_DIR}/config_claude_code"
        fi
        ln -sf "${CLAUDE_DATA_DIR}/config_claude_code" "${CLAUDE_CONFIG_DIR}"
    fi

    echo "Claude CLI persistence setup complete for ${USER_HOME}"
}

# Setup Claude persistence for node user
setup_claude_persistence_for_user "/home/node"
chown -R node:node /home/node/.claude_data /home/node/.claude.json /home/node/.claude /home/node/.config/claude-code 2>/dev/null || true

# Setup Codex CLI persistence with symlinks for a given user
# This ensures OpenAI Codex config persists across container rebuilds
setup_codex_persistence_for_user() {
    USER_HOME="$1"
    CODEX_DATA_DIR="${USER_HOME}/.codex_data"
    CODEX_DIR="${USER_HOME}/.codex"

    # Ensure the persistent data directory exists
    mkdir -p "${CODEX_DATA_DIR}"

    # Handle .codex directory
    if [ ! -L "${CODEX_DIR}" ]; then
        # If it's a real directory, move it to the persistent volume
        if [ -d "${CODEX_DIR}" ]; then
            # Only copy if persistent directory is empty or doesn't exist
            if [ ! -d "${CODEX_DATA_DIR}/codex_dir" ] || [ -z "$(ls -A "${CODEX_DATA_DIR}/codex_dir" 2>/dev/null)" ]; then
                cp -r "${CODEX_DIR}" "${CODEX_DATA_DIR}/codex_dir"
            fi
            rm -rf "${CODEX_DIR}"
        else
            mkdir -p "${CODEX_DATA_DIR}/codex_dir"
        fi
        # Create symlink
        ln -sf "${CODEX_DATA_DIR}/codex_dir" "${CODEX_DIR}"
    fi
}

# Setup Codex persistence for node user
setup_codex_persistence_for_user "/home/node"
chown -R node:node /home/node/.codex_data /home/node/.codex 2>/dev/null || true

# Setup Cursor CLI persistence with symlinks for a given user
# This ensures Cursor CLI config persists across container rebuilds
# Cursor stores data in two locations:
#   - ~/.cursor (CLI config, chats, projects)
#   - ~/.config/cursor (auth tokens - accessToken, refreshToken)
setup_cursor_persistence_for_user() {
    USER_HOME="$1"
    CURSOR_DATA_DIR="${USER_HOME}/.cursor_data"
    CURSOR_DIR="${USER_HOME}/.cursor"
    CURSOR_CONFIG_DIR="${USER_HOME}/.config/cursor"

    # Ensure the persistent data directory exists
    mkdir -p "${CURSOR_DATA_DIR}"

    # Handle .cursor directory (CLI config, chats, projects)
    if [ ! -L "${CURSOR_DIR}" ]; then
        # If it's a real directory, move it to the persistent volume
        if [ -d "${CURSOR_DIR}" ]; then
            # Only copy if persistent directory is empty or doesn't exist (PRESERVE existing data!)
            if [ ! -d "${CURSOR_DATA_DIR}/cursor_dir" ] || [ -z "$(ls -A "${CURSOR_DATA_DIR}/cursor_dir" 2>/dev/null)" ]; then
                echo "  → First run: copying fresh Cursor CLI to persistent volume"
                cp -r "${CURSOR_DIR}" "${CURSOR_DATA_DIR}/cursor_dir"
            else
                echo "  → Preserving existing Cursor CLI data from persistent volume"
            fi
            rm -rf "${CURSOR_DIR}"
        else
            mkdir -p "${CURSOR_DATA_DIR}/cursor_dir"
        fi
        # Create symlink
        ln -sf "${CURSOR_DATA_DIR}/cursor_dir" "${CURSOR_DIR}"
    fi

    # Handle .config/cursor directory (auth tokens)
    mkdir -p "${USER_HOME}/.config"
    if [ ! -L "${CURSOR_CONFIG_DIR}" ]; then
        # If it's a real directory, move it to the persistent volume
        if [ -d "${CURSOR_CONFIG_DIR}" ]; then
            # Only copy if persistent directory is empty or doesn't exist (PRESERVE existing data!)
            if [ ! -d "${CURSOR_DATA_DIR}/config_cursor" ] || [ -z "$(ls -A "${CURSOR_DATA_DIR}/config_cursor" 2>/dev/null)" ]; then
                echo "  → First run: copying fresh Cursor config to persistent volume"
                cp -r "${CURSOR_CONFIG_DIR}" "${CURSOR_DATA_DIR}/config_cursor"
            else
                echo "  → Preserving existing Cursor config from persistent volume"
            fi
            rm -rf "${CURSOR_CONFIG_DIR}"
        else
            mkdir -p "${CURSOR_DATA_DIR}/config_cursor"
        fi
        ln -sf "${CURSOR_DATA_DIR}/config_cursor" "${CURSOR_CONFIG_DIR}"
    fi
}

# Setup Cursor persistence for node user
setup_cursor_persistence_for_user "/home/node"
chown -R node:node /home/node/.cursor_data /home/node/.cursor /home/node/.config 2>/dev/null || true

# Setup GitHub CLI persistence with symlinks for a given user
# This ensures gh config persists across container rebuilds
setup_gh_persistence_for_user() {
    USER_HOME="$1"
    GH_DATA_DIR="${USER_HOME}/.gh_data"
    GH_CONFIG_DIR="${USER_HOME}/.config/gh"

    # Ensure the persistent data directory exists
    mkdir -p "${GH_DATA_DIR}"

    # Handle .config/gh directory
    if [ ! -L "${GH_CONFIG_DIR}" ]; then
        # Create parent directory if needed
        mkdir -p "${USER_HOME}/.config"

        # If it's a real directory, move it to the persistent volume
        if [ -d "${GH_CONFIG_DIR}" ]; then
            # Only copy if persistent directory is empty or doesn't exist
            if [ ! -d "${GH_DATA_DIR}/gh_dir" ] || [ -z "$(ls -A "${GH_DATA_DIR}/gh_dir" 2>/dev/null)" ]; then
                cp -r "${GH_CONFIG_DIR}" "${GH_DATA_DIR}/gh_dir"
            fi
            rm -rf "${GH_CONFIG_DIR}"
        else
            mkdir -p "${GH_DATA_DIR}/gh_dir"
        fi
        # Create symlink
        ln -sf "${GH_DATA_DIR}/gh_dir" "${GH_CONFIG_DIR}"
    fi
}

# Setup GitHub CLI persistence for node user
setup_gh_persistence_for_user "/home/node"
chown -R node:node /home/node/.gh_data /home/node/.config 2>/dev/null || true

# Setup Dailybot CLI persistence with symlinks for a given user
# This ensures Dailybot config/auth (~/.config/dailybot) persists across container rebuilds
setup_dailybot_persistence_for_user() {
    USER_HOME="$1"
    DAILYBOT_DATA_DIR="${USER_HOME}/.dailybot_data"
    DAILYBOT_CONFIG_DIR="${USER_HOME}/.config/dailybot"

    # Ensure the persistent data directory exists
    mkdir -p "${DAILYBOT_DATA_DIR}"
    mkdir -p "${USER_HOME}/.config"

    # Handle .config/dailybot directory (CLI config + auth session)
    if [ ! -L "${DAILYBOT_CONFIG_DIR}" ]; then
        # If it's a real directory, move it to the persistent volume
        if [ -d "${DAILYBOT_CONFIG_DIR}" ]; then
            # Only seed from image if volume has no existing data
            if [ ! -d "${DAILYBOT_DATA_DIR}/config_dailybot" ] || [ -z "$(ls -A "${DAILYBOT_DATA_DIR}/config_dailybot" 2>/dev/null)" ]; then
                cp -r "${DAILYBOT_CONFIG_DIR}" "${DAILYBOT_DATA_DIR}/config_dailybot"
            fi
            rm -rf "${DAILYBOT_CONFIG_DIR}"
        else
            mkdir -p "${DAILYBOT_DATA_DIR}/config_dailybot"
        fi
        # Create symlink
        ln -sf "${DAILYBOT_DATA_DIR}/config_dailybot" "${DAILYBOT_CONFIG_DIR}"
    fi
}

# Setup Dailybot CLI persistence for node user
setup_dailybot_persistence_for_user "/home/node"
chown -R node:node /home/node/.dailybot_data /home/node/.config/dailybot 2>/dev/null || true

# Setup Z.AI Coding Tool Helper persistence (@z_ai/coding-helper → ~/.chelper)
setup_chelper_persistence_for_user() {
    USER_HOME="$1"
    CHELPER_DATA_DIR="${USER_HOME}/.chelper_data"
    CHELPER_DIR="${USER_HOME}/.chelper"

    mkdir -p "${CHELPER_DATA_DIR}"

    if [ ! -L "${CHELPER_DIR}" ]; then
        if [ -d "${CHELPER_DIR}" ]; then
            if [ ! -d "${CHELPER_DATA_DIR}/chelper_dir" ] || [ -z "$(ls -A "${CHELPER_DATA_DIR}/chelper_dir" 2>/dev/null)" ]; then
                cp -r "${CHELPER_DIR}" "${CHELPER_DATA_DIR}/chelper_dir"
            fi
            rm -rf "${CHELPER_DIR}"
        else
            mkdir -p "${CHELPER_DATA_DIR}/chelper_dir"
        fi
        ln -sf "${CHELPER_DATA_DIR}/chelper_dir" "${CHELPER_DIR}"
    fi
}

setup_chelper_persistence_for_user "/home/node"
chown -R node:node /home/node/.chelper_data /home/node/.chelper 2>/dev/null || true

# OpenCode: ~/.config/opencode + ~/.local/share/opencode
setup_opencode_persistence_for_user() {
    USER_HOME="$1"
    OPENCODE_DATA_DIR="${USER_HOME}/.opencode_data"
    OPENCODE_CONFIG_DIR="${USER_HOME}/.config/opencode"
    OPENCODE_SHARE_DIR="${USER_HOME}/.local/share/opencode"

    mkdir -p "${OPENCODE_DATA_DIR}"
    mkdir -p "${USER_HOME}/.config"
    mkdir -p "${USER_HOME}/.local/share"

    if [ ! -L "${OPENCODE_CONFIG_DIR}" ]; then
        if [ -d "${OPENCODE_CONFIG_DIR}" ]; then
            if [ ! -d "${OPENCODE_DATA_DIR}/config_opencode" ] || [ -z "$(ls -A "${OPENCODE_DATA_DIR}/config_opencode" 2>/dev/null)" ]; then
                cp -r "${OPENCODE_CONFIG_DIR}" "${OPENCODE_DATA_DIR}/config_opencode"
            fi
            rm -rf "${OPENCODE_CONFIG_DIR}"
        else
            mkdir -p "${OPENCODE_DATA_DIR}/config_opencode"
        fi
        ln -sf "${OPENCODE_DATA_DIR}/config_opencode" "${OPENCODE_CONFIG_DIR}"
    fi

    if [ ! -L "${OPENCODE_SHARE_DIR}" ]; then
        if [ -d "${OPENCODE_SHARE_DIR}" ]; then
            if [ ! -d "${OPENCODE_DATA_DIR}/share_opencode" ] || [ -z "$(ls -A "${OPENCODE_DATA_DIR}/share_opencode" 2>/dev/null)" ]; then
                cp -r "${OPENCODE_SHARE_DIR}" "${OPENCODE_DATA_DIR}/share_opencode"
            fi
            rm -rf "${OPENCODE_SHARE_DIR}"
        else
            mkdir -p "${OPENCODE_DATA_DIR}/share_opencode"
        fi
        ln -sf "${OPENCODE_DATA_DIR}/share_opencode" "${OPENCODE_SHARE_DIR}"
    fi
}

setup_opencode_persistence_for_user "/home/node"
chown -R node:node /home/node/.opencode_data /home/node/.config/opencode /home/node/.local/share/opencode 2>/dev/null || true

# Pi Coding Agent: ~/.pi (sessions, models.json, auth)
setup_pi_persistence_for_user() {
    USER_HOME="$1"
    PI_DATA_DIR="${USER_HOME}/.pi_data"
    PI_DIR="${USER_HOME}/.pi"

    mkdir -p "${PI_DATA_DIR}"

    if [ ! -L "${PI_DIR}" ]; then
        if [ -d "${PI_DIR}" ]; then
            if [ ! -d "${PI_DATA_DIR}/pi_dir" ] || [ -z "$(ls -A "${PI_DATA_DIR}/pi_dir" 2>/dev/null)" ]; then
                cp -r "${PI_DIR}" "${PI_DATA_DIR}/pi_dir"
            fi
            rm -rf "${PI_DIR}"
        else
            mkdir -p "${PI_DATA_DIR}/pi_dir"
        fi
        ln -sf "${PI_DATA_DIR}/pi_dir" "${PI_DIR}"
    fi
}

setup_pi_persistence_for_user "/home/node"
chown -R node:node /home/node/.pi_data /home/node/.pi 2>/dev/null || true

# Herdr: ~/.config/herdr (config.toml + logs; binary stays in ~/.local/bin from the image)
setup_herdr_persistence_for_user() {
    USER_HOME="$1"
    HERDR_DATA_DIR="${USER_HOME}/.herdr_data"
    HERDR_CONFIG_DIR="${USER_HOME}/.config/herdr"

    mkdir -p "${HERDR_DATA_DIR}"
    mkdir -p "${USER_HOME}/.config"

    if [ ! -L "${HERDR_CONFIG_DIR}" ]; then
        if [ -d "${HERDR_CONFIG_DIR}" ]; then
            if [ ! -d "${HERDR_DATA_DIR}/config_herdr" ] || [ -z "$(ls -A "${HERDR_DATA_DIR}/config_herdr" 2>/dev/null)" ]; then
                cp -r "${HERDR_CONFIG_DIR}" "${HERDR_DATA_DIR}/config_herdr"
            fi
            rm -rf "${HERDR_CONFIG_DIR}"
        else
            mkdir -p "${HERDR_DATA_DIR}/config_herdr"
        fi
        ln -sf "${HERDR_DATA_DIR}/config_herdr" "${HERDR_CONFIG_DIR}"
    fi
}

setup_herdr_persistence_for_user "/home/node"
chown -R node:node /home/node/.herdr_data /home/node/.config/herdr 2>/dev/null || true

# Grok/xAI CLI: ~/.grok (binary + config) + ~/.local/bin/grok
setup_grok_persistence_for_user() {
    USER_HOME="$1"
    GROK_DATA_DIR="${USER_HOME}/.grok_data"
    GROK_DIR="${USER_HOME}/.grok"
    GROK_BIN="${USER_HOME}/.local/bin/grok"

    mkdir -p "${GROK_DATA_DIR}"

    # Handle ~/.grok directory (contains downloads/ with binary + config)
    if [ ! -L "${GROK_DIR}" ]; then
        if [ -d "${GROK_DIR}" ]; then
            if [ ! -d "${GROK_DATA_DIR}/grok_dir" ] || [ -z "$(ls -A "${GROK_DATA_DIR}/grok_dir" 2>/dev/null)" ]; then
                echo "  → First run: copying fresh Grok CLI to persistent volume"
                cp -r "${GROK_DIR}" "${GROK_DATA_DIR}/grok_dir"
            else
                echo "  → Preserving existing Grok CLI data from persistent volume"
            fi
            rm -rf "${GROK_DIR}"
        else
            mkdir -p "${GROK_DATA_DIR}/grok_dir"
        fi
        ln -sf "${GROK_DATA_DIR}/grok_dir" "${GROK_DIR}"
    fi

    # Handle ~/.local/bin/grok shim (NOT agent - agent belongs to Cursor)
    mkdir -p "${USER_HOME}/.local/bin"
    # If agent points to grok binary, restore it to cursor-agent
    if [ -L "${USER_HOME}/.local/bin/agent" ]; then
        AGENT_TARGET="$(readlink ${USER_HOME}/.local/bin/agent 2>/dev/null || true)"
        if echo "$AGENT_TARGET" | grep -qE 'grok|grok_data'; then
            rm -f "${USER_HOME}/.local/bin/agent"
            # Restore cursor-agent if cursor_data has it
            if [ -f "${USER_HOME}/.cursor_data/cursor_dir/versions/2026.09.10-fd3934a/cursor-agent" ]; then
                ln -sf "${USER_HOME}/.cursor_data/cursor_dir/versions/2026.09.10-fd3934a/cursor-agent" "${USER_HOME}/.local/bin/agent"
            fi
        fi
    fi
    if [ ! -L "${GROK_BIN}" ]; then
        if [ -f "${GROK_BIN}" ] && [ ! -L "${GROK_BIN}" ]; then
            if [ ! -f "${GROK_DATA_DIR}/grok" ]; then
                cp "${GROK_BIN}" "${GROK_DATA_DIR}/grok"
            fi
            rm -f "${GROK_BIN}"
        fi
        if [ -f "${GROK_DATA_DIR}/grok" ]; then
            ln -sf "${GROK_DATA_DIR}/grok" "${GROK_BIN}"
        fi
    fi
}

setup_grok_persistence_for_user "/home/node"
chown -R node:node /home/node/.grok_data /home/node/.grok /home/node/.local/bin/grok 2>/dev/null || true

# Ensure Grok CLI is installed (install on first run if missing)
ensure_grok_installed() {
    if [ ! -f "/home/node/.grok/downloads/grok-linux-aarch64" ] && [ ! -f "/home/node/.grok_data/grok_dir/downloads/grok-linux-aarch64" ]; then
        echo "Grok CLI not found, installing..."
        GROK_BIN_DIR="/home/node/.local/bin" GROK_CHANNEL=stable bash <(curl -fsSL https://x.ai/cli/install.sh) 2>&1 | tail -5 || true
        # Move binary to persistent location if it landed elsewhere
        if [ -f "/home/node/.grok/downloads/grok-linux-aarch64" ]; then
            mkdir -p "/home/node/.grok_data/grok_dir/downloads"
            cp "/home/node/.grok/downloads/grok-linux-aarch64" "/home/node/.grok_data/grok_dir/downloads/"
            rm -rf "/home/node/.grok"
            ln -sf "/home/node/.grok_data/grok_dir" "/home/node/.grok"
        fi
    fi
}

ensure_grok_installed

# Ensure Herdr panes use bash (so ~/.bashrc → custom_commands.sh loads),
# open in /app, and capture mouse for sidebar clicks. Existing herdr_data
# volumes may predate these keys — seed a full file or patch missing keys.
ensure_herdr_bash_shell_config() {
    HERDR_CONFIG="${1}/.config/herdr/config.toml"
    mkdir -p "$(dirname "${HERDR_CONFIG}")"
    if [ ! -f "${HERDR_CONFIG}" ] || ! grep -q 'default_shell' "${HERDR_CONFIG}" 2>/dev/null; then
        cat > "${HERDR_CONFIG}" <<'EOF'
# Seeded by entrypoint for DWP website container.
# Ensures panes use bash so ~/.bashrc (custom_commands.sh) is sourced.
# Docs: https://herdr.dev/docs/configuration/

onboarding = false

[terminal]
default_shell = "/bin/bash"
# Linux interactive non-login bash sources ~/.bashrc.
shell_mode = "non_login"
# New panes/tabs/workspaces land in the mounted repo root.
new_cwd = "/app"

[ui]
# Capture mouse so sidebar workspace/tab clicks work in the terminal.
mouse_capture = true
EOF
        return 0
    fi

    if ! grep -q 'new_cwd' "${HERDR_CONFIG}" 2>/dev/null; then
        # Volume predates new_cwd — append under [terminal] without wiping user edits.
        if grep -q '^\[terminal\]' "${HERDR_CONFIG}" 2>/dev/null; then
            awk '
                BEGIN { added = 0 }
                /^\[terminal\]/ { print; print "new_cwd = \"/app\""; added = 1; next }
                { print }
                END {
                    if (!added) {
                        print ""
                        print "[terminal]"
                        print "new_cwd = \"/app\""
                    }
                }
            ' "${HERDR_CONFIG}" > "${HERDR_CONFIG}.tmp" \
                && mv "${HERDR_CONFIG}.tmp" "${HERDR_CONFIG}"
        else
            printf '\n[terminal]\nnew_cwd = "/app"\n' >> "${HERDR_CONFIG}"
        fi
    fi

    if ! grep -q 'mouse_capture' "${HERDR_CONFIG}" 2>/dev/null; then
        if grep -q '^\[ui\]' "${HERDR_CONFIG}" 2>/dev/null; then
            awk '
                BEGIN { added = 0 }
                /^\[ui\]/ { print; print "mouse_capture = true"; added = 1; next }
                { print }
                END {
                    if (!added) {
                        print ""
                        print "[ui]"
                        print "mouse_capture = true"
                    }
                }
            ' "${HERDR_CONFIG}" > "${HERDR_CONFIG}.tmp" \
                && mv "${HERDR_CONFIG}.tmp" "${HERDR_CONFIG}"
        else
            printf '\n[ui]\nmouse_capture = true\n' >> "${HERDR_CONFIG}"
        fi
    fi
}
ensure_herdr_bash_shell_config "/home/node"

# Setup SSH keys from host with correct permissions for a given user
# This allows git operations with GitHub/GitLab
setup_ssh_keys_for_user() {
    USER_HOME="$1"
    SSH_HOST_DIR="${USER_HOME}/.ssh_host"
    SSH_DIR="${USER_HOME}/.ssh"

    # Only setup if host SSH directory is mounted
    if [ -d "${SSH_HOST_DIR}" ]; then
        # Create SSH directory if it doesn't exist
        mkdir -p "${SSH_DIR}"

        # Check if SSH keys already exist in container
        KEYS_EXIST=false
        if [ -f "${SSH_DIR}/id_rsa" ] || [ -f "${SSH_DIR}/id_ed25519" ] || [ -f "${SSH_DIR}/id_ecdsa" ]; then
            KEYS_EXIST=true
        fi

        # Only copy if keys don't exist yet (to avoid overwriting persistent volume)
        if [ "$KEYS_EXIST" = false ]; then
            echo "Setting up SSH keys from host for ${USER_HOME}..."

            # Copy ALL private keys from host (id_rsa, id_ed25519, id_ecdsa, id_rsa_personal, etc.)
            for key_file in "${SSH_HOST_DIR}"/id_*; do
                if [ -f "$key_file" ]; then
                    key_name=$(basename "$key_file")
                    # Skip public keys (*.pub)
                    if [[ "$key_name" != *.pub ]]; then
                        cp "$key_file" "${SSH_DIR}/$key_name"
                        chmod 600 "${SSH_DIR}/$key_name"
                        echo "  ✓ Copied $key_name"
                    fi
                fi
            done

            # Copy public keys
            cp "${SSH_HOST_DIR}"/*.pub "${SSH_DIR}/" 2>/dev/null || true

            # Copy config if exists
            if [ -f "${SSH_HOST_DIR}/config" ]; then
                cp "${SSH_HOST_DIR}/config" "${SSH_DIR}/config"
                chmod 600 "${SSH_DIR}/config"
                echo "  ✓ Copied SSH config"
            fi

            # Copy known_hosts if exists (git can write to it)
            if [ -f "${SSH_HOST_DIR}/known_hosts" ]; then
                cp "${SSH_HOST_DIR}/known_hosts" "${SSH_DIR}/known_hosts"
                echo "  ✓ Copied known_hosts"
            fi

            echo "SSH keys setup completed for ${USER_HOME}"
        fi

        # Always ensure correct permissions (even if keys already existed)
        chmod 700 "${SSH_DIR}" 2>/dev/null || true
        chmod 600 "${SSH_DIR}"/id_* 2>/dev/null || true
        chmod 600 "${SSH_DIR}/config" 2>/dev/null || true
    fi
}

# Setup SSH keys for node user
setup_ssh_keys_for_user "/home/node"
chown -R node:node /home/node/.ssh 2>/dev/null || true

# Setup Node.js specific configurations
setup_nodejs() {
    # Ensure pnpm store and state directories exist with correct ownership.
    # pnpm uses ~/.local/share/pnpm (store + global bin) — npm's ~/.npm is unused.
    mkdir -p /home/node/.local/share/pnpm
    chown -R node:node /home/node/.local/share/pnpm 2>/dev/null || true
}

# Setup Git configuration (simplified - main config is in Dockerfile)
setup_git() {
    # Check if git configuration is mounted from host
    if [ -f "/home/node/.gitconfig" ]; then
        echo "Git configuration found and mounted from host"
    else
        echo "Using default Git configuration from Dockerfile"
    fi
}

# Main setup function
main() {
    echo "Starting container setup..."

    # Run all setup functions
    setup_nodejs
    setup_git
    ensure_grok_installed

    echo "Container setup completed"

    # Execute the main command
    exec "$@"
}

# Run main function with all arguments
main "$@"
