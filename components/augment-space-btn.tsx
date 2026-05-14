"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";

// Maps doc paths to MOA node IDs for context-aware highlighting
const PATH_TO_NODE: Record<string, string> = {
  "/docs/getting-started/what-is-optx": "what-is-optx",
  "/docs/getting-started/architecture": "architecture-overview",
  "/docs/getting-started/on-chain-addresses": "on-chain",
  "/docs/jettchat": "jettchat",
  "/docs/jettchat/xchat-native": "xchat-native",
  "/docs/jettchat/phantom-mode": "phantom-mode",
  "/docs/jettchat/messaging": "jettchat-messaging",
  "/docs/authentication/jett-auth": "jett-auth",
  "/docs/authentication/gaze": "gaze",
  "/docs/authentication/wallet": "wallet",
  "/docs/token": "token",
  "/docs/token/tiers": "token-tiers",
  "/docs/token/subscriptions": "token-subscriptions",
  "/docs/protocol": "aaron-protocol",
  "/docs/protocol/biometric-proof": "biometric-proof",
  "/docs/protocol/how-it-works": "how-it-works",
  "/docs/protocol/client-integration": "client-integration",
  "/docs/protocol/architecture": "aaron-arch",
  "/docs/astrojoe": "astrojoe",
  "/docs/astrojoe/skills": "skills",
  "/docs/astrojoe/memory": "memory",
  "/docs/astrojoe/orchestration": "orchestration",
  "/docs/astrojoe/hedgehog": "hedgehog-doc",
  "/docs/astrojoe/api": "hermes-api",
  "/docs/astrojoe/hermes-features": "hermes-features",
  "/docs/astrojoe/matrix": "matrix",
  "/docs/architecture": "arch-flows",
  "/docs/architecture/task-lifecycle": "task-lifecycle",
  "/docs/architecture/swarm-dag": "swarm-dag",
  "/docs/architecture/gaze-policy": "gaze-policy",
  "/docs/architecture/bridge-flow": "bridge-flow",
  "/docs/architecture/agent-identity": "agent-identity",
  "/docs/architecture/task-states": "task-states",
  "/docs/architecture/topology": "topology",
  "/docs/infrastructure/edge": "edge-mcp",
  "/docs/infrastructure/depin": "depin",
  "/docs/on-chain-bridge": "bridge-hub",
  "/docs/on-chain-bridge/solana-native": "solana-native",
  "/docs/reference/api": "api-ref",
  "/docs/reference": "doc-index",
  "/docs/reference/ecosystem": "ecosystem",
  "/docs/reference/changelog": "changelog",
  "/docs/dojo": "dojo",
  "/docs/dojo/moa": "moa",
  "/docs/dojo/mojo": "mojo",
};

export function AugmentSpaceBtn() {
  const pathname = usePathname();
  const nodeId = PATH_TO_NODE[pathname];

  const toggle = useCallback(() => {
    const event = new CustomEvent("augment-space-toggle", {
      detail: { nodeId },
    });
    window.dispatchEvent(event);
  }, [nodeId]);

  return (
    <button
      onClick={toggle}
      className="augment-space-btn flex items-center justify-center gap-2 flex-1 py-2 rounded-md border border-[rgba(255,105,0,0.2)] bg-[rgba(255,105,0,0.06)] text-[rgb(255,105,0)] hover:bg-[rgba(255,105,0,0.12)] hover:border-[rgba(255,105,0,0.35)] transition-all font-[family-name:var(--font-orbitron)] text-[11px] font-semibold tracking-widest uppercase whitespace-nowrap"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
      AUGMENT SPACE
    </button>
  );
}
