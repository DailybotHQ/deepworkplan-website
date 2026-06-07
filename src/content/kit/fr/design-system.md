---
title: Système de conception
description: "Un addon facultatif, à périmètre frontend, qui dote un dépôt d’un DESIGN.md (sous docs/, indexé depuis AGENTS.md) afin que tout agent de code génère une UI cohérente avec le système de conception propre au dépôt."
kind: addon
lang: fr
order: 4
---

# Addon design-system

Dotez un dépôt frontend/UI d’un `DESIGN.md` — un fichier de système de conception en Markdown que tout agent de code lit pour générer une UI cohérente avec le système de conception **propre** au dépôt, au lieu des valeurs par défaut sans style et statistiquement courantes vers lesquelles un agent se rabat en l’absence de tout repère. Le quatrième addon facultatif de Deep Work Plan.

## Ce qu’il ajoute

- Un `DESIGN.md` à `docs/DESIGN.md` (aux côtés des autres specs du dépôt ; à la racine du dépôt seulement lorsqu’il n’existe pas d’arborescence `docs/`), **référencé depuis `AGENTS.md`** afin que les agents le découvrent comme le reste de la documentation.
- Les sections canoniques : vue d’ensemble/atmosphère, palette de couleurs et rôles (clair + sombre), typographie, mise en page et espacements, élévation et profondeur, formes, composants, comportement responsive, à faire et à éviter (y compris les règles d’accessibilité du dépôt) et un guide de prompt pour les agents.
- Une étape de validation qui vérifie que le fichier est complet, que le contraste de texte documenté respecte WCAG AA et que les références aux tokens se résolvent.

## Comportement

- **Raisonner, pas copier.** Chaque valeur est dérivée de la véritable source de conception du dépôt — sa feuille de style, ses propriétés personnalisées CSS, sa configuration Tailwind, ses fichiers de tokens ou les styles de ses composants. Il ne colle jamais le `DESIGN.md` d’une marque tierce ; les catalogues de référence sont une inspiration pour la structure, jamais pour le contenu.
- **Réconcilier, pas écraser.** Un `DESIGN.md` ou une source de tokens existant est réconcilié de façon additive, jamais écrasé ; les changements destructeurs requièrent une approbation.
- **Découverte par référence.** Où que vive `DESIGN.md`, `AGENTS.md` (et `CLAUDE.md`) le référence — c’est le pointeur, et non l’emplacement physique, qui garantit que les agents le chargent.
- **Pragmatique, pas rigidement lié.** Il référence la convention émergente `DESIGN.md` comme une forme à suivre, mais reste Markdown-first et ne se lie à aucun schéma de tokens unique.

## À périmètre frontend, activé par défaut lorsqu’il est détecté

Cet addon est destiné aux dépôts dotés d’une véritable surface UI — une feuille de style avec des propriétés personnalisées CSS, une configuration Tailwind ou un bloc `@theme`, des composants UI, ou un guide de marque/de style. Il n’est **jamais** proposé pour un dépôt backend, CLI ou de bibliothèque uniquement. Lorsqu’une surface UI **est** détectée, l’onboarding le traite comme **activé par défaut** : il applique l’addon en mode confiance et le recommande fortement en mode guidé. Il n’est jamais requis — un dépôt sans aucun addon est pleinement conforme, et vous pouvez toujours le refuser.

## Commande optionnelle

Lorsqu’il est accepté, l’addon peut installer un délégateur `/design-system` dans le `.agents/commands/` du dépôt pour régénérer ou rafraîchir `DESIGN.md` plus tard. L’installation de la commande est optionnelle ; un addon refusé n’en installe aucune.

## Relation avec les documents de conception par fonctionnalité

Il s’agit d’un fichier de système de conception **au niveau du dépôt, persistant** — distinct d’un document de conception technique par fonctionnalité (le `design.md` « exigences → conception → tâches » des workflows spec-driven liés à un outil). Deep Work Plan ne fournit délibérément aucun archétype de document de conception par fonctionnalité séparé : le README d’un plan, les critères d’acceptation de chaque tâche et les portes de validation couvrent déjà ce rôle. Cet addon comble la seule lacune que ce rôle ne couvre pas : un contexte de conception d’UI durable et natif au dépôt.
