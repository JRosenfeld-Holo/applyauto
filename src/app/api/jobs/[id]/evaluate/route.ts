import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { evaluateJob } from '@/lib/agents/evaluator'
import { JobStatus } from '@prisma/client'

export async function POST(
  _request: NextRequest,
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
  if (!user.resumeText) {
    return Response.json({ error: 'No resume text found. Please complete your profile.' }, { status: 422 })
  }

  const evaluation = await evaluateJob(job, user)

  await db.job.update({
    where: { id },
    data: {
      matchScore: evaluation.matchScore,
      status: JobStatus.EVALUATED,
    },
  })

  return Response.json(evaluation)
}
