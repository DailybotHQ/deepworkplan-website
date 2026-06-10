module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      // Lean CI gate: the 2 distinct layout families (mirrors lighthouserc.cjs
      // mobile set) so the desktop run stays fast in GitHub Actions. For the
      // full URL sweep use `lighthouse:desktop:full` (lighthouserc.desktop.full.cjs).
      url: ['/', '/methodology/'],
      numberOfRuns: 3,
      settings: {
        // Desktop emulation (LHCI defaults to mobile). Mirrors lighthouserc.cjs
        // intent but for the desktop form factor so we hold near-100 on both.
        preset: 'desktop',
        chromeFlags: '--no-sandbox --headless',
        // Skip the robots-txt audit for the same reason as the mobile config:
        // it rejects the Content-Signal directive (IETF draft) as unknown,
        // which is required in robots.txt for the Bot Access Control check.
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
