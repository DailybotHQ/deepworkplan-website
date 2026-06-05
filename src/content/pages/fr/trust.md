---
title: "Confiance et sécurité"
description: "Pourquoi Deep Work Plan est sûr à adopter : open source et MIT, Markdown-first sans appels réseau ni télémétrie, non destructif par conception, avec des installations vérifiables et une politique claire de divulgation des vulnérabilités."
lastUpdated: 2026-06-05
---

## Pourquoi vous pouvez lui faire confiance

Personne ne devrait installer une skill en laquelle il ne peut pas avoir confiance. Deep Work Plan est conçu pour être vérifié, pas accepté sur parole : open source, Markdown-first, non destructif et vérifiable avant toute exécution.

- **Open source et licence MIT** — le site web et la skill sont publics et inspectables ; lisez chaque ligne avant de l'exécuter.
- **Markdown-first — pas de réseau, pas de télémétrie** — pas de CLI, pas d'API HTTP, pas de flux d'authentification ; aucun appel réseau, aucune télémétrie envoyée. Rien de votre dépôt ne quitte votre machine.
- **Non destructif par conception** — la seule action pertinente pour la sécurité est de modifier votre dépôt, et elle réconcilie plutôt qu'elle n'écrase : elle détecte ce qui existe, propose un plan et demande confirmation avant de remplacer quoi que ce soit. Les résultats des plans résident dans un répertoire `.dwp/` ignoré par git.
- **Ne touche aucun secret** — ne comite jamais de secrets, complète `.gitignore` plutôt que de le réécrire, et maintient les modifications dans de petits diffs lisibles.
- **Provenance vérifiable** — chaque version publie des checksums sur la skill distribuée.

---

## Vérifiez avant d'exécuter

Traitez la skill comme non fiable tant que vous ne l'avez pas vérifiée. Chaque version joint un fichier `SHA256SUMS` couvrant la skill distribuée. Téléchargez-le pour la version que vous souhaitez installer, puis vérifiez que votre copie correspond — une sortie non nulle signifie qu'un fichier ne correspond pas et vous devez vous arrêter.

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git
cd deepworkplan-skill
# Téléchargez les checksums pour la version à installer (remplacez vX.Y.Z) :
curl -fsSL -o SHA256SUMS \
  https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
./setup.sh --verify        # une sortie non nulle signifie qu'un fichier ne correspond pas — arrêtez
```

Les versions sont **checksummées, pas signées** — la signature (cosign ou GPG du mainteneur) est la prochaine étape documentée, pas une garantie actuelle. Comme tout est ouvert, vous pouvez aussi comparer n'importe quel fichier avec le dépôt à son tag.

---

## Signaler une vulnérabilité

Signalez les problèmes de sécurité en privé à **security@dailybot.com** plutôt que d'ouvrir un ticket public. Nous accusons réception des signalements sous 3 jours ouvrables et visons à publier un correctif ou une atténuation sous 30 jours pour les découvertes valides, selon leur gravité. Le site web et la skill partagent la même politique.

---

## Limitations honnêtes

- Les versions sont checksummées, mais pas encore signées cryptographiquement — la signature est prévue, pas encore réalisée.
- Deep Work Plan exécute un agent de coding autonome sur votre dépôt. Relisez son plan proposé et ses diffs ; la méthodologie est conçue pour cette relecture, pas pour la remplacer.
- Ces affirmations de confiance décrivent uniquement les sources officielles. Une copie modifiée ou tierce qui s'est écartée des dépôts ne bénéficie d'aucune de ces garanties — vérifiez-la d'abord.

---

## Ressources de confiance

- [Manifeste de confiance lisible par machine](https://deepworkplan.com/.well-known/dwp-trust.json)
- [security.txt (RFC 9116)](https://deepworkplan.com/.well-known/security.txt)
- [Politique de sécurité du site web](https://github.com/DailybotHQ/deepworkplan-website/blob/main/SECURITY.md)
- [Politique de sécurité et modèle de menaces de la skill](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
- [Lire la méthodologie](/methodology)
- [Adoption (init)](/init)
