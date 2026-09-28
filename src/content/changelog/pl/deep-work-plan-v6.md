---
title: "DWP v6: ta sama metoda, ściślejszy kontrakt"
description: "Deep Work Plan v6 zachowuje metodykę v5 i dodaje ściślejszą strukturę wykonania. Nie mierzono dotąd niegorszości wyników agentów w praktyce."
date: 2026-09-28
version: "v6 · Ściślejsza struktura"
kind: release
lang: pl
order: 0
featured: true
sourceLabel: "Opublikowany zestaw schematów v6"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6 zachowuje metodykę v5, zestaw poleceń i lokalizację `.dwp/plans/`. Dodaje ściślejszą strukturę do opisu uprawnień planu, dowodów wykonania, kontekstu zadań, harmonogramowania i bieżącego stanu.

Zestaw schematów v6 definiuje manifest tożsamości, kontrakt wyników i uprawnień, zdarzenia dziennika wyłącznie dopisywane, manifest kontekstu zadania oraz aktywną migawkę. Aktywna projekcja v6 to migawka, więc `plan-state/v5.json` pozostaje schematem stanu dla planów v5; `plan-state/v6.json` nie istnieje. Istniejące plany zachowują zapisaną generację i nigdy nie są po cichu przepisywane.

Decyzja architektoniczna to GO: v6 zachowuje tę samą metodykę przy ściślejszej strukturze inżynieryjnej. To nie jest twierdzenie o przewadze empirycznej. Nie mierzono niegorszości wyników agentów.

Nowe plany otrzymują monotonicznie rosnące identyfikatory liczbowe o długości co najmniej trzech cyfr (na przykład `PLAN_001_add_payment_webhooks/`). Zamrożone schematy v5 liczą identyfikator liczbowy jako jedno słowo, dlatego slug v5 ma 2–4 słowa, a slug v6 ma 2–5. Istniejące nienumerowane foldery `PLAN_<slug>/` pozostają czytelne i nigdy nie są przemianowywane. Jeśli istnieją plany numerowane, `latest` wskazuje plan o najwyższym identyfikatorze liczbowym.
