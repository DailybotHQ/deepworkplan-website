# Security Policy

This repository is the source for the **Deep Work Plan website**
([deepworkplan.com](https://deepworkplan.com)), maintained by the team at
[Dailybot](https://www.dailybot.com). It is a static site (Astro, deployed to
Cloudflare Pages) with no database, no user accounts, and no server-side session
handling — a deliberately minimal attack surface.

> Looking for the **skill**? Vulnerabilities in the installable Deep Work Plan
> skill belong in the skill repo:
> [`DailybotHQ/deepworkplan-skill` → SECURITY.md](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md).
> That policy is the **single source of truth** for the skill's threat model and
> guarantees; this one covers the website.

## Reporting a vulnerability

Please report security issues **privately through GitHub's private vulnerability reporting** — do not
open a public issue (that would disclose the problem before a fix exists). Use the relevant repository:

- **Website:** <https://github.com/DailybotHQ/deepworkplan-website/security>
- **Skill:** <https://github.com/DailybotHQ/deepworkplan-skill/security>

(If a repository's private reporting is ever unavailable, open a minimal issue asking us to enable it —
do **not** post exploit details publicly.)

Include:

- A description of the issue and the impact you observed
- Steps to reproduce (a minimal proof of concept is ideal)
- The affected URL(s) or commit, if known
- Your name or handle if you would like credit

A machine-readable pointer is published at
[`/.well-known/security.txt`](https://deepworkplan.com/.well-known/security.txt)
(RFC 9116).

## In scope

- The deployed site at deepworkplan.com (XSS, content injection, header/CSP
  issues, broken access control on any API route under `/api`).
- Code in this repository that produces the site.
- The agent-facing Markdown endpoints and the trust manifest
  (`/.well-known/dwp-trust.json`).

## Out of scope

- The Deep Work Plan **skill** itself → report to the
  [skill repo](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md).
- Third-party agent harnesses (Claude Code, Cursor, Codex, etc.) → report upstream.
- Findings that require a user-modified local copy that has drifted from this repo.
- Volumetric / denial-of-service testing against the hosting provider.

## What you can trust about this project

- **Open source, MIT licensed** — both the website and the skill are public and
  diffable.
- **No telemetry, no network calls in the skill** — see the skill's threat model.
- **Verifiable installs** — releases publish checksums; verify before you run
  (see the [provenance section](docs/SECURITY.md#provenance--integrity) and the
  public `/trust` page).

For maintainer-facing hardening practices (secrets, dependencies, build, CSP),
see [`docs/SECURITY.md`](docs/SECURITY.md).
