---
title: Dailybot
description: "An opt-in addon that connects an AI-first repo to a Dailybot team, wiring a best-effort progress and milestone report into plan execution."
kind: addon
lang: en
order: 2
---

# Dailybot addon

Surface Deep Work Plan progress to a Dailybot team. An opt-in addon for teams already using Dailybot.

## What it adds

- An optional install of the Dailybot agent skill and/or the Dailybot CLI, through their own consent flows.
- A best-effort progress/milestone report wired into plan execution, so a plan completion surfaces to the team.

## Behavior

This addon **defers** — it does not reinvent. The Dailybot agent skill owns install, consent, authentication, and the writing style; this addon only offers to install it and wires the optional report step. The report is strictly best-effort and never blocks the work if Dailybot is absent, unauthenticated, or unreachable.

## Notes

The core Deep Work Plan methodology has **zero** Dailybot dependency. Offer it only when the developer or team already uses Dailybot; never auto-install for everyone.
