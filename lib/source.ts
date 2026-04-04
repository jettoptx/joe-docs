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
  Atom,
  Rocket,
  Lock,
  Cpu,
  CircuitBoard,
  Server,
  Bot,
  Zap,
  Database,
  Workflow,
  Wrench,
  Map,
  Flame,
  KeyRound,
  Hash,
  Share2,
  ScanFace,
  ArrowLeftRight,
  Monitor,
  Globe,
  Code,
  FileText,
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
  Atom,
  Rocket,
  Lock,
  Cpu,
  CircuitBoard,
  Server,
  Bot,
  Zap,
  Database,
  Workflow,
  Wrench,
  Map,
  Flame,
  KeyRound,
  Hash,
  Share2,
  ScanFace,
  ArrowLeftRight,
  Monitor,
  Globe,
  Code,
  FileText,
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
