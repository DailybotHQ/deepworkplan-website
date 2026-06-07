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

Dodatek **design-system** to dobrowolne rozszerzenie o zakresie frontendowym, które nadaje repozytorium plik `DESIGN.md` — plik systemu projektowego w formacie Markdown, który dowolny agent kodujący czyta, aby generować UI spójne z własnym systemem projektowym repozytorium. Rozumuje o rzeczywistych tokenach projektowych repozytorium (niestandardowe właściwości CSS, konfiguracja Tailwind, pliki tokenów, style komponentów), zamiast kopiować plik marki, i dokumentuje kanoniczne sekcje: kolory i role (jasne i ciemne), typografię, układ i odstępy, wyniesienie, kształty, komponenty, zachowanie responsywne, zasady „rób i nie rób" (w tym reguły dostępności repozytorium) oraz przewodnik po promptach dla agenta. Sprawdza kontrast WCAG AA i integralność tokenów oraz uzgadnia istniejący `DESIGN.md`, zamiast go nadpisywać.

Plik znajduje się w `docs/DESIGN.md`, obok innych specyfikacji repozytorium, i jest przywoływany z `AGENTS.md`, dzięki czemu agenci odkrywają go tak samo, jak odkrywają resztę dokumentacji (katalog główny repozytorium jest używany tylko wtedy, gdy nie ma drzewa `docs/`). Odkrywanie odbywa się przez odwołanie, a nie przez fizyczną lokalizację. Dodatek jest **domyślnie włączony po wykryciu**: gdy obecna jest powierzchnia UI, onboarding stosuje go w trybie zaufania i zdecydowanie zaleca w trybie z przewodnikiem; nigdy nie jest oferowany dla repozytorium backendowego, CLI lub wyłącznie bibliotecznego, a repozytorium z zerową liczbą dodatków pozostaje w pełni zgodne.

Ten plik systemu projektowego na poziomie repozytorium jest odrębny od technicznego dokumentu projektowego per funkcja (plik `design.md` w schemacie „wymagania → projekt → zadania" przepływów spec-driven związanych z konkretnym narzędziem). DWP nie dostarcza osobnego archetypu dokumentu projektowego per funkcja: README planu, kryteria akceptacji każdego zadania oraz bramki walidacyjne już pełnią tę rolę. Dodatek wypełnia jedną lukę, której ta rola nie obejmuje: trwały, natywny dla repozytorium kontekst projektowy UI.

## Presety

Presety dostosowują DWP do konkretnego stosu technologicznego (Django, React, Go).

## Adaptery

Adaptery mapują komendy DWP na system komend konkretnego agenta (Claude Code, Cursor, Codex).

## Przykłady

Przykłady pokazują DWP w praktyce (porównania przed/po, przykładowe plany, studia przypadków).
