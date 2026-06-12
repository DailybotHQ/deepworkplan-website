---
title: System projektowy
description: "Dobrowolny dodatek, który nadaje każdemu repozytorium z powierzchnią interfejsu skierowaną do użytkownika plik DESIGN.md (w docs/, indeksowany z AGENTS.md) — obejmujący w jednym pliku profile wizualnego UI, wyjścia CLI i konwersacyjny."
kind: addon
lang: pl
order: 4
---

# Dodatek design-system

Nadaj repozytorium z **powierzchnią interfejsu skierowaną do użytkownika** plik `DESIGN.md` — plik systemu projektowego w formacie Markdown, który dowolny agent kodujący czyta, aby generować wyjście interfejsu spójne z **własnymi** konwencjami repozytorium, zamiast pozbawionych stylu, statystycznie najczęstszych ustawień domyślnych, do których agent sięga bez żadnych wskazówek. Czwarty dobrowolny dodatek Deep Work Plan.

„Powierzchnia interfejsu" to pojęcie mnogie: renderowany **wizualny UI**, stylizowane **wyjście CLI** oraz powierzchnia **konwersacyjna** (produkt komunikuje się na czacie lub przez e-mail) — każde z nich się liczy. Dodatek wykrywa każdą z nich niezależnie jako **profil**, a zaakceptowane profile składają się w ten sam pojedynczy plik `DESIGN.md`.

## Co dodaje

- Plik `DESIGN.md` w `docs/DESIGN.md` (obok innych specyfikacji repozytorium; katalog główny repozytorium tylko wtedy, gdy nie ma drzewa `docs/`), **przywoływany z `AGENTS.md`**, dzięki czemu agenci odkrywają go tak jak resztę dokumentacji. Jedno repozytorium, jeden plik — nigdy osobne pliki per powierzchnia.
- **Profil `visual-ui`** — kanoniczne sekcje wizualne: przegląd/atmosfera, paleta kolorów i role (jasny + ciemny), typografia, układ i odstępy, wyniesienie i głębia, kształty, komponenty, zachowanie responsywne, zasady „rób i nie rób" (w tym reguły dostępności repozytorium).
- **Profil `cli-output`** — stylizowane interfejsy terminalowe: głos wyjścia, semantyczne kolory i style (sukces/błąd/ostrzeżenie/informacja/przygaszenie zmapowane na rzeczywisty motyw), komponenty wyjścia (panele, tabele, spinnery, interaktywne monity — nazwane według rzeczywistych helperów repozytorium), konwencje układu oraz reguły degradacji (TTY vs potok, `NO_COLOR`, dyscyplina stdout/stderr, kody wyjścia).
- **Profil `conversational`** — powierzchnia komunikacyjna produktu: głos i rejestr (ton, zwięzłość, zasady nazewnictwa marki), anatomia wiadomości (DM, post na kanale, odpowiedź w wątku, edycja w miejscu) oraz renderowanie per platforma (mrkdwn Slacka, markdown Discorda, karty adaptacyjne Teams, e-mail) z zapasowymi wersjami w czystym tekście.
- Wspólny przewodnik po promptach dla agenta oraz krok walidacyjny, który sprawdza integralność każdego profilu: udokumentowany kontrast tekstu spełnia WCAG AA (wizualny), kolor nigdy nie jest jedynym nośnikiem znaczenia (CLI), bogate renderowania odnotowują zapasowe wersje w czystym tekście (konwersacyjny), a odwołania do tokenów się rozwiązują.

## Zachowanie

- **Rozumuj, nie kopiuj.** Każda wartość wywodzi się z rzeczywistego źródła projektowego repozytorium — jego arkusza stylów, niestandardowych właściwości CSS, konfiguracji Tailwind, plików tokenów, stylów komponentów, jego modułu wyświetlania/motywu CLI lub helperów kompozycji wiadomości. Nigdy nie wkleja pliku `DESIGN.md` cudzej marki ani nie importuje hurtowo konwencji innego produktu; katalogi referencyjne są inspiracją dla struktury, nigdy dla treści.
- **Uzgadniaj, nie nadpisuj.** Istniejący plik `DESIGN.md` lub źródło tokenów jest uzgadniane przyrostowo, nigdy nadpisywane; dodanie nowo zaakceptowanego profilu dołącza jego sekcje bez przepisywania reszty; zmiany destrukcyjne wymagają zatwierdzenia.
- **Odkrywanie przez odwołanie.** Gdziekolwiek znajduje się `DESIGN.md`, `AGENTS.md` (oraz `CLAUDE.md`) odwołuje się do niego — to wskaźnik, a nie fizyczna lokalizacja, gwarantuje, że agenci go wczytają.
- **Pragmatyczny, nie sztywno związany.** Odwołuje się do wyłaniającej się konwencji `DESIGN.md` jako kształtu, który warto naśladować, rozszerza ją na powierzchnie niewizualne i pozostaje przede wszystkim w Markdownie, nie wiążąc się z żadnym pojedynczym schematem tokenów.

## Zakres interfejsowy, z siłą zalecenia per profil

Ten dodatek jest przeznaczony dla repozytoriów z co najmniej jedną rzeczywistą powierzchnią interfejsu; nigdy nie jest oferowany dla repozytorium bez żadnej (czysta biblioteka, usługa headless, repozytorium wyłącznie infrastrukturalne). Każdy profil ma własną siłę zalecenia:

- **`visual-ui` jest domyślnie włączony po wykryciu** — arkusz stylów z niestandardowymi właściwościami CSS, konfiguracja Tailwind lub blok `@theme`, komponenty UI albo przewodnik marki/stylu. Onboarding stosuje go w trybie zaufania i zdecydowanie zaleca w trybie z przewodnikiem.
- **`cli-output` i `conversational` są zalecane po wykryciu — i zawsze poprzedzone pytaniem, nigdy stosowane automatycznie**, nawet w trybie zaufania. Biblioteka renderowania CLI wraz z celową warstwą wyświetlania sygnalizuje ten pierwszy; SDK platformy czatowej lub warstwa kompozycji wiadomości — ten drugi. Goły parser argumentów z surowymi wydrukami się nie kwalifikuje.

Nigdy nie jest wymagany — repozytorium z zerową liczbą dodatków jest w pełni zgodne i zawsze możesz odmówić dowolnego profilu lub całego dodatku. Plik `DESIGN.md` utworzony, zanim istniały profile, jest poprawnym jednoprofilowym plikiem wizualnym: bez migracji.

## Opcjonalna komenda

Po zaakceptowaniu dodatek może zainstalować delegator `/design-system` w katalogu `.agents/commands/` repozytorium, aby później ponownie wygenerować lub odświeżyć `DESIGN.md`. Instalacja komendy jest opcjonalna; odrzucony dodatek nie instaluje żadnej.

## Związek z dokumentami projektowymi per funkcja

To jest **trwały plik systemu projektowego na poziomie repozytorium** — odrębny od technicznego dokumentu projektowego per funkcja (plik `design.md` w schemacie „wymagania → projekt → zadania" przepływów spec-driven związanych z konkretnym narzędziem). Deep Work Plan celowo nie dostarcza osobnego archetypu dokumentu projektowego per funkcja: README planu, kryteria akceptacji każdego zadania oraz bramki walidacyjne już pełnią tę rolę. Ten dodatek wypełnia jedną lukę, której ta rola nie obejmuje: trwały, natywny dla repozytorium kontekst projektowy interfejsu.
