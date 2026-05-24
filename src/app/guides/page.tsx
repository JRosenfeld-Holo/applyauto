import type { Metadata } from "next";
import Link from "next/link";
import { guidePages } from "@/lib/seo-data";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Job Search Automation Guides | ApplyAuto",
  description:
    "Step-by-step guides on automating job applications, applying at scale, and finding LinkedIn Easy Apply alternatives that actually get responses.",
  alternates: { canonical: "https://applyauto.ai/guides" },
  openGraph: {
    type: "website",
    url: "https://applyauto.ai/guides",
    title: "Job Search Automation Guides | ApplyAuto",
    description:
      "Step-by-step guides on automating job applications, applying at scale, and finding LinkedIn Easy Apply alternatives that actually get responses.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ApplyAuto" }],
  },
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Apply<span className="text-[#10d9a0]">Auto</span>
          </Link>
          <Link
            href="/"
            className="text-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Start free
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] mb-3">
            Guides
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            How to run a faster job search
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Practical guides on automating applications, reaching hiring managers, and getting more interviews without spending more time.
          </p>
        </div>

        <div className="space-y-4">
          {guidePages.map((guide, i) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex items-start gap-5 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-6 transition-colors"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-semibold text-zinc-500 mt-0.5">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold mb-1.5 group-hover:text-[#2563eb] transition-colors">
                  {guide.h1}
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
                  {guide.intro}
                </p>
              </div>
              <ArrowRight size={16} className="text-zinc-600 group-hover:text-zinc-300 mt-0.5 shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-zinc-800 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <span>© 2026 ApplyAuto. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/blog" className="hover:text-zinc-400 transition-colors">Blog</Link>
            <Link href="/for/software-engineers" className="hover:text-zinc-400 transition-colors">For engineers</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
