---
title: Agentkit
description: "Jedno polecenie dla każdego terminalowego agenta kodującego: konto na profil, ak pick dla konta z największym zapasem, autonomia z rezygnacją i tryb headless."
kind: addon
lang: pl
order: 8
---

# Addon Agentkit

Każdy terminalowy agent kodujący ma własne flagi do kontynuowania sesji, własny sposób oddzielenia drugiego konta, własny tryb headless i własny przełącznik pomijania pytań o uprawnienia. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** nakłada na nie wszystkie jedną powierzchnię poleceń: `ak <kind> [@profile]`.

Ten addon integruje kit z **DWP v7** (pakiet `v7.5.1`) jako transport delegowania **headless**. Jest opcjonalny: bez niego każde zadanie wykonuje się w bieżącej sesji, dokładnie jak dotąd. Sam kit to produkt na licencji MIT, który działa bez Deep Work Plan.

## Co daje kit

- **Jedna składnia dla każdego CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` i `ak grok`, a także warianty dostawców (GLM, Azure, xAI), z tymi samymi flagami sesji: `-c` kontynuuje, `-r <id>` wznawia.
- **Profile.** `ak claude @work` uruchamia drugie konto we własnym katalogu domowym, oddzielone od pierwszego.
- **Uruchomienia headless.** `ak run <kind> -- "<prompt>"` wykonuje jeden prompt nieinteraktywnie i zwraca udokumentowany kod wyjścia, opcjonalnie jako jeden obiekt JSON.
- **Doctor.** `ak doctor --json` raportuje, które CLI są zainstalowane, profile oraz nazwy ustawionych kluczy — nigdy ich wartości.
- **Zweryfikowane instalacje.** `ak install <cli>` instaluje brakujące CLI z oficjalnego kanału jego dostawcy w przypiętej wersji, sprawdzonej względem przypiętej sumy sha256 lub wartości integrity z rejestru npm.
- **Znajome nazwy.** Dwa presety aliasów, wyłączone, dopóki ich nie włączysz: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) i `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), z których każdy to `ak <kind>`.

## Konta, limity i wybór konta

Kit traktuje każde logowanie lub klucz, który posiadasz, jako **konto**: jedno CLI × jeden profil. `@default` (lub `@1`) to własny katalog domowy CLI; `@2`, `@work` czy `@client-x` to osobne logowania, każde we własnym katalogu w katalogu głównym profili, działające równolegle. `ak profiles` wyświetla je wraz ze stanem logowania i nazwami ich kluczy; `ak profiles --json` daje narzędziom tę samą listę (schemat `profiles-v1`).

`ak usage` wyświetla limit i zużycie każdego konta widocznego dla kitu, jeden wiersz na konto i profil: na żywo dla subskrypcji Claude Code (okna 5-godzinne, tygodniowe i per model), logowań Codex przez ChatGPT oraz kluczy planu programistycznego Z.AI; Cursor, Grok, xAI i Azure OpenAI pokazują `n/d` wraz z powodem. Polecenie działa tylko do odczytu: nigdy nie odświeża logowania, nigdy nie wypisuje tokenu i nigdy nie zapisuje niczego w profilu. `--json` daje narzędziom tę samą listę (schemat `usage-v1`). Endpointy zużycia są wewnętrzne dla dostawców i nieoficjalne.

`ak pick <kind>` odczytuje te same wiersze i wskazuje konto z największym zapasem. `--count N` zwraca do N kont, od najlepszego; `--exclude @<profile>` pomija zajęte konto; `--model` liczy tygodniowe okno jednego modelu; `--need 5h:40` odmawia wyboru bez takiego zapasu. `--json` daje schemat `pick-v1`.

```bash
ak usage                   # limit każdego konta i profilu
ak pick claude --count 3   # trzy konta Claude z największym zapasem
ak claude @work --trust-cwd  # drugie konto, folder zaufany z góry
ak profiles --json         # profiles-v1, dla narzędzi
ak setup verify            # uporządkowane kontrole, każda z poleceniem naprawy
```

`--trust-cwd` (lub `AGENTKIT_TRUST_CWD=1`) z góry oznacza jako zaufany folder, w którym startuje agent, dzięki czemu Claude Code i Codex otwierają się bez ekranu zaufania do folderu. `ak setup probe | verify | docker` to pomocnik tylko do odczytu, prowadzony przez skill `agentkit-setup`, który sprawdza maszynę, weryfikuje instalację i generuje przypiętą po tagu, zweryfikowaną recepturę kontenera.

## Wielu agentów, wiele kont

Skill `agentkit-orchestrate` (`ak --skill orchestrate`) uczy agenta rozkładać pracę na wielu agentów, konta i dostawców: jedno `ak usage` przed partią, `ak pick --count N` do wyboru kont, jeden delegat na konto, własną bramkę repozytorium dla każdego wyniku i przełączenie na następne konto, gdy któreś osiągnie limit. Kit obserwuje, oblicza i uruchamia; nigdy nie planuje. Decyduje prowadzący — Ty albo agent, którego o to poprosisz — używając wyłącznie Twoich własnych kont i w granicach warunków każdego dostawcy.

W przypadku długich, interaktywnych torów każdy tor działa w panelu [Herdr](/kit/herdr) na własnym koncie. Rozdział metodyki [Uruchamianie wielu agentów](/methodology/06-orchestration) opisuje cały model: prowadzący i jego tory, konta wybierane według zapasu, koordynacja przez herdr-peers oraz jedna gałąź i jedno wydanie na repozytorium.

## Instalacja

```bash
git clone --branch v0.4.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Wymagania: `bash` na macOS lub Linuksie oraz `python3` 3.9 lub nowszy; nic więcej. Windows używa `install.ps1`. Przypnij `v0.4.0`: `v0.2.0` i `v0.2.1` nie są obsługiwane. Zweryfikuj wydanie za pomocą jego zasobu `SHA256SUMS`.

| Element | Wartość |
|---|---|
| Produkt | `DailybotHQ/coding-agents-kit`, tag `v0.4.0`, interfejs 1 |
| Klucz rejestru | `agentkit` w `.dwp/config.json` |
| Transport | headless: jedno `ak run` na delegata w dedykowanym git worktree |
| Zapewnia | `subagents`, `cancel_children`, `model_routing` |
| Wymaga | uprawnienia `agent_delegation` w kontrakcie planu |

## Autonomia domyślnie, z rezygnacją, która zawsze wygrywa

Od `v0.2.0` `ak <kind>` uruchamia każdego agenta w trybie **autonomii**: dodaje własną flagę autonomii danego CLI, przechowywaną wyłącznie w pliku `providers.toml` kitu. Autonomia jest przeznaczona dla środowisk jednorazowych lub odizolowanych, takich jak kontener deweloperski.

**Rezygnacja zawsze wygrywa**: `--ask` w pojedynczym poleceniu lub `AGENTKIT_PERMISSIONS=ask` w środowisku albo w pliku env kitu wyłącza flagę, nawet gdy to samo polecenie podaje `--auto`. Sesja z rezygnacją przekazuje ją agentom, których uruchamia. Na hoście ustaw rezygnację.

Addon nie zapisuje żadnej flagi autonomii i nigdy nie przekazuje `--auto`. Przekazuje `--ask`, gdy plan zapisuje rezygnację. Plan, który przyznaje `agent_delegation` na hoście, akceptuje autonomicznych delegatów ograniczonych do własnego worktree, a worktree nie jest piaskownicą.

## Co dodaje do planu

W planie v7, którego kontrakt przyznaje `agent_delegation`, `execute` może przekazać zadanie `parallel_safe` innemu CLI: tworzy dedykowany git worktree, uruchamia tam `ak run` z limitem czasu i zbiera wynik do `analysis_results/delegations/` planu. Wynik jest dowodem `asserted`, dopóki własny gate runner planu go nie zaobserwuje. Anulowanie delegata zatrzymuje całe jego drzewo procesów.

## Agentkit czy Herdr

| Sytuacja | Użyj |
|---|---|
| Ograniczone zadanie `parallel_safe` z zadeklarowanym wynikiem | Agentkit (headless) |
| Zadanie wymaga interakcji, trwa długo lub działa na innej maszynie | [Herdr](/kit/herdr) (peer w panelu) |

Oba można łączyć: herdr-peers może uruchomić peera w panelu ze środowiskiem, które wypisuje `ak env <kind> @profile`. Przy wielu torach naraz zobacz [Uruchamianie wielu agentów](/methodology/06-orchestration).

## Uwagi

Opcjonalny i nigdy niewymagany. Wartości kluczy API nigdy nie są wypisywane, logowane ani zapisywane w pliku konfiguracyjnym; udokumentowanym wyjątkiem jest Cline, który otrzymuje klucz w wierszu poleceń. Ekstrakcja wyników dla OpenCode, Pi, Cline i Grok opiera się na dokumentacji dostawców i nie była jeszcze sprawdzana na rzeczywistych kontach; nierozpoznane wyjście jest przekazywane jako surowy tekst.
