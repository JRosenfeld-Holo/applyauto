import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { JobStatus } from '@prisma/client'

export async function GET(request: NextRequest) {
  const userId = process.env.SEED_USER_ID!
  const status = request.nextUrl.searchParams.get('status') as JobStatus | null

  const jobs = await db.job.findMany({
    where: {
      userId,
      ...(status ? { status } : {}),
    },
    include: { contacts: true },
    orderBy: [{ matchScore: 'desc' }, { createdAt: 'desc' }],
    take: 100,
  })

  return Response.json(jobs)
}
