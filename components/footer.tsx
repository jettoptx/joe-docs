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
                <span style={{ color: "rgb(255, 105, 0)" }}>OPTX</span>
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
                { label: "LayerZero Bridge", href: "/docs/on-chain-bridge/evm-layerzero" },
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
          <div className="pr-4">
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
                  label: "joe-optx-hermes-api",
                  href: "https://github.com/jettoptx/joe-optx-hermes-api",
                },
                {
                  label: "joe-aaron-router",
                  href: "https://github.com/jettoptx/joe-aaron-router",
                },
                {
                  label: "joe-jtx-cstb-depin",
                  href: "https://github.com/jettoptx/joe-jtx-cstb-depin",
                },
                {
                  label: "joe-docs",
                  href: "https://github.com/jettoptx/joe-docs",
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
                  label: "GitHub",
                  href: "https://github.com/jettoptx",
                  ext: true,
                },
                {
                  label: "Astro Knots",
                  href: "https://astroknots.space",
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
              Last updated: April 4, 2026 &mdash; v1.7.0
            </p>
            <details className="group">
              <summary className="font-[family-name:var(--font-geist-mono)] text-xs text-fd-muted-foreground/50 hover:text-orange-400 transition-colors cursor-pointer select-none">
                Changelog
              </summary>
              <div className="mt-3 p-4 rounded-lg bg-fd-background/50 border border-fd-border max-w-lg">
                <ul className="space-y-1.5 font-[family-name:var(--font-geist-mono)] text-xs text-fd-muted-foreground/70">
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
