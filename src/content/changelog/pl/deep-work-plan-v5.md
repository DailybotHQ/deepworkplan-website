---
title: "DWP v5: obietnice, teraz gwarantowane"
description: "Deep Work Plan v5 zamienia osiem długotrwałych obietnic w przetestowane kontrakty — uczciwy weryfikator, jedna reguła zatwierdzania, orkiestracja, która nie uszkadza, i bezpieczna ścieżka aktualizacji."
date: 2026-09-12
version: "v5 · Gwarantowane testami"
kind: release
lang: pl
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
---

Dziś wydajemy Deep Work Plan v5. Szczerze podsumowując to wydanie: metodologia obiecywała to wszystko już wcześniej — teraz tego gwarantuje. Przed v5 agent, który trzymał się dokumentacji co do litery, mógł i tak trafić w realne scenariusze awarii; każdy z tych scenariuszy jest teraz zamknięty i przypięty wykonywalnym testem. W tym cyklu zestaw kontraktów skilla urósł ze 132 do 258 testów, a każda gwarancja poniżej została zwalidowana na żywo względem wydanej wersji — zainstalowana w czystym repozytorium i przeprowadzona przez własne przepływy, zanim powstał ten wpis.

**Weryfikator, który nigdy nie przypisuje sobie niezweryfikowanego sukcesu.** Wcześniejsze kontrole zgodności psuły się po cichu: bez zdolnego interpretera pomijały wszystkie weryfikacje, a mimo to drukowały werdykt zgodności, a pogrubiony tekst wewnątrz pola mógł zostać wzięty za pole nieobecne. Teraz weryfikator kończy z jawnym werdyktem `UNVERIFIED` za każdym razem, gdy nie potrafi zweryfikować naprawdę. Weryfikator nigdy nie raportuje sukcesu, którego nie sprawdził — zaufanie do bramek to cała propozycja, a bramka, która może pominąć własny test, zrywa ten łańcuch.

**Jeden kontrakt zatwierdzania dla planów Lite.** Trzy powierzchnie odpowiadały na trzy różne sposoby na pytanie „czy uruchomienie tego planu zatwierdza jego obecny zakres?", a agent mógł utknąć w zakleszczeniu albo działać bez autoryzacji dokładnie na najniebezpieczniejszej granicy. v5 ustanawia wszędzie jeden kontrakt: jawny execute lub resume zatwierdza obecny zakres ready i odnotowuje to zatwierdzenie przed podjęciem jakiejkolwiek pracy; oczekująca propozycja sama w sobie niczego nie autoryzuje; przerwany awans jest odtwarzany, nim ruszy jakakolwiek praca produktowa.

**Orkiestracja wielorepozytoryjna, która nie uszkadza.** Nadpisanie środowiska hubu orkiestratora wyciekało wcześniej do repozytoriów potomnych — potomek mógł pisać stan planów we własnych folderach hubu. Szablony orkiestratora drukowały `FAIL`, wychodząc z kodem sukcesu, a kontrola kompletności grepująca ciąg statusu mogła odczytać jedno ukończone zadanie jako ukończony plan. Teraz korzeń hubu jest zapisywany przed wejściem w podrepozytoria, każdy potomek rozstrzyga własny `.dwp/` w izolacji, każda gałąź błędu kończy się błędem, kompletność jest parsowana ze stanu najwyższego poziomu planu, a punkt wejścia devcontainera propaguje błędy kopiowania, zanim cokolwiek usunie.

**Jedna macierz zgody dla addonów.** Który addon instaluje się domyślnie, który jest tylko oferowany i która rewizja jest obowiązkowa — wcześniejsze powierzchnie odpowiadały różnie. v5 ogłasza jedną macierz: AI Diff Reviewer jest obowiązkowy dla rewizji lokalnej, przypięty do zweryfikowanego wydania, z rewizją w CI jako jawnym opt-inem, który nigdy nie instaluje się sam; addon design-system to obowiązkowa oferta przy wykryciu pracy UI, ale instalacja wyłącznie po jawnej akceptacji; addon dependency-upgrade przychodzi jako niemal domyślny, bierny delegator z rollbackiem po dokładnej migawce; dailybot raportuje tylko tam, gdzie jest autoryzowany. Pusty diff nie liczy się już jako ukończona rewizja.

**Prawdziwa maszyneria dla długich planów.** Audyt 108 rzeczywistych planów pokazał, że praca zrównoleglalna była powszechna, ale decyzja sekwencyjna niemal nigdy nie była deklarowana, a bramki etapów istniały tylko jako doraźna praktyka. v5 wymaga, by decyzja wykonania była zawsze zadeklarowana — sekwencyjnie z odnotowanym powodem, gdy zrównoleglanie nie pasuje — dodaje opcjonalne Stage Gates dla planów o dwudziestu i większej liczbie zadań oraz wzbogaca Plan Variables o poziom rygoru, poprzeczkę dowodową i zakazane działania. Wszystko ładuje się progresywnie i nigdy nie obciąża planu Lite.

**Context obowiązkowy, jeden cel na zadanie.** Plany potrafiły się ześlizgnąć w bezkontekstowe listy zadań, a jedno zadanie mogło spiąć trzy cele za jedną zieloną bramką. v5 wymaga pary Goal i Context na poziomie planu, Contextu na każde zadanie — tego, czego nowa sesja potrzebuje, by uruchomić to zadanie samodzielnie — w każdym nowym rekordzie (ukończone rekordy zostają dokładnie takie, jak je zapisano), i czyni jeden cel na zadanie regułą normatywną ze strażnikiem przed degradacją.

**Bezpieczna ścieżka aktualizacji.** `/dwp-upgrade` jest nowy. Jego faza kontrolna jest tylko do odczytu i niczego nie instaluje; aktualizacja rusza wyłącznie z jawnej akceptacji, a lokalne adaptacje są porównywane i pokazywane, nim cokolwiek zostanie nadpisane; instalacja celuje w dokładny tag i weryfikuje samą siebie; onboarding jest przepuszczany od nowa jak świeży init. Aktualizacja nigdy nie dotyka `.dwp/` — żaden plan, plik stanu, rekord bramki ani dowód nie jest migrowany, przepisywany ani unieważniany.

**Uczciwy, mierzalny dowód.** Twierdzenia o wydajności są teraz przeliczane na trzech baselines — v3.0.0, v4.0.3 i finalnym drzewie — ze skryptem pomiarowym wcommitowanym do repozytorium. Wyniki raportowane są w bajtach systemu plików i nigdy nie są przeliczane na liczby tokenów czy kosztów, których nie możemy poprzeć; każde niezweryfikowalne twierdzenie jest poddawane kwarantannie właśnie jako takie w rekordzie oceny.

Deep Work Plan v5 stosuje się do standardu DWP 4.0.0. Przeczytaj [normatywną specyfikację](https://deepworkplan.com/spec), zajrzyj do [repozytorium skilla](https://github.com/DailybotHQ/deepworkplan-skill) albo zacznij adopcję od [`/init`](https://deepworkplan.com/init).
