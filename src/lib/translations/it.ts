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
    compare: 'Compare',
    resources: 'Resources',
    resourcesDesc: 'Examples, comparison, FAQ and trust',
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
      learn: 'Learn',
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
        'E poiché il contesto è la risorsa più scarsa del vostro agente, l’harness è progettato per l’efficienza dei token: le istruzioni si caricano progressivamente, la validazione tocca solo ciò che è cambiato e ogni task impara in loco — il lavoro di lungo corso resta sostenibile.',
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
            'Collega la skill Deep Work Plan e crea la cartella .dwp/ esclusa da git per piani e bozze, installa la revisione locale obbligatoria di AI Diff Reviewer, poi aggiunge facoltativamente addon opt-in come il supporto devcontainer.',
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
            'Nessun daemon e nessuno stato esterno. Piani e bozze finiscono in una cartella .dwp/ esclusa da git e qualsiasi attività riprende dal solo git — anche dopo un overflow del contesto.',
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
          'Invochi la sub-skill onboard e lasci che l’agente ragioni sul repo reale — il suo stack, il package manager e i comandi di validazione reali. Genera poi AGENTS.md, una knowledge base docs/, documentazione per modulo e una home .agents/ multi-agente (con i symlink .claude → .agents e .cursor → .agents), collega i sottili comandi dwp-* e predispone una .dwp/ esclusa da git per piani e bozze. Per i repository di grandi dimensioni la sub-skill onboard utilizza un percorso guidato dal piano: completa la ricognizione, quindi genera un Deep Work Plan di onboarding. Nulla è basato su template; tutto è adattato al Suo repository.',
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
          'Generi Deep Work Plan con /dwp-create ed eseguili con /dwp-execute, poi /dwp-status, /dwp-refine, /dwp-resume e /dwp-verify man mano che il lavoro procede. Ogni piano porta con sé attività numerate, validation gate e un protocollo di completamento — concludendosi con tre attività finali obbligatorie: una revisione di sicurezza, una scoperta di skill e agenti e un rapporto esecutivo.',
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
      title: 'Frequently asked questions — Deep Work Plan',
      description:
        'Answers to the questions people ask about Deep Work Plan: what it does, how gates and resumption work, how it compares with other tools, and how to adopt it.',
    },
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    intro:
      'Short answers to what people ask most about Deep Work Plan, each with a link to the page that goes deeper.',
    groups: [
      {
        id: 'what',
        title: 'What Deep Work Plan is',
        items: [
          {
            id: 'what-is-it',
            question: 'What does Deep Work Plan actually do?',
            answer:
              'Deep Work Plan turns a repository into a structured environment where a coding agent can execute long work reliably. It installs as an agent skill, onboards the repository once (an `AGENTS.md` index, a `docs/` tree, a `.agents/` kit of skills and commands, a gitignored `.dwp/` output area), and from then on any goal becomes a plan: atomic tasks, each with acceptance criteria and a validation gate, executed one at a time, committed as they pass, and resumable from disk by any agent. The plan closes with a Final Review that audits security and validates the final state. The methodology is MIT-licensed and works with any coding agent that reads a repository.',
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: 'Who is it for?',
            answer:
              'Developers and teams who hand real, multi-step work to coding agents and want it to finish. It fits when a task spans more than one session, more than one file family, or more than one agent; when a teammate must be able to pick up where an agent stopped; or when "done" must mean "validated", not "the agent said so". A one-line fix does not need a plan, and the methodology says so: its proportional-rigor rule recommends an inline goal, criteria and gate instead.',
            linkLabel: 'Quickstart',
            linkPath: '/quickstart',
          },
          {
            id: 'is-it-a-tool',
            question: 'Is it a tool, a framework or a methodology?',
            answer:
              'A methodology packaged as an installable skill. There is no server, no account, no proprietary format and no runtime beyond the coding agent you already use. What gets installed is instructions the agent reads, a small set of shell scripts for context detection and conformance checking, and the conventions your repository adopts. Everything the plan produces is Markdown and JSON in your repository, readable without any tool.',
            linkLabel: 'Read the specification',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: 'Which coding agents does it work with?',
            answer:
              "Any agent that reads repository files. The skill follows the open Agent Skills standard and the `AGENTS.md` convention, so Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot and others pick it up through their normal skill and instruction loading. The methodology's own evaluation shows a plan started by one vendor's agent and resumed by another's in both directions. Installation coverage and behavioral evidence are listed per agent in the compatibility matrix, and the two are never conflated.",
            linkLabel: 'Browse the kit',
            linkPath: '/kit',
          },
        ],
      },
      {
        id: 'how',
        title: 'How a plan runs',
        items: [
          {
            id: 'gates',
            question:
              'How are the validation gates implemented? Do they need human sign-off?',
            answer:
              "They are executable assertions the agent runs itself. Human sign-off bookends the run: a person approves the plan before execution and reviews the final diff at pull-request time; execution in between is autonomous. Every task names concrete commands, typically the repository's own quality gate, selected from the task's touched surface: the tests of the changed behavior and its consumers, widening to the full suite when the change is shared or cannot be bounded. A task is marked done only when those commands exit successfully, and tasks that change behavior must extend the tests. On failure the task is marked blocked and the agent stops.",
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              'How does the plan avoid going stale when people change the code between runs?',
            answer:
              'On three fronts. Tasks are written as behavior, not edits: an acceptance criterion says what the system must do, so a renamed file or a swapped implementation does not invalidate it. Every gate re-runs against the repository as it is now, so a broken assumption fails loudly at the next run instead of drifting silently, and that failure is the cue to refine. And keeping documentation in sync is part of the work: a task that changes behavior also updates the docs and the agent-facing kit that describe it, inside its own gate. Every run should leave the repository more agent-ready than it found it.',
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              'Can I change the plan mid-run without losing completed work?',
            answer:
              'Yes; refining a partially executed plan is a first-class move. Task definitions and execution state are kept separate: the plan is a checklist on disk plus a small state file, so what is done stays recorded independently of the task text. When a task turns out to be wrong, the agent marks it blocked and stops rather than pushing through. You then edit, reorder, split or drop the tasks that have not run, while completed tasks stay completed. Resuming rebuilds state from disk and the actual repository and re-runs the gates that matter, so nothing that shifted underneath slips by.',
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              'Does it keep checking the work against the plan, or is the plan an upfront thing?',
            answer:
              'The plan is a continuous check. The agent works one small task at a time and must validate before moving on, so it can wander one step, not three. Every task carries acceptance criteria plus the exact commands that prove them, and progress is written into the repository as it goes, with a status per task, so drift becomes visible to you, to the next session and to the next agent. A plan is not finished until everything validates, including the Final Review. The honest caveat: the methodology cannot stop an agent from writing a weak acceptance criterion in the first place; it makes drift loud instead of silent.',
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              'Is the plan generated once and maintained by hand, or does it evolve with the code?',
            answer:
              "Neither. It is generated once from a goal and then maintained as part of the work. The plan is deliberately not rewritten from code diffs, because a spec that chases the code becomes a lagging mirror, which is the drift the methodology exists to kill. It evolves on purpose: gates re-run against the current repository, a failing gate triggers a refinement, and the agent performs that refinement during the run while you approve up front and review at the end. Documentation and tests evolve alongside the code by construction, because updating them is inside each task's gate.",
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: 'What happens if the session dies halfway?',
            answer:
              "Progress lives on disk, not in the chat. The README checkboxes, each task's log, a bounded working index and a machine-readable state file are updated at every task boundary, and the state file records a checkpoint before any planned pause. A fresh session, or a different agent, reads that compact index, reconciles it with the repository and git history, and continues at the first incomplete task without redoing finished work. Even an interrupted plan creation is recoverable: the plan's identity and intended task list are written before any task file, so a half-created plan can be completed or discarded rather than guessed at.",
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'What is the Final Review?',
            answer:
              "The single mandatory closing task of every plan. In order: a security pass over the plan's full accumulated change set, including a required local review of the diff by the AI Diff Reviewer skill, with critical findings blocking completion until fixed or explicitly accepted; final-state validation, meaning the repository's complete applicable test, lint, type-check and format suites on the final code; and a reconciliation of the skills decisions each task recorded. The agent then reports deliverables, evidence and limitations, and offers an Executive Report once, generating it only if you ask.",
            linkLabel: 'The specification',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'compare',
        title: 'How it compares',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              'How is it different from spec-driven tools such as Spec Kit, OpenSpec or Kiro?',
            answer:
              "They solve adjacent problems. Spec-driven tools are excellent at capturing what should change: specifications, requirements and change proposals in a repeatable shape. Deep Work Plan is about how an agent executes for hours without drifting: the onboarded harness, per-task validation gates selected from the touched surface, on-disk resumable state, a mandatory Final Review with a security pass, and a conformance checker for the repository itself. The two can be combined, with a spec or change proposal feeding a plan. The comparison page lays the capabilities side by side, on each tool's own terms.",
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'How is it different from agent workflow frameworks such as BMAD, Superpowers or Get Shit Done?',
            answer:
              'Those frameworks bring strong working styles: roles, principles, test-first steps, verification habits. Deep Work Plan focuses on what stays in the repository and what can be checked: a harness any agent reads cold, task files with acceptance criteria and gates, state that survives a session, a conformance checker with a CI-friendly exit code, and a published measurement of how many instruction bytes each flow loads. It is tool-agnostic by construction and adds no service, provider or secret to the core loop. The comparison page shows where each approach is built in, optional or out of scope.',
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question: "Why not just use my agent's built-in plan mode?",
            answer:
              "Built-in plan modes are useful and Deep Work Plan builds on the same substrate, the `AGENTS.md` convention and the open Agent Skills standard. The difference is where the plan lives and what enforces it. Native plans usually live outside the repository and expire with the session; Deep Work Plan writes the plan, its state and its evidence into the repository, so another agent or a teammate can continue it, and every task carries an executable gate and a recorded log. You keep using your agent's plan mode for thinking; the methodology adds the durable, verifiable execution loop.",
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'Adopting it',
        items: [
          {
            id: 'install',
            question:
              'What does onboarding write into my repository, and does it touch existing files?',
            answer:
              'Onboarding is non-destructive: it detects an existing `AGENTS.md`, `docs/`, `.agents/` or `CLAUDE.md`, reconciles rather than overwrites, and asks before replacing anything. It writes the `AGENTS.md` index with real commands, a reasoned `docs/` tree, per-module docs, the `.agents/` kit with thin `dwp-*` commands, a gitignored `.dwp/` output area, a verified testing map, and the required local code review (the AI Diff Reviewer skill plus a repo-tailored review extension). It then runs a self-check and the conformance checker so you can see what was produced. A repository onboarded under an earlier version gets a targeted upgrade that changes only what is missing.',
            linkLabel: 'The adoption endpoint',
            linkPath: '/init',
          },
          {
            id: 'cost',
            question: 'What does it cost, and how is efficiency measured?',
            answer:
              'The methodology and the skill are MIT-licensed and free; there is no service, no API key and no telemetry in the core flows. Efficiency is reported as the number of instruction bytes each flow loads, measured by a script committed with the skill and published in an evaluation ledger, with increases reported as plainly as decreases. It is not reported as token percentages or cost savings, because a byte inventory does not establish those; a pre-registered public evaluation is planned to measure outcomes properly.',
            linkLabel: 'Trust and disclosure',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: 'Still have a question?',
      body: 'Open a discussion or an issue on GitHub. Questions that come up repeatedly are added to this page.',
      ctaLabel: 'Ask on GitHub',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan compared with the alternatives — Deep Work Plan',
      description:
        'How Deep Work Plan relates to spec-driven tools, agent workflow frameworks and vendor plan modes: each on its own terms, with sources and a review date.',
    },
    eyebrow: 'Compare',
    title: 'Deep Work Plan and the alternatives',
    intro:
      'Pick the right layer for your situation. Each alternative is described on its own terms, every fact traces to its official documentation, and the page says when it was last reviewed. This is a map, not a ranking.',
    howToRead: {
      title: 'How to read this page',
      body: 'Three values describe each capability. They say where a capability lives in a tool, not how good the tool is.',
      values: {
        builtIn: 'Built in',
        optional: 'Optional or via extension',
        notInScope: 'Not in scope',
      },
    },
    reviewedOnLabel: 'Last reviewed',
    alternativesTitle: 'The alternatives, on their own terms',
    officialSiteLabel: 'Official site',
    categories: {
      methodology: 'Methodology',
      sdd: 'Spec-driven development tools',
      agentFramework: 'Agent workflow frameworks',
      vendorNative: 'Vendor-native plan modes',
    },
    matrix: {
      title: 'Capability matrix',
      caption:
        'Where each capability lives, per tool. Built in, optional or via extension, or not in scope. Reviewed against official documentation.',
      capabilityColumn: 'Capability',
    },
    capabilities: {
      toolAgnostic: {
        label: 'Works with any coding agent',
        help: 'The same repository files drive Claude Code, Codex, Cursor, Gemini CLI and others.',
      },
      repoNativeHarness: {
        label: 'Writes the agent harness into the repository',
        help: "Instructions, docs, skills and commands live in the repository, not in one tool's settings.",
      },
      taskAcceptanceCriteria: {
        label: 'Acceptance criteria per task',
        help: 'Each task states observable conditions for being done.',
      },
      perTaskGates: {
        label: 'Validation gate per task',
        help: 'Each task names the commands that must pass, selected from what it touched.',
      },
      resumableState: {
        label: 'Resumable state on disk',
        help: 'Progress survives a session reset and can be picked up by another agent or a teammate.',
      },
      finalReview: {
        label: 'Mandatory closing review with a security pass',
        help: 'The plan cannot complete without a security review of the full change set and validation of the final state.',
      },
      conformanceChecker: {
        label: 'Executable conformance checker',
        help: 'A script verifies the repository and its plans against the standard, with a CI-friendly exit code.',
      },
      instructionBudgetLedger: {
        label: 'Published instruction-load measurement',
        help: 'The bytes each flow loads are measured by a committed script and published with their limits.',
      },
      onboardingScaffold: {
        label: 'Onboarding that scaffolds documentation',
        help: "A first run writes the repository's agent-facing documentation and kit.",
      },
      brownfieldSpecs: {
        label: 'Living specs for existing systems',
        help: 'Changes are specified as deltas that merge into a growing specification of the system.',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'Installs as a skill, onboards the repository into an agent harness and runs long-horizon plans with per-task validation gates, on-disk state and a mandatory Final Review.',
        audience:
          'Developers and teams who hand multi-session work to any coding agent and need it to finish verified.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'Turns a feature into an executable specification through a constitution, a spec, a plan and a task list, driven by slash commands that integrate with more than fifty coding agents.',
        audience:
          'Teams that want a repeatable specify, plan, tasks and implement workflow inside the agent they already use.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Captures each change as a proposal with delta specs (added, modified, removed) and RFC 2119 requirements with scenarios, then archives them into living specifications.',
        audience:
          'Teams working on existing systems who want specifications to grow one change at a time.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'An agentic IDE and CLI whose specs move from EARS-style requirements to design to tasks, with steering files and hooks that run on editor events.',
        audience:
          'Developers who want spec-driven development built into their editor with AWS-backed tooling.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'An agile framework of specialized agent roles (analysis, product, architecture, development, quality) that produces briefs, requirements, architecture documents and story files.',
        audience:
          'Teams that like role-based ceremonies and want a full agile lifecycle for agent work.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'A skills library and workflow for brainstorming, planning in small test-first steps, executing with subagents and reviewing before completion.',
        audience:
          'Developers who want disciplined test-driven execution inside their coding agent.',
      },
      'get-shit-done': {
        name: 'Get Shit Done',
        whatItDoesWell:
          'A planning system with a .planning directory, requirement ids, phase plans, fresh-context execution and a verification pass against stated must-haves.',
        audience:
          'Solo developers and small teams who want context engineering and verification with little ceremony.',
      },
      'vendor-native': {
        name: 'Vendor-native plan modes',
        whatItDoesWell:
          'Claude Code, Codex, Cursor and Gemini CLI ship plan modes, instruction files and skills that follow the AGENTS.md and Agent Skills standards.',
        audience:
          'Anyone who wants planning inside a single agent without adopting a methodology.',
      },
    },
    dwpStrengths: {
      title: 'What Deep Work Plan brings',
      items: [
        {
          title: 'Tool-agnostic and repository-native',
          body: 'The harness and the plan are files in your repository, read by any agent that follows the AGENTS.md and Agent Skills standards. Switching agents does not lose the plan.',
        },
        {
          title: 'Validation selected from what each task touched',
          body: 'Every task declares its touched surface and runs the tests of the changed behavior and its consumers, widening to the full suite when the impact cannot be bounded. Zero selected tests is never a pass.',
        },
        {
          title: 'One Final Review with a security pass',
          body: 'A plan closes with a security review of the accumulated change set, including a required local review of the diff, and a validation of the final state. Critical findings block completion.',
        },
        {
          title: 'State that survives sessions and agents',
          body: 'README checkboxes, task logs, a bounded working index and a machine-readable state file are written at every boundary, so another session or another agent continues from disk. Even an interrupted plan creation is recoverable.',
        },
        {
          title: 'A conformance checker for the repository itself',
          body: 'A read-only script verifies the harness and every plan against the specification, understands both plan lifecycles and exits with a CI-friendly code.',
        },
        {
          title: 'Instruction load measured and published',
          body: 'A committed script measures how many bytes each flow loads; the results, including the increases, are published as bytes, never as token or cost percentages.',
        },
      ],
    },
    honestLimits: {
      title: 'Honest limits',
      body: 'Deep Work Plan has no living or delta specification mechanism; OpenSpec and similar tools are stronger there. No independent benchmark of the methodology exists yet; a pre-registered public evaluation is planned. The instruction-load ledger measures bytes loaded, not tokens, cost or outcomes.',
    },
    correction: {
      title: 'Help us keep this accurate',
      body: 'This page is reviewed on the date shown and corrected on request. If a description of your tool is out of date or incomplete, open an issue and we will fix it.',
      ctaLabel: 'Open an issue',
    },
    sourcesTitle: 'Sources',
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
