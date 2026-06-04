<script lang="ts">
import { onMount } from 'svelte';
import { EVENTS, trackEvent } from '@/lib/analytics';
import { REPO_URLS } from '@/lib/constants/repos';
import {
  getActiveLanguages,
  getLanguageConfig,
  getUrlPrefix,
  stripLangPrefix,
} from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';
import MobileMenu from './MobileMenu.svelte';

export let lang: string = 'en';
let open: boolean = false;
let languageOpen = false;
let repoOpen = false;

// Dropdown label: full native name + Title-case code, e.g. "English (En)",
// "Português (Pt)". The trigger itself stays code-only (e.g. "EN").
function languageLabel(code: string, nativeName: string): string {
  const titleCode = code.charAt(0).toUpperCase() + code.slice(1);
  return `${nativeName} (${titleCode})`;
}

$: t = getTranslations(lang);
$: prefix = getUrlPrefix(lang);
$: currentLangConfig = getLanguageConfig(lang);
// Only active (translated) languages appear in the switcher.
$: otherLanguages = getActiveLanguages().filter((l) => l !== lang);

// Alternate language URLs - computed on mount from current page path
let alternateLanguageUrls: {
  lang: string;
  url: string;
  flag: string;
  nativeName: string;
  label: string;
}[] = [];

onMount(() => {
  const path = window.location.pathname;
  const basePath = stripLangPrefix(path);

  alternateLanguageUrls = otherLanguages.map((l) => {
    const config = getLanguageConfig(l);
    const url =
      basePath === '/'
        ? config.urlPrefix || '/'
        : `${config.urlPrefix}${basePath}`;
    return {
      lang: l,
      url,
      flag: config.flag,
      nativeName: config.nativeName,
      label: languageLabel(l, config.nativeName),
    };
  });
});

function toggleMenu() {
  open = !open;
  trackEvent(EVENTS.MOBILE_MENU_TOGGLE, { action: open ? 'open' : 'close' });
}

// Theme toggle (hurricane lamp). Replaces the floating bottom-right toggle.
// Hover shows a *preview* of what clicking will do (lit on hover in light;
// off on hover in dark). After a click while still hovering, the visual
// freezes on the NEW idle state and only re-enables preview when the cursor
// leaves and re-enters — otherwise the lamp would feel like it's lighting,
// then snapping off, the moment you confirm the toggle.
let isDark = false;
let themeHovered = false;
let justToggled = false;
onMount(() => {
  isDark = document.documentElement.classList.contains('dark');
});
function toggleTheme() {
  const html = document.documentElement;
  isDark = html.classList.toggle('dark');
  justToggled = true;
  const newTheme = isDark ? 'dark' : 'light';
  try {
    localStorage.setItem('theme', newTheme);
  } catch (e) {
    /* Safari Private Mode throws SecurityError on storage access */
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', isDark ? '#14140f' : '#f7f4ec');
  trackEvent(EVENTS.THEME_TOGGLE, { theme: newTheme });
}
function onLampEnter() {
  themeHovered = true;
}
function onLampLeave() {
  themeHovered = false;
  // Reset so the NEXT fresh hover engages the preview again.
  justToggled = false;
}
// Preview only when hovering AND we haven't just toggled while still inside.
$: showPreview = themeHovered && !justToggled;
$: lampSrc = showPreview
  ? isDark
    ? '/images/ui/lamp-off.png'
    : '/images/ui/lamp-on.png'
  : isDark
    ? '/images/ui/lamp-on.png'
    : '/images/ui/lamp-off.png';
$: lampLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';

function openDropdown(which: string) {
  languageOpen = which === 'language';
  repoOpen = which === 'repo';
}

function closeAllDropdowns() {
  languageOpen = false;
  repoOpen = false;
}
</script>

<svelte:window on:click={closeAllDropdowns} />

<header class="bg-paper text-ink dark:bg-main dark:text-white sticky top-0 z-50 border-b border-line transition-colors duration-300">
  <nav class="main-container flex items-center justify-between">
    <div class="flex items-center gap-2 md:gap-3">
    <!-- Masthead lockup: B&W mark + serif wordmark -->
    <a
      href={prefix || '/'}
      class="flex items-center gap-3 select-none"
      aria-label="Deep Work Plan"
    >
      <!-- Per-mode logo switch (light/dark). Do not regress. -->
      <img
        class="h-7 w-auto md:h-8 block dark:hidden"
        src="/images/brand/dwp-mark-light.png"
        alt=""
        width={270}
        height={160}
        loading="eager"
        fetchpriority="high"
      />
      <img
        class="h-7 w-auto md:h-8 hidden dark:block"
        src="/images/brand/dwp-mark-dark.png"
        alt=""
        width={270}
        height={160}
        loading="eager"
        fetchpriority="high"
      />
      <span class="hidden sm:flex flex-col leading-none">
        <span class="masthead-wordmark text-lg md:text-xl font-bold tracking-tight text-ink dark:text-white">
          Deep Work Plan
        </span>
        <!-- Decorative strapline: hidden from the accessibility tree so the link's
             accessible name (aria-label "Deep Work Plan") matches its visible label
             (fixes Lighthouse label-content-name-mismatch). -->
        <span class="kicker masthead-strapline mt-1" aria-hidden="true">
          {t.nav.methodology} &middot; {t.nav.spec} &middot; {t.nav.kit}
        </span>
      </span>
    </a>
      <!-- Theme toggle: hurricane lamp inline with the masthead. Lights when
           the site goes dark, dims when it goes back to light. Replaces the
           old floating bottom-right toggle. -->
      <button
        type="button"
        class="theme-toggle-lamp inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 -ml-1 rounded cursor-pointer transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        aria-label={lampLabel}
        title={lampLabel}
        on:click={toggleTheme}
        on:mouseenter={onLampEnter}
        on:mouseleave={onLampLeave}
        on:focus={onLampEnter}
        on:blur={onLampLeave}
      >
        <img
          src={lampSrc}
          alt=""
          width="64"
          height="64"
          class="h-10 w-auto md:h-12"
          loading="eager"
        />
      </button>
    </div>
    <!-- Desktop menu -->
    <div class="hidden md:flex items-center gap-8">
      <div class="flex gap-6">
        <a href="{prefix}/methodology" class="nav-link" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'methodology' })}>{t.nav.methodology}</a>
        <a href="{prefix}/spec" class="nav-link" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'spec' })}>{t.nav.spec}</a>
        <a href="{prefix}/kit" class="nav-link" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'kit' })}>{t.nav.kit}</a>
        <a href="{prefix}/examples" class="nav-link" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'examples' })}>{t.nav.examples}</a>
        <!-- Source-code repo selector: GitHub trigger opens a disclosure with
             links to both the website repo and the installable skill repo.
             Mirrors the language-selector disclosure pattern below. -->
        <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
        <div
          role="group"
          class="relative group"
          on:mouseenter={() => openDropdown('repo')}
          on:mouseleave={() => repoOpen = false}
          on:click|stopPropagation={() => {}}
        >
          <button
            class="nav-link flex items-center gap-1 cursor-pointer select-none"
            aria-expanded={repoOpen}
            aria-haspopup="true"
            aria-controls="repo-dropdown"
            type="button"
            on:click={() => repoOpen ? closeAllDropdowns() : openDropdown('repo')}
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            {t.nav.github}
            <svg
              class="w-4 h-4 transition-transform duration-200"
              style="transform: rotate({repoOpen ? '180deg' : '0deg'});"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          {#if repoOpen}
            <div
              class="absolute right-0 top-full min-w-[14rem]"
              style="height: 12px; pointer-events: auto;"
            ></div>
            <div
              id="repo-dropdown"
              class="absolute right-0 top-full min-w-[14rem] bg-paper dark:bg-main text-ink dark:text-white border border-line rounded shadow-lg z-50 transition-all duration-200"
              style="pointer-events: auto; opacity: 1; transform: translateY(12px);"
              aria-label={t.nav.repo.label}
            >
              <a href={REPO_URLS.website} target="_blank" rel="noopener noreferrer" class="block w-full text-left whitespace-nowrap px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-ink dark:text-white transition" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'github', repo: 'website' })}>
                <span class="block">{t.nav.repo.website}</span>
                <span class="block text-sm text-gray-600 dark:text-gray-300">{t.nav.repo.websiteDesc}</span>
              </a>
              <a href={REPO_URLS.skill} target="_blank" rel="noopener noreferrer" class="block w-full text-left whitespace-nowrap px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-ink dark:text-white transition" on:click={() => trackEvent(EVENTS.NAV_CLICK, { item: 'github', repo: 'skill' })}>
                <span class="block">{t.nav.repo.skill}</span>
                <span class="block text-sm text-gray-600 dark:text-gray-300">{t.nav.repo.skillDesc}</span>
              </a>
            </div>
          {/if}
        </div>
        <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
        <div
          role="group"
          class="relative group"
          on:mouseenter={() => openDropdown('language')}
          on:mouseleave={() => languageOpen = false}
          on:click|stopPropagation={() => {}}
        >
          <button
            class="nav-link flex items-center gap-1 cursor-pointer select-none"
            aria-expanded={languageOpen}
            aria-haspopup="true"
            aria-controls="language-dropdown"
            type="button"
            on:click={() => languageOpen ? closeAllDropdowns() : openDropdown('language')}
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            {lang.toUpperCase()}
            <svg
              class="w-4 h-4 transition-transform duration-200"
              style="transform: rotate({languageOpen ? '180deg' : '0deg'});"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          {#if languageOpen}
            <div
              class="absolute right-0 top-full min-w-[12rem]"
              style="height: 12px; pointer-events: auto;"
            ></div>
            <div
              id="language-dropdown"
              class="absolute right-0 top-full min-w-[12rem] max-h-80 overflow-y-auto bg-paper dark:bg-main text-ink dark:text-white border border-line rounded shadow-lg z-50 transition-all duration-200"
              style="pointer-events: auto; opacity: 1; transform: translateY(12px);"
            >
              {#each alternateLanguageUrls as alt}
                <a href={alt.url} lang={alt.lang} class="block w-full text-left whitespace-nowrap px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-ink dark:text-white transition" on:click={() => trackEvent(EVENTS.LANGUAGE_SWITCH, { from: lang, to: alt.lang })}>
                  {alt.label}
                </a>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
    <!-- Mobile menu button -->
    <button
      class="block md:hidden p-2"
      aria-label={t.nav.menu}
      on:click={toggleMenu}
      type="button"
    >
      <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </nav>
  <MobileMenu {lang} {open} {toggleMenu} />
</header>

<style>
  /* Newspaper masthead lockup. The wordmark uses the editorial serif display
   * stack (see --font-serif in global.css); the strapline reuses the global
   * .kicker treatment, only sized down for the header. */
  .masthead-wordmark {
    font-family: var(--font-serif);
  }
  .masthead-strapline {
    font-size: 0.6rem;
    letter-spacing: 0.22em;
  }
  /* The lamp is etched in dark ink (transparent PNG). On the dark-mode ink
   * background the body would visually disappear; a subtle paper-tinted
   * drop-shadow gives it just enough silhouette to read without altering
   * the warm flame inside the globe. Light-mode renders the lamp unmodified
   * (dark ink on warm paper has plenty of contrast). */
  .theme-toggle-lamp:hover {
    opacity: 0.92;
  }
  :global(.dark) .theme-toggle-lamp img {
    filter: drop-shadow(0 0 0.5px var(--color-ink))
      drop-shadow(0 0 1px var(--color-ink));
  }
  @media (prefers-reduced-motion: reduce) {
    .theme-toggle-lamp {
      transition: none;
    }
  }
  /* Style the language-dropdown scrollbar to blend with the editorial paper
   * palette instead of the browser's default white/grey, which clashed against
   * the warm cream surface. Uses :global() because pseudo-elements need to
   * skip Svelte's scope hashing. */
  :global(#language-dropdown) {
    scrollbar-width: thin;
    scrollbar-color: var(--color-line) transparent;
  }
  :global(#language-dropdown::-webkit-scrollbar) {
    width: 6px;
  }
  :global(#language-dropdown::-webkit-scrollbar-track) {
    background: transparent;
  }
  :global(#language-dropdown::-webkit-scrollbar-thumb) {
    background-color: var(--color-line);
    border-radius: 3px;
  }
  :global(#language-dropdown::-webkit-scrollbar-thumb:hover) {
    background-color: var(--color-muted);
  }
</style>
