---
title: "Das Deep Work Plan Kit"
description: "Die Skill und ihre acht Sub-Skills, Befehle, Agenten-Adapter, Onboarding-Presets, Opt-in-Addons und Beispiele, die Deep Work Plan überall ausführbar machen."
lastUpdated: 2026-05-31
---

## Das Deep Work Plan Kit

Das Kit ist alles, was Sie brauchen, um die Methodik in der Praxis auszuführen. Es wird aus
`DailybotHQ/deepworkplan-skill` installiert:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### Die Skill und ihre Sub-Skills

Die Deep Work Plan Skill ist ein Router plus acht Sub-Skills:

- **create** — ein Ziel in einen strukturierten Plan zerlegen (`/dwp-create`).
- **execute** — einen Plan Aufgabe für Aufgabe ausführen und jedes Gate validieren (`/dwp-execute`).
- **refine** — Aufgaben hinzufügen, entfernen oder umordnen, während abgeschlossene Arbeit bewahrt wird (`/dwp-refine`).
- **resume** — den Zustand rekonstruieren und einen unterbrochenen Plan fortsetzen (`/dwp-resume`).
- **status** — über den Fortschritt berichten, ohne Änderungen vorzunehmen (`/dwp-status`).
- **verify** — Repository- und Plankonformität objektiv prüfen (`/dwp-verify`).
- **onboard** — ein Repository AI-first machen (`/deepworkplan-onboard`).
- **author** — die eigenen Skills, Agenten und Befehle des Repositorys erstellen oder weiterentwickeln (`/skill-create`, `/agent-create`).

### Befehle

Schlanke Slash-Befehle delegieren an die Sub-Skills und Addons:

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — die Plan-Ausführen-Verifizieren-Schleife.
- `skill-create`, `agent-create` — delegieren an die author-Sub-Skill.
- `lib-upgrade` — delegiert an das dependency-upgrade-Addon (nur installiert, wenn dieses Addon angenommen wird).

### Adapter

Schlanke Integrationen je Agent für Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini, OpenCode, Windsurf, Cline, Antigravity, OpenClaw, Hermes sowie Cloud- und Hintergrund-Agenten (Claude Code Remote-Tasks, Codex Cloud, Jules-Klasse). OpenClaw und Hermes sind autonome Agenten-Plattformen, die Pläne unter dem unbeaufsichtigten Ausführungsprofil ausführen, gesteuert durch Heartbeat- oder Cron-Scheduling.

### Onboarding-Presets

Reasoning-Leitfäden je Stack, die der onboard-Ablauf nutzt, um Dokumentation, Skills und Validierungsbefehle anzupassen —
niemals Vorlagen. Sechs Presets: Django, Vue + Vite, Astro/Svelte, Node/TS-Service, Python-Package/CLI
und ein generischer Fallback.

### Addons (Opt-in)

Optionale Fähigkeiten, die der onboard-Ablauf einem Repository hinzufügen kann — nie Teil der AI-first-Baseline:

- **Devcontainer** — ein reproduzierbarer, isolierter Dev-Container mit persistenter AI-CLI-Authentifizierung.
- **Dailybot** — Best-Effort-Berichterstattung über Fortschritte und Meilensteine für Teams, die Dailybot nutzen.
- **Dependency-Upgrade** — paketmanager-agnostische, chargenweise, validierte, rücknehmbare Upgrades.
- **Design system** — eine interface-bezogene `DESIGN.md` (unter `docs/DESIGN.md`, von `AGENTS.md` referenziert), die aus der echten Designquelle des Repos abgeleitet wird, mit Profilen für visuelle UI, gestylte CLI-Ausgabe und konversationales Messaging, damit Agenten markenkonforme Interface-Ausgaben erzeugen; das visuelle Profil ist standardmäßig aktiv, wenn ein Designsystem erkannt wird, die CLI- und konversationalen Profile werden bei Erkennung empfohlen und stets erfragt.

### Beispiele

Durchgearbeitete Vorher-Nachher-Anleitungen.

- [Das Kit durchstöbern](/kit)
- [Schnellstart](/quickstart)
- [Beispiele ansehen](/examples)
