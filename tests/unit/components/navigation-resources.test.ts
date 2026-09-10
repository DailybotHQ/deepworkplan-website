import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import Header from '@/components/layout/Header.svelte';
import MobileMenu from '@/components/layout/MobileMenu.svelte';
import { getTranslations } from '@/lib/translations';

/**
 * Navigation contract for the Compare and FAQ pages (PLAN_compare_and_faq_pages
 * Task 5): the header groups Examples, Compare, FAQ and Trust behind a
 * "Resources" disclosure (aria-expanded/aria-controls, no role="menu"), the
 * mobile menu lists both pages, and the footer links them.
 */

const nav = getTranslations('en').nav;

describe('Header: Resources disclosure', () => {
  it('starts closed and opens on click, exposing the four grouped links', async () => {
    const { container } = render(Header, { props: { lang: 'en', nav } });
    const trigger = container.querySelector<HTMLButtonElement>(
      'button[aria-controls="resources-dropdown"]'
    );
    expect(trigger).not.toBeNull();
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    expect(container.querySelector('[role="menu"]')).toBeNull();

    await fireEvent.click(trigger as HTMLButtonElement);
    expect(trigger?.getAttribute('aria-expanded')).toBe('true');

    const panel = container.querySelector('#resources-dropdown');
    expect(panel).not.toBeNull();
    const hrefs = Array.from(panel?.querySelectorAll('a') ?? []).map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toEqual(['/examples', '/compare', '/faq', '/trust']);
  });

  it('closes on Escape', async () => {
    const { container } = render(Header, { props: { lang: 'en', nav } });
    const trigger = container.querySelector<HTMLButtonElement>(
      'button[aria-controls="resources-dropdown"]'
    );
    await fireEvent.click(trigger as HTMLButtonElement);
    expect(trigger?.getAttribute('aria-expanded')).toBe('true');
    await fireEvent.keyDown(window, { key: 'Escape' });
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    expect(container.querySelector('#resources-dropdown')).toBeNull();
  });

  it('keeps Methodology, Spec and Kit as top-level links', () => {
    const { container } = render(Header, { props: { lang: 'en', nav } });
    const topLevel = Array.from(container.querySelectorAll('a.nav-link')).map(
      (a) => a.getAttribute('href')
    );
    expect(topLevel).toEqual(
      expect.arrayContaining(['/methodology', '/spec', '/kit'])
    );
    expect(topLevel).not.toContain('/examples');
    expect(topLevel).not.toContain('/trust');
  });
});

describe('MobileMenu: Compare and FAQ entries', () => {
  it('lists /compare and /faq between Examples and Trust', () => {
    render(MobileMenu, {
      props: { lang: 'en', nav, open: true, toggleMenu: () => {} },
    });
    const links = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'))
      .filter((href): href is string => href !== null && href.startsWith('/'));
    const examples = links.indexOf('/examples');
    expect(examples).toBeGreaterThanOrEqual(0);
    expect(links[examples + 1]).toBe('/compare');
    expect(links[examples + 2]).toBe('/faq');
    expect(links[examples + 3]).toBe('/trust');
  });
});

describe('Footer: Compare and FAQ links', () => {
  it('links both pages from the footer source', () => {
    const source = readFileSync(
      resolve(process.cwd(), 'src/components/Footer.astro'),
      'utf8'
    );
    expect(source).toContain('`${prefix}/compare`');
    expect(source).toContain('`${prefix}/faq`');
  });
});
