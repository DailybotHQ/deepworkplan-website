#!/usr/bin/env bash
# Release assets for a tag (ecosystem amendment A3 S4):
#
#   bash .github/scripts/release_assets.sh <tag>
#
# Writes, in the working directory:
#   release_notes.md  the CHANGELOG.md section of <tag> (the GitHub release body)
#   SHA256SUMS        sha256 of every tracked file the release ships verbatim:
#                     public/ (served as-is by the site, incl. /vim/install.sh,
#                     the schemas and the .well-known manifests) and cli/ (the
#                     npm package). Verify with `sha256sum -c SHA256SUMS` from a
#                     checkout of the tag.
# Dependencies: bash, git, sha256sum (or shasum), awk. No network.
set -euo pipefail

TAG=${1:?usage: release_assets.sh <tag>}
VERSION=${TAG#v}

awk -v v="$VERSION" '
  $0 ~ "^## \\[" v "\\]" { on = 1; next }
  on && /^## \[/ { exit }
  on { print }
' CHANGELOG.md | sed '/./,$!d' > release_notes.md
if [ ! -s release_notes.md ]; then
  echo "release_assets: CHANGELOG.md has no section for ${VERSION}" >&2
  exit 1
fi

if command -v sha256sum >/dev/null 2>&1; then SUM=(sha256sum); else SUM=(shasum -a 256); fi
git ls-files -z -- public cli | sort -z | xargs -0 "${SUM[@]}" > SHA256SUMS
echo "release_assets: release_notes.md ($(wc -l < release_notes.md) lines), SHA256SUMS ($(wc -l < SHA256SUMS) files)"
