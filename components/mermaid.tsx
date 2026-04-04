"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    if (!initialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#1a1a2e",
          primaryTextColor: "#e0e0e0",
          primaryBorderColor: "#ff6900",
          lineColor: "#ff690088",
          secondaryColor: "#162447",
          tertiaryColor: "#1a1a2e",
          noteBkgColor: "#1a1a2e",
          noteTextColor: "#e0e0e0",
          fontFamily: "ui-monospace, monospace",
          fontSize: "13px",
        },
        flowchart: { curve: "basis", padding: 15 },
        sequence: { actorMargin: 50, mirrorActors: false },
      });
      initialized = true;
    }

    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
    mermaid.render(id, chart.trim()).then(({ svg: rendered }) => {
      setSvg(rendered);
    }).catch((err) => {
      console.error("Mermaid render error:", err);
      setSvg(`<pre style="color:#f43f5e;font-size:12px">${err.message || "Mermaid render failed"}</pre>`);
    });
  }, [chart]);

  return (
    <div
      ref={ref}
      className="my-6 overflow-x-auto rounded-lg border border-fd-border bg-fd-card p-4 [&_svg]:mx-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
