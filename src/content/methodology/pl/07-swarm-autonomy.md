---
title: Autonomia roju
description: "Jak rój agentów przetrwa limit jednego konta lub utratę jednego agenta: kontrole pojemności, pakiety przekazania, sukcesja prowadzącego i eskalacja krytyczna."
order: 7
lang: pl
summary: Tory świadome pojemności, proaktywne przekazanie, sukcesja prowadzącego z epokami i taksonomia eskalacji, która utrzymuje rój w ruchu.
icon: shield
---

# Autonomia roju

[Uruchamianie wielu agentów](/pl/methodology/06-orchestration) opisuje prowadzącego i jego tory. Ten rozdział dotyczy tego, co utrzymuje takie ustawienie w ruchu, gdy jedno konto osiąga swój limit albo jeden agent znika. Tor sprawdza, ile zapasu zostało na jego koncie, i przekazuje pracę dalej, zanim się wyczerpie. Prowadzący przekazuje przywództwo albo zostaje zastąpiony, gdy zniknie. Rój pyta dewelopera tylko o to, co naprawdę krytyczne.

Awaria, na którą to odpowiada, jest konkretna: prowadzący, któremu w połowie planu kończy się limit, zostawia każdy tor bez kierunku i nic się nie dzieje, dopóki człowiek nie otworzy nowej sesji. Dzięki poniższym regułom plan posuwa się dalej w granicach autoryzacji, którą deweloper już udzielił.

Sześć reguł kształtuje wszystko, co tu opisano:

1. **Jedno zadanie na produkt.** [coding-agents-kit](/pl/kit/agentkit) (`ak`) zna konta i pojemność, [herdr-peers](/pl/kit/herdr) zna wiadomości, panele i to, kto prowadzi, a pakiet Deep Work Plan zna metodę: kiedy przekazać, czego potrzebuje następca, co eskalować. Każdy z nich pozostaje opcjonalny. Bez nich obowiązują te same reguły, a deweloper przekazuje wiadomości i ponownie uruchamia agentów.
2. **Jednostką ciągłości jest plan, nie agent.** Każde przekazanie i każda sukcesja to zwykłe wznowienie plus mały pakiet z tym, czego nie zawiera dziennik: intencją, która była w toku.
3. **Proaktywność wygrywa z reaktywnością.** Agent sprawdza swój zapas na granicach zadań i przekazuje pracę, dopóki może jeszcze napisać dobry pakiet. Reakcja po osiągnięciu limitu pozostaje siatką bezpieczeństwa.
4. **Autonomia nigdy nie poszerza uprawnień.** Przekazania, sukcesja, uruchomienia i harmonogramowanie działają w granicach autoryzacji planu. Żaden agent nie odpowiada na ekran uprawnień, bypass, logowania, zgody ani płatności, a praca przemieszcza się wyłącznie między kontami zadeklarowanymi przez dewelopera.
5. **Ciągłość nigdy nie obniża poprzeczki.** Następca dziedziczy te same bramki. Pakiet nie zamyka żadnego kryterium, nie łagodzi żadnej bramki i nie pomija żadnego przeglądu.
6. **Tanio z założenia.** Pojemność odczytuje się z pamięci podręcznej na granicach zadań, nigdy w pętli ani według zegara. Jednokierunkowe powiadomienia zastępują pytania, które nie wymagają odpowiedzi, a pakiety są małe.

## Role

| Rola | Jest | Jest właścicielem | Nigdy nie |
| --- | --- | --- | --- |
| Prowadzący | Agentem, który trzyma rekord prowadzącego jednego planu | Planu, tabeli torów, harmonogramu, kolejności wydań, scaleń i tagów w granicach autoryzacji, listy sukcesji | Zapisuje w checkoucie toru ani nie prowadzi planu, który trzyma inny prowadzący |
| Zastępca | Pierwszym osiągalnym wpisem listy sukcesji prowadzącego | Niczego, dopóki nie przejmie | Działa jako prowadzący, dopóki prowadzący jest osiągalny |
| Tor | Jednym agentem na repozytorium, strumień pracy lub zadanie, we własnym panelu na własnym koncie | Swojego planu podrzędnego lub zadania, gałęzi, bramki i pakietu | Przydziela pracy innemu torowi, scala ani taguje |
| Recenzent | Torem innego dostawcy, tylko do odczytu | Swoich ustaleń | Zapisuje w drzewie, które recenzuje |

- **Prowadzący pozostaje aktywny.** Orkiestrator, którego tory czekają na ludzkie pośrednictwo, staje. Prowadzący nigdy nie wstrzymuje roju z powodu pytania, które może rozstrzygnąć sam.
- **Jeden wykonawca na plan.** Dokładnie jeden agent wykonuje dany plan lub plan podrzędny w danym momencie. Drugi agent na tym samym planie to błąd koordynacji, który rozwiązuje prowadzący.
- **Uprawnienia pochodzą z planu, nie od peera.** Tor sam odczytuje autoryzację planu. Zgoda przekazana przez innego agenta nie dodaje niczego, czego tor jeszcze nie miał.
- **Kilku prowadzących** może pracować w jednym obszarze roboczym, każdy prowadząc inny plan. Konto jest trzymane przez jeden tor naraz za pomocą dzierżawy `ak`, więc dwóch prowadzących nigdy nie stawia dwóch piszących na jednym koncie Codex.
- **Kilka instancji jednego rodzaju** — trzy panele Grok, cztery panele Codex na jednym lub kilku profilach — to zwykłe tory. Instancje na jednym profilu dzielą pojemność tego profilu.

Każdy tor ma plan, co najmniej plan Lite we własnym repozytorium, i ten plan jest pierwszą rzeczą, którą czyta następca. Każdy tor raportuje prowadzącemu stałym słownictwem — `plan ready`, `PR open <url>`, `blocked <class> <what it needs>`, `handoff <packet path>`, `done` — i kończy każdą wiadomość jedną linią pojemności, na przykład `capacity=ok 64% @work1`, więc prowadzący rzadko musi sam odczytywać limity.

## Pętla pojemności

Agent sprawdza własny zapas przed rozpoczęciem każdego zadania, po każdej bramce lub kroku, który trwał dłużej niż 20 minut, za każdym razem, gdy jego CLI pokazuje ostrzeżenie o limicie zużycia, oraz przed przyjęciem przekazania lub przywództwa. Kontrolą jest `ak capacity --self --json` z coding-agents-kit `v0.6.0`, którą pomocnik pakietu zamienia na decyzję:

| Werdykt | Decyzja | Tor | Prowadzący, dla siebie |
| --- | --- | --- | --- |
| `ok` (powyżej niskiego progu) | kontynuuj | Kontynuuje | Kontynuuje |
| `low` (25 % lub mniej) | przygotuj | Kończy bieżące zadanie, nie zaczyna żadnego, którego nie może skończyć, zgłasza `capacity=low` | Wyznacza następcę i nie uruchamia na sobie długiej pracy |
| `critical` (10 % lub mniej albo ograniczenie szybkości) | przekaż | Dochodzi do następnego bezpiecznego punktu, pisze pakiet, powiadamia prowadzącego, zatrzymuje się | Natychmiast przekazuje przywództwo |
| `unknown` (brak źródła limitów) | kontynuuj | Zgłasza `capacity=unknown`, przekazuje przy ostrzeżeniu CLI o limicie lub ekranie `usage_limit` | Preferuje tory o znanej pojemności dla długich zadań |

- **Progi** są progami kitu: domyślnie niski przy 25 % i krytyczny przy 10 % wolnej części wiążącego okna, regulowane przez `AGENTKIT_CAPACITY_LOW` i `AGENTKIT_CAPACITY_CRITICAL`. Odczyty pochodzą z pamięci podręcznej przechowywanej przez 300 sekund, więc kontrola na każdej granicy zadania kosztuje kilka wywołań dostawcy na godzinę.
- **Histereza.** Gdy pakiet zostanie napisany, przekazanie dochodzi do końca. Agent nigdy nie wznawia tego zadania po odnowieniu się konta; właścicielem jest następca, a odnowione konto po prostu wraca do puli.
- **Presja kontekstu też się liczy.** Gdy kontekst agenta osiąga próg świeżego kontekstu z kontraktu (domyślnie 60 %), następuje ten sam pakiet i to samo przekazanie.
- **Uczciwa degradacja.** Bez kitu, ze starszym kitem lub poza uruchomieniem przez `ak` pojemność jest raportowana jako nieznana, nigdy jako ok.

**Pula należy do dewelopera.** Plan zapisuje konta, które deweloper zadeklarował dla tej pracy. Agent nigdy nie tworzy kont, nie odnawia logowań, nie zużywa resetu Codex ani nie używa konta spoza puli, a pracuje w granicach warunków każdego dostawcy. Przeniesienie pracy przed limitem, w obrębie puli, to harmonogramowanie; rotowanie kont w celu przekroczenia limitu jest zawsze niedozwolone. Dla każdego gotowego zadania prowadzący bierze najwyżej sklasyfikowane konto z `ak pick --owner <lead>`, dzierżawi je przez `ak lease`, preferuje konta o znanej pojemności dla długich zadań i innego dostawcę dla recenzentów oraz utrzymuje zastępcę. Gdy żadne konto w puli nie ma zapasu i żadne nie odnowi się w horyzoncie planu, rój zostaje odstawiony z zapisanym najbliższym resetem.

## Przekazanie toru

1. **Tor**, przy `handoff`, dochodzi do bezpiecznego punktu — zatwierdzony krok albo drzewo pozostawione bez zmian, nigdy odrzucona praca — pisze pakiet, wysyła `handoff <packet path>` do prowadzącego jako powiadomienie i zatrzymuje się. Nie zamyka własnego panelu.
2. **Prowadzący**, albo zastępca, gdy prowadzący jest nieosiągalny lub sam w stanie krytycznym, wybiera konto (`ak pick <kind> --owner <lead> --exclude @<spent>`, preferując innego dostawcę, gdy zadanie na to pozwala), dzierżawi je i uruchamia następcę w tym samym checkoucie ze zleceniem wznowienia planu z pakietu.
3. **Następca** przyjmuje pakiet — pomocnik weryfikuje plan, obowiązujący kontrakt, gałąź, commit head i niezatwierdzone ścieżki, a przy niezgodności niczego nie zapisuje — następnie wznawia plan i ponownie uruchamia każdą bramkę, którą pakiet wymienia jako niezweryfikowaną.
4. **Prowadzący** zwalnia zużytą dzierżawę i zamyka zużyty panel, gdy następca przyjmie pakiet.

**Pakiet przekazania** ([`dwp-handoff/v1`](https://deepworkplan.com/schema/dwp-handoff/v1.json)) jest zapisywany w `analysis_results/handoff/` planu z uprawnieniami tylko dla właściciela. Podaje plan, kontrakt, zadanie i krok; przyczynę (`capacity_critical`, `capacity_low`, `context_pressure`, `usage_limit` lub `lead_handover`); gdzie jest praca (repozytorium, checkout, gałąź, head, czy jest wypchnięta, niezatwierdzone ścieżki); co jest zrobione, zweryfikowane i niezweryfikowane, ze ścieżkami do dowodów; kolejne kroki w kolejności; otwarte aski; podjęte decyzje; prowadzącego i epokę; oraz kto go napisał. Pakiet to dane: nigdy nie zawiera wartości sekretu, prywatnej treści z innego repozytorium ani instrukcji poszerzającej uprawnienia. Następca na nowo wyprowadza swoje kolejne działanie z planu.

## Sukcesja prowadzącego

herdr-peers `v0.3.0` przechowuje rekord prowadzącego dla każdego planu — prowadzący, epoka, lista sukcesji i tory — i rozwiązuje adres `lead` na bieżącego prowadzącego, więc żadne zlecenie toru nie zapisuje na sztywno panelu prowadzącego.

- **Objęcie.** Prowadzący uruchamia `herdr-peers lead claim --plan <P> --succession <A,B> --lanes <A,B>`, gdy rozpoczyna plan, oraz `lead release`, gdy plan jest ukończony. Domyślna sukcesja to jego planowany następca, potem tory w checkoucie samego planu w kolejności uruchomienia, potem dowolny tor na tym samym hoście; tory w kontenerach lub na innych maszynach są na końcu.
- **Przekazanie, planowane.** Przy `low` prowadzący wyznacza następcę. Przy `critical` pisze pakiet prowadzącego — tabelę torów, otwarte aski, kolejność wydań, oczekujące scalenia, decyzje — uruchamia `herdr-peers lead handover <addr> --plan <P>`, co podnosi epokę i powiadamia każdy tor, i zatrzymuje się. Następca przyjmuje pakiet, wznawia plan orkiestratora i ponownie sprawdza każdy tor.
- **Przejęcie, nieplanowane.** Gdy prowadzący jest nieosiągalny, nie ma agenta, pokazuje ekran `usage_limit` albo ask do niego dwukrotnie przekroczy limit czasu, pierwszy osiągalny wpis listy sukcesji uruchamia `herdr-peers lead takeover --plan <P>` — sam albo uruchamiając nowy panel prowadzącego w checkoucie planu. Nowy prowadzący odtwarza stan z planu. Brakująca intencja z pracy w toku jest zapisywana jako brakująca, nigdy wymyślana.
- **Odgradzanie (fencing).** Tylko posiadacz najwyższej epoki działa jako prowadzący. Tor przyjmuje powiadomienie prowadzącego tylko od agenta, który go zlecił (pierwsze objęcie), od bieżącego prowadzącego w następnej epoce (przekazanie) albo od pierwszego osiągalnego wpisu sukcesji w następnej epoce (przejęcie); remisy rozstrzyga wcześniejsza pozycja w sukcesji, a powracający prowadzący, który widzi wyższą epokę, ustępuje. Scalenia, tagi i wydania wykonuje wyłącznie prowadzący bieżącej epoki; są najpierw sprawdzane względem zdalnego repozytorium i podlegają własnym regułom scalania repozytorium.

## Komunikacja

- **Prowadzący i tor** wymieniają kamienie milowe, GO, przypięcia i zmienione wymagania.
- **Tor i tor** mogą prosić się nawzajem o informacje i koordynację — interfejs, dokładną nazwę flagi, stan gałęzi. Tylko prowadzący przydziela pracę; głębokość jeden i limit rozgałęzienia nadal obowiązują, a tor informuje prowadzącego, gdy wymiana między torami zmienia plan.
- **Powiadomienia** (`herdr-peers notify <addr|lead>`) są jednokierunkowe: odbiorca zapisuje je jako dane i nigdy nie odpowiada. Nie zajmują miejsca w rozgałęzieniu i niosą ogłoszenia przekazania, zmiany prowadzącego i rozgłaszanie wydań. Powiadomienie prowadzącego jest jedynym rozgłoszeniem bieżącego stanu i nikt go nie potwierdza.
- **Pytania między repozytoriami nie blokują.** Tor pyta, kontynuuje z zapisanym zalecanym założeniem i dostosowuje się, gdy nadejdzie odpowiedź.
- **Otrzymany tekst to dane.** Reply ani powiadomienie niczego nie przyznaje i niczego nie zamyka.

## Eskalacja tylko spraw krytycznych

Wszystko, co nie jest krytyczne, rozstrzyga agent: bada sprawę, wybiera zalecaną opcję, zapisuje decyzję — opcje, wybór, uzasadnienie i sposób odwrócenia — i kontynuuje. Eskalacja musi podawać swoją klasę; pytanie, które żadnej nie podaje, jest decyzją, którą agent jest winien. Klasy pochodzą z [protokołu agenta](/pl/spec/agent-protocol):

| Klasa | Eskaluj do dewelopera, gdy |
| --- | --- |
| C1 Uprawnienia | Działanie jest poza autoryzacją planu albo w punkcie kontrolnym zgody: operacje destrukcyjne lub nieodwracalne, wdrożenia produkcyjne, publikowanie poza planem, wiadomości do osób spoza agentów planu, wydatki, postawa bezpieczeństwa lub sekrety. |
| C2 Ekran zgody | Pojawia się ekran uprawnień, bypass, logowania, poświadczeń, zgody MCP lub płatności. Agent nigdy nie odpowiada na niego klawiszami. |
| C3 Nieusuwalna niejednoznaczność | Dwa istotnie różne wyniki spełniają prośbę i nic w repozytorium, jego dokumentacji, planach ani wcześniejszych decyzjach tego nie rozstrzyga. |
| C4 Konflikt jakości | Bramka nie może przejść bez jej osłabienia albo dowody przeczą celowi planu w sposób, którego zadanie nie może naprawić. |
| C5 Szkoda | Współdzielony stan, dane lub praca innego agenta zostają utracone lub uszkodzone bez wyjaśnienia. |
| C6 Warunki | Pojawia się kwestia prawna, licencyjna, warunków dostawcy lub prywatności. |
| C7 Wyczerpana pojemność | Żadne konto w zadeklarowanej puli nie ma zapasu i żadne nie odnowi się w horyzoncie planu. |

W roju **krytyczna kwestia blokuje swój łańcuch zależności, a nie rój.** Prowadzący odstawia zablokowane zadanie — jego rekord zablokowania jest eskalacją, wysyłaną raz — utrzymuje każdy niezależny tor w ruchu i wznawia łańcuch, gdy deweloper odpowie. Autonomia nigdy nie zamyka ludzkiej akceptacji, dosłowne słowa dewelopera wygrywają z rekomendacją, a zgoda przekazana przez agenta jest zapisywana jako przekazana, nigdy tak, jakby napisał ją deweloper.

## Poprzeczka jakości

Rój jest wart uruchomienia tylko wtedy, gdy jego wynikowi można zaufać. [Poprzeczka jakości](/pl/spec/dwp-specification) dotyczy każdego agenta, który kontynuuje plan:

- **Bramki to hipotezy.** Nowa lub zmieniona bramka zostaje pokazana jako zawodząca na celowo wprowadzonym defekcie, zanim zostanie jej zaufane, a puste zaliczenie — brakujący plik wykonywalny, zero dopasowanych plików, pusty log — jest porażką.
- **Porównuj z bazą.** Wydajność, pokrycie i rozmiar są porównywane z gałęzią bazową, a nie tylko z progiem.
- **Najpierw zmierz, projektuj przed budową.** Poprawka lub audyt najpierw weryfikuje swoje założenie i narzędzie pomiarowe; nietrywialna zmiana spisuje interfejsy, tryby awarii, bezpieczeństwo i testy przed kodem.
- **Przegląd przed nieodwracalnym krokiem.** Lokalny AI Diff Review uruchamia się przed każdym scaleniem, tagiem lub publikacją, a zmiany metodyki lub protokołu dostają recenzenta innego dostawcy.
- **Ciągłość nigdy nie obniża poprzeczki.** Następca ponownie uruchamia to, co pakiet wymienia jako niezweryfikowane; przekazanie nigdy nie jest skrótem z pominięciem bramki.

## Zapis

Dziennik planu orkiestratora zapisuje rój: uruchomienia i wyniki torów jako zdarzenia delegacji; werdykty pojemności, przekazania i sukcesje jako obserwacje; eskalacje i odpowiedzi dewelopera jako interwencje. Pakiety i ich zapisy przyjęcia pozostają w planie, który wykonał pracę, a raport ukończenia wymienia każde przekazanie i każdą sukcesję wraz z jej pakietem.

## Przećwiczenie

Udowodnij działanie pętli, zanim zaczniesz na niej polegać. Na repozytorium testowym z małym planem orkiestratora uruchom prowadzącego i co najmniej trzy tory na różnych kontach lub u różnych dostawców. Ogranicz zgłaszaną pojemność jednego toru — `AGENTKIT_CAPACITY_CAP=@<profile>=8` obniża odczyt i nigdy nie może go podnieść — i obserwuj, jak tor pisze pakiet, prowadzący uruchamia następcę, który go przyjmuje, a następca zalicza bramkę. Ogranicz w ten sam sposób prowadzącego i obserwuj przekazanie oraz to, jak nowy prowadzący kończy plan. Następnie zapisz dowody w `analysis_results/` planu: brak jakiegokolwiek ludzkiego naciśnięcia klawisza, każdy pakiet, każdą epokę, ask między torami i bramki.
