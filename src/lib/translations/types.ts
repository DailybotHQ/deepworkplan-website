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
    blog: string;
    about: string;
    contact: string;
    // Deep Work Plan IA
    methodology: string;
    spec: string;
    kit: string;
    examples: string;
    github: string;
    menu: string;
    closeMenu: string;
  };

  // Footer
  footer: {
    copyright: string;
    allRightsReserved: string;
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
      pullQuote: string;
      primaryCta: string;
      secondaryCta: string;
    };
    pitch: {
      kicker: string;
      problem: string;
      answer: string;
      origin: string;
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
      recommended: string;
      codeLabel: string;
      paths: {
        tag: string;
        title: string;
        tagline: string;
        command: string;
        note: string;
        highlight: boolean;
      }[];
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
    };
    finalCta: {
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      meta: string;
    };
  };

  // Homepage hero
  hero: {
    tagline: string;
    description: string;
    typewriterWords: string[];
  };

  // Homepage sections
  homeSections: {
    about: {
      title: string;
      description: string;
      cta: string;
      cta2: string;
    };
    dailybot: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    techTalks: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    makerHome: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    portfolio: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    trading: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    foodie: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    hobbies: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    builder: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    community: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    beyondCode: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    latestArticles: string;
    viewAllPosts: string;
    portfolioProjectsTitle: string;
    portfolioProjectsViewAll: string;
    portfolioProjectsEmpty: string;
    techTalksPostsTitle: string;
    techTalksPostsViewAll: string;
    techTalksPostsEmpty: string;
    dailybotPostsTitle: string;
    dailybotPostsViewAll: string;
    dailybotPostsEmpty: string;
    tradingPostsTitle: string;
    tradingPostsViewAll: string;
    tradingPostsEmpty: string;
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

  // Search input
  searchPlaceholder: string;
  searchHint: string;
  clearSearch: string;
  resultsFound: (count: number) => string;

  // Loading states
  loadingIndex: string;
  searching: string;

  // Results
  noResults: (query: string) => string;
  noResultsSuggestion: string;
  noPostsAvailable: string;

  // Pagination
  previous: string;
  next: string;
  pageOf: (current: number, total: number) => string;

  // Blog header
  blogTitle: string;
  blogHeading: string;
  blogDescription: string;
  allPosts: string;
  showingArticles: (showing: number, total: number) => string;
  articlesAvailable: (total: number) => string;
  lastUpdatedOn: string;
  readingTime: (minutes: number) => string;
  relatedArticles: string;
  relatedArticlesDescription: string;

  // Series navigation
  seriesPartOf: string;
  seriesChapter: (n: number) => string;
  seriesPrevious: string;
  seriesNext: string;
  seriesToC: string;
  seriesChapterOf: (current: number, total: number) => string;

  // Cross-content floating indicators (blog ↔ slide)
  slideIndicator: {
    label: string;
    subtitle: string;
    ariaLabel: string;
  };
  postIndicator: {
    label: string;
    subtitle: string;
    ariaLabel: string;
  };

  // Series pages
  seriesPage: {
    title: string;
    breadcrumb: string;
    chapters: string;
    chapter: string;
    progress: (current: number, total: number) => string;
    readChapter: string;
    emptyState: string;
    backToSeries: string;
    backToBlog: string;
    startReading: string;
    continueReading: string;
  };
  seriesListingPage: {
    title: string;
    description: string;
    heading: string;
    postsCount: (count: number) => string;
    exploreSeries: string;
    emptyState: string;
  };

  // Scheduled posts (dev-only indicators)
  scheduledBadge: string;
  scheduledBannerTitle: string;
  scheduledBannerMessage: (date: string) => string;

  // Draft posts (dev + preview indicators)
  draftBadge: string;
  draftBannerTitle: string;
  draftBannerMessage: string;

  // Tags (unified — covers primary, secondary, and subtopic tiers)
  postsTagged: (tag: string) => string;
  allTags: string;
  tagNames: Record<string, string>;
  tagDescriptions: Record<string, string>;

  // Series names and descriptions (keyed by series slug)
  seriesNames: Record<string, string>;
  seriesDescriptions: Record<string, string>;

  // Date formatting
  dateLocale: string;

  // Read more
  readMore: string;

  // Scroll to timeline
  scrollToTimeline: string;
  viewLabel: (label: string) => string;

  // 404 page
  notFoundPage: {
    title: string;
    description: string;
    heading: string;
    message: string;
    backHome: string;
    searchBlog: string;
  };

  // Blog post engagement
  engagement: {
    // Share buttons
    shareTitle: string;
    shareSeriesTitle: string;
    shareOnTwitter: string;
    shareOnLinkedIn: string;
    shareOnWhatsApp: string;
    copyLink: string;
    linkCopied: string;

    // Newsletter
    newsletterTitle: string;
    newsletterDescription: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
    newsletterSubmitting: string;
    newsletterSuccessTitle: string;
    newsletterSuccessMessage: string;
    newsletterInvalidEmail: string;
    newsletterAlreadySubscribed: string;
    newsletterResubscribe: string;
    newsletterPrivacy: string;

    // End-of-post CTA
    ctaTitle: string;
    ctaDescription: string;
  };

  // Blog engagement (author + share)
  blogEngagement: {
    aboutAuthor: string;
    writtenBy: string;
  };

  // Errors
  searchError: string;
  loadError: string;
  retry: string;

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
    };
    viewDetail: string;
    backToIndex: string;
  };

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    intro: string;
    viewExample: string;
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
}
