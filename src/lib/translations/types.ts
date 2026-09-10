/**
 * Translation type definitions
 *
 * Defines the shape of all translation objects.
 * Each locale file (en.ts, es.ts) must satisfy the SiteTranslations interface.
 */

import type { AlternativeId, CapabilityId } from '@/lib/compare-data';

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
    developers: string;
    privacy: string;
    github: string;
    faq: string;
    compare: string;
    // Header disclosure grouping Examples, Compare, FAQ and Trust
    resources: string;
    resourcesDesc: string;
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

  // Temporary Product Hunt launch announcement bar (above the header)
  announcementBar: {
    badge: string;
    text: string;
    tagline: string;
    linkText: string;
  };

  // Agent-friendly Markdown navigation (rendered into .md endpoints)
  agentNav: {
    heading: string;
    sections: {
      methodology: string;
      getStarted: string;
      project: string;
      connect: string;
      learn: string;
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
      scrollCta: string;
    };
    pitch: {
      kicker: string;
      problem: string;
      answer: string;
      efficiency: string;
      illustrationAlt: string;
    };
    story: {
      act1: {
        kicker: string;
        lead: string;
        deepLinkLabel: string;
        deepLinkHref: string;
      };
      act2: {
        kicker: string;
        lead: string;
        deepLinkLabel: string;
        deepLinkHref: string;
      };
      act3: {
        kicker: string;
        lead: string;
        deepLinkLabel: string;
        deepLinkHref: string;
      };
      act4: {
        kicker: string;
        lead: string;
        deepLinkLabel: string;
        deepLinkHref: string;
      };
      act5: {
        kicker: string;
        lead: string;
        deepLinkLabel: string;
        deepLinkHref: string;
      };
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
      viewAllCta: string;
      items: { name: string; support: 'full' | 'partial'; note: string }[];
    };
    stacks: {
      badge: string;
      title: string;
      subtitle: string;
      viewAllCta: string;
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
      tertiaryCta: string;
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
    // Agent-recovery block: links rendered for AI agents that land on a 404.
    agentTitle: string;
    agentIntro: string;
  };

  // Developer & agent portal (/developers)
  developersPage: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    intro: string;
    accessTitle: string;
    accessIntro: string;
    accessPoints: { title: string; body: string }[];
    endpointsTitle: string;
    endpointsIntro: string;
    endpointsNote: string;
    // method + path are code (never localized); description is translated.
    endpoints: { method: string; path: string; description: string }[];
    mcpTitle: string;
    mcpIntro: string;
    mcpCodeLabel: string;
    mcpNote: string;
    markdownTitle: string;
    markdownIntro: string;
    markdownCodeLabel: string;
    markdownNote: string;
    cliTitle: string;
    cliIntro: string;
    cliCodeLabel: string;
    cliNote: string;
    resourcesTitle: string;
    resources: { label: string; href: string }[];
    ctaTitle: string;
    ctaBody: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };

  // Privacy policy (/privacy)
  privacyPage: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    intro: string;
    lastUpdated: string;
    sections: { heading: string; body: string }[];
    contactTitle: string;
    contactBody: string;
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
  // FAQ page
  faqPage: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    intro: string;
    tocTitle: string;
    groups: {
      id: string;
      title: string;
      items: {
        id: string;
        question: string;
        answer: string;
        /** Optional deeper link: site-relative path, prefixed per language at render time. */
        linkLabel?: string;
        linkPath?: string;
      }[];
    }[];
    stillHaveQuestions: { title: string; body: string; ctaLabel: string };
  };

  // Compare page — facts live in src/lib/compare-data.ts; only words live here
  comparePage: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    intro: string;
    howToRead: {
      title: string;
      body: string;
      values: { builtIn: string; optional: string; notInScope: string };
    };
    reviewedOnLabel: string;
    alternativesTitle: string;
    officialSiteLabel: string;
    categories: {
      methodology: string;
      sdd: string;
      agentFramework: string;
      aiNativeSdlc: string;
      vendorNative: string;
    };
    matrix: { title: string; caption: string; capabilityColumn: string };
    capabilities: Record<CapabilityId, { label: string; help: string }>;
    alternatives: Record<
      AlternativeId,
      { name: string; whatItDoesWell: string; audience: string }
    >;
    aiNative: {
      title: string;
      body: string;
      shared: string;
      boundary: string;
      sourceLabel: string;
    };
    profileCta: string;
    profile: {
      backLabel: string;
      eyebrow: string;
      compareWith: string;
      fitTitle: string;
      capabilityTitle: string;
      sourceLabel: string;
    };
    dwpStrengths: { title: string; items: { title: string; body: string }[] };
    honestLimits: { title: string; body: string };
    correction: { title: string; body: string; ctaLabel: string };
    sourcesTitle: string;
  };

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
