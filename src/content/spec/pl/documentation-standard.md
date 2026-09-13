---
title: Standard dokumentacji
description: "Normatywny standard sposobu dokumentowania struktury, zadań i postępu Deep Work Planów: reguły README, znaczniki statusu, dziesięciosekcyjna anatomia zadania oraz Final Review."
order: 1
lang: pl
section: Standard
---

# Standard dokumentacji

**Wersja 5.0.0.** Ten standard definiuje sposób, w jaki Deep Work Plany dokumentują swoją strukturę, zadania i postęp, oraz sposób, w jaki repozytorium dokumentuje samo siebie, aby agent mógł bezpiecznie na nim działać. Dotyczy każdego planu utworzonego w ramach metodyki DWP. Ta wersja dostosowuje własny numer wersji dokumentu do standardu DWP, któremu towarzyszy — żadne istniejące wymaganie się nie zmienia — i dodaje egzekwowanie budżetu lean-index oraz opisany poniżej poziom funkcji. Słowa kluczowe MUSI, POWINNO i MOŻE są używane zgodnie z definicją w RFC 2119.

## AGENTS.md jako zwięzły punkt wejścia

Główny plik `AGENTS.md` POWINIEN mieścić się w budżecie 150–500 linii. Gdy treść generowana lub utrzymywana przez harness przekroczyłaby ten budżet, agent MUSI przenieść szczegóły do przewodnika `docs/` (lub dokumentu modułu/funkcji), który jest ich właścicielem, i podlinkować go z indeksu — nic nie jest odrzucane, tylko przenoszone, a indeks MUSI linkować do każdego dokumentu, który otrzymał przeniesioną treść. Istniejący, ręcznie napisany `AGENTS.md` przekraczający budżet nigdy nie jest po cichu przepisywany: agent proponuje konkretną migrację (co się przenosi dokąd, jakie linki są dodawane) i stosuje ją wyłącznie za zgodą dewelopera. Sprawdzający zgodność traktuje budżet jako doradczy, ponieważ liczba linii jest obiektywna, ale autorstwo już nie — MUSI wiąże harness, który generuje lub aktualizuje plik, a nie domysł sprawdzającego co do tego, kto go napisał. `AGENTS.md` NIE MOŻE linkować do pliku `docs/`, który nie istnieje.

Ponad poziomem dokumentacji per moduł (poniżej) znajduje się **poziom funkcji**: duży obszar możliwości — większy niż jeden moduł — otrzymuje własny folder `docs/` obok swojego kodu, z wejściem przez własny `README.md`. Obszar kwalifikuje się, gdy obejmuje dwa lub więcej głównych modułów, posiada samodzielny podaplikację lub katalog podsystemu, albo niesie własne kontrakty (powierzchnię API, kontrakty zdarzeń lub schematów), od których zależy wielu konsumentów. Gdy obszar zostanie odnotowany jako główny, jego `docs/` na poziomie funkcji POWINIEN istnieć, a jego najistotniejsze wpisy POWINNY być podlinkowane z modułów, które obejmuje, oraz z głównego indeksu `AGENTS.md`, dokładnie tak jak dokumentacja per moduł. Obszar celowo pozostawiony bez dokumentacji niesie odnotowany powód — decyzję, a nie przeoczenie.

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
