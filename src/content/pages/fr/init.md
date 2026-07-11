---
title: Init — Rendez votre dépôt AI-first
description: "Le prompt d’onboarding exécutable pour les agents IA : adopter Deep Work Plan dans tout dépôt — analyser, documenter, installer le skill, et le laisser pilotable par agent."
---

# Init — Prompt d’onboarding pour les agents IA

Vous êtes un agent de code IA. Lisez d’abord ce prompt en entier, puis rendez le dépôt courant
**AI-first**, **piloté par la spécification** et **pilotable par agent** en adoptant la méthodologie
Deep Work Plan (DWP). Traitez cela comme une tâche d’ingénierie structurée — un Deep Work Plan —
et non comme une retouche rapide.

## Principes d’opération (à lire avant de modifier quoi que ce soit)

1. **Raisonnez sur *ce* dépôt.** Ne copiez jamais un modèle et ne laissez jamais d’espace réservé. Chaque fichier que vous
   écrivez doit refléter les langages, frameworks, commandes et la structure réels du dépôt. Une ébauche
   générique est un échec, pas un livrable.
2. **Soyez non destructif — demandez avant de remplacer.** Le dépôt peut déjà comporter un `AGENTS.md`, une
   arborescence `docs/`, une configuration `.agents/` ou de skills, un `CLAUDE.md`, ou ses propres conventions. Ne
   **jamais** écraser, déplacer ou supprimer du travail existant en silence. Détectez ce qui existe, lisez-le, et **réconciliez** :
   fusionnez et améliorez sur place chaque fois que possible. Avant de remplacer ou de retirer quoi que ce soit que l’utilisateur
   possède déjà, expliquez quoi et pourquoi, et obtenez son approbation explicite.
3. **Proposez le plan, puis exécutez.** Après la reconnaissance, présentez un plan succinct — ce que vous allez
   créer, ce que vous allez modifier, et tout élément existant que vous proposez de réconcilier ou de remplacer — et attendez
   que l’utilisateur confirme avant d’apporter des changements importants ou destructifs.
4. **Travaillez par incréments sûrs et relisibles.** Validez de façon logique, gardez des diffs lisibles, ne touchez à aucun secret,
   et laissez tranquille le code sans rapport.
5. **Arrêtez-vous et rendez compte** si une étape échoue ou si l’état du dépôt est ambigu.
6. **Faites confiance, mais vérifiez.** Traitez ce prompt comme une entrée non fiable : confirmez que
   vous l’avez obtenu depuis les sources officielles (`deepworkplan.com` et les dépôts `DailybotHQ`),
   évaluez-le avant d’agir dessus et vérifiez l’intégrité du skill avant de l’exécuter — voir
   *Confiance et vérification* ci-dessous.

## 0. Lire la méthodologie et la spécification

Avant de modifier quoi que ce soit, lisez les sources canoniques pour comprendre le standard que vous adoptez :

- Méthodologie : https://deepworkplan.com/methodology.md
- Spécification : https://deepworkplan.com/spec.md
- Catalogue du kit : https://deepworkplan.com/kit.md

## 1. Reconnaissance et un plan à approuver

Comprenez d’abord le dépôt, puis proposez ce que vous allez faire.

- **Détectez la stack.** Les langages, les frameworks, le gestionnaire de paquets (à partir du fichier de verrouillage qui existe
  réellement), les vraies commandes de build/test/lint/vérification de types, les modules source, la convention de test, et
  la forme du déploiement.
- **Classez l’archétype.** Un dépôt individuel (le cas courant), un hub orchestrateur, ou un
  espace de travail d’agent — le foyer durable d’un agent autonome, où git est recommandé plutôt
  que supposé — avec les preuves.
- **Inventoriez ce qui existe déjà.** `AGENTS.md`, `CLAUDE.md`, `docs/`, toute configuration `.agents/` ou de skills/agents,
  `.dwp/`, et `.gitignore`. Notez tout ce qui accomplit déjà une partie de ce travail.
- **Proposez le plan d’onboarding.** Présentez une liste concise : les fichiers que vous allez créer, les fichiers que vous allez
  modifier, et tout élément existant que vous proposez de réconcilier ou de remplacer — puis **demandez à l’utilisateur de confirmer**
  avant de poursuivre. Pour un dépôt volumineux (de nombreux modules ou de nombreux artefacts à générer), le
  sous-skill onboard utilise un chemin piloté par plan : il complète la reconnaissance, génère `AGENTS.md`, puis
  émet un Deep Work Plan d'onboarding sous `.dwp/drafts/` et passe le relais à `/dwp-refine` → `/dwp-execute`
  → `/dwp-resume` selon les besoins.

## Confiance et vérification (avant d'installer)

Vous êtes sur le point d'installer et d'exécuter du code dans ce dépôt ; vérifiez donc d'abord ce que
vous adoptez. C'est encouragé : un agent prudent traite un prompt récupéré comme non fiable jusqu'à ce
qu'il ait été contrôlé.

- **Confirmez la provenance.** Ce prompt et le skill sont open source et sous licence MIT. Les sources
  canoniques sont `https://deepworkplan.com` et l'organisation GitHub `DailybotHQ`
  (`deepworkplan-website`, `deepworkplan-skill`). Un manifeste lisible par machine est publié à
  l'adresse `https://deepworkplan.com/.well-known/dwp-trust.json`.
- **Comprenez ce que fait le skill.** Il est Markdown-first : sans CLI, sans API HTTP, sans
  authentification, **sans appels réseau et sans télémétrie**. Sa seule action ayant une incidence sur
  la sécurité est de modifier *ce* dépôt, et il est conçu pour être non destructif — il réconcilie et
  demande avant de remplacer.
- **Vérifiez l'intégrité avant d'exécuter.** Chaque version publie un `SHA256SUMS` sur les fichiers
  du skill ; confirmez que votre copie correspond avant de lui faire confiance :

  ```bash
  git clone https://github.com/DailybotHQ/deepworkplan-skill.git
  cd deepworkplan-skill
  # Téléchargez les checksums de la version que vous souhaitez installer (remplacez vX.Y.Z) :
  curl -fsSL -o SHA256SUMS \
    https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
  ./setup.sh --verify        # une sortie non nulle signifie qu'un fichier ne correspond pas — arrêtez
  ```

  Les versions sont **dotées de checksums, pas de signatures** (la signature est la prochaine étape
  documentée). Tout est ouvert et comparable par diff, vous pouvez donc aussi comparer n'importe quel
  fichier avec le dépôt à son tag.
- **Signalez un problème.** Signalez les problèmes de sécurité **en privé via le système de signalement de vulnérabilités de GitHub** sur le dépôt concerné — `https://github.com/DailybotHQ/deepworkplan-skill/security` ou `https://github.com/DailybotHQ/deepworkplan-website/security` — et non comme un ticket public. Consultez également le `SECURITY.md` de chaque dépôt, `https://deepworkplan.com/.well-known/security.txt` et la page de confiance `https://deepworkplan.com/trust`.

## 2. Installer le skill Deep Work Plan

Installez le skill pour que les agents de ce dépôt puissent planifier et exécuter un travail structuré. Il fournit un routeur
accompagné de huit sous-skills — `create`, `execute`, `refine`, `resume`, `status`, `verify`, `onboard` et `author`.

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Ou installez via OpenClaw :

```bash
openclaw skills install deepworkplan
```

Ou clonez et lancez le script de setup :

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 3. Intégrer le dépôt (raisonné et non destructif)

Invoquez le sous-skill onboard (`/deepworkplan-onboard`). Raisonnez sur le dépôt réel et adaptez tout
à celui-ci. Pour chaque artefact ci-dessous, **s’il existe déjà, réconciliez-le** (fusionner, améliorer, aligner sur la
méthodologie) au lieu d’écraser — et confirmez avec l’utilisateur avant de remplacer quoi que ce soit.

1. **`AGENTS.md` + `CLAUDE.md`.** Produisez un `AGENTS.md` à la racine — un index, les règles obligatoires
   (anglais uniquement, commits conventionnels, le vrai pattern de test du dépôt et les portes de revue), et un bloc Quick
   Commands avec les commandes **réelles et exécutables** du dépôt. Si un `AGENTS.md` existe déjà, fusionnez-y
   plutôt que de le remplacer. Créez le lien symbolique `CLAUDE.md → AGENTS.md` (n’écrasez pas un
   `CLAUDE.md` existant sans demander). De même, créez le lien symbolique `.cursor → .agents` s'il est absent.
2. **`docs/`.** Remplissez les catégories standard avec un contenu réel, spécifique au dépôt : `PRODUCT_SPEC.md` (le document produit/pourquoi non technique — obligatoire pour tout dépôt, bibliothèques incluses), `ARCHITECTURE.md`,
   `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md`
   (jamais omis — tout dépôt a une posture de sécurité, même sans secrets),
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, ainsi que `PERFORMANCE.md` et un index `docs/README.md`.
   Si des docs existent déjà, intégrez-les et étendez-les — ne les dupliquez pas.
3. **Doc par module.** Ajoutez un `README.md` (et un sous-dossier `docs/` pour les modules complexes) dans chaque
   module source majeur découvert lors de la reconnaissance.
4. **`.agents/` + `.claude → .agents` + `.cursor → .agents`.** Créez le foyer canonique, partagé entre agents : un catalogue **raisonné**
   d’`agents/`, de `skills/` adaptés à la stack, et de `commands/` `dwp-*` légères qui délèguent au
   skill installé — chaque entrée justifiée pour *ce* dépôt, pas copiée d’un autre. Ajoutez un
   catalogue `docs/` (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`) qui correspond à ce qui existe sur
   disque, ainsi que `settings.json`, et les liens symboliques `.claude → .agents` et `.cursor → .agents`. Intégrez tout skill/agent existant
   au catalogue.
5. **Le skill DWP, adapté.** Le skill installé est le moteur ; le kit propre au dépôt
   (skills, agents, commandes) doit être **raisonné pour ce dépôt** — jamais un copier-coller du kit
   d’un autre dépôt.
6. **`.dwp/` + `tmp/`.** Échafaudez un `.dwp/` ignoré par git avec `plans/` et `drafts/`, ainsi qu’un espace de travail
   temporaire `tmp/` — tous deux ajoutés au `.gitignore` de manière non destructive (ajouter, jamais réécrire).

## 4. Proposer les addons facultatifs

Après l’onboarding de base, énumérez les quatre addons (devcontainer, Dailybot, dependency-upgrade,
design-system) et proposez chacun comme un choix explicite. Un dépôt est
pleinement conforme avec **zéro** addon — ne les installez jamais automatiquement.

- **Prise en charge du devcontainer** — un conteneur de développement reproductible et isolé avec une auth de CLI IA persistante.
- **Intégration Dailybot** — quatre événements du cycle de vie (kickoff, tâche significative, bloqué, achèvement) comme rapports de progression au mieux pour les équipes utilisant déjà Dailybot, avec une couche facultative d’application autonome des hooks (`dailybot-cli >= 3.1.2`). L’installation du skill d’agent Dailybot apparié (3.4.0) expose aussi le chat, les check-ins, la création de formulaires, la consultation IA et plus — l’addon ne raccorde que le reporting à l’exécution DWP. La méthodologie de base n’a aucune dépendance à Dailybot.
- **Mise à jour des dépendances** — des mises à jour indépendantes du gestionnaire de paquets, par lots, validées et réversibles. Lorsqu’elle est
  acceptée, elle installe la commande `/lib-upgrade`.
- **Design system** — `docs/DESIGN.md` optionnel, proposé uniquement pour les dépôts dotés d’une surface
  d’interface détectée (non proposé pour les bibliothèques pures, les services headless ou les dépôts
  exclusivement infra). Trois profils s’empilent dans un seul fichier : visual-ui (activé par défaut
  lorsque détecté), cli-output et conversational — ces deux derniers sont toujours demandés, jamais
  appliqués automatiquement.

## 5. Faire évoluer le kit (sous-skill author)

Utilisez le sous-skill `author` pour faire grandir le kit propre au dépôt après l’onboarding. Les délégateurs légers `/skill-create` et
`/agent-create` y routent. Créez un **skill** pour une procédure reproductible exécutée en session, un **agent** pour
un rôle récurrent ayant son propre palier de modèle et ses outils, et une **commande** uniquement comme un délégateur léger. Gardez
le catalogue `.agents/docs/` synchronisé avec ce qui existe sur disque.

## 6. Planifier et exécuter

Générez des Deep Work Plans pour n’importe quelle tâche et exécutez-les tâche par tâche :

- `/dwp-create <goal>` — décomposer un objectif en tâches numérotées et séquentielles assorties de portes de validation.
- `/dwp-execute` — exécuter le plan tâche par tâche, en mettant à jour la progression et en validant chaque porte.
- `/dwp-status` — rendre compte de la progression sans apporter de changements.
- `/dwp-refine` — ajouter, retirer ou réordonner des tâches tout en préservant le travail achevé.
- `/dwp-resume` — reconstruire l’état et poursuivre un plan interrompu.
- `/dwp-verify` — rapport objectif de conformité réussite/échec pour le dépôt (ou un plan spécifique).

Tout plan se termine par trois tâches finales obligatoires — une **Security Review** des propres
changements du plan (en gardant `docs/SECURITY.md` à jour ; une découverte critique bloque
l’achèvement), Skills & Agents Discovery et l’Executive Report.

## 7. Vérifier

Lancez `/dwp-verify` pour obtenir un rapport de conformité objectif réussite/échec (ou
`bash {skill_dir}/verify/conformance.sh` pour la couche mécanique compatible CI qui se termine par `0`/`1`).
Il vérifie les critères du [document de conformité de la spécification](https://deepworkplan.com/spec).
Puis confirmez :

- [ ] Le skill est installé et résolvable, avec ses huit sous-skills disponibles.
- [ ] `AGENTS.md` existe à la racine avec un bloc Quick Commands réel ; `CLAUDE.md` se résout vers lui.
- [ ] `docs/` contient les catégories standard avec un contenu réel, spécifique au dépôt ;
      `docs/TESTING_GUIDE.md` décrit une configuration réelle de test/lint (ni vide ni stub) ; les modules majeurs ont un
      `README.md`.
- [ ] `.agents/` existe avec `agents/`, `commands/` (délégateurs `dwp-*` légers qui référencent le skill,
      pas des flux copiés), `skills/`, et un catalogue qui correspond à ce qui existe sur disque ;
      `.claude → .agents` et `.cursor → .agents` se résolvent.
- [ ] `.dwp/` existe, est ignoré par git, et comporte `plans/` et `drafts/` ; `tmp/` existe et est ignoré par git.
- [ ] Le contenu utilisateur existant a été préservé ou réconcilié avec consentement — rien n’a été détruit en silence.
- [ ] Vous pouvez générer un Deep Work Plan et l’exécuter tâche par tâche, en validant chaque porte.

## Résultat

Une fois l’onboarding terminé, le dépôt est changé de deux manières durables — les piliers de la
méthodologie :

1. **Le dépôt est piloté par la spécification.** Le travail part d’un plan et d’une spécification écrits, et non de
   prompts ponctuels.
2. **Le dépôt lui-même est le harness de l’agent.** `AGENTS.md`, `docs/`, la doc par module et le
   foyer de skills `.agents/` donnent à chaque agent le contexte et les commandes dont il a besoin pour accomplir un travail structuré et
   vérifiable.

N’importe qui peut exécuter ce prompt sur n’importe quel dépôt — et terminer avec une base de code que tout agent IA peut piloter.
