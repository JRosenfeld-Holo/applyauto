import { task } from '@trigger.dev/sdk/v3'
import { exec } from 'child_process'
import { promisify } from 'util'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { db } from '@/lib/db'
import { JobStatus } from '@prisma/client'

const execAsync = promisify(exec)

interface ApplyPayload {
  jobId: string
  candidateJson: Record<string, unknown>
}

export const runHermesAutoApply = task({
  id: 'hermes-workday-apply',
  maxDuration: 600,
  run: async (payload: ApplyPayload) => {
    const { jobId, candidateJson } = payload
    const bespokeEmail = `applicant+${jobId}@${process.env.BESPOKE_EMAIL_DOMAIN ?? 'yourdomain.com'}`

    // Write candidate data to a temp workspace Hermes can read
    const workspaceDir = join('/tmp', `hermes-${jobId}`)
    await mkdir(workspaceDir, { recursive: true })
    await writeFile(
      join(workspaceDir, 'candidate.json'),
      JSON.stringify({ ...candidateJson, bespokeEmail }, null, 2)
    )

    let status: 'APPLIED' | 'REJECTED' = 'REJECTED'
    let output = ''

    try {
      const { stdout } = await execAsync(
        `hermes chat "Execute the Autonomous Workday Application Loop for job ${jobId} using ${bespokeEmail}. Candidate data is at ${workspaceDir}/candidate.json."`,
        { cwd: workspaceDir, timeout: 540_000 }
      )
      output = stdout

      if (stdout.includes('"status": "success"') || stdout.includes('APPLIED')) {
        status = 'APPLIED'
      } else if (stdout.includes('MANUAL_INTERVENTION_REQUIRED')) {
        status = 'REJECTED'
      }
    } catch (err) {
      output = String(err)
    }

    await db.job.update({
      where: { id: jobId },
      data: { status: JobStatus[status] },
    })

    return { jobId, status, output: output.slice(0, 2000) }
  },
})
