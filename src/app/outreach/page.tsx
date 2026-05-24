import Link from 'next/link'
import { db } from '@/lib/db'
import { SequenceTimeline } from '@/components/sequence-timeline'

export const dynamic = 'force-dynamic'

async function getSequences() {
  const userId = process.env.SEED_USER_ID!
  return db.outreachSequence.findMany({
    where: { userId },
    include: {
      contact: { include: { job: { select: { title: true, company: true } } } },
      steps: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })
}

const SEQ_STATUS_COLORS: Record<string, string> = {
  PENDING: 'text-slate-400 bg-slate-800',
  ACTIVE: 'text-[#bffd11] bg-[#bffd11]/10',
  PAUSED: 'text-yellow-400 bg-yellow-900/20',
  COMPLETED: 'text-emerald-400 bg-emerald-900/20',
  REPLIED: 'text-purple-400 bg-purple-900/20',
}

export default async function OutreachPage() {
  const sequences = await getSequences()

  const stats = {
    active: sequences.filter((s) => s.status === 'ACTIVE').length,
    replied: sequences.filter((s) => s.status === 'REPLIED').length,
    total: sequences.length,
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <nav className="border-b border-slate-800 px-8 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="font-bricolage text-xl font-bold tracking-tight">
          Apply<span className="text-[#10d9a0]">Auto</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/jobs" className="hover:text-white transition-colors">Jobs</Link>
          <Link href="/outreach" className="text-white">Outreach</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="font-bricolage text-2xl font-bold mb-1">Outreach Sequences</h1>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>{stats.total} total</span>
            <span className="text-[#bffd11]">{stats.active} active</span>
            <span className="text-purple-400">{stats.replied} replied</span>
          </div>
        </div>

        {sequences.length === 0 ? (
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-16 text-center">
            <div className="text-5xl mb-4">📬</div>
            <h2 className="font-semibold text-lg mb-2">No sequences yet</h2>
            <p className="text-slate-400 text-sm mb-6">
              Evaluate jobs and launch outreach to start generating sequences.
            </p>
            <Link
              href="/jobs"
              className="bg-[#bffd11] text-slate-900 font-bold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Go to Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sequences.map((seq) => (
              <div
                key={seq.id}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-semibold text-white">{seq.contact.name}</div>
                    <div className="text-sm text-slate-400">
                      {seq.contact.title} · {seq.contact.job.company} —{' '}
                      <span className="italic">{seq.contact.job.title}</span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${SEQ_STATUS_COLORS[seq.status] ?? 'text-slate-400'}`}
                  >
                    {seq.status}
                  </span>
                </div>
                <SequenceTimeline steps={seq.steps} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
