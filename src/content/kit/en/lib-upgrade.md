---
title: lib-upgrade
description: "Safely upgrade a repository's dependencies in validated, revertible batches via the dependency-upgrade addon. Installed only when that addon is accepted."
kind: command
lang: en
order: 9
usage: /lib-upgrade
---

# lib-upgrade

Upgrade the repository's dependencies safely. A thin delegator to the **dependency-upgrade** addon.

## What it does

`lib-upgrade` routes to the dependency-upgrade addon. The addon reasons about the repo's actual package manager — never assuming npm — classifies upgrades by semver, upgrades in safe batches, runs the repo's real validation gate after each batch, reverts a failing batch, and summarizes.

## Usage

```
/lib-upgrade
```

## Behavior

1. Require a clean (or backed-up) working tree.
2. Detect the real package manager from the manifest and lockfile that exist.
3. Classify upgrades (patch / minor / major); majors require approval.
4. Upgrade in small batches; validate the repo's real gate after each.
5. Revert any batch that fails the gate; summarize and let the developer commit.

## Notes

This command is installed only when the dependency-upgrade addon is accepted. Package-manager agnostic; it never auto-commits.
