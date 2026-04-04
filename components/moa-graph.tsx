"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type AGT = "COG" | "EMO" | "ENV";

interface Node {
  id: string;
  label: string;
  group: string;
  agt: AGT;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  href: string;
  description: string;
}

interface Edge {
  source: string;
  target: string;
}

// AGT tensor colors — these are the primary visual system
export const AGT_COLORS: Record<AGT, { color: string; glow: string; label: string }> = {
  COG: { color: "#60a5fa", glow: "rgba(96,165,250,0.45)", label: "Cognitive" },
  EMO: { color: "#f43f5e", glow: "rgba(244,63,94,0.45)", label: "Emotional" },
  ENV: { color: "#4ade80", glow: "rgba(74,222,128,0.45)", label: "Environmental" },
};

// Section colors (subtle ring, secondary to AGT)
const SECTION_RING: Record<string, string> = {
  root: "#ff6900",
  "getting-started": "#22d3ee",
  authentication: "#a855f7",
  protocol: "#f43f5e",
  astrojoe: "#4ade80",
  cockpit: "#facc15",
  architecture: "#60a5fa",
  infrastructure: "#f97316",
  reference: "#e879f9",
  dojo: "#34d399",
};

// Every doc page tagged with its primary AGT tensor
// COG = conceptual, architectural, how-things-work pages
// EMO = identity, personality, agent-facing, human-interaction pages
// ENV = infrastructure, network, spatial, environmental pages
const DOC_NODES: Omit<Node, "x" | "y" | "vx" | "vy">[] = [
  // Root
  { id: "index", label: "OPTX Docs", group: "root", agt: "COG", radius: 30, href: "/docs", description: "Documentation home — conceptual entry point" },

  // Getting Started
  { id: "what-is-optx", label: "What is OPTX?", group: "getting-started", agt: "COG", radius: 20, href: "/docs/getting-started/what-is-optx", description: "Core concepts, naming hierarchy, protocol overview" },
  { id: "architecture-overview", label: "Architecture", group: "getting-started", agt: "COG", radius: 18, href: "/docs/getting-started/architecture", description: "End-to-end system architecture from client to chain" },
  { id: "on-chain", label: "On-Chain Addresses", group: "getting-started", agt: "ENV", radius: 16, href: "/docs/getting-started/on-chain-addresses", description: "Solana program addresses, token mints, wallets" },

  // Authentication
  { id: "gaze", label: "Gaze Verification", group: "authentication", agt: "EMO", radius: 20, href: "/docs/authentication/gaze", description: "AGT biometric auth — iris tracking, tensor classification" },
  { id: "wallet", label: "Agent Wallet", group: "authentication", agt: "ENV", radius: 18, href: "/docs/authentication/wallet", description: "ERC-8004 soulbound wallet for computational identity" },

  // Protocol (AARON)
  { id: "aaron-protocol", label: "AARON Protocol", group: "protocol", agt: "COG", radius: 20, href: "/docs/protocol", description: "Biometric proof protocol and edge router" },
  { id: "biometric-proof", label: "Biometric Proof", group: "protocol", agt: "EMO", radius: 16, href: "/docs/protocol/biometric-proof", description: "Gaze-derived cryptographic proofs" },
  { id: "how-it-works", label: "How It Works", group: "protocol", agt: "COG", radius: 16, href: "/docs/protocol/how-it-works", description: "AARON verification flow step-by-step" },
  { id: "client-integration", label: "Client Integration", group: "protocol", agt: "ENV", radius: 14, href: "/docs/protocol/client-integration", description: "Integrating AARON into client applications" },
  { id: "aaron-arch", label: "AARON Architecture", group: "protocol", agt: "COG", radius: 16, href: "/docs/protocol/architecture", description: "Internal architecture of the AARON router" },

  // AstroJOE
  { id: "astrojoe", label: "AstroJOE", group: "astrojoe", agt: "EMO", radius: 22, href: "/docs/astrojoe", description: "Intelligent agent orchestrating the OPTX ecosystem" },
  { id: "skills", label: "Skills System", group: "astrojoe", agt: "COG", radius: 16, href: "/docs/astrojoe/skills", description: "SKILL.md format, progressive disclosure, augments" },
  { id: "memory", label: "Memory", group: "astrojoe", agt: "COG", radius: 16, href: "/docs/astrojoe/memory", description: "SpacetimeDB memory — tables, reducers, API" },
  { id: "orchestration", label: "Orchestration", group: "astrojoe", agt: "COG", radius: 16, href: "/docs/astrojoe/orchestration", description: "Task lifecycle, DAG swarm coordination" },
  { id: "hedgehog-doc", label: "HEDGEHOG Gateway", group: "astrojoe", agt: "ENV", radius: 18, href: "/docs/astrojoe/hedgehog", description: "Multi-API AI gateway on edge hardware" },
  { id: "hermes-api", label: "Hermes API", group: "astrojoe", agt: "ENV", radius: 16, href: "/docs/astrojoe/api", description: "hermes-optx-api endpoints and configuration" },

  // Cockpit
  { id: "cockpit", label: "OPTX Cockpit", group: "cockpit", agt: "EMO", radius: 18, href: "/docs/cockpit", description: "Interactive operator dashboard with live diagrams" },

  // Architecture Flows
  { id: "arch-flows", label: "Architecture Flows", group: "architecture", agt: "COG", radius: 18, href: "/docs/architecture", description: "Mermaid diagrams for every major system flow" },
  { id: "task-lifecycle", label: "Task Lifecycle", group: "architecture", agt: "COG", radius: 14, href: "/docs/architecture/task-lifecycle", description: "Happy path: task creation to completion" },
  { id: "swarm-dag", label: "Swarm DAG", group: "architecture", agt: "COG", radius: 14, href: "/docs/architecture/swarm-dag", description: "Multi-agent DAG decomposition" },
  { id: "gaze-policy", label: "Gaze Policy", group: "architecture", agt: "EMO", radius: 14, href: "/docs/architecture/gaze-policy", description: "Gaze-gated task authorization flow" },
  { id: "bridge-flow", label: "Bridge Flow", group: "architecture", agt: "ENV", radius: 14, href: "/docs/architecture/bridge-flow", description: "XRPL → Wormhole → Solana pipeline" },
  { id: "agent-identity", label: "Agent Identity", group: "architecture", agt: "EMO", radius: 14, href: "/docs/architecture/agent-identity", description: "Identity sources → on-chain registration" },
  { id: "task-states", label: "Task States", group: "architecture", agt: "COG", radius: 14, href: "/docs/architecture/task-states", description: "State machine: Discovered → Completed/Failed" },
  { id: "topology", label: "Topology", group: "architecture", agt: "ENV", radius: 14, href: "/docs/architecture/topology", description: "Full network map of all OPTX services" },

  // Infrastructure
  { id: "edge-mcp", label: "Edge MCP", group: "infrastructure", agt: "ENV", radius: 18, href: "/docs/infrastructure/edge", description: "HEDGEHOG on Jetson Orin Nano edge node" },
  { id: "bridge", label: "Bridge", group: "infrastructure", agt: "ENV", radius: 16, href: "/docs/infrastructure/bridge", description: "Cross-chain bridging infrastructure" },
  { id: "depin", label: "DePIN", group: "infrastructure", agt: "ENV", radius: 16, href: "/docs/infrastructure/depin", description: "CSTB Trust DePIN attestation on Solana" },

  // Reference
  { id: "api-ref", label: "API Reference", group: "reference", agt: "COG", radius: 18, href: "/docs/reference/api", description: "WebSocket RPC, REST endpoints, capabilities" },

  // DOJO
  { id: "dojo", label: "DOJO", group: "dojo", agt: "EMO", radius: 20, href: "/docs/dojo", description: "Training ground, augments, and gaze-navigable exploration" },
  { id: "moa", label: "Map of Augments", group: "dojo", agt: "EMO", radius: 16, href: "/docs/dojo/moa", description: "Interactive force-directed documentation graph" },
];

const DOC_EDGES: Edge[] = [
  // Root -> sections
  { source: "index", target: "what-is-optx" },
  { source: "index", target: "astrojoe" },
  { source: "index", target: "cockpit" },
  { source: "index", target: "arch-flows" },
  { source: "index", target: "gaze" },
  { source: "index", target: "aaron-protocol" },
  { source: "index", target: "edge-mcp" },
  { source: "index", target: "api-ref" },
  { source: "index", target: "dojo" },

  // Getting Started
  { source: "what-is-optx", target: "architecture-overview" },
  { source: "what-is-optx", target: "on-chain" },
  { source: "architecture-overview", target: "on-chain" },

  // Auth
  { source: "gaze", target: "aaron-protocol" },
  { source: "gaze", target: "biometric-proof" },
  { source: "wallet", target: "on-chain" },
  { source: "wallet", target: "agent-identity" },

  // Protocol
  { source: "aaron-protocol", target: "biometric-proof" },
  { source: "aaron-protocol", target: "how-it-works" },
  { source: "aaron-protocol", target: "client-integration" },
  { source: "aaron-protocol", target: "aaron-arch" },
  { source: "biometric-proof", target: "gaze" },

  // AstroJOE
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

  // Architecture
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

  // Infrastructure
  { source: "edge-mcp", target: "topology" },
  { source: "bridge", target: "bridge-flow" },
  { source: "depin", target: "on-chain" },

  // Cockpit
  { source: "cockpit", target: "arch-flows" },
  { source: "cockpit", target: "topology" },

  // DOJO
  { source: "dojo", target: "skills" },
  { source: "dojo", target: "moa" },
];

function initNodes(w: number, h: number): Node[] {
  const cx = w / 2, cy = h / 2;
  return DOC_NODES.map((n, i) => {
    const angle = (i / DOC_NODES.length) * Math.PI * 2;
    const r = 100 + Math.random() * 180;
    return {
      ...n,
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      vx: 0,
      vy: 0,
    };
  });
}

export function MoaGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const [hovered, setHovered] = useState<Node | null>(null);
  const [selected, setSelected] = useState<Node | null>(null);
  const [dragging, setDragging] = useState<Node | null>(null);
  const animRef = useRef<number>(0);
  const [dims, setDims] = useState({ w: 800, h: 600 });
  const initialized = useRef(false);

  const getConnected = useCallback((nodeId: string) => {
    const ids = new Set<string>();
    DOC_EDGES.forEach((e) => {
      if (e.source === nodeId) ids.add(e.target);
      if (e.target === nodeId) ids.add(e.source);
    });
    return ids;
  }, []);

  useEffect(() => {
    const resize = () => {
      const el = canvasRef.current?.parentElement;
      if (el) {
        const w = el.clientWidth;
        const h = Math.max(520, Math.min(720, window.innerHeight - 200));
        setDims({ w, h });
        if (!initialized.current) {
          nodesRef.current = initNodes(w, h);
          initialized.current = true;
        }
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const nodes = nodesRef.current;
    if (nodes.length === 0) return;

    const cx = dims.w / 2, cy = dims.h / 2;

    function simulate() {
      for (const n of nodes) {
        n.vx += (cx - n.x) * 0.0008;
        n.vy += (cy - n.y) * 0.0008;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
          const force = 600 / (dist * dist);
          nodes[i].vx -= (dx / dist) * force;
          nodes[i].vy -= (dy / dist) * force;
          nodes[j].vx += (dx / dist) * force;
          nodes[j].vy += (dy / dist) * force;
        }
      }
      const nodeMap = new Map(nodes.map((n) => [n.id, n]));
      for (const e of DOC_EDGES) {
        const s = nodeMap.get(e.source);
        const t = nodeMap.get(e.target);
        if (!s || !t) continue;
        const dx = t.x - s.x;
        const dy = t.y - s.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const force = (dist - 90) * 0.002;
        s.vx += (dx / dist) * force;
        s.vy += (dy / dist) * force;
        t.vx -= (dx / dist) * force;
        t.vy -= (dy / dist) * force;
      }
      for (const n of nodes) {
        if (dragging && n.id === dragging.id) continue;
        n.vx *= 0.82;
        n.vy *= 0.82;
        n.x += n.vx * 0.3;
        n.y += n.vy * 0.3;
        n.x = Math.max(n.radius + 4, Math.min(dims.w - n.radius - 4, n.x));
        n.y = Math.max(n.radius + 4, Math.min(dims.h - n.radius - 4, n.y));
      }
    }

    function draw() {
      if (!ctx || !canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = dims.w * dpr;
      canvas.height = dims.h * dpr;
      ctx.scale(dpr, dpr);

      const isDark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark ? "#0a0a0a" : "#fafafa";
      ctx.fillRect(0, 0, dims.w, dims.h);

      // Subtle grid dots
      ctx.fillStyle = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)";
      for (let gx = 0; gx < dims.w; gx += 40) {
        for (let gy = 0; gy < dims.h; gy += 40) {
          ctx.beginPath();
          ctx.arc(gx, gy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const nodeMap = new Map(nodes.map((n) => [n.id, n]));
      const activeId = selected?.id || hovered?.id;
      const connected = activeId ? getConnected(activeId) : new Set<string>();

      // Edges
      for (const e of DOC_EDGES) {
        const s = nodeMap.get(e.source);
        const t = nodeMap.get(e.target);
        if (!s || !t) continue;
        const isActive = activeId && (e.source === activeId || e.target === activeId);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        if (isActive) {
          const agtColor = AGT_COLORS[s.agt].color;
          ctx.strokeStyle = agtColor;
          ctx.lineWidth = 2;
        } else {
          ctx.strokeStyle = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
          ctx.lineWidth = 0.5;
        }
        ctx.stroke();
      }

      // Nodes
      for (const n of nodes) {
        const agt = AGT_COLORS[n.agt];
        const sectionColor = SECTION_RING[n.group] || "#666";
        const isActive = n.id === activeId;
        const isConnected = connected.has(n.id);
        const dimmed = activeId && !isActive && !isConnected;

        // Outer glow for active node
        if (isActive) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 12, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(n.x, n.y, n.radius, n.x, n.y, n.radius + 16);
          grad.addColorStop(0, agt.glow);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Node fill — AGT color
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = dimmed
          ? isDark ? "rgba(20,20,20,0.5)" : "rgba(230,230,230,0.5)"
          : isActive ? agt.color : `${agt.color}bb`;
        ctx.fill();

        // Section ring (thin outer border)
        ctx.strokeStyle = dimmed
          ? isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"
          : `${sectionColor}66`;
        ctx.lineWidth = isActive ? 3 : 1.5;
        ctx.stroke();

        // AGT indicator dot (bottom-right)
        if (!dimmed && n.radius >= 14) {
          const dotX = n.x + n.radius * 0.65;
          const dotY = n.y + n.radius * 0.65;
          ctx.beginPath();
          ctx.arc(dotX, dotY, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = agt.color;
          ctx.fill();
          ctx.strokeStyle = isDark ? "#0a0a0a" : "#fafafa";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Label
        const fontSize = n.radius > 24 ? 11 : n.radius > 18 ? 9 : n.radius > 14 ? 8 : 7;
        ctx.font = `600 ${fontSize}px ui-monospace, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = dimmed
          ? isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
          : "#fff";
        ctx.fillText(n.label, n.x, n.y);
      }

      simulate();
      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [dims, hovered, selected, dragging, getConnected]);

  const findNode = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return null;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      for (const n of nodesRef.current) {
        const dx = n.x - x, dy = n.y - y;
        if (dx * dx + dy * dy < n.radius * n.radius) return n;
      }
      return null;
    },
    []
  );

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        width={dims.w}
        height={dims.h}
        className="w-full rounded-lg border border-fd-border cursor-crosshair"
        style={{ height: dims.h }}
        onMouseMove={(e) => {
          const n = findNode(e);
          setHovered(n);
          if (dragging) {
            const rect = canvasRef.current?.getBoundingClientRect();
            if (rect) {
              dragging.x = e.clientX - rect.left;
              dragging.y = e.clientY - rect.top;
              dragging.vx = 0;
              dragging.vy = 0;
            }
          }
        }}
        onClick={(e) => {
          const n = findNode(e);
          if (n && selected?.id === n.id) {
            window.location.href = n.href;
          } else {
            setSelected(n);
          }
        }}
        onDoubleClick={(e) => {
          const n = findNode(e);
          if (n) window.location.href = n.href;
        }}
        onMouseDown={(e) => {
          const n = findNode(e);
          if (n) setDragging(n);
        }}
        onMouseUp={() => setDragging(null)}
        onMouseLeave={() => {
          setHovered(null);
          setDragging(null);
        }}
      />

      {/* AGT Legend */}
      <div className="flex items-center gap-5 mt-4 font-[family-name:var(--font-geist-mono)]">
        <span className="text-[10px] uppercase tracking-widest text-fd-muted-foreground/60 mr-1">AGT</span>
        {(Object.entries(AGT_COLORS) as [AGT, typeof AGT_COLORS[AGT]][]).map(([key, agt]) => (
          <span key={key} className="flex items-center gap-1.5 text-xs">
            <span className="inline-block w-3 h-3 rounded-full border-2" style={{ backgroundColor: agt.color, borderColor: `${agt.color}66` }} />
            <span style={{ color: agt.color }} className="font-bold">{key}</span>
            <span className="text-fd-muted-foreground">{agt.label}</span>
          </span>
        ))}
      </div>

      {/* Info Panel */}
      {(selected || hovered) && (() => {
        const node = (selected || hovered)!;
        const agt = AGT_COLORS[node.agt];
        return (
          <div className="absolute top-3 right-3 max-w-[260px] bg-fd-background/90 backdrop-blur-sm border border-fd-border rounded-lg p-3 font-[family-name:var(--font-geist-mono)]">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: agt.color }} />
              <span className="font-bold text-fd-foreground text-xs">{node.label}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${agt.color}22`, color: agt.color }}>
                {node.agt}
              </span>
            </div>
            <p className="text-fd-muted-foreground text-[11px] leading-relaxed mb-2">
              {node.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-fd-muted-foreground/50 text-[10px]">{node.group}</span>
              <span className="text-[10px]" style={{ color: agt.color }}>click again to navigate</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
