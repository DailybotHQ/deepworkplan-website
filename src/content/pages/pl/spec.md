---
title: "Specyfikacja Deep Work Plan"
description: "Czytelna specyfikacja metodyki Deep Work Plan: format DWP, protokół agenta, archetypy, standard dokumentacji oraz mechanizm dodatków."
lastUpdated: 2026-05-30
---

## Specyfikacja Deep Work Plan

Specyfikacja to precyzyjna, czytelna definicja metodyki — struktury i protokoły, które łączą ludzi i agentów. Określa, w normatywnych terminach RFC-2119, jak zbudowany jest plan oparty na specyfikacji i jak agent musi go wykonywać: plan jest źródłem prawdy, bramki walidacyjne są binarne, a samo repozytorium niesie harness, którego potrzebuje agent. Jest podzielona na uporządkowane dokumenty:

- **Standard dokumentacji** — struktura repozytorium AI-first.
- **Specyfikacja DWP** (w. 1.2) — struktura planu, anatomia zadania, pętla realizacji, sekcja Delta dla zmian zachowania w systemach istniejących, Protokół Wznowienia DWP, poziomy proporcjonalnej rygorystyczności (micro/standard/deep) i warstwa stanu planu odczytywalnego maszynowo.
- **Protokół agenta** (w. 1.2) — wymagane zachowanie między agentami, mapowanie komend, obsługiwani agenci (w tym OpenClaw i Hermes) oraz profile realizacji (interaktywny i nieobsługiwany) z warunkami zatrzymania i zaplanowaną kontynuacją.
- **Archetypy** (w. 1.1) — pojedyncze repozytoria, huby orkiestratorów i przestrzeń robocza agenta (długotrwały dom autonomicznego agenta: przestrzeń robocza OpenClaw, katalog usług Hermes, wolumen agenta chmurowego); heurystyka klasyfikacji i to, czym różni się onboarding.
- **Dodatki** — opcjonalny mechanizm nakładania dodatkowych możliwości, w tym sub-skill author (dzięki któremu repozytorium rozwija własny kit) dodatki utrzymaniowe, takie jak dependency-upgrade, oraz frontendowy dodatek design-system (plik `docs/DESIGN.md` wywiedziony z rzeczywistych tokenów projektowych repozytorium).
- **Zgodność** — normatywna definicja repozytorium AI-first: artefakty, które repozytorium MUSI i POWINNO mieć, co czyni plan dobrze sformułowanym i jak zweryfikować to obiektywnie za pomocą `/dwp-verify`.
- **Stan planu** — warstwa stanu odczytywalnego maszynowo: `manifest.json` i `state.json`, rekordy bramek, rekordy wyników jako pamięć epizodyczna, uzgadnianie (Markdown wygrywa) i kiedy warstwa jest wymagana.

- [Przeczytaj specyfikację](/spec)
- [Przeczytaj metodykę](/methodology)
