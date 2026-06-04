---
title: "Über die Methodik"
description: "Deep Work Plan ist eine offene, framework-agnostische Methodik für ernsthafte Engineering-Arbeit mit KI-Coding-Agenten. Woher sie kommt und wer sie pflegt."
lastUpdated: 2026-05-30
---

## Was es ist

Deep Work Plan (DWP) ist eine Methodik, kein Produkt. Sie legt fest, wie man ein Ziel in einen vereinbarten Plan überführt, diesen Plan in atomare und unabhängig überprüfbare Aufgaben zerlegt und jede Aufgabe in einer fokussierten Schleife ausführt, die mit einer Prüfung endet.

Sie ist eine spec-driven Methodik: Der Plan ist die dauerhafte Quelle der Wahrheit, und Agenten führen gegen explizite Akzeptanzkriterien und Validierungs-Gates aus. Anders als werkzeuggebundene spec-driven Systeme wie GitHub Spec Kit, Amazon Kiro oder Tessl ist DWP werkzeugunabhängig und repo-nativ. Sie ist zugleich Harness Engineering, portabel gemacht — der Kontext, die Leitplanken und der wiederaufnehmbare Zustand, die einen Agenten verlässlich machen, werden in das Repository selbst installiert (AGENTS.md, docs, das .agents/ Skill-Verzeichnis, die DWP-Skill), sodass jeder Agent jedes Repository steuern kann.

Sie ist bewusst agnostisch gegenüber dem verwendeten KI-Agenten oder Stack — Adapter übertragen dieselbe Kernschleife auf Claude, Cursor, Copilot, Codex, Gemini und mehr. Der Plan, die Aufgaben und das laufende Protokoll sind allesamt reines Markdown, sodass die Arbeit lesbar, prüfbar und versioniert bleibt.

---

## Kernprinzipien

- **Planen vor dem Ausführen** — Es wird kein Code geschrieben, bevor der Plan vereinbart ist. Der Plan ist ein Vertrag zwischen Ihnen und dem Agenten. [Methodik lesen](/methodology)
- **Aufgaben sind atomar** — Jede Aufgabe ist so zugeschnitten, dass sie eigenständig ausgeführt und verifiziert und anschließend atomar committet werden kann. [Spezifikation ansehen](/spec)
- **Alles verifizieren** — Jede Aufgabe endet mit einer expliziten Prüfung, bevor die nächste beginnt, wobei der Fortschritt in git festgehalten wird. [Das Kit erkunden](/kit)

---

## Auf einen Blick

- Offene Methodik, MIT-lizenziert
- Framework- und agenten-agnostisch
- Gepflegt von Dailybot und der Community
- Enthält eine Spezifikation, Befehle, Adapter, Presets und Beispiele
- Nur Markdown — keine Laufzeitumgebung, kein Lock-in
- Macht jedes Repository zu einer AI-first, agenten-steuerbaren Codebasis

---

## Wer es pflegt

Deep Work Plan ist aus realer Engineering-Arbeit bei [Dailybot](https://www.dailybot.com) entstanden und wird heute von Dailybot gemeinsam mit der Open-Source-Community gepflegt. Die Methodik, die Spezifikation und das Kit stehen unter der MIT-Lizenz — frei nutzbar, anpassbar und erweiterbar.

- [Methodik lesen](/methodology)
- [Schnellstart](/quickstart)
- [GitHub-Repository](https://github.com/DailybotHQ/deepworkplan-website)
