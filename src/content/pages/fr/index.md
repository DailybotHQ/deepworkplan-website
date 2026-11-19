---
title: "Deep Work Plan — exécution structurée pour les agents de code IA"
description: "Spécification d’abord, boucle fermée : Deep Work Plan fait du dépôt le harness des agents IA, et chaque plan va au bout dans une boucle lancée par un humain."
lastUpdated: 2026-11-17
---

*Spécification d’abord · boucle fermée*

## Tout agent IA mène le travail à terme dans votre dépôt.

Votre dépôt contient le plan, le contexte et les vérifications : le travail survit aux redémarrages, passe d’un agent à l’autre et continue en boucle jusqu’à ce que chaque contrôle soit validé, dans les limites de l’autorité que vous accordez.

Deep Work Plan (DWP) est une méthodologie et un kit ouverts, sous licence MIT, pour planifier et exécuter un travail logiciel complexe avec des agents IA. Vous ne choisissez pas de méthode d’installation et ne copiez aucun modèle — vous copiez le prompt init.md et le collez dans votre agent :

> Copiez le prompt init.md et collez-le dans votre agent de code — Claude Code, Cursor, Codex ou tout autre — pour rendre n’importe quel dépôt AI-first.


- [Ouvrir le prompt /init](/fr/quickstart)
- [Lire la méthodologie](/methodology)

---

## Ce sur quoi repose la méthodologie.

1. **La spécification d’abord** — le plan est la source de vérité durable : tâches atomiques, critères d’acceptation et portes de validation que l’agent doit franchir.
2. **Le dépôt est le harness** — le contexte, les outils, les garde-fous et l’état vivent dans le dépôt sous forme de fichiers texte que tout agent peut lire.

3. **Loop engineering** — Les plans vont jusqu’à leur terme : enregistrement, un démon lancé par un humain, des relances qui n’ajoutent aucune autorité, la relève et des événements de plan.
4. **Efficacité mesurée** — octets d’instructions par flux, mesurés et publiés avec leur méthode — jamais de pourcentages de tokens inventés.

---

## Le problème et la réponse

En courtes salves, les agents de codage sont remarquables. Confiez-leur une mission de long terme — une migration, un nouveau sous-système, une refactorisation de dizaines de fichiers — ils dérivent : le contexte se remplit, les décisions s’effacent et des heures de travail restent inachevées.



Le contexte est la ressource la plus rare de votre agent. Le harness garde donc ses propres instructions légères et vérifiables. Elles se chargent progressivement, la validation se concentre sur les changements et chaque tâche reçoit le contexte utile. Nous publions en octets le volume d’instructions de chaque flux pour rendre cette charge visible. Les plans s’adaptent eux aussi au travail : Lite pour une correction circonscrite, Full pour une tâche qui s’étend sur plusieurs heures. Le format suit l’ampleur du travail et maintient un processus ciblé et traçable.

---

## Les humains dirigent. Les agents exécutent.

Vous décidez de ce que « terminé » signifie et des limites à ne pas franchir. Le plan porte votre intention ; les agents font les heures — sans surveillance permanente, sans correction toutes les vingt minutes.

- Vous : intention, critères d’acceptation, revue
- Agents : exécution, tâche par tâche
- Le plan : le contrat entre les deux

[Lire la méthodologie](/fr/methodology)

---

## Un plan dont les agents ne peuvent pas dévier.

Les longues tâches remplissent le contexte de n’importe quel modèle. Les détails s’effacent et l’agent dérive. Un plan écrit — tâches atomiques, portes de validation, état reprenable — est le repère vers lequel il revient, tour après tour.

1. Plan
2. Tâches atomiques
3. Portes de validation
4. Achèvement
5. État reprenable

[Voir la boucle principale](/fr/methodology)

---

## Terminé est un contrat, pas une impression.

Chaque tâche nomme ses critères d’acceptation et les vérifications qui doivent passer. L’agent ne peut pas se sentir fini — il doit passer, sinon la tâche reste ouverte.

- Les tests passent
- Les types sont vérifiés
- Les critères d’acceptation sont remplis
- Ou la tâche reste ouverte

[Lire la spécification](/fr/spec)

---

## Le dépôt est le harness.

Contexte, outils, garde-fous et état vivent dans votre dépôt sous forme de fichiers simples que n’importe quel agent peut lire. Pas d’enfermement, pas de cerveau externe — tout survit aux réinitialisations de contexte.

- Spécification durable sur disque
- Portes de validation, pas d’intuition
- Survit aux réinitialisations de contexte

**SPEC · TASKS · CHECKS · STATE · TOOLS**

[Voir ce que l’onboarding génère](/fr/quickstart)

---

## Les plans vont jusqu’au bout. L’autorité reste aux humains.

Loop engineering permet à un plan d’aller jusqu’au bout sans qu’un humain le surveille. Les lignes ci-dessous décrivent les contrats publiés de la boucle : la plupart proviennent de herdr-peers, tandis que la file de plans est un contrat du pack. Herdr est facultatif ; la méthodologie fonctionne sans lui.

> La spécification dit quoi ; le harness dit où ; le loop engineering dit comment cela se termine.

**La boucle :** Enregistrement (`lead claim`, lead et succession) → Démon (`autopilot --loop`, lancé par un humain) → Relance (`idle ≥ 5 min`, n’ajoute aucune autorité) → Relève (`lead takeover`, premier successeur joignable) → Notification (`plan-event-v1`, vers la commande de l’humain) → Terminé (`plan_completed`, portes franchies). Chaque plan ouvert doté d’un enregistrement de lead, jusqu’à ce que son propre état indique qu’il est terminé.



| Contrat | Ce qu’il garantit | Source (herdr-peers v2.2.1) |
| --- | --- | --- |
| Enregistrement du plan (`herdr-peers lead claim`) | Un plan que la boucle surveille possède un enregistrement de lead avec une époque et une succession. Seul le détenteur de l’époque la plus élevée agit comme son lead. | `skills/herdr-peers/protocol.md` §12 |
| Démarrage humain uniquement (`herdr-peers autopilot start --loop`) | Seul un humain démarre le démon, avec ses propres mots. Aucune demande, réponse ou notification ne peut le démarrer, l’arrêter ou modifier ce qu’il fait. | `skills/herdr-peers/autopilot.md` §1 |
| Les relances n’ajoutent aucune autorité (`plan_stalled`) | Le lead inactif d’un plan ouvert reçoit un seul prompt fixe pour continuer. Les portes, les conditions d’arrêt et les escalades s’appliquent comme avant ; trois prompts sans progrès marquent le plan comme enlisé. | `skills/herdr-peers/autopilot.md` §5.2–5.3 |
| Relève par les successeurs (`herdr-peers lead takeover`) | Quand le lead a disparu, le premier successeur joignable est invité à prendre la relève, et le helper vérifie de nouveau les preuves. Une voie ne prend le lead qu’en vertu d’une autorisation que l’humain a enregistrée à l’avance. | `skills/herdr-peers/autopilot.md` §5.2, §7 |
| Événements de plan (`plan-event-v1`) | Quand un plan s’enlise, se bloque, perd son lead, démarre depuis la file ou se termine, une commande choisie par l’humain reçoit un objet plan-event-v1. Le pack fournit un notificateur Dailybot pour cela. | `docs/schema/plan-event-v1.json` |
| Carte de la flotte (`plans-v1` · `fleet-v1`) | Chaque machine déclare ses plans en plans-v1 ; le démon tient la carte fleet-v1 de chaque machine, agent, dépôt et plan, et fleet ui l’affiche en lecture seule. | `docs/schema/fleet-v1.json` |
| File de plans (`dwp-queue-v1`) | Le pack valide et écrit la file ; le démon la lit pour poursuivre les plans en attente. | `skills/deepworkplan/shared/queue.py` |
| Vérification du lead (`herdr-peers lead verify`) | Avant tout merge, tag ou release, le lead confirme qu’il détient toujours le plan sur chaque machine. Un lead plus récent le refuse ; une machine injoignable l’arrête, sauf si ce risque est accepté et consigné. | `skills/herdr-peers/protocol.md` §12 |

Le cerveau de décision (`--brain`) et la désignation du lead (`--appoint`) sont des options facultatives du même démon, chacune activée par un humain. Le démon ne fusionne jamais, ne publie jamais de release, ne se connecte jamais et ne modifie jamais une permission.

[Lire l’addon Herdr](/fr/kit/herdr)

---

## Octets d’instructions par flux, mesurés.

Le harness publie ce que chaque flux doit lire avant de démarrer : le routeur, le sous-skill et les ressources partagées qu’il référence. Ce sont les ensembles de lecture obligatoire du pack publié.

| Flux | Paquet d’entrée (octets) |
| --- | ---: |
| `create` | 74 974|
| `execute` | 55 136|
| `resume` | 32 023|
| `refine` | 77 014|
| `onboard` | 82 051|
| `status` | 27 311|
| `verify` | 36 701|

Unité : octets du système de fichiers. Mesuré sur le pack publié avec la commande ci-dessous : `bash tests/efficiency/measure-instruction-load.sh` (deepworkplan-skill v8.0.6).

Les tokens du fournisseur, le coût et les statistiques de fermeture de boucle ne sont pas affichés : aucune source étiquetée ne les mesure encore, ils n’ont donc pas de ligne. Le chiffre de tokens du script, octets ÷ 4, est une estimation signalée comme telle, jamais une mesure.

[Lire le registre d’évaluation](https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.6/docs/EVALUATION.md)

---

## Ce que vous obtenez

- AGENTS.md à la racine du dépôt, raisonné à partir de votre stack et de vos commandes réelles.
- Un `docs/` catégorisé et une documentation par module.
- Un répertoire `.agents/` (skills, agents, commandes) avec le lien symbolique `.claude` vers `.agents`.
- Le skill Deep Work Plan, installé une fois pour chaque agent — y compris le sous-skill author, pour que le dépôt puisse faire grandir ses propres skills, agents et commandes, ainsi que des add-ons facultatifs comme dependency-upgrade et l’add-on design-system pour toute surface d’interface destinée aux utilisateurs.
- Des plans de longue haleine et reprenables dans un dossier `.dwp/` ignoré par git. La méthodologie elle-même ne requiert aucun démon ni état externe ; le démon facultatif de la boucle apporte de la continuité, jamais une dépendance.
- Délégation multi-agents et Écosystème 1.0 — coordonnez des agents parallèles en toute sécurité via des worktrees isolés, des preuves observées et des extensions épinglées.

---

## Ce qui se passe quand vous le lancez

1. **Votre agent ouvre [/init.md](/init.md)** — il lit le prompt d’onboarding ainsi que la méthodologie, la spécification et le kit qu’il référence.
2. **Il installe le skill Deep Work Plan** — le moteur, identique dans chaque dépôt : le routeur et ses sous-skills (create, execute, refine, resume, status, verify, onboard, author, upgrade), pour Claude Code, Cursor, Codex, Gemini et Copilot.
3. **Il adapte votre dépôt** — en raisonnant sur votre stack réelle (jamais en copiant-collant), il écrit AGENTS.md, `docs/`, des README par module, un kit `.agents/` raisonné et un `.dwp/` ignoré par git. Votre dépôt devient le harness.
4. **Vous planifiez et exécutez** — des Deep Work Plans de longue haleine, exécutés étape par étape face à des critères d’acceptation explicites et des portes de validation, de manière autonome pendant des heures.
5. **Un humain lance la boucle** — facultatif, avec l’addon Herdr : vous — jamais un agent — exécutez `herdr-peers autopilot start --loop`. Chaque plan ouvert doté d’un enregistrement de lead continue jusqu’à son terme, et votre notificateur est prévenu quand l’un d’eux s’enlise, se bloque ou se termine.

Le skill est le moteur réutilisable, installé de la même manière partout ; ce qui est adapté, c’est votre dépôt. Les mécanismes d’installation (CLI Skills, OpenClaw ou git clone) résident dans le prompt [/init.md](/init.md) et sur le [démarrage rapide](/quickstart).

---

## La méthodologie, la spécification et le kit

- [Lire la méthodologie](/methodology) — ce qu’est DWP, les principes, le workflow et comment l’adopter.
- [Lire la spécification](/spec) — l’anatomie d’une tâche, les portes de validation, le protocole d’achèvement, les archétypes et les addons.
- [Explorer le kit](/kit) — presets, adaptateurs et commandes pour installer DWP dans un dépôt.
- [Voir les exemples](/examples) — des démonstrations avant/après de vrai travail d’ingénierie.

---

## Qui le construit

Deep Work Plan est né d’un véritable travail d’ingénierie chez [Dailybot](https://www.dailybot.com) et est maintenu par Dailybot avec la communauté open source.

- [À propos de la méthodologie](/about)
- [Communauté et contact](/contact)
- [Dépôt GitHub](https://github.com/DailybotHQ/deepworkplan-website)
