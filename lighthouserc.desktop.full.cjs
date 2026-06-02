module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        // Base pages
        '/',
        '/about/',
        // Methodology reader (primary DWP content): index + a chapter
        '/methodology/',
        '/methodology/01-manifesto/',
        // Specification reader: index + a normative doc (TOC island)
        '/spec/',
        '/spec/dwp-specification/',
        // Kit catalog: index + a detail entry
        '/kit/',
        '/kit/generic/',
        // Examples gallery + quickstart
        '/examples/',
        '/quickstart/',
        // Form page (contact)
        '/contact/',
        // i18n parity (Spanish home + reader index + chapter)
        '/es/',
        '/es/methodology/',
        '/es/spec/',
      ],
      numberOfRuns: 3,
      settings: {
        // Desktop emulation (LHCI defaults to mobile). Full URL sweep — heavier;
        // for manual/thorough runs, NOT CI (see lighthouserc.desktop.cjs for the
        // lean CI gate over the core URLs).
        preset: 'desktop',
        chromeFlags: '--no-sandbox --headless',
        // Skip the robots-txt audit: it rejects the Content-Signal directive
        // (IETF draft) required in robots.txt for the Bot Access Control check.
        skipAudits: ['robots-txt'],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 1.0 }],
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
