"use client";

import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { usePathname } from "next/navigation";

/**
 * Maps doc paths to MOA node IDs.
 * Shared source of truth — keep in sync with augment-space-btn.tsx PATH_TO_NODE.
 */
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
  "/docs/astrojoe/matrix": "matrix",
  "/docs/astrojoe/api": "hermes-api",
  "/docs/astrojoe/hermes-features": "hermes-features",
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
  "/docs/reference/changelog": "changelog",
  "/docs/reference": "doc-index",
  "/docs/reference/ecosystem": "ecosystem",
  "/docs/dojo": "dojo",
  "/docs/dojo/moa": "moa",
  "/docs/dojo/mojo": "mojo",
};

/**
 * Custom MDX <a> component.
 * Internal doc links open the MOA overlay with the target node selected.
 * Anchor links (#) and external links behave normally.
 */
export function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href, children, ...rest } = props;
  const pathname = usePathname();

  if (!href) return <a {...props} />;

  // Anchor links (heading permalinks) — open MOA with current page's node
  if (href.startsWith("#")) {
    const currentNode = PATH_TO_NODE[pathname];
    if (currentNode) {
      return (
        <a
          {...rest}
          href={href}
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(
              new CustomEvent("augment-space-open", { detail: currentNode })
            );
          }}
          className="text-[rgb(255,105,0)] hover:text-[rgb(255,140,50)] transition-colors cursor-pointer"
          title={`View in MOA: ${currentNode}`}
        >
          {children}
        </a>
      );
    }
    return <a {...props} />;
  }

  // External links — pass through
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  }

  // Strip anchor fragment for node lookup
  const basePath = href.split("#")[0];
  const nodeId = PATH_TO_NODE[basePath];

  if (nodeId) {
    return (
      <a
        {...rest}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          window.dispatchEvent(
            new CustomEvent("augment-space-open", { detail: nodeId })
          );
        }}
        className="text-[rgb(255,105,0)] hover:text-[rgb(255,140,50)] transition-colors cursor-pointer"
        title={`View in MOA: ${nodeId}`}
      >
        {children}
      </a>
    );
  }

  // Internal non-docs links — pass through
  return <a {...props} />;
}

/**
 * Plain heading components — headings render as static text with scroll-margin.
 * Hover-orange affordance is in globals.css. No anchor link, no click handler.
 */
function PlainHeading({
  as,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }) {
  const As = as;
  return <As className={`scroll-m-28 ${className ?? ""}`} {...props} />;
}

export const mdxHeadings = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => <PlainHeading as="h1" {...props} />,
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => <PlainHeading as="h2" {...props} />,
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => <PlainHeading as="h3" {...props} />,
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => <PlainHeading as="h4" {...props} />,
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => <PlainHeading as="h5" {...props} />,
  h6: (props: HTMLAttributes<HTMLHeadingElement>) => <PlainHeading as="h6" {...props} />,
};
