---
title: "Deep Work Plan im Vergleich mit den Alternativen"
description: "Wie Deep Work Plan zu spec-driven Werkzeugen, Agenten-Frameworks und hersteller-nativen Plan-Modi steht: in eigenen Begriffen, mit Quellen und Prüfdatum."
lastUpdated: 2026-09-11
---

## Deep Work Plan und die Alternativen

Wählen Sie die richtige Ebene für Ihre Situation. Jede Alternative wird in ihren eigenen Begriffen beschrieben, jede Angabe lässt sich zur offiziellen Dokumentation zurückverfolgen, und die Seite nennt das Datum der letzten Prüfung. Dies ist eine Karte, keine Rangliste.

## Wie Sie diese Seite lesen

Drei Werte beschreiben jede Fähigkeit. Sie sagen, wo eine Fähigkeit in einem Werkzeug liegt — nicht, wie gut das Werkzeug ist.

- **Integriert**
- **Optional oder über Erweiterung**
- **Nicht im Umfang**

Zuletzt geprüft: 2026-09-11

## Die Alternativen, in ihren eigenen Begriffen

### Werkzeuge für spec-driven Entwicklung

**GitHub Spec Kit** — Überführt ein Feature über eine Konstitution, eine Spezifikation, einen Plan und eine Aufgabenliste in eine ausführbare Spezifikation, angetrieben von Slash-Befehlen, die mehr als fünfzig Coding-Agenten integrieren, und kann prüfen, ob die Artefakte vor Beginn der Umsetzung untereinander konsistent bleiben. Teams, die einen wiederholbaren Workflow aus Specify, Plan, Tasks und Implement im bereits genutzten Agenten wollen. [Offizielle Website](https://github.com/github/spec-kit)

**OpenSpec** — Erfasst jede Änderung als Proposal mit Delta-Specs (hinzugefügt, geändert, entfernt) und RFC-2119-Anforderungen mit Szenarien und archiviert sie anschließend in lebenden Spezifikationen, mit einem Validator, der Vollständigkeit des Proposals und Szenario-Abdeckung prüft, bevor eine Änderung akzeptiert wird. Teams an bestehenden Systemen, deren Spezifikationen Änderung für Änderung wachsen sollen. [Offizielle Website](https://openspec.dev)

**Amazon Kiro** — Eine agentische IDE und CLI, deren Spezifikationen von EARS-artigen Anforderungen über das Design zu Aufgaben führen, mit Steering-Dateien und Hooks, die auf Editor-Ereignissen laufen, und die Spezifikationen für eine bestehende Codebasis erzeugen kann, um Lücken in den Anforderungen schon vor dem Design zu erkennen. Entwickler, die spec-driven Development fest im Editor integriert haben möchten, gestützt auf AWS-Werkzeuge. [Offizielle Website](https://kiro.dev)

### Agenten-Workflow-Frameworks

**BMAD Method** — Ein agiles Framework spezialisierter Agentenrollen (Analyse, Produkt, Architektur, Entwicklung, Qualität), das Briefings, Anforderungen, Architekturdokumente und Story-Dateien erzeugt, mit einer Definition of Done, die verlangt, dass jede Story von einem Teammitglied oder einem KI-Peer-Reviewer geprüft wird, bevor sie als abgeschlossen gilt. Teams, die rollenbasierte Zeremonien schätzen und für Agentenarbeit einen vollständigen agilen Lebenszyklus wollen. [Offizielle Website](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Eine Skills-Bibliothek und ein Workflow für Brainstorming, Planung in kleinen Test-first-Schritten, Ausführung mit Subagenten und Review vor dem Abschluss, mit mehr unterstützten Coding-Agenten-Hosts als jede andere Alternative auf dieser Seite, plus einem zweistufigen Subagenten-Review (Spezifikationstreue, dann Codequalität) bei jeder Aufgabe. Entwickler, die disziplinierte testgetriebene Ausführung innerhalb ihres Coding-Agenten wollen. [Offizielle Website](https://github.com/obra/superpowers)

**GSD Core** — Ein Planungssystem mit einem .planning-Verzeichnis, Anforderungs-IDs, Phasenplänen, Ausführung mit frischem Kontext und einem Verifizierungsdurchlauf gegen die aus der Zusammenfassung jedes Plans abgeleiteten, für Nutzer beobachtbaren Ergebnisse — gezielt gegen Context Rot ausgelegt, indem Recherche, Planung und Ausführung in wegwerfbaren Subagenten laufen und veraltete Verifizierungen per Content-Fingerprint erkannt werden. Einzelentwickler und kleine Teams, die Context Engineering und Verifizierung mit wenig Zeremoniell wollen. [Offizielle Website](https://github.com/open-gsd/gsd-core)

**Gentle-AI** — Konfiguriert die Coding-Agenten, die Sie bereits nutzen, mit persistentem Gedächtnis, das zusätzlich über Sitzungen und Modelle hinweg routet, kuratierten Skills, MCP-Servern, Personas und optionalem Spec-Driven Development oder Receipt-Driven Development. Die Konfiguration wird standardmäßig in die globalen Agenten-Einstellungen geschrieben; eine auf das Workspace beschränkte Installation ist optional. Entwickler, die ein konfiguriertes Agenten-Ökosystem wollen, das sich sitzungsübergreifend erinnert und bei Bedarf Nachweise liefert. [Offizielle Website](https://github.com/Gentleman-Programming/gentle-ai)

### AI-native SDLC

**Claudes AI-native SDLC** — Ein sechsstufiger Kreislauf von Plan und Design über Build, Test, Deploy bis Maintain, mit verpflichtender menschlicher Freigabe in jeder Stufe, dauerhaften Artefakten, die zwischen den Stufen ins Repository committet werden, einem eigenen, als Sicherheit gekennzeichneten Review-Durchlauf vor dem Deploy und kontinuierlichen Evals, die vorlaufende und nachlaufende Liefer-Indikatoren veröffentlichen. Teams, die Claude Codes durchgängigen Software-Delivery-Playbook und seinen Produktions-Feedback-Loop evaluieren. [Offizielle Website](https://claude.com/blog/the-ai-native-sdlc-playbook)

### Hersteller-native Plan-Modi

**Hersteller-native Plan-Modi** — Claude Code, Codex, Cursor und Gemini CLI liefern Plan-Modi, Anweisungsdateien und Skills, die auf den offenen, herstellerübergreifenden Standards AGENTS.md und Agent Skills aufbauen, auch wenn das genaue Verhalten des Plan-Modus weiterhin von Hersteller, Client und Version abhängt. Agent Skills insbesondere lädt beim Start nur eine kurze Zusammenfassung und die vollständigen Anweisungen erst bei Aktivierung, sodass ungenutzte Fähigkeiten den Kontext nicht belasten. Alle, die Planung innerhalb eines einzelnen Agenten wollen, ohne eine Methodik zu übernehmen. [Offizielle Website](https://agents.md)

## Fähigkeitsmatrix

Wo jede Fähigkeit liegt, je Werkzeug. Integriert, optional oder über Erweiterung oder nicht im Umfang. Geprüft anhand der offiziellen Dokumentation.

| Fähigkeit | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | GSD Core | Gentle-AI | Claudes AI-native SDLC | Hersteller-native Plan-Modi |
|---|---|---|---|---|---|---|---|---|---|---|
| Funktioniert mit jedem Coding-Agenten | Integriert | Integriert | Integriert | Nicht im Umfang | Integriert | Integriert | Integriert | Integriert | Nicht im Umfang | Nicht im Umfang |
| Schreibt das Agenten-Harness in das Repository | Integriert | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Nicht im Umfang | Optional oder über Erweiterung | Optional oder über Erweiterung | Integriert | Optional oder über Erweiterung |
| Akzeptanzkriterien je Aufgabe | Integriert | Optional oder über Erweiterung | Integriert | Integriert | Integriert | Integriert | Integriert | Optional oder über Erweiterung | Integriert | Optional oder über Erweiterung |
| Validierungs-Gate je Aufgabe | Integriert | Optional oder über Erweiterung | Nicht im Umfang | Optional oder über Erweiterung | Optional oder über Erweiterung | Integriert | Integriert | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung |
| Wiederaufnehmbarer Zustand auf der Festplatte | Integriert | Integriert | Integriert | Integriert | Optional oder über Erweiterung | Optional oder über Erweiterung | Integriert | Integriert | Integriert | Optional oder über Erweiterung |
| Verpflichtende Abschlussprüfung mit Sicherheitstest | Integriert | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Integriert | Optional oder über Erweiterung |
| Ausführbarer Konformitätsprüfer | Integriert | Optional oder über Erweiterung | Integriert | Optional oder über Erweiterung | Nicht im Umfang | Nicht im Umfang | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung |
| Veröffentlichte Messung der Instruktionslast | Integriert | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang |
| Onboarding, das Dokumentation aufbaut | Integriert | Integriert | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Nicht im Umfang | Integriert | Nicht im Umfang | Integriert | Optional oder über Erweiterung |
| Lebende Spezifikationen für bestehende Systeme | Nicht im Umfang | Optional oder über Erweiterung | Integriert | Integriert | Optional oder über Erweiterung | Nicht im Umfang | Optional oder über Erweiterung | Optional oder über Erweiterung | Optional oder über Erweiterung | Nicht im Umfang |
| Persistentes Agentengedächtnis über Projekte hinweg | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Integriert | Nicht im Umfang | Optional oder über Erweiterung |
| Eigenständige, spezialisierte Agentenrollen | Optional oder über Erweiterung | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Integriert | Nicht im Umfang | Nicht im Umfang | Optional oder über Erweiterung | Nicht im Umfang | Nicht im Umfang |
| Ist selbst eine IDE oder ein Editor | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Integriert | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Nicht im Umfang | Optional oder über Erweiterung |

## Was Deep Work Plan mitbringt

- **Werkzeug-agnostisch und repository-nativ.** Das Harness und der Plan sind Dateien in Ihrem Repository, lesbar für jeden Agenten, der den AGENTS.md- und Agent-Skills-Standards folgt. Ein Agentenwechsel verliert den Plan nicht.
- **Validierung, ausgewählt aus dem, was jede Aufgabe berührt hat.** Jede Aufgabe deklariert ihre berührte Oberfläche und führt die Tests des geänderten Verhaltens und seiner Konsumenten aus, ausgeweitet auf die gesamte Suite, wenn die Wirkung sich nicht abgrenzen lässt. Null ausgewählte Tests sind niemals ein Bestehen.
- **Ein Final Review mit Sicherheitstest.** Ein Plan schließt mit einer Sicherheitsprüfung der kumulierten Änderungsmenge — einschließlich eines erforderlichen lokalen Reviews des Diffs — und einer Validierung des Endzustands. Kritische Befunde blockieren den Abschluss.
- **Zustand, der Sitzungen und Agenten übersteht.** README-Checkboxen, Aufgabenprotokolle, ein begrenzter Arbeitsindex und eine maschinenlesbare Zustandsdatei werden an jeder Grenze geschrieben, sodass eine andere Sitzung oder ein anderer Agent von der Festplatte aus weitermacht. Selbst eine unterbrochene Planerstellung ist wiederherstellbar.
- **Ein Konformitätsprüfer für das Repository selbst.** Ein nur lesendes Skript verifiziert das Harness und jeden Plan gegen die Spezifikation, versteht beide Plan-Lebenszyklen und beendet sich mit einem CI-freundlichen Code.
- **Instruktionslast gemessen und veröffentlicht.** Ein committetes Skript misst, wie viele Bytes jeder Flow lädt; die Ergebnisse, Zunahmen eingeschlossen, werden als Bytes veröffentlicht, niemals als Token- oder Kostenprozente.

## Ehrliche Grenzen

Deep Work Plan hat keinen Mechanismus für lebende oder Delta-Spezifikationen; OpenSpec und ähnliche Werkzeuge sind dort stärker. Ein unabhängiger Benchmark der Methodik existiert noch nicht; eine vorregistrierte öffentliche Evaluation ist geplant. Das Instruktionslast-Ledger misst geladene Bytes, nicht Token, Kosten oder Ergebnisse. DWP ist bewusst auf das Repository begrenzt: Es ist kein projektübergreifendes Gedächtnissystem, kein rollenbasiertes Agenten-Framework und keine IDE, und tritt auf diesen Achsen daher auch nicht an – kombinieren Sie es bei Bedarf mit einem Werkzeug, das genau das abdeckt.

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
- GSD Core — https://github.com/open-gsd/gsd-core#readme
- Gentle-AI — https://github.com/Gentleman-Programming/gentle-ai#readme
- Claudes AI-native SDLC — https://claude.com/blog/the-ai-native-sdlc-playbook
- Hersteller-native Plan-Modi — https://agentskills.io
