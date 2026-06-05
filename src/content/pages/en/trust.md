---
title: "Trust and security"
description: "Why Deep Work Plan is safe to adopt: open source and MIT, Markdown-first with no network calls or telemetry, non-destructive by design, with verifiable installs and a clear vulnerability-disclosure policy."
lastUpdated: 2026-06-05
---

## Why you can trust it

Nobody should install a skill they cannot trust. Deep Work Plan is built to be verified, not taken on faith: open source, Markdown-first, non-destructive, and checkable before you run it.

- **Open source and MIT licensed** — the website and the skill are public and diffable; read every line before you run it.
- **Markdown-first — no network, no telemetry** — no CLI, no HTTP API, no auth flow; it makes no network calls and sends no telemetry. Nothing about your repository leaves your machine.
- **Non-destructive by design** — the only security-relevant action is changing your repository, and it reconciles rather than clobbers: it detects what exists, proposes a plan, and asks before replacing anything. Plan output lives in a gitignored `.dwp/` directory.
- **Touches no secrets** — never commits secrets, appends to `.gitignore` rather than rewriting it, and keeps changes to small, reviewable diffs.
- **Verifiable provenance** — every release publishes checksums over the shipped skill.

---

## Verify before you run

Treat the skill as untrusted until you have checked it. Each release attaches a `SHA256SUMS` file covering the shipped skill. Download it for the version you intend to install, then verify your copy matches — a non-zero exit means a file does not match and you should stop.

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git
cd deepworkplan-skill
# Download the checksums for the release you intend to install (replace vX.Y.Z):
curl -fsSL -o SHA256SUMS \
  https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
./setup.sh --verify        # non-zero exit means a file does not match — stop
```

Releases are **checksummed, not signed** — signing (cosign or maintainer GPG) is a documented next step, not a current claim. Because everything is open, you can also diff any file against the repository at its tag.

---

## Report a vulnerability

Report security issues privately to **security@dailybot.com** rather than opening a public issue. We acknowledge reports within 3 business days and aim to ship a fix or mitigation within 30 days for valid findings, depending on severity. The website and the skill share the same policy.

---

## Honest limitations

- Releases are checksummed, not yet cryptographically signed — signing is planned, not done.
- Deep Work Plan runs an autonomous coding agent against your repository. Review its proposed plan and its diffs; the methodology is designed for that review, not to replace it.
- These trust claims describe the official sources only. A modified or third-party copy that has drifted from the repositories carries none of these guarantees — verify it first.

---

## Trust resources

- [Machine-readable trust manifest](https://deepworkplan.com/.well-known/dwp-trust.json)
- [security.txt (RFC 9116)](https://deepworkplan.com/.well-known/security.txt)
- [Website security policy](https://github.com/DailybotHQ/deepworkplan-website/blob/main/SECURITY.md)
- [Skill security policy & threat model](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
- [Read the methodology](/methodology)
- [Adoption (init)](/init)
