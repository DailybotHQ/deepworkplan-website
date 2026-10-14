---
title: Zasoby i możliwości
description: "Manifesty kontekstu dla każdego zadania, koperta zasobów, możliwości hosta, rejestr addonów .dwp/config.json oraz możliwości dodawane przez włączone addony."
order: 10
lang: pl
section: Record layer
---

# Zasoby i możliwości

> **Zakres wersji:** Ta strona streszcza cztery normatywne dokumenty aktualnego standardu, DWP 7.0.0, w wydaniu `v7.8.1`: [`V6_CONTEXT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_CONTEXT.md), [`V6_RESOURCES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_RESOURCES.md), [`CONFIG.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/CONFIG.md) i [`V7_ABILITIES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V7_ABILITIES.md). Tam, gdzie ta strona i te pliki się różnią, rozstrzygają pliki.

**Status: stabilna (kontekst i zasoby od 6.0.0; konfiguracja i możliwości od 7.0.0).** Te reguły wiążą plany linii v6 ([Warstwa rekordów](/spec/record-layer)); standard v5 pozostaje nienaruszony. Słowa kluczowe MUST (MUSI), MUST NOT (NIE MOŻE), SHOULD (POWINIEN), SHOULD NOT (NIE POWINIEN) i MAY (MOŻE) interpretuje się zgodnie z opisem w RFC 2119.

## Manifest kontekstu dla każdego zadania

Przed każdym zadaniem agent wyprowadza **manifest kontekstu** z kontraktu i pełnego dziennika (`context_manifest.py`). Jest to widok pochodny, nigdy nieprzechowywany jako stan: dwukrotne wyprowadzenie z tych samych rekordów MUSI dać identyczne bajty, a manifest NIE MOŻE czytać niczego poza planem i jego repozytorium. Jego kształt jest opublikowany jako [`context-manifest/v6`](https://deepworkplan.com/schema/context-manifest/v6.json).

| Sekcja | Wyprowadzana z |
| --- | --- |
| `identity` | nazwa planu, identyfikator i rewizja aktywnego kontraktu |
| `authorization` | zdarzenia zatwierdzenia, dosłownie, w tym punkty kontrolne zgody |
| `repository_rules` | zakres kontraktu oraz niezmienniki z ich bieżącym stanem oceny |
| `acceptance` | kryteria zadania wraz z ich stanem zamknięcia |
| `touched_surface` | zadeklarowane pliki z bieżącymi skrótami ich zawartości; brakujący plik jest wykazywany jako brakujący |
| `evidence` | wskaźniki dowodów z okna, które rozwiązują się na dysku |
| `dead_ends` | nieudane bramki, odmowy, odrzucone adaptacje i niedyskryminujące kontrole |
| `freshness` | odcisk danych wejściowych, które manifest podsumowuje |
| `next_action` | dokładnie jeden następny krok z konkretnym poleceniem |

`authorization`, `repository_rules` i `acceptance` są **obowiązkowe**: przycinanie kontekstu nigdy nie może ukryć granicy akceptacji ani autoryzacji. Drabina następnych działań jest uporządkowana (zatwierdzenie, rozpoczęcie, autorytet, kontrola, dowód, ukończenie) i nigdy nie przedstawia zwykłej zaliczonej bramki jako zamykającej kryterium kontrolowane.

**Ślepe zaułki są zachowywane.** Wpis opuszcza skrót tylko na podstawie udowodnionych faktów z rekordów (ten sam odcisk później przeszedł, nowsza zduplikowana odmowa go zastąpiła albo rewizja kontraktu go zdezaktualizowała); sama zmiana powierzchni NIE MOŻE go usunąć. **Świeżość jest sprawdzana:** podsumowanie, którego zapisany odcisk danych wejściowych już się nie zgadza, jest nieaktualne, a podsumowanie bez odcisku jest nieaktualne z definicji. **Historia ładuje się tylko na wyzwalacz** — zapisane przekazanie pracy lub poprawka dotycząca zadania; w przeciwnym razie kontekstem zadania jest wyłącznie manifest.

## Rozliczanie czterech wielkości

Obciążenie instrukcjami i koszt są raportowane jako cztery odrębne wielkości: statyczne **bajty instrukcji**, **tokeny dostawcy** (tylko tam, gdzie zapisał je licznik hosta), **koszt pieniężny** (tylko z zapisanych próbek rzeczywistych stawek) oraz **czas zegarowy** (ze znaczników czasu zdarzeń). Brakująca wielkość jest raportowana jako brakująca wraz z powodem, nigdy nie jest szacowana, a bajty nigdy nie są przeliczane na tokeny ani pieniądze.

## Możliwości hosta

Host środowiska uruchomieniowego deklaruje swoje **możliwości** z zamkniętego zbioru: `stop_agent`, `meter_spend`, `meter_tokens`, `meter_wall_clock`, `cancel_children`, `model_routing`, `subagents`, `telemetry`. Nieznana możliwość MUSI zostać odrzucona, a niezadeklarowana możliwość ma wartość `false`. **Host minimalny** — bez przełączania modeli, bez subagentów, bez telemetrii, bez zatrzymywania — jest obsługiwaną postawą, nigdy błędem; każdy limit wymagający brakującej możliwości degraduje się do doradczego, ze wskazaniem brakującej możliwości.

Możliwości nie są uprawnieniami. Uprawnienie w kontrakcie jest autorytetem; możliwość to to, co środowisko faktycznie potrafi zrobić. Każda postawa wymagająca możliwości nadal wymaga swojego uprawnienia.

## Koperta zasobów

Kontrakt MOŻE deklarować limity w swojej kopercie zasobów. Limit jest **egzekwowany** tylko wtedy, gdy wskazuje rzeczywiste źródło pomiaru; w przeciwnym razie jest **doradczy**, a równość egzekwowania między hostami nigdy nie jest deklarowana.

- **Źródła liczników.** Liczniki obserwowalne w dzienniku (rozpiętość czasu zegarowego, ponowienia bramek, wywołania przydziału) są obliczane z własnych rekordów planu. Liczniki dostępne tylko dla hosta (wydatki, tokeny dostawcy) wymagają odpowiedniej możliwości pomiarowej i obserwowanej próbki z adaptera hosta; brakujący licznik nie oznacza darmowego użycia.
- **Rezerwy.** Limit MOŻE deklarować `reserve`, aby zwykła praca nie mogła zagłodzić weryfikacji, ponowień i wznowienia: przydział jest odrzucany, gdy wydane plus oczekujące przekroczyłoby limit pomniejszony o rezerwę.
- **Wyczerpanie.** Osiągnięcie limitu utrwala niepełny punkt kontrolny, zapisuje `LIMIT: exhausted <id>: <detail>` i wstrzymuje przydział aż do jawnego rekordu `LIMIT: recovered <id>`. Wyczerpanie nigdy nie może spełnić kryterium akceptacji.
- **Rozliczenie anulowania.** Rezerwacja w toku jest rozliczana dokładnie raz, jako zwolniona lub zatwierdzona; sprzeczne drugie rozliczenie jest odrzucane, nigdy rozstrzygane.
- **Postawa routingu.** Domyślnie używany jest stały model. Przełączanie poziomu modelu wymaga zarówno uprawnienia `model_routing`, jak i możliwości o tej samej nazwie; przydział równoległy wymaga zarówno uprawnienia `agent_delegation`, jak i możliwości `subagents`. Postawa routingu jest deklaracją uprawnień, nigdy twierdzeniem o skuteczności.

## Plik konfiguracyjny i rejestr addonów

`.dwp/config.json` (repozytorium) i `~/.dwp/config.json` (użytkownik) mają jeden wspólny kształt, opublikowany jako [`dwp-config/v1`](https://deepworkplan.com/schema/dwp-config/v1.json), i jeden parser (`config.py`). **Metodyka działa bez pliku konfiguracyjnego i bez żadnego addonu**; nic w tym pliku nie może uzależnić planu, przepływu ani zgodności od addonu.

- **Domyślnie śledzony.** Plik repozytorium zawiera decyzje, nigdy sekrety, i jest śledzony, aby członkowie zespołu i CI czytali ten sam rejestr: onboarding zapisuje regułę `.gitignore` `.dwp/*` oraz `!.dwp/config.json`. Plany i rekordy benchmarków pozostają ignorowane.
- **Pierwszeństwo.** Plik repozytorium ma pierwszeństwo przed plikiem użytkownika, a brak pliku oznacza, że wszystko jest wyłączone. Klucz `addons` jest rozstrzygany osobno dla każdego klucza addonu; klucz `benchmark` jest rozstrzygany w całości.
- **Klucze rejestru** to nazwy katalogów addonów w pakiecie: `ai-diff-reviewer`, `agentkit`, `dailybot`, `dependency-upgrade`, `design-system`, `devcontainer`, `herdr`, `vim`. Każdy wpis ma `enabled` (tylko `true` włącza), opcjonalne `version` i opcjonalną jednowierszową `note`. Nieznany klucz jest ignorowany z jednym ostrzeżeniem.
- **Brak oznacza niewłączony.** Cokolwiek włączyć może tylko onboarding za zgodą programisty, własny krok instalacji addonu albo człowiek. Włączony addon, który nie został wykryty i ma notatkę, jest raportowany jako odroczony.
- **Odczyt w trybie fail-closed.** Nieczytelny plik lub błędna wartość nie wnoszą niczego i generują dokładnie jedno ostrzeżenie; czytnik nigdy nie przerywa przepływu i nigdy nie milczy o tym, co odrzucił. Zapisujący uzgadnia atomowo i odmawia nadpisania pliku, którego nie potrafi sparsować.
- **Rekord hosta.** Opcjonalny klucz `host` zapisuje zadeklarowane możliwości maszyny (wartości logiczne z zamkniętego zbioru). `telemetry: true` nadal wymaga zgody programisty.
- **Linia bazowa się nie zmienia.** Lokalny przegląd AI Diff Reviewer pozostaje częścią każdego Final Review niezależnie od tego, czy rejestr go wymienia.

## Możliwości dostarczane przez addony

Od wersji 7.0.0 włączone addony mogą dodawać możliwości w czasie działania:

`effective abilities = host-declared abilities ∪ abilities provided by every addon that is enabled, described by a valid addon.json, detected, and on a compatible interface version`

Czyli: efektywne możliwości to możliwości zadeklarowane przez hosta plus możliwości każdego addonu, który jest włączony, opisany poprawnym `addon.json`, wykryty i działa w zgodnej wersji interfejsu.

- **Deskryptory.** Każdy addon w pakiecie dostarcza plik `addon.json` ([`addon-descriptor/v1`](https://deepworkplan.com/schema/addon-descriptor/v1.json)), który deklaruje jego klucz, to, co dostarcza, oraz sposób wykrywania.
- **Wykrywanie jest tylko do odczytu.** Polecenie wykrywania działa bez powłoki, z zamkniętym stdin i limitem czasu 10 sekund, a nic, co wypisze, nie jest wykonywane. Produkt, którego zgłoszona główna wersja interfejsu różni się od przypiętej, jest niedostępny, z jednym ostrzeżeniem.
- **Niewłączony oznacza niekonsultowany.** Deskryptor wyłączonego addonu nie jest otwierany, a jego polecenie wykrywania nie jest uruchamiane. Suma jest monotoniczna: włączenie addonu może jedynie dodać możliwości.
- **Nigdy nieutrwalane.** Efektywne możliwości są przeliczane przy każdym wywołaniu i NIE MOGĄ być zapisywane w planie. Plan zapisuje to, czego użył — zdarzenie delegowania wskazuje swój transport i addon — a nie to, co było dostępne.
- **Możliwości nie są autorytetem.** Addon agentkit może dostarczać `subagents`, `cancel_children` i `model_routing`; addon Herdr może dostarczać `subagents` i `cancel_children`. Delegowanie nadal wymaga uprawnienia `agent_delegation` w kontrakcie ([Delegowanie](/spec/delegation)).

`resources.py abilities` wypisuje efektywny zbiór oraz źródło każdej możliwości; działa tylko do odczytu.

## Powiązane

- [Warstwa rekordów](/spec/record-layer) — kontrakt, dziennik i dowody.
- [Delegowanie](/spec/delegation) — jak plan używa możliwości `subagents`.
- [Dodatki](/spec/addons) — same opcjonalne addony.
