import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import type { Job, User } from '@prisma/client'

export const evaluationSchema = z.object({
  matchScore: z.number().min(0).max(100),
  isMatch: z.boolean(),
  keyMissingSkills: z.array(z.string()),
  matchReasoning: z.string(),
  coreValueProp: z.string(),
})

export type Evaluation = z.infer<typeof evaluationSchema>

export async function evaluateJob(job: Job, user: User): Promise<Evaluation> {
  const { object } = await generateObject({
    model: openai('gpt-4o'),
    system: `You are an expert technical recruiter evaluating candidate fit. You are ruthless about filtering out jobs where the candidate lacks core requirements. isMatch should be true only when matchScore >= 65.`,
    prompt: `Evaluate this job description against the candidate's resume.\n\nCandidate Resume:\n${user.resumeText}\n\nJob Description:\n${job.description}`,
    schema: evaluationSchema,
  })
  return object
}
