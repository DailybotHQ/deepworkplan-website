---
title: Warstwa rekordów
description: "Warstwa rekordów v6 i v7: niezmienny kontrakt wyników, dziennik tylko do dopisywania, klasy dowodów, zatwierdzenie, poprawki, niezmienniki i potwierdzenia."
order: 9
lang: pl
section: Record layer
---

# Warstwa rekordów

> **Zakres wersji:** Ta strona streszcza normatywną warstwę rekordów v6, na której opiera się aktualny standard, DWP 7.0.0. Źródła kanoniczne w wydaniu `v7.8.1`: [`V6_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_CONTRACT.md) i [`V6_LIFECYCLE.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_LIFECYCLE.md). Tam, gdzie ta strona i te pliki się różnią, rozstrzygają pliki. Plany v5 zachowują warstwę [stanu planu](/spec/plan-state) i nigdy nie są migrowane niejawnie.

**Wersja 6.0.0, rozszerzona w 7.0.0. Status: stabilna.** Warstwa rekordów zastępuje narracyjne ukończenie rekordami: kontrakt jest autorytetem, dziennik jest pamięcią, zapisy wykonują helpery, a każdy wygenerowany plik jest projekcją. Słowa kluczowe MUST (MUSI), MUST NOT (NIE MOŻE), SHOULD (POWINIEN), SHOULD NOT (NIE POWINIEN) i MAY (MOŻE) interpretuje się zgodnie z opisem w RFC 2119.

## Model w jednym zdaniu

Plan to dwa tworzone artefakty i jedna strzeżona sekwencja. Markdown planu (`README.md` i pliki zadań) mówi, co zostanie zrobione. **Kontrakt wyników** (`contract.json`) mówi, co liczy się jako ukończone i na co plan ma pozwolenie. **Dziennik** (`journal.ndjson`) zapisuje, co faktycznie się wydarzyło. `state.json` i `views/` są regenerowane z dziennika i NIE MOGĄ być edytowane ręcznie; gdy wygenerowany plik i dziennik są niezgodne, rozstrzyga dziennik, a plik jest regenerowany.

## Wykrywanie generacji

Folder planu jest planem linii v6 wtedy i tylko wtedy, gdy zawiera `manifest.json`, którego wskaźnik `contract` się rozwiązuje, plik `contract.json` lub łańcuch rewizji `contracts/`. Wykrywanie MUSI opierać się na tych artefaktach, nigdy na wersji zainstalowanego pakietu: aktualny pakiet może zawierać plany v5, a starszy pakiet może natrafić na plan v6.

Adres URL `schema` kontraktu wskazuje jego **generację**, a manifest i każde zdarzenie dziennika ją odzwierciedlają:

| Generacja | Kontrakt | Zdarzenia dziennika | Manifest | Dodaje |
| --- | --- | --- | --- | --- |
| v6 | [`plan-contract/v6`](https://deepworkplan.com/schema/plan-contract/v6.json) | [`journal-event/v6`](https://deepworkplan.com/schema/journal-event/v6.json) | [`plan-manifest/v6`](https://deepworkplan.com/schema/plan-manifest/v6.json) | — |
| v7 | [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json) | [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json) | [`plan-manifest/v7`](https://deepworkplan.com/schema/plan-manifest/v7.json) | `parallel_safe` i zdarzenie `delegation` ([Delegowanie](/spec/delegation)) |

Nowe plany tworzone przez pakiet 7.x są domyślnie planami v7; jawna prośba o `v6` nadal materializuje kontrakt v6. Plan nigdy nie zmienia generacji, a dziennik mieszający generacje MUSI zostać odrzucony. Obie generacje są rzutowane na ten sam kształt [`plan-snapshot/v6`](https://deepworkplan.com/schema/plan-snapshot/v6.json).

## Kontrakt wyników

Jeden kontrakt na plan, zgodny ze schematem swojej generacji. Zawiera sformułowanie wyniku i definicję sukcesu, kryteria akceptacji, zadania wraz z ich wymaganiami wstępnymi, powierzchnią dotkniętą i intencją bramek, niezmienniki o zasięgu planu, zakres (dozwolone ścieżki, klasy poleceń, zakazane operacje), kopertę zasobów, limity harmonogramowania, uprawnienia oraz zapis autoryzacji.

- **Tożsamość.** `contract_id` to SHA-256 kanonicznych bajtów kontraktu bez pola identyfikatora. Każdy rekord wytworzony w ramach kontraktu go przytacza.
- **Niezmienność.** Po rozpoczęciu realizacji kontrakt NIE MOŻE się zmieniać. Zmieniony kontrakt jest nową **rewizją** w `contracts/`, przytaczającą swojego rodzica, z ciągłą numeracją rewizji i świeżo zapisanym autorytetem.
- **Stabilne identyfikatory.** Kryteria (`AC-*`), niezmienniki (`INV-*`) i zadania (`T-*`) MUSZĄ być unikalne, a rekordy przytaczają identyfikatory, nigdy pozycje na liście. Graf zadań MUSI być acykliczny, a każda intencja bramki MUSI odwoływać się do zadeklarowanego kryterium.
- **Uprawnienia.** Przyznane i nieprzyznane możliwości MUSZĄ być rozłącznymi podzbiorami zamkniętego zbioru: `gate_command_exec`, `fs_write_plan_scope`, `fs_write_repo_scope`, `git_operations`, `network_access`, `host_adapter_metering`, `agent_delegation`, `context_export`.
- **Autoryzacja.** Mechanizmem jest dokładnie `plan_authorship` (człowiek napisał lub przejrzał plan przed realizacją) albo `pre_authorization` (stałe upoważnienie z określoną kopertą, jak w trybie trust). Oba działają w bramkach identycznie; różni się jedynie zapisany autorytet.
- **Zamykalność.** Każde kryterium MUSI być zamykalne: kryterium objęte bramką zadania jest zamykane dowodem `observed` z tej bramki albo zatwierdzeniem człowieka typu `asserted`, zależnie od akceptowanych przez nie klas dowodów. Projekt kryterium, który nie akceptuje żadnej z nich, jest odrzucany.

## Materializacja

Plan jest materializowany przez dostarczony helper (`ledger.py materialize`), nigdy ręcznie, dokładnie w tej kolejności, a każdy krok jest idempotentny i wznawialny:

1. **`manifest.json`** ze wskaźnikiem kontraktu, zapisywany jako pierwszy, aby generacja planu była wykrywalna nawet po przerwaniu materializacji.
2. **`contract.json`**, zwalidowany i adresowany treścią.
3. Zdarzenie dziennika **`approval`**, przytaczające identyfikator kontraktu i skrót Markdown planu.

Tylko to zdarzenie zatwierdzenia otwiera bramkę rozpoczęcia zadania. Ręcznie skopiowany kontrakt bez niego jest odrzucany przy rozpoczęciu zadania, a manifest, którego wskaźnik nie odpowiada materializowanemu kontraktowi, jest odrzucany, a nie przepisywany.

## Dziennik

`journal.ndjson` jest tylko do dopisywania: jeden zamknięty obiekt JSON na wiersz, nigdy nieedytowany ani nieusuwany. Korekta jest późniejszym zdarzeniem. Każde zdarzenie zawiera swój schemat, typ, ściśle rosnący `seq`, znacznik czasu, plan, `contract_id` oraz aktora (`helper`, `agent`, `host_adapter` lub `human`). Katalog zdarzeń obejmuje rozpoczęcia zadań, zatwierdzenia, uruchomienia bramek, obserwacje, adaptacje, poprawki, interwencje, próbki zasobów, pary kontrolne, wybory harmonogramu, odmowy, renderowania widoków, uzgodnienia i naprawy dziennika; v7 dodaje zdarzenia delegowania. Każda odmowa jest sama zapisywana.

## Klasy dowodów

Zdarzenia niosące dowody zapisują etykietę **zaufania**:

1. **observed** — dostarczony helper sam wykonał sprawdzenie, z zadeklarowanym katalogiem roboczym, środowiskiem, limitem czasu i przechwyconym wyjściem. Tylko narzędzie uruchamiające bramki (`ledger.py gate`) wytwarza dowody bramek typu observed; agent, który jedynie zapisuje zgłaszany przez siebie wynik, nie może tego zrobić.
2. **imported** — pobrane z dopasowanego zewnętrznego źródła z pochodzeniem, na przykład zmigrowany rekord bramki v5, którego wskaźnik dowodu się rozwiązuje.
3. **asserted** — stwierdzone bez niezależnego ustalenia.

Każde kryterium deklaruje, które klasy akceptuje, więc kryterium akceptujące tylko observed nigdy nie zamknie się na podstawie deklaracji. Sumy kontrolne potwierdzają identyczność bajtów, a nie prawdziwość semantyczną; warstwa rekordów sprawdza strukturę i pochodzenie, nie dowodzi semantyki produktu.

## Zatwierdzenie przez człowieka

Kryterium, które musi ocenić człowiek, zamyka się przez `ledger.py signoff --criterion <AC> --evidence-path <artifact> --authority <who>`. Zatwierdzenie jest zapisywane jako `asserted`, przytacza artefakt, na którym się opiera, liczy się tylko w oknie dowodowym deklarującego zadania i zamyka wyłącznie kryterium akceptujące `asserted`. Agent nigdy nie zatwierdza w imieniu człowieka. Rekordy aktora-człowieka zapisane poza materializacją zawierają jawny znacznik autorytetu (notatkę napisaną przez człowieka, zapisaną przez ścieżkę i skrót, albo interaktywne potwierdzenie); ledger nie potrafi uwierzytelnić osoby, więc znacznik czyni deklarację audytowalną, a nie obserwowaną.

## Kryteria kontrolowane

Kryterium zadeklarowane jako kontrola regresji lub dyskryminacji zamyka się tylko na **dyskryminującej parze kontrolnej**: sprawdzenie kończy się niepowodzeniem na rewizji początkowej i przechodzi na nowej. Para, która przechodzi na obu odnogach, jest zapisywana jako niedyskryminująca i nigdy nie jest zaokrąglana w górę; brudny stan początkowy lub niedostępna stara odnoga są zapisywane jako niedostępna kontrola, nigdy syntetyzowane.

## Realizacja i ukończenie

Przydział zadań pochodzi z deterministycznego harmonogramu (`scheduler.py ready`), a `ledger.py start` odrzuca zadanie, którego wymagania wstępne nie są ukończone. Każde rozpoczęcie zadania zapisuje odcisk drzewa roboczego, a dowody są ponownie używane tylko dla tego samego zadania i kryterium przy równoważnym odcisku.

**Niezmienniki mają zasięg planu.** Każdy zadeklarowany niezmiennik obowiązuje w całym planie i jest oceniany na każdej granicy jako obserwacja (`INV-<id>: pass` lub `INV-<id>: fail: <reason>`). Właściwość, którą muszą spełniać tylko niektóre zadania, jest kryterium akceptacji tych zadań, nigdy niezmiennikiem.

**Ukończenie jest wyprowadzane, nigdy deklarowane.** `ledger.py complete` odmawia, i zapisuje odmowę, dopóki któremukolwiek kryterium brakuje zaakceptowanego dowodu w oknie lub któremukolwiek niezmiennikowi brakuje świeżej pozytywnej oceny. Migawka pokazuje zadanie jako ukończone dokładnie wtedy, gdy rekordy to potwierdzają.

## Adaptacje i poprawki

Zmiany w trakcie przebiegu są propozycjami dla harmonogramu, ograniczonymi do zamkniętego zbioru: `split`, `reorder`, `insert`, `change_strategy` i `retry`. Adaptacja NIE MOŻE usuwać wymagania, osłabiać ani zastępować akceptacji, rozszerzać zakresu ani uprawnień, wydawać ponad kopertę ani oznaczać niewykonanego scenariusza jako ukończonego.

Zmiana zakresu, kryteriów akceptacji, uprawnień lub koperty jest **poprawką kontraktu**: `ledger.py amend` przygotowuje zmieniony kontrakt jako następną rewizję, zapisuje poprawkę wraz z kryteriami, których wcześniejsze dowody unieważnia, wymaga świeżego zatwierdzenia ze znacznikiem autorytetu człowieka i dopiero wtedy przełącza aktywny kontrakt. Przerwana poprawka jest wznawiana od pierwszego brakującego kroku; autorstwo planu nigdy nie przechodzi na rewizję.

## Potwierdzenia, widoki i eksport

`outcomes.py receipt` przelicza wynik planu na podstawie rekordów, więc zmienia się, gdy zmieniają się rekordy; nigdy nie jest pisany ręcznie. `views.py render` regeneruje widoki czytelne dla człowieka; widok edytowany przez człowieka jest zgłaszany, nigdy po cichu nadpisywany, a uzgodnienie jest samo zapisywane. Ponieważ `.dwp/` jest ignorowany przez git, `ledger.py export --dest <dir>` pakuje dziennik, migawkę, łańcuch kontraktów i każdy przytoczony artefakt dowodowy w celu trwałego zachowania lub przeniesienia na inny host.

## Powierzchnie tylko do odczytu i wznowienie

`status` i `verify` nigdy nie zapisują do planu linii v6; raportują przez czyste polecenia i wygenerowane projekcje. Wznawiający host odtwarza stan w ustalonej kolejności (inspekcja, walidacja, projekcja, renderowanie z zapisanym autorytetem) i traktuje nieaktualny odcisk jako unieważniony dowód do ponownego uruchomienia, nigdy jako wynik do ponownego użycia. Dziennik nigdy nie jest odtwarzany jako kontekst rozmowy: praca jest wznawiana przez pętlę execute z [manifestem kontekstu](/spec/resources-and-abilities#the-per-task-context-manifest) dla każdego zadania.

## Współistnienie i migracja

Plany v5 i linii v6 MOGĄ współistnieć w jednym `.dwp/plans/`, a każdy działa według własnej generacji przez cały cykl życia. Jedyną drogą z v5 do v6 jest jawna migracja z podglądem (`migrate_v6.py`, uruchamiana przez `refine`) ze zweryfikowaną kopią zapasową i możliwością wycofania; zmigrowana historia v5 ma klasę `imported`, gdy jej dowody się rozwiązują, a w przeciwnym razie `asserted`, nigdy `observed`. Migracja odwrotna nie istnieje.

## Powiązane

- [Zasoby i możliwości](/spec/resources-and-abilities) — manifest kontekstu, koperta zasobów, możliwości hosta i rejestr addonów.
- [Delegowanie](/spec/delegation) — co v7 dodaje do tej warstwy.
- [Stan planu](/spec/plan-state) — zachowana warstwa stanu v5.
