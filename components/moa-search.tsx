"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { NODES_DATA } from "./moa-visual";

const AGT_COLORS: Record<string, string> = {
  COG: "#eab308",
  EMO: "#f43f5e",
  ENV: "#60a5fa",
};

export function MoaSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return NODES_DATA.filter((n) =>
      n.label.toLowerCase().includes(q) ||
      n.description.toLowerCase().includes(q) ||
      n.subLabels.some((s) => s.toLowerCase().includes(q)) ||
      n.group.toLowerCase().includes(q) ||
      n.agt.toLowerCase().includes(q)
    );
  }, [query]);

  // Dispatch highlights to moa-visual
  useEffect(() => {
    if (!open || !query.trim()) {
      window.dispatchEvent(new CustomEvent("moa-search-highlight", { detail: null }));
      return;
    }
    const ids = matches.map((n) => n.id);
    window.dispatchEvent(new CustomEvent("moa-search-highlight", { detail: ids }));
  }, [matches, open, query]);

  // Reset active index when matches change
  useEffect(() => {
    setActiveIdx(0);
  }, [matches.length]);

  const selectMatch = useCallback((idx: number) => {
    const node = matches[idx];
    if (!node) return;
    window.dispatchEvent(new CustomEvent("moa-search-select", { detail: node.id }));
  }, [matches]);

  // Keyboard: / to open, Escape to close, arrows to navigate, Enter to select
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !open && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA" && window.innerWidth >= 768) {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setQuery("");
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && matches.length > 0) {
      e.preventDefault();
      selectMatch(activeIdx);
      setOpen(false);
      setQuery("");
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
        className="fixed top-[4.5rem] left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-fd-background/80 backdrop-blur-md border border-fd-border/50 text-xs text-fd-muted-foreground/50 hover:text-fd-muted-foreground hover:border-fd-border transition-all cursor-pointer font-[family-name:var(--font-geist-mono)]"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        Search MOA
        <kbd className="text-[9px] border border-fd-border/40 rounded px-1 py-0.5 text-fd-muted-foreground/30">/</kbd>
      </button>
    );
  }

  return (
    <div className="fixed top-[4.5rem] left-1/2 -translate-x-1/2 z-40 w-[340px] hidden md:block font-[family-name:var(--font-geist-mono)]">
      <div className="bg-fd-background/95 backdrop-blur-md border border-fd-border rounded-lg shadow-lg overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-fd-border/50">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-fd-muted-foreground/40 shrink-0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search nodes..."
            className="flex-1 bg-transparent text-xs text-fd-foreground placeholder:text-fd-muted-foreground/40 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => { setQuery(""); setOpen(false); }}
            className="text-fd-muted-foreground/30 hover:text-fd-muted-foreground text-[10px]"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="max-h-[240px] overflow-y-auto">
            {matches.length === 0 ? (
              <div className="px-3 py-4 text-xs text-fd-muted-foreground/40 text-center">
                No nodes found
              </div>
            ) : (
              matches.map((node, idx) => (
                <button
                  key={node.id}
                  onClick={() => { selectMatch(idx); setOpen(false); setQuery(""); }}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className="w-full text-left px-3 py-2 flex items-center gap-2 transition-colors"
                  style={{
                    backgroundColor: idx === activeIdx ? "rgba(255,105,0,0.08)" : "transparent",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: AGT_COLORS[node.agt] }}
                  />
                  <span className="text-xs text-fd-foreground truncate flex-1">{node.label}</span>
                  <span
                    className="text-[9px] font-bold px-1 rounded uppercase"
                    style={{ color: AGT_COLORS[node.agt], opacity: 0.6 }}
                  >
                    {node.agt}
                  </span>
                </button>
              ))
            )}
          </div>
        )}

        {/* Footer hint */}
        <div className="px-3 py-1.5 border-t border-fd-border/30 flex items-center gap-3 text-[9px] text-fd-muted-foreground/30">
          <span>&#x2191;&#x2193; navigate</span>
          <span>&#x23CE; select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
