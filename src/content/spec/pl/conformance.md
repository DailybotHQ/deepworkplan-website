---
title: Zgodność
description: "Normatywna definicja repozytorium zgodnego z DWP, w pełni AI-first: artefakty, które MUSI i POWINNO mieć, co czyni plan dobrze sformułowanym i jak to zweryfikować."
order: 7
lang: pl
section: Conformance
---

# Zgodność

**Wersja 1.3. Status: Stabilny.** Ten dokument definiuje, co oznacza, że repozytorium jest *zgodne z Deep Work Plan* — czyli AI-first i sterowalne przez agenta. Słowa kluczowe MUSI, NIE MOŻE, POWINNO, NIE POWINNO oraz MOŻE należy interpretować zgodnie z opisem w RFC 2119.

Zgodność istnieje po to, aby „AI-first" było obiektywną, sprawdzalną właściwością, a nie wrażeniem. Repozytorium albo spełnia poniższe kryteria, albo nie. [Sub-skill `verify`](/kit) (`/dwp-verify`) sprawdza je mechanicznie.

## Repozytorium zgodne

Repozytorium zgodne z DWP MUSI spełniać wszystkie poniższe warunki. Każdy artefakt MUSI być **przemyślany pod kątem repozytorium** — dostosowany do jego rzeczywistych języków, frameworków i komend. Ogólny szablon, placeholder lub treść skopiowana z innego repozytorium nie spełnia kryterium.

1. **`AGENTS.md` w katalogu głównym.** Repozytorium MUSI zawierać w katalogu głównym `AGENTS.md`, który obejmuje (a) indeks dokumentacji, (b) obowiązkowe reguły dla repozytorium oraz (c) blok Quick Commands, którego komendy są **rzeczywiste i uruchamialne** w tym repozytorium. Komendy będące placeholderami (na przykład `npm test` w repozytorium, które nie używa npm) NIE MOGĄ się pojawiać.
2. **`CLAUDE.md` rozwiązuje się do `AGENTS.md`.** `CLAUDE.md` MUSI istnieć i rozwiązywać się do `AGENTS.md` (jako dowiązanie symboliczne lub równoważne rozwiązanie gwarantujące jedno źródło prawdy). Te dwa pliki NIE MOGĄ się rozjechać.
3. **Hierarchia `docs/`.** Repozytorium MUSI zawierać katalog `docs/` obejmujący standardowe kategorie (architektura, standardy, testowanie, komendy deweloperskie, bezpieczeństwo oraz onboarding agentów) z rzeczywistą, specyficzną dla repozytorium treścią. Złożone moduły POWINNY mieć własny `README.md`. Przewodnik testowania MUSI definiować rzeczywisty łańcuch narzędzi do testów, lintu i sprawdzania typów — lub, dla repozytorium, które go nie ma, konkretną konfigurację **zaproponowaną** na podstawie stosu technologicznego podczas onboardingu. Pusty przewodnik testowania lub „brak testów" nie spełnia tego kryterium: bez zdefiniowanego sposobu walidacji zachowania plan nie ma obiektywnej bramki walidacyjnej.
4. **Dom `.agents/`.** Repozytorium MUSI zawierać katalog `.agents/` z `agents/`, `commands/` i `skills/`, a także katalog pod `.agents/docs/`, który **odpowiada temu, co znajduje się na dysku**. Komendy `dwp-*` MUSZĄ być cienkimi delegatorami do zainstalowanego skilla. Ścieżka `.claude` MUSI rozwiązywać się do `.agents`.
5. **Przestrzeń robocza `.dwp/` w gitignore.** Repozytorium MUSI zawierać katalog `.dwp/` z `plans/`, a `.dwp/` MUSI być w gitignore. Przestrzeń robocza `tmp/` POWINNA istnieć i POWINNA być w gitignore.
6. **Skill metodyki jest rozwiązywalny.** Skill Deep Work Plan MUSI być zainstalowany lub do niego dowiązany w taki sposób, aby agent w repozytorium mógł wywoływać jego sub-skille.

Repozytorium jest **w pełni zgodne przy zerowej liczbie opcjonalnych dodatków**. Opcjonalne dodatki (devcontainer, Dailybot, dependency-upgrade, design-system) NIE MOGĄ być wymagane do zgodności. Od standardu 2.3.0 **lokalny przegląd AI Diff Reviewer** (vendored skill + plik rozszerzenia) jest częścią linii bazowej: jego brak to niepowodzenie dla repozytorium deklarującego 2.3.0 lub nowszy oraz znalezisko wersji harnessu dla starszego repozytorium. Jego powierzchnia CI pozostaje opcjonalna.

## Dobrze sformułowany plan

Deep Work Plan w `.dwp/plans/` jest dobrze sformułowany, gdy:

1. Każde zadanie MUSI deklarować jawny **zakres**, **kryteria akceptacji** oraz co najmniej jedną **bramkę walidacyjną** (komendę lub kontrolę, która obiektywnie przechodzi lub zawodzi).
2. Każde zadanie, które dodaje nową kluczową funkcjonalność lub zmienia zachowanie produktu, MUSI obejmować automatyczne pokrycie testami tego zachowania w swoich kryteriach akceptacji oraz MUSI uruchamiać testy repozytorium razem z jego kontrolami lintu i sprawdzania typów w swojej bramce walidacyjnej — a nie samym budowaniem. Istniejące testy MUSZĄ pozostać zielone; zmiana zachowania MUSI zaktualizować test, który psuje, zamiast go usuwać lub pomijać. Zadania czysto dokumentacyjne, konfiguracyjne lub badawcze są zwolnione z tworzenia testów, lecz wciąż uruchamiają bramkę repozytorium.
3. Każde zadanie, które dotyka uwierzytelniania, obsługi danych wejściowych, sekretów lub konfiguracji, powierzchni sieciowej albo zależności, MUSI zawierać w swoich kryteriach akceptacji oczekiwania bezpieczeństwa dotyczące tej zmiany, a każdy commit MUSI być wolny od jakichkolwiek sekretów.
4. Plan MUSI utrwalać postęp tak, aby praca przetrwała przerwanie i mogła zostać wznowiona przez innego agenta.
5. Plan MUSI kończyć się swoim zapisanym przeglądem końcowym. Plan utworzony pod tę wersję MUSI kończyć się dokładnie jednym obowiązkowym **Final Review** — przeglądem bezpieczeństwa, walidacją stanu końcowego i uzgodnieniem decyzji dotyczących skilli. Plan utworzony pod wcześniejszą wersję kończy się trzema obowiązkowymi zadaniami końcowymi (przegląd bezpieczeństwa, odkrywanie skilli i agentów, raport wykonawczy) i pozostaje zgodny. Krytyczne znalezisko bezpieczeństwa blokuje ukończenie do czasu naprawy lub jawnej akceptacji.
6. Zadania POWINNY ponownie zakotwiczać się w celu planu przed wykonaniem, aby zapobiec dryfowi w długim horyzoncie.

## Weryfikacja zgodności

Zgodność POWINNA być weryfikowana mechanicznie, a nie przez inspekcję. Uruchomienie `/dwp-verify` generuje raport zaliczenia/niezaliczenia względem powyższych kryteriów: obecności i rzeczywistej treści `AGENTS.md`, rozwiązania `CLAUDE.md`, kategorii `docs/`, zgodności katalogu `.agents/` z dyskiem, statusu gitignore dla `.dwp/` i `tmp/` oraz — dla planu — tego, że każde zadanie ma kryteria akceptacji i bramkę walidacyjną, z pokryciem testami dla zadań zmieniających zachowanie oraz z obecnym zapisanym przeglądem końcowym. Sprawdzający jest **wrażliwy na wersję**: MUSI zaakceptować starszy plan (trzy obowiązkowe zadania końcowe, bez Powierzchni dotkniętej) jako zgodny oraz MUSI odrzucić plan, który deklaruje tę wersję i jest obiektywnie nieprawidłowy w jej ramach. Zgłasza też brakującą lub nieaktualną linię pochodzenia `DWP standard:` jako znalezisko wskazujące ukierunkowany upgrade harnessu. Warstwa mechaniczna jest **uczciwa co do swoich ograniczeń**: bez zdolnego interpretera (Python 3.9+) kończy się niezerowym kodem wyjścia i jawnym werdyktem `UNVERIFIED` zamiast pomijać swoje sprawdzenia — weryfikator nigdy nie raportuje wyniku, którego nie zweryfikował.

Repozytorium POWINNO być ponownie weryfikowane po onboardingu i po każdym ukończonym planie, aby zgodność była utrzymywana, a nie deklarowana jednorazowo.
