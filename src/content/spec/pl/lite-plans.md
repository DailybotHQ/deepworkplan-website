---
title: Plany Lite
description: "Plany Lite: kompaktowe, w pełni wykonywalne rekordy zadań inline w README.md, ich tworzenie, wybór formatu i podniesienie do planu Full."
order: 3
lang: pl
section: Workflow
---

# Plany Lite

**Wersja 2.4.0. Status: stabilna.** Ten dokument specyfikuje reprezentację planu Lite, wprowadzoną obok [Specyfikacji DWP](/spec/dwp-specification): format planu dla małej i średniej ograniczonej pracy, który jest materializowany bezpośrednio, bez etapu niewykonywalnego szkicu. Słowa kluczowe MUST (MUSI), MUST NOT (NIE MOŻE), SHOULD (POWINIEN), SHOULD NOT (NIE POWINIEN) i MAY (MOŻE) interpretuje się zgodnie z opisem w RFC 2119.

## Reprezentacja i cykl życia

Plan MUSI być jedną z dwóch reprezentacji, odnotowaną raz w `manifest.json` jako `plan_format`: **Full** przechowuje jeden plik na zadanie pod `<n>.task_<slug>.md`; **Lite** przechowuje kompaktowe, wykonywalne rekordy zadań inline w `README.md`, każdy za stabilną kotwicą `{#task-N}`. Plan Lite nie jest częściowym ani nieformalnym planem Full: każdy rekord zadania nadal MUSI nieść cel, Powierzchnię dotkniętą, kryteria akceptacji, bramkę walidacyjną i dziennik ukończenia, w tej samej normatywnej formie, jaką [Anatomia zadania](/spec/dwp-specification#task-anatomy) definiuje dla Full.

Cztery osie opisują stan planu i MUSZĄ być śledzone niezależnie, a nie łączone:

| Oś | Wartości | Znaczenie |
|------|--------|---------|
| Format | `lite`, `full` | Gdzie żyją rekordy zadań |
| Materialization | `materializing`, `ready`, `promoting` | Czy folder planu jest zapisywany, ukończony, czy w trakcie podniesienia |
| Approval | `pending`, `approved`, `pre_approved` | Czy człowiek zrecenzował plan, czy tryb trust wstępnie go zatwierdził |
| Execution | `pending`, `in_progress`, `blocked`, `completed` | Postęp na poziomie zadania i ogólny |

Guided create zapisuje **propozycję oczekującą na przegląd** — Lite lub Full, już prawdziwy plan, nigdy jednorazowy szkic. Trust materializuje **gotowy, wstępnie zatwierdzony** plan i natychmiast zwraca kontrolę. `create` i podniesienie nigdy nie wykonują pracy produktowej; jawne żądanie `execute` lub `resume` zatwierdza gotowy bieżący zakres planu i MUSI odnotować to zatwierdzenie przed rozpoczęciem pracy; bez tego żądania propozycja `pending` nie jest wykonywalna; nierozwiązane podniesienie w toku MUSI zostać najpierw odzyskane przed pracą produktową.

## Tworzenie i wybór formatu

`/dwp-create` obsługuje intencję planowania w każdej skali, nie tylko dla dużej pracy. Mała, ograniczona praca — pojedyncza kwestia, mniej więcej jedno posiedzenie, bez koordynacji — jest celem planu Lite; praca wieloetapowa z rzeczywistym zakresem domyślnie korzysta z Full, zgodnie z [Proporcjonalną rygorystycznością](/spec/dwp-specification#proportional-rigor). Bezpośrednia edycja, wyjaśnienie, sprawdzenie statusu, wznowienie lub jawna prośba o brak planu zachowują własną ścieżkę i nigdy nie stają się planem.

`lite` i `full` są **preferencjami formatu**; `trust` i `auto` to osobne **opcje interakcji**, i dowolny rodzaj opcji MOŻE pojawić się na dowolnym końcu żądania, w dowolnej kolejności:

```text
/dwp-create trust fix the label
/dwp-create lite trust fix the label
/dwp-create fix the label trust lite
/dwp-create fix the migration full trust
```

Powtórzenie tej samej opcji jest idempotentne; żądanie `lite` i `full` razem jest błędem. `--` kończy parsowanie opcji.

Gdy nie podano preferencji formatu, `create` rekomenduje jedną i wyjaśnia dlaczego. Jawne żądanie **Full** zawsze wygrywa. Jawne żądanie **Lite** jest honorowane, chyba że wymagania pracy lub bramki walidacyjne nie zmieściłyby się w kompaktowych rekordach inline — w takim przypadku `create` odnotowuje, dlaczego zamiast tego wymagany jest Full. Wybór MUSI odnotować zaobserwowany zakres, zależności, wymagany poziom szczegółowości instrukcji oraz niewiadome stojące za decyzją — możliwą do zaudytowania ocenę, a nie gwarancję obowiązującą dla każdego modelu czy agenta.

## Podniesienie i kompatybilność

Plan Lite MOŻE zostać **podniesiony** do Full w dowolnym momencie, przez `/dwp-refine promote {plan_name}` (zob. [dwp-refine](/kit/dwp-refine)). Podniesienie dotyczy **wyłącznie reprezentacji**: odnotowuje zamiar, zapisuje docelowe pliki zadań, waliduje, że każde wymaganie i bramka, które niósł rekord Lite, są nadal pokryte, przełącza autorytatywną kopię z inline'owych rekordów README na pliki zadań, a następnie czyści znacznik trwającego procesu. `execute` i `resume` MUSZĄ odmówić kontynuacji, dopóki znacznik podniesienia pozostaje ustawiony. ID zadań i już odnotowane dowody ukończenia NIE MOGĄ zostać przepisane przez podniesienie; nowy zakres odkryty podczas podniesienia przechodzi zamiast tego przez `refine` i unieważnia tylko ten dowód, na który wpływa.

Podniesienie nigdy nie działa automatycznie w drugą stronę: plan Full nie jest po cichu zwijany z powrotem do Lite. Plan utworzony pod wcześniejszą wersją specyfikacji — w tym plan Full w wersji v1 bez pola `plan_format` w ogóle — zachowuje swój odnotowany kształt i pozostaje zgodny; sesja `refine` MOŻE świadomie go zmigrować, ale nic nie robi tego niejawnie.

`plan_format` w `manifest.json` jest niezmienne po zapisaniu; podniesienie zmienia `format` w `state.json` i czyści jego znacznik `promotion`, i nigdy nie przepisuje manifestu. Zob. [Stan planu](/spec/plan-state) po dokładne pola `plan_format`, `format`, `materialization`, `approval`, `promotion` i `locator` oraz ich adresy URL schematów v2.
