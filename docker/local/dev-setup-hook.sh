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
