# joe-docs

The official documentation engine for the **OPTX ecosystem** — built on [Next.js](https://nextjs.org) + [Fumadocs](https://fumadocs.vercel.app) with MDX content pages.

Live at **[optxspace.dev](https://optxspace.dev)**

> **[What is OPTX?](https://optxspace.dev/docs/getting-started/what-is-optx)** — Start here for the full overview of the OPTX protocol, gaze biometrics, and agentic architecture.

## Ecosystem Repos

| Repo | Type | Description |
|------|------|-------------|
| **[joe-docs](https://github.com/jettoptx/joe-docs)** | Docs Engine | Next.js 16 + Fumadocs + MDX — this repo |
| **[joe-optx-hermes-api](https://github.com/jettoptx/joe-optx-hermes-api)** | API Bridge | FastAPI bridge for Hermes Agent v0.7.0+, MPP pay-per-request |
| **[joe-jtx-cstb-depin](https://github.com/jettoptx/joe-jtx-cstb-depin)** | On-chain Program | DePIN Anchor program for $JTX/$CSTB compute-trust bonding on Solana |
| **[joe-aaron-router](https://github.com/jettoptx/joe-aaron-router)** | Edge Router | AARON gaze verification router — FastAPI, Proof-of-Insight, AGT pipeline |

### Internal Modules (documented here)

| Module | Domain | Description |
|--------|--------|-------------|
| **AARON Protocol** | Trust & PoI | Attestation layer with Proof-of-Insight consensus |
| **JOE Engine** | Core Runtime | Orchestration engine for OPTX agents |
| **HEDGEHOG** | MCP Gateway | Model Context Protocol router + gaze analytics |
| **CSTB** | DePIN / Trust | Compute-backed trust bonding for validators |
| **Hermes OPTX API** | Agent Comms | Pay-per-request agent messaging over MPP |

## Project Structure (Next.js + MDX)

joe-docs is a **Next.js App Router** project. Documentation pages are written in **MDX** (Markdown + JSX) and rendered by Fumadocs.

```
joe-docs/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout + providers
│   ├── page.tsx            # Landing page
│   ├── docs/               # /docs route group
│   │   ├── layout.tsx      # Docs layout (sidebar + TOC)
│   │   └── [[...slug]]/    # Catch-all for MDX pages
│   └── api/                # API routes (search index)
├── components/             # React components
│   ├── moa/                # Map of Augments (force-directed graph)
│   └── ui/                 # Shared UI primitives
├── content/docs/           # MDX content files ← your docs live here
│   ├── aaron/
│   ├── joe/
│   ├── hedgehog/
│   ├── cstb/
│   └── hermes/
├── lib/                    # Utilities + source config
├── public/                 # Static assets
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

## How MDX Content Works

Each doc page is an `.mdx` file under `content/docs/`. Fumadocs reads them automatically — no manual route config needed.

```mdx
---
title: Getting Started
description: Set up the Hermes OPTX API in 5 minutes
icon: Rocket
---

# Getting Started

Write **Markdown** with full JSX support...
```

Frontmatter fields: `title`, `description`, `icon` (Lucide icon name for sidebar)

## Features

- **Map of Augments (MOA)** — Force-directed knowledge graph overlay (Canvas 2D) showing relationships between docs
- **AGT Tensor Classification** — Tri-dimensional page tagging: COG (yellow) / EMO (red) / ENV (blue)
- **Full-text Search** — Instant search across all MDX pages via Fumadocs search API
- **Dark/Light Themes** — OPTX-branded color scheme with theme toggle
- **D2 Diagrams** — Architecture diagrams rendered with ELK layout + click-to-enlarge lightbox
- **Copy for Agents** — One-click page content copy for LLM/agent consumption

## Using joe-docs as a Template

Want to spin up docs for your own agent, SDK, or CLI? Follow these steps:

1. **Fork & Clone** — `git clone https://github.com/jettoptx/joe-docs.git my-docs`
2. **Replace Content** — Swap MDX files in `content/docs/` with your own
3. **Customize Graph** — Edit MOA node data in `components/moa/` to map your project's architecture
4. **Configure Sidebar** — Update `lib/source.ts` for your navigation structure
5. **Deploy to Vercel** — Push to GitHub, connect to Vercel, done. Zero config needed.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Docs Engine | Fumadocs |
| Content | MDX |
| Styling | Tailwind CSS |
| Graph | Canvas 2D (custom) |
| Hosting | Vercel |

## Scripts

```bash
pnpm install      # Install dependencies
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
```

## Agent-Ready Documentation Template

This section describes the full docs stack so an AI agent or open-source contributor can recreate the structure from scratch.

### Stack Overview

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js 14+ (App Router) | Server Components, file-based routing |
| Docs Engine | Fumadocs | MDX parsing, sidebar, TOC, full-text search |
| Content Format | MDX | Markdown + JSX, frontmatter for metadata |
| Styling | Tailwind CSS | OPTX color tokens, dark/light theme |
| Hosting | Vercel | Zero-config deploy from GitHub |

### MDX Content Structure

```
content/docs/
├── meta.json               # Sidebar order + section labels
├── index.mdx               # Docs landing page
├── aaron/
│   ├── meta.json           # aaron section order
│   ├── index.mdx
│   └── proof-of-insight.mdx
├── joe/
│   ├── meta.json
│   └── index.mdx
├── hedgehog/
│   ├── meta.json
│   └── index.mdx
├── cstb/
│   ├── meta.json
│   └── index.mdx
└── hermes/
    ├── meta.json
    └── index.mdx
```

A `meta.json` file controls sidebar order for its directory:

```json
{
  "title": "AARON Protocol",
  "pages": ["index", "proof-of-insight", "attestation", "validators"]
}
```

### AGT Tensor Classification

Every docs page can be tagged with one or more AGT dimensions. These drive the color overlay on the Map of Augments (MoaGraph) and the sidebar indicator dot.

| Dimension | Color | Meaning |
|-----------|-------|---------|
| COG | Yellow (`#F5C518`) | Cognitive / reasoning-heavy content |
| EMO | Red (`#E84545`) | User-facing flows, UX, trust signals |
| ENV | Blue (`#4A9EFF`) | Infrastructure, environment, deployment |

Add AGT tags in MDX frontmatter:

```mdx
---
title: Proof-of-Insight
description: How AARON validates gaze attestations on-chain
icon: Eye
agt: [COG, ENV]
---
```

The `agt` array is consumed by `lib/source.ts` and forwarded as page metadata to the MoaGraph renderer.

### Key Components

**MoaGraph** (`components/moa/MoaGraph.tsx`)
Force-directed Canvas 2D graph. Each node is a docs page; edges are derived from `related` frontmatter links. Node color maps to the dominant AGT dimension. Pass a `pages` prop (array of Fumadocs page objects) and the component handles layout automatically.

**AugmentSpace** (`components/moa/AugmentSpace.tsx`)
Full-viewport wrapper that mounts MoaGraph as a floating overlay above the docs layout. Toggle via keyboard shortcut `M` or the toolbar button. Z-index layer: `z-50`.

**JettCursor** (`components/ui/JettCursor.tsx`)
Custom cursor component used in gaze-calibration and spatial navigation flows. Renders a crosshair SVG that tracks `mousemove` via a `useEffect` listener and transitions smoothly with CSS `transform`. Disable on touch devices with a `window.matchMedia('(pointer: coarse)')` check.

### Creating a New Docs Page

1. Create an MDX file in the relevant `content/docs/<section>/` directory.
2. Add frontmatter with at minimum `title`, `description`, and `icon`.
3. Register the filename (without `.mdx`) in that section's `meta.json` `pages` array.
4. Optionally add `agt`, `related`, and `tags` frontmatter fields.

Full example — `content/docs/aaron/validators.mdx`:

```mdx
---
title: Validator Node Setup
description: Run an AARON validator to earn $CSTB rewards
icon: Server
agt: [COG, ENV]
related: ["proof-of-insight", "../../cstb/index"]
---

# Validator Node Setup

AARON validators attest gaze sessions and submit Proof-of-Insight proofs
to the DePIN program on Solana.

## Prerequisites

- NVIDIA Jetson edge device (or equivalent ARM64 agentic GPU)
- Tailscale mesh membership
- Minimum 10 $CSTB staked (devnet: airdrop available)

## Install

```bash
git clone https://github.com/jettoptx/joe-aaron-router.git
cd joe-aaron-router
pip install -r requirements.txt
cp .env.example .env   # fill AARON_VALIDATOR_KEY and HELIUS_RPC_URL
uvicorn main:app --host 0.0.0.0 --port 8888
```

## Verify

Call the health endpoint to confirm the node is attestation-ready:

```bash
curl http://localhost:8888/health
# {"status":"ok","validator":"active","cstb_staked":10}
```
```

## Current Version

**v1.9.0** — April 11, 2026

- **D2 Diagrams**: replaced all 12 Mermaid + 3 ASCII diagrams with D2 (ELK layout, theme 200 Dark Mauve, sketch mode) across 15 MDX pages
- **D2Diagram component**: click-to-enlarge lightbox overlay with fullscreen viewport fill (`components/d2-diagram.tsx`)
- **Content links → MOA**: internal doc links in content body open MOA overlay with target node selected; TOC anchor links still scroll normally (`components/mdx-link.tsx`)
- **Heading permalinks → MOA**: heading anchor clicks open MOA with current page's node highlighted instead of scrolling; custom `MoaHeading` overrides Fumadocs h2–h6
- **Mobile sidebar**: full-width when expanded, larger fonts (15px sections / 14px sub-pages), purple glow on active item matching desktop
- **Docs INDEX**: added "Connected" column listing all MOA graph connections per page + "Connection Density" summary table (`content/docs/reference/index.mdx`)
- **14 D2 source files** in `public/diagrams/` with pre-rendered SVGs

**v1.8.3** — April 5, 2026

- Research Labs: standalone page with JEO Research and Knight Campus CBDS profiles
- MOA Search: scored relevance ranking (key topics, connected nodes, AGT groups)
- MOA node cards: AGT weight numbers (COG/EMO/ENV) in header
- Augment Space: `#augment` and `#augment:nodeId` URL hash deep-linking
- MOA Search: click-outside-to-close, auto-expand sidebar, keyboard navigation
- Collapsed sidebar: disabled hover-to-expand effect (click buttons only)
- Circuit-style TOC: dot nodes centered on trace line with `@layer base` cascade fix
- Security: scrubbed specific edge device model references from public docs

## License

MIT — use it, fork it, ship it.

---

Built by [OPTX](https://optxspace.dev) · Powered by [Fumadocs](https://fumadocs.vercel.app)
