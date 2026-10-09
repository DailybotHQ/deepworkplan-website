---
title: Herdr
description: "Opcjonalny addon v7: plan przekazuje zadanie innemu agentowi w panelu Herdr, na dowolnej maszynie, i zapisuje jego jedyną autoryzowaną odpowiedź."
kind: addon
lang: pl
order: 7
---

# Addon Herdr

[Herdr](https://herdr.dev) umieszcza agentów kodujących w panelach, na Twojej maszynie i na maszynach, do których dociera przez SSH. Ten addon pozwala Deep Work Plan używać tych agentów jako **peerów**: plan może przekazać ograniczone zadanie agentowi w innym panelu, otrzymać dokładnie jedną autoryzowaną odpowiedź i zachować zapis tej wymiany.

Jest to opcjonalny addon **DWP v7** (`v7.0.0`). Metodyka działa bez niego tak samo: gdy addonu brak lub jest wyłączony, każde zadanie wykonuje się w bieżącej sesji, dokładnie jak dotąd.

## Co integruje

Addon jest cienkim integratorem. Pracę wykonuje **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, samodzielny skill na licencji MIT przypięty do **`v0.1.0`**, użyteczny także bez Deep Work Plan. Definiuje to, co sam Herdr pozostawia otwarte: kto może odpowiedzieć, jak odpowiedź wraca między maszynami, jak dwaj agenci unikają odpowiadania sobie nawzajem bez końca i gdzie znajduje się zapis „zapytałem, odpowiedział”.

| Element | Wartość |
|---|---|
| Produkt | `DailybotHQ/herdr-peers`, tag `v0.1.0`, protokół 1 |
| Klucz rejestru | `herdr` w `.dwp/config.json` |
| Transport | interaktywny: peer w panelu Herdr |
| Zapewnia | `subagents`, `cancel_children` |
| Wymaga | uprawnienia `agent_delegation` w kontrakcie planu |

## Instalacja

Zainstaluj herdr-peers oraz oficjalny skill Herdr, od którego zależy. Każda maszyna, której agenci mają odpowiadać, również potrzebuje tego skilla.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v0.1.0 --skill herdr-peers -g -y
npx --yes skills add https://github.com/herdrdev/herdr/tree/v0.9.3 --skill herdr -g -y
```

Wymagania: Herdr 0.9.1 lub nowszy, `bash` oraz `python3` 3.9 lub nowszy (tylko biblioteka standardowa). Onboarding proponuje addon i zapisuje Twoją odpowiedź w rejestrze addonów; nigdy nie jest on włączany bez zgody.

## Co dodaje do planu

- **Delegowanie do peera.** W planie v7, którego kontrakt przyznaje `agent_delegation`, `execute` może przekazać zadanie `parallel_safe` lub pytanie tylko do odczytu agentowi w innym panelu, na tej samej lub innej maszynie.
- **Jedna autoryzowana odpowiedź.** Żądanie niesie stempel, który autoryzuje dokładnie jedną odpowiedź. Peer odpowiada raz przez helper, a odpowiedź niesie własny stempel.
- **Zapis przed użyciem.** Każde delegowanie jest zapisywane w `analysis_results/delegations.ndjson` planu, zanim odpowiedź zostanie użyta, i odpowiada zdarzeniu dziennika v7 `delegation`.
- **Wyniki pozostają twierdzeniami do czasu sprawdzenia.** Odpowiedź peera jest dowodem `asserted`, dopóki własny gate runner planu jej nie zaobserwuje. Nigdy sama nie zamyka zadania.

## Model bezpieczeństwa

| Reguła | Co oznacza |
|---|---|
| Najpierw uprawnienie | Delegowanie działa tylko wtedy, gdy kontrakt planu przyznaje `agent_delegation`. |
| Limit głębokości 1 | Wiadomość ze stemplem `depth=1` lub `reply-to=` nigdy nie otrzymuje odpowiedzi, a delegat nigdy nie deleguje dalej. |
| Limit fan-out | Domyślnie najwyżej czterech peerów na wywołującego. |
| Dane, nie instrukcje | Odpowiedź nigdy nie przyznaje uprawnień, których odbiorca jeszcze nie miał. |
| Jeden zapisujący na ścieżkę | Peer, który zapisuje, pracuje we własnym git worktree. |

herdr-peers nie uwierzytelnia nadawcy: pole `from=` w stemplu jest twierdzeniem. Środkiem zaradczym jest lista dozwolonych `HERDR_PEERS_SCOPE`, która ogranicza workspace’y i maszyny akceptowane przez peera.

## Herdr czy agentkit

Oba addony implementują ten sam interfejs delegowania — `launch`, `observe`, `collect`, `cancel` — z różnymi transportami.

| Sytuacja | Użyj |
|---|---|
| Ograniczone zadanie `parallel_safe` z zadeklarowanym wynikiem | [agentkit](/kit/agentkit) (headless `ak run` w worktree) |
| Zadanie wymaga interakcji, trwa długo lub działa na innej maszynie | Herdr (peer w panelu) |

## Uwagi

Opcjonalny i nigdy niewymagany. Repozytorium bez opcjonalnych addonów jest w pełni zgodne i żaden przepływ nie zależy od tego addonu. Pełny cykl między dwoma panelami i maszynami jest pokryty testami na symulowanym Herdr; zaplanuj pierwsze uruchomienie pod nadzorem.
