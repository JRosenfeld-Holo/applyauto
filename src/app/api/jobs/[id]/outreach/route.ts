import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { evaluateJob } from '@/lib/agents/evaluator'
import { buildStrategy } from '@/lib/agents/strategist'
import { writeCopy } from '@/lib/agents/copywriter'
import { createCampaign, addLeadToCampaign } from '@/lib/heyreach'
import { JobStatus, SeqStatus } from '@prisma/client'

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const userId = process.env.SEED_USER_ID!

  const [job, user] = await Promise.all([
    db.job.findUnique({ where: { id }, include: { contacts: true } }),
    db.user.findUnique({ where: { id: userId } }),
  ])

  if (!job) return Response.json({ error: 'Job not found' }, { status: 404 })
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 })
  if (!user.resumeText) {
    return Response.json({ error: 'No resume text. Complete your profile first.' }, { status: 422 })
  }
  if (job.contacts.length === 0) {
    return Response.json({ error: 'No contacts found for this job.' }, { status: 422 })
  }

  // Step 1: Evaluate (or use cached score)
  const evaluation = await evaluateJob(job, user)

  const sequences = []

  for (const contact of job.contacts) {
    // Step 2: Strategy per contact
    const strategy = await buildStrategy(contact, job, evaluation)

    // Step 3: Copy generation
    const copy = await writeCopy(contact, job, user, strategy, evaluation)

    // Step 4: Persist sequence + steps
    const now = new Date()
    const sequence = await db.outreachSequence.create({
      data: {
        userId,
        contactId: contact.id,
        status: SeqStatus.ACTIVE,
        steps: {
          create: copy.steps.map((step) => ({
            stepOrder: step.stepOrder,
            channel: step.channel,
            content: step.content,
            scheduledFor: new Date(now.getTime() + step.delayDays * 86_400_000),
          })),
        },
      },
    })

    // Step 5: Create HeyReach campaign if contact has LinkedIn
    if (contact.linkedinUrl) {
      try {
        const campaign = await createCampaign({
          campaignName: `${job.title} @ ${job.company} → ${contact.name}`,
          linkedInAccountIds: [], // populated from user settings
          sequence: [
            { nodeType: 'VIEW_PROFILE', delay: 0 },
            { nodeType: 'CONNECTION_REQUEST', delay: 1, payload: { message: copy.connectionNote } },
            { nodeType: 'MESSAGE', delay: 3, payload: { message: copy.followUpMessage } },
          ],
        })
        await addLeadToCampaign(campaign.campaignId, contact.linkedinUrl)
      } catch (err) {
        // Non-fatal: HeyReach campaign failure doesn't block sequence creation
        console.error('HeyReach campaign error:', err)
      }
    }

    sequences.push(sequence)
  }

  await db.job.update({
    where: { id },
    data: { status: JobStatus.OUTREACH_ACTIVE },
  })

  return Response.json({ sequences: sequences.length, evaluation })
}
