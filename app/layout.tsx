import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Orbitron, Geist_Mono, Geist } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: {
    default: "OPTX Documentation",
    template: "%s | OPTX Docs",
  },
  description:
    "Developer documentation for the OPTX spatial encryption platform — gaze biometrics, DePIN attestation, agent wallets, and cross-chain bridging.",
  metadataBase: new URL("https://docs.optx.space"),
  keywords: [
    "OPTX docs",
    "spatial encryption",
    "DePIN",
    "gaze biometrics",
    "AGT tensors",
    "AARON protocol",
    "Solana DePIN",
    "agent wallet",
    "ERC-8004",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://docs.optx.space",
    siteName: "OPTX Docs",
    title: "OPTX Documentation",
    description:
      "Build with gaze-authenticated biometric verification, on-chain DePIN attestation, and cross-chain bridging.",
  },
  twitter: {
    card: "summary",
    site: "@jettoptx",
    creator: "@jettoptx",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#b55200",
  width: "device-width",
  initialScale: 1,
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${geistMono.variable} ${geistSans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-[family-name:var(--font-geist-mono)] antialiased">
        <RootProvider
          theme={{
            defaultTheme: "dark",
            attribute: "class",
          }}
          search={{
            links: [
              ["Getting Started", "/docs/getting-started/what-is-optx"],
              ["Gaze Auth", "/docs/authentication/gaze"],
              ["AARON Protocol", "/docs/protocol"],
              ["Agent Identity", "/docs/architecture/agent-identity"],
              ["DOJO IDE", "/docs/dojo"],
              ["DePIN", "/docs/infrastructure/depin"],
              ["API Reference", "/docs/reference/api"],
              ["iOS / ARKit", "/docs/authentication/gaze"],
              ["Windows / Desktop", "/docs/getting-started/architecture"],
            ],
            options: {
              api: "/api/search",
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
