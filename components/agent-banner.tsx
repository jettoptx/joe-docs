"use client";

import { useCallback } from "react";
import Link from "next/link";

export function AgentBanner() {
  const openRules = useCallback(() => {
    window.dispatchEvent(new CustomEvent("docs-rules-toggle"));
  }, []);

  return (
    <div
      data-agent-notice="true"
      role="banner"
      aria-label="Agent instructions — read DOCS RULES before editing"
      className="absolute top-0 left-0 right-0 flex items-center justify-center gap-1.5 h-3.5 text-[8px] font-[family-name:var(--font-geist-mono)] opacity-40 hover:opacity-70 transition-opacity select-none z-10"
    >
      <span className="text-fd-muted-foreground">#AGENTS</span>
      <span className="text-fd-muted-foreground">Read</span>
      <button
        onClick={openRules}
        className="font-bold text-[rgb(255,105,0)] hover:underline cursor-pointer uppercase tracking-wider"
      >
        DOCS RULES
      </button>
      <Link
        href="/docs/rules"
        className="text-fd-muted-foreground hover:text-[rgb(255,105,0)] transition-colors"
        tabIndex={-1}
      >
        /docs/rules
      </Link>
    </div>
  );
}
