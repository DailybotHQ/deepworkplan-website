---
title: deepworkplan-onboard
description: "Ein Repository AI-first machen, indem über seinen Stack und Archetyp geschlussfolgert und dann eine angepasste AGENTS.md, docs/, .agents/ und ein gitignore-ausgeschlossenes .dwp/ erzeugt wird."
kind: command
lang: de
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

Ein Repository in eine AI-first, spec-driven Codebasis verwandeln. Dies ist die onboard-Sub-Skill der Deep Work Plan Skill.

## Was es tut

`deepworkplan-onboard` untersucht das **echte** Repository — Sprachen, Frameworks, Paketmanager, Build-/Test-/Lint-Befehle, Module, Test-Konvention, Deployment-Form — und erzeugt daran angepasste Artefakte. Es schlussfolgert; es kopiert niemals eine Vorlage und lässt nie einen Platzhalter zurück.

## Verwendung

```
/deepworkplan-onboard
```

## Verhalten

1. Erkundung — den echten Stack und die Validierungsbefehle erkennen; das passendste Onboarding-Preset zuordnen.
2. Archetyp — als Einzel-Repository oder Orchestrator-Hub klassifizieren.
3. `AGENTS.md` + den `CLAUDE.md`-Symlink mit einem echten Quick-Commands-Block erzeugen.
4. `docs/` (Architektur, Standards, Testing, Sicherheit und mehr) und Dokumentation je Modul erzeugen.
5. `.agents/` (Agenten, schlanke `dwp-*`-Befehle, stack-passende Skills, Katalog) + `.claude → .agents` erzeugen.
6. Die Skill installieren und ein gitignore-ausgeschlossenes `.dwp/` (Pläne, Entwürfe) sowie einen `tmp/`-Scratch-Bereich anlegen.
7. Die erforderliche lokale Überprüfung des AI Diff Reviewer installieren, die optionalen Addons anbieten, dann eine Selbstprüfung durchführen.

## Hinweise

Ein Repository ist mit null optionalen Addons vollständig konform; die lokale Überprüfung des AI Diff Reviewer ist seit Standard 2.3.0 Teil der Baseline. Die erkannte Realität gewinnt stets über Preset-Annahmen.

## v6-Schema-Referenzen

Für v6-Pläne ist der maschinenlesbare Schemakatalog unter diesen stabilen URLs veröffentlicht. Die Live-Projektion von v6 ist ein Snapshot; `plan-state/v6.json` gibt es nicht. Bestehende v5-Pläne verwenden weiterhin das v5-State-Schema, und ältere Pläne werden nie stillschweigend umgeschrieben.

- **Plan manifest:** https://deepworkplan.com/schema/plan-manifest/v6.json
- **Plan snapshot (v6 live projection):** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Plan contract:** https://deepworkplan.com/schema/plan-contract/v6.json
- **Journal event:** https://deepworkplan.com/schema/journal-event/v6.json
- **Context manifest:** https://deepworkplan.com/schema/context-manifest/v6.json

Das aktuelle 7.x-Paket erstellt neue Pläne standardmäßig mit v7. Bestehende Pläne behalten ihre aufgezeichnete Generation; eine Migration erfordert einen ausdrücklichen Auftrag. Neue Pläne erhalten monoton steigende numerische IDs mit mindestens drei Stellen (zum Beispiel `PLAN_001_add_payment_webhooks/`). Da die eingefrorenen v5-Schemas die numerische ID als Wort zählen, bestehen v5-Slugs aus 2–4 Wörtern; v7-Slugs aus 2–5. Bestehende unnummerierte Ordner `PLAN_<slug>/` bleiben lesbar und werden niemals umbenannt. Wenn nummerierte Pläne vorhanden sind, löst `latest` zum Plan mit der höchsten numerischen ID auf.
