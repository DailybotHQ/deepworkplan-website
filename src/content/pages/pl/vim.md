---
title: "DeepWorkPlan Vim"
description: "DeepWorkPlan Vim to edytor terminalowy Deep Work Plan: konfiguracja Neovim 0.12+ z generowanym indeksem poleceń, przeglądarką planów i przeglądarką Markdown."
lastUpdated: 2026-10-03
---

## Czym jest

Konfiguracja Neovim dla ludzi i agentów programistycznych żyjących w terminalu — Twoje plany Deep Work Plans, dokumentacja i indeks poleceń na wyciągnięcie jednego klawisza.

## Instalacja

Jedna linia instaluje DeepWorkPlan Vim jako Twoją konfigurację Neovim. Instalator wyjaśnia, co zrobi, i pyta, zanim dotknie istniejącej konfiguracji.

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

Najpierw zgoda: istniejąca konfiguracja Neovim nigdy nie zostanie nadpisana bez Twojej wyraźnej zgody. Instalator się zatrzymuje i pokazuje ścieżkę ręczną.

W systemie Windows polecenie jednowierszowe nie ma zastosowania; ścieżkę ręczną opisano w README repozytorium. [Ścieżka instalacji w Windows](https://github.com/DailybotHQ/deepworkplan-vim#install-host)

## Co robi

Pięć funkcji, celowo w wąskim zakresie. Każda odpowiada skrótowi klawiszowemu, który możesz sprawdzić w generowanym indeksie poleceń.

| Funkcja | Co to jest | Przypisanie |
|---|---|---|
| Generowany indeks poleceń | Indeks poleceń jest generowany z aktywnej konfiguracji, więc lista skrótów jest zawsze aktualna. | `SPC h h` |
| Gesty w stylu VS Code | Gesty edycji ukształtowane przez edytory graficzne: zaznacz wszystko i skopiuj do systemowego schowka. | `<C-a>`, `y`, `<leader>y` |
| Przeglądarka Deep Work Plan | Panel przeglądający plany w repozytorium — czytaj plan, jego zadania i ich bramy walidacji, nie opuszczając edytora. | `SPC P` |
| Przeglądarka Markdown | Podgląd Markdown w przeglądarce lub renderowanie w buforze — dokumentacja i plany zostają tam, gdzie dzieje się praca. | `SPC m p`, `SPC m r` |
| Instalator jednej linii | Samodzielny instalator dla macOS i Linux, z opisaną ręczną ścieżką dla Windows. | — |

## Wymagania

- Neovim 0.12 lub nowszy, z dostępnym Lua (lua, lua5.4 lub luajit)
- macOS i Linux; Windows obsługiwany przez opisaną ścieżkę ręczną
- Licencja GPL-3.0 — wolno używać, badać i modyfikować

## Materiały powiązane

- [Przeczytaj dokument dodatku w kicie](/kit/vim)
- [Zobacz repozytorium źródłowe](https://github.com/DailybotHQ/deepworkplan-vim)
- Zainstaluj DeepWorkPlan Vim, otwórz Neovim i czytaj swoje Deep Work Plans w tym samym terminalu, w którym pracują Twoi agenci.
