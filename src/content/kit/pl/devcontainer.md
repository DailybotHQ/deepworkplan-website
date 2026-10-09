---
title: Devcontainer
description: "Opcjonalny addon oparty na devcontainer-kit: szablon Dev Containers renderowany przez dck init, obrazy bazowe bez agentów i maszyny Herdr dla każdego kontenera."
kind: addon
lang: pl
order: 1
---

# Addon Devcontainer

Zapewnij repozytorium powtarzalny, odizolowany kontener deweloperski — taki, z którego mogą korzystać ludzie, edytory i agenci kodujący. W **wersji beta DWP v7** (`v7.0.0-beta.1`, wydanie przedpremierowe) ten addon integruje **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, produkt na licencji MIT działający bez Deep Work Plan, i zastępuje szablon, który dotąd zawierał pakiet. Jest opcjonalny: repozytorium bez niego jest w pełni zgodne.

## Co zapewnia devcontainer-kit

- **Szablon** oparty na specyfikacji [Dev Containers](https://containers.dev), który `dck init` renderuje w repozytorium: `devcontainer.json`, plik compose i `docker/local/`. Uruchomiony ponownie później uzgadnia zmiany i nigdy nie nadpisuje Twoich edycji; każda zmiana istniejącego pliku jest najpierw pokazywana i wymaga zgody.
- **`dck`**, launcher uruchamiający kontener ze zwykłego terminala — `setup`, `up`, `shell`, `ssh`, `rebuild`, `doctor` — z VS Code lub Cursor albo bez nich.
- **Obrazy bazowe** w trzech wariantach, `python-3.13`, `node-24` i `debian`, dostarczane **bez** agentów kodujących.
- **Biblioteka entrypointów** dla trwałych wolumenów, SSH i środowiska sesji SSH, zamiast ręcznie kopiowanego entrypointu w każdym repozytorium.
- **Maszyny Herdr.** Każdy kontener może dołączyć do [Herdr](https://herdr.dev) przez serwer SSH nasłuchujący wyłącznie na loopbacku, dzięki czemu agenci w nim stają się osiągalnymi peerami.

## Instalacja

```bash
git clone --branch v0.1.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

Wymagania: `bash` 3.2 lub nowszy oraz `python3` 3.11 lub nowszy na hoście z Linuksem lub macOS, a także Docker z Compose v2 dla poleceń kontenera. Zweryfikuj wydanie za pomocą jego zasobu `SHA256SUMS`.

| Element | Wartość |
|---|---|
| Produkt | `DailybotHQ/devcontainer-kit`, tag `v0.1.2`, interfejs 1 |
| Klucz rejestru | `devcontainer` w `.dwp/config.json` |
| Konfiguracja repozytorium | `.devcontainer/dck.toml` |
| Wykrywanie | `dck doctor --json` |

## Warstwy są opt-in

Obrazy bazowe zawierają narzędzia deweloperskie — git, gh, ripgrep, serwer SSH, Herdr oraz Neovim z DeepWorkPlan Vim przypiętym po tagu — i żadnego agenta kodującego, żadnego CLI do raportowania ani żadnego sekretu. Wszystko inne to warstwa, którą włączasz w `dck.toml`:

| Warstwa | Domyślnie | Co dodaje |
|---|---|---|
| `agents` | wył. | Instaluje [coding-agents-kit](/kit/agentkit) i wymienione przez Ciebie CLI, każde z własnym trwałym wolumenem. Nie jest ustawiana żadna flaga omijania uprawnień. |
| `editor` | wł. | Neovim z DeepWorkPlan Vim; wyłączenie daje zwykły edytor. |

## Domyślne ustawienia bezpieczeństwa

- Każdy publikowany port wiąże się z `127.0.0.1`, chyba że `dck.toml` ustawia `bind`.
- Przekazywanie agenta SSH z hosta; prywatne klucze hosta nigdy nie są kopiowane do kontenera.
- Klucze hosta SSH są generowane w czasie działania do wolumenu danego projektu i nigdy nie są wbudowywane w obraz; serwer akceptuje tylko klucze publiczne, bez logowania jako root i bez haseł.
- Szablon nie dodaje `cap_add`, trybu `privileged` ani gniazda Dockera.
- Obrazy bazowe i narzędzia są przypięte do wersji i weryfikowane sumą kontrolną; compose odwołuje się do obrazu bazowego przez digest, ilekroć da się go ustalić.

## Uwagi

Opcjonalny i nigdy niewymagany. Repozytorium bez opcjonalnych addonów jest w pełni zgodne. v0.1 obsługuje hosty z Linuksem i macOS.
