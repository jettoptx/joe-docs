# OPTX Docs

Developer documentation for the **OPTX spatial encryption platform** — built with [Fumadocs](https://fumadocs.vercel.app), Next.js 16, and a custom interactive knowledge graph (Map of Augments).

**Live site**: [optxspace.dev](https://optxspace.dev)

## Features

- **Map of Augments (MOA)** — Force-directed knowledge graph overlay that visualizes your entire doc structure as an interactive canvas. Every page is a node, colored by its classification tensor. Click any node to navigate.
- **AGT Tensor Classification** — Every page is classified by a tri-dimensional measure (COG / EMO / ENV) with percentage breakdowns. Primary tensor determines the node color in the graph and sidebar.
- **Mermaid Diagrams** — Client-rendered Mermaid charts with dark-theme styling and automatic text clipping fixes.
- **Full-text Search** — Fumadocs search with custom quick links.
- **Dark/Light Themes** — Separate logos and optimized color palettes for both modes.
- **MDX Content** — All documentation in MDX with frontmatter icons, descriptions, and metadata.

## Quick Start

```bash
git clone https://github.com/jettoptx/joe-docs.git
cd joe-docs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
optx-docs/
  app/
    layout.tsx          # Root layout — fonts, metadata, search config
    globals.css         # Theme colors, AGT tensor sidebar dots
    api/search/route.ts # Fumadocs search endpoint
    docs/
      layout.tsx        # Docs layout — header nav, sidebar, MOA toggle
      [[...slug]]/
        page.tsx        # Dynamic doc page with AGT metadata
  components/
    augment-space-overlay.tsx  # MOA canvas overlay (defaults ON)
    moa-visual.tsx             # Force-directed graph rendering
    moa-graph.tsx              # Graph data — nodes, edges, AGT tensors
    mermaid.tsx                # Client-side Mermaid diagram renderer
    nav-link.tsx               # Navigation link that closes MOA overlay
    footer.tsx                 # Site footer with changelog
  content/
    docs/                      # MDX documentation files
  lib/
    source.ts                  # Fumadocs content source config
  public/
    favicon.png                # OPTX Zia symbol favicon
    optx-logo.png              # Light theme logo
    optx-logo-dark.png         # Dark theme logo (neon glow)
  source.config.ts             # Fumadocs MDX source configuration
```

## Using as a Template

This repo works as a boilerplate for documentation sites with interactive knowledge graphs.

### 1. Replace Content

Swap the MDX files in `content/docs/` with your own documentation. Each file uses frontmatter:

```mdx
---
icon: BookOpen
title: Your Page Title
description: A short description of this page.
---

Your markdown content here.
```

### 2. Customize the Knowledge Graph

Edit `components/moa-graph.tsx` to define your own nodes and edges:

```typescript
export const moaNodes: MOANode[] = [
  {
    id: "your-page",
    label: "Your Page",
    href: "/docs/your-page",
    agt: "COG",        // COG (yellow) | EMO (red) | ENV (blue)
    cog: 60, emo: 25, env: 15,
    sublabels: ["Topic A", "Topic B"],
  },
];

export const moaEdges: MOAEdge[] = [
  { from: "your-page", to: "another-page" },
];
```

### 3. Configure Sidebar Colors

The AGT tensor colors are defined in `app/globals.css`. Each doc page gets a colored dot in the sidebar based on its classification:

```css
/* COG pages — yellow dot */
a[href="/docs/your-cog-page"] .fd-sidebar-item::before {
  background: #eab308;
}
/* EMO pages — red dot */
a[href="/docs/your-emo-page"] .fd-sidebar-item::before {
  background: #f43f5e;
}
/* ENV pages — blue dot */
a[href="/docs/your-env-page"] .fd-sidebar-item::before {
  background: #60a5fa;
}
```

### 4. Replace Logos and Favicons

Drop your logos into `public/`:
- `optx-logo.png` — Light theme header logo
- `optx-logo-dark.png` — Dark theme header logo
- `favicon.png` — Browser favicon (also copied to `app/icon.png`)

### 5. Customize Themes

The site uses the Fumadocs theme system with dark mode as default. Edit `app/layout.tsx` to change the default theme and `app/globals.css` for color overrides.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Docs Engine | [Fumadocs](https://fumadocs.vercel.app) (MDX) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Diagrams | [Mermaid](https://mermaid.js.org) (client-rendered) |
| Fonts | Orbitron, Geist Mono, Geist Sans |
| Deployment | [Vercel](https://vercel.com) |

## Map of Augments

The MOA is a force-directed graph that renders as a full-screen overlay on the docs site. It provides spatial navigation through your documentation:

- **Nodes** are colored by their primary AGT tensor (COG=yellow, EMO=red, ENV=blue)
- **Node size** scales with the primary tensor percentage
- **Edges** represent relationships between pages
- **Click** any node to navigate to that page
- **Drag** nodes to rearrange the layout
- The graph uses `requestAnimationFrame` for 60fps physics simulation

The overlay defaults to ON and closes automatically when you navigate to a doc page via the sidebar or header nav.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm start        # Start production server
```

## License

MIT

---

Built by [Jett Optical Technologies](https://jettoptics.ai)
