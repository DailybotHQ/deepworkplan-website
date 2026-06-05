/**
 * Translation type definitions
 *
 * Defines the shape of all translation objects.
 * Each locale file (en.ts, es.ts) must satisfy the SiteTranslations interface.
 */

export interface PagePassion {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface LanguageSkill {
  language: string;
  level: string;
}

export interface Venture {
  title: string;
  description: string;
  period: string;
}

export interface HighlightItem {
  title: string;
  description: string;
  icon: string;
}

export interface Activity {
  title: string;
  description: string;
  icon: string;
}

export interface SiteTranslations {
  // Site metadata
  siteTitle: string;
  siteTitleFull: string;
  siteDescription: string;

  // Navigation
  nav: {
    home: string;
    about: string;
    contact: string;
    // Deep Work Plan IA
    methodology: string;
    spec: string;
    kit: string;
    examples: string;
    init: string;
    quickstart: string;
    trust: string;
    github: string;
    // Source-code repo selector (header + mobile)
    repo: {
      label: string;
      website: string;
      websiteDesc: string;
      skill: string;
      skillDesc: string;
    };
    menu: string;
    closeMenu: string;
  };

  // Footer
  footer: {
    copyright: string;
    allRightsReserved: string;
    poweredBy: string;
  };

  // Agent-friendly Markdown navigation (rendered into .md endpoints)
  agentNav: {
    heading: string;
    sections: {
      methodology: string;
      getStarted: string;
      project: string;
      connect: string;
    };
  };

  // Deep Work Plan homepage
  home: {
    meta: {
      title: string;
      description: string;
    };
    hero: {
      badge: string;
      title: string;
      titleEmphasis: string;
      subtitle: string;
      instructionLabel: string;
      instruction: string;
      copyLabel: string;
      copiedLabel: string;
      viewInitCta: string;
      pullQuote: string;
      primaryCta: string;
      secondaryCta: string;
      illustrationAlt: string;
    };
    pitch: {
      kicker: string;
      problem: string;
      answer: string;
      origin: string;
      illustrationAlt: string;
    };
    onboarding: {
      badge: string;
      title: string;
      subtitle: string;
      steps: { title: string; description: string }[];
    };
    quickstart: {
      badge: string;
      title: string;
      subtitle: string;
      steps: { title: string; description: string }[];
      note: string;
    };
    outcomes: {
      badge: string;
      title: string;
      subtitle: string;
      items: { label: string; detail: string }[];
    };
    agents: {
      badge: string;
      title: string;
      subtitle: string;
      fullLabel: string;
      partialLabel: string;
      items: { name: string; support: 'full' | 'partial'; note: string }[];
    };
    stacks: {
      badge: string;
      title: string;
      subtitle: string;
      items: { name: string; sub: string }[];
    };
    archetypes: {
      badge: string;
      title: string;
      subtitle: string;
      individual: {
        tag: string;
        title: string;
        description: string;
        example: string;
      };
      orchestrator: {
        tag: string;
        title: string;
        description: string;
        example: string;
      };
    };
    comparison: {
      badge: string;
      title: string;
      subtitle: string;
      colDwp: string;
      colOthers: string;
      rows: { label: string; dwp: string; others: string }[];
    };
    origin: {
      badge: string;
      quote: string;
      attribution: string;
      dailybotCta: string;
    };
    finalCta: {
      badge: string;
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      meta: string;
    };
  };
  // Contact section (homepage)
  contact: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
  };

  // About page
  aboutPage: {
    title: string;
    subtitle: string;
    description: string;
    heroDescription: string;
    bioTitle: string;
    bioText: string;
    passionsTitle: string;
    passions: PagePassion[];
    quickFactsTitle: string;
    quickFacts: string[];
    ctaTitle: string;
    ctaDescription: string;
    ctaCv: string;
    ctaContact: string;
  };

  // Contact page
  contactPage: {
    title: string;
    subtitle: string;
    description: string;
    heroDescription: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    reasonLabel: string;
    reasonOptions: { value: string; label: string }[];
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    sendingButton: string;
    successTitle: string;
    successMessage: string;
    sendAnotherButton: string;
    requiredField: string;
    invalidEmail: string;
    fallbackMessage: string;
    fallbackEmailText: string;
    formNote: string;
    socialTitle: string;
    locationTitle: string;
    locationText: string;
    prefillSubjects: {
      generalInquiry: string;
      collaboration: string;
      projectInquiry: string;
      projectCollaboration: string;
      startupCollaboration: string;
      techTalkInvitation: string;
      tradingQuestion: string;
      dailybotQuestion: string;
    };
  };

  // Homepage Let's Connect section
  contactSection: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
  };

  // Date formatting
  dateLocale: string;

  // 404 page
  notFoundPage: {
    title: string;
    description: string;
    heading: string;
    message: string;
    backHome: string;
    exploreMethodology: string;
  };

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    intro: string;
    chapterLabel: string;
    readChapter: string;
    prev: string;
    next: string;
    backToIndex: string;
  };

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    intro: string;
    tocTitle: string;
    prev: string;
    next: string;
    backToIndex: string;
  };

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    intro: string;
    groups: {
      command: { title: string; description: string };
      adapter: { title: string; description: string };
      preset: { title: string; description: string };
      example: { title: string; description: string };
      addon: { title: string; description: string };
    };
    viewDetail: string;
    prev: string;
    next: string;
    backToIndex: string;
  };

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    intro: string;
    viewExample: string;
    prev: string;
    next: string;
    backToGallery: string;
  };

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    intro: string;
    sequenceTitle: string;
    codeLabel: string;
    orLabel: string;
    steps: {
      title: string;
      description: string;
      commands?: string[];
    }[];
    outcomeTitle: string;
    outcome: string;
    nextStepsTitle: string;
    nextSteps: { label: string; href: string }[];
  };

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    intro: string;
    handoffTitle: string;
    handoffBody: string;
    /**
     * The copy-paste bootstrap command. TRANSLATORS: localize the prose, but
     * NEVER localize the URL — it must stay the canonical English
     * `https://deepworkplan.com/init.md` (init.md is first-class English agent
     * content). Do not point it at a `/{lang}/init.md` variant.
     */
    handoffInstruction: string;
    handoffMdLabel: string;
    codeLabel: string;
    whatTitle: string;
    whatBody: string[];
    sequenceTitle: string;
    orLabel: string;
    steps: {
      title: string;
      description: string;
      commands?: string[];
    }[];
    outcomeTitle: string;
    outcome: string;
    nextStepsTitle: string;
    nextSteps: { label: string; href: string }[];
  };

  // Trust & security page
  trustPage: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    intro: string;
    pillarsTitle: string;
    pillars: { title: string; body: string }[];
    verifyTitle: string;
    verifyIntro: string;
    codeLabel: string;
    verifyNote: string;
    disclosureTitle: string;
    disclosureBody: string;
    resourcesTitle: string;
    linkManifest: string;
    linkSecurityTxt: string;
    linkPolicy: string;
    linkSkillPolicy: string;
    limitationsTitle: string;
    limitations: string[];
    ctaTitle: string;
    ctaBody: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}
