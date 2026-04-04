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

const AGT_COLORS: Record<AGT, { color: string; glow: string; label: string }> = {
  COG: { color: "#60a5fa", glow: "rgba(96,165,250,0.4)", label: "Cognitive" },
  EMO: { color: "#f43f5e", glow: "rgba(244,63,94,0.4)", label: "Emotional" },
  ENV: { color: "#4ade80", glow: "rgba(74,222,128,0.4)", label: "Environmental" },
};

const DOC_NODES: Omit<Node, "x" | "y" | "vx" | "vy">[] = [
  { id: "index", label: "OPTX", group: "root", agt: "COG", radius: 32, href: "/docs", description: "Documentation home" },
  { id: "what-is-optx", label: "What is OPTX?", group: "getting-started", agt: "COG", radius: 20, href: "/docs/getting-started/what-is-optx", description: "Core concepts, naming hierarchy, protocol overview" },
  { id: "architecture-overview", label: "Architecture", group: "getting-started", agt: "COG", radius: 18, href: "/docs/getting-started/architecture", description: "End-to-end system architecture" },
  { id: "on-chain", label: "On-Chain", group: "getting-started", agt: "ENV", radius: 16, href: "/docs/getting-started/on-chain-addresses", description: "Solana addresses, token mints" },
  { id: "gaze", label: "Gaze Auth", group: "authentication", agt: "EMO", radius: 22, href: "/docs/authentication/gaze", description: "AGT biometric auth — iris tracking" },
  { id: "wallet", label: "Agent Wallet", group: "authentication", agt: "ENV", radius: 18, href: "/docs/authentication/wallet", description: "ERC-8004 soulbound wallet" },
  { id: "aaron-protocol", label: "AARON", group: "protocol", agt: "COG", radius: 22, href: "/docs/protocol", description: "Biometric proof protocol" },
  { id: "biometric-proof", label: "Biometric Proof", group: "protocol", agt: "EMO", radius: 16, href: "/docs/protocol/biometric-proof", description: "Gaze-derived cryptographic proofs" },
  { id: "how-it-works", label: "How It Works", group: "protocol", agt: "COG", radius: 15, href: "/docs/protocol/how-it-works", description: "AARON verification flow" },
  { id: "client-integration", label: "Client SDK", group: "protocol", agt: "ENV", radius: 14, href: "/docs/protocol/client-integration", description: "Client integration guide" },
  { id: "aaron-arch", label: "AARON Arch", group: "protocol", agt: "COG", radius: 15, href: "/docs/protocol/architecture", description: "Internal architecture" },
  { id: "astrojoe", label: "AstroJOE", group: "astrojoe", agt: "EMO", radius: 24, href: "/docs/astrojoe", description: "Intelligent agent OS" },
  { id: "skills", label: "Skills", group: "astrojoe", agt: "COG", radius: 16, href: "/docs/astrojoe/skills", description: "SKILL.md augments" },
  { id: "memory", label: "Memory", group: "astrojoe", agt: "COG", radius: 16, href: "/docs/astrojoe/memory", description: "SpacetimeDB memory" },
  { id: "orchestration", label: "Orchestration", group: "astrojoe", agt: "COG", radius: 16, href: "/docs/astrojoe/orchestration", description: "Task lifecycle, DAG swarm" },
  { id: "hedgehog-doc", label: "HEDGEHOG", group: "astrojoe", agt: "ENV", radius: 18, href: "/docs/astrojoe/hedgehog", description: "Multi-API AI gateway" },
  { id: "hermes-api", label: "Hermes API", group: "astrojoe", agt: "ENV", radius: 15, href: "/docs/astrojoe/api", description: "Hermes OPTX API" },
  { id: "cockpit", label: "Cockpit", group: "cockpit", agt: "EMO", radius: 18, href: "/docs/cockpit", description: "Operator dashboard" },
  { id: "arch-flows", label: "Flows", group: "architecture", agt: "COG", radius: 18, href: "/docs/architecture", description: "Architecture diagrams" },
  { id: "task-lifecycle", label: "Task Life", group: "architecture", agt: "COG", radius: 13, href: "/docs/architecture/task-lifecycle", description: "Task creation to completion" },
  { id: "swarm-dag", label: "Swarm DAG", group: "architecture", agt: "COG", radius: 13, href: "/docs/architecture/swarm-dag", description: "Multi-agent DAG" },
  { id: "gaze-policy", label: "Gaze Policy", group: "architecture", agt: "EMO", radius: 13, href: "/docs/architecture/gaze-policy", description: "Gaze-gated authorization" },
  { id: "bridge-flow", label: "Bridge Flow", group: "architecture", agt: "ENV", radius: 13, href: "/docs/architecture/bridge-flow", description: "XRPL → Solana pipeline" },
  { id: "agent-identity", label: "Identity", group: "architecture", agt: "EMO", radius: 14, href: "/docs/architecture/agent-identity", description: "On-chain identity" },
  { id: "task-states", label: "States", group: "architecture", agt: "COG", radius: 12, href: "/docs/architecture/task-states", description: "Task state machine" },
  { id: "topology", label: "Topology", group: "architecture", agt: "ENV", radius: 14, href: "/docs/architecture/topology", description: "Network map" },
  { id: "edge-mcp", label: "Edge MCP", group: "infrastructure", agt: "ENV", radius: 18, href: "/docs/infrastructure/edge", description: "HEDGEHOG on validator nodes" },
  { id: "bridge", label: "Bridge", group: "infrastructure", agt: "ENV", radius: 16, href: "/docs/infrastructure/bridge", description: "Cross-chain bridging" },
  { id: "depin", label: "DePIN", group: "infrastructure", agt: "ENV", radius: 16, href: "/docs/infrastructure/depin", description: "CSTB Trust attestation" },
  { id: "api-ref", label: "API Ref", group: "reference", agt: "COG", radius: 17, href: "/docs/reference/api", description: "WebSocket RPC, REST" },
  { id: "dojo", label: "DOJO", group: "dojo", agt: "EMO", radius: 20, href: "/docs/dojo", description: "Training ground" },
  { id: "moa", label: "MOA", group: "dojo", agt: "EMO", radius: 15, href: "/docs/dojo/moa", description: "This knowledge graph" },
];

const DOC_EDGES: Edge[] = [
  { source: "index", target: "what-is-optx" },
  { source: "index", target: "astrojoe" },
  { source: "index", target: "cockpit" },
  { source: "index", target: "arch-flows" },
  { source: "index", target: "gaze" },
  { source: "index", target: "aaron-protocol" },
  { source: "index", target: "edge-mcp" },
  { source: "index", target: "api-ref" },
  { source: "index", target: "dojo" },
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

function initNodes(w: number, h: number): Node[] {
  const cx = w / 2, cy = h / 2;
  return DOC_NODES.map((n, i) => {
    const angle = (i / DOC_NODES.length) * Math.PI * 2;
    const r = 80 + Math.random() * 200;
    return { ...n, x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, vx: 0, vy: 0 };
  });
}

export function MoaVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const [hovered, setHovered] = useState<Node | null>(null);
  const [selected, setSelected] = useState<Node | null>(null);
  const [dragging, setDragging] = useState<Node | null>(null);
  const animRef = useRef<number>(0);
  const [dims, setDims] = useState({ w: 900, h: 700 });
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
        const h = Math.max(500, window.innerHeight - 120);
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
      // Center gravity
      for (const n of nodes) {
        n.vx += (cx - n.x) * 0.0006;
        n.vy += (cy - n.y) * 0.0006;
      }
      // Repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
          const force = 800 / (dist * dist);
          nodes[i].vx -= (dx / dist) * force;
          nodes[i].vy -= (dy / dist) * force;
          nodes[j].vx += (dx / dist) * force;
          nodes[j].vy += (dy / dist) * force;
        }
      }
      // Spring edges
      const nodeMap = new Map(nodes.map((n) => [n.id, n]));
      for (const e of DOC_EDGES) {
        const s = nodeMap.get(e.source);
        const t = nodeMap.get(e.target);
        if (!s || !t) continue;
        const dx = t.x - s.x;
        const dy = t.y - s.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const force = (dist - 100) * 0.0015;
        s.vx += (dx / dist) * force;
        s.vy += (dy / dist) * force;
        t.vx -= (dx / dist) * force;
        t.vy -= (dy / dist) * force;
      }
      // Damping
      for (const n of nodes) {
        if (dragging && n.id === dragging.id) continue;
        n.vx *= 0.85;
        n.vy *= 0.85;
        n.x += n.vx * 0.4;
        n.y += n.vy * 0.4;
        n.x = Math.max(n.radius + 8, Math.min(dims.w - n.radius - 8, n.x));
        n.y = Math.max(n.radius + 8, Math.min(dims.h - n.radius - 8, n.y));
      }
    }

    function draw() {
      if (!ctx || !canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = dims.w * dpr;
      canvas.height = dims.h * dpr;
      ctx.scale(dpr, dpr);

      const isDark = document.documentElement.classList.contains("dark");

      // Background
      ctx.fillStyle = isDark ? "#080808" : "#fafafa";
      ctx.fillRect(0, 0, dims.w, dims.h);

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
          ctx.strokeStyle = isDark ? "rgba(255,105,0,0.35)" : "rgba(255,105,0,0.3)";
          ctx.lineWidth = 1.5;
        } else {
          ctx.strokeStyle = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)";
          ctx.lineWidth = 0.5;
        }
        ctx.stroke();
      }

      // Nodes
      for (const n of nodes) {
        const agt = AGT_COLORS[n.agt];
        const isActive = n.id === activeId;
        const isConnected = connected.has(n.id);
        const dimmed = activeId && !isActive && !isConnected;

        // Glow for active
        if (isActive) {
          const grad = ctx.createRadialGradient(n.x, n.y, n.radius * 0.5, n.x, n.y, n.radius * 2.5);
          grad.addColorStop(0, agt.glow);
          grad.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);

        if (dimmed) {
          ctx.fillStyle = isDark ? "rgba(30,30,30,0.4)" : "rgba(220,220,220,0.4)";
        } else if (isActive) {
          ctx.fillStyle = agt.color;
        } else {
          ctx.fillStyle = isDark ? `${agt.color}99` : `${agt.color}aa`;
        }
        ctx.fill();

        // Border
        ctx.strokeStyle = dimmed
          ? isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"
          : isActive ? "#fff" : `${agt.color}44`;
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.stroke();

        // Label
        if (!dimmed || n.radius > 18) {
          const fontSize = n.radius > 24 ? 11 : n.radius > 18 ? 10 : n.radius > 14 ? 8 : 7;
          ctx.font = `600 ${fontSize}px ui-monospace, "Geist Mono", monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = dimmed
            ? isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
            : isActive ? "#fff" : isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)";
          ctx.fillText(n.label, n.x, n.y);
        }
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
        if (dx * dx + dy * dy < (n.radius + 4) * (n.radius + 4)) return n;
      }
      return null;
    },
    []
  );

  const activeNode = selected || hovered;

  return (
    <div className="relative w-full" style={{ margin: "-1.5rem -1.5rem 0 -1.5rem", width: "calc(100% + 3rem)" }}>
      <canvas
        ref={canvasRef}
        width={dims.w}
        height={dims.h}
        className="w-full cursor-crosshair block"
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

      {/* Info panel */}
      {activeNode && (
        <div className="absolute top-4 right-4 max-w-[240px] bg-fd-background/90 backdrop-blur-sm border border-fd-border rounded-lg p-3 font-[family-name:var(--font-geist-mono)]">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: AGT_COLORS[activeNode.agt].color }} />
            <span className="font-semibold text-fd-foreground text-xs">{activeNode.label}</span>
            <span className="text-[9px] font-bold px-1 py-0.5 rounded uppercase" style={{ backgroundColor: `${AGT_COLORS[activeNode.agt].color}22`, color: AGT_COLORS[activeNode.agt].color }}>
              {activeNode.agt}
            </span>
          </div>
          <p className="text-fd-muted-foreground text-[11px] leading-relaxed mb-1.5">{activeNode.description}</p>
          <span className="text-[10px]" style={{ color: AGT_COLORS[activeNode.agt].color }}>click again to navigate</span>
        </div>
      )}

      {/* AGT Legend — bottom left */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 font-[family-name:var(--font-geist-mono)] bg-fd-background/70 backdrop-blur-sm rounded-md px-3 py-1.5 border border-fd-border/50">
        {(["COG", "EMO", "ENV"] as AGT[]).map((key) => (
          <span key={key} className="flex items-center gap-1.5 text-[10px]">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: AGT_COLORS[key].color }} />
            <span style={{ color: AGT_COLORS[key].color }} className="font-bold">{key}</span>
            <span className="text-fd-muted-foreground/60">{AGT_COLORS[key].label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
