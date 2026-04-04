import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/footer";

const navLinks = [
  { label: "Getting Started", href: "/docs/getting-started/what-is-optx" },
  { label: "Authentication", href: "/docs/authentication/gaze" },
  { label: "Protocol", href: "/docs/protocol" },
  { label: "Infrastructure", href: "/docs/infrastructure/edge" },
  { label: "API", href: "/docs/reference/api" },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Full-width top header bar */}
      <header className="sticky top-0 z-50 w-full border-b border-fd-border bg-fd-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between h-14 px-6">
          <Link href="/docs" className="flex items-center gap-2.5">
            <Image
              src="/optx-logo.png"
              alt="OPTX"
              width={48}
              height={48}
              className="rounded-md shrink-0 dark:hidden"
              style={{ objectFit: "contain" }}
            />
            <Image
              src="/optx-logo-dark.png"
              alt="OPTX"
              width={48}
              height={48}
              className="rounded-md shrink-0 hidden dark:block"
              style={{ objectFit: "contain" }}
            />
            <span className="font-[family-name:var(--font-orbitron)] font-bold text-lg tracking-wider">
              <span style={{ color: "rgb(255, 105, 0)" }}>OPTX</span>{" "}
              <span className="opacity-60">DOCS</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {/* AGT Tensor Legend */}
            <div className="flex items-center gap-3.5 mr-2 border-r border-fd-border pr-5">
              <Link
                href="/docs/dojo/moa"
                className="text-[11px] uppercase tracking-widest font-[family-name:var(--font-orbitron)] font-bold text-fd-muted-foreground hover:text-[#ff6900] transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,105,0,0.6)]"
              >
                AGT
              </Link>
              <Link href="/docs/authentication/gaze#agt-tensors" className="flex items-center gap-1.5 group">
                <span className="inline-block w-2.5 h-2.5 rounded-full shadow-[0_0_6px_rgba(96,165,250,0.5)]" style={{ backgroundColor: "#60a5fa" }} />
                <span className="text-[11px] font-bold font-[family-name:var(--font-geist-mono)] text-[#60a5fa] group-hover:text-[#93bbfc] transition-colors">COG</span>
              </Link>
              <Link href="/docs/authentication/gaze#agt-tensors" className="flex items-center gap-1.5 group">
                <span className="inline-block w-2.5 h-2.5 rounded-full shadow-[0_0_6px_rgba(244,63,94,0.5)]" style={{ backgroundColor: "#f43f5e" }} />
                <span className="text-[11px] font-bold font-[family-name:var(--font-geist-mono)] text-[#f43f5e] group-hover:text-[#f76d8a] transition-colors">EMO</span>
              </Link>
              <Link href="/docs/authentication/gaze#agt-tensors" className="flex items-center gap-1.5 group">
                <span className="inline-block w-2.5 h-2.5 rounded-full shadow-[0_0_6px_rgba(74,222,128,0.5)]" style={{ backgroundColor: "#4ade80" }} />
                <span className="text-[11px] font-bold font-[family-name:var(--font-geist-mono)] text-[#4ade80] group-hover:text-[#76e8a2] transition-colors">ENV</span>
              </Link>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-[family-name:var(--font-geist-mono)] text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/jettoptx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-[family-name:var(--font-geist-mono)] text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <DocsLayout
        tree={source.pageTree}
        nav={{ enabled: false }}
        sidebar={{
          defaultOpenLevel: 1,
          footer: (
            <Link
              href="/docs"
              className="augment-space-btn flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[rgb(255,105,0)] hover:bg-[rgba(255,105,0,0.1)] transition-all font-[family-name:var(--font-orbitron)] text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              Augment Space
            </Link>
          ),
        }}
      >
        {children}
      </DocsLayout>
      <SiteFooter />
    </>
  );
}
