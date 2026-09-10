---
title: Dokumentationsstandard
description: "Normativer Standard dafür, wie Deep Work Plans ihre Struktur, Aufgaben und Fortschritte dokumentieren: README-Regeln, Statusmarkierungen, die zehnteilige Aufgaben-Anatomie und das Final Review."
order: 1
lang: de
section: Standard
---

# Dokumentationsstandard

**Version 1.1.** Dieser Standard definiert, wie Deep Work Plans ihre Struktur, Aufgaben und Fortschritte dokumentieren. Er gilt für jeden Plan, der unter der DWP-Methodik erstellt wird. Die Schlüsselwörter MUSS, SOLLTE und KANN werden so verwendet, wie in RFC 2119 definiert.

## Plan-README

Jeder Plan MUSS eine `README.md` haben, die Folgendes enthält:

- **Titel** — `# Deep Work Plan: <name>`.
- **Ziel** — eine prosaische Formulierung des Plan-Ziels.
- **Quellmaterial** — Links oder Pfade zu kanonischen Eingaben (optional).
- **Aufgaben** — eine Markdown-Tabelle mit der Aufgabennummer, dem Namen und einer Status-Checkbox.
- **Status** — eine Zeile in der Form `<n>/<total> tasks complete`.

## Aufgabendateien

Jede Aufgabendatei MUSS den Namen `<n>.task_<slug>.md` tragen und die zehnteilige Anatomie enthalten — die neun klassischen Abschnitte plus die **Touched Surface**: der Vertrag zwischen dem, was die Aufgabe ändert, und dem, was validiert werden muss (geplante vs. tatsächliche Oberfläche, betroffene Konsumenten, eine Risikoklasse *isoliert*, *Nahtstelle*, *geteilt/zentral* oder *unbekannt*, die verwendete Test-Abbildung und das gewählte Gate mit seiner Begründung).

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

## Das Final Review, Aufgaben-lokale Skills-Entscheidungen und der optionale Bericht

Jeder Plan, der unter dieser Version verfasst wird, MUSS mit genau einer verpflichtenden Aufgabe enden: dem **Final Review** — dem Sicherheitstest über den vollständigen Änderungssatz des Plans, der Validierung des Endzustands auf dem letzten relevanten Zustand und dem Abgleich der Skills-Entscheidungen. Ein kritischer Sicherheitsbefund blockiert den Abschluss.

- **Aufgaben-lokale Skills-Entscheidungen.** Der Completion-&-Log-Abschnitt jeder Aufgabe trägt eine **Skills-Disposition** — `none`, ein Update einer bestehenden Skill oder eines bestehenden Agenten, eine benannte Neuerstellung oder eine Verschiebung mit Begründung und Verantwortlichem. Berechtigte Autorenschaft geschieht innerhalb der erzeugenden Aufgabe, vor ihrem Validierungs-Gate, nach einer Duplikatprüfung gegen den `.agents/`-Katalog; berechtigte Einträge werden als stabile Kandidaten (`T{task}-{seq}`) im Skills-Kandidaten-Ledger des Plans erfasst.
- **Der Executive Report ist optional, auf Anfrage.** Er wird einmal beim Abschluss angeboten und nur auf explizite Anfrage aus dauerhaften Belegen erzeugt. Bleibt die Antwort aus oder läuft der Plan unbeaufsichtigt, bleibt der Plan ohne ihn abgeschlossen.
- **Legacy-Pläne.** Pläne, die unter früheren Versionen verfasst wurden, enden mit den drei verpflichtenden Abschlussaufgaben und bleiben konform — ein Konformitätsprüfer MUSS diese Form akzeptieren.
