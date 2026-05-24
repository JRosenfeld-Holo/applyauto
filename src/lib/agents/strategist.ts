import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import type { Job, TargetContact } from '@prisma/client'
import type { Evaluation } from './evaluator'

export const strategySchema = z.object({
  primaryPainPoint: z.string(),
  callToActionType: z.enum(['CASUAL_CHAT', 'RESUME_REVIEW', 'DIRECT_PITCH']),
})

export type Strategy = z.infer<typeof strategySchema>

export async function buildStrategy(
  contact: TargetContact,
  job: Job,
  evaluation: Evaluation
): Promise<Strategy> {
  const { object } = await generateObject({
    model: openai('gpt-4o-mini'),
    system: `You are an expert outbound sales strategist. Map the candidate's value proposition to the specific persona's pain points to determine the most effective outreach angle.`,
    prompt: `Target Persona: ${contact.title} at ${job.company}\nCandidate's Core Value Prop: ${evaluation.coreValueProp}\n\nDetermine the primary pain point this target persona cares about regarding this role, and the best call-to-action type.`,
    schema: strategySchema,
  })
  return object
}
