---
title: Plan-Zustand
description: "Die maschinenlesbare Plan-Zustandsschicht: manifest.json und state.json, Gate-Einträge, Ergebnis-Einträge als episodisches Gedächtnis, Abgleich und wann sie erforderlich ist."
order: 7
lang: de
section: State
---

# Plan-Zustand

**Version 1.0. Status: Stabil.** Dieses Dokument spezifiziert die maschinenlesbare Plan-Zustandsschicht der Deep Work Plan Methodik. Die Schlüsselwörter MUSS, DARF NICHT, SOLLTE, SOLLTE NICHT und KANN sind so zu interpretieren, wie in RFC 2119 beschrieben.

Zwei JSON-Artefakte — `manifest.json` (die statische Identität des Plans) und `state.json` (der lebendige, aufgabenbezogene Ausführungszustand einschließlich Validierungs-Gate-Ergebnisse) — die jeder Plan gemeinsam mit seinen Markdown-Dateien führen KANN, und die unbeaufsichtigte Ausführung (siehe [Agentenprotokoll](/spec/agent-protocol#execution-profiles)) und Nicht-git-Arbeitsbereiche (siehe [Archetypen](/spec/archetypes) §3) führen MÜSSEN.

Der Markdown-Plan bleibt die **menschenlesbare Quelle der Wahrheit**. Die JSON-Schicht ist eine **abgeleitete Projektion**: Sie wird vom Agenten zu definierten Protokollpunkten neu erzeugt, niemals manuell bearbeitet und darf der Markdown-Quelle niemals stillschweigend widersprechen. Ihr Zweck ist Interoperabilität — Linting, Konformitätsprüfung, Diffing, Dashboards, Registry-Entdeckung und Synchronisation mit externer Sitzungsinfrastruktur — alles Dinge, die auf Prosa nicht zuverlässig aufgebaut werden können.

## Warum diese Schicht existiert

Bis einschließlich v1.1 bestanden Pläne nur aus Prosa-Markdown. Das hielt sie prüfbar und agenten-agnostisch, ließ aber nichts übrig, das ein Werkzeug validieren, vergleichen oder konsumieren konnte: kein Konformitäts-Gate, keine Desync-Erkennung zwischen `README.md` und `PROGRESS.md`, keine Möglichkeit für einen Daemon oder eine Cloud-Sitzung, den Planzustand zu kennen, ohne Prosa zu parsen. v1.2 fügt die JSON-Projektion hinzu, ohne Markdown zu degradieren — die Projektion wird aus dem Markdown abgeleitet, so wie eine Lock-Datei aus einem Manifest abgeleitet wird.

## Anordnung

Ein Plan, der die Zustandsschicht verwendet, hat dieses Layout:

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← menschliche Quelle der Wahrheit (unverändert)
├── PROGRESS.md          ← narratives Protokoll (unverändert)
├── PROMPTS.md           ← unverändert
├── manifest.json        ← statische Identität (beim Materialisieren geschrieben)
├── state.json           ← lebendiger Zustand (bei Protokollpunkten neu geschrieben)
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json` MUSS genau einmal geschrieben werden, wenn der `create`-Ablauf den Plan materialisiert, und DARF danach NICHT verändert werden, außer bei einer Spezifikationsversions-Migration, die in `PROGRESS.md` vermerkt wird.

`state.json` MUSS vom Agenten bei jedem dieser Protokollpunkte neu geschrieben werden: Plan-Materialisierung (alle Aufgaben `pending`), Aufgabenstart (`in_progress`), jeder Validierungs-Gate-Lauf (Gate-Eintrag wird angehängt oder aktualisiert) und Aufgabenabschluss (`completed`, als Teil des Aufgabenabschlussprotokolls in der [DWP-Spezifikation](/spec/dwp-specification#task-completion-protocol)).

Beide Dateien MÜSSEN atomar geschrieben werden: in eine temporäre Datei im selben Verzeichnis schreiben, dann über das Ziel umbenennen. Ein abgebrochener Schreibvorgang DARF KEINE abgeschnittene JSON-Datei hinterlassen.

## Wann die Schicht erforderlich ist

- Bei **interaktiver** Ausführung in einem git-Repository ist die Zustandsschicht für neue Pläne EMPFOHLEN und für Pläne vor v1.2 OPTIONAL. Ein Plan ohne sie bleibt konform.
- Bei **unbeaufsichtigter** Ausführung ist die Zustandsschicht ERFORDERLICH.
- In einem **Agenten-Arbeitsbereich** ohne git ist die Zustandsschicht ERFORDERLICH: `state.json` enthält die Wiederherstellungsinformationen, die das git-Protokoll in einem Repository enthält.

## `manifest.json` — Plan-Identität

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

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at` und `task_count` sind ERFORDERLICH.

`archetype` MUSS eines von `individual`, `orchestrator-hub`, `agent-workspace` sein.

`rigor` MUSS eines von `micro`, `standard`, `deep` sein (siehe [Proportionaler Rigor](/spec/dwp-specification#proportional-rigor)).

`parent_plan` verknüpft einen Kindplan mit seinem Orchestratorplan (`{repo}:{plan_name}` oder `null`).

`created_by` SOLLTE den erstellenden Agenten und das Modell identifizieren. Es DARF KEINE Geheimnisse, Tokens oder Nutzeridentifikatoren über einen Anzeigenamen hinaus enthalten.

## `state.json` — lebendiger Ausführungszustand

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

### Aufgabeneinträge

Jede Aufgabendatei im Plan MUSS genau einen Eintrag in `tasks` haben, identifiziert durch seine Nummer (`id`) und seinen Dateinamen (`file`).

`status` MUSS eines von `pending`, `in_progress`, `completed`, `blocked`, `skipped` sein. `skipped` ist nur gültig, wenn der Nutzer die Aufgabe explizit über `refine` aus dem Umfang entfernt hat; `state.json` DARF NICHT verwendet werden, um Arbeit stillschweigend zu überspringen.

Ein `completed`-Eintrag MUSS `completed_at` enthalten und, wo der Plan committet, den kurzen `commit`-Hash — das ist der Plan-zu-Code-Rückverfolgbarkeitslink.

### Gate-Einträge

Jeder Lauf eines Validierungsbefehls SOLLTE als Gate-Eintrag aufgezeichnet werden: `command`, `passes` (boolean), `exit_code`, `last_run` und eine kurze menschenlesbare `evidence`-Zeichenkette (eine Zusammenfassungszeile oder ein Pfad unter `analysis_results/`, niemals vollständige Befehlsausgabe).

Eine Aufgabe DARF NICHT in `state.json` als `completed` markiert werden, solange irgendein ihrer Gate-Einträge `passes: false` hat und kein späterer erfolgreicher Lauf vorliegt. Gate-Einträge sind das maschinelle Äquivalent von „niemals als abgeschlossen markieren ohne Beleg" — das Muster eines `passes`-Flags pro Eintrag, das vorzeitigen Abschluss verhindert.

### Ergebnis-Einträge als episodisches Gedächtnis

Eine `completed`-Aufgabe SOLLTE einen `outcome`-Eintrag enthalten: was `tried` (versucht) wurde, was `failed` (fehlschlug), was `worked` (funktionierte) und freie `notes` (Notizen). Jeden Eintrag auf eine Zeile beschränken.

Ergebnis-Einträge machen einen abgeschlossenen Plan zu abrufbarem **episodischem Gedächtnis**: Ein Agent (oder eine Speicher-Indexierungsplattform) kann später nachvollziehen, wie ein Problem gelöst wurde — nicht nur, dass es gelöst wurde. Sie fließen in die verpflichtende Skills-&-Agenten-Discovery-Aufgabe ein, die sie beim Mining von Mustern lesen SOLLTE. Auf Plattformen wie Hermes, die Agentenspeicher indexieren, machen Ergebnis-Einträge in `state.json` abgeschlossene Pläne direkt über zukünftige Sitzungen abrufbar.

### Checkpoint und blockierter Zustand

`checkpoint` zeichnet den feinkörnigsten Wiederaufnahmepunkt innerhalb der aktuellen Aufgabe auf: die Aufgaben-`id`, einen freien `step`-Lokator, einen Zeitstempel und eine einzeilige Notiz. Ein Agent SOLLTE ihn aktualisieren, wann immer er innerhalb einer Aufgabe pausiert; er MUSS ihn vor jeder geplanten Unterbrechung im unbeaufsichtigten Modus aktualisieren.

`blocked` ist `null` oder `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`. Ein unbeaufsichtigter Agent, der eine Stopbedingung erreicht, MUSS `blocked` setzen, bevor er anhält — so erfährt der nächste Herzschlag eines Daemons oder ein Mensch, warum der Plan gestoppt hat.

## Projektion und Abgleich

Das Markdown MUSS jeden Widerspruch gewinnen. Wenn `state.json` sagt, dass Aufgabe 4 `completed` ist, aber der Plan-README ein nicht markiertes Kästchen zeigt, ist die Zustandsdatei veraltet.

Ein wiederaufnehmender Agent MUSS die README-Checkbox-Liste gegen `state.json` abgleichen, bevor er weitermacht. Bei Desync MUSS er `state.json` aus dem Markdown (und dem git-Protokoll, wo verfügbar) neu erzeugen, den Abgleich in `PROGRESS.md` festhalten und erst dann fortfahren.

Die `verify`-Sub-Skill MUSS Desync als Konformitätsbefund behandeln: berichten, welche Aufgaben nicht übereinstimmen und in welcher Richtung.

Andere Werkzeuge als der ausführende Agent MÜSSEN beide JSON-Dateien als schreibgeschützt behandeln.

## Schema-Versionierung

Beide Schemas sind nach URL versioniert (`/v1.json`). Additive Felder sind innerhalb einer Version erlaubt; das Umbenennen oder Ändern des Typs eines Feldes erfordert `/v2.json` und eine Migrationsnotiz im Spezifikations-Changelog. Das `spec_version`-Feld im Manifest fixiert die DWP-Spezifikationsversion, unter der der Plan erstellt wurde; ein Agent, der auf einen neueren Plan als seine installierte Spezifikation trifft, SOLLTE dies mitteilen, anstatt zu raten.
