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
7. Die Opt-in-Addons anbieten, dann eine Selbstprüfung durchführen.

## Hinweise

Ein Repository ist mit null Addons vollständig konform. Die erkannte Realität gewinnt stets über Preset-Annahmen.
