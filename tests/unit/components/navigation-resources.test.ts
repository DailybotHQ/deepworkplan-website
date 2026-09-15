import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Footer: Compare and FAQ links', () => {
  it('links both pages from the footer source', () => {
    const source = readFileSync(
      resolve(process.cwd(), 'src/components/Footer.astro'),
      'utf8'
    );
    // biome-ignore lint/suspicious/noTemplateCurlyInString: testing literal source code containing template placeholders
    expect(source).toContain('`${prefix}/compare`');
    // biome-ignore lint/suspicious/noTemplateCurlyInString: testing literal source code containing template placeholders
    expect(source).toContain('`${prefix}/faq`');
  });
});
