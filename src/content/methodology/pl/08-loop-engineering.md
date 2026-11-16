---
title: Inżynieria pętli
description: "Jak uruchamiany przez człowieka daemon prowadzi zatwierdzone plany Deep Work do końca przez rejestrację, sukcesję i powiadomienia w granicach uprawnień."
order: 8
lang: pl
summary: Pełny cykl, który prowadzi zatwierdzony plan w granicach zapisanych uprawnień.
icon: repeat
---

# Inżynieria pętli

**Najpierw specyfikacja, zamknięta pętla: repozytorium jest harness, a plan sam realizuje się do końca.** Ten rozdział opisuje opcjonalny mechanizm kontynuacji po pierwszej turze wykonania. Plan pozostaje trwałą specyfikacją; pętla zapewnia ciągłość, nie nowe uprawnienia.

## Rejestracja planu

Gdy dodatek Herdr jest włączony, przepływ `execute` pakietu przejmuje rekord lead planu i zapisuje sukcesję. Rekord wskazuje plan, aktualnego lead, epokę i kolejność następców. Plany bez rekordu lead nie są monitorowane. Dodatek jest opcjonalny; podstawowa metodologia działa także w jednej sesji lub przy przekazaniu koordynowanym przez człowieka. Rejestracja nie zatwierdza pracy ani nie rozszerza uprawnień. W v8 zatwierdzony plan wykonuje się do końca w granicach uprawnień zapisanych w planie; kryteria akceptacji i gates nadal obowiązują.

## Ręczne uruchomienie daemona

Człowiek uruchamia `herdr-peers autopilot --loop` w środowisku Herdr. To lokalny daemon działający w tle, nie element logowania ani usługa systemowa. Obserwuje zarejestrowane plany na włączonych maszynach i ponagla bezczynnego lead, gdy plan jest otwarty, żadna lane nie pracuje i nie oczekuje odpowiedź. Stały komunikat każe dokończyć zatwierdzony plan z zachowaniem gates i zapisanych uprawnień.

Daemon nie obsługuje logowania, poświadczeń ani potwierdzenia obejścia uprawnień Claude. Nie wybiera odmowy, nie wykonuje dowolnego tekstu z ekranu i nie tworzy uprawnień. Ponaglenie jedynie prosi o kontynuację; niczego nie upoważnia. Lead nadal zapisuje blokady i przestrzega gates. Po trzech ponagleniach bez postępu daemon przestaje i zgłasza `plan_stalled`.

## Ochrona przywództwa

Gdy lead zniknie, daemon prosi pierwszego osiągalnego następcę z listy o wykonanie procedury takeover. Epoka rekordu rośnie, a odbiorcy egzekwują kolejność sukcesji. Protocol 2 pozwala też wyznaczyć lead, ale tylko po wyraźnej zgodzie człowieka zapisanej w planie; daemon nie może jej udzielić. Przed każdym merge, tag lub release aktualny lead uruchamia `herdr-peers lead verify --plan <id>`, by sprawdzić rekord na maszynach planu. Następca dziedziczy plan i gates bez szerszych uprawnień. Jeśli plan osiągnie gate wymagający działania człowieka według zasad C1–C7, pętla zgłasza potrzebę i zatrzymuje się przy nim. Poświadczenia i logowanie również pozostają po stronie człowieka. O pozostałym postępie człowiek otrzymuje powiadomienia, bez nadzorowania każdego kroku.

## Opcjonalny brain i kolejka

Opcjonalne `--brain` uruchamia osobnego agenta decyzyjnego w przypadkach, których reguły daemona nie rozstrzygają. Brain może wybierać wyłącznie z zamkniętej listy działań dozwolonych przez plan. Jedynym wykonawcą pozostaje daemon: sprawdza wybór i wykonuje dopuszczalne działanie; nigdy nie uruchamia swobodnego tekstu brain. Bez wyraźnej zgody planu brain nie działa na planie.

Kolejka używa dokumentu `dwp-queue-v1` w `.dwp/queue.json`. Zapisuje ją wyłącznie pakiet; daemon jest ograniczonym czytelnikiem. Plan jest gotowy, gdy zależność `after` jest ukończona lub jej nie ma, a zatwierdzenie pozostaje ważne. Daemon rozpoczyna go tylko przez wysłanie stałego komunikatu do zarejestrowanego lead: „Plan P jest następny w kolejce tego repozytorium i został zatwierdzony; wykonaj go do końca, przestrzegając gates”. Pętla nie uruchamia pozycji `launch`. Pakiet aktualizuje stan kolejki podczas wykonania i finalizacji.

## Raportowanie i obserwacja

Zdarzenia planu zapisują kolejkę, rozpoczęcie, blokadę, zastój, utratę lead i ukończenie. Opcjonalne `--notify` otrzymuje obiekt `plan-event-v1` dla obsługiwanych zdarzeń; notifier Dailybot pakietu przekształca je w aktualizacje zespołu. Powiadomienia informują, ale nie uprawniają do działania i nie zastępują rekordu planu. Raport floty i `herdr-peers fleet ui` pokazują agentów i plany na wielu maszynach. Interfejs jest tylko do odczytu: nie zapisuje stanu i nie ponagla agentów.

## Granica

Inżynieria pętli zamyka wykonanie wokół zatwierdzonej specyfikacji. Kontynuacja, sukcesja i raportowanie stają się rutynowe, a plan pozostaje źródłem uprawnień i daemon pozostaje ograniczony. Człowiek uruchamia daemon, obsługuje poświadczenia i logowanie, a także rozwiązuje wyłącznie gates C1–C7 lub potrzeby poza zapisanymi uprawnieniami. Celem jest, by zatwierdzony plan osiągnął określony koniec bez stałego nadzoru człowieka.
