"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AGENT_RULES, HUMAN_RULES, type DocsRule } from "./docs-rules-content";

type Tab = "agents" | "humans";

export function DocsRulesPanel() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("agents");

  const router = useRouter();

  const handleToggle = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  useEffect(() => {
    window.addEventListener("docs-rules-toggle", handleToggle);
    return () => window.removeEventListener("docs-rules-toggle", handleToggle);
  }, [handleToggle]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  if (!open) return null;

  const rules = activeTab === "agents" ? AGENT_RULES : HUMAN_RULES;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[48] bg-black/40 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
      />

      <div
        data-docs-rules
        className="
          fixed z-[49] overflow-y-auto
          top-14 left-[56px] right-0 bottom-0
          md:top-14 md:left-[340px] md:right-0 md:bottom-0
          md:translate-x-0 md:translate-y-0
          bg-fd-background/95 backdrop-blur-xl
          border-l md:border border-fd-border
          font-[family-name:var(--font-geist-mono)]
          shadow-2xl shadow-black/40
        "
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-4 py-3 md:px-8 md:py-5 border-b border-fd-border bg-fd-background/95 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] md:text-sm font-bold text-fd-foreground uppercase tracking-widest font-[family-name:var(--font-orbitron)]">
              DOCS Rules
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  router.push("/docs/rules");
                  setTimeout(() => setOpen(false), 100);
                }}
                className="text-[9px] md:text-[11px] text-fd-muted-foreground hover:text-[rgb(255,105,0)] transition-colors uppercase tracking-wider cursor-pointer"
              >
                Full Page
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[rgb(255,105,0)] hover:text-[rgb(255,140,50)] transition-colors px-2 py-1 rounded-md hover:bg-[rgba(255,105,0,0.08)]"
              >
                Close
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            <TabButton
              active={activeTab === "agents"}
              onClick={() => setActiveTab("agents")}
              label="For Agents"
            />
            <TabButton
              active={activeTab === "humans"}
              onClick={() => setActiveTab("humans")}
              label="For Humans"
            />
          </div>
        </div>

        {/* Rules list */}
        <div className="p-3 md:px-8 md:py-6 flex flex-col gap-2 md:gap-3 max-w-4xl mx-auto w-full">
          {activeTab === "agents" && (
            <p className="text-[9px] md:text-xs text-fd-muted-foreground/70 leading-relaxed px-1 pb-1">
              When adding or editing a page, complete every step below. This keeps the MOA knowledge graph, AGT classification, and navigation consistent.
            </p>
          )}
          {activeTab === "humans" && (
            <p className="text-[9px] md:text-xs text-fd-muted-foreground/70 leading-relaxed px-1 pb-1">
              Quick guide for developers contributing to OPTX docs or using joe-docs as a template for your own project.
            </p>
          )}

          {rules.map((rule) => (
            <RuleCard key={rule.id} rule={rule} />
          ))}
        </div>
      </div>
    </>
  );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 py-1.5 md:py-2 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider
        font-[family-name:var(--font-orbitron)] transition-all duration-150
        ${
          active
            ? "text-[rgb(255,105,0)] bg-[rgba(255,105,0,0.1)] border border-[rgba(255,105,0,0.25)]"
            : "text-fd-muted-foreground hover:text-fd-foreground bg-fd-accent/20 border border-transparent hover:border-fd-border/50"
        }
      `}
    >
      {label}
    </button>
  );
}

function RuleCard({ rule }: { rule: DocsRule }) {
  return (
    <div
      data-rule-id={rule.id}
      className="rounded-lg border border-fd-border/40 bg-fd-accent/10 px-3 py-2.5 md:px-4 md:py-3.5"
    >
      <div className="text-[10px] md:text-sm font-bold text-fd-foreground mb-1">{rule.title}</div>
      <p className="text-[9px] md:text-[11px] text-fd-muted-foreground leading-relaxed">{rule.description}</p>
      {rule.files && rule.files.length > 0 && (
        <div className="flex flex-wrap gap-1 md:gap-1.5 mt-1.5 md:mt-2">
          {rule.files.map((f) => (
            <span
              key={f}
              className="text-[7px] md:text-[9px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded bg-[rgba(255,105,0,0.08)] text-[rgb(255,105,0)] border border-[rgba(255,105,0,0.15)]"
            >
              {f}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
