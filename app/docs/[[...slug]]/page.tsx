import { source } from "@/lib/source";
import {
    DocsPage,
    DocsBody,
    DocsDescription,
    DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Pre } from "@/components/mdx-components";
import { AgtBadge } from "@/components/agt-badge";
import { CopyForAgentsBtn } from "@/components/copy-for-agents-btn";
import { CopyForAgents } from "@/components/copy-for-agents";
import type { Metadata } from "next";
import { readFileSync } from "node:fs";

/** AGT distribution for each doc page: [EMO%, ENV%, COG%] + primary tensor + MOA node */
type AgtEntry = { tensor: "COG" | "EMO" | "ENV"; node: string; emo: number; env: number; cog: number };
const PAGE_AGT: Record<string, AgtEntry> = {
    // Jett Optical Encryption (DOJO — IDE)
    "dojo/moa":           { tensor: "COG", node: "moa",      emo: 30, env: 15, cog: 55 },
    "dojo":               { tensor: "ENV", node: "dojo",     emo: 25, env: 45, cog: 30 },
    "dojo/mojo":          { tensor: "EMO", node: "mojo",     emo: 50, env: 35, cog: 15 },
    // Getting Started
    "getting-started/what-is-optx":       { tensor: "COG", node: "what-is-optx",          emo: 25, env: 20, cog: 55 },
    "getting-started/architecture":       { tensor: "COG", node: "architecture-overview",  emo: 15, env: 30, cog: 55 },
    "getting-started/on-chain-addresses": { tensor: "ENV", node: "on-chain",   emo: 10, env: 80, cog: 10 },
    // Authentication
    "authentication/gaze":   { tensor: "EMO", node: "gaze",   emo: 55, env: 5,  cog: 40 },
    "authentication/wallet": { tensor: "EMO", node: "wallet", emo: 50, env: 40, cog: 10 },
    // AARON Protocol
    "protocol":                    { tensor: "COG", node: "aaron-protocol",    emo: 20, env: 15, cog: 65 },
    "protocol/how-it-works":       { tensor: "COG", node: "how-it-works",     emo: 35, env: 10, cog: 55 },
    "protocol/biometric-proof":    { tensor: "COG", node: "biometric-proof",  emo: 30, env: 15, cog: 55 },
    "protocol/client-integration": { tensor: "COG", node: "client-integration", emo: 25, env: 30, cog: 45 },
    "protocol/architecture":       { tensor: "COG", node: "aaron-arch",       emo: 15, env: 25, cog: 60 },
    // JOE — Jett Optics Engine
    "astrojoe":               { tensor: "EMO", node: "astrojoe",      emo: 45, env: 20, cog: 35 },
    "astrojoe/api":           { tensor: "COG", node: "hermes-api",    emo: 10, env: 15, cog: 75 },
    "astrojoe/hedgehog":      { tensor: "ENV", node: "hedgehog-doc",  emo: 20, env: 65, cog: 15 },
    "astrojoe/memory":        { tensor: "COG", node: "memory",        emo: 10, env: 25, cog: 65 },
    "astrojoe/orchestration": { tensor: "COG", node: "orchestration", emo: 15, env: 15, cog: 70 },
    "astrojoe/skills":        { tensor: "COG", node: "skills",        emo: 20, env: 10, cog: 70 },
    // Architecture Flows
    "architecture":                { tensor: "COG", node: "arch-flows",      emo: 15, env: 20, cog: 65 },
    "architecture/agent-identity": { tensor: "EMO", node: "agent-identity",  emo: 65, env: 25, cog: 10 },
    "architecture/bridge-flow":    { tensor: "EMO", node: "bridge-flow",     emo: 55, env: 35, cog: 10 },
    "architecture/gaze-policy":    { tensor: "EMO", node: "gaze-policy",     emo: 55, env: 15, cog: 30 },
    "architecture/swarm-dag":      { tensor: "COG", node: "swarm-dag",       emo: 30, env: 15, cog: 55 },
    "architecture/task-lifecycle": { tensor: "COG", node: "task-lifecycle",   emo: 15, env: 15, cog: 70 },
    "architecture/task-states":    { tensor: "COG", node: "task-states",      emo: 10, env: 10, cog: 80 },
    "architecture/topology":       { tensor: "ENV", node: "topology",         emo: 15, env: 75, cog: 10 },
    // On-Chain Bridge
    "on-chain-bridge":               { tensor: "EMO", node: "bridge-hub",     emo: 50, env: 40, cog: 10 },
    "on-chain-bridge/solana-native": { tensor: "EMO", node: "solana-native",  emo: 45, env: 45, cog: 10 },
    "on-chain-bridge/evm-layerzero": { tensor: "EMO", node: "evm-layerzero",  emo: 55, env: 35, cog: 10 },
    "on-chain-bridge/xrpl-wormhole": { tensor: "EMO", node: "xrpl-wormhole", emo: 55, env: 35, cog: 10 },
    // Infrastructure
    "infrastructure/edge":  { tensor: "ENV", node: "edge-mcp", emo: 20, env: 70, cog: 10 },
    "infrastructure/depin": { tensor: "ENV", node: "depin",    emo: 15, env: 65, cog: 20 },
    // Reference
    "reference/api": { tensor: "COG", node: "api-ref",   emo: 5,  env: 5,  cog: 90 },
    "reference":     { tensor: "COG", node: "doc-index", emo: 10, env: 10, cog: 80 },
};

export default async function Page(props: {
    params: Promise<{ slug?: string[] }>;
}) {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = page.data as any;
    const MDX = data.body;
    const slugPath = params.slug?.join("/") ?? "";
    const agt = PAGE_AGT[slugPath];

  // Read raw MDX source for the "Copy for Agents" button
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const absolutePath = (page as any).absolutePath as string | undefined;
  let rawContent = "";
  if (absolutePath) {
    try {
      rawContent = readFileSync(absolutePath, "utf-8");
    } catch {
      rawContent = "";
    }
  }

  return (
    <DocsPage
      toc={data.toc}
      full={data.full}
      tableOfContent={{ footer: <CopyForAgentsBtn content={rawContent} /> }}
    >
      <DocsTitle>{data.title}</DocsTitle>
      {agt && <AgtBadge tensor={agt.tensor} node={agt.node} emo={agt.emo} env={agt.env} cog={agt.cog} />}
      <DocsDescription>{data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents, pre: Pre }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
    return source.generateParams();
}

export async function generateMetadata(props: {
    params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) notFound();
  
    return {
          title: page.data.title,
          description: page.data.description,
    };
}
