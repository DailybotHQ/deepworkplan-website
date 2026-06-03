---
title: Dependency upgrade
description: "An opt-in, package-manager-agnostic addon that upgrades a repo's dependencies in validated, revertible batches, detecting the real manager, not assuming npm."
kind: addon
lang: en
order: 3
---

# Dependency-upgrade addon

Bring a repository's dependencies up to date with a batched, validated, revertible workflow. The third opt-in Deep Work Plan addon.

## What it adds

- Detection of the repo's **real** package manager (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, and more) from the manifest and lockfile that exist.
- A `/lib-upgrade` command installed into `.agents/commands/`, **only when accepted**.

## Behavior

1. Require a clean (or backed-up) working tree.
2. Classify upgrades by semver — patch, minor, major; majors require explicit approval.
3. Upgrade in small, coherent batches; never all at once.
4. Run the repo's real validation gate after each batch; revert any batch that fails.
5. Summarize what was upgraded, skipped, and reverted; let the developer commit.

## Notes

Package-manager agnostic — never runs npm/ncu in a non-JS repo. Opt-in, never required, and never auto-commits.
