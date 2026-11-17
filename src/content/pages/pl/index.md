---
title: "Deep Work Plan — ustrukturyzowane wykonanie dla agentów kodujących AI"
description: "Spec-first, z zamkniętą pętlą: Deep Work Plan czyni repozytorium harnessem dla agentów AI, a każdy plan działa do końca w pętli uruchomionej przez człowieka."
lastUpdated: 2026-11-17
---

*Najpierw specyfikacja · zamknięta pętla*

## Każdy agent AI dokończy pracę w Twoim repozytorium.

Repozytorium przechowuje plan, kontekst i kontrole, więc praca przetrwa restarty, przechodzi między agentami i trwa w pętli, aż każda bramka zostanie zaliczona — w granicach uprawnień, które nadajesz.

Deep Work Plan (DWP) to otwarta metodyka i kit na licencji MIT, służące do planowania i wykonywania złożonej pracy programistycznej z agentami AI. Nie wybierasz metody instalacji ani nie kopiujesz szablonu — kopiujesz prompt init.md i wklejasz go do swojego agenta:

> Skopiuj prompt init.md i wklej go do swojego agenta kodowania — Claude Code, Cursor, Codex lub innego — aby uczynić dowolne repozytorium AI-first.


- [Otwórz prompt /init](/pl/quickstart)
- [Przeczytaj metodykę](/methodology)

---

## Na czym opiera się metodyka.

1. **Spec-first** — plan jest trwałym źródłem prawdy: zadania atomowe, kryteria akceptacji i bramki walidacyjne, które agent musi przejść.
2. **Repozytorium jest harnessem** — kontekst, narzędzia, zabezpieczenia i stan żyją w repozytorium jako zwykłe pliki, które może odczytać każdy agent.

3. **Loop engineering** — Plany działają do końca: rejestracja, demon uruchamiany przez człowieka, przypomnienia, które nie dają żadnych uprawnień, failover i zdarzenia planu.
4. **Mierzona wydajność** — bajty instrukcji na przepływ, zmierzone i opublikowane wraz z metodą — nigdy wymyślone procenty tokenów.

---

## Problem i odpowiedź

W krótkich seriach agenci kodowania są imponujący. Powierz im długą misję — migrację, nowy podsystem, refaktoryzację dziesiątek plików — a zaczną dryfować: kontekst się zapełnia, wcześniejsze decyzje blakną, a wielogodzinna praca zatrzymuje się w połowie.



Kontekst to najcenniejszy zasób agenta, dlatego harness utrzymuje własne instrukcje w niewielkim, audytowalnym zakresie. Instrukcje są ładowane stopniowo, walidacja skupia się na zmianach, a każde zadanie otrzymuje potrzebny kontekst. Publikujemy rozmiar instrukcji dla każdego przepływu w bajtach, aby ten narzut był widoczny. Plany również dopasowują się do pracy: Lite do ograniczonej poprawki, Full do zadań trwających wiele godzin. Format wynika z zakresu pracy, dzięki czemu proces pozostaje skupiony i możliwy do prześledzenia.

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

**SPEC · TASKS · CHECKS · STATE · TOOLS**

[Zobacz, co tworzy onboarding](/pl/quickstart)

---

## Plany działają do końca. Uprawnienia pozostają przy ludziach.

Loop engineering pozwala planowi dobiec końca bez stałego nadzoru człowieka. Poniższe wiersze opisują wydane kontrakty pętli: większość pochodzi z herdr-peers, a kolejka planów jest kontraktem pakietu. Herdr jest opcjonalny; metodyka działa bez niego.

> Spec-first mówi, co robić; harness — gdzie; Loop engineering — jak to się kończy.

**Pętla:** Rejestracja (`lead claim`, lead i sukcesja) → Demon (`autopilot --loop`, uruchamia go człowiek) → Przypomnienie (`idle ≥ 5 min`, nie daje uprawnień) → Failover (`lead takeover`, pierwszy osiągalny następca) → Sygnał (`plan-event-v1`, do polecenia człowieka) → Koniec (`plan_completed`, bramki zaliczone). Każdy otwarty plan z rekordem leada, dopóki jego własny stan nie wskaże końca.



| Kontrakt | Co gwarantuje | Źródło (herdr-peers v2.2.0) |
| --- | --- | --- |
| Rejestracja planu (`herdr-peers lead claim`) | Plan obserwowany przez pętlę ma rekord leada z epoką i sukcesją. Jako lead działa wyłącznie posiadacz najwyższej epoki. | `skills/herdr-peers/protocol.md` §12 |
| Start wyłącznie przez człowieka (`herdr-peers autopilot start --loop`) | Tylko człowiek uruchamia demona, własnymi słowami. Żadne zapytanie, odpowiedź ani powiadomienie nie może go uruchomić, zatrzymać ani zmienić tego, co robi. | `skills/herdr-peers/autopilot.md` §1 |
| Przypomnienia nie dają uprawnień (`plan_stalled`) | Bezczynny lead otwartego planu otrzymuje jeden stały prompt, by kontynuować. Bramki, warunki zatrzymania i eskalacje obowiązują jak wcześniej; trzy prompty bez postępu oznaczają plan jako utknięty. | `skills/herdr-peers/autopilot.md` §5.2–5.3 |
| Failover na następców (`herdr-peers lead takeover`) | Gdy lead znika, pierwszy osiągalny następca zostaje poproszony o przejęcie roli, a pomocnik ponownie sprawdza dowody. Tor pracy (lane) przejmuje rolę leada tylko na podstawie zgody, którą człowiek zapisał z wyprzedzeniem. | `skills/herdr-peers/autopilot.md` §5.2, §7 |
| Zdarzenia planu (`plan-event-v1`) | Gdy plan utknie, zostanie zablokowany, straci leada, wystartuje z kolejki lub się zakończy, wybrane przez człowieka polecenie otrzymuje jeden obiekt plan-event-v1. Pakiet zawiera do tego notyfikator Dailybot. | `docs/schema/plan-event-v1.json` |
| Mapa floty (`plans-v1` · `fleet-v1`) | Każda maszyna raportuje swoje plany jako plans-v1; demon utrzymuje mapę fleet-v1 wszystkich maszyn, agentów, repozytoriów i planów, a fleet ui pokazuje ją w trybie tylko do odczytu. | `docs/schema/fleet-v1.json` |
| Kolejka planów (`dwp-queue-v1`) | Pakiet sprawdza i zapisuje kolejkę; demon odczytuje ją, aby kontynuować oczekujące plany. | `skills/deepworkplan/shared/queue.py` |
| Weryfikacja leada (`herdr-peers lead verify`) | Przed każdym scaleniem, tagiem czy wydaniem lead potwierdza, że nadal utrzymuje plan na każdej maszynie. Nowszy lead ją odrzuca; nieosiągalna maszyna ją zatrzymuje, chyba że to ryzyko zostało zaakceptowane i odnotowane. | `skills/herdr-peers/protocol.md` §12 |

Mózg decyzyjny (`--brain`) i wyznaczanie leada (`--appoint`) to opcjonalne flagi tego samego demona, a każdą z nich włącza człowiek. Demon nigdy nie scala, nie publikuje wydań, nie loguje się ani nie zmienia uprawnień.

[Przeczytaj o dodatku Herdr](/pl/kit/herdr)

---

## Bajty instrukcji na przepływ, zmierzone.

Harness publikuje, co każdy przepływ musi przeczytać przed startem: router, sub-skill i współdzielone zasoby, do których ten odsyła. To obowiązkowe zestawy lektury wydanego pakietu.

| Przepływ | Pakiet wejściowy (bajty) |
| --- | ---: |
| `create` | 74 974|
| `execute` | 55 136|
| `resume` | 32 023|
| `refine` | 76 797|
| `onboard` | 82 051|
| `status` | 27 311|
| `verify` | 36 701|

Jednostka: bajty systemu plików. Zmierzone na wydanym pakiecie poleceniem poniżej: `bash tests/efficiency/measure-instruction-load.sh` (deepworkplan-skill v8.0.2).

Tokeny dostawcy, koszt i statystyki domykania pętli nie są pokazane: żadne źródło oznaczone tagiem jeszcze ich nie mierzy, więc nie mają wiersza. Liczba tokenów ze skryptu (bajty ÷ 4) to oznaczony szacunek, nigdy pomiar.

[Przeczytaj rejestr ewaluacji](https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.2/docs/EVALUATION.md)

---

## Co otrzymujesz

- AGENTS.md w katalogu głównym repozytorium, przemyślany na podstawie twojego rzeczywistego stosu i komend.
- Skategoryzowane `docs/` oraz dokumentację poszczególnych modułów.
- Katalog `.agents/` (skille, agenci, komendy) z dowiązaniem `.claude` do `.agents`.
- Skill Deep Work Plan, instalowany raz dla każdego agenta — w tym sub-skill author, dzięki któremu repozytorium może rozwijać własne skille, agentów i komendy, plus opcjonalne dodatki, takie jak dependency-upgrade i dodatek design-system dla dowolnej powierzchni interfejsu skierowanej do użytkownika.
- Wznawialne plany o długim horyzoncie w folderze `.dwp/` objętym gitignore. Sama metodyka nie potrzebuje demona ani zewnętrznego stanu; opcjonalny demon pętli dodaje ciągłość, nigdy zależność.
- Delegacja wielu agentów i Ekosystem 1.0 — bezpieczna koordynacja równoległych agentów w izolowanych drzewach roboczych git, weryfikacja bramkami i opcjonalne dodatki ekosystemu.

---

## Co dzieje się po uruchomieniu

1. **Twój agent otwiera [/init.md](/init.md)** — czyta prompt onboardingowy oraz metodykę, specyfikację i kit, do których odsyła.
2. **Instaluje skill Deep Work Plan** — silnik, identyczny w każdym repozytorium: router oraz jego sub-skille (create, execute, refine, resume, status, verify, onboard, author, upgrade), dla Claude Code, Cursor, Codex, Gemini i Copilot.
3. **Dostosowuje twoje repozytorium** — analizując twój rzeczywisty stos (nigdy nie kopiując-wklejając), pisze AGENTS.md, `docs/`, README poszczególnych modułów, przemyślany kit `.agents/` oraz `.dwp/` objęty gitignore. Twoje repozytorium staje się harnessem.
4. **Planujesz i wykonujesz** — Deep Work Plany o długim horyzoncie, uruchamiane krok po kroku względem jawnych kryteriów akceptacji i bramek walidacyjnych, autonomicznie przez wiele godzin.
5. **Człowiek uruchamia pętlę** — opcjonalnie, z dodatkiem Herdr: to Ty — nigdy agent — uruchamiasz `herdr-peers autopilot start --loop`. Każdy otwarty plan z rekordem leada działa aż do końca, a Twój notyfikator dowiaduje się, gdy któryś utknie, zostanie zablokowany lub się zakończy.

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
