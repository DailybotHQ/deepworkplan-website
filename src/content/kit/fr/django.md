---
title: Django
description: "Un preset d’onboarding pour les projets Django, avec des indices de raisonnement pour les apps, migrations, réglages, commandes de gestion et le test runner."
kind: preset
lang: fr
order: 1
stack: Django
---

# Preset Django

Un guide de raisonnement que le flux onboard utilise pour les projets Django. C’est une liste de contrôle, pas un modèle — la réalité détectée l’emporte.

## Signaux

- `manage.py` et `settings.py` ; des apps avec `models.py`, `views.py`, `migrations/`.
- Gestionnaire de paquets et test runner déduits du manifeste et du fichier de verrouillage existants.

## Ce sur quoi raisonner

- La vraie commande de test (souvent `python manage.py test` ou `pytest`) et toute porte de lint/vérification de types — capturée verbatim.
- Les conventions d’app et de migration, l’organisation des réglages et de l’environnement, et les patterns de commandes de gestion.
- Des skills adaptés à la stack pour les apps, modèles, vues et migrations.

## Notes

Utile pour les apps Django qui suivent l’organisation de projet standard.
