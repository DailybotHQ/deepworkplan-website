import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

// Canonical schema URLs of the form https://deepworkplan.com/schema/<label>/<version>.json
// are served from public/schema/<label>/<version>.json. Every URL referenced from an
// agent-facing surface must resolve to a published file, and every version the vendored
// DWP skill carries must be published byte-identical.
const SCHEMA_URL_PATTERN =
  /https:\/\/deepworkplan\.com\/schema\/([a-z-]+)\/(v\d+)\.json/g;

const REPO_ROOT = process.cwd();
const PUBLIC_SCHEMA_DIR = join(REPO_ROOT, 'public', 'schema');
const VENDORED_SKILL_SCHEMA_DIR = join(
  REPO_ROOT,
  '.agents',
  'skills',
  'deepworkplan',
  'spec',
  'schema'
);

/** Recursively collect files under a directory (bounded to text-ish sizes). */
function collectFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectFiles(full, acc);
    } else if (statSync(full).size < 512 * 1024) {
      acc.push(full);
    }
  }
  return acc;
}

/** Surfaces that agents read and that cite canonical schema URLs. */
function scannedSurfaces(): string[] {
  return [
    join(REPO_ROOT, '.agents', 'skills'),
    join(REPO_ROOT, 'public', '.well-known'),
    join(REPO_ROOT, 'docs'),
    join(REPO_ROOT, 'src'),
  ];
}

describe('canonical schema URL publication', () => {
  it('resolves every schema URL referenced from agent-facing surfaces', () => {
    const referenced = new Map<string, string[]>(); // URL -> citing files

    for (const surface of scannedSurfaces()) {
      for (const file of collectFiles(surface)) {
        const content = readFileSync(file, 'utf8');
        for (const match of content.matchAll(SCHEMA_URL_PATTERN)) {
          const url = match[0];
          const citers = referenced.get(url) ?? [];
          citers.push(relative(REPO_ROOT, file));
          referenced.set(url, citers);
        }
      }
    }

    expect(referenced.size).toBeGreaterThan(0);

    const missing: string[] = [];
    for (const url of referenced.keys()) {
      const label = url.replace(SCHEMA_URL_PATTERN, '$1');
      const version = url.replace(SCHEMA_URL_PATTERN, '$2');
      const published = join(PUBLIC_SCHEMA_DIR, label, `${version}.json`);
      if (!existsSync(published)) {
        missing.push(
          `${url} (cited by ${referenced.get(url)?.slice(0, 3).join(', ')})`
        );
      }
    }

    expect(missing, `unpublished schema URLs:\n${missing.join('\n')}`).toEqual(
      []
    );
  });

  it('publishes the v2 and v5 plan schemas the v5 line depends on', () => {
    // v5-authored plans cite these URLs; before their publication every v5
    // plan's schema URL 404'd. Their references live mostly in the published
    // files themselves, so the resolve guard above cannot catch their absence.
    const missing = [
      'plan-manifest/v2',
      'plan-manifest/v5',
      'plan-state/v2',
      'plan-state/v5',
    ].filter(
      (labelVersion) =>
        !existsSync(join(PUBLIC_SCHEMA_DIR, `${labelVersion}.json`))
    );

    expect(missing, `unpublished: ${missing.join(', ')}`).toEqual([]);
  });

  it('publishes every schema version the vendored DWP skill carries, byte-identical', () => {
    // The vendored skill names its files plan-manifest.schema.json (v1),
    // plan-manifest-v2.schema.json (v2), plan-manifest-v5.schema.json (v5), etc.
    const versionOf = (fileName: string): string | null => {
      const match = fileName.match(
        /^plan-(manifest|state)(?:-v(\d+))?\.schema\.json$/
      );
      if (!match) return null;
      return `v${match[2] ?? '1'}`;
    };

    const mismatches: string[] = [];
    const checked: string[] = [];

    for (const fileName of readdirSync(VENDORED_SKILL_SCHEMA_DIR)) {
      const version = versionOf(fileName);
      if (!version) continue;
      const label = fileName.startsWith('plan-manifest')
        ? 'plan-manifest'
        : 'plan-state';
      const vendored = join(VENDORED_SKILL_SCHEMA_DIR, fileName);
      const published = join(PUBLIC_SCHEMA_DIR, label, `${version}.json`);
      if (!existsSync(published)) {
        mismatches.push(`${label}/${version}.json is not published`);
        continue;
      }
      checked.push(`${label}/${version}`);
      if (!readFileSync(vendored).equals(readFileSync(published))) {
        mismatches.push(
          `${label}/${version}.json differs from the vendored skill copy`
        );
      }
    }

    expect(checked).toContain('plan-manifest/v1');
    expect(checked).toContain('plan-state/v1');
    expect(checked).toContain('plan-manifest/v2');
    expect(checked).toContain('plan-state/v2');
    expect(mismatches, `publication drift:\n${mismatches.join('\n')}`).toEqual(
      []
    );
  });

  it('keeps every published schema self-consistent with its own canonical URL', () => {
    const inconsistent: string[] = [];

    for (const label of readdirSync(PUBLIC_SCHEMA_DIR)) {
      const labelDir = join(PUBLIC_SCHEMA_DIR, label);
      if (!statSync(labelDir).isDirectory()) continue;
      for (const version of readdirSync(labelDir)) {
        const file = join(labelDir, version);
        const parsed = JSON.parse(readFileSync(file, 'utf8')) as {
          $id?: string;
        };
        const expected = `https://deepworkplan.com/schema/${label}/${version}`;
        if (parsed.$id !== expected) {
          inconsistent.push(
            `${relative(REPO_ROOT, file)}: $id ${parsed.$id ?? '(none)'} != ${expected}`
          );
        }
      }
    }

    expect(
      inconsistent,
      `self-inconsistent $id values:\n${inconsistent.join('\n')}`
    ).toEqual([]);
  });
});
