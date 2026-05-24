import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-data";
import { ArrowRight, Clock, ChevronRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const url = `https://applyauto.ai/blog/${slug}`;
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.metaDescription,
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);
  const fallbackRelated = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);
  const relatedPosts = related.length >= 2 ? related : fallbackRelated;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: post.updatedDate,
    author: {
      "@type": "Organization",
      name: "ApplyAuto",
      url: "https://applyauto.ai",
    },
    publisher: {
      "@type": "Organization",
      name: "ApplyAuto",
      url: "https://applyauto.ai",
      logo: { "@type": "ImageObject", url: "https://applyauto.ai/logo.webp" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://applyauto.ai/blog/${slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
        <SiteHeader />

        {/* Breadcrumb */}
        <div className="max-w-3xl mx-auto px-6 pt-8">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-zinc-400 truncate max-w-[240px]">{post.title}</span>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-6 pt-10 pb-20">
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[post.category] ?? "text-zinc-400 bg-zinc-800 border-zinc-700"}`}
              >
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <Clock size={12} />
                {post.readTime} min read
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-5">
              {post.h1}
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed mb-6">
              {post.excerpt}
            </p>

            <div className="pt-5 border-t border-zinc-800 flex items-center gap-6 text-xs text-zinc-500">
              <span>By ApplyAuto</span>
              <span>·</span>
              <span>Published {formatDate(post.publishDate)}</span>
              {post.updatedDate !== post.publishDate && (
                <>
                  <span>·</span>
                  <span>Updated {formatDate(post.updatedDate)}</span>
                </>
              )}
            </div>
          </header>

          {/* Body */}
          <div className="space-y-8 text-zinc-300 leading-relaxed">
            {post.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="text-xl font-semibold text-white mb-3 mt-10">
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-4">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ApplyAuto CTA */}
          <div className="mt-14 bg-zinc-900 border border-zinc-700 rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-2">Let ApplyAuto handle this automatically</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Upload your resume once. ApplyAuto applies to matching roles, fills ATS forms, and sends the hiring manager a personalized note — every day, without you opening a browser tab.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                "Up to 20 applications per day",
                "Direct company ATS submission — not Easy Apply",
                "Hiring manager outreach included",
                "18.4% average interview rate",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <Check size={14} className="text-[#10d9a0] mt-0.5 shrink-0" />
                  <span className="text-sm text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              Start free <ArrowRight size={14} />
            </Link>
          </div>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-zinc-800 bg-zinc-950">
            <div className="max-w-3xl mx-auto px-6 py-14">
              <h2 className="text-base font-semibold mb-6">More from the blog</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl p-5 transition-colors group"
                  >
                    <p className="text-xs text-zinc-500 mb-2">{p.category}</p>
                    <h3 className="text-sm font-medium leading-snug group-hover:text-[#06b6d4] transition-colors">
                      {p.h1}
                    </h3>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/blog" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  ← All posts
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-zinc-800 px-6 py-8">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
            <span>© 2026 ApplyAuto. All rights reserved.</span>
            <div className="flex gap-6">
              <Link href="/blog" className="hover:text-zinc-400 transition-colors">Blog</Link>
              <Link href="/for/software-engineers" className="hover:text-zinc-400 transition-colors">For engineers</Link>
              <Link href="/for/product-managers" className="hover:text-zinc-400 transition-colors">For PMs</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
