"use client";

import { useState } from "react";
import { Clipboard, Check } from "lucide-react";

interface CopyForAgentsBtnProps {
  content: string;
}

export function CopyForAgentsBtn({ content }: CopyForAgentsBtnProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for environments without clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = content;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="mt-4 px-2">
      <button
        onClick={handleCopy}
        aria-label="Copy page content for AI agents"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          width: "100%",
          padding: "0.5rem 0.75rem",
          borderRadius: "0.375rem",
          border: `1px solid ${copied ? "#22c55e" : "rgba(255,105,0,0.4)"}`,
          background: copied
            ? "rgba(34,197,94,0.08)"
            : "rgba(255,105,0,0.06)",
          color: copied ? "#22c55e" : "#ff6900",
          fontSize: "0.75rem",
          fontFamily: "var(--font-geist-mono)",
          fontWeight: 600,
          letterSpacing: "0.04em",
          cursor: "pointer",
          transition: "all 0.15s ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          if (!copied) {
            e.currentTarget.style.background = "rgba(255,105,0,0.12)";
            e.currentTarget.style.borderColor = "rgba(255,105,0,0.7)";
          }
        }}
        onMouseLeave={(e) => {
          if (!copied) {
            e.currentTarget.style.background = "rgba(255,105,0,0.06)";
            e.currentTarget.style.borderColor = "rgba(255,105,0,0.4)";
          }
        }}
      >
        {copied ? (
          <Check size={13} strokeWidth={2.5} />
        ) : (
          <Clipboard size={13} strokeWidth={2} />
        )}
        <span>{copied ? "Copied!" : "Copy for Agents"}</span>
      </button>
    </div>
  );
}
