---
title: "Démarrage rapide — Deep Work Plan"
description: "Installez le skill, intégrez votre dépôt, puis planifiez et exécutez avec n’importe quel agent — les étapes qui rendent votre dépôt piloté par la spécification et pilotable par agent."
lastUpdated: 2026-05-31
---

## Démarrage rapide

Installez le skill, intégrez votre dépôt, puis planifiez et exécutez avec n’importe quel agent — les étapes qui rendent
votre dépôt piloté par la spécification et pilotable par agent.

## Le parcours d’adoption

### 1. Installer le skill Deep Work Plan

Ajoutez le skill à votre dépôt. Il fournit un routeur accompagné de huit sous-skills — create, execute, refine,
resume, status, verify, onboard et author. Utilisez la CLI Skills pour la voie la plus rapide :

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Ou clonez le dépôt et lancez setup là où git et un shell sont disponibles :

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### 2. Intégrer le dépôt

Lancez le sous-skill onboard et laissez l’agent raisonner sur votre dépôt réel — sa stack, son gestionnaire
de paquets et ses vraies commandes de validation :

```bash
/deepworkplan-onboard
```

Il génère `AGENTS.md`, une base de connaissances `docs/`, une doc par module et un foyer `.agents/` partagé entre agents
(avec le lien symbolique `.claude → .agents`), branche les commandes `dwp-*` légères et échafaude un `.dwp/`
ignoré par git pour les plans et les ébauches. Rien n’est issu d’un modèle ; tout est adapté à votre dépôt.

### 3. Faire évoluer le kit et accepter des addons

Utilisez `/skill-create` et `/agent-create` (le sous-skill author) pour faire grandir des skills, agents et
commandes adaptés à votre stack. L’onboarding propose aussi trois addons facultatifs — devcontainer, Dailybot et
dependency-upgrade — que vous acceptez seulement lorsqu’ils conviennent. Un dépôt est pleinement conforme avec zéro addon.

### 4. Planifier et exécuter

Générez un Deep Work Plan et exécutez-le tâche par tâche :

```bash
/dwp-create <goal>
/dwp-execute
```

Utilisez `/dwp-status`, `/dwp-refine` et `/dwp-resume` au fil du travail. Chaque plan porte des tâches numérotées,
des portes de validation et un protocole d’achèvement, de sorte que le travail reste structuré et reprenable d’une session à l’autre.

## Le résultat

Votre dépôt devient piloté par la spécification et pilotable par agent : le plan est la source de vérité durable, et
le dépôt lui-même devient le harness face auquel tout agent s’exécute.

- [Lire la méthodologie](/methodology)
- [Parcourir la spécification](/spec)
- [Explorer le kit](/kit)
