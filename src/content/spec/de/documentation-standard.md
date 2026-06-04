---
title: Dokumentationsstandard
description: "Normativer Standard dafür, wie Deep Work Plans ihre Struktur, Aufgaben und Fortschritte dokumentieren: README-Regeln, Statusmarkierungen und die zwei verpflichtenden Abschlussaufgaben."
order: 1
lang: de
section: Standard
---

# Dokumentationsstandard

**Version 1.0.** Dieser Standard definiert, wie Deep Work Plans ihre Struktur, Aufgaben und Fortschritte dokumentieren. Er gilt für jeden Plan, der unter der DWP-Methodik erstellt wird. Die Schlüsselwörter MUSS, SOLLTE und KANN werden so verwendet, wie in RFC 2119 definiert.

## Plan-README

Jeder Plan MUSS eine `README.md` haben, die Folgendes enthält:

- **Titel** — `# Deep Work Plan: <name>`.
- **Ziel** — eine prosaische Formulierung des Plan-Ziels.
- **Quellmaterial** — Links oder Pfade zu kanonischen Eingaben (optional).
- **Aufgaben** — eine Markdown-Tabelle mit der Aufgabennummer, dem Namen und einer Status-Checkbox.
- **Status** — eine Zeile in der Form `<n>/<total> tasks complete`.

## Aufgabendateien

Jede Aufgabendatei MUSS den Namen `<n>.task_<slug>.md` tragen und die neunteilige Anatomie enthalten.

## PROGRESS.md

`PROGRESS.md` ist ein reines Anhänge-Ausführungsprotokoll. Jeder Eintrag MUSS Folgendes festhalten:

- Einen ISO-8601-Zeitstempel.
- Die Aufgabennummer und den Namen.
- Was getan wurde.
- Etwaige Abweichungen oder Übersprung-Gründe.

## Statusmarkierungen

- `[ ]` — nicht begonnen.
- `[~]` — in Arbeit.
- `[x]` — erledigt.
- `[!]` — blockiert.

## Überschriften

Alle Überschriften MÜSSEN Satzschreibweise (sentence case) verwenden. Dokumente SOLLTEN Marketing-Sprache und Ausrufezeichen vermeiden.

## Zwei verpflichtende Abschlussaufgaben

Jeder Plan MUSS mit zwei Standardaufgaben enden:

1. **Skills & Agents Discovery** — die erstellten wiederverwendbaren Skills und Agenten identifizieren.
2. **Executive Report** — eine Zusammenfassung der Ergebnisse für Stakeholder.
