"use client";

import { useCallback } from "react";

export function DocsRulesBtn() {
  const toggle = useCallback(() => {
    window.dispatchEvent(new CustomEvent("docs-rules-toggle"));
  }, []);

  return (
    <button
      onClick={toggle}
      className="docs-rules-btn flex items-center justify-center gap-2 flex-1 py-2 rounded-md border border-fd-border/50 bg-fd-accent/30 text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent/50 hover:border-fd-border transition-all font-[family-name:var(--font-geist-mono)] text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
      DOCS Rules
    </button>
  );
}
