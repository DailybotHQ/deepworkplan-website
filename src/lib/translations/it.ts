/**
 * it translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const it: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull:
    'Deep Work Plan — esecuzione strutturata per agenti di coding AI',
  siteDescription:
    'Deep Work Plan: una metodologia aperta e un kit di riferimento per un’esecuzione strutturata, validata e ripristinabile di agenti AI su attività di più ore.',

  // Navigation
  nav: {
    home: 'Home',
    about: 'Informazioni',
    contact: 'Contatti',
    // Deep Work Plan IA
    methodology: 'Metodologia',
    spec: 'Specifica',
    kit: 'Kit',
    examples: 'Esempi',
    init: 'Init',
    quickstart: 'Avvio rapido',
    trust: 'Fiducia',
    developers: 'Sviluppatori',
    privacy: 'Privacy',
    github: 'GitHub',
    faq: 'FAQ',
    compare: 'Confronto',
    changelog: 'Changelog',
    resources: 'Risorse',
    resourcesDesc: 'Esempi, fiducia, FAQ e confronto',
    repo: {
      label: 'Codice sorgente',
      website: 'Repository del sito',
      websiteDesc: 'Questo sito',
      skill: 'Repository della skill',
      skillDesc: 'La skill installabile',
    },
    menu: 'Apri il menu',
    closeMenu: 'Chiudi il menu',
  },

  // Footer
  changelogPage: {
    meta: {
      title: 'Aggiornamenti di Deep Work Plan',
      description:
        'Aggiornamenti importanti della skill, della metodologia e dell’harness portatile per agenti di Deep Work Plan.',
    },
    eyebrow: 'Aggiornamenti',
    title: 'Il lavoro dietro il metodo',
    intro:
      'Una cronologia documentata delle release e delle decisioni di design che rendono Deep Work Plan affidabile per il lavoro degli agenti a lungo termine.',
    viewDetail: 'Leggi l’aggiornamento',
    backToIndex: 'Tutti gli aggiornamenti',
    sourceLabel: 'Fonti',
    featuredLabel: 'Release in evidenza',
    relatedTitle: 'Aggiornamenti correlati',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'Tutti i diritti riservati.',
    poweredBy: 'Realizzato con',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'Novità · Efficiente nei token',
    text: 'Deep Work Plan è su Product Hunt oggi',
    tagline: 'dai un piano al tuo agente',
    linkText: 'Vota ora',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Navigazione del sito',
    sections: {
      methodology: 'Metodologia',
      getStarted: 'Per iniziare',
      project: 'Progetto',
      connect: 'Contatti',
      learn: 'Approfondimenti',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title: 'Deep Work Plan — esecuzione strutturata per agenti di coding AI',
      description:
        'Il contesto conta più dei modelli. Deep Work Plan trasforma qualsiasi repository in un ambiente strutturato in cui ogni agente di coding porta a termine il lavoro a lungo termine.',
    },
    hero: {
      badge: 'Metodologia aperta · MIT · Indipendente dall’agente',
      title: 'I modelli contano.',
      titleEmphasis: 'Il contesto conta di più.',
      subtitle:
        'Deep Work Plan trasforma qualsiasi repository in un ambiente strutturato — contesto, guardrail e un piano duraturo — dove qualsiasi agente di coding esegue con precisione ed efficienza e porta a termine il lavoro di lungo corso.',
      instructionLabel: 'Copia nel Suo agente',
      instruction:
        'Copi il prompt di init.md e lo incolli nel Suo agente di coding — Claude Code, Cursor, Codex o qualsiasi altro — per rendere qualsiasi repository AI-first.',
      copyLabel: 'Copia init.md',
      copiedLabel: 'Copiato',
      viewInitCta: 'Visualizza il prompt /init completo',
      pullQuote:
        'Deep Work Plan è spec-driven development in cui il repository stesso diventa la harness.',
      primaryCta: 'Leggi la metodologia',
      secondaryCta: 'Leggi la specifica',
      illustrationAlt:
        'Un faro su una costa rocciosa proietta un unico fascio che guida una piccola imbarcazione — un’incisione che evoca il repository come una harness stabile che guida qualsiasi agente.',
      scrollCta: 'Scopri come funziona',
    },
    pitch: {
      kicker: 'Il problema e la risposta',
      problem:
        'Nei burst brevi, gli agenti di coding sono notevoli. Affidategli una missione di lungo corso — una migrazione, un nuovo sottosistema, un refactoring su decine di file — e derivano: il contesto si riempie, le decisioni precedenti sfumano e ore di lavoro si fermano a metà.',
      answer:
        'Deep Work Plan risponde con lo sviluppo guidato dalla specifica: un piano duraturo, task atomici e validation gate che l’agente deve superare. “Fatto” smette di essere una sensazione — diventa evidenza verificabile e recensibile.',
      efficiency:
        'E poiché il contesto è la risorsa più scarsa del vostro agente, l’harness è progettato per l’efficienza dei token: le istruzioni si caricano progressivamente, la validazione tocca solo ciò che è cambiato e ogni task impara in loco — il lavoro di lungo corso resta sostenibile. Anche il piano stesso scala allo stesso modo: un piano Lite per una correzione delimitata, un piano Full per il lavoro che si estende su ore — il formato segue sempre l’ampiezza del lavoro, mai il contrario.',
      illustrationAlt:
        'Un dittico inciso: da una parte una nave alla deriva nella nebbia vicino agli scogli, dall’altra la stessa nave salda su una rotta tracciata verso il faro del porto.',
    },
    story: {
      act1: {
        kicker: 'Il metodo · Atto I',
        lead: 'Sei tu a decidere cosa significa “fatto” e dove corrono i confini. Il piano porta la tua intenzione; gli agenti mettono le ore — senza supervisione continua, senza correzioni ogni venti minuti.',
        deepLinkLabel: 'Leggi la metodologia',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: 'Il metodo · Atto II',
        lead: 'I task lunghi riempiono il contesto di qualsiasi modello. I dettagli sfumano e l’agente deriva. Un piano scritto — task atomici, validation gate, stato ripristinabile — è ciò a cui torna, giro dopo giro.',
        deepLinkLabel: 'Vedi il ciclo principale',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: 'Il metodo · Atto III',
        lead: 'Ogni task nomina i propri criteri di accettazione e le verifiche che devono passare. L’agente non può sentirsi finito — deve passare, o il task resta aperto.',
        deepLinkLabel: 'Leggi la specifica',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: 'Il metodo · Atto IV',
        lead: 'Contesto, strumenti, guardrail e stato vivono nel tuo repository come semplici file che qualsiasi agente può leggere. Niente lock-in, niente cervello esterno — sopravvive ai reset del contesto.',
        deepLinkLabel: 'Vedi cosa genera l’onboarding',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: 'Il metodo · Atto V',
        lead: 'Il contesto è la risorsa più scarsa del vostro agente. L’harness si carica progressivamente, valida solo ciò che è cambiato e impara task per task — il piano si ripaga da solo.',
        deepLinkLabel: 'Leggi la metodologia',
        deepLinkHref: '/methodology',
      },
    },
    onboarding: {
      badge: 'Onboarding basato sul ragionamento',
      title: 'Lo punti su qualsiasi repository. Ragiona — non copia e incolla.',
      subtitle:
        'Il flusso di onboarding esamina i linguaggi, i framework, il package manager e i comandi di validazione reali del Suo repository, poi genera artefatti adattati a quel repository. Uno stub generico è considerato un fallimento.',
      steps: [
        {
          title: 'Ragiona sul Suo stack e archetipo',
          description:
            'Legge i manifest, la struttura delle cartelle e la CI per dedurre i comandi reali di test, lint e build, poi classifica il repository come repo individuale o hub orchestratore.',
        },
        {
          title: 'Genera AGENTS.md, docs/ e documentazione per modulo',
          description:
            'Un AGENTS.md ragionato, una gerarchia docs/ categorizzata e un README più docs/ all’interno di ogni modulo principale — popolati con i comandi reali del Suo repository, non con segnaposto.',
        },
        {
          title:
            'Predispone .agents/ con i symlink da .claude e .cursor a .agents',
          description:
            'Una directory .agents/ multi-agente (skill, agenti, comandi) e i symlink da .claude e .cursor a .agents, che riflette CLAUDE.md su AGENTS.md, così ogni strumento legge un’unica fonte di verità.',
        },
        {
          title: 'Installa la skill DWP e predispone .dwp/',
          description:
            'Collega la skill Deep Work Plan e crea la cartella .dwp/ esclusa da git per piani, installa la revisione locale obbligatoria di AI Diff Reviewer, poi aggiunge facoltativamente addon opt-in come il supporto devcontainer.',
        },
      ],
    },
    quickstart: {
      badge: 'Cosa succede quando lo esegui',
      title: 'Un’unica istruzione. Al resto pensa il repository.',
      subtitle:
        'Non sceglie un metodo di installazione né copia un template. Consegna al Suo agente una sola riga; questo installa la skill — il motore riutilizzabile — e vi adatta il Suo repository.',
      steps: [
        {
          title: 'Il Suo agente apre /init.md',
          description:
            'Legge il prompt di onboarding su deepworkplan.com/init.md e la metodologia, la specifica e il kit a cui rimanda — lo standard che sta per adottare.',
        },
        {
          title: 'Installa la skill Deep Work Plan',
          description:
            'La skill è il motore — lo stesso in ogni repository. Un solo comando importa il router e le sue sub-skill (create, execute, refine, resume, status, verify, onboard, author) per Claude Code, Cursor, Codex, Gemini e Copilot.',
        },
        {
          title: 'Adatta il Suo repository',
          description:
            'Ragionando sul Suo stack reale — senza mai copiare e incollare — scrive AGENTS.md, un albero docs/ categorizzato, README per modulo, un kit .agents/ ragionato e una .dwp/ esclusa da git. Il Suo repository diventa la harness.',
        },
        {
          title: 'Pianifica ed esegue',
          description:
            'Genera Deep Work Plan a lungo termine per qualsiasi attività e li esegue passo dopo passo, con criteri di accettazione espliciti, validation gate e stato ripristinabile — in autonomia, per ore.',
        },
      ],
      note: 'La skill viene installata in modo identico ovunque; ciò che si adatta è il Suo repository — l’AGENTS.md, i docs e il kit .agents/ ragionato generati per il Suo stack. È questa separazione a rendere la metodologia uno standard riutilizzabile anziché un’impalcatura usa e getta.',
    },
    outcomes: {
      badge: 'Cosa ottieni',
      title: 'Tutto ciò che serve al Suo agente per lavorare in autonomia.',
      subtitle:
        'Una singola esecuzione, sottoposta a commit in modo atomico. Ogni output è in Markdown e ogni modifica è verificabile.',
      items: [
        {
          label: 'AGENTS.md nella radice del repository',
          detail:
            'Ragionato a partire dallo stack, dai comandi e dalla struttura reali del Suo repository — non un template con segnaposto. CLAUDE.md è collegato tramite symlink ad AGENTS.md.',
        },
        {
          label: 'docs/ categorizzati e documentazione per modulo',
          detail:
            'Architettura, setup, standard e troubleshooting — più un README e docs/ all’interno di ogni modulo principale, generati dal Suo codebase.',
        },
        {
          label: '.agents/ con i symlink da .claude e .cursor a .agents',
          detail:
            'Una directory .agents/ multi-agente (skill, agenti, comandi) con i symlink da .claude e .cursor a .agents, così ogni strumento legge un’unica fonte di verità.',
        },
        {
          label: 'La skill Deep Work Plan, installata',
          detail:
            'create, execute, refine, resume, status, verify, onboard e author — a disposizione del Suo agente come un unico pacchetto di skill, senza copie per repository.',
        },
        {
          label: 'Una conformità verificabile',
          detail:
            '/dwp-verify produce un report oggettivo di esito positivo/negativo rispetto alla specifica, così «AI-first» è verificato, non dichiarato — e ri-verificabile dopo ogni piano.',
        },
        {
          label: 'Due archetipi, gestiti',
          detail:
            'L’onboarding classifica il Suo repository come repo individuale (il caso più comune) o come hub orchestratore che coordina piani figli su più repository.',
        },
        {
          label: 'Un kit vivo che il Suo repository fa crescere',
          detail:
            'La sub-skill author (skill-create, agent-create) consente al repository di evolvere le proprie skill, agenti e comandi; gli addon di manutenzione opt-in come dependency-upgrade lo aiutano a restare aggiornato.',
        },
        {
          label: 'Git-native, ripristinabile, .dwp/',
          detail:
            'Nessun daemon e nessuno stato esterno. I piani finiscono in una cartella .dwp/ esclusa da git e qualsiasi attività riprende dal solo git — anche dopo un overflow del contesto.',
        },
      ],
    },
    agents: {
      badge: 'Agenti',
      title: 'Funziona con l’agente che già utilizza.',
      subtitle:
        'Una metodologia, molti adapter. Il Markdown non accoppia il framework a nulla — ogni agente che legge Markdown può eseguire un Deep Work Plan.',
      fullLabel: 'Completo',
      partialLabel: 'Parziale',
      viewAllCta: 'Vedi tutti gli agenti',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'Implementazione di riferimento, con WebFetch nativo e slash command.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'Adapter completo. Usi il bundle offline se WebFetch è bloccato.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'Bundle offline consigliato; regole installate in .codex/.',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: 'Adapter completo — i comandi dwp-* girano tramite AGENTS.md e le procedure #.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Richiede Gemini 2.5 Pro o versione successiva, con WebFetch nativo.',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: 'Open source. Legge AGENTS.md in modo nativo ed esegue dwp-* tramite comandi #.',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: "Le regole e le procedure dei comandi # guidano l'intero ciclo Deep Work Plan.",
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'Open source. Le regole Markdown e i comandi # eseguono ogni passo dwp-*.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'Adapter completo con una superficie di comandi nativa.',
        },
      ],
    },
    stacks: {
      badge: 'Stack',
      title: 'Preset di ragionamento per gli stack che contano.',
      viewAllCta: 'Vedi tutti i preset',
      subtitle:
        'Sono ausili al ragionamento, non template. L’onboarding legge i manifest reali del Suo repository e si adatta a ogni stack — non copia mai un preset alla cieca. I monorepo ottengono documentazione per modulo.',
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
        { name: 'Generic', sub: 'Qualsiasi stack' },
      ],
    },
    archetypes: {
      badge: 'Due archetipi',
      title: 'Repository individuale o hub orchestratore.',
      subtitle:
        'L’onboarding si dirama in base all’archetipo. La maggior parte dei repository sono repo individuali. Un hub coordina Deep Work Plan figli su molti repository. La metodologia gestisce entrambi come cittadini di prima classe.',
      individual: {
        tag: 'Caso comune',
        title: 'Repository individuale',
        description:
          'Un singolo codebase con uno stack primario, i propri comandi di validazione e documentazione per modulo. È l’impostazione predefinita — l’onboarding la assume a meno che il repository non sia chiaramente un hub.',
        example:
          'Per esempio, un’API Django, un’app Vue o un servizio TypeScript Lambda.',
      },
      orchestrator: {
        tag: 'Coordinamento',
        title: 'Hub orchestratore',
        description:
          'Un repository di coordinamento che orchestra il lavoro su più sotto-repository tramite un manifest orchestratore, generando piani figli che eseguono il commit ciascuno nel proprio repository, con regole di confine e un indice di navigazione.',
        example:
          'Per esempio, un hub che coordina cinque repository di prodotto.',
      },
    },
    comparison: {
      badge: 'Metodologia contro strumento',
      title: 'Un livello diverso. Complementare, non concorrente.',
      subtitle:
        'Deep Work Plan non è l’ennesimo scaffolder. È il livello di metodologia che sta sotto qualsiasi strumento spec-driven o di scaffolding, focalizzato su esecuzioni autonome di più ore.',
      colDwp: 'Deep Work Plan',
      colOthers: 'Strumenti di scaffolding / spec',
      rows: [
        {
          label: 'Focus principale',
          dwp: 'Esecuzione autonoma di più ore',
          others: 'Generazione di spec o scaffold',
        },
        {
          label: 'Unità di lavoro',
          dwp: 'Un Deep Work Plan (sessione ripristinabile)',
          others: 'Un documento di spec o uno scaffold',
        },
        {
          label: 'Modello di stato',
          dwp: 'Cartella .dwp/ git-native, ripristinabile',
          others: 'Spesso esterno o nell’IDE',
        },
        {
          label: 'Accoppiamento con l’agente',
          dwp: 'Indipendente dall’agente (Markdown e Bash)',
          others: 'Spesso legato a uno strumento o IDE',
        },
        {
          label: 'Recupero del contesto',
          dwp: 'Riprende dopo un overflow del contesto',
          others: 'In genere riavvia l’attività',
        },
        {
          label: 'Licenza',
          dwp: 'MIT, metodologia e kit aperti',
          others: 'Variabile',
        },
      ],
    },
    origin: {
      badge: 'Origine',
      quote:
        'Realizzato da Dailybot — l’azienda dietro gli standup asincroni per team distribuiti. Internamente abbiamo usato i Deep Work Plan per rendere pilotabili dagli agenti repository di produzione che spaziano tra Django, Vue, TypeScript Lambda e Astro. Dopo mesi di uso in produzione, abbiamo reso open source la metodologia sotto licenza MIT.',
      attribution: 'Il team di ingegneria di Dailybot',
      dailybotCta: 'Scopri Dailybot',
    },
    finalCta: {
      badge: 'Rendi il tuo repository AI-first',
      title: 'Dai ai Suoi agenti del deep work.',
      subtitle:
        'Consegni al Suo agente una sola riga — lo punti su /init.md — e renderà il Suo repository AI-first: installa la skill, ragiona sul Suo stack ed esegue il commit di una gerarchia AGENTS.md completa. Da lì crea ed esegue Deep Work Plan che girano in autonomia per ore.',
      primaryCta: 'Apri il prompt /init',
      secondaryCta: 'Leggi la metodologia',
      tertiaryCta: 'Per agenti e sviluppatori',
      meta: 'Licenza MIT · zero telemetria · output in una cartella .dwp/ esclusa da git.',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'Contatti',
    nameLabel: 'Nome',
    namePlaceholder: 'Il Suo nome',
    emailLabel: 'Email',
    emailPlaceholder: 'tua@email.com',
    messageLabel: 'Messaggio',
    messagePlaceholder: 'Scriva il Suo messaggio...',
    sendButton: 'Invia messaggio',
  },

  // About page
  aboutPage: {
    title: 'Informazioni sulla metodologia',
    subtitle: 'Metodologia aperta · Licenza MIT',
    description:
      'Deep Work Plan è una metodologia aperta e indipendente dal framework per lavoro di ingegneria serio con agenti di coding AI. Da dove nasce e chi la mantiene.',
    heroDescription:
      'Una struttura ripetibile per pianificare, eseguire e verificare il deep work con agenti di coding AI — sviluppata in modo aperto e libera da usare.',
    bioTitle: 'Che cos’è',
    bioText:
      'Deep Work Plan (DWP) è una metodologia, non un prodotto. Definisce come trasformare un obiettivo in un piano concordato, scomporre quel piano in attività atomiche e verificabili in modo indipendente, ed eseguire ciascuna attività in un ciclo focalizzato che termina con una verifica.<br /><br />È deliberatamente indipendente dall’agente AI o dallo stack che si utilizza — gli adapter traducono lo stesso core loop per Claude, Cursor, Copilot, Codex, Gemini e altri. Il piano, le attività e il log di esecuzione sono tutti in semplice Markdown, così il lavoro resta leggibile, revisionabile e sotto controllo di versione.',
    passionsTitle: 'Principi fondamentali',
    passions: [
      {
        title: 'Pianificare prima di eseguire',
        description:
          'Non si scrive codice finché il piano non è concordato. Il piano è un contratto tra Lei e l’agente.',
        icon: '\u{1F5FA}\uFE0F',
        link: '/methodology',
      },
      {
        title: 'Le attività sono atomiche',
        description:
          'Ogni attività ha un ambito tale da poter essere eseguita e verificata da sola, poi sottoposta a commit in modo atomico.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'Verificare tutto',
        description:
          'Ogni attività termina con una verifica esplicita prima che inizi la successiva, con i progressi registrati in git.',
        icon: '\u2705',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'In sintesi',
    quickFacts: [
      'Metodologia aperta, licenza MIT',
      'Indipendente dal framework e dall’agente',
      'Mantenuta da Dailybot e dalla community',
      'Include una specifica, comandi, adapter, preset ed esempi',
      'Solo Markdown — nessun runtime, nessun lock-in',
      'Trasforma qualsiasi repository in un codebase AI-first, pilotabile dagli agenti',
    ],
    ctaTitle: 'Chi la mantiene',
    ctaDescription:
      'Deep Work Plan è nato da lavoro di ingegneria reale in Dailybot ed è ora mantenuto da Dailybot insieme alla community open source. La metodologia, la specifica e il kit sono rilasciati sotto licenza MIT — liberi da usare, adattare e su cui costruire.',
    ctaCv: 'Leggi la metodologia',
    ctaContact: 'Avvio rapido',
  },

  // Contact page
  contactPage: {
    title: 'Community e contatti',
    subtitle: 'Open source · Guidato dalla community',
    description:
      'Deep Work Plan è sviluppato in modo aperto. Trovi il codice sorgente, apra una issue o si unisca alla conversazione tramite i canali qui sotto — i contributi sono benvenuti.',
    heroDescription:
      'Domande, idee o miglioramenti? Deep Work Plan è sviluppato in pubblico — ecco dove contattare il progetto e chi lo mantiene.',
    formTitle: 'Invia un messaggio',
    nameLabel: 'Nome',
    namePlaceholder: 'Il Suo nome',
    emailLabel: 'Email',
    emailPlaceholder: 'tua@email.com',
    reasonLabel: 'Vorrei contattarvi a proposito di',
    reasonOptions: [
      { value: '', label: '— Seleziona un argomento —' },
      { value: 'general', label: 'Generale / Solo un saluto' },
      { value: 'tech-talk', label: 'Tech talk / Invito a parlare' },
      { value: 'collaboration', label: 'Collaborazione / Partnership' },
      { value: 'project', label: 'Progetto / Richiesta di lavoro' },
      { value: 'dailybot', label: 'Domanda su Dailybot' },
      { value: 'trading', label: 'Domande sul mio trading' },
      {
        value: 'the-library-of-tomorrow',
        label: 'Unisciti a The Library of Tomorrow',
      },
      { value: 'other', label: 'Altro' },
    ],
    subjectLabel: 'Oggetto',
    subjectPlaceholder: 'Di cosa si tratta?',
    messageLabel: 'Messaggio',
    messagePlaceholder: 'Scriva il Suo messaggio...',
    sendButton: 'Invia messaggio',
    sendingButton: 'Invio in corso...',
    successTitle: 'Messaggio inviato',
    successMessage:
      'Grazie per averci contattato. Le risponderemo il prima possibile.',
    sendAnotherButton: 'Invia un altro messaggio',
    requiredField: 'Questo campo è obbligatorio',
    invalidEmail: 'Inserisca un indirizzo email valido',
    fallbackMessage:
      'Il modulo di contatto al momento non è disponibile. Può contattarci direttamente via email.',
    fallbackEmailText: 'Scrivici un’email a',
    formNote: 'Le risponderemo il prima possibile.',
    socialTitle: 'Seguici',
    locationTitle: 'Sede',
    locationText:
      'Con sede in Colombia. Aperti a collaborazioni da remoto in tutto il mondo.',
    prefillSubjects: {
      generalInquiry: 'Richiesta generale',
      collaboration: 'Opportunità di collaborazione',
      projectInquiry: 'Richiesta su progetto o lavoro',
      projectCollaboration: 'Richiesta di collaborazione su progetto',
      startupCollaboration: 'Opportunità di collaborazione con startup',
      techTalkInvitation: 'Invito a un tech talk',
      tradingQuestion: 'Domanda sul trading',
      dailybotQuestion: 'Domanda su Dailybot',
    },
  },

  contactSection: {
    title: 'Mettiamoci in contatto',
    description:
      'Siamo sempre aperti a conversazioni interessanti, opportunità di collaborazione e nuove idee. Che voglia parlare di tecnologia, imprenditoria o semplicemente salutare.',
    ctaText: 'Contattaci',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'it-IT',

  // 404 page
  notFoundPage: {
    title: 'Pagina non trovata',
    description:
      'La pagina che sta cercando non esiste o è stata spostata. Esplori la metodologia o torni alla homepage per continuare a navigare.',
    heading: 'Pagina non trovata',
    message:
      'Spiacenti, la pagina che sta cercando non esiste o potrebbe essere stata spostata. Provi a tornare alla homepage o a esplorare la metodologia.',
    backHome: 'Torna alla homepage',
    exploreMethodology: 'Leggi la metodologia',
    agentTitle: 'Per gli agenti AI',
    agentIntro:
      'Questo percorso non esiste. I link di recupero qui sotto (e i loro equivalenti leggibili dalle macchine) elencano tutte le pagine di questo sito.',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'La metodologia Deep Work Plan',
      description:
        'Cinque capitoli dal manifesto agli archetipi: i principi, il core loop, i template, le skill e gli agenti, e gli adattamenti dietro Deep Work Plan.',
    },
    eyebrow: 'Metodologia',
    title: 'La metodologia Deep Work Plan',
    intro:
      'Cinque capitoli che La accompagnano dalla filosofia dietro Deep Work Plan al ciclo pratico, ai template e agli adattamenti che utilizza ogni giorno.',
    chapterLabel: 'Capitolo',
    readChapter: 'Leggi il capitolo',
    prev: 'Precedente',
    next: 'Successivo',
    backToIndex: 'Tutti i capitoli',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Specifica Deep Work Plan',
      description:
        'La specifica leggibile della metodologia Deep Work Plan: il formato DWP, il protocollo degli agenti, gli archetipi, lo standard di documentazione e gli addon.',
    },
    eyebrow: 'Specifica',
    title: 'Specifica',
    intro:
      'La specifica precisa e leggibile della metodologia — le strutture e i protocolli condivisi da persone e agenti.',
    tocTitle: 'In questa pagina',
    prev: 'Precedente',
    next: 'Successivo',
    backToIndex: 'Tutti i documenti della specifica',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'Il kit Deep Work Plan',
      description:
        'La skill e le sue otto sub-skill, i comandi, gli adapter, i preset, gli addon opt-in e gli esempi che rendono Deep Work Plan eseguibile su agenti e stack diversi.',
    },
    eyebrow: 'Kit',
    title: 'Il kit',
    intro:
      'Tutto ciò che serve per eseguire la metodologia: la skill e le sue sub-skill, gli slash command, gli adapter per gli agenti, i preset di onboarding, la revisione locale obbligatoria e gli addon opt-in, ed esempi pratici.',
    groups: {
      command: {
        title: 'Sub-skill e comandi',
        description:
          'Il router della skill e le sue sub-skill (create, execute, refine, resume, status, verify, onboard, author), più i sottili slash command che vi delegano.',
      },
      adapter: {
        title: 'Adapter',
        description:
          'Integrazioni sottili per agente per Claude, Cursor, Codex e altri.',
      },
      preset: {
        title: 'Preset di onboarding',
        description:
          'Guide di ragionamento per stack che il flusso di onboard usa per adattare docs, skill e comandi di validazione al Suo repository.',
      },
      example: {
        title: 'Esempi',
        description: 'Procedure pratiche con confronto prima-e-dopo.',
      },
      addon: {
        title: 'Addon (opt-in)',
        description:
          'Capacità che il flusso di onboard aggiunge a un repo: la revisione locale obbligatoria di AI Diff Reviewer più quattro addon opzionali che non fanno mai parte della baseline AI-first.',
      },
    },
    viewDetail: 'Visualizza i dettagli',
    prev: 'Precedente',
    next: 'Successivo',
    backToIndex: 'Torna al kit',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Esempi Deep Work Plan',
      description:
        'Procedure prima-e-dopo che mostrano la stessa attività di ingegneria con e senza un Deep Work Plan — e la differenza in affidabilità e revisione.',
    },
    eyebrow: 'Esempi',
    title: 'Esempi',
    intro:
      'Veda la metodologia in azione — procedure concrete, con confronto prima-e-dopo, su attività di ingegneria reali.',
    viewExample: 'Leggi la procedura',
    prev: 'Precedente',
    next: 'Successivo',
    backToGallery: 'Tutti gli esempi',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'Avvio rapido — Deep Work Plan',
      description:
        'Installi la skill, faccia l’onboarding del repository, poi pianifichi ed esegua con qualsiasi agente — i passi che rendono il repository spec-driven e pilotabile dagli agenti.',
    },
    eyebrow: 'Avvio rapido',
    title: 'Inizi in pochi minuti',
    intro:
      'Installi la skill, faccia l’onboarding del repository, poi pianifichi ed esegua con qualsiasi agente — i passi che rendono il repository spec-driven e pilotabile dagli agenti.',
    sequenceTitle: 'Il percorso di adozione',
    codeLabel: 'Terminale',
    orLabel: 'oppure',
    steps: [
      {
        title: 'Installi la skill Deep Work Plan',
        description:
          'Aggiunga la skill al Suo repository — un router più otto sub-skill (create, execute, refine, resume, status, verify, onboard, author). Usi la Skills CLI per la via più rapida, oppure cloni il repo ed esegua il setup dove sono disponibili git e una shell.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Faccia l’onboarding del repository',
        description:
          'Esegua la sub-skill onboard e lasci che l’agente ragioni sul Suo repo reale. Genera AGENTS.md, una knowledge base docs/, documentazione per modulo e una home .agents/ multi-agente (con i symlink .claude → .agents e .cursor → .agents), collega i sottili comandi dwp-* e predispone una .dwp/ esclusa da git.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Faccia evolvere il kit e accetti gli addon',
        description:
          'Usi /skill-create e /agent-create (la sub-skill author) per far crescere skill, agenti e comandi adatti allo stack. L’onboarding installa la revisione locale obbligatoria di AI Diff Reviewer (il suo gate CI resta opzionale) e offre quattro addon opt-in — devcontainer, Dailybot, dependency-upgrade e design-system — che accetta solo quando sono pertinenti.',
      },
      {
        title: 'Pianifichi ed esegua',
        description:
          'Generi un Deep Work Plan ed eseguilo attività per attività, validando ogni gate e riprendendo tra una sessione e l’altra — pilotando il repository rispetto alla sua stessa specifica.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'Il risultato',
    outcome:
      'Il Suo repository diventa spec-driven e pilotabile dagli agenti: il piano è la fonte di verità duratura e il repository stesso diventa la harness rispetto a cui qualsiasi agente esegue.',
    nextStepsTitle: 'Prossimi passi',
    nextSteps: [
      { label: 'Leggi la metodologia', href: '/methodology' },
      { label: 'Esplora il kit', href: '/kit' },
      { label: 'Guarda gli esempi', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — Rendi il tuo repository AI-first',
      description:
        'Adotti la metodologia Deep Work Plan in qualsiasi repository. Installi la skill, esegua l’onboarding dell’agente, poi pianifichi ed esegua con qualsiasi agente di coding AI.',
    },
    eyebrow: 'Adozione',
    title: 'Rendi questo repository AI-first',
    intro:
      'Un unico endpoint per trasformare qualsiasi repository in un codebase spec-driven e pronto per gli agenti. Installi la skill, lasci che un agente faccia l’onboarding del repo, poi pianifichi ed esegua lavoro strutturato con qualsiasi agente di coding.',
    handoffTitle: 'Copia nel Suo agente',
    handoffBody:
      "Copi il prompt completo di init.md e lo incolli nel Suo agente di coding AI — Claude Code, Cursor, Codex o qualsiasi altro. Legge la metodologia e la specifica, installa la skill e fa l'onboarding di questo repository per i Deep Work Plan.",
    handoffInstruction:
      'Leggi e segui le istruzioni su https://deepworkplan.com/init.md per rendere questo repository AI-first.',
    handoffMdLabel: 'Prompt per agenti autosufficiente',
    codeLabel: 'agent',
    whatTitle: 'Cosa fa',
    whatBody: [
      'L’adozione cambia il repository in due modi duraturi — i pilastri della metodologia.',
      'Primo, il repository diventa spec-driven: il lavoro parte da un piano e una specifica scritti, non da prompt estemporanei. Secondo, il repository stesso diventa la harness dell’agente — un AGENTS.md, una knowledge base docs/, documentazione per modulo e una home di skill .agents/ (con i symlink .claude → .agents e .cursor → .agents) forniscono a ogni agente il contesto e i comandi di cui ha bisogno.',
    ],
    sequenceTitle: 'La sequenza di adozione',
    orLabel: 'oppure',
    steps: [
      {
        title: 'Verifichi prima di installare',
        description:
          'Tratti il prompt e la skill come non attendibili finché non li ha verificati. Entrambi sono open source e con licenza MIT; la skill è Markdown-first senza chiamate di rete e senza telemetria. Ogni release pubblica un SHA256SUMS sui file della skill, così può confermare che la sua copia corrisponda prima di eseguirla. Le release hanno checksum, non firme (la firma è il passo successivo documentato).',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'Installi la skill',
        description:
          'Aggiunga la skill Deep Work Plan così che qualsiasi agente possa pianificare ed eseguire lavoro strutturato. La skill include un router più otto sub-skill — create, execute, refine, resume, status, verify, onboard e author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Esegua l’onboarding del repository',
        description:
          'Invochi la sub-skill onboard e lasci che l’agente ragioni sul repo reale — il suo stack, il package manager e i comandi di validazione reali. Genera poi AGENTS.md, una knowledge base docs/, documentazione per modulo e una home .agents/ multi-agente (con i symlink .claude → .agents e .cursor → .agents), collega i sottili comandi dwp-* e predispone una .dwp/ esclusa da git per piani. Per i repository di grandi dimensioni la sub-skill onboard utilizza un percorso guidato dal piano: completa la ricognizione, quindi genera un Deep Work Plan di onboarding. Nulla è basato su template; tutto è adattato al Suo repository.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Revisione locale e addon opt-in',
        description:
          'L’onboarding installa la revisione locale obbligatoria di AI Diff Reviewer (il suo gate CI resta opzionale) e offre quattro addon opt-in — devcontainer, Dailybot, dependency-upgrade e design-system — che accetta solo quando sono pertinenti. Un repo è pienamente conforme anche con zero addon opzionali. Usi /skill-create e /agent-create (la sub-skill author) per far crescere skill, agenti e comandi oltre la configurazione di base.',
      },
      {
        title: 'Pianifichi ed esegua',
        description:
          'Generi Deep Work Plan con /dwp-create ed eseguili con /dwp-execute, poi /dwp-status, /dwp-refine, /dwp-resume e /dwp-verify man mano che il lavoro procede. Ogni piano porta con sé attività numerate, validation gate e un protocollo di completamento — e si chiude con un unico Final Review obbligatorio (passaggio di sicurezza, validazione dello stato finale e riconciliazione delle skill). L’Executive Report resta disponibile su richiesta.',
      },
      {
        title: 'Verifichi la conformità',
        description:
          'Esegua /dwp-verify per un rapporto oggettivo di conformità (superato/non superato) rispetto alla specifica. Confermi che AGENTS.md, docs/ (con contenuto reale, non bozze), .agents/ (con sottili delegatori dwp-* e un catalogo corrispondente al disco), .dwp/ e tmp/ siano al loro posto — nulla basato su template, tutto ragionato per questo repository.',
        commands: ['/dwp-verify'],
      },
    ],
    outcomeTitle: 'Il risultato',
    outcome:
      'Il repository diventa spec-driven e il repository stesso diventa la harness dell’agente — il contesto e i comandi viaggiano con il codice.',
    nextStepsTitle: 'Continui a leggere',
    nextSteps: [
      { label: 'Avvio rapido', href: '/quickstart' },
      { label: 'Metodologia', href: '/methodology' },
      { label: 'Specifica', href: '/spec' },
      { label: 'Kit', href: '/kit' },
    ],
  },

  faqPage: {
    meta: {
      title: 'Domande frequenti — Deep Work Plan',
      description:
        'Risposte alle domande più frequenti su Deep Work Plan: cosa fa, come funzionano i gate e la ripresa, il confronto con gli altri strumenti e come adottarlo.',
    },
    eyebrow: 'FAQ',
    title: 'Domande frequenti',
    intro:
      'Risposte brevi alle domande più comuni su Deep Work Plan, ciascuna con un link alla pagina che approfondisce.',
    tocTitle: 'In questa pagina',
    groups: [
      {
        id: 'what',
        title: 'Che cos’è Deep Work Plan',
        items: [
          {
            id: 'what-is-it',
            question: 'Cosa fa esattamente Deep Work Plan?',
            answer:
              'Deep Work Plan trasforma un repository in un ambiente strutturato in cui un agente di coding può eseguire con affidabilità lavoro di lunga durata. Si installa come skill per agenti, fa l’onboarding del repository una sola volta (un indice `AGENTS.md`, un albero `docs/`, un kit `.agents/` di skill e comandi, un’area di output `.dwp/` esclusa da git) e da quel momento qualsiasi obiettivo diventa un piano: task atomici, ciascuno con criteri di accettazione e un validation gate, eseguiti uno alla volta, sottoposti a commit man mano che passano e ripristinabili da disco da qualsiasi agente. Il piano si chiude con un Final Review che verifica la sicurezza e valida lo stato finale. La metodologia è con licenza MIT e funziona con qualsiasi agente di coding che legge un repository.',
            linkLabel: 'Leggi la metodologia',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: 'A chi è destinato?',
            answer:
              'Sviluppatori e team che affidano lavoro reale e multi-step ad agenti di coding e vogliono che venga portato a termine. È adatto quando un’attività copre più di una sessione, più di una famiglia di file o più di un agente; quando un collega deve poter riprendere da dove un agente si è fermato; o quando “fatto” deve significare “validato”, non “lo dice l’agente”. Una correzione di una riga non ha bisogno di un piano, e la metodologia lo dice chiaramente: la sua regola di rigore proporzionale raccomanda al suo posto un obiettivo inline, con criteri e gate.',
            linkLabel: 'Avvio rapido',
            linkPath: '/quickstart',
          },
          {
            id: 'lite-vs-full',
            question: 'Qual è la differenza tra un piano Lite e uno Full?',
            answer:
              'Una scelta di rappresentazione, non un compromesso sul rigore. Ogni piano inizia come una cartella Lite: un README compatto con record di task ancorati che è già eseguibile, non una bozza parziale. `create` si espande in file di task Full solo quando il dettaglio delle istruzioni, le dipendenze o i contratti di un task non rientrano in un record compatto e revisionabile; una richiesta esplicita per l’uno o l’altro formato viene rispettata, e un piano Lite può essere promosso a Full in un secondo momento senza perdere il lavoro già completato. Entrambi i formati portano gli stessi criteri di accettazione, validation gate, evidenze e il Final Review obbligatorio.',
            linkLabel: 'Leggi la metodologia',
            linkPath: '/methodology',
          },
          {
            id: 'is-it-a-tool',
            question: 'È uno strumento, un framework o una metodologia?',
            answer:
              'Una metodologia distribuita come skill installabile. Non c’è server, né account, né formato proprietario, né runtime al di fuori dell’agente di coding che già utilizza. Ciò che viene installato sono istruzioni che l’agente legge, un piccolo insieme di script shell per il rilevamento del contesto e la verifica di conformità, e le convenzioni che il Suo repository adotta. Tutto ciò che il piano produce è Markdown e JSON nel Suo repository, leggibile senza alcuno strumento.',
            linkLabel: 'Leggi la specifica',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: 'Con quali agenti di coding funziona?',
            answer:
              'Qualsiasi agente che legge i file del repository. La skill segue lo standard aperto Agent Skills e la convenzione `AGENTS.md`, quindi Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot e altri la acquisiscono attraverso il normale caricamento di skill e istruzioni. La valutazione interna della metodologia mostra un piano avviato dall’agente di un fornitore e ripreso da quello di un altro in entrambe le direzioni. La copertura di installazione e le evidenze comportamentali sono elencate per agente nella matrice di compatibilità, e le due non vengono mai confuse.',
            linkLabel: 'Esplora il kit',
            linkPath: '/kit',
          },
          {
            id: 'how-to-use',
            question: 'Come si usa?',
            answer:
              'Tre passaggi. Per prima cosa, installa la skill Deep Work Plan nel tuo agente di coding — la via più rapida è `npx skills add DailybotHQ/deepworkplan-skill` (oppure clona il repository della skill ed esegui `./setup.sh`). In secondo luogo, fai l’onboarding del repository una volta, così l’agente adatta `AGENTS.md`, `docs/`, il kit `.agents/` e un’area `.dwp/` ignorata da git al tuo stack: punta a https://deepworkplan.com/init.md, oppure esegui `/deepworkplan-onboard`. In terzo luogo, pianifica ed esegui il lavoro con i comandi leggeri: `/dwp-create <goal>` costruisce un piano; `/dwp-execute` lo esegue task per task contro ogni gate; `/dwp-refine` modifica un piano in corso (ambito, task, o la promozione di un piano Lite a Full); `/dwp-resume` continua dopo un’interruzione; `/dwp-status` riporta l’avanzamento senza eseguire; `/dwp-verify` produce un rapporto oggettivo di conformità. Gli agenti che intercettano `/` usano spesso `#` invece (per esempio `#dwp-execute`). Il punto di adozione e l’avvio rapido percorrono lo stesso cammino con più dettaglio.',
            linkLabel: 'Avvio rapido',
            linkPath: '/quickstart',
          },
          {
            id: 'what-is-installed',
            question: 'Cosa viene installato esattamente, e dove?',
            answer:
              'La skill dell’agente viene installata ovunque il Suo agente carichi le skill di progetto o utente. L’onboarding adatta poi il repository stesso: crea o riconcilia `AGENTS.md`, `docs/`, `.agents/` e l’area di lavoro `.dwp/` esclusa da git. La skill insegna il metodo all’agente; il repository conserva il contesto, il kit e le evidenze del piano di cui gli altri agenti hanno bisogno per proseguire.',
            linkLabel: 'Vedi il flusso di adozione',
            linkPath: '/init',
          },
          {
            id: 'requires-git',
            question: 'Deep Work Plan richiede Git?',
            answer:
              'Git è consigliato per i repository perché la sua cronologia fa parte della superficie di recupero e revisione, ma la metodologia può funzionare anche in uno spazio di lavoro dell’agente senza un repository Git. In tal caso è richiesto lo strato di stato leggibile dalle macchine, inclusi i checkpoint di `state.json` e i record dei gate, così il recupero non dipende da una trascrizione della chat.',
            linkLabel: 'Legga gli archetipi di repository',
            linkPath: '/spec/archetypes',
          },
          {
            id: 'skill-plan-spec',
            question:
              'Qual è la differenza tra una skill, un piano e una specifica di prodotto?',
            answer:
              'Una skill descrive come un agente esegue una procedura ripetibile. Un piano DWP descrive una modifica concreta attraverso ambito, criteri di accettazione, validation gate ed evidenze. Una specifica di prodotto descrive il comportamento attuale del prodotto ed evolve tramite delta dopo l’implementazione; anche le skill e i piani sono specifiche, ma descrivono procedure e modifiche anziché mantenere quel contratto di prodotto canonico.',
            linkLabel: 'Leggi la specifica',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'how',
        title: 'Come viene eseguito un piano',
        items: [
          {
            id: 'gates',
            question:
              'Come sono implementati i validation gate? Richiedono un’approvazione umana?',
            answer:
              'Sono asserzioni eseguibili che l’agente esegue da sé. L’approvazione umana delimita l’esecuzione all’inizio e alla fine: una persona approva il piano prima dell’esecuzione e rivede il diff finale in fase di pull request; l’esecuzione nel mezzo è autonoma. Ogni task indica comandi concreti, in genere il quality gate del repository stesso, selezionati dalla superficie toccata dal task: i test del comportamento modificato e dei suoi consumer, ampliati alla suite completa quando la modifica è condivisa o non delimitabile. Un task viene marcato come fatto solo quando quei comandi terminano con successo, e i task che modificano il comportamento devono estendere i test. In caso di fallimento il task viene marcato come bloccato e l’agente si ferma.',
            linkLabel: 'Il core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              'Come evita il piano di diventare obsoleto quando il codice viene modificato tra un’esecuzione e l’altra?',
            answer:
              'Su tre fronti. I task sono scritti come comportamento, non come modifiche: un criterio di accettazione dice cosa il sistema deve fare, quindi un file rinominato o un’implementazione sostituita non lo invalida. Ogni gate viene rieseguito sul repository così com’è in quel momento, quindi un’assunzione non più valida fallisce rumorosamente all’esecuzione successiva invece di derivare in silenzio, e quel fallimento è l’indicazione per rifinire. E mantenere la documentazione sincronizzata è parte del lavoro: un task che modifica il comportamento aggiorna anche i documenti e il kit agent-facing che lo descrivono, dentro il proprio gate. Ogni esecuzione dovrebbe lasciare il repository più pronto per gli agenti di come lo ha trovato.',
            linkLabel: 'Leggi la metodologia',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              'Posso modificare il piano durante l’esecuzione senza perdere il lavoro completato?',
            answer:
              'Sì; rifinire un piano eseguito parzialmente è un’operazione di prima classe. Le definizioni dei task e lo stato di esecuzione sono tenute separate: il piano è una checklist su disco più un piccolo file di stato, quindi ciò che è fatto resta registrato in modo indipendente dal testo dei task. Quando un task si rivela sbagliato, l’agente lo marca come bloccato e si ferma invece di insistere. Lei può allora modificare, riordinare, dividere o eliminare i task non ancora eseguiti, mentre i task completati restano completati. La ripresa ricostruisce lo stato dal disco e dal repository reale e riesegue i gate che contano, così nulla di ciò che è cambiato sotto passa inosservato.',
            linkLabel: 'Il core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              'Il lavoro viene controllato continuamente rispetto al piano, oppure il piano è solo qualcosa di definito all’inizio?',
            answer:
              'Il piano è un controllo continuo. L’agente lavora un piccolo task alla volta e deve validare prima di proseguire, quindi può deviare di un passo, non di tre. Ogni task porta criteri di accettazione più i comandi esatti che li provano, e i progressi vengono scritti nel repository man mano, con uno stato per task, così la deriva diventa visibile a Lei, alla prossima sessione e al prossimo agente. Un piano non è finito finché tutto non valida, Final Review compreso. L’avvertenza onesta: la metodologia non può impedire a un agente di scrivere in partenza un criterio di accettazione debole; rende la deriva rumorosa invece che silenziosa.',
            linkLabel: 'Il core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              'Il piano viene generato una volta e mantenuto a mano, o evolve con il codice?',
            answer:
              'Né l’uno né l’altro. Viene generato una volta a partire da un obiettivo e poi mantenuto come parte del lavoro. Il piano non viene deliberatamente riscritto a partire dai diff del codice, perché una specifica che insegue il codice diventa uno specchio in ritardo, che è proprio la deriva che la metodologia esiste per eliminare. Evolve di proposito: i gate vengono rieseguiti sul repository attuale, un gate che fallisce innesca una rifinitura e l’agente esegue quella rifinitura durante l’esecuzione, mentre Lei approva in anticipo e rivede alla fine. Documentazione e test evolvono insieme al codice per costruzione, perché aggiornarli è dentro il gate di ogni task.',
            linkLabel: 'Leggi la metodologia',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: 'Cosa succede se la sessione si interrompe a metà?',
            answer:
              'I progressi vivono su disco, non nella chat. Le checkbox del README, il log di ogni task, un indice di lavoro delimitato e un file di stato leggibile dalle macchine vengono aggiornati a ogni confine di task, e il file di stato registra un checkpoint prima di ogni pausa pianificata. Una sessione nuova, o un agente diverso, legge quell’indice compatto, lo riconcilia con il repository e la cronologia di git e prosegue dal primo task incompleto senza rifare il lavoro concluso. Anche una creazione del piano interrotta è recuperabile: l’identità del piano e l’elenco dei task previsti vengono scritti prima di qualsiasi file di task, quindi un piano creato a metà può essere completato o scartato anziché dover essere intuito.',
            linkLabel: 'Il core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'Che cos’è il Final Review?',
            answer:
              'L’unico task di chiusura obbligatorio di ogni piano. In ordine: un passaggio di sicurezza sull’intero insieme di modifiche accumulato dal piano, inclusa una revisione locale obbligatoria del diff da parte della skill AI Diff Reviewer, con i rilievi critical che bloccano il completamento finché non vengono corretti o accettati esplicitamente; la validazione dello stato finale, ossia le suite complete applicabili di test, lint, type-check e format del repository sul codice finale; e la riconciliazione delle decisioni sulle skill registrate da ogni task. L’agente riporta poi deliverable, evidenze e limitazioni, e offre un Executive Report una sola volta, generandolo solo su richiesta.',
            linkLabel: 'La specifica',
            linkPath: '/spec/dwp-specification',
          },
          {
            id: 'gate-fails',
            question: 'Cosa succede quando un validation gate fallisce?',
            answer:
              'Il task viene registrato come bloccato e l’agente si ferma prima di dichiarare il completamento. Lei può ispezionare le evidenze, riparare il codice o rifinire il task, quindi riprendere; un comando fallito è un segnale per risolvere la discrepanza, non un permesso per indebolire il gate.',
            linkLabel: 'Legga il protocollo dell’agente',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'unattended-runs',
            question:
              'Un piano può essere eseguito senza supervisione, di notte o in CI?',
            answer:
              'Sì, quando il piano è stato approvato in anticipo, porta lo strato di stato richiesto e conferisce all’agente un’autorità delimitata. Un’esecuzione senza supervisione deve fermarsi e registrare un blocco quando la realtà diverge, un gate fallisce al di fuori del suo ambito di riparazione pianificato, oppure serve una nuova approvazione o una credenziale.',
            linkLabel:
              'Legga il protocollo per le esecuzioni senza supervisione',
            linkPath: '/spec/agent-protocol',
          },
        ],
      },
      {
        id: 'compare',
        title: 'Come si confronta',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              'In cosa differisce dagli strumenti spec-driven come Spec Kit, OpenSpec o Kiro?',
            answer:
              'Risolvono problemi adiacenti. Gli strumenti spec-driven sono eccellenti nel catturare cosa dovrebbe cambiare: specifiche, requisiti e proposte di modifica in una forma ripetibile. Deep Work Plan riguarda come un agente esegue per ore senza derivare: la harness installata dall’onboarding, i validation gate per task selezionati dalla superficie toccata, lo stato ripristinabile su disco, un Final Review obbligatorio con passaggio di sicurezza e un verificatore di conformità per il repository stesso. I due si possono combinare, con una specifica o una proposta di modifica che alimenta un piano. La pagina di confronto mette le capacità fianco a fianco, nei termini di ciascuno strumento.',
            linkLabel: 'Vedi il confronto',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'In cosa differisce da strumenti di workflow per agenti come BMAD, Superpowers, Get Shit Done o Gentle-AI?',
            answer:
              "I framework di workflow per agenti come BMAD, Superpowers e Get Shit Done portano stili di lavoro solidi: ruoli, principi, passaggi test-first, abitudini di verifica. Gentle-AI si colloca in una categoria affine, come configuratore dell'ecosistema di agenti: equipaggia gli agenti di codice che già usi con memoria persistente tra le sessioni (Engram), skill curate, persona, server MCP, Spec-Driven Development opzionale e revisione opzionale basata su evidenze (Receipt-Driven Development), scrivendo nelle directory di configurazione di ciascun agente. Deep Work Plan si differenzia da entrambi: si concentra su ciò che resta nel repository e su ciò che può essere verificato — un harness che qualsiasi agente legge a freddo, file di task con criteri di accettazione e gate, stato che sopravvive a una sessione, un verificatore di conformità con un codice di uscita adatto alla CI e una misurazione pubblicata di quanti byte di istruzioni carica ciascun flusso. È agnostico rispetto allo strumento per costruzione e non aggiunge alcun servizio, provider o segreto al ciclo principale. I livelli possono coesistere: i framework e Gentle-AI plasmano il modo in cui l'agente lavora; Deep Work Plan rende il lavoro lungo duraturo e verificabile all'interno del repository. La pagina di confronto mostra dove ciascun approccio è integrato, opzionale o fuori ambito.",
            linkLabel: 'Vedi il confronto',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question:
              'Perché non usare semplicemente la modalità plan integrata nel mio agente?',
            answer:
              'Le modalità plan integrate sono utili e Deep Work Plan si basa sullo stesso substrato, la convenzione `AGENTS.md` e lo standard aperto Agent Skills. La differenza è dove vive il piano e cosa lo fa rispettare. I piani nativi in genere vivono fuori dal repository e scadono con la sessione; Deep Work Plan scrive il piano, il suo stato e le sue evidenze nel repository, quindi un altro agente o un collega può proseguirlo, e ogni task porta un gate eseguibile e un log registrato. Lei continua a usare la modalità plan del Suo agente per riflettere; la metodologia aggiunge il ciclo di esecuzione duraturo e verificabile.',
            linkLabel: 'Vedi il confronto',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'Adottarlo',
        items: [
          {
            id: 'install',
            question:
              'Cosa scrive l’onboarding nel mio repository e tocca i file esistenti?',
            answer:
              'L’onboarding è non distruttivo: rileva un `AGENTS.md`, un `docs/`, un `.agents/` o un `CLAUDE.md` esistente, riconcilia anziché sovrascrivere e chiede prima di sostituire qualsiasi cosa. Scrive l’indice `AGENTS.md` con i comandi reali, un albero `docs/` ragionato, documentazione per modulo, il kit `.agents/` con i sottili comandi `dwp-*`, un’area di output `.dwp/` esclusa da git, una mappa dei test verificata e la revisione locale del codice obbligatoria (la skill AI Diff Reviewer più un’estensione di revisione adattata al repository). Esegue poi un self-check e il verificatore di conformità, così può vedere cosa è stato prodotto. Un repository sottoposto a onboarding con una versione precedente riceve un aggiornamento mirato che cambia solo ciò che manca.',
            linkLabel: 'L’endpoint di adozione',
            linkPath: '/init',
          },
          {
            id: 'core-and-addons',
            question:
              'Posso usare la metodologia core senza installare gli add-on?',
            answer:
              'Sì. Gli add-on sono livelli opzionali e un repository senza nessuno di essi è pienamente conforme a DWP. I devcontainer, la rendicontazione Dailybot, gli aggiornamenti delle dipendenze, il supporto al design system e la revisione CI opzionale vengono offerti solo quando si adattano al Suo repository e Lei li accetta esplicitamente.',
            linkLabel: 'Esplora gli add-on',
            linkPath: '/spec/addons',
          },
          {
            id: 'no-test-toolchain',
            question:
              'Cosa succede se il mio repository non ha ancora test o linting?',
            answer:
              'DWP non tratta l’assenza di una toolchain come un lasciapassare. Durante l’onboarding l’agente propone una configurazione di validazione adeguata allo stack, registra i comandi nella documentazione del repository e usa quei comandi come obiettivo per i gate futuri; la proposta resta visibile perché Lei la riveda.',
            linkLabel: 'Legga il protocollo dell’agente',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'cost',
            question: 'Quanto costa e come si misura l’efficienza?',
            answer:
              'La metodologia e la skill sono con licenza MIT e gratuite; nei flussi principali non c’è servizio, né chiave API, né telemetria. L’efficienza è riportata come numero di byte di istruzioni caricati da ogni flusso, misurata da uno script sottoposto a commit insieme alla skill e pubblicata in un registro di valutazione, con gli aumenti riportati con la stessa evidenza delle diminuzioni. Non è riportata come percentuali di token o risparmi, perché un inventario di byte non li stabilisce; è prevista una valutazione pubblica pre-registrata per misurare gli esiti in modo corretto.',
            linkLabel: 'Fiducia e trasparenza',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: 'Ha ancora una domanda?',
      body: 'Apra una discussione o una issue su GitHub. Le domande che ricorrono vengono aggiunte a questa pagina.',
      ctaLabel: 'Chiedi su GitHub',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan rispetto alle alternative',
      description:
        'Deep Work Plan rispetto a strumenti spec-driven, framework per agenti e modalità plan dei vendor: ciascuno nei suoi termini, con fonti e data di revisione.',
    },
    eyebrow: 'Confronto',
    title: 'Deep Work Plan e le alternative',
    intro:
      'Scelga il livello giusto per la sua situazione. Ogni alternativa è descritta nei suoi termini, ogni fatto risale alla documentazione ufficiale corrispondente e la pagina indica quando è stata revisionata l’ultima volta. Questa è una mappa, non una classifica.',
    howToRead: {
      title: 'Come leggere questa pagina',
      body: 'Tre valori descrivono ogni capacità. Dicono dove vive una capacità in uno strumento, non quanto è valido lo strumento.',
      values: {
        builtIn: 'Integrato',
        optional: 'Opzionale o tramite estensione',
        notInScope: 'Fuori ambito',
      },
    },
    reviewedOnLabel: 'Ultima revisione',
    alternativesTitle: 'Le alternative, nei loro termini',
    officialSiteLabel: 'Sito ufficiale',
    categories: {
      methodology: 'Metodologia',
      sdd: 'Strumenti di sviluppo spec-driven',
      agentFramework: 'Framework di workflow per agenti',
      aiNativeSdlc: 'AI-native SDLC',
      vendorNative: 'Modalità plan native dei vendor',
    },
    matrix: {
      title: 'Matrice delle capacità',
      caption:
        'Dove vive ogni capacità, per strumento. Integrato, opzionale o tramite estensione, oppure fuori ambito. Verificato sulla documentazione ufficiale.',
      capabilityColumn: 'Capacità',
    },
    capabilities: {
      toolAgnostic: {
        label: 'Funziona con qualsiasi agente di coding',
        help: 'Gli stessi file del repository guidano Claude Code, Codex, Cursor, Gemini CLI e altri.',
      },
      repoNativeHarness: {
        label: 'Scrive la harness dell’agente nel repository',
        help: 'Istruzioni, documentazione, skill e comandi vivono nel repository, non nelle impostazioni di un singolo strumento.',
      },
      taskAcceptanceCriteria: {
        label: 'Criteri di accettazione per task',
        help: 'Ogni task dichiara le condizioni osservabili per essere considerato fatto.',
      },
      perTaskGates: {
        label: 'Validation gate per task',
        help: 'Ogni task indica i comandi che devono passare, selezionati da ciò che ha toccato.',
      },
      resumableState: {
        label: 'Stato ripristinabile su disco',
        help: 'I progressi sopravvivono a un reset della sessione e possono essere ripresi da un altro agente o da un collega.',
      },
      finalReview: {
        label: 'Revisione di chiusura obbligatoria con passaggio di sicurezza',
        help: 'Il piano non può completarsi senza una revisione di sicurezza dell’intero insieme di modifiche e la validazione dello stato finale.',
      },
      conformanceChecker: {
        label: 'Verificatore di conformità eseguibile',
        help: 'Uno script verifica il repository e i suoi piani rispetto allo standard, con un codice di uscita adatto alla CI.',
      },
      instructionBudgetLedger: {
        label: 'Misurazione pubblicata del carico di istruzioni',
        help: 'I byte caricati da ogni flusso sono misurati da uno script sottoposto a commit e pubblicati con i relativi limiti.',
      },
      onboardingScaffold: {
        label: 'Onboarding che predispone la documentazione',
        help: 'Una prima esecuzione scrive la documentazione e il kit agent-facing del repository.',
      },
      brownfieldSpecs: {
        label: 'Specifiche vive per sistemi esistenti',
        help: 'Le modifiche sono specificate come delta che si fondono in una specifica del sistema in crescita.',
      },
      crossProjectMemory: {
        label: "Memoria persistente dell'agente tra progetti",
        help: "La memoria segue l'agente tra repository e sessioni diverse, non solo lo stato su disco di un singolo piano.",
      },
      roleBasedAgents: {
        label: 'Ruoli agente specializzati e distinti',
        help: 'Persone nominate (come analista, architetto o revisore) suddividono il lavoro, invece di un solo agente che esegue ogni fase.',
      },
      nativeIdeProduct: {
        label: 'Si presenta come un IDE o editor a sé stante',
        help: "Lo strumento è di per sé un ambiente di sviluppo integrato, non un'estensione di un agente di coding esistente.",
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'Si installa come skill, porta il repository in una harness per agenti tramite onboarding ed esegue piani di lungo corso con validation gate per task, stato su disco e un Final Review obbligatorio.',
        audience:
          'Sviluppatori e team che affidano lavoro multi-sessione a qualsiasi agente di coding e devono vederlo finire verificato.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'Trasforma una funzionalità in una specifica eseguibile attraverso una constitution, una spec, un piano e un elenco di task, guidato da slash command che si integrano con più di cinquanta agenti di coding, e può verificare che gli artefatti restino coerenti tra loro prima dell’implementazione.',
        audience:
          'Team che vogliono un flusso ripetibile di specify, plan, tasks e implement dentro l’agente che già usano.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Cattura ogni modifica come una proposta con spec delta (aggiunte, modificate, rimosse) e requisiti RFC 2119 con scenari, poi le archivia in specifiche vive, con un validatore che verifica la completezza della proposta e la copertura degli scenari prima che una modifica sia accettata.',
        audience:
          'Team che lavorano su sistemi esistenti e vogliono che le specifiche crescano una modifica alla volta.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'Un IDE e una CLI agentici le cui spec passano da requisiti in stile EARS al design ai task, con file di steering e hook che scattano sugli eventi dell’editor, e che può generare spec per una codebase esistente per individuare le lacune nei requisiti prima che inizi il design.',
        audience:
          'Sviluppatori che vogliono lo sviluppo spec-driven integrato nel proprio editor con strumenti supportati da AWS.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'Un framework agile di ruoli di agenti specializzati (analisi, prodotto, architettura, sviluppo, qualità) che produce brief, requisiti, documenti di architettura e file di story, con una Definition of Done che richiede la revisione di ogni story da parte di un collega o di un agente AI dedicato prima che sia considerata conclusa.',
        audience:
          'Team che prediligono le cerimonie basate sui ruoli e vogliono un ciclo di vita agile completo per il lavoro degli agenti.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'Una libreria di skill e un workflow per brainstorming, pianificazione in piccoli passi test-first, esecuzione con subagent e revisione prima del completamento, integrato con più host di agenti di coding di qualsiasi altra alternativa qui presente, oltre a una revisione in due fasi tramite subagent (conformità alla spec, poi qualità del codice) su ogni task.',
        audience:
          'Sviluppatori che vogliono un’esecuzione test-driven disciplinata dentro il proprio agente di coding.',
      },
      'get-shit-done': {
        name: 'GSD Core',
        whatItDoesWell:
          'Un sistema di pianificazione con una directory .planning, id dei requisiti, piani per fasi, esecuzione a contesto fresco e un passaggio di verifica rispetto ai deliverable osservabili dall’utente estratti da ogni piano, pensato per contrastare il degrado del contesto eseguendo ricerca, pianificazione ed esecuzione in subagent usa e getta e individuando verifiche obsolete tramite controlli di fingerprint dei contenuti.',
        audience:
          'Sviluppatori singoli e piccoli team che vogliono context engineering e verifica con poca cerimonia.',
      },
      'gentle-ai': {
        name: 'Gentle-AI',
        whatItDoesWell:
          'Configura gli agenti di coding che già usi con una memoria persistente che instrada anche tra sessioni e modelli diversi, skill curate, server MCP, personas e, in modo opzionale, Spec-Driven Development o Receipt-Driven Development. La configurazione viene scritta di default nelle impostazioni globali dell’agente; un’installazione con ambito workspace è opzionale.',
        audience:
          'Sviluppatori che vogliono un ecosistema di agenti configurato che ricordi il lavoro tra le sessioni e possa produrre evidenze su richiesta.',
      },
      'claude-ai-native-sdlc': {
        name: "Claude's AI-native SDLC",
        whatItDoesWell:
          'Un ciclo in sei fasi da Plan e Design a Build, Test, Deploy e Maintain, con approvazione umana obbligatoria a ogni fase, artefatti durevoli sottoposti a commit nel repository tra una fase e l’altra, un passaggio di revisione dedicato alla sicurezza prima del deploy e valutazioni continue che pubblicano indicatori di delivery anticipatori e consuntivi.',
        audience:
          'Team che valutano il playbook di consegna software end-to-end di Claude Code e il suo ciclo di feedback in produzione.',
      },
      'vendor-native': {
        name: 'Modalità plan native dei vendor',
        whatItDoesWell:
          'I prodotti agentici possono offrire modalità plan, file di istruzioni e skill basati sugli standard aperti e multi-vendor AGENTS.md e Agent Skills, anche se il comportamento esatto della modalità plan dipende ancora dal vendor, dal client e dalla versione. Agent Skills in particolare carica solo un breve riepilogo all’avvio e le istruzioni complete solo all’attivazione, tenendo fuori dal contesto le capacità non utilizzate.',
        audience:
          'Chiunque voglia la pianificazione dentro un singolo agente senza adottare una metodologia.',
      },
    },
    aiNative: {
      title: 'Dove si colloca nel ciclo AI-native SDLC',
      body: 'Il playbook AI-native SDLC di Claude descrive un ciclo completo: Plan, Design, Build, Test, Deploy e Maintain. Ogni fase sottopone a commit un artefatto che la fase successiva legge, con un’approvazione umana obbligatoria a ogni fase e un passaggio di revisione dedicato alla sicurezza prima del deploy, mentre il feedback di produzione diventa nuovo intent.',
      shared:
        'DWP condivide le idee di artefatto durevole e approvazione con gate: l’intent diventa un piano, i task lasciano evidenze, un passaggio di sicurezza viene eseguito prima del completamento e il repository resta leggibile dall’agente successivo.',
      boundary:
        'La vera differenza è nell’ambito, non nel rigore: il playbook è costruito attorno a Claude Code in modo specifico, mentre l’harness e il formato dei piani di DWP sono leggibili da qualsiasi agente che segua gli standard AGENTS.md e Agent Skills. Il playbook copre anche valutazione continua e operazioni di produzione che DWP non rivendica; queste pratiche operative possono integrare un repository gestito con DWP invece di competere con esso.',
      sourceLabel: "Read Claude's AI-native SDLC playbook",
    },
    profileCta: 'Vedi il confronto',
    profile: {
      backLabel: 'Back to all alternatives',
      eyebrow: 'Alternative profile',
      compareWith: 'Compared with Deep Work Plan',
      fitTitle: 'Where it fits',
      capabilityTitle: 'Capability snapshot',
      sourceLabel: 'Official documentation',
    },
    dwpStrengths: {
      title: 'Cosa porta Deep Work Plan',
      items: [
        {
          title: 'Indipendente dallo strumento e nativo del repository',
          body: 'La harness e il piano sono file nel Suo repository, leggibili da qualsiasi agente che segue gli standard AGENTS.md e Agent Skills. Cambiare agente non fa perdere il piano.',
        },
        {
          title: 'Validazione selezionata da ciò che ogni task ha toccato',
          body: 'Ogni task dichiara la propria superficie toccata ed esegue i test del comportamento modificato e dei suoi consumer, ampliando alla suite completa quando l’impatto non può essere delimitato. Zero test selezionati non è mai un esito positivo.',
        },
        {
          title: 'Un solo Final Review con passaggio di sicurezza',
          body: 'Un piano si chiude con una revisione di sicurezza dell’insieme di modifiche accumulato, inclusa una revisione locale obbligatoria del diff, e con una validazione dello stato finale. I rilievi critical bloccano il completamento.',
        },
        {
          title: 'Uno stato che sopravvive a sessioni e agenti',
          body: 'Checkbox del README, log dei task, un indice di lavoro delimitato e un file di stato leggibile dalle macchine vengono scritti a ogni confine, così un’altra sessione o un altro agente prosegue da disco. Anche una creazione del piano interrotta è recuperabile.',
        },
        {
          title: 'Un verificatore di conformità per il repository stesso',
          body: 'Uno script in sola lettura verifica la harness e ogni piano rispetto alla specifica, riconosce entrambi i cicli di vita dei piani ed esce con un codice adatto alla CI.',
        },
        {
          title: 'Carico di istruzioni misurato e pubblicato',
          body: 'Uno script sottoposto a commit misura quanti byte carica ogni flusso; i risultati, aumenti inclusi, sono pubblicati in byte, mai come percentuali di token o di costo.',
        },
      ],
    },
    honestLimits: {
      title: 'Limiti onesti',
      body: 'Deep Work Plan non ha un meccanismo di specifica viva o delta; OpenSpec e strumenti simili sono più solidi su quel fronte. Non esiste ancora un benchmark indipendente della metodologia; è prevista una valutazione pubblica pre-registrata. Il registro del carico di istruzioni misura i byte caricati, non token, costi o esiti. DWP è deliberatamente limitato al repository: non è un sistema di memoria multi-progetto, non è un framework di agenti basato su ruoli e non è un IDE, quindi non compete nemmeno su questi fronti — abbinalo a uno strumento che copra uno di essi quando è ciò di cui il lavoro ha bisogno.',
    },
    correction: {
      title: 'Ci aiuti a mantenere questa pagina accurata',
      body: 'Questa pagina viene revisionata nella data indicata e corretta su richiesta. Se la descrizione di un Suo strumento è obsoleta o incompleta, apra una issue e la corregeremo.',
      ctaLabel: 'Apri una issue',
    },
    sourcesTitle: 'Fonti',
  },

  trustPage: {
    meta: {
      title: 'Fiducia e sicurezza',
      description:
        'Perché Deep Work Plan è sicuro da adottare: open source e MIT, Markdown-first senza chiamate di rete né telemetria, non distruttivo per design, con installazioni verificabili e una chiara politica di divulgazione delle vulnerabilità.',
    },
    eyebrow: 'Fiducia e sicurezza',
    title: 'Fiducia e sicurezza',
    intro:
      'Nessuno dovrebbe installare una skill di cui non può fidarsi. Deep Work Plan è progettato per essere verificato, non accettato per fede: open source, Markdown-first, non distruttivo e controllabile prima di eseguirlo. Questa pagina illustra chiaramente cosa fa, cosa non fa e come confermare entrambe le cose.',
    pillarsTitle: 'Cosa stai approvando',
    pillars: [
      {
        title: 'Open source e licenza MIT',
        body: 'Il sito web e la skill sono entrambi pubblici e ispezionabili riga per riga. Puoi leggere ogni riga prima di eseguirla e confrontare qualsiasi copia con il sorgente a una release taggata.',
      },
      {
        title: 'Markdown-first — nessuna rete, nessuna telemetria',
        body: "La skill non ha CLI, API HTTP né flusso di autenticazione. Non effettua chiamate di rete e non invia telemetria; il suo unico helper locale legge i metadati di git e dell'ambiente. Nulla del tuo repository lascia la tua macchina.",
      },
      {
        title: 'Non distruttivo per design',
        body: "L'unica azione rilevante per la sicurezza che la skill compie è modificare il tuo repository — e riconcilia anziché sovrascrivere. Rileva ciò che esiste, propone un piano e chiede conferma prima di sostituire qualsiasi cosa. L'output dei piani risiede in una cartella .dwp/ esclusa da git.",
      },
      {
        title: 'Non tocca i segreti',
        body: "La metodologia non esegue mai il commit di segreti e mantiene lo stato di lavoro fuori dal controllo di versione. L'onboarding aggiunge al .gitignore anziché riscriverlo, e ogni modifica è pensata per essere revisionata in diff piccoli e leggibili.",
      },
      {
        title: 'Provenienza verificabile',
        body: 'Ogni release pubblica i checksum sulla skill distribuita, così puoi confermare che una copia scaricata corrisponde a quanto pubblicato prima di fidarti di essa.',
      },
    ],
    verifyTitle: 'Verifica prima di eseguire',
    verifyIntro:
      "Tratta la skill come non attendibile finché non l'hai verificata. Ogni release allega un file SHA256SUMS che copre la skill distribuita. Scaricalo per la versione che intendi installare e verifica che la tua copia corrisponda — un'uscita diversa da zero significa che un file non corrisponde e devi fermarti.",
    codeLabel: 'shell',
    verifyNote:
      'Le release sono checksummate, non firmate — la firma (cosign o GPG del maintainer) è il passo successivo documentato, non una garanzia attuale. Poiché tutto è aperto, puoi anche confrontare qualsiasi file con il repository alla sua tag.',
    disclosureTitle: 'Segnalare una vulnerabilità',
    disclosureBody:
      'Hai trovato un problema di sicurezza? Segnalalo privatamente tramite il sistema di segnalazione privata delle vulnerabilità di GitHub nel repository pertinente — la skill o il sito web (vedi le politiche di sicurezza collegate qui sotto) — invece di aprire una issue pubblica, il che esporrebbe il problema prima che esista una correzione.',
    resourcesTitle: 'Risorse sulla fiducia',
    linkManifest: 'Manifesto di fiducia leggibile dalla macchina',
    linkSecurityTxt: 'security.txt (RFC 9116)',
    linkPolicy: 'Politica di sicurezza del sito web',
    linkSkillPolicy: 'Politica di sicurezza e modello di minacce della skill',
    limitationsTitle: 'Limitazioni oneste',
    limitations: [
      'Le release sono checksummate, ma non ancora firmate crittograficamente — la firma è pianificata, non ancora implementata.',
      'Deep Work Plan esegue un agente di coding autonomo sul tuo repository. Rivedi il piano proposto e i suoi diff; la metodologia è progettata per quella revisione, non per sostituirla.',
      'Le affermazioni di fiducia qui descrivono solo le fonti ufficiali. Una copia modificata o di terze parti che si è allontanata dai repository non gode di nessuna di queste garanzie — verificala prima.',
    ],
    ctaTitle: 'Adottala con fiducia',
    ctaBody:
      "Leggi la metodologia e la specifica, punta un agente sull'endpoint init e verifica l'installazione prima di eseguirla.",
    ctaPrimary: 'Leggi la metodologia',
    ctaSecondary: 'Adozione (init)',
  },

  developersPage: {
    meta: {
      title:
        'Sviluppatori — API per agenti, server MCP e documentazione di Deep Work Plan',
      description:
        'La superficie per agenti di Deep Work Plan: API in sola lettura senza autenticazione, OpenAPI, server MCP in /api/mcp e Markdown per pagina in 17 lingue.',
    },
    eyebrow: 'Superficie per agenti e sviluppatori',
    title: 'Deep Work Plan per sviluppatori e agenti AI',
    intro:
      'deepworkplan.com pubblica una superficie leggibile dalle macchine accanto alle proprie pagine: un’API per agenti descritta con OpenAPI, un server MCP senza stato, mirror nativi in Markdown di ogni pagina in 17 lingue e la skill DWP installabile. Tutto in questa pagina è attivo, pubblico e gratuito — non c’è nulla per cui registrarsi.',
    accessTitle: 'Senza autenticazione per scelta progettuale',
    accessIntro:
      'Non ci sono chiavi API da generare, nessuna danza di OAuth e nessun sandbox separato dalla produzione — è la superficie di produzione stessa a fare da sandbox. È una proprietà deliberata della metodologia: gli agenti non possono compilare moduli «contatta le vendite», quindi il sito non ne chiede mai uno.',
    accessPoints: [
      {
        title: 'Sola lettura',
        body: 'Ogni operazione è un GET sicuro e memorizzabile in cache — tranne l’endpoint MCP, che è POST. Non esistono operazioni di scrittura, upload né cambi di stato da nessuna parte.',
      },
      {
        title: 'Nessuna chiave API',
        body: 'Nessuna registrazione, nessun token, nessun livello di rate limit. L’accesso anonimo è il contratto documentato, dichiarato in /auth.md e negli stub di discovery di OAuth.',
      },
      {
        title: 'Gratuito e open source',
        body: 'I contenuti del sito e la skill DWP sono sotto licenza MIT. Li usi in lavori commerciali e non commerciali senza chiedere permesso.',
      },
      {
        title: 'Orientato alle macchine',
        body: 'Errori JSON strutturati sui percorsi /api, corpi di recupero 404 in Markdown, catalogo API RFC 9727 e un manifest di capacità ARD — costruito per il consumo da parte degli agenti.',
      },
    ],
    endpointsTitle: 'Endpoint',
    endpointsIntro:
      'Gli endpoint principali dell’API per agenti. La specifica completa e tipizzata — ogni operazione, parametro e schema di risposta — si trova nel documento OpenAPI.',
    endpointsNote:
      'I percorsi /api/* sconosciuti restituiscono un errore JSON strutturato con un suggerimento di risoluzione, mai una pagina di errore HTML.',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: 'Specifica OpenAPI 3.1 dell’intera API per agenti.',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          'Indice curato di indicazioni per LLM — il punto d’ingresso consigliato per gli agenti.',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          'Il prompt canonico di adozione di DWP (rende AI-first qualsiasi repository).',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          'Qualsiasi pagina come Markdown sorgente nativo — in tutte le 17 lingue (ad es. /es/developers.md).',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description:
          'Indicatore di salute statico con collegamenti alla specifica e a questo portale.',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'Server MCP (Streamable HTTP, senza stato): initialize, ping, tools/list, tools/call.',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description:
          'Manifest di capacità ARD — l’agentmap dichiarato nel robots.txt.',
      },
    ],
    mcpTitle: 'Server MCP',
    mcpIntro:
      'Un server Model Context Protocol senza stato su Streamable HTTP. Tre strumenti in sola lettura: get_init_prompt, list_site_sections e read_page. Sono supportate le versioni di protocollo 2025-03-26 e 2025-06-18; non è richiesta alcuna sessione.',
    mcpCodeLabel: 'Terminale — JSON-RPC su HTTP',
    mcpNote:
      'Il manifest MCP si trova in /.well-known/mcp.json e la scheda del server in /.well-known/mcp/server-card.json. Claude, ChatGPT e qualsiasi client MCP possono chiamare questi strumenti in modo nativo.',
    markdownTitle: 'Markdown per gli agenti',
    markdownIntro:
      'Ogni pagina renderizzata è pubblicata come Markdown sorgente nativo — non una conversione da HTML. Richieda il Markdown esplicitamente con un suffisso di URL o tramite negoziazione del contenuto HTTP su qualsiasi pagina.',
    markdownCodeLabel: 'Terminale — negoziazione del contenuto',
    markdownNote:
      'La negoziazione del contenuto restituisce lo stesso Markdown sorgente da cui il sito genera le pagine, nella lingua dell’URL richiesto.',
    cliTitle: 'Installare il kit',
    cliIntro:
      'Il percorso di installazione ufficiale della skill Deep Work Plan — lo stesso comando che l’endpoint /init dà agli agenti. Funziona con qualsiasi agente di coding compatibile con le skills (Claude Code, Cursor, Codex, Gemini e altri).',
    cliCodeLabel: 'Terminale — CLI per le skill',
    cliNote:
      'La skill viene vendorizzata in .agents/skills/deepworkplan/ dentro il Suo repository, così ogni agente che tocca il repository condivide la stessa metodologia.',
    resourcesTitle: 'Risorse leggibili dalle macchine',
    resources: [
      { label: 'Specifica OpenAPI (/openapi.json)', href: '/openapi.json' },
      {
        label:
          'Dichiarazione di accesso e autenticazione degli agenti (/auth.md)',
        href: '/auth.md',
      },
      {
        label: 'Catalogo API, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'Manifest MCP (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'Contatto per la sicurezza (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'Descrittore del repository del sito (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'Punti un agente qui',
    ctaBody:
      'Il percorso più rapido resta una riga: dia il prompt /init a qualsiasi agente di coding e quello installa la skill, fa l’onboarding del Suo repository e inizia a completare deep work.',
    ctaPrimary: 'Apri il prompt /init',
    ctaSecondary: 'Leggi la metodologia',
  },

  privacyPage: {
    meta: {
      title: 'Privacy — Deep Work Plan',
      description:
        'La privacy policy di deepworkplan.com: sito statico senza account né pubblicità, analisi senza cookie e cosa raccoglie esattamente il modulo di contatto.',
    },
    eyebrow: 'Informativa sulla privacy',
    title: 'Privacy su deepworkplan.com',
    intro:
      'Deep Work Plan è un sito statico di documentazione e metodologia. Questa pagina spiega, in modo semplice e completo, quali dati il sito tocca quando lo si visita: non esiste un sistema di account, né pubblicità, né tracciamento tra siti da nessuna parte.',
    lastUpdated: '8 settembre 2026',
    sections: [
      {
        heading: 'Che cos’è il sito',
        body: 'deepworkplan.com è una raccolta di pagine statiche servite attraverso una CDN. Non esiste login, né database degli utenti, né un modo per il sito di memorizzare profili personali. I contenuti sono sviluppati in repository GitHub pubblici sotto l’organizzazione DailybotHQ, e tutto ciò che legge qui è servito esattamente così com’è stato costruito.',
      },
      {
        heading: 'Analisi',
        body: 'Il sito usa Umami, un servizio di analisi senza cookie e orientato alla privacy, per contare le visualizzazioni di pagina in forma aggregata. Umami non imposta cookie di tracciamento e non costruisce profili tra siti. Poiché i crawler AI non eseguono JavaScript, una funzione edge lato server registra inoltre lo user agent e il percorso delle visite automatizzate dei bot come eventi di analisi anonimi — questo identifica il software del crawler (per esempio «GPTBot ha visitato /init»), mai un visitatore umano.',
      },
      {
        heading: 'Cookie e archiviazione locale',
        body: 'Il sito non imposta cookie di tracciamento. L’unica cosa memorizzata nel Suo browser è una preferenza di tema (chiaro o scuro) conservata in localStorage, che non lascia mai il Suo dispositivo e non viene trasmessa da nessuna parte. Se cancella l’archiviazione del browser, il sito torna semplicemente al tema predefinito del Suo sistema.',
      },
      {
        heading: 'Servizi di terze parti',
        body: 'L’hosting e la distribuzione funzionano su Cloudflare Pages, che elabora i log delle richieste e gli indirizzi IP lato edge come parte della gestione della CDN e del blocco degli abusi, secondo la propria informativa sulla privacy di Cloudflare. Le analisi aggregate funzionano su Umami (cloud.umami.is). Se invia volontariamente il modulo di contatto, le Sue risposte passano da Google Forms al nostro team — quello è l’unico punto in cui vengono raccolte le informazioni che digita, e vengono usate esclusivamente per risponderLe.',
      },
      {
        heading: 'Cosa non facciamo',
        body: 'Non vendiamo né condividiamo dati personali, non mostriamo pubblicità né pixel di remarketing, non eseguiamo fingerprinting dei browser e non inviamo email di marketing. Il sito non ha iscrizione a newsletter né telemetria oltre ai conteggi aggregati e senza cookie descritti sopra.',
      },
      {
        heading: 'Le Sue scelte',
        body: 'Poiché le analisi qui sono aggregate e senza cookie, non esiste alcun profilo personale da esportare o eliminare. Può bloccare lo script di analisi con qualsiasi bloccante di contenuti senza influire sul funzionamento del sito. Se ha inviato il modulo di contatto e desidera che il Suo messaggio venga eliminato, scriva all’indirizzo di contatto qui sotto e lo rimuoveremo.',
      },
      {
        heading: 'Modifiche a questa informativa',
        body: 'Se questa informativa cambia in modo sostanziale, la data di aggiornamento in cima a questa pagina cambia con essa, e le modifiche sostanziali vengono committate nel repository pubblico del sito, dove chiunque può esaminarne la cronologia.',
      },
    ],
    contactTitle: 'Contatto e sicurezza',
    contactBody:
      'Per domande sulla privacy scriva a security@dailybot.com. Per segnalare una vulnerabilità di sicurezza, preferisca la segnalazione privata di vulnerabilità di GitHub per i repository del sito e della skill — veda /.well-known/security.txt per gli indirizzi esatti.',
  },
};
