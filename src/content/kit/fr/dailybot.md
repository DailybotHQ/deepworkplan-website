---
title: Dailybot
description: "Un addon facultatif qui connecte un dépôt AI-first à une équipe Dailybot : rapports de progression et de jalons au mieux dans l’exécution du plan, plus une couche facultative de hooks autonomes."
kind: addon
lang: fr
order: 2
---

# Addon Dailybot

Faire remonter la progression d’un Deep Work Plan vers une équipe Dailybot. Un addon facultatif pour les équipes utilisant déjà Dailybot.

## Ce qu’il ajoute

- Une installation optionnelle du skill d’agent Dailybot et/ou de la CLI Dailybot, via leurs propres flux de consentement.
- Un rapport de progression/jalons au mieux, câblé dans l’exécution du plan, de sorte que l’achèvement d’un plan remonte vers l’équipe.
- Une couche facultative de hooks déterministes (skill d’agent Dailybot 1.6.0+, CLI 1.12.0+) : des hooks de harness committés détectent le travail non rapporté à partir d’un registre local et le rappellent à l’agent en fin de tour, de sorte que le rapport reste autonome même dans les longues sessions sans supervision où les instructions du prompt s’estompent.

## Comportement

Cet addon **délègue** — il ne réinvente rien. Le skill d’agent Dailybot prend en charge l’installation, le consentement, l’authentification, les modèles de hooks et le style de rédaction ; cet addon se contente de proposer de l’installer, de câbler l’étape de rapport optionnelle et de proposer la configuration de hooks au niveau du dépôt. Le rapport est strictement au mieux et ne bloque jamais le travail si Dailybot est absent, non authentifié ou injoignable.

Les deux couches se composent sans double rapport : un rapport de cycle de vie réussi réinitialise le registre des hooks, si bien que les hooks restent silencieux après un rapport et n’agissent que comme filet de sécurité déterministe lorsqu’un événement du cycle de vie a été manqué. Les commandes de hooks ne lisent que l’état local et se terminent toujours avec un code zéro ; elles ne peuvent donc jamais bloquer le travail non plus.

## Notes

La méthodologie Deep Work Plan de base n’a **aucune** dépendance à Dailybot. Ne le proposez que lorsque le développeur ou l’équipe utilise déjà Dailybot ; ne l’installez jamais automatiquement pour tout le monde.
