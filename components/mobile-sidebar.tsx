"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

interface NavSection {
  label: string;
  href: string;
  icon: React.ElementType;
  shortLabel: string;
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: "Jett Optical Encryption",
    shortLabel: "DOJO",
    href: "/docs/dojo",
    icon: Atom,
  },
  {
    label: "Getting Started",
    shortLabel: "Start",
    href: "/docs/getting-started/what-is-optx",
    icon: Rocket,
  },
  {
    label: "Authentication",
    shortLabel: "Auth",
    href: "/docs/authentication/gaze",
    icon: Lock,
  },
  {
    label: "AARON Protocol",
    shortLabel: "AARON",
    href: "/docs/protocol",
    icon: Cpu,
  },
  {
    label: "JOE Engine",
    shortLabel: "JOE",
    href: "/docs/astrojoe",
    icon: BrainCircuit,
  },
  {
    label: "Architecture",
    shortLabel: "Arch",
    href: "/docs/architecture",
    icon: Workflow,
  },
  {
    label: "On-Chain Bridge",
    shortLabel: "Bridge",
    href: "/docs/on-chain-bridge",
    icon: Share2,
  },
  {
    label: "Infrastructure",
    shortLabel: "Infra",
    href: "/docs/infrastructure/edge",
    icon: Server,
  },
  {
    label: "Reference",
    shortLabel: "Ref",
    href: "/docs/reference/api",
    icon: Code,
  },
];

function isActive(pathname: string, href: string): boolean {
  const base = href.split("/").slice(0, 3).join("/");
  return pathname === href || pathname.startsWith(base + "/") || pathname === base;
}

export function MobileSidebar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  // Close on outside click when expanded
  useEffect(() => {
    if (!expanded) return;
    function handleOutside(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [expanded]);

  return (
    <>
      {/* Backdrop — only visible when expanded */}
      <div
        aria-hidden="true"
        className={`
          fixed inset-0 z-30 bg-black/50 backdrop-blur-[2px]
          transition-opacity duration-200
          md:hidden
          ${expanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setExpanded(false)}
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
          transition-[width] duration-200 ease-out
          md:hidden
          ${
            expanded
              ? "w-[200px] dark:bg-[rgba(10,10,10,0.96)] bg-[rgba(255,255,255,0.97)]"
              : "w-[52px] dark:bg-[rgba(10,10,10,0.88)] bg-[rgba(255,255,255,0.9)]"
          }
        `}
        style={{ willChange: "width" }}
      >
        {/* Toggle button */}
        <button
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => setExpanded((v) => !v)}
          className={`
            flex items-center justify-center
            h-10 w-full shrink-0
            border-b border-[var(--fd-border)]
            text-[rgb(255,105,0)] hover:bg-[rgba(255,105,0,0.08)]
            transition-colors duration-150
          `}
        >
          {expanded ? (
            <X size={16} strokeWidth={2} />
          ) : (
            <ChevronRight size={16} strokeWidth={2} />
          )}
        </button>

        {/* Nav items */}
        <nav
          aria-label="Mobile docs navigation"
          className="flex flex-col gap-0.5 py-2 px-1.5 overflow-y-auto flex-1 min-h-0"
        >
          {NAV_SECTIONS.map((section) => {
            const active = isActive(pathname, section.href);
            const Icon = section.icon;

            return (
              <Link
                key={section.href}
                href={section.href}
                title={expanded ? undefined : section.label}
                aria-label={section.label}
                aria-current={active ? "page" : undefined}
                className={`
                  flex items-center gap-2.5
                  rounded-md px-2 py-2
                  font-[family-name:var(--font-geist-mono)]
                  text-xs font-medium
                  transition-all duration-150
                  select-none whitespace-nowrap overflow-hidden
                  ${
                    active
                      ? "text-[rgb(255,105,0)] bg-[rgba(255,105,0,0.1)] border-l-2 border-[rgb(255,105,0)]"
                      : "text-[var(--fd-muted-foreground)] hover:text-[var(--fd-foreground)] hover:bg-[var(--fd-accent)]"
                  }
                `}
              >
                <Icon
                  size={16}
                  strokeWidth={1.75}
                  className={`shrink-0 ${active ? "text-[rgb(255,105,0)]" : "opacity-70"}`}
                  aria-hidden="true"
                />
                {/* Label — fades in when expanded */}
                <span
                  className={`
                    transition-[opacity,transform] duration-150
                    ${expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none absolute"}
                  `}
                >
                  {section.shortLabel}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer — OPTX brand mark */}
        <div
          className={`
            shrink-0 flex items-center justify-center
            h-10 border-t border-[var(--fd-border)]
            transition-opacity duration-150
            ${expanded ? "opacity-100" : "opacity-40"}
          `}
        >
          <span
            className={`
              font-[family-name:var(--font-orbitron)] font-bold tracking-widest
              text-[rgb(255,105,0)] text-[10px]
              transition-all duration-150
              overflow-hidden whitespace-nowrap
              ${expanded ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0"}
            `}
            aria-hidden="true"
          >
            OPTX DOCS
          </span>
          {!expanded && (
            <span
              className="text-[rgb(255,105,0)] font-[family-name:var(--font-orbitron)] font-bold text-[10px] tracking-widest"
              aria-hidden="true"
            >
              OX
            </span>
          )}
        </div>
      </div>
    </>
  );
}
