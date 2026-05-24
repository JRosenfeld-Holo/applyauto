'use client'

import { useState, useCallback } from 'react'

interface CandidateData {
  name: string
  email: string
  currentTitle: string
  resumeText: string
  dailyLimits: number
}

export default function ValidatorPage() {
  const [candidateData, setCandidateData] = useState<CandidateData>({
    name: '',
    email: '',
    currentTitle: '',
    resumeText: '',
    dailyLimits: 20,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [pdfName, setPdfName] = useState<string | null>(null)

  const handleFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPdfName(file.name)
    // In production, parse PDF server-side. For now, prompt user to paste text.
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: candidateData.name,
          email: candidateData.email,
          resumeText: candidateData.resumeText,
          dailyLimits: candidateData.dailyLimits,
        }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  const field = (
    label: string,
    key: keyof CandidateData,
    opts?: { type?: string; rows?: number; placeholder?: string }
  ) => (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      {opts?.rows ? (
        <textarea
          rows={opts.rows}
          value={candidateData[key] as string}
          placeholder={opts.placeholder}
          onChange={(e) => setCandidateData({ ...candidateData, [key]: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white text-sm resize-none focus:outline-none focus:border-[#bffd11] transition-colors placeholder:text-slate-600"
        />
      ) : (
        <input
          type={opts?.type ?? 'text'}
          value={candidateData[key] as string | number}
          placeholder={opts?.placeholder}
          onChange={(e) =>
            setCandidateData({
              ...candidateData,
              [key]: opts?.type === 'number' ? Number(e.target.value) : e.target.value,
            })
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#bffd11] transition-colors placeholder:text-slate-600"
        />
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Header */}
      <div className="border-b border-slate-800 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="font-bricolage text-xl font-bold">Candidate Profile</h1>
          <p className="text-sm text-slate-400 mt-0.5">Step 1 of 2 — Verify your extracted resume data</p>
        </div>
        <a href="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">
          ← Dashboard
        </a>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left: PDF Upload */}
        <div className="w-1/3 border-r border-slate-800 p-8 flex flex-col gap-6">
          <div>
            <h2 className="text-sm font-semibold text-slate-300 mb-3">Resume PDF</h2>
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-[#bffd11]/50 hover:bg-[#bffd11]/5 transition-all">
              <div className="text-3xl mb-2">📄</div>
              <span className="text-sm text-slate-400">
                {pdfName ?? 'Drop PDF or click to upload'}
              </span>
              <input type="file" accept=".pdf" className="hidden" onChange={handleFile} />
            </label>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Pipeline Preview</h3>
            <div className="space-y-2 text-sm">
              {[
                { icon: '⚡', label: 'Scrape LinkedIn jobs', active: true },
                { icon: '🧠', label: 'AI match scoring', active: true },
                { icon: '✍️', label: 'Generate outreach copy', active: true },
                { icon: '🤖', label: 'Auto-apply to ATS', active: false },
              ].map((step) => (
                <div key={step.label} className="flex items-center gap-3">
                  <span>{step.icon}</span>
                  <span className={step.active ? 'text-slate-300' : 'text-slate-600'}>{step.label}</span>
                  {step.active && <span className="ml-auto text-[#bffd11] text-xs">✓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-2/3 p-10 overflow-y-auto">
          <div className="max-w-xl space-y-6">
            {field('Full Name', 'name', { placeholder: 'Jane Smith' })}
            {field('Email', 'email', { type: 'email', placeholder: 'jane@example.com' })}
            {field('Current Title', 'currentTitle', { placeholder: 'Senior Software Engineer' })}
            {field('Daily Application Limit', 'dailyLimits', { type: 'number' })}
            {field('Resume Text', 'resumeText', {
              rows: 12,
              placeholder: 'Paste your resume text here, or upload the PDF above and we will extract it…',
            })}

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-[#bffd11] text-slate-900 font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 text-sm"
            >
              {saved ? '✓ Saved!' : saving ? 'Saving…' : 'Approve & Finalize Engine Data'}
            </button>

            <a
              href="/targeting"
              className="block text-center text-sm text-slate-400 hover:text-white transition-colors"
            >
              Continue to Targeting Matrix →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
