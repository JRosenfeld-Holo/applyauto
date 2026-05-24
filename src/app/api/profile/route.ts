import { NextRequest } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, resumeText, dailyLimits } = body

  const userId = process.env.SEED_USER_ID!

  const user = await db.user.upsert({
    where: { id: userId },
    create: {
      id: userId,
      email: email ?? 'user@example.com',
      name,
      resumeText,
      dailyLimits: dailyLimits ?? 20,
    },
    update: {
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
      ...(resumeText !== undefined && { resumeText }),
      ...(dailyLimits !== undefined && { dailyLimits }),
    },
  })

  return Response.json(user)
}

export async function GET() {
  const userId = process.env.SEED_USER_ID!
  const user = await db.user.findUnique({ where: { id: userId } })
  return Response.json(user ?? null)
}
