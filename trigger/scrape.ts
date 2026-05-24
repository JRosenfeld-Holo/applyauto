import { task } from '@trigger.dev/sdk/v3'
import { db } from '@/lib/db'
import { JobStatus } from '@prisma/client'

interface ScrapeJobsPayload {
  userId: string
  searchQuery: string
  location: string
  maxResults?: number
}

interface ApifyJobResult {
  title: string
  company: string
  url: string
  description: string
}

export const scrapeJobs = task({
  id: 'scrape-jobs',
  maxDuration: 300,
  run: async (payload: ScrapeJobsPayload) => {
    const { userId, searchQuery, location, maxResults = 50 } = payload

    // Trigger the Apify LinkedIn Jobs Scraper actor
    const runRes = await fetch(
      `https://api.apify.com/v2/acts/curious_coder~linkedin-jobs-scraper/runs`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.APIFY_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          queries: searchQuery,
          location,
          maxResults,
          publishedAt: 'r604800', // past week
        }),
      }
    )

    if (!runRes.ok) throw new Error(`Apify run failed: ${runRes.status}`)
    const { data: run } = await runRes.json()

    // Poll until the run finishes
    let attempts = 0
    while (attempts < 30) {
      await new Promise((r) => setTimeout(r, 10000))
      const statusRes = await fetch(
        `https://api.apify.com/v2/actor-runs/${run.id}`,
        { headers: { Authorization: `Bearer ${process.env.APIFY_API_TOKEN}` } }
      )
      const { data: status } = await statusRes.json()
      if (status.status === 'SUCCEEDED') break
      if (status.status === 'FAILED') throw new Error('Apify run failed')
      attempts++
    }

    // Fetch dataset items
    const dataRes = await fetch(
      `https://api.apify.com/v2/actor-runs/${run.id}/dataset/items`,
      { headers: { Authorization: `Bearer ${process.env.APIFY_API_TOKEN}` } }
    )
    const items: ApifyJobResult[] = await dataRes.json()

    // Upsert jobs into DB
    let created = 0
    for (const item of items) {
      if (!item.url || !item.title || !item.company) continue
      await db.job.upsert({
        where: { url: item.url },
        create: {
          userId,
          title: item.title,
          company: item.company,
          url: item.url,
          description: item.description ?? '',
          status: JobStatus.SCRAPED,
        },
        update: {},
      })
      created++
    }

    return { created, total: items.length }
  },
})
