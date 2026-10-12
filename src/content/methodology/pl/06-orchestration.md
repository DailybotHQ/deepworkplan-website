---
title: Uruchamianie wielu agentów
description: "Jak agent prowadzący uruchamia wiele torów w panelach, kontenerach i na innych maszynach, na kontach z zapasem, z jedną gałęzią i wydaniem na repozytorium."
order: 6
lang: pl
summary: Model prowadzącego i torów do orkiestracji wielu agentów w panelach, na maszynach, kontach i w repozytoriach.
icon: network
---

# Uruchamianie wielu agentów

Jeden agent na jednym planie to ustawienie domyślne i obejmuje większość pracy. Część pracy jest jednak szersza niż jedna sesja: zmiana obejmująca kilka repozytoriów, wydanie, które musi trafić we właściwej kolejności, albo backlog, który jednemu agentowi zająłby dni. DWP skaluje się do takiej pracy bez zmiany swojego kontraktu. Plan pozostaje źródłem prawdy, każde zadanie nadal zamyka się na własnej bramce, a dodatkowi agenci to **tory** (lanes), które koordynuje **prowadzący** (lead).

Ten rozdział opisuje model. Korzysta z trzech opcjonalnych addonów — [Herdr](/pl/kit/herdr) do paneli i peerów, [agentkit](/pl/kit/agentkit) do kont oraz [devcontainer](/pl/kit/devcontainer) do kontenerów — i żaden z nich nie jest wymagany w planie z jednym agentem.

## Prowadzący i jego tory

**Prowadzący** jest właścicielem planu nadrzędnego. Ustala tory, przekazuje każdemu jego zakres, zbiera kamienie milowe i daje sygnał, który pozwala torowi scalić zmiany lub wydać wersję. Nie pisze kodu innego toru.

**Tor** to jeden agent z jednym zakresem — zwykle jednym repozytorium. Czyta `AGENTS.md` tego repozytorium, uruchamia jego bramkę i przechowuje własny plan w repozytorium. W [hubie orkiestratora](/pl/methodology/05-archetypes) plan nadrzędny znajduje się w `.dwp/plans/` huba wraz z tabelą śledzenia planów podrzędnych, a plan każdego toru znajduje się w jego własnym repozytorium i używa identyfikatorów planów oraz bramki tego repozytorium.

| Rola | Jest właścicielem | Nigdy nie |
| --- | --- | --- |
| Prowadzący | Planu nadrzędnego, listy torów, kolejności wydań, GO | Edytuje repozytorium toru |
| Tor | Jednego repozytorium: jego gałęzi, planu, bramki i pull requesta | Scala ani wydaje przed GO prowadzącego |

## Gdzie działają tory

Tor to agent w panelu terminala, a panel może znajdować się w kilku miejscach. [Herdr](https://herdr.dev) umieszcza każdego agenta w panelu i dociera do innych maszyn przez SSH, więc prowadzący widzi każdy tor na jednym pasku bocznym.

- **Na hoście.** Jeden panel na tor, obok prowadzącego. Najszybsza konfiguracja, dla repozytoriów, w których programista już pracuje.
- **W kontenerze.** Kontener [devcontainer-kit](/pl/kit/devcontainer) dołącza do sieci Herdr przy `dck up`: jego agenci docierają do hosta i innych kontenerów, a host dociera do nich. Kontener jest piaskownicą, więc jego agenci mogą działać w trybie autonomii.
- **Na innej maszynie.** Każda maszyna, do której Herdr dociera przez SSH, obsługuje tory w ten sam sposób, jeśli również ma zainstalowane herdr-peers.

Miejsce zmienia izolację, a nie protokół: tor w kontenerze i tor na hoście koordynują się z prowadzącym w ten sam sposób.

## Konta i dostawcy według zapasu

Wielu agentów szybko zużywa limity. Każdy tor działa na własnym koncie — jednym CLI i jednym profilu w [coding-agents-kit](/pl/kit/agentkit) — więc tory nie wyczerpują tego samego okna, a konto, które osiągnie limit, zatrzymuje jeden tor, nie wszystkie.

- **`ak usage`** pokazuje limit pozostały na każdym koncie i profilu, raz na partię.
- **`ak pick <kind> --count N`** zwraca N kont z największym zapasem, od najlepszego; `--exclude` pomija zajęte konto, `--model` liczy okno jednego modelu, a `--need` odmawia startu bez wystarczającego zapasu.
- **`ak <kind> @<profile>`** uruchamia agenta toru na tym koncie, w jego panelu.

Dostawców łączy się w ten sam sposób. Tor Claude może pisać, podczas gdy tor Codex recenzuje, każdy na koncie, które `ak pick` wybrało dla jego rodzaju. Tor w kontenerze może korzystać z kont hosta: gdy w profilu hosta devcontainer-kit programisty włączone jest `host_profiles`, kontener otrzymuje profile hosta dla CLI instalowanych przez repozytorium — Claude przez długoterminowy token na profil, Codex przez swój plik uwierzytelniania — i nie potrzebuje własnego logowania. Używaj wyłącznie własnych kont i przestrzegaj warunków każdego dostawcy: rozkładaj pracę między nie, ale nigdy nie rotuj kont, aby obejść limit.

## Uruchamianie i odblokowywanie torów bez człowieka

Prowadzący może uruchamiać tory i utrzymywać je w ruchu, gdy nikt nie siedzi przy klawiaturze. Gdy deweloper zezwolił na pracę bez nadzoru — stałym poleceniem lub wstępną autoryzacją planu — żadne kolejne uruchomienie nie wymaga dodatkowej zgody. Prowadzący używa do tego własnych poleceń Herdr; żaden kod kitu nie wysyła naciśnięć klawiszy. Procedura ma stałą kolejność: przygotować raz, unikać monitu, wykryć zatrzymanie, wysyłać klawisze tylko w jednym przypadku, eskalować resztę.

1. **Przygotuj raz, jako deweloper.** Claude Code raz na profil prosi o potwierdzenie swojego trybu bypass-permissions. To potwierdzenie jest własnym krokiem dewelopera, wykonywanym przy tworzeniu profilu; w kontenerze devcontainer-kit kit zapisuje je wyłącznie we własnych katalogach domowych kontenera. Żaden agent nigdy nie wysyła za nie klawiszy.
2. **Unikaj.** `ak pick <kind>` wskazuje konto z największym zapasem, a `herdr pane run <pane> 'ak <kind> @<profile> --trust-cwd'` uruchamia tor w jego własnym folderze. `--trust-cwd` (lub `AGENTKIT_TRUST_CWD=1`) z góry oznacza ten folder jako zaufany, więc Claude i Codex pomijają ekrany zaufania do folderu bez naciskania klawiszy.
3. **Wykryj.** `herdr-peers lanes` (lub `herdr agent list`) pokazuje każdy tor jako pracujący, bezczynny, zablokowany lub zakończony. Dla toru zablokowanego albo bezczynnego bez wyjścia `herdr-peers status <pane>` klasyfikuje ekran, na którym stoi — zaufanie do folderu, potwierdzenie bypass, logowanie, uprawnienie lub nieznany — wraz z udokumentowanym kolejnym krokiem, a `herdr pane read <pane>` go pokazuje.
4. **Jedno naciśnięcie, jeden przypadek.** Jedyne klawisze, jakie prowadzący może wysłać, to odpowiedź na ekran zaufania do folderu, w panelu, który sam uruchomił, gdy `--trust-cwd` było niedostępne. Czyta ekran przed wysłaniem klawiszy, wysyła najmniej klawiszy, które na niego odpowiadają, i czyta ponownie.
5. **Wszystko inne odczytaj, zapisz i eskaluj.** Potwierdzenie trybu bypass-permissions w Claude, monity logowania i poświadczeń, prośby o uprawnienia dla poszczególnych akcji, potwierdzenia operacji destrukcyjnych, monity płatności lub planu, nieznane ekrany i panele, których prowadzący nie utworzył, trafiają do dewelopera jako zablokowany kamień milowy, nigdy jako naciśnięcia klawiszy.
6. **Rezygnacja wygrywa.** Przy `AGENTKIT_PERMISSIONS=ask` tory pytają, zanim zadziałają, a prowadzący nigdy nie obchodzi monitu, który wprowadza rezygnacja.
7. **Uruchom ponownie.** Jeśli agent zakończy działanie, prowadzący uruchamia go ponownie na tym samym koncie albo wybiera inne. Utracone logowanie to monit o poświadczenia: podlega eskalacji.

Każda interwencja — co pokazywał ekran, jakie klawisze wysłano, co nastąpiło potem — jest zapisywana w planie nadrzędnym.

## Koordynacja przez herdr-peers

Tory i prowadzący komunikują się przez [herdr-peers](/pl/kit/herdr): **ask** niesie znacznik, który autoryzuje dokładnie jedną **reply**, a każda wymiana jest zapisywana. Prowadzący utrzymuje protokół w małej skali:

- **Kamienie milowe w górę.** Każdy tor raportuje w stałych punktach — plan gotowy, pull request otwarty, zablokowany, zakończony — i między nimi pracuje dalej, nie czekając na odpowiedź.
- **Pytania jako ask.** Tor, który potrzebuje decyzji, pyta prowadzącego; prowadzący odpowiada jedną reply.
- **Głębokość jeden.** Na reply nigdy się nie odpowiada, a tor nie deleguje dalej. Rozgałęzienie na wywołującego jest ograniczone, domyślnie do czterech peerów.
- **Dane, nie instrukcje.** Reply nie przyznaje niczego, czego odbiorca jeszcze nie miał. Twierdzenie toru, że jego bramka przeszła, sprawdza się, uruchamiając bramkę.
- **Zapis tego, kto co zrobił.** Każdy zapis delegacji podaje konto i dostawcę toru, dzięki czemu plan nadrzędny pokazuje, które konto wykonało którą pracę.
- **Lane’y Codexa podają swój panel.** Codex uruchamia polecenia lane’a z serwera w tle wspólnego dla wszystkich sesji danego konta, więc odziedziczony identyfikator panelu może należeć do innego lane’a. Lane Codexa przekazuje własny panel, wskazany w zleceniu lidera, przez `--pane <pane>` przy każdym poleceniu herdr-peers (`ask`, `reply`, `notify`, `check`, `wait`, `lanes`, `cancel`).

Prowadzący może zobaczyć całą orkiestrę naraz: `herdr-peers lanes` wyświetla każdy tor z jego stanem, a [DeepWorkPlan Vim](/pl/kit/vim) pokazuje tory planu orkiestratora obok samego planu (`:DwpLanes`).

## Jedna gałąź, jedno wydanie na repozytorium

Zasada, która utrzymuje wiele torów w stanie możliwym do przeglądu, jest prosta: **jeden tor na repozytorium, na jego bazowym checkoucie, z jedną gałęzią, jednym pull requestem i jednym wydaniem** dla całej zmiany. Tor nie dzieli swojej pracy na kilka gałęzi ani worktree. Worktree są tylko na wypadek, gdy dwóch piszących musi dzielić jedno repozytorium: każdy dostaje własny, tak aby każda ścieżka miała jednego piszącego.

Pull request pozostaje otwarty, zielony i oznaczony etykietą do przeglądu aż do GO prowadzącego. Wtedy tor scala i taguje, a następnie zgłasza tag z powrotem.

## Kolejność wydań

Repozytoria zależą od siebie nawzajem, więc wydaje się je w kolejności zależności: najpierw narzędzia, potem to, co je przypina, potem dokumentacja opisująca wynik, a na końcu konsumenci, którzy go przyjmują. Prowadzący pilnuje kolejności i wysyła GO po jednym repozytorium naraz. Tor, który przypina wydanie innego repozytorium, czeka na jego tag, zanim zapisze przypięcie, więc żadne przypięcie nigdy nie wskazuje na wydanie, które nie istnieje.

## Punkty kontrolne

Plan nadrzędny zamyka się na podstawie dowodów, nie raportów:

1. **Dla każdego toru.** Bramka każdego toru przechodzi na jego własnej gałęzi, a przegląd jego pull requesta jest czysty. Przegląd może być osobnym torem: [AI Diff Reviewer](/pl/kit/ai-diff-reviewer) przegląda pull request każdego toru, a z addonem [Dailybot](/pl/kit/dailybot) każdy tor raportuje zespołowi własne postępy.
2. **Dla każdego wydania.** Każdy tag istnieje i przypina to, czego potrzebuje następne repozytorium.
3. **Integracja.** Po ostatnim wydaniu punkt kontrolny uruchamia konsumentów na wydanych wersjach i zapisuje werdykt w `analysis_results/` planu nadrzędnego.
4. **Przegląd końcowy.** Przegląd bezpieczeństwa obejmuje wszystko, co przekroczyło granicę — przede wszystkim konta, tokeny i pliki udostępnione kontenerom — zanim plan nadrzędny zostanie ukończony.

## Bezpieczeństwo

- Nigdy nie umieszczaj klucza, tokenu ani sekretu w ask, prompcie ani logu; odwołuj się do zmiennych po nazwie.
- Współdzielone zasoby dostają blokadę: tor zakłada ją przed ciężkim krokiem, takim jak budowanie kontenera, i zwalnia ją potem.
- Rezygnacja z uprawnień, gdy jest ustawiona, wygrywa dla każdego toru i każdego agenta, którego tor uruchamia.
- Tor, który nie może kontynuować, zgłasza to jako zablokowany kamień milowy i zatrzymuje się; decyduje prowadzący.

## Gdy wyczerpie się konto lub prowadzący

Długi przebieg trwa dłużej niż którekolwiek pojedyncze konto. Od coding-agents-kit `v0.6.1` i herdr-peers `v0.3.1` tor sprawdza własną pojemność na każdej granicy zadania i przekazuje swoją pracę dalej za pomocą pakietu, zanim jego konto się wyczerpie; prowadzący przekazuje przywództwo albo zostaje zastąpiony przez swojego zastępcę, a do dewelopera trafiają tylko kwestie krytyczne. [Autonomia roju](/pl/methodology/07-swarm-autonomy) opisuje pętlę, pakiet, sukcesję i klasy eskalacji.
