import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t border-fd-border bg-fd-card">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-10 gap-y-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/optx-logo.png"
                alt="OPTX"
                width={44}
                height={44}
                className="rounded-md shrink-0 dark:hidden"
                style={{ objectFit: "contain" }}
              />
              <Image
                src="/optx-logo-dark.png"
                alt="OPTX"
                width={44}
                height={44}
                className="rounded-md shrink-0 hidden dark:block"
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
                { label: "Bridge", href: "/docs/infrastructure/bridge" },
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
          <div>
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
                  label: "Hermes API",
                  href: "https://github.com/jettoptx/joe-optx-hermes-api",
                },
                {
                  label: "AARON Router",
                  href: "https://github.com/jettoptx/joe-aaron-router",
                },
                {
                  label: "CSTB DePIN",
                  href: "https://github.com/jettoptx/joe-JTX-CSTB.TRUST.DEPIN",
                },
                {
                  label: "Docs",
                  href: "https://github.com/jettoptx/joe-docs",
                },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-geist-mono)] text-sm text-fd-muted-foreground hover:text-orange-400 transition-colors whitespace-nowrap"
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
                  label: "X / Twitter",
                  href: "https://x.com/jettoptx",
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
        </div>
      </div>
    </footer>
  );
}
