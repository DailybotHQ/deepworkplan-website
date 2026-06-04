---
title: agent-create
description: "Einen neuen Agenten im aktuellen Repository erstellen — einen spezialisierten Arbeiter mit eigener Modellstufe und eigenen Werkzeugen — über die author-Sub-Skill, mit synchronem Katalog."
kind: command
lang: de
order: 8
usage: /agent-create
---

# agent-create

Einen neuen Agenten im aktuellen Repository erstellen. Ein schlanker Delegator an die Deep Work Plan **author**-Sub-Skill.

## Was es tut

`agent-create` leitet an den Agenten-Erstellungsablauf der author-Sub-Skill weiter. Ein Agent ist eine spezialisierte Arbeiterdefinition (Rolle, Modellstufe, Werkzeuge, System-Prompt), die für eine Klasse von Aufgaben eingesetzt wird. Er kodiert „wer X tut“ und liegt unter `.agents/agents/<name>.md`.

## Verwendung

```
/agent-create
```

## Verhalten

1. Die `.agents/`-Struktur und die lokalen Konventionen des Repositorys erkennen.
2. Eine wiederkehrende Rolle mit eigenen Modell-/Werkzeuganforderungen bestätigen; sie in kebab-case benennen.
3. Den Agenten anlegen und ausfüllen (Role, Inputs, Process, Output, Eskalation).
4. Eine begründete Modellstufe wählen — light, standard oder heavy — ohne Anbieter-Modell-IDs fest zu verdrahten.
5. Den `.agents/docs/`-Katalog entsprechend aktualisieren.

## Hinweise

Für Prozeduren `/skill-create` verwenden. Halten Sie Modellstufen abstrakt und bilden Sie sie in der Repository-Konfiguration ab.
