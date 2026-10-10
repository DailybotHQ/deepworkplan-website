---
title: Devcontainer
description: "Opcjonalny addon oparty na devcontainer-kit: własny kontener deweloperski każdego repozytorium z jednego szablonu, agenci przez ak, Herdr w obie strony."
kind: addon
lang: pl
order: 1
---

# Addon Devcontainer

Zapewnij repozytorium powtarzalny, odizolowany kontener deweloperski — taki, z którego mogą korzystać ludzie, edytory i agenci kodujący. W **DWP v7** (pakiet `v7.1.0`) ten addon integruje **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, produkt na licencji MIT działający bez Deep Work Plan. Jest opcjonalny: repozytorium bez niego jest w pełni zgodne.

## Co zapewnia devcontainer-kit

- **Szablon** oparty na specyfikacji [Dev Containers](https://containers.dev), który `dck init` renderuje w repozytorium w jednym stałym układzie: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` i `dev.sh`. Uruchomiony ponownie później uzgadnia zmiany i nigdy nie nadpisuje Twoich edycji; każda zmiana istniejącego pliku jest najpierw pokazywana i wymaga zgody.
- **Własny kontener repozytorium.** Dockerfile zaczyna od oficjalnego obrazu środowiska uruchomieniowego przypiętego przez digest — `node-24`, `python-3.13` lub `debian` — i kopiuje kroki budowania kitu do `docker/local/<service>/dck/`. Nie jest używany żaden wspólny obraz bazowy.
- **`dev.sh` i `dck`.** `bash dev.sh up` buduje, uruchamia i podłącza kontener ze zwykłego terminala; `shell`, `rebuild`, `doctor` i pozostałe polecenia działają z VS Code lub Cursor albo bez nich.
- **Herdr w obie strony.** [Herdr](https://herdr.dev) na hoście dołącza każdy kontener jako maszynę przez serwer SSH nasłuchujący wyłącznie na loopbacku, a kontener otwiera się ze standardowym paskiem bocznym: Home, Editor, Development i Agents. Wewnątrz [herdr-peers](/kit/herdr) pozwala agentom zwracać się do agentów na hoście i w innych kontenerach.
- **Skill `dck-dockerfile`.** Agent na żądanie tworzy lub regeneruje kontener repozytorium i potwierdza go rzeczywistym buildem.

## Instalacja

```bash
git clone --branch v0.2.1 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Wymagania: `bash` 3.2 lub nowszy oraz `python3` 3.11 lub nowszy na hoście z Linuksem lub macOS, a także Docker z Compose v2 dla poleceń kontenera. Zweryfikuj wydanie za pomocą jego zasobu `SHA256SUMS`. Przypnij `v0.2.1`: `v0.2.0` nie jest obsługiwane.

| Element | Wartość |
|---|---|
| Produkt | `DailybotHQ/devcontainer-kit`, tag `v0.2.1`, interfejs 2 |
| Klucz rejestru | `devcontainer` w `.dwp/config.json` |
| Konfiguracja repozytorium | `.devcontainer/dck.toml` |
| Wykrywanie | `dck doctor --json` |

## Warstwy

Każdy kontener zawiera narzędzia deweloperskie — git, gh, ripgrep, serwer SSH, Herdr i herdr-peers — i żadnego sekretu. Reszta to warstwa, którą wybierasz w `dck.toml`:

| Warstwa | Domyślnie | Co dodaje |
|---|---|---|
| `agents` | wył. | [coding-agents-kit](/kit/agentkit) z jego zweryfikowanego wydania i wymienione przez Ciebie CLI, każde z własnym trwałym wolumenem, a także presety `classic` (`claudex`, `codexx`, …) i `providers` (`claude-glm`, `codex-azure`, …). Agenci domyślnie działają w trybie autonomii — piaskownicą jest kontener. Rezygnacja: `AGENTKIT_PERMISSIONS=ask` w pliku `.env` usługi. |
| `editor` | wł. | Neovim z [DeepWorkPlan Vim](/kit/vim) przypiętym po tagu; wyłączenie daje zwykły edytor. |
| `dailybot` | wył. | CLI Dailybot, dla addonu dailybot. |

Zalogowania, `gh`, konfiguracja Herdr i tożsamość git przetrwają `bash dev.sh rebuild`.

## Domyślne ustawienia bezpieczeństwa

- Każdy publikowany port wiąże się z `127.0.0.1`, chyba że `dck.toml` ustawia `bind`.
- Git przez SSH działa przez agenta SSH hosta — jego gniazdo, nigdy plik klucza i nigdy zamontowany `~/.ssh` ani `~/.gitconfig`. Tożsamość git pochodzi z wartości `DCK_GIT_*`, które wypełnia `dck setup`.
- Klucze hosta SSH są generowane w czasie działania do wolumenu danego projektu i nigdy nie są wbudowywane w obraz; serwer akceptuje tylko klucze publiczne, bez logowania jako root i bez haseł.
- Szablon nie dodaje `cap_add`, trybu `privileged` ani gniazda Dockera.
- Każde pobranie jest przypięte do wersji i weryfikowane sumą kontrolną; obraz bazowy jest przypięty przez digest.
- Sieć Herdr, przez którą agenci w jednym kontenerze docierają do pozostałych, jest domyślnie włączona i opisana wraz ze sposobami jej wyłączenia w modelu zagrożeń kitu.

## Uwagi

Opcjonalny i nigdy niewymagany. Repozytorium bez opcjonalnych addonów jest w pełni zgodne. v0.2 obsługuje hosty z Linuksem i macOS; sieć między kontenerami wymaga Docker Desktop.
