---
title: "DWP v7: plany, które delegują, z zapisem wszystkiego"
description: "Deep Work Plan v7 zachowuje kontrakt i dziennik z v6, pozwala planowi przekazywać ograniczone zadania innym agentom i dodaje cztery opcjonalne dodatki."
date: 2026-10-09
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
  - label: "Skill release v7.7.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.7.0"
  - label: "Skill release v7.8.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.0"
  - label: "Skill release v7.8.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.1"
---

Deep Work Plan v7 zachowuje metodę z v6: kontrakt jest autorytetem, dziennik tylko do dopisywania jest pamięcią, harmonogram decyduje, co uruchomić dalej, a zadanie zamyka się dopiero wtedy, gdy zapisane dowody spełniają jego kryteria. v7 dodaje możliwość delegowania i zachowuje tę samą dyscyplinę wobec wyniku.

Plan, który przyznaje `agent_delegation`, może oznaczyć zadanie jako `parallel_safe` i przekazać je innemu agentowi. Odpowiedź delegata jest zapisywana jako dane, nigdy jako instrukcje, i pozostaje `asserted`, dopóki narzędzie uruchamiające bramki w samym planie nie zaobserwuje wyniku. Dowody `observed` tworzy wyłącznie to narzędzie, więc delegowanie zwiększa zasięg bez obniżania poprzeczki dla ukończenia zadania.

Cztery opcjonalne dodatki zamieniają delegowanie w praktyczną autonomię. Herdr przekazuje zadanie agentowi w panelu, na dowolnej maszynie. Agentkit umieszcza jedno polecenie `ak` nad wszystkimi terminalowymi agentami programistycznymi, z autonomią domyślnie i możliwością jej wyłączenia, oraz uruchamia ograniczone zadania bez interfejsu w drzewie roboczym git. Devcontainer daje każdemu repozytorium odtwarzalny kontener domyślnie bez żadnego klucza SSH w środku (git przez SSH za pośrednictwem agenta hosta; pliki kluczy wyłącznie po wyraźnym włączeniu `[ssh] copy_keys`). DeepWorkPlan Vim to edytor terminalowy z przeglądarką planów i podglądem Markdown. Każdy z nich jest przypięty tagiem do produktu z własnym repozytorium i działa bez Deep Work Plan. Repozytorium jest w pełni zgodne bez żadnego z nich, a rejestr w `.dwp/config.json` zapisuje, które są włączone.

Tryb benchmarku i wniosków zapisuje, czego uczy każdy plan, aby ustalenia można było później przeanalizować. Audyt całego ekosystemu, przeprowadzony jako plan orkiestratora v7 z jednym agentem na repozytorium, nie wykrył regresji zachowania względem v6: zestaw testów pakietu przechodzi 807 z 807 w czystym środowisku, a obciążenie instrukcjami wzrosło o 0.1% do 3.9% na przepływ (4.6% dla całego pakietu), mierzone w bajtach na obu tagach, a nie szacowane jako tokeny.

v7 to krok naprzód w orkiestracji i możliwości audytu, ale jeszcze nie w pełni bezobsługowa autonomia. Wydanie 7.2.0 zamyka luki wykryte przez ten audyt: benchmark i wnioski mierzą teraz plany v7, rozpoczęcie zadania przed ukończeniem jego warunków wstępnych jest odrzucane, a zestaw testów działa hermetycznie (815 z 815 w czystym środowisku). Nie zmierzono, czy wyniki agentów nie są gorsze (non-inferiority). Istniejące plany zachowują zapisaną generację i nigdy nie są migrowane domyślnie; nowe plany domyślnie używają kontraktu v7.

Wydanie 7.6.0 (2026-10-11) wprowadziło orkiestrację na dużą skalę: jeden tor (lane) na repozytorium lub nurt pracy, konta wybierane według dostępnego zapasu (`ak usage`, `ak pick`), bezobsługowe uruchamianie oraz wdrożenie, które wykrywa każdy dodatek, aktualizuje używane i proponuje pasujące.

Wydanie 7.7.0 (2026-10-12) przyniosło autonomię roju (Przewodnik §17): pętlę przepustowości (`shared/swarm.py`), pakiety przekazania (`dwp-handoff-v1`), sukcesję lidera z epokami i izolacją, zapytania między torami, taksonomię eskalacji AGENT_PROTOCOL §7.5 (C1–C7: rozstrzygaj i zapisuj wszystko inne), poprzeczkę jakości (bramki to hipotezy, weryfikowane, a nie deklarowane) oraz wnioski metodyczne z 313 zrealizowanych planów w 23 repozytoriach. Znane ograniczenie: dziennik v7 nie ma dedykowanego zdarzenia dla przekazania toru ani sukcesji lidera (są one rejestrowane jako anulowana delegacja wraz z obserwacją).

Wydanie 7.8.0 (2026-10-13) ustanowiło Ecosystem 1.0: każdy produkt integrowany przez pakiet osiągnął pierwsze stabilne wydanie i jest przypięty do v1.0.0 zgodnie z wersjonowaniem semantycznym (coding-agents-kit, herdr-peers, devcontainer-kit i deepworkplan-vim, każdy ze zweryfikowanym skrótem `SHA256SUMS`), obok przypiętych wersji AI Diff Reviewer v3.3.14 i Dailybot agent-skill v3.23.17; następnie 7.8.1 (2026-10-14) przypięło wydania poprawek v1.0.1 dla coding-agents-kit i devcontainer-kit.

Zainstalowana wersja skilla: **7.9.0**, stabilna od 7.0.0.
