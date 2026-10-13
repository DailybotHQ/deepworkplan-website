---
title: Herdr
description: "Przekaż pracę innemu agentowi kodującemu w panelu Herdr, na dowolnej maszynie, i odbierz jedną autoryzowaną odpowiedź. Plany, które delegują, z zapisem."
kind: addon
lang: pl
order: 7
---

# Addon Herdr

[Herdr](https://herdr.dev) umieszcza agentów kodujących w panelach, na Twojej maszynie i na maszynach, do których dociera przez SSH. Ten addon pozwala Deep Work Plan używać tych agentów jako **peerów**: plan może przekazać ograniczone zadanie agentowi w innym panelu, otrzymać dokładnie jedną autoryzowaną odpowiedź i zachować zapis tej wymiany.

Jest to opcjonalny addon **DWP v7** (`v7.0.0`). Metodyka działa bez niego tak samo: gdy addonu brak lub jest wyłączony, każde zadanie wykonuje się w bieżącej sesji, dokładnie jak dotąd.

## Co integruje

Addon jest cienkim integratorem. Pracę wykonuje **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, samodzielny skill na licencji MIT przypięty do **`v0.3.2`**, użyteczny także bez Deep Work Plan. Definiuje to, co sam Herdr pozostawia otwarte: kto może odpowiedzieć, jak odpowiedź wraca między maszynami, jak dwaj agenci unikają odpowiadania sobie nawzajem bez końca i gdzie znajduje się zapis „zapytałem, odpowiedział”.

| Element | Wartość |
|---|---|
| Produkt | `DailybotHQ/herdr-peers`, tag `v0.3.2`, protokół 1 |
| Klucz rejestru | `herdr` w `.dwp/config.json` |
| Transport | interaktywny: peer w panelu Herdr |
| Zapewnia | `subagents`, `cancel_children` |
| Wymaga | uprawnienia `agent_delegation` w kontrakcie planu |

## Instalacja

Zainstaluj herdr-peers oraz oficjalny skill Herdr, od którego zależy. Każda maszyna, której agenci mają odpowiadać, również potrzebuje tego skilla.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v0.3.2 --skill herdr-peers -g -y
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

## Kontenery i host

Z addonem [devcontainer](/kit/devcontainer) na devcontainer-kit `v0.3.7` każdy kontener dck zawiera herdr-peers i dołącza do sieci przy `dck up`: jego agenci mogą pytać agentów na hoście, w innych kontenerach i w pozostałych kontenerach loopback hosta, i otrzymać odpowiedź. `dck setup` instaluje na hoście zweryfikowany herdr-peers, więc agenci hosta także odpowiadają. Listener na hoście i dodatkowe klucze, które wpuszczają inne kontenery, to twoje decyzje w profilu hosta kitu; ten addon nigdy ich nie ustawia. Od herdr-peers (`v0.2.3`) każda maszyna przechowuje własny stan (`$XDG_STATE_HOME/herdr-peers/<server>/`), więc checkout współdzielony przez host i kontener nie miesza już ich zapisów, a od devcontainer-kit (`v0.3.3`) kontener sam eksportuje `HERDR_PEERS_SELF`, więc agenci Codex wewnątrz docierają do innych maszyn bez ręcznych kroków.

## Herdr czy agentkit

Oba addony implementują ten sam interfejs delegowania — `launch`, `observe`, `collect`, `cancel` — z różnymi transportami.

| Sytuacja | Użyj |
|---|---|
| Ograniczone zadanie `parallel_safe` z zadeklarowanym wynikiem | [agentkit](/kit/agentkit) (headless `ak run` w worktree) |
| Zadanie wymaga interakcji, trwa długo lub działa na innej maszynie | Herdr (peer w panelu) |

Jeśli prowadzący uruchamia wiele torów naraz — panele na hoście, w kontenerach i na innych maszynach, każdy na własnym koncie — `herdr-peers lanes` wyświetla każdy tor z jego stanem, `herdr-peers status <pane>` klasyfikuje ekran, na którym stoi zablokowany tor, a każdy zapis delegacji podaje konto i dostawcę, które ją wykonały. Zobacz [Uruchamianie wielu agentów](/methodology/06-orchestration).

**Lane’y Codexa podają swój panel.** Codex uruchamia polecenia lane’a z serwera w tle wspólnego dla wszystkich sesji danego konta, więc odziedziczony identyfikator panelu może należeć do innego lane’a. Lane Codexa przekazuje własny panel, wskazany w zleceniu lidera, przez `--pane <pane>` przy każdym poleceniu herdr-peers (`ask`, `reply`, `notify`, `check`, `wait`, `lanes`, `cancel`).

## Powiadomienia i przywództwo

herdr-peers `v0.3.2` dodaje to, co pozwala rojowi przetrwać swojego prowadzącego ([Autonomia roju](/pl/methodology/07-swarm-autonomy)):

- **Powiadomienia.** `herdr-peers notify <addr|lead> "<text>" --pane <pane>` wysyła jednokierunkową wiadomość ze znacznikiem `reply=no`. `check` odbiorcy klasyfikuje ją jako powiadomienie, zapisuje jako dane i nigdy nie odpowiada. Powiadomienia nie zajmują miejsca w rozgałęzieniu i można je wysyłać, gdy ask jest otwarty; używaj ich do ogłoszeń przekazania, zmian prowadzącego i rozgłaszania wydań.
- **Rekord prowadzącego na plan.** `herdr-peers lead claim --plan <P> --succession <A,B> --lanes <A,B>` czyni agenta prowadzącym jednego planu; `lead show` wypisuje rekord (schemat `herdr-peers/lead-v1`: plan, prowadzący, epoka, sukcesja, tory, czas aktualizacji). `lead handover <addr> --plan <P>` przekazuje przywództwo dalej, `lead takeover --plan <P>` pozwala pierwszemu osiągalnemu zastępcy je przejąć, gdy prowadzącego zabraknie, a `lead release --plan <P>` je kończy. Każda zmiana podnosi epokę i powiadamia każdy tor. Obejmij plan przed uruchomieniem jego torów: `lead` rozwiązuje się dopiero, gdy istnieje rekord. Od `v0.3.2` rekord przechowuje lokalnie repozytorium, które objęło plan, i odrzuca objęcie tego samego identyfikatora planu z innego repozytorium; nazwij taki plan `--plan <repo>/<id>`.
- **Odgradzanie (fencing).** Tor przyjmuje powiadomienie prowadzącego tylko od agenta, który go zlecił (pierwsze objęcie), od bieżącego prowadzącego w następnej epoce (przekazanie) albo od pierwszego osiągalnego wpisu sukcesji w następnej epoce (przejęcie). Wszystko inne jest zapisywane i ignorowane, a powracający prowadzący, który widzi wyższą epokę, ustępuje.
- **Adres `lead`.** `ask lead …` i `notify lead …` wskazują bieżącego prowadzącego planu z `--plan` (w przeciwnym razie `$DWP_PLAN`), więc żadne zlecenie toru nie zapisuje na sztywno panelu prowadzącego.
- **Ekrany `usage_limit`.** `status` i `lanes` rozpoznają komunikat limitu zużycia CLI jako klasę ekranu `usage_limit`, której następnym krokiem jest przekazanie. Nigdy nie odpowiada się na nią klawiszami. `lanes --json` dodaje plan, jego prowadzącego, epokę i ostatnio zgłoszoną pojemność każdego toru.

Tory mogą też prosić się nawzajem o informacje i koordynację — interfejs, nazwę flagi, stan gałęzi — ale tylko prowadzący przydziela pracę. Głębokość jeden i limit rozgałęzienia nadal obowiązują. W `v0.2.x` nie ma powiadomień ani rekordów prowadzącego: tory pytają adres prowadzącego ze swojego zlecenia, a zmianę prowadzącego przekazuje deweloper.

## Uwagi

Opcjonalny i nigdy niewymagany. Repozytorium bez opcjonalnych addonów jest w pełni zgodne i żaden przepływ nie zależy od tego addonu. Pełny cykl między dwoma panelami i maszynami jest pokryty testami na symulowanym Herdr; zaplanuj pierwsze uruchomienie pod nadzorem.
