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
  pulse: number;
}

interface Edge {
  source: string;
  target: string;
}

const AGT: Record<string, { color: string; glow: string; label: string }> = {
  COG: { color: "#60a5fa", glow: "rgba(96,165,250,0.35)", label: "Cognitive" },
  EMO: { color: "#f43f5e", glow: "rgba(244,63,94,0.35)", label: "Emotional" },
  ENV: { color: "#4ade80", glow: "rgba(74,222,128,0.35)", label: "Environmental" },
};

const NODES_DATA: Omit<Node, "x" | "y" | "vx" | "vy" | "pulse">[] = [
  { id: "index", label: "OPTX", group: "root", agt: "COG", radius: 34, href: "/docs", description: "Documentation home" },
  { id: "what-is-optx", label: "What is OPTX?", group: "getting-started", agt: "COG", radius: 19, href: "/docs/getting-started/what-is-optx", description: "Core concepts, naming hierarchy" },
  { id: "architecture-overview", label: "Architecture", group: "getting-started", agt: "COG", radius: 17, href: "/docs/getting-started/architecture", description: "End-to-end system architecture" },
  { id: "on-chain", label: "On-Chain", group: "getting-started", agt: "ENV", radius: 15, href: "/docs/getting-started/on-chain-addresses", description: "Solana addresses, token mints" },
  { id: "gaze", label: "Gaze Auth", group: "authentication", agt: "EMO", radius: 22, href: "/docs/authentication/gaze", description: "AGT biometric auth — iris tracking" },
  { id: "wallet", label: "Agent Wallet", group: "authentication", agt: "ENV", radius: 17, href: "/docs/authentication/wallet", description: "ERC-8004 soulbound wallet" },
  { id: "aaron-protocol", label: "AARON", group: "protocol", agt: "COG", radius: 22, href: "/docs/protocol", description: "Biometric proof protocol" },
  { id: "biometric-proof", label: "Bio Proof", group: "protocol", agt: "EMO", radius: 15, href: "/docs/protocol/biometric-proof", description: "Gaze-derived cryptographic proofs" },
  { id: "how-it-works", label: "How It Works", group: "protocol", agt: "COG", radius: 14, href: "/docs/protocol/how-it-works", description: "AARON verification flow" },
  { id: "client-integration", label: "Client SDK", group: "protocol", agt: "ENV", radius: 13, href: "/docs/protocol/client-integration", description: "Client integration guide" },
  { id: "aaron-arch", label: "AARON Arch", group: "protocol", agt: "COG", radius: 14, href: "/docs/protocol/architecture", description: "Internal architecture" },
  { id: "astrojoe", label: "AstroJOE", group: "astrojoe", agt: "EMO", radius: 24, href: "/docs/astrojoe", description: "Intelligent agent OS" },
  { id: "skills", label: "Skills", group: "astrojoe", agt: "COG", radius: 15, href: "/docs/astrojoe/skills", description: "SKILL.md augments" },
  { id: "memory", label: "Memory", group: "astrojoe", agt: "COG", radius: 15, href: "/docs/astrojoe/memory", description: "SpacetimeDB memory" },
  { id: "orchestration", label: "Orchestration", group: "astrojoe", agt: "COG", radius: 15, href: "/docs/astrojoe/orchestration", description: "Task lifecycle, DAG swarm" },
  { id: "hedgehog-doc", label: "HEDGEHOG", group: "astrojoe", agt: "ENV", radius: 17, href: "/docs/astrojoe/hedgehog", description: "Multi-API AI gateway" },
  { id: "hermes-api", label: "Hermes API", group: "astrojoe", agt: "ENV", radius: 14, href: "/docs/astrojoe/api", description: "Hermes OPTX API" },
  { id: "cockpit", label: "Cockpit", group: "cockpit", agt: "EMO", radius: 17, href: "/docs/cockpit", description: "Operator dashboard" },
  { id: "arch-flows", label: "Flows", group: "architecture", agt: "COG", radius: 17, href: "/docs/architecture", description: "Architecture diagrams" },
  { id: "task-lifecycle", label: "Task Life", group: "architecture", agt: "COG", radius: 12, href: "/docs/architecture/task-lifecycle", description: "Task creation to completion" },
  { id: "swarm-dag", label: "Swarm DAG", group: "architecture", agt: "COG", radius: 12, href: "/docs/architecture/swarm-dag", description: "Multi-agent DAG" },
  { id: "gaze-policy", label: "Gaze Policy", group: "architecture", agt: "EMO", radius: 12, href: "/docs/architecture/gaze-policy", description: "Gaze-gated authorization" },
  { id: "bridge-flow", label: "Bridge Flow", group: "architecture", agt: "ENV", radius: 12, href: "/docs/architecture/bridge-flow", description: "XRPL → Solana pipeline" },
  { id: "agent-identity", label: "Identity", group: "architecture", agt: "EMO", radius: 13, href: "/docs/architecture/agent-identity", description: "On-chain identity" },
  { id: "task-states", label: "States", group: "architecture", agt: "COG", radius: 11, href: "/docs/architecture/task-states", description: "Task state machine" },
  { id: "topology", label: "Topology", group: "architecture", agt: "ENV", radius: 13, href: "/docs/architecture/topology", description: "Network map" },
  { id: "edge-mcp", label: "Edge MCP", group: "infrastructure", agt: "ENV", radius: 17, href: "/docs/infrastructure/edge", description: "HEDGEHOG on validator nodes" },
  { id: "bridge", label: "Bridge", group: "infrastructure", agt: "ENV", radius: 15, href: "/docs/infrastructure/bridge", description: "Cross-chain bridging" },
  { id: "depin", label: "DePIN", group: "infrastructure", agt: "ENV", radius: 15, href: "/docs/infrastructure/depin", description: "CSTB Trust attestation" },
  { id: "api-ref", label: "API Ref", group: "reference", agt: "COG", radius: 16, href: "/docs/reference/api", description: "WebSocket RPC, REST" },
  { id: "dojo", label: "DOJO", group: "dojo", agt: "EMO", radius: 19, href: "/docs/dojo", description: "Training ground" },
  { id: "moa", label: "MOA", group: "dojo", agt: "EMO", radius: 14, href: "/docs/dojo/moa", description: "Knowledge index" },
];

const EDGES: Edge[] = [
  { source: "index", target: "what-is-optx" }, { source: "index", target: "astrojoe" },
  { source: "index", target: "cockpit" }, { source: "index", target: "arch-flows" },
  { source: "index", target: "gaze" }, { source: "index", target: "aaron-protocol" },
  { source: "index", target: "edge-mcp" }, { source: "index", target: "api-ref" },
  { source: "index", target: "dojo" },
  { source: "what-is-optx", target: "architecture-overview" },
  { source: "what-is-optx", target: "on-chain" },
  { source: "architecture-overview", target: "on-chain" },
  { source: "gaze", target: "aaron-protocol" }, { source: "gaze", target: "biometric-proof" },
  { source: "wallet", target: "on-chain" }, { source: "wallet", target: "agent-identity" },
  { source: "aaron-protocol", target: "biometric-proof" },
  { source: "aaron-protocol", target: "how-it-works" },
  { source: "aaron-protocol", target: "client-integration" },
  { source: "aaron-protocol", target: "aaron-arch" },
  { source: "biometric-proof", target: "gaze" },
  { source: "astrojoe", target: "skills" }, { source: "astrojoe", target: "memory" },
  { source: "astrojoe", target: "orchestration" }, { source: "astrojoe", target: "hedgehog-doc" },
  { source: "astrojoe", target: "hermes-api" }, { source: "astrojoe", target: "agent-identity" },
  { source: "skills", target: "dojo" }, { source: "memory", target: "edge-mcp" },
  { source: "orchestration", target: "task-lifecycle" },
  { source: "orchestration", target: "swarm-dag" },
  { source: "hedgehog-doc", target: "edge-mcp" }, { source: "hermes-api", target: "api-ref" },
  { source: "arch-flows", target: "task-lifecycle" },
  { source: "arch-flows", target: "swarm-dag" },
  { source: "arch-flows", target: "gaze-policy" },
  { source: "arch-flows", target: "bridge-flow" },
  { source: "arch-flows", target: "agent-identity" },
  { source: "arch-flows", target: "task-states" },
  { source: "arch-flows", target: "topology" },
  { source: "task-lifecycle", target: "task-states" },
  { source: "gaze-policy", target: "gaze" }, { source: "gaze-policy", target: "aaron-protocol" },
  { source: "bridge-flow", target: "bridge" }, { source: "agent-identity", target: "on-chain" },
  { source: "edge-mcp", target: "topology" }, { source: "bridge", target: "bridge-flow" },
  { source: "depin", target: "on-chain" },
  { source: "cockpit", target: "arch-flows" }, { source: "cockpit", target: "topology" },
  { source: "dojo", target: "skills" }, { source: "dojo", target: "moa" },
];

// Particle traveling along an edge
interface Particle {
  edge: number;
  t: number;
  speed: number;
  color: string;
  size: number;
}

function initNodes(w: number, h: number): Node[] {
  const cx = w / 2, cy = h / 2;
  return NODES_DATA.map((n, i) => {
    const angle = (i / NODES_DATA.length) * Math.PI * 2;
    const r = 100 + Math.random() * 220;
    return { ...n, x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, vx: 0, vy: 0, pulse: Math.random() * Math.PI * 2 };
  });
}

function initParticles(): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < 25; i++) {
    const ei = Math.floor(Math.random() * EDGES.length);
    const agtKey = NODES_DATA[Math.floor(Math.random() * NODES_DATA.length)].agt;
    particles.push({
      edge: ei,
      t: Math.random(),
      speed: 0.002 + Math.random() * 0.004,
      color: AGT[agtKey].color,
      size: 1 + Math.random() * 1.5,
    });
  }
  return particles;
}

export function MoaVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const [hovered, setHovered] = useState<Node | null>(null);
  const [selected, setSelected] = useState<Node | null>(null);
  const [dragging, setDragging] = useState<Node | null>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [dims, setDims] = useState({ w: 900, h: 700 });
  const initialized = useRef(false);

  const getConnected = useCallback((nodeId: string) => {
    const ids = new Set<string>();
    EDGES.forEach((e) => {
      if (e.source === nodeId) ids.add(e.target);
      if (e.target === nodeId) ids.add(e.source);
    });
    return ids;
  }, []);

  useEffect(() => {
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight - 56; // header height
      setDims({ w, h });
      if (!initialized.current) {
        nodesRef.current = initNodes(w, h);
        particlesRef.current = initParticles();
        initialized.current = true;
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
    const particles = particlesRef.current;
    if (nodes.length === 0) return;

    const cx = dims.w / 2, cy = dims.h / 2;

    function simulate() {
      for (const n of nodes) {
        n.vx += (cx - n.x) * 0.0005;
        n.vy += (cy - n.y) * 0.0005;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
          const force = 900 / (dist * dist);
          nodes[i].vx -= (dx / dist) * force;
          nodes[i].vy -= (dy / dist) * force;
          nodes[j].vx += (dx / dist) * force;
          nodes[j].vy += (dy / dist) * force;
        }
      }
      const nodeMap = new Map(nodes.map((n) => [n.id, n]));
      for (const e of EDGES) {
        const s = nodeMap.get(e.source);
        const t = nodeMap.get(e.target);
        if (!s || !t) continue;
        const dx = t.x - s.x;
        const dy = t.y - s.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const force = (dist - 110) * 0.0012;
        s.vx += (dx / dist) * force;
        s.vy += (dy / dist) * force;
        t.vx -= (dx / dist) * force;
        t.vy -= (dy / dist) * force;
      }
      for (const n of nodes) {
        if (dragging && n.id === dragging.id) continue;
        n.vx *= 0.86;
        n.vy *= 0.86;
        n.x += n.vx * 0.35;
        n.y += n.vy * 0.35;
        n.x = Math.max(n.radius + 10, Math.min(dims.w - n.radius - 10, n.x));
        n.y = Math.max(n.radius + 10, Math.min(dims.h - n.radius - 10, n.y));
      }
    }

    function draw() {
      if (!ctx || !canvas) return;
      timeRef.current += 0.016;
      const t = timeRef.current;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = dims.w * dpr;
      canvas.height = dims.h * dpr;
      ctx.scale(dpr, dpr);

      // Background — deep dark with subtle radial gradient
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(dims.w, dims.h) * 0.7);
      bgGrad.addColorStop(0, "#0d0d0d");
      bgGrad.addColorStop(0.5, "#080808");
      bgGrad.addColorStop(1, "#050505");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, dims.w, dims.h);

      const nodeMap = new Map(nodes.map((n) => [n.id, n]));
      const activeId = selected?.id || hovered?.id;
      const connected = activeId ? getConnected(activeId) : new Set<string>();

      // Edges — subtle with animated dash for active
      for (const e of EDGES) {
        const s = nodeMap.get(e.source);
        const tp = nodeMap.get(e.target);
        if (!s || !tp) continue;
        const isActive = activeId && (e.source === activeId || e.target === activeId);

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tp.x, tp.y);

        if (isActive) {
          // Animated active edge with gradient
          const grad = ctx.createLinearGradient(s.x, s.y, tp.x, tp.y);
          const sc = AGT[s.agt].color;
          const tc = AGT[tp.agt].color;
          grad.addColorStop(0, sc + "88");
          grad.addColorStop(1, tc + "88");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.lineDashOffset = -t * 30;
        } else {
          ctx.strokeStyle = "rgba(255,255,255,0.035)";
          ctx.lineWidth = 0.5;
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Edge particles — traveling dots
      for (const p of particles) {
        const e = EDGES[p.edge];
        const s = nodeMap.get(e.source);
        const tp = nodeMap.get(e.target);
        if (!s || !tp) continue;

        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.edge = Math.floor(Math.random() * EDGES.length);
        }

        const px = s.x + (tp.x - s.x) * p.t;
        const py = s.y + (tp.y - s.y) * p.t;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "66";
        ctx.fill();
      }

      // Nodes
      for (const n of nodes) {
        const agt = AGT[n.agt];
        const isActive = n.id === activeId;
        const isConnected = connected.has(n.id);
        const dimmed = activeId && !isActive && !isConnected;

        // Breathing pulse
        const pulse = Math.sin(t * 1.5 + n.pulse) * 0.15 + 1;
        const r = n.radius * (isActive ? 1.08 : pulse * (dimmed ? 0.95 : 1));

        // Outer glow ring (always, subtle)
        if (!dimmed) {
          const glowR = r + 8 + Math.sin(t * 2 + n.pulse) * 3;
          const grad = ctx.createRadialGradient(n.x, n.y, r * 0.8, n.x, n.y, glowR);
          grad.addColorStop(0, agt.glow.replace("0.35", isActive ? "0.5" : "0.12"));
          grad.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Pulse ring (expands outward, fades) — on active node
        if (isActive) {
          const ringPhase = (t * 0.8) % 1;
          const ringR = r + ringPhase * 30;
          const ringAlpha = (1 - ringPhase) * 0.3;
          ctx.beginPath();
          ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2);
          ctx.strokeStyle = agt.color + Math.round(ringAlpha * 255).toString(16).padStart(2, "0");
          ctx.lineWidth = 1.5 * (1 - ringPhase);
          ctx.stroke();
        }

        // Node fill
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        if (dimmed) {
          ctx.fillStyle = "rgba(20,20,20,0.3)";
        } else {
          const grad = ctx.createRadialGradient(n.x - r * 0.3, n.y - r * 0.3, 0, n.x, n.y, r);
          grad.addColorStop(0, agt.color + (isActive ? "ff" : "cc"));
          grad.addColorStop(1, agt.color + (isActive ? "aa" : "66"));
          ctx.fillStyle = grad;
        }
        ctx.fill();

        // Border
        if (!dimmed) {
          ctx.strokeStyle = isActive ? "rgba(255,255,255,0.6)" : agt.color + "33";
          ctx.lineWidth = isActive ? 1.5 : 0.5;
          ctx.stroke();
        }

        // Label
        if (!dimmed || n.radius > 18) {
          const fontSize = r > 24 ? 11 : r > 17 ? 9 : r > 13 ? 7.5 : 6.5;
          ctx.font = `600 ${fontSize}px ui-monospace, "Geist Mono", monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = dimmed ? "rgba(255,255,255,0.06)" : isActive ? "#fff" : "rgba(255,255,255,0.8)";
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
        if (dx * dx + dy * dy < (n.radius + 5) * (n.radius + 5)) return n;
      }
      return null;
    },
    []
  );

  const activeNode = selected || hovered;

  return (
    <div className="moa-fullscreen">
      <canvas
        ref={canvasRef}
        width={dims.w}
        height={dims.h}
        className="block cursor-crosshair"
        style={{ width: dims.w, height: dims.h }}
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

      {/* Info panel — bottom right */}
      {activeNode && (
        <div className="fixed bottom-6 right-6 max-w-[220px] bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 rounded-lg p-3 font-[family-name:var(--font-geist-mono)] z-50 pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: AGT[activeNode.agt].color }} />
            <span className="font-semibold text-white/90 text-[11px]">{activeNode.label}</span>
            <span className="text-[8px] font-bold px-1 py-0.5 rounded" style={{ backgroundColor: AGT[activeNode.agt].color + "22", color: AGT[activeNode.agt].color }}>
              {activeNode.agt}
            </span>
          </div>
          <p className="text-white/40 text-[10px] leading-relaxed">{activeNode.description}</p>
          <span className="text-[9px] mt-1 block" style={{ color: AGT[activeNode.agt].color + "88" }}>click again to open</span>
        </div>
      )}

      {/* Legend — bottom center */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-5 font-[family-name:var(--font-geist-mono)] bg-[#0a0a0a]/60 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/5 z-50">
        {(["COG", "EMO", "ENV"] as const).map((key) => (
          <span key={key} className="flex items-center gap-1.5 text-[9px]">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: AGT[key].color }} />
            <span style={{ color: AGT[key].color }} className="font-bold opacity-80">{key}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
