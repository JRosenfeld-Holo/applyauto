import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import type { Job, User, TargetContact } from '@prisma/client'
import type { Evaluation } from './evaluator'
import type { Strategy } from './strategist'

const sequenceStepSchema = z.object({
  stepOrder: z.number().int().min(1).max(3),
  channel: z.enum(['EMAIL', 'LINKEDIN_CONNECTION', 'LINKEDIN_MESSAGE']),
  subject: z.string().optional(),
  content: z.string().max(500),
  delayDays: z.number().int().min(0),
})

export const copySchema = z.object({
  steps: z.array(sequenceStepSchema).length(3),
  connectionNote: z.string().max(300),
  followUpMessage: z.string().max(300),
})

export type Copy = z.infer<typeof copySchema>

export async function writeCopy(
  contact: TargetContact,
  job: Job,
  user: User,
  strategy: Strategy,
  evaluation: Evaluation
): Promise<Copy> {
  const { object } = await generateObject({
    model: openai('gpt-4o'),
    system: `You are an elite executive assistant drafting hyper-personalized outreach for your boss. Rules: no jargon, no buzzwords, under 75 words per message, sound like a human not a robot, no generic openers like "I hope this finds you well".`,
    prompt: `Write a 3-step outreach sequence to ${contact.name} (${contact.title} at ${job.company}).

Their likely pain point: ${strategy.primaryPainPoint}
Call-to-action type: ${strategy.callToActionType}
My Resume Summary: ${user.resumeText?.slice(0, 800)}
My Core Value Prop: ${evaluation.coreValueProp}

Step 1 (Day 0): Initial email pitch — EMAIL channel
Step 2 (Day 2): LinkedIn connection request — LINKEDIN_CONNECTION channel
Step 3 (Day 5): LinkedIn breakup message — LINKEDIN_MESSAGE channel

Also provide a short connectionNote (for LinkedIn connection request, max 300 chars) and followUpMessage (for HeyReach campaign sequence, max 300 chars).`,
    schema: copySchema,
  })
  return object
}
