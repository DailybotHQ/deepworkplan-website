---
title: Agents cloud
description: "L'adaptateur DWP pour les agents cloud et en arrière-plan : tâches distantes Claude Code, Codex cloud, agents de classe Jules — sessions éphémères s'exécutant."
kind: adapter
lang: fr
order: 12
agent: Cloud agents
support: full
prefix: plain text
---

# Adaptateur agents cloud

Les agents cloud et en arrière-plan — tâches distantes Claude Code, OpenAI Codex cloud, agents de classe Jules, et environnements d'exécution asynchrones similaires — sont éphémères par conception : une session démarre, s'exécute pendant un temps borné, puis se termine. DWP transforme cette contrainte en atout en faisant du plan l'artefact durable, non la session.

## L'intuition centrale

Le répertoire `.dwp/` du dépôt est la **couche de spec et d'état durable**. Les sessions cloud sont des **exécuteurs éphémères**. Le plan indique à l'exécuteur quoi faire ; `state.json` lui indique où reprendre. La session peut être n'importe quoi — un modèle différent, un fournisseur différent, un nouveau conteneur — et le plan continue exactement là où il s'était arrêté.

## Niveau de support

**Complet** (Documenté) — les plates-formes d’agents cloud lisent `AGENTS.md` ou des instructions natives et exécutent des commandes via leur environnement de terminal ou de conteneur.

## La boucle réveil-reprise-yield

Chaque tour d'agent cloud suit ce schéma :

1. **Réveil** — la session démarre (déclenchée par un calendrier cron, un événement CI ou une action utilisateur).
2. **Exécuter le Protocole de reprise DWP** — lire le README du plan, localiser le point de reprise, reconstruire l'état à partir de `journal.ndjson` via `ledger.py project`, inspecter la jonction, exécuter un smoke test. Voir [Spécification DWP](/spec/dwp-specification#the-dwp-resume-protocol).
3. **Vérifier l'état bloqué** — si `state.json.blocked` est renseigné, signaler la raison et céder la main sans exécuter.
4. **Exécuter la prochaine tâche atomique** — une tâche, en passant sa porte de validation complète.
5. **Enregistrer dans le journal** — ajouter des événements à `journal.ndjson` via les verbes de `ledger.py` (`start`, `gate`, `complete`) ; `ledger.py project` met à jour la projection d'instantané de `state.json` de façon atomique. Dans les anciens plans v5, la mise à jour directe du fichier d'état est préservée.
6. **Yield** — la session se termine proprement ; le tour suivant reprend depuis l'état mis à jour.

## Prérequis

- Le plan MUST porter la couche d'état lisible par machine (`manifest.json` + `state.json`). Sans elle, une session éphémère n'a aucun moyen fiable de déterminer la position de reprise. Voir [État du plan](/spec/plan-state).
- Le plan MUST avoir été approuvé par un humain avant tout tour cloud sans surveillance. L'approbation du plan est le point de contrôle.
- L'agent opère sous une autorité bornée : il MUST NOT étendre le périmètre, effectuer des actions destructrices que le plan n'autorise pas explicitement, ni improviser au-delà des instructions de la tâche en cours. Voir [Protocole de l'agent](/spec/agent-protocol#execution-profiles).

## Notes

Les sessions d'agents cloud sont le cas extrême du profil d'exécution sans surveillance : continuité de session nulle, durabilité du plan maximale. Le répertoire `.dwp/` de DWP est spécifiquement conçu pour que cela fonctionne — tout l'état dont un agent a besoin pour commencer, continuer et terminer un ensemble de travail réside dans des fichiers markdown et JSON simples que toute session peut lire depuis un checkout frais.
