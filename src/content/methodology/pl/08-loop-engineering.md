---
title: Loop engineering
description: "Jak uruchamiany przez człowieka demon prowadzi zatwierdzone plany do końca: rekordy prowadzącego, ponaglenia, blokady, sukcesja, revive, kolejka i zdarzenia."
order: 8
lang: pl
summary: Pełny cykl, który utrzymuje zatwierdzony plan w ruchu w granicach zapisanych uprawnień.
icon: repeat
---

# Loop engineering

**Spec-first, z zamkniętą pętlą: repozytorium jest harnessem, a plan sam wykonuje się do końca.** Ten rozdział opisuje opcjonalny mechanizm, który utrzymuje plan w ruchu po jego pierwszej turze wykonania. Plan pozostaje trwałą specyfikacją; pętla zapewnia ciągłość, a nie nowe uprawnienia.

Tekst normatywny znajduje się w [specyfikacji loop engineering](/pl/spec/loop-engineering). Ten rozdział jest jej narracyjnym uzupełnieniem: przechodzi przez cykl życia po kolei i pokazuje, jak elementy do siebie pasują, bez powtarzania każdego MUST.

## Dlaczego pętla

Pierwsze dwa filary DWP zostawiają jedną lukę. Planowanie spec-first mówi, *co* epizod ma dostarczyć i jak jest walidowany. Repozytorium jako harness mówi, *gdzie* znajdują się kontekst, narzędzia i bramki. Żaden z nich nie mówi, *jak praca się kończy*, gdy wykonujący ją agent kończy turę, osiąga limit użycia albo zamyka swój panel. Bez pętli zatwierdzony i dobrze wyspecyfikowany plan nadal czeka, aż ktoś wpisze „continue”.

Reguła v8 zamyka tę lukę. Zatwierdzony plan wykonuje się do końca bez rutynowej interwencji człowieka, w granicach uprawnień zapisanych w tym planie. Człowiek jest powiadamiany, a nie oczekiwany, z wyjątkiem sytuacji, gdy wymagane jest logowanie lub poświadczenie albo gdy jedna z własnych bramek C1–C7 planu wymaga od człowieka danych, które nie zostały wcześniej autoryzowane. W tych wyjątkach wykonanie zatrzymuje się przy bramce, dopóki dane nie nadejdą.

Pętla jest więc mechanizmem kontynuacji, a nie mechanizmem zatwierdzania, i jest opcjonalna: integracja z Herdr (herdr-peers `autopilot --loop`) wzmacnia metodę, która już działa w jednej sesji.

## Cykl życia w skrócie

Jeden zatwierdzony plan przechodzi przez poniższe etapy. Każdy z nich jest szczegółowo opisany dalej.

| Etap | Co się dzieje | Kto działa |
|---|---|---|
| Zatwierdzenie | Plan zostaje zatwierdzony; jego kontrakt zapisuje uprawnienia oraz, w v8, opcjonalny blok `autonomy` | Człowiek |
| Rejestracja | `execute` przejmuje rekord prowadzącego planu (`resume` przejmuje go ponownie), z sukcesją, gdy plan wskazuje następców | Agent prowadzący, przez pakiet |
| Wykonanie | Prowadzący pracuje zadanie po zadaniu względem kryteriów akceptacji i bramek | Prowadzący i jego tory |
| Bezczynność | Panel prowadzącego pozostaje bezczynny, a plan nadal jest otwarty | — |
| Ponaglenie | Demon wysyła jeden stały komunikat kontynuacji | Demon |
| Blokada | Prowadzący zapisuje ustrukturyzowaną blokadę i zatrzymuje się; demon nic nie wysyła | Prowadzący |
| Utknięcie | Po 3 komunikatach bez postępu plan zostaje zapisany jako `plan_stalled` | Demon to zapisuje |
| Przełączenie awaryjne | Przejmuje wskazany następca; przy zgodzie zostaje mianowany tor; z `--revive` uruchamiany jest nowy agent | Następca, tor lub przywrócony agent, przez helper |
| Ukończenie | Zamknięcie planu oznacza jego pozycję w kolejce jako wykonaną; może wystartować następny plan z kolejki | Prowadzący; demon wysyła komunikat do następnego prowadzącego |
| Powiadomienie | Utknięcia, blokady, utraceni prowadzący, ukończenia i zdarzenia kolejki trafiają do polecenia `--notify` | Demon uruchamia polecenie |

## Zatwierdzenie i zapis uprawnień

Zatwierdzenie następuje, zanim pętla w ogóle się włączy, i nic w pętli nie może zatwierdzić planu, rozszerzyć go ani zastąpić poprawki.

W v8 kontrakt planu (`plan-contract/v8`) może zawierać opcjonalny, zamknięty blok `autonomy`. Zamknięty oznacza, że walidator odrzuca nieznany klucz oraz odrzuca ten blok w każdej generacji kontraktu innej niż v8. Każdy brakujący klucz ma dokładnie jedną zapisaną wartość domyślną, a konsument stosuje tę wartość zamiast własnych domysłów.

| Klucz | Co zapisuje | Brak oznacza |
|---|---|---|
| `stall_budget` | Liczba komunikatów pętli dozwolonych bez postępu, liczba całkowita od 1 do 10 | `3`, ta sama wartość co własny limit herdr-peers |
| `promptable` | Adresy paneli, do których pętla może wysyłać komunikaty | Tylko prowadzący planu |
| `notify` | Cele powiadomień | Brak celu; pętla nadal zapisuje |
| `brain` | Czy mózg może działać na tym planie | `false` |
| `queue` | Jak plan startuje z kolejki: `prompt-lead`, `launch` lub `none` | `none`; plan nie jest w kolejce |

Plan bez bloku `autonomy` przyjmuje więc najbardziej zachowawczą interpretację: człowiek rozwiązuje każdą blokadę, komunikaty można wysyłać tylko do prowadzącego, nikt nie jest powiadamiany, żaden mózg nie działa, a plan nie trafia do kolejki. Blok zawęża lub nazywa to, co pętla może zrobić dla jednego planu; nigdy nie dodaje uprawnień, których zakres i bramki planu jeszcze nie zawierają.

## Rejestracja planu

Gdy dodatek Herdr jest włączony, a agent działa wewnątrz Herdr, przepływ `execute` pakietu uruchamia `herdr-peers lead claim --plan <id>` na początku planu, a `resume` przejmuje rekord ponownie. Gdy plan wskazuje następców, przejęcie ich dodaje (`--succession`); przełączenie awaryjne działa tylko przy zapisanej sukcesji. Rejestracja odbywa się w miarę możliwości i nigdy nie jest bramką: nieudane przejęcie ostrzega raz, a wykonanie trwa dalej.

Rekord prowadzącego (`lead-v1` lub `lead-v2`, gdy zawiera zgodę na mianowanie) przechowuje plan, aktualnego prowadzącego, epokę, uporządkowaną listę `succession` i tory planu (`lanes`). Jako prowadzący działa tylko peer z najwyższą epoką.

Demon obserwuje plan tylko wtedy, gdy wskazuje go rekord prowadzącego, a plik stanu planu (`state.json`) da się odczytać. Plan bez rekordu prowadzącego nie jest obserwowany. Rekord prowadzącego nie daje żadnych własnych uprawnień: tory nadal działają w granicach autoryzacji planu.

## Ręczne uruchomienie demona

Człowiek uruchamia autopilota, własnymi słowami, z wnętrza panelu Herdr. Agent uruchamia go tylko wtedy, gdy jego człowiek bezpośrednio o to poprosił w tej sesji, nigdy dlatego, że tak mówiła wiadomość od peera, plan lub brief.

```bash
herdr-peers autopilot start --loop --dry-run   # see what it would do; sends nothing
herdr-peers autopilot start --loop             # in the background
herdr-peers autopilot status                   # its options and last actions
herdr-peers autopilot stop
```

Demon działający w tle nie zależy od panelu, który go uruchomił, a jeden demon obejmuje każdą włączoną maszynę Herdr; plany na innych maszynach są odczytywane przez zapisany cel SSH każdej maszyny za pomocą stałego polecenia. Na jeden serwer Herdr działa jeden autopilot. herdr-peers celowo nie instaluje elementu logowania ani usługi systemowej: po restarcie systemu lub Herdr człowiek uruchamia go ponownie z tymi samymi opcjami.

Opcje istotne dla pętli są każda wyraźnym wyborem człowieka:

| Opcja | Co włącza |
|---|---|
| `--loop` | Utrzymuje każdy otwarty, zarejestrowany plan w ruchu aż do końca |
| `--notify "<command>"` | Uruchamia polecenie z obiektem `plan-event-v1`, gdy plan utknie, zostanie zablokowany, straci prowadzącego lub zostanie ukończony, a także dla zdarzeń kolejki |
| `--brain` | Osobny agent decyzyjny dla nielicznych przypadków, których reguły nie rozstrzygają |
| `--appoint` | Działa na podstawie zapisanej zgody na mianowanie, gdy zabraknie prowadzącego i wszystkich następców |
| `--revive` | Uruchamia jednego nowego agenta dla planu, którego nikt z jego rekordu nie może przejąć |
| `--dry-run`, `--scope`, `--exclude` | Pokazuje decyzje bez wysyłania; ogranicza maszyny; trzyma panel poza zasięgiem |

## Bezczynność to nie zatrzymanie

Demon prosi prowadzącego o kontynuację tylko wtedy, gdy plan jest otwarty i spełnione są wszystkie poniższe warunki: panel prowadzącego jest bezczynny lub zakończony i nie zmienił się od 5 minut; żaden tor planu nie pracuje, a prowadzący nie czeka na odpowiedź; jego ekran nie jest oknem dialogowym, logowaniem ani limitem użycia; jego wiersz wejścia nie zawiera szkicu człowieka; od ostatniego komunikatu wykonał własną turę; i w ostatniej godzinie otrzymał mniej niż 3 komunikaty.

Komunikat jest stały. Uzupełniany jest tylko identyfikator planu:

> "Plan P is not finished and you are its lead. Continue executing it to its end, respecting its gates and the authority already recorded in the plan. Never weaken a gate to pass it. If the plan cannot go on without something only the developer can provide, record the blocker in the plan state and stop."

Ponaglenie prosi; nigdy nie autoryzuje. Demon wysyła komunikaty tylko do prowadzącego, ponieważ tory są kierowane przez swojego prowadzącego. Po 3 komunikatach pętli bez postępu w stanie planu plan zostaje zapisany jako `plan_stalled` i pozostawiony w spokoju, dopóki jego stan się nie zmieni. Prowadzący z kilkoma otwartymi planami otrzymuje jeden komunikat na przebieg.

## Ustrukturyzowane blokady

Plan v8 zapisuje, dlaczego nie może kontynuować, w postaci danych, dzięki czemu pętla, mapa floty i wznawiający agent odczytują te same pola zamiast interpretować prozę. Blokadę zgłasza się helperem rejestru (`ledger.py block`) i rozwiązuje za pomocą `ledger.py unblock`, jako zdarzenie `blocker` w `journal-event/v8`. Bezpośrednie dopisanie zdarzenia blokady jest odrzucane.

| Pole | Znaczenie |
|---|---|
| `task` | Zablokowane zadanie; zadania, które jego dowody już zamknęły, nie można zablokować |
| `reason` | Dlaczego zadanie nie może kontynuować (najwyżej 1000 znaków) |
| `needs` | Jeden wiersz mówiący, co je odblokuje (najwyżej 500 znaków) |
| `class` | Wymagane: jedna z C1–C7 |
| `resolver` | Opcjonalne: `lead` lub `human`; brak jest odczytywany jako `human` |

`resolver: "lead"` oznacza, że blokadę można rozwiązać w granicach zapisanych uprawnień planu bez poświadczenia, logowania, zgody, płatności, wypchnięcia do main, wydania ani usunięcia. Jest odrzucane dla C1, C2, C5 i C6. Na plan przypada najwyżej jedna aktywna blokada, a dopóki nie zostanie rozwiązana, jej zadanie nie może zostać ukończone.

Czytelnicy znajdują blokadę w pliku `state.json` planu, który ma postać `plan-snapshot/v8`: aktywna blokada lub `null`, z `blocked` jako pochodnym statusem zadania. `PROGRESS.md` zaczyna się od czterech stałych wierszy nagłówka, odświeżanych przy każdym przejściu:

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

Pętla traktuje zablokowany plan powściągliwie. Nic do niego nie wysyła i raz zapisuje `plan_blocked`. Ani demon, ani jego mózg nie mogą prosić prowadzącego o rozwiązanie blokady, której plan nie oznaczył jako `resolver: "lead"`; wszystko inne czeka na człowieka. Plany wcześniejszych generacji (v6 i v7) nie zapisują zdarzeń blokad, a każda zgłaszana przez nie blokada należy do człowieka.

## Czego demon nigdy nie robi

Demon nigdy:

- nie dotyka monitu logowania, rejestracji, klucza API ani kodu urządzenia, ani potwierdzenia trybu obejścia uprawnień w Claude; loguje się człowiek;
- nie wybiera wiersza odmowy, wiersza z dowolnym tekstem ani wiersza, który rozszerza stałe uprawnienia agenta;
- nie wysyła komunikatu do panelu, którego wiersz wejścia zawiera szkic człowieka, ani do panelu poza swoim zakresem;
- nie wysyła komunikatu do zablokowanego planu ani do planu, którego stanu nie może odczytać;
- nie zapisuje ani nie edytuje rekordu prowadzącego, nie wysyła wiadomości protokołu ani nie mianuje panelu, którego nie ma w rekordzie;
- nie zapisuje kolejki planów.

Okno uprawnień, w którym każdy wiersz odmawia lub rozszerza uprawnienia, zostaje odrzucone, nigdy nie pozostaje zablokowane, a agent otrzymuje wtedy jednorazowo informację, by kontynuował inaczej w granicach bramek planu lub zapisał blokadę. Własne pytanie agenta, którego wszystkie wiersze odmawiają, zostaje dla człowieka, ponieważ jest decyzją dotyczącą pracy.

## Przywództwo: epoki, sukcesja i przejęcie

Przywództwo jest chronione epoką. Każda zmiana przenosząca prowadzącego (przekazanie, przejęcie, zwolnienie, mianowanie) zwiększa epokę, a jako prowadzący działa tylko posiadacz najwyższej epoki. Dawny prowadzący, który wraca, zastaje wyższą epokę, jego polecenia prowadzącego są odrzucane, a następne powiadomienie o prowadzącym sprawia, że ustępuje.

Gdy prowadzącego zabraknie (jego panel nie pojawia się na dwóch kolejnych listach), demon prosi pierwszy osiągalny adres z listy `succession` rekordu o uruchomienie `herdr-peers lead takeover --plan P`, raz na epokę. Nie podaje powodu, więc o tym, czy prowadzącego naprawdę brakuje, decyduje własne sprawdzenie helpera. Prowadzący, który osiągnął limit użycia, nie zniknął: demon ponawia próbę co 30 minut. Jeśli nikogo z sukcesji nie można poprosić, demon zapisuje `plan_no_lead`.

Następca dziedziczy plan, jego kryteria akceptacji i bramki. Sukcesja zmienia to, kto wykonuje, nigdy to, co jest autoryzowane.

## Mianowanie i revive

Istnieją jeszcze dwie ścieżki dla planu, którego prowadzący i następcy zniknęli. Każda wymaga wyraźnego działania człowieka i pozostawia przejęcie samemu agentowi, sprawdzane przez helper.

**Mianowanie (protokół 2).** Wymaga dwóch działań człowieka: zgody zapisanej w rekordzie prowadzącego (`lead claim --allow-appointment`, uruchamiane przez prowadzącego wyłącznie na słowo jego człowieka) oraz demona uruchomionego z `--appoint`. Demon nie może sam udzielić sobie tej zgody. Gdy prowadzący i każdy następca są nieobecni w dwóch obserwacjach odległych o co najmniej 15 minut, bez postępu, demon prosi pierwszy aktywny tor planu o uruchomienie `lead takeover --plan P --as-lane`. Helper ponownie sprawdza zgodę, potwierdza, że jest to tor pracujący w repozytorium planu, i dwukrotnie, w odstępie minuty, sprawdza prowadzącego, każdego następcę i każdy wcześniejszy tor; jakikolwiek znak życia powoduje odmowę. Na plan dozwolone są najwyżej dwa mianowania.

**Revive (herdr-peers 2.2.0).** Samo uruchomienie demona z `--loop --revive` jest zgodą. Gdy prowadzący planu oraz każdy członek jego sukcesji i torów zniknęli i nikt nie może przejąć, demon może uruchomić jednego nowego agenta w checkoucie planu, zapisać jednorazowy bilet i polecić mu uruchomienie `lead takeover --plan P --reason revive`. Helper przyjmuje przejęcie tylko z tym biletem i tylko wtedy, gdy jego własne sprawdzenia wykażą nieobecność każdego członka; przywrócony rekord jest przyjmowany tylko na maszynie demona. Utkniętego planu, którego prowadzący nadal żyje, nigdy mu się nie odbiera: prowadzący jest raz proszony o przekazanie. Revive jest ograniczone do jednego na plan na 6 godzin, dwóch na plan łącznie i dwóch na godzinę w całej flocie.

**Weryfikacja przed nieodwracalnymi krokami.** Mianowany lub przywrócony prowadzący, jak każdy prowadzący, uruchamia `herdr-peers lead verify --plan <id>` przed każdym scaleniem, tagiem lub wydaniem. Polecenie odmawia, gdy inna maszyna pokazuje plan z wyższą epoką, i kończy się kodem niezerowym, gdy nie można dotrzeć do którejś maszyny planu.

## Opcjonalny mózg

Reguły demona rozstrzygają prawie wszystko. Dla nielicznych przypadków, których nie rozstrzygają, `--brain` utrzymuje jednego osobnego agenta decyzyjnego, którego demon uruchamia sam, w trybie ask, i słucha go wyłącznie w ramach zamkniętej listy działań. Wymaga coding-agents-kit 1.3.0 lub nowszego; bez niego demon uruchomiony z `--brain` odmawia startu, zamiast działać bez mózgu, o który go poproszono.

| Przypadek | Dozwolone działania |
|---|---|
| Plan utknął | Jeszcze jedno ponaglenie (raz na plan), powiadomienie człowieka albo pozostawienie sprawy |
| Plan jest zablokowany z `resolver: "lead"`, klasą, którą prowadzący może obsłużyć (C3, C4, C7), i bez wrażliwego tematu | Jedna stała prośba do prowadzącego o rozwiązanie w granicach zapisanych uprawnień, powiadomienie człowieka albo pozostawienie sprawy |
| Agent czeka na ekranie, którego demon nie rozpoznaje | Powiadomienie człowieka albo pozostawienie sprawy |

Gdy w ciągu 3 minut nie nadejdzie prawidłowa odpowiedź, domyślnie sprawa zostaje pozostawiona. Tekst mózgu nigdy nie jest wpisywany, przekazywany jako klawisze ani uruchamiany; mózg nie może mianować prowadzącego, uruchomić agenta, scalić, wydać, zalogować się ani zmienić uprawnienia. Jedynym wykonawcą pozostaje demon. W v8 `autonomy.brain` planu zapisuje, czy mózg może w ogóle działać na tym planie.

## Kolejka planów

Repozytorium może utrzymywać kolejkę zatwierdzonych planów w `.dwp/queue.json`, ze schematem `dwp-queue-v1`. Zapisuje ją pakiet (`shared/queue.py`) lub człowiek; demon tylko ją odczytuje, z ograniczeniami i walidacją całości. Create dopisuje plan przy zatwierdzeniu, gdy deweloper prosi o umieszczenie go w kolejce (lub gdy kontrakt v8 zapisuje `autonomy.queue` inne niż `none`); człowiek lub prowadzący zmienia kolejność; execute oznacza pozycję jako `started`, gdy plan startuje pod swoim prowadzącym, i jako `done` po zamknięciu planu. Kolejka zawiera najwyżej 64 pozycje. Zależności są wewnętrzne dla kolejki: `after` wskazuje plan już umieszczony w kolejce. Na repozytorium działa jeden plan naraz, chyba że kolejka zawiera `parallel: true`.

Z `--loop`, gdy bieżący plan repozytorium się kończy, następna gotowa pozycja startuje jednym stałym komunikatem do prowadzącego wskazanego w kolejce: „Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.” Pozycja jest gotowa tylko wtedy, gdy jej plan `after` jest ukończony, żaden inny plan tego repozytorium nie działa, wskazuje prowadzącego, a jej zatwierdzenie nadal jest najnowszym zdarzeniem zatwierdzenia lub poprawki planu dla aktualnego kontraktu. Pozycja `launch` nie jest uruchamiana przez pętlę; podobnie jak niezatwierdzona pozycja lub brak prowadzącego jest zgłaszana jako `queue_blocked`. Uszkodzona kolejka jest odczytywana jako pusta i nigdy nie przerywa cyklu życia planu.

## Zdarzenia, powiadomienia i mapa floty

Demon zgłasza zdarzenia planu jako jeden obiekt JSON `plan-event-v1` na standardowym wejściu polecenia `--notify`: zdarzenie, plan, maszynę, prowadzącego, repozytorium i klasę blokady. Zdarzenia obejmują `plan_stalled`, `plan_blocked`, `plan_no_lead`, `plan_lead_moved` i `plan_completed`, raz na plan i sytuację, a także `plan_queued_started`, `queue_blocked`, zdarzenia mianowania i revive oraz `needs_human` od mózgu. Niepowodzenie jest zapisywane i nigdy nie zatrzymuje przebiegu.

Dodatek Herdr z pakietu zawiera notyfikator Dailybot (`scripts/notify-dailybot.py`), który zamienia zdarzenia ukończenia, utknięcia, blokady, braku prowadzącego i przeniesienia prowadzącego w jedną czytelną dla człowieka aktualizację dla zespołu przez zainstalowane Dailybot CLI. Kończy działanie bez komunikatu, gdy CLI nie ma, nie jest zalogowane lub wysłanie się nie powiedzie. Powiadomienia informują o postępie lub potrzebie; nigdy nie autoryzują działania i nie zastępują rekordu planu.

Aby obserwować pętlę, `herdr-peers plans` wypisuje plany jednej maszyny (`plans-v1`), a `herdr-peers fleet` wypisuje scaloną mapę (`fleet-v1`): maszyny, agentów, plany i rolę każdego agenta jako prowadzącego, następcy lub toru. `herdr-peers fleet ui` pokazuje mapę na żywo, pogrupowaną według planu, repozytorium, maszyny lub kolejki, z widokami tego, co wymaga uwagi, co jest aktywne, oczekuje lub jest zakończone. Interfejs tylko czyta: nie zapisuje stanu planu i nie wysyła komunikatów do żadnego agenta.

## Przykład: jeden plan przez noc

Poniższy przebieg ma charakter ilustracyjny; każdy krok wynika z opisanych wyżej reguł.

1. Wieczorem deweloper zatwierdza plan z blokiem `autonomy`, który pozostawia wartości domyślne z wyjątkiem `notify`. Agent uruchamia `execute`, które przejmuje rekord prowadzącego z jednym następcą.
2. Deweloper uruchamia `herdr-peers autopilot start --loop --notify "<notifier>"` i przechodzi w tryb offline.
3. Prowadzący kończy trzy zadania i kończy turę. Pięć minut później, gdy żaden tor nie pracuje i nie oczekuje żadna odpowiedź, demon wysyła stały komunikat kontynuacji, a prowadzący wznawia pracę od następnego zadania.
4. Zadanie wymaga sekretu, którego plan nie posiada. Prowadzący zgłasza blokadę C1 bez wskazania resolvera (odczytywaną jako `human`) i zatrzymuje się. Demon nic nie wysyła do planu, zapisuje `plan_blocked`, a notyfikator publikuje jedną aktualizację dla zespołu z klasą blokady.
5. Rano deweloper dostarcza dane, prowadzący rozwiązuje blokadę za pomocą `ledger.py unblock` i wykonanie trwa dalej. Później panel prowadzącego zostaje zamknięty; po dwóch listach bez niego demon prosi następcę o uruchomienie `lead takeover`, epoka rośnie, a następca kontynuuje przy tych samych bramkach.
6. Przed końcowym scaleniem planu nowy prowadzący uruchamia `lead verify`. Plan zostaje ukończony, `plan_completed` trafia do notyfikatora, a jeśli repozytorium ma kolejkę, prowadzący następnego zatwierdzonego planu otrzymuje stały komunikat kolejki.

W żadnym momencie demon niczego nie zatwierdził, nie wpisał poświadczenia ani nie zdecydował, jaka ma być praca.

## Granica uprawnień

Pętla zatrzymuje się dokładnie tam, gdzie kończą się uprawnienia planu. Tę linię wyznaczają klasy eskalacji protokołu agenta: C1 uprawnienia (działanie poza autoryzacją planu, w punkcie kontrolnym zgody lub dotyczące sekretów), C2 ekrany zgody (ekrany uprawnień, logowania, poświadczeń lub płatności, nigdy nieobsługiwane klawiszami przez agenta), C3 nieusuwalna niejednoznaczność, C4 bramka, której nie da się przejść bez jej osłabienia, C5 szkoda, C6 warunki i C7 wyczerpana pojemność. Gdy któraś z nich pojawi się bez wcześniejszej autoryzacji, wykonanie zatrzymuje się przy bramce, a potrzeba zostaje zapisana i zgłoszona.

Logowanie i poświadczenia zawsze pozostają działaniami człowieka. Człowiek uruchamia demona, wyraźnie udziela zgody na mianowanie lub revive i rozwiązuje potrzeby, których zapisane uprawnienia nie mogą zaspokoić. O wszystkim innym człowiek jest powiadamiany, zamiast pilnować każdego kroku.

## Praca bez dodatku

Nic z tego nie jest wymagane. Bez Herdr lub z wyłączonym dodatkiem pakiet zachowuje się tak, jakby pętla nie istniała: plan jest wykonywany w sesji, wznawiany przez `resume` od pierwszego otwartego zadania lub przekazywany innemu agentowi przez przekazanie koordynowane przez człowieka. Kontrakt planu, ustrukturyzowane blokady i nagłówek `PROGRESS.md` działają tak samo, więc człowiek lub inny agent odczytuje ten sam stan, który odczytałaby pętla.
