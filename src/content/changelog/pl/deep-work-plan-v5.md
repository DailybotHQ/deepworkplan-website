---
title: "DWP v5: obietnice, teraz gwarantowane"
description: "Deep Work Plan v5 zamienia osiem długotrwałych obietnic w przetestowane, wersjonowane kontrakty — uczciwy weryfikator, bezpieczna orkiestracja i sprawdzona ścieżka aktualizacji."
date: 2026-09-12
version: "v5 · Gwarantowane testami"
kind: release
lang: pl
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
sourceLinks:
  - label: "Commit wydania skilla ab1337d (v5.0.0)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
  - label: "Wydanie skilla v5.4.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.4.0"
---

Dziś wydajemy Deep Work Plan v5. To nie jest przepisanie od nowa: to miesiące realnego użycia — w tym bezpośredni audyt 108 rzeczywistych planów — które luka po luce ujawniały, gdzie obietnice metodologii i rzeczywiste zachowanie agenta mogły się rozjeżdżać. Szczerze podsumowując to wydanie: metodologia obiecywała to wszystko już wcześniej — teraz tego gwarantuje. Przed v5 agent, który trzymał się dokumentacji co do litery, mógł i tak trafić w realne scenariusze awarii; każdy z nich, wykryty dzięki temu użyciu i informacji zwrotnej, jest teraz zamknięty i przypięty wykonywalnym testem, a nie załatany kolejnym akapitem prozy. W tym cyklu zestaw kontraktów skilla urósł ze 132 do 258 testów, a każda gwarancja poniżej została zwalidowana na żywo względem wydanej wersji — zainstalowana w czystym repozytorium i przeprowadzona przez własne przepływy, zanim powstał ten wpis.

**Weryfikator, który nigdy nie przypisuje sobie niezweryfikowanego sukcesu.** Wcześniejsze kontrole zgodności psuły się po cichu: bez zdolnego interpretera pomijały wszystkie weryfikacje, a mimo to drukowały werdykt zgodności, a pogrubiony tekst wewnątrz pola mógł zostać wzięty za pole nieobecne. Teraz weryfikator kończy z jawnym werdyktem `UNVERIFIED` za każdym razem, gdy nie potrafi zweryfikować naprawdę. Weryfikator nigdy nie raportuje sukcesu, którego nie sprawdził — zaufanie do bramek to cała propozycja, a bramka, która może pominąć własny test, zrywa ten łańcuch.

**Jeden kontrakt zatwierdzania dla planów Lite.** Trzy powierzchnie odpowiadały na trzy różne sposoby na pytanie „czy uruchomienie tego planu zatwierdza jego obecny zakres?", a agent mógł utknąć w zakleszczeniu albo działać bez autoryzacji dokładnie na najniebezpieczniejszej granicy. v5 ustanawia wszędzie jeden kontrakt: jawny execute lub resume zatwierdza obecny zakres ready i odnotowuje to zatwierdzenie przed podjęciem jakiejkolwiek pracy; oczekująca propozycja sama w sobie niczego nie autoryzuje; przerwany awans jest odtwarzany, nim ruszy jakakolwiek praca produktowa.

**Orkiestracja wielorepozytoryjna, która nie uszkadza.** Nadpisanie środowiska hubu orkiestratora wyciekało wcześniej do repozytoriów potomnych — potomek mógł pisać stan planów we własnych folderach hubu. Szablony orkiestratora drukowały `FAIL`, wychodząc z kodem sukcesu, a kontrola kompletności grepująca ciąg statusu mogła odczytać jedno ukończone zadanie jako ukończony plan. Teraz korzeń hubu jest zapisywany przed wejściem w podrepozytoria, każdy potomek rozstrzyga własny `.dwp/` w izolacji, każda gałąź błędu kończy się błędem, kompletność jest parsowana ze stanu najwyższego poziomu planu, a punkt wejścia devcontainera propaguje błędy kopiowania, zanim cokolwiek usunie.

**Jedna macierz zgody dla addonów.** Który addon instaluje się domyślnie, który jest tylko oferowany i która rewizja jest obowiązkowa — wcześniejsze powierzchnie odpowiadały różnie. v5 ogłasza jedną macierz: AI Diff Reviewer jest obowiązkowy dla rewizji lokalnej, przypięty do zweryfikowanego wydania, z rewizją w CI jako jawnym opt-inem, który nigdy nie instaluje się sam; addon design-system to obowiązkowa oferta przy wykryciu pracy UI, ale instalacja wyłącznie po jawnej akceptacji; addon dependency-upgrade przychodzi jako niemal domyślny, bierny delegator z rollbackiem po dokładnej migawce; dailybot raportuje tylko tam, gdzie jest autoryzowany. Pusty diff nie liczy się już jako ukończona rewizja.

**Prawdziwa maszyneria dla długich planów.** Audyt 108 rzeczywistych planów pokazał, że praca zrównoleglalna była powszechna, ale decyzja sekwencyjna niemal nigdy nie była deklarowana, a bramki etapów istniały tylko jako doraźna praktyka. v5 wymaga, by decyzja wykonania była zawsze zadeklarowana — sekwencyjnie z odnotowanym powodem, gdy zrównoleglanie nie pasuje — dodaje opcjonalne Stage Gates dla planów o dwudziestu i większej liczbie zadań oraz wzbogaca Plan Variables o poziom rygoru, poprzeczkę dowodową i zakazane działania. Wszystko ładuje się progresywnie i nigdy nie obciąża planu Lite.

**Context obowiązkowy, jeden cel na zadanie.** Plany potrafiły się ześlizgnąć w bezkontekstowe listy zadań, a jedno zadanie mogło spiąć trzy cele za jedną zieloną bramką. v5 wymaga pary Goal i Context na poziomie planu, Contextu na każde zadanie — tego, czego nowa sesja potrzebuje, by uruchomić to zadanie samodzielnie — w każdym nowym rekordzie (ukończone rekordy zostają dokładnie takie, jak je zapisano), i czyni jeden cel na zadanie regułą normatywną ze strażnikiem przed degradacją.

**Bezpieczna ścieżka aktualizacji.** `/dwp-upgrade` jest nowy. Jego faza kontrolna jest tylko do odczytu i niczego nie instaluje; aktualizacja rusza wyłącznie z jawnej akceptacji, a lokalne adaptacje są porównywane i pokazywane, nim cokolwiek zostanie nadpisane; instalacja celuje w dokładny tag i weryfikuje samą siebie; onboarding jest przepuszczany od nowa jak świeży init. Aktualizacja nigdy nie dotyka `.dwp/` — żaden plan, plik stanu, rekord bramki ani dowód nie jest migrowany, przepisywany ani unieważniany.

**Uczciwy, mierzalny dowód.** Twierdzenia o wydajności są teraz przeliczane na trzech baselines — v3.0.0, v4.0.3 i finalnym drzewie — ze skryptem pomiarowym wcommitowanym do repozytorium. Wyniki raportowane są w bajtach systemu plików i nigdy nie są przeliczane na liczby tokenów czy kosztów, których nie możemy poprzeć; każde niezweryfikowalne twierdzenie jest poddawane kwarantannie właśnie jako takie w rekordzie oceny.

**Wersjonowany, opublikowany kontrakt.** Każda z powyższych obietnic jest poparta danymi, które mogą odczytać inne narzędzia, a nie tylko prozą: formaty plan-manifest i plan-state są teraz wersjonowane jako linia schematu v5 — [`plan-manifest/v5.json`](https://deepworkplan.com/schema/plan-manifest/v5.json) i [`plan-state/v5.json`](https://deepworkplan.com/schema/plan-state/v5.json) — dzięki czemu plan, weryfikator albo narzędzie zewnętrzne może sprawdzić zgodność względem opublikowanego, czytelnego maszynowo kontraktu, zamiast akapitu dokumentacji. Nic w linii v5 nie zmienia kształtu względem v2: istniejące plany odwołujące się do schematów v1 lub v2 pozostają ważne i nigdy nie są przepisywane.

Deep Work Plan v5 stosuje się do standardu DWP 5.0.0. Przeczytaj [normatywną specyfikację](https://deepworkplan.com/spec), zajrzyj do [repozytorium skilla](https://github.com/DailybotHQ/deepworkplan-skill) albo zacznij adopcję od [`/init`](https://deepworkplan.com/init).

## Aktualizacja — 2026-09-17 · skill v5.4.0

Pierwsze wydanie punktowe linii v5 zamyka ostatnią drogę, którą plan mógł zakończyć się na pracy nigdy naprawdę niesprawdzonej, i rozstrzyga, gdzie mieszka dowód samego planu. Standard DWP 5.0.0 pozostaje bez zmian: to wydanie kontraktu dodatku i dokumentacji, nie zmiana schematu.

**Przegląd, który nigdy się nie wykonał, nie jest już nie do odróżnienia od czystego.** Przegląd bezpieczeństwa w Final Review odróżniał już brakującego recenzenta — zapisywanego jako ustalenie — od nieudanego wywołania, które ostrzega raz i idzie dalej. Recenzent z góry strumienia dodał trzeci wynik: uruchomienie, które startuje, a potem kończy się bez zapisania choćby jednego ustalenia. Bez własnej nazwy zlewało się z „przegląd zakończony, nic nie znaleziono", co pozwoliłoby zamknąć plan na przeglądzie, którego nie było. Teraz jest to osobny stan: zapisywany jako przegląd niekompletny, nigdy nieliczony jako dowód, że zestaw zmian jest czysty, i nigdy niebędący powodem zamknięcia Final Review. Trzy odrębne wyniki — i żaden nie znaczy, że diff został przeczytany i uznany za czysty.

**Dowód planu należy do planu.** Standard umieszczał już zapis analizy, rejestr skills, przegląd bezpieczeństwa i logi bramek w `analysis_results/` samego planu, ale nigdy nie wypowiedział tej wyłączności jako reguły. Dlatego własne narzędzie audytowe repozytorium, którego ścieżka raportu domyślnie wskazuje katalog roboczy, mogło zapisać dowód planu w katalogu głównym repozytorium i żaden przepływ tego nie zauważył. Specyfikacja teraz tego wymaga: wszystko, co przepływ wytwarza na temat planu, trafia do folderu tego planu, a narzędziu, którego domyślnym wyjściem jest katalog roboczy, trzeba podać jawną opcję wyjścia. Dowód, którego nie ma tam, gdzie plan go zapowiada, jest dowodem utraconym — to praktyczny powód tej reguły, a nie preferencja porządkowania.

**Przypięcie AI Diff Reviewer przechodzi na v2.3.0.** Wymagany przegląd lokalny instaluje teraz recenzenta, który oddziela runner od backendu: ten sam przegląd może więc działać wobec dowolnego zgodnego punktu końcowego, nie zmieniając tego, od czego zależy DWP — gwarancja neutralności się wzmacnia, a nie rozluźnia. Dochodzą do tego instalatory weryfikowane sumą kontrolną, domyślne koszty zmierzone zamiast zgadywane oraz kolejne rundy, które przeglądają faktycznie nowy diff, przenosząc dalej otwarte ustalenia. To ostatnie ma konsekwencję kontraktową, którą warto powiedzieć wprost: własna deklaracja modelu, że ustalenie zostało rozwiązane, nie wycofuje go — wycofuje je osoba utrzymująca projekt.

Przeczytaj [specyfikację](https://deepworkplan.com/spec) po tekst normatywny, [dokumentację dodatku](https://deepworkplan.com/kit/ai-diff-reviewer) po to, co recenzent robi teraz, albo [wydanie v5.4.0](https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.4.0) po źródło.
