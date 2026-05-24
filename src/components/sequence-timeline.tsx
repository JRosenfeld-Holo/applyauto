import { Channel, StepStatus } from '@prisma/client'

interface Step {
  id: string
  stepOrder: number
  channel: Channel
  content: string
  scheduledFor: Date | string
  status: StepStatus
}

const CHANNEL_LABELS: Record<Channel, string> = {
  EMAIL: 'Email',
  LINKEDIN_CONNECTION: 'LinkedIn Connect',
  LINKEDIN_MESSAGE: 'LinkedIn Message',
}

const CHANNEL_COLORS: Record<Channel, string> = {
  EMAIL: 'bg-blue-900/30 text-blue-300',
  LINKEDIN_CONNECTION: 'bg-sky-900/30 text-sky-300',
  LINKEDIN_MESSAGE: 'bg-sky-900/30 text-sky-300',
}

const STATUS_DOT: Record<StepStatus, string> = {
  QUEUED: 'bg-slate-600',
  SENT: 'bg-[#bffd11]',
  FAILED: 'bg-red-500',
}

export function SequenceTimeline({ steps }: { steps: Step[] }) {
  const sorted = [...steps].sort((a, b) => a.stepOrder - b.stepOrder)
  return (
    <div className="flex flex-col gap-3">
      {sorted.map((step, i) => (
        <div key={step.id} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full mt-1 ${STATUS_DOT[step.status]}`} />
            {i < sorted.length - 1 && <div className="w-px flex-1 bg-slate-700 mt-1 mb-0 min-h-8" />}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CHANNEL_COLORS[step.channel]}`}>
                {CHANNEL_LABELS[step.channel]}
              </span>
              <span className="text-xs text-slate-500">
                {new Date(step.scheduledFor).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-slate-300 line-clamp-2">{step.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
