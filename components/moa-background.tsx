"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Aceternity-inspired dot grid background with mouse-reactive spotlight,
 * electric pulse ripples, and AGT-colored particle drift.
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
};

type Ripple = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
};

const AGT_COLORS = {
  cog: { r: 234, g: 179, b: 8 },
  emo: { r: 244, g: 63, b: 94 },
  env: { r: 96, g: 165, b: 250 },
};

const DOT_SPACING = 28;
const DOT_BASE_RADIUS = 1;
const SPOTLIGHT_RADIUS = 180;

export function MoaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    prevMouseRef.current = { ...mouseRef.current };
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };

    const dx = mouseRef.current.x - prevMouseRef.current.x;
    const dy = mouseRef.current.y - prevMouseRef.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 3) {
      const colorKeys = Object.keys(AGT_COLORS) as (keyof typeof AGT_COLORS)[];
      const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      const c = AGT_COLORS[colorKey];

      const count = Math.min(2, Math.ceil(speed / 15));
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 10,
          y: mouseRef.current.y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.5 - dx * 0.02,
          vy: (Math.random() - 0.5) * 1.5 - dy * 0.02,
          radius: Math.random() * 2 + 1,
          color: `${c.r},${c.g},${c.b}`,
          alpha: 0.6 + Math.random() * 0.3,
          life: 0,
          maxLife: 40 + Math.random() * 30,
        });
      }

      if (speed > 25 && ripplesRef.current.length < 5) {
        ripplesRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          radius: 0,
          maxRadius: 80 + Math.random() * 60,
          alpha: 0.25,
          color: `${c.r},${c.g},${c.b}`,
        });
      }
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const isDark = document.documentElement.classList.contains("dark");

      ctx.clearRect(0, 0, w, h);
      frameRef.current++;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isActive = mouseRef.current.active;
      const time = frameRef.current * 0.005;

      // 1. Dot grid — Aceternity style
      const cols = Math.ceil(w / DOT_SPACING) + 1;
      const rows = Math.ceil(h / DOT_SPACING) + 1;
      const offsetX = (w % DOT_SPACING) / 2;
      const offsetY = (h % DOT_SPACING) / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const dotX = offsetX + col * DOT_SPACING;
          const dotY = offsetY + row * DOT_SPACING;

          let alpha = isDark ? 0.12 : 0.08;
          let radius = DOT_BASE_RADIUS;
          let r = 255, g = 255, b = 255;

          if (isActive) {
            const dist = Math.sqrt((dotX - mx) ** 2 + (dotY - my) ** 2);
            if (dist < SPOTLIGHT_RADIUS) {
              const proximity = 1 - dist / SPOTLIGHT_RADIUS;
              const ease = proximity * proximity;

              // Color dots near cursor with AGT colors
              const angle = Math.atan2(dotY - my, dotX - mx);
              const sector = ((angle + Math.PI) / (Math.PI * 2)) * 3;
              if (sector < 1) {
                r = 234; g = 179; b = 8; // COG
              } else if (sector < 2) {
                r = 244; g = 63; b = 94; // EMO
              } else {
                r = 96; g = 165; b = 250; // ENV
              }

              alpha = 0.12 + ease * 0.7;
              radius = DOT_BASE_RADIUS + ease * 2.5;
            }
          }

          // Subtle wave pulse on all dots
          const wave = Math.sin(time * 2 + dotX * 0.008 + dotY * 0.006) * 0.04;
          alpha = Math.max(0, alpha + wave);

          ctx.beginPath();
          ctx.arc(dotX, dotY, radius, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(${r},${g},${b},${alpha})`
            : `rgba(${Math.min(r, 80)},${Math.min(g, 80)},${Math.min(b, 80)},${alpha})`;
          ctx.fill();
        }
      }

      // 2. Mouse spotlight glow
      if (isActive) {
        const spotOuter = ctx.createRadialGradient(mx, my, 0, mx, my, 280);
        spotOuter.addColorStop(0, isDark ? "rgba(255,105,0,0.06)" : "rgba(255,105,0,0.04)");
        spotOuter.addColorStop(0.4, isDark ? "rgba(255,255,255,0.02)" : "rgba(255,105,0,0.015)");
        spotOuter.addColorStop(1, "transparent");
        ctx.fillStyle = spotOuter;
        ctx.fillRect(0, 0, w, h);
      }

      // 3. Electric circuit lines near cursor
      if (isActive) {
        ctx.save();
        ctx.globalAlpha = isDark ? 0.12 : 0.06;
        ctx.strokeStyle = isDark ? "rgba(255,105,0,0.5)" : "rgba(255,105,0,0.25)";
        ctx.lineWidth = 0.5;
        ctx.setLineDash([3, 8]);
        ctx.lineDashOffset = -frameRef.current * 0.5;

        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 + time * 0.3;
          const len = 100 + Math.sin(time * 2 + i) * 40;
          ctx.beginPath();
          ctx.moveTo(mx, my);
          const midX = mx + Math.cos(angle) * len * 0.5;
          const midY = my + Math.sin(angle) * len * 0.5;
          const endX = mx + Math.cos(angle + 0.3) * len;
          const endY = my + Math.sin(angle + 0.3) * len;
          ctx.quadraticCurveTo(midX, midY, endX, endY);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.restore();
      }

      // 4. Ripple effects
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += 2.5;
        r.alpha *= 0.96;

        if (r.radius > r.maxRadius || r.alpha < 0.01) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r.color},${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 5. Mouse trail particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life++;

        const progress = p.life / p.maxLife;
        const alpha = p.alpha * (1 - progress);

        if (alpha < 0.01 || p.life > p.maxLife) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${alpha})`;
        ctx.fill();
      }

      // Cap particle count
      if (particlesRef.current.length > 80) {
        particlesRef.current.splice(0, particlesRef.current.length - 80);
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className="moa-bg"
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 3 }}
    />
  );
}
