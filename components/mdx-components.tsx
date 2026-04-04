"use client";

import { Mermaid } from "@/components/mermaid";
import {
  CodeBlock,
  Pre as FumadocsPre,
} from "fumadocs-ui/components/codeblock";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Custom pre component that:
 * 1. Detects mermaid code blocks and renders them as interactive diagrams
 * 2. Wraps all other code blocks in fumadocs CodeBlock (copy button, styling)
 */
export function Pre(props: ComponentPropsWithoutRef<"pre">) {
  const child = props.children as React.ReactElement<{
    className?: string;
    children?: string;
  }>;

  // Mermaid detection
  if (
    child &&
    typeof child === "object" &&
    "props" in child &&
    typeof child.props.className === "string" &&
    child.props.className.includes("mermaid") &&
    typeof child.props.children === "string"
  ) {
    return <Mermaid chart={child.props.children} />;
  }

  // Extract title from data attribute if present
  const title =
    (props as Record<string, unknown>)["data-title"] as string | undefined;

  // Wrap in fumadocs CodeBlock for copy button + clean styling
  return (
    <CodeBlock title={title} allowCopy keepBackground={false}>
      <FumadocsPre {...props} />
    </CodeBlock>
  );
}
