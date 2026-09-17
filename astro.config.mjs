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
import { REDIRECT_PAIRS } from './src/lib/redirect-map';
import { satteriHastPlugins } from './src/lib/satteri-markdown-plugins.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Expands REDIRECT_PAIRS (src/lib/redirect-map.ts, the single source of
// truth shared with scripts/generate-redirects.mjs) across every active
// language. This produces Astro's HTML meta-refresh fallback page for each
// entry — the *real* server-side 301 agents and crawlers see comes from the
// generated public/_redirects (Cloudflare Pages reads it before any static
// asset lookup), not from this HTML page.
const siteRedirects = Object.fromEntries(
  LANGUAGE_CODES.flatMap((code) => {
    const prefix = code === DEFAULT_LANGUAGE_CODE ? '' : `/${code}`;
    return REDIRECT_PAIRS.map(({ from, to, status }) => [
      `${prefix}/${from}`,
      { status, destination: `${prefix}/${to}` },
    ]);
  })
);

// https://astro.build/config
export default defineConfig({
  site: 'https://deepworkplan.com',
  // Keep Astro 6 HTML-aware whitespace so inline elements do not glue together
  // under Astro 7's default JSX whitespace compression.
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
  redirects: siteRedirects,
  // Sätteri (Rust) is the Astro 7 default Markdown/MDX pipeline. Custom hast
  // plugins restore external-link target/rel and responsive table wrappers.
  markdown: {
    processor: satteri({
      hastPlugins: satteriHastPlugins,
    }),
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
    plugins: [
      tailwindcss(),
      // Dev-only: stamp `charset=utf-8` on Markdown responses.
      //
      // Vite's static middleware serves `.md` as `text/markdown` with no
      // charset parameter, so a browser falls back to guessing — typically
      // windows-1252 — and every non-ASCII character in the 1,600+ agent
      // Markdown endpoints renders as mojibake (an em dash becomes `â€"`).
      // The content is correct UTF-8 and production is correct too:
      // Cloudflare Pages already serves `text/markdown; charset=utf-8`. This
      // only closes the gap locally, so reviewing an endpoint in a browser
      // does not look like data corruption that needs "fixing".
      {
        name: 'dwp-dev-markdown-charset',
        apply: 'serve',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url?.split('?')[0].endsWith('.md')) {
              res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
            }
            next();
          });
        },
      },
    ],
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
