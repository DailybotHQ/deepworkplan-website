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
    tag: 'v7.6.0',
    sha256sums:
      '99f0dbf3bcc1e795fa6e15b520d6250f0a47d5efcb44614fa5d1926fb2320784',
    role: 'the Deep Work Plan skill (pack)',
  },
  agentkit: {
    repo: 'coding-agents-kit',
    tag: 'v0.5.0',
    sha256sums:
      'a90f45e44085370694a954a3578d037d0637d0eb4ec2f1b846a8d29556b1ec27',
    role: 'agentkit addon (`ak`)',
  },
  herdr: {
    repo: 'herdr-peers',
    tag: 'v0.2.1',
    sha256sums:
      '72b3ea5352ab3eb13045fb0ff901efddc5d8b860724daa3d75d4531df3ebfb3f',
    role: 'Herdr addon (herdr-peers)',
  },
  devcontainer: {
    repo: 'devcontainer-kit',
    tag: 'v0.3.0',
    sha256sums:
      '02d4de086eeb010b42458dd131b690df36638b361033e5df6aa3d5ceba4a7eea',
    role: 'devcontainer addon (`dck`)',
  },
  vim: {
    repo: 'deepworkplan-vim',
    tag: 'v0.7.0',
    sha256sums:
      '24c0a036f8988d2c2a484c4153cddde7ffe563b12709df3f4b5a2150970e08d2',
    role: 'DeepWorkPlan Vim addon',
  },
  reviewer: {
    repo: 'ai-diff-reviewer',
    tag: 'v3.3.9',
    sha256sums:
      'aaf490cfe01ba858df49732798d6861a7c742b967f39fedb4f1a9c999aafc0c9',
    role: 'required local review (AI Diff Reviewer)',
  },
  dailybot: {
    repo: 'agent-skill',
    tag: 'v3.23.12',
    sha256sums: null,
    role: 'Dailybot addon (agent skill)',
  },
} as const satisfies Record<string, EcosystemPin>;

export type EcosystemPinKey = keyof typeof ECOSYSTEM_PINS;
