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
    developers: 'Entwickler',
    privacy: 'Datenschutz',
    github: 'GitHub',
    faq: 'FAQ',
    compare: 'Vergleich',
    resources: 'Ressourcen',
    resourcesDesc: 'Beispiele, Vergleich, FAQ und Vertrauen',
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

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'Neu · Token-effizient',
    text: 'Deep Work Plan ist heute auf Product Hunt',
    tagline: 'Gib deinem Agenten einen Plan',
    linkText: 'Jetzt upvoten',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Seitennavigation',
    sections: {
      methodology: 'Methodik',
      getStarted: 'Erste Schritte',
      project: 'Projekt',
      connect: 'Verbinden',
      learn: 'Lernen',
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
        'Deep Work Plan verwandelt jedes Repository in eine strukturierte Umgebung — Kontext, Guardrails und einen dauerhaften Plan — in der jeder Coding-Agent präzise und effizient arbeitet und langlaufende Arbeit abschließt.',
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
      scrollCta: 'So funktioniert es',
    },
    pitch: {
      kicker: 'Das Problem und die Antwort',
      problem:
        'In kurzen Spitzen sind Coding-Agenten beeindruckend. Übergeben Sie ihnen eine langlaufende Mission — eine Migration, ein neues Subsystem, eine Refaktorierung über Dutzende Dateien —, driftet der Agent ab: Der Kontext füllt sich, frühere Entscheidungen verblassen und stundenlange Arbeit bleibt auf halbem Weg liegen.',
      answer:
        'Deep Work Plan antwortet mit spec-driven development: ein dauerhafter Plan, atomare Aufgaben und Validierungs-Gates, die der Agent bestehen muss. „Fertig“ ist kein Gefühl mehr — es wird zu überprüfbarer, reviewbarer Evidenz.',
      efficiency:
        'Und weil der Kontext die knappste Ressource Ihres Agenten ist, ist das Harness auf Token-Effizienz ausgelegt: Anweisungen laden progressiv, Validierung berührt nur Geändertes, und jede Aufgabe lernt lokal — so bleibt langlaufende Arbeit erschwinglich.',
      illustrationAlt:
        'Ein Diptychon: links ein im Nebel neben Felsen abtreibendes Schiff, rechts dasselbe Schiff auf gezeichnetem Kurs ruhig Richtung Hafenfeuer.',
    },
    story: {
      act1: {
        kicker: 'Die Methode · Akt I',
        lead: 'Sie entscheiden, was „fertig“ heißt und wo die Grenzen verlaufen. Der Plan trägt Ihre Absicht; die Agenten verrichten die Stundenarbeit — ohne ständige Beaufsichtigung, ohne Korrekturen alle zwanzig Minuten.',
        deepLinkLabel: 'Lesen Sie die Methodik',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: 'Die Methode · Akt II',
        lead: 'Lange Aufgaben füllen den Kontext jedes Modells. Details gehen verloren, der Agent driftet. Ein geschriebener Plan — atomare Aufgaben, Validierungs-Gates, wiederaufnehmbarer Zustand — ist der Ankerpunkt, zu dem er Runde für Runde zurückkehrt.',
        deepLinkLabel: 'Kernzyklus ansehen',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: 'Die Methode · Akt III',
        lead: 'Jede Aufgabe nennt ihre Abnahmekriterien und die Prüfungen, die bestehen müssen. Der Agent darf sich nicht fertig fühlen — er muss bestehen, sonst bleibt die Aufgabe offen.',
        deepLinkLabel: 'Spezifikation lesen',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: 'Die Methode · Akt IV',
        lead: 'Kontext, Werkzeuge, Leitplanken und Zustand liegen als einfache Dateien in Ihrem Repository, die jeder Agent lesen kann. Kein Lock-in, kein externes Gehirn — übersteht Kontext-Resets.',
        deepLinkLabel: 'Sehen Sie, was das Onboarding erzeugt',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: 'Die Methode · Akt V',
        lead: 'Der Kontext ist die knappste Ressource Ihres Agenten. Das Harness lädt progressiv, validiert nur Geändertes und lernt Aufgabe für Aufgabe — so amortisiert sich der Plan selbst.',
        deepLinkLabel: 'Lesen Sie die Methodik',
        deepLinkHref: '/methodology',
      },
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
          title: 'Legt .agents/ mit den .claude- und .cursor-Symlinks an',
          description:
            'Ein agentenübergreifendes .agents/-Verzeichnis (Skills, Agenten, Befehle) und die .claude- und .cursor-zu-.agents-Symlinks, sodass jedes Werkzeug eine einzige Quelle der Wahrheit liest.',
        },
        {
          title: 'Installiert die DWP-Skill und legt .dwp/ an',
          description:
            'Bindet die Deep Work Plan Skill ein und erstellt den per gitignore ausgeschlossenen .dwp/-Ordner für Pläne und Entwürfe, installiert das verpflichtende lokale AI Diff Reviewer-Review und ergänzt anschließend optional Opt-in-Addons wie Devcontainer-Unterstützung.',
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
          label: '.agents/ mit den .claude- und .cursor-zu-.agents-Symlinks',
          detail:
            'Ein agentenübergreifendes .agents/-Verzeichnis (Skills, Agenten, Befehle) mit den .claude- und .cursor-zu-.agents-Symlinks, sodass jedes Werkzeug eine einzige Quelle der Wahrheit liest.',
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
      tertiaryCta: 'Für Agenten & Entwickler',
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
    agentTitle: 'Für KI-Agenten',
    agentIntro:
      'Dieser Pfad existiert nicht. Die Wiederherstellungslinks unten (und ihre maschinenlesbaren Entsprechungen) listen jede Seite dieser Website auf.',
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
      'Alles, was Sie zur Ausführung der Methodik brauchen: die Skill und ihre Sub-Skills, Slash-Befehle, Agenten-Adapter, Onboarding-Presets, das verpflichtende lokale Review und Opt-in-Addons sowie durchgearbeitete Beispiele.',
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
          'Fähigkeiten, die der onboard-Ablauf einem Repository hinzufügt: das verpflichtende lokale AI Diff Reviewer-Review sowie vier optionale Addons, die nie Teil der AI-first-Baseline sind.',
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
          'Führen Sie die onboard-Sub-Skill aus und lassen Sie den Agenten über Ihr tatsächliches Repository schlussfolgern. Es erzeugt AGENTS.md, eine docs/-Wissensbasis, Dokumentation je Modul und ein agentenübergreifendes .agents/-Verzeichnis (mit den .claude → .agents- und .cursor → .agents-Symlinks), bindet die schlanken dwp-*-Befehle ein und legt ein per gitignore ausgeschlossenes .dwp/ an.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Das Kit weiterentwickeln und Addons annehmen',
        description:
          'Nutzen Sie /skill-create und /agent-create (die author-Sub-Skill), um stack-passende Skills, Agenten und Befehle aufzubauen. Das Onboarding installiert das verpflichtende lokale AI Diff Reviewer-Review (sein CI-Gate bleibt optional) und bietet vier Opt-in-Addons — devcontainer, Dailybot, dependency-upgrade und design-system —, die Sie nur annehmen, wenn sie passen.',
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
      'Erstens wird das Repository spec-driven: Die Arbeit beginnt mit einem geschriebenen Plan und einer Spezifikation, nicht mit Ad-hoc-Prompts. Zweitens wird das Repository selbst zum Agenten-Harness — eine AGENTS.md, eine docs/-Wissensbasis, Dokumentation je Modul und ein .agents/ Skill-Verzeichnis (mit den .claude → .agents- und .cursor → .agents-Symlinks) geben jedem Agenten den Kontext und die Befehle, die er braucht.',
    ],
    sequenceTitle: 'Die Adoptionssequenz',
    orLabel: 'oder',
    steps: [
      {
        title: 'Vor der Installation verifizieren',
        description:
          'Behandeln Sie den Prompt und das Skill als nicht vertrauenswürdig, bis Sie sie geprüft haben. Beide sind Open Source und unter MIT lizenziert; das Skill ist Markdown-first ohne Netzwerkaufrufe und ohne Telemetrie. Jedes Release veröffentlicht eine SHA256SUMS-Datei über das ausgelieferte Skill, sodass Sie bestätigen können, dass Ihre Kopie übereinstimmt, bevor Sie es ausführen. Releases sind geprüfsummt, aber nicht signiert (Signierung ist ein dokumentierter nächster Schritt).',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'Die Skill installieren',
        description:
          'Fügen Sie die Deep Work Plan Skill hinzu, sodass jeder Agent strukturierte Arbeit planen und ausführen kann. Die Skill liefert einen Router plus acht Sub-Skills — create, execute, refine, resume, status, verify, onboard und author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Das Repository-Onboarding ausführen',
        description:
          'Rufen Sie die onboard-Sub-Skill auf und lassen Sie den Agenten über das tatsächliche Repository schlussfolgern — seinen Stack, Paketmanager und die echten Validierungsbefehle. Anschließend erzeugt er AGENTS.md, eine docs/-Wissensbasis, Dokumentation je Modul und ein agentenübergreifendes .agents/-Verzeichnis (mit den .claude → .agents- und .cursor → .agents-Symlinks), bindet die schlanken dwp-*-Befehle ein und legt ein per gitignore ausgeschlossenes .dwp/ für Pläne und Entwürfe an. Bei großen Repositories nutzt die onboard-Sub-Skill einen plangesteuerten Pfad: Sie schließt die Aufklärung ab und gibt dann einen Onboarding-Deep-Work-Plan aus. Nichts wird aus Vorlagen erzeugt; alles wird an Ihr Repository angepasst.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Lokales Review und Opt-in-Addons',
        description:
          'Das Onboarding installiert das verpflichtende lokale AI Diff Reviewer-Review (sein CI-Gate bleibt optional) und bietet vier Opt-in-Addons — devcontainer, Dailybot, dependency-upgrade und design-system —, die Sie nur annehmen, wenn sie passen. Ein Repository ist mit null optionalen Addons vollständig konform. Nutzen Sie /skill-create und /agent-create (die author-Sub-Skill), um stack-passende Skills, Agenten und Befehle über die Basislinie hinaus aufzubauen.',
      },
      {
        title: 'Planen und ausführen',
        description:
          'Erzeugen Sie Deep Work Plans mit /dwp-create und führen Sie sie mit /dwp-execute aus, dann /dwp-status, /dwp-refine, /dwp-resume und /dwp-verify im Verlauf der Arbeit. Jeder Plan trägt nummerierte Aufgaben, Validierungs-Gates und ein Completion-Protokoll — abschließend mit drei obligatorischen Endaufgaben: einer Sicherheitsüberprüfung, einer Skills-&-Agenten-Erkennung und einem Executive Report.',
      },
      {
        title: 'Konformität verifizieren',
        description:
          'Führen Sie /dwp-verify aus, um einen objektiven Bestanden/Nicht-bestanden-Bericht gegen die Spezifikation zu erhalten. Bestätigen Sie, dass AGENTS.md, docs/ (mit echtem Inhalt, keinen Stubs), .agents/ (mit schlanken dwp-*-Delegatoren und einem Katalog, der mit dem Dateisystem übereinstimmt), .dwp/ und tmp/ vorhanden sind — nichts aus Vorlagen, alles für dieses Repository durchdacht.',
        commands: ['/dwp-verify'],
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

  faqPage: {
    meta: {
      title: 'Häufig gestellte Fragen — Deep Work Plan',
      description:
        'Antworten auf häufige Fragen zu Deep Work Plan: Was es tut, wie Gates und Wiederaufnahme funktionieren, der Vergleich mit anderen Werkzeugen und die Adoption.',
    },
    eyebrow: 'FAQ',
    title: 'Häufig gestellte Fragen',
    intro:
      'Kurze Antworten auf die häufigsten Fragen zu Deep Work Plan, jeweils mit einem Link zur Seite, die tiefer geht.',
    groups: [
      {
        id: 'what',
        title: 'Was Deep Work Plan ist',
        items: [
          {
            id: 'what-is-it',
            question: 'Was macht Deep Work Plan eigentlich?',
            answer:
              'Deep Work Plan verwandelt ein Repository in eine strukturierte Umgebung, in der ein Coding-Agent lange Arbeit zuverlässig ausführt. Er installiert sich als Agenten-Skill und onboardet das Repository einmal (einen `AGENTS.md`-Index, einen `docs/`-Baum, ein `.agents/`-Kit aus Skills und Befehlen, einen per gitignore ausgeschlossenen `.dwp/`-Ausgabebereich); von da an wird jedes Ziel zu einem Plan: atomare Aufgaben, jede mit Akzeptanzkriterien und einem Validierungs-Gate, einzeln ausgeführt, committet, sobald sie besteht, und von jedem Agenten von der Festplatte wieder aufnehmbar. Der Plan schließt mit einem Final Review, der die Sicherheit prüft und den Endzustand validiert. Die Methodik steht unter der MIT-Lizenz und funktioniert mit jedem Coding-Agenten, der ein Repository liest.',
            linkLabel: 'Methodik lesen',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: 'Für wen ist es?',
            answer:
              'Entwickler und Teams, die Coding-Agenten echte, mehrschrittige Arbeit übergeben und wollen, dass sie zu Ende geht. Es passt, wenn eine Aufgabe mehr als eine Sitzung, mehr als eine Dateifamilie oder mehr als einen Agenten umspannt; wenn ein Teammitglied dort anknüpfen können muss, wo ein Agent aufgehört hat; oder wenn „fertig“ „validiert“ heißen muss und nicht „der Agent behauptet es“. Ein Einzeiler braucht keinen Plan, und genau das sagt die Methodik: Ihre Regel des proportionalen Rigors empfiehlt stattdessen Ziel, Kriterien und Gate direkt inline.',
            linkLabel: 'Schnellstart',
            linkPath: '/quickstart',
          },
          {
            id: 'is-it-a-tool',
            question: 'Ist es ein Werkzeug, ein Framework oder eine Methodik?',
            answer:
              'Eine Methodik, verpackt als installierbare Skill. Es gibt keinen Server, kein Konto, kein proprietäres Format und keine Laufzeitumgebung über den Coding-Agenten hinaus, den Sie bereits nutzen. Installiert werden Anweisungen, die der Agent liest, eine kleine Reihe von Shell-Skripten zur Kontexterfassung und zur Konformitätsprüfung sowie die Konventionen, die Ihr Repository übernimmt. Alles, was der Plan erzeugt, ist Markdown und JSON in Ihrem Repository — lesbar ohne jedes Werkzeug.',
            linkLabel: 'Spezifikation lesen',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: 'Mit welchen Coding-Agenten funktioniert es?',
            answer:
              'Jeder Agent, der Repository-Dateien liest. Die Skill folgt dem offenen Agent-Skills-Standard und der `AGENTS.md`-Konvention, sodass Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot und andere sie über ihr gewöhnliches Laden von Skills und Anweisungen aufnehmen. Die eigene Evaluation der Methodik zeigt einen Plan, der vom Agenten eines Anbieters gestartet und vom Agenten eines anderen wieder aufgenommen wurde — in beide Richtungen. Installationsabdeckung und Verhaltensevidenz stehen je Agent in der Kompatibilitätsmatrix, und beides wird nie vermischt.',
            linkLabel: 'Das Kit durchstöbern',
            linkPath: '/kit',
          },
        ],
      },
      {
        id: 'how',
        title: 'Wie ein Plan abläuft',
        items: [
          {
            id: 'gates',
            question:
              'Wie sind die Validierungs-Gates implementiert? Erfordern sie eine menschliche Freigabe?',
            answer:
              'Es sind ausführbare Zusicherungen, die der Agent selbst ausführt. Die menschliche Freigabe rahmt den Durchlauf: Eine Person genehmigt den Plan vor der Ausführung und prüft den finalen Diff zum Zeitpunkt des Pull Requests; die Ausführung dazwischen ist autonom. Jede Aufgabe nennt konkrete Befehle, typischerweise das eigene Quality-Gate des Repositorys, ausgewählt aus der berührten Oberfläche der Aufgabe: die Tests des geänderten Verhaltens und seiner Konsumenten, ausgeweitet auf die gesamte Suite, wenn die Änderung geteilt ist oder sich nicht abgrenzen lässt. Eine Aufgabe wird erst dann als erledigt markiert, wenn diese Befehle erfolgreich durchlaufen, und Aufgaben, die Verhalten ändern, müssen die Tests erweitern. Schlägt ein Befehl fehl, wird die Aufgabe als blockiert markiert und der Agent stoppt.',
            linkLabel: 'Die Kernschleife',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              'Wie bleibt der Plan aktuell, wenn Menschen den Code zwischen den Durchläufen ändern?',
            answer:
              'Auf drei Wegen. Aufgaben sind als Verhalten geschrieben, nicht als Edits: Ein Akzeptanzkriterium sagt, was das System tun muss, sodass eine umbenannte Datei oder eine ausgetauschte Implementierung es nicht ungültig macht. Jedes Gate läuft erneut gegen das Repository, wie es gerade ist; eine zerbrochene Annahme schlägt beim nächsten Durchlauf laut fehl, statt still zu driften, und genau dieses Scheitern ist der Anstoß zum Verfeinern. Und Dokumentation synchron zu halten ist Teil der Arbeit: Eine Aufgabe, die Verhalten ändert, aktualisiert innerhalb ihres eigenen Gates auch die docs und das auf Agenten ausgerichtete Kit, die es beschreiben. Jeder Durchlauf sollte das Repository agentenbereiter hinterlassen, als er es vorgefunden hat.',
            linkLabel: 'Methodik lesen',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              'Kann ich den Plan während des Durchlaufs ändern, ohne abgeschlossene Arbeit zu verlieren?',
            answer:
              'Ja — einen teilweise ausgeführten Plan zu verfeinern ist eine vollwertige Aktion. Aufgabendefinitionen und Ausführungszustand werden getrennt gehalten: Der Plan ist eine Checkliste auf der Festplatte plus eine kleine Zustandsdatei, sodass das Erledigte unabhängig vom Aufgabentext aufgezeichnet bleibt. Stellt sich eine Aufgabe als falsch heraus, markiert der Agent sie als blockiert und stoppt, statt einfach weiterzuarbeiten. Sie bearbeiten anschließend die Aufgaben, die noch nicht gelaufen sind — ändern, ordnen um, teilen auf oder streichen sie —, während abgeschlossene Aufgaben abgeschlossen bleiben. Die Wiederaufnahme baut den Zustand aus der Festplatte und dem tatsächlichen Repository neu auf und führt die Gates, auf die es ankommt, erneut aus; nichts, was sich darunter verschoben hat, schlüpft durch.',
            linkLabel: 'Die Kernschleife',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              'Prüft es die Arbeit fortlaufend gegen den Plan, oder ist der Plan nur eine einmalige Sache am Anfang?',
            answer:
              'Der Plan ist eine fortlaufende Prüfung. Der Agent arbeitet eine kleine Aufgabe nach der anderen ab und muss validieren, bevor er weitergeht — abirren kann er einen Schritt, nicht drei. Jede Aufgabe trägt Akzeptanzkriterien plus die exakten Befehle, die sie belegen, und der Fortschritt wird während der Arbeit mit einem Status je Aufgabe ins Repository geschrieben, sodass Drift für Sie, für die nächste Sitzung und für den nächsten Agenten sichtbar wird. Ein Plan ist nicht fertig, bis alles validiert — einschließlich des Final Review. Der ehrliche Vorbehalt: Die Methodik kann nicht verhindern, dass ein Agent von vornherein ein schwaches Akzeptanzkriterium schreibt; sie macht Drift laut statt still.',
            linkLabel: 'Die Kernschleife',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              'Wird der Plan einmal erzeugt und von Hand gepflegt, oder entwickelt er sich mit dem Code weiter?',
            answer:
              'Weder noch. Er wird einmal aus einem Ziel erzeugt und anschließend als Teil der Arbeit gepflegt. Der Plan wird bewusst nicht aus Code-Diffs neu geschrieben, denn eine Spezifikation, die dem Code hinterherläuft, wird zu einem hinterherhinkenden Spiegel — genau der Drift, zu dessen Beseitigung die Methodik existiert. Absichtlich entwickelt er sich weiter: Gates laufen erneut gegen das aktuelle Repository, ein scheiterndes Gate löst eine Verfeinerung aus, und der Agent führt diese Verfeinerung während des Durchlaufs aus, während Sie vorab genehmigen und am Ende prüfen. Dokumentation und Tests entwickeln sich durch ihre Konstruktion mit dem Code weiter, weil ihre Aktualisierung innerhalb des Gates jeder Aufgabe liegt.',
            linkLabel: 'Methodik lesen',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: 'Was passiert, wenn die Sitzung auf halbem Weg abstirbt?',
            answer:
              'Der Fortschritt lebt auf der Festplatte, nicht im Chat. Die README-Checkboxen, das Protokoll jeder Aufgabe, ein begrenzter Arbeitsindex und eine maschinenlesbare Zustandsdatei werden an jeder Aufgabengrenze aktualisiert, und die Zustandsdatei zeichnet vor jeder geplanten Pause einen Checkpoint auf. Eine frische Sitzung oder ein anderer Agent liest diesen kompakten Index, gleicht ihn mit dem Repository und der Git-Historie ab und setzt bei der ersten unvollständigen Aufgabe fort, ohne fertige Arbeit zu wiederholen. Selbst eine unterbrochene Planerstellung ist wiederherstellbar: Identität und beabsichtigte Aufgabenliste des Plans werden vor jeder Aufgabendatei geschrieben, sodass ein halb erzeugter Plan vervollständigt oder verworfen werden kann, statt geraten zu werden.',
            linkLabel: 'Die Kernschleife',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'Was ist der Final Review?',
            answer:
              'Die einzige verpflichtende Abschlussaufgabe jedes Plans. Der Reihe nach: ein Sicherheitstest über die vollständige kumulierte Änderungsmenge des Plans, einschließlich eines erforderlichen lokalen Reviews des Diffs durch die AI Diff Reviewer-Skill, wobei kritische Befunde den Abschluss blockieren, bis sie behoben oder ausdrücklich akzeptiert sind; eine Validierung des Endzustands, das heißt die vollständigen einschlägigen Test-, Lint-, Typ- und Format-Suiten des Repositorys auf dem finalen Code; und ein Abgleich der Skills-Entscheidungen, die jede Aufgabe aufgezeichnet hat. Der Agent berichtet anschließend Ergebnisse, Evidenz und Einschränkungen und bietet einmalig einen Executive Report an, erzeugt ihn aber nur auf Anfrage.',
            linkLabel: 'Die Spezifikation',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'compare',
        title: 'Im Vergleich',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              'Wie unterscheidet es sich von spec-driven Werkzeugen wie Spec Kit, OpenSpec oder Kiro?',
            answer:
              'Sie lösen angrenzende Probleme. Spec-driven Werkzeuge sind ausgezeichnet darin festzuhalten, was sich ändern soll: Spezifikationen, Anforderungen und Änderungsvorschläge in wiederholbarer Form. Deep Work Plan handelt davon, wie ein Agent stundenlang arbeitet, ohne abzudriften: das per Onboarding eingerichtete Harness, Validierungs-Gates je Aufgabe, ausgewählt aus der berührten Oberfläche, wiederaufnehmbarer Zustand auf der Festplatte, ein verpflichtender Final Review mit Sicherheitstest und ein Konformitätsprüfer für das Repository selbst. Beides lässt sich kombinieren, etwa indem eine Spezifikation oder ein Änderungsvorschlag einen Plan speist. Die Vergleichsseite legt die Fähigkeiten nebeneinander, jeweils in den eigenen Begriffen jedes Werkzeugs.',
            linkLabel: 'Vergleich ansehen',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'Wie unterscheidet es sich von Agenten-Workflow-Frameworks wie BMAD, Superpowers oder Get Shit Done?',
            answer:
              'Diese Frameworks bringen starke Arbeitsstile mit: Rollen, Prinzipien, Test-first-Schritte, Verifizierungsgewohnheiten. Deep Work Plan konzentriert sich darauf, was im Repository bleibt und was sich prüfen lässt: ein Harness, das jeder Agent ohne Vorkenntnisse liest, Aufgabendateien mit Akzeptanzkriterien und Gates, Zustand, der eine Sitzung überlebt, ein Konformitätsprüfer mit CI-freundlichem Exit-Code und eine veröffentlichte Messung, wie viele Instruktions-Bytes jeder Flow lädt. Es ist konstruktionsbedingt werkzeug-agnostisch und fügt der Kernschleife keinen Dienst, keinen Provider und kein Geheimnis hinzu. Die Vergleichsseite zeigt, wo jeder Ansatz integriert, optional oder nicht im Umfang ist.',
            linkLabel: 'Vergleich ansehen',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question:
              'Warum nicht einfach den eingebauten Plan-Modus meines Agenten nutzen?',
            answer:
              'Eingebaute Plan-Modi sind nützlich, und Deep Work Plan baut auf demselben Substrat auf: der `AGENTS.md`-Konvention und dem offenen Agent-Skills-Standard. Der Unterschied liegt darin, wo der Plan lebt und was ihn durchsetzt. Native Pläne leben meist außerhalb des Repositorys und verfallen mit der Sitzung; Deep Work Plan schreibt den Plan, seinen Zustand und seine Evidenz in das Repository, sodass ein anderer Agent oder ein Teammitglied ihn fortsetzen kann, und jede Aufgabe trägt ein ausführbares Gate und ein aufgezeichnetes Protokoll. Den Plan-Modus Ihres Agenten nutzen Sie weiterhin zum Denken; die Methodik ergänzt die dauerhafte, verifizierbare Ausführungsschleife.',
            linkLabel: 'Vergleich ansehen',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'Adoption',
        items: [
          {
            id: 'install',
            question:
              'Was schreibt das Onboarding in mein Repository, und fasst es bestehende Dateien an?',
            answer:
              'Das Onboarding ist nicht-destruktiv: Es erkennt eine bestehende `AGENTS.md`, `docs/`, `.agents/` oder `CLAUDE.md`, gleicht ab, statt zu überschreiben, und fragt nach, bevor es etwas ersetzt. Es schreibt den `AGENTS.md`-Index mit echten Befehlen, einen durchdachten `docs/`-Baum, Dokumentation je Modul, das `.agents/`-Kit mit schlanken `dwp-*`-Befehlen, einen per gitignore ausgeschlossenen `.dwp/`-Ausgabebereich, eine verifizierte Testkarte und das erforderliche lokale Code-Review (die AI Diff Reviewer-Skill plus eine auf das Repository zugeschnittene Review-Erweiterung). Anschließend führt es einen Selbstcheck und den Konformitätsprüfer aus, damit Sie sehen, was erzeugt wurde. Ein unter einer früheren Version geonboardetes Repository erhält ein gezieltes Upgrade, das nur das ändert, was fehlt.',
            linkLabel: 'Der Adoptions-Endpunkt',
            linkPath: '/init',
          },
          {
            id: 'cost',
            question: 'Was kostet es, und wie wird Effizienz gemessen?',
            answer:
              'Die Methodik und die Skill sind MIT-lizenziert und kostenlos; es gibt keinen Dienst, keinen API-Schlüssel und keine Telemetrie in den Kern-Flows. Effizienz wird als Anzahl der Instruktions-Bytes berichtet, die jeder Flow lädt — gemessen von einem Skript, das mit der Skill committet und in einem Evaluations-Ledger veröffentlicht wird, wobei Zunahmen so offen berichtet werden wie Abnahmen. Nicht berichtet wird in Token-Prozenten oder eingesparten Kosten, weil eine Byte-Bestandsaufnahme das nicht belegen kann; eine vorregistrierte öffentliche Evaluation ist geplant, um Ergebnisse ordentlich zu messen.',
            linkLabel: 'Vertrauen und Offenlegung',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: 'Noch eine Frage?',
      body: 'Eröffnen Sie eine Diskussion oder ein Issue auf GitHub. Fragen, die wiederkehren, werden auf dieser Seite ergänzt.',
      ctaLabel: 'Auf GitHub fragen',
    },
  },

  comparePage: {
    meta: {
      title:
        'Deep Work Plan im Vergleich mit den Alternativen — Deep Work Plan',
      description:
        'Wie Deep Work Plan zu spec-driven Werkzeugen, Agenten-Frameworks und hersteller-nativen Plan-Modi steht: in eigenen Begriffen, mit Quellen und Prüfdatum.',
    },
    eyebrow: 'Vergleich',
    title: 'Deep Work Plan und die Alternativen',
    intro:
      'Wählen Sie die richtige Ebene für Ihre Situation. Jede Alternative wird in ihren eigenen Begriffen beschrieben, jede Angabe lässt sich zur offiziellen Dokumentation zurückverfolgen, und die Seite nennt das Datum der letzten Prüfung. Dies ist eine Karte, keine Rangliste.',
    howToRead: {
      title: 'Wie Sie diese Seite lesen',
      body: 'Drei Werte beschreiben jede Fähigkeit. Sie sagen, wo eine Fähigkeit in einem Werkzeug liegt — nicht, wie gut das Werkzeug ist.',
      values: {
        builtIn: 'Integriert',
        optional: 'Optional oder über Erweiterung',
        notInScope: 'Nicht im Umfang',
      },
    },
    reviewedOnLabel: 'Zuletzt geprüft',
    alternativesTitle: 'Die Alternativen, in ihren eigenen Begriffen',
    officialSiteLabel: 'Offizielle Website',
    categories: {
      methodology: 'Methodik',
      sdd: 'Werkzeuge für spec-driven Entwicklung',
      agentFramework: 'Agenten-Workflow-Frameworks',
      vendorNative: 'Hersteller-native Plan-Modi',
    },
    matrix: {
      title: 'Fähigkeitsmatrix',
      caption:
        'Wo jede Fähigkeit liegt, je Werkzeug. Integriert, optional oder über Erweiterung oder nicht im Umfang. Geprüft anhand der offiziellen Dokumentation.',
      capabilityColumn: 'Fähigkeit',
    },
    capabilities: {
      toolAgnostic: {
        label: 'Funktioniert mit jedem Coding-Agenten',
        help: 'Dieselben Repository-Dateien steuern Claude Code, Codex, Cursor, Gemini CLI und andere.',
      },
      repoNativeHarness: {
        label: 'Schreibt das Agenten-Harness in das Repository',
        help: 'Anweisungen, docs, Skills und Befehle liegen im Repository, nicht in den Einstellungen eines einzelnen Werkzeugs.',
      },
      taskAcceptanceCriteria: {
        label: 'Akzeptanzkriterien je Aufgabe',
        help: 'Jede Aufgabe nennt beobachtbare Bedingungen für „fertig“.',
      },
      perTaskGates: {
        label: 'Validierungs-Gate je Aufgabe',
        help: 'Jede Aufgabe nennt die Befehle, die bestehen müssen, ausgewählt aus dem, was sie berührt hat.',
      },
      resumableState: {
        label: 'Wiederaufnehmbarer Zustand auf der Festplatte',
        help: 'Der Fortschritt übersteht einen Sitzungs-Reset und lässt sich von einem anderen Agenten oder einem Teammitglied fortsetzen.',
      },
      finalReview: {
        label: 'Verpflichtende Abschlussprüfung mit Sicherheitstest',
        help: 'Der Plan kann nicht abgeschlossen werden, ohne dass die vollständige Änderungsmenge sicherheitsgeprüft und der Endzustand validiert wird.',
      },
      conformanceChecker: {
        label: 'Ausführbarer Konformitätsprüfer',
        help: 'Ein Skript prüft das Repository und seine Pläne gegen den Standard, mit CI-freundlichem Exit-Code.',
      },
      instructionBudgetLedger: {
        label: 'Veröffentlichte Messung der Instruktionslast',
        help: 'Die Bytes, die jeder Flow lädt, werden von einem committeten Skript gemessen und mit ihren Grenzwerten veröffentlicht.',
      },
      onboardingScaffold: {
        label: 'Onboarding, das Dokumentation aufbaut',
        help: 'Ein erster Durchlauf schreibt die auf Agenten ausgerichtete Dokumentation und das Kit des Repositorys.',
      },
      brownfieldSpecs: {
        label: 'Lebende Spezifikationen für bestehende Systeme',
        help: 'Änderungen werden als Deltas spezifiziert, die in eine wachsende Spezifikation des Systems einfließen.',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'Installiert sich als Skill, richtet das Repository per Onboarding als Agenten-Harness ein und führt langfristige Pläne aus — mit Validierungs-Gates je Aufgabe, Zustand auf der Festplatte und einem verpflichtenden Final Review.',
        audience:
          'Entwickler und Teams, die sitzungsübergreifende Arbeit an jeden beliebigen Coding-Agenten übergeben und dabei ein verifiziertes Ergebnis brauchen.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'Überführt ein Feature über eine Konstitution, eine Spezifikation, einen Plan und eine Aufgabenliste in eine ausführbare Spezifikation, angetrieben von Slash-Befehlen, die mehr als fünfzig Coding-Agenten integrieren.',
        audience:
          'Teams, die einen wiederholbaren Workflow aus Specify, Plan, Tasks und Implement im bereits genutzten Agenten wollen.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Erfasst jede Änderung als Proposal mit Delta-Specs (hinzugefügt, geändert, entfernt) und RFC-2119-Anforderungen mit Szenarien und archiviert sie anschließend in lebenden Spezifikationen.',
        audience:
          'Teams an bestehenden Systemen, deren Spezifikationen Änderung für Änderung wachsen sollen.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'Eine agentische IDE und CLI, deren Spezifikationen von EARS-artigen Anforderungen über das Design zu Aufgaben führen, mit Steering-Dateien und Hooks, die auf Editor-Ereignissen laufen.',
        audience:
          'Entwickler, die spec-driven Development fest im Editor integriert haben möchten, gestützt auf AWS-Werkzeuge.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'Ein agiles Framework spezialisierter Agentenrollen (Analyse, Produkt, Architektur, Entwicklung, Qualität), das Briefings, Anforderungen, Architekturdokumente und Story-Dateien erzeugt.',
        audience:
          'Teams, die rollenbasierte Zeremonien schätzen und für Agentenarbeit einen vollständigen agilen Lebenszyklus wollen.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'Eine Skills-Bibliothek und ein Workflow für Brainstorming, Planung in kleinen Test-first-Schritten, Ausführung mit Subagenten und Review vor dem Abschluss.',
        audience:
          'Entwickler, die disziplinierte testgetriebene Ausführung innerhalb ihres Coding-Agenten wollen.',
      },
      'get-shit-done': {
        name: 'Get Shit Done',
        whatItDoesWell:
          'Ein Planungssystem mit einem .planning-Verzeichnis, Anforderungs-IDs, Phasenplänen, Ausführung mit frischem Kontext und einem Verifizierungsdurchlauf gegen genannte Must-haves.',
        audience:
          'Einzelentwickler und kleine Teams, die Context Engineering und Verifizierung mit wenig Zeremoniell wollen.',
      },
      'vendor-native': {
        name: 'Hersteller-native Plan-Modi',
        whatItDoesWell:
          'Claude Code, Codex, Cursor und Gemini CLI liefern Plan-Modi, Anweisungsdateien und Skills, die den AGENTS.md- und Agent-Skills-Standards folgen.',
        audience:
          'Alle, die Planung innerhalb eines einzelnen Agenten wollen, ohne eine Methodik zu übernehmen.',
      },
    },
    dwpStrengths: {
      title: 'Was Deep Work Plan mitbringt',
      items: [
        {
          title: 'Werkzeug-agnostisch und repository-nativ',
          body: 'Das Harness und der Plan sind Dateien in Ihrem Repository, lesbar für jeden Agenten, der den AGENTS.md- und Agent-Skills-Standards folgt. Ein Agentenwechsel verliert den Plan nicht.',
        },
        {
          title:
            'Validierung, ausgewählt aus dem, was jede Aufgabe berührt hat',
          body: 'Jede Aufgabe deklariert ihre berührte Oberfläche und führt die Tests des geänderten Verhaltens und seiner Konsumenten aus, ausgeweitet auf die gesamte Suite, wenn die Wirkung sich nicht abgrenzen lässt. Null ausgewählte Tests sind niemals ein Bestehen.',
        },
        {
          title: 'Ein Final Review mit Sicherheitstest',
          body: 'Ein Plan schließt mit einer Sicherheitsprüfung der kumulierten Änderungsmenge — einschließlich eines erforderlichen lokalen Reviews des Diffs — und einer Validierung des Endzustands. Kritische Befunde blockieren den Abschluss.',
        },
        {
          title: 'Zustand, der Sitzungen und Agenten übersteht',
          body: 'README-Checkboxen, Aufgabenprotokolle, ein begrenzter Arbeitsindex und eine maschinenlesbare Zustandsdatei werden an jeder Grenze geschrieben, sodass eine andere Sitzung oder ein anderer Agent von der Festplatte aus weitermacht. Selbst eine unterbrochene Planerstellung ist wiederherstellbar.',
        },
        {
          title: 'Ein Konformitätsprüfer für das Repository selbst',
          body: 'Ein nur lesendes Skript verifiziert das Harness und jeden Plan gegen die Spezifikation, versteht beide Plan-Lebenszyklen und beendet sich mit einem CI-freundlichen Code.',
        },
        {
          title: 'Instruktionslast gemessen und veröffentlicht',
          body: 'Ein committetes Skript misst, wie viele Bytes jeder Flow lädt; die Ergebnisse, Zunahmen eingeschlossen, werden als Bytes veröffentlicht, niemals als Token- oder Kostenprozente.',
        },
      ],
    },
    honestLimits: {
      title: 'Ehrliche Grenzen',
      body: 'Deep Work Plan hat keinen Mechanismus für lebende oder Delta-Spezifikationen; OpenSpec und ähnliche Werkzeuge sind dort stärker. Ein unabhängiger Benchmark der Methodik existiert noch nicht; eine vorregistrierte öffentliche Evaluation ist geplant. Das Instruktionslast-Ledger misst geladene Bytes, nicht Token, Kosten oder Ergebnisse.',
    },
    correction: {
      title: 'Helfen Sie uns, diese Seite korrekt zu halten',
      body: 'Diese Seite wird am angezeigten Datum geprüft und auf Anfrage korrigiert. Ist eine Beschreibung Ihres Werkzeugs veraltet oder unvollständig, eröffnen Sie ein Issue, und wir korrigieren es.',
      ctaLabel: 'Ein Issue eröffnen',
    },
    sourcesTitle: 'Quellen',
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

  developersPage: {
    meta: {
      title: 'Entwickler — Deep Work Plan Agent-API, MCP-Server & Docs',
      description:
        'Agentenoberfläche von Deep Work Plan: read-only API ohne Login (OpenAPI), MCP-Server unter /api/mcp, Markdown pro Seite in 17 Sprachen, npx-skills-CLI.',
    },
    eyebrow: 'Oberfläche für Agenten & Entwickler',
    title: 'Deep Work Plan für Entwickler und KI-Agenten',
    intro:
      'deepworkplan.com liefert neben seinen Seiten eine maschinenlesbare Oberfläche: eine per OpenAPI beschriebene Agent-API, einen zustandslosen MCP-Server, native Markdown-Spiegel für jede Seite in 17 Sprachen und das installierbare DWP-Skill. Alles auf dieser Seite ist live, öffentlich und kostenlos — es gibt nichts, wofür man sich registrieren müsste.',
    accessTitle: 'Bewusst ohne Authentifizierung',
    accessIntro:
      'Es gibt keine API-Schlüssel zu erzeugen, keinen OAuth-Aufwand und keine von der Produktion getrennte Sandbox — die Produktionsoberfläche selbst ist die Sandbox. Das ist eine bewusste Eigenschaft der Methodik: Agenten können keine „Kontakt zum Vertrieb“-Formulare ausfüllen, also verlangt die Website nie eines.',
    accessPoints: [
      {
        title: 'Nur lesend',
        body: 'Jede Operation ist ein sicheres, cachebares GET — mit Ausnahme des MCP-Endpunkts, der POST verwendet. Es gibt nirgends Schreiboperationen, Uploads oder Zustandsänderungen.',
      },
      {
        title: 'Keine API-Schlüssel',
        body: 'Keine Registrierung, keine Token, keine Rate-Limit-Stufen. Anonymer Zugriff ist der dokumentierte Vertrag, erklärt in /auth.md und den OAuth-Discovery-Stubs.',
      },
      {
        title: 'Kostenlos & Open Source',
        body: 'Die Website-Inhalte und das DWP-Skill sind MIT-lizenziert. Nutzen Sie sie in kommerzieller und nicht-kommerzieller Arbeit, ohne um Erlaubnis zu fragen.',
      },
      {
        title: 'Maschinen zuerst',
        body: 'Strukturierte JSON-Fehler auf /api-Pfaden, Markdown-Wiederherstellungstexte bei 404, ein RFC-9727-API-Katalog und ein ARD-Fähigkeitsmanifest — gebaut für die Nutzung durch Agenten.',
      },
    ],
    endpointsTitle: 'Endpunkte',
    endpointsIntro:
      'Die Kern-Endpunkte der Agent-API. Die vollständige, typisierte Spezifikation — jede Operation, jeder Parameter und jedes Antwort-Schema — liegt im OpenAPI-Dokument.',
    endpointsNote:
      'Unbekannte /api/*-Pfade geben einen strukturierten JSON-Fehler mit einem Lösungshinweis zurück, nie eine HTML-Fehlerseite.',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: 'OpenAPI-3.1-Spezifikation der gesamten Agent-API.',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          'Kuratierter LLM-Leitfaden-Index — der empfohlene Einstiegspunkt für Agenten.',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          'Der kanonische DWP-Adoptions-Prompt (macht jedes Repository AI-first).',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          'Jede Seite als natives Quell-Markdown — in allen 17 Sprachen (z. B. /es/developers.md).',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description:
          'Statischer Health-Marker mit Links zur Spezifikation und zu diesem Portal.',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'MCP-Server (Streamable HTTP, zustandslos): initialize, ping, tools/list, tools/call.',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description:
          'ARD-Fähigkeitsmanifest — die in robots.txt deklarierte Agentmap.',
      },
    ],
    mcpTitle: 'MCP-Server',
    mcpIntro:
      'Ein zustandsloser Model-Context-Protocol-Server über Streamable HTTP. Drei nur lesende Tools: get_init_prompt, list_site_sections und read_page. Die Protokollversionen 2025-03-26 und 2025-06-18 werden unterstützt; eine Sitzung ist nicht erforderlich.',
    mcpCodeLabel: 'Terminal — JSON-RPC über HTTP',
    mcpNote:
      'Das MCP-Manifest liegt unter /.well-known/mcp.json und die Serverkarte unter /.well-known/mcp/server-card.json. Claude, ChatGPT und jeder MCP-Client können diese Tools nativ aufrufen.',
    markdownTitle: 'Markdown für Agenten',
    markdownIntro:
      'Jede gerenderte Seite wird als natives Quell-Markdown veröffentlicht — nicht als HTML-Konvertierung. Fordern Sie Markdown explizit über ein URL-Suffix oder über HTTP-Content-Negotiation auf jeder Seite an.',
    markdownCodeLabel: 'Terminal — Content-Negotiation',
    markdownNote:
      'Content-Negotiation liefert dasselbe Quell-Markdown, aus dem die Website rendert, in der Sprache der angeforderten URL.',
    cliTitle: 'Das Kit installieren',
    cliIntro:
      'Der offizielle Installationspfad für das Deep Work Plan Skill — derselbe Befehl, den der /init-Endpunkt Agenten übergibt. Er funktioniert mit jedem Skills-kompatiblen Coding-Agenten (Claude Code, Cursor, Codex, Gemini und andere).',
    cliCodeLabel: 'Terminal — Skills-CLI',
    cliNote:
      'Das Skill wird unter .agents/skills/deepworkplan/ in Ihr Repository eingebettet, sodass jeder Agent, der das Repository bearbeitet, dieselbe Methodik teilt.',
    resourcesTitle: 'Maschinenlesbare Ressourcen',
    resources: [
      { label: 'OpenAPI-Spezifikation (/openapi.json)', href: '/openapi.json' },
      {
        label: 'Erklärung zu Agentenzugriff & Authentifizierung (/auth.md)',
        href: '/auth.md',
      },
      {
        label: 'API-Katalog, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'MCP-Manifest (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'Sicherheitskontakt (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'Website-Repo-Deskriptor (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'Richten Sie einen Agenten darauf',
    ctaBody:
      'Der schnellste Weg bleibt eine Zeile: Übergeben Sie einem beliebigen Coding-Agenten den /init-Prompt, und er installiert das Skill, onboardet Ihr Repository und beginnt, Deep Work abzuschließen.',
    ctaPrimary: 'Den /init-Prompt öffnen',
    ctaSecondary: 'Methodik lesen',
  },

  privacyPage: {
    meta: {
      title: 'Datenschutz — Deep Work Plan',
      description:
        'Die Datenschutzerklärung von deepworkplan.com: statische Website ohne Konten und Werbung, cookielose Analytik — klar erklärt, was das Kontaktformular erhebt.',
    },
    eyebrow: 'Datenschutzerklärung',
    title: 'Datenschutz auf deepworkplan.com',
    intro:
      'Deep Work Plan ist eine statische Dokumentations- und Methodik-Website. Diese Seite erklärt klar und vollständig, welche Daten die Website bei Ihrem Besuch berührt: Es gibt kein Kontosystem, keine Werbung und nirgendwo seitenübergreifendes Tracking.',
    lastUpdated: '8. September 2026',
    sections: [
      {
        heading: 'Was die Website ist',
        body: 'deepworkplan.com ist eine Sammlung statischer Seiten, die über ein CDN ausgeliefert werden. Es gibt keinen Login, keine Benutzerdatenbank und keine Möglichkeit für die Website, persönliche Profile zu speichern. Inhalte werden in öffentlichen GitHub-Repositories unter der DailybotHQ-Organisation entwickelt, und alles, was Sie hier lesen, wird genau so ausgeliefert, wie es gebaut wurde.',
      },
      {
        heading: 'Analytik',
        body: 'Die Website nutzt Umami, einen cookielosen, datenschutzorientierten Analytik-Dienst, um Seitenaufrufe aggregiert zu zählen. Umami setzt keine Tracking-Cookies und erstellt keine seitenübergreifenden Profile. Da KI-Crawler kein JavaScript ausführen, zeichnet eine serverseitige Edge-Funktion zusätzlich User Agent und Pfad automatisierter Bot-Besuche als anonyme Analytik-Ereignisse auf — das identifiziert Crawler-Software (zum Beispiel „GPTBot besuchte /init“), nie einen menschlichen Besucher.',
      },
      {
        heading: 'Cookies und lokaler Speicher',
        body: 'Die Website setzt keine Tracking-Cookies. Das Einzige, was in Ihrem Browser gespeichert wird, ist eine Design-Voreinstellung (hell oder dunkel) im localStorage, die Ihr Gerät nie verlässt und nirgendwo übertragen wird. Wenn Sie Ihren Browser-Speicher leeren, kehrt die Website einfach zum Design-Standard Ihres Systems zurück.',
      },
      {
        heading: 'Drittanbieter-Dienste',
        body: 'Hosting und Auslieferung laufen auf Cloudflare Pages, das Anfrage-Logs und IP-Adressen an der Edge verarbeitet — als Teil des CDN-Betriebs und der Abwehr von Missbrauch, unter Cloudflares eigener Datenschutzerklärung. Aggregierte Analytik läuft auf Umami (cloud.umami.is). Wenn Sie das Kontaktformular freiwillig absenden, werden Ihre Antworten über Google Forms an unser Team gesendet — das ist der einzige Ort, an dem Informationen erhoben werden, die Sie eingeben, und sie werden ausschließlich verwendet, um Ihnen zu antworten.',
      },
      {
        heading: 'Was wir nicht tun',
        body: 'Wir verkaufen oder geben keine personenbezogenen Daten weiter, schalten keine Werbung oder Remarketing-Pixel, erzeugen keine Browser-Fingerabdrücke und versenden keine Marketing-E-Mails. Die Website hat keine Newsletter-Anmeldung und keine Telemetrie über die oben beschriebenen aggregierten, cookielosen Zählungen hinaus.',
      },
      {
        heading: 'Ihre Möglichkeiten',
        body: 'Da die Analytik hier aggregiert und cookielos ist, gibt es kein persönliches Profil zum Exportieren oder Löschen. Sie können das Analytik-Skript mit einem beliebigen Content-Blocker blockieren, ohne die Funktionsweise der Website zu beeinträchtigen. Wenn Sie das Kontaktformular abgesendet haben und Ihre Nachricht löschen möchten, schreiben Sie an die Kontaktadresse unten — wir entfernen sie.',
      },
      {
        heading: 'Änderungen an dieser Erklärung',
        body: 'Wenn sich diese Erklärung wesentlich ändert, ändert sich das Datum oben auf dieser Seite mit, und inhaltliche Änderungen werden in das öffentliche Website-Repository committet, wo jeder die Historie einsehen kann.',
      },
    ],
    contactTitle: 'Kontakt und Sicherheit',
    contactBody:
      'Bei Datenschutzfragen schreiben Sie an security@dailybot.com. Um eine Sicherheitslücke zu melden, nutzen Sie bevorzugt GitHubs private Schwachstellenmeldungen für die Website- und Skill-Repositories — die genauen Adressen stehen in /.well-known/security.txt.',
  },
};
