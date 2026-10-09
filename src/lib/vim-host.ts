/**
 * vim.deepworkplan.com serves this same Pages project, with zone rules that
 * rewrite `/` to `/kit/vim/` and 301 every other extension-less path to
 * https://deepworkplan.com. The one gap the zone cannot close is the site's own
 * home links: on that host `/` (the masthead logo) and the language roots
 * (`/es/`, `/ja`, …) resolve to the vim page again. On that host only, these
 * helpers point those links at the main site instead.
 *
 * Bundled into the layout's existing module script (no new inline script), it
 * rewrites the links present at load and, through capture-phase click and
 * auxclick listeners, any home link rendered later (the Svelte masthead and
 * mobile menu) right before the browser follows it.
 */

/** The host that serves the editor's page as its root. */
export const VIM_HOST = 'vim.deepworkplan.com';

/** Where home links on that host should go. */
export const MAIN_ORIGIN = 'https://deepworkplan.com';

/** `/` or a language root (`/es`, `/es/`) — every active language code is two letters. */
const HOME_PATH = /^\/(?:[a-z]{2}\/?)?$/;

/**
 * The main-site URL for a link that resolves (against `base`) to a home path
 * on the same host, or `null` when the link is anything else.
 */
export function mainSiteHref(href: string, base: string): string | null {
  let url: URL;
  try {
    url = new URL(href, base);
  } catch {
    return null;
  }
  if (url.host !== new URL(base).host || !HOME_PATH.test(url.pathname)) {
    return null;
  }
  return `${MAIN_ORIGIN}${url.pathname}${url.search}${url.hash}`;
}

/** Rewrite one anchor in place when it is a home link; true when changed. */
export function rewriteAnchor(
  anchor: HTMLAnchorElement,
  base: string
): boolean {
  const raw = anchor.getAttribute('href');
  if (raw === null) return false;
  const target = mainSiteHref(raw, base);
  if (target === null) return false;
  anchor.setAttribute('href', target);
  return true;
}

/**
 * On vim.deepworkplan.com, send every home and language-root link to the main
 * site. A no-op on any other host. Returns how many links were rewritten at
 * install time (later ones are handled on click).
 */
export function installVimHostHomeLinks(win: Window = window): number {
  if (win.location.hostname !== VIM_HOST) return 0;
  const base = win.location.href;
  let rewritten = 0;
  for (const anchor of win.document.querySelectorAll<HTMLAnchorElement>(
    'a[href]'
  )) {
    if (rewriteAnchor(anchor, base)) rewritten++;
  }
  const onActivate = (event: Event): void => {
    const target = event.target as Element | null;
    const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (anchor) rewriteAnchor(anchor, win.location.href);
  };
  win.document.addEventListener('click', onActivate, true);
  win.document.addEventListener('auxclick', onActivate, true);
  return rewritten;
}
