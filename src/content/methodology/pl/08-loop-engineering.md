---
title: Loop engineering
description: "Jak uruchamiany przez człowieka demon prowadzi zatwierdzone plany Deep Work Plan przez rejestrację, sukcesję, ponaglenia i powiadomienia w granicach uprawnień."
order: 8
lang: pl
summary: Pełny cykl, który utrzymuje zatwierdzony plan w ruchu w granicach zapisanych uprawnień.
icon: repeat
---

# Loop engineering

**Spec-first, z zamkniętą pętlą: repozytorium jest harnessem, a plan sam wykonuje się do końca.** Ten rozdział opisuje opcjonalny mechanizm, który utrzymuje plan w ruchu po jego pierwszej turze wykonania. Plan pozostaje trwałą specyfikacją; pętla zapewnia ciągłość, a nie nowe uprawnienia.

## Rejestracja planu

Gdy dodatek Herdr jest włączony, przepływ `execute` pakietu przejmuje rekord prowadzącego planu (a `resume` przejmuje go ponownie), dodając sukcesję, gdy plan wskazuje następców; przełączenie awaryjne (failover) działa tylko przy zapisanej sukcesji. Ten rekord daje pętli dokładnie określony plan, aktualnego prowadzącego, epokę i uporządkowaną listę następców do obserwowania. Plany bez rekordu prowadzącego nie są monitorowane. Dodatek pozostaje opcjonalny: bez niego podstawowa metodologia nadal działa w jednej sesji lub przy przekazaniu koordynowanym przez człowieka.

Rejestracja planu nie zatwierdza pracy ani nie rozszerza autoryzacji planu. W v8 zatwierdzony plan wykonuje się do końca w granicach uprawnień zapisanych w tym planie. Jego kryteria akceptacji i bramki pozostają wiążące przez całe wykonanie.

## Ręczne uruchomienie demona

Człowiek uruchamia `herdr-peers autopilot --loop` w środowisku Herdr. To lokalny demon działający w tle, a nie element logowania ani usługa systemowa. Obserwuje zarejestrowane plany na włączonych maszynach i ponagla bezczynnego prowadzącego do kontynuacji, gdy jego plan pozostaje otwarty, żaden tor nie pracuje i nie oczekuje żadna odpowiedź. Komunikat jest stały: kontynuuj zatwierdzony plan do końca, przestrzegając jego bramek i zapisanych uprawnień.

Demon nie dotyka logowania, monitu o poświadczenia ani potwierdzenia trybu obejścia uprawnień w Claude. Nigdy nie wybiera odmowy, opcji z dowolnym tekstem ani wiersza, który rozszerza uprawnienia agenta. Ponaglenie jedynie prosi agenta o kontynuację; nie dodaje żadnych uprawnień. Prowadzący nadal zapisuje blokady i przestrzega bramek planu. Po trzech ponagleniach bez postępu demon przestaje ponaglać i zgłasza `plan_stalled`.

## Ochrona przywództwa

Gdy prowadzącego zabraknie, demon prosi pierwszego osiągalnego następcę z listy o wykonanie procedury przejęcia. Rekord prowadzącego przechodzi do kolejnej epoki, a odbiorcy egzekwują kolejność sukcesji. Protokół 2 obsługuje też mianowanie prowadzącego, ale tylko wtedy, gdy człowiek zapisał zgodę w planie (`lead claim --allow-appointment`) i uruchomił demona z `--appoint`; demon nie może sam udzielić tej zgody. Przed każdym scaleniem, tagiem lub wydaniem aktualny prowadzący uruchamia `herdr-peers lead verify --plan <id>`, aby sprawdzić rekord na maszynach planu.

Następca dziedziczy plan i jego bramki. Ani sukcesja, ani mianowanie nie zmieniają kryteriów akceptacji ani nie pozwalają na pracę poza zapisanymi uprawnieniami. Jeśli plan dotrze do bramki, która według jego zasad C1–C7 wymaga działania człowieka, pętla zgłasza tę potrzebę i zatrzymuje się przy tej bramce. Poświadczenia i logowanie również pozostają działaniami człowieka. O pozostałym postępie człowiek jest powiadamiany, zamiast pilnować każdego kroku.

## Opcjonalny mózg i kolejka

Opcjonalne `--brain` uruchamia osobnego agenta decyzyjnego dla przypadków, których reguły demona nie rozstrzygają. Wymaga coding-agents-kit 1.3.0 lub nowszego; bez niego demon uruchomiony z `--brain` odmawia startu. Mózg może wybierać wyłącznie z zamkniętej listy działań, którą demon ustala dla każdego przypadku: jeszcze jedno ponaglenie, jedna stała prośba do prowadzącego o rozwiązanie blokady, którą plan oznacza jako możliwą do rozwiązania przez prowadzącego, powiadomienie człowieka albo pozostawienie sprawy. Jedynym wykonawcą pozostaje demon: sprawdza wybór i wykonuje dopuszczalne działanie; swobodny tekst mózgu nigdy nie jest wykonywany. W v8 plan zapisuje też w swoim bloku autonomii, czy mózg może na nim działać.

Kolejka planów używa dokumentu `dwp-queue-v1` w `.dwp/queue.json`. Zapisuje ją narzędzie planów; demon jest ograniczonym konsumentem tylko do odczytu. Plan w kolejce staje się gotowy, gdy jego zależność `after` jest ukończona (lub jej nie ma), a jego zatwierdzenie pozostaje ważne. Demon uruchamia go wyłącznie, wysyłając jeden stały komunikat do prowadzącego wskazanego w kolejce: „Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.” Ta pętla nie uruchamia pozycji `launch`. Stan kolejki aktualizuje pakiet w miarę wykonywania i finalizacji.

## Raportowanie i obserwacja

Zdarzenia planu obejmują plan, który utknął, jest zablokowany, stracił prowadzącego lub został ukończony, oraz plan z kolejki, który startuje lub nie może wystartować. Opcjonalne polecenie `--notify` otrzymuje obiekt `plan-event-v1` dla obsługiwanych zdarzeń; notyfikator Dailybot z pakietu zamienia je w aktualizacje dla zespołu. Powiadomienia informują o postępie lub blokadzie; nie autoryzują żadnego działania i nie zastępują rekordu planu.

Raport floty i `herdr-peers fleet ui` pokazują agentów i plany na wielu maszynach, w tym pracę wymagającą uwagi. Interfejs jest tylko do odczytu: nie zapisuje stanu planu i nie wysyła komunikatów do agentów. Pomaga człowiekowi zobaczyć stan pętli, nie stając się kolejną warstwą sterowania.

## Granica

Loop engineering zamyka pętlę wykonania wokół zatwierdzonej specyfikacji. Sprawia, że kontynuacja, sukcesja i raportowanie stają się rutyną, podczas gdy plan pozostaje źródłem uprawnień, a demon pozostaje ograniczony. Człowiek uruchamia demona, obsługuje poświadczenia i logowanie oraz rozstrzyga wyłącznie bramki C1–C7 planu lub inne potrzeby, których zapisane uprawnienia nie obejmują. Celem pętli jest zatwierdzony plan, który osiąga określony koniec bez ciągłego nadzoru człowieka.
