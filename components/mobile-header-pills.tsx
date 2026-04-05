"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export function MobileHeaderPills() {
  const [augmentActive, setAugmentActive] = useState(false);

  useEffect(() => {
    // Check initial state (desktop auto-enables augment)
    const active = document.querySelector(".augment-space-btn.augment-active");
    if (active) setAugmentActive(true);

    const onToggle = () => setAugmentActive((v) => !v);
    const onClose = () => setAugmentActive(false);

    window.addEventListener("augment-space-toggle", onToggle);
    window.addEventListener("augment-space-close", onClose);
    return () => {
      window.removeEventListener("augment-space-toggle", onToggle);
      window.removeEventListener("augment-space-close", onClose);
    };
  }, []);

  const handleNodes = useCallback(() => {
    if (!augmentActive) {
      window.dispatchEvent(new CustomEvent("augment-space-toggle"));
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("moa-show-index"));
      }, 150);
    } else {
      window.dispatchEvent(new CustomEvent("moa-show-index"));
    }
  }, [augmentActive]);

  return (
    <div className="flex md:hidden items-center gap-2">
      <Link href="/docs/authentication/gaze#agt-tensors" className="flex items-center gap-1">
        <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#eab308" }} />
        <span className="text-[9px] font-bold font-[family-name:var(--font-geist-mono)] text-[#eab308]">COG</span>
      </Link>
      <Link href="/docs/authentication/gaze#agt-tensors" className="flex items-center gap-1">
        <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#f43f5e" }} />
        <span className="text-[9px] font-bold font-[family-name:var(--font-geist-mono)] text-[#f43f5e]">EMO</span>
      </Link>
      <Link href="/docs/authentication/gaze#agt-tensors" className="flex items-center gap-1">
        <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#60a5fa" }} />
        <span className="text-[9px] font-bold font-[family-name:var(--font-geist-mono)] text-[#60a5fa]">ENV</span>
      </Link>
      {!augmentActive && (
        <>
          <span className="w-px h-3 bg-fd-border/50" />
          <button
            onClick={handleNodes}
            className="text-[9px] font-bold font-[family-name:var(--font-orbitron)] text-[rgb(255,105,0)] uppercase tracking-wider opacity-80 hover:opacity-100 transition-opacity"
          >
            NODES
          </button>
        </>
      )}
    </div>
  );
}
