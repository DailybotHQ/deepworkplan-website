import { describe, expect, it } from 'vitest';

import {
  buildSoftwareSchema,
  softwareFrontmatterSchema,
} from '@/lib/software-schema';

const software = {
  applicationCategory: 'DeveloperApplication',
  operatingSystem: ['macOS', 'Linux', 'WSL'],
  license: 'https://www.gnu.org/licenses/gpl-3.0.html',
  installUrl: 'https://deepworkplan.com/vim/install.sh',
  sameAs: ['https://github.com/DailybotHQ/deepworkplan-vim'],
};

const base = {
  name: 'DeepWorkPlan Vim',
  description: 'The terminal editor for Deep Work Plan.',
  siteUrl: 'https://deepworkplan.com',
  prefix: '',
  slug: 'vim',
  lang: 'en' as const,
};

describe('buildSoftwareSchema', () => {
  it('returns null when the entry declares no software frontmatter', () => {
    expect(buildSoftwareSchema({ ...base })).toBeNull();
    expect(buildSoftwareSchema({ ...base, software: undefined })).toBeNull();
  });

  it('returns null for an invalid software value instead of emitting bad data', () => {
    expect(
      buildSoftwareSchema({
        ...base,
        software: { ...software, license: 'not a url' },
      })
    ).toBeNull();
    expect(
      buildSoftwareSchema({
        ...base,
        software: { ...software, operatingSystem: [] },
      })
    ).toBeNull();
  });

  it('emits the required SoftwareApplication properties', () => {
    const schema = buildSoftwareSchema({ ...base, software });
    expect(schema).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'DeepWorkPlan Vim',
      url: 'https://deepworkplan.com/kit/vim',
      applicationCategory: 'DeveloperApplication',
      license: 'https://www.gnu.org/licenses/gpl-3.0.html',
      installUrl: 'https://deepworkplan.com/vim/install.sh',
      isAccessibleForFree: true,
    });
  });

  it('joins the operating systems into one schema.org string', () => {
    const schema = buildSoftwareSchema({ ...base, software });
    expect(schema?.operatingSystem).toBe('macOS, Linux, WSL');
  });

  it('honors the language prefix and language tag', () => {
    const schema = buildSoftwareSchema({
      ...base,
      prefix: '/es',
      lang: 'es',
      software,
    });
    expect(schema?.url).toBe('https://deepworkplan.com/es/kit/vim');
    expect(schema?.inLanguage).toBe('es');
  });

  it('never carries a version or a release date', () => {
    const schema = buildSoftwareSchema({ ...base, software });
    expect(schema).not.toHaveProperty('softwareVersion');
    expect(schema).not.toHaveProperty('datePublished');
    expect(schema).not.toHaveProperty('dateModified');
  });

  it('links the product to the Deep Work Plan site and omits empty sameAs', () => {
    const withSameAs = buildSoftwareSchema({ ...base, software });
    expect(withSameAs?.isPartOf).toEqual({
      '@type': 'WebSite',
      name: 'Deep Work Plan',
      url: 'https://deepworkplan.com/',
    });
    expect(withSameAs?.sameAs).toEqual([
      'https://github.com/DailybotHQ/deepworkplan-vim',
    ]);
    const without = buildSoftwareSchema({
      ...base,
      software: { ...software, sameAs: [] },
    });
    expect(without).not.toHaveProperty('sameAs');
  });
});

describe('softwareFrontmatterSchema', () => {
  it('accepts the DeepWorkPlan Vim frontmatter', () => {
    expect(softwareFrontmatterSchema.safeParse(software).success).toBe(true);
  });

  it('rejects unknown-quality input: missing install URL', () => {
    const { installUrl: _omit, ...rest } = software;
    expect(softwareFrontmatterSchema.safeParse(rest).success).toBe(false);
  });
});
