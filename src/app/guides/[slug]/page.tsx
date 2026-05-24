import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getGuideBySlug, guidePages } from "@/lib/seo-data";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  return guidePages.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getGuideBySlug(slug);
  if (!data) return {};

  const url = `https://applyauto.ai/guides/${slug}`;
  return {
    title: data.title,
    description: data.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: data.title,
      description: data.metaDescription,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getGuideBySlug(slug);
  if (!data) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        name: data.h1,
        description: data.metaDescription,
        step: data.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.heading,
          text: s.body,
        })),
      },
      {
        "@type": "Article",
        headline: data.title,
        description: data.metaDescription,
        publisher: {
          "@type": "Organization",
          name: "ApplyAuto",
          url: "https://applyauto.ai",
        },
        url: `https://applyauto.ai/guides/${slug}`,
        dateModified: new Date().toISOString().split("T")[0],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
        {/* Nav */}
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

        {/* Breadcrumb */}
        <div className="max-w-3xl mx-auto px-6 pt-8">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/guides" className="hover:text-zinc-300 transition-colors">Guides</Link>
            <ChevronRight size={12} />
            <span className="text-zinc-400">{data.title}</span>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-6 pt-10 pb-20">
          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-6">
              {data.h1}
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              {data.intro}
            </p>
            <div className="mt-6 pt-6 border-t border-zinc-800 flex items-center gap-6 text-xs text-zinc-500">
              <span>By ApplyAuto</span>
              <span>·</span>
              <span>Last updated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
            </div>
          </header>

          {/* Steps */}
          <div className="space-y-12">
            {data.steps.map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="shrink-0 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-sm font-semibold text-zinc-400 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">{step.heading}</h2>
                  <p className="text-zinc-400 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tool callout */}
          <div className="mt-16 bg-zinc-900 border border-zinc-700 rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-2">ApplyAuto handles all of this automatically</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Upload your resume once. ApplyAuto applies to matching roles, fills out ATS forms, and contacts the hiring manager — without you touching a form.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                "Up to 20 applications per day",
                "LinkedIn, Indeed, Greenhouse, Lever, Workday",
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

        {/* Related guides */}
        <section className="border-t border-zinc-800 bg-zinc-950">
          <div className="max-w-3xl mx-auto px-6 py-16">
            <h2 className="text-lg font-semibold mb-6">Related guides</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {guidePages
                .filter((g) => g.slug !== slug)
                .map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="block bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl p-4 transition-colors"
                  >
                    <h3 className="text-sm font-medium leading-snug mb-1">{guide.h1}</h3>
                    <span className="text-xs text-zinc-500">Read guide →</span>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800 px-6 py-8">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
            <span>© 2026 ApplyAuto. All rights reserved.</span>
            <div className="flex gap-6">
              <Link href="/for/software-engineers" className="hover:text-zinc-400 transition-colors">For engineers</Link>
              <Link href="/for/product-managers" className="hover:text-zinc-400 transition-colors">For PMs</Link>
              <Link href="/for/designers" className="hover:text-zinc-400 transition-colors">For designers</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
