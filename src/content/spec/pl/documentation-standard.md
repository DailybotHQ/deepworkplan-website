---
title: Standard dokumentacji
description: "Normatywny standard sposobu dokumentowania struktury, zadań i postępu Deep Work Planów: reguły README, znaczniki statusu oraz trzy obowiązkowe zadania końcowe."
order: 1
lang: pl
section: Standard
---

# Standard dokumentacji

**Wersja 1.0.** Ten standard definiuje sposób, w jaki Deep Work Plany dokumentują swoją strukturę, zadania i postęp. Dotyczy każdego planu utworzonego w ramach metodyki DWP. Słowa kluczowe MUSI, POWINNO i MOŻE są używane zgodnie z definicją w RFC 2119.

## README planu

Każdy plan MUSI mieć plik `README.md` zawierający:

- **Tytuł** — `# Deep Work Plan: <name>`.
- **Cel** — opisowe sformułowanie celu planu.
- **Materiały źródłowe** — linki lub ścieżki do kanonicznych danych wejściowych (opcjonalne).
- **Zadania** — tabelę markdown z numerem zadania, nazwą i polem wyboru statusu.
- **Status** — wiersz w postaci `<n>/<total> tasks complete`.

## Pliki zadań

Każdy plik zadania MUSI być nazwany `<n>.task_<slug>.md` i zawierać dziewięcioczęściową anatomię.

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

## Trzy obowiązkowe zadania końcowe

Każdy plan MUSI kończyć się trzema standardowymi zadaniami:

1. **Przegląd bezpieczeństwa** — audyt pełnego zestawu zmian planu pod kątem sekretów, ryzyk iniekcji i nowej powierzchni ataku oraz zweryfikowanie, że `docs/SECURITY.md` nadal odzwierciedla rzeczywistość. Krytyczne znalezisko blokuje ukończenie.
2. **Odkrywanie skilli i agentów** — zidentyfikowanie utworzonych skilli i agentów wielokrotnego użytku.
3. **Raport wykonawczy** — podsumowanie wyników dla interesariuszy.
