---
title: System projektowy
description: "Dobrowolny dodatek o zakresie frontendowym, który nadaje repozytorium plik DESIGN.md (w docs/, indeksowany z AGENTS.md), dzięki czemu dowolny agent kodujący generuje UI spójne z własnym systemem projektowym repozytorium."
kind: addon
lang: pl
order: 4
---

# Dodatek design-system

Nadaj repozytorium frontendowemu/UI plik `DESIGN.md` — plik systemu projektowego w formacie Markdown, który dowolny agent kodujący czyta, aby generować UI spójne z **własnym** systemem projektowym repozytorium, zamiast pozbawionych stylu, statystycznie najczęstszych ustawień domyślnych, do których agent sięga bez żadnych wskazówek. Czwarty dobrowolny dodatek Deep Work Plan.

## Co dodaje

- Plik `DESIGN.md` w `docs/DESIGN.md` (obok innych specyfikacji repozytorium; katalog główny repozytorium tylko wtedy, gdy nie ma drzewa `docs/`), **przywoływany z `AGENTS.md`**, dzięki czemu agenci odkrywają go tak jak resztę dokumentacji.
- Kanoniczne sekcje: przegląd/atmosfera, paleta kolorów i role (jasny + ciemny), typografia, układ i odstępy, wyniesienie i głębia, kształty, komponenty, zachowanie responsywne, zasady „rób i nie rób" (w tym reguły dostępności repozytorium) oraz przewodnik po promptach dla agenta.
- Krok walidacyjny, który sprawdza, czy plik jest kompletny, czy udokumentowany kontrast tekstu spełnia WCAG AA oraz czy odwołania do tokenów się rozwiązują.

## Zachowanie

- **Rozumuj, nie kopiuj.** Każda wartość wywodzi się z rzeczywistego źródła projektowego repozytorium — jego arkusza stylów, niestandardowych właściwości CSS, konfiguracji Tailwind, plików tokenów lub stylów komponentów. Nigdy nie wkleja pliku `DESIGN.md` cudzej marki; katalogi referencyjne są inspiracją dla struktury, nigdy dla treści.
- **Uzgadniaj, nie nadpisuj.** Istniejący plik `DESIGN.md` lub źródło tokenów jest uzgadniane przyrostowo, nigdy nadpisywane; zmiany destrukcyjne wymagają zatwierdzenia.
- **Odkrywanie przez odwołanie.** Gdziekolwiek znajduje się `DESIGN.md`, `AGENTS.md` (oraz `CLAUDE.md`) odwołuje się do niego — to wskaźnik, a nie fizyczna lokalizacja, gwarantuje, że agenci go wczytają.
- **Pragmatyczny, nie sztywno związany.** Odwołuje się do wyłaniającej się konwencji `DESIGN.md` jako kształtu, który warto naśladować, ale pozostaje przede wszystkim w Markdownie i nie wiąże się z żadnym pojedynczym schematem tokenów.

## Zakres frontendowy, domyślnie włączony po wykryciu

Ten dodatek jest przeznaczony dla repozytoriów z rzeczywistą powierzchnią UI — arkuszem stylów z niestandardowymi właściwościami CSS, konfiguracją Tailwind lub blokiem `@theme`, komponentami UI albo przewodnikiem marki/stylu. **Nigdy** nie jest oferowany dla repozytorium backendowego, CLI lub wyłącznie bibliotecznego. Gdy powierzchnia UI **zostanie** wykryta, onboarding traktuje go jako **domyślnie włączony**: stosuje dodatek w trybie zaufania i zdecydowanie zaleca go w trybie z przewodnikiem. Nigdy nie jest wymagany — repozytorium z zerową liczbą dodatków jest w pełni zgodne i zawsze możesz odmówić.

## Opcjonalna komenda

Po zaakceptowaniu dodatek może zainstalować delegator `/design-system` w katalogu `.agents/commands/` repozytorium, aby później ponownie wygenerować lub odświeżyć `DESIGN.md`. Instalacja komendy jest opcjonalna; odrzucony dodatek nie instaluje żadnej.

## Związek z dokumentami projektowymi per funkcja

To jest **trwały plik systemu projektowego na poziomie repozytorium** — odrębny od technicznego dokumentu projektowego per funkcja (plik `design.md` w schemacie „wymagania → projekt → zadania" przepływów spec-driven związanych z konkretnym narzędziem). Deep Work Plan celowo nie dostarcza osobnego archetypu dokumentu projektowego per funkcja: README planu, kryteria akceptacji każdego zadania oraz bramki walidacyjne już pełnią tę rolę. Ten dodatek wypełnia jedną lukę, której ta rola nie obejmuje: trwały, natywny dla repozytorium kontekst projektowy UI.
