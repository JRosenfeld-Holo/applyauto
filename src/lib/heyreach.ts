const HEYREACH_BASE = 'https://api.heyreach.io/api/public'

export type HeyReachSequenceNode =
  | { nodeType: 'VIEW_PROFILE'; delay: number }
  | { nodeType: 'CONNECTION_REQUEST'; delay: number; payload: { message: string } }
  | { nodeType: 'MESSAGE'; delay: number; payload: { message: string } }

export interface CreateCampaignInput {
  campaignName: string
  linkedInAccountIds: string[]
  sequence: HeyReachSequenceNode[]
}

async function heyreach<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${HEYREACH_BASE}${path}`, {
    method: 'POST',
    headers: {
      'X-API-KEY': process.env.HEYREACH_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`HeyReach ${path} ${res.status}: ${text}`)
  }
  return res.json() as Promise<T>
}

export async function createCampaign(input: CreateCampaignInput) {
  return heyreach<{ campaignId: string }>('/campaigns', {
    campaignName: input.campaignName,
    linkedInAccountIds: input.linkedInAccountIds,
    schedule: {
      dailyStartTime: '09:00:00',
      dailyEndTime: '17:00:00',
      timezone: 'America/Chicago',
    },
    sequence: input.sequence,
  })
}

export async function addLeadToCampaign(campaignId: string, linkedinUrl: string) {
  return heyreach<{ success: boolean }>('/campaigns/addLeadsToCampaign', {
    campaignId,
    leads: [{ linkedin_url: linkedinUrl }],
  })
}
