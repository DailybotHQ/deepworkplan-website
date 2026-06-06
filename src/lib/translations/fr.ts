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
    github: 'GitHub',
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

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Navigation du site',
    sections: {
      methodology: 'Méthodologie',
      getStarted: 'Pour commencer',
      project: 'Projet',
      connect: 'Nous joindre',
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
        'Deep Work Plan transforme n’importe quel dépôt en un environnement structuré — contexte, garde-fous et un plan durable — où tout agent de code s’exécute avec précision et mène à terme un travail de longue haleine.',
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
    },
    pitch: {
      kicker: 'Le problème et la réponse',
      problem:
        'Les agents de code IA sont remarquablement efficaces sur de courtes séquences. Sur un travail de longue haleine — une migration, un nouveau sous-système, un refactoring sur des dizaines de fichiers — ils dérivent : le contexte se remplit, les décisions s’oublient et les tâches de plusieurs heures sont abandonnées à mi-parcours.',
      answer:
        'Deep Work Plan répond par le développement piloté par la spécification : le plan est la source de vérité durable, et les agents s’exécutent face à des critères d’acceptation explicites et des portes de validation. La dérive diminue, le travail reste vérifiable, et n’importe quel agent peut le reprendre d’une session à l’autre.',
      origin:
        'C’est aussi de l’ingénierie de harness rendue portable. Un harness d’agent, c’est l’échafaudage autour d’un modèle — contexte, outils, boucle de contrôle, garde-fous, état reprenable — qui le rend fiable. Deep Work Plan installe ce harness dans le dépôt lui-même (AGENTS.md, docs, le foyer des skills .agents/, le skill DWP), pour que tout agent puisse piloter tout dépôt. Né chez Dailybot, éprouvé pendant des mois, et publié sous le nom DailybotHQ/deepworkplan-skill.',
      illustrationAlt:
        'Une carte marine avec une route unique tracée qui passe sans danger entre les écueils — une gravure évoquant le plan comme la direction qui maintient le travail sur le cap.',
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
            'Échafaude .agents/ avec le lien symbolique .claude vers .agents',
          description:
            'Un répertoire .agents/ partagé entre agents (skills, agents, commandes) et le lien symbolique .claude vers .agents, qui reflète CLAUDE.md vers AGENTS.md, afin que chaque outil lise une seule source de vérité.',
        },
        {
          title: 'Installe le skill DWP et échafaude .dwp/',
          description:
            'Branche le skill Deep Work Plan et crée le dossier .dwp/ (ignoré par git) pour les plans et les ébauches, puis superpose en option des addons facultatifs comme la prise en charge du devcontainer.',
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
          label: '.agents/ avec le lien symbolique .claude vers .agents',
          detail:
            'Un répertoire .agents/ partagé entre agents (skills, agents, commandes) avec le lien symbolique .claude vers .agents, pour que chaque outil lise une seule source de vérité.',
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
      'Tout ce dont vous avez besoin pour exécuter la méthodologie : le skill et ses sous-skills, les commandes slash, les adaptateurs d’agent, les presets d’onboarding, les addons facultatifs et des exemples détaillés.',
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
          'Des capacités optionnelles que le flux onboard peut superposer à un dépôt — jamais incluses dans la base AI-first.',
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
          'Lancez le sous-skill onboard et laissez l’agent raisonner sur votre dépôt réel. Il génère AGENTS.md, une base de connaissances docs/, une doc par module et un foyer .agents/ partagé entre agents (avec le lien symbolique .claude → .agents), branche les commandes dwp-* légères et échafaude un .dwp/ ignoré par git.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Faire évoluer le kit et accepter des addons',
        description:
          'Utilisez /skill-create et /agent-create (le sous-skill author) pour faire grandir des skills, agents et commandes adaptés à votre stack. L’onboarding propose aussi trois addons facultatifs — devcontainer, Dailybot et dependency-upgrade — que vous acceptez seulement lorsqu’ils conviennent.',
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
      'D’abord, le dépôt devient piloté par la spécification : le travail part d’un plan et d’une spécification écrits, et non de prompts ponctuels. Ensuite, le dépôt lui-même devient le harness de l’agent — un AGENTS.md, une base de connaissances docs/, une doc par module et un foyer de skills .agents/ (avec le lien symbolique .claude → .agents) donnent à chaque agent le contexte et les commandes dont il a besoin.',
    ],
    sequenceTitle: 'La séquence d’adoption',
    orLabel: 'ou',
    steps: [
      {
        title: "Vérifiez avant d'installer",
        description:
          "Traitez le prompt et le skill comme non fiables jusqu'à les avoir vérifiés. Tous deux sont open source et sous licence MIT ; le skill est Markdown-first sans appels réseau ni télémétrie. Chaque version publie un SHA256SUMS sur les fichiers du skill, ce qui vous permet de confirmer que votre copie correspond avant de l'exécuter. Les versions ont des checksums, pas des signatures (la signature est la prochaine étape documentée).",
        commands: [
          'curl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS && ./setup.sh --verify',
        ],
      },
      {
        title: 'Installer le skill',
        description:
          'Ajoutez le skill Deep Work Plan pour que tout agent puisse planifier et exécuter un travail structuré. Le skill fournit un routeur plus huit sous-skills — create, execute, refine, resume, status, verify, onboard et author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Lancer l’onboarding du dépôt',
        description:
          'Invoquez le sous-skill onboard et laissez l’agent raisonner sur le dépôt réel — sa stack, son gestionnaire de paquets et ses vraies commandes de validation. Il génère alors AGENTS.md, une base de connaissances docs/, une doc par module et un foyer .agents/ partagé entre agents (avec le lien symbolique .claude → .agents), branche les commandes dwp-* légères et échafaude un .dwp/ ignoré par git pour les plans et les ébauches. Rien n’est issu d’un modèle ; tout est adapté à votre dépôt.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Faire évoluer le kit et accepter des addons',
        description:
          'Utilisez /skill-create et /agent-create (le sous-skill author) pour faire grandir des skills, agents et commandes adaptés à votre stack. L’onboarding propose aussi trois addons facultatifs — devcontainer, Dailybot et dependency-upgrade — que vous acceptez seulement lorsqu’ils conviennent. Un dépôt est pleinement conforme avec zéro addon.',
      },
      {
        title: 'Planifier et exécuter',
        description:
          'Générez des Deep Work Plans avec /dwp-create et exécutez-les avec /dwp-execute, puis /dwp-status, /dwp-refine et /dwp-resume au fil du travail. Chaque plan porte des tâches numérotées, des portes de validation et un protocole d’achèvement, de sorte que le travail reste structuré, relisible et reprenable d’une session à l’autre.',
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
};
