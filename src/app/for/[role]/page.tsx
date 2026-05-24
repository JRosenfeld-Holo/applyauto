import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getRoleBySlug, rolePages } from "@/lib/seo-data";
import { ArrowRight, Check, Zap, Mail, TrendingUp } from "lucide-react";

export async function generateStaticParams() {
  return rolePages.map((r) => ({ role: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await params;
  const data = getRoleBySlug(role);
  if (!data) return {};

  const url = `https://applyauto.ai/for/${role}`;
  return {
    title: data.title,
    description: data.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
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

export default async function RolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const data = getRoleBySlug(role);
  if (!data) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ApplyAuto",
    applicationCategory: "BusinessApplication",
    description: data.metaDescription,
    url: `https://applyauto.ai/for/${role}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free to start",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "312",
    },
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
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Apply<span className="text-[#10d9a0]">Auto</span>
            </Link>
            <Link
              href="/#pricing"
              className="text-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Start free
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-full px-3 py-1 text-xs text-zinc-400 mb-6">
              <Zap size={12} className="text-[#10d9a0]" />
              <span>18.4% average interview rate</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-6">
              {data.h1}
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-2xl">
              {data.painPoint}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Start free <ArrowRight size={16} />
              </Link>
              <Link
                href="/#demo"
                className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 font-medium px-6 py-3 rounded-lg transition-colors"
              >
                See how it works
              </Link>
            </div>
          </div>
        </section>

        {/* Stat callout */}
        <section className="border-y border-zinc-800 bg-zinc-950">
          <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="flex items-start gap-4">
              <TrendingUp size={24} className="text-[#10d9a0] mt-0.5 shrink-0" />
              <p className="text-zinc-300 leading-relaxed">{data.stat}</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold mb-12">How ApplyAuto works for {role.replace(/-/g, " ")}</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp size={20} className="text-[#2563eb]" />,
                title: "Set your target roles",
                body: `Tell ApplyAuto which ${role.replace(/-/g, " ")} roles you want. Seniority, location, remote preference, company size — set it once.`,
              },
              {
                icon: <Zap size={20} className="text-[#06b6d4]" />,
                title: "ApplyAuto applies automatically",
                body: `Applications go out to ${data.jobBoards.slice(0, 3).join(", ")}, and the company's own career portal — not just Easy Apply. Up to 20 per day.`,
              },
              {
                icon: <Mail size={20} className="text-[#10d9a0]" />,
                title: "Hiring manager outreach included",
                body: "For every role you apply to, ApplyAuto identifies the relevant hiring manager and sends a short, targeted message on your behalf.",
              },
            ].map((step, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="mb-4">{step.icon}</div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Job boards */}
        <section className="bg-zinc-950 border-y border-zinc-800">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-xl font-bold mb-2">Applies across every major job board</h2>
            <p className="text-zinc-400 text-sm mb-8">
              ApplyAuto handles the ATS forms so you don't have to enter the same information over and over.
            </p>
            <div className="flex flex-wrap gap-3">
              {data.jobBoards.map((board) => (
                <span
                  key={board}
                  className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm px-4 py-2 rounded-lg"
                >
                  {board}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Top companies */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold mb-2">
            Users are landing interviews at companies like these
          </h2>
          <p className="text-zinc-400 text-sm mb-8">
            ApplyAuto users applying to {role.replace(/-/g, " ")} roles have reported interviews at:
          </p>
          <div className="flex flex-wrap gap-3">
            {data.topCompanies.map((co) => (
              <span
                key={co}
                className="bg-zinc-900 border border-zinc-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
              >
                {co}
              </span>
            ))}
          </div>
        </section>

        {/* Benefits list */}
        <section className="bg-zinc-950 border-y border-zinc-800">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                `Applies to up to ${data.avgApplications} ${role.replace(/-/g, " ")} roles per day`,
                "Submits to company career portals, not just Easy Apply",
                "Contacts the hiring manager directly after each application",
                "Tracks every application in one dashboard",
                "No manual ATS form entry — ever",
                "Start free, no credit card required",
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <Check size={16} className="text-[#10d9a0] mt-0.5 shrink-0" />
                  <span className="text-sm text-zinc-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stop doing this manually.
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Upload your resume once. ApplyAuto handles the applications and the hiring manager outreach. You handle the interviews.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Start free <ArrowRight size={18} />
          </Link>
          <p className="text-xs text-zinc-600 mt-4">No credit card required.</p>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800 px-6 py-8">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
            <span>© 2026 ApplyAuto. All rights reserved.</span>
            <div className="flex gap-6">
              <Link href="/for/software-engineers" className="hover:text-zinc-400 transition-colors">Software Engineers</Link>
              <Link href="/for/product-managers" className="hover:text-zinc-400 transition-colors">Product Managers</Link>
              <Link href="/for/designers" className="hover:text-zinc-400 transition-colors">Designers</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
