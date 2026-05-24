import Link from 'next/link'
import { db } from '@/lib/db'
import { JobRow } from '@/components/job-row'

export const dynamic = 'force-dynamic'

async function getJobs() {
  const userId = process.env.SEED_USER_ID!
  return db.job.findMany({
    where: { userId },
    include: { contacts: { select: { id: true, name: true, type: true } } },
    orderBy: [{ matchScore: 'desc' }, { createdAt: 'desc' }],
    take: 100,
  })
}

export default async function JobsPage() {
  const jobs = await getJobs()

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <nav className="border-b border-slate-800 px-8 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="font-bricolage text-xl font-bold tracking-tight">
          Apply<span className="text-[#10d9a0]">Auto</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/jobs" className="text-white">Jobs</Link>
          <Link href="/outreach" className="hover:text-white transition-colors">Outreach</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-bricolage text-2xl font-bold">Job Pipeline</h1>
            <p className="text-slate-400 text-sm mt-0.5">{jobs.length} jobs in your pipeline</p>
          </div>
          <Link
            href="/targeting"
            className="bg-[#bffd11] text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            + Scrape More Jobs
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-16 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="font-semibold text-lg mb-2">No jobs yet</h2>
            <p className="text-slate-400 text-sm mb-6">
              Set up your targeting parameters and trigger a LinkedIn scrape to get started.
            </p>
            <Link
              href="/targeting"
              className="bg-[#bffd11] text-slate-900 font-bold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Initialize Engine
            </Link>
          </div>
        ) : (
          <div className="bg-slate-800/20 border border-slate-700/50 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50 text-xs text-slate-500 uppercase tracking-wider">
                  <th className="text-left px-6 py-3 font-medium">Job</th>
                  <th className="text-left px-6 py-3 font-medium">Match</th>
                  <th className="text-left px-6 py-3 font-medium">Status</th>
                  <th className="text-left px-6 py-3 font-medium">Contacts</th>
                  <th className="text-left px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <JobRow key={job.id} job={job} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
