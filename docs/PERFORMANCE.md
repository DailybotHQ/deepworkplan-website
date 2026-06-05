# Performance Guide

Performance optimization strategies for deepworkplan.com, an Astro static site.

## Performance-First Philosophy

**Performance is a core architectural value of this project, not an afterthought.** Astro was chosen specifically for its performance characteristics (zero JS by default, static generation, islands architecture). Every change to this codebase — whether a new feature, component, page, or refactor — MUST consider its performance impact.

### For AI Agents: Performance Rules

When working on this codebase, **always apply these principles:**

1. **Prefer static over dynamic.** Use Astro components (`.astro`) for content that doesn't need interactivity. Only use Svelte with `client:*` directives when true interactivity is required.
2. **Choose the laziest hydration possible.** Default to `client:visible` or `client:idle`. Only use `client:load` for components that need immediate interactivity (header, navigation). Never add `client:load` without justification.
3. **Minimize JavaScript payload.** Every byte of JS increases Time to Interactive. Avoid heavy libraries. Prefer CSS-only solutions (transitions, animations, scroll-behavior) over JS equivalents.
4. **Use native browser features first.** CSS `scroll-behavior: smooth` over JS scroll libraries. IntersectionObserver over scroll event listeners. Native `<details>` over JS accordions. HTML `loading="lazy"` over JS lazy-loaders.
5. **Optimize images.** Always include width/height to prevent layout shifts. Use `loading="lazy"` for below-fold images. Use the image optimization pipeline (`pnpm run images:optimize`).
6. **Avoid layout shifts.** Reserve space for images, fonts, and dynamic content. Use `font-display: swap`. Set explicit dimensions on media elements.
7. **Keep builds fast.** Minimize content collection processing. Use efficient glob patterns. Pre-optimize assets before committing.

### Performance Impact Assessment

Before submitting any change, ask:
- Does this add JavaScript? If yes, is it strictly necessary?
- Could this use a lighter hydration directive?
- Does this cause layout shifts?
- Does this affect Largest Contentful Paint (LCP)?
- Could this be done with CSS instead of JS?

## Performance Advantages of Astro

Astro provides excellent performance out of the box:

1. **Zero JavaScript by default** - Only loads JS for interactive islands
2. **Static Site Generation** - Pre-rendered HTML at build time
3. **Partial Hydration** - JavaScript only where needed
4. **Automatic optimization** - CSS purging, asset optimization

## Core Web Vitals Targets

| Metric | Target | Description |
|--------|--------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **FID** | < 100ms | First Input Delay |
| **CLS** | < 0.1 | Cumulative Layout Shift |
| **TTFB** | < 800ms | Time to First Byte |

## Image Optimization

### Use Astro's Image Component

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<!-- Optimized: automatic format conversion, lazy loading -->
<Image src={heroImage} alt="Hero" width={1200} height={600} />
```

### Best Practices

1. **Format**: Use WebP or AVIF when possible
2. **Size**: Provide appropriate dimensions
3. **Loading**: Use `loading="lazy"` for below-fold images
4. **Aspect ratio**: Prevent CLS by specifying dimensions

```astro
<!-- For remote images -->
<Image
  src="https://example.com/image.jpg"
  alt="Description"
  width={800}
  height={400}
  loading="lazy"
  decoding="async"
/>
```

### Hero Images

For above-the-fold hero images, optimize for LCP:

```astro
<!-- Above-fold: eager loading -->
<Image
  src={heroImage}
  alt="Deep Work Plan"
  width={1200}
  height={630}
  loading="eager"
  fetchpriority="high"
/>
```

## JavaScript Optimization

### Hydration Strategies

Choose the right hydration directive:

| Directive | When JS Loads | Use Case |
|-----------|---------------|----------|
| `client:load` | Page load | Critical interactivity (header, nav) |
| `client:visible` | Enters viewport | Below-fold components |
| `client:idle` | Browser idle | Low-priority features |
| `client:media` | Media query matches | Responsive features |
| (none) | Never | Static content |

```astro
<!-- Header needs immediate interactivity (includes the inline lamp theme toggle) -->
<Header client:load />

<!-- Below-fold section can wait until visible -->
<ScrollSpyNav client:visible />

<!-- Mobile menu only on small screens -->
<MobileMenu client:media="(max-width: 768px)" />
```

### Minimize JavaScript

1. **Prefer Astro components** for static content
2. **Use Svelte only for interactivity**
3. **Avoid heavy libraries** when possible
4. **Code-split** large components

## CSS Optimization

### Tailwind CSS Purging

Tailwind automatically removes unused styles in production:

```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  // Unused classes are purged in production
};
```

### Critical CSS

Astro inlines critical CSS automatically. For additional optimization:

```astro
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/atkinson-regular.woff" as="font" type="font/woff" crossorigin />
```

### Avoid Layout Shifts

```astro
<!-- Reserve space for images -->
<div class="aspect-video">
  <Image src={image} class="w-full h-full object-cover" />
</div>

<!-- Reserve space for fonts -->
<style>
  @font-face {
    font-family: 'Atkinson';
    font-display: swap; /* Prevent invisible text */
    src: url('/fonts/atkinson-regular.woff') format('woff');
  }
</style>
```

## Caching Strategy

### Static Assets

Cloudflare Pages provides edge caching. Set appropriate cache headers for API routes:

```typescript
// e.g. src/pages/[page].md.ts (agent Markdown endpoint)
return new Response(markdown, {
  headers: {
    'Content-Type': 'text/markdown; charset=utf-8',
    'Cache-Control': 'public, max-age=3600', // 1 hour
  },
});
```

### Content Updates

For frequently updated content:

```typescript
// Shorter cache for dynamic-ish content
'Cache-Control': 'public, max-age=300, stale-while-revalidate=600'
```

## Build Optimization

### Build Performance

Monitor build times:

```bash
# Time the build
time pnpm run build

# Verbose output
pnpm run build -- --verbose
```

### Reducing Build Time

1. **Optimize images** before adding to repo
2. **Minimize content collection size** if large
3. **Use efficient glob patterns** in content config

### Build Output Analysis

Check bundle sizes:

```bash
# Build and check output
pnpm run build

# Check dist/ folder size
du -sh dist/
du -sh dist/_astro/
```

## Content Performance

### Static-First Content

Methodology, spec, and kit content is rendered to static HTML at build time from content collections — no client-side data fetching or pagination. Keep readers static (`.astro`) and reserve Svelte islands for genuinely interactive UI (theme toggle, mobile menu, scroll-spy navigation).

## Monitoring

### Lighthouse Diagnostics Addressed

| Diagnostic | Mitigation |
|------------|------------|
| **Render-blocking requests** | Theme script inlined in MainLayout; CSS inlined via `build.inlineStylesheets: 'always'` |
| **Improve image delivery** | Site images ship as WebP; `<picture>`/`source type="image/webp"` where a PNG/JPG fallback is still present |
| **LCP request discovery** | Preload hero logo on homepage; `fetchpriority="high"` on above-fold images |
| **Forced reflow** | MobileMenu: scroll lock deferred with `requestAnimationFrame`; `transition:fade` instead of `transition:slide` |
| **Network dependency tree** | Typewriter replaced with CSS-only `TypewriterWords.astro` (zero JS, no critical chain) |

### Image Optimization Pipeline

Most site images are authored directly as WebP, so no generation step is required (`pnpm run images:webp` is a no-op). For source images that still need optimizing, use the Sharp-based staging optimizer — see **[Image Optimization](features/IMAGE_OPTIMIZATION.md)**.

### Lighthouse Audits

Run regular Lighthouse audits:

```bash
# Using Chrome DevTools
# 1. Open DevTools
# 2. Go to Lighthouse tab
# 3. Run audit for Performance

# Or use CLI
pnpm exec lighthouse https://deepworkplan.com --view
```

### Key Metrics to Track

1. **Lighthouse Performance Score** - Target: 100
2. **Lighthouse Accessibility Score** - Target: 100
3. **Lighthouse Best Practices Score** - Target: 100
4. **Lighthouse SEO Score** - Target: 100
5. **Time to Interactive** - Target: < 3s
6. **Total Blocking Time** - Target: < 200ms
7. **Page Weight** - Keep under 1MB total

## Performance Checklist

### Before Deployment

- [ ] Images are optimized and properly sized
- [ ] Appropriate hydration directives used
- [ ] No unnecessary JavaScript loaded
- [ ] CSS is purged in production
- [ ] Fonts use `font-display: swap`

### Regular Audits

- [ ] Run Lighthouse monthly
- [ ] Check Core Web Vitals
- [ ] Monitor page weight
- [ ] Review JavaScript bundle size

## Quick Wins

1. **Lazy load images** below the fold
2. **Use `client:visible`** instead of `client:load` where possible
3. **Preload critical fonts**
4. **Set image dimensions** to prevent CLS
5. **Minimize third-party scripts**
6. **Author images as WebP** (or run the Sharp staging optimizer) before committing

## Accessibility & Performance Overlap

Several performance optimizations also improve accessibility scores:

| Optimization | Performance Impact | Accessibility Impact |
|-------------|-------------------|---------------------|
| Image `width`/`height` attributes | Prevents CLS | Required by Lighthouse Accessibility |
| `font-display: swap` | Prevents invisible text | Ensures text is always readable |
| Skip-to-content link | — | Required for keyboard navigation |
| Semantic HTML landmarks | — | Required for screen reader navigation |
| Color contrast (WCAG AA) | — | Required for Lighthouse Accessibility 100 |

**See [Accessibility Guide](ACCESSIBILITY.md) for complete accessibility standards.**

## Resources

- [Astro Performance Documentation](https://docs.astro.build/en/concepts/why-astro/#fast-by-default)
- [web.dev Performance Guide](https://web.dev/performance/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Core Web Vitals](https://web.dev/vitals/)
