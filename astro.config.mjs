import EventEmitter from 'node:events';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

EventEmitter.defaultMaxListeners = 20;
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
// @ts-check
import { defineConfig } from 'astro/config';

import excludeInternal from './src/integrations/exclude-internal';
import { DEFAULT_LANGUAGE_CODE, LANGUAGE_CODES } from './src/lib/language-codes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// /init is the canonical adoption endpoint. /setup and /onboarding redirect to
// it in every language — one page, one .md endpoint, no canonical/AEO
// duplication. Generated from the language registry so adding a language needs
// no edit here.
const adoptionRedirects = Object.fromEntries(
  LANGUAGE_CODES.flatMap((code) => {
    const prefix = code === DEFAULT_LANGUAGE_CODE ? '' : `/${code}`;
    return [
      [`${prefix}/setup`, { status: 301, destination: `${prefix}/init` }],
      [`${prefix}/onboarding`, { status: 301, destination: `${prefix}/init` }],
    ];
  })
);

// https://astro.build/config
export default defineConfig({
  experimental: {
    rustCompiler: true,
  },
  site: 'https://deepworkplan.com',
  build: {
    inlineStylesheets: 'always',
  },
  redirects: adoptionRedirects,
  // TRIAL (perf): Sätteri (Rust) Markdown processor — Astro 6.4. Much faster than
  // the unified pipeline, but it does NOT run remark/rehype plugins, so the
  // external-links and responsive-tables transforms are dropped here (would be
  // reimplemented as a tiny script + CSS if adopted). Built-in: Shiki + heading
  // IDs + image handling. Measuring build delta + verifying rendering.
  markdown: {
    processor: satteri(),
  },
  integrations: [
    mdx(),
    sitemap({
      lastmod: new Date(),
      filter: (page) =>
        !page.includes('/internal/') && !page.endsWith('/internal'),
    }),
    svelte(),
    excludeInternal(),
  ],
  server: {
    host: true,
    port: 5555,
  },
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
            (warning.exporter?.includes('svelte/') || warning.exporter?.includes('@astrojs/internal-helpers'))) {
            return;
          }
          defaultHandler(warning);
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/svelte/')) {
              return 'svelte';
            }
          },
        },
      },
    },
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      force: false,
      holdUntilCrawlEnd: false,
    },
    server: {
      // Pre-compile the heaviest SSR modules at dev startup so the FIRST
      // browser request doesn't trigger a cold compile of global.css /
      // MainLayout / HomePage and blow the 60s `vite:invoke` timeout. With 16
      // languages the cold compile graph for the first page exceeds that
      // window; warming up moves the cost into the "ready in" phase.
      warmup: {
        ssrFiles: [
          './src/styles/global.css',
          './src/layouts/MainLayout.astro',
          './src/components/pages/HomePage.astro',
          './src/components/BaseHead.astro',
          './src/components/layout/Header.svelte',
          './src/lib/i18n.ts',
          './src/lib/translations/index.ts',
        ],
      },
      hmr: {
        overlay: true,
      },
      port: 5555,
      watch: {
        // Ignore everything that doesn't need HMR. With 16 languages our build
        // output explodes to ~926 files; if Vite tries to watch dist/, tmp/,
        // and other large/recursive trees it blows past the inotify limit
        // (ENOSPC). The dev server only needs src/, public/, and config files.
        ignored: [
          // build + cache output
          '**/dist/**',
          '**/.astro/**',
          '**/node_modules/.cache/**',
          '**/coverage/**',
          // Local pnpm store + lockfile internals
          '**/.pnpm-store/**',
          // Skills/agents catalog + DWP plans + scratch — not part of the site
          '**/.agents/**',
          '**/.claude/**',
          '**/.dwp/**',
          '**/tmp/**',
          // Tooling output
          '**/.lighthouseci/**',
          '**/.github/**',
          // Tests / Node scripts — not served by Astro
          '**/tests/**',
          '**/scripts/**',
          // Repo docs — not part of the dev runtime
          '**/docs/**',
        ],
      },
    },
  },
});
