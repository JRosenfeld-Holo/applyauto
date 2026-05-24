import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | ApplyAuto",
  description: "ApplyAuto terms of service — the rules for using our job application automation platform.",
  alternates: { canonical: "https://applyauto.ai/terms" },
};

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: May 2026</p>

        <div className="space-y-10 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Using ApplyAuto</h2>
            <p>
              ApplyAuto provides an automated job application service. By using the platform, you authorize ApplyAuto to submit job applications to third-party job boards and company career portals on your behalf, using the resume and preferences you provide.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Your responsibilities</h2>
            <p>
              You are responsible for ensuring that your resume is accurate and that the information you provide to ApplyAuto is truthful. Submitting false information in job applications is prohibited. You must not use ApplyAuto to apply to roles you are not qualified for, or to circumvent hiring processes in bad faith.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Acceptable use</h2>
            <p>
              ApplyAuto may not be used to spam employers, submit bulk applications with no intent to interview, or otherwise abuse the job application systems of third-party platforms. We reserve the right to suspend accounts that abuse these systems.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Service availability</h2>
            <p>
              We aim for high availability but do not guarantee uninterrupted service. Job boards change their systems frequently — when they do, some automations may be temporarily unavailable while we update. We will communicate outages that affect your application flow.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Cancellation</h2>
            <p>
              You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. We do not offer prorated refunds for partial months.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p>
              Questions about these terms? Email us at{" "}
              <a href="mailto:legal@applyauto.ai" className="text-[#10d9a0] hover:underline">
                legal@applyauto.ai
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
