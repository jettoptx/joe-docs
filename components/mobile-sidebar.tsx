"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Atom,
  Rocket,
  Lock,
  Cpu,
  BrainCircuit,
  Workflow,
  Share2,
  Server,
  Code,
  ChevronRight,
  X,
  Sun,
  Moon,
  BookOpen,
} from "lucide-react";

/* ── AGT color system ── */
const AGT_COLORS = { COG: "#eab308", EMO: "#f43f5e", ENV: "#60a5fa" } as const;
type AGT = keyof typeof AGT_COLORS;

/* ── Sub-page definitions per section ── */
interface SubPage { label: string; href: string; agt: AGT }

const SUB_PAGES: Record<string, SubPage[]> = {
  "/docs/dojo": [
    { label: "DOJO Overview", href: "/docs/dojo", agt: "ENV" },
    { label: "Map of Augments", href: "/docs/dojo/moa", agt: "COG" },
    { label: "MOJO", href: "/docs/dojo/mojo", agt: "EMO" },
  ],
  "/docs/getting-started/what-is-optx": [
    { label: "What is OPTX?", href: "/docs/getting-started/what-is-optx", agt: "COG" },
    { label: "System Architecture", href: "/docs/getting-started/architecture", agt: "COG" },
    { label: "On-Chain Addresses", href: "/docs/getting-started/on-chain-addresses", agt: "ENV" },
  ],
  "/docs/authentication/gaze": [
    { label: "Gaze Verification", href: "/docs/authentication/gaze", agt: "EMO" },
    { label: "Agent Wallet", href: "/docs/authentication/wallet", agt: "EMO" },
  ],
  "/docs/protocol": [
    { label: "Protocol Overview", href: "/docs/protocol", agt: "COG" },
    { label: "How It Works", href: "/docs/protocol/how-it-works", agt: "COG" },
    { label: "Biometric Proof", href: "/docs/protocol/biometric-proof", agt: "EMO" },
    { label: "Client Integration", href: "/docs/protocol/client-integration", agt: "COG" },
    { label: "Architecture", href: "/docs/protocol/architecture", agt: "COG" },
  ],
  "/docs/astrojoe": [
    { label: "JOE Overview", href: "/docs/astrojoe", agt: "EMO" },
    { label: "Hermes OPTX API", href: "/docs/astrojoe/api", agt: "COG" },
    { label: "HEDGEHOG Gateway", href: "/docs/astrojoe/hedgehog", agt: "ENV" },
    { label: "Memory System", href: "/docs/astrojoe/memory", agt: "COG" },
    { label: "Task Orchestration", href: "/docs/astrojoe/orchestration", agt: "COG" },
    { label: "Skills System", href: "/docs/astrojoe/skills", agt: "COG" },
  ],
  "/docs/architecture": [
    { label: "Architecture Flows", href: "/docs/architecture", agt: "COG" },
    { label: "Agent Identity", href: "/docs/architecture/agent-identity", agt: "EMO" },
    { label: "Cross-Chain Bridge", href: "/docs/architecture/bridge-flow", agt: "EMO" },
    { label: "Gaze-Gated Policy", href: "/docs/architecture/gaze-policy", agt: "EMO" },
    { label: "Swarm DAG", href: "/docs/architecture/swarm-dag", agt: "COG" },
    { label: "Task Lifecycle", href: "/docs/architecture/task-lifecycle", agt: "COG" },
    { label: "Task State Machine", href: "/docs/architecture/task-states", agt: "COG" },
    { label: "Topology", href: "/docs/architecture/topology", agt: "ENV" },
  ],
  "/docs/on-chain-bridge": [
    { label: "Bridge Hub", href: "/docs/on-chain-bridge", agt: "EMO" },
    { label: "Solana Native", href: "/docs/on-chain-bridge/solana-native", agt: "EMO" },
    { label: "EVM via LayerZero", href: "/docs/on-chain-bridge/evm-layerzero", agt: "EMO" },
    { label: "XRPL via Wormhole", href: "/docs/on-chain-bridge/xrpl-wormhole", agt: "EMO" },
  ],
  "/docs/infrastructure/edge": [
    { label: "Edge MCP Overview", href: "/docs/infrastructure/edge", agt: "ENV" },
    { label: "CSTB Trust DePIN", href: "/docs/infrastructure/depin", agt: "ENV" },
  ],
  "/docs/reference/api": [
    { label: "API Reference", href: "/docs/reference/api", agt: "COG" },
    { label: "Documentation Index", href: "/docs/reference", agt: "COG" },
  ],
};

/* ── Section definitions ── */
interface NavSection {
  label: string;
  href: string;
  icon: React.ElementType;
}

const NAV_SECTIONS: NavSection[] = [
  { label: "Jett Optics", href: "/docs/dojo", icon: Atom },
  { label: "Getting Started", href: "/docs/getting-started/what-is-optx", icon: Rocket },
  { label: "Authentication", href: "/docs/authentication/gaze", icon: Lock },
  { label: "AARON Protocol", href: "/docs/protocol", icon: Cpu },
  { label: "JOE Engine", href: "/docs/astrojoe", icon: BrainCircuit },
  { label: "Architecture", href: "/docs/architecture", icon: Workflow },
  { label: "On-Chain Bridge", href: "/docs/on-chain-bridge", icon: Share2 },
  { label: "Infrastructure", href: "/docs/infrastructure/edge", icon: Server },
  { label: "Reference", href: "/docs/reference/api", icon: Code },
];

function isActive(pathname: string, href: string): boolean {
  const base = href.split("/").slice(0, 3).join("/");
  return pathname === href || pathname.startsWith(base + "/") || pathname === base;
}

export function MobileSidebar() {
  const [expanded, setExpanded] = useState(false);
  const [dissolved, setDissolved] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  const toggleAugment = useCallback(() => {
    window.dispatchEvent(new CustomEvent("augment-space-toggle"));
  }, []);

  // Reset on navigation
  useEffect(() => {
    setExpanded(false);
    setActiveSection(null);
  }, [pathname]);

  // Hide sidebar with pixelation when footer scrolls into view
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setDissolved(entry.isIntersecting);
        document.body.toggleAttribute("data-footer-visible", entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  // Click outside to close
  useEffect(() => {
    if (!expanded) return;
    function handleOutside(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setExpanded(false);
        setActiveSection(null);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [expanded]);

  // Handle section tap — accordion toggle
  const handleSectionTap = useCallback((sectionHref: string) => {
    if (!expanded) {
      // Collapsed: expand + open accordion
      setExpanded(true);
      setActiveSection(sectionHref);
    } else {
      // Expanded: toggle accordion
      setActiveSection((prev) => (prev === sectionHref ? null : sectionHref));
    }
  }, [expanded]);

  return (
    <>
      {/* SVG pixelation filter */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="sidebar-pixelate">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={dissolved ? "0.08" : "0"}
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={dissolved ? 60 : 0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={`
          fixed inset-0 z-30 bg-black/50 backdrop-blur-[2px]
          transition-opacity duration-200 md:hidden
          ${expanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => { setExpanded(false); setActiveSection(null); }}
      />

      {/* Sidebar rail */}
      <div
        ref={sidebarRef}
        data-mobile-sidebar
        className={`
          fixed left-0 top-14 bottom-0 z-40
          flex flex-col
          border-r border-[var(--fd-border)]
          backdrop-blur-xl
          md:hidden
          ${
            expanded
              ? "w-full dark:bg-[rgba(10,10,10,0.96)] bg-[rgba(255,255,255,0.97)]"
              : "w-[52px] dark:bg-[rgba(10,10,10,0.88)] bg-[rgba(255,255,255,0.9)]"
          }
          ${dissolved ? "sidebar-dissolve" : "sidebar-materialize"}
        `}
        style={{
          willChange: "width, opacity, transform, filter",
          transition: "width 200ms ease-out, opacity 500ms ease-out, transform 500ms ease-out, filter 500ms ease-out",
          ...(dissolved
            ? { opacity: 0, transform: "translateX(-20px) scale(0.95)", filter: "url(#sidebar-pixelate) blur(2px)", pointerEvents: "none" as const }
            : { opacity: 1, transform: "translateX(0) scale(1)", filter: "none" }
          ),
        }}
      >
        {/* Toggle button */}
        <button
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => {
            setExpanded((v) => !v);
            if (expanded) setActiveSection(null);
          }}
          className="flex items-center justify-center h-12 w-full shrink-0 border-b border-[var(--fd-border)] text-[rgb(255,105,0)] hover:bg-[rgba(255,105,0,0.08)] transition-colors duration-150"
        >
          {expanded ? <X size={20} strokeWidth={2} /> : <ChevronRight size={16} strokeWidth={2} />}
        </button>

        {/* Nav area — accordion */}
        <nav
          aria-label="Mobile docs navigation"
          className="flex-1 min-h-0 overflow-y-auto py-2 px-3"
        >
          <div className="flex flex-col gap-0.5">
            {NAV_SECTIONS.map((section) => {
              const active = isActive(pathname, section.href);
              const Icon = section.icon;
              const isOpen = activeSection === section.href;
              const subPages = SUB_PAGES[section.href] ?? [];

              return (
                <div key={section.href}>
                  {/* Section button */}
                  <button
                    title={expanded ? undefined : section.label}
                    aria-label={section.label}
                    aria-expanded={isOpen}
                    onClick={() => handleSectionTap(section.href)}
                    className={`
                      flex items-center ${expanded ? "gap-3" : "justify-center"}
                      rounded-md ${expanded ? "px-4 py-2.5" : "px-2 py-1.5"}
                      font-[family-name:var(--font-geist-mono)]
                      ${expanded ? "text-[15px]" : "text-[13px]"} font-medium
                      transition-all duration-150
                      select-none whitespace-nowrap overflow-hidden
                      w-full text-left
                      ${
                        active
                          ? "text-[rgb(192,132,252)] bg-[rgba(168,85,247,0.1)] border-l-2 border-[rgb(168,85,247)]"
                          : "text-[var(--fd-muted-foreground)] hover:text-[var(--fd-foreground)] hover:bg-[var(--fd-accent)]"
                      }
                    `}
                    style={active ? { boxShadow: "0 0 12px rgba(168,85,247,0.15), inset 0 0 8px rgba(168,85,247,0.05)" } : undefined}
                  >
                    <Icon
                      size={expanded ? 20 : 16}
                      strokeWidth={1.75}
                      className={`shrink-0 ${active ? "text-[rgb(192,132,252)]" : "opacity-70"}`}
                      style={active ? { filter: "drop-shadow(0 0 6px rgba(168,85,247,0.5))" } : undefined}
                      aria-hidden="true"
                    />
                    {expanded && (
                      <>
                        <span className="text-[15px] truncate flex-1">{section.label}</span>
                        <ChevronRight
                          size={12}
                          strokeWidth={2}
                          className={`shrink-0 opacity-40 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                        />
                      </>
                    )}
                  </button>

                  {/* Sub-pages accordion — expand below */}
                  {expanded && isOpen && subPages.length > 0 && (
                    <div className="flex flex-col gap-0.5 pl-6 py-1.5 border-l border-[rgba(168,85,247,0.2)] ml-5 mt-0.5 mb-1">
                      {subPages.map((page) => {
                        const isCurrent = pathname === page.href;
                        const agtColor = AGT_COLORS[page.agt];

                        return (
                          <Link
                            key={page.href}
                            href={page.href}
                            className={`
                              flex items-center gap-2.5 rounded-md px-3 py-2
                              font-[family-name:var(--font-geist-mono)]
                              text-[14px] font-medium
                              transition-all duration-150
                              select-none overflow-hidden
                              ${
                                isCurrent
                                  ? "text-[rgb(192,132,252)] bg-[rgba(168,85,247,0.1)]"
                                  : "text-[var(--fd-muted-foreground)] hover:text-[var(--fd-foreground)] hover:bg-[var(--fd-accent)]"
                              }
                            `}
                          >
                            <span
                              className="shrink-0 rounded-full"
                              style={{
                                width: isCurrent ? 8 : 6,
                                height: isCurrent ? 8 : 6,
                                backgroundColor: agtColor,
                                boxShadow: `0 0 4px ${agtColor}50`,
                              }}
                            />
                            <span className="truncate">{page.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer — DOCS Rules + Theme toggle + Augment Space toggle */}
        <div className="shrink-0 border-t border-[var(--fd-border)]">
          {/* DOCS Rules toggle */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("docs-rules-toggle"))}
            className={`flex items-center ${expanded ? "gap-2.5 px-3" : "justify-center"} w-full h-9 transition-all duration-150 hover:bg-[var(--fd-accent)] text-[var(--fd-muted-foreground)] hover:text-[var(--fd-foreground)]`}
            aria-label="DOCS Rules"
          >
            <BookOpen size={15} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />
            {expanded && (
              <span className="font-[family-name:var(--font-geist-mono)] text-[13px] font-medium">
                DOCS Rules
              </span>
            )}
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className={`flex items-center ${expanded ? "gap-2.5 px-3" : "justify-center"} w-full h-9 transition-all duration-150 hover:bg-[var(--fd-accent)] text-[var(--fd-muted-foreground)] hover:text-[var(--fd-foreground)]`}
            aria-label="Toggle theme"
          >
            {!mounted || resolvedTheme === "dark" ? (
              <Sun size={15} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />
            ) : (
              <Moon size={15} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />
            )}
            {expanded && mounted && (
              <span className="font-[family-name:var(--font-geist-mono)] text-[13px] font-medium">
                {resolvedTheme === "dark" ? "Light" : "Dark"}
              </span>
            )}
          </button>

          {/* Augment Space toggle */}
          <button
            onClick={toggleAugment}
            className={`augment-space-btn flex items-center ${expanded ? "gap-2.5 px-3" : "justify-center"} w-full h-9 transition-all duration-200 hover:bg-[rgba(255,105,0,0.08)] border-t border-[var(--fd-border)]`}
            aria-label="Toggle Augment Space"
          >
            <Image
              src="/optx-eye.png"
              alt="Augment"
              width={expanded ? 20 : 24}
              height={expanded ? 20 : 24}
              className="rounded-full shrink-0"
            />
            {expanded && (
              <span className="font-[family-name:var(--font-orbitron)] font-bold tracking-widest text-[rgb(255,105,0)] text-[10px] uppercase">
                Augment
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
