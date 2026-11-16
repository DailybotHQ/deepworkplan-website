---
title: "Deep Work Plan Spezifikation"
description: "Die lesbare Spezifikation der Deep Work Plan Methodik: das DWP-Format, das Agentenprotokoll, Archetypen, der Dokumentationsstandard und der Add-on-Mechanismus."
lastUpdated: 2026-09-28
---

## Deep Work Plan Spezifikation

**Aktueller Standard: DWP 8.0.0 (Release `v8.0.0`).** Die erhaltene Basis umfasst die v6-Aufzeichnungsschicht und die v7-Erweiterungen; neue Pläne verwenden standardmäßig `plan-contract/v8`. Bestehende v5-, v6- und v7-Pläne behalten ihre aufgezeichnete Generation und werden nur durch ein ausdrückliches `refine migrate` migriert. v8 behält `plan-manifest/v7` bei und ergänzt `plan-contract/v8`, `journal-event/v8` und `plan-snapshot/v8`; v7-Manifest- und Journal-Event-Schemas bleiben für bestehende Pläne unterstützt. [Manifest v7](https://deepworkplan.com/schema/plan-manifest/v7.json), [Vertrag v8](https://deepworkplan.com/schema/plan-contract/v8.json), [Journal-Ereignis v8](https://deepworkplan.com/schema/journal-event/v8.json) und [Snapshot v8](https://deepworkplan.com/schema/plan-snapshot/v8.json).

Die Spezifikation ist die präzise, lesbare Definition der Methodik — die Strukturen und Protokolle, die Menschen und Agenten teilen. Sie legt in normativen RFC-2119-Begriffen fest, wie ein spec-driven Plan strukturiert ist und wie ein Agent gegen ihn ausführen muss: Der Plan ist die Quelle der Wahrheit, Validierungs-Gates sind binär, und das Repository selbst trägt das Harness, das ein Agent braucht. Sie ist in geordnete Dokumente gegliedert:

- **Aufzeichnungsschicht** — die evidenzbasierte Aufzeichnungsschicht: Vertrag, Journal, Evidenzklassen (behauptet vs. beobachtet), Freigaben, Änderungen und Belege.
- **Ressourcen und Fähigkeiten** — begrenzte Ausführung: Kontextmanifest, Ressourcengrenzen, Host-Fähigkeiten, Addon-Registry und Fähigkeiten.
- **Delegation** — Multi-Agenten- und Schwarmausführung: parallele Worktrees, Delegationsereignisse, Transporte und Epochenstafette.
- **Plan-Status** — maschinenlesbare Statusschicht: abgeleiteter Journal-Snapshot in v6/v7 (`ledger.py project`), historische v5-Statusschicht (`manifest.json`/`state.json`) und Abgleich.
- **DWP-Spezifikation** — Planstruktur, Aufgaben-Anatomie, die Ausführungsschleife, der Delta-Abschnitt für Brownfield-Änderungen, das DWP-Wiederaufnahme-Protokoll, proportionale Rigor-Stufen (micro/standard/deep) und die maschinenlesbare Plan-Zustandsschicht.
- **Agentenprotokoll** — erforderliches agentenübergreifendes Verhalten, Befehlszuordnung, unterstützte Agenten (einschließlich OpenClaw und Hermes) sowie Ausführungsprofile (interaktiv vs. unbeaufsichtigt) mit Stopbedingungen und geplanter Fortsetzung.
- **Archetypen** — Einzel-Repositorys, Orchestrator-Hubs und der Agenten-Arbeitsbereich (das langlebige Zuhause eines autonomen Agenten: OpenClaw-Arbeitsbereich, Hermes-Service-Verzeichnis, Cloud-Agenten-Volume); die Klassifizierungsheuristik und wie sich das Onboarding unterscheidet.
- **Add-ons** — der Opt-in-Mechanismus zum Hinzufügen optionaler Fähigkeiten, inklusive der author-Sub-Skill (sodass ein Repository sein eigenes Kit aufbaut), Wartungs-Add-ons wie dependency-upgrade und dem design-system-Add-on (eine `docs/DESIGN.md`, abgeleitet aus der echten Designquelle des Repos, mit Profilen für visuelle UI, CLI-Ausgabe und konversationale Oberflächen).
- **Konformität** — die normative Definition eines AI-first Repositorys: die Artefakte, die ein Repository haben MUSS und SOLLTE, was einen Plan wohlgeformt macht und wie man es mit `/dwp-verify` objektiv verifiziert.
- **Plan-Zustand** — die maschinenlesbare Zustandsschicht: `manifest.json` und `state.json`, Gate-Einträge, Ergebnis-Einträge als episodisches Gedächtnis, Abgleich (Markdown gewinnt) und wann die Schicht erforderlich ist.

- [Spezifikation lesen](/spec)
- [Methodik lesen](/methodology)
