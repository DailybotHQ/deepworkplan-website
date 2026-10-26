import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { findUnresolvedAnchors } from '../../../scripts/check-anchor-resolution.mjs';

// The anchor-resolution check runs at the end of `pnpm run build` over
// dist/. These cases pin what it reports: a fragment copied from the English
// source while the page slugs its translated heading (the drift this check
// exists to catch), a link whose target page does not exist at all, and the
// percent-encoded-href vs raw-id spelling that must count as resolved.

function pages(entries: Record<string, string>): Map<string, string> {
  return new Map(Object.entries(entries));
}

describe('findUnresolvedAnchors', () => {
  it('resolves a percent-encoded fragment against a raw UTF-8 id', () => {
    const html =
      '<h2 id="die-ssh-schlüssel-des-hosts"></h2><a href="#die-ssh-schl%C3%BCssel-des-hosts"></a>';
    expect(
      findUnresolvedAnchors(pages({ 'de/kit/devcontainer/index.html': html }))
    ).toEqual([]);
  });

  it('reports an English fragment when the heading slug is translated', () => {
    const html =
      '<h2 id="perfiles-de-ejecución"></h2><a href="#execution-profiles"></a>';
    expect(
      findUnresolvedAnchors(
        pages({ 'es/spec/agent-protocol/index.html': html })
      )
    ).toEqual([
      {
        file: 'es/spec/agent-protocol/index.html',
        href: '#execution-profiles',
        target: 'es/spec/agent-protocol/index.html',
      },
    ]);
  });

  it('reports a cross-page link whose target page is missing', () => {
    const html =
      '<a href="/methodology/core-loop#anatomi-tugas-sepuluh-bagian"></a>';
    expect(
      findUnresolvedAnchors(
        pages({ 'id/methodology/03-templates/index.html': html })
      )
    ).toEqual([
      {
        file: 'id/methodology/03-templates/index.html',
        href: '/methodology/core-loop#anatomi-tugas-sepuluh-bagian',
        target: null,
      },
    ]);
  });

  it('reports a translated fragment aimed at the unprefixed (English) page', () => {
    const itDelegation =
      '<a href="/spec/resources-and-abilities#il-file-di-configurazione"></a>';
    const enTarget = '<h2 id="the-configuration-file-and-addon-registry"></h2>';
    expect(
      findUnresolvedAnchors(
        pages({
          'it/spec/delegation/index.html': itDelegation,
          'spec/resources-and-abilities/index.html': enTarget,
        })
      )
    ).toEqual([
      {
        file: 'it/spec/delegation/index.html',
        href: '/spec/resources-and-abilities#il-file-di-configurazione',
        target: 'spec/resources-and-abilities/index.html',
      },
    ]);
  });

  it('accepts a lang-prefixed cross-page link with the translated slug', () => {
    const esDelegation =
      '<a href="/es/spec/resources-and-abilities#el-archivo-de-configuración-y-el-registro-de-addons"></a>';
    const esTarget =
      '<h2 id="el-archivo-de-configuración-y-el-registro-de-addons"></h2>';
    expect(
      findUnresolvedAnchors(
        pages({
          'es/spec/delegation/index.html': esDelegation,
          'es/spec/resources-and-abilities/index.html': esTarget,
        })
      )
    ).toEqual([]);
  });

  it('skips external and mailto links', () => {
    const html =
      '<a href="https://deepworkplan.com/spec/delegation#no-such-id"></a>' +
      '<a href="mailto:hi@example.com#no"></a>';
    expect(findUnresolvedAnchors(pages({ 'en/index.html': html }))).toEqual([]);
  });
});

// The build-output scan itself: with dist/ present (after `pnpm run build`),
// every fragment link on every page must resolve. Skipped when no build
// output exists so `pnpm run test` stays runnable without a build.
describe.skipIf(!existsSync('dist'))('dist anchor resolution', () => {
  it('has no unresolved fragment links in the built site', async () => {
    const { readdirSync, readFileSync, statSync } = await import('node:fs');
    const { join, relative } = await import('node:path');

    const collect = (dir: string): string[] => {
      const files: string[] = [];
      for (const name of readdirSync(dir)) {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) files.push(...collect(path));
        else if (name.endsWith('.html')) files.push(path);
      }
      return files;
    };

    const built = new Map<string, string>();
    for (const file of collect('dist')) {
      built.set(
        relative('dist', file).split('\\').join('/'),
        readFileSync(file, 'utf8')
      );
    }

    const unresolved = findUnresolvedAnchors(built);
    expect(unresolved.map(({ file, href }) => `${file} → ${href}`)).toEqual([]);
  });
});
