interface StatCardProps {
  label: string
  count: number
  accent?: boolean
}

export function StatCard({ label, count, accent }: StatCardProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 flex flex-col gap-2">
      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>
      <span
        className={`text-4xl font-bold font-bricolage ${accent ? 'text-[#bffd11]' : 'text-white'}`}
      >
        {count}
      </span>
    </div>
  )
}
