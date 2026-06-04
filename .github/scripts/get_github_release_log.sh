# Build the release-body content: all non-merge commits since the previous
# release marker (the auto-generated `[🤖 Deep Work Plan] New release to v…`
# commit). Walking the linear log from HEAD and breaking at that marker is
# fragile — commits introduced via a merged feature branch can appear AFTER
# the marker in topological order, so the loop misses them and the body ends
# up empty. Using `git log RANGE --no-merges` makes the collection
# order-independent.

set -euo pipefail

if [[ -f "git_logs_output.txt" ]]; then
  rm git_logs_output.txt
fi

# Find the most recent previous release marker commit. `--grep` matches the
# distinctive auto-release subject; `-n 1` returns the latest one.
PREV_RELEASE=$(git log --grep='\[🤖 Deep Work Plan\] New release to v' --format='%H' -n 1 || true)

if [[ -n "$PREV_RELEASE" ]]; then
  RANGE="${PREV_RELEASE}..HEAD"
else
  # First release ever — collect everything.
  RANGE='HEAD'
fi

# Collect every non-merge commit subject in the range, prefixed with the
# release-body emoji marker the workflow expects.
git log "$RANGE" --no-merges --format='🚩 %s' > git_logs_output.txt

# Fallback so the workflow never sees an empty file (which would fail the
# `[[ ! -f git_logs_output.txt ]]` guard downstream and yield a confusing
# "No description found" error for tidy releases like docs/CI-only PRs).
if [[ ! -s git_logs_output.txt ]]; then
  echo "🚩 Maintenance release" > git_logs_output.txt
fi
