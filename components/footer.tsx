import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t border-fd-border bg-fd-card">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-x-6 gap-y-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/techforce_OPTX.png"
                alt="OPTX"
                width={44}
                height={44}
                className="rounded-md shrink-0"
                style={{ objectFit: "contain" }}
              />
              <span className="font-[family-name:var(--font-orbitron)] font-bold text-lg tracking-wider">
                <span style={{ color: "var(--color-orange-500)" }}>OPTX</span>
              </span>
            </div>
            <p className="font-[family-name:var(--font-geist-mono)] text-sm text-fd-muted-foreground leading-relaxed max-w-xs mb-4">
              Privacy-preserving spatial encryption for the agentic web. Gaze
              biometrics, DePIN attestation, and cross-chain bridging on Solana.
            </p>
            <p className="font-[family-name:var(--font-geist-mono)] text-xs text-fd-muted-foreground/50">
              MIT Licensed &mdash; &copy; 2026 Jett Optics
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://x.com/jettoptx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fd-muted-foreground hover:text-orange-400 transition-colors"
                aria-label="X / Twitter"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com/jettoptx/optx-hermes-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fd-muted-foreground hover:text-orange-400 transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-semibold tracking-widest uppercase text-fd-foreground mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Protocol", href: "/docs/protocol" },
                { label: "API Reference", href: "/docs/reference/api" },
                { label: "Gaze Guide", href: "/docs/authentication/gaze" },
                { label: "JettChat", href: "/docs/jettchat" },
                { label: "JETT Auth", href: "/docs/authentication/jett-auth" },
                { label: "Token / JTX", href: "/docs/token" },
                { label: "DePIN", href: "/docs/infrastructure/depin" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-geist-mono)] text-sm text-fd-muted-foreground hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Infrastructure Column */}
          <div className="pr-8">
            <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-semibold tracking-widest uppercase text-fd-foreground mb-4">
              Infrastructure
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Edge MCP", href: "/docs/infrastructure/edge" },
                { label: "Agent Wallet", href: "/docs/authentication/wallet" },
                { label: "AARON", href: "/docs/protocol" },
                {
                  label: "Architecture",
                  href: "/docs/getting-started/architecture",
                },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-geist-mono)] text-sm text-fd-muted-foreground hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Repos Column */}
          <div>
            <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-semibold tracking-widest uppercase text-fd-foreground mb-4">
              Repos
            </h3>
            <ul className="space-y-2.5">
              {[
                {
                  label: "jettoptx-aaron-router",
                  href: "https://github.com/jettoptx/jettoptx-aaron-router",
                },
                {
                  label: "jettoptx-cstb-depin",
                  href: "https://github.com/jettoptx/jettoptx-cstb-depin",
                },
                {
                  label: "jettoptx-docs",
                  href: "https://github.com/jettoptx/jettoptx-docs",
                },
                {
                  label: "hermes-xai-oauth-wsl",
                  href: "https://github.com/jettoptx/hermes-xai-oauth-wsl",
                },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-geist-mono)] text-xs text-fd-muted-foreground hover:text-orange-400 transition-colors break-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Foundation Column */}
          <div>
            <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-semibold tracking-widest uppercase text-fd-foreground mb-4">
              Foundation
            </h3>
            <ul className="space-y-2.5">
              {[
                {
                  label: "Jett Optics",
                  href: "https://jettoptics.ai",
                  ext: true,
                },
                {
                  label: "Astro Knots",
                  href: "https://astroknots.space",
                  ext: true,
                },
                {
                  label: "GitHub",
                  href: "https://github.com/jettoptx",
                  ext: true,
                },
                {
                  label: "@jettopt\u{1D54F}",
                  href: "https://x.com/jettoptx",
                  ext: true,
                },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.ext ? "_blank" : undefined}
                    rel={link.ext ? "noopener noreferrer" : undefined}
                    className="font-[family-name:var(--font-geist-mono)] text-sm text-fd-muted-foreground hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-semibold tracking-widest uppercase text-fd-foreground mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {[
                {
                  label: "Privacy Policy",
                  href: "/privacy",
                  ext: false,
                },
                {
                  label: "Devnet Validation",
                  href: "/docs/devnet-validation",
                  ext: false,
                },
                {
                  label: "USPTO Patent",
                  href: "https://patents.google.com/patent/US20250392457A1",
                  ext: true,
                },
                {
                  label: "Research Labs",
                  href: "/research-labs",
                  ext: false,
                },
              ].map((link) => (
                <li key={link.label}>
                  {link.ext ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-[family-name:var(--font-geist-mono)] text-sm text-fd-muted-foreground hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-[family-name:var(--font-geist-mono)] text-sm text-fd-muted-foreground hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Changelog / Last Updated */}
        <div className="mt-10 pt-6 border-t border-fd-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="font-[family-name:var(--font-geist-mono)] text-xs text-fd-muted-foreground/50">
              Last updated: May 17, 2026 &mdash; v2.0.2
            </p>
            <details className="group">
              <summary className="font-[family-name:var(--font-geist-mono)] text-xs text-fd-muted-foreground/50 hover:text-orange-400 transition-colors cursor-pointer select-none">
                Changelog
              </summary>
              <div className="mt-3 p-4 rounded-lg bg-fd-background/50 border border-fd-border max-w-lg">
                <ul className="space-y-1.5 font-[family-name:var(--font-geist-mono)] text-xs text-fd-muted-foreground/70">
                  <li><span className="text-orange-400">v2.0.2</span> &mdash; May 17, 2026
                    <ul className="ml-3 mt-1 space-y-1">
                      <li>&#x2022; Sidebar icons: <code>MessageCircle</code> (JettChat) and <code>Coins</code> (Token) were configured in <code>meta.json</code> but never imported in <code>lib/source.ts</code>; resolver silently returned undefined. Both added to the lucide-react imports and icon map.</li>
                      <li>&#x2022; Light-mode burnt orange: refactored 22 hardcoded <code>rgb(255, 105, 0)</code> usages to <code>var(--color-orange-500)</code>. Added <code>:root:not(.dark)</code> override to <code>rgb(220, 78, 31)</code> brick &mdash; section headers, sidebar accents, header OPTX wordmark, footer OPTX wordmark, DOCS RULES panel, body links, and AGENTS banner now cascade through the var.</li>
                      <li>&#x2022; Dark mode keeps the neon <code>#FF6900</code> via the <code>:root</code> default; <code>--color-orange-400</code> also overridden in light mode to <code>rgb(232, 105, 60)</code> for matching link-hover states.</li>
                      <li>&#x2022; Ecosystem repo links updated to <code>jettoptx-*</code> canonical names (org rename from <code>joe-*</code> completed; GitHub still redirects the old slugs but new links skip the hop).</li>
                      <li>&#x2022; IP scrub for public release: renamed <code>knot_polynomial</code> &rarr; <code>astro_knot</code> and <code>polynomial_encoding</code> &rarr; <code>astro_encoding</code> across <code>/docs/protocol/*</code> (struct fields, TS interfaces, reducer args) and reworded the ecosystem table row for the astroknots repo. Math-revealing vocabulary (Jones/Alexander/braid/knot-theoretic) no longer appears in any public-facing doc.</li>
                      <li>&#x2022; Ecosystem swap: <code>jettoptx-hermes-api</code> (degraded) replaced by <code>hermes-xai-oauth-wsl</code> in the footer REPOS column and README ecosystem table.</li>
                      <li>&#x2022; New "Open Source" callout at the bottom of the <code>/docs</code> landing page promoting <code>jettoptx-aaron-router</code> as the public flagship (FastAPI &middot; Proof-of-Insight &middot; AGT pipeline &middot; Solana DePIN attestation).</li>
                      <li>&#x2022; Footer REPOS column reordered &mdash; <code>hermes-xai-oauth-wsl</code> moved to the bottom; jettoptx-* repos lead the list.</li>
                      <li>&#x2022; <strong>Security scrub:</strong> deleted <code>/docs/astrojoe/matrix</code> page and removed every inbound reference across 4 content pages and 5 components (MOA graph node, sidebar entry, link maps). Wiped all operational Matrix disclosures from <code>topology.mdx</code> + <code>reference/changelog.mdx</code> &mdash; bot MXID, homeserver impl + version (Conduit v0.10.12), public hostname (<code>matrix.jettoptics.ai</code>), library (<code>matrix-nio</code>), <code>/sync</code> long-poll mechanism, the dual-edge topology, the <code>MATRIX_PASSWORD</code> / <code>MATRIX_ENCRYPTION</code> env model, and the auth allowlist + mention-filter pattern. Generic "federation transport" terminology kept.</li>
                      <li>&#x2022; New video embed on <code>/docs/authentication/gaze</code> &mdash; AGT Intro Learner mp4 self-hosted under <code>/videos/</code>, HTML5 native controls, no autoplay.</li>
                      <li>&#x2022; <strong>Standing rule added at <a href="/docs/rules" className="underline">/docs/rules</a>:</strong> the changelog (both footer block and <code>reference/changelog.mdx</code>) MUST be updated in the same session as any shipped change. Applies to LLMs, VLMs, and human contributors. Also fixed stale "Last updated: April 30, 2026 &mdash; v2.0.0" footer line.</li>
                    </ul>
                  </li>
                  <li><span className="text-orange-400">v2.0.1</span> &mdash; May 14, 2026
                    <ul className="ml-3 mt-1 space-y-1">
                      <li>&#x2022; Typography: doc headers (h1&ndash;h4) now use <strong>Space Grotesk</strong> via next/font/google; sidebar, brand wordmark, and AGT badges stay Orbitron; body stays Geist Mono</li>
                      <li>&#x2022; Heading colors: neutral white in dark / near-black in light, with OPTX orange on hover</li>
                      <li>&#x2022; Headings are no longer links: removed the anchor wrapper, click handler, permalink chain icon, scroll-to-self behavior, and cursor:pointer. Plain text with hover-orange visual cue only</li>
                      <li>&#x2022; Body links: dropped the underline-on-hover and the globe icon next to internal /docs links (e.g. next to &ldquo;Token&rdquo; and &ldquo;JettChat&rdquo; references). Hover now shifts to lighter orange instead</li>
                      <li>&#x2022; TOC: orange clip-path elbow indicator slides between active sections (Fumadocs default) plus a static dot at the active link, sitting on a gray trace line</li>
                      <li>&#x2022; MOA: clicking a sidebar link no longer auto-pans the camera (mobile-friendly)</li>
                      <li>&#x2022; MOA selected-node glow: OPTX orange instead of yellow (canvas + side panel card)</li>
                      <li>&#x2022; Sidebar: fixed corrupted em-dash in &ldquo;JOE &mdash; Jett Optics Engine&rdquo; group title (was rendering as a U+FFFD diamond)</li>
                      <li>&#x2022; Removed Copy for Agents button (desktop TOC footer + mobile FAB) and deleted the three unused component files</li>
                      <li>&#x2022; Build: hoisted D2Diagram MDX import in astrojoe/index above prose so Vercel prerender succeeds</li>
                    </ul>
                  </li>
                  <li><span className="text-orange-400">v2.0.0</span> &mdash; April 30, 2026
                    <ul className="ml-3 mt-1 space-y-1">
                      <li>&#x2022; Dual-mode JettChat: new <code>/docs/jettchat</code> section covering xChat Native (X OAuth) and Phantom Mode (Tor + post-quantum, in Secure-Legion/android)</li>
                      <li>&#x2022; New <code>/docs/token</code> section: canonical 3-tier model mirroring astroknots.space/stake (MOJO 12 JTX/$8.88mo, DOJO 444 JTX/$28.88mo, SPACE COWBOY 1,111 JTX/$88.88mo)</li>
                      <li>&#x2022; New <code>/docs/authentication/jett-auth</code> unified auth surface page</li>
                      <li>&#x2022; New <code>/docs/reference/ecosystem</code> outlining all jettoptx + Secure-Legion repos</li>
                      <li>&#x2022; Pricing fixes: DOJO is $28.88/mo (not 6 months); top tier renamed UNLIMITED → SPACE COWBOY</li>
                      <li>&#x2022; Solana-only stance: on-chain-bridge EVM/XRPL pages retired</li>
                      <li>&#x2022; ERC-8004 Agent Wallet labeled Roadmap; Matrix federation demoted to optional transport</li>
                      <li>&#x2022; Hermes Agent aligned to v0.12.0 ("The Curator release", NousResearch tag <code>2026.4.30</code>) &mdash; autonomous skill curator, +4 providers, Teams + Yuanbao platforms, ComfyUI + TouchDesigner-MCP bundled, ~57% TUI cold-start cut</li>
                      <li>&#x2022; Domain corrected to jettoptx.dev (was optxspace.dev)</li>
                      <li>&#x2022; Coordinated 6 cross-org README PRs (jettauth-optx, aaron-router, jettchat-sdk, jettchat-app, joe-core, jtx-cstb-depin)</li>
                    </ul>
                  </li>
                  <li><span className="text-orange-400">v1.9.0</span> &mdash; April 11, 2026
                    <ul className="ml-3 mt-1 space-y-1">
                      <li>&#x2022; D2 Diagrams: replaced 12 Mermaid + 3 ASCII diagrams with D2 (ELK layout, Dark Mauve theme, sketch mode) across 15 MDX pages</li>
                      <li>&#x2022; D2Diagram component: click-to-enlarge lightbox overlay with fullscreen viewport</li>
                      <li>&#x2022; Content links → MOA: internal doc links open MOA overlay with target node selected</li>
                      <li>&#x2022; Heading permalinks → MOA: heading anchors open MOA with current page node highlighted</li>
                      <li>&#x2022; Mobile sidebar: full-width when expanded, larger fonts (15px / 14px), purple glow on active item</li>
                      <li>&#x2022; Docs INDEX: added "Connected" column listing all MOA graph connections + density summary</li>
                    </ul>
                  </li>
                  <li><span className="text-orange-400">v1.8.3</span> &mdash; April 5, 2026
                    <ul className="ml-3 mt-1 space-y-1">
                      <li>&#x2022; Research Labs: standalone page with JEO Research partner profile</li>
                      <li>&#x2022; MOA Search: scored relevance ranking (key topics, connected nodes, AGT groups)</li>
                      <li>&#x2022; MOA node cards: AGT weight numbers (COG/EMO/ENV) in header</li>
                      <li>&#x2022; Security: scrubbed specific edge device model references from public docs</li>
                    </ul>
                  </li>
                  <li><span className="text-orange-400">v1.8.2</span> &mdash; April 5, 2026
                    <ul className="ml-3 mt-1 space-y-1">
                      <li>&#x2022; MOA Search: node selection stays in visual graph, click-outside-to-close, auto-expand sidebar</li>
                      <li>&#x2022; MOA Search: /substrings hint in placeholder and footer with orange glow hover</li>
                      <li>&#x2022; Augment Space: #augment URL hash opens MOA overlay on page load</li>
                      <li>&#x2022; Collapsed sidebar: disabled hover-to-expand (click buttons only)</li>
                      <li>&#x2022; Circuit TOC: dot nodes centered on trace line, bigger dots, @layer base cascade fix</li>
                    </ul>
                  </li>
                  <li><span className="text-orange-400">v1.8.1</span> &mdash; April 5, 2026
                    <ul className="ml-3 mt-1 space-y-1">
                      <li>&#x2022; Collapsed sidebar: fixed Tailwind v4 cascade layer opacity override via CSS animation</li>
                      <li>&#x2022; AGT header link: scroll offset fix (80px from top)</li>
                      <li>&#x2022; Jett Cursor docs: accurate simplex widget description with barycentric coordinates</li>
                      <li>&#x2022; MOA Search: node selection closes augment overlay, orange hover on footer hints</li>
                    </ul>
                  </li>
                  <li><span className="text-orange-400">v1.8.0</span> &mdash; April 5, 2026
                    <ul className="ml-3 mt-1 space-y-1">
                      <li>&#x2022; JETT Cursor: AGT simplex widget showing cursor position by COG/EMO/ENV weights, color-matched to dominant tensor</li>
                      <li>&#x2022; MOA Search: floating graph-specific search with keyboard nav, hidden on mobile</li>
                      <li>&#x2022; Knowledge Map: /cog /emo /env slash filter commands replace text search</li>
                      <li>&#x2022; AGT header link: smart scroll-to-graph when on MOA page, navigate otherwise</li>
                      <li>&#x2022; TOC scroll-spy: visible at md+ breakpoint (768px), hidden on mobile</li>
                      <li>&#x2022; TOC popover: hidden on desktop where sidebar TOC is visible</li>
                      <li>&#x2022; Collapsed sidebar: compact floating panel with expand/search buttons</li>
                      <li>&#x2022; MOA flashlight: tuned spotlight radius, AGT tri-color sectors, glow gradient</li>
                      <li>&#x2022; Selected node: purple glow on card + sidebar link highlight</li>
                      <li>&#x2022; AGT naming: Adaptive v1 → Agentive v2 → Augmentive v3 (SDK for agentic Map of Context)</li>
                    </ul>
                  </li>
                  <li><span className="text-orange-400">v1.7.0</span> &mdash; April 4, 2026
                    <ul className="ml-3 mt-1 space-y-1">
                      <li>&#x2022; Mobile sidebar: Augment Space toggle + theme switch in sidebar footer, pixelation dissolve on footer scroll</li>
                      <li>&#x2022; AGT TOC dots: per-page AGT tensor color on mobile TOC headings (COG/EMO/ENV)</li>
                      <li>&#x2022; Mobile header: AGT tensor pills (COG/EMO/ENV) in top-right, MOA legend bar hidden on mobile</li>
                      <li>&#x2022; Footer: full-screen height on mobile, techforce OPTX logo, sidebar auto-hides</li>
                      <li>&#x2022; Hydration fix: useTheme SSR guard for theme toggle</li>
                    </ul>
                  </li>
                  <li><span className="text-orange-400">v1.6.0</span> &mdash; April 4, 2026
                    <ul className="ml-3 mt-1 space-y-1">
                      <li>&#x2022; Copy for Agents: one-click clipboard copy button in TOC sidebar footer for LLM/agent page content extraction</li>
                      <li>&#x2022; Polished README: ecosystem repos table, Next.js project structure guide, MDX content docs, 5-step template fork guide</li>
                      <li>&#x2022; Mobile sidebar: slim 52px collapsible icon-rail for mobile viewports (9 section icons, expands to 200px with labels)</li>
                      <li>&#x2022; Build fixes: repaired corrupted JSX closing tags in page.tsx and copy-for-agents.tsx</li>
                    </ul>
                  </li>
                  <li><span className="text-orange-400">v1.5.0</span> &mdash; Final DevSecOps audit, IP review, AGT reclassification, MOA augment overlay, favicon + logo update</li>
                  <li><span className="text-orange-400">v1.4.0</span> &mdash; On-Chain Bridge section, Mermaid diagrams + legends, DevSecOps audit</li>
                  <li><span className="text-orange-400">v1.3.0</span> &mdash; Architecture Flows: task lifecycle, state machine, swarm DAG, gaze-gated policy</li>
                  <li><span className="text-orange-400">v1.2.0</span> &mdash; Full-screen MOA canvas with zoom/pan, glass sidebar, AGT dot colors</li>
                  <li><span className="text-orange-400">v1.1.0</span> &mdash; AstroJOE agent docs, HEDGEHOG gateway, Hermes OPTX API reference</li>
                  <li><span className="text-orange-400">v1.0.0</span> &mdash; Initial launch: AARON protocol, gaze auth, DePIN, infrastructure, DOJO</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </footer>
  );
}
