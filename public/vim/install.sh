#!/usr/bin/env bash
#
# DeepWorkPlan Vim — self-contained installer for release v0.6.0.
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
#   bash install.sh [options]               # bash install.sh --help lists them
# Run it from a terminal: it asks before touching an existing config.
# For a check from a second origin, compare the hash with the install.sh
# line of SHA256SUMS on the GitHub release (release tags are immutable).
#
# Images and CI (non-root, no terminal) — one step after the download:
#   bash install.sh --version 0.6.0 --nvim 0.12.5 --skip-packages --strict
#
# What it does, in order:
#   1. Preflight — detects OS and package manager; installs git, curl, and
#      a Lua interpreter if any are missing (none with --skip-packages).
#   2. Version  — this script's release, or the one --version / --ref asks
#      for (X.Y.Z, vX.Y.Z, latest, '>=X.Y.Z' — stable tags only).
#   3. Neovim   — with --nvim X.Y.Z, the official release tarball into
#      ~/.local/opt/nvim-vX.Y.Z (linked as ~/.local/bin/nvim), verified
#      against the sha256 Neovim publishes.
#   4. Consent  — an existing, foreign Neovim config is NEVER overwritten.
#      Interactively you are asked before it is moved to
#      ~/.config/previous-deepworkplan-vim; without a terminal the script
#      stops with instructions unless --yes says to move it aside.
#   5. Clones (or updates, on re-run) the repository into ~/.config/nvim.
#   6. Runs the repository's own `lua install.lua` (system packages,
#      pckr.nvim, font — it owns every step, this wrapper owns none).
#   7. Bootstraps plugins headlessly and checks them — every plugin and
#      pckr at the commit the release pins in pckr/lockfile.lua (0.5.1+);
#      empty clones are moved aside and installed again (--strict: any
#      failure, missing or empty plugin, or plugin away from its pin is an
#      error).
#
# Options (each with an environment twin; a flag beats every env value):
#   --version <v>    DWP_VIM_VERSION   X.Y.Z, vX.Y.Z, latest or '>=X.Y.Z'
#   --ref <ref>      DWP_VIM_REF       tag, branch or commit (main follows main)
#   --dir <path>     DWP_VIM_DIR       destination (default ~/.config/nvim)
#   --skip-packages  DWP_VIM_SKIP_PACKAGES=1  install no system package
#   --nvim <X.Y.Z>   DWP_VIM_NVIM      install that Neovim release, verified
#   --strict         DWP_VIM_STRICT=1  fail on a failed or incomplete bootstrap,
#                                      or a plugin away from its locked commit
#   --yes            DWP_VIM_YES=1     move a foreign config aside unattended
#   -h, --help
# Other environment:
#   DWP_VIM_SOURCE             repository URL or a local path (offline, mirrors)
#   DWP_VIM_BOOTSTRAP_TIMEOUT  seconds for the headless plugin install (900)
#   GITHUB_TOKEN               optional: authenticates --nvim's release lookup
#                              (then removed from the environment of the run)
#
# Windows: use winget plus Git Bash, or run the steps above inside WSL,
# where they work as-is:
#   winget install -e --id Neovim.Neovim --accept-package-agreements --accept-source-agreements
#   git clone --branch v0.6.0 https://github.com/DailybotHQ/deepworkplan-vim.git "$LOCALAPPDATA/nvim"
#   cd "$LOCALAPPDATA/nvim" && lua install.lua
#
set -euo pipefail

# The whole script is one function, called on the last line: bash parses
# all of it before running anything. When the download is piped into bash
# the script arrives on stdin, so nothing it runs may read stdin — and no
# half-downloaded script can run partially.
main() {

REPO_URL="https://github.com/DailybotHQ/deepworkplan-vim.git"
# The release this script belongs to: with no version or ref requested it
# installs exactly that tag.
RELEASE_REF="v0.6.0"

say() { printf '%s\n' "$*"; }
die() { printf 'install.sh: %s\n' "$*" >&2; exit 1; }

usage() {
  cat <<'USAGE'
DeepWorkPlan Vim installer

Usage: bash install.sh [options]

Version (pick one; the default is this script's own release):
  --version <v>     X.Y.Z, vX.Y.Z, latest (newest stable release), or
                    '>=X.Y.Z' (newest stable release at or above the floor)
                    env: DWP_VIM_VERSION
  --ref <ref>       a tag, branch or commit (DWP_VIM_REF=main follows main)
                    env: DWP_VIM_REF
Install:
  --dir <path>      config directory (default ~/.config/nvim)   env: DWP_VIM_DIR
  --skip-packages   install no system package (images, CI)       env: DWP_VIM_SKIP_PACKAGES=1
  --nvim <X.Y.Z>    install that Neovim release into ~/.local/opt/nvim-vX.Y.Z,
                    linked as ~/.local/bin/nvim, sha256-verified
                                                                 env: DWP_VIM_NVIM
  --strict          fail (non-zero) when the headless plugin install fails,
                    leaves required plugins missing or empty, or any plugin
                    HEAD differs from pckr/lockfile.lua          env: DWP_VIM_STRICT=1
  --yes             move an existing foreign config aside without asking
                    (backup: ~/.config/previous-deepworkplan-vim) env: DWP_VIM_YES=1
  -h, --help        show this help

Precedence: a flag beats every environment value; then DWP_VIM_VERSION,
then DWP_VIM_REF, then this script's release. A version and a ref given at
the same level (two flags, or two env values) that disagree are an error.
Switch values: 1/true/yes/on or 0/false/no/off (any case); anything else
is an error.

Images and CI (download, verify, then run):
  bash install.sh --version 0.6.0 --nvim 0.12.5 --skip-packages --strict
USAGE
}

usage_error() {
  printf 'install.sh: %s\n\n' "$1" >&2
  usage >&2
  exit 2
}

# Env twins of the switches: 1/true/yes/on mean on; unset, empty,
# 0/false/no/off mean off (any case). Anything else is an error — never a
# guess (DWP_VIM_YES=N must not mean yes).
switch_env() { # switch_env <NAME> <value> -> prints 1 or 0 (bash 3.2: no ${v,,})
  case "$2" in
    1 | [Tt][Rr][Uu][Ee] | [Yy][Ee][Ss] | [Oo][Nn]) printf '1' ;;
    '' | 0 | [Ff][Aa][Ll][Ss][Ee] | [Nn][Oo] | [Oo][Ff][Ff]) printf '0' ;;
    *) usage_error "$1='$2' is not a switch value — use 1/true/yes/on or 0/false/no/off" ;;
  esac
}

# The token for --nvim's release lookup is captured once and removed from
# the environment: install.lua, Neovim and plugin build hooks never see it.
NVIM_API_TOKEN="${GITHUB_TOKEN:-}"
unset GITHUB_TOKEN GH_TOKEN
if [ -n "$NVIM_API_TOKEN" ] && ! [[ "$NVIM_API_TOKEN" =~ ^[A-Za-z0-9_.-]+$ ]]; then
  printf 'install.sh: GITHUB_TOKEN has unexpected characters — ignored\n' >&2
  NVIM_API_TOKEN=""
fi

ENV_VERSION="${DWP_VIM_VERSION:-}"
ENV_REF="${DWP_VIM_REF:-}"
FLAG_VERSION=""
FLAG_REF=""
DEST="${DWP_VIM_DIR:-$HOME/.config/nvim}"
SKIP_PACKAGES="$(switch_env DWP_VIM_SKIP_PACKAGES "${DWP_VIM_SKIP_PACKAGES:-}")"
STRICT="$(switch_env DWP_VIM_STRICT "${DWP_VIM_STRICT:-}")"
NVIM_VERSION="${DWP_VIM_NVIM:-}"
ASSUME_YES="$(switch_env DWP_VIM_YES "${DWP_VIM_YES:-}")"

# A value option's value: never empty, never another option.
opt_value() { # opt_value <option> <value>
  [ -n "$2" ] || usage_error "$1 needs a value"
  case "$2" in -*) usage_error "$1 needs a value (got the option '$2')" ;; esac
}

# Options are parsed here, so they also work as `bash -s -- <options>`
# when the script arrives on stdin.
while [ "$#" -gt 0 ]; do
  case "$1" in
    --version | --ref | --dir | --nvim)
      [ "$#" -ge 2 ] || usage_error "$1 needs a value"
      opt_value "$1" "$2"
      case "$1" in
        --version) FLAG_VERSION="$2" ;;
        --ref) FLAG_REF="$2" ;;
        --dir) DEST="$2" ;;
        --nvim) NVIM_VERSION="$2" ;;
      esac
      shift 2
      ;;
    --version=* | --ref=* | --dir=* | --nvim=*)
      opt_value "${1%%=*}" "${1#*=}"
      case "$1" in
        --version=*) FLAG_VERSION="${1#*=}" ;;
        --ref=*) FLAG_REF="${1#*=}" ;;
        --dir=*) DEST="${1#*=}" ;;
        --nvim=*) NVIM_VERSION="${1#*=}" ;;
      esac
      shift
      ;;
    --skip-packages) SKIP_PACKAGES=1; shift ;;
    --strict) STRICT=1; shift ;;
    --yes | -y) ASSUME_YES=1; shift ;;
    -h | --help) usage; exit 0 ;;
    --) shift; [ "$#" -eq 0 ] || usage_error "unexpected argument: $1" ;;
    *) usage_error "unknown option: $1" ;;
  esac
done

# Precedence: a flag beats every environment value; DWP_VIM_VERSION beats
# DWP_VIM_REF; with neither, this script's release. A version and a ref
# given at the same level (two flags, or two env values) must agree.
OPT_VERSION=""
VERSION_FROM=""
OPT_REF=""
REF_FROM=""
if [ -n "$FLAG_VERSION$FLAG_REF" ]; then
  OPT_VERSION="$FLAG_VERSION"; VERSION_FROM="--version"
  OPT_REF="$FLAG_REF"; REF_FROM="--ref"
else
  OPT_VERSION="$ENV_VERSION"; VERSION_FROM="DWP_VIM_VERSION"
  OPT_REF="$ENV_REF"; REF_FROM="DWP_VIM_REF"
fi

# Strict validation: nothing below may reach git or a URL as an option.
SEMVER='[0-9]+\.[0-9]+\.[0-9]+'
VERSION_MODE=""
VERSION_WANT=""
if [ -n "$OPT_VERSION" ]; then
  if [ "$OPT_VERSION" = "latest" ]; then
    VERSION_MODE="latest"
  elif [[ "$OPT_VERSION" =~ ^\>=v?($SEMVER)$ ]]; then
    VERSION_MODE="floor"
    VERSION_WANT="${BASH_REMATCH[1]}"
  elif [[ "$OPT_VERSION" =~ ^v?($SEMVER(-[0-9A-Za-z.]+)?)$ ]]; then
    VERSION_MODE="exact"
    VERSION_WANT="${BASH_REMATCH[1]}"
  else
    usage_error "$VERSION_FROM: '$OPT_VERSION' is not a version — use X.Y.Z, vX.Y.Z, latest or '>=X.Y.Z'"
  fi
fi
if [ -n "$OPT_REF" ] && ! [[ "$OPT_REF" =~ ^[A-Za-z0-9._][A-Za-z0-9._/-]*$ ]]; then
  usage_error "$REF_FROM: '$OPT_REF' is not a tag, branch or commit name"
fi
if [ -n "$NVIM_VERSION" ]; then
  [[ "$NVIM_VERSION" =~ ^v?($SEMVER)$ ]] ||
    usage_error "--nvim: '$NVIM_VERSION' is not a Neovim release (X.Y.Z)"
  NVIM_VERSION="${BASH_REMATCH[1]}"
fi
[ -n "$DEST" ] || usage_error "--dir needs a path"
case "$DEST" in -*) usage_error "--dir/DWP_VIM_DIR must not start with '-' (got '$DEST')" ;; esac
# Absolute, so the bootstrap's XDG_CONFIG_HOME (its parent) is absolute too.
case "$DEST" in /*) ;; *) DEST="$PWD/$DEST" ;; esac
if [ -n "$VERSION_MODE" ] && [ -n "$OPT_REF" ]; then
  if [ "$VERSION_MODE" != "exact" ] || { [ "$OPT_REF" != "v$VERSION_WANT" ] && [ "$OPT_REF" != "$VERSION_WANT" ]; }; then
    usage_error "$VERSION_FROM ($OPT_VERSION) and $REF_FROM ($OPT_REF) disagree — set one of them"
  fi
fi

SOURCE="${DWP_VIM_SOURCE:-$REPO_URL}"
case "$SOURCE" in -*) die "DWP_VIM_SOURCE must not start with '-' (got '$SOURCE')" ;; esac
# Where --nvim downloads from (overridable for mirrors and tests).
NVIM_DOWNLOAD_BASE="${DWP_VIM_NVIM_DOWNLOAD_BASE:-https://github.com/neovim/neovim/releases/download}"
NVIM_API_BASE="${DWP_VIM_NVIM_API_BASE:-https://api.github.com/repos/neovim/neovim/releases/tags}"
for base in "$NVIM_DOWNLOAD_BASE" "$NVIM_API_BASE"; do
  case "$base" in https://* | file://*) ;; *) die "Neovim download bases must be https:// or file:// URLs (got '$base')" ;; esac
done

# REF is final once the version is resolved (after the preflight, which
# guarantees git): an explicit ref, or this script's release.
REF="${OPT_REF:-$RELEASE_REF}"
case "$REF" in -*) die "DWP_VIM_REF must not start with '-' (got '$REF')" ;; esac
# No trailing slash: "mv link/" would move a symlink's target, not the link.
while [ "$DEST" != "/" ] && [ "${DEST%/}" != "$DEST" ]; do
  DEST="${DEST%/}"
done
# Set once the previous config was moved aside, so a later failure says
# where it is.
MOVED_TO=""
BACKUP_DIR="$HOME/.config/previous-deepworkplan-vim"
BOOTSTRAP_TIMEOUT="${DWP_VIM_BOOTSTRAP_TIMEOUT:-900}"
[[ "$BOOTSTRAP_TIMEOUT" =~ ^[0-9]+$ ]] ||
  usage_error "DWP_VIM_BOOTSTRAP_TIMEOUT must be a number of seconds (got '$BOOTSTRAP_TIMEOUT')"
case "$DEST" in
  / | "$HOME" | "$HOME/") usage_error "refusing to install into $DEST — pick a dedicated directory with --dir" ;;
esac

# --- version selection ----------------------------------------------------

# 0 when version $1 is greater than $2 (X.Y.Z, compared numerically).
version_gt() {
  local a1 a2 a3 b1 b2 b3
  IFS=. read -r a1 a2 a3 <<<"$1"
  IFS=. read -r b1 b2 b3 <<<"$2"
  [ "$a1" -ne "$b1" ] && { [ "$a1" -gt "$b1" ]; return; }
  [ "$a2" -ne "$b2" ] && { [ "$a2" -gt "$b2" ]; return; }
  [ "$a3" -gt "$b3" ]
}

# Stable release tags (vX.Y.Z) at SOURCE, one per line, newest first.
release_tags() {
  local out line tag tags=() sorted=() i j t
  out="$(git ls-remote --tags --refs "$SOURCE" 'v*' 2>/dev/null)" ||
    die "could not list the releases at $(redact_url "$SOURCE") (offline? set DWP_VIM_SOURCE to a local path)"
  while IFS= read -r line; do
    tag="${line##*refs/tags/}"
    [[ "$tag" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] && tags+=("${tag#v}")
  done <<<"$out"
  # Insertion sort, newest first (a handful of tags; no sort -V on macOS).
  for t in ${tags[@]+"${tags[@]}"}; do
    i=0
    while [ "$i" -lt "${#sorted[@]}" ] && ! version_gt "$t" "${sorted[$i]}"; do
      i=$((i + 1))
    done
    j=${#sorted[@]}
    while [ "$j" -gt "$i" ]; do
      sorted[j]="${sorted[j - 1]}"
      j=$((j - 1))
    done
    sorted[i]="$t"
  done
  for t in ${sorted[@]+"${sorted[@]}"}; do
    printf 'v%s\n' "$t"
  done
}

# Stop naming what was asked, with the newest releases that do exist.
no_such_version() {
  local newest="" n=0 t
  while IFS= read -r t; do
    [ -n "$t" ] || continue
    newest="$newest $t"
    n=$((n + 1))
    [ "$n" -lt 5 ] || break
  done <<<"$1"
  die "$2 — newest releases:${newest:- none found}"
}

resolve_version() {
  local tags tag
  tags="$(release_tags)"
  case "$VERSION_MODE" in
    latest)
      tag="$(printf '%s\n' "$tags" | { IFS= read -r t; printf '%s' "$t"; })"
      [ -n "$tag" ] || no_such_version "$tags" "no stable release found at $(redact_url "$SOURCE")"
      ;;
    floor)
      tag=""
      while IFS= read -r t; do
        [ -n "$t" ] || continue
        if ! version_gt "$VERSION_WANT" "${t#v}"; then
          tag="$t"
        fi
        break
      done <<<"$tags"
      [ -n "$tag" ] || no_such_version "$tags" "no stable release at or above $VERSION_WANT"
      ;;
    exact)
      tag="v$VERSION_WANT"
      if [[ "$VERSION_WANT" == *-* ]]; then
        git ls-remote --tags --refs "$SOURCE" "refs/tags/$tag" 2>/dev/null | grep -q . ||
          no_such_version "$tags" "release $tag does not exist"
      else
        printf '%s\n' "$tags" | grep -qx -- "$tag" ||
          no_such_version "$tags" "release $tag does not exist"
      fi
      ;;
  esac
  REF="$tag"
  say "==> DeepWorkPlan Vim $REF (resolved from '$OPT_VERSION' via $VERSION_FROM)"
}

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

# --- 1b. Version and Neovim -------------------------------------------------

if [ -n "$VERSION_MODE" ]; then
  resolve_version
fi

# sha256 of a file, with whichever tool the system has.
sha256_of() {
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$1" | { read -r h _; printf '%s' "$h"; }
  elif command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$1" | { read -r h _; printf '%s' "$h"; }
  else
    die "--nvim needs sha256sum or shasum to verify the download"
  fi
}

# First line of `nvim --version` for a binary, or nothing.
nvim_version_line() {
  local line=""
  [ -x "$1" ] || return 0
  { IFS= read -r line; } < <("$1" --version 2>/dev/null) || true
  printf '%s' "$line"
}

# Install the official Neovim release $1: unpacked into its own
# ~/.local/opt/nvim-v$1 (an upgrade never mixes runtime files of two
# versions) and linked as ~/.local/bin/nvim. Installed only when the
# tarball's sha256 equals the one Neovim publishes for that asset: the
# GitHub release `digest`, else the asset's .sha256sum file (older
# releases). Nothing is installed without a matching checksum.
install_nvim() {
  local v="$1" os arch asset json line cur="" expect="" have tmp bin opt_dir stage listed=0
  case "$(uname -s)" in
    Linux*) os=linux ;;
    Darwin*) os=macos ;;
    *) die "--nvim supports Linux and macOS only" ;;
  esac
  case "$(uname -m)" in
    x86_64 | amd64) arch=x86_64 ;;
    aarch64 | arm64) arch=arm64 ;;
    *) die "--nvim: no Neovim release tarball for architecture $(uname -m)" ;;
  esac
  asset="nvim-$os-$arch.tar.gz"
  bin="$HOME/.local/bin/nvim"
  opt_dir="$HOME/.local/opt/nvim-v$v"
  mkdir -p "$HOME/.local/bin" "$HOME/.local/opt"
  if [ "$(nvim_version_line "$opt_dir/bin/nvim")" = "NVIM v$v" ]; then
    link_nvim "$opt_dir" "$bin"
    say "==> Neovim v$v already at $opt_dir"
    return 0
  fi
  command -v tar >/dev/null 2>&1 || die "--nvim needs tar"
  if [ "$NVIM_API_BASE" != "https://api.github.com/repos/neovim/neovim/releases/tags" ] ||
    [ "$NVIM_DOWNLOAD_BASE" != "https://github.com/neovim/neovim/releases/download" ]; then
    say "NOTE: --nvim trusts the mirror $NVIM_DOWNLOAD_BASE (checksums from $NVIM_API_BASE) as it would trust Neovim's releases."
  fi
  say "==> Installing Neovim v$v ($asset) into $opt_dir"
  # GitHub allows 60 unauthenticated API calls an hour per address; with
  # GITHUB_TOKEN set the call is authenticated (api.github.com only). The
  # token travels in curl's config on stdin — never in argv, never printed.
  if [ -n "$NVIM_API_TOKEN" ] && [ "$NVIM_API_BASE" = "https://api.github.com/repos/neovim/neovim/releases/tags" ]; then
    json="$(printf 'header = "Authorization: Bearer %s"\n' "$NVIM_API_TOKEN" |
      curl -fsSL -K - "$NVIM_API_BASE/v$v" 2>/dev/null || true)"
  else
    json="$(curl -fsSL "$NVIM_API_BASE/v$v" 2>/dev/null || true)"
  fi
  while IFS= read -r line; do
    case "$line" in
      '"name"'*)
        cur="${line#*\"name\"*:*\"}"
        cur="${cur%\"}"
        [ "$cur" = "$asset" ] && listed=1
        ;;
      '"digest"'*)
        if [ "$cur" = "$asset" ]; then
          expect="${line##*sha256:}"
          expect="${expect%\"}"
          break
        fi
        ;;
    esac
  done < <(printf '%s\n' "$json" | grep -oE '"(name|digest)"[[:space:]]*:[[:space:]]*"[^"]*"' || true)
  if [ -n "$json" ] && [ "$listed" = 0 ]; then
    die "Neovim v$v publishes no $asset (releases before 0.10.4 named their assets differently) — choose a newer --nvim"
  fi
  if [ -z "$expect" ]; then
    line="$(curl -fsSL "$NVIM_DOWNLOAD_BASE/v$v/$asset.sha256sum" 2>/dev/null || true)"
    expect="${line%%[[:space:]]*}"
  fi
  if ! [[ "$expect" =~ ^[0-9a-f]{64}$ ]]; then
    if [ -z "$json" ]; then
      die "no published sha256 for $asset of Neovim v$v — refusing to install an unverified binary (the release API at $NVIM_API_BASE did not answer: offline or rate-limited? set GITHUB_TOKEN)"
    fi
    die "no published sha256 for $asset of Neovim v$v — refusing to install an unverified binary"
  fi
  # Staged on the same filesystem as the final directory, so the last step
  # is an atomic rename; every failure removes exactly what it created.
  tmp="$(mktemp -d "$HOME/.local/opt/.nvim-v$v.XXXXXX")"
  nvim_cleanup() {
    rm -f -- "$tmp/$asset"
    rmdir -- "$tmp/stage" 2>/dev/null || true
    rmdir -- "$tmp" 2>/dev/null || true
  }
  if ! curl -fsSL -o "$tmp/$asset" "$NVIM_DOWNLOAD_BASE/v$v/$asset"; then
    nvim_cleanup
    die "could not download $asset for Neovim v$v"
  fi
  have="$(sha256_of "$tmp/$asset")"
  if [ "$have" != "$expect" ]; then
    nvim_cleanup
    die "checksum mismatch for $asset (Neovim v$v): expected $expect, got $have — nothing was installed"
  fi
  stage="$tmp/stage"
  mkdir -p "$stage"
  if ! tar -xzf "$tmp/$asset" -C "$stage" --strip-components=1; then
    rm -f -- "$tmp/$asset"
    die "could not unpack $asset (partial files are in $tmp; nothing was installed)"
  fi
  rm -f -- "$tmp/$asset"
  [ "$(nvim_version_line "$stage/bin/nvim")" = "NVIM v$v" ] ||
    die "the unpacked $asset does not report Neovim v$v (left in $stage; nothing was installed)"
  if [ -e "$opt_dir" ]; then
    # A previous, broken attempt: moved aside, never deleted.
    mv -- "$opt_dir" "$(mktemp -d "$HOME/.local/opt/.nvim-v$v.previous.XXXXXX")/" ||
      die "could not move the broken $opt_dir aside"
  fi
  mv -- "$stage" "$opt_dir" || die "could not move Neovim into $opt_dir"
  rmdir -- "$tmp" 2>/dev/null || true
  link_nvim "$opt_dir" "$bin"
  say "==> Neovim v$v installed at $opt_dir, linked as $bin (sha256 verified)"
}

# ~/.local/bin/nvim -> the versioned install; a real file there (an older
# install) is moved aside, never overwritten.
link_nvim() { # link_nvim <opt-dir> <bin>
  if [ -e "$2" ] && [ ! -L "$2" ]; then
    mv -- "$2" "$(mktemp "$2.previous.XXXXXX")" || die "could not move the existing $2 aside"
  fi
  ln -sfn -- "$1/bin/nvim" "$2" || die "could not link $2"
  case ":$ORIGINAL_PATH:" in
    *":$HOME/.local/bin:"*) ;;
    *) NVIM_PATH_HINT=1 ;;
  esac
  PATH="$HOME/.local/bin:$PATH"
  export PATH
}

ORIGINAL_PATH="$PATH"
NVIM_PATH_HINT=0
if [ -n "$NVIM_VERSION" ]; then
  install_nvim "$NVIM_VERSION"
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
  git -C "$1" remote get-url origin 2>/dev/null | grep -qi 'deepworkplan-vim'
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
  if { : </dev/tty; } 2>/dev/null; then
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

# Move the config at $DEST aside to $BACKUP_DIR — only after an interactive
# yes; it is moved, never deleted. $1 is one sentence naming the situation;
# $2 (optional) tells how to keep the config instead. Without a terminal
# nothing is touched: the run stops with instructions.
move_aside_with_consent() {
  local situation="$1" keep="${2:-}" rc=0
  if [ -e "$BACKUP_DIR" ]; then
    die "$situation The backup path $BACKUP_DIR already exists — move or remove one of them and rerun. Nothing was touched."
  fi
  if [ "$ASSUME_YES" = 1 ]; then
    # --yes / DWP_VIM_YES: the caller already answered (images, CI).
    say "==> $situation --yes was given: moving it aside without asking."
  else
    ask_consent "$situation Move it to $BACKUP_DIR and continue with a fresh install?" || rc=$?
  fi
  if [ "$rc" -eq 2 ]; then
    say ""
    say "$situation Nothing was changed."
    say "This script ran without a terminal, so it cannot ask what to do."
    say "Either (or rerun with --yes to move it aside unattended):"
    say "  1. run it interactively — download it, then run it in a terminal:"
    say "       curl -fsSL -o install.sh https://deepworkplan.com/vim/install.sh"
    say "       bash install.sh"
    say "  2. or move the config aside first, then run the installer again:"
    say "       mv '$DEST' '$BACKUP_DIR'"
    if [ -n "$keep" ]; then
      say "  3. or keep it and update in place: $keep"
    fi
    die "refusing to touch an existing config unattended"
  fi
  if [ "$rc" -ne 0 ]; then
    die "aborted — nothing was touched"
  fi
  # Checked again right before the move: anything that appeared at the
  # backup path meanwhile (even a dangling symlink) stops the run, so the
  # config never lands somewhere other than where this message says.
  if [ -e "$BACKUP_DIR" ] || [ -L "$BACKUP_DIR" ]; then
    die "$BACKUP_DIR appeared while waiting for your answer — move or remove it and rerun. Nothing was touched."
  fi
  say "==> Moving the existing config to $BACKUP_DIR"
  mkdir -p "$(dirname "$BACKUP_DIR")"
  mv -- "$DEST" "$BACKUP_DIR" || die "could not move $DEST to $BACKUP_DIR — nothing was deleted"
  MOVED_TO="$BACKUP_DIR"
}

# A URL as it may be shown: anything that can carry a credential is
# dropped — the user-info of the authority (up to its last "@", which
# survives an unescaped "@" in a password), the query and the fragment.
# An "@" in the path is not user-info. scp-like user@host:path loses its
# user too.
redact_url() {
  local url="$1" scheme rest auth path
  case "$url" in
    *://*)
      scheme="${url%%://*}"
      rest="${url#*://}"
      auth="${rest%%[/?#]*}"
      path="${rest#"$auth"}"
      auth="${auth##*@}"
      path="${path%%[?#]*}"
      printf '%s://%s%s' "$scheme" "$auth" "$path"
      ;;
    *@*:*)
      url="${url%%[?#]*}"
      printf '%s' "${url#*@}"
      ;;
    *) printf '%s' "${url%%[?#]*}" ;;
  esac
}

# Is this origin URL DeepWorkPlan Vim itself (or the explicit source)?
same_project() {
  [ -n "$1" ] || return 1
  if [ -n "${DWP_VIM_SOURCE:-}" ] && [ "$1" = "$DWP_VIM_SOURCE" ]; then
    return 0
  fi
  printf '%s' "$1" | grep -qi 'deepworkplan-vim'
}

# Why a DeepWorkPlan Vim checkout must not be updated in place, one reason
# per line (none: it may be). A checkout that tracks another repository —
# an install cloned from the older fork — or that carries local edits to
# tracked files belongs to its user: switching it to the release could
# silently migrate or entangle that work.
update_blockers() {
  local origin status edits
  origin="$(git -C "$1" remote get-url origin 2>/dev/null || true)"
  if ! same_project "$origin"; then
    if [ -z "$origin" ]; then
      printf '%s\n' "it has no origin remote to match against DeepWorkPlan Vim"
    else
      printf '%s\n' "it tracks a different repository (origin: $(redact_url "$origin"))"
    fi
  fi
  # --no-optional-locks: asking must not write the user's index. A status
  # that cannot be read is a reason to stop too (never assume "clean").
  if ! status="$(git --no-optional-locks -C "$1" status --porcelain --untracked-files=no 2>/dev/null)"; then
    printf '%s\n' "its local changes could not be inspected (git status failed in it)"
  elif [ -n "$status" ]; then
    edits="$(printf '%s\n' "$status" | grep -c .)"
    printf '%s\n' "it has local edits in $edits tracked file(s) — git -C '$1' status lists them"
  fi
}

# How to keep the checkout and update it in place, from the reasons found.
keep_in_place_hint() {
  local steps=""
  case "$1" in
    *"different repository"* | *"no origin remote"*)
      steps="point origin at $REPO_URL (git -C '$DEST' remote set-url origin $REPO_URL)" ;;
  esac
  case "$1" in
    *"local edits"* | *"could not be inspected"*)
      steps="${steps:+$steps, and }set your edits aside with git -C '$DEST' stash (git stash pop brings them back later)" ;;
  esac
  printf '%s, then run the installer again' "$steps"
}

if [ -d "$DEST" ] && dir_has_content "$DEST" && ! is_ours "$DEST"; then
  # A foreign Neovim config exists. It is never overwritten silently.
  move_aside_with_consent "An existing Neovim config was found at $DEST."
fi

if is_ours "$DEST"; then
  BLOCKERS="$(update_blockers "$DEST")"
  if [ -n "$BLOCKERS" ]; then
    say "==> $DEST holds a DeepWorkPlan Vim config that is not updated in place:"
    printf '%s\n' "$BLOCKERS" | while IFS= read -r reason; do
      say "      - $reason"
    done
    move_aside_with_consent \
      "The Neovim config at $DEST cannot be updated in place." \
      "$(keep_in_place_hint "$BLOCKERS")"
  fi
fi

if is_ours "$DEST"; then
  say "==> Existing DeepWorkPlan Vim install at $DEST — updating to '$REF'"
  # Updates come from the canonical source — DWP_VIM_SOURCE, or the
  # DeepWorkPlan Vim repository — never from whatever the clone's origin
  # happens to be (an older install may track the fork, which has no
  # release tags).
  FETCH_SOURCE="$SOURCE"
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
      die "could not fetch '$REF' from $(redact_url "$FETCH_SOURCE") in $DEST — not a tag, branch or commit there, or the source is unreachable (offline? set DWP_VIM_SOURCE to a local path)"
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
  git clone -- "$SOURCE" "$DEST" ||
    die "clone from $(redact_url "$SOURCE") failed${MOVED_TO:+ — your previous config is safe at $MOVED_TO}"
  git -C "$DEST" -c advice.detachedHead=false checkout -q "$REF" ||
    die "git checkout '$REF' failed in the clone from $(redact_url "$SOURCE") (ref missing, or local changes block it — see the error above)${MOVED_TO:+ — your previous config is safe at $MOVED_TO}"
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
if { : </dev/tty; } 2>/dev/null; then
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

# Plugins the config cannot work without; --strict also refuses any plugin
# directory that is an empty clone (only .git, or nothing).
REQUIRED_PLUGINS="alpha-nvim nvim-cmp mason.nvim"
verify_plugins() {
  local missing="" empty="" p d e found
  for p in $REQUIRED_PLUGINS; do
    [ -d "$PCKR_OPT/$p" ] || missing="$missing $p"
  done
  for d in "$PCKR_OPT"/*/; do
    [ -d "$d" ] || continue
    d="${d%/}"
    found=0
    for e in "$d"/* "$d"/.[!.]* "$d"/..?*; do
      [ -e "$e" ] || continue
      [ "${e##*/}" = ".git" ] && continue
      found=1
      break
    done
    [ "$found" = 1 ] || empty="$empty ${d##*/}"
  done
  if [ -n "$missing$empty" ]; then
    VERIFY_PROBLEMS="${missing:+missing:$missing}${missing:+${empty:+; }}${empty:+empty clones:$empty}"
    return 1
  fi
  return 0
}
# Commit pins (0.5.1+): pckr/lockfile.lua in the destination pins every
# plugin and pckr itself (pckr's own lockfile format, one entry per line);
# lua/plugins.lua installs and updates each one at its pin. verify_lock
# compares every checkout's HEAD with its pin: a plugin at another commit,
# a pinned plugin that is missing and an installed plugin the lock does
# not name are all problems (--strict fails on them). A release without
# the file (before 0.5.1) has nothing to compare: LOCK_COUNT stays 0.
LOCKFILE="$DEST/pckr/lockfile.lua"
PCKR_DIR="$DATA_HOME/$BOOTSTRAP_APPNAME/pckr/pckr.nvim"
PCKR_START="$DATA_HOME/$BOOTSTRAP_APPNAME/site/pack/pckr/start"
verify_lock() {
  local line re entries="" bad="" repo sha name dir head problems="" locked=" " d
  LOCK_COUNT=0
  LOCK_PROBLEMS=""
  [ -f "$LOCKFILE" ] || return 0
  # Every line is `return {`, `}` or one entry in pckr's format; anything
  # else is refused rather than half-read. Plain bash: no sed/awk needed.
  re='^  \["https://github\.com/([A-Za-z0-9._-]+/[A-Za-z0-9._-]+)"\] = \{ commit = "([0-9a-f]{40})" \},$'
  while IFS= read -r line || [ -n "$line" ]; do
    line="${line%$'\r'}" # a CRLF checkout (core.autocrlf) reads the same
    case "$line" in
      'return {' | '}') continue ;;
    esac
    if [[ "$line" =~ $re ]]; then
      entries="$entries${BASH_REMATCH[1]} ${BASH_REMATCH[2]}
"
    else
      bad=1
    fi
  done <"$LOCKFILE"
  if [ -n "$bad" ] || [ -z "$entries" ]; then
    LOCK_PROBLEMS="unreadable lockfile $LOCKFILE"
    return 1
  fi
  while read -r repo sha; do
    name="${repo##*/}"
    if [ "$repo" = "lewis6991/pckr.nvim" ]; then
      dir="$PCKR_DIR"
    elif [ -d "$PCKR_START/$name" ]; then
      dir="$PCKR_START/$name"
    else
      dir="$PCKR_OPT/$name"
    fi
    locked="$locked$name "
    LOCK_COUNT=$((LOCK_COUNT + 1))
    if [ ! -e "$dir/.git" ]; then
      problems="$problems; missing $name"
      continue
    fi
    # The ceiling keeps git inside the plugin dir: an invalid .git must not
    # make it answer for a repository further up.
    head="$(GIT_CEILING_DIRECTORIES="$(dirname "$dir")" git -C "$dir" rev-parse -q --verify HEAD 2>/dev/null || true)"
    if [ "$head" != "$sha" ]; then
      problems="$problems; $name at $(printf '%.12s' "${head:-none}") (lock $(printf '%.12s' "$sha"))"
    fi
  done <<EOF
${entries%
}
EOF
  for d in "$PCKR_OPT"/*/ "$PCKR_START"/*/; do
    [ -d "$d" ] || continue
    d="${d%/}"
    d="${d##*/}"
    case "$locked" in
      *" $d "*) ;;
      *) problems="$problems; unlocked $d" ;;
    esac
  done
  LOCK_PROBLEMS="${problems#; }"
  [ -z "$problems" ]
}
# Empty clones (only .git) are moved aside — never deleted — so the sync
# clones them again; pckr would otherwise take them for installed.
repair_empty_clones() {
  local d e found aside=""
  for d in "$PCKR_OPT"/*/; do
    [ -d "$d" ] || continue
    d="${d%/}"
    found=0
    for e in "$d"/* "$d"/.[!.]* "$d"/..?*; do
      [ -e "$e" ] || continue
      [ "${e##*/}" = ".git" ] && continue
      found=1
      break
    done
    [ "$found" = 1 ] && continue
    [ -n "$aside" ] || aside="$(mktemp -d "$DATA_HOME/$BOOTSTRAP_APPNAME/pckr-empty-clones.XXXXXX")"
    mv -- "$d" "$aside/" || die "could not move the empty clone $d aside"
  done
  if [ -n "$aside" ]; then
    say "==> Moved empty plugin clones aside to $aside; installing them again"
  fi
}
strict_fail() {
  if [ -n "${BOOTSTRAP_LOG:-}" ] && [ -f "$BOOTSTRAP_LOG" ]; then
    say "---- headless plugin install log ($BOOTSTRAP_LOG) ----" >&2
    [ -s "$BOOTSTRAP_LOG" ] || say "(empty)" >&2
    cat "$BOOTSTRAP_LOG" >&2
    say "---- end of log ----" >&2
  fi
  die "--strict: $1"
}

if ! command -v nvim >/dev/null 2>&1; then
  if [ "$STRICT" = 1 ]; then
    die "--strict: nvim is not on PATH, so the plugins cannot be installed — add --nvim <X.Y.Z> or install Neovim first"
  fi
  say "NOTE: nvim is not on PATH in this shell yet (a new shell should find it)."
  say "      On first launch plugins install themselves; quit when that finishes, then reopen."
elif VERIFY_PROBLEMS="" && verify_plugins && verify_lock; then
  # Decided by the plugins themselves, not a marker or one directory: an
  # empty clone (left by the pre-0.5.0 headless race) is not "installed",
  # and neither is a plugin away from its pin (an install made by an older
  # release): the sync below moves it to the pinned commit.
  say "==> Plugins already installed"
else
  repair_empty_clones
  say "==> Installing plugins (headless; this can take a few minutes)"
  BOOTSTRAP_LOG="$(mktemp "${TMPDIR:-/tmp}/dwp-vim-bootstrap.XXXXXX")"
  # timeout(1) is not on macOS by default; the sync callback exits nvim
  # on its own, the timeout is only a guard against a stuck clone.
  bootstrap_rc=0
  # Quoted operands (review round-2 finding 4): an unquoted word list
  # would split a destination containing spaces into extra argv.
  if command -v timeout >/dev/null 2>&1; then
    timeout "$BOOTSTRAP_TIMEOUT" env -u DWP_VIM_LOCK_UPDATE \
      XDG_CONFIG_HOME="$(dirname "$DEST")" \
      NVIM_APPNAME="$BOOTSTRAP_APPNAME" DWP_VIM_BOOTSTRAP=1 \
      nvim --headless </dev/null >"$BOOTSTRAP_LOG" 2>&1 || bootstrap_rc=$?
  else
    env -u DWP_VIM_LOCK_UPDATE \
      XDG_CONFIG_HOME="$(dirname "$DEST")" \
      NVIM_APPNAME="$BOOTSTRAP_APPNAME" DWP_VIM_BOOTSTRAP=1 \
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
    if [ "$STRICT" = 1 ]; then
      strict_fail "the headless plugin install failed or timed out (rc=$bootstrap_rc)"
    fi
    say "WARNING: the headless plugin install did not finish cleanly (rc=$bootstrap_rc)."
    say "         Launch nvim once, wait for the install to finish, then quit and reopen."
    say "         Log: $BOOTSTRAP_LOG"
  fi
fi

# The plugins themselves, not only the exit code: the check the images ran.
if command -v nvim >/dev/null 2>&1; then
  VERIFY_PROBLEMS=""
  if verify_plugins; then
    say "==> Plugins verified ($REQUIRED_PLUGINS present, no empty clone)"
  elif [ "$STRICT" = 1 ]; then
    strict_fail "plugins incomplete under $PCKR_OPT — $VERIFY_PROBLEMS"
  else
    say "WARNING: plugins incomplete under $PCKR_OPT — $VERIFY_PROBLEMS"
    say "         Launch nvim once to finish the install."
  fi
  # Each plugin at the commit the release pins: what makes two installs
  # (or two image builds) of one release the same code.
  if [ ! -f "$LOCKFILE" ] && [ "$STRICT" = 1 ] && [[ "$REF" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] \
    && ! version_gt 0.5.1 "${REF#v}"; then
    strict_fail "$REF ships pckr/lockfile.lua (0.5.1+), but $LOCKFILE is missing — plugin commits cannot be verified"
  elif [ ! -f "$LOCKFILE" ]; then
    say "NOTE: $REF has no plugin lock (pckr/lockfile.lua, 0.5.1+): plugin commits are not verified"
  elif verify_lock; then
    say "==> Plugin commits verified ($LOCK_COUNT pinned in pckr/lockfile.lua)"
  elif [ "$STRICT" = 1 ]; then
    strict_fail "plugins differ from pckr/lockfile.lua — $LOCK_PROBLEMS"
  else
    say "WARNING: plugins differ from pckr/lockfile.lua — $LOCK_PROBLEMS"
    say "         Rerun this installer to move them to their pinned commits."
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
if [ "$NVIM_PATH_HINT" = 1 ]; then
  say "  PATH          add $HOME/.local/bin to your PATH to use the Neovim --nvim installed"
fi
}

main "$@"
