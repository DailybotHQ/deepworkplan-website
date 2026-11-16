---
title: "Die Deep Work Plan Methodik"
description: "Acht Kapitel vom Manifest bis zum Loop engineering: Prinzipien, Kernschleife, Vorlagen, Skills, Archetypen, viele Agenten, Schwärme und der Loop von DWP."
lastUpdated: 2026-11-16
---

## Die Deep Work Plan Methodik

Das v8-Paket erstellt neue Pläne standardmäßig mit `plan-contract/v8`. Bestehende Pläne behalten ihre aufgezeichnete Generation; eine Migration erfordert ein ausdrückliches `refine migrate`.
Deep Work Plan (DWP) ist eine offene, framework-agnostische Methodik, um strukturierte, autonome Engineering-Arbeit mit KI-Coding-Agenten auszuführen. Sie verwandelt ein vages Ziel in einen prüfbaren Plan, den ein Agent ausführen, pausieren, wiederaufnehmen und über den er berichten kann — ohne den Kontext zu verlieren.

DWP ruht auf vier Pfeilern — Spec-first, das Repository ist das Harness, Loop engineering und gemessene Effizienz. In einem Satz: *Spec-first, mit geschlossenem Loop: Das Repository ist das Harness, und der Plan läuft von selbst bis zum Ende.*

**Spec-first.** Statt einen Chat-Verlauf als Quelle der Wahrheit zu behandeln, schreiben Sie zuerst auf, *was* wahr sein soll — Ziel, Umfang, Akzeptanzkriterien und die Prüfungen, die belegen, dass es erledigt ist —, und der Agent führt gegen diese Spezifikation aus. Bei DWP *ist* der Plan die Spezifikation: Plan → atomare Aufgaben → Validierungs-Gates → Completion. Die Spezifikation zuerst zu schreiben reduziert das Abdriften (der Agent wird an festgelegten Kriterien gemessen), macht die Arbeit überprüfbar (jedes Gate besteht oder fällt durch) und macht sie wiederaufnehmbar (die Spezifikation überdauert jede Sitzung oder jeden Agenten). Werkzeugunabhängig und repo-nativ, unterscheidet es sich von werkzeuggebundenen spec-driven Systemen wie GitHub Spec Kit, Amazon Kiro und Tessl.

**Das Repository ist das Harness.** Ein Sprachmodell allein ist nur ein Textvorhersager; was es zu einem verlässlichen Ingenieur macht, ist das *Harness* um es herum — Kontext, Werkzeuge, eine Steuerschleife, Leitplanken und ein dauerhafter Zustand. Harness Engineering heißt, dieses Gerüst bewusst zu entwerfen. Die Position von DWP ist, dass es im Repository leben sollte, nicht in einem Werkzeug: Kontext als `AGENTS.md` + `docs/`, Werkzeuge als das `.agents/`-Kit, die Steuerschleife als der Plan, Leitplanken als die Validierungs-Gates und Zustand als das per gitignore ausgeschlossene `.dwp/`. Weil jeder Teil eine Datei im Repository ist, ist das Harness portabel — sodass jeder Agent jedes Repository steuern kann.

**Loop engineering.** Eine Spezifikation und ein Harness machen die Arbeit korrekt und portabel; Loop engineering bringt sie zum Abschluss. Mit dem optionalen Herdr-Addon registriert ein Plan seinen Lead und, wenn er sie benennt, Nachfolger; ein Daemon, den nur ein Mensch startet, stößt einen untätigen Lead zum Weitermachen an, bittet den ersten erreichbaren Nachfolger, einen verschwundenen Lead abzulösen, und meldet, wenn ein Plan stockt, blockiert oder abgeschlossen ist. Ein Anstoß fügt keine Befugnis hinzu — die Gates und Eskalationen des Plans gelten wie zuvor. Die Methodik funktioniert ohne den Loop; der Loop verstärkt sie nur.

**Gemessene Effizienz.** Kontext ist die knappste Ressource eines Coding-Agenten, und eine Methodik, die ihn verschwendet, scheitert genau dann, wenn die Arbeit lang wird. DWP lädt Anweisungen schrittweise nach — jeder Leitfaden lädt, wenn sein Auslöser feuert —, wählt die Validierung aus dem, was jede Aufgabe tatsächlich berührt, und entscheidet Skills aufgaben-lokal. Die Anweisungsbytes, die jeder Ablauf benötigt, werden gemessen und veröffentlicht; keine erfundenen Token-Prozentsätze.

Die Methodik wird in acht Kapiteln erklärt:

1. **Manifest** — was ein Deep Work Plan ist und warum strukturierte Ausführung zählt.
2. **Kernschleife** — der Plan-Ausführen-Verifizieren-Zyklus, der jede Aufgabe antreibt.
3. **Vorlagen** — die Plan- und Aufgabenstrukturen, die Agenten und Menschen teilen.
4. **Skills & Agenten** — wie Befehle und Agentenrollen zusammenpassen, das lebendige Kit (wie ein Repository über die author-Sub-Skill eigene Skills aufbaut) und Opt-in-Add-ons wie dependency-upgrade und dem design-system-Add-on für jede nutzerseitige Interface-Oberfläche (visuelle UI, CLI-Ausgabe oder konversational).
5. **Archetypen** — die Methodik an Einzel-Repositorys und Orchestrator-Hubs anpassen.
6. **Viele Agenten betreiben** — ein Lead und seine Lanes über Panes, Container, Rechner und Konten hinweg, mit einem Branch und einem Release pro Repository.
7. **Schwarmautonomie** — Kapazitätsprüfungen an Aufgabengrenzen, Übergabepakete, Lead-Nachfolge mit Epochen und Eskalation nur bei Kritischem, damit ein Schwarm das Limit eines Kontos oder den Verlust eines Agenten überdauert.
8. **Loop engineering** — Plan-Registrierung, der vom Menschen gestartete Daemon, Anstöße ohne zusätzliche Befugnis, Failover auf Nachfolger, Plan-Ereignisse, die Plan-Warteschlange und die Flottenkarte.

- [Methodik lesen](/methodology)
- [Spezifikation lesen](/spec)
- [Das Kit durchstöbern](/kit)
