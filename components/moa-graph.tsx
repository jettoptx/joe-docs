"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Link from "next/link";

type AGT = "COG" | "EMO" | "ENV";

interface DocNode {
  id: string;
  label: string;
  group: string;
  agt: AGT;
  href: string;
  description: string;
}

interface Edge {
  source: string;
  target: string;
}

export const AGT_COLORS: Record<AGT, { color: string; label: string; dim: string }> = {
  COG: { color: "#60a5fa", label: "Cognitive", dim: "rgba(96,165,250,0.12)" },
  EMO: { color: "#f43f5e", label: "Emotional", dim: "rgba(244,63,94,0.12)" },
  ENV: { color: "#4ade80", label: "Environmental", dim: "rgba(74,222,128,0.12)" },
};

const GROUPS: Record<string, { label: string; order: number }> = {
  "getting-started": { label: "Getting Started", order: 0 },
  authentication: { label: "Authentication", order: 1 },
  protocol: { label: "Protocol — AARON", order: 2 },
  astrojoe: { label: "AstroJOE — Agent OS", order: 3 },
  cockpit: { label: "Cockpit", order: 4 },
  architecture: { label: "Architecture Flows", order: 5 },
  infrastructure: { label: "Infrastructure", order: 6 },
  reference: { label: "Reference", order: 7 },
  dojo: { label: "DOJO", order: 8 },
};

const DOC_NODES: DocNode[] = [
  // Getting Started
  { id: "what-is-optx", label: "What is OPTX?", group: "getting-started", agt: "COG", href: "/docs/getting-started/what-is-optx", description: "Core concepts, naming hierarchy, protocol overview" },
  { id: "architecture-overview", label: "Architecture", group: "getting-started", agt: "COG", href: "/docs/getting-started/architecture", description: "End-to-end system architecture from client to chain" },
  { id: "on-chain", label: "On-Chain Addresses", group: "getting-started", agt: "ENV", href: "/docs/getting-started/on-chain-addresses", description: "Solana program addresses, token mints, wallets" },

  // Authentication
  { id: "gaze", label: "Gaze Verification", group: "authentication", agt: "EMO", href: "/docs/authentication/gaze", description: "AGT biometric auth — iris tracking, tensor classification" },
  { id: "wallet", label: "Agent Wallet", group: "authentication", agt: "ENV", href: "/docs/authentication/wallet", description: "ERC-8004 soulbound wallet for computational identity" },

  // Protocol
  { id: "aaron-protocol", label: "AARON Protocol", group: "protocol", agt: "COG", href: "/docs/protocol", description: "Biometric proof protocol and edge router" },
  { id: "biometric-proof", label: "Biometric Proof", group: "protocol", agt: "EMO", href: "/docs/protocol/biometric-proof", description: "Gaze-derived cryptographic proofs" },
  { id: "how-it-works", label: "How It Works", group: "protocol", agt: "COG", href: "/docs/protocol/how-it-works", description: "AARON verification flow step-by-step" },
  { id: "client-integration", label: "Client Integration", group: "protocol", agt: "ENV", href: "/docs/protocol/client-integration", description: "Integrating AARON into client applications" },
  { id: "aaron-arch", label: "AARON Architecture", group: "protocol", agt: "COG", href: "/docs/protocol/architecture", description: "Internal architecture of the AARON router" },

  // AstroJOE
  { id: "astrojoe", label: "AstroJOE", group: "astrojoe", agt: "EMO", href: "/docs/astrojoe", description: "Intelligent agent orchestrating the OPTX ecosystem" },
  { id: "skills", label: "Skills System", group: "astrojoe", agt: "COG", href: "/docs/astrojoe/skills", description: "SKILL.md format, progressive disclosure, augments" },
  { id: "memory", label: "Memory", group: "astrojoe", agt: "COG", href: "/docs/astrojoe/memory", description: "SpacetimeDB memory — tables, reducers, API" },
  { id: "orchestration", label: "Orchestration", group: "astrojoe", agt: "COG", href: "/docs/astrojoe/orchestration", description: "Task lifecycle, DAG swarm coordination" },
  { id: "hedgehog-doc", label: "HEDGEHOG Gateway", group: "astrojoe", agt: "ENV", href: "/docs/astrojoe/hedgehog", description: "Multi-API AI gateway on edge hardware" },
  { id: "hermes-api", label: "Hermes API", group: "astrojoe", agt: "ENV", href: "/docs/astrojoe/api", description: "Hermes OPTX API endpoints and configuration" },

  // Cockpit
  { id: "cockpit", label: "OPTX Cockpit", group: "cockpit", agt: "EMO", href: "/docs/cockpit", description: "Interactive operator dashboard with live diagrams" },

  // Architecture Flows
  { id: "arch-flows", label: "Architecture Flows", group: "architecture", agt: "COG", href: "/docs/architecture", description: "Mermaid diagrams for every major system flow" },
  { id: "task-lifecycle", label: "Task Lifecycle", group: "architecture", agt: "COG", href: "/docs/architecture/task-lifecycle", description: "Happy path: task creation to completion" },
  { id: "swarm-dag", label: "Swarm DAG", group: "architecture", agt: "COG", href: "/docs/architecture/swarm-dag", description: "Multi-agent DAG decomposition" },
  { id: "gaze-policy", label: "Gaze Policy", group: "architecture", agt: "EMO", href: "/docs/architecture/gaze-policy", description: "Gaze-gated task authorization flow" },
  { id: "bridge-flow", label: "Bridge Flow", group: "architecture", agt: "ENV", href: "/docs/architecture/bridge-flow", description: "XRPL → Wormhole → Solana pipeline" },
  { id: "agent-identity", label: "Agent Identity", group: "architecture", agt: "EMO", href: "/docs/architecture/agent-identity", description: "Identity sources → on-chain registration" },
  { id: "task-states", label: "Task States", group: "architecture", agt: "COG", href: "/docs/architecture/task-states", description: "State machine: Discovered → Completed/Failed" },
  { id: "topology", label: "Topology", group: "architecture", agt: "ENV", href: "/docs/architecture/topology", description: "Full network map of all OPTX services" },

  // Infrastructure
  { id: "edge-mcp", label: "Edge MCP", group: "infrastructure", agt: "ENV", href: "/docs/infrastructure/edge", description: "HEDGEHOG on OPTX Validator Node edge compute" },
  { id: "bridge", label: "Bridge", group: "infrastructure", agt: "ENV", href: "/docs/infrastructure/bridge", description: "Cross-chain bridging infrastructure" },
  { id: "depin", label: "DePIN", group: "infrastructure", agt: "ENV", href: "/docs/infrastructure/depin", description: "CSTB Trust DePIN attestation on Solana" },

  // Reference
  { id: "api-ref", label: "API Reference", group: "reference", agt: "COG", href: "/docs/reference/api", description: "WebSocket RPC, REST endpoints, capabilities" },

  // DOJO
  { id: "dojo", label: "DOJO", group: "dojo", agt: "EMO", href: "/docs/dojo", description: "Training ground, augments, gaze-navigable exploration" },
  { id: "moa", label: "Map of Augments", group: "dojo", agt: "EMO", href: "/docs/dojo/moa", description: "This page — semantic explorer for the documentation graph" },
];

const DOC_EDGES: Edge[] = [
  { source: "what-is-optx", target: "architecture-overview" },
  { source: "what-is-optx", target: "on-chain" },
  { source: "architecture-overview", target: "on-chain" },
  { source: "gaze", target: "aaron-protocol" },
  { source: "gaze", target: "biometric-proof" },
  { source: "wallet", target: "on-chain" },
  { source: "wallet", target: "agent-identity" },
  { source: "aaron-protocol", target: "biometric-proof" },
  { source: "aaron-protocol", target: "how-it-works" },
  { source: "aaron-protocol", target: "client-integration" },
  { source: "aaron-protocol", target: "aaron-arch" },
  { source: "biometric-proof", target: "gaze" },
  { source: "astrojoe", target: "skills" },
  { source: "astrojoe", target: "memory" },
  { source: "astrojoe", target: "orchestration" },
  { source: "astrojoe", target: "hedgehog-doc" },
  { source: "astrojoe", target: "hermes-api" },
  { source: "astrojoe", target: "agent-identity" },
  { source: "skills", target: "dojo" },
  { source: "memory", target: "edge-mcp" },
  { source: "orchestration", target: "task-lifecycle" },
  { source: "orchestration", target: "swarm-dag" },
  { source: "hedgehog-doc", target: "edge-mcp" },
  { source: "hermes-api", target: "api-ref" },
  { source: "arch-flows", target: "task-lifecycle" },
  { source: "arch-flows", target: "swarm-dag" },
  { source: "arch-flows", target: "gaze-policy" },
  { source: "arch-flows", target: "bridge-flow" },
  { source: "arch-flows", target: "agent-identity" },
  { source: "arch-flows", target: "task-states" },
  { source: "arch-flows", target: "topology" },
  { source: "task-lifecycle", target: "task-states" },
  { source: "gaze-policy", target: "gaze" },
  { source: "gaze-policy", target: "aaron-protocol" },
  { source: "bridge-flow", target: "bridge" },
  { source: "agent-identity", target: "on-chain" },
  { source: "edge-mcp", target: "topology" },
  { source: "bridge", target: "bridge-flow" },
  { source: "depin", target: "on-chain" },
  { source: "cockpit", target: "arch-flows" },
  { source: "cockpit", target: "topology" },
  { source: "dojo", target: "skills" },
  { source: "dojo", target: "moa" },
];

function getConnections(nodeId: string): string[] {
  const ids: string[] = [];
  for (const e of DOC_EDGES) {
    if (e.source === nodeId) ids.push(e.target);
    if (e.target === nodeId) ids.push(e.source);
  }
  return ids;
}

export function MoaGraph() {
  const [search, setSearch] = useState("");
  const [activeAgt, setActiveAgt] = useState<AGT | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Keyboard shortcut: / to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSearch("");
        setActiveAgt(null);
        setActiveGroup(null);
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const grouped = useMemo(() => {
    const map: Record<string, DocNode[]> = {};
    for (const n of DOC_NODES) {
      if (!map[n.group]) map[n.group] = [];
      map[n.group].push(n);
    }
    return Object.entries(map)
      .sort(([a], [b]) => (GROUPS[a]?.order ?? 99) - (GROUPS[b]?.order ?? 99));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return grouped.map(([group, nodes]) => {
      const filteredNodes = nodes.filter((n) => {
        if (activeAgt && n.agt !== activeAgt) return false;
        if (activeGroup && n.group !== activeGroup) return false;
        if (q && !n.label.toLowerCase().includes(q) && !n.description.toLowerCase().includes(q)) return false;
        return true;
      });
      return [group, filteredNodes] as [string, DocNode[]];
    }).filter(([, nodes]) => nodes.length > 0);
  }, [grouped, search, activeAgt, activeGroup]);

  const totalFiltered = useMemo(() => filtered.reduce((s, [, n]) => s + n.length, 0), [filtered]);

  const connectedTo = useMemo(() => {
    if (!hoveredNode) return new Set<string>();
    return new Set(getConnections(hoveredNode));
  }, [hoveredNode]);

  const scrollToGroup = useCallback((group: string) => {
    setActiveGroup(null);
    sectionRefs.current[group]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Count nodes per group and AGT
  const groupCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const n of DOC_NODES) c[n.group] = (c[n.group] || 0) + 1;
    return c;
  }, []);

  const agtCounts = useMemo(() => {
    const c: Record<AGT, number> = { COG: 0, EMO: 0, ENV: 0 };
    for (const n of DOC_NODES) c[n.agt]++;
    return c;
  }, []);

  return (
    <div className="flex w-full min-h-[600px] font-[family-name:var(--font-geist-mono)] text-sm border border-fd-border rounded-lg overflow-hidden bg-fd-background">
      {/* ── Sidebar ── */}
      {sidebarOpen && (
        <aside className="w-[220px] min-w-[220px] border-r border-fd-border flex flex-col bg-fd-card/50">
          {/* Sidebar header */}
          <div className="px-3 pt-3 pb-2 border-b border-fd-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-[0.12em] text-fd-muted-foreground/60 font-semibold">
                Knowledge Map
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-fd-muted-foreground/40 hover:text-fd-muted-foreground text-xs transition-colors p-0.5"
                aria-label="Collapse sidebar"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></svg>
              </button>
            </div>
            {/* Search */}
            <div className="relative">
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search nodes..."
                className="w-full bg-fd-background border border-fd-border/60 rounded px-2.5 py-1.5 text-xs text-fd-foreground placeholder:text-fd-muted-foreground/40 focus:outline-none focus:border-fd-muted-foreground/30 transition-colors"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-fd-muted-foreground/30 border border-fd-border/40 rounded px-1 py-0.5">/</kbd>
            </div>
          </div>

          {/* AGT Filter */}
          <div className="px-3 py-2 border-b border-fd-border/50">
            <span className="text-[10px] uppercase tracking-[0.1em] text-fd-muted-foreground/40 block mb-1.5">Tensor Filter</span>
            <div className="flex flex-col gap-0.5">
              {(["COG", "EMO", "ENV"] as AGT[]).map((agt) => {
                const isActive = activeAgt === agt;
                const c = AGT_COLORS[agt];
                return (
                  <button
                    key={agt}
                    onClick={() => setActiveAgt(isActive ? null : agt)}
                    className="flex items-center gap-2 px-1.5 py-1 rounded text-left transition-colors group"
                    style={{
                      backgroundColor: isActive ? c.dim : "transparent",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: c.color, opacity: isActive ? 1 : 0.5 }}
                    />
                    <span
                      className="text-[11px] font-semibold transition-colors"
                      style={{ color: isActive ? c.color : undefined }}
                    >
                      {agt}
                    </span>
                    <span className="text-[10px] text-fd-muted-foreground/40 ml-auto">{agtCounts[agt]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section Nav */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <span className="text-[10px] uppercase tracking-[0.1em] text-fd-muted-foreground/40 block mb-1.5">Sections</span>
            <nav className="flex flex-col gap-0.5">
              {grouped.map(([group]) => {
                const g = GROUPS[group];
                if (!g) return null;
                return (
                  <button
                    key={group}
                    onClick={() => scrollToGroup(group)}
                    className="flex items-center justify-between px-1.5 py-1 rounded text-left text-[11px] text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent/30 transition-colors"
                  >
                    <span className="truncate">{g.label}</span>
                    <span className="text-[10px] text-fd-muted-foreground/30 tabular-nums">{groupCounts[group]}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar footer */}
          <div className="px-3 py-2 border-t border-fd-border/50 text-[10px] text-fd-muted-foreground/30">
            {DOC_NODES.length} nodes &middot; {DOC_EDGES.length} edges
          </div>
        </aside>
      )}

      {/* ── Main Pane ── */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-fd-background/95 backdrop-blur-sm border-b border-fd-border/50 px-5 py-3 flex items-center gap-3">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-fd-muted-foreground/40 hover:text-fd-muted-foreground transition-colors mr-1"
              aria-label="Open sidebar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
            </button>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-fd-foreground font-semibold text-sm">jettoptx/optx-docs</span>
              <span className="text-fd-muted-foreground/30">/</span>
              <span className="text-fd-muted-foreground text-xs">Map of Augments</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-fd-muted-foreground/40 tabular-nums">
            <span>{totalFiltered} visible</span>
            <span className="text-fd-muted-foreground/20">&middot;</span>
            {(["COG", "EMO", "ENV"] as AGT[]).map((agt) => (
              <span key={agt} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: AGT_COLORS[agt].color, opacity: 0.6 }} />
                <span>{agt}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {filtered.length === 0 && (
            <div className="text-fd-muted-foreground/40 text-xs py-12 text-center">
              No nodes match the current filter.
            </div>
          )}

          {filtered.map(([group, nodes]) => {
            const g = GROUPS[group];
            if (!g) return null;
            return (
              <section
                key={group}
                ref={(el) => { sectionRefs.current[group] = el; }}
                className="mb-6 last:mb-0"
              >
                {/* Section header */}
                <div className="flex items-baseline gap-2 mb-2 pb-1.5 border-b border-fd-border/30">
                  <h3 className="text-[13px] font-semibold text-fd-foreground tracking-wide uppercase">
                    {g.label}
                  </h3>
                  <span className="text-[10px] text-fd-muted-foreground/30 tabular-nums">{nodes.length}</span>
                </div>

                {/* Node list — dense chain */}
                <div className="flex flex-col">
                  {nodes.map((node) => {
                    const agt = AGT_COLORS[node.agt];
                    const isHovered = hoveredNode === node.id;
                    const isConnected = connectedTo.has(node.id);
                    const isDimmed = hoveredNode !== null && !isHovered && !isConnected;
                    const connections = getConnections(node.id);
                    const connectedNodes = connections.map((id) => DOC_NODES.find((n) => n.id === id)).filter(Boolean) as DocNode[];

                    return (
                      <div
                        key={node.id}
                        className="group relative"
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        <div
                          className="flex items-start gap-2.5 py-2 px-2 -mx-2 rounded transition-all duration-150"
                          style={{
                            opacity: isDimmed ? 0.25 : 1,
                            backgroundColor: isHovered ? agt.dim : "transparent",
                          }}
                        >
                          {/* AGT dot */}
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0 transition-transform duration-150"
                            style={{
                              backgroundColor: agt.color,
                              opacity: isHovered ? 1 : 0.5,
                              transform: isHovered ? "scale(1.4)" : "scale(1)",
                            }}
                          />
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <Link
                                href={node.href}
                                className="text-[13px] font-medium transition-colors hover:underline underline-offset-2 decoration-1"
                                style={{
                                  color: isHovered ? agt.color : undefined,
                                  textDecorationColor: isHovered ? `${agt.color}44` : undefined,
                                }}
                              >
                                {node.label}
                              </Link>
                              <span
                                className="text-[9px] font-bold px-1 py-px rounded uppercase tracking-wider shrink-0"
                                style={{
                                  color: agt.color,
                                  backgroundColor: agt.dim,
                                  opacity: isHovered ? 1 : 0.6,
                                }}
                              >
                                {node.agt}
                              </span>
                            </div>
                            <p className="text-[11px] text-fd-muted-foreground/60 leading-relaxed mt-0.5">
                              {node.description}
                            </p>
                            {/* Connected nodes — show on hover */}
                            {isHovered && connectedNodes.length > 0 && (
                              <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1.5">
                                <span className="text-[9px] text-fd-muted-foreground/30 uppercase tracking-wider mr-0.5">links</span>
                                {connectedNodes.map((cn) => (
                                  <Link
                                    key={cn.id}
                                    href={cn.href}
                                    className="text-[10px] text-fd-muted-foreground/50 hover:text-fd-muted-foreground transition-colors"
                                  >
                                    {cn.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                          {/* Edge count */}
                          <span className="text-[10px] text-fd-muted-foreground/20 tabular-nums mt-[3px] shrink-0">
                            {connections.length}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
