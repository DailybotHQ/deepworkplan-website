---
title: "Die Deep Work Plan Methodik"
description: "Fünf Kapitel vom Manifest bis zu den Archetypen: die Prinzipien, die Kernschleife, Vorlagen, Skills und die Anpassungen hinter der Deep Work Plan Methodik."
lastUpdated: 2026-05-30
---

## Die Deep Work Plan Methodik

Deep Work Plan (DWP) ist eine offene, framework-agnostische Methodik, um strukturierte, autonome Engineering-Arbeit mit KI-Coding-Agenten auszuführen. Sie verwandelt ein vages Ziel in einen prüfbaren Plan, den ein Agent ausführen, pausieren, wiederaufnehmen und über den er berichten kann — ohne den Kontext zu verlieren.

DWP ruht auf zwei Pfeilern.

**Spec-driven Development.** Statt einen Chat-Verlauf als Quelle der Wahrheit zu behandeln, schreiben Sie zuerst auf, *was* wahr sein soll — Ziel, Umfang, Akzeptanzkriterien und die Prüfungen, die belegen, dass es erledigt ist —, und der Agent führt gegen diese Spezifikation aus. Bei DWP *ist* der Plan die Spezifikation: Plan → atomare Aufgaben → Validierungs-Gates → Completion. Die Spezifikation zuerst zu schreiben reduziert das Abdriften (der Agent wird an festgelegten Kriterien gemessen), macht die Arbeit überprüfbar (jedes Gate besteht oder fällt durch) und macht sie wiederaufnehmbar (die Spezifikation überdauert jede Sitzung oder jeden Agenten). Werkzeugunabhängig und repo-nativ, unterscheidet es sich von werkzeuggebundenen spec-driven Systemen wie GitHub Spec Kit, Amazon Kiro und Tessl.

**Harness Engineering — das Repository wird zum Harness.** Ein Sprachmodell allein ist nur ein Textvorhersager; was es zu einem verlässlichen Ingenieur macht, ist das *Harness* um es herum — Kontext, Werkzeuge, eine Steuerschleife, Leitplanken und ein dauerhafter Zustand. Harness Engineering heißt, dieses Gerüst bewusst zu entwerfen. Die Position von DWP ist, dass es im Repository leben sollte, nicht in einem Werkzeug: Kontext als `AGENTS.md` + `docs/`, Werkzeuge als das `.agents/`-Kit, die Steuerschleife als der Plan, Leitplanken als die Validierungs-Gates und Zustand als das per gitignore ausgeschlossene `.dwp/`. Weil jeder Teil eine Datei im Repository ist, ist das Harness portabel — sodass jeder Agent jedes Repository steuern kann.

Die Methodik wird in fünf Kapiteln erklärt:

1. **Manifest** — was ein Deep Work Plan ist und warum strukturierte Ausführung zählt.
2. **Kernschleife** — der Plan-Ausführen-Verifizieren-Zyklus, der jede Aufgabe antreibt.
3. **Vorlagen** — die Plan- und Aufgabenstrukturen, die Agenten und Menschen teilen.
4. **Skills & Agenten** — wie Befehle und Agentenrollen zusammenpassen, das lebendige Kit (wie ein Repository über die author-Sub-Skill eigene Skills aufbaut) und Opt-in-Wartungs-Addons wie dependency-upgrade.
5. **Archetypen** — die Methodik an Einzel-Repositorys und Orchestrator-Hubs anpassen.

- [Methodik lesen](/methodology)
- [Spezifikation lesen](/spec)
- [Das Kit durchstöbern](/kit)
