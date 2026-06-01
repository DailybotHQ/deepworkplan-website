---
title: Repository archetypes
description: "The individual repository and orchestrator hub archetypes, the heuristic for classifying a repository, and how onboarding and plan scope differ between them."
order: 5
lang: en
summary: Why a repository's archetype determines how an agent onboards and scopes plans.
icon: layers
---

# Repository archetypes

DWP recognizes two repository archetypes. The archetype an agent infers determines how it onboards and how it scopes plans, so identifying it correctly is the first decision in any engagement.

## Individual repository

A self-contained codebase — an application, a library, or a service. Plans operate directly on the code in the repository, and onboarding reads the repository's own structure and conventions.

Characteristics:

- A single coherent codebase.
- Plans modify files in this repository.
- The `.dwp/` workspace lives at the repository root.

## Orchestrator hub

A coordination repository that manages multiple child repositories. Plans may spawn child plans in sub-repositories, and onboarding reads the hub's registry of managed repositories rather than a single codebase.

Characteristics:

- Coordinates multiple sub-repositories.
- Plans may delegate to child plans.
- Maintains a registry of managed repositories.
- The `.dwp/` workspace at the hub root tracks cross-repository state.

## Classification heuristic

An agent should classify a repository as an orchestrator hub when it finds multiple nested git repositories or submodules, a registry or manifest of managed repositories, or configuration that points to external repositories. In the absence of those signals, it treats the repository as an individual repository.

## How onboarding differs

| Aspect | Individual | Orchestrator |
|--------|------------|--------------|
| Scope | This repository | Multiple repositories |
| Onboarding | Repository structure | Hub registry |
| Plan target | Local files | Child plans |
| State | Local `.dwp/` | Cross-repository `.dwp/` |

The practical effect is that an individual-repository agent reasons about one codebase end to end, while an orchestrator agent reasons about coordination — which child repository owns which work, and how cross-repository state stays consistent.

Getting the archetype right is what lets an agent work autonomously for hours without supervision: it scopes plans, onboarding, and state to the right boundary, so the agent operates on the correct surface from the first task to the last.
