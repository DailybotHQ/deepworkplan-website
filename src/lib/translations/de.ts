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
    compare: 'Compare',
    resources: 'Resources',
    resourcesDesc: 'Examples, comparison, FAQ and trust',
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
      learn: 'Learn',
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
