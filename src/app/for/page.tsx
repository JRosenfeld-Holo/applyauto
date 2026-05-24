import type { Metadata } from "next";
import Link from "next/link";
import { rolePages } from "@/lib/seo-data";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Automated Job Applications by Role | ApplyAuto",
  description:
    "ApplyAuto automatically applies to jobs and contacts hiring managers — built for software engineers, product managers, data scientists, designers, and marketing managers.",
  alternates: { canonical: "https://applyauto.ai/for" },
  openGraph: {
    type: "website",
    url: "https://applyauto.ai/for",
    title: "Automated Job Applications by Role | ApplyAuto",
    description:
      "ApplyAuto automatically applies to jobs and contacts hiring managers — built for software engineers, product managers, data scientists, designers, and marketing managers.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ApplyAuto" }],
  },
};

export default function ForPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#10d9a0] mb-3">
            Built for every role
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Stop applying to jobs manually.
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            ApplyAuto automates the full application workflow — ATS submission, hiring manager outreach, and follow-up — for any professional role.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {rolePages.map((role) => (
            <Link
              key={role.slug}
              href={`/for/${role.slug}`}
              className="group flex items-start justify-between bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-6 transition-colors"
            >
              <div>
                <h2 className="font-semibold mb-2 group-hover:text-[#10d9a0] transition-colors">
                  {role.h1}
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
                  {role.painPoint}
                </p>
              </div>
              <ArrowRight size={16} className="text-zinc-600 group-hover:text-zinc-300 mt-0.5 ml-4 shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-zinc-800 px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <span>© 2026 ApplyAuto. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/blog" className="hover:text-zinc-400 transition-colors">Blog</Link>
            <Link href="/guides/how-to-automate-job-applications" className="hover:text-zinc-400 transition-colors">Guides</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
