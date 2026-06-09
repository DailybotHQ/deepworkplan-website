---
title: Stan planu
description: "Warstwa stanu planu odczytywalnego maszynowo: manifest.json i state.json, rekordy bramek, rekordy wyników jako pamięć epizodyczna, uzgadnianie i kiedy warstwa jest wymagana."
order: 7
lang: pl
section: State
---

# Stan planu

**Wersja 1.0. Status: stabilna.** Niniejszy dokument specyfikuje warstwę stanu planu odczytywalnego maszynowo metodyki Deep Work Plan. Słowa kluczowe MUST (MUSI), MUST NOT (NIE MOŻE), SHOULD (POWINIEN), SHOULD NOT (NIE POWINIEN) i MAY (MOŻE) interpretuje się zgodnie z opisem w RFC 2119.

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

`state.json` MUSI być nadpisywany przez agenta w każdym z następujących punktów protokołu: materializacja planu (wszystkie zadania `pending`), rozpoczęcie zadania (`in_progress`), każde uruchomienie bramki walidacyjnej (rekord bramki dodany lub zaktualizowany) oraz ukończenie zadania (`completed`, w ramach protokołu ukończenia zadania w [Specyfikacji DWP](/spec/dwp-specification#task-completion-protocol)).

Oba pliki MUSZĄ być zapisywane atomowo: zapis do pliku tymczasowego w tym samym katalogu, następnie nadpisanie docelowego. Przerwany zapis NIE MOŻE pozostawić po sobie obciętego pliku JSON.

## Kiedy warstwa jest wymagana

- Przy **interaktywnym** wykonaniu w repozytorium git warstwa stanu jest ZALECANA dla nowych planów i OPCJONALNA dla planów sprzed wersji 1.2. Plan bez niej pozostaje zgodny.
- Przy wykonaniu **nieobsługiwanym** warstwa stanu jest WYMAGANA.
- W **przestrzeni roboczej agenta** bez gita warstwa stanu jest WYMAGANA: `state.json` przenosi informacje o odtwarzaniu, które w repozytorium niesie dziennik git.

## `manifest.json` — tożsamość planu

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v1.json",
  "spec_version": "2.2.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

Pola `schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at` oraz `task_count` są WYMAGANE.

`archetype` MUSI być jednym z: `individual`, `orchestrator-hub`, `agent-workspace`.

`rigor` MUSI być jednym z: `micro`, `standard`, `deep` (zob. [Proporcjonalna rygorystyczność](/spec/dwp-specification#proportional-rigor)).

`parent_plan` łączy plan potomny z jego planem orkiestratora (`{repo}:{plan_name}` lub `null`).

`created_by` POWINIEN identyfikować tworzącego agenta i model. NIE MOŻE zawierać sekretów, tokenów ani identyfikatorów użytkownika poza nazwą wyświetlaną.

## `state.json` — aktywny stan realizacji

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v1.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "tasks": [
    {
      "id": 1,
      "file": "1.task_webhook_endpoint.md",
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
      "file": "3.task_retry_queue.md",
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

### Wpisy zadań

Każdy plik zadania w planie MUSI mieć dokładnie jeden wpis w `tasks`, kluczowany numerem (`id`) i nazwą pliku (`file`).

`status` MUSI być jednym z: `pending`, `in_progress`, `completed`, `blocked`, `skipped`. `skipped` jest prawidłowy wyłącznie wtedy, gdy użytkownik jawnie usunął zadanie z zakresu przez `refine`; NIE MOŻE się używać `state.json` do cichego pomijania pracy.

Wpis `completed` MUSI zawierać `completed_at` oraz, w przypadkach gdzie plan wykonuje commit, krótki hash `commit` — jest to łącze identyfikowalności od planu do kodu.

### Rekordy bramek

Każde uruchomienie polecenia walidacyjnego POWINNO być rejestrowane jako rekord bramki: `command`, `passes` (wartość logiczna), `exit_code`, `last_run` oraz krótki, czytelny dla człowieka ciąg `evidence` (podsumowanie lub ścieżka w `analysis_results/`, nigdy pełne wyjście polecenia).

Zadanie NIE MOŻE być oznaczone jako `completed` w `state.json`, gdy którykolwiek z jego rekordów bramki ma wartość `passes: false` i nie ma późniejszego pomyślnego uruchomienia. Rekordy bramek są maszynowym odpowiednikiem zasady „nigdy nie oznaczaj jako ukończone bez dowodów" — wzorzec flagi `passes` dla każdego elementu, chroniącej przed przedwczesnym ukończeniem.

### Rekordy wyników jako pamięć epizodyczna

Ukończone zadanie POWINNO zawierać rekord `outcome`: co `tried` (próbowano), co `failed` (zawiodło), co `worked` (zadziałało) oraz swobodne `notes` (notatki). Każdy wpis należy ograniczyć do jednej linii.

Rekordy wyników czynią ukończony plan odtwarzalną **pamięcią epizodyczną**: agent (lub platforma indeksowania pamięci) może później przypomnieć sobie, jak rozwiązano problem, a nie tylko że tak się stało. Zasilają one obowiązkowe zadanie wykrywania Skills i Agentów, które POWINNO je czytać podczas wyszukiwania wzorców. Na platformach takich jak Hermes, które indeksują pamięć agenta, rekordy wyników w `state.json` sprawiają, że ukończone plany stają się bezpośrednio odtwarzalne w przyszłych sesjach.

### Punkt kontrolny i stan zablokowania

`checkpoint` rejestruje najbardziej szczegółowy punkt wznowienia wewnątrz bieżącego zadania: `id` zadania, swobodny lokalizator `step`, znacznik czasu i jednoliniową notatkę. Agent POWINIEN aktualizować go za każdym razem, gdy pauzuje wewnątrz zadania; MUSI zaktualizować go przed każdą planowaną przerwą w trybie nieobsługiwanym.

`blocked` wynosi `null` lub `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`. Nieobsługiwany agent, który napotka warunek zatrzymania, MUSI wypełnić pole `blocked` przed zatrzymaniem — w ten sposób następne bicie serca demona lub człowiek dowiedzą się, dlaczego plan się zatrzymał.

## Projekcja i uzgadnianie

Markdown MUSI wygrać każdą niezgodność. Jeśli `state.json` mówi, że zadanie 4 jest `completed`, ale README planu pokazuje niezaznaczone pole wyboru, plik stanu jest nieaktualny.

Wznawiający agent MUSI porównać listę pól wyboru z README z `state.json` przed kontynuacją. W przypadku desynchronizacji MUSI zregenerować `state.json` z Markdown (i dziennika git, tam gdzie jest dostępny), odnotować uzgodnienie w `PROGRESS.md`, a dopiero potem kontynuować.

Sub-skill `verify` MUSI traktować desynchronizację jako wynik niezgodności: raportować, które zadania są niezgodne i w jakim kierunku.

Narzędzia inne niż wykonujący agent MUSZĄ traktować oba pliki JSON jako tylko do odczytu.

## Wersjonowanie schematów

Oba schematy są wersjonowane przez URL (`/v1.json`). Pola addytywne są dozwolone w ramach wersji; zmiana nazwy lub typu pola wymaga `/v2.json` i noty migracyjnej w dzienniku zmian specyfikacji. Pole `spec_version` w manifeście wskazuje wersję specyfikacji DWP, pod którą plan został utworzony; agent napotykający plan nowszy niż jego zainstalowana specyfikacja POWINIEN to zgłosić, zamiast zgadywać.
