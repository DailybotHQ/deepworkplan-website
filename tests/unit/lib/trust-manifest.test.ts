import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// The trust manifest (public/.well-known/dwp-trust.json) must describe the
// vendored skill honestly: a SemVer pre-release is never the manifest's
// `skill.version` (its install line and checksums resolve to the stable
// `latest` release), and the `prerelease` block's version, install line and
// SHA256SUMS URL all name the same tag. scripts/stamp-versions.mjs keeps them
// in step at build time; this test catches a hand edit or a stale stamp.

const root = process.cwd();
const manifest = JSON.parse(
  readFileSync(resolve(root, 'public/.well-known/dwp-trust.json'), 'utf8')
) as {
  skill: { version: string; install: string };
  prerelease?: { version: string; install: string; checksums: string };
};
const vendored = (readFileSync(
  resolve(root, '.agents/skills/deepworkplan/SKILL.md'),
  'utf8'
).match(/^version: "([^"]+)"/m) ?? [])[1];

describe('trust manifest', () => {
  it('reads the vendored skill version', () => {
    expect(vendored).toMatch(/^\d+\.\d+\.\d+(-[0-9A-Za-z.]+)?$/);
  });

  it('never names a pre-release as the skill version', () => {
    expect(manifest.skill.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('describes a vendored pre-release in one consistent block', () => {
    if (!vendored?.includes('-')) {
      expect(manifest.prerelease).toBeUndefined();
      expect(manifest.skill.version).toBe(vendored);
      return;
    }
    const tag = `v${vendored}`;
    expect(manifest.prerelease?.version).toBe(vendored);
    expect(manifest.prerelease?.install).toBe(
      `npx --yes skills add https://github.com/DailybotHQ/deepworkplan-skill/tree/${tag} --skill deepworkplan -y`
    );
    expect(manifest.prerelease?.checksums).toBe(
      `https://github.com/DailybotHQ/deepworkplan-skill/releases/download/${tag}/SHA256SUMS`
    );
  });
});
