---
title: Standard dokumentacji
description: "Normatywny standard sposobu dokumentowania struktury, zadań i postępu Deep Work Planów: reguły README, znaczniki statusu, dziesięciosekcyjna anatomia zadania oraz Final Review."
order: 1
lang: pl
section: Standard
---

# Standard dokumentacji

**Wersja 1.1.** Ten standard definiuje sposób, w jaki Deep Work Plany dokumentują swoją strukturę, zadania i postęp. Dotyczy każdego planu utworzonego w ramach metodyki DWP. Słowa kluczowe MUSI, POWINNO i MOŻE są używane zgodnie z definicją w RFC 2119.

## README planu

Każdy plan MUSI mieć plik `README.md` zawierający:

- **Tytuł** — `# Deep Work Plan: <name>`.
- **Cel** — opisowe sformułowanie celu planu.
- **Materiały źródłowe** — linki lub ścieżki do kanonicznych danych wejściowych (opcjonalne).
- **Zadania** — tabelę markdown z numerem zadania, nazwą i polem wyboru statusu.
- **Status** — wiersz w postaci `<n>/<total> tasks complete`.

## Pliki zadań

Każdy plik zadania MUSI być nazwany `<n>.task_<slug>.md` i zawierać dziesięciosekcyjną anatomię — dziewięć klasycznych sekcji plus **Powierzchnię dotkniętą**: kontrakt między tym, co zadanie zmienia, i tym, co musi zostać zwalidowane (powierzchnia planowana vs. rzeczywista, dotknięci konsumenci, klasa ryzyka *izolowana*, *szew*, *współdzielone/rdzeń* lub *nieznana*, użyte mapowanie testów oraz wybrana bramka z uzasadnieniem).

## PROGRESS.md

`PROGRESS.md` to dziennik wykonania tylko do dopisywania. Każdy wpis MUSI odnotowywać:

- Znacznik czasu w formacie ISO 8601.
- Numer i nazwę zadania.
- Co zostało zrobione.
- Wszelkie odstępstwa lub powody pominięcia.

## Znaczniki statusu

- `[ ]` — nierozpoczęte.
- `[~]` — w toku.
- `[x]` — ukończone.
- `[!]` — zablokowane.

## Nagłówki

Wszystkie nagłówki MUSZĄ używać zapisu zdaniowego (sentence case). Dokumenty POWINNY unikać języka marketingowego i wykrzykników.

## Final Review, lokalne decyzje dotyczące skilli i opcjonalny raport

Każdy plan utworzony pod tę wersję MUSI kończyć się dokładnie jednym obowiązkowym zadaniem: **Final Review** — przeglądem bezpieczeństwa pełnego zestawu zmian planu, walidacją stanu końcowego na ostatnim istotnym stanie i uzgodnieniem decyzji dotyczących skilli. Krytyczne znalezisko bezpieczeństwa blokuje ukończenie.

- **Lokalne decyzje dotyczące skilli.** Sekcja Ukończenie i dziennik każdego zadania niesie **rozstrzygnięcie dotyczące skilli** — `none`, aktualizację istniejącego skilla lub agenta, nazwane utworzenie albo odroczenie z powodem i właścicielem. Uzasadnione tworzenie odbywa się w zadaniu będącym właścicielem, przed jego bramką walidacyjną, po sprawdzeniu duplikatów w katalogu `.agents/`; uzasadnione wpisy są rejestrowane jako stabilni kandydaci (`T{task}-{seq}`) w rejestrze kandydatów na skille planu.
- **Raport wykonawczy jest opcjonalny, na życzenie.** Oferowany raz przy ukończeniu; generowany wyłącznie na wyraźną prośbę z trwałych dowodów. Brak odpowiedzi lub nieobsługiwany przebieg pozostawia plan ukończonym bez raportu.
- **Starsze plany.** Plany utworzone pod wcześniejsze wersje kończą się trzema obowiązkowymi zadaniami końcowymi i pozostają zgodne — sprawdzający zgodność MUSI zaakceptować ten kształt.
