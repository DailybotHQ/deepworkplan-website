---
title: Add-ons
description: "Optionale DWP-Erweiterungen: die vier aktiven Addons (devcontainer, Dailybot, dependency-upgrade, design-system), der Addon-Vertrag und Kit-Konzepte."
order: 5
lang: de
section: Addons
---

# Add-ons

**Version 2.0.** Add-ons sind optionale Erweiterungen der zentralen Deep Work Plan-Methodik. Sie sind **niemals für Konformität erforderlich** — ein Repository ohne Addons ist vollständig AI-first und DWP-konform. Jedes Addon wird beim Onboarding angeboten, explizit angenommen oder abgelehnt und — bei Annahme — mit bestehendem Setup **abgeglichen**, statt es zu überschreiben.

## Der Addon-Vertrag

Jedes aktive Addon liefert vier obligatorische Komponenten:

| Komponente | Zweck |
|-----------|---------|
| **Spec** | Normative RFC-2119-Beschreibung dessen, was das Addon liefert und was „konform mit diesem Addon“ bedeutet |
| **Reasoning-Templates** | Leitfäden, die der Agent durch Schlussfolgerung über den Ziel-Repo-Stack ausfüllt — kein Copy-Paste |
| **Onboarding-Hook** | `SKILL.md`-Einstiegspunkt, den der `onboard`-Ablauf bei Annahme durch den Entwickler aufruft |
| **Validierungsschritt** | Checkliste, die bestätigt, dass das Addon korrekt angewendet wurde |

Discovery: Der `onboard`-Ablauf enumeriert `skills/deepworkplan/addons/` und präsentiert jedes Addon als Opt-in-Schritt in **Phase 7b**, nach dem zentralen Scaffolding.

## Aktive Addons (vier)

Vier Addons sind heute aktiv. Jedes hat eine **Kit-Katalogseite** mit nutzerorientierten Details und eine **normative Spec** innerhalb der Deep Work Plan-Skill.

### Devcontainer (erstes Addon)

Eine Compose-basierte `.devcontainer/` + `docker/`-Einrichtung, aus dem erkannten Stack abgeleitet.

- **Kit-Seite:** [Devcontainer](/kit/devcontainer)
- **Was es hinzufügt:** persistente AI-CLI-Auth-Volumes (Claude, Codex, Cursor, gh, Dailybot), `dailybot-project-network`, `DOCKER_DEV_ENV=vscode`, Validierungs-Aliase (`codecheck`, `check`, `fix`, `test`), Secret-Hygiene für öffentliches OSS
- **Verhalten:** ~85 % stabiles Skelett; ~15 % stack-spezifisch abgeleitet. Bestehende Devcontainer werden abgeglichen, niemals überschrieben
- **Wann angeboten:** die meisten Repos mit Docker oder Diensten, die von einem isolierten Dev-Container profitieren

### Dailybot (zweites Addon)

Eine optionale Verbindung zum **Dailybot-Team** des Entwicklers für Agenten-Fortschrittssichtbarkeit.

- **Kit-Seite:** [Dailybot](/kit/dailybot) — vollständige Fähigkeitsreferenz
- **Was das DWP-Addon verdrahtet:** vier Plan-Lifecycle-Reports (Kickoff, signifikante Aufgabe, blockiert, Abschluss) via dailybot-`report`-Sub-Skill; optionale deterministische Hook-Durchsetzung (`dailybot hook`, CLI `>= 3.1.2`)
- **Gepaarte Skill:** Installation von [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (aktuell **3.4.0**) exponiert **13 Fähigkeiten** — Chat in Slack/Teams/Discord/Google Chat, Check-ins, Formular-Autorisierung, Ask AI, Kudos, E-Mail und mehr. Das DWP-Addon verdrahtet nur **report**; andere Fähigkeiten werden direkt über die Dailybot-Skill aufgerufen
- **Auth:** vollständig an die Dailybot-Skill delegiert (`dailybot login` oder `DAILYBOT_API_KEY`); dieses Addon speichert niemals Credentials
- **Vendor-neutrale Leitplanke:** zentrales DWP hat **null** Dailybot-Abhängigkeit; niemals für alle automatisch installieren
- **Wann angeboten:** Entwickler oder Team nutzt bereits Dailybot oder fragt explizit nach Team-Reporting

### Dependency upgrade (drittes Addon)

Paketmanager-agnostische, gebündelte, validierte, revertierbare Dependency-Upgrades.

- **Kit-Seite:** [Dependency upgrade](/kit/dependency-upgrade)
- **Was es hinzufügt:** erkennt den **echten** Manager des Repos (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), upgraded in semver-klassifizierten Batches, führt nach jedem Batch die Validierungs-Gate des Repos aus, revertiert Fehler, fasst zusammen ohne Auto-Commit
- **Befehl:** installiert `/lib-upgrade` in `.agents/commands/` nur bei Annahme
- **Wann angeboten:** Lockfile vorhanden und dependency-lastiger Stack; nur empfehlen, wenn relevant

### Design system (viertes Addon)

Ein interface-oberflächenbezogenes `DESIGN.md`, das jeder Coding-Agent für konsistente UI-, CLI- oder Konversationsausgabe liest.

- **Kit-Seite:** [Design system](/kit/design-system)
- **Was es hinzufügt:** `docs/DESIGN.md` (referenziert aus `AGENTS.md`) mit bis zu drei **Profilen** in einer Datei: **visual-ui** (gerenderte UI-Tokens und Komponenten), **cli-output** (semantische Terminal-Stile, TTY/`NO_COLOR`-Degradation), **conversational** (Stimme, Nachrichtenanatomie, plattformspezifisches Rendering mit Plain-Text-Fallbacks)
- **Profilstärke:** visual-ui ist **standardmäßig an bei Erkennung**; cli-output und conversational werden **bei Erkennung empfohlen, immer gefragt, niemals automatisch angewendet**
- **Wann angeboten:** nur wenn eine nutzerorientierte Interface-Oberfläche erkannt wird — nicht für reine Libraries, headless Services oder reine Infra-Repos

## Skills

Skills sind wiederverwendbare Prozeduren, die namentlich aufgerufen werden. Eine Skill bündelt einen wiederholbaren Workflow (Tests ausführen, Lint beheben, Komponente erstellen).

Die Methodik liefert eine kleine Menge zentraler Sub-Skills. Darunter lässt die **author**-Sub-Skill ein Repository **sein eigenes Kit wachsen**: aufgerufen via `/skill-create` und `/agent-create`, schlussfolgert über das bestehende `.agents/`-Layout und Konventionen und autorisiert dann eine neue Skill, einen Agenten oder einen dünnen Befehls-Delegator, der dazu passt, und hält den Katalog synchron. Dieselbe Sub-Skill führt die obligatorische Skills-&-Agents-Discovery-Aufgabe aus.

Kit-Eintrag: [Skill create](/kit/skill-create), [Agent create](/kit/agent-create).

## Agents

Agents sind spezialisierte Worker mit definierter Rolle (Reviewer, Executor, Architect). Sie leben unter `.agents/agents/` und sind in `.agents/docs/` katalogisiert.

## Wartungs-Add-ons

Das **dependency-upgrade**-Add-on (oben) ist das primäre Wartungs-Addon. Es schlussfolgert über den tatsächlichen Paketmanager des Repos statt npm anzunehmen, klassifiziert Upgrades nach Semver, upgraded in sicheren Batches, führt nach jedem Batch Validierung aus und revertiert fehlgeschlagene Batches.

## Design-system-Add-on

Siehe [Design system](/kit/design-system) unter aktiven Addons. Das Repo-Level-`DESIGN.md` unterscheidet sich von einem Feature-spezifischen technischen Designdokument: DWPs Plan-README, Aufgaben-Akzeptanzkriterien und Validierungs-Gates decken Feature-Design bereits ab. Das design-system-Addon füllt dauerhaften, repo-nativen **Interface**-Designkontext.

## Presets

Presets passen DWP an einen bestimmten Tech-Stack an (Django, React, Go, Astro + Svelte und mehr). Durchsuchen Sie den [Kit-Katalog](/kit).

## Adapter

Adapter mappen DWP-Befehle auf das Befehlssystem eines bestimmten Agenten (Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw und andere). Adapter-Einträge leben im Kit unter dem Namen jedes Agenten.

## Beispiele

Beispiele demonstrieren DWP in der Praxis: Vorher/Nachher-Vergleiche, Beispielpläne, Fallstudien. Siehe [Examples](/examples) und [Dogfood this site](/kit/dogfood-this-site).

## Konformitätserinnerung

Ein Repository **MUSS** mit **null** Addons vollständig konform sein. Addons sind geschichtete Opt-in-Fähigkeiten — niemals Voraussetzungen. Siehe [Conformance](/spec/conformance).
