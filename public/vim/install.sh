#!/usr/bin/env bash
#
# DeepWorkPlan Vim — self-contained installer for release v0.4.1.
#
# Published at  : https://deepworkplan.com/vim/install.sh
#                 and as the install.sh asset (with SHA256SUMS) of each
#                 release: https://github.com/DailybotHQ/deepworkplan-vim/releases
# Repository    : https://github.com/DailybotHQ/deepworkplan-vim
# License       : GPL-3.0 (the configuration it installs is GPL-3.0)
#
# Usage — download, verify, then run:
#   curl -fsSL -o install.sh https://deepworkplan.com/vim/install.sh
#   curl -fsSL -o install.sh.sha256 https://deepworkplan.com/vim/install.sh.sha256
#   shasum -a 256 -c install.sh.sha256      # Linux: sha256sum -c install.sh.sha256
#   bash install.sh
# Run it from a terminal: it asks before touching an existing config.
# For a check from a second origin, compare the hash with the install.sh
# line of SHA256SUMS on the GitHub release (release tags are immutable).
#
# What it does, in order:
#   1. Preflight — detects OS and package manager; installs git, curl, and
#      a Lua interpreter if any are missing.
#   2. Consent   — an existing, foreign Neovim config is NEVER overwritten.
#      Interactively you are asked before it is moved to
#      ~/.config/previous-deepworkplan-vim; piped without a terminal the
#      script aborts with instructions instead of touching anything.
#   3. Clones (or updates, on re-run) the repository into ~/.config/nvim.
#   4. Runs the repository's own `lua install.lua` (system packages,
#      pckr.nvim, font — it owns every step, this wrapper owns none).
#   5. Bootstraps plugins headlessly — no quit-and-reopen dance.
#
# Environment overrides:
#   DWP_VIM_REF             tag, branch, or commit to install (default: this
#                           script's release, v0.4.1; "main" follows main)
#   DWP_VIM_SOURCE          repository URL or a local path (offline installs)
#   DWP_VIM_DIR             destination directory (default: ~/.config/nvim)
#   DWP_VIM_SKIP_PACKAGES   set to 1 to install no system package — the
#                           image already has them (containers, CI): a
#                           missing git, curl or Lua stops the run, and
#                           install.lua skips its package step too
#   DWP_VIM_BOOTSTRAP_TIMEOUT  seconds allowed for the headless plugin
#                           install (default: 900)
#
# Windows: use winget plus Git Bash, or run the steps above inside WSL,
# where they work as-is:
#   winget install -e --id Neovim.Neovim --accept-package-agreements --accept-source-agreements
#   git clone --branch v0.4.1 https://github.com/DailybotHQ/deepworkplan-vim.git "$LOCALAPPDATA/nvim"
#   cd "$LOCALAPPDATA/nvim" && lua install.lua
#
set -euo pipefail

# The whole script is one function, called on the last line: bash parses
# all of it before running anything. When the download is piped into bash
# the script arrives on stdin, so nothing it runs may read stdin — and no
# half-downloaded script can run partially.
main() {

REPO_URL="https://github.com/DailybotHQ/deepworkplan-vim.git"
# The release this script belongs to: it installs exactly that tag unless
# DWP_VIM_REF names another tag, branch or commit (DWP_VIM_REF=main follows
# the moving main branch — only when asked for).
RELEASE_REF="v0.4.1"
REF="${DWP_VIM_REF:-$RELEASE_REF}"
SOURCE="${DWP_VIM_SOURCE:-$REPO_URL}"
DEST="${DWP_VIM_DIR:-$HOME/.config/nvim}"
BACKUP_DIR="$HOME/.config/previous-deepworkplan-vim"
BOOTSTRAP_TIMEOUT="${DWP_VIM_BOOTSTRAP_TIMEOUT:-900}"
# Images and CI that already carry every dependency: install no system
# package here, and install.lua skips its package step too. Off when unset,
# empty or 0.
SKIP_PACKAGES=0
case "${DWP_VIM_SKIP_PACKAGES:-}" in
  '' | 0) ;;
  *) SKIP_PACKAGES=1 ;;
esac

say() { printf '%s\n' "$*"; }
die() { printf 'install.sh: %s\n' "$*" >&2; exit 1; }

# Refs and sources reach git as arguments: never as options.
case "$REF" in -*) die "DWP_VIM_REF must not start with '-' (got '$REF')" ;; esac
case "$SOURCE" in -*) die "DWP_VIM_SOURCE must not start with '-' (got '$SOURCE')" ;; esac

# --- 1. Preflight -----------------------------------------------------------

case "$(uname -s)" in
  Linux* | Darwin*) ;;
  MINGW* | MSYS* | CYGWIN*)
    say "Windows shell detected (Git Bash / MSYS). This script targets macOS, Linux, and WSL."
    say "On Windows use winget plus Git Bash, or WSL:"
    say "  winget install -e --id Neovim.Neovim --accept-package-agreements --accept-source-agreements"
    say "  git clone --branch $REF $REPO_URL \"\$LOCALAPPDATA/nvim\""
    say "  cd \"\$LOCALAPPDATA/nvim\" && lua install.lua"
    exit 1
    ;;
  *) die "unsupported OS: $(uname -s)" ;;
esac

detect_manager() {
  if command -v brew >/dev/null 2>&1; then echo "brew"
  elif command -v pacman >/dev/null 2>&1; then echo "pacman"
  elif command -v apt-get >/dev/null 2>&1; then echo "apt-get"
  elif command -v dnf >/dev/null 2>&1; then echo "dnf"
  else echo "none"; fi
}

find_lua() {
  for l in lua5.4 lua luajit; do
    if command -v "$l" >/dev/null 2>&1; then echo "$l"; return 0; fi
  done
  return 1
}

MANAGER="$(detect_manager)"

# Root runs package commands bare (containers have no sudo binary);
# Homebrew never uses sudo.
SUDO=()
if [ "$(id -u)" != "0" ] && [ "$MANAGER" != "brew" ]; then
  SUDO=(sudo)
fi

install_pkgs() {
  case "$MANAGER" in
    brew) "${SUDO[@]+"${SUDO[@]}"}" brew install "$@" ;;
    pacman) "${SUDO[@]+"${SUDO[@]}"}" pacman -Sy --noconfirm "$@" ;;
    apt-get) "${SUDO[@]+"${SUDO[@]}"}" apt-get update && "${SUDO[@]+"${SUDO[@]}"}" apt-get install -y "$@" ;;
    dnf) "${SUDO[@]+"${SUDO[@]}"}" dnf install -y "$@" ;;
    *) return 1 ;;
  esac
}

tools_missing=()
command -v git >/dev/null 2>&1 || tools_missing+=(git)
command -v curl >/dev/null 2>&1 || tools_missing+=(curl)
LUA="$(find_lua || true)"
if [ -z "$LUA" ]; then
  tools_missing+=(lua)
fi

if [ "$SKIP_PACKAGES" = 1 ]; then
  if [ "${#tools_missing[@]}" -gt 0 ]; then
    die "missing: ${tools_missing[*]} — DWP_VIM_SKIP_PACKAGES is set, so no system package is installed. Add them to the image (or unset DWP_VIM_SKIP_PACKAGES) and rerun."
  fi
  say "==> DWP_VIM_SKIP_PACKAGES is set: no system packages will be installed"
fi

if [ "${#tools_missing[@]}" -gt 0 ]; then
  if [ "$MANAGER" = "none" ]; then
    if [ "$(uname -s)" = "Darwin" ]; then
      die "missing: ${tools_missing[*]} — and Homebrew was not found. Install it from https://brew.sh (copy the command from that page into Terminal), then reopen Terminal and rerun."
    fi
    die "missing: ${tools_missing[*]} — and no supported package manager found (need brew, pacman, apt, or dnf). Install them, then rerun."
  fi
  say "==> Installing missing tools with $MANAGER: ${tools_missing[*]}"
  # lua is resolved separately: Debian-family package names carry a version.
  for tool in "${tools_missing[@]}"; do
    if [ "$tool" = "lua" ]; then
      if [ "$MANAGER" = "apt-get" ]; then
        # Older Debian/Ubuntu releases ship Lua 5.3 only.
        install_pkgs lua5.4 || install_pkgs lua5.3
      else
        install_pkgs lua
      fi
    else
      install_pkgs "$tool"
    fi
  done
  if [ -z "$LUA" ]; then
    LUA="$(find_lua || true)"
    if [ -z "$LUA" ]; then
      die "no Lua interpreter after install — install lua (5.4, 5.3, or luajit) and rerun"
    fi
  fi
fi

# --- 2. Destination: consent, update, or clean clone -------------------------

is_ours() {
  # $1 must BE the work-tree root, not merely sit inside one — a
  # destination nested in any other checkout must not be misdetected as
  # ours (git -C happily walks up to an outer repository).
  local top
  top="$(git -C "$1" rev-parse --show-toplevel 2>/dev/null)" || return 1
  [ "$top" = "$(cd "$1" && pwd -P)" ] || return 1
  # Identity is what the checkout contains, not where it was cloned from:
  # a clone from a local mirror or a renamed fork is still ours, and the
  # remote-URL substring alone misses those. install.lua + lua/plugins.lua
  # is the pair delete.lua's looks_like_dwpvim knows (required AND here,
  # not or); the URL check stays as the fallback for partial checkouts.
  [ -f "$1/install.lua" ] && [ -f "$1/lua/plugins.lua" ] && return 0
  git -C "$1" remote get-url origin 2>/dev/null | grep -q 'deepworkplan-vim'
}

dir_has_content() {
  [ -n "$(ls -A "$1" 2>/dev/null)" ]
}

# Ask a consent question. Returns 0 = yes, 1 = no, 2 = cannot ask
# (piped without a terminal: no /dev/tty and stdin is not a TTY).
ask_consent() {
  local answer=""
  # Probe with a real open: without a controlling terminal /dev/tty passes
  # [ -r ] (the node is world-writable) yet fails to open.
  if : </dev/tty 2>/dev/null; then
    printf '%s [y/N]: ' "$1" >/dev/tty
    IFS= read -r answer </dev/tty || return 1
  elif [ -t 0 ]; then
    printf '%s [y/N]: ' "$1"
    IFS= read -r answer || return 1
  else
    return 2
  fi
  case "$answer" in
    [Yy] | [Yy][Ee][Ss]) return 0 ;;
    *) return 1 ;;
  esac
}

if [ -e "$DEST" ] && [ ! -d "$DEST" ]; then
  die "$DEST exists and is not a directory — resolve it manually and rerun"
fi

if [ -d "$DEST" ] && dir_has_content "$DEST" && ! is_ours "$DEST"; then
  # A foreign Neovim config exists. It is never overwritten silently.
  if [ -e "$BACKUP_DIR" ]; then
    die "an existing Neovim config was found at $DEST, and the backup path $BACKUP_DIR already exists — move or remove one of them and rerun. Nothing was touched."
  fi
  rc=0
  ask_consent "An existing Neovim config was found at $DEST. Move it to $BACKUP_DIR and continue?" || rc=$?
  if [ "$rc" -eq 2 ]; then
    say ""
    say "An existing Neovim config was found at $DEST. Nothing was changed."
    say "This script ran without a terminal, so it cannot ask what to do."
    say "Either:"
    say "  1. run it interactively — download it, then run it in a terminal:"
    say "       curl -fsSL -o install.sh https://deepworkplan.com/vim/install.sh"
    say "       bash install.sh"
    say "  2. or move the config aside first, then run the installer again:"
    say "       mv '$DEST' '$BACKUP_DIR'"
    die "refusing to touch an existing config unattended"
  fi
  if [ "$rc" -ne 0 ]; then
    die "aborted — nothing was touched"
  fi
  say "==> Moving the existing config to $BACKUP_DIR"
  mkdir -p "$HOME/.config"
  mv -- "$DEST" "$BACKUP_DIR" || die "could not move $DEST to $BACKUP_DIR — nothing was deleted"
fi

if is_ours "$DEST"; then
  say "==> Existing DeepWorkPlan Vim install at $DEST — updating to '$REF'"
  # DWP_VIM_SOURCE redirects the update too (offline installs, local
  # mirrors); unset, the update pulls from the clone's own origin.
  FETCH_SOURCE="${DWP_VIM_SOURCE:-origin}"
  # The tag is fetched into a private ref, never over refs/tags: a local
  # tag of the same name (the user's own) is left exactly as it is.
  if git -C "$DEST" fetch -q "$FETCH_SOURCE" "+refs/tags/$REF:refs/dwp-vim/release" 2>/dev/null; then
    # A release tag (the default): pin the checkout to it, detached. Local
    # work is never left behind silently: a HEAD carrying commits that no
    # remote branch or tag holds stops the run, like the branch path below
    # (final-review finding R2). An older or newer upstream commit simply
    # moves to the tag.
    TARGET="$(git -C "$DEST" rev-parse "refs/dwp-vim/release^{commit}")"
    if [ "$(git -C "$DEST" rev-parse HEAD)" != "$TARGET" ]; then
      if ! git -C "$DEST" merge-base --is-ancestor HEAD "$TARGET" &&
        [ -n "$(git -C "$DEST" rev-list -n 1 HEAD --not --remotes --tags)" ]; then
        die "update skipped: $DEST has local commits that are not in '$REF' — nothing was changed. Keep them on a branch of your own (they stay there), or ask your agent, then rerun."
      fi
      if git -C "$DEST" merge-base --is-ancestor "$TARGET" HEAD; then
        say "==> Moving from $(git -C "$DEST" rev-parse --short HEAD) back to release $REF (your branches are kept; DWP_VIM_REF=main follows main)"
      fi
      git -C "$DEST" -c advice.detachedHead=false checkout -q "$TARGET" ||
        die "git checkout '$REF' failed in $DEST (local changes block it — see the error above)"
    fi
  else
    git -C "$DEST" fetch "$FETCH_SOURCE" "$REF" ||
      die "could not fetch '$REF' from $FETCH_SOURCE in $DEST — not a tag, branch or commit there, or the source is unreachable (offline? set DWP_VIM_SOURCE to a local path)"
    git -C "$DEST" checkout "$REF" >/dev/null ||
      die "git checkout '$REF' failed in $DEST (ref missing, or local changes block it — see the error above)"
    # A branch: fast-forward to the fetched tip when it is ahead. merge
    # --ff-only refuses a dirty tree, so local edits are never reset. A HEAD
    # that DIVERGED from the source is not silently skipped either: the run
    # dies loudly so "installed" never masks "still on the old commit"
    # (final-review finding R2).
    if [ "$(git -C "$DEST" rev-parse HEAD)" != "$(git -C "$DEST" rev-parse 'FETCH_HEAD^{commit}')" ]; then
      if git -C "$DEST" merge-base --is-ancestor HEAD FETCH_HEAD; then
        git -C "$DEST" merge --ff-only FETCH_HEAD ||
          die "could not fast-forward $DEST (local changes?). Resolve manually and rerun"
      else
        die "update skipped: $DEST has local commits that diverge from '$REF' — nothing was changed. Reconcile them (git -C '$DEST' pull --rebase) or ask your agent, then rerun."
      fi
    fi
  fi
else
  say "==> Cloning DeepWorkPlan Vim ('$REF') into $DEST"
  mkdir -p "$(dirname "$DEST")"
  git clone -- "$SOURCE" "$DEST" || die "clone from $SOURCE failed"
  git -C "$DEST" -c advice.detachedHead=false checkout -q "$REF" ||
    die "git checkout '$REF' failed in the clone from $SOURCE (ref missing, or local changes block it — see the error above)"
fi

[ -f "$DEST/install.lua" ] || die "$DEST has no install.lua — not a DeepWorkPlan Vim checkout"

# install.lua reads the same switch (it skips its system-package step).
if [ "$SKIP_PACKAGES" = 1 ]; then
  export DWP_VIM_SKIP_PACKAGES=1
else
  unset DWP_VIM_SKIP_PACKAGES
fi

# --- 3. The repository's own installer ---------------------------------------

say "==> Running the system setup ($LUA install.lua)"
# install.lua may ask questions: it reads the terminal when there is one,
# never the pipe that may be carrying this script.
LUA_STDIN=/dev/null
if : </dev/tty 2>/dev/null; then
  LUA_STDIN=/dev/tty
fi
if (cd "$DEST" && "$LUA" install.lua) <"$LUA_STDIN"; then
  say "==> System setup finished"
else
  # The handoff line comes first so it sits directly under the failure
  # output; the original die line below stays verbatim (UX2-03).
  say ""
  say "Copy the line below and hand it to your agent — they can read the log and fix this:"
  say "  Read $DEST/fails.log and fix the DeepWorkPlan Vim install failure it describes."
  say ""
  die "'$LUA install.lua' failed — see $DEST/fails.log and https://github.com/DailybotHQ/deepworkplan-vim/issues/new"
fi

# --- 4. Headless plugin bootstrap --------------------------------------------

# Same path pckr resolves at boot (its config sets pack_dir to
# stdpath('data')/site): plugins install under site/pack/pckr/opt/<name>.
# nvim uses ~/.local/share on macOS too. The bootstrap must run Neovim
# against THE DESTINATION, not whatever $XDG_CONFIG_HOME/nvim happens to
# hold: XDG_CONFIG_HOME is the destination's parent and NVIM_APPNAME its
# basename (Neovim composes the two into the config path). For the default
# destination (~/.config/nvim) both resolve to Neovim's own defaults; for a
# custom DWP_VIM_DIR the data dir follows the appname, so the marker and
# the mason.nvim check below track the install they belong to.
DATA_HOME="${XDG_DATA_HOME:-$HOME/.local/share}"
BOOTSTRAP_APPNAME="$(basename "$DEST")"
PCKR_OPT="$DATA_HOME/$BOOTSTRAP_APPNAME/site/pack/pckr/opt"
MARKER="$DATA_HOME/$BOOTSTRAP_APPNAME/pckr/.dwp-vim-bootstrapped"

if ! command -v nvim >/dev/null 2>&1; then
  say "NOTE: nvim is not on PATH in this shell yet (a new shell should find it)."
  say "      On first launch plugins install themselves; quit when that finishes, then reopen."
elif [ -f "$MARKER" ] || [ -d "$PCKR_OPT/mason.nvim" ]; then
  say "==> Plugins already installed"
else
  say "==> Installing plugins (headless; this can take a few minutes)"
  BOOTSTRAP_LOG="$(mktemp "${TMPDIR:-/tmp}/dwp-vim-bootstrap.XXXXXX")"
  # timeout(1) is not on macOS by default; the sync callback exits nvim
  # on its own, the timeout is only a guard against a stuck clone.
  bootstrap_rc=0
  # Quoted operands (review round-2 finding 4): an unquoted word list
  # would split a destination containing spaces into extra argv.
  if command -v timeout >/dev/null 2>&1; then
    timeout "$BOOTSTRAP_TIMEOUT" env \
      XDG_CONFIG_HOME="$(dirname "$DEST")" \
      NVIM_APPNAME="$BOOTSTRAP_APPNAME" \
      nvim --headless </dev/null >"$BOOTSTRAP_LOG" 2>&1 || bootstrap_rc=$?
  else
    env \
      XDG_CONFIG_HOME="$(dirname "$DEST")" \
      NVIM_APPNAME="$BOOTSTRAP_APPNAME" \
      nvim --headless </dev/null >"$BOOTSTRAP_LOG" 2>&1 || bootstrap_rc=$?
  fi
  if [ "$bootstrap_rc" -eq 0 ]; then
    # mkdir -p first: touch cannot create the parent dir, and a silently
    # missing marker made every rerun re-run the bootstrap (audit I-19).
    if ! { mkdir -p "$(dirname "$MARKER")" && touch "$MARKER" 2>/dev/null; }; then
      say "NOTE: could not write the bootstrap marker $MARKER — the next run will re-check plugins."
    fi
    say "==> Plugins installed"
  else
    say "WARNING: the headless plugin install did not finish cleanly (rc=$bootstrap_rc)."
    say "         Launch nvim once, wait for the install to finish, then quit and reopen."
    say "         Log: $BOOTSTRAP_LOG"
  fi
fi

# --- 5. Next steps -----------------------------------------------------------

say ""
say "DeepWorkPlan Vim is installed at $DEST"
say "  Launch        nvim"
say "  Command index Space h h   (the whole editor, listed)"
say "  Plan browser  Space P"
say "  Version       $REF"
say "  Update        run a newer release's install.sh (each one pins its release; DWP_VIM_REF=main follows main)"
say "  Remove        lua '$DEST/delete.lua'  (lists every path first, asks, keeps Neovim)"
}

main "$@"
