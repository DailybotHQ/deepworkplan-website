---
title: Cursor
description: "Adapter DWP dla Cursor AI z pełnym wsparciem przez system reguł projektu i prefiks komend hash, ponieważ Cursor sam rezerwuje znak slash."
kind: adapter
lang: pl
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Adapter Cursor

Cursor obsługuje DWP poprzez reguły projektu i pliki komend.

## Poziom wsparcia

**Pełne** (Przetestowane instalacyjnie) — polecenia DWP działają za pośrednictwem systemu reguł Cursor. Trasy katalogów zweryfikowane przez automatyczne zestawy testów; przepływy behawioralne wykonują się sekwencyjnie.

## Instalacja

Komendy DWP istnieją jako pliki markdown w projekcie. Cursor odczytuje je przez swój system reguł.

Opcjonalnie: [coding-agents-kit](/kit/agentkit) może zainstalować to CLI i uruchamiać je poleceniem `ak cursor`. Oficjalny instalator dostawcy działa równie dobrze.

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cursor
```

## Wywoływanie

Używaj prefiksu `#` (Cursor przechwytuje `/`):

```
#dwp-create <goal>
#dwp-execute
```

## Uwagi

Używaj `#`, ponieważ Cursor rezerwuje `/` dla własnych komend.
