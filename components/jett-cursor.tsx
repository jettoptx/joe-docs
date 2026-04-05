"use client";

import { useEffect, useRef, useState } from "react";

interface AGTWeights {
  cog: number;
  emo: number;
  env: number;
  label?: string;
}

const SIZE = 140;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 46; // triangle circumradius

// Simplex vertices: COG top, EMO bottom-left, ENV bottom-right
const COG_POS = { x: CX, y: CY - R };
const EMO_POS = { x: CX - R * Math.cos(Math.PI / 6), y: CY + R * Math.sin(Math.PI / 6) };
const ENV_POS = { x: CX + R * Math.cos(Math.PI / 6), y: CY + R * Math.sin(Math.PI / 6) };

const CENTROID = {
  x: (COG_POS.x + EMO_POS.x + ENV_POS.x) / 3,
  y: (COG_POS.y + EMO_POS.y + ENV_POS.y) / 3,
};

const COG_COLOR = "#eab308";
const EMO_COLOR = "#f43f5e";
const ENV_COLOR = "#60a5fa";

function barycentricPos(weights: AGTWeights) {
  const total = weights.cog + weights.emo + weights.env || 1;
  const c = weights.cog / total;
  const e = weights.emo / total;
  const v = weights.env / total;
  return {
    x: c * COG_POS.x + e * EMO_POS.x + v * ENV_POS.x,
    y: c * COG_POS.y + e * EMO_POS.y + v * ENV_POS.y,
  };
}

export function JettCursor() {
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState(CENTROID);
  const [current, setCurrent] = useState(CENTROID);
  const [label, setLabel] = useState<string | null>(null);
  const [dominant, setDominant] = useState<"COG" | "EMO" | "ENV" | null>(null);
  const animRef = useRef<number>(0);
  const targetRef = useRef(CENTROID);
  const currentRef = useRef(CENTROID);

  // Toggle via header AGT button
  useEffect(() => {
    const toggle = () => setVisible((v) => !v);
    window.addEventListener("jett-cursor-toggle", toggle);
    return () => window.removeEventListener("jett-cursor-toggle", toggle);
  }, []);

  // Listen for AGT weight updates from moa-visual
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<AGTWeights>).detail;
      if (!detail) return;
      const pos = barycentricPos(detail);
      targetRef.current = pos;
      setTarget(pos);
      setLabel(detail.label || null);
      // Determine dominant
      const { cog, emo, env } = detail;
      if (cog >= emo && cog >= env) setDominant("COG");
      else if (emo >= cog && emo >= env) setDominant("EMO");
      else setDominant("ENV");
    };
    const reset = () => {
      targetRef.current = CENTROID;
      setTarget(CENTROID);
      setLabel(null);
      setDominant(null);
    };
    window.addEventListener("jett-cursor-update", handler);
    window.addEventListener("jett-cursor-reset", reset);
    return () => {
      window.removeEventListener("jett-cursor-update", handler);
      window.removeEventListener("jett-cursor-reset", reset);
    };
  }, []);

  // Smooth lerp animation
  useEffect(() => {
    if (!visible) return;
    const animate = () => {
      const t = targetRef.current;
      const c = currentRef.current;
      const nx = c.x + (t.x - c.x) * 0.12;
      const ny = c.y + (t.y - c.y) * 0.12;
      currentRef.current = { x: nx, y: ny };
      setCurrent({ x: nx, y: ny });
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [visible]);

  if (!visible) return null;

  const nodeR = 14; // vertex circle radius
  const cursorR = 5;

  return (
    <div
      className="fixed z-50 pointer-events-none select-none"
      style={{ top: "4.5rem", right: "1rem" }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="drop-shadow-lg"
      >
        {/* Dark circular background */}
        <circle cx={CX} cy={CY} r={SIZE / 2 - 2} fill="rgba(10,10,10,0.92)" stroke="rgba(255,105,0,0.2)" strokeWidth={1} />

        {/* Triangle edges */}
        <line x1={COG_POS.x} y1={COG_POS.y} x2={EMO_POS.x} y2={EMO_POS.y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <line x1={EMO_POS.x} y1={EMO_POS.y} x2={ENV_POS.x} y2={ENV_POS.y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <line x1={ENV_POS.x} y1={ENV_POS.y} x2={COG_POS.x} y2={COG_POS.y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />

        {/* Lines from center to vertices */}
        <line x1={CENTROID.x} y1={CENTROID.y} x2={COG_POS.x} y2={COG_POS.y} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
        <line x1={CENTROID.x} y1={CENTROID.y} x2={EMO_POS.x} y2={EMO_POS.y} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
        <line x1={CENTROID.x} y1={CENTROID.y} x2={ENV_POS.x} y2={ENV_POS.y} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />

        {/* Vertex glows (dominant pulses) */}
        {dominant === "COG" && (
          <circle cx={COG_POS.x} cy={COG_POS.y} r={nodeR + 6} fill="none" stroke={COG_COLOR} strokeWidth={1.5} opacity={0.3}>
            <animate attributeName="r" values={`${nodeR + 4};${nodeR + 8};${nodeR + 4}`} dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        )}
        {dominant === "EMO" && (
          <circle cx={EMO_POS.x} cy={EMO_POS.y} r={nodeR + 6} fill="none" stroke={EMO_COLOR} strokeWidth={1.5} opacity={0.3}>
            <animate attributeName="r" values={`${nodeR + 4};${nodeR + 8};${nodeR + 4}`} dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        )}
        {dominant === "ENV" && (
          <circle cx={ENV_POS.x} cy={ENV_POS.y} r={nodeR + 6} fill="none" stroke={ENV_COLOR} strokeWidth={1.5} opacity={0.3}>
            <animate attributeName="r" values={`${nodeR + 4};${nodeR + 8};${nodeR + 4}`} dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Vertex circles */}
        <circle cx={COG_POS.x} cy={COG_POS.y} r={nodeR} fill="rgba(10,10,10,0.8)" stroke={COG_COLOR} strokeWidth={2} />
        <circle cx={EMO_POS.x} cy={EMO_POS.y} r={nodeR} fill="rgba(10,10,10,0.8)" stroke={EMO_COLOR} strokeWidth={2} />
        <circle cx={ENV_POS.x} cy={ENV_POS.y} r={nodeR} fill="rgba(10,10,10,0.8)" stroke={ENV_COLOR} strokeWidth={2} />

        {/* Vertex labels */}
        <text x={COG_POS.x} y={COG_POS.y + 1} textAnchor="middle" dominantBaseline="middle" fill={COG_COLOR} fontSize={8} fontWeight="bold" fontFamily="var(--font-geist-mono)">COG</text>
        <text x={EMO_POS.x} y={EMO_POS.y + 1} textAnchor="middle" dominantBaseline="middle" fill={EMO_COLOR} fontSize={8} fontWeight="bold" fontFamily="var(--font-geist-mono)">EMO</text>
        <text x={ENV_POS.x} y={ENV_POS.y + 1} textAnchor="middle" dominantBaseline="middle" fill={ENV_COLOR} fontSize={8} fontWeight="bold" fontFamily="var(--font-geist-mono)">ENV</text>

        {/* Animated cursor dot — color matches dominant AGT */}
        <circle cx={current.x} cy={current.y} r={cursorR + 2} fill={`${dominant === "COG" ? COG_COLOR : dominant === "EMO" ? EMO_COLOR : dominant === "ENV" ? ENV_COLOR : "#ff6900"}22`} />
        <circle cx={current.x} cy={current.y} r={cursorR} fill={dominant === "COG" ? COG_COLOR : dominant === "EMO" ? EMO_COLOR : dominant === "ENV" ? ENV_COLOR : "#ff6900"} stroke="white" strokeWidth={1.5} />

        {/* Label under widget */}
        {label && (
          <text x={CX} y={SIZE - 10} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={8} fontFamily="var(--font-geist-mono)">
            {label}
          </text>
        )}
      </svg>
    </div>
  );
}
