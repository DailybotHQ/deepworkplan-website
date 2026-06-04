---
title: skill-create
description: "Utwórz nowy skill wielokrotnego użytku w bieżącym repozytorium — sparametryzowaną procedurę działającą w sesji — przez sub-skill author, utrzymując spójny katalog."
kind: command
lang: pl
order: 7
usage: /skill-create
---

# skill-create

Utwórz nowy skill w bieżącym repozytorium. Cienki delegator do sub-skilla **author** w Deep Work Plan.

## Co robi

`skill-create` kieruje do procesu tworzenia skilla w sub-skillu author. Skill to procedura wielokrotnego użytku, sparametryzowana i uruchamiana w sesji (na przykład `/fix-lint`). Koduje „jak wykonać X" i znajduje się w `.agents/skills/<name>/SKILL.md`.

## Użycie

```
/skill-create
```

## Zachowanie

1. Wykrycie układu `.agents/` w repozytorium oraz lokalnych konwencji.
2. Potwierdzenie, że istnieje rzeczywisty, powtarzalny przepływ pracy; nazwa w formacie kebab-case.
3. Utworzenie szkieletu i uzupełnienie `SKILL.md` (Cel, Kiedy używać, Kroki, Walidacja).
4. Dodanie cienkiego delegatora komendy, jeśli jest potrzebny.
5. Aktualizacja katalogu `.agents/docs/`, aby był spójny.

## Uwagi

Do agentów używaj `/agent-create`. Logika znajduje się w skillu; komenda pozostaje cienka.
