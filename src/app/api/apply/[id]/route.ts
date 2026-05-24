import { NextRequest } from 'next/server'
import { tasks } from '@trigger.dev/sdk/v3'
import { db } from '@/lib/db'
import type { runHermesAutoApply } from '@/../trigger/apply'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const userId = process.env.SEED_USER_ID!

  const [job, user] = await Promise.all([
    db.job.findUnique({ where: { id } }),
    db.user.findUnique({ where: { id: userId } }),
  ])

  if (!job) return Response.json({ error: 'Job not found' }, { status: 404 })
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 })

  // Build the candidate JSON Hermes will use
  const candidateJson = {
    name: user.name,
    email: user.email,
    resumeText: user.resumeText,
    jobUrl: job.url,
    jobTitle: job.title,
    company: job.company,
  }

  const handle = await tasks.trigger<typeof runHermesAutoApply>('hermes-workday-apply', {
    jobId: id,
    candidateJson,
  })

  return Response.json({ runId: handle.id })
}
