import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | ApplyAuto",
  description: "ApplyAuto privacy policy — how we collect, use, and protect your data.",
  alternates: { canonical: "https://applyauto.ai/privacy" },
};

export default function PrivacyPage() {
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

      <main className="max-w-3xl mx-auto px-6 py-16 pb-24">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: May 2026</p>

        <div className="space-y-10 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">What we collect</h2>
            <p>
              ApplyAuto collects the information you provide when creating an account: your name, email address, and resume. We also collect job search preferences you configure, and usage data to improve the product.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">How we use it</h2>
            <p>
              Your resume and preferences are used exclusively to submit job applications on your behalf and to send hiring manager outreach messages. We do not sell your personal data. We do not share it with third parties except the job boards and company career portals you instruct us to apply to.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Data retention</h2>
            <p>
              We retain your account data for as long as your account is active. You can delete your account and all associated data at any time from your account settings. Upon deletion, your resume, application history, and outreach records are permanently removed within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Cookies</h2>
            <p>
              We use cookies for authentication and to maintain your session. We do not use third-party advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p>
              Questions about this policy? Email us at{" "}
              <a href="mailto:privacy@applyauto.ai" className="text-[#10d9a0] hover:underline">
                privacy@applyauto.ai
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-zinc-800 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <span>© 2026 ApplyAuto. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
