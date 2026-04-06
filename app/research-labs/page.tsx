import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research Labs",
  description: "Academic and open-source research partners advancing gaze tracking, AR, and spatial computing.",
};

export default function ResearchLabsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 font-[family-name:var(--font-geist-mono)]">
      <Link
        href="/docs"
        className="text-xs text-fd-muted-foreground hover:text-orange-400 transition-colors mb-8 inline-block"
      >
        &larr; Back to Docs
      </Link>

      <h1 className="font-[family-name:var(--font-orbitron)] text-3xl font-bold tracking-wider mb-2" style={{ color: "rgb(255, 105, 0)" }}>
        Research Labs
      </h1>
      <p className="text-sm text-fd-muted-foreground mb-10">
        Academic and open-source research partners
      </p>

      <div className="space-y-8 text-sm text-fd-foreground/90 leading-relaxed">
        <p>
          OPTX collaborates with academic and open-source research groups advancing the
          foundations of gaze tracking, augmented reality, and spatial computing. These are
          unofficial partnerships rooted in shared research interests and open-source contributions.
        </p>

        {/* JEO Research */}
        <section className="border border-fd-border rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-fd-border" style={{ background: "linear-gradient(135deg, rgba(255,105,0,0.06), transparent)" }}>
            <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold tracking-wider">
              JEO Research
            </h2>
            <p className="text-xs text-fd-muted-foreground mt-1">
              Jason Orlosky &mdash; Augusta University, School of Computer and Cyber Sciences
            </p>
          </div>

          <div className="px-5 py-4 space-y-4">
            <p>
              Innovative research at the intersection of <strong>AR, eye tracking, and computer
              vision</strong>. JEO Research builds software and DIY projects spanning virtual reality,
              computer vision, and artificial intelligence &mdash; with a mission to change the world
              through education and helping people understand each other.
            </p>

            <div>
              <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-semibold tracking-wider mb-2">
                Background
              </h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>B.S.</strong> Computer Engineering, Georgia Institute of Technology</li>
                <li>Technology Engineer in Healthcare IT</li>
                <li>Japanese Language studies, University of Georgia</li>
                <li><strong>PhD</strong> and Researcher, Osaka University</li>
                <li><strong>Professor</strong>, Augusta University</li>
              </ul>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-semibold tracking-wider mb-2">
                Links
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "YouTube", href: "https://www.youtube.com/@jeoresearch" },
                  { label: "GitHub", href: "https://github.com/JEOresearch" },
                  { label: "Lab Homepage", href: "https://jeoresearch.com/ccslab" },
                  { label: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&user=QLSRDi8AAAAJ" },
                  { label: "Discord", href: "https://discord.gg/tqUzmrcJTy" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-md border border-fd-border hover:border-orange-400/30 hover:bg-orange-400/5 transition-all text-xs"
                  >
                    <span className="text-orange-400">&rarr;</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-semibold tracking-wider mb-2">
                Relevance to OPTX
              </h3>
              <p>
                JEO Research&apos;s work on real-time gaze extraction, AR overlay systems, and computer
                vision pipelines directly informs the OPTX gaze biometric stack &mdash; from MediaPipe
                iris tracking in the browser to on-device inference on NVIDIA Jetson edge devices and other agentic GPUs.
              </p>
            </div>
          </div>
        </section>

        {/* CBDS — Knight Campus */}
        <section className="border border-fd-border rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-fd-border" style={{ background: "linear-gradient(135deg, rgba(255,105,0,0.06), transparent)" }}>
            <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold tracking-wider">
              Center for Biomedical Data Science
            </h2>
            <p className="text-xs text-fd-muted-foreground mt-1">
              Knight Campus &mdash; University of Oregon &amp; Oregon Health &amp; Science University
            </p>
          </div>

          <div className="px-5 py-4 space-y-4">
            <p>
              A collaborative research center applying <strong>machine learning, AI, and big data</strong> to
              detect and treat diseases earlier and more effectively. CBDS bridges biomedical research
              across UO and OHSU &mdash; spanning genetic data analysis, medical imaging, cancer
              research, and immunotherapy.
            </p>

            <div>
              <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-semibold tracking-wider mb-2">
                Leadership
              </h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Bill Cresko</strong> &mdash; UO Director</li>
                <li><strong>Sadik Esener</strong> &mdash; OHSU Interim Director</li>
              </ul>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-semibold tracking-wider mb-2">
                Links
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "CBDS Homepage", href: "https://knightcampus.uoregon.edu/cbds" },
                  { label: "Research & Funding", href: "https://knightcampus.uoregon.edu/biomedical-data-science/research" },
                  { label: "Team", href: "https://knightcampus.uoregon.edu/biomedical-data-science/team" },
                  { label: "Knight Campus", href: "https://knightcampus.uoregon.edu" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-md border border-fd-border hover:border-orange-400/30 hover:bg-orange-400/5 transition-all text-xs"
                  >
                    <span className="text-orange-400">&rarr;</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-semibold tracking-wider mb-2">
                Relevance to OPTX
              </h3>
              <p>
                CBDS&apos;s expertise in biomedical ML pipelines and large-scale data science aligns with
                OPTX gaze biometric processing &mdash; particularly real-time signal classification,
                neural pattern recognition, and privacy-preserving inference on edge hardware.
              </p>
            </div>
          </div>
        </section>

        {/* Placeholder for future partners */}
        <section className="border border-fd-border/50 border-dashed rounded-lg px-5 py-6 text-center">
          <p className="text-fd-muted-foreground/50 text-xs">
            Additional research partners will be announced as the OPTX ecosystem grows.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-fd-border text-xs text-fd-muted-foreground/50">
        &copy; 2026 Jett Optics &mdash; MIT Licensed
      </div>
    </main>
  );
}
