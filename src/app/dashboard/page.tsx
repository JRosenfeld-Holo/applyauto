export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { db } from '@/lib/db'
import { StatCard } from '@/components/stat-card'
import { JobStatus } from '@prisma/client'

async function getStats() {
  const userId = process.env.SEED_USER_ID!
  const jobs = await db.job.groupBy({
    by: ['status'],
    where: { userId },
    _count: true,
  })

  const counts: Record<string, number> = {}
  for (const row of jobs) {
    counts[row.status] = row._count
  }

  const total = Object.values(counts).reduce((s, n) => s + n, 0)
  return { counts, total }
}

async function getRecentJobs() {
  const userId = process.env.SEED_USER_ID!
  return db.job.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, title: true, company: true, matchScore: true, status: true },
  })
}

export default async function DashboardPage() {
  const [{ counts, total }, recentJobs] = await Promise.all([getStats(), getRecentJobs()])

  const navLinks = [
    { href: '/jobs', label: 'Jobs' },
    { href: '/outreach', label: 'Outreach' },
    { href: '/validate', label: 'Profile' },
    { href: '/targeting', label: 'Targeting' },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Navbar */}
      <nav className="border-b border-slate-800 px-8 py-4 flex items-center justify-between">
        <Link href="/" className="font-bricolage text-xl font-bold tracking-tight">
          Apply<span className="text-[#10d9a0]">Auto</span>
        </Link>
        <div className="flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="mb-10">
          <h1 className="font-bricolage text-3xl font-bold mb-1">Mission Control</h1>
          <p className="text-slate-400">Your autonomous job search pipeline</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          <StatCard label="Total Jobs" count={total} />
          <StatCard label="Scraped" count={counts[JobStatus.SCRAPED] ?? 0} />
          <StatCard label="Evaluated" count={counts[JobStatus.EVALUATED] ?? 0} />
          <StatCard label="Outreach Active" count={counts[JobStatus.OUTREACH_ACTIVE] ?? 0} accent />
          <StatCard label="Applied" count={counts[JobStatus.APPLIED] ?? 0} accent />
        </div>

        {/* Recent jobs */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-slate-400">Recent Jobs</h2>
            <Link href="/jobs" className="text-xs text-[#bffd11] hover:underline">
              View all →
            </Link>
          </div>
          {recentJobs.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-500">
              No jobs yet.{' '}
              <Link href="/jobs" className="text-[#bffd11] hover:underline">
                Trigger a scrape →
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <tbody>
                {recentJobs.map((job) => (
                  <tr key={job.id} className="border-t border-slate-800 px-6 py-4 hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-3 font-medium">{job.title}</td>
                    <td className="px-6 py-3 text-slate-400">{job.company}</td>
                    <td className="px-6 py-3">
                      {job.matchScore !== null ? (
                        <span className={`font-bold ${job.matchScore >= 80 ? 'text-[#bffd11]' : 'text-slate-400'}`}>
                          {job.matchScore}%
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                        {job.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Link
            href="/jobs"
            className="border border-slate-700 rounded-xl p-5 hover:border-[#bffd11]/50 hover:bg-[#bffd11]/5 transition-all group"
          >
            <div className="text-[#bffd11] text-2xl mb-2">⚡</div>
            <div className="font-semibold text-sm">Scrape Jobs</div>
            <div className="text-xs text-slate-500 mt-0.5">Pull from LinkedIn</div>
          </Link>
          <Link
            href="/validate"
            className="border border-slate-700 rounded-xl p-5 hover:border-slate-600 hover:bg-slate-800/30 transition-all"
          >
            <div className="text-slate-300 text-2xl mb-2">📄</div>
            <div className="font-semibold text-sm">Update Resume</div>
            <div className="text-xs text-slate-500 mt-0.5">Edit candidate profile</div>
          </Link>
          <Link
            href="/targeting"
            className="border border-slate-700 rounded-xl p-5 hover:border-slate-600 hover:bg-slate-800/30 transition-all"
          >
            <div className="text-slate-300 text-2xl mb-2">🎯</div>
            <div className="font-semibold text-sm">Targeting Matrix</div>
            <div className="text-xs text-slate-500 mt-0.5">Configure search params</div>
          </Link>
          <Link
            href="/outreach"
            className="border border-slate-700 rounded-xl p-5 hover:border-slate-600 hover:bg-slate-800/30 transition-all"
          >
            <div className="text-slate-300 text-2xl mb-2">📬</div>
            <div className="font-semibold text-sm">Outreach</div>
            <div className="text-xs text-slate-500 mt-0.5">Active sequences</div>
          </Link>
        </div>
      </main>
    </div>
  )
}
