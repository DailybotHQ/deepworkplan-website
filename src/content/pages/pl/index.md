---
title: "Deep Work Plan — ustrukturyzowane wykonanie dla agentów kodujących AI"
description: "Kontekst liczy się bardziej niż modele. Deep Work Plan zamienia repozytorium w ustrukturyzowane środowisko, w którym agent kończy długą pracę."
lastUpdated: 2026-06-03
---

## Modele mają znaczenie. Kontekst ma znaczenie większe.

Deep Work Plan zamienia dowolne repozytorium w ustrukturyzowane środowisko — kontekst, zabezpieczenia i trwały plan — w którym dowolny agent kodujący wykonuje pracę z precyzją i doprowadza do końca zadania o długim horyzoncie.

Deep Work Plan (DWP) to otwarta metodyka i kit na licencji MIT, służące do planowania i wykonywania złożonej pracy programistycznej z agentami AI. Nie wybierasz metody instalacji ani nie kopiujesz szablonu — kopiujesz prompt init.md i wklejasz go do swojego agenta:

> Skopiuj prompt init.md i wklej go do swojego agenta kodowania — Claude Code, Cursor, Codex lub innego — aby uczynić dowolne repozytorium AI-first.

> Deep Work Plan to rozwój oparty na specyfikacji, w którym samo repozytorium staje się harnessem.

- [Otwórz prompt /init](/init)
- [Przeczytaj metodykę](/methodology)

---

## Problem i odpowiedź

Agenci kodujący AI są zdumiewająco skuteczni w krótkich zrywach. Przy pracy o długim horyzoncie — migracji, nowym podsystemie, refaktoryzacji obejmującej dziesiątki plików — dryfują: kontekst się zapełnia, decyzje są zapominane, a wielogodzinne zadania porzucane w połowie.

Deep Work Plan odpowiada **rozwojem opartym na specyfikacji**: plan jest trwałym źródłem prawdy, a agenci wykonują pracę względem jawnych kryteriów akceptacji i bramek walidacyjnych. Dryf spada, praca pozostaje weryfikowalna, a dowolny agent może ją wznowić między sesjami. W przeciwieństwie do narzędzi spec-driven związanych z jednym IDE lub dostawcą (GitHub Spec Kit, Amazon Kiro, Tessl), DWP jest niezależny od narzędzi i natywny dla repozytorium.

To także **inżynieria harnessu** uczyniona przenośną. Harness agenta to rusztowanie wokół modelu — kontekst, narzędzia, pętla sterująca, zabezpieczenia, wznawialny stan — które czyni go niezawodnym. Deep Work Plan instaluje ten harness w samym repozytorium, więc dowolny agent może sterować dowolnym repozytorium.

---

## Co otrzymujesz

- AGENTS.md w katalogu głównym repozytorium, przemyślany na podstawie twojego rzeczywistego stosu i komend.
- Skategoryzowane `docs/` oraz dokumentację poszczególnych modułów.
- Katalog `.agents/` (skille, agenci, komendy) z dowiązaniem `.claude` do `.agents`.
- Skill Deep Work Plan, instalowany raz dla każdego agenta — w tym sub-skill author, dzięki któremu repozytorium może rozwijać własne skille, agentów i komendy, plus opcjonalne dodatki, takie jak dependency-upgrade i frontendowy dodatek design-system.
- Wznawialne plany o długim horyzoncie w folderze `.dwp/` objętym gitignore.

---

## Co dzieje się po uruchomieniu

1. **Twój agent otwiera [/init.md](/init.md)** — czyta prompt onboardingowy oraz metodykę, specyfikację i kit, do których odsyła.
2. **Instaluje skill Deep Work Plan** — silnik, identyczny w każdym repozytorium: router oraz jego sub-skille (create, execute, refine, resume, status, verify, onboard, author), dla Claude Code, Cursor, Codex, Gemini i Copilot.
3. **Dostosowuje twoje repozytorium** — analizując twój rzeczywisty stos (nigdy nie kopiując-wklejając), pisze AGENTS.md, `docs/`, README poszczególnych modułów, przemyślany kit `.agents/` oraz `.dwp/` objęty gitignore. Twoje repozytorium staje się harnessem.
4. **Planujesz i wykonujesz** — Deep Work Plany o długim horyzoncie, uruchamiane krok po kroku względem jawnych kryteriów akceptacji i bramek walidacyjnych, autonomicznie przez wiele godzin.

Skill jest silnikiem wielokrotnego użytku, instalowanym wszędzie tak samo; tym, co podlega dostosowaniu, jest twoje repozytorium. Mechanika instalacji (Skills CLI, OpenClaw lub git clone) znajduje się w promptcie [/init.md](/init.md) oraz w [szybkim starcie](/quickstart).

---

## Metodyka, specyfikacja i kit

- [Przeczytaj metodykę](/methodology) — czym jest DWP, zasady, przepływ pracy i jak go przyjąć.
- [Przeczytaj specyfikację](/spec) — anatomia zadania, bramki walidacyjne, protokół ukończenia, archetypy i dodatki.
- [Poznaj kit](/kit) — presety, adaptery i komendy do instalowania DWP w repozytorium.
- [Zobacz przykłady](/examples) — przejścia przed-i-po dotyczące rzeczywistej pracy inżynierskiej.

---

## Kto go tworzy

Deep Work Plan wyrósł z rzeczywistej pracy inżynierskiej w [Dailybot](https://www.dailybot.com) i jest utrzymywany przez Dailybot wspólnie ze społecznością open-source.

- [O metodyce](/about)
- [Społeczność i kontakt](/contact)
- [Repozytorium GitHub](https://github.com/DailybotHQ/deepworkplan-website)
