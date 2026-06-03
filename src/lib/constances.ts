export const SITE_TITLE: string = 'Deep Work Plan';
export const SITE_DESCRIPTION: string =
  'Context matters more than models. Deep Work Plan turns any repository into a structured, agent-pilotable environment. Open, MIT-licensed, tool-agnostic.';

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
