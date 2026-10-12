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
    // Synchronous scan of every file under .agents/skills, docs and src: it
    // takes 2-3s idle and over 6s when the machine is busy (observed on a
    // shared box with a load average above 7), so the 5s default is a flake.
  }, 30_000);

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
    // The vendored skill names its files <label>.schema.json (v1, e.g.
    // plan-manifest.schema.json), <label>-v<N>.schema.json (plan-manifest-v5)
    // and, for some v1 schemas, <label>-v1.schema.json (dwp-config-v1). Every
    // file is checked: a published copy that lags the vendored one is drift.
    const parse = (
      fileName: string
    ): { label: string; version: string } | null => {
      const match = fileName.match(/^([a-z-]+?)(?:-v(\d+))?\.schema\.json$/);
      if (!match) return null;
      return { label: match[1], version: `v${match[2] ?? '1'}` };
    };

    const mismatches: string[] = [];
    const checked: string[] = [];
    const schemaFiles = readdirSync(VENDORED_SKILL_SCHEMA_DIR).filter((f) =>
      f.endsWith('.schema.json')
    );
    let parsedCount = 0;

    for (const fileName of schemaFiles) {
      const parsed = parse(fileName);
      if (!parsed) continue;
      parsedCount++;
      const { label, version } = parsed;
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

    // No vendored schema file may be skipped silently by the name parser.
    expect(parsedCount).toBe(schemaFiles.length);
    expect(checked).toContain('dwp-config/v1');
    expect(checked).toContain('learnings-record/v1');
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
