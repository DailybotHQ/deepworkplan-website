---
title: Stan planu
description: "Warstwa stanu planu odczytywalnego maszynowo: manifest.json i state.json, rekordy bramek, rekordy wyników jako pamięć epizodyczna, uzgadnianie i kiedy warstwa jest wymagana."
order: 8
lang: pl
section: State
---

# Stan planu

**Wersja 5.0.0. Status: stabilna.** Niniejszy dokument specyfikuje warstwę stanu planu odczytywalnego maszynowo metodyki Deep Work Plan, teraz dostosowaną do własnego numeru wersji standardu DWP — żadne istniejące wymaganie nie zostaje osłabione przez tę zmianę numeracji. Ta rewizja dokumentuje również strzeżony aktualizator stanu, zweryfikowaną publikację planu oraz zasady prawdziwości dowodów, które musi spełniać ukończony plan (zob. poniżej). Słowa kluczowe MUST (MUSI), MUST NOT (NIE MOŻE), SHOULD (POWINIEN), SHOULD NOT (NIE POWINIEN) i MAY (MOŻE) interpretuje się zgodnie z opisem w RFC 2119.

Dwa artefakty JSON — `manifest.json` (statyczna tożsamość planu) i `state.json` (aktywny stan realizacji poszczególnych zadań, w tym wyniki bramek walidacyjnych) — które każdy plan MOŻE przechowywać obok swoich plików Markdown, a które wykonanie nieobsługiwane (zob. [Protokół agenta](/spec/agent-protocol#execution-profiles)) oraz przestrzenie robocze bez gita (zob. [Archetypy](/spec/archetypes) §3) MUSZĄ przechowywać.

Plan w formacie Markdown pozostaje **ludzkoczytelnym źródłem prawdy**. Warstwa JSON jest **pochodną projekcją**: jest regenerowana przez agenta w zdefiniowanych punktach protokołu, nigdy nie edytowana ręcznie i nigdy nie może po cichu być niezgodna z Markdown. Jej celem jest interoperacyjność — lintowanie, sprawdzanie zgodności, diffowanie, dashboardy, wykrywanie w rejestrze oraz synchronizacja z zewnętrzną infrastrukturą sesji — żadna z tych funkcji nie może być niezawodnie zbudowana na tekście.

## Dlaczego to istnieje

Przez wersję 1.1 plany były wyłącznie w formacie Markdown. Dzięki temu były audytowalne i niezależne od agenta, ale nie dawały niczego, co narzędzie mogłoby walidować, diff'ować lub konsumować: brak bramki zgodności, brak wykrywania desynchronizacji między `README.md` a `PROGRESS.md`, brak możliwości poznania stanu planu przez demona lub sesję chmurową bez parsowania tekstu. Wersja 1.2 dodaje projekcję JSON bez degradowania Markdown — projekcja jest pochodną Markdown, tak jak plik lockfile jest pochodną manifestu.

## Umieszczenie

Plan korzystający z warstwy stanu ma następującą strukturę:

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← ludzkie źródło prawdy (niezmienione)
├── PROGRESS.md          ← narracyjny dziennik (niezmieniony)
├── PROMPTS.md           ← niezmieniony
├── manifest.json        ← statyczna tożsamość (zapisywana podczas materializacji)
├── state.json           ← aktywny stan (nadpisywany w punktach protokołu)
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json` MUSI być zapisany dokładnie raz, gdy przepływ `create` materializuje plan, i NIE MOŻE zostać zmieniony poza migracją wersji specyfikacji odnotowaną w `PROGRESS.md`.

`state.json` MUSI być nadpisywany przez agenta w każdym z następujących punktów protokołu: materializacja planu (wszystkie zadania `pending`), rozpoczęcie zadania (`in_progress`), każde uruchomienie bramki walidacyjnej (rekord bramki dodany lub zaktualizowany) ukończenie zadania (`completed`, w ramach protokołu ukończenia zadania w [Specyfikacji DWP](/spec/dwp-specification#task-completion-protocol)), punkt kontrolny przed każdą planowaną przerwą oraz zatrzymanie `blocked`.

Oba pliki MUSZĄ być zapisywane atomowo: zapis do pliku tymczasowego w tym samym katalogu, następnie nadpisanie docelowego. Przerwany zapis NIE MOŻE pozostawić po sobie obciętego pliku JSON.

## Kiedy warstwa jest wymagana

- Przy **interaktywnym** wykonaniu w repozytorium git warstwa stanu jest ZALECANA dla nowych planów i OPCJONALNA dla planów sprzed wersji 1.2. Plan bez niej pozostaje zgodny.
- Przy wykonaniu **nieobsługiwanym** warstwa stanu jest WYMAGANA.
- W **przestrzeni roboczej agenta** bez gita warstwa stanu jest WYMAGANA: `state.json` przenosi informacje o odtwarzaniu, które w repozytorium niesie dziennik git.

## `manifest.json` — tożsamość planu

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v2.json",
  "spec_version": "2.4.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "plan_format": "full",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

Pola `schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at`, `task_count` oraz `plan_format` są WYMAGANE.

`archetype` MUSI być jednym z: `individual`, `orchestrator-hub`, `agent-workspace`.

`rigor` MUSI być jednym z: `micro`, `standard`, `deep` (zob. [Proporcjonalna rygorystyczność](/spec/dwp-specification#proportional-rigor)).

`plan_format` MUSI być jednym z: `lite`, `full` — reprezentacja wybrana przy tworzeniu (zob. [Plany Lite](/spec/lite-plans)). Jest niezmienne na poziomie manifestu: późniejsze podniesienie z Lite do Full jest odnotowywane w `state.json`, a nie przez nadpisanie manifestu.

`parent_plan` łączy plan potomny z jego planem orkiestratora (`{repo}:{plan_name}` lub `null`).

`created_by` POWINIEN identyfikować tworzącego agenta i model. NIE MOŻE zawierać sekretów, tokenów ani identyfikatorów użytkownika poza nazwą wyświetlaną.

## `state.json` — aktywny stan realizacji

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v2.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "format": "full",
  "materialization": "ready",
  "approval": "approved",
  "promotion": null,
  "tasks": [
    {
      "id": 1,
      "locator": { "kind": "file", "value": "1.task_webhook_endpoint.md" },
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "locator": { "kind": "file", "value": "3.task_retry_queue.md" },
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

Wpisy zadań w planie Lite używają lokalizatora `inline`, wskazującego na kotwicę zadania w `README.md`, zamiast osobnego pliku — cała reszta wpisu (gates, outcome, status) działa tak samo:

```json
{
  "format": "lite",
  "materialization": "ready",
  "approval": "pre_approved",
  "promotion": null,
  "tasks": [
    {
      "id": 2,
      "locator": { "kind": "inline", "value": "#task-2" },
      "title": "Add retry queue",
      "status": "pending",
      "gates": []
    }
  ]
}
```

### Format, materializacja, zatwierdzenie i podniesienie

`format` MUSI być jednym z: `lite`, `full` i odzwierciedla `plan_format` manifestu — tutaj jest zmienne, w przeciwieństwie do manifestu, ponieważ plan Lite MOŻE później zostać podniesiony do Full. `materialization` MUSI być jednym z: `materializing` (folder planu jest zapisywany), `ready` (materializacja jest zakończona) lub `promoting` (trwa podniesienie z Lite do Full). `approval` MUSI być jednym z: `pending`, `approved`, `pre_approved`; jest OPCJONALNE w tym schemacie, tak aby plan zapisany zanim zaczęto to pole odnotowywać nadal się walidował — gdy jest nieobecne, za wartość przyjmuje się wiersz `Approval` z README, a gdy nieobecne są oba — `pending`. `promotion` wynosi `null` poza podniesieniem, albo jest obiektem odnotowującym zamiar podniesienia i docelowe zadania, dopóki `materialization` ma wartość `promoting`. Zob. [Plany Lite](/spec/lite-plans) po pełny cykl życia kodowany przez te pola.

### Wpisy zadań

Każde zadanie — osobny plik w planie Full, albo inline'owy rekord `{#task-N}` w planie Lite — MUSI mieć dokładnie jeden wpis w `tasks`, kluczowany swoim numerem (`id`) i swoim `locator`. `locator.kind` MUSI być `file` (Full — `value` to nazwa pliku zadania) lub `inline` (Lite — `value` to kotwica zadania, `#task-N`).

`status` MUSI być jednym z: `pending`, `in_progress`, `completed`, `blocked`, `skipped`. `skipped` jest prawidłowy wyłącznie wtedy, gdy użytkownik jawnie usunął zadanie z zakresu przez `refine`; NIE MOŻE się używać `state.json` do cichego pomijania pracy.

Wpis `completed` MUSI zawierać `completed_at` oraz, w przypadkach gdzie plan wykonuje commit, krótki hash `commit` — jest to łącze identyfikowalności od planu do kodu.

### Rekordy bramek

Każde uruchomienie polecenia walidacyjnego POWINNO być rejestrowane jako rekord bramki: `command`, `passes` (wartość logiczna), `exit_code`, `last_run` oraz krótki, czytelny dla człowieka ciąg `evidence` (podsumowanie lub ścieżka w lokalnym dla planu `analysis_results/` (wewnątrz własnego folderu planu, nigdy w katalogu głównym repo), nigdy pełne wyjście polecenia).

Zadanie NIE MOŻE być oznaczone jako `completed` w `state.json`, gdy którykolwiek z jego rekordów bramki ma wartość `passes: false` i nie ma późniejszego pomyślnego uruchomienia. Rekordy bramek są maszynowym odpowiednikiem zasady „nigdy nie oznaczaj jako ukończone bez dowodów" — wzorzec flagi `passes` dla każdego elementu, chroniącej przed przedwczesnym ukończeniem.

### Rekordy wyników jako pamięć epizodyczna

Ukończone zadanie POWINNO zawierać rekord `outcome`: co `tried` (próbowano), co `failed` (zawiodło), co `worked` (zadziałało) oraz swobodne `notes` (notatki). Każdy wpis należy ograniczyć do jednej linii.

Rekordy wyników czynią ukończony plan odtwarzalną **pamięcią epizodyczną**: agent (lub platforma indeksowania pamięci) może później przypomnieć sobie, jak rozwiązano problem, a nie tylko że tak się stało. Zasilają one rozstrzygnięcia dotyczące skilli zapisywane lokalnie w zadaniach oraz uzgodnienie decyzji dotyczących skilli w Final Review, które czyta je podczas wyszukiwania wzorców. Na platformach takich jak Hermes, które indeksują pamięć agenta, rekordy wyników w `state.json` sprawiają, że ukończone plany stają się bezpośrednio odtwarzalne w przyszłych sesjach.

### Punkt kontrolny i stan zablokowania

`checkpoint` rejestruje najbardziej szczegółowy punkt wznowienia wewnątrz bieżącego zadania: `id` zadania, swobodny lokalizator `step`, znacznik czasu i jednoliniową notatkę. Agent POWINIEN aktualizować go za każdym razem, gdy pauzuje wewnątrz zadania; MUSI zaktualizować go przed każdą planowaną przerwą w trybie nieobsługiwanym.

`blocked` wynosi `null` lub `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`. Nieobsługiwany agent, który napotka warunek zatrzymania, MUSI wypełnić pole `blocked` przed zatrzymaniem — w ten sposób następne bicie serca demona lub człowiek dowiedzą się, dlaczego plan się zatrzymał.

## Projekcja i uzgadnianie

Markdown MUSI wygrać każdą niezgodność. Jeśli `state.json` mówi, że zadanie 4 jest `completed`, ale README planu pokazuje niezaznaczone pole wyboru, plik stanu jest nieaktualny.

Wznawiający agent MUSI porównać listę pól wyboru z README z `state.json` przed kontynuacją. W przypadku desynchronizacji MUSI zregenerować `state.json` z Markdown (i dziennika git, tam gdzie jest dostępny), odnotować uzgodnienie w `PROGRESS.md`, a dopiero potem kontynuować.

Sub-skill `verify` MUSI traktować desynchronizację jako wynik niezgodności: raportować, które zadania są niezgodne i w jakim kierunku.

Narzędzia inne niż wykonujący agent MUSZĄ traktować oba pliki JSON jako tylko do odczytu.

## Strzeżone aktualizacje stanu

Zwykłe zapisy postępu przechodzą przez dostarczony, celowany aktualizator zamiast przez przepisanie całego pliku. Odrzuca on od razu zniekształcony stan i odmawia oznaczenia zadania jako `completed` bez dołączonego niepustego dowodu bramki — dostępna jest forma `--gate-json` dla polecenia, którego własne wyjście zawiera znaki potoku (pipe), a aktualizator akceptuje ten sam zamknięty obiekt bramki opisany powyżej. Ponowne próby zastępują wyłącznie własne polecenie; inne polecenie zachowuje swój osobny rekord. `--block-reason` odnotowuje blokadę; `--resolve-blocker` rozwiązuje wyłącznie blokadę bieżącego zadania, nigdy innego zadania. Pominięta praca nigdy nie może uczynić planu `completed`. `--reopen-reason` odnotowuje zamiar wywołującego, by poprawić plan przez `refine` — poprawka oraz wszelkie dowody, które unieważnia, MUSZĄ zostać najpierw odnotowane w dzienniku zadania. `--expected-sha256` odrzuca zapis względem zrzutu stanu, który od tego czasu się zmienił. Współdziałający katalog `.lock` serializuje równoczesnych zapisujących; blokada po awarii zapisującego MUSI zostać sprawdzona przed usunięciem, a żadna ochrona nie jest deklarowana przed edytorem, który całkowicie omija blokadę. Te rekordy stwierdzają wyniki — same w sobie nie dowodzą, że polecenie zostało wykonane ani że jego wyjście zostało semantycznie zaakceptowane.

## Zweryfikowana publikacja planu

Przed ogłoszeniem ukończenia dzienniki ukończonych zadań (każdy niosący swoje **rozstrzygnięcie dotyczące skilli** oraz, w Final Review, swoją **decyzję dotyczącą dokumentacji**), indeks README i `PROGRESS.md` MUSZĄ zostać sporządzone na podstawie zdobytego źródła i wyników akceptacji. Ostatnie zadanie planu zamyka się następnie przez dostarczony finalizator: jego końcowe przejście waliduje ukończonego kandydata względem każdego artefaktu planu przed zapisaniem stanu, następnie weryfikuje pliki i odnotowuje potwierdzenie `analysis_results/FINALIZATION.json`. Wymyślona przechodząca bramka NIE MOŻE stanowić podstawy tego przejścia — potwierdzenie jest zewnętrznym dowodem tego, co faktycznie zostało sprawdzone, nigdy własnym warunkiem wstępnym. Następnie uruchamiane jest `bash ../verify/conformance.sh --plan PLAN_name`, względem rzeczywistych artefaktów na dysku.

Przerwana publikacja pozostawia na miejscu znacznik `.finalizing.json`; zwykła weryfikacja kończy się niepowodzeniem, dopóki dowody nie zostaną sprawdzone, a pomocnik odzyskiwania nie powiedzie się względem tego samego kandydata — nic nie wznawia publikacji przez domniemanie. Nieaktualna współdziałająca blokada wymaga potwierdzenia, że żaden zapisujący nie pozostaje aktywny, przed usunięciem. Nic w tej warstwie nie wykonuje commitu, nie pushuje, nie uruchamia zapisanej komendy bramki ani po cichu nie naprawia Markdown planu. Brakujący interpreter Pythona daje `UNVERIFIED`, nigdy `completed`.

## Prawdziwość dowodów i poprawki

Każda zmiana zakresu zadania, kryteriów akceptacji lub odroczenia niesie jeden trwały rekord poprawki: dosłowne oryginalne kryterium, co zaobserwowano, rozstrzygnięcie, powód, władzę za nim stojącą (użytkownik, deweloper lub dowód), dotknięte zadania oraz to, który dowód został unieważniony lub zachowany. Poprawki są dopisywane, nigdy z datą wsteczną; `manifest.json` zachowuje swoją proweniencję utworzenia i nigdy nie jest przepisywany, aby dopasować się do zmienionego bieżącego zakresu.

Pięć stanów dowodu opisuje, względem czego może zamknąć się rekord zadania:

- **Ukończone dochodzenie** — rzeczywista odnotowana praca; zamyka zadanie wyłącznie względem zmienionego kryterium, które je wskazuje z nazwy, nigdy względem oryginału tak, jak został zapisany.
- **Niewykonany scenariusz** — odnotowany jako niewykonany; nie wnosi żadnego przechodzącego dowodu w żadnej erze.
- **Odroczone wymaganie** — kryterium przenosi się do nazwanego zadania docelowego z odnotowaną władzą; wyłącznie ta poprawka zamyka źródło.
- **Nieudana bramka** — pozostaje nieudana, dopóki ta sama intencja akceptacji nie zostanie ponownie uruchomiona i nie przejdzie; ponowna próba zastępuje wyłącznie własne polecenie.
- **Osiągnięty wynik produktu** — kryterium tak, jak zostało zapisane, zweryfikowane przez własną bramkę; jedyny stan, który zamyka zadanie bez zmian.

Egzekwowanie jest mechaniczne wszędzie tam, gdzie pozwalają na to rekordy. Dowód bramki oznaczony jako „unieważniony przez refine” jest zachowaną historią, nigdy przechodzącym dowodem, a ukończone zadanie, które nadal na nim polega, jest zgłaszane przez sprawdzającego. Przechodzący rekord, którego własny tekst przyznaje, że sprawdzenie nigdy nie zostało wykonane (na przykład „nigdy nie wykonano”, „nie uruchomiono” lub „nie da się zmierzyć”) jest sprzecznością, zgłaszaną w ten sam sposób — podobnie jak ukończone zadanie stanu, którego własny dziennik nadal pokazuje `Status: pending`. Sprzeczności narracyjne wykraczające poza te przypadki — raport, którego wnioski są niezgodne z jego własną listą kontrolną — wymagają recenzenta-człowieka; sprawdzający zgłasza to, co mówią rekordy, a nie to, co oznacza tekst. Użytkownik MOŻE wyraźnie zaakceptować ograniczony wyjątek z odnotowaną władzą; wstępne zatwierdzenie w trybie nieobsługiwanym nigdy nie jest ogólnym pozwoleniem na porzucenie podstawowego celu, a niemożliwe do spełnienia obowiązkowe kryterium jest blokadą, nigdy ukończoną pracą.

## Wersjonowanie schematów

Oba schematy są wersjonowane przez URL. Pola addytywne są dozwolone w ramach wersji; zmiana nazwy lub typu pola wymaga nowej wersji schematu i noty migracyjnej w dzienniku zmian specyfikacji. Ta rewizja wprowadza `/v2.json` dla obu schematów: pole `file` wpisu zadania staje się typizowanym `locator` (`{"kind": "file" | "inline", "value": ...}`), manifest zyskuje `plan_format`, a plik stanu zyskuje `format`, `materialization`, `approval` i `promotion` — razem pola, których potrzebują plany Lite (zob. [Plany Lite](/spec/lite-plans)). Manifesty i pliki stanu `/v1.json` pozostają ważne i nigdy nie są po cichu przepisywane na v2; sesja `refine` MOŻE świadomie zmigrować jeden z nich. Pole `spec_version` w manifeście wskazuje wersję specyfikacji DWP, pod którą plan został utworzony; agent napotykający plan nowszy niż jego zainstalowana specyfikacja POWINIEN to zgłosić, zamiast zgadywać.
