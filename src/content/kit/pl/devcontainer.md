---
title: Devcontainer
description: "Opcjonalny addon, który dodaje lub uzgadnia devcontainer oparty na compose z wykrytego stacku, z trwałym uwierzytelnianiem AI-CLI przetrwającym przebudowy."
kind: addon
lang: pl
order: 1
---

# Addon Devcontainer

Dodaj do repozytorium powtarzalny, odizolowany kontener deweloperski. Pierwszy opcjonalny addon Deep Work Plan.

## Co dodaje

- Devcontainer oparty na compose, z obrazem bazowym i usługami pomocniczymi wywnioskowanymi z wykrytego stacku.
- Trwałe woluminy uwierzytelniania AI-CLI (Claude, Codex, Cursor, gh, Dailybot), które przetrwają przebudowy.
- Sieć `dailybot-project-network`, konwencję `DOCKER_DEV_ENV=vscode` oraz aliasy walidacji (`codecheck`, `check`, `fix`, `test`).
- Dla repozytoriów publicznych — plik `.dockerignore` wykluczający sekrety oraz `.env.example` bez sekretów.

## Zachowanie

Około 85% devcontainera to stabilny, wspólny szkielet; pozostałe 15% — obraz bazowy, użytkownik, folder workspace, usługi, porty, sekrety — jest wywnioskowane z rzeczywistego stacku repozytorium. Istniejący devcontainer zostaje uzgodniony, nigdy nadpisany.

## Uwagi

Opcjonalny i nigdy nie wymagany. Repozytorium jest w pełni zgodne nawet bez żadnego addonu.
