/** Timezone for scheduled post detection — build and badge use this consistently */
export const SITE_TIMEZONE = 'America/Bogota';

export const SITE_TITLE: string = 'Deep Work Plan';
export const SITE_DESCRIPTION: string =
  'Cal Newport’s Deep Work, applied to AI agents. An open, MIT-licensed methodology and reference kit for structured, validated, resumable multi-hour agent execution.';
export const BLOG_PAGE_SIZE: number = 30;

// Analytics configuration — scripts load only when IDs are provided
export const ANALYTICS = {
  umami: {
    websiteId: import.meta.env.PUBLIC_UMAMI_WEBSITE_ID || '',
    scriptUrl: 'https://cloud.umami.is/script.js',
  },
  verification: {
    bing: import.meta.env.PUBLIC_BING_SITE_VERIFICATION || '',
  },
} as const;

// Newsletter configuration — Google Forms direct POST
export const NEWSLETTER = {
  googleForms: {
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSedegaN0_5eZWLIuizdKPCV1pAUm8vTatHo_ny07IXd8_xIfw/formResponse',
    entries: {
      email: 'entry.903587259',
    },
  },
} as const;

// Contact form configuration — Google Forms direct POST
export const CONTACT_FORM = {
  googleForms: {
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLScuGSujpXLKF5eS4Z_6ZGAYf6j1iPrOIHwtJ-3i1_7MGk466Q/formResponse',
    entries: {
      name: 'entry.1008715654',
      email: 'entry.903587259',
      reason: 'entry.677814908',
      subject: 'entry.1738397177',
      message: 'entry.110815800',
    },
  },
} as const;
