import { z } from 'astro/zod';

// Relative import on purpose: src/content.config.ts imports this module, and the
// content config is loaded before the `@/` alias is available (it uses relative
// imports for ./lib/i18n too).
import { getHreflang, type Language } from './i18n';

/**
 * Optional `software` frontmatter for a kit document that describes a software
 * product (DeepWorkPlan Vim is the first). When present, the kit reader emits a
 * schema.org `SoftwareApplication` block for the page; every other kit document
 * is unchanged. Only facts that are stated on the page belong here, and there
 * is deliberately no version or release-date field: the page never ties a
 * feature to a version number.
 */
export const softwareFrontmatterSchema = z.object({
  applicationCategory: z.string().min(1),
  operatingSystem: z.array(z.string().min(1)).min(1),
  license: z.url(),
  installUrl: z.url(),
  sameAs: z.array(z.url()).optional(),
});

export type SoftwareFrontmatter = z.infer<typeof softwareFrontmatterSchema>;

export interface SoftwareSchemaInput {
  /** The kit entry title (the product name). */
  name: string;
  /** The kit entry description. */
  description: string;
  /** Site origin without a trailing slash, e.g. https://deepworkplan.com */
  siteUrl: string;
  /** Language URL prefix: '' for the default language, '/es' otherwise. */
  prefix: string;
  /** The kit slug, e.g. 'vim'. */
  slug: string;
  lang: Language;
  /** The raw `software` frontmatter value, if any. */
  software?: unknown;
}

/**
 * Build the SoftwareApplication JSON-LD for a kit entry, or `null` when the
 * entry declares no (valid) `software` frontmatter.
 */
export function buildSoftwareSchema(
  input: SoftwareSchemaInput
): Record<string, unknown> | null {
  const parsed = softwareFrontmatterSchema.safeParse(input.software);
  if (!parsed.success) {
    return null;
  }
  const software = parsed.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: input.name,
    description: input.description,
    url: `${input.siteUrl}${input.prefix}/kit/${input.slug}`,
    inLanguage: getHreflang(input.lang),
    applicationCategory: software.applicationCategory,
    operatingSystem: software.operatingSystem.join(', '),
    license: software.license,
    installUrl: software.installUrl,
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Deep Work Plan',
      url: `${input.siteUrl}/`,
    },
    ...(software.sameAs && software.sameAs.length > 0
      ? { sameAs: software.sameAs }
      : {}),
  };
}
