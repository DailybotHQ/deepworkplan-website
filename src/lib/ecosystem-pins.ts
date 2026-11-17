/**
 * The release pins of the Deep Work Plan ecosystem — the single source the
 * public install surfaces must agree with.
 *
 * `public/init.md`, the kit ecosystem plate, the kit and spec pages and the
 * quickstart all name these tags; `tests/unit/lib/ecosystem-pins.test.ts`
 * fails when any of them drifts from this file. `sha256sums` is the sha256 of
 * the release's `SHA256SUMS` asset, published in `public/init.md` so an agent
 * can verify the checksum file before it verifies the files; `null` means the
 * release ships no `SHA256SUMS` (the skills CLI records a content hash in
 * `skills-lock.json` instead). Changing a pin is a claims decision: bump the
 * tag and digest here together with every surface the test lists.
 */

export interface EcosystemPin {
  /** Repository name under github.com/DailybotHQ. */
  repo: string;
  /** Release tag, `v`-prefixed. */
  tag: string;
  /** sha256 of the release's SHA256SUMS asset, or null when none ships. */
  sha256sums: string | null;
  /** What the pin installs, for the init.md pin table. */
  role: string;
}

export const ECOSYSTEM_PINS = {
  pack: {
    repo: 'deepworkplan-skill',
    tag: 'v8.0.2',
    sha256sums:
      '332e8f9a51fe818f5e78839f99f92b60fce2b6eed8383d5e90b91c994ca019f5',
    role: 'the Deep Work Plan skill (pack)',
  },
  agentkit: {
    repo: 'coding-agents-kit',
    tag: 'v1.5.0',
    sha256sums:
      'd8057636d357ba056ab8c8a7feec58d31b53cb58c91d943109b7f22590b5cca3',
    role: 'agentkit addon (`ak`)',
  },
  herdr: {
    repo: 'herdr-peers',
    tag: 'v2.2.0',
    sha256sums:
      '694766b8ee39ee57b0ce39e8d31a64ca018830159aec7989226f1d094a4c8c2c',
    role: 'Herdr addon (herdr-peers)',
  },
  devcontainer: {
    repo: 'devcontainer-kit',
    tag: 'v1.4.0',
    sha256sums:
      '67761d9e45c9238e07f51ee13d67a1dea5f06f668c9cd39a0df66f8a663344f2',
    role: 'devcontainer addon (`dck`)',
  },
  vim: {
    repo: 'deepworkplan-vim',
    tag: 'v1.1.0',
    sha256sums:
      'b6942c217e1985ce36638a1f2d29530e82a6e92dcdea1ef5e0390fddb7ce2187',
    role: 'DeepWorkPlan Vim addon',
  },
  reviewer: {
    repo: 'ai-diff-reviewer',
    tag: 'v3.3.16',
    sha256sums:
      'af29e32655378c3f4efc7f05fa3b92c87040e3ba45a8f980e1179a7f6c1bc398',
    role: 'required local review (AI Diff Reviewer)',
  },
  dailybot: {
    repo: 'agent-skill',
    tag: 'v3.23.20',
    sha256sums: null,
    role: 'Dailybot addon (agent skill)',
  },
} as const satisfies Record<string, EcosystemPin>;

export type EcosystemPinKey = keyof typeof ECOSYSTEM_PINS;
