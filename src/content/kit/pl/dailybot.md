---
title: Dailybot
description: "Opcjonalny addon, który łączy repozytorium AI-first z zespołem Dailybot: raporty postępu i kamieni milowych typu best-effort w wykonaniu planu, plus opcjonalna autonomiczna warstwa hooków."
kind: addon
lang: pl
order: 2
---

# Addon Dailybot

Uwidocznij postęp Deep Work Plan zespołowi Dailybot. Opcjonalny addon dla zespołów, które już korzystają z Dailybot.

## Co dodaje

- Opcjonalną instalację skilla agenta Dailybot (obecnie 1.7.x, który dodaje też czat zespołowy w Slack, Microsoft Teams, Discord i Google Chat) i/lub Dailybot CLI, przez ich własne przepływy zgody.
- Raport postępu/kamieni milowych typu best-effort wpięty w wykonanie planu, dzięki czemu ukończenie planu staje się widoczne dla zespołu.
- Opcjonalna deterministyczna warstwa hooków (skill agenta Dailybot 1.6.0+, CLI 1.12.0+): commitowane hooki harnessa wykrywają niezaraportowaną pracę na podstawie lokalnego rejestru i przypominają agentowi na końcu tury, dzięki czemu raportowanie pozostaje autonomiczne nawet w długich sesjach bez nadzoru, w których instrukcje promptu blakną.

## Zachowanie

Ten addon **deleguje** — nie wymyśla na nowo. Skill agenta Dailybot odpowiada za instalację, zgodę, uwierzytelnianie, szablony hooków i styl pisania; ten addon jedynie proponuje jego instalację, wpina opcjonalny krok raportowania i proponuje konfigurację hooków na poziomie repozytorium. Raport jest ściśle best-effort i nigdy nie blokuje pracy, gdy Dailybot jest nieobecny, niezalogowany lub nieosiągalny.

Obie warstwy współgrają bez podwójnych raportów: udany raport cyklu życia resetuje rejestr hooków, więc po raporcie hooki milczą i działają wyłącznie jako deterministyczne zabezpieczenie, gdy jakieś zdarzenie cyklu życia zostało pominięte. Polecenia hooków czytają tylko stan lokalny i zawsze kończą się kodem zero, więc one również nigdy nie mogą zablokować pracy.

## Uwagi

Podstawowa metodyka Deep Work Plan ma **zero** zależności od Dailybot. Proponuj go tylko wtedy, gdy programista lub zespół już korzysta z Dailybot; nigdy nie instaluj go automatycznie dla wszystkich.
