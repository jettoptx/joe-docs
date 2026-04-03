import { docs } from "../.source/server";
import { loader } from "fumadocs-core/source";
import { createElement } from "react";
import {
  BookOpen,
  Code2,
  Eye,
  Wallet,
  Network,
  Shield,
  BrainCircuit,
  Fingerprint,
  Cog,
  Layers,
  Plug,
  Building,
} from "lucide-react";

const icons: Record<string, React.FC<{ className?: string }>> = {
  BookOpen,
  Code2,
  Eye,
  Wallet,
  Network,
  Shield,
  BrainCircuit,
  Fingerprint,
  Cog,
  Layers,
  Plug,
  Building,
};

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return undefined;
    const Component = icons[icon];
    if (!Component) return undefined;
    return createElement(Component, {
      className: "w-4 h-4",
    });
  },
});
