---
title: "Deep Work Plan im Vergleich mit den Alternativen — Deep Work Plan"
description: "Wie Deep Work Plan zu spec-driven Werkzeugen, Agenten-Frameworks und hersteller-nativen Plan-Modi steht: in eigenen Begriffen, mit Quellen und Prüfdatum."
lastUpdated: 2026-09-10
---

## Deep Work Plan und die Alternativen

Wählen Sie die richtige Ebene für Ihre Situation. Jede Alternative wird in ihren eigenen Begriffen beschrieben, jede Angabe lässt sich zur offiziellen Dokumentation zurückverfolgen, und die Seite nennt das Datum der letzten Prüfung. Dies ist eine Karte, keine Rangliste.

## Wie Sie diese Seite lesen

Drei Werte beschreiben jede Fähigkeit. Sie sagen, wo eine Fähigkeit in einem Werkzeug liegt — nicht, wie gut das Werkzeug ist.

- **Integriert**
- **Optional oder über Erweiterung**
- **Nicht im Umfang**

Zuletzt geprüft: 2026-09-10

## Die Alternativen, in ihren eigenen Begriffen

### Werkzeuge für spec-driven Entwicklung

**GitHub Spec Kit** — Überführt ein Feature über eine Konstitution, eine Spezifikation, einen Plan und eine Aufgabenliste in eine ausführbare Spezifikation, angetrieben von Slash-Befehlen, die mehr als fünfzig Coding-Agenten integrieren. Teams, die einen wiederholbaren Workflow aus Specify, Plan, Tasks und Implement im bereits genutzten Agenten wollen. [Offizielle Website](https://github.com/github/spec-kit)

**OpenSpec** — Erfasst jede Änderung als Proposal mit Delta-Specs (hinzugefügt, geändert, entfernt) und RFC-2119-Anforderungen mit Szenarien und archiviert sie anschließend in lebenden Spezifikationen. Teams an bestehenden Systemen, deren Spezifikationen Änderung für Änderung wachsen sollen. [Offizielle Website](https://openspec.dev)

**Amazon Kiro** — Eine agentische IDE und CLI, deren Spezifikationen von EARS-artigen Anforderungen über das Design zu Aufgaben führen, mit Steering-Dateien und Hooks, die auf Editor-Ereignissen laufen. Entwickler, die spec-driven Development fest im Editor integriert haben möchten, gestützt auf AWS-Werkzeuge. [Offizielle Website](https://kiro.dev)

### Agenten-Workflow-Frameworks

**BMAD Method** — Ein agiles Framework spezialisierter Agentenrollen (Analyse, Produkt, Architektur, Entwicklung, Qualität), das Briefings, Anforderungen, Architekturdokumente und Story-Dateien erzeugt. Teams, die rollenbasierte Zeremonien schätzen und für Agentenarbeit einen vollständigen agilen Lebenszyklus wollen. [Offizielle Website](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Eine Skills-Bibliothek und ein Workflow für Brainstorming, Planung in kleinen Test-first-Schritten, Ausführung mit Subagenten und Review vor dem Abschluss. Entwickler, die disziplinierte testgetriebene Ausführung innerhalb ihres Coding-Agenten wollen. [Offizielle Website](https://github.com/obra/superpowers)

**Get Shit Done** — Ein Planungssystem mit einem .planning-Verzeichnis, Anforderungs-IDs, Phasenplänen, Ausführung mit frischem Kontext und einem Verifizierungsdurchlauf gegen genannte Must-haves. Einzelentwickler und kleine Teams, die Context Engineering und Verifizierung mit wenig Zeremoniell wollen. [Offizielle Website](https://github.com/open-gsd/gsd-core)

### Hersteller-native Plan-Modi

**Hersteller-native Plan-Modi** — Claude Code, Codex, Cursor und Gemini CLI liefern Plan-Modi, Anweisungsdateien und Skills, die den AGENTS.md- und Agent-Skills-Standards folgen. Alle, die Planung innerhalb eines einzelnen Agenten wollen, ohne eine Methodik zu übernehmen. [Offizielle Website](https://agents.md)

## Fähigkeitsmatrix

Wo jede Fähigkeit liegt, je Werkzeug. Integriert, optional oder über Erweiterung oder nicht im Umfang. Geprüft anhand der offiziellen Dokumentation.

| Fähigkeit | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | Get Shit Done | Hersteller-native Plan-Modi |
|---|---|---|---|---|---|---|---|---|
| Funktioniert mit jedem Coding-Agenten | Integriert | Integriert | Integriert | Nicht im Umfang | Integriert | Integriert | Integriert | Nicht im Umfang |
| Schreibt das Agenten-Harness in das Repository | Integriert | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Nicht im Umfang | Optional oder über Erweiterung | Optional oder über Erweiterung |
| Akzeptanzkriterien je Aufgabe | Integriert | Optional oder über Erweiterung | Integriert | Integriert | Integriert | Integriert | Integriert | Optional oder über Erweiterung |
| Validierungs-Gate je Aufgabe | Integriert | Optional oder über Erweiterung | Nicht im Umfang | Optional oder über Erweiterung | Optional oder über Erweiterung | Integriert | Optional oder über Erweiterung | Optional oder über Erweiterung |
| Wiederaufnehmbarer Zustand auf der Festplatte | Integriert | Integriert | Integriert | Integriert | Optional oder über Erweiterung | Optional oder über Erweiterung | Integriert | Optional oder über Erweiterung |
| Verpflichtende Abschlussprüfung mit Sicherheitstest | Integriert | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung |
| Ausführbarer Konformitätsprüfer | Integriert | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Optional oder über Erweiterung |
| Veröffentlichte Messung der Instruktionslast | Integriert | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang |
| Onboarding, das Dokumentation aufbaut | Integriert | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Nicht im Umfang | Integriert | Optional oder über Erweiterung |
| Lebende Spezifikationen für bestehende Systeme | Nicht im Umfang | Optional oder über Erweiterung | Integriert | Optional oder über Erweiterung | Optional oder über Erweiterung | Nicht im Umfang | Optional oder über Erweiterung | Nicht im Umfang |

## Was Deep Work Plan mitbringt

- **Werkzeug-agnostisch und repository-nativ.** Das Harness und der Plan sind Dateien in Ihrem Repository, lesbar für jeden Agenten, der den AGENTS.md- und Agent-Skills-Standards folgt. Ein Agentenwechsel verliert den Plan nicht.
- **Validierung, ausgewählt aus dem, was jede Aufgabe berührt hat.** Jede Aufgabe deklariert ihre berührte Oberfläche und führt die Tests des geänderten Verhaltens und seiner Konsumenten aus, ausgeweitet auf die gesamte Suite, wenn die Wirkung sich nicht abgrenzen lässt. Null ausgewählte Tests sind niemals ein Bestehen.
- **Ein Final Review mit Sicherheitstest.** Ein Plan schließt mit einer Sicherheitsprüfung der kumulierten Änderungsmenge — einschließlich eines erforderlichen lokalen Reviews des Diffs — und einer Validierung des Endzustands. Kritische Befunde blockieren den Abschluss.
- **Zustand, der Sitzungen und Agenten übersteht.** README-Checkboxen, Aufgabenprotokolle, ein begrenzter Arbeitsindex und eine maschinenlesbare Zustandsdatei werden an jeder Grenze geschrieben, sodass eine andere Sitzung oder ein anderer Agent von der Festplatte aus weitermacht. Selbst eine unterbrochene Planerstellung ist wiederherstellbar.
- **Ein Konformitätsprüfer für das Repository selbst.** Ein nur lesendes Skript verifiziert das Harness und jeden Plan gegen die Spezifikation, versteht beide Plan-Lebenszyklen und beendet sich mit einem CI-freundlichen Code.
- **Instruktionslast gemessen und veröffentlicht.** Ein committetes Skript misst, wie viele Bytes jeder Flow lädt; die Ergebnisse, Zunahmen eingeschlossen, werden als Bytes veröffentlicht, niemals als Token- oder Kostenprozente.

## Ehrliche Grenzen

Deep Work Plan hat keinen Mechanismus für lebende oder Delta-Spezifikationen; OpenSpec und ähnliche Werkzeuge sind dort stärker. Ein unabhängiger Benchmark der Methodik existiert noch nicht; eine vorregistrierte öffentliche Evaluation ist geplant. Das Instruktionslast-Ledger misst geladene Bytes, nicht Token, Kosten oder Ergebnisse.

## Helfen Sie uns, diese Seite korrekt zu halten

Diese Seite wird am angezeigten Datum geprüft und auf Anfrage korrigiert. Ist eine Beschreibung Ihres Werkzeugs veraltet oder unvollständig, eröffnen Sie ein Issue, und wir korrigieren es.

[Ein Issue eröffnen](https://github.com/DailybotHQ/deepworkplan-website/issues)

## Quellen

- Deep Work Plan — https://deepworkplan.com/spec
- GitHub Spec Kit — https://github.github.io/spec-kit/
- OpenSpec — https://openspec.dev/docs
- Amazon Kiro — https://kiro.dev/docs/
- BMAD Method — https://github.com/bmad-code-org/BMAD-METHOD#readme
- Superpowers — https://github.com/obra/superpowers#readme
- Get Shit Done — https://github.com/open-gsd/gsd-core#readme
- Hersteller-native Plan-Modi — https://agentskills.io
