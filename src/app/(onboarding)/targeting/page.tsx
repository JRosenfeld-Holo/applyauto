'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface Modality {
  remote: boolean
  hybrid: boolean
  onsite: boolean
}

export default function TargetingMatrix() {
  const [titles, setTitles] = useState<string[]>(['VP of Marketing'])
  const [companies, setCompanies] = useState<string[]>([])
  const [locations, setLocations] = useState<string[]>(['United States'])
  const [titleInput, setTitleInput] = useState('')
  const [companyInput, setCompanyInput] = useState('')
  const [locationInput, setLocationInput] = useState('')
  const [modality, setModality] = useState<Modality>({ remote: true, hybrid: false, onsite: false })
  const [maxResults, setMaxResults] = useState(50)
  const [launching, setLaunching] = useState(false)
  const [launched, setLaunched] = useState(false)

  const addTag = (
    input: string,
    setInput: (v: string) => void,
    list: string[],
    setList: (v: string[]) => void
  ) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault()
      if (!list.includes(input.trim())) {
        setList([...list, input.trim()])
      }
      setInput('')
    }
  }

  const removeTag = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.filter((t) => t !== item))
  }

  const TagInput = ({
    label,
    input,
    setInput,
    list,
    setList,
    placeholder,
  }: {
    label: string
    input: string
    setInput: (v: string) => void
    list: string[]
    setList: (v: string[]) => void
    placeholder: string
  }) => (
    <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
      <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{label}</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTag(input, setInput, list, setList)}
        placeholder={placeholder}
        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#bffd11] transition-colors placeholder:text-slate-600 mb-3"
      />
      <div className="flex flex-wrap gap-2">
        {list.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 text-sm bg-slate-700 text-slate-200 px-3 py-1 rounded-full"
          >
            {tag}
            <button onClick={() => removeTag(list, setList, tag)} className="hover:text-red-400 transition-colors">
              <X size={12} />
            </button>
          </span>
        ))}
        {list.length === 0 && <span className="text-xs text-slate-600">Press Enter to add tags</span>}
      </div>
    </section>
  )

  const handleLaunch = async () => {
    if (titles.length === 0) return
    setLaunching(true)
    try {
      const searchQuery = titles.join(' OR ')
      const location = locations[0] ?? 'United States'
      await fetch('/api/jobs/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchQuery, location, maxResults }),
      })
      setLaunched(true)
      setTimeout(() => setLaunched(false), 4000)
    } finally {
      setLaunching(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <div className="border-b border-slate-800 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="font-bricolage text-xl font-bold">Targeting Matrix</h1>
          <p className="text-sm text-slate-400 mt-0.5">Step 2 of 2 — Configure your search parameters</p>
        </div>
        <a href="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">
          ← Dashboard
        </a>
      </div>

      <div className="max-w-2xl mx-auto px-8 py-10 space-y-6">
        <TagInput
          label="Target Roles"
          input={titleInput}
          setInput={setTitleInput}
          list={titles}
          setList={setTitles}
          placeholder="e.g. VP of Marketing, Head of Growth…"
        />

        <TagInput
          label="Target Companies (optional)"
          input={companyInput}
          setInput={setCompanyInput}
          list={companies}
          setList={setCompanies}
          placeholder="e.g. Stripe, Linear, Vercel…"
        />

        <TagInput
          label="Locations"
          input={locationInput}
          setInput={setLocationInput}
          list={locations}
          setList={setLocations}
          placeholder="e.g. United States, Remote…"
        />

        {/* Modality */}
        <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Work Modality</h2>
          <div className="flex gap-3">
            {(Object.keys(modality) as (keyof Modality)[]).map((key) => (
              <button
                key={key}
                onClick={() => setModality({ ...modality, [key]: !modality[key] })}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                  modality[key]
                    ? 'border-[#bffd11] bg-[#bffd11]/10 text-[#bffd11]'
                    : 'border-slate-700 text-slate-500 hover:border-slate-600'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* Max results */}
        <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Max Jobs to Scrape
          </h2>
          <input
            type="number"
            min={5}
            max={200}
            value={maxResults}
            onChange={(e) => setMaxResults(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#bffd11] transition-colors"
          />
        </section>

        <button
          onClick={handleLaunch}
          disabled={launching || titles.length === 0}
          className="w-full bg-[#bffd11] text-slate-900 font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(191,253,17,0.15)] hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
        >
          {launched ? '✓ Scrape Launched!' : launching ? 'Initializing Engine…' : 'Initialize Engine'}
        </button>

        <a
          href="/jobs"
          className="block text-center text-sm text-slate-400 hover:text-white transition-colors"
        >
          View scraped jobs →
        </a>
      </div>
    </div>
  )
}
