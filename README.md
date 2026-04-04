# joe-docs

The official documentation engine for the **OPTX ecosystem** — built on [Next.js](https://nextjs.org) + [Fumadocs](https://fumadocs.vercel.app) with MDX content pages.

Live at **[optxspace.dev](https://optxspace.dev)**

## Ecosystem Repos

| Repo | Type | Description |
|------|------|-------------|
| **[joe-docs](https://github.com/jettoptx/joe-docs)** | Docs Engine | Next.js 16 + Fumadocs + MDX — this repo |
| **[joe-optx-hermes-api](https://github.com/jettoptx/joe-optx-hermes-api)** | API Bridge | FastAPI bridge for Hermes Agent v0.7.0+, MPP pay-per-request |

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
- **Mermaid Diagrams** — Inline diagram support in MDX
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

## License

MIT — use it, fork it, ship it.

---

Built by [OPTX](https://optxspace.dev) · Powered by [Fumadocs](https://fumadocs.vercel.app)
