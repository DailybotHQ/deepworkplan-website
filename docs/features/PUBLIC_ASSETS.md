# Public Assets (`public/`)

Static assets served directly without processing. Files are copied as-is to the build output.

## Directory Structure

```
public/
├── favicon.ico                        # ICO favicon fallback
├── favicon.svg                        # SVG favicon (primary)
├── favicon-16.png / -32.png / -48.png # Raster favicon sizes
├── llms.txt                           # LLM-readable site summary
├── llms-full.txt                      # LLM-readable full content
├── robots.txt                         # Search engine crawling rules
├── site.webmanifest                   # PWA manifest
├── openapi.json                       # API description for agents
├── _headers / _redirects              # Cloudflare Pages config
├── .well-known/                       # Agent/MCP discovery files
├── fonts/                             # Custom web fonts
│   ├── atkinson-bold.woff
│   └── atkinson-regular.woff
├── icons/                             # Social/UI icons + PWA icons
│   ├── {name}.svg                     # Light background variant
│   └── {name}_white.svg               # Dark background variant
└── images/                            # Site images
    ├── og-default.png                 # Default Open Graph / social card
    ├── authors/                       # Author avatars
    ├── brand/                         # Deep Work Plan logos and marks
    └── dailybot/                      # Dailybot logos
```

## Asset Categories

### Root Config Files

| File | Purpose |
|------|---------|
| `favicon.svg` | Primary site favicon (SVG) |
| `favicon.ico` | ICO fallback for older browsers |
| `robots.txt` | Search engine crawling rules |
| `llms.txt` | LLM-readable site summary |
| `llms-full.txt` | LLM-readable full content |
| `site.webmanifest` | PWA metadata and icons |
| `openapi.json` | Machine-readable API description |
| `_headers`, `_redirects` | Cloudflare Pages headers and redirects |
| `.well-known/` | Agent skills, MCP, and OAuth discovery files |

### Fonts

Custom Atkinson Hyperlegible fonts for improved readability.

| File | Weight | Usage |
|------|--------|-------|
| `atkinson-regular.woff` | 400 | Body text |
| `atkinson-bold.woff` | 700 | Headings, emphasis |

Preloaded in `BaseHead.astro`:

```html
<link rel="preload" href="/fonts/atkinson-regular.woff" as="font" type="font/woff" crossorigin />
<link rel="preload" href="/fonts/atkinson-bold.woff" as="font" type="font/woff" crossorigin />
```

### Icons

Social media and UI icons with light/dark paired variants, plus PWA icons.

**Naming Convention:** `{name}.svg` (dark icon, light backgrounds) + `{name}_white.svg` (light icon, dark backgrounds)

| Icon Set | Light | Dark |
|----------|-------|------|
| GitHub | `github.svg` | `github_white.svg` |
| LinkedIn | `linkedin.svg` | `linkedin_white.svg` |
| Instagram | `instagram.svg` | `instagram_white.svg` |
| X (Twitter) | `x.svg` | `x_white.svg` |

PWA icons (`icon-192x192.png`, `icon-512x512.png`, `apple-touch-icon.png`) are referenced from `site.webmanifest` and `BaseHead.astro`.

**Usage:**

```html
<img src="/icons/github_white.svg" alt="GitHub" class="w-7 h-7" />
```

### Images

| Image | Purpose | Referenced By |
|-------|---------|---------------|
| `og-default.png` | Default Open Graph / social card image | BaseHead (default) |
| `brand/dwp-logo-{light,dark}.png` | Deep Work Plan logo | Header, Footer |
| `brand/dwp-mark-{light,dark}.png` | Brand mark | Components |
| `dailybot/logo-horizontal-{black,white}.svg` | Dailybot logo | About / Contact |
| `authors/{slug}.webp` | Author avatars | About page |

See **[Brand Guide](../BRAND_GUIDE.md)** for logo usage rules and color pairing guidelines.

### Image Optimization

New raster images should be optimized before committing. See **[Image Optimization](./IMAGE_OPTIMIZATION.md)** for the staging workflow, bulk optimizer, and quality settings.

| Category | Max Width | Max File Size | Format |
|----------|----------:|-------------:|--------|
| Content images | 1400px | 300 KB | WebP preferred |
| Logos / marks | N/A | 100 KB | SVG / PNG |
| Icons | N/A | 5 KB each | SVG |

### Theme Script

The theme script is inlined in `MainLayout.astro` to prevent a flash of the wrong theme — checks `localStorage`, then system `prefers-color-scheme`, then applies the `dark` class to `<html>`:

```html
<script is:inline>(function(){var t=localStorage.getItem('theme');if(!t)t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';if(t==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');})();</script>
```

## Adding New Assets

### Adding a Site Image

1. Optimize before adding (convert to WebP, resize sensibly)
2. Place in the relevant subfolder of `public/images/`
3. Reference in component: `<img src="/images/brand/dwp-logo-light.png" alt="Description" width="..." height="..." />`

### Adding an Icon

1. Create both variants: `{name}.svg` and `{name}_white.svg`
2. Place in `public/icons/`
3. Use: `<img src="/icons/{name}_white.svg" alt="Icon" class="w-6 h-6" />`

### Adding a Font

1. Place `.woff` file in `public/fonts/`
2. Add preload link in `BaseHead.astro`
3. Add `@font-face` rule in CSS

## Maintenance

### Periodic Audit Checklist

- Check for orphaned images (files not referenced in any source code)
- Check for duplicates (files with identical SHA-256 hashes)
- Check for oversized images
- Remove `.DS_Store` files (covered by `.gitignore`)

### URL Mapping

Files in `public/` are served from the site root:

| File Location | URL |
|---------------|-----|
| `public/favicon.svg` | `/favicon.svg` |
| `public/images/og-default.png` | `/images/og-default.png` |
| `public/images/brand/dwp-logo-light.png` | `/images/brand/dwp-logo-light.png` |

## Related Documentation

- **[Image Optimization](./IMAGE_OPTIMIZATION.md)** - Staging workflow, bulk optimizer, quality settings
- **[Brand Guide](../BRAND_GUIDE.md)** - Logo usage rules and color pairing
- **[Performance Guide](../PERFORMANCE.md)** - Site performance best practices
