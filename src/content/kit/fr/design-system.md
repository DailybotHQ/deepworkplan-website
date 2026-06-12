---
title: Système de conception
description: "Un addon facultatif qui dote tout dépôt ayant une surface d’interface destinée aux utilisateurs d’un DESIGN.md (sous docs/, indexé depuis AGENTS.md) — couvrant les profils UI visuelle, sortie CLI et conversationnel dans un seul fichier."
kind: addon
lang: fr
order: 4
---

# Addon design-system

Dotez un dépôt possédant une **surface d’interface destinée aux utilisateurs** d’un `DESIGN.md` — un fichier de système de conception en Markdown que tout agent de code lit pour générer une sortie d’interface cohérente avec les conventions **propres** au dépôt, au lieu des valeurs par défaut sans style et statistiquement courantes vers lesquelles un agent se rabat en l’absence de tout repère. Le quatrième addon facultatif de Deep Work Plan.

Une « surface d’interface » est plurielle : une **UI visuelle** rendue, une **sortie CLI** stylée et une surface **conversationnelle** (le produit parle par chat ou par e-mail) comptent chacune. L’addon détecte chacune indépendamment comme un **profil**, et les profils acceptés s’empilent dans le même et unique `DESIGN.md`.

## Ce qu’il ajoute

- Un `DESIGN.md` à `docs/DESIGN.md` (aux côtés des autres specs du dépôt ; à la racine du dépôt seulement lorsqu’il n’existe pas d’arborescence `docs/`), **référencé depuis `AGENTS.md`** afin que les agents le découvrent comme le reste de la documentation. Un dépôt, un fichier — jamais de fichiers frères par surface.
- **Profil `visual-ui`** — les sections visuelles canoniques : vue d’ensemble/atmosphère, palette de couleurs et rôles (clair + sombre), typographie, mise en page et espacements, élévation et profondeur, formes, composants, comportement responsive, à faire et à éviter (y compris les règles d’accessibilité du dépôt).
- **Profil `cli-output`** — les interfaces de terminal stylées : voix de la sortie, couleurs et styles sémantiques (succès/erreur/avertissement/info/atténué mappés sur le thème réel), composants de sortie (panneaux, tableaux, spinners, invites interactives — nommés d’après les véritables helpers du dépôt), conventions de mise en page et règles de dégradation (TTY contre pipe, `NO_COLOR`, discipline stdout/stderr, codes de sortie).
- **Profil `conversational`** — la surface de messagerie du produit : voix et registre (ton, brièveté, règles de nommage de la marque), anatomie du message (DM, publication de canal, réponse en fil, modification sur place) et rendu par plateforme (mrkdwn de Slack, markdown de Discord, cartes adaptatives de Teams, e-mail) avec des solutions de repli en texte brut.
- Un guide de prompt pour agents partagé, plus une étape de validation qui vérifie l’intégrité de chaque profil : le contraste de texte documenté respecte WCAG AA (visuel), la couleur n’est jamais le seul porteur de sens (CLI), les rendus riches notent des solutions de repli en texte brut (conversationnel) et les références aux tokens se résolvent.

## Comportement

- **Raisonner, pas copier.** Chaque valeur est dérivée de la véritable source de conception du dépôt — sa feuille de style, ses propriétés personnalisées CSS, sa configuration Tailwind, ses fichiers de tokens, les styles de ses composants, son module d’affichage/de thème CLI ou ses helpers de composition de messages. Il ne colle jamais le `DESIGN.md` d’une marque tierce et n’importe jamais en bloc les conventions d’un autre produit ; les catalogues de référence sont une inspiration pour la structure, jamais pour le contenu.
- **Réconcilier, pas écraser.** Un `DESIGN.md` ou une source de tokens existant est réconcilié de façon additive, jamais écrasé ; l’ajout d’un profil nouvellement accepté annexe ses sections sans réécrire le reste ; les changements destructeurs requièrent une approbation.
- **Découverte par référence.** Où que vive `DESIGN.md`, `AGENTS.md` (et `CLAUDE.md`) le référence — c’est le pointeur, et non l’emplacement physique, qui garantit que les agents le chargent.
- **Pragmatique, pas rigidement lié.** Il référence la convention émergente `DESIGN.md` comme une forme à suivre, l’étend aux surfaces non visuelles et reste Markdown-first sans se lier à aucun schéma de tokens unique.

## À périmètre d’interface, avec une force par profil

Cet addon est destiné aux dépôts possédant au moins une véritable surface d’interface ; il n’est jamais proposé pour un dépôt qui n’en a aucune (une bibliothèque pure, un service headless, un dépôt d’infrastructure uniquement). Chaque profil porte sa propre force de recommandation :

- **`visual-ui` est activé par défaut lorsqu’il est détecté** — une feuille de style avec des propriétés personnalisées CSS, une configuration Tailwind ou un bloc `@theme`, des composants UI, ou un guide de marque/de style. L’onboarding l’applique en mode confiance et le recommande fortement en mode guidé.
- **`cli-output` et `conversational` sont recommandés lorsqu’ils sont détectés — et toujours soumis à une question, jamais appliqués automatiquement**, même en mode confiance. Une bibliothèque de rendu CLI plus une couche d’affichage délibérée signale le premier ; un SDK de plateforme de chat ou une couche de composition de messages signale le second. Un simple analyseur d’arguments avec des prints bruts ne qualifie pas.

Il n’est jamais requis — un dépôt sans aucun addon est pleinement conforme, et vous pouvez toujours refuser n’importe quel profil ou l’addon entier. Un `DESIGN.md` créé avant l’existence des profils est un fichier visuel à profil unique valide : aucune migration.

## Commande optionnelle

Lorsqu’il est accepté, l’addon peut installer un délégateur `/design-system` dans le `.agents/commands/` du dépôt pour régénérer ou rafraîchir `DESIGN.md` plus tard. L’installation de la commande est optionnelle ; un addon refusé n’en installe aucune.

## Relation avec les documents de conception par fonctionnalité

Il s’agit d’un fichier de système de conception **au niveau du dépôt, persistant** — distinct d’un document de conception technique par fonctionnalité (le `design.md` « exigences → conception → tâches » des workflows spec-driven liés à un outil). Deep Work Plan ne fournit délibérément aucun archétype de document de conception par fonctionnalité séparé : le README d’un plan, les critères d’acceptation de chaque tâche et les portes de validation couvrent déjà ce rôle. Cet addon comble la seule lacune que ce rôle ne couvre pas : un contexte de conception d’interface durable et natif au dépôt.
