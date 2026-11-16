---
title: deepworkplan-onboard
description: "Ein Repository AI-first machen, indem über seinen Stack und Archetyp geschlussfolgert und dann eine angepasste AGENTS.md, docs/, .agents/ und ein."
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
7. Die erforderliche lokale Überprüfung des AI Diff Reviewer installieren; jedes Addon erkennen, die vom Repository genutzten aktualisieren und die passenden anbieten (nie eines, nur um die Sammlung zu vervollständigen); dann eine Selbstprüfung durchführen.

## Hinweise

Ein Repository ist mit null optionalen Addons vollständig konform; die lokale Überprüfung des AI Diff Reviewer ist seit Standard 2.3.0 Teil der Baseline. Die erkannte Realität gewinnt stets über Preset-Annahmen.

## Schema references

Der maschinenlesbare Schemakatalog für v8-Pläne ist unter den folgenden stabilen URLs veröffentlicht. v8 verwendet `plan-manifest/v7` mit `plan-contract/v8`, `journal-event/v8` und `plan-snapshot/v8`; v7-Manifest- und Journal-Event-Schemas bleiben für bestehende Pläne unterstützt.

- **Planmanifest:** https://deepworkplan.com/schema/plan-manifest/v7.json
- **Planvertrag:** https://deepworkplan.com/schema/plan-contract/v7.json (der v6-Vertrag plus eine optionale Task-Markierung `parallel_safe`)
- **Journal-Ereignis:** https://deepworkplan.com/schema/journal-event/v7.json (ergänzt das Ereignis `delegation`)
- **v8-Vertrag:** https://deepworkplan.com/schema/plan-contract/v8.json
- **v8-Journal-Ereignis:** https://deepworkplan.com/schema/journal-event/v8.json
- **v8-Plan-Snapshot:** https://deepworkplan.com/schema/plan-snapshot/v8.json
- **Plan-Snapshot (Live-Projektion, mit v6 geteilt):** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Kontextmanifest (mit v6 geteilt):** https://deepworkplan.com/schema/context-manifest/v6.json
- **Repository-Konfiguration:** https://deepworkplan.com/schema/dwp-config/v1.json
- **Addon-Deskriptor:** https://deepworkplan.com/schema/addon-descriptor/v1.json
- **Swarm-Handoff-Paket:** https://deepworkplan.com/schema/dwp-handoff/v1.json
- **Benchmark-Datensatz:** https://deepworkplan.com/schema/benchmark-record/v1.json
- **Erkenntnis-Datensatz:** https://deepworkplan.com/schema/learnings-record/v1.json

v6-Pläne behalten ihre v6-Schemas ([Manifest](https://deepworkplan.com/schema/plan-manifest/v6.json), [Vertrag](https://deepworkplan.com/schema/plan-contract/v6.json), [Journal-Ereignis](https://deepworkplan.com/schema/journal-event/v6.json)); bestehende v5-Pläne verwenden weiterhin das v5-State-Schema, und ältere Pläne werden nie stillschweigend umgeschrieben.

Das aktuelle 8.x-Paket erstellt neue Pläne standardmäßig mit v8. Bestehende Pläne behalten ihre aufgezeichnete Generation; eine Migration erfordert einen ausdrücklichen Auftrag. Neue Pläne erhalten monoton steigende numerische IDs mit mindestens drei Stellen (zum Beispiel `PLAN_001_add_payment_webhooks/`). Da die eingefrorenen v5-Schemas die numerische ID als Wort zählen, bestehen v5-Slugs aus 2–4 Wörtern; v7-Slugs aus 2–5. Bestehende unnummerierte Ordner `PLAN_<slug>/` bleiben lesbar und werden niemals umbenannt. Wenn nummerierte Pläne vorhanden sind, löst `latest` zum Plan mit der höchsten numerischen ID auf.
