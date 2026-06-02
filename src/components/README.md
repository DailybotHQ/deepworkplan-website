# Components (`src/components/`)

This directory contains all reusable UI components for the Deep Work Plan website. Components are organized by feature area and use both Astro (`.astro`) and Svelte (`.svelte`) formats.

## Directory Structure

```
components/
├── pages/              # Shared page components (Page wrapper pattern)
│   ├── HomePage.astro      # Handles MainLayout internally, receives lang prop
│   ├── AboutPage.astro
│   ├── ContactPage.astro
│   ├── MethodologyPage.astro / MethodologyReader.astro
│   ├── SpecPage.astro / SpecReader.astro
│   ├── KitPage.astro / KitReader.astro
│   ├── ExamplesPage.astro
│   ├── QuickstartPage.astro
│   ├── InitPage.astro
│   └── NotFoundPage.astro
├── home/               # Homepage section components
│   ├── Hero.astro
│   ├── Pitch.astro
│   ├── Quickstart.astro
│   ├── Outcomes.astro
│   ├── Archetypes.astro
│   ├── Comparison.astro
│   ├── Onboarding.astro
│   └── ...
├── editorial/          # Editorial design-system primitives
├── contact/            # ContactForm.svelte
├── layout/             # Layout components
│   ├── Header.svelte
│   └── MobileMenu.svelte
├── BaseHead.astro      # HTML head metadata
├── Footer.astro        # Site footer
├── FormattedDate.astro # Date formatting utility
├── HeaderLink.astro    # Navigation link
├── JsonLd.astro        # Structured data
└── ThemeToggle.astro   # Dark mode toggle
```

## Component Catalog

### Page Components (Page Wrapper Pattern)

Shared page components in `pages/` handle `MainLayout`, translations, and content internally. Page files in `src/pages/` are thin 3-line wrappers that only pass `lang`.

| Component | Type | Description |
|-----------|------|-------------|
| `pages/HomePage.astro` | Astro | Homepage with all sections |
| `pages/AboutPage.astro` | Astro | About page |
| `pages/ContactPage.astro` | Astro | Contact page |
| `pages/MethodologyPage.astro` | Astro | Methodology reader (uses `MethodologyReader.astro`) |
| `pages/SpecPage.astro` | Astro | Specification reader (uses `SpecReader.astro`) |
| `pages/KitPage.astro` | Astro | Kit catalog (uses `KitReader.astro`) |
| `pages/InitPage.astro` | Astro | Canonical `/init` adoption endpoint |

**Key:** Each `*Page.astro` component accepts a `lang: Language` prop and wraps content in `MainLayout` internally.

### Root Components

| Component | Type | Description |
|-----------|------|-------------|
| `BaseHead.astro` | Astro | HTML head with meta tags, fonts, SEO |
| `Footer.astro` | Astro | Site footer with social links |
| `FormattedDate.astro` | Astro | Formats dates consistently |
| `HeaderLink.astro` | Astro | Navigation link with active state |
| `JsonLd.astro` | Astro | Structured-data (JSON-LD) injection |
| `ThemeToggle.astro` | Astro | Dark/light mode toggle button |

### Home Components

Section components composing the homepage. Each is a self-contained `.astro` section consumed by `pages/HomePage.astro`.

| Component | Type | Description |
|-----------|------|-------------|
| `Hero.astro` | Astro | Homepage hero |
| `Pitch.astro` | Astro | Positioning pitch (SDD + harness) |
| `Quickstart.astro` | Astro | Quickstart steps preview |
| `Outcomes.astro` | Astro | Outcomes / benefits |
| `Archetypes.astro` | Astro | Plan archetypes overview |
| `Comparison.astro` | Astro | Comparison with tool-bound SDD |
| `Onboarding.astro` | Astro | Agent onboarding overview |
| `Stacks.astro` | Astro | Supported stacks/adapters |

### Layout Components

| Component | Type | Description |
|-----------|------|-------------|
| `Header.svelte` | Svelte | Main navigation header |
| `MobileMenu.svelte` | Svelte | Mobile navigation menu |

## Astro vs Svelte Guidelines

### Use Astro (`.astro`) When:

- Content is static and doesn't need client-side JavaScript
- Component is server-rendered only
- SEO is critical (meta tags, structured content)
- No user interactions needed
- Component wraps other components (layouts)

**Examples:** `BaseHead.astro`, `Footer.astro`, `home/Hero.astro`

### Use Svelte (`.svelte`) When:

- Component needs interactivity (click handlers, state)
- Client-side state management is required
- Animations or transitions are needed
- Real-time updates are necessary
- Complex event handling

**Examples:** `Header.svelte` (mobile menu toggle), `contact/ContactForm.svelte` (form state)

## Component Props Pattern

### Astro Components

```astro
---
// Define props interface
interface Props {
  title: string;
  description?: string;
}

// Destructure with defaults
const { title, description = 'Default description' } = Astro.props;
---

<div>{title}</div>
```

### Svelte Components

```svelte
<script lang="ts">
  // Export props
  export let title: string;
  export let description: string = 'Default description';
</script>

<div>{title}</div>
```

## Usage Examples

### Using an Astro Component

```astro
---
import BaseHead from '../components/BaseHead.astro';
---

<head>
  <BaseHead title="Page Title" description="Page description" />
</head>
```

### Using a Svelte Component

```astro
---
import Header from '../components/layout/Header.svelte';
---

<Header client:load lang="en" />
```

**Note:** Svelte components need a `client:*` directive to hydrate:
- `client:load` - Load immediately
- `client:idle` - Load when browser is idle
- `client:visible` - Load when visible in viewport

## Creating a New Component

1. **Choose the right type** (Astro vs Svelte)
2. **Choose the right folder** (home/, editorial/, layout/, pages/, or root)
3. **Follow naming conventions** (PascalCase)
4. **Add TypeScript types** for props
5. **Use Tailwind** for styling
6. **Document complex props** with comments

```bash
# Example: Creating a new Astro component
touch src/components/NewComponent.astro

# Example: Creating a new Svelte component in layout/
touch src/components/layout/NewLayoutComponent.svelte
```

## Related Documentation

- [Layout Components](./layout/README.md)
- [Styling Guide](../styles/README.md)
- [Architecture Guide](../../docs/ARCHITECTURE.md)
- [Standards](../../docs/STANDARDS.md)
