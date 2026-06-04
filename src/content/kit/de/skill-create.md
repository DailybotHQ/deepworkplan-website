---
title: skill-create
description: "Eine neue wiederverwendbare Skill im aktuellen Repository erstellen — eine parametrisierte, in-Sitzung ausgeführte Prozedur — über die author-Sub-Skill, mit synchronem Katalog."
kind: command
lang: de
order: 7
usage: /skill-create
---

# skill-create

Eine neue Skill im aktuellen Repository erstellen. Ein schlanker Delegator an die Deep Work Plan **author**-Sub-Skill.

## Was es tut

`skill-create` leitet an den Skill-Erstellungsablauf der author-Sub-Skill weiter. Eine Skill ist eine wiederverwendbare, parametrisierte Prozedur, die in-Sitzung ausgeführt wird (zum Beispiel `/fix-lint`). Sie kodiert „wie man X tut“ und liegt unter `.agents/skills/<name>/SKILL.md`.

## Verwendung

```
/skill-create
```

## Verhalten

1. Die `.agents/`-Struktur und die lokalen Konventionen des Repositorys erkennen.
2. Bestätigen, dass ein echter, wiederholbarer Workflow existiert; ihn in kebab-case benennen.
3. `SKILL.md` anlegen und ausfüllen (Goal, When-to-use, Steps, Validation).
4. Bei Bedarf einen schlanken Befehls-Delegator hinzufügen.
5. Den `.agents/docs/`-Katalog entsprechend aktualisieren.

## Hinweise

Für Agenten `/agent-create` verwenden. Die Logik liegt in der Skill; der Befehl bleibt schlank.
