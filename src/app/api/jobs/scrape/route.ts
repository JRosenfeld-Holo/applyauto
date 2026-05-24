import { NextRequest } from 'next/server'
import { tasks } from '@trigger.dev/sdk/v3'
import type { scrapeJobs } from '@/../trigger/scrape'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { searchQuery, location, maxResults } = body

  if (!searchQuery) {
    return Response.json({ error: 'searchQuery is required' }, { status: 400 })
  }

  const userId = process.env.SEED_USER_ID!

  const handle = await tasks.trigger<typeof scrapeJobs>('scrape-jobs', {
    userId,
    searchQuery,
    location: location ?? 'United States',
    maxResults: maxResults ?? 50,
  })

  return Response.json({ runId: handle.id })
}
