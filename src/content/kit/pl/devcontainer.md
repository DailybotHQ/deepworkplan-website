---
title: Devcontainer
description: "Powtarzalny kontener deweloperski dla każdego repozytorium z jednego szablonu: agenci na kontach hosta przez ak, Herdr w obie strony, klucze SSH na żądanie."
kind: addon
lang: pl
order: 1
---

# Addon Devcontainer

Zapewnij repozytorium powtarzalny, odizolowany kontener deweloperski — taki, z którego mogą korzystać ludzie, edytory i agenci kodujący. W **DWP v7** (pakiet `v7.6.2`) ten addon integruje **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, produkt na licencji MIT działający bez Deep Work Plan. Jest opcjonalny: repozytorium bez niego jest w pełni zgodne.

## Co zapewnia devcontainer-kit

- **Szablon** oparty na specyfikacji [Dev Containers](https://containers.dev), który `dck init` renderuje w repozytorium w jednym stałym układzie: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` i `dev.sh`. Uruchomiony ponownie później uzgadnia zmiany i nigdy nie nadpisuje Twoich edycji; każda zmiana istniejącego pliku jest najpierw pokazywana i wymaga zgody.
- **Własny kontener repozytorium.** Dockerfile zaczyna od oficjalnego obrazu środowiska uruchomieniowego przypiętego przez digest — `node-24`, `python-3.13` lub `debian` — i kopiuje kroki budowania kitu do `docker/local/<service>/dck/`. Nie jest używany żaden wspólny obraz bazowy.
- **`dev.sh` i `dck`.** `bash dev.sh up` buduje, uruchamia i podłącza kontener ze zwykłego terminala; `shell`, `rebuild`, `doctor` i pozostałe polecenia działają z VS Code lub Cursor albo bez nich.
- **Herdr w obie strony.** [Herdr](https://herdr.dev) na hoście dołącza każdy kontener jako maszynę przez serwer SSH nasłuchujący wyłącznie na loopbacku, a kontener otwiera się ze standardowym paskiem bocznym: App, Editor, Development i Agents. Każda przestrzeń robocza i każdy panel, także otwarte później, startują w ścieżce aplikacji (domyślnie `/app`). Wewnątrz [herdr-peers](/kit/herdr) pozwala agentom zwracać się do agentów na hoście i w innych kontenerach.
- **Skill `dck-dockerfile`.** Agent na żądanie tworzy lub regeneruje kontener repozytorium i potwierdza go rzeczywistym buildem.

## Instalacja

```bash
git clone --branch v0.3.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Wymagania: `bash` 3.2 lub nowszy oraz `python3` 3.11 lub nowszy na hoście z Linuksem lub macOS, a także Docker z Compose v2 dla poleceń kontenera. Zweryfikuj wydanie za pomocą jego zasobu `SHA256SUMS`. Przypnij `v0.3.2`: `v0.2.0` nie jest obsługiwane.

| Element | Wartość |
|---|---|
| Produkt | `DailybotHQ/devcontainer-kit`, tag `v0.3.2`, interfejs 2 |
| Klucz rejestru | `devcontainer` w `.dwp/config.json` |
| Konfiguracja repozytorium | `.devcontainer/dck.toml` |
| Wykrywanie | `dck doctor --json` |

## Warstwy

Każdy kontener zawiera narzędzia deweloperskie — git, gh, ripgrep, serwer SSH, Herdr i herdr-peers — i żadnego sekretu, chyba że włączysz [konta hosta](#konta-hosta-wewnątrz-kontenera). Reszta to warstwa, którą wybierasz w `dck.toml`:

| Warstwa | Domyślnie | Co dodaje |
|---|---|---|
| `agents` | wył. | [coding-agents-kit](/kit/agentkit) z jego zweryfikowanego wydania i wymienione przez Ciebie CLI, każde z własnym trwałym wolumenem, a także presety `classic` (`claudex`, `codexx`, …) i `providers` (`claude-glm`, `codex-azure`, …). Agenci domyślnie działają w trybie autonomii — piaskownicą jest kontener. Rezygnacja: `AGENTKIT_PERMISSIONS=ask` w pliku `.env` usługi. |
| `editor` | wł. | Neovim z [DeepWorkPlan Vim](/kit/vim) przypiętym po tagu; wyłączenie daje zwykły edytor. |
| `dailybot` | wył. | CLI Dailybot, dla addonu dailybot. |

Zalogowania, `gh`, konfiguracja Herdr i tożsamość git przetrwają `bash dev.sh rebuild`. Z warstwą `agents` obraz zawiera też trzy skille coding-agents-kit (`agentkit`, `agentkit-setup`, `agentkit-orchestrate`), linkowane przy każdym starcie do katalogu skilli każdego agenta, więc odtworzony kontener je zachowuje.

Wolumen stanu (klucz hosta SSH, `~/.ssh`, logowanie `gh`, stan klienta Herdr, historia) nazywa się `state`. Gdy kilka usług współdzieli jeden projekt compose, nadaj każdej własną nazwę przez `[compose] state_volume` w `dck.toml` (lub `dck init --state-volume NAME`); w przeciwnym razie wszystkie montują ten sam wolumen, a `dck doctor` to zgłasza.

## Agenci na wielu maszynach

Od `v0.2.3` `dck up` zestawia dwukierunkową sieć bez żadnego ręcznego kroku, w Docker Desktop:

- **Kontenery i host.** Agenci wewnątrz docierają do agentów Herdr na hoście, w każdym innym kontenerze dck i w pozostałych kontenerach loopback, którymi Herdr na hoście już zarządza — a tamci docierają z powrotem. Każdy peer ma przypięty klucz hosta; nic nie jest zaufane przy pierwszym użyciu.
- **Opcjonalny listener na hoście.** `dck setup` jednorazowo proponuje serwer SSH na poziomie użytkownika na `127.0.0.1`, który akceptuje wyłącznie klucz dck i jest utrzymywany w działaniu przez launchd (macOS). Jeśli już uruchamiasz listener loopback, wskaż go zamiast tego w profilu hosta. `dck host listener disable` go usuwa.
- **Przetrwa przebudowy.** Katalog maszyn Herdr kontenera znajduje się na wolumenie, więc `bash dev.sh rebuild` zachowuje każdą zarejestrowaną w nim maszynę. Od `v0.3.2` `rebuild`, `start` i `restart` wykonują te same kroki co `up`: kontener zostaje ponownie zarejestrowany w Herdr hosta, jego klucz hosta ponownie przypięty, a konfiguracja sieci rozesłana do peerów, więc kontener zbudowany od zera od razu dociera do hosta i swoich peerów.
- **Panele Codex wewnątrz kontenera.** W `v0.3.2` agent Codex wewnątrz kontenera ustawia `HERDR_PEERS_SELF` na identyfikator maszyny kontenera zapisany na hoście, zanim zapyta peerów na innych maszynach: zlecenie lidera podaje ten identyfikator, a w jednym z kolejnych wydań kit będzie ustawiał tę zmienną sam.
- **Odpowiedzi także z hosta.** `dck setup` instaluje na hoście zweryfikowany [herdr-peers](/kit/herdr), więc `dck agents` i `dck ask` działają również tam, a agenci hosta odpowiadają przez `herdr-peers reply`.
- **Kontenery, których kit nie utworzył.** Wypisz klucze publiczne, którymi się logują, w `[ssh] authorized_extra` w profilu hosta, a one również będą mogły docierać do kontenerów dck.

Połącz go z [coding-agents-kit](/kit/agentkit) na hoście i w kontenerze, a to samo `ak` uruchamia agentów po obu stronach.

## Konta hosta wewnątrz kontenera

Kontener może korzystać z kont, które masz już na hoście — tak jak git już działa przez agenta SSH hosta — bez logowania w środku. To opcja do włączenia, zapisana w Twoim **profilu hosta**, nigdy w `dck.toml` repozytorium:

```toml
[agents]
host_profiles = true          # domyślnie false
host_env_keys = ["ZAI_CODING_API_KEY"]   # lista dozwolonych nazw zmiennych do udostępnienia
```

Przy włączonym `host_profiles` polecenie `dck up` udostępnia tylko profile CLI instalowanych przez repozytorium:

- **Claude Code** przez długoterminowy token na profil: `CLAUDE_CODE_OAUTH_TOKEN` dla `@default` i `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>` dla `@name` (sufiks wielkimi literami, każdy znak spoza `A-Z`, `0-9` i `_` zamieniony na `_`).
- **Codex** przez swój plik uwierzytelniania, dla `@default` i dla każdego profilu.
- **Plik env kitu**, tylko do odczytu i ograniczony do nazw z `host_env_keys`.

Cały katalog domowy agentkit nigdy nie jest montowany, a profile zawierające bezwzględne ścieżki hosta są pomijane. Logowanie Codex udostępnione do odczytu i zapisu może zostać odświeżone przez dwóch piszących naraz: utrzymuj jednego aktywnego agenta na konto Codex. Wewnątrz kontenera to samo `ak <kind> @<profile>` działa na tym samym koncie co na hoście, dzięki czemu prowadzący może przekazać torom w kontenerach konta wybrane przez `ak pick` — zobacz [Uruchamianie wielu agentów](/methodology/06-orchestration).

## Klucze SSH hosta wewnątrz kontenera

Niektóre narzędzia czytają wyłącznie pliki kluczy i ignorują przekazanego agenta: na przykład `gh auth login` proponuje wygenerowanie nowego klucza. Od `v0.3.2` możesz to włączyć, wyłącznie w Twoim **profilu hosta** (`dck.toml` repozytorium nie może tego ustawić; `dck setup` pyta raz, domyślnie nie):

```toml
[ssh]
copy_keys = true              # default false
```

Gdy opcja jest włączona, `dck up` montuje `~/.ssh` hosta tylko do odczytu w `~/.ssh_host`, a każdy start kopiuje jego klucze `id_*` do `~/.ssh` kontenera (klucze prywatne `0600`), utrzymując je w zgodzie z hostem. Przekazywanie agenta pozostaje bez zmian, a wyłączenie opcji usuwa kopie przy następnym starcie. Koszt: cały `~/.ssh` hosta jest czytelny wewnątrz kontenera, a klucze prywatne spoczywają w wolumenie stanu.

## Domyślne ustawienia bezpieczeństwa

- Każdy publikowany port wiąże się z `127.0.0.1`, chyba że `dck.toml` ustawia `bind`.
- Git przez SSH działa przez agenta SSH hosta — jego gniazdo, nigdy plik klucza i nigdy zamontowany `~/.ssh` ani `~/.gitconfig`, chyba że w Twoim profilu hosta włączono [`copy_keys`](#klucze-ssh-hosta-wewnątrz-kontenera). Tożsamość git pochodzi z wartości `DCK_GIT_*`, które wypełnia `dck setup`.
- Klucze hosta SSH są generowane w czasie działania do wolumenu danego projektu i nigdy nie są wbudowywane w obraz; serwer akceptuje tylko klucze publiczne, bez logowania jako root i bez haseł.
- Szablon nie dodaje `cap_add`, trybu `privileged` ani gniazda Dockera.
- Każde pobranie jest przypięte do wersji i weryfikowane sumą kontrolną; obraz bazowy jest przypięty przez digest.
- Sieć Herdr, przez którą agenci w jednym kontenerze docierają do pozostałych, jest domyślnie włączona i opisana wraz ze sposobami jej wyłączenia w modelu zagrożeń kitu. Listener na hoście pozwala kodowi w działającym kontenerze otworzyć powłokę na hoście jako ty: wymaga świadomego włączenia, działa tylko na loopback, akceptuje wyłącznie klucz dck i usuwa się go poleceniem `dck host listener disable`.

## Uwagi

Opcjonalny i nigdy niewymagany. Repozytorium bez opcjonalnych addonów jest w pełni zgodne. v0.2 obsługuje hosty z Linuksem i macOS; sieć między kontenerami wymaga Docker Desktop.
