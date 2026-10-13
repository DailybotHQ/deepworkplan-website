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
    tag: 'v7.8.0',
    sha256sums:
      'a43fc0f2996b2edd5e68850f62742486e1d7475314351ba3e25771fd198453e5',
    role: 'the Deep Work Plan skill (pack)',
  },
  agentkit: {
    repo: 'coding-agents-kit',
    tag: 'v1.0.0',
    sha256sums:
      '8995e737862c5486b3ec3d0235e82f358dbf9c20879f44afa506cf8e0721973e',
    role: 'agentkit addon (`ak`)',
  },
  herdr: {
    repo: 'herdr-peers',
    tag: 'v1.0.0',
    sha256sums:
      '11634ef2ad71ccdb26b08c785561e49af6cf1ccf8c26fec34d35b29414d239c2',
    role: 'Herdr addon (herdr-peers)',
  },
  devcontainer: {
    repo: 'devcontainer-kit',
    tag: 'v1.0.0',
    sha256sums:
      '060d16db41214bc91b05089bc7201cf499d21e5571731954a0bb766edd7cb605',
    role: 'devcontainer addon (`dck`)',
  },
  vim: {
    repo: 'deepworkplan-vim',
    tag: 'v1.0.0',
    sha256sums:
      'aa8e80f17b7a5d774846f435007ca0c9ff85d0ac108e1d60a8bc5b991fa76779',
    role: 'DeepWorkPlan Vim addon',
  },
  reviewer: {
    repo: 'ai-diff-reviewer',
    tag: 'v3.3.14',
    sha256sums:
      '57e185bacc80eb3b423f929a7d91c6cd3c503095f1773c14dded07b702feb9c4',
    role: 'required local review (AI Diff Reviewer)',
  },
  dailybot: {
    repo: 'agent-skill',
    tag: 'v3.23.17',
    sha256sums: null,
    role: 'Dailybot addon (agent skill)',
  },
} as const satisfies Record<string, EcosystemPin>;

export type EcosystemPinKey = keyof typeof ECOSYSTEM_PINS;
