---
title: "Specyfikacja Deep Work Plan"
description: "Czytelna specyfikacja metodyki Deep Work Plan: format DWP, protokół agenta, archetypy, standard dokumentacji oraz mechanizm dodatków."
lastUpdated: 2026-05-30
---

## Specyfikacja Deep Work Plan

Specyfikacja to precyzyjna, czytelna definicja metodyki — struktury i protokoły, które łączą ludzi i agentów. Określa, w normatywnych terminach RFC-2119, jak zbudowany jest plan oparty na specyfikacji i jak agent musi go wykonywać: plan jest źródłem prawdy, bramki walidacyjne są binarne, a samo repozytorium niesie harness, którego potrzebuje agent. Jest podzielona na uporządkowane dokumenty:

- **Standard dokumentacji** — struktura repozytorium AI-first.
- **Specyfikacja DWP** — struktura planu, anatomia zadania i pętla wykonania.
- **Protokół agenta** — wymagane zachowanie między agentami i mapowanie komend.
- **Archetypy** — pojedyncze repozytoria a centra orkiestracji.
- **Dodatki** — opcjonalny mechanizm nakładania dodatkowych możliwości, w tym sub-skill author (dzięki któremu repozytorium rozwija własny kit) dodatki utrzymaniowe, takie jak dependency-upgrade, oraz frontendowy dodatek design-system (plik `docs/DESIGN.md` wywiedziony z rzeczywistych tokenów projektowych repozytorium).
- **Zgodność** — normatywna definicja repozytorium AI-first: artefakty, które repozytorium MUSI i POWINNO mieć, co czyni plan dobrze sformułowanym i jak zweryfikować to obiektywnie za pomocą `/dwp-verify`.

- [Przeczytaj specyfikację](/spec)
- [Przeczytaj metodykę](/methodology)
