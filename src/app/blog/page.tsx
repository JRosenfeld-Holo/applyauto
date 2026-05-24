import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, blogCategories } from "@/lib/blog-data";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Job Search Tips & Automation Guides",
  description:
    "Practical guides on automating your job search, getting past ATS filters, contacting hiring managers, and landing more interviews faster.",
  alternates: { canonical: "https://applyauto.ai/blog" },
  openGraph: {
    type: "website",
    url: "https://applyauto.ai/blog",
    title: "Job Search Tips & Automation Guides | ApplyAuto",
    description:
      "Practical guides on automating your job search, getting past ATS filters, contacting hiring managers, and landing more interviews faster.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const categoryColors: Record<string, string> = {
  "Job Search Strategy": "text-[#06b6d4] bg-[#06b6d4]/10 border-[#06b6d4]/20",
  "ATS & Applications": "text-[#2563eb] bg-[#2563eb]/10 border-[#2563eb]/20",
  "Hiring Manager Outreach": "text-[#10d9a0] bg-[#10d9a0]/10 border-[#10d9a0]/20",
  "Automation": "text-violet-400 bg-violet-400/10 border-violet-400/20",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const featured = blogPosts[0];
const rest = blogPosts.slice(1);

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#06b6d4] mb-3">
            Blog
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Job search guides that actually help
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            How to get past ATS filters, reach hiring managers, and run a faster job search — with or without automation.
          </p>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="block group mb-12 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-8 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <span
              className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[featured.category] ?? "text-zinc-400 bg-zinc-800 border-zinc-700"}`}
            >
              {featured.category}
            </span>
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <span>{formatDate(featured.publishDate)}</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {featured.readTime} min read
              </span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold leading-snug mb-3 group-hover:text-[#06b6d4] transition-colors">
            {featured.h1}
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">{featured.excerpt}</p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#06b6d4]">
            Read article <ArrowRight size={14} />
          </span>
        </Link>

        {/* Category filter labels */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs text-zinc-500 self-center mr-1">Browse by topic:</span>
          {blogCategories.map((cat) => (
            <span
              key={cat}
              className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[cat] ?? "text-zinc-400 bg-zinc-800 border-zinc-700"}`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Post grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl p-6 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${categoryColors[post.category] ?? "text-zinc-400 bg-zinc-800 border-zinc-700"}`}
                >
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-zinc-500 shrink-0">
                  <Clock size={11} />
                  {post.readTime} min
                </span>
              </div>
              <h2 className="font-semibold leading-snug mb-2 group-hover:text-[#06b6d4] transition-colors flex-1">
                {post.h1}
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <span className="text-[11px] text-zinc-600">
                {formatDate(post.publishDate)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA strip */}
      <div className="border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-semibold mb-1">Done reading. Ready to automate?</p>
            <p className="text-sm text-zinc-400">Upload your resume once and ApplyAuto handles the rest.</p>
          </div>
          <Link
            href="/"
            className="shrink-0 inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Start free <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <span>© 2026 ApplyAuto. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/guides/how-to-automate-job-applications" className="hover:text-zinc-400 transition-colors">Guides</Link>
            <Link href="/for/software-engineers" className="hover:text-zinc-400 transition-colors">For engineers</Link>
            <Link href="/for/product-managers" className="hover:text-zinc-400 transition-colors">For PMs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
