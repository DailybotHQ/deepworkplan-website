---
title: Dailybot
description: "Optionales DWP-Addon: verbindet den Plan mit einem Dailybot-Team, optionale Hooks und die Agent-Skill 3.10.3 (Chat, Check-ins, Formulare, Ask AI und mehr)."
kind: addon
lang: de
order: 2
---

# Dailybot-Addon

Verbindet die Deep Work Plan-Ausführung mit einem **Dailybot-Team**, damit Menschen sehen, was Agenten bauen — Kickoff, Fortschritt mitten im Plan, Blocker und Abschluss — ohne zusätzliche Meetings oder eine zweite Toolchain. Ein **optionales** Addon für Teams, die bereits [Dailybot](https://www.dailybot.com) nutzen.

Die zentrale Deep Work Plan-Methodik hat **null** Dailybot-Abhängigkeit. Ein Repository ohne Addons ist vollständig konform. Bieten Sie dieses Addon nur an, wenn der Entwickler oder das Team Dailybot bereits nutzt; niemals für alle automatisch installieren.

## Wann es einsetzen

| Signal | Aktion |
|--------|--------|
| Team nutzt bereits Dailybot (Slack, Teams, Discord, Google Chat oder das Dashboard) | Während des Onboardings **empfehlen** |
| Entwickler fragt nach Sichtbarkeit des Agentenfortschritts oder Standup-Updates | Addon **anbieten** |
| Greenfield-Repo ohne Dailybot-Konto | **Überspringen** — neutrale Vendor-Baseline reicht |
| Kundenarbeit unter NDA, bei der Fortschritt das Repo nicht verlassen darf | **Überspringen** oder `.dailybot/disabled` als lokalen Kill-Switch committen |

## Was dieses Addon verbindet (bewusst eng gefasst)

Das DWP-Dailybot-Addon **erfindet** Dailybot nicht neu. Es verbindet die Planausführung mit der dailybot-**`report`**-Sub-Skill und committet optional Harness-Hooks. Alles andere — Installation, Einwilligung, Authentifizierung, Schreibstil — wird an die offizielle [Dailybot-Agent-Skill](https://github.com/DailybotHQ/agent-skill) (aktuell **3.10.3**) **delegiert**.

### Vier Lifecycle-Ereignisse

Während DWP `create` / `execute` verbindet das Addon **vier Best-Effort-Agenten-Updates**. Jedes Ereignis ist bedingt (Dailybot vorhanden und authentifiziert), nicht blockierend und respektiert `.dailybot/disabled`.

| Ereignis | Auslöser | Level | Anforderung |
|-------|---------|-------|-------------|
| **Kickoff** | Plan materialisiert und genehmigt, oder erster `execute`-Turn | regular | SHOULD |
| **Signifikante Aufgabe** | Ein Feature, Bugfix oder größeres Refactoring abgeschlossen — keine Setup-Arbeiten | regular | MAY |
| **Blockiert** | Plan stoppt; `state.json.blocked` befüllt (`reason`, `needs`) | regular + blockers | SHOULD |
| **Abschluss** | Alle Aufgaben erledigt; Plan endet | **milestone** | SHOULD |

Payloads leiten sich von der State-Schicht des Plans (`state.json`) ab, wenn vorhanden: `completed` als Ergebnisse (keine Aufgabennummern), `in_progress` von der aktuellen Aufgabe, `blockers` von `state.json.blocked`. Die Nachricht beschreibt **was gebaut wurde und warum** — niemals Dateipfade, Git-Statistiken, Branch-Namen oder Plan-IDs.

### Optionale Hook-Durchsetzung

Mit `dailybot-cli >= 3.7.0` **kann** das Addon Repo-Level-Harness-Hooks committen (`dailybot hook session-start | activity | post-commit | stop | dismiss`), gestützt durch ein lokales Repo-Ledger. Der Harness erinnert den Agenten am Ende des Turns, wenn ein Lifecycle-Ereignis verpasst wurde — kritisch für lange unbeaufsichtigte Sessions, in denen Prompt-Anweisungen verblassen.

Ein erfolgreicher Lifecycle-Report **setzt** das Hook-Ledger zurück, sodass die beiden Schichten nie doppelt berichten. Hook-Befehle lesen nur lokalen State und beenden immer mit `0`.

### Repo-Identität und Report-Richtlinie

Optional `.dailybot/profile.json` (oder `.dailybot_example/profile.json` als Vorlage) committen, damit jeder Mitwirkende und Agent Reports gleich signiert. **Niemals** Credentials in diese Datei — ein `key`-Feld ist ein harter Fehler.

Dieselbe Datei kann Report-Richtlinien tragen, die Hooks beachten:

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` ist besonders nützlich für Forschungs- oder Docs-lastige Repos: Arbeit ohne Commits (Analyse, Designdokumente, Pläne) wird früher angestoßen.

## Installation (alles optional)

Das Addon **bietet** Installationspfade; die Dailybot-Skill besitzt Einwilligung und Verifikation.

| Komponente | Befehl / Pfad |
|-----------|----------------|
| **Dailybot-Agent-Skill** (empfohlen) | `npx skills add DailybotHQ/agent-skill` |
| **Bestehende Skill aktualisieren** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git clone** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI** (Minimum `>= 3.7.0`) | Von der Skill bei erster Nutzung via verifiziertem `shared/auth.md` installiert; oder `pip install 'dailybot-cli>=3.7.0'`, Homebrew oder Installer mit Prüfsumme unter [cli.dailybot.com](https://cli.dailybot.com) |

Versionen prüfen: `dailybot --version` und `dailybot version --check`. Upgrade: `dailybot upgrade`.

## Authentifizierung — delegiert

Dieses Addon **fordert niemals** E-Mail, OTP oder API-Keys an und **speichert niemals** Credentials. Authentifizierung gehört zur Dailybot-Skill [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md):

- `dailybot login` (E-Mail-OTP), oder
- `DAILYBOT_API_KEY` / `dailybot config key=...`, oder
- eine optionale, gitignorierte `.dailybot/env.json`-Datei mit Per-Repo-Keys (`dailybot env add/use`, CLI `>= 3.7.0`), damit ein Entwickler in verschiedenen Repos bei verschiedenen Organisationen angemeldet sein kann.

Die Auth-Auflösung ist **Bearer-first**: ein Session-Token hat Vorrang, mit einem transparenten Bearer→API-Key-Retry bei `401`/`403`, sodass ein veraltetes Token niemals einen gültigen Key blockiert. Wird Auth abgelehnt oder ist nicht verfügbar, wird Reporting still übersprungen — die Arbeit geht weiter.

## Die gepaarte Dailybot-Skill — 14 Fähigkeiten (3.10.3)

Die Installation der Dailybot-Agent-Skill bringt weit mehr als das DWP-Addon verbindet. Das offizielle Skill-Paket (Skill **3.10.3**, CLI-Baseline **>= 3.7.0**, aktuelle Veröffentlichung **3.7.3**) exponiert **14 koordinierte Sub-Skills**:

| Sub-Skill | Was sie tut |
|-----------|--------------|
| **Fortschrittsberichte** | Standup-artige Agenten-Updates ins Dailybot-Dashboard |
| **Ask the AI** | Einmalige, headless Abfragen an den Dailybot-KI-Assistenten |
| **Nachrichten-Polling** | Team-Anweisungen beim Session-Start oder im Leerlauf prüfen |
| **E-Mail** | E-Mails mit obligatorischen Sicherheitsprüfungen vor dem Versand |
| **Chat** | Senden oder Bearbeiten in Slack, Microsoft Teams, Discord oder Google Chat — Kanäle, DMs, Teams, Report-Threads, send-as-user (Slack, Admin) |
| **Konversationen** | Slack-Gruppen-DM mit Bot und benannten Teamkollegen öffnen oder wiederverwenden; Report im selben Aufruf posten |
| **Health und Status** | Agent online/offline für lange Sessions ankündigen |
| **Check-ins** | Standups abschließen; Check-ins **autorisieren** (Zeitplan, Teilnehmer, Fragen, Erinnerungen, KI-Einstellungen) |
| **Kudos** | Teamkollegen oder ganze Teams anerkennen; Anerkennungs-Feed, Org-Feed, Wall of Fame durchsuchen |
| **Teams** | Teams listen, Mitglieder inspizieren, Namen zu UUIDs auflösen; `me`, `org`, Benutzerprofile |
| **Formulare** | Formulare listen (jetzt standardmäßig **org-weit**, mit `--mine` und `--owner` zum Eingrenzen), einreichen, aktualisieren, transitionieren; Formulare **autorisieren** (Workflow-States, Berechtigungen, ChatOps); Pagination, Suche und Datumsfilter |
| **Workflows** | Org-Workflows lesen (`workflow list` / `workflow get`; nur lesen) |
| **Report-Kanäle** | Kanal-UUIDs für Formulare oder Check-ins entdecken |
| **Per-Repo-API-Keys** | `.dailybot/env.json` verwalten — eine optionale, gitignorierte Datei mit API-Keys + URLs pro Umgebung (`dailybot env add / use / show / list / remove / off / on`, CLI `>= 3.7.0`) |

**Das DWP-Addon verbindet nur `report` mit der Planausführung.** Rufen Sie die Dailybot-Skill direkt für alles andere auf — z. B. Deploy-Zusammenfassung in `#releases` posten, Standup abschließen oder die Dailybot-KI bitten, Check-in-Trends zusammenzufassen.

Öffentliche Referenz: [dailybot.com/skill.md](https://www.dailybot.com/skill.md). Quelle: [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill). Trust-Modell: [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md) im Skill-Paket.

## Verhalten — delegieren, niemals blockieren

| Regel | Detail |
|------|--------|
| **Delegieren** | Dailybot-Skill besitzt Installation, Einwilligung, Auth, Hook-Vorlagen, Schreibstil |
| **Niemals blockieren** | CLI fehlt, Auth-Fehler, Netzwerkfehler → einmal warnen, Hauptarbeit fortsetzen |
| **Keine Retries** | Keine Diagnose-Schleifen; Reporting ist Best-Effort |
| **Abgleichen** | Bestehende Skill, CLI, Profil, Hooks oder Report-Verdrahtung bleiben erhalten — nur Lücken füllen |
| **Vendor-neutral** | DWP erfordert Dailybot nicht; dieses Addon ist additive Team-Sichtbarkeit |

## Onboarding-Ablauf

Während DWP `onboard` **Phase 7b**, nach dem zentralen AI-first-Scaffolding, bietet der Ablauf fünf optionale Addons. Akzeptiert der Entwickler Dailybot:

1. Bestehendes Setup erkennen (Skill, CLI, `.dailybot/profile.json`, Hooks, Report-Schritt).
2. Skill-/CLI-Installation über Dailybots Einwilligungsflows anbieten.
3. Authentifizierung an `shared/auth.md` delegieren.
4. Die vier Lifecycle-Ereignisse in `AGENTS.md` / `docs/AI_AGENT_COLLAB.md` verdrahten.
5. Optional Hook-Durchsetzung und `.dailybot/profile.json` anbieten.
6. Validierung ausführen (SPEC §8 in der Skills `addons/dailybot/SPEC.md`).

Normativer Vertrag in der Deep Work Plan-Skill: `addons/dailybot/SPEC.md` (Version **2.3.0**).

## Verwandte Kit-Einträge

- [Devcontainer](/kit/devcontainer) — reproduzierbare Dev-Umgebung mit Dailybot-CLI-Persistenz (erstes Addon)
- [Dependency upgrade](/kit/dependency-upgrade) — gebündelte, validierte Dependency-Upgrades (drittes Addon)
- [Design system](/kit/design-system) — agentenorientiertes `DESIGN.md` für Interface-Oberflächen (viertes Addon)
- [Deep Work Plan onboard](/kit/deepworkplan-onboard) — die Onboarding-Sub-Skill, die Addons anbietet
