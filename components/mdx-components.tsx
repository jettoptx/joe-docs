"use client";

import { Mermaid } from "@/components/mermaid";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Custom pre component that detects mermaid code blocks and renders them
 * as interactive diagrams instead of static code.
 */
export function Pre(props: ComponentPropsWithoutRef<"pre">) {
  const child = props.children as React.ReactElement<{
    className?: string;
    children?: string;
  }>;

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

  return <pre {...props} />;
}
