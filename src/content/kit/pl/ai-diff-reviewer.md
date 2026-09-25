---
title: AI Diff Reviewer
description: "Lokalny przegląd zweryfikowanych ustaleń krytycznych w każdym Final Review DWP od standardu 2.3.0; opcjonalna bramka CI i pętla address-review są opcjonalne."
kind: addon
lang: pl
order: 5
---

# Dodatek AI Diff Reviewer

Każdy Deep Work Plan kończy się tak samo: obowiązkowym **Final Review**, który czyta cały zgromadzony przez plan zestaw zmian, zanim pracę wolno uznać za wykonaną. Przegląd bezpieczeństwa w jego wnętrzu to ostatni moment, w którym cokolwiek da się jeszcze wychwycić. Bez pomocy jedynym czytelnikiem w tym momencie jest ten sam agent, który napisał ten kod.

Ten dodatek sadza nad owym diffem drugiego czytelnika. Podłącza **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** — w marketplace figurujący jako "AI Diff Reviewer", obecnie **v3.1.1** — do przeglądu bezpieczeństwa, gdzie zwraca on coś ustrukturyzowanego zamiast prozy: werdykt, tabelę ustaleń oraz wagę każdego z nich. Od v3 ustalenie `critical` oznacza, że weryfikator dodatku potwierdził je drugim, zakotwiczonym w kodzie wywołaniem modelu; ukończenie blokują dopiero zweryfikowane ustalenia krytyczne — do czasu naprawy albo wyraźnej akceptacji. Ten przegląd jest bramką, a nie komentarzem.

Od standardu 2.3.0 ów lokalny przegląd **należy do linii bazowej, nie jest dodatkiem**. Onboarding go instaluje; każde Final Review go uruchamia. Opcjonalna pozostaje powierzchnia CI — Flow B, gdzie ten sam przegląd pilnuje pull requestów poprzez GitHub Action.

Granica, która czyni to bezpiecznym do przyjęcia, została wytyczona celowo wąsko. Recenzent to skill na licencji MIT, przypięty do taga i wykonywany przez agenta kodu, którego i tak już uruchamiasz — żaden przepływ Deep Work Plan nie zależy więc od komercyjnej usługi, dostawcy CI ani sekretu. **Flow A** (tylko lokalnie) dostaje każde repozytorium po onboardingu; **Flow B** jest proponowany wprost i nigdy nie instaluje się bez prośby. Osoba rozwijająca może też odrzucić recenzenta w całości — taka odmowa zostaje zapisana jako zadeklarowany wyjątek, a `verify` raportuje repozytorium jako niezgodne w tym punkcie, dopóki recenzent nie zostanie zainstalowany.

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
| **B — podwójna powierzchnia** | Flow A plus `setup` zapisuje przepływ przeglądu (Action `@v3`), ten sam plik rozszerzenia dla lokalnego i CI. Opcjonalni towarzysze `apply-review` i `address-review` po opublikowaniu wyników przez CI. |

Wykrywanie lokalnego przeglądu wymaga **skill + pliku rozszerzenia** w jednym z: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` lub `.github/ai-pr-reviewer/extension.md`. Sama skill nie wystarczy.

## Co ten dodatek łączy (celowo ograniczone)

Dodatek DWP **nie** wynajduje recenzenta na nowo. Deleguje instalację, metodologię, kreator CI, tworzenie rozszerzeń, szkicowanie PR i pętle przeglądu po CI do sześciu sub-skills skill upstream (domyślny przepływ nadrzędny, `generate-extension`, `setup`, `open-pr`, `apply-review`, `address-review`).

### Wymagany lokalny przegląd

`create` dodaje krok lokalnego przeglądu do przeglądu bezpieczeństwa każdego Final Review, a `execute` go uruchamia. Wynik jest dołączany pod `## AI Diff Reviewer local review` w lokalnym dla planu `analysis_results/SECURITY_REVIEW.md` (wewnątrz własnego folderu planu, nigdy w katalogu głównym repo).

- **Brakujący reviewer — zapisany, nigdy cicho pominięty:** brakująca skill lub rozszerzenie staje się znaleziskiem `local reviewer not installed`; Final Review uruchamia lokalny przebieg, gdy skill jest obecna, a w przeciwnym razie przenosi znalezisko do raportu z ukończenia — instalacja należy do zgody onboardingu lub jawnego wywołania addonu, nigdy nie jest zaskakującym bootstrapem.
- **Miękka porażka (tylko wywołanie):** przegląd, który mógł wystartować, ale kończy się błędem → ostrzeż raz, zapisz, kontynuuj; nigdy nie powoduj porażki zadania z tego powodu.
- **Bramka po ukończonym przebiegu:** **zweryfikowane** ustalenia `critical` blokują ukończenie Final Review do czasu naprawienia lub wyraźnej akceptacji (BC-07). Niezweryfikowane twierdzenia krytyczne pojawiają się jako adnotowane ostrzeżenia — widoczne i nieblokujące, dopóki `strict-unverified-criticals: true` nie przywróci blokowania według twierdzenia. Przegląd, który wpadł w limit rund (`incomplete`) lub w limit czasu (`timeout`), nie jest czystym przebiegiem przy blokującej surowości (BC-04). `warning` / `info` są dokumentowane, ale nieblokujące.
- **Flow A nie potrzebuje sekretu CI.** Nieustawiony klucz dostawcy nie może tłumić lokalnego przebiegu.

### Bramka CI Flow B (opcjonalna)

Action `DailybotHQ/ai-diff-reviewer@v3`, zazwyczaj bramkowana etykietą (`ready`), ze stabilnie nazwanym zadaniem **AI review gate** do ochrony gałęzi i opcjonalną etykietą pomijania `skip-review-label: skip-ai-review`. Od v3 budżet przeglądu podąża za deterministycznym poziomem ryzyka zmiany — 8/20/30/40 rund od `low` do `critical` przy `budget-profile: auto` (`fixed` na czas przejścia przywraca stałe sprzed v3) — a push, który nie zmienia kodu, uruchamia rundę samego weryfikatora. Wspólny `prompt.md` + rozszerzenie wyrównują metodologię i ważność; lokalny przegląd i CI pozostają metodologicznie identyczne, przy czym rundy CI 2+ w ramach Przeglądu Świadomego Iteracji mogą być krótsze, podczas gdy lokalny przebieg pozostaje pełny.

### Opcjonalni towarzysze przeglądu

Dwa wywoływane przez dewelopera sub-skille zamykają pętlę po opublikowaniu przeglądu przez CI; żaden z nich nigdy nie jest plikiem zadania planu (naruszyłoby to obowiązkową kolejność zadań końcowych).

- `apply-review` przechodzi wyniki jeden po drugim (zastosuj / odrocz / pomiń) za zgodą. Domyślnie tylko do odczytu; nigdy nie robi commitów ani push.
- `address-review` (nowy w v3.1.1) to pętla jednego wywołania: znajduje otwarte PR gałęzi, sprawdza świeżość przeglądu dla obecnego head, przedstawia wyniki z planem zastosuj/odrocz/pomiń, a następnie — po jednym „tak" — stosuje, robi commity w małych partiach Conventional Commits, wykonuje push i ponownie uzbraja recenzenta tak, jak repo go wyzwala (bramkowanie etykietą → przełącz etykietę wyłącz/włącz; wyzwalanie pushem → potwierdź nowe uruchomienie). W odróżnieniu od `apply-review` robi commity i push; o to chodzi w tej pętli. Na zagregowanych przeglądach ansambla czyta dokument zagregowany i znacznik `ai-pr-reviewer-aggregate`.
- Ścieżka maszynowa to ustrukturyzowane wyjście, a nie treść przeglądu: dokument `review-output/3.0` (`.aiprr/review-output.json`, lokalizowany przez wyjścia `structured-output-path` i `structured-output-sha256`) niesie zapis uruchomienia, wyniki z dowodami i weryfikacją, odparte wyniki i bramkę. Treść przeglądu, która mówi `Recommendation: approve`, nie jest dowodem, że sprawdzenie przeszło — najpierw odczytaj blok Highest severity / Strictness gate / Check status w znaczniku śledzenia.

## Co się zmieniło w v3

Trzy wydania ukazały się 2026-09-24 (v3.0.0, v3.0.1, v3.1.0), a v3.1.1 przyszedł niedługo potem, dodając sub-skill `address-review`. Żadne z nich nie zmienia sposobu, w jaki ten dodatek podłącza recenzenta — Flow A, trzy ścieżki wykrywania i drabina „nigdy nie blokuj" pozostają bez zmian — ale zmieniają to, co dostaje osoba wdrażająca.

| Zmiana | Co to znaczy dla repozytorium DWP |
|--------|------------------------------------|
| **`critical` publikuje się dopiero po weryfikacji** (v3.0.0) | Każde zgłoszone twierdzenie krytyczne — plus 30 % próbka ostrzeżeń — przechodzi drugą, krótką, zakotwiczoną w kodzie kontrolę osobnym wywołaniem modelu (≈ 3 k tokenów, 10 s i \$0.009 na zweryfikowane ustalenie). Zweryfikowane ustalenia krytyczne bramkują przegląd bezpieczeństwa; odparte twierdzenia pozostają widoczne jako adnotowane ostrzeżenia i są wymienione w ustrukturyzowanym wyjściu, nigdy nie publikowane inline. |
| **Budżety podążają za poziomem ryzyka** (v3.0.0) | 8/20/30/40 rund od `low` do `critical`, wyprowadzonych z inwentarza zmian (`budget-profile: auto`). Push bez zmian w kodzie uruchamia rundę samego weryfikatora za −93 % kosztu. `budget-profile: fixed` przywraca stałe sprzed v3 o 30 rundach. |
| **Niedokończony przegląd jest czerwony** (v3.0.0) | `incomplete` (limit rund) i `timeout` (limit czasu) publikują częściowe wyniki i obalają blokującą surowość — „brak ustaleń" znaczy teraz zawsze, że recenzent spojrzał i nic nie znalazł. |
| **Ustrukturyzowane wyjście to ścieżka maszynowa** (v3.0.0) | Dokument `review-output/3.0` niesie zapis uruchomienia, inwentarz zmian, wyniki z typowanymi dowodami i weryfikacją, odparte wyniki i bramkę. Czytaj dokument zamiast skrobać treści przeglądów. |
| **Sześć sub-skills** (v3.1.1) | `address-review` dołącza do routera: jedno wywołanie stosuje, robi commity, wykonuje push i ponownie uzbraja recenzenta. |
| **Opcjonalny ansambl** (v3.0.0) | Gałęzie tylko do odczytu `mode: emit` plus jedno zadanie `aggregate` raz weryfikują skonsolidowane wyniki i publikują jeden przegląd. |
| **`@v2` nadal działa** | Linia v2 jest zamrożona na `release/v2` z sześcioma miesiącami utrzymania bezpieczeństwa i katalogu. v3 to rekomendacja, nigdy przymusowa migracja. |

Dwie z tych zmian ważą dla metodyki więcej niż pozostałe.

**Bramka zweryfikowanych ustaleń krytycznych hartuje przegląd bezpieczeństwa.** Przed v3 model mógł swobodnie zgłosić `critical`, a bramka szła za twierdzeniem. Teraz krytyczne ustalenie w Final Review oznacza, że drugie wywołanie modelu potwierdziło je względem kodu, a kampania wydaniowa zmierzyła różnicę: 771 płatnych przebiegów ewaluacyjnych w dziesięciu kampaniach za łącznie około \$83, poziom krytyczny osiągnął pełność 63/63 przy precyzji po rozstrzygnięciu 1.0, a rundy przyrostowe ścinały tokeny wejściowe o 62–76 %. Te liczby to opublikowane pomiary upstream, a nie własne pomiary Deep Work Plan.

**`economy` celowo nie jest tańszy.** Benchmark upstream z 2026-09-16 zmierzył `grok-4.3` na 0 z 5 znanych defektów — zatwierdza bez przeglądania — podczas gdy `grok-4.5` dorównał `grok-4.6` wynikiem 3 z 5 bez fałszywych alarmów, przy tym samym koszcie i jednej czwartej czasu. Ponieważ nie istnieje tańszy model xAI, który wciąż faktycznie przegląda, `economy` rozwiązuje się do tego samego modelu co `balanced`, zamiast być poziomem, który niczego nie znajduje; na runnerze grok koszt skaluje budżet rund poziomu ryzyka, a nie wybór modelu. Ścieżka xAI rośnie więc przez CLI z około \$0.07 do około \$0.40–0.75 za przegląd; Od promptu v3.0 ponowny pomiar na 63 przebiegach przeniósł `grok-4.3` z 0 na 5 do 83 % recall bez fałszywych alarmów i przy ~31 % niższym koszcie — ale wciąż ok. trzy razy częściej niż `grok-4.5` nie udaje mu się zapisać pliku ustaleń, więc `grok-4.5` pozostaje domyślny, a `model: grok-4.3` to jawny, zaakceptowany kompromis. Te liczby to opublikowane pomiary upstream, a nie własne pomiary Deep Work Plan.

## Zachowanie

- **Flow A to linia bazowa; o Flow B się pyta, nigdy nie zgaduje.** Instalowanie przepływu bez prośby ma większy ślad niż pozostanie przy Flow A.
- **Uzgadniaj, nie nadpisuj.** Istniejąca skill, rozszerzenie lub przepływ przeglądu są zachowywane; wypełniaj tylko luki.
- **Uwierzytelnienie odroczone.** Sekrety dostawcy dla CI są konfigurowane przez opiekuna; ten dodatek nigdy nie przechowuje poświadczeń.
- **Neutralny wobec dostawcy.** Komercyjna usługa, dostawca CI ani sekret nigdy nie są wymagane; powierzchnia CI to jedyny element, który dotyka dostawcy.

## Uwagi

Lokalny przegląd wymagany od standardu 2.3.0; powierzchnia CI opcjonalna. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Przewodnik migracji upstream: [docs/MIGRATION_v3.md](https://github.com/DailybotHQ/ai-diff-reviewer/blob/main/docs/MIGRATION_v3.md). Strona specyfikacji: [Add-ons](/spec/addons).
