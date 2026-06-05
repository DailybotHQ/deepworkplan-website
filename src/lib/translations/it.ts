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
    github: 'GitHub',
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

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Navigazione del sito',
    sections: {
      methodology: 'Metodologia',
      getStarted: 'Per iniziare',
      project: 'Progetto',
      connect: 'Contatti',
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
        'Deep Work Plan trasforma qualsiasi repository in un ambiente strutturato — contesto, salvaguardie e un piano duraturo — in cui ogni agente di coding esegue con precisione e porta a termine il lavoro a lungo termine.',
      instructionLabel: 'Fornisca questo al Suo agente',
      instruction:
        'Leggi e segui le istruzioni su https://deepworkplan.com/init.md per rendere questo repository AI-first.',
      copyLabel: 'Copia',
      copiedLabel: 'Copiato',
      viewInitCta: 'Visualizza il prompt /init completo',
      pullQuote:
        'Deep Work Plan è spec-driven development in cui il repository stesso diventa la harness.',
      primaryCta: 'Leggi la metodologia',
      secondaryCta: 'Leggi la specifica',
      illustrationAlt:
        'Un faro su una costa rocciosa proietta un unico fascio che guida una piccola imbarcazione — un’incisione che evoca il repository come una harness stabile che guida qualsiasi agente.',
    },
    pitch: {
      kicker: 'Il problema e la risposta',
      problem:
        'Gli agenti di coding AI sono notevolmente efficaci in brevi sessioni. Sul lavoro a lungo termine — una migrazione, un nuovo sottosistema, un refactoring su decine di file — vanno alla deriva: il contesto si riempie, le decisioni vengono dimenticate e le attività di più ore vengono abbandonate a metà.',
      answer:
        'Deep Work Plan risponde con lo spec-driven development: il piano è la fonte di verità duratura e gli agenti eseguono rispetto a criteri di accettazione e validation gate espliciti. La deriva si riduce, il lavoro resta verificabile e qualsiasi agente può riprenderlo tra una sessione e l’altra.',
      origin:
        'È anche harness engineering reso portabile. Una harness per agenti è l’impalcatura attorno a un modello — contesto, strumenti, ciclo di controllo, salvaguardie, stato ripristinabile — che lo rende affidabile. Deep Work Plan installa quella harness nel repository stesso (AGENTS.md, docs, la home delle skill .agents/, la skill DWP), così qualsiasi agente può pilotare qualsiasi repo. Nato in Dailybot, collaudato per mesi e rilasciato come DailybotHQ/deepworkplan-skill.',
      illustrationAlt:
        'Una carta nautica con un’unica rotta tracciata che si snoda in sicurezza tra i pericoli — un’incisione che evoca il piano come la direzione che mantiene il lavoro in rotta.',
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
          title: 'Predispone .agents/ con il symlink da .claude a .agents',
          description:
            'Una directory .agents/ multi-agente (skill, agenti, comandi) e il symlink da .claude a .agents, che riflette CLAUDE.md su AGENTS.md, così ogni strumento legge un’unica fonte di verità.',
        },
        {
          title: 'Installa la skill DWP e predispone .dwp/',
          description:
            'Collega la skill Deep Work Plan e crea la cartella .dwp/ esclusa da git per piani e bozze, poi aggiunge facoltativamente addon opt-in come il supporto devcontainer.',
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
          label: '.agents/ con il symlink da .claude a .agents',
          detail:
            'Una directory .agents/ multi-agente (skill, agenti, comandi) con il symlink da .claude a .agents, così ogni strumento legge un’unica fonte di verità.',
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
          support: 'partial',
          note: 'Solo docs e AGENTS.md. Slash command tramite estensioni.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Richiede Gemini 2.5 Pro o versione successiva, con WebFetch nativo.',
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
      'Tutto ciò che serve per eseguire la metodologia: la skill e le sue sub-skill, gli slash command, gli adapter per gli agenti, i preset di onboarding, gli addon opt-in ed esempi pratici.',
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
          'Capacità opzionali che il flusso di onboard può aggiungere a un repo — mai parte della baseline AI-first.',
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
          'Esegua la sub-skill onboard e lasci che l’agente ragioni sul Suo repo reale. Genera AGENTS.md, una knowledge base docs/, documentazione per modulo e una home .agents/ multi-agente (con il symlink .claude → .agents), collega i sottili comandi dwp-* e predispone una .dwp/ esclusa da git.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Faccia evolvere il kit e accetti gli addon',
        description:
          'Usi /skill-create e /agent-create (la sub-skill author) per far crescere skill, agenti e comandi adatti allo stack. L’onboarding offre anche tre addon opt-in — devcontainer, Dailybot e dependency-upgrade — che accetta solo quando sono pertinenti.',
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
    handoffTitle: 'Fornisca questo al Suo agente',
    handoffBody:
      'Incolli la riga qui sotto nel Suo agente di coding AI. Leggerà la metodologia e la specifica, installerà la skill e farà l’onboarding di questo repository per i Deep Work Plan.',
    handoffInstruction:
      'Leggi e segui le istruzioni su https://deepworkplan.com/init.md per rendere questo repository AI-first.',
    handoffMdLabel: 'Prompt per agenti autosufficiente',
    codeLabel: 'agent',
    whatTitle: 'Cosa fa',
    whatBody: [
      'L’adozione cambia il repository in due modi duraturi — i pilastri della metodologia.',
      'Primo, il repository diventa spec-driven: il lavoro parte da un piano e una specifica scritti, non da prompt estemporanei. Secondo, il repository stesso diventa la harness dell’agente — un AGENTS.md, una knowledge base docs/, documentazione per modulo e una home di skill .agents/ (con il symlink .claude → .agents) forniscono a ogni agente il contesto e i comandi di cui ha bisogno.',
    ],
    sequenceTitle: 'La sequenza di adozione',
    orLabel: 'oppure',
    steps: [
      {
        title: 'Verifichi prima di installare',
        description:
          'Tratti il prompt e la skill come non attendibili finché non li ha verificati. Entrambi sono open source e con licenza MIT; la skill è Markdown-first senza chiamate di rete e senza telemetria. Ogni release pubblica un SHA256SUMS sui file della skill, così può confermare che la sua copia corrisponda prima di eseguirla. Le release hanno checksum, non firme (la firma è il passo successivo documentato).',
        commands: [
          'curl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS && ./setup.sh --verify',
        ],
      },
      {
        title: 'Installi la skill',
        description:
          'Aggiunga la skill Deep Work Plan così che qualsiasi agente possa pianificare ed eseguire lavoro strutturato. La skill include un router più otto sub-skill — create, execute, refine, resume, status, verify, onboard e author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Esegua l’onboarding del repository',
        description:
          'Invochi la sub-skill onboard e lasci che l’agente ragioni sul repo reale — il suo stack, il package manager e i comandi di validazione reali. Genera poi AGENTS.md, una knowledge base docs/, documentazione per modulo e una home .agents/ multi-agente (con il symlink .claude → .agents), collega i sottili comandi dwp-* e predispone una .dwp/ esclusa da git per piani e bozze. Nulla è basato su template; tutto è adattato al Suo repository.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Faccia evolvere il kit e accetti gli addon',
        description:
          'Usi /skill-create e /agent-create (la sub-skill author) per far crescere skill, agenti e comandi adatti allo stack. L’onboarding offre anche tre addon opt-in — devcontainer, Dailybot e dependency-upgrade — che accetta solo quando sono pertinenti. Un repo è pienamente conforme anche con zero addon.',
      },
      {
        title: 'Pianifichi ed esegua',
        description:
          'Generi Deep Work Plan con /dwp-create ed eseguili con /dwp-execute, poi /dwp-status, /dwp-refine e /dwp-resume man mano che il lavoro procede. Ogni piano porta con sé attività numerate, validation gate e un protocollo di completamento così il lavoro resta strutturato, revisionabile e ripristinabile tra le sessioni.',
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
};
