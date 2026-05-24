"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#simulator", label: "Live Demo" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faqs", label: "FAQs" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-4 z-50 w-full px-3 sm:px-6 md:px-10 mt-6">
      <header className="animate-slideDown bg-zinc-950 w-full max-w-7xl border border-zinc-50/10 rounded-3xl p-4 mx-auto">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.webp" alt="ApplyAuto" width={56} height={32} className="h-8 w-auto" priority />
            <span className="font-bricolage text-lg font-bold text-white tracking-tight">ApplyAuto</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-white transition-colors duration-200 font-medium hover:scale-105 inline-block"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/#onboarding" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Log In
            </Link>
            <Link
              href="/#onboarding"
              style={{
                alignItems: "center",
                backgroundImage: "linear-gradient(144deg,#2563eb,#06b6d4 50%,#10d9a0)",
                border: "0px",
                borderRadius: "8px",
                boxShadow: "rgba(37,99,235,0.25) 0px 15px 30px -5px",
                color: "#fff",
                display: "inline-flex",
                fontSize: "14px",
                justifyContent: "center",
                padding: "3px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                cursor: "pointer",
                height: "44px",
              }}
              onMouseOver={(e) => {
                const s = e.currentTarget.querySelector("span") as HTMLElement;
                if (s) s.style.background = "none";
              }}
              onMouseOut={(e) => {
                const s = e.currentTarget.querySelector("span") as HTMLElement;
                if (s) s.style.backgroundColor = "#050614";
              }}
            >
              <span
                style={{
                  backgroundColor: "#050614",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  fontWeight: 700,
                  fontSize: "13px",
                  transition: "background 0.2s ease",
                }}
              >
                Get Early Access
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 mt-4 pt-4 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block text-sm font-medium text-zinc-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
              <Link
                href="/#onboarding"
                className="text-center text-sm font-medium text-zinc-300 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/#onboarding"
                className="text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#10d9a0] text-sm font-bold text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Early Access
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
