---
title: Hermes
description: "L'adaptateur DWP pour Hermes : chargement de skills selon le standard AgentSkills, synergie de mémoire épisodique via les enregistrements de résultats dans state.json, et continuation de plan pilotée par cron."
kind: adapter
lang: fr
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Adaptateur Hermes

Hermes est une plateforme d'agents autonomes qui charge les skills via le standard AgentSkills et maintient une mémoire épisodique entre les sessions. DWP s'intègre aux deux surfaces : le skill pack se charge depuis `.agents/skills/` de la même façon que tout autre pack compatible AgentSkills, et les enregistrements de résultats de `state.json` alimentent directement l'index mémoire de Hermes.

## Niveau de support

**Complet** — Hermes lit `AGENTS.md` et charge le skill via le chargement standard AgentSkills. Tous les sous-skills DWP sont disponibles.

## Installation

Installer le skill pack dans le répertoire `.agents/skills/` de l'espace de travail, ou utiliser le gestionnaire de skills de la plateforme s'il est disponible.

## Invocation

Texte simple :

```
create a plan for <goal>
resume the open plan
```

## Synergie de mémoire épisodique

Hermes indexe la mémoire des agents pour rendre le travail passé récupérable entre les sessions futures. Les enregistrements de résultats `state.json` de DWP sont conçus précisément pour cet usage : chaque tâche terminée porte ce qui a été `tried`, ce qui a `failed`, ce qui a `worked`, et des notes libres dans un champ JSON structuré. Lorsque Hermes indexe les fichiers d'état `.dwp/plans/` de l'espace de travail, les plans terminés deviennent une mémoire épisodique récupérable — un agent peut ensuite se rappeler comment un problème spécifique a été résolu, et pas seulement qu'un plan a été exécuté.

Cela signifie que les plans DWP sur Hermes sont durables de deux façons : les fichiers markdown constituent l'enregistrement lisible par un humain, et les enregistrements de résultats `state.json` constituent la mémoire indexable par la machine. Voir [État du plan](/spec/plan-state#outcome-records-as-episodic-memory).

## Continuation pilotée par cron

Sur les plateformes avec une planification cron, la continuation suit le même schéma que les autres plateformes autonomes : chaque tour planifié se réveille, exécute le Protocole de reprise DWP, exécute au plus une tâche, met à jour `state.json`, et cède la main. Le plan, et non la session, est l'unité de continuité.

La couche d'état lisible par machine (`manifest.json` + `state.json`) est REQUIRED pour l'exécution sans surveillance. Voir [Protocole de l'agent](/spec/agent-protocol#execution-profiles) pour le protocole complet de condition d'arrêt et d'escalade.

## Notes

Hermes et OpenClaw sont tous deux des plateformes d'agents autonomes dans le tableau des agents supportés du [Protocole de l'agent](/spec/agent-protocol). Tous deux opèrent sous le profil d'exécution sans surveillance et bénéficient tous deux de l'équivalence `state.json`-comme-journal-git de l'archétype espace de travail d'agent.
