---
title: Agentkit
description: "Opcjonalny addon v7 oparty na coding-agents-kit: jedno polecenie ak dla każdego agenta kodującego w terminalu i headless delegowanie ograniczonych zadań planu."
kind: addon
lang: pl
order: 8
---

# Addon Agentkit

Każdy terminalowy agent kodujący ma własne flagi do kontynuowania sesji, własny sposób oddzielenia drugiego konta, własny tryb headless i własny przełącznik pomijania pytań o uprawnienia. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** nakłada na nie wszystkie jedną powierzchnię poleceń: `ak <kind> [@profile]`.

Ten addon integruje kit z **DWP v7** (`v7.0.0`) jako transport delegowania **headless**. Jest opcjonalny: bez niego każde zadanie wykonuje się w bieżącej sesji, dokładnie jak dotąd. Sam kit to produkt na licencji MIT, który działa bez Deep Work Plan.

## Co daje kit

- **Jedna składnia dla każdego CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` i `ak grok`, a także warianty dostawców (GLM, Azure, xAI), z tymi samymi flagami sesji: `-c` kontynuuje, `-r <id>` wznawia.
- **Profile.** `ak claude @work` uruchamia drugie konto we własnym katalogu domowym, oddzielone od pierwszego.
- **Uruchomienia headless.** `ak run <kind> -- "<prompt>"` wykonuje jeden prompt nieinteraktywnie i zwraca udokumentowany kod wyjścia, opcjonalnie jako jeden obiekt JSON.
- **Doctor.** `ak doctor --json` raportuje, które CLI są zainstalowane, profile oraz nazwy ustawionych kluczy — nigdy ich wartości.
- **Instalacje.** `ak install <cli>` instaluje brakujące CLI z oficjalnego kanału jego dostawcy.

## Instalacja

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Wymagania: `bash` na macOS lub Linuksie oraz `python3` 3.9 lub nowszy; nic więcej. Windows używa `install.ps1`. Przypnij `v0.1.1`: zastępuje `v0.1.0` i zawiera poprawkę bezpieczeństwa.

| Element | Wartość |
|---|---|
| Produkt | `DailybotHQ/coding-agents-kit`, tag `v0.1.1`, interfejs 1 |
| Klucz rejestru | `agentkit` w `.dwp/config.json` |
| Transport | headless: jedno `ak run` na delegata w dedykowanym git worktree |
| Zapewnia | `subagents`, `cancel_children`, `model_routing` |
| Wymaga | uprawnienia `agent_delegation` w kontrakcie planu |

## Uprawnienia są przekazywane bez zmian

`ak <kind>` **nie** dodaje żadnej flagi omijania uprawnień. Autonomia to wyraźny opt-in: `--auto` w pojedynczym poleceniu lub `AGENTKIT_PERMISSIONS=auto` w środowisku dodaje własną flagę autonomii danego CLI dla tego uruchomienia. Preset aliasów `classic`, który odtwarza skróty takie jak `claudex`, jest dostarczany jako wyłączony.

Addon nigdy sam nie dodaje flagi autonomii. Plan używa `--auto` tylko po wyraźnym, zapisanym opt-in programisty i tylko wewnątrz odizolowanego worktree lub kontenera.

## Co dodaje do planu

W planie v7, którego kontrakt przyznaje `agent_delegation`, `execute` może przekazać zadanie `parallel_safe` innemu CLI: tworzy dedykowany git worktree, uruchamia tam `ak run` z limitem czasu i zbiera wynik do `analysis_results/delegations/` planu. Wynik jest dowodem `asserted`, dopóki własny gate runner planu go nie zaobserwuje. Anulowanie delegata zatrzymuje całe jego drzewo procesów.

## Agentkit czy Herdr

| Sytuacja | Użyj |
|---|---|
| Ograniczone zadanie `parallel_safe` z zadeklarowanym wynikiem | Agentkit (headless) |
| Zadanie wymaga interakcji, trwa długo lub działa na innej maszynie | [Herdr](/kit/herdr) (peer w panelu) |

Oba można łączyć: herdr-peers może uruchomić peera w panelu ze środowiskiem, które wypisuje `ak env <kind> @profile`.

## Uwagi

Opcjonalny i nigdy niewymagany. Wartości kluczy API nigdy nie są wypisywane, logowane ani zapisywane w pliku konfiguracyjnym; udokumentowanym wyjątkiem jest Cline, który otrzymuje klucz w wierszu poleceń. Ekstrakcja wyników dla OpenCode, Pi, Cline i Grok opiera się na dokumentacji dostawców i nie była jeszcze sprawdzana na rzeczywistych kontach; nierozpoznane wyjście jest przekazywane jako surowy tekst.
