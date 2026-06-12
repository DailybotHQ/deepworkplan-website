---
title: "Deep Work Plan Spezifikation"
description: "Die lesbare Spezifikation der Deep Work Plan Methodik: das DWP-Format, das Agentenprotokoll, Archetypen, der Dokumentationsstandard und der Add-on-Mechanismus."
lastUpdated: 2026-05-30
---

## Deep Work Plan Spezifikation

Die Spezifikation ist die präzise, lesbare Definition der Methodik — die Strukturen und Protokolle, die Menschen und Agenten teilen. Sie legt in normativen RFC-2119-Begriffen fest, wie ein spec-driven Plan strukturiert ist und wie ein Agent gegen ihn ausführen muss: Der Plan ist die Quelle der Wahrheit, Validierungs-Gates sind binär, und das Repository selbst trägt das Harness, das ein Agent braucht. Sie ist in geordnete Dokumente gegliedert:

- **Dokumentationsstandard** — die AI-first Repository-Struktur.
- **DWP-Spezifikation** (v1.2) — Planstruktur, Aufgaben-Anatomie, die Ausführungsschleife, der Delta-Abschnitt für Brownfield-Änderungen, das DWP-Wiederaufnahme-Protokoll, proportionale Rigor-Stufen (micro/standard/deep) und die maschinenlesbare Plan-Zustandsschicht.
- **Agentenprotokoll** (v1.2) — erforderliches agentenübergreifendes Verhalten, Befehlszuordnung, unterstützte Agenten (einschließlich OpenClaw und Hermes) sowie Ausführungsprofile (interaktiv vs. unbeaufsichtigt) mit Stopbedingungen und geplanter Fortsetzung.
- **Archetypen** (v1.1) — Einzel-Repositorys, Orchestrator-Hubs und der Agenten-Arbeitsbereich (das langlebige Zuhause eines autonomen Agenten: OpenClaw-Arbeitsbereich, Hermes-Service-Verzeichnis, Cloud-Agenten-Volume); die Klassifizierungsheuristik und wie sich das Onboarding unterscheidet.
- **Add-ons** — der Opt-in-Mechanismus zum Hinzufügen optionaler Fähigkeiten, inklusive der author-Sub-Skill (sodass ein Repository sein eigenes Kit aufbaut), Wartungs-Add-ons wie dependency-upgrade und dem design-system-Add-on (eine `docs/DESIGN.md`, abgeleitet aus der echten Designquelle des Repos, mit Profilen für visuelle UI, CLI-Ausgabe und konversationale Oberflächen).
- **Konformität** — die normative Definition eines AI-first Repositorys: die Artefakte, die ein Repository haben MUSS und SOLLTE, was einen Plan wohlgeformt macht und wie man es mit `/dwp-verify` objektiv verifiziert.
- **Plan-Zustand** — die maschinenlesbare Zustandsschicht: `manifest.json` und `state.json`, Gate-Einträge, Ergebnis-Einträge als episodisches Gedächtnis, Abgleich (Markdown gewinnt) und wann die Schicht erforderlich ist.

- [Spezifikation lesen](/spec)
- [Methodik lesen](/methodology)
