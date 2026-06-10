module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      // CI checks the two distinct layout families only (keeps the gate fast):
      // '/' covers the marketing/home template (historically the heaviest),
      // '/methodology/' covers the content-reader template (prose typography).
      // Other languages share these same templates; the full URL sweep lives in
      // lighthouserc.full.cjs for local deep audits.
      url: ['/', '/methodology/'],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --headless',
        // Skip the robots-txt audit because it follows RFC 9309 strictly and
        // rejects the Content-Signal directive (IETF draft
        // draft-romm-aipref-contentsignals) as unknown. The directive is
        // required in robots.txt for isitagentready.com's Bot Access Control
        // check. Skipping this single audit keeps SEO category at 1.00 while
        // every other audit (meta tags, viewport, crawlability, structured
        // data, hreflang, etc.) stays strict.
        skipAudits: ['robots-txt'],
      },
    },
    assert: {
      assertions: {
        // Mobile performance is throttled (slow 4G + 4× CPU) and naturally
        // noisier. The content-heavy pages (the homepage and /methodology/)
        // settle at a stable 0.95 under this throttling, so 0.95 is the mobile
        // floor; desktop stays at a strict 1.00 (see lighthouserc.desktop.cjs).
        // Accessibility, best-practices and SEO are deterministic and stay at
        // 1.00.
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'categories:best-practices': ['error', { minScore: 1.0 }],
        'categories:seo': ['error', { minScore: 1.0 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
