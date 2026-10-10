#!/usr/bin/env bash
# dev.sh — this repository's development container, the same container VS Code
# or Cursor opens from .devcontainer/devcontainer.json. A thin launcher over
# devcontainer-kit (`dck`). The block between the dck markers is rendered and
# reconciled by `dck init`.
#
#   bash dev.sh up        build if needed and start (setup on the first run)
#   bash dev.sh shell     a shell inside, as the container user
#   bash dev.sh agents    the live coding agents on every Herdr machine
#   bash dev.sh ask <machine>:<pane> "<prompt>"   ask one of them
#   bash dev.sh help      every command
# >>> dck:devsh >>>
set -euo pipefail
DCK_RENDERED_WITH="v0.2.2"
cd "$(dirname "$0")"

usage() {
  cat <<'USAGE'
usage: bash dev.sh <command> [args]
  up                    setup (first run) and start the container
  down                  stop and remove the container (volumes are kept)
  shell                 a login shell inside, as the container user
  exec <cmd...>         run a command inside
  build | rebuild       build the image | rebuild and recreate (volumes are kept)
  logs | ps | doctor    container logs | status | a full diagnosis
  ssh [cmd...]          ssh into the container with agent forwarding
  herdr [add|status|repair|remove|mesh]   the container as a Herdr machine (default: add)
  herdr-layout [--keep|--reset]   the standard sidebar inside: Home · Editor · Development · Agents
  agents                the live coding agents on every Herdr machine
  ask <machine>:<pane> "<prompt>"   ask one of them, with the reply grant
USAGE
}

if ! command -v dck >/dev/null 2>&1; then
  cat >&2 <<EOF
dev.sh needs devcontainer-kit (dck) on this host — this repository was rendered
with ${DCK_RENDERED_WITH}. Install it, pinned (no pipe into a shell):
  git clone --branch ${DCK_RENDERED_WITH} https://github.com/DailybotHQ/devcontainer-kit
  ./devcontainer-kit/install.sh
EOF
  exit 4
fi
case "$(dck --version 2>/dev/null)" in
  "devcontainer-kit ${DCK_RENDERED_WITH#v}") ;;
  *) echo "dev.sh: note: this repository was rendered with devcontainer-kit ${DCK_RENDERED_WITH}; run \`dck init\` to reconcile it with $(dck --version 2>/dev/null)" >&2 ;;
esac

verb="${1:-help}"
[ $# -gt 0 ] && shift
case "$verb" in
  up) dck setup && exec dck up "$@" ;;
  down|shell|exec|build|rebuild|logs|ps|doctor|ssh|agents|ask|setup) exec dck "$verb" "$@" ;;
  herdr) if [ $# -eq 0 ]; then exec dck herdr add; else exec dck herdr "$@"; fi ;;
  herdr-layout) exec dck herdr layout "$@" ;;
  help|-h|--help) usage ;;
  *) echo "dev.sh: unknown command '$verb'" >&2; usage >&2; exit 2 ;;
esac
# <<< dck:devsh <<<
