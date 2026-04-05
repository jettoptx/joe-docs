"use client";

import { usePathname, useRouter } from "next/navigation";

export function AgtHeaderLink() {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // If on MOA page, close augment overlay and scroll to the knowledge graph table
    if (pathname === "/docs/dojo/moa") {
      window.dispatchEvent(new CustomEvent("augment-space-close"));
      // Scroll to the MoaGraph component
      setTimeout(() => {
        const graph = document.getElementById("moa-knowledge-graph");
        if (graph) {
          const rect = graph.getBoundingClientRect();
          const offset = window.scrollY + rect.top - 80;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      }, 150);
    } else {
      router.push("/docs/dojo/moa");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-[11px] uppercase tracking-widest font-[family-name:var(--font-orbitron)] font-bold text-fd-muted-foreground hover:text-[#ff6900] transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,105,0,0.6)] cursor-pointer"
    >
      AGT
    </button>
  );
}
