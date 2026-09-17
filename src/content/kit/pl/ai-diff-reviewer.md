---
title: AI Diff Reviewer
description: "Wymagany lokalny przegląd w każdym Final Review DWP od standardu 2.3.0, instalowany przy onboardingu; bramka CI Flow B i apply-review pozostają opcjonalne."
kind: addon
lang: pl
order: 5
---

# Dodatek AI Diff Reviewer

Łączy wykonanie Deep Work Plan z **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (wpis na marketplace **"AI Diff Reviewer"**, aktualna wersja **v2.3.0**), dzięki czemu przegląd bezpieczeństwa obowiązkowego **Final Review** uruchamia strukturalny lokalny przegląd — werdykt, tabelę wyników i poziom ważności — a przy wyborze Flow B każde pull request może być zablokowane przez ten sam przegląd w CI. Od standardu 2.3.0 **lokalny przegląd jest częścią linii bazowej**: onboarding go instaluje, a każde Final Review go uruchamia. Opcjonalna pozostaje wyłącznie powierzchnia CI.

Neutralna wobec dostawcy pozostaje granica, która ma znaczenie: reviewer to skill na licencji MIT przypięty do tagu, uruchamiany przez **własnego** agenta kodującego — żaden przepływ Deep Work Plan nie wymaga komercyjnej usługi, dostawcy CI ani sekretu. Flow A (tylko lokalnie) to linia bazowa, którą otrzymuje każde repozytorium po onboardingu; Flow B (CI Action) jest proponowany wyraźnie i nigdy nie jest instalowany bez prośby. Deweloper może odmówić lokalnego reviewera; odmowa jest zapisywana jako zadeklarowany wyjątek, a `verify` zgłasza repozytorium jako niezgodne w tym punkcie do czasu instalacji.

## Kiedy używać

| Sygnał | Działanie |
|--------|--------|
| Każde repozytorium po onboardingu | **Flow A jest instalowany** w fazie 7a onboardingu (vendorowana skill + `.review/extension.md`); ukierunkowany upgrade harnessu dodaje go do repozytoriów onboardowanych wcześniej |
| Zespół chce bramki scalania CI z ustrukturyzowanymi wynikami | **Proponuj Flow B** — wyraźna zgoda, nigdy wartość domyślna |
| Repozytorium osobiste lub eksperymentalne; lokalny przegląd wystarczy | **Pozostań przy Flow A** — linia bazowa jest kompletna |

## Dwa przepływy adopcji

| Przepływ | Co otrzymujesz |
|------|----------------|
| **A — tylko lokalnie (linia bazowa)** | Vendorowana skill + wymagany `.review/extension.md` (przez `generate-extension`). Uruchamia lokalny przegląd wewnątrz przeglądu bezpieczeństwa każdego Final Review. Bez przepływu GitHub Actions. |
| **B — podwójna powierzchnia** | Flow A plus `setup` zapisuje `.github/workflows/pr-review.yml` (Action `@v2`), ten sam plik rozszerzenia dla lokalnego i CI. Opcjonalny towarzysz `apply-review` po opublikowaniu wyników przez CI. |

Wykrywanie lokalnego przeglądu wymaga **skill + pliku rozszerzenia** w jednym z: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` lub `.github/ai-pr-reviewer/extension.md`. Sama skill nie wystarczy.

## Co ten dodatek łączy (celowo ograniczone)

Dodatek DWP **nie** wynajduje recenzenta na nowo. Deleguje instalację, metodologię, kreator CI, tworzenie rozszerzeń, szkicowanie PR i przegląd po CI do pięciu sub-skills skill upstream (domyślny przepływ nadrzędny, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### Wymagany lokalny przegląd

`create` dodaje krok lokalnego przeglądu do przeglądu bezpieczeństwa każdego Final Review, a `execute` go uruchamia. Wynik jest dołączany pod `## AI Diff Reviewer local review` w lokalnym dla planu `analysis_results/SECURITY_REVIEW.md` (wewnątrz własnego folderu planu, nigdy w katalogu głównym repo).

- **Brakujący reviewer — zapisany, nigdy cicho pominięty:** brakująca skill lub rozszerzenie staje się znaleziskiem `local reviewer not installed`; Final Review uruchamia lokalny przebieg, gdy skill jest obecna, a w przeciwnym razie przenosi znalezisko do raportu z ukończenia — instalacja należy do zgody onboardingu lub jawnego wywołania addonu, nigdy nie jest zaskakującym bootstrapem.
- **Miękka porażka (tylko wywołanie):** przegląd, który mógł wystartować, ale kończy się błędem → ostrzeż raz, zapisz, kontynuuj; nigdy nie powoduj porażki zadania z tego powodu.
- **Bramka po ukończonym przebiegu:** wyniki `critical` nadal blokują ukończenie Final Review do czasu naprawienia lub wyraźnej akceptacji. `warning` / `info` są dokumentowane, ale nieblokujące.
- **Flow A nie potrzebuje sekretu CI.** Nieustawiony `CURSOR_API_KEY` nie może tłumić lokalnego przebiegu.

### Bramka CI Flow B (opcjonalna)

Action `DailybotHQ/ai-diff-reviewer@v2`, zazwyczaj bramkowana etykietą (`ready`), ze stabilnie nazwanym zadaniem **AI review gate** do ochrony gałęzi i opcjonalną etykietą pomijania `skip-review-label: skip-ai-review`. Wspólny `prompt.md` + rozszerzenie wyrównuje metodologię i ważność; w ramach Przeglądu Świadomego Iteracji rundy CI 2+ mogą być krótsze, podczas gdy lokalny przebieg pozostaje pełny.

### Opcjonalny towarzysz `apply-review`

Po opublikowaniu przeglądu przez CI deweloper może wywołać `apply-review` podczas `execute`, aby przejść przez wyniki jeden po drugim (zastosuj / odrocz / pomiń) za zgodą. Domyślnie tylko do odczytu; nigdy nie jest plikiem zadania planu (naruszyłoby to obowiązkową kolejność zadań końcowych).

## Co się zmieniło od wersji v2.0.1

Pomiędzy v2.0.1 a v2.3.0 ukazały się trzy wydania upstream. Żadne z nich nie zmienia sposobu, w jaki ten dodatek podłącza recenzenta — Flow A, trzy ścieżki wykrywania i kontrakt blokowania pozostają bez zmian — ale zmieniają to, co dostaje osoba wdrażająca.

| Zmiana | Co to znaczy dla repozytorium DWP |
|--------|------------------------------------|
| **Runner i backend to osobne parametry** (v2.1.0) | `provider` nazywa *runnera*: kto wykonuje pętlę przeglądu. Nowy `api-base` nazywa *backend*: gdzie znajduje się model. Pusty `api-base` jest bajt w bajt identyczny z v2.0.x, więc istniejąca instalacja zachowuje się dokładnie tak jak wcześniej. |
| **Dwa dodatkowe runnery** (v2.1.0) | `openai` (w procesie, bez instalacji) oraz `grok` (CLI) dołączają do istniejącego zestawu. |
| **Koszt to jednowyrazowy poziom, a wartości domyślne są zmierzone** (v2.1.0, v2.3.0) | Koszt jest sterowany słowem kluczowym poziomu i zawężonymi diffami, a także raportowany dla każdego przeglądu. W xAI `balanced` i `economy` rozwiązują się oba do `grok-4.5`, a `deep` do `grok-4.6`. |
| **Kolejne rundy przeglądają faktycznie nowy diff** (v2.1.0, v2.2.0) | Nierozstrzygnięte ustalenia są przenoszone dalej. `prior-findings-resolution` domyślnie ma wartość `advisory`: werdykt modelu „rozwiązane" jest raportowany, ale ustalenie nadal blokuje, dopóki osoba utrzymująca nie zamknie wątku. |
| **Niekompletny przegląd nigdy nie jest przeglądem na zielono** (v2.2.0) | Uruchomienie, które kończy się bez zapisania ustaleń, jest publikowane jako jawnie niekompletny przegląd. Każda blokująca surowość uznaje je za nieudane, etykieta „sprawdzone" nie zostaje nadana, a pusta runda nie wycofuje żadnego otwartego ustalenia. |
| **Instalatory weryfikowane sumą kontrolną** (v2.2.0) | `cursor-installer-sha256` i `grok-installer-sha256` odmawiają uruchomienia artefaktu dostawcy, którego skrót różni się od skonfigurowanego. |

Dwie z tych zmian ważą dla metodyki więcej niż pozostałe.

**Bramka niekompletnego przeglądu zamyka realną lukę w przebiegu bezpieczeństwa.** Final Review nie powinien móc zamknąć się na przeglądzie, który nigdy się nie odbył. Przed v2.2.0 runner kończący pracę bez wygenerowania ustaleń był nie do odróżnienia od czystego przebiegu. Teraz to nazwany stan, który nie jest zielony — „brak ustaleń" oznacza więc, że recenzent spojrzał i nic nie znalazł, a nie że nigdy nie spojrzał.

**`economy` celowo nie jest tańszy.** Benchmark upstream z 16.09.2026 zmierzył `grok-4.3` na 0 z 5 znanych defektów — zatwierdza bez przeglądania — podczas gdy `grok-4.5` dorównał `grok-4.6` wynikiem 3 z 5 bez fałszywych alarmów, przy tym samym koszcie i jednej czwartej czasu. Ponieważ nie istnieje tańszy model xAI, który wciąż faktycznie przegląda, `economy` rozwiązuje się do tego samego modelu co `balanced`, zamiast być poziomem, który niczego nie znajduje. Ścieżka xAI rośnie więc przez CLI z około \$0,07 do około \$0,40–0,75 za przegląd; `model: grok-4.3` nadal można przypiąć jawnie, aby zachować wcześniejsze zachowanie. Te liczby to opublikowane pomiary upstream, a nie własne pomiary Deep Work Plan.

## Zachowanie

- **Flow A to linia bazowa; o Flow B się pyta, nigdy nie zgaduje.** Instalowanie przepływu bez prośby ma większy ślad niż pozostanie przy Flow A.
- **Uzgadniaj, nie nadpisuj.** Istniejąca skill, rozszerzenie lub `pr-review.yml` są zachowywane; wypełniaj tylko luki.
- **Uwierzytelnienie odroczone.** Sekrety dostawcy dla CI są konfigurowane przez opiekuna; ten dodatek nigdy nie przechowuje poświadczeń.
- **Neutralny wobec dostawcy.** Komercyjna usługa, dostawca CI ani sekret nigdy nie są wymagane; powierzchnia CI to jedyny element, który dotyka dostawcy.

## Uwagi

Lokalny przegląd wymagany od standardu 2.3.0; powierzchnia CI opcjonalna. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Strona specyfikacji: [Add-ons](/spec/addons).
