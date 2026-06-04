---
title: "O metodyce"
description: "Deep Work Plan to otwarta, niezależna od frameworków metodyka poważnej pracy inżynierskiej z agentami kodującymi AI. Skąd się wzięła i kto ją utrzymuje."
lastUpdated: 2026-05-30
---

## Czym jest

Deep Work Plan (DWP) to metodyka, a nie produkt. Definiuje, jak zamienić cel w uzgodniony plan, rozbić ten plan na zadania atomowe i niezależnie weryfikowalne oraz wykonać każde zadanie w skupionej pętli zakończonej kontrolą.

To metodyka oparta na specyfikacji: plan jest trwałym źródłem prawdy, a agenci wykonują pracę względem jawnych kryteriów akceptacji i bramek walidacyjnych. W przeciwieństwie do systemów spec-driven związanych z konkretnym narzędziem, takich jak GitHub Spec Kit, Amazon Kiro czy Tessl, DWP jest niezależny od narzędzi i natywny dla repozytorium. To także inżynieria harnessu uczyniona przenośną — kontekst, zabezpieczenia i wznawialny stan, które czynią agenta niezawodnym, są instalowane w samym repozytorium (AGENTS.md, docs, dom skilli .agents/, skill DWP), więc dowolny agent może sterować dowolnym repozytorium.

Jest celowo agnostyczny co do tego, którego agenta AI czy stosu używasz — adaptery przekładają tę samą podstawową pętlę na Claude, Cursor, Copilot, Codex, Gemini i inne. Plan, zadania i dziennik wykonania to czysty Markdown, więc praca pozostaje czytelna, gotowa do recenzji i objęta kontrolą wersji.

---

## Podstawowe zasady

- **Plan przed wykonaniem** — Żaden kod nie powstaje, dopóki plan nie zostanie uzgodniony. Plan jest umową między tobą a agentem. [Przeczytaj metodykę](/methodology)
- **Zadania są atomowe** — Każde zadanie ma taki zakres, by można je było wykonać i zweryfikować samodzielnie, a następnie zacommitować atomowo. [Zobacz specyfikację](/spec)
- **Weryfikuj wszystko** — Każde zadanie kończy się jawną kontrolą, zanim rozpocznie się następne, a postęp jest zapisywany w git. [Poznaj kit](/kit)

---

## W skrócie

- Otwarta metodyka na licencji MIT
- Niezależna od frameworków i agentów
- Utrzymywana przez Dailybot i społeczność
- Zawiera specyfikację, komendy, adaptery, presety i przykłady
- Wyłącznie Markdown — bez runtime'u, bez uzależnienia od dostawcy
- Zamienia dowolne repozytorium w bazę kodu AI-first, sterowalną przez agenta

---

## Kto ją utrzymuje

Deep Work Plan wyrósł z rzeczywistej pracy inżynierskiej w [Dailybot](https://www.dailybot.com) i jest teraz utrzymywany przez Dailybot wspólnie ze społecznością open-source. Metodyka, specyfikacja i kit są wydane na licencji MIT — można ich swobodnie używać, dostosowywać je i na nich budować.

- [Przeczytaj metodykę](/methodology)
- [Szybki start](/quickstart)
- [Repozytorium GitHub](https://github.com/DailybotHQ/deepworkplan-website)
