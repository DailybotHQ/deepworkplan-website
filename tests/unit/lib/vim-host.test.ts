import { afterEach, describe, expect, it } from 'vitest';
import {
  installVimHostHomeLinks,
  MAIN_ORIGIN,
  mainSiteHref,
  VIM_HOST,
} from '@/lib/vim-host';

const VIM_BASE = `https://${VIM_HOST}/`;

/** A window-shaped stand-in: the test document plus a chosen location. */
function fakeWindow(href: string): Window {
  const url = new URL(href);
  return {
    location: { hostname: url.hostname, href: url.href },
    document,
  } as unknown as Window;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('mainSiteHref', () => {
  it('maps the root and language roots on the vim host to the main site', () => {
    expect(mainSiteHref('/', VIM_BASE)).toBe(`${MAIN_ORIGIN}/`);
    expect(mainSiteHref('/es', VIM_BASE)).toBe(`${MAIN_ORIGIN}/es`);
    expect(mainSiteHref('/ja/', VIM_BASE)).toBe(`${MAIN_ORIGIN}/ja/`);
    expect(mainSiteHref('/?ref=logo#top', VIM_BASE)).toBe(
      `${MAIN_ORIGIN}/?ref=logo#top`
    );
    expect(mainSiteHref(`https://${VIM_HOST}/`, VIM_BASE)).toBe(
      `${MAIN_ORIGIN}/`
    );
  });

  it('leaves every other link alone', () => {
    expect(mainSiteHref('/kit/vim/', VIM_BASE)).toBeNull();
    expect(mainSiteHref('/methodology', VIM_BASE)).toBeNull();
    expect(mainSiteHref('/es/kit', VIM_BASE)).toBeNull();
    expect(
      mainSiteHref('#install', VIM_BASE.replace(/\/$/, '/kit/vim/'))
    ).toBeNull();
    expect(mainSiteHref('https://github.com/', VIM_BASE)).toBeNull();
    // The custom domain keeps the document at `/`: in-page and relative links
    // must stay on the vim page.
    expect(mainSiteHref('#main-content', VIM_BASE)).toBeNull();
    expect(mainSiteHref('#install', VIM_BASE)).toBeNull();
    expect(mainSiteHref('?lang=es', VIM_BASE)).toBeNull();
    expect(mainSiteHref('es/', VIM_BASE)).toBeNull();
    expect(mainSiteHref('', VIM_BASE)).toBeNull();
    expect(mainSiteHref('//vim.deepworkplan.com/', VIM_BASE)).toBeNull();
    expect(mainSiteHref('/vim/install.sh', VIM_BASE)).toBeNull();
  });
});

describe('installVimHostHomeLinks', () => {
  it('does nothing on the main site', () => {
    document.body.innerHTML = '<a id="home" href="/">Home</a>';
    expect(
      installVimHostHomeLinks(fakeWindow('https://deepworkplan.com/kit/vim/'))
    ).toBe(0);
    expect(document.getElementById('home')?.getAttribute('href')).toBe('/');
  });

  it('rewrites home and language-root links present at load on the vim host', () => {
    document.body.innerHTML = [
      '<a id="logo" href="/">Deep Work Plan</a>',
      '<a id="es" href="/es">Español</a>',
      '<a id="kit" href="/kit">Kit</a>',
    ].join('');
    expect(installVimHostHomeLinks(fakeWindow(VIM_BASE))).toBe(2);
    expect(document.getElementById('logo')?.getAttribute('href')).toBe(
      `${MAIN_ORIGIN}/`
    );
    expect(document.getElementById('es')?.getAttribute('href')).toBe(
      `${MAIN_ORIGIN}/es`
    );
    expect(document.getElementById('kit')?.getAttribute('href')).toBe('/kit');
  });

  it('keeps the skip link and in-page anchors on the vim page', () => {
    document.body.innerHTML = [
      '<a id="skip" href="#main-content">Skip</a>',
      '<a id="anchor" href="#install">Install</a>',
    ].join('');
    expect(installVimHostHomeLinks(fakeWindow(VIM_BASE))).toBe(0);
    expect(document.getElementById('skip')?.getAttribute('href')).toBe(
      '#main-content'
    );
    expect(document.getElementById('anchor')?.getAttribute('href')).toBe(
      '#install'
    );
  });

  it('rewrites a home link reset after load when its context menu opens', () => {
    installVimHostHomeLinks(fakeWindow(VIM_BASE));
    document.body.innerHTML = '<a id="logo" href="/">Deep Work Plan</a>';
    document
      .getElementById('logo')
      ?.dispatchEvent(
        new MouseEvent('contextmenu', { bubbles: true, cancelable: true })
      );
    expect(document.getElementById('logo')?.getAttribute('href')).toBe(
      `${MAIN_ORIGIN}/`
    );
  });

  it('rewrites a home link rendered after load when it is activated', () => {
    installVimHostHomeLinks(fakeWindow(VIM_BASE));
    document.body.innerHTML =
      '<a id="late" href="/pt/"><span id="inner">PT</span></a>';
    // Stop the click from navigating the test document.
    document.addEventListener('click', (event) => event.preventDefault(), {
      once: true,
    });
    document
      .getElementById('inner')
      ?.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      );
    expect(document.getElementById('late')?.getAttribute('href')).toBe(
      `${MAIN_ORIGIN}/pt/`
    );
  });
});
