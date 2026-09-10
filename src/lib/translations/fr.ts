/**
 * fr translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const fr: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull:
    'Deep Work Plan — exécution structurée pour les agents de code IA',
  siteDescription:
    'Deep Work Plan : une méthodologie ouverte et un kit de référence pour une exécution d’agents IA structurée, validée et reprenable sur plusieurs heures.',

  // Navigation
  nav: {
    home: 'Accueil',
    about: 'À propos',
    contact: 'Contact',
    // Deep Work Plan IA
    methodology: 'Méthodologie',
    spec: 'Spécification',
    kit: 'Kit',
    examples: 'Exemples',
    init: 'Init',
    quickstart: 'Démarrage rapide',
    trust: 'Confiance',
    developers: 'Développeurs',
    privacy: 'Confidentialité',
    github: 'GitHub',
    faq: 'FAQ',
    compare: 'Comparatif',
    resources: 'Ressources',
    resourcesDesc: 'Exemples, confiance, FAQ et comparaison',
    repo: {
      label: 'Code source',
      website: 'Dépôt du site web',
      websiteDesc: 'Ce site',
      skill: 'Dépôt du skill',
      skillDesc: 'Le skill installable',
    },
    menu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'Tous droits réservés.',
    poweredBy: 'Propulsé par',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'Nouveau · Économe en tokens',
    text: 'Deep Work Plan est sur Product Hunt aujourd’hui',
    tagline: 'donnez un plan à votre agent',
    linkText: 'Votez pour nous',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Navigation du site',
    sections: {
      methodology: 'Méthodologie',
      getStarted: 'Pour commencer',
      project: 'Projet',
      connect: 'Nous joindre',
      learn: 'Approfondir',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title: 'Deep Work Plan — exécution structurée pour les agents de code IA',
      description:
        'Le contexte compte plus que les modèles. Deep Work Plan transforme n’importe quel dépôt en un environnement structuré où tout agent de code mène à terme un travail de longue haleine.',
    },
    hero: {
      badge: 'Méthodologie ouverte · MIT · Indépendante de l’agent',
      title: 'Les modèles comptent.',
      titleEmphasis: 'Le contexte compte davantage.',
      subtitle:
        'Deep Work Plan transforme n’importe quel dépôt en un environnement structuré — contexte, garde-fous et un plan durable — où n’importe quel agent de codage exécute avec précision et efficacité et mène à bien le travail de longue haleine.',
      instructionLabel: 'Copier dans votre agent',
      instruction:
        "Copiez le prompt init.md et collez-le dans votre agent de code — Claude Code, Cursor, Codex ou tout autre — pour rendre n'importe quel dépôt AI-first.",
      copyLabel: 'Copier init.md',
      copiedLabel: 'Copié',
      viewInitCta: 'Voir le prompt /init complet',
      pullQuote:
        'Deep Work Plan, c’est le développement piloté par la spécification, où le dépôt lui-même devient le harness.',
      primaryCta: 'Lire la méthodologie',
      secondaryCta: 'Lire la spécification',
      illustrationAlt:
        'Un phare sur une côte rocheuse projette un faisceau unique qui guide un petit navire — une gravure évoquant le dépôt comme un harness stable qui guide tout agent.',
      scrollCta: 'Voir comment ça marche',
    },
    pitch: {
      kicker: 'Le problème et la réponse',
      problem:
        'En courtes salves, les agents de codage sont remarquables. Confiez-leur une mission de long terme — une migration, un nouveau sous-système, une refactorisation de dizaines de fichiers — ils dérivent : le contexte se remplit, les décisions s’effacent et des heures de travail restent inachevées.',
      answer:
        'Deep Work Plan répond par le développement piloté par la spécification : un plan durable, des tâches atomiques et des validation gates que l’agent doit franchir. « Fini » cesse d’être une impression — cela devient une preuve vérifiable et relisible.',
      efficiency:
        'Et parce que le contexte est la ressource la plus rare de votre agent, le harness est conçu pour l’efficacité des tokens : les instructions se chargent progressivement, la validation ne touche que ce qui a changé, et chaque tâche apprend localement — le travail de longue haleine reste abordable.',
      illustrationAlt:
        'Un diptyque gravé : d’un côté un navire à la dérive dans le brouillard près des rochers, de l’autre le même navire sur un cap tracé vers un feu de port.',
    },
    story: {
      act1: {
        kicker: 'La méthode · Acte I',
        lead: 'Vous décidez de ce que « terminé » signifie et des limites à ne pas franchir. Le plan porte votre intention ; les agents font les heures — sans surveillance permanente, sans correction toutes les vingt minutes.',
        deepLinkLabel: 'Lire la méthodologie',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: 'La méthode · Acte II',
        lead: 'Les longues tâches remplissent le contexte de n’importe quel modèle. Les détails s’effacent et l’agent dérive. Un plan écrit — tâches atomiques, portes de validation, état reprenable — est le repère vers lequel il revient, tour après tour.',
        deepLinkLabel: 'Voir la boucle principale',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: 'La méthode · Acte III',
        lead: 'Chaque tâche nomme ses critères d’acceptation et les vérifications qui doivent passer. L’agent ne peut pas se sentir fini — il doit passer, sinon la tâche reste ouverte.',
        deepLinkLabel: 'Lire la spécification',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: 'La méthode · Acte IV',
        lead: 'Contexte, outils, garde-fous et état vivent dans votre dépôt sous forme de fichiers simples que n’importe quel agent peut lire. Pas d’enfermement, pas de cerveau externe — tout survit aux réinitialisations de contexte.',
        deepLinkLabel: 'Voir ce que l’onboarding génère',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: 'La méthode · Acte V',
        lead: 'Le contexte est la ressource la plus rare de votre agent. Le harness se charge progressivement, ne valide que ce qui a changé et apprend tâche par tâche — le plan se paie tout seul.',
        deepLinkLabel: 'Lire la méthodologie',
        deepLinkHref: '/methodology',
      },
    },
    onboarding: {
      badge: 'Onboarding fondé sur le raisonnement',
      title:
        'Pointez-le vers n’importe quel dépôt. Il raisonne — il ne copie-colle pas.',
      subtitle:
        'Le flux d’onboarding inspecte les langages, frameworks, gestionnaire de paquets et commandes de validation réels de votre dépôt, puis génère des artefacts adaptés à ce dépôt. Une ébauche générique est traitée comme un échec.',
      steps: [
        {
          title: 'Raisonne sur votre stack et votre archétype',
          description:
            'Lit les manifestes, l’arborescence des dossiers et la CI pour déduire les vraies commandes de test, de lint et de build, puis classe le dépôt comme dépôt individuel ou comme hub orchestrateur.',
        },
        {
          title: 'Génère AGENTS.md, docs/ et la doc par module',
          description:
            'Un AGENTS.md raisonné, une hiérarchie docs/ catégorisée, et un README plus docs/ dans chaque module principal — remplis avec les vraies commandes de votre dépôt, pas des espaces réservés.',
        },
        {
          title:
            'Échafaude .agents/ avec les liens symboliques .claude et .cursor',
          description:
            'Un répertoire .agents/ partagé entre agents (skills, agents, commandes) et les liens symboliques .claude et .cursor vers .agents, afin que chaque outil lise une seule source de vérité.',
        },
        {
          title: 'Installe le skill DWP et échafaude .dwp/',
          description:
            'Branche le skill Deep Work Plan et crée le dossier .dwp/ (ignoré par git) pour les plans et les ébauches, installe la revue locale obligatoire AI Diff Reviewer, puis superpose en option des addons facultatifs comme la prise en charge du devcontainer.',
        },
      ],
    },
    quickstart: {
      badge: 'Ce qui se passe quand vous le lancez',
      title: 'Une seule instruction. Le dépôt fait le reste.',
      subtitle:
        'Vous ne choisissez pas de méthode d’installation et ne copiez aucun modèle. Vous donnez une seule ligne à votre agent ; il installe le skill — le moteur réutilisable — et y adapte votre dépôt.',
      steps: [
        {
          title: 'Votre agent ouvre /init.md',
          description:
            'Il lit le prompt d’onboarding sur deepworkplan.com/init.md ainsi que la méthodologie, la spécification et le kit qu’il référence — le standard qu’il s’apprête à adopter.',
        },
        {
          title: 'Il installe le skill Deep Work Plan',
          description:
            'Le skill est le moteur — le même dans chaque dépôt. Une seule commande importe le routeur et ses sous-skills (create, execute, refine, resume, status, verify, onboard, author) pour Claude Code, Cursor, Codex, Gemini et Copilot.',
        },
        {
          title: 'Il adapte votre dépôt',
          description:
            'En raisonnant sur votre stack réelle — jamais en copiant-collant — il écrit AGENTS.md, une arborescence docs/ catégorisée, des README par module, un kit .agents/ raisonné et un .dwp/ ignoré par git. Votre dépôt devient le harness.',
        },
        {
          title: 'Vous planifiez et exécutez',
          description:
            'Générez des Deep Work Plans de longue haleine pour n’importe quelle tâche et exécutez-les étape par étape, avec des critères d’acceptation explicites, des portes de validation et un état reprenable — de manière autonome, pendant des heures.',
        },
      ],
      note: 'Le skill est installé à l’identique partout ; ce qui est adapté, c’est votre dépôt — l’AGENTS.md, les docs et le kit .agents/ raisonné générés pour votre stack. Cette séparation est ce qui fait de la méthodologie un standard réutilisable plutôt qu’un échafaudage ponctuel.',
    },
    outcomes: {
      badge: 'Ce que vous obtenez',
      title: 'Tout ce dont votre agent a besoin pour travailler en autonomie.',
      subtitle:
        'Une seule exécution, validée de façon atomique. Chaque sortie est en Markdown et chaque changement est auditable.',
      items: [
        {
          label: 'AGENTS.md à la racine du dépôt',
          detail:
            'Raisonné à partir de la stack, des commandes et de la structure réelles de votre dépôt — pas un modèle avec des espaces réservés. CLAUDE.md est lié symboliquement à AGENTS.md.',
        },
        {
          label: 'Un docs/ catégorisé et de la doc par module',
          detail:
            'Architecture, installation, standards et dépannage — ainsi qu’un README et un docs/ dans chaque module principal, générés à partir de votre code.',
        },
        {
          label:
            '.agents/ avec les liens symboliques .claude et .cursor vers .agents',
          detail:
            'Un répertoire .agents/ partagé entre agents (skills, agents, commandes) avec les liens symboliques .claude et .cursor vers .agents, pour que chaque outil lise une seule source de vérité.',
        },
        {
          label: 'Le skill Deep Work Plan, installé',
          detail:
            'create, execute, refine, resume, status, verify, onboard et author — disponibles pour votre agent sous forme d’un seul pack de skills, sans copie par dépôt.',
        },
        {
          label: 'Une conformité vérifiable',
          detail:
            '/dwp-verify produit un rapport objectif de réussite/échec face à la spécification, de sorte que la qualité « AI-first » est vérifiée, pas affirmée — et revérifiable après chaque plan.',
        },
        {
          label: 'Deux archétypes, pris en charge',
          detail:
            'L’onboarding classe votre dépôt comme dépôt individuel (le cas courant) ou comme hub orchestrateur qui coordonne des plans enfants entre plusieurs dépôts.',
        },
        {
          label: 'Un kit vivant que votre dépôt fait grandir',
          detail:
            'Le sous-skill author (skill-create, agent-create) permet au dépôt de faire évoluer ses propres skills, agents et commandes ; des addons de maintenance facultatifs comme dependency-upgrade l’aident à se tenir à jour.',
        },
        {
          label: 'Natif git, reprenable, .dwp/',
          detail:
            'Aucun démon ni état externe. Les plans et les ébauches atterrissent dans un dossier .dwp/ ignoré par git, et toute tâche reprend à partir de git seul — même après un débordement de contexte.',
        },
      ],
    },
    agents: {
      badge: 'Agents',
      title: 'Fonctionne avec l’agent que vous utilisez déjà.',
      subtitle:
        'Une seule méthodologie, de nombreux adaptateurs. Le Markdown ne couple le framework à rien — tout agent qui lit du Markdown peut exécuter un Deep Work Plan.',
      fullLabel: 'Complet',
      partialLabel: 'Partiel',
      viewAllCta: 'Voir tous les agents',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'Implémentation de référence, avec WebFetch natif et commandes slash.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'Adaptateur complet. Utilisez le bundle hors ligne si WebFetch est restreint.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'Bundle hors ligne recommandé ; règles installées sous .codex/.',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: "Adaptateur complet — les commandes dwp-* s'exécutent via AGENTS.md et les procédures #.",
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Nécessite Gemini 2.5 Pro ou plus récent, avec WebFetch natif.',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: 'Open source. Lit AGENTS.md nativement et exécute les dwp-* via les commandes #.',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: "Les règles et les procédures de commande # pilotent l'intégralité de la boucle Deep Work Plan.",
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'Open source. Les règles Markdown et les commandes # exécutent chaque étape dwp-*.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'Adaptateur complet avec une surface de commandes native.',
        },
      ],
    },
    stacks: {
      badge: 'Stacks',
      title: 'Presets de raisonnement pour les stacks qui comptent.',
      subtitle:
        'Ce sont des aides au raisonnement, pas des modèles. L’onboarding lit les vrais manifestes de votre dépôt et s’adapte à chaque stack — il ne copie jamais un preset à l’aveugle. Les monorepos obtiennent une doc par module.',
      viewAllCta: 'Voir tous les presets',
      items: [
        { name: 'Django', sub: 'DRF · Poetry' },
        { name: 'FastAPI', sub: 'Pydantic · Poetry' },
        { name: 'Vue', sub: 'Vite · TypeScript' },
        { name: 'React', sub: 'Next · Vite · TS' },
        { name: 'Astro', sub: 'Svelte/React · MDX' },
        { name: 'TypeScript · Node', sub: 'Express · Fastify' },
        { name: 'TypeScript · Lambda', sub: 'Serverless · SAM' },
        { name: 'Go', sub: 'Modules · stdlib' },
        { name: 'Rust', sub: 'Cargo · 2021+' },
        { name: 'Générique', sub: 'Toute stack' },
      ],
    },
    archetypes: {
      badge: 'Deux archétypes',
      title: 'Dépôt individuel, ou hub orchestrateur.',
      subtitle:
        'L’onboarding bifurque selon l’archétype. La plupart des dépôts sont des dépôts individuels. Un hub coordonne des Deep Work Plans enfants entre de nombreux dépôts. La méthodologie traite les deux comme des cas de premier ordre.',
      individual: {
        tag: 'Cas courant',
        title: 'Dépôt individuel',
        description:
          'Une base de code unique avec une stack principale, ses propres commandes de validation et une doc par module. Le cas par défaut — l’onboarding le suppose à moins que le dépôt ne soit clairement un hub.',
        example:
          'Par exemple, une API Django, une application Vue ou un service Lambda TypeScript.',
      },
      orchestrator: {
        tag: 'Coordination',
        title: 'Hub orchestrateur',
        description:
          'Un dépôt de coordination qui orchestre le travail entre des sous-dépôts via un manifeste d’orchestrateur, en lançant des plans enfants qui valident chacun dans leur propre dépôt, avec des règles de frontière et un index de navigation.',
        example: 'Par exemple, un hub coordonnant cinq dépôts de produit.',
      },
    },
    comparison: {
      badge: 'Méthodologie versus outil',
      title: 'Une couche différente. Complémentaire, pas concurrente.',
      subtitle:
        'Deep Work Plan n’est pas un échafaudeur de plus. C’est la couche méthodologique sous tout outil de spécification ou d’échafaudage, centrée sur les exécutions autonomes de plusieurs heures.',
      colDwp: 'Deep Work Plan',
      colOthers: 'Outils d’échafaudage / spécification',
      rows: [
        {
          label: 'Axe principal',
          dwp: 'Exécution autonome de plusieurs heures',
          others: 'Génération de spécification ou d’échafaudage',
        },
        {
          label: 'Unité de travail',
          dwp: 'Un Deep Work Plan (session reprenable)',
          others: 'Un document de spécification ou un échafaudage',
        },
        {
          label: 'Modèle d’état',
          dwp: 'Dossier .dwp/ natif git, reprenable',
          others: 'Souvent externe ou intégré à l’IDE',
        },
        {
          label: 'Couplage à l’agent',
          dwp: 'Indépendant de l’agent (Markdown et Bash)',
          others: 'Souvent spécifique à un outil ou un IDE',
        },
        {
          label: 'Récupération du contexte',
          dwp: 'Reprend après un débordement de contexte',
          others: 'Redémarre généralement la tâche',
        },
        {
          label: 'Licence',
          dwp: 'MIT, méthodologie et kit ouverts',
          others: 'Variable',
        },
      ],
    },
    origin: {
      badge: 'Origine',
      quote:
        'Conçu par Dailybot — l’entreprise derrière les stand-ups asynchrones pour les équipes distribuées. En interne, nous avons utilisé des Deep Work Plans pour rendre pilotables par agent des dépôts de production couvrant Django, Vue, Lambda TypeScript et Astro. Après des mois d’usage en production, nous avons publié la méthodologie en open source sous licence MIT.',
      attribution: 'L’équipe d’ingénierie de Dailybot',
      dailybotCta: 'Découvrir Dailybot',
    },
    finalCta: {
      badge: 'Rendez votre dépôt AI-first',
      title: 'Donnez du travail en profondeur à vos agents.',
      subtitle:
        'Donnez une seule ligne à votre agent — pointez-le vers /init.md — et il rend votre dépôt AI-first : il installe le skill, raisonne sur votre stack et valide une hiérarchie AGENTS.md complète. À partir de là, vous créez et exécutez des Deep Work Plans qui s’exécutent en autonomie pendant des heures.',
      primaryCta: 'Ouvrir le prompt /init',
      secondaryCta: 'Lire la méthodologie',
      tertiaryCta: 'Pour les agents et les développeurs',
      meta: 'Sous licence MIT · zéro télémétrie · sorties vers un dossier .dwp/ ignoré par git.',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'Contact',
    nameLabel: 'Nom',
    namePlaceholder: 'Votre nom',
    emailLabel: 'E-mail',
    emailPlaceholder: 'votre@email.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Écrivez votre message…',
    sendButton: 'Envoyer le message',
  },

  // About page
  aboutPage: {
    title: 'À propos de la méthodologie',
    subtitle: 'Méthodologie ouverte · sous licence MIT',
    description:
      'Deep Work Plan est une méthodologie ouverte et indépendante du framework pour un travail d’ingénierie sérieux avec des agents de code IA. D’où elle vient et qui la maintient.',
    heroDescription:
      'Une structure reproductible pour planifier, exécuter et vérifier un travail en profondeur avec des agents de code IA — conçue de manière ouverte et libre d’usage.',
    bioTitle: 'Ce que c’est',
    bioText:
      'Deep Work Plan (DWP) est une méthodologie, pas un produit. Elle définit comment transformer un objectif en un plan convenu, décomposer ce plan en tâches atomiques et vérifiables indépendamment, et exécuter chaque tâche dans une boucle ciblée qui se termine par une vérification.<br /><br />Elle est délibérément indépendante de l’agent IA ou de la stack que vous utilisez — des adaptateurs traduisent la même boucle centrale vers Claude, Cursor, Copilot, Codex, Gemini, et davantage. Le plan, les tâches et le journal d’exécution sont tous en simple Markdown, de sorte que le travail reste lisible, relisible et versionné.',
    passionsTitle: 'Principes fondamentaux',
    passions: [
      {
        title: 'Planifier avant d’exécuter',
        description:
          'Aucun code n’est écrit tant que le plan n’est pas convenu. Le plan est un contrat entre vous et l’agent.',
        icon: '\u{1F5FA}️',
        link: '/methodology',
      },
      {
        title: 'Les tâches sont atomiques',
        description:
          'Chaque tâche est cadrée pour pouvoir être exécutée et vérifiée seule, puis validée de façon atomique.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'Tout vérifier',
        description:
          'Chaque tâche se termine par une vérification explicite avant que la suivante ne commence, avec une progression enregistrée dans git.',
        icon: '✅',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'En un coup d’œil',
    quickFacts: [
      'Méthodologie ouverte, sous licence MIT',
      'Indépendante du framework et de l’agent',
      'Maintenue par Dailybot et la communauté',
      'Comprend une spécification, des commandes, des adaptateurs, des presets et des exemples',
      'Markdown uniquement — pas de runtime, pas de verrouillage',
      'Transforme tout dépôt en une base de code AI-first, pilotable par agent',
    ],
    ctaTitle: 'Qui la maintient',
    ctaDescription:
      'Deep Work Plan est né d’un véritable travail d’ingénierie chez Dailybot et est désormais maintenu par Dailybot avec la communauté open source. La méthodologie, la spécification et le kit sont publiés sous licence MIT — libres d’usage, d’adaptation et d’extension.',
    ctaCv: 'Lire la méthodologie',
    ctaContact: 'Démarrage rapide',
  },

  // Contact page
  contactPage: {
    title: 'Communauté et contact',
    subtitle: 'Open source · Portée par la communauté',
    description:
      'Deep Work Plan est conçu de manière ouverte. Trouvez le code source, ouvrez une issue ou rejoignez la conversation via les canaux ci-dessous — les contributions sont les bienvenues.',
    heroDescription:
      'Des questions, des idées ou des améliorations ? Deep Work Plan est développé en public — voici comment joindre le projet et ses mainteneurs.',
    formTitle: 'Envoyer un message',
    nameLabel: 'Nom',
    namePlaceholder: 'Votre nom',
    emailLabel: 'E-mail',
    emailPlaceholder: 'votre@email.com',
    reasonLabel: 'Je souhaite vous contacter à propos de',
    reasonOptions: [
      { value: '', label: '— Choisissez un sujet —' },
      { value: 'general', label: 'Général / Simplement dire bonjour' },
      {
        value: 'tech-talk',
        label: 'Conférence technique / Invitation à intervenir',
      },
      { value: 'collaboration', label: 'Collaboration / Partenariat' },
      { value: 'project', label: 'Projet / Demande professionnelle' },
      { value: 'dailybot', label: 'Question sur Dailybot' },
      { value: 'trading', label: 'Questions sur mon trading' },
      {
        value: 'the-library-of-tomorrow',
        label: 'Rejoindre The Library of Tomorrow',
      },
      { value: 'other', label: 'Autre' },
    ],
    subjectLabel: 'Objet',
    subjectPlaceholder: 'De quoi s’agit-il ?',
    messageLabel: 'Message',
    messagePlaceholder: 'Écrivez votre message…',
    sendButton: 'Envoyer le message',
    sendingButton: 'Envoi en cours…',
    successTitle: 'Message envoyé.',
    successMessage:
      'Merci de votre message. Je vous répondrai dès que possible.',
    sendAnotherButton: 'Envoyer un autre message',
    requiredField: 'Ce champ est obligatoire',
    invalidEmail: 'Veuillez saisir une adresse e-mail valide',
    fallbackMessage:
      'Le formulaire de contact est actuellement indisponible. Vous pouvez me joindre directement par e-mail.',
    fallbackEmailText: 'Envoyez-moi un e-mail à',
    formNote: 'Je vous répondrai dès que possible.',
    socialTitle: 'Restons en contact',
    locationTitle: 'Localisation',
    locationText:
      'Basé en Colombie. Ouvert à la collaboration à distance partout dans le monde.',
    prefillSubjects: {
      generalInquiry: 'Demande générale',
      collaboration: 'Opportunité de collaboration',
      projectInquiry: 'Demande de projet ou professionnelle',
      projectCollaboration: 'Demande de collaboration sur un projet',
      startupCollaboration: 'Opportunité de collaboration avec une startup',
      techTalkInvitation: 'Invitation à une conférence technique',
      tradingQuestion: 'Question sur le trading',
      dailybotQuestion: 'Question sur Dailybot',
    },
  },

  contactSection: {
    title: 'Restons en contact',
    description:
      'Je suis toujours ouvert aux conversations intéressantes, aux opportunités de collaboration et aux idées nouvelles. Que vous vouliez parler technique, entrepreneuriat ou simplement dire bonjour.',
    ctaText: 'Prendre contact',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'fr-FR',

  // 404 page
  notFoundPage: {
    title: 'Page introuvable',
    description:
      'La page que vous recherchez n’existe pas ou a été déplacée. Explorez la méthodologie ou revenez à l’accueil pour poursuivre votre navigation.',
    heading: 'Page introuvable',
    message:
      'Désolé, la page que vous recherchez n’existe pas ou a peut-être été déplacée. Essayez de revenir à l’accueil ou d’explorer la méthodologie.',
    backHome: 'Revenir à l’accueil',
    exploreMethodology: 'Lire la méthodologie',
    agentTitle: 'Pour les agents IA',
    agentIntro:
      'Ce chemin n’existe pas. Les liens de récupération ci-dessous (et leurs équivalents lisibles par machine) listent toutes les pages de ce site.',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'La méthodologie Deep Work Plan',
      description:
        'Cinq chapitres, du manifeste aux archétypes : les principes, la boucle centrale, les modèles, les skills et agents, et les adaptations derrière Deep Work Plan.',
    },
    eyebrow: 'Méthodologie',
    title: 'La méthodologie Deep Work Plan',
    intro:
      'Cinq chapitres qui vous mènent de la philosophie derrière Deep Work Plan à la boucle pratique, aux modèles et aux adaptations que vous utilisez au quotidien.',
    chapterLabel: 'Chapitre',
    readChapter: 'Lire le chapitre',
    prev: 'Précédent',
    next: 'Suivant',
    backToIndex: 'Tous les chapitres',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Spécification Deep Work Plan',
      description:
        'La spécification lisible de la méthodologie Deep Work Plan : le format DWP, le protocole d’agent, les archétypes, le standard de documentation et les addons.',
    },
    eyebrow: 'Spécification',
    title: 'Spécification',
    intro:
      'La spécification précise et lisible de la méthodologie — les structures et protocoles que les humains et les agents partagent.',
    tocTitle: 'Sur cette page',
    prev: 'Précédent',
    next: 'Suivant',
    backToIndex: 'Tous les documents de spécification',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'Le kit Deep Work Plan',
      description:
        'Le skill et ses huit sous-skills, commandes, adaptateurs, presets, addons facultatifs et exemples qui rendent Deep Work Plan exécutable sur tous les agents et toutes les stacks.',
    },
    eyebrow: 'Kit',
    title: 'Le kit',
    intro:
      'Tout ce dont vous avez besoin pour exécuter la méthodologie : le skill et ses sous-skills, les commandes slash, les adaptateurs d’agent, les presets d’onboarding, la revue locale obligatoire et les addons facultatifs, et des exemples détaillés.',
    groups: {
      command: {
        title: 'Sous-skills et commandes',
        description:
          'Le routeur de skills et ses sous-skills (create, execute, refine, resume, status, verify, onboard, author), ainsi que les commandes slash légères qui leur délèguent.',
      },
      adapter: {
        title: 'Adaptateurs',
        description:
          'Des intégrations légères par agent pour Claude, Cursor, Codex, et davantage.',
      },
      preset: {
        title: 'Presets d’onboarding',
        description:
          'Des guides de raisonnement par stack que le flux onboard utilise pour adapter la doc, les skills et les commandes de validation à votre dépôt.',
      },
      example: {
        title: 'Exemples',
        description: 'Des démonstrations détaillées, avant et après.',
      },
      addon: {
        title: 'Addons (facultatifs)',
        description:
          'Des capacités que le flux onboard superpose à un dépôt : la revue locale obligatoire AI Diff Reviewer plus quatre addons optionnels qui ne font jamais partie de la base AI-first.',
      },
    },
    viewDetail: 'Voir les détails',
    prev: 'Précédent',
    next: 'Suivant',
    backToIndex: 'Retour au kit',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Exemples Deep Work Plan',
      description:
        'Des démonstrations avant/après montrant la même tâche d’ingénierie avec et sans Deep Work Plan — et la différence en matière de fiabilité et de relecture.',
    },
    eyebrow: 'Exemples',
    title: 'Exemples',
    intro:
      'Voyez la méthodologie en action — des démonstrations concrètes, avant et après, de vraies tâches d’ingénierie.',
    viewExample: 'Lire la démonstration',
    prev: 'Précédent',
    next: 'Suivant',
    backToGallery: 'Tous les exemples',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'Démarrage rapide — Deep Work Plan',
      description:
        'Installez le skill, intégrez votre dépôt, puis planifiez et exécutez avec n’importe quel agent — les étapes qui rendent votre dépôt piloté par la spécification et pilotable par agent.',
    },
    eyebrow: 'Démarrage rapide',
    title: 'Commencez en quelques minutes',
    intro:
      'Installez le skill, intégrez votre dépôt, puis planifiez et exécutez avec n’importe quel agent — les étapes qui rendent votre dépôt piloté par la spécification et pilotable par agent.',
    sequenceTitle: 'Le parcours d’adoption',
    codeLabel: 'Terminal',
    orLabel: 'ou',
    steps: [
      {
        title: 'Installer le skill Deep Work Plan',
        description:
          'Ajoutez le skill à votre dépôt — un routeur plus huit sous-skills (create, execute, refine, resume, status, verify, onboard, author). Utilisez la CLI Skills pour la voie la plus rapide, ou clonez le dépôt et lancez setup là où git et un shell sont disponibles.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Intégrer le dépôt',
        description:
          'Lancez le sous-skill onboard et laissez l’agent raisonner sur votre dépôt réel. Il génère AGENTS.md, une base de connaissances docs/, une doc par module et un foyer .agents/ partagé entre agents (avec les liens symboliques .claude → .agents et .cursor → .agents), branche les commandes dwp-* légères et échafaude un .dwp/ ignoré par git.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Faire évoluer le kit et accepter des addons',
        description:
          'Utilisez /skill-create et /agent-create (le sous-skill author) pour faire grandir des skills, agents et commandes adaptés à votre stack. L’onboarding installe la revue locale obligatoire AI Diff Reviewer (sa porte CI reste facultative) et propose quatre addons facultatifs — devcontainer, Dailybot, dependency-upgrade et design-system — que vous acceptez seulement lorsqu’ils conviennent.',
      },
      {
        title: 'Planifier et exécuter',
        description:
          'Générez un Deep Work Plan et exécutez-le tâche par tâche, en validant chaque porte et en reprenant d’une session à l’autre — en pilotant le dépôt face à sa propre spécification.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'Le résultat',
    outcome:
      'Votre dépôt devient piloté par la spécification et pilotable par agent : le plan est la source de vérité durable, et le dépôt lui-même devient le harness face auquel tout agent s’exécute.',
    nextStepsTitle: 'Étapes suivantes',
    nextSteps: [
      { label: 'Lire la méthodologie', href: '/methodology' },
      { label: 'Parcourir le kit', href: '/kit' },
      { label: 'Voir les exemples', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — Rendez votre dépôt AI-first',
      description:
        'Adoptez la méthodologie Deep Work Plan dans n’importe quel dépôt. Installez le skill, lancez l’onboarding de l’agent, puis planifiez et exécutez avec n’importe quel agent de code IA.',
    },
    eyebrow: 'Adoption',
    title: 'Rendez ce dépôt AI-first',
    intro:
      'Un seul endpoint pour transformer n’importe quel dépôt en une base de code pilotée par la spécification et prête pour les agents. Installez le skill, laissez un agent intégrer le dépôt, puis planifiez et exécutez un travail structuré avec n’importe quel agent de code.',
    handoffTitle: 'Copier dans votre agent',
    handoffBody:
      'Copiez le prompt init.md complet et collez-le dans votre agent de code IA — Claude Code, Cursor, Codex ou tout autre. Il lit la méthodologie et la spécification, installe le skill et intègre ce dépôt pour les Deep Work Plans.',
    handoffInstruction:
      'Lisez et suivez les instructions sur https://deepworkplan.com/init.md pour rendre ce dépôt AI-first.',
    handoffMdLabel: 'Prompt d’agent autonome',
    codeLabel: 'agent',
    whatTitle: 'Ce que cela fait',
    whatBody: [
      'L’adoption change le dépôt de deux manières durables — les piliers de la méthodologie.',
      'D’abord, le dépôt devient piloté par la spécification : le travail part d’un plan et d’une spécification écrits, et non de prompts ponctuels. Ensuite, le dépôt lui-même devient le harness de l’agent — un AGENTS.md, une base de connaissances docs/, une doc par module et un foyer de skills .agents/ (avec les liens symboliques .claude → .agents et .cursor → .agents) donnent à chaque agent le contexte et les commandes dont il a besoin.',
    ],
    sequenceTitle: 'La séquence d’adoption',
    orLabel: 'ou',
    steps: [
      {
        title: "Vérifiez avant d'installer",
        description:
          "Traitez le prompt et le skill comme non fiables jusqu'à les avoir vérifiés. Tous deux sont open source et sous licence MIT ; le skill est Markdown-first sans appels réseau ni télémétrie. Chaque version publie un SHA256SUMS sur les fichiers du skill, ce qui vous permet de confirmer que votre copie correspond avant de l'exécuter. Les versions ont des checksums, pas des signatures (la signature est la prochaine étape documentée).",
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'Installer le skill',
        description:
          'Ajoutez le skill Deep Work Plan pour que tout agent puisse planifier et exécuter un travail structuré. Le skill fournit un routeur plus huit sous-skills — create, execute, refine, resume, status, verify, onboard et author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Lancer l’onboarding du dépôt',
        description:
          'Invoquez le sous-skill onboard et laissez l’agent raisonner sur le dépôt réel — sa stack, son gestionnaire de paquets et ses vraies commandes de validation. Il génère alors AGENTS.md, une base de connaissances docs/, une doc par module et un foyer .agents/ partagé entre agents (avec les liens symboliques .claude → .agents et .cursor → .agents), branche les commandes dwp-* légères et échafaude un .dwp/ ignoré par git pour les plans et les ébauches. Pour les grands dépôts, le sous-skill onboard utilise un chemin piloté par plan : il complète la reconnaissance, puis émet un Deep Work Plan d’intégration. Rien n’est issu d’un modèle ; tout est adapté à votre dépôt.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Revue locale et addons facultatifs',
        description:
          'L’onboarding installe la revue locale obligatoire AI Diff Reviewer (sa porte CI reste facultative) et propose quatre addons optionnels — devcontainer, Dailybot, dependency-upgrade et design-system — que vous acceptez seulement lorsqu’ils conviennent. Un dépôt est pleinement conforme avec zéro addon optionnel. Utilisez /skill-create et /agent-create (le sous-skill author) pour faire grandir des skills, agents et commandes au-delà de la ligne de base.',
      },
      {
        title: 'Planifier et exécuter',
        description:
          'Générez des Deep Work Plans avec /dwp-create et exécutez-les avec /dwp-execute, puis /dwp-status, /dwp-refine, /dwp-resume et /dwp-verify au fil du travail. Chaque plan porte des tâches numérotées, des portes de validation et un protocole d’achèvement — et se clôt par un unique Final Review obligatoire (passe de sécurité, validation de l’état final et réconciliation des skills). L’Executive Report reste disponible sur demande.',
      },
      {
        title: 'Vérifier la conformité',
        description:
          'Exécutez /dwp-verify pour obtenir un rapport objectif réussite/échec par rapport à la spécification. Confirmez que AGENTS.md, docs/ (avec du contenu réel, pas des stubs), .agents/ (avec des délégateurs dwp-* légers et un catalogue correspondant au disque), .dwp/ et tmp/ sont en place — rien de modélisé, tout raisonné pour ce dépôt.',
        commands: ['/dwp-verify'],
      },
    ],
    outcomeTitle: 'Le résultat',
    outcome:
      'Le dépôt devient piloté par la spécification et le dépôt lui-même devient le harness de l’agent — le contexte et les commandes voyagent avec le code.',
    nextStepsTitle: 'À lire ensuite',
    nextSteps: [
      { label: 'Démarrage rapide', href: '/quickstart' },
      { label: 'Méthodologie', href: '/methodology' },
      { label: 'Spécification', href: '/spec' },
      { label: 'Kit', href: '/kit' },
    ],
  },

  faqPage: {
    meta: {
      title: 'Questions fréquentes — Deep Work Plan',
      description:
        'Réponses aux questions fréquentes sur Deep Work Plan : son rôle, les portes de validation et la reprise, la comparaison avec d’autres outils, l’adoption.',
    },
    eyebrow: 'FAQ',
    title: 'Questions fréquentes',
    intro:
      'Des réponses courtes aux questions les plus posées sur Deep Work Plan, chacune avec un lien vers la page qui va plus loin.',
    tocTitle: 'Sur cette page',
    groups: [
      {
        id: 'what',
        title: 'Ce qu’est Deep Work Plan',
        items: [
          {
            id: 'what-is-it',
            question: 'Que fait concrètement Deep Work Plan ?',
            answer:
              'Deep Work Plan transforme un dépôt en un environnement structuré où un agent de code peut exécuter un travail long avec fiabilité. Il s’installe comme un skill d’agent, intègre le dépôt une seule fois (un index `AGENTS.md`, une arborescence `docs/`, un kit `.agents/` de skills et de commandes, une zone de sortie `.dwp/` ignorée par git), et dès lors tout objectif devient un plan : des tâches atomiques, chacune dotée de critères d’acceptation et d’une porte de validation, exécutées une à une, commitées à mesure qu’elles passent, et que n’importe quel agent peut reprendre depuis le disque. Le plan se clôt par un Final Review qui audite la sécurité et valide l’état final. La méthodologie est sous licence MIT et fonctionne avec tout agent de code qui lit un dépôt.',
            linkLabel: 'Lire la méthodologie',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: 'À qui s’adresse-t-il ?',
            answer:
              'Aux développeurs et aux équipes qui confient un vrai travail en plusieurs étapes à des agents de code et veulent qu’il aboutisse. La méthodologie convient quand une tâche dépasse une session, une famille de fichiers ou un agent ; quand un coéquipier doit pouvoir reprendre là où un agent s’est arrêté ; ou quand « terminé » doit signifier « validé », et non « l’agent le dit ». Une correction d’une ligne n’a pas besoin d’un plan, et la méthodologie le dit : sa règle de rigueur proportionnelle recommande plutôt un objectif, des critères et une porte énoncés directement.',
            linkLabel: 'Démarrage rapide',
            linkPath: '/quickstart',
          },
          {
            id: 'is-it-a-tool',
            question: 'Est-ce un outil, un framework ou une méthodologie ?',
            answer:
              'Une méthodologie empaquetée sous la forme d’un skill installable. Il n’y a ni serveur, ni compte, ni format propriétaire, ni runtime au-delà de l’agent de code que vous utilisez déjà. Ce qui s’installe, ce sont des instructions que l’agent lit, un petit ensemble de scripts shell pour la détection du contexte et la vérification de conformité, et les conventions que votre dépôt adopte. Tout ce que le plan produit est du Markdown et du JSON dans votre dépôt, lisibles sans aucun outil.',
            linkLabel: 'Lire la spécification',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: 'Avec quels agents de code fonctionne-t-il ?',
            answer:
              'Tout agent qui lit les fichiers d’un dépôt. Le skill suit le standard ouvert Agent Skills et la convention `AGENTS.md`, donc Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot et d’autres le prennent en charge via leur chargement habituel des skills et des instructions. L’évaluation propre à la méthodologie montre un plan démarré par l’agent d’un éditeur et repris par celui d’un autre, dans les deux sens. La couverture d’installation et les preuves comportementales sont listées par agent dans la matrice de compatibilité, et les deux ne sont jamais confondues.',
            linkLabel: 'Parcourir le kit',
            linkPath: '/kit',
          },
          {
            id: 'what-is-installed',
            question: 'What exactly gets installed, and where?',
            answer:
              'The agent skill is installed wherever your agent loads project or user skills. Onboarding then adapts the repository itself: it creates or reconciles AGENTS.md, docs/, .agents/ and the gitignored .dwp/ workspace. The skill teaches the agent the method; the repository keeps the context, kit and plan evidence that other agents need to continue.',
            linkLabel: 'See the adoption flow',
            linkPath: '/init',
          },
          {
            id: 'requires-git',
            question: 'Does Deep Work Plan require Git?',
            answer:
              'Git is recommended for repositories because its history is part of the recovery and review surface, but the methodology can also run in an agent workspace without a Git repository. In that case the machine-readable state layer, including state.json checkpoints and gate records, is required so recovery does not depend on a chat transcript.',
            linkLabel: 'Read about repository archetypes',
            linkPath: '/spec/archetypes',
          },
          {
            id: 'skill-plan-spec',
            question:
              'What is the difference between a skill, a plan and a product specification?',
            answer:
              'A skill describes how an agent performs a repeatable procedure. A DWP plan describes a concrete change through scope, acceptance criteria, validation gates and evidence. A product specification describes the product current behavior and evolves through deltas after implementation; skills and plans are specifications too, but they describe procedures and changes rather than maintaining that canonical product contract.',
            linkLabel: 'Read the specification',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'how',
        title: 'Comment se déroule un plan',
        items: [
          {
            id: 'how-to-use',
            question: 'Comment l’utiliser ?',
            answer:
              'Trois étapes. D’abord, installez la skill Deep Work Plan dans votre agent de code — le chemin le plus rapide est `npx skills add DailybotHQ/deepworkplan-skill` (ou clonez le dépôt de la skill et exécutez `./setup.sh`). Ensuite, intégrez le dépôt une fois pour que l’agent adapte `AGENTS.md`, `docs/`, le kit `.agents/` et une zone `.dwp/` ignorée par git à votre stack : pointez-le vers https://deepworkplan.com/init.md, ou exécutez `/deepworkplan-onboard`. Enfin, planifiez et exécutez le travail avec les commandes légères : `/dwp-create <goal>` construit un plan ; `/dwp-execute` l’exécute tâche par tâche face à chaque porte ; `/dwp-refine` modifie un brouillon ou un plan en cours ; `/dwp-resume` reprend après une interruption ; `/dwp-status` rapporte la progression sans exécuter ; `/dwp-verify` produit un rapport objectif de conformité. Les agents qui interceptent `/` utilisent souvent `#` à la place (par exemple `#dwp-execute`). Le point d’adoption et le démarrage rapide reprennent le même chemin en plus de détails.',
            linkLabel: 'Démarrage rapide',
            linkPath: '/quickstart',
          },
          {
            id: 'gates',
            question:
              'Comment les portes de validation sont-elles mises en œuvre ? Exigent-elles une validation humaine ?',
            answer:
              'Ce sont des assertions exécutables que l’agent lance lui-même. La validation humaine encadre l’exécution : une personne approuve le plan avant l’exécution et relit le diff final au moment de la pull request ; l’exécution entre les deux est autonome. Chaque tâche nomme des commandes concrètes, en général la porte qualité du dépôt lui-même, choisies depuis la surface touchée par la tâche : les tests du comportement modifié et de ses consommateurs, s’élargissant à la suite complète quand le changement est partagé ou ne peut pas être borné. Une tâche n’est marquée terminée que lorsque ces commandes sortent avec succès, et les tâches qui changent un comportement doivent étendre les tests. En cas d’échec, la tâche est marquée bloquée et l’agent s’arrête.',
            linkLabel: 'La boucle centrale',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              'Comment le plan évite-t-il de devenir obsolète quand le code change entre deux exécutions ?',
            answer:
              'Sur trois fronts. Les tâches sont écrites comme des comportements, non comme des éditions : un critère d’acceptation dit ce que le système doit faire, donc un fichier renommé ou une implémentation remplacée ne l’invalide pas. Chaque porte se rejoue contre le dépôt tel qu’il est maintenant, donc une hypothèse cassée échoue bruyamment à l’exécution suivante au lieu de dériver en silence, et cet échec est le signal pour raffiner. Et maintenir la documentation synchronisée fait partie du travail : une tâche qui change un comportement met aussi à jour les documentations et le kit orientés agents qui le décrivent, à l’intérieur de sa propre porte. Chaque exécution devrait laisser le dépôt plus prêt pour les agents qu’elle ne l’a trouvé.',
            linkLabel: 'Lire la méthodologie',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              'Puis-je modifier le plan en cours d’exécution sans perdre le travail accompli ?',
            answer:
              'Oui ; raffiner un plan partiellement exécuté est un geste de premier ordre. Les définitions des tâches et l’état d’exécution sont gardés séparés : le plan est une liste de contrôle sur disque plus un petit fichier d’état, donc ce qui est fait reste consigné indépendamment du texte des tâches. Quand une tâche s’avère fausse, l’agent la marque bloquée et s’arrête au lieu de forcer le passage. Vous éditez alors, réordonnez, découpez ou abandonnez les tâches non exécutées, tandis que les tâches accomplies restent accomplies. La reprise reconstruit l’état depuis le disque et le dépôt réel, puis rejoue les portes qui comptent, pour que rien de ce qui a bougé en dessous ne passe inaperçu.',
            linkLabel: 'La boucle centrale',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              'Vérifie-t-il continuellement le travail par rapport au plan, ou le plan est-il seulement posé au départ ?',
            answer:
              'Le plan est un contrôle continu. L’agent travaille une petite tâche à la fois et doit valider avant de passer à la suivante, donc il peut s’égarer d’un pas, pas de trois. Chaque tâche porte des critères d’acceptation plus les commandes exactes qui les prouvent, et la progression s’écrit dans le dépôt au fur et à mesure, avec un statut par tâche, pour que la dérive devienne visible pour vous, pour la session suivante et pour l’agent suivant. Un plan n’est pas terminé tant que tout ne valide pas, Final Review compris. La réserve honnête : la méthodologie ne peut pas empêcher un agent d’écrire d’emblée un critère d’acceptation faible ; elle rend la dérive bruyante au lieu de silencieuse.',
            linkLabel: 'La boucle centrale',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              'Le plan est-il généré une fois puis maintenu à la main, ou évolue-t-il avec le code ?',
            answer:
              'Ni l’un ni l’autre. Il est généré une fois à partir d’un objectif, puis maintenu comme partie du travail. Le plan n’est délibérément pas réécrit depuis les diffs de code, parce qu’une spécification qui court après le code devient un miroir en retard — précisément la dérive que la méthodologie existe pour tuer. Il évolue à dessein : les portes se rejouent contre le dépôt actuel, une porte qui échoue déclenche un raffinement, et l’agent effectue ce raffinement pendant l’exécution tandis que vous approuvez au départ et relisez à la fin. Documentation et tests évoluent avec le code par construction, parce que leur mise à jour est à l’intérieur de la porte de chaque tâche.',
            linkLabel: 'Lire la méthodologie',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question:
              'Que se passe-t-il si la session s’interrompt en cours de route ?',
            answer:
              'La progression vit sur le disque, pas dans la conversation. Les cases à cocher du README, le journal de chaque tâche, un index de travail borné et un fichier d’état lisible par machine sont mis à jour à chaque frontière de tâche, et le fichier d’état enregistre un point de contrôle avant toute pause prévue. Une session neuve, ou un agent différent, lit cet index compact, le réconcilie avec le dépôt et l’historique git, puis poursuit à la première tâche incomplète sans refaire le travail terminé. Même une création de plan interrompue est récupérable : l’identité du plan et sa liste de tâches prévues sont écrites avant tout fichier de tâche, pour qu’un plan à moitié créé puisse être achevé ou écarté plutôt qu’imaginé.',
            linkLabel: 'La boucle centrale',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'Qu’est-ce que le Final Review ?',
            answer:
              'L’unique tâche de clôture obligatoire de chaque plan. Dans l’ordre : une passe de sécurité sur l’ensemble complet des changements accumulés du plan, y compris une revue locale obligatoire du diff par le skill AI Diff Reviewer, les constats critiques bloquant l’achèvement jusqu’à correction ou acceptation explicite ; la validation de l’état final, c’est-à-dire les suites complètes applicables de tests, de lint, de vérification de types et de formatage du dépôt sur le code final ; et une réconciliation des décisions de skills que chaque tâche a consignées. L’agent rend ensuite compte des livrables, des preuves et des limites, et propose une fois un Rapport Exécutif, en le générant seulement si vous le demandez.',
            linkLabel: 'La spécification',
            linkPath: '/spec/dwp-specification',
          },
          {
            id: 'gate-fails',
            question: 'What happens when a validation gate fails?',
            answer:
              'The task is recorded as blocked and the agent stops before claiming completion. You can inspect the evidence, repair the code or refine the task, then resume; a failed command is a signal to resolve the mismatch, not permission to weaken the gate.',
            linkLabel: 'Read the agent protocol',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'unattended-runs',
            question: 'Can a plan run unattended overnight or in CI?',
            answer:
              'Yes, when the plan was approved in advance, carries the required state layer and gives the agent bounded authority. An unattended run must stop and record a blocker when reality diverges, a gate fails outside its planned repair scope, or a new approval or credential is needed.',
            linkLabel: 'Read the unattended protocol',
            linkPath: '/spec/agent-protocol',
          },
        ],
      },
      {
        id: 'compare',
        title: 'Comment il se compare',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              'En quoi diffère-t-il des outils pilotés par la spécification comme Spec Kit, OpenSpec ou Kiro ?',
            answer:
              'Ils résolvent des problèmes adjacents. Les outils pilotés par la spécification excellent à capturer ce qui doit changer : spécifications, exigences et propositions de changement sous une forme répétable. Deep Work Plan concerne la façon dont un agent exécute pendant des heures sans dériver : le harness intégré au dépôt, des portes de validation par tâche choisies depuis la surface touchée, un état reprenable sur disque, un Final Review obligatoire avec une passe de sécurité, et un vérificateur de conformité pour le dépôt lui-même. Les deux se combinent, une spécification ou une proposition de changement pouvant alimenter un plan. La page de comparaison pose les capacités côte à côte, selon les termes propres à chaque outil.',
            linkLabel: 'Voir la comparaison',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'En quoi diffère-t-il d’outils de workflow d’agents comme BMAD, Superpowers, Get Shit Done ou Gentle-AI ?',
            answer:
              'Ces frameworks apportent des styles de travail solides : des rôles, des principes, des étapes test-first, des habitudes de vérification. Deep Work Plan diffère des deux et se concentre sur ce qui reste dans le dépôt et sur ce qui peut être vérifié : un harness que tout agent lit à froid, des fichiers de tâche avec critères d’acceptation et portes, un état qui survit à une session, un vérificateur de conformité avec un code de sortie adapté à la CI, et une mesure publiée du nombre d’octets d’instructions chargés par chaque flux. La méthodologie est indépendante de l’outil par construction et n’ajoute aucun service, fournisseur ni secret à la boucle centrale. La page de comparaison montre où chaque approche est intégrée, optionnelle ou hors périmètre. Gentle-AI configure les agents de codage que vous utilisez déjà : mémoire persistante entre les sessions (Engram), skills sélectionnées, personas, serveurs MCP, Spec-Driven Development en option et revue fondée sur les preuves en option (Receipt-Driven Development). Il écrit dans les répertoires de configuration de chaque agent et peut conserver les artefacts de planification dans Engram, dans des fichiers OpenSpec, ou les deux. Deep Work Plan s’installe dans le dépôt lui-même — un harness que tout agent lit à froid, des fichiers de tâche avec critères d’acceptation et portes, un état reprenable sur disque, un vérificateur de conformité avec un code de sortie adapté à la CI et un registre publié d’octets d’instructions — sans ajouter de service, de fournisseur ni de secret à la boucle centrale. Les couches peuvent coexister : Gentle-AI équipe l’agent ; Deep Work Plan rend le travail de longue durée durable et vérifiable dans le dépôt.',
            linkLabel: 'Voir la comparaison',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question:
              'Pourquoi ne pas simplement utiliser le mode de planification intégré de mon agent ?',
            answer:
              'Les modes de planification intégrés sont utiles, et Deep Work Plan s’appuie sur le même substrat : la convention `AGENTS.md` et le standard ouvert Agent Skills. La différence est l’endroit où vit le plan et ce qui le fait respecter. Les plans natifs vivent en général hors du dépôt et expirent avec la session ; Deep Work Plan écrit le plan, son état et ses preuves dans le dépôt, pour qu’un autre agent ou un coéquipier puisse le poursuivre, et chaque tâche porte une porte exécutable et un journal consigné. Vous continuez d’utiliser le mode de planification de votre agent pour réfléchir ; la méthodologie ajoute la boucle d’exécution durable et vérifiable.',
            linkLabel: 'Voir la comparaison',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'L’adopter',
        items: [
          {
            id: 'install',
            question:
              'Qu’est-ce que l’onboarding écrit dans mon dépôt, et touche-t-il aux fichiers existants ?',
            answer:
              'L’onboarding est non destructif : il détecte un `AGENTS.md`, `docs/`, `.agents/` ou `CLAUDE.md` existant, réconcilie au lieu d’écraser, et demande avant de remplacer quoi que ce soit. Il écrit l’index `AGENTS.md` avec de vraies commandes, une arborescence `docs/` raisonnée, des documentations par module, le kit `.agents/` avec ses commandes `dwp-*` légères, une zone de sortie `.dwp/` ignorée par git, une carte des tests vérifiée, et la revue locale de code requise (le skill AI Diff Reviewer plus une extension de revue adaptée au dépôt). Il lance ensuite un autocontrôle et le vérificateur de conformité, pour que vous voyiez ce qui a été produit. Un dépôt intégré sous une version antérieure reçoit une mise à niveau ciblée qui ne change que ce qui manque.',
            linkLabel: 'L’endpoint d’adoption',
            linkPath: '/init',
          },
          {
            id: 'core-and-addons',
            question:
              'Can I use the core methodology without installing add-ons?',
            answer:
              'Yes. Add-ons are opt-in layers and a repository with none is fully DWP-conformant. Devcontainers, Dailybot reporting, dependency upgrades, design-system support and optional CI review are offered only when they fit your repository and you accept them explicitly.',
            linkLabel: 'Browse the add-ons',
            linkPath: '/spec/addons',
          },
          {
            id: 'no-test-toolchain',
            question: 'What if my repository has no tests or linting yet?',
            answer:
              'DWP does not treat the absence of a toolchain as a free pass. During onboarding the agent proposes a stack-appropriate validation setup, records the commands in the repository documentation and uses those commands as the target for future gates; the proposal remains visible for you to review.',
            linkLabel: 'Read the agent protocol',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'cost',
            question:
              'Combien cela coûte-t-il, et comment l’efficacité est-elle mesurée ?',
            answer:
              'La méthodologie et le skill sont sous licence MIT et gratuits ; il n’y a ni service, ni clé d’API, ni télémétrie dans les flux centraux. L’efficacité est rapportée comme le nombre d’octets d’instructions chargés par chaque flux, mesuré par un script livré avec le skill et publié dans un registre d’évaluation, les hausses étant rapportées aussi platement que les baisses. Elle n’est pas rapportée en pourcentages de tokens ni en économies de coût, parce qu’un inventaire d’octets n’établit pas ces choses ; une évaluation publique préenregistrée est prévue pour mesurer correctement les résultats.',
            linkLabel: 'Confiance et divulgation',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: 'Encore une question ?',
      body: 'Ouvrez une discussion ou une issue sur GitHub. Les questions qui reviennent souvent sont ajoutées à cette page.',
      ctaLabel: 'Poser une question sur GitHub',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan comparé aux alternatives',
      description:
        'Deep Work Plan comparé aux outils de spécification, aux frameworks d’agents et aux modes de plan : chaque outil selon ses termes, sources et date de revue.',
    },
    eyebrow: 'Comparatif',
    title: 'Deep Work Plan et les alternatives',
    intro:
      'Choisissez la couche adaptée à votre situation. Chaque alternative est décrite selon ses propres termes, chaque fait remonte à sa documentation officielle, et la page indique quand elle a été revue pour la dernière fois. C’est une carte, pas un classement.',
    howToRead: {
      title: 'Comment lire cette page',
      body: 'Trois valeurs décrivent chaque capacité. Elles disent où se trouve une capacité dans un outil, et non si l’outil est bon.',
      values: {
        builtIn: 'Intégré',
        optional: 'Optionnel ou via extension',
        notInScope: 'Hors périmètre',
      },
    },
    reviewedOnLabel: 'Dernière révision',
    alternativesTitle: 'Les alternatives, selon leurs propres termes',
    officialSiteLabel: 'Site officiel',
    categories: {
      methodology: 'Méthodologie',
      sdd: 'Outils de développement piloté par la spécification',
      agentFramework: 'Frameworks de workflow d’agents',
      aiNativeSdlc: 'AI-native SDLC',
      vendorNative: 'Modes de planification natifs des éditeurs',
    },
    matrix: {
      title: 'Matrice de capacités',
      caption:
        'Où se trouve chaque capacité, par outil. Intégré, optionnel ou via extension, ou hors périmètre. Vérifié contre la documentation officielle.',
      capabilityColumn: 'Capacité',
    },
    capabilities: {
      toolAgnostic: {
        label: 'Fonctionne avec tout agent de code',
        help: 'Les mêmes fichiers du dépôt pilotent Claude Code, Codex, Cursor, Gemini CLI et d’autres.',
      },
      repoNativeHarness: {
        label: 'Écrit le harness de l’agent dans le dépôt',
        help: 'Instructions, documentations, skills et commandes vivent dans le dépôt, pas dans les réglages d’un seul outil.',
      },
      taskAcceptanceCriteria: {
        label: 'Critères d’acceptation par tâche',
        help: 'Chaque tâche énonce des conditions observables pour être terminée.',
      },
      perTaskGates: {
        label: 'Porte de validation par tâche',
        help: 'Chaque tâche nomme les commandes qui doivent réussir, choisies parmi ce qu’elle a touché.',
      },
      resumableState: {
        label: 'État reprenable sur disque',
        help: 'La progression survit à une réinitialisation de session et peut être reprise par un autre agent ou un coéquipier.',
      },
      finalReview: {
        label: 'Revue de clôture obligatoire avec une passe de sécurité',
        help: 'Le plan ne peut pas s’achever sans une revue de sécurité de l’ensemble des changements et une validation de l’état final.',
      },
      conformanceChecker: {
        label: 'Vérificateur de conformité exécutable',
        help: 'Un script vérifie le dépôt et ses plans par rapport au standard, avec un code de sortie adapté à la CI.',
      },
      instructionBudgetLedger: {
        label: 'Mesure publiée de la charge d’instructions',
        help: 'Les octets chargés par chaque flux sont mesurés par un script livré dans le dépôt et publiés avec leurs limites.',
      },
      onboardingScaffold: {
        label: 'Onboarding qui structure la documentation',
        help: 'Une première exécution écrit la documentation et le kit du dépôt destinés aux agents.',
      },
      brownfieldSpecs: {
        label: 'Spécifications vivantes pour les systèmes existants',
        help: 'Les changements sont spécifiés comme des deltas qui fusionnent dans une spécification du système qui grandit.',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'S’installe comme un skill, intègre le dépôt en un harness d’agent et exécute des plans de longue haleine avec des portes de validation par tâche, un état sur disque et un Final Review obligatoire.',
        audience:
          'Développeurs et équipes qui confient un travail multi-sessions à n’importe quel agent de code et ont besoin qu’il aboutisse vérifié.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'Transforme une fonctionnalité en spécification exécutable via une constitution, une spec, un plan et une liste de tâches, piloté par des commandes slash qui s’intègrent à plus de cinquante agents de code.',
        audience:
          'Équipes qui veulent un flux répétable — spécifier, planifier, décomposer en tâches, implémenter — au sein de l’agent qu’elles utilisent déjà.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Capte chaque changement comme une proposition avec des specs delta (ajoutées, modifiées, supprimées) et des exigences RFC 2119 avec scénarios, puis les archive en spécifications vivantes.',
        audience:
          'Équipes qui travaillent sur des systèmes existants et veulent que les spécifications grandissent un changement à la fois.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'Un IDE agentique et une CLI dont les specs passent des exigences de style EARS au design puis aux tâches, avec des fichiers de guidage et des hooks déclenchés par les événements de l’éditeur.',
        audience:
          'Développeurs qui veulent le développement piloté par la spécification intégré à leur éditeur, avec des outils adossés à AWS.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'Un framework agile de rôles d’agents spécialisés (analyse, produit, architecture, développement, qualité) qui produit des briefs, des exigences, des documents d’architecture et des fichiers de stories.',
        audience:
          'Équipes qui aiment les cérémonies fondées sur les rôles et veulent un cycle agile complet pour le travail des agents.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'Une bibliothèque de skills et un flux de travail pour le brainstorming, la planification en petites étapes test-first, l’exécution avec des sous-agents et la revue avant achèvement.',
        audience:
          'Développeurs qui veulent une exécution disciplinée pilotée par les tests au sein de leur agent de code.',
      },
      'get-shit-done': {
        name: 'Get Shit Done',
        whatItDoesWell:
          'Un système de planification avec un répertoire .planning, des identifiants d’exigences, des plans par phase, une exécution à contexte neuf et une passe de vérification contre les indispensables énoncés.',
        audience:
          'Développeurs en solo et petites équipes qui veulent l’ingénierie du contexte et la vérification avec peu de cérémonial.',
      },
      'gentle-ai': {
        name: 'Gentle-AI',
        whatItDoesWell:
          'Configures the coding agents you already use with persistent memory, curated skills, MCP servers, personas and optional Spec-Driven Development or Receipt-Driven Development.',
        audience:
          'Developers who want a configured agent ecosystem that remembers work across sessions and can produce evidence on demand.',
      },
      'claude-ai-native-sdlc': {
        name: "Claude's AI-native SDLC",
        whatItDoesWell:
          'A six-stage loop from Plan and Design through Build, Test, Deploy and Maintain, with durable artifacts passed between stages.',
        audience:
          "Teams evaluating Claude Code's end-to-end software delivery playbook and its production feedback loop.",
      },
      'vendor-native': {
        name: 'Modes de planification natifs des éditeurs',
        whatItDoesWell:
          'Claude Code, Codex, Cursor et Gemini CLI livrent des modes de planification, des fichiers d’instructions et des skills qui suivent les standards AGENTS.md et Agent Skills.',
        audience:
          'Toute personne qui veut la planification au sein d’un seul agent sans adopter de méthodologie.',
      },
    },
    aiNative: {
      title: 'Where this fits in the AI-native SDLC',
      body: "Claude's AI-native SDLC playbook describes a full loop: Plan, Design, Build, Test, Deploy and Maintain. Each stage leaves an artifact for the next, while production feedback becomes new intent.",
      shared:
        'DWP shares the durable-artifact idea: intent becomes a plan, tasks leave evidence, and the repository remains readable by the next agent.',
      boundary:
        'The playbook also covers continuous evaluation and production operations. DWP focuses on the repository harness and long-horizon execution, so those operational practices can complement it rather than being claimed as built in.',
      sourceLabel: "Read Claude's AI-native SDLC playbook",
    },
    profileCta: 'Voir la comparaison',
    profile: {
      backLabel: 'Back to all alternatives',
      eyebrow: 'Alternative profile',
      compareWith: 'Compared with Deep Work Plan',
      fitTitle: 'Where it fits',
      capabilityTitle: 'Capability snapshot',
      sourceLabel: 'Official documentation',
    },
    dwpStrengths: {
      title: 'Ce qu’apporte Deep Work Plan',
      items: [
        {
          title: 'Indépendant de l’outil et natif du dépôt',
          body: 'Le harness et le plan sont des fichiers dans votre dépôt, lus par tout agent qui suit les standards AGENTS.md et Agent Skills. Changer d’agent ne fait pas perdre le plan.',
        },
        {
          title: 'Une validation choisie depuis ce que chaque tâche a touché',
          body: 'Chaque tâche déclare sa surface touchée et exécute les tests du comportement modifié et de ses consommateurs, s’élargissant à la suite complète quand l’impact ne peut pas être borné. Zéro test sélectionné n’est jamais une réussite.',
        },
        {
          title: 'Un seul Final Review, avec une passe de sécurité',
          body: 'Un plan se clôt par une revue de sécurité de l’ensemble des changements accumulés, y compris une revue locale obligatoire du diff, et par une validation de l’état final. Les constats critiques bloquent l’achèvement.',
        },
        {
          title: 'Un état qui survit aux sessions et aux agents',
          body: 'Cases à cocher du README, journaux de tâches, index de travail borné et fichier d’état lisible par machine sont écrits à chaque frontière, pour qu’une autre session ou un autre agent poursuive depuis le disque. Même une création de plan interrompue est récupérable.',
        },
        {
          title: 'Un vérificateur de conformité pour le dépôt lui-même',
          body: 'Un script en lecture seule vérifie le harness et chaque plan par rapport à la spécification, comprend les deux cycles de vie des plans et sort avec un code adapté à la CI.',
        },
        {
          title: 'Charge d’instructions mesurée et publiée',
          body: 'Un script livré dans le dépôt mesure le nombre d’octets chargés par chaque flux ; les résultats, hausses comprises, sont publiés en octets, jamais en pourcentages de tokens ou de coût.',
        },
      ],
    },
    honestLimits: {
      title: 'Limites assumées',
      body: 'Deep Work Plan n’a pas de mécanisme de spécification vivante ou delta ; OpenSpec et les outils similaires y sont plus forts. Aucun benchmark indépendant de la méthodologie n’existe encore ; une évaluation publique préenregistrée est prévue. Le registre de charge d’instructions mesure des octets chargés, pas des tokens, un coût ou des résultats.',
    },
    correction: {
      title: 'Aidez-nous à garder cette page exacte',
      body: 'Cette page est revue à la date indiquée et corrigée sur demande. Si la description de votre outil est obsolète ou incomplète, ouvrez une issue et nous la corrigerons.',
      ctaLabel: 'Ouvrir une issue',
    },
    sourcesTitle: 'Sources',
  },

  trustPage: {
    meta: {
      title: 'Confiance et sécurité',
      description:
        'Pourquoi Deep Work Plan est sûr à adopter : open source et MIT, Markdown-first sans appels réseau ni télémétrie, non destructif par conception, avec des installations vérifiables et une politique claire de divulgation des vulnérabilités.',
    },
    eyebrow: 'Confiance et sécurité',
    title: 'Confiance et sécurité',
    intro:
      "Personne ne devrait installer une skill en laquelle il ne peut pas avoir confiance. Deep Work Plan est conçu pour être vérifié, pas accepté sur parole : open source, Markdown-first, non destructif et vérifiable avant toute exécution. Cette page indique clairement ce qu'il fait, ce qu'il ne fait pas et comment confirmer les deux.",
    pillarsTitle: 'Ce en quoi vous faites confiance',
    pillars: [
      {
        title: 'Open source et licence MIT',
        body: "Le site web et la skill sont tous deux publics et inspectables. Vous pouvez lire chaque ligne avant de l'exécuter et comparer toute copie avec la source à une version taguée.",
      },
      {
        title: 'Markdown-first — pas de réseau, pas de télémétrie',
        body: "La skill n'a ni CLI, ni API HTTP, ni flux d'authentification. Elle n'effectue aucun appel réseau et n'envoie aucune télémétrie ; son seul helper local lit les métadonnées git et d'environnement. Rien de votre dépôt ne quitte votre machine.",
      },
      {
        title: 'Non destructif par conception',
        body: "La seule action pertinente pour la sécurité que la skill effectue est de modifier votre dépôt — et elle réconcilie plutôt qu'elle n'écrase. Elle détecte ce qui existe, propose un plan et demande confirmation avant de remplacer quoi que ce soit. Les résultats des plans résident dans un répertoire .dwp/ ignoré par git.",
      },
      {
        title: 'Ne touche aucun secret',
        body: "La méthodologie ne comite jamais de secrets et maintient l'état de travail en dehors du contrôle de version. L'onboarding complète .gitignore plutôt que de le réécrire, et chaque modification est pensée pour être relue dans de petits diffs lisibles.",
      },
      {
        title: 'Provenance vérifiable',
        body: "Chaque version publie des checksums sur la skill distribuée, afin que vous puissiez confirmer qu'une copie téléchargée correspond à ce qui a été publié avant de lui faire confiance.",
      },
    ],
    verifyTitle: "Vérifiez avant d'exécuter",
    verifyIntro:
      "Traitez la skill comme non fiable tant que vous ne l'avez pas vérifiée. Chaque version joint un fichier SHA256SUMS couvrant la skill distribuée. Téléchargez-le pour la version que vous souhaitez installer, puis vérifiez que votre copie correspond — une sortie non nulle signifie qu'un fichier ne correspond pas et vous devez vous arrêter.",
    codeLabel: 'shell',
    verifyNote:
      "Les versions sont checksummées, pas signées — la signature (cosign ou GPG du mainteneur) est la prochaine étape documentée, pas une garantie actuelle. Comme tout est ouvert, vous pouvez aussi comparer n'importe quel fichier avec le dépôt à son tag.",
    disclosureTitle: 'Signaler une vulnérabilité',
    disclosureBody:
      "Vous avez découvert un problème de sécurité ? Signalez-le en privé via le système de signalement privé de vulnérabilités de GitHub sur le dépôt concerné — la skill ou le site web (voir les politiques de sécurité liées ci-dessous) — plutôt que d'ouvrir un ticket public, ce qui exposerait le problème avant qu'un correctif n'existe.",
    resourcesTitle: 'Ressources de confiance',
    linkManifest: 'Manifeste de confiance lisible par machine',
    linkSecurityTxt: 'security.txt (RFC 9116)',
    linkPolicy: 'Politique de sécurité du site web',
    linkSkillPolicy: 'Politique de sécurité et modèle de menaces de la skill',
    limitationsTitle: 'Limitations honnêtes',
    limitations: [
      'Les versions sont checksummées, mais pas encore signées cryptographiquement — la signature est prévue, pas encore réalisée.',
      'Deep Work Plan exécute un agent de coding autonome sur votre dépôt. Relisez son plan proposé et ses diffs ; la méthodologie est conçue pour cette relecture, pas pour la remplacer.',
      "Les affirmations de confiance ici décrivent uniquement les sources officielles. Une copie modifiée ou tierce qui s'est écartée des dépôts ne bénéficie d'aucune de ces garanties — vérifiez-la d'abord.",
    ],
    ctaTitle: 'Adoptez-la en toute confiance',
    ctaBody:
      "Lisez la méthodologie et la spécification, pointez un agent vers l'endpoint init et vérifiez l'installation avant de l'exécuter.",
    ctaPrimary: 'Lire la méthodologie',
    ctaSecondary: 'Adoption (init)',
  },

  developersPage: {
    meta: {
      title:
        'Développeurs — API pour agents, serveur MCP et documentation de Deep Work Plan',
      description:
        'La surface pour agents de Deep Work Plan : API en lecture seule sans authentification, OpenAPI, serveur MCP sur /api/mcp et Markdown par page en 17 langues.',
    },
    eyebrow: 'Surface pour agents et développeurs',
    title: 'Deep Work Plan pour les développeurs et les agents IA',
    intro:
      'deepworkplan.com publie une surface lisible par machine à côté de ses pages : une API pour agents décrite par OpenAPI, un serveur MCP sans état, des miroirs natifs en Markdown pour chaque page en 17 langues et la skill DWP installable. Tout sur cette page est en ligne, public et gratuit — il n’y a rien pour lequel s’inscrire.',
    accessTitle: 'Sans authentification, par conception',
    accessIntro:
      'Il n’y a aucune clé d’API à générer, aucune gymnastique OAuth et aucun bac à sable séparé de la production — c’est la surface de production elle-même qui sert de bac à sable. C’est une propriété délibérée de la méthodologie : les agents ne peuvent pas remplir les formulaires « contact commercial », donc le site n’en demande jamais.',
    accessPoints: [
      {
        title: 'Lecture seule',
        body: 'Chaque opération est un GET sûr et mettable en cache — sauf l’endpoint MCP, qui est en POST. Il n’existe aucune opération d’écriture, aucun téléversement ni aucun changement d’état.',
      },
      {
        title: 'Aucune clé d’API',
        body: 'Aucune inscription, aucun jeton, aucun palier de limite de débit. L’accès anonyme est le contrat documenté, déclaré dans /auth.md et dans les stubs de découverte OAuth.',
      },
      {
        title: 'Gratuit et open source',
        body: 'Le contenu du site et la skill DWP sont sous licence MIT. Utilisez-les dans un cadre commercial ou non commercial sans demander la permission.',
      },
      {
        title: 'Pensé d’abord pour les machines',
        body: 'Erreurs JSON structurées sur les chemins /api, corps de récupération 404 en Markdown, catalogue d’API RFC 9727 et manifeste de capacités ARD — conçus pour la consommation par les agents.',
      },
    ],
    endpointsTitle: 'Endpoints',
    endpointsIntro:
      'Les endpoints principaux de l’API pour agents. La spécification complète et typée — chaque opération, paramètre et schéma de réponse — se trouve dans le document OpenAPI.',
    endpointsNote:
      'Les chemins /api/* inconnus renvoient une erreur JSON structurée avec une piste de résolution, jamais une page d’erreur HTML.',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: 'Spécification OpenAPI 3.1 de toute l’API pour agents.',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          'Sélection d’indications pour les LLM — le point d’entrée recommandé pour les agents.',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          'Le prompt canonique d’adoption de DWP (rend AI-first n’importe quel dépôt).',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          'N’importe quelle page en Markdown source natif — dans les 17 langues (p. ex. /es/developers.md).',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description:
          'Marqueur d’état statique avec des liens vers la spécification et ce portail.',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'Serveur MCP (Streamable HTTP, sans état) : initialize, ping, tools/list, tools/call.',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description:
          'Manifeste de capacités ARD — l’agentmap déclaré dans robots.txt.',
      },
    ],
    mcpTitle: 'Serveur MCP',
    mcpIntro:
      'Un serveur Model Context Protocol sans état sur Streamable HTTP. Trois outils en lecture seule : get_init_prompt, list_site_sections et read_page. Les versions de protocole 2025-03-26 et 2025-06-18 sont prises en charge ; aucune session n’est requise.',
    mcpCodeLabel: 'Terminal — JSON-RPC sur HTTP',
    mcpNote:
      'Le manifeste MCP se trouve dans /.well-known/mcp.json et la fiche du serveur dans /.well-known/mcp/server-card.json. Claude, ChatGPT et n’importe quel client MCP peuvent appeler ces outils nativement.',
    markdownTitle: 'Markdown pour les agents',
    markdownIntro:
      'Chaque page rendue est publiée en Markdown source natif — pas une conversion HTML. Demandez le Markdown explicitement avec un suffixe d’URL ou via la négociation de contenu HTTP sur n’importe quelle page.',
    markdownCodeLabel: 'Terminal — négociation de contenu',
    markdownNote:
      'La négociation de contenu renvoie le même Markdown source que celui dont le site tire ses pages, dans la langue de l’URL demandée.',
    cliTitle: 'Installez le kit',
    cliIntro:
      'Le chemin d’installation officiel de la skill Deep Work Plan — la même commande que l’endpoint /init donne aux agents. Elle fonctionne avec tout agent de code compatible skills (Claude Code, Cursor, Codex, Gemini et d’autres).',
    cliCodeLabel: 'Terminal — CLI de skills',
    cliNote:
      'La skill s’installe par vendoring dans .agents/skills/deepworkplan/ à l’intérieur de votre dépôt, pour que chaque agent qui touche le dépôt partage la même méthodologie.',
    resourcesTitle: 'Ressources lisibles par machine',
    resources: [
      { label: 'Spécification OpenAPI (/openapi.json)', href: '/openapi.json' },
      {
        label:
          'Déclaration d’accès et d’authentification des agents (/auth.md)',
        href: '/auth.md',
      },
      {
        label: 'Catalogue d’API, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'Manifeste MCP (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'Contact sécurité (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'Descripteur du dépôt du site (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'Pointez un agent dessus',
    ctaBody:
      'Le chemin le plus rapide reste une ligne : donnez le prompt /init à n’importe quel agent de code et il installe la skill, intègre votre dépôt et se met à terminer du deep work.',
    ctaPrimary: 'Ouvrir le prompt /init',
    ctaSecondary: 'Lire la méthodologie',
  },

  privacyPage: {
    meta: {
      title: 'Confidentialité — Deep Work Plan',
      description:
        'Politique de confidentialité de deepworkplan.com : site statique sans compte ni publicité, analyse sans cookie et ce que collecte le formulaire de contact.',
    },
    eyebrow: 'Politique de confidentialité',
    title: 'Confidentialité sur deepworkplan.com',
    intro:
      'Deep Work Plan est un site statique de documentation et de méthodologie. Cette page explique, simplement et complètement, quelles données le site touche lors de votre visite : il n’y a ni système de comptes, ni publicité, ni pistage inter-sites, nulle part.',
    lastUpdated: '8 septembre 2026',
    sections: [
      {
        heading: 'Ce qu’est le site',
        body: 'deepworkplan.com est une collection de pages statiques servies via un CDN. Il n’y a ni connexion, ni base de données d’utilisateurs, ni moyen pour le site de stocker des profils personnels. Le contenu est développé dans des dépôts GitHub publics sous l’organisation DailybotHQ, et tout ce que vous lisez ici est servi exactement tel qu’il a été construit.',
      },
      {
        heading: 'Mesure d’audience',
        body: 'Le site utilise Umami, un service de mesure d’audience sans cookie et respectueux de la vie privée, pour compter les pages vues de manière agrégée. Umami ne dépose pas de cookies de pistage et ne construit pas de profils inter-sites. Comme les crawlers d’IA n’exécutent pas JavaScript, une fonction edge côté serveur enregistre aussi l’agent utilisateur et le chemin des visites de bots automatisés comme événements d’analyse anonymes — cela identifie le logiciel crawler (par exemple « GPTBot a visité /init »), jamais un visiteur humain.',
      },
      {
        heading: 'Cookies et stockage local',
        body: 'Le site ne dépose aucun cookie de pistage. La seule chose stockée dans votre navigateur est une préférence de thème (mode clair ou sombre) gardée dans localStorage, qui ne quitte jamais votre appareil et n’est transmise nulle part. Si vous effacez le stockage du navigateur, le site revient simplement au thème par défaut de votre système.',
      },
      {
        heading: 'Services tiers',
        body: 'L’hébergement et la diffusion fonctionnent sur Cloudflare Pages, qui traite les journaux de requêtes et les adresses IP à la périphérie dans le cadre de l’exploitation du CDN et du blocage des abus, selon sa propre politique de confidentialité. La mesure d’audience agrégée fonctionne sur Umami (cloud.umami.is). Si vous envoyez volontairement le formulaire de contact, vos réponses transitent par Google Forms jusqu’à notre équipe — c’est le seul endroit où les informations que vous saisissez sont collectées, et elles servent uniquement à vous répondre.',
      },
      {
        heading: 'Ce que nous ne faisons pas',
        body: 'Nous ne vendons ni ne partageons de données personnelles, ne diffusons pas de publicité ni de pixels de remarketing, ne prenons pas d’empreintes de navigateurs et n’envoyons pas d’e-mails marketing. Le site n’a pas d’inscription à une newsletter ni de télémétrie au-delà des comptages agrégés et sans cookies décrits ci-dessus.',
      },
      {
        heading: 'Vos choix',
        body: 'Comme la mesure d’audience ici est agrégée et sans cookies, il n’y a aucun profil personnel à exporter ou supprimer. Vous pouvez bloquer le script d’analyse avec n’importe quel bloqueur de contenu sans affecter le fonctionnement du site. Si vous avez envoyé le formulaire de contact et souhaitez voir votre message supprimé, écrivez à l’adresse de contact ci-dessous et nous le supprimerons.',
      },
      {
        heading: 'Modifications de cette politique',
        body: 'Si cette politique change de manière substantielle, la date de mise à jour en haut de cette page change avec elle, et les modifications de fond sont commitées dans le dépôt public du site, où chacun peut consulter l’historique.',
      },
    ],
    contactTitle: 'Contact et sécurité',
    contactBody:
      'Pour toute question de confidentialité, écrivez à security@dailybot.com. Pour signaler une vulnérabilité de sécurité, privilégiez le signalement privé de vulnérabilités de GitHub pour les dépôts du site et de la skill — consultez /.well-known/security.txt pour les adresses exactes.',
  },
};
