---
title: Dailybot
description: "An opt-in addon that connects an AI-first repo to a Dailybot team: best-effort progress and milestone reports in plan execution, plus optional autonomous hook enforcement."
kind: addon
lang: en
order: 2
---

# Dailybot addon

Surface Deep Work Plan progress to a Dailybot team. An opt-in addon for teams already using Dailybot.

## What it adds

- An optional install of the Dailybot agent skill and/or the Dailybot CLI, through their own consent flows.
- A best-effort progress/milestone report wired into plan execution, so a plan completion surfaces to the team.
- Optional deterministic hook enforcement (Dailybot agent skill 1.6.0+, CLI 1.12.0+): committed harness hooks that detect unreported work from a local ledger and remind the agent at end of turn, so reporting stays autonomous even in long unattended sessions where prompt instructions decay.

## Behavior

This addon **defers** — it does not reinvent. The Dailybot agent skill owns install, consent, authentication, the hook templates, and the writing style; this addon only offers to install it, wires the optional report step, and offers the repo-level hook config. The report is strictly best-effort and never blocks the work if Dailybot is absent, unauthenticated, or unreachable.

The two layers compose without double-reporting: a successful lifecycle report resets the hook ledger, so the hooks stay silent after a report and act only as a deterministic backstop when a lifecycle event was missed. The hook commands read local state only and always exit zero, so they can never block the work either.

## Notes

The core Deep Work Plan methodology has **zero** Dailybot dependency. Offer it only when the developer or team already uses Dailybot; never auto-install for everyone.
