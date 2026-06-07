---
title: "Deep Work Plan — strukturierte Ausführung für KI-Coding-Agenten"
description: "Kontext zählt mehr als Modelle. Deep Work Plan verwandelt jedes Repository in eine strukturierte Umgebung, in der jeder Coding-Agent langfristige Arbeit zu Ende bringt."
lastUpdated: 2026-06-03
---

## Modelle zählen. Kontext zählt mehr.

Deep Work Plan verwandelt jedes Repository in eine strukturierte Umgebung — Kontext, Leitplanken und einen dauerhaften Plan — in der jeder Coding-Agent präzise arbeitet und langfristige Aufgaben abschließt.

Deep Work Plan (DWP) ist eine offene, MIT-lizenzierte Methodik und ein Kit zum Planen und Ausführen komplexer Softwarearbeit mit KI-Agenten. Sie wählen keine Installationsmethode und kopieren keine Vorlage — Sie kopieren den init.md-Prompt und fügen ihn in Ihren Agenten ein:

> Kopieren Sie den init.md-Prompt und fügen Sie ihn in Ihren Coding-Agenten ein — Claude Code, Cursor, Codex oder einen anderen — um jedes Repository AI-first zu machen.

> Deep Work Plan ist spec-driven Development, bei der das Repository selbst zum Harness wird.

- [Den /init-Prompt öffnen](/init)
- [Methodik lesen](/methodology)

---

## Das Problem und die Antwort

KI-Coding-Agenten sind in kurzen Schüben bemerkenswert wirksam. Bei langfristiger Arbeit — einer Migration, einem neuen Subsystem, einem Refactoring über Dutzende Dateien hinweg — driften sie ab: Der Kontext füllt sich, Entscheidungen geraten in Vergessenheit, und mehrstündige Aufgaben werden auf halbem Weg abgebrochen.

Deep Work Plan antwortet mit **spec-driven Development**: Der Plan ist die dauerhafte Quelle der Wahrheit, und Agenten führen gegen explizite Akzeptanzkriterien und Validierungs-Gates aus. Das Abdriften nimmt ab, die Arbeit bleibt überprüfbar, und jeder Agent kann sie über Sitzungen hinweg wiederaufnehmen. Anders als an eine IDE oder einen Anbieter gebundene spec-driven Werkzeuge (GitHub Spec Kit, Amazon Kiro, Tessl) ist DWP werkzeugunabhängig und repo-nativ.

Es ist zugleich **Harness Engineering**, portabel gemacht. Ein Agenten-Harness ist das Gerüst um ein Modell herum — Kontext, Werkzeuge, Steuerschleife, Leitplanken, wiederaufnehmbarer Zustand —, das es verlässlich macht. Deep Work Plan installiert dieses Harness in das Repository selbst, sodass jeder Agent jedes Repository steuern kann.

---

## Was Sie erhalten

- AGENTS.md im Repository-Stammverzeichnis, durchdacht aus Ihrem echten Stack und Ihren Befehlen abgeleitet.
- Kategorisierte `docs/` und Dokumentation je Modul.
- Ein `.agents/`-Verzeichnis (Skills, Agenten, Befehle) mit dem `.claude`-zu-`.agents`-Symlink.
- Die Deep Work Plan Skill, einmal für jeden Agenten installiert — inklusive der author-Sub-Skill, sodass das Repository eigene Skills, Agenten und Befehle aufbauen kann, plus Opt-in-Add-ons wie dependency-upgrade und dem frontend-bezogenen design-system-Add-on.
- Langfristige, wiederaufnehmbare Pläne in einem per gitignore ausgeschlossenen `.dwp/`-Ordner.

---

## Was passiert, wenn Sie es ausführen

1. **Ihr Agent öffnet [/init.md](/init.md)** — er liest den Onboarding-Prompt sowie die verlinkte Methodik, Spezifikation und das Kit.
2. **Er installiert die Deep Work Plan Skill** — die Engine, in jedem Repository identisch: der Router plus seine Sub-Skills (create, execute, refine, resume, status, verify, onboard, author), für Claude Code, Cursor, Codex, Gemini und Copilot.
3. **Er passt Ihr Repository an** — indem er über Ihren echten Stack schlussfolgert (niemals kopiert), schreibt er AGENTS.md, `docs/`, READMEs je Modul, ein durchdachtes `.agents/`-Kit und ein per gitignore ausgeschlossenes `.dwp/`. Ihr Repository wird zum Harness.
4. **Sie planen und führen aus** — langfristige Deep Work Plans, Schritt für Schritt gegen explizite Akzeptanzkriterien und Validierungs-Gates ausgeführt, autonom über Stunden hinweg.

Die Skill ist die wiederverwendbare Engine, überall auf dieselbe Weise installiert; angepasst wird Ihr Repository. Die Installationsmechanik (Skills CLI, OpenClaw oder git clone) lebt im [/init.md](/init.md)-Prompt und auf dem [Schnellstart](/quickstart).

---

## Die Methodik, Spezifikation und das Kit

- [Methodik lesen](/methodology) — was DWP ist, die Prinzipien, der Workflow und wie man es übernimmt.
- [Spezifikation lesen](/spec) — Aufgaben-Anatomie, Validierungs-Gates, das Completion-Protokoll, Archetypen und Addons.
- [Das Kit erkunden](/kit) — Presets, Adapter und Befehle zum Installieren von DWP in einem Repository.
- [Beispiele ansehen](/examples) — Vorher-Nachher-Anleitungen realer Engineering-Arbeit.

---

## Wer es baut

Deep Work Plan ist aus realer Engineering-Arbeit bei [Dailybot](https://www.dailybot.com) entstanden und wird von Dailybot gemeinsam mit der Open-Source-Community gepflegt.

- [Über die Methodik](/about)
- [Community & Kontakt](/contact)
- [GitHub-Repository](https://github.com/DailybotHQ/deepworkplan-website)
