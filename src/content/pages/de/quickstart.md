---
title: "Schnellstart — Deep Work Plan"
description: "Installieren Sie die Skill, onboarden Sie Ihr Repository, dann planen und führen Sie mit jedem Agenten aus — die Schritte, die Ihr Repository spec-driven und agenten-steuerbar machen."
lastUpdated: 2026-05-31
---

## Schnellstart

Installieren Sie die Skill, onboarden Sie Ihr Repository, dann planen und führen Sie mit jedem Agenten aus — die Schritte, die
Ihr Repository spec-driven und agenten-steuerbar machen.

## Der Adoptionspfad

### 1. Die Deep Work Plan Skill installieren

Fügen Sie die Skill zu Ihrem Repository hinzu. Sie liefert einen Router plus acht Sub-Skills — create, execute, refine,
resume, status, verify, onboard und author. Nutzen Sie die Skills-CLI für den schnellsten Weg:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Oder klonen Sie das Repository und führen Sie das Setup aus, wo git und eine Shell verfügbar sind:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### 2. Das Repository onboarden

Führen Sie die onboard-Sub-Skill aus und lassen Sie den Agenten über Ihr tatsächliches Repository schlussfolgern — seinen Stack, Paket-
manager und die echten Validierungsbefehle:

```bash
/deepworkplan-onboard
```

Es erzeugt `AGENTS.md`, eine `docs/`-Wissensbasis, Dokumentation je Modul und ein agentenübergreifendes `.agents/`-Verzeichnis
(mit dem `.claude → .agents`-Symlink), bindet die schlanken `dwp-*`-Befehle ein und legt ein per gitignore ausgeschlossenes
`.dwp/` für Pläne und Entwürfe an. Nichts wird aus Vorlagen erzeugt; alles wird an Ihr Repository angepasst.

### 3. Das Kit weiterentwickeln und Addons annehmen

Nutzen Sie `/skill-create` und `/agent-create` (die author-Sub-Skill), um stack-passende Skills,
Agenten und Befehle aufzubauen. Das Onboarding bietet außerdem fünf Opt-in-Addons — devcontainer, Dailybot,
dependency-upgrade, design-system und AI Diff Reviewer —, die Sie nur annehmen, wenn sie passen. Ein Repository ist mit null Addons vollständig konform.

### 4. Planen und ausführen

Erzeugen Sie einen Deep Work Plan und führen Sie ihn Aufgabe für Aufgabe aus:

```bash
/dwp-create <goal>
/dwp-execute
```

Nutzen Sie `/dwp-status`, `/dwp-refine` und `/dwp-resume` im Verlauf der Arbeit. Jeder Plan trägt nummerierte Aufgaben,
Validierungs-Gates und ein Completion-Protokoll, sodass die Arbeit strukturiert und über Sitzungen hinweg wiederaufnehmbar bleibt.

## Das Ergebnis

Ihr Repository wird spec-driven und agenten-steuerbar: Der Plan ist die dauerhafte Quelle der Wahrheit, und
das Repository selbst wird zum Harness, gegen das jeder Agent läuft.

- [Methodik lesen](/methodology)
- [Die Spezifikation durchstöbern](/spec)
- [Das Kit erkunden](/kit)
