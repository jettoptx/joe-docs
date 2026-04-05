export interface DocsRule {
  id: string;
  title: string;
  description: string;
  files?: string[];
}

/**
 * AGENT RULES — for LLMs, AIs, and agents editing OPTX docs.
 * When adding or editing a page, agents MUST follow every rule in this list.
 * This ensures the MOA knowledge graph, AGT classification, and navigation
 * stay consistent across the entire documentation system.
 */
export const AGENT_RULES: DocsRule[] = [
  {
    id: "mdx-structure",
    title: "1. MDX Page Structure",
    description:
      "Every doc page is an .mdx file in content/docs/<section>/. Each file MUST have frontmatter with three fields: title (page name), description (one-line summary), icon (Lucide icon name for sidebar). Fumadocs auto-discovers pages from the file tree — no manual route config.",
    files: ["content/docs/"],
  },
  {
    id: "agt-classification",
    title: "2. AGT Tensor Classification",
    description:
      "Every page MUST be classified with a primary AGT tensor. COG (#eab308, yellow) = analytical, logic, architecture, protocol internals. EMO (#f43f5e, pink) = identity, personality, agent interaction, human-facing. ENV (#60a5fa, blue) = infrastructure, networks, addresses, topology. Assign emo/env/cog scores that sum to 100. The highest score determines the primary tensor.",
  },
  {
    id: "moa-node",
    title: "3. Add MOA Graph Node",
    description:
      "Add a node to NODES_DATA in components/moa-visual.tsx. Required fields: id (kebab-case unique), label (short display name), group (section key matching GROUP_LABELS), agt ('COG'|'EMO'|'ENV'), radius (11-22, larger = more important), href (doc path), description (one sentence), subLabels (3-4 keyword tags), emo/env/cog (scores summing to 100).",
    files: ["components/moa-visual.tsx"],
  },
  {
    id: "moa-edges",
    title: "4. Add MOA Graph Edges",
    description:
      "Add edges to EDGES in components/moa-visual.tsx for every meaningful cross-reference. Format: { source: 'node-id', target: 'node-id' }. This is the MOC (Map of Context) — it defines how knowledge connects. Every new page should have at least 2 edges: one to its section parent and one cross-section link.",
    files: ["components/moa-visual.tsx"],
  },
  {
    id: "mobile-sidebar",
    title: "5. Register in Mobile Sidebar",
    description:
      "Add an entry to SUB_PAGES in components/mobile-sidebar.tsx under the parent section key. Each entry needs: label (display name), href (doc path), agt ('COG'|'EMO'|'ENV'). This makes the page reachable from the mobile accordion nav.",
    files: ["components/mobile-sidebar.tsx"],
  },
  {
    id: "path-mapping",
    title: "6. Add PATH_TO_NODE Mapping",
    description:
      "Add a path-to-nodeId entry in PATH_TO_NODE in components/augment-space-btn.tsx. This maps the doc URL to the MOA graph node ID so the augment space highlights the correct node when viewing that page.",
    files: ["components/augment-space-btn.tsx"],
  },
  {
    id: "meta-json",
    title: "7. Navigation Ordering",
    description:
      "Sub-pages are auto-discovered. If adding a NEW top-level section, add its folder name to the pages array in content/docs/meta.json. Order in the array determines sidebar ordering.",
    files: ["content/docs/meta.json"],
  },
  {
    id: "style-system",
    title: "8. Style & Naming Conventions",
    description:
      "Fonts: Orbitron (--font-orbitron) for headings/labels/brand, Geist Mono (--font-geist-mono) for body/UI/code. Colors: OPTX orange rgb(255,105,0) for accents, AGT tensor colors for classification. Use Lucide icons. Keep descriptions concise — one sentence per concept.",
  },
];

/**
 * HUMAN RULES — for developers and contributors editing docs.
 * Simplified checklist for humans adding or updating content.
 */
export const HUMAN_RULES: DocsRule[] = [
  {
    id: "h-create",
    title: "1. Create Your Page",
    description:
      "Create an .mdx file in content/docs/<section>/. Add frontmatter at the top: title, description, and icon (pick a Lucide icon name). Write your content in Markdown with optional JSX components.",
  },
  {
    id: "h-classify",
    title: "2. Choose AGT Tensor",
    description:
      "Pick the dominant cognitive dimension: COG (technical/analytical — architecture, protocols, APIs), EMO (relational — identity, agents, human interaction), ENV (spatial — infrastructure, networks, topology). This colors the page across the whole system.",
  },
  {
    id: "h-register",
    title: "3. Register the Page",
    description:
      "Update 3 files after creating content: (1) moa-visual.tsx — add a graph node + edges, (2) mobile-sidebar.tsx — add to SUB_PAGES for mobile nav, (3) augment-space-btn.tsx — add to PATH_TO_NODE for augment space highlighting.",
  },
  {
    id: "h-template",
    title: "4. Use as a Template",
    description:
      "joe-docs is designed to be forked. Replace MDX files in content/docs/, customize the MOA graph nodes in components/moa-visual.tsx, update lib/source.ts for your nav structure, and deploy to Vercel. The AGT tensor system, MOA knowledge graph, and mobile sidebar all adapt automatically.",
  },
];
