---
title: agent-create
description: "Utwórz nowego agenta w bieżącym repozytorium — wyspecjalizowanego wykonawcę z własnym poziomem modelu i narzędziami — przez sub-skill author, utrzymując spójny katalog."
kind: command
lang: pl
order: 8
usage: /agent-create
---

# agent-create

Utwórz nowego agenta w bieżącym repozytorium. Cienki delegator do sub-skilla **author** w Deep Work Plan.

## Co robi

`agent-create` kieruje do procesu tworzenia agenta w sub-skillu author. Agent to definicja wyspecjalizowanego wykonawcy (rola, poziom modelu, narzędzia, prompt systemowy) wysyłanego do obsługi określonej klasy zadań. Koduje „kto wykonuje X" i znajduje się w `.agents/agents/<name>.md`.

## Użycie

```
/agent-create
```

## Zachowanie

1. Wykrycie układu `.agents/` w repozytorium oraz lokalnych konwencji.
2. Potwierdzenie powracającej roli o odrębnych wymaganiach co do modelu/narzędzi; nazwa w formacie kebab-case.
3. Utworzenie szkieletu i uzupełnienie agenta (Rola, Wejścia, Proces, Wyjście, eskalacja).
4. Wybór uzasadnionego poziomu modelu — lekki, standardowy lub ciężki — bez wpisywania na sztywno identyfikatorów modeli dostawcy.
5. Aktualizacja katalogu `.agents/docs/`, aby był spójny.

## Uwagi

Do procedur używaj `/skill-create`. Utrzymuj poziomy modeli abstrakcyjne i mapuj je w konfiguracji repozytorium.
