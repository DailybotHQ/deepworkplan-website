---
title: Agentkit
description: "Jedno polecenie dla każdego terminalowego agenta kodującego: konto na profil, ak pick dla konta z największym zapasem, autonomia z rezygnacją i tryb headless."
kind: addon
lang: pl
order: 8
---

# Addon Agentkit

Każdy terminalowy agent kodujący ma własne flagi do kontynuowania sesji, własny sposób oddzielenia drugiego konta, własny tryb headless i własny przełącznik pomijania pytań o uprawnienia. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** nakłada na nie wszystkie jedną powierzchnię poleceń: `ak <kind> [@profile]`.

Ten addon integruje kit z **DWP v7** (pakiet `v7.8.1`) jako transport delegowania **headless**. Jest opcjonalny: bez niego każde zadanie wykonuje się w bieżącej sesji, dokładnie jak dotąd. Sam kit to produkt na licencji MIT, który działa bez Deep Work Plan.

## Co daje kit

- **Jedna składnia dla każdego CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline`, `ak grok` i `ak antigravity`, a także trasy dostawców (Z.AI GLM, Azure OpenAI, xAI i Gemini API), z tymi samymi flagami sesji: `-c` kontynuuje, `-r <id>` wznawia.
- **Profile.** `ak claude @work` uruchamia drugie konto we własnym katalogu domowym, oddzielone od pierwszego.
- **Uruchomienia headless.** `ak run <kind> -- "<prompt>"` wykonuje jeden prompt nieinteraktywnie i zwraca udokumentowany kod wyjścia, opcjonalnie jako jeden obiekt JSON.
- **Doctor.** `ak doctor --json` raportuje, które CLI są zainstalowane, profile oraz nazwy ustawionych kluczy — nigdy ich wartości.
- **Zweryfikowane instalacje.** `ak install <cli>` instaluje brakujące CLI z oficjalnego kanału jego dostawcy w przypiętej wersji, sprawdzonej względem przypiętej sumy sha256 lub wartości integrity z rejestru npm.
- **Znajome nazwy.** Dwa presety aliasów, wyłączone, dopóki ich nie włączysz: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) i `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), z których każdy to `ak <kind>`.

## Konta, limity i wybór konta

Od wersji `v1.0.1` każdy profil — łącznie z `@default` — jest niezależnym kontem we własnym katalogu w katalogu głównym profili, co zapobiega wyciekom stanu i kolizjom poświadczeń. `ak profiles` wyświetla je wraz ze stanem logowania i nazwami ich kluczy; `ak profiles --json` daje narzędziom tę samą listę (schemat `profiles-v1`). Od `v0.5.1` pokazuje, gdzie naprawdę jest token Claude Code — `file`, `keychain` (macOS), `none` lub `unknown` — sprawdzając wyłącznie jego obecność i nigdy nie odczytując sekretu, a także rozpoznaje logowanie Cursor na Linuksie, w kontenerze lub na hoście z Linuksem. Od `v0.5.2` `AGENTKIT_DEFAULT_PROFILE_<CLI>` wskazuje konto, którego używa samo `ak <cli>` (pozycyjny `@profile` nadal ma pierwszeństwo), i właśnie tak dev container wybiera konto hosta, które współdzieli. Od `v0.5.3` `ak codex` dodaje `--no-daemon`, gdy katalog domowy Codex współdzielony z inną maszyną odnotowuje demona w tle, którego nie ma na tej maszynie.

`ak usage` (także `ak status`) wyświetla każde konto każdego CLI znanego kitowi, jeden wiersz na konto i profil pod jego CLI: limit na żywo dla subskrypcji Claude Code (okna 5-godzinne, tygodniowe i per model), logowań Codex przez ChatGPT, kluczy planu programistycznego Z.AI oraz, od `v0.7.0`, logowań Google w Antigravity na Linuksie i w kontenerach (okno pięciogodzinne i tygodniowe z własnego panelu `/usage` agy). Konto, którego limitu nie da się odczytać, nadal ma swój wiersz: `n/d` z informacją, jak jest połączone i dlaczego — Cursor, Grok, xAI, Azure OpenAI, klucz API Gemini albo logowanie Antigravity przechowywane w pęku kluczy macOS — lub `no login` z poleceniem, które je loguje, więc tabela pokazuje też, które konta każdego CLI są połączone. Polecenie działa tylko do odczytu: nigdy nie odświeża logowania, nigdy nie wypisuje tokenu i nigdy nie zapisuje niczego w profilu. `--json` daje narzędziom tę samą listę (schemat `usage-v1`). Endpointy zużycia są wewnętrzne dla dostawców i nieoficjalne.

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

W przypadku długich, interaktywnych torów każdy tor działa w panelu [Herdr](/kit/herdr) na własnym koncie. Rozdział metodyki [Uruchamianie wielu agentów](/methodology/06-orchestration) opisuje cały model: prowadzący i jego tory, konta wybierane według zapasu, koordynacja przez herdr-peers oraz jedna gałąź i jedno wydanie na repozytorium; [Autonomia roju](/pl/methodology/07-swarm-autonomy) dodaje kontrole pojemności, przekazanie i sukcesję prowadzącego.

## Pojemność i dzierżawy

Od `v0.6.0` agent może tanio, na każdej granicy zadania, zapytać, ile zapasu ma jego własne konto — to sygnał, dzięki któremu rój przekazuje pracę dalej, zanim konto się wyczerpie ([Autonomia roju](/pl/methodology/07-swarm-autonomy)).

- **`ak capacity --self --json`** (schemat `capacity-v1`) podaje dla bieżącego konta `headroom_pct`, jego `binding_window`, `resets_at` oraz `verdict`: `ok`, `low` (25 % lub mniej), `critical` (10 % lub mniej albo ograniczenie szybkości) lub `unknown` (brak źródła limitów: Cursor, Grok lub Antigravity na macOS). Używa arytmetyki `ak pick`, więc oba nigdy się nie rozjeżdżają, i odczytuje pamięć podręczną zużycia przechowywaną przez 300 sekund (`--max-age`), dzięki czemu kontrola na każdej granicy zadania pozostaje tania. `--self` ustala konto, które uruchomiło `ak`; poza uruchomieniem przez `ak` kończy się kodem 3 i nigdy nie zgaduje. `ak usage` nadal odczytuje dane na żywo i odświeża pamięć podręczną.
- **Progi i ćwiczenia.** `AGENTKIT_CAPACITY_LOW` i `AGENTKIT_CAPACITY_CRITICAL` (lub `--low` i `--critical`) przesuwają progi. `AGENTKIT_CAPACITY_CAP=@<profile>=<pct>` może jedynie obniżyć odczyt — w ten sposób ćwiczenie sprawia, że konto wygląda na ubogie — i nigdy nie może sprawić, że wygląda na bogatsze.
- **`ak lease <kind> @<profile> --owner <addr>`** rezerwuje konto dla jednego toru; `ak lease release …` zwalnia je, gdy następca przyjmie przekazanie, a `ak lease ls` wyświetla dzierżawy (schemat `leases-v1`). Profil Codex przyjmuje jedną dzierżawę — jeden piszący na plik uwierzytelniania — i tylko właściciel zwalnia dzierżawę. Dzierżawy wygasają i są doradczymi zapisami liczb, nazw profili i adresów paneli, nigdy poświadczeniem.
- **`ak pick <kind> --owner <lead>`** liczy każdą aktywną dzierżawę, również własne dzierżawy właściciela: szereguje kandydatów według `headroom / (1 + leases)` i nigdy nie proponuje wydzierżawionego konta Codex, nawet jego posiadaczowi. `--reuse @<profile>` przekazuje dalej jedną z własnych dzierżaw właściciela, na przykład następcy toru. Bez `--owner` ranking się nie zmienia.

```bash
ak capacity --self --json                        # własny zapas i werdykt tego agenta
ak lease claude @work --owner local:w2:p1        # zarezerwuj konto dla toru
ak pick codex --owner local:w1:p1 --count 2      # pomiń konta wydzierżawione innym
```

Praca przemieszcza się wyłącznie między kontami, które zadeklarowałeś dla planu, w granicach warunków każdego dostawcy: żaden agent nie tworzy konta, nie odnawia logowania ani nie zużywa resetu Codex. Pakiet Deep Work Plan odczytuje werdykt przez własnego pomocnika i zamienia go na kontynuację, przygotowanie lub przekazanie; bez kitu albo ze starszą wersją pojemność jest raportowana jako nieznana, nigdy jako ok.

## Instalacja

```bash
git clone --branch v1.0.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Wymagania: `bash` na macOS lub Linuksie oraz `python3` 3.9 lub nowszy; nic więcej. Windows używa `install.ps1`. Przypnij `v1.0.1`: `v0.2.0` i `v0.2.1` nie są obsługiwane. Zweryfikuj wydanie za pomocą jego zasobu `SHA256SUMS`.

| Element | Wartość |
|---|---|
| Produkt | `DailybotHQ/coding-agents-kit`, tag `v1.0.1`, interfejs 1 |
| Klucz rejestru | `agentkit` w `.dwp/config.json` |
| Transport | headless: jedno `ak run` na delegata w dedykowanym git worktree |
| Zapewnia | `subagents`, `cancel_children`, `model_routing` |
| Wymaga | uprawnienia `agent_delegation` w kontrakcie planu |

**Stabilny od `v1.0.0`.** Publiczny interfejs kitu stosuje wersjonowanie semantyczne i zmienia się niekompatybilnie tylko w nowej wersji głównej: powierzchnia poleceń (`ak <kind> [@profile]` dla każdego rodzaju w `providers.toml` oraz każdy czasownik z udokumentowanymi flagami), polityka uprawnień, interfejs 1 (`ak doctor --json`, `ak env`, składnia i koperta `ak run`), schematy JSON (`doctor-v1`, `usage-v1`, `pick-v1`, `capacity-v1`, `leases-v1`, `profiles-v1`, `setup-probe-v1`, `setup-verify-v1`) oraz zainstalowany układ i nazwy zmiennych w pliku env. `v1.0.0` nie zmienia żadnego polecenia, flagi, klucza ani schematu względem `v0.7.1`.

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
