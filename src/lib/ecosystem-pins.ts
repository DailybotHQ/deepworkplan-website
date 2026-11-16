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
    tag: 'v7.10.2',
    sha256sums:
      'e011b7e863911bcd1cc895af810b51fa89f1dac5987da856525749eaad1c8456',
    role: 'the Deep Work Plan skill (pack)',
  },
  agentkit: {
    repo: 'coding-agents-kit',
    tag: 'v1.2.0',
    sha256sums:
      '424cd430846608bc5c4a8a6bfde535ddb9e8251373160ddb8257106c38acc8de',
    role: 'agentkit addon (`ak`)',
  },
  herdr: {
    repo: 'herdr-peers',
    tag: 'v1.3.0',
    sha256sums:
      '135abb696a3e4b28b60c51369b3a0f9e91f7adafee9fb5ea08c6159d85c6c272',
    role: 'Herdr addon (herdr-peers)',
  },
  devcontainer: {
    repo: 'devcontainer-kit',
    tag: 'v1.1.2',
    sha256sums:
      'c7a5ffb737777473f08932f9a2de153518d923f5d7edeb4ab97fdd7537bf2374',
    role: 'devcontainer addon (`dck`)',
  },
  vim: {
    repo: 'deepworkplan-vim',
    tag: 'v1.0.1',
    sha256sums:
      '304667a4fa5914e503332213549b49105c87577d42d1b757f82d3a9a4d1156c7',
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
