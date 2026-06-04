import EventEmitter from 'node:events';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

EventEmitter.defaultMaxListeners = 20;
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
// @ts-check
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';

import excludeInternal from './src/integrations/exclude-internal';
import { DEFAULT_LANGUAGE_CODE, LANGUAGE_CODES } from './src/lib/language-codes';
import rehypeResponsiveTables from './src/lib/rehype-responsive-tables.mjs';

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
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        },
      ],
      // Wrap reader Markdown tables in .table-responsive so they scroll on mobile
      // instead of overflowing the page (methodology/spec/kit are table-heavy).
      rehypeResponsiveTables,
    ],
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
      hmr: {
        overlay: true,
      },
      port: 5555,
      watch: {
        ignored: ['**/.lighthouseci/**'],
      },
    },
  },
});
