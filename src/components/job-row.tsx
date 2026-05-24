'use client'

import { useState } from 'react'
import { JobStatus } from '@prisma/client'

interface Job {
  id: string
  title: string
  company: string
  matchScore: number | null
  status: JobStatus
  url: string
  contacts: { id: string; name: string; type: string }[]
}

const STATUS_COLORS: Record<JobStatus, string> = {
  SCRAPED: 'text-slate-400 bg-slate-800',
  EVALUATED: 'text-blue-300 bg-blue-900/30',
  OUTREACH_ACTIVE: 'text-[#bffd11] bg-[#bffd11]/10',
  APPLIED: 'text-emerald-400 bg-emerald-900/30',
  REJECTED: 'text-red-400 bg-red-900/30',
}

export function JobRow({ job }: { job: Job }) {
  const [loading, setLoading] = useState<string | null>(null)

  const action = async (endpoint: string, label: string) => {
    setLoading(label)
    try {
      await fetch(endpoint, { method: 'POST' })
    } finally {
      setLoading(null)
    }
  }

  return (
    <tr className="border-t border-slate-800 hover:bg-slate-800/30 transition-colors">
      <td className="py-4 px-6">
        <div className="font-medium text-white">{job.title}</div>
        <div className="text-sm text-slate-400">{job.company}</div>
      </td>
      <td className="py-4 px-6">
        {job.matchScore !== null ? (
          <span
            className={`font-bold ${job.matchScore >= 80 ? 'text-[#bffd11]' : job.matchScore >= 60 ? 'text-yellow-400' : 'text-slate-400'}`}
          >
            {job.matchScore}%
          </span>
        ) : (
          <span className="text-slate-600">—</span>
        )}
      </td>
      <td className="py-4 px-6">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[job.status]}`}>
          {job.status.replace('_', ' ')}
        </span>
      </td>
      <td className="py-4 px-6 text-sm text-slate-400">{job.contacts.length}</td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          {job.status === 'SCRAPED' && (
            <button
              onClick={() => action(`/api/jobs/${job.id}/evaluate`, 'evaluate')}
              disabled={loading === 'evaluate'}
              className="text-xs px-3 py-1.5 rounded-lg bg-blue-900/40 text-blue-300 hover:bg-blue-800/50 transition-colors disabled:opacity-50"
            >
              {loading === 'evaluate' ? 'Evaluating…' : 'Evaluate'}
            </button>
          )}
          {job.status === 'EVALUATED' && (
            <button
              onClick={() => action(`/api/jobs/${job.id}/outreach`, 'outreach')}
              disabled={loading === 'outreach'}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#bffd11]/10 text-[#bffd11] hover:bg-[#bffd11]/20 transition-colors disabled:opacity-50"
            >
              {loading === 'outreach' ? 'Launching…' : 'Launch Outreach'}
            </button>
          )}
          {(job.status === 'EVALUATED' || job.status === 'OUTREACH_ACTIVE') && (
            <button
              onClick={() => action(`/api/apply/${job.id}`, 'apply')}
              disabled={loading === 'apply'}
              className="text-xs px-3 py-1.5 rounded-lg bg-emerald-900/40 text-emerald-400 hover:bg-emerald-800/50 transition-colors disabled:opacity-50"
            >
              {loading === 'apply' ? 'Applying…' : 'Auto-Apply'}
            </button>
          )}
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
          >
            View
          </a>
        </div>
      </td>
    </tr>
  )
}
