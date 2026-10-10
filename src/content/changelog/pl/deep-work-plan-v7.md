---
title: "DWP v7: plany, które delegują, z zapisem wszystkiego"
description: "Deep Work Plan v7 zachowuje kontrakt i dziennik z v6, pozwala planowi przekazywać ograniczone zadania innym agentom i dodaje cztery opcjonalne dodatki."
date: 2026-10-10
version: "v7 · Delegowanie z dowodami"
kind: release
lang: pl
order: 0
featured: true
sourceLabel: "Opublikowany zestaw schematów v7"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
---

Deep Work Plan v7 zachowuje metodę z v6: kontrakt jest autorytetem, dziennik tylko do dopisywania jest pamięcią, harmonogram decyduje, co uruchomić dalej, a zadanie zamyka się dopiero wtedy, gdy zapisane dowody spełniają jego kryteria. v7 dodaje możliwość delegowania i zachowuje tę samą dyscyplinę wobec wyniku.

Plan, który przyznaje `agent_delegation`, może oznaczyć zadanie jako `parallel_safe` i przekazać je innemu agentowi. Odpowiedź delegata jest zapisywana jako dane, nigdy jako instrukcje, i pozostaje `asserted`, dopóki narzędzie uruchamiające bramki w samym planie nie zaobserwuje wyniku. Dowody `observed` tworzy wyłącznie to narzędzie, więc delegowanie zwiększa zasięg bez obniżania poprzeczki dla ukończenia zadania.

Cztery opcjonalne dodatki zamieniają delegowanie w praktyczną autonomię. Herdr przekazuje zadanie agentowi w panelu, na dowolnej maszynie. Agentkit umieszcza jedno polecenie `ak` nad wszystkimi terminalowymi agentami programistycznymi, z autonomią domyślnie i możliwością jej wyłączenia, oraz uruchamia ograniczone zadania bez interfejsu w drzewie roboczym git. Devcontainer daje każdemu repozytorium odtwarzalny kontener bez żadnego klucza SSH w środku. DeepWorkPlan Vim to edytor terminalowy z przeglądarką planów i podglądem Markdown. Każdy z nich jest przypięty tagiem do produktu z własnym repozytorium i działa bez Deep Work Plan. Repozytorium jest w pełni zgodne bez żadnego z nich, a rejestr w `.dwp/config.json` zapisuje, które są włączone.

Tryb benchmarku i wniosków zapisuje, czego uczy każdy plan, aby ustalenia można było później przeanalizować. Audyt całego ekosystemu, przeprowadzony jako plan orkiestratora v7 z jednym agentem na repozytorium, nie wykrył regresji zachowania względem v6: zestaw testów pakietu przechodzi 807 z 807 w czystym środowisku, a obciążenie instrukcjami wzrosło o 0.1% do 3.9% na przepływ (4.6% dla całego pakietu), mierzone w bajtach na obu tagach, a nie szacowane jako tokeny.

v7 to krok naprzód w orkiestracji i możliwości audytu, ale jeszcze nie w pełni bezobsługowa autonomia. Pętla benchmarku i wniosków nie mierzy jeszcze automatycznie planów v7, a nie gorszość wyników agentów nie została zmierzona. Istniejące plany zachowują zapisaną generację i nigdy nie są migrowane domyślnie; nowe plany domyślnie używają kontraktu v7.

Zainstalowana wersja skilla: **7.1.4**, stabilna od 7.0.0.
