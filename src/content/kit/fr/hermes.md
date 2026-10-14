---
title: Hermes
description: "L’adaptateur DWP pour Hermes : skills via le standard AgentSkills, mémoire épisodique issue des résultats du plan et reprise des plans pilotée par cron."
kind: adapter
lang: fr
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Adaptateur Hermes

Hermes est une plateforme d'agents autonomes qui charge les skills via le standard AgentSkills et maintient une mémoire épisodique entre les sessions. DWP s'intègre aux deux surfaces : le skill pack se charge depuis `.agents/skills/` de la même façon que tout autre pack compatible AgentSkills, et les enregistrements de résultats de `state.json` alimentent directement l'index mémoire de Hermes.

Dans les plans v6 et v7, l'état est projeté depuis le journal en ajout seul (`journal.ndjson`) via `ledger.py project` plutôt que de réécrire manuellement les fichiers d'état.

## Niveau de support

**Complet** (Documenté) — Hermes lit `AGENTS.md` et charge la compétence via le chargement standard AgentSkills. Tous les sous-skills DWP sont disponibles.

## Installation

Installer le skill pack dans le répertoire `.agents/skills/` de l'espace de travail, ou utiliser le gestionnaire de skills de la plateforme s'il est disponible.

## Invocation

Texte simple :

```
create a plan for <goal>
resume the open plan
```

## Synergie de mémoire épisodique

Dans les plans v6 et v7, les reçus de vérification déterministes de DWP (`outcomes.py receipt`) et les enregistrements de résultats alimentent directement l'index de mémoire d'Hermes : chaque tâche achevée contient ce qui a été tenté, a échoué et a fonctionné dans un schéma JSON structuré. Les plans terminés deviennent une mémoire épisodique récupérable — un agent peut se rappeler comment un problème a été résolu.

Les sessions éphémères ajoutent des événements à `journal.ndjson` et projettent `state.json` via `ledger.py project` plutôt que de réécrire manuellement les fichiers d'état. Voir [État du plan](/spec/plan-state#outcome-records-as-episodic-memory).

## Continuation pilotée par cron

Sur les plateformes avec une planification cron, la continuation suit le même schéma que les autres plateformes autonomes : chaque tour planifié se réveille, exécute le Protocole de reprise DWP, exécute au plus une tâche, met à jour `state.json`, et cède la main. Le plan, et non la session, est l'unité de continuité.

La couche d'état lisible par machine (`manifest.json` + `state.json`) est REQUIRED pour l'exécution sans surveillance. Voir [Protocole de l'agent](/spec/agent-protocol#execution-profiles) pour le protocole complet de condition d'arrêt et d'escalade.

## Notes

Hermes et OpenClaw sont tous deux des plateformes d'agents autonomes dans le tableau des agents supportés du [Protocole de l'agent](/spec/agent-protocol). Tous deux opèrent sous le profil d'exécution sans surveillance et bénéficient tous deux de l'équivalence `state.json`-comme-journal-git de l'archétype espace de travail d'agent.
