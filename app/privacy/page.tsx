import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "OPTX privacy policy — data handling, security practices, and compliance.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 font-[family-name:var(--font-geist-mono)]">
      <Link
        href="/docs/getting-started/what-is-optx"
        className="text-xs text-fd-muted-foreground hover:text-orange-400 transition-colors mb-8 inline-block"
      >
        &larr; Back to Docs
      </Link>

      <h1 className="font-[family-name:var(--font-orbitron)] text-3xl font-bold tracking-wider mb-2" style={{ color: "rgb(255, 105, 0)" }}>
        Privacy Policy
      </h1>
      <p className="text-sm text-fd-muted-foreground mb-10">
        Last updated: April 4, 2026
      </p>

      <div className="space-y-8 text-sm text-fd-foreground/90 leading-relaxed">
        <section>
          <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold tracking-wider mb-3">
            1. Overview
          </h2>
          <p>
            OPTX (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the OPTX documentation platform and
            associated services. This Privacy Policy describes how we collect, use, and protect
            information when you use our services.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold tracking-wider mb-3">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Usage Data:</strong> Anonymous page views, navigation patterns, and feature
              usage for analytics purposes. No personally identifiable information is collected
              through analytics.
            </li>
            <li>
              <strong>Biometric Data (Gaze):</strong> When you opt in to gaze authentication,
              iris landmark data is processed locally on your device. Raw biometric data is never
              transmitted to our servers. Only cryptographic hashes (AGT tensor signatures) are
              stored on-chain.
            </li>
            <li>
              <strong>Wallet Addresses:</strong> Public blockchain addresses used for
              authentication and DePIN attestation. These are inherently public on-chain.
            </li>
            <li>
              <strong>Session Data:</strong> Temporary session tokens for authenticated access.
              These expire automatically and are not persisted.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold tracking-wider mb-3">
            3. Data Processing &amp; Storage
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>All biometric processing occurs on-device (edge compute). No raw gaze data leaves your device.</li>
            <li>On-chain attestations are stored on Solana devnet/mainnet and are publicly verifiable.</li>
            <li>Session data is encrypted in transit (TLS 1.3) and at rest.</li>
            <li>Infrastructure runs on private edge nodes secured via WireGuard mesh networking.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold tracking-wider mb-3">
            4. Security Practices
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>End-to-end encryption for all biometric data pipelines.</li>
            <li>Quantum-resistant cryptographic primitives (Kyber, Dilithium) for key exchange and signatures.</li>
            <li>Zero-knowledge proof generation for privacy-preserving attestation.</li>
            <li>Regular security audits and dependency scanning.</li>
            <li>SOC 2 Type I controls alignment for access management, change control, and incident response.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold tracking-wider mb-3">
            5. Third-Party Services
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Vercel:</strong> Hosting and CDN for the documentation site.</li>
            <li><strong>Solana:</strong> On-chain attestation and token operations.</li>
            <li><strong>Clerk:</strong> Subscription management (email, billing only).</li>
          </ul>
          <p className="mt-2">
            We do not sell, rent, or share personal data with third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold tracking-wider mb-3">
            6. Your Rights
          </h2>
          <p>You may request access to, correction of, or deletion of any personal data we hold. Contact us at{" "}
            <a href="mailto:joe@jettoptics.ai" className="text-orange-400 hover:underline">
              joe@jettoptics.ai
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold tracking-wider mb-3">
            7. Changes
          </h2>
          <p>
            We may update this policy from time to time. Changes will be posted on this page with
            an updated revision date.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-fd-border text-xs text-fd-muted-foreground/50">
        &copy; 2026 Jett Optics &mdash; MIT Licensed
      </div>
    </main>
  );
}
