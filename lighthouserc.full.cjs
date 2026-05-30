module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        // Base pages (same as lighthouserc.cjs)
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
        chromeFlags: '--no-sandbox --headless',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
