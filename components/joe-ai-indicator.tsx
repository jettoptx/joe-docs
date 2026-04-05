"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export function JoeAiIndicator() {
  const [active, setActive] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const toggle = useCallback(async () => {
    if (active) {
      // Stop camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      setActive(false);
      window.dispatchEvent(new CustomEvent("joe-ai-camera", { detail: { active: false } }));
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        setActive(true);
        window.dispatchEvent(new CustomEvent("joe-ai-camera", { detail: { active: true, stream } }));
      } catch {
        // User denied camera or not available
        setActive(false);
      }
    }
  }, [active]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  return (
    <button
      onClick={toggle}
      className="relative flex items-center gap-1.5 group"
      aria-label={active ? "JOE AI active — click to disable" : "Enable JOE AI camera"}
      title={active ? "JOE AI — ON" : "JOE AI — OFF"}
    >
      <span
        className={`
          inline-block w-2.5 h-2.5 rounded-full transition-all duration-300
          ${active
            ? "bg-[rgb(255,105,0)] shadow-[0_0_8px_rgba(255,105,0,0.7)]"
            : "bg-[rgb(255,105,0)] opacity-40 shadow-[0_0_4px_rgba(255,105,0,0.3)]"
          }
        `}
      />
      {active && (
        <span className="absolute inset-0 flex items-center">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[rgb(255,105,0)] animate-[joe-pulse_2s_ease-in-out_infinite] opacity-60" />
        </span>
      )}
      <span className={`
        text-[11px] font-bold font-[family-name:var(--font-orbitron)] tracking-wider transition-colors
        ${active ? "text-[rgb(255,105,0)]" : "text-fd-muted-foreground group-hover:text-[rgb(255,105,0)]"}
      `}>
        JOE
      </span>
    </button>
  );
}
