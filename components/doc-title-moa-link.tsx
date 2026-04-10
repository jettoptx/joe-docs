"use client";

import { useCallback, type ReactNode } from "react";

/**
 * Wraps a doc page title so clicking it opens the MOA overlay
 * with the corresponding node selected.
 */
export function DocTitleMoaLink({
  nodeId,
  children,
}: {
  nodeId: string;
  children: ReactNode;
}) {
  const openInMoa = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent("augment-space-open", { detail: nodeId })
    );
  }, [nodeId]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openInMoa}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openInMoa();
        }
      }}
      className="cursor-pointer"
      title="Open in MOA"
    >
      {children}
    </div>
  );
}
