---
title: Dodatki
description: "Opcjonalne rozszerzenia podstawowej metodyki DWP: skille, agenci, presety, adaptery i przykłady oraz to, jak każde z nich rozszerza przepływ pracy, nie będąc wymaganym."
order: 5
lang: pl
section: Addons
---

# Dodatki

**Wersja 1.0.** Dodatki to opcjonalne rozszerzenia podstawowej metodyki DWP. Nie są wymagane do zgodności, ale zapewniają dodatkowe możliwości.

## Skille

Skille to powtarzalne procedury wywoływane po nazwie. Skill pakuje powtarzalny przepływ pracy (uruchamianie testów, naprawę lintingu, tworzenie komponentu).

Metodyka dostarcza niewielki zestaw podstawowych sub-skilli. Wśród nich sub-skill **author** pozwala repozytorium **rozwijać własny kit**: wywoływany przez `/skill-create` i `/agent-create`, analizuje istniejący układ `.agents/` i konwencje repozytorium, a następnie tworzy nowy skill, agenta lub cienki delegator komendy, który do nich pasuje, i utrzymuje katalog w synchronizacji. Ten sam sub-skill wykonuje obowiązkowe zadanie odkrywania skilli i agentów.

## Agenci

Agenci to wyspecjalizowani wykonawcy o zdefiniowanej roli (recenzent, wykonawca, architekt).

## Dodatki utrzymaniowe

Dodatki utrzymaniowe to opcjonalne rozszerzenia, nigdy niewymagane do zgodności, które pomagają repozytorium utrzymywać samo siebie. Dodatek **dependency-upgrade** analizuje rzeczywisty menedżer pakietów repozytorium (zamiast zakładać npm) i aktualizuje zależności w małych, zwalidowanych i odwracalnych partiach: wykrywa menedżer na podstawie rzeczywistego manifestu i pliku blokady, klasyfikuje aktualizacje według semver, aktualizuje partiami, uruchamia rzeczywistą bramkę walidacyjną repozytorium po każdej partii, wycofuje każdą partię, która zakończy się niepowodzeniem, i podsumowuje bez automatycznego commitowania. Dodatek jest instalowany tylko wtedy, gdy zostanie zaakceptowany podczas onboardingu.

## Dodatek design-system

Dodatek **design-system** to dobrowolne rozszerzenie o zakresie powierzchni interfejsu, które nadaje repozytorium plik `DESIGN.md` — plik systemu projektowego w formacie Markdown, który dowolny agent kodujący czyta, aby generować wyjście interfejsu spójne z własnymi konwencjami repozytorium. Obejmuje trzy **profile**, wykrywane niezależnie na podstawie rzeczywistych plików i składane w ten sam pojedynczy plik: **visual-ui** (renderowany UI webowy/mobilny/desktopowy), **cli-output** (stylizowane wyjście terminalowe: semantyczne kolory, komponenty wyjścia, takie jak panele i spinnery, konwencje układu, degradacja TTY/`NO_COLOR`) oraz **conversational** (produkt komunikuje się na czacie lub przez e-mail: głos i rejestr, anatomia wiadomości, renderowanie per platforma z zapasowymi wersjami w czystym tekście). Rozumuje o rzeczywistym źródle projektowym repozytorium (niestandardowe właściwości CSS, konfiguracja Tailwind, pliki tokenów, style komponentów — albo moduł wyświetlania CLI lub helpery kompozycji wiadomości), zamiast kopiować plik marki, i sprawdza integralność każdego profilu: kontrast WCAG AA dla wizualnych par tekstowych, kolor nigdy jako jedyny nośnik znaczenia w wyjściu terminalowym, zapasowe wersje w czystym tekście dla bogatych wiadomości oraz rozwiązujące się odwołania do tokenów. Uzgadnia istniejący `DESIGN.md`, zamiast go nadpisywać.

Plik znajduje się w `docs/DESIGN.md`, obok innych specyfikacji repozytorium, i jest przywoływany z `AGENTS.md`, dzięki czemu agenci odkrywają go tak samo, jak odkrywają resztę dokumentacji (katalog główny repozytorium jest używany tylko wtedy, gdy nie ma drzewa `docs/`). Odkrywanie odbywa się przez odwołanie, a nie przez fizyczną lokalizację. Siła profili się różni: **visual-ui jest domyślnie włączony po wykryciu** — gdy obecna jest wizualna powierzchnia UI, onboarding stosuje go w trybie zaufania i zdecydowanie zaleca w trybie z przewodnikiem — natomiast **cli-output i conversational są zalecane po wykryciu i zawsze poprzedzone pytaniem, nigdy stosowane automatycznie**. Dodatek nigdy nie jest oferowany dla repozytorium bez żadnej powierzchni interfejsu (czysta biblioteka, usługa headless, repozytorium wyłącznie infrastrukturalne), a repozytorium z zerową liczbą dodatków pozostaje w pełni zgodne. Plik `DESIGN.md` utworzony, zanim istniały profile, jest poprawnym jednoprofilowym plikiem wizualnym — bez migracji.

Ten plik systemu projektowego na poziomie repozytorium jest odrębny od technicznego dokumentu projektowego per funkcja (plik `design.md` w schemacie „wymagania → projekt → zadania" przepływów spec-driven związanych z konkretnym narzędziem). DWP nie dostarcza osobnego archetypu dokumentu projektowego per funkcja: README planu, kryteria akceptacji każdego zadania oraz bramki walidacyjne już pełnią tę rolę. Dodatek wypełnia jedną lukę, której ta rola nie obejmuje: trwały, natywny dla repozytorium kontekst projektowy interfejsu.

## Presety

Presety dostosowują DWP do konkretnego stosu technologicznego (Django, React, Go).

## Adaptery

Adaptery mapują komendy DWP na system komend konkretnego agenta (Claude Code, Cursor, Codex).

## Przykłady

Przykłady pokazują DWP w praktyce (porównania przed/po, przykładowe plany, studia przypadków).
