"use client";

import { useState, useCallback } from "react";
import { Clipboard, Check } from "lucide-react";

/**
 * Floating action button for mobile — copies page text for LLM/agent use.
 * Visible only on small screens (md:hidden). Uses DOM scraping since the
 * layout doesn't have access to raw MDX content.
 */
export function MobileCopyBtn() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const article =
      document.querySelector("article") ||
      document.querySelector('[role="main"]') ||
      document.querySelector(".prose");
    if (!article) return;

    const text = (article as HTMLElement).innerText || article.textContent || "";

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy page content for AI agents"
      className="md:hidden fixed bottom-6 right-4 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-200 active:scale-95"
      style={{
        backgroundColor: copied ? "rgba(34,197,94,0.15)" : "rgba(255,105,0,0.12)",
        border: `1.5px solid ${copied ? "rgba(34,197,94,0.5)" : "rgba(255,105,0,0.5)"}`,
        color: copied ? "#22c55e" : "#ff6900",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: `0 4px 20px ${copied ? "rgba(34,197,94,0.25)" : "rgba(255,105,0,0.25)"}`,
      }}
    >
      {copied ? (
        <Check size={18} strokeWidth={2.5} />
      ) : (
        <Clipboard size={18} strokeWidth={2} />
      )}
    </button>
  );
}
