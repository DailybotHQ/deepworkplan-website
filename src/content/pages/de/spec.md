---
title: "Deep Work Plan Spezifikation"
description: "Die lesbare Spezifikation der Deep Work Plan Methodik: das DWP-Format, das Agentenprotokoll, Archetypen, der Dokumentationsstandard und der Add-on-Mechanismus."
lastUpdated: 2026-05-30
---

## Deep Work Plan Spezifikation

Die Spezifikation ist die präzise, lesbare Definition der Methodik — die Strukturen und Protokolle, die Menschen und Agenten teilen. Sie legt in normativen RFC-2119-Begriffen fest, wie ein spec-driven Plan strukturiert ist und wie ein Agent gegen ihn ausführen muss: Der Plan ist die Quelle der Wahrheit, Validierungs-Gates sind binär, und das Repository selbst trägt das Harness, das ein Agent braucht. Sie ist in geordnete Dokumente gegliedert:

- **Dokumentationsstandard** — die AI-first Repository-Struktur.
- **DWP-Spezifikation** — Planstruktur, Aufgaben-Anatomie und die Ausführungsschleife.
- **Agentenprotokoll** — erforderliches agentenübergreifendes Verhalten und Befehlszuordnung.
- **Archetypen** — Einzel-Repositorys versus Orchestrator-Hubs.
- **Add-ons** — der Opt-in-Mechanismus zum Hinzufügen optionaler Fähigkeiten, inklusive der author-Sub-Skill (sodass ein Repository sein eigenes Kit aufbaut), Wartungs-Add-ons wie dependency-upgrade und dem frontend-bezogenen design-system-Add-on (eine `docs/DESIGN.md`, abgeleitet aus den echten Design-Tokens des Repos).
- **Konformität** — die normative Definition eines AI-first Repositorys: die Artefakte, die ein Repository haben MUSS und SOLLTE, was einen Plan wohlgeformt macht und wie man es mit `/dwp-verify` objektiv verifiziert.

- [Spezifikation lesen](/spec)
- [Methodik lesen](/methodology)
