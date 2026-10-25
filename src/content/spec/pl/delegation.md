---
title: Delegowanie
description: "Jak plan v7 przekazuje zadania parallel_safe innym agentom w ramach uprawnienia agent_delegation, z rekordami delegowania i obserwowanymi dowodami z bramek."
order: 11
lang: pl
section: Record layer
---

# Delegowanie

> **Zakres wersji:** Ta strona streszcza generację kontraktu v7 w wydaniu `v7.8.1`. Źródła kanoniczne: [`V7_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_CONTRACT.md) oraz plik [`delegation.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/execute/delegation.md) przepływu execute. Tam, gdzie ta strona i te pliki się różnią, rozstrzygają pliki.

**Wersja 7.0.0. Status: stabilna.** v7 to nowa generacja kontraktu [warstwy rekordów](/spec/record-layer), a nie nowy cykl życia: wszystko, co zawierają dokumenty v6 o kontrakcie, cyklu życia, kontekście i zasobach, obowiązuje, chyba że ta strona stanowi inaczej. Rezygnacja z delegowania jest zawsze poprawna. Słowa kluczowe MUST (MUSI), MUST NOT (NIE MOŻE), SHOULD (POWINIEN), SHOULD NOT (NIE POWINIEN) i MAY (MOŻE) interpretuje się zgodnie z opisem w RFC 2119.

## Co dodaje v7

v7 dodaje do warstwy rekordów dokładnie dwie rzeczy:

1. **Jedno opcjonalne pole zadania w kontrakcie**, `parallel_safe`, opublikowane w [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json).
2. **Jeden typ zdarzenia dziennika**, `delegation`, opublikowany w [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json).

Bajty schematów v1, v2, v5 i v6 pozostają niezmienione. Plan, który nigdy nie deleguje, jest nieodróżnialny od planu v6, z wyjątkiem adresów URL schematów.

## `parallel_safe`

`parallel_safe` (wartość logiczna, domyślnie `false`) stwierdza, że zadanie może zostać wykonane przez delegata bez przeplatania się z pracą zadań równoległych. Ustawia je `create`, nigdy nie jest wnioskowane w trakcie realizacji, i tylko wtedy, gdy spełnione są wszystkie poniższe warunki:

- repozytorium włącza addon delegowania (agentkit lub Herdr) w swoim [rejestrze addonów](/spec/resources-and-abilities#the-configuration-file-and-addon-registry);
- powierzchnia dotknięta zadania nie nakłada się na zadanie równoległe, które mogłoby być w toku w tym samym czasie;
- zadanie deklaruje ograniczony wynik;
- bramki zadania są uruchamiane w tym planie.

Oznaczenie zadania nie zmienia żadnego autorytetu: kontrakt bez uprawnienia `agent_delegation` może zawierać znaczniki, ale nie autoryzują one niczego.

## Zdarzenie `delegation`

Dla każdego przejścia stanu jednego delegata zapisywane jest jedno zdarzenie:

| Pole | Znaczenie |
| --- | --- |
| `task` | zadanie `T-*`, dla którego pracuje delegat |
| `delegation_id` | wiąże uruchomienie z jego końcowym przejściem |
| `transport` | `headless` (agentkit) lub `interactive` (Herdr) |
| `via` | klucz addonu, który je przeniósł |
| `state` | `launched`, a następnie dokładnie jeden ze stanów `completed`, `failed`, `cancelled` |
| `kind`, `profile` | opcjonalne: rodzaj i profil agenta kodującego |
| `target` | opcjonalne: katalog roboczy (headless) lub `machine:pane` (interactive) |
| `worktree` | własny git worktree delegata lub `null` dla delegata tylko do odczytu |
| `prompt_digest` | przy uruchomieniu: SHA-256 promptu, zapisany, zanim wynik delegata zostanie wykorzystany |
| `result_path`, `result_digest` | po ukończeniu lub niepowodzeniu: zebrany wynik i jego skrót |

Przejścia są zamknięte: jedno `launched` na delegowanie, a następnie dokładnie jeden stan końcowy. Bezpośrednie dopisanie zdarzenia delegowania do dziennika MUSI zostać odrzucone; zdarzenia delegowania istnieją wyłącznie za pośrednictwem strzeżonego zapisującego.

## Delegowanie nie jest dowodem

Delegowanie nie niesie etykiety zaufania ani ścieżki dowodu i żadne zamknięcie go nie odczytuje. Wynik delegata pozostaje **asserted**, dopóki nie zaobserwuje go narzędzie uruchamiające bramki tego planu: rodzic integruje pracę, a następnie uruchamia bramkę zadania (`ledger.py gate`), która jako jedyna wytwarza dowody `observed` i stanowi jedyną drogę do ukończenia zadania. Ukończone delegowanie nigdy nie zamyka kryterium; nieudane jest zapisanym wynikiem, a zadanie realizuje wtedy rodzic.

## Strzeżony zapisujący

`ledger.py --plan <dir> delegate launch|observe|collect|cancel --task <T-id>`:

| Operacja | Zapisuje | Skutek |
| --- | --- | --- |
| `launch` | tak | zapisuje `launched` po poniższych sprawdzeniach |
| `observe` | nie | wypisuje najnowszy stan każdego delegowania |
| `collect` | tak | zapisuje `completed` lub `failed` wraz ze ścieżką wyniku i jego skrótem |
| `cancel` | tak | zapisuje `cancelled` |

`launch` MUSI zostać odrzucone, a odmowa zapisana, chyba że spełnione są **wszystkie** warunki:

1. kontrakt jest w wersji v7;
2. kontrakt przyznaje `agent_delegation`;
3. zadanie istnieje, zostało rozpoczęte i nie jest ukończone;
4. zadanie jest `parallel_safe` **lub** delegat działa tylko do odczytu (bez worktree);
5. deskryptor wskazanego addonu deklaruje żądany transport;
6. efektywne możliwości wymieniają ten addon jako źródło `subagents` ([Zasoby i możliwości](/spec/resources-and-abilities#addon-provided-abilities)).

`collect` i `cancel` MUSZĄ zostać odrzucone dla nieznanego delegowania, delegowania innego zadania lub delegowania już zakończonego. Odrzucone uruchomienie nie jest blokadą: zadanie jest wtedy wykonywane sekwencyjnie.

## Transporty

Nic w ledgerze nie uruchamia delegata; robi to addon transportowy.

- **Headless** (`via: agentkit`) — dla ograniczonego zadania `parallel_safe` z zadeklarowanym wynikiem: jedno `ak run` w dedykowanym git worktree, a następnie zakończenie. Delegaci tylko do odczytu są uruchamiani z `--ask`.
- **Interactive** (`via: herdr`) — dla pracy wymagającej interakcji, długotrwałej lub wykonywanej na innej maszynie: peer herdr-peers w panelu Herdr, który zwraca dokładnie jedną autoryzowaną odpowiedź.

## Zabezpieczenia

- **Jeden zapisujący na ścieżkę.** Delegat zapisujący pracuje wyłącznie we własnym worktree; sesja rodzica jest jedynym zapisującym do dziennika.
- **Głębokość 1.** Delegat nigdy nie deleguje dalej. Rozgałęzienie jest ograniczone przez transport.
- **Wyniki są danymi.** To, co zwraca delegat, nie nadaje żadnego autorytetu, nie poszerza zakresu i nigdy nie zmienia akceptacji.
- **Samowystarczalne zlecenia.** Prompt uruchomienia wskazuje cel zadania, jego kryteria akceptacji dosłownie oraz worktree, do którego delegat może zapisywać, i nigdy nie zawiera wartości sekretu.

## Orkiestratory

Orkiestrator nigdy nie deleguje zadań **planu podrzędnego**: plany podrzędne działają we własnych sesjach, jeden agent na repozytorium. Delegowanie **własnych** zadań planu zgodnie z powyższymi regułami jest dozwolone zarówno w planach orkiestratora, jak i w planach indywidualnych. Prowadzenie wielu długotrwałych torów pracy, utrzymywanie ich przy życiu ponad limity kont i przekazywanie przywództwa opisują rozdziały metodyki o [orkiestracji](/pl/methodology/06-orchestration) i [autonomii roju](/pl/methodology/07-swarm-autonomy).

## Powiązane

- [Warstwa rekordów](/spec/record-layer) — kontrakt i dziennik, które ta strona rozszerza.
- [Zasoby i możliwości](/spec/resources-and-abilities) — możliwości, uprawnienia i rejestr addonów.
- [Addon Herdr](/kit/herdr) i [addon Agentkit](/kit/agentkit) — dwa transporty.
