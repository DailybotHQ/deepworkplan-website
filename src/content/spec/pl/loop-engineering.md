---
title: Inżynieria pętli (loop engineering)
description: "Normatywna semantyka pętli v8: zapisane uprawnienia, kontynuacja uruchamiana przez człowieka, sukcesja, blokady, kolejka i powiadomienia."
order: 12
lang: pl
section: Inżynieria pętli
---

# Inżynieria pętli (loop engineering)

Ta strona opisuje kontrakt loop engineering. **Plan** jest źródłem uprawnień; pętla zapewnia ciągłość, ale ich nie rozszerza.

## 1. Reguła v8
Zatwierdzony plan biegnie do końca bez oczekiwania na człowieka. Autonomia działa **w granicach uprawnień zapisanych w planie**. Człowiek otrzymuje powiadomienia; logowanie, dane dostępowe i bramki C1–C7 wstrzymują pracę bez zapisanej zgody wstępnej. Reguła v7 trwa: podstawowa metoda działa samodzielnie.

### 1.1. Semantyka pętli
#### Rejestracja i obserwacja
Z Herdr przepływ `execute` v8 rejestruje lead i sukcesję. Obserwuje tylko plany z lead i czytelnym stanem. Człowiek uruchamia `herdr-peers autopilot --loop`; to daemon, nie element logowania ani usługa systemowa.

#### Kontynuacja i przejęcie
Daemon przypomina tylko leadowi, gdy plan jest otwarty, lead pozostaje bezczynny lub ukończony pięć minut, żadna lane nie pracuje ani nie czeka na odpowiedź, pane jest w zakresie i niewykluczone, brak dialogu/logowania/limitu użycia i szkicu człowieka. Stały komunikat żąda ukończenia zgodnie z uprawnieniami i bramkami; nie dodaje uprawnień. Trzy przypomnienia bez postępu zapisują `plan_stalled`; plan zablokowany jest zgłaszany, nie ponaglany. Przy zniknięciu lead daemon prosi pierwszego dostępnego następcę o `herdr-peers lead takeover --plan <id>`; nie zapisuje lead ani nie wybiera nieujętego pane. Limit użycia nie dowodzi nieobecności. Protocol 2 dopuszcza mianowanie po jawnym `lead claim --allow-appointment` człowieka i uruchomieniu daemon z `--appoint`. Przed merge/tag/release lead uruchamia `herdr-peers lead verify --plan <id>`.

#### Brain, zdarzenia, flota
Opcjonalny `--brain` wybiera z zamkniętej listy; daemon pozostaje jedynym wykonawcą i nie uruchamia dowolnego tekstu. Wymaga zgody `autonomy`. Pętla zapisuje zdarzenia; `--notify` wysyła `plan-event-v1`, a Dailybot przekazuje obsługiwane zdarzenia zespołowi. Powiadomienie nie zatwierdza pracy. Mapa floty i `herdr-peers fleet ui` są tylko do odczytu. Zobacz [autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.2.1/skills/herdr-peers/autopilot.md) i [protokół](https://github.com/DailybotHQ/herdr-peers/blob/v2.2.1/skills/herdr-peers/protocol.md).

## 2. Blok `autonomy`
Obiekt zamknięty; kanoniczne nazwy i typy określa [schemat plan-contract/v8](https://deepworkplan.com/schema/plan-contract/v8.json). Brak bloku oznacza wartości domyślne.

| Pole | Typ / wartość | Domyślnie |
|---|---|---|
| `stall_budget` | liczba całkowita 1–10 | `3` |
| `promptable` | niepusta lista adresów pane Herdr | tylko lead |
| `notify` | niepusta lista celów | brak celu; zdarzenia zapisane |
| `brain` | boolean | `false` |
| `queue` | `prompt-lead`, `launch`, `none` | `none` |

Adres ma wzór `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`; ID maszyny nie zaczyna się od `-`. Pola ograniczają odbiorców i zachowanie, nie kryteria ani bramki.

## 3. Blokady strukturalne

Plan v8 zapisuje przyczynę zatrzymania jako dane, aby pętla, flota i agent wznawiający pracę czytali te same pola.

### 3.1. Rekord blokady

Ledger używa `ledger.py block` do otwarcia i `ledger.py unblock` do rozwiązania; zapisuje zdarzenie `blocker` w `journal-event/v8`. Bezpośredni dopis i każda odmowa są rejestrowane.

| Pole | Zasada |
|---|---|
| `task` | Zablokowane zadanie contract; nie może być już zamknięte dowodami. |
| `reason` | Wymagane, niepuste, do 1000 znaków: powód. |
| `needs` | Wymagany jeden niepusty wiersz, do 500 znaków: warunek kontynuacji. |
| `class` | Wymagana klasa `C1`–`C7` z [`AGENT_PROTOCOL.md`](AGENT_PROTOCOL.md) §7.5. |
| `resolver` | Opcjonalnie `lead` lub `human`; brak oznacza `human`. |

`lead` rozwiązuje w granicach zapisanych uprawnień, bez danych logowania, zgody, płatności, push do main, publikacji ani usunięcia. Dla `C1`, `C2`, `C5`, `C6` `resolver: "lead"` jest odrzucany. Plan ma najwyżej jedną aktywną blokadę. Kolejna jest odrzucana do rozwiązania. Ponowne otwarcie tego samego zadania może zmienić pola, ale zachowuje początkowe `since`. Rozwiązanie zawiera zadanie i opcjonalną notatkę. Otwarte zadanie nie może zostać ukończone; nowe dowody go nie zamykają.

### 3.2. Gdzie znaleźć dane

`state.json` używa `plan-snapshot/v8`: struktury `plan-snapshot/v6`, `blocker` jako `{task, reason, since, needs, class, resolver?}` lub `null` i `blocked` jako nadrzędnego statusu pochodnego. Ledger tworzy projekcję; nie zapisuje się jej ręcznie.

`PROGRESS.md` POWINNO zaczynać się pod tytułem czterema stałymi wierszami; create zapisuje je i odświeża przy każdej zmianie (`shared/progress_header.py`):

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

`Current task` i `Needs` pochodzą ze snapshotu (najpierw zadanie z blokadą, inaczej pierwsze nieukończone). Agent wpisuje `Goal` i `Next action`.

### 3.3. Co może robić pętla

Pętla, także brain, prosi lead tylko o blokadę oznaczoną `resolver: "lead"`; pozostałe wymagają człowieka. v6/v7 nie zapisują `blocker`, zachowują `plan-snapshot/v6` (`blocker` to `null`), a blokady należą do człowieka.
## 4. Kolejka planów
`.dwp/queue.json` używa `dwp-queue-v1`; pisze ją tylko pack. `create` dodaje po zatwierdzeniu; człowiek/lead zmienia kolejność; `execute` zapisuje `started` przy przejęciu lead, finalizacja `done`; `create`/`refine` mogą zapisać `skipped` z notatką. Element może mieć `after`. Bez `parallel: true` działa jeden plan. Daemon jest ograniczonym czytnikiem; błędną kolejkę traktuje jako pustą. `prompt-lead` wysyła: “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” Daemon nie pisze i nie wykonuje `launch` bez jawnego kontraktu.

## 5. Co zachowuje v8

v8 zachowuje wszystko z v7: `tasks[].parallel_safe`, delegowanie i pełny zestaw zdarzeń; funkcje v7 pozostają dostępne. v8 zapisuje zdarzenia v7 plus `blocker` w `journal-event/v8` i rzutuje je do `plan-snapshot/v8`; mieszany journal jest odrzucany. `plan-manifest/v7` zachowuje kształt i wskaźnik; weryfikator łączy manifest v7 z contract v8. Zapisy v6/v7 pozostają identyczne bajt po bajcie.
