"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";

const MoaVisual = dynamic(() => import("@/components/moa-visual").then(m => ({ default: m.MoaVisual })), {
  ssr: false,
  loading: () => <div className="augment-overlay animate-pulse" />,
});
const MoaSearch = dynamic(() => import("@/components/moa-search").then(m => ({ default: m.MoaSearch })), { ssr: false });

export function AugmentSpaceOverlay() {
  // Default ON for desktop, OFF for mobile so docs are readable
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      setOpen(true);
      document.querySelectorAll(".augment-space-btn").forEach((btn) => btn.classList.add("augment-active"));
    }
    // Open if URL has #augment hash
    if (window.location.hash === "#augment") {
      setOpen(true);
      document.querySelectorAll(".augment-space-btn").forEach((btn) => btn.classList.add("augment-active"));
    }
  }, []);

  const handleToggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      const btns = document.querySelectorAll(".augment-space-btn");
      btns.forEach((btn) => {
        if (next) {
          btn.classList.add("augment-active");
        } else {
          btn.classList.remove("augment-active");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
      // Update URL hash outside render cycle
      queueMicrotask(() => {
        if (next) {
          history.replaceState(null, "", "#augment");
        } else {
          history.replaceState(null, "", window.location.pathname);
        }
      });
      return next;
    });
  }, []);

  // Close overlay (one-directional — only closes, doesn't toggle)
  const handleClose = useCallback(() => {
    setOpen(false);
    document.querySelectorAll(".augment-space-btn").forEach((btn) => btn.classList.remove("augment-active"));
    history.replaceState(null, "", window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener("augment-space-toggle", handleToggle);
    window.addEventListener("augment-space-close", handleClose);
    return () => {
      window.removeEventListener("augment-space-toggle", handleToggle);
      window.removeEventListener("augment-space-close", handleClose);
    };
  }, [handleToggle, handleClose]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, handleClose]);

  // Close when sidebar doc links are clicked
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("aside a[href^='/docs']");
      if (anchor) handleClose();
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div className="augment-overlay">
      <MoaVisual />
      <MoaSearch />
    </div>
  );
}
