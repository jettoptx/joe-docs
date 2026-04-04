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
          fontSize: "14px",
        },
        flowchart: { curve: "basis", padding: 45, nodeSpacing: 60, rankSpacing: 60, wrappingWidth: 300, useMaxWidth: false, htmlLabels: true },
        sequence: { actorMargin: 50, mirrorActors: false, width: 180, boxMargin: 8 },
        state: { padding: 16, dividerMargin: 12, titleTopMargin: 14 },
      });
      initialized = true;
    }

    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
    mermaid.render(id, chart.trim()).then(({ svg: rendered }) => {
      // Strip max-width and hard pixel width from the SVG root's inline style,
      // then set width="100%" on the SVG element so it fills the scroll container.
      let clean = rendered
        .replace(/style="[^"]*"/g, (match) => {
          return match
            .replace(/max-width:\s*[^;"]+;?/g, "")
            .replace(/(?:^|;)\s*width:\s*\d+[^;"]*;?/g, "");
        })
        // Replace a standalone width attribute on the <svg> tag with 100%
        .replace(/(<svg\b[^>]*)\bwidth="[^"]*"/, '$1width="100%"');

      // Post-process: widen flowchart node rects to prevent text clipping.
      const parser = new DOMParser();
      const doc = parser.parseFromString(clean, "image/svg+xml");

      // Expand every node rect by 40px (20px each side)
      doc.querySelectorAll(".node rect, .node polygon").forEach((el) => {
        const w = el.getAttribute("width");
        const x = el.getAttribute("x");
        if (w && x) {
          const wNum = parseFloat(w);
          const xNum = parseFloat(x);
          el.setAttribute("width", String(wNum + 40));
          el.setAttribute("x", String(xNum - 20));
        }
      });

      // Ensure label text doesn't wrap — set white-space on foreignObject spans
      doc.querySelectorAll(".nodeLabel, .label").forEach((el) => {
        (el as HTMLElement).setAttribute("style",
          ((el as HTMLElement).getAttribute("style") || "") + ";white-space:nowrap;overflow:visible;"
        );
      });

      clean = new XMLSerializer().serializeToString(doc);

      setSvg(clean);
    }).catch((err) => {
      console.error("Mermaid render error:", err);
      setSvg(`<pre style="color:#f43f5e;font-size:12px">${err.message || "Mermaid render failed"}</pre>`);
    });
  }, [chart]);

  return (
    <div
      ref={ref}
      className="my-6 overflow-x-auto rounded-lg border border-fd-border bg-fd-card p-6 [&_svg]:w-full [&_svg]:h-auto [&_svg]:min-h-[200px] [&_.nodeLabel]:!whitespace-nowrap [&_.nodeLabel]:!overflow-visible [&_.label]:!whitespace-nowrap"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
