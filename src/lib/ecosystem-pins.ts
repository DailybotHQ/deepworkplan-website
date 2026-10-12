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
    tag: 'v7.6.3',
    sha256sums:
      'ddb486549780a47688c20aa763a55fc090bbf76bf11a4767f1827f3c2266e332',
    role: 'the Deep Work Plan skill (pack)',
  },
  agentkit: {
    repo: 'coding-agents-kit',
    tag: 'v0.6.0',
    sha256sums:
      'f7ced7a74d9ef8631c75aeae0792b8b41f5f8ad68350d4fb18d13678528e0b21',
    role: 'agentkit addon (`ak`)',
  },
  herdr: {
    repo: 'herdr-peers',
    tag: 'v0.3.0',
    sha256sums:
      'e31f9eaaa5c19af1b957ee7c00c077b2dac1fb87fbb7b45e557b30b47e475bc9',
    role: 'Herdr addon (herdr-peers)',
  },
  devcontainer: {
    repo: 'devcontainer-kit',
    tag: 'v0.3.5',
    sha256sums:
      'efee9464a24ef78d50c8a470ace8afa4d75bb9aafd845e659839ab40e7ab69ee',
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
    tag: 'v3.3.11',
    sha256sums:
      'd384c1fffc710e46b5a06d85c5366dfdfd612bebd67526c8647838714b089cf6',
    role: 'required local review (AI Diff Reviewer)',
  },
  dailybot: {
    repo: 'agent-skill',
    tag: 'v3.23.14',
    sha256sums: null,
    role: 'Dailybot addon (agent skill)',
  },
} as const satisfies Record<string, EcosystemPin>;

export type EcosystemPinKey = keyof typeof ECOSYSTEM_PINS;
