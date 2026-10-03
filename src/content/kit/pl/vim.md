---
title: DeepWorkPlan Vim
description: "Opcjonalny addon DWP: DeepWorkPlan Vim, edytor terminalowy Deep Work Plan — wygenerowany indeks poleceń, przeglądanie planów i czytanie Markdown w Neovim."
kind: addon
lang: pl
order: 6
---

# Addon DeepWorkPlan Vim

**DeepWorkPlan Vim** to edytor terminalowy Deep Work Plan: konfiguracja Neovim (to sam edytor, nie plik repozytorium), która stawia robocze powierzchnie metodologii na wyciągnięcie jednego klawisza. Tam, gdzie pozostałe wpisy zestawu instalują harness w repozytorium, ten addon wyposaża człowieka — i każdego agenta prowadzącego Neovim w trybie headless — w edytor, który włada DWP natywnie.

Wymaga **Neovim 0.12 lub nowszego**, działa na **macOS i Linux** (Windows jest obsługiwany przez udokumentowaną ścieżkę ręczną) i jest na licencji **GPL-3.0** — wolny do używania, studiowania i modyfikacji.

## Co dodaje

| # | Funkcja | Co robi | Mapowanie |
|---|---------|--------------|---------|
| F1 | **Generowany indeks poleceń** | Cały edytor, wypisany: każde polecenie ze swoim mapowaniem i jednolinijkowym opisem, generowany z żywej konfiguracji, więc indeks nie może odjechać od edytora. | `SPC h h` |
| F2 | **Gesty w stylu VS Code** | Zaznacz wszystko, kopiuj i yank do schowka pod akordami, które pamięć mięśniowa już zna. | `<C-a>`, `y`, `<leader>y` |
| F3 | **Przeglądarka Deep Work Plan** | Otwiera plan, który prowadzi repozytorium — zadania, bramy i stan ukończenia — bez wychodzenia z edytora. | `SPC P` |
| F4 | **Przeglądarka Markdown** | Czyta Markdown tak, jak czytają agenty: wyrenderowany podgląd albo surowe źródło dla wierności kopiuj-wklej. | `SPC m p`, `SPC m r` |
| F5 | **Instalator jednej linii** | `install.sh` zgodny z zasadą zgody dla macOS i Linux; udokumentowana ścieżka ręczna obejmuje Windows. | `curl -fsSL https://deepworkplan.com/vim/install.sh \| bash` |

## Instalacja

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

Instalator jest **zgodny z zasadą zgody**: istniejąca, obca konfiguracja Neovim nigdy nie jest nadpisywana. Wpompowany bez terminala, przerywa z instrukcjami zamiast czegokolwiek dotykać; interaktywnie pyta, zanim odłoży istniejącą konfigurację na bok. Wtyczki instalują się w headless przy pierwszym uruchomieniu — bez tańca zamykania i otwierania od nowa.

Windows nie jest celem `curl | bash`. Udokumentowana ścieżka ręczna (winget plus Git Bash, albo WSL) mieszka w README repozytorium.

Pełna powierzchnia, bez zrzutów ekranu i ograniczona do kontraktu: [strona /vim](/vim).

## Kiedy sięgać

| Sygnał | Działanie |
|--------|--------|
| Deweloper żyje w terminalu i prowadzi repozytorium planem | **Zaproponuj** addon |
| Długohoryzontalne wykonanie DWP, gdzie przeglądarka planów (`SPC P`) trzyma stan na widoku | **Zarekomenduj** |
| Edytor dewelopera jest już skonfigurowany i nie podlega negocjacjom | **Pomiń** — addon jest opt-in z założenia |
| Zespół wyłącznie Windows bez WSL | **Pomiń** albo wskaż udokumentowaną ścieżkę ręczną |

## Powiązane wpisy zestawu

- [Devcontainer](/kit/devcontainer) — odtwarzalne środowisko deweloperskie (pierwszy addon)
- [Dailybot](/kit/dailybot) — raportowanie cyklu życia planu widoczne dla zespołu (drugi addon)
- [AI Diff Reviewer](/kit/ai-diff-reviewer) — lokalny przegląd podczas Final Reviews planu (piąty addon)
