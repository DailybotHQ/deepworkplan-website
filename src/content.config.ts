import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Methodology — the human-facing chapters that explain the Deep Work Plan
 * methodology. Bilingual files live under `src/content/methodology/{en,es}`.
 */
const methodology = defineCollection({
  loader: glob({ base: './src/content/methodology', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    lang: z.enum(['en', 'es']),
    summary: z.string().optional(),
    icon: z.string().optional(),
  }),
});

/**
 * Spec — the readable specification of the methodology, split into ordered
 * sections. Bilingual files live under `src/content/spec/{en,es}`.
 */
const spec = defineCollection({
  loader: glob({ base: './src/content/spec', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    lang: z.enum(['en', 'es']),
    section: z.string().optional(),
  }),
});

/**
 * Kit — the catalog of commands, adapters, presets, and examples that make up
 * the DWP kit. Kind-specific fields are allowed via `.passthrough()`.
 */
const kit = defineCollection({
  loader: glob({ base: './src/content/kit', pattern: '**/*.{md,mdx}' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      kind: z.enum(['command', 'adapter', 'preset', 'example', 'addon']),
      lang: z.enum(['en', 'es']),
      order: z.number().optional(),
    })
    .loose(),
});

const pages = defineCollection({
  // Markdown source files for agent-friendly .md endpoints (static pages)
  loader: glob({
    base: './src/content/pages',
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) => entry.replace(/\.md$/i, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.coerce.date().optional(),
  }),
});

export const collections = {
  pages,
  methodology,
  spec,
  kit,
};
