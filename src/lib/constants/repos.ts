/**
 * Canonical GitHub repository URLs for the Deep Work Plan project.
 *
 * Single source of truth consumed by the header/mobile repo selector and the
 * agent-markdown navigation. Two repos matter to anyone evaluating DWP:
 *  - `website` — this marketing-and-docs site (what you're reading).
 *  - `skill`   — the installable agent skill (what you actually run).
 */
export const REPO_URLS = {
  website: 'https://github.com/DailybotHQ/deepworkplan-website',
  skill: 'https://github.com/DailybotHQ/deepworkplan-skill',
} as const;

export type RepoKey = keyof typeof REPO_URLS;
