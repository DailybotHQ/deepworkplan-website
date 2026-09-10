---
title: "Deep Work Plan — ustrukturyzowane wykonanie dla agentów kodujących AI"
description: "Kontekst liczy się bardziej niż modele. Deep Work Plan zamienia repozytorium w ustrukturyzowane środowisko, w którym agent kończy długą pracę."
lastUpdated: 2026-09-10
---

## Modele mają znaczenie. Kontekst ma znaczenie większe.

Deep Work Plan zamienia dowolne repozytorium w ustrukturyzowane środowisko — kontekst, zabezpieczenia i trwały plan — w którym dowolny agent kodujący wykonuje pracę z precyzją i doprowadza do końca zadania o długim horyzoncie.

Deep Work Plan (DWP) to otwarta metodyka i kit na licencji MIT, służące do planowania i wykonywania złożonej pracy programistycznej z agentami AI. Nie wybierasz metody instalacji ani nie kopiujesz szablonu — kopiujesz prompt init.md i wklejasz go do swojego agenta:

> Skopiuj prompt init.md i wklej go do swojego agenta kodowania — Claude Code, Cursor, Codex lub innego — aby uczynić dowolne repozytorium AI-first.

> Deep Work Plan to rozwój oparty na specyfikacji, w którym samo repozytorium staje się harnessem.

- [Otwórz prompt /init](/init)
- [Przeczytaj metodykę](/methodology)

---

## Ludzie sterują. Agenci wykonują.

To Ty decydujesz, co znaczy „skończone” i gdzie biegną granice. Plan niesie Twoją intencję; agenci odpracowują godziny — bez ciągłego nadzorowania i poprawek co dwadzieścia minut.

- Ty: intencja, kryteria akceptacji, przegląd
- Agenci: wykonanie, zadanie po zadaniu
- Plan: umowa między nimi

[Przeczytaj metodologię](/pl/methodology)

---

## Plan, od którego agenci nie mogą odbiegać.

Długie zadania zapełniają kontekst każdego modelu. Szczegóły znikają i agent dryfuje. Napisany plan — zadania atomowe, bramy walidacji, wznawialny stan — to punkt, do którego wraca z okrążenia na okrążenie.

1. Plan
2. Zadania atomowe
3. Bramki walidacji
4. Ukończenie
5. Stan wznawialny

[Zobacz pętlę główną](/pl/methodology)

---

## Skończone to kontrakt, nie wrażenie.

Każde zadanie nazywa swoje kryteria akceptacji i testy, które muszą przejść. Agent nie może czuć się skończony — musi przejść, albo zadanie pozostaje otwarte.

- Testy przechodzą
- Typy się zgadzają
- Kryteria akceptacji są spełnione
- Albo zadanie pozostaje otwarte

[Przeczytaj specyfikację](/pl/spec)

---

## Repozytorium to harness.

Kontekst, narzędzia, zabezpieczenia i stan mieszkają w Twoim repozytorium jako zwykłe pliki, które może przeczytać każdy agent. Bez lock-inu, bez zewnętrznego mózgu — przetrwa resetowanie kontekstu.

- Trwała specyfikacja na dysku
- Bramki walidacji, nie wrażenia
- Przeżywa reset kontekstu

**PE · ASK · HECK · TAT · OOL**

[Zobacz, co tworzy onboarding](/pl/quickstart)
---

## Co otrzymujesz

- AGENTS.md w katalogu głównym repozytorium, przemyślany na podstawie twojego rzeczywistego stosu i komend.
- Skategoryzowane `docs/` oraz dokumentację poszczególnych modułów.
- Katalog `.agents/` (skille, agenci, komendy) z dowiązaniem `.claude` do `.agents`.
- Skill Deep Work Plan, instalowany raz dla każdego agenta — w tym sub-skill author, dzięki któremu repozytorium może rozwijać własne skille, agentów i komendy, plus opcjonalne dodatki, takie jak dependency-upgrade i dodatek design-system dla dowolnej powierzchni interfejsu skierowanej do użytkownika.
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
