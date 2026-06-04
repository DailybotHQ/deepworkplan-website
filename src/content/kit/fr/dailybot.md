---
title: Dailybot
description: "Un addon facultatif qui connecte un dépôt AI-first à une équipe Dailybot, en câblant un rapport de progression et de jalons au mieux dans l’exécution du plan."
kind: addon
lang: fr
order: 2
---

# Addon Dailybot

Faire remonter la progression d’un Deep Work Plan vers une équipe Dailybot. Un addon facultatif pour les équipes utilisant déjà Dailybot.

## Ce qu’il ajoute

- Une installation optionnelle du skill d’agent Dailybot et/ou de la CLI Dailybot, via leurs propres flux de consentement.
- Un rapport de progression/jalons au mieux, câblé dans l’exécution du plan, de sorte que l’achèvement d’un plan remonte vers l’équipe.

## Comportement

Cet addon **délègue** — il ne réinvente rien. Le skill d’agent Dailybot prend en charge l’installation, le consentement, l’authentification et le style de rédaction ; cet addon se contente de proposer de l’installer et de câbler l’étape de rapport optionnelle. Le rapport est strictement au mieux et ne bloque jamais le travail si Dailybot est absent, non authentifié ou injoignable.

## Notes

La méthodologie Deep Work Plan de base n’a **aucune** dépendance à Dailybot. Ne le proposez que lorsque le développeur ou l’équipe utilise déjà Dailybot ; ne l’installez jamais automatiquement pour tout le monde.
