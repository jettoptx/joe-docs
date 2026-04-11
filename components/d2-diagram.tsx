"use client";

import { useState, useCallback } from "react";
import { Maximize2, X } from "lucide-react";

/**
 * D2 Diagram component with click-to-enlarge lightbox.
 * Renders a pre-built SVG from /diagrams/ and provides fullscreen overlay on click.
 */
export function D2Diagram({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* Inline diagram with expand button */}
      <figure className="group relative my-6 rounded-lg border border-fd-border bg-fd-card overflow-hidden">
        <div className="relative">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto cursor-pointer"
            onClick={handleOpen}
            loading="lazy"
          />
          {/* Expand button — top right */}
          <button
            onClick={handleOpen}
            aria-label="Expand diagram"
            className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 text-white/80 hover:text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm border border-white/10"
          >
            <Maximize2 size={16} strokeWidth={2} />
          </button>
        </div>
        {caption && (
          <figcaption className="px-4 py-2.5 text-xs text-fd-muted-foreground font-[family-name:var(--font-geist-mono)] border-t border-fd-border">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Fullscreen lightbox overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={handleClose}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close diagram"
            className="absolute top-4 right-4 p-2.5 rounded-lg bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors duration-150 border border-white/10 z-10"
          >
            <X size={20} strokeWidth={2} />
          </button>

          {/* Caption in lightbox */}
          {caption && (
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-md bg-white/10 text-white/70 text-xs font-[family-name:var(--font-geist-mono)] backdrop-blur-sm border border-white/10">
              {caption}
            </div>
          )}

          {/* Full-size diagram */}
          <div
            className="w-[94vw] max-h-[92vh] overflow-auto p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </>
  );
}
