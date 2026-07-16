---
title: "Szybki start — Deep Work Plan"
description: "Zainstaluj skill, przeprowadź onboarding repozytorium, a potem planuj i wykonuj z dowolnym agentem — kroki czyniące repozytorium spec-driven i sterowalnym."
lastUpdated: 2026-05-31
---

## Szybki start

Zainstaluj skill, przeprowadź onboarding repozytorium, a potem planuj i wykonuj z dowolnym agentem — to kroki, które czynią
twoje repozytorium spec-driven i sterowalnym przez agenta.

## Ścieżka adopcji

### 1. Zainstaluj skill Deep Work Plan

Dodaj skill do swojego repozytorium. Dostarcza router oraz osiem sub-skilli — create, execute, refine,
resume, status, verify, onboard i author. Użyj Skills CLI, by uzyskać najszybszą ścieżkę:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Albo sklonuj repozytorium i uruchom konfigurację tam, gdzie dostępne są git i powłoka:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### 2. Przeprowadź onboarding repozytorium

Uruchom sub-skill onboard i pozwól agentowi przeanalizować twoje rzeczywiste repozytorium — jego stos, menedżer
pakietów i prawdziwe komendy walidacyjne:

```bash
/deepworkplan-onboard
```

Generuje `AGENTS.md`, bazę wiedzy `docs/`, dokumentację poszczególnych modułów oraz wspólny dla agentów dom `.agents/`
(z dowiązaniem `.claude → .agents`), podłącza cienkie komendy `dwp-*` i tworzy szkielet `.dwp/` w gitignore
na plany i szkice. Nic nie pochodzi z szablonu; wszystko jest dostosowane do twojego repozytorium.

### 3. Rozwijaj kit i akceptuj dodatki

Użyj `/skill-create` i `/agent-create` (sub-skill author), aby rozwijać skille, agentów i komendy odpowiednie dla
twojego stosu. Onboarding oferuje też pięć opcjonalnych dodatków — devcontainer, Dailybot,
dependency-upgrade, design-system i AI Diff Reviewer — które akceptujesz tylko wtedy, gdy pasują. Repozytorium jest w pełni zgodne przy zerowej liczbie dodatków.

### 4. Planuj i wykonuj

Wygeneruj Deep Work Plan i uruchom go zadanie po zadaniu:

```bash
/dwp-create <goal>
/dwp-execute
```

W miarę postępu pracy używaj `/dwp-status`, `/dwp-refine` i `/dwp-resume`. Każdy plan niesie ponumerowane zadania,
bramki walidacyjne i protokół ukończenia, dzięki czemu praca pozostaje ustrukturyzowana i wznawialna między sesjami.

## Rezultat

Twoje repozytorium staje się spec-driven i sterowalne przez agenta: plan jest trwałym źródłem prawdy, a
samo repozytorium staje się harnessem, względem którego działa dowolny agent.

- [Przeczytaj metodykę](/methodology)
- [Przeglądaj specyfikację](/spec)
- [Poznaj kit](/kit)
