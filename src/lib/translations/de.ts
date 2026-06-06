/**
 * de translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const de: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull:
    'Deep Work Plan — strukturierte Ausführung für KI-Coding-Agenten',
  siteDescription:
    'Deep Work Plan: eine offene Methodik und ein Referenz-Kit für strukturierte, validierte und wiederaufnehmbare KI-Agenten-Ausführung über mehrere Stunden.',

  // Navigation
  nav: {
    home: 'Start',
    about: 'Über',
    contact: 'Kontakt',
    // Deep Work Plan IA
    methodology: 'Methodik',
    spec: 'Spezifikation',
    kit: 'Kit',
    examples: 'Beispiele',
    init: 'Init',
    quickstart: 'Schnellstart',
    trust: 'Vertrauen',
    github: 'GitHub',
    repo: {
      label: 'Quellcode',
      website: 'Website-Repository',
      websiteDesc: 'Diese Website',
      skill: 'Skill-Repository',
      skillDesc: 'Das installierbare Skill',
    },
    menu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'Alle Rechte vorbehalten.',
    poweredBy: 'Bereitgestellt von',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Seitennavigation',
    sections: {
      methodology: 'Methodik',
      getStarted: 'Erste Schritte',
      project: 'Projekt',
      connect: 'Verbinden',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title: 'Deep Work Plan — strukturierte Ausführung für KI-Coding-Agenten',
      description:
        'Kontext zählt mehr als Modelle. Deep Work Plan verwandelt jedes Repository in eine strukturierte Umgebung, in der jeder Coding-Agent langfristige Arbeit zu Ende bringt.',
    },
    hero: {
      badge: 'Offene Methodik · MIT · Agenten-agnostisch',
      title: 'Modelle zählen.',
      titleEmphasis: 'Kontext zählt mehr.',
      subtitle:
        'Deep Work Plan verwandelt jedes Repository in eine strukturierte Umgebung — Kontext, Leitplanken und einen dauerhaften Plan — in der jeder Coding-Agent präzise arbeitet und langfristige Aufgaben abschließt.',
      instructionLabel: 'In Ihren Agenten kopieren',
      instruction:
        'Kopieren Sie den init.md-Prompt und fügen Sie ihn in Ihren Coding-Agenten ein — Claude Code, Cursor, Codex oder einen anderen — um jedes Repository AI-first zu machen.',
      copyLabel: 'init.md kopieren',
      copiedLabel: 'Kopiert',
      viewInitCta: 'Den vollständigen /init-Prompt ansehen',
      pullQuote:
        'Deep Work Plan ist spec-driven Development, bei der das Repository selbst zum Harness wird.',
      primaryCta: 'Methodik lesen',
      secondaryCta: 'Spezifikation lesen',
      illustrationAlt:
        'Ein Leuchtturm an felsiger Küste wirft einen einzelnen Strahl, der ein kleines Schiff lenkt — ein Stich, der das Repository als stabilen Anker („harness“) zeigt, der jeden Agenten führt.',
    },
    pitch: {
      kicker: 'Das Problem und die Antwort',
      problem:
        'KI-Coding-Agenten sind in kurzen Schüben bemerkenswert wirksam. Bei langfristiger Arbeit — einer Migration, einem neuen Subsystem, einem Refactoring über Dutzende Dateien hinweg — driften sie ab: Der Kontext füllt sich, Entscheidungen geraten in Vergessenheit, und mehrstündige Aufgaben werden auf halbem Weg abgebrochen.',
      answer:
        'Deep Work Plan antwortet mit spec-driven Development: Der Plan ist die dauerhafte Quelle der Wahrheit, und Agenten arbeiten gegen explizite Akzeptanzkriterien und Validierungs-Gates. Das Abdriften nimmt ab, die Arbeit bleibt überprüfbar, und jeder Agent kann sie über Sitzungen hinweg wiederaufnehmen.',
      origin:
        'Es ist zugleich Harness Engineering, portabel gemacht. Ein Agenten-Harness ist das Gerüst um ein Modell herum — Kontext, Werkzeuge, Steuerschleife, Leitplanken, wiederaufnehmbarer Zustand —, das es zuverlässig macht. Deep Work Plan installiert dieses Harness in das Repository selbst (AGENTS.md, docs, das .agents/ Skill-Verzeichnis, die DWP-Skill), sodass jeder Agent jedes Repository steuern kann. Entstanden bei Dailybot, über Monate im Praxiseinsatz erprobt und als DailybotHQ/deepworkplan-skill veröffentlicht.',
      illustrationAlt:
        'Eine Seekarte mit einem einzigen eingezeichneten Kurs, der sicher an Gefahren vorbeiführt — ein Stich, der den Plan als die Richtung zeigt, die die Arbeit auf Kurs hält.',
    },
    onboarding: {
      badge: 'Reasoning-basiertes Onboarding',
      title:
        'Richten Sie es auf ein beliebiges Repository. Es schlussfolgert — es kopiert nicht.',
      subtitle:
        'Der Onboarding-Ablauf untersucht die tatsächlichen Sprachen, Frameworks, den Paketmanager und die Validierungsbefehle Ihres Repositorys und erzeugt dann Artefakte, die an dieses Repository angepasst sind. Ein generischer Platzhalter gilt als Fehlschlag.',
      steps: [
        {
          title: 'Schlussfolgert über Ihren Stack und Archetyp',
          description:
            'Liest Manifeste, Ordnerstruktur und CI, um die tatsächlichen Test-, Lint- und Build-Befehle abzuleiten, und stuft das Repository anschließend als Einzel-Repository oder als Orchestrator-Hub ein.',
        },
        {
          title: 'Erzeugt AGENTS.md, docs/ und Dokumentation je Modul',
          description:
            'Eine durchdachte AGENTS.md, eine kategorisierte docs/-Hierarchie sowie eine README und docs/ in jedem größeren Modul — gefüllt mit den echten Befehlen Ihres Repositorys, nicht mit Platzhaltern.',
        },
        {
          title: 'Legt .agents/ mit dem .claude-zu-.agents-Symlink an',
          description:
            'Ein agentenübergreifendes .agents/-Verzeichnis (Skills, Agenten, Befehle) und der .claude-zu-.agents-Symlink, der CLAUDE.md auf AGENTS.md spiegelt, sodass jedes Werkzeug eine einzige Quelle der Wahrheit liest.',
        },
        {
          title: 'Installiert die DWP-Skill und legt .dwp/ an',
          description:
            'Bindet die Deep Work Plan Skill ein und erstellt den per gitignore ausgeschlossenen .dwp/-Ordner für Pläne und Entwürfe, und ergänzt anschließend optional Opt-in-Addons wie Devcontainer-Unterstützung.',
        },
      ],
    },
    quickstart: {
      badge: 'Was passiert, wenn Sie es ausführen',
      title: 'Eine Anweisung. Das Repository erledigt den Rest.',
      subtitle:
        'Sie wählen keine Installationsmethode und kopieren keine Vorlage. Sie geben Ihrem Agenten eine Zeile; er installiert die Skill — die wiederverwendbare Engine — und passt Ihr Repository daran an.',
      steps: [
        {
          title: 'Ihr Agent öffnet /init.md',
          description:
            'Er liest den Onboarding-Prompt unter deepworkplan.com/init.md sowie die verlinkte Methodik, Spezifikation und das Kit — den Standard, den er gleich übernehmen wird.',
        },
        {
          title: 'Er installiert die Deep Work Plan Skill',
          description:
            'Die Skill ist die Engine — in jedem Repository dieselbe. Ein Befehl bindet den Router und seine Sub-Skills (create, execute, refine, resume, status, verify, onboard, author) für Claude Code, Cursor, Codex, Gemini und Copilot ein.',
        },
        {
          title: 'Er passt Ihr Repository an',
          description:
            'Indem er über Ihren echten Stack schlussfolgert — niemals kopiert —, schreibt er AGENTS.md, einen kategorisierten docs/-Baum, READMEs je Modul, ein durchdachtes .agents/-Kit und ein per gitignore ausgeschlossenes .dwp/. Ihr Repository wird zum Harness.',
        },
        {
          title: 'Sie planen und führen aus',
          description:
            'Erzeugen Sie langfristige Deep Work Plans für jede Aufgabe und führen Sie diese Schritt für Schritt aus — mit expliziten Akzeptanzkriterien, Validierungs-Gates und wiederaufnehmbarem Zustand — autonom, über Stunden hinweg.',
        },
      ],
      note: 'Die Skill wird überall identisch installiert; angepasst wird Ihr Repository — die AGENTS.md, die Dokumentation und das für Ihren Stack erzeugte, durchdachte .agents/-Kit. Diese Trennung macht die Methodik zu einem wiederverwendbaren Standard und nicht zu einem einmaligen Gerüst.',
    },
    outcomes: {
      badge: 'Was Sie erhalten',
      title: 'Alles, was Ihr Agent für autonomes Arbeiten braucht.',
      subtitle:
        'Ein Durchlauf, atomar committet. Jede Ausgabe ist Markdown und jede Änderung ist nachvollziehbar.',
      items: [
        {
          label: 'AGENTS.md im Repository-Stammverzeichnis',
          detail:
            'Durchdacht aus dem tatsächlichen Stack, den Befehlen und der Struktur Ihres Repositorys abgeleitet — keine Vorlage mit Platzhaltern. CLAUDE.md ist per Symlink mit AGENTS.md verbunden.',
        },
        {
          label: 'Kategorisierte docs/ und Dokumentation je Modul',
          detail:
            'Architektur, Einrichtung, Standards und Fehlerbehebung — plus eine README und docs/ in jedem größeren Modul, erzeugt aus Ihrer Codebasis.',
        },
        {
          label: '.agents/ mit dem .claude-zu-.agents-Symlink',
          detail:
            'Ein agentenübergreifendes .agents/-Verzeichnis (Skills, Agenten, Befehle) mit dem .claude-zu-.agents-Symlink, sodass jedes Werkzeug eine einzige Quelle der Wahrheit liest.',
        },
        {
          label: 'Die Deep Work Plan Skill, installiert',
          detail:
            'create, execute, refine, resume, status, verify, onboard und author — für Ihren Agenten als ein einziges Skill-Paket verfügbar, ohne Kopie je Repository.',
        },
        {
          label: 'Konformität, die Sie prüfen können',
          detail:
            '/dwp-verify erzeugt einen objektiven Bestanden/Nicht-bestanden-Bericht anhand der Spezifikation, sodass „AI-first“ verifiziert und nicht bloß behauptet ist — und nach jedem Plan erneut überprüfbar.',
        },
        {
          label: 'Zwei Archetypen, abgedeckt',
          detail:
            'Das Onboarding stuft Ihr Repository als Einzel-Repository (der Regelfall) oder als Orchestrator-Hub ein, der untergeordnete Pläne über mehrere Repositorys hinweg koordiniert.',
        },
        {
          label: 'Ein lebendiges Kit, das Ihr Repository ausbaut',
          detail:
            'Die author-Sub-Skill (skill-create, agent-create) lässt das Repository eigene Skills, Agenten und Befehle weiterentwickeln; Opt-in-Wartungs-Addons wie dependency-upgrade helfen ihm, sich aktuell zu halten.',
        },
        {
          label: 'Git-nativ, wiederaufnehmbar, .dwp/',
          detail:
            'Kein Daemon und kein externer Zustand. Pläne und Entwürfe landen in einem per gitignore ausgeschlossenen .dwp/-Ordner, und jede Aufgabe setzt allein aus git wieder auf — selbst nach einem Kontextüberlauf.',
        },
      ],
    },
    agents: {
      badge: 'Agenten',
      title: 'Funktioniert mit dem Agenten, den Sie bereits nutzen.',
      subtitle:
        'Eine Methodik, viele Adapter. Markdown koppelt das Framework an nichts — jeder Agent, der Markdown liest, kann einen Deep Work Plan ausführen.',
      fullLabel: 'Vollständig',
      partialLabel: 'Teilweise',
      viewAllCta: 'Alle Agenten ansehen',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'Referenzimplementierung, mit nativem WebFetch und Slash-Befehlen.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'Vollständiger Adapter. Nutzen Sie das Offline-Bundle, falls WebFetch gesperrt ist.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'Offline-Bundle empfohlen; Regeln werden unter .codex/ installiert.',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: 'Vollständiger Adapter — die dwp-*-Befehle laufen über AGENTS.md und #-Prozeduren.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Erfordert Gemini 2.5 Pro oder neuer, mit nativem WebFetch.',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: 'Open Source. Liest AGENTS.md nativ und führt dwp-* über #-Befehle aus.',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: 'Regeln plus #-Befehlsprozeduren steuern den vollständigen Deep Work Plan Loop.',
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'Open Source. Markdown-Regeln und #-Befehle führen jeden dwp-*-Schritt aus.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'Vollständiger Adapter mit nativer Befehlsoberfläche.',
        },
      ],
    },
    stacks: {
      badge: 'Stacks',
      title: 'Reasoning-Presets für die Stacks, auf die es ankommt.',
      subtitle:
        'Dies sind Hilfen zum Schlussfolgern, keine Vorlagen. Das Onboarding liest die echten Manifeste Ihres Repositorys und passt sich je Stack an — es kopiert ein Preset nie blind. Monorepos erhalten Dokumentation je Modul.',
      viewAllCta: 'Alle Presets ansehen',
      items: [
        { name: 'Django', sub: 'DRF · Poetry' },
        { name: 'FastAPI', sub: 'Pydantic · Poetry' },
        { name: 'Vue', sub: 'Vite · TypeScript' },
        { name: 'React', sub: 'Next · Vite · TS' },
        { name: 'Astro', sub: 'Svelte/React · MDX' },
        { name: 'TypeScript · Node', sub: 'Express · Fastify' },
        { name: 'TypeScript · Lambda', sub: 'Serverless · SAM' },
        { name: 'Go', sub: 'Module · stdlib' },
        { name: 'Rust', sub: 'Cargo · 2021+' },
        { name: 'Generisch', sub: 'Beliebiger Stack' },
      ],
    },
    archetypes: {
      badge: 'Zwei Archetypen',
      title: 'Einzel-Repository oder Orchestrator-Hub.',
      subtitle:
        'Das Onboarding verzweigt anhand des Archetyps. Die meisten Repositorys sind Einzel-Repositorys. Ein Hub koordiniert untergeordnete Deep Work Plans über viele Repositorys hinweg. Die Methodik behandelt beide als gleichwertig.',
      individual: {
        tag: 'Regelfall',
        title: 'Einzel-Repository',
        description:
          'Eine einzelne Codebasis mit einem primären Stack, eigenen Validierungsbefehlen und Dokumentation je Modul. Die Voreinstellung — das Onboarding nimmt sie an, sofern das Repository nicht eindeutig ein Hub ist.',
        example:
          'Zum Beispiel eine Django-API, eine Vue-App oder ein TypeScript-Lambda-Service.',
      },
      orchestrator: {
        tag: 'Koordination',
        title: 'Orchestrator-Hub',
        description:
          'Ein Koordinations-Repository, das Arbeit über Sub-Repositorys hinweg mittels eines Orchestrator-Manifests orchestriert und untergeordnete Pläne erzeugt, die jeweils im eigenen Repository committen, ergänzt um Grenzregeln und einen Navigationsindex.',
        example:
          'Zum Beispiel ein Hub, der fünf Produkt-Repositorys koordiniert.',
      },
    },
    comparison: {
      badge: 'Methodik versus Werkzeug',
      title: 'Eine andere Ebene. Ergänzend, nicht konkurrierend.',
      subtitle:
        'Deep Work Plan ist kein weiterer Scaffolder. Es ist die Methodikebene unterhalb jedes spec-driven oder Scaffolding-Werkzeugs, ausgerichtet auf mehrstündige autonome Durchläufe.',
      colDwp: 'Deep Work Plan',
      colOthers: 'Scaffolding- / Spec-Werkzeuge',
      rows: [
        {
          label: 'Primärer Fokus',
          dwp: 'Mehrstündige autonome Ausführung',
          others: 'Spec- oder Scaffold-Erzeugung',
        },
        {
          label: 'Arbeitseinheit',
          dwp: 'Ein Deep Work Plan (wiederaufnehmbare Sitzung)',
          others: 'Ein Spec-Dokument oder ein Scaffold',
        },
        {
          label: 'Zustandsmodell',
          dwp: 'Git-nativer .dwp/-Ordner, wiederaufnehmbar',
          others: 'Oft extern oder in der IDE',
        },
        {
          label: 'Agenten-Kopplung',
          dwp: 'Agenten-agnostisch (Markdown und Bash)',
          others: 'Oft werkzeug- oder IDE-spezifisch',
        },
        {
          label: 'Kontextwiederherstellung',
          dwp: 'Setzt nach Kontextüberlauf wieder auf',
          others: 'Startet die Aufgabe typischerweise neu',
        },
        {
          label: 'Lizenz',
          dwp: 'MIT, offene Methodik und offenes Kit',
          others: 'Unterschiedlich',
        },
      ],
    },
    origin: {
      badge: 'Ursprung',
      quote:
        'Entwickelt von Dailybot — dem Unternehmen hinter asynchronen Standups für verteilte Teams. Intern haben wir Deep Work Plans genutzt, um Produktions-Repositorys über Django, Vue, TypeScript-Lambda und Astro hinweg agenten-steuerbar zu machen. Nach Monaten im Produktiveinsatz haben wir die Methodik unter MIT als Open Source freigegeben.',
      attribution: 'Das Engineering-Team von Dailybot',
      dailybotCta: 'Mehr über Dailybot erfahren',
    },
    finalCta: {
      badge: 'Machen Sie Ihr Repository AI-first',
      title: 'Geben Sie Ihren Agenten Deep Work.',
      subtitle:
        'Geben Sie Ihrem Agenten eine Zeile — richten Sie ihn auf /init.md — und er macht Ihr Repository AI-first: Er installiert die Skill, schlussfolgert über Ihren Stack und committet eine vollständige AGENTS.md-Hierarchie. Von dort aus erstellen und führen Sie Deep Work Plans aus, die stundenlang autonom laufen.',
      primaryCta: 'Den /init-Prompt öffnen',
      secondaryCta: 'Methodik lesen',
      meta: 'MIT-lizenziert · keine Telemetrie · Ausgaben in einen per gitignore ausgeschlossenen .dwp/-Ordner.',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'Kontakt',
    nameLabel: 'Name',
    namePlaceholder: 'Ihr Name',
    emailLabel: 'E-Mail',
    emailPlaceholder: 'ihre@email.com',
    messageLabel: 'Nachricht',
    messagePlaceholder: 'Schreiben Sie Ihre Nachricht …',
    sendButton: 'Nachricht senden',
  },

  // About page
  aboutPage: {
    title: 'Über die Methodik',
    subtitle: 'Offene Methodik · MIT-lizenziert',
    description:
      'Deep Work Plan ist eine offene, framework-agnostische Methodik für ernsthafte Engineering-Arbeit mit KI-Coding-Agenten. Woher sie kommt und wer sie pflegt.',
    heroDescription:
      'Eine wiederholbare Struktur, um Deep Work mit KI-Coding-Agenten zu planen, auszuführen und zu verifizieren — offen entwickelt und frei nutzbar.',
    bioTitle: 'Was es ist',
    bioText:
      'Deep Work Plan (DWP) ist eine Methodik, kein Produkt. Sie legt fest, wie man ein Ziel in einen vereinbarten Plan überführt, diesen Plan in atomare und unabhängig überprüfbare Aufgaben zerlegt und jede Aufgabe in einer fokussierten Schleife ausführt, die mit einer Prüfung endet.<br /><br />Sie ist bewusst agnostisch gegenüber dem verwendeten KI-Agenten oder Stack — Adapter übertragen dieselbe Kernschleife auf Claude, Cursor, Copilot, Codex, Gemini und mehr. Der Plan, die Aufgaben und das laufende Protokoll sind allesamt reines Markdown, sodass die Arbeit lesbar, prüfbar und versioniert bleibt.',
    passionsTitle: 'Kernprinzipien',
    passions: [
      {
        title: 'Planen vor dem Ausführen',
        description:
          'Es wird kein Code geschrieben, bevor der Plan vereinbart ist. Der Plan ist ein Vertrag zwischen Ihnen und dem Agenten.',
        icon: '\u{1F5FA}️',
        link: '/methodology',
      },
      {
        title: 'Aufgaben sind atomar',
        description:
          'Jede Aufgabe ist so zugeschnitten, dass sie eigenständig ausgeführt und verifiziert und anschließend atomar committet werden kann.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'Alles verifizieren',
        description:
          'Jede Aufgabe endet mit einer expliziten Prüfung, bevor die nächste beginnt, wobei der Fortschritt in git festgehalten wird.',
        icon: '✅',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'Auf einen Blick',
    quickFacts: [
      'Offene Methodik, MIT-lizenziert',
      'Framework- und agenten-agnostisch',
      'Gepflegt von Dailybot und der Community',
      'Enthält eine Spezifikation, Befehle, Adapter, Presets und Beispiele',
      'Nur Markdown — keine Laufzeitumgebung, kein Lock-in',
      'Macht jedes Repository zu einer AI-first, agenten-steuerbaren Codebasis',
    ],
    ctaTitle: 'Wer es pflegt',
    ctaDescription:
      'Deep Work Plan ist aus realer Engineering-Arbeit bei Dailybot entstanden und wird heute von Dailybot gemeinsam mit der Open-Source-Community gepflegt. Methodik, Spezifikation und Kit stehen unter der MIT-Lizenz — frei nutzbar, anpassbar und erweiterbar.',
    ctaCv: 'Methodik lesen',
    ctaContact: 'Schnellstart',
  },

  // Contact page
  contactPage: {
    title: 'Community & Kontakt',
    subtitle: 'Open Source · Community-getrieben',
    description:
      'Deep Work Plan wird offen entwickelt. Finden Sie den Quellcode, eröffnen Sie ein Issue oder beteiligen Sie sich über die untenstehenden Kanäle an der Diskussion — Beiträge sind willkommen.',
    heroDescription:
      'Fragen, Ideen oder Verbesserungen? Deep Work Plan wird öffentlich entwickelt — hier erreichen Sie das Projekt und seine Maintainer.',
    formTitle: 'Eine Nachricht senden',
    nameLabel: 'Name',
    namePlaceholder: 'Ihr Name',
    emailLabel: 'E-Mail',
    emailPlaceholder: 'ihre@email.com',
    reasonLabel: 'Ich möchte Kontakt aufnehmen wegen',
    reasonOptions: [
      { value: '', label: '— Thema auswählen —' },
      { value: 'general', label: 'Allgemein / Einfach Hallo sagen' },
      { value: 'tech-talk', label: 'Tech Talk / Einladung als Sprecher' },
      { value: 'collaboration', label: 'Zusammenarbeit / Partnerschaft' },
      { value: 'project', label: 'Projekt / Arbeitsanfrage' },
      { value: 'dailybot', label: 'Frage zu Dailybot' },
      { value: 'trading', label: 'Fragen zu meinem Trading' },
      {
        value: 'the-library-of-tomorrow',
        label: 'The Library of Tomorrow beitreten',
      },
      { value: 'other', label: 'Sonstiges' },
    ],
    subjectLabel: 'Betreff',
    subjectPlaceholder: 'Worum geht es?',
    messageLabel: 'Nachricht',
    messagePlaceholder: 'Schreiben Sie Ihre Nachricht …',
    sendButton: 'Nachricht senden',
    sendingButton: 'Wird gesendet …',
    successTitle: 'Nachricht gesendet',
    successMessage:
      'Vielen Dank für Ihre Nachricht. Ich melde mich so bald wie möglich zurück.',
    sendAnotherButton: 'Weitere Nachricht senden',
    requiredField: 'Dieses Feld ist erforderlich',
    invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    fallbackMessage:
      'Das Kontaktformular ist derzeit nicht verfügbar. Sie können mich direkt per E-Mail erreichen.',
    fallbackEmailText: 'Schreiben Sie mir eine E-Mail an',
    formNote: 'Ich melde mich so bald wie möglich zurück.',
    socialTitle: 'Vernetzen Sie sich mit mir',
    locationTitle: 'Standort',
    locationText:
      'Ansässig in Kolumbien. Offen für Remote-Zusammenarbeit weltweit.',
    prefillSubjects: {
      generalInquiry: 'Allgemeine Anfrage',
      collaboration: 'Möglichkeit zur Zusammenarbeit',
      projectInquiry: 'Projekt- oder Arbeitsanfrage',
      projectCollaboration: 'Anfrage zur Projektzusammenarbeit',
      startupCollaboration: 'Möglichkeit zur Startup-Zusammenarbeit',
      techTalkInvitation: 'Einladung zum Tech Talk',
      tradingQuestion: 'Trading-Frage',
      dailybotQuestion: 'Frage zu Dailybot',
    },
  },

  contactSection: {
    title: 'Vernetzen wir uns',
    description:
      'Ich bin stets offen für interessante Gespräche, Möglichkeiten zur Zusammenarbeit und neue Ideen. Ob Sie über Technik oder Unternehmertum sprechen oder einfach nur Hallo sagen möchten.',
    ctaText: 'Kontakt aufnehmen',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'de-DE',

  // 404 page
  notFoundPage: {
    title: 'Seite nicht gefunden',
    description:
      'Die gesuchte Seite existiert nicht oder wurde verschoben. Erkunden Sie die Methodik oder kehren Sie zur Startseite zurück, um weiterzustöbern.',
    heading: 'Seite nicht gefunden',
    message:
      'Entschuldigung, die gesuchte Seite existiert nicht oder wurde möglicherweise verschoben. Kehren Sie zur Startseite zurück oder erkunden Sie die Methodik.',
    backHome: 'Zurück zur Startseite',
    exploreMethodology: 'Methodik lesen',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'Die Deep Work Plan Methodik',
      description:
        'Fünf Kapitel vom Manifest bis zu den Archetypen: die Prinzipien, die Kernschleife, Vorlagen, Skills und Agenten sowie die Anpassungen hinter Deep Work Plan.',
    },
    eyebrow: 'Methodik',
    title: 'Die Deep Work Plan Methodik',
    intro:
      'Fünf Kapitel, die Sie von der Philosophie hinter Deep Work Plan zur praktischen Schleife, den Vorlagen und den Anpassungen führen, die Sie täglich nutzen.',
    chapterLabel: 'Kapitel',
    readChapter: 'Kapitel lesen',
    prev: 'Zurück',
    next: 'Weiter',
    backToIndex: 'Alle Kapitel',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Deep Work Plan Spezifikation',
      description:
        'Die lesbare Spezifikation der Deep Work Plan Methodik: das DWP-Format, das Agentenprotokoll, Archetypen, der Dokumentationsstandard und Addons.',
    },
    eyebrow: 'Spezifikation',
    title: 'Spezifikation',
    intro:
      'Die präzise, lesbare Spezifikation der Methodik — die Strukturen und Protokolle, die Menschen und Agenten teilen.',
    tocTitle: 'Auf dieser Seite',
    prev: 'Zurück',
    next: 'Weiter',
    backToIndex: 'Alle Spezifikationsdokumente',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'Das Deep Work Plan Kit',
      description:
        'Die Skill und ihre acht Sub-Skills, Befehle, Adapter, Presets, Opt-in-Addons und Beispiele, die Deep Work Plan über Agenten und Stacks hinweg ausführbar machen.',
    },
    eyebrow: 'Kit',
    title: 'Das Kit',
    intro:
      'Alles, was Sie zur Ausführung der Methodik brauchen: die Skill und ihre Sub-Skills, Slash-Befehle, Agenten-Adapter, Onboarding-Presets, Opt-in-Addons und durchgearbeitete Beispiele.',
    groups: {
      command: {
        title: 'Sub-Skills & Befehle',
        description:
          'Der Skill-Router und seine Sub-Skills (create, execute, refine, resume, status, verify, onboard, author) sowie die schlanken Slash-Befehle, die an sie delegieren.',
      },
      adapter: {
        title: 'Adapter',
        description:
          'Schlanke Integrationen je Agent für Claude, Cursor, Codex und mehr.',
      },
      preset: {
        title: 'Onboarding-Presets',
        description:
          'Reasoning-Leitfäden je Stack, die der onboard-Ablauf nutzt, um Dokumentation, Skills und Validierungsbefehle an Ihr Repository anzupassen.',
      },
      example: {
        title: 'Beispiele',
        description: 'Durchgearbeitete Vorher-Nachher-Anleitungen.',
      },
      addon: {
        title: 'Addons (Opt-in)',
        description:
          'Optionale Fähigkeiten, die der onboard-Ablauf einem Repository hinzufügen kann — nie Teil der AI-first-Baseline.',
      },
    },
    viewDetail: 'Details ansehen',
    prev: 'Zurück',
    next: 'Weiter',
    backToIndex: 'Zurück zum Kit',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Deep Work Plan Beispiele',
      description:
        'Vorher-Nachher-Anleitungen, die dieselbe Engineering-Aufgabe mit und ohne Deep Work Plan zeigen — und den Unterschied bei Zuverlässigkeit und Review.',
    },
    eyebrow: 'Beispiele',
    title: 'Beispiele',
    intro:
      'Sehen Sie die Methodik in Aktion — konkrete Vorher-Nachher-Anleitungen realer Engineering-Aufgaben.',
    viewExample: 'Die Anleitung lesen',
    prev: 'Zurück',
    next: 'Weiter',
    backToGallery: 'Alle Beispiele',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'Schnellstart — Deep Work Plan',
      description:
        'Installieren Sie die Skill, onboarden Sie Ihr Repository, dann planen und führen Sie mit jedem Agenten aus — die Schritte, die Ihr Repository spec-driven und agenten-steuerbar machen.',
    },
    eyebrow: 'Schnellstart',
    title: 'In Minuten starten',
    intro:
      'Installieren Sie die Skill, onboarden Sie Ihr Repository, dann planen und führen Sie mit jedem Agenten aus — die Schritte, die Ihr Repository spec-driven und agenten-steuerbar machen.',
    sequenceTitle: 'Der Adoptionspfad',
    codeLabel: 'Terminal',
    orLabel: 'oder',
    steps: [
      {
        title: 'Die Deep Work Plan Skill installieren',
        description:
          'Fügen Sie die Skill zu Ihrem Repository hinzu — einen Router plus acht Sub-Skills (create, execute, refine, resume, status, verify, onboard, author). Nutzen Sie die Skills-CLI für den schnellsten Weg, oder klonen Sie das Repository und führen Sie das Setup aus, wo git und eine Shell verfügbar sind.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Das Repository onboarden',
        description:
          'Führen Sie die onboard-Sub-Skill aus und lassen Sie den Agenten über Ihr tatsächliches Repository schlussfolgern. Es erzeugt AGENTS.md, eine docs/-Wissensbasis, Dokumentation je Modul und ein agentenübergreifendes .agents/-Verzeichnis (mit dem .claude → .agents-Symlink), bindet die schlanken dwp-*-Befehle ein und legt ein per gitignore ausgeschlossenes .dwp/ an.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Das Kit weiterentwickeln und Addons annehmen',
        description:
          'Nutzen Sie /skill-create und /agent-create (die author-Sub-Skill), um stack-passende Skills, Agenten und Befehle aufzubauen. Das Onboarding bietet außerdem drei Opt-in-Addons — devcontainer, Dailybot und dependency-upgrade —, die Sie nur annehmen, wenn sie passen.',
      },
      {
        title: 'Planen und ausführen',
        description:
          'Erzeugen Sie einen Deep Work Plan und führen Sie ihn Aufgabe für Aufgabe aus, validieren Sie jedes Gate und nehmen Sie über Sitzungen hinweg wieder auf — das Repository wird gegen seine eigene Spezifikation gesteuert.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'Das Ergebnis',
    outcome:
      'Ihr Repository wird spec-driven und agenten-steuerbar: Der Plan ist die dauerhafte Quelle der Wahrheit, und das Repository selbst wird zum Harness, gegen das jeder Agent läuft.',
    nextStepsTitle: 'Nächste Schritte',
    nextSteps: [
      { label: 'Methodik lesen', href: '/methodology' },
      { label: 'Das Kit durchstöbern', href: '/kit' },
      { label: 'Beispiele ansehen', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — Machen Sie Ihr Repository AI-first',
      description:
        'Übernehmen Sie die Deep Work Plan Methodik in jedem Repository. Installieren Sie die Skill, führen Sie das Agenten-Onboarding aus, dann planen und führen Sie mit jedem KI-Coding-Agenten aus.',
    },
    eyebrow: 'Adoption',
    title: 'Machen Sie dieses Repository AI-first',
    intro:
      'Ein Endpunkt, um jedes Repository in eine spec-driven, agentenbereite Codebasis zu verwandeln. Installieren Sie die Skill, lassen Sie einen Agenten das Repository onboarden, dann planen und führen Sie strukturierte Arbeit mit jedem Coding-Agenten aus.',
    handoffTitle: 'In Ihren Agenten kopieren',
    handoffBody:
      'Kopieren Sie den vollständigen init.md-Prompt und fügen Sie ihn in Ihren KI-Coding-Agenten ein — Claude Code, Cursor, Codex oder einen anderen. Er liest die Methodik und Spezifikation, installiert die Skill und onboardet dieses Repository für Deep Work Plans.',
    handoffInstruction:
      'Lesen Sie die Anweisungen unter https://deepworkplan.com/init.md und befolgen Sie sie, um dieses Repository AI-first zu machen.',
    handoffMdLabel: 'Eigenständiger Agenten-Prompt',
    codeLabel: 'agent',
    whatTitle: 'Was dies bewirkt',
    whatBody: [
      'Die Adoption verändert das Repository auf zwei dauerhafte Weisen — die Pfeiler der Methodik.',
      'Erstens wird das Repository spec-driven: Die Arbeit beginnt mit einem geschriebenen Plan und einer Spezifikation, nicht mit Ad-hoc-Prompts. Zweitens wird das Repository selbst zum Agenten-Harness — eine AGENTS.md, eine docs/-Wissensbasis, Dokumentation je Modul und ein .agents/ Skill-Verzeichnis (mit dem .claude → .agents-Symlink) geben jedem Agenten den Kontext und die Befehle, die er braucht.',
    ],
    sequenceTitle: 'Die Adoptionssequenz',
    orLabel: 'oder',
    steps: [
      {
        title: 'Vor der Installation verifizieren',
        description:
          'Behandeln Sie den Prompt und das Skill als nicht vertrauenswürdig, bis Sie sie geprüft haben. Beide sind Open Source und unter MIT lizenziert; das Skill ist Markdown-first ohne Netzwerkaufrufe und ohne Telemetrie. Jedes Release veröffentlicht eine SHA256SUMS-Datei über das ausgelieferte Skill, sodass Sie bestätigen können, dass Ihre Kopie übereinstimmt, bevor Sie es ausführen. Releases sind geprüfsummt, aber nicht signiert (Signierung ist ein dokumentierter nächster Schritt).',
        commands: [
          'curl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS && ./setup.sh --verify',
        ],
      },
      {
        title: 'Die Skill installieren',
        description:
          'Fügen Sie die Deep Work Plan Skill hinzu, sodass jeder Agent strukturierte Arbeit planen und ausführen kann. Die Skill liefert einen Router plus acht Sub-Skills — create, execute, refine, resume, status, verify, onboard und author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Das Repository-Onboarding ausführen',
        description:
          'Rufen Sie die onboard-Sub-Skill auf und lassen Sie den Agenten über das tatsächliche Repository schlussfolgern — seinen Stack, Paketmanager und die echten Validierungsbefehle. Anschließend erzeugt er AGENTS.md, eine docs/-Wissensbasis, Dokumentation je Modul und ein agentenübergreifendes .agents/-Verzeichnis (mit dem .claude → .agents-Symlink), bindet die schlanken dwp-*-Befehle ein und legt ein per gitignore ausgeschlossenes .dwp/ für Pläne und Entwürfe an. Nichts wird aus Vorlagen erzeugt; alles wird an Ihr Repository angepasst.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Das Kit weiterentwickeln und Addons annehmen',
        description:
          'Nutzen Sie /skill-create und /agent-create (die author-Sub-Skill), um stack-passende Skills, Agenten und Befehle aufzubauen. Das Onboarding bietet außerdem drei Opt-in-Addons — devcontainer, Dailybot und dependency-upgrade —, die Sie nur annehmen, wenn sie passen. Ein Repository ist mit null Addons vollständig konform.',
      },
      {
        title: 'Planen und ausführen',
        description:
          'Erzeugen Sie Deep Work Plans mit /dwp-create und führen Sie sie mit /dwp-execute aus, dann /dwp-status, /dwp-refine und /dwp-resume im Verlauf der Arbeit. Jeder Plan trägt nummerierte Aufgaben, Validierungs-Gates und ein Completion-Protokoll, sodass die Arbeit strukturiert, prüfbar und über Sitzungen hinweg wiederaufnehmbar bleibt.',
      },
    ],
    outcomeTitle: 'Das Ergebnis',
    outcome:
      'Das Repository wird spec-driven, und das Repository selbst wird zum Agenten-Harness — Kontext und Befehle reisen mit dem Code.',
    nextStepsTitle: 'Als Nächstes lesen',
    nextSteps: [
      { label: 'Schnellstart', href: '/quickstart' },
      { label: 'Methodik', href: '/methodology' },
      { label: 'Spezifikation', href: '/spec' },
      { label: 'Kit', href: '/kit' },
    ],
  },

  trustPage: {
    meta: {
      title: 'Vertrauen und Sicherheit',
      description:
        'Warum Deep Work Plan sicher zu übernehmen ist: Open Source und MIT, Markdown-first ohne Netzwerkaufrufe oder Telemetrie, nicht-destruktiv konzipiert, mit verifizierbaren Installationen und einer klaren Richtlinie zur Offenlegung von Schwachstellen.',
    },
    eyebrow: 'Vertrauen & Sicherheit',
    title: 'Vertrauen und Sicherheit',
    intro:
      'Niemand sollte ein Skill installieren, dem er nicht vertrauen kann. Deep Work Plan ist so gebaut, dass er verifiziert werden kann — nicht auf Treu und Glauben: Open Source, Markdown-first, nicht-destruktiv und prüfbar, bevor man ihn ausführt. Diese Seite legt offen, was er tut, was er nicht tut und wie beides bestätigt werden kann.',
    pillarsTitle: 'Was Sie vertrauen',
    pillars: [
      {
        title: 'Open Source und MIT-lizenziert',
        body: 'Die Website und das Skill sind beide öffentlich und diff-bar. Sie können jede Zeile lesen, bevor Sie es ausführen, und eine Kopie gegen den Quellcode eines getaggten Releases vergleichen.',
      },
      {
        title: 'Markdown-first — kein Netzwerk, keine Telemetrie',
        body: 'Das Skill hat kein CLI, keine HTTP-API und keinen Authentifizierungsflow. Es führt keine Netzwerkaufrufe durch und sendet keine Telemetrie; sein einziger lokaler Helfer liest git- und Umgebungsmetadaten. Nichts über Ihr Repository verlässt Ihren Rechner.',
      },
      {
        title: 'Nicht-destruktiv konzipiert',
        body: 'Die einzige sicherheitsrelevante Aktion des Skills besteht darin, Ihr Repository zu verändern — und es gleicht ab, anstatt zu überschreiben. Es erkennt, was existiert, schlägt einen Plan vor und fragt nach, bevor es etwas ersetzt. Plan-Ausgaben landen in einem gitignorierten .dwp/-Verzeichnis.',
      },
      {
        title: 'Berührt keine Geheimnisse',
        body: 'Die Methodik überträgt niemals Geheimnisse in die Versionskontrolle und hält den Arbeitsstatus außerhalb davon. Das Onboarding ergänzt die .gitignore, anstatt sie zu überschreiben, und jede Änderung soll in kleinen, lesbaren Diffs überprüft werden.',
      },
      {
        title: 'Verifizierbare Herkunft',
        body: 'Jedes Release veröffentlicht Prüfsummen über das ausgelieferte Skill, sodass Sie bestätigen können, dass eine heruntergeladene Kopie mit dem übereinstimmt, was veröffentlicht wurde, bevor Sie ihr vertrauen.',
      },
    ],
    verifyTitle: 'Vor der Ausführung verifizieren',
    verifyIntro:
      'Behandeln Sie das Skill als nicht vertrauenswürdig, bis Sie es geprüft haben. Jedes Release fügt eine SHA256SUMS-Datei bei, die das ausgelieferte Skill abdeckt. Laden Sie sie für die Version herunter, die Sie installieren möchten, und verifizieren Sie dann, dass Ihre Kopie übereinstimmt — ein Exit-Code ungleich null bedeutet, dass eine Datei nicht übereinstimmt, und Sie sollten stoppen.',
    codeLabel: 'shell',
    verifyNote:
      'Releases sind mit Prüfsummen versehen, aber nicht signiert — Signierung (cosign oder Betreuer-GPG) ist ein dokumentierter nächster Schritt, keine aktuelle Aussage. Da alles offen ist, können Sie auch jede Datei gegen das Repository bei seinem Tag vergleichen.',
    disclosureTitle: 'Eine Schwachstelle melden',
    disclosureBody:
      "Eine Sicherheitslücke gefunden? Melden Sie sie privat über GitHub's Private Vulnerability Reporting im entsprechenden Repository — das Skill oder die Website (siehe die unten verlinkten Sicherheitsrichtlinien) — anstatt ein öffentliches Issue zu eröffnen, das das Problem vor einem Fix offenbart.",
    resourcesTitle: 'Vertrauensressourcen',
    linkManifest: 'Maschinenlesbares Vertrauensmanifest',
    linkSecurityTxt: 'security.txt (RFC 9116)',
    linkPolicy: 'Website-Sicherheitsrichtlinie',
    linkSkillPolicy: 'Skill-Sicherheitsrichtlinie & Bedrohungsmodell',
    limitationsTitle: 'Ehrliche Einschränkungen',
    limitations: [
      'Releases sind mit Prüfsummen versehen, aber noch nicht kryptographisch signiert — Signierung ist geplant, aber noch nicht umgesetzt.',
      'Deep Work Plan führt einen autonomen Coding-Agenten gegen Ihr Repository aus. Überprüfen Sie den vorgeschlagenen Plan und die Diffs; die Methodik ist für diese Überprüfung konzipiert, nicht um sie zu ersetzen.',
      'Vertrauensaussagen hier beschreiben nur die offiziellen Quellen. Eine modifizierte oder von Drittanbietern stammende Kopie, die von den Repositories abgewichen ist, trägt keine dieser Garantien — verifizieren Sie sie zuerst.',
    ],
    ctaTitle: 'Übernehmen Sie es mit Zuversicht',
    ctaBody:
      'Lesen Sie die Methodik und die Spezifikation, richten Sie einen Agenten auf den Init-Endpunkt und verifizieren Sie die Installation, bevor Sie sie ausführen.',
    ctaPrimary: 'Methodik lesen',
    ctaSecondary: 'Adoption (Init)',
  },
};
