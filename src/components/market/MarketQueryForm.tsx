'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { searchUses } from '@/components/home/HeroSearch'

const coworkingUses = searchUses.coworking.filter((item) => item !== 'all')
const deskLabels = ['1-2 Desks', '3-4 Desks', '5-10 Desks', '11-20 Desks', '25+ Team']

export function MarketQueryForm({
  mode,
}: {
  mode: 'coworking' | 'commercial'
}) {
  const router = useRouter()
  const [place, setPlace] = useState('')
  const [choice, setChoice] = useState(mode === 'coworking' ? coworkingUses[0] : 'sale')
  const coworking = mode === 'coworking'
  const accent = coworking
    ? 'rounded-[2rem] bg-brand px-10 py-5 shadow-xl shadow-brand/20 hover:bg-brand-deep'
    : 'rounded-[1.5rem] bg-ink px-8 py-4 hover:bg-brand'
  const shell = coworking
    ? 'glass-red max-w-3xl rounded-[2.5rem] shadow-2xl ring-1 ring-white'
    : 'max-w-3xl rounded-[2rem] bg-white/80 shadow-xl ring-1 ring-white'

  function submit(event: React.FormEvent) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (place.trim()) params.set('place', place.trim())
    if (mode === 'coworking') {
      params.set('kind', 'coworking')
      params.set('use', choice)
    } else {
      params.set('kind', choice)
      params.set('use', 'all')
    }
    router.push(`/featured?${params.toString()}`)
  }

  return (
    <form id={coworking ? 'cowork-search' : undefined} onSubmit={submit}>
      <div className={`flex flex-col gap-2 p-2 md:flex-row ${shell}`}>
        <label className={`block flex-1 bg-white text-left ${coworking ? 'rounded-[2rem] p-5' : 'rounded-[1.5rem] p-4'}`}>
          <span className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-400">
            Market Search
          </span>
          <span className="flex items-center gap-3">
            {coworking ? (
              <svg className="h-4 w-4 shrink-0 text-brand" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M16 16l4 4" fill="none" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            ) : null}
            <input
              name="place"
              aria-label="City, state, county, or ZIP"
              value={place}
              placeholder="City, state, or ZIP..."
              onChange={(event) => setPlace(event.target.value)}
              className="w-full bg-transparent text-lg font-bold text-slate-800 outline-none placeholder:text-slate-300"
            />
          </span>
        </label>
        <label className={`block bg-white text-left md:w-56 ${coworking ? 'rounded-[2rem] p-5' : 'rounded-[1.5rem] p-4'}`}>
          <span className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-slate-400">
            {coworking ? 'Team Size' : 'Transaction'}
          </span>
          <select
            name={coworking ? 'use' : 'kind'}
            aria-label={coworking ? 'Team Size' : 'Transaction'}
            value={choice}
            onChange={(event) => setChoice(event.target.value)}
            className="w-full bg-transparent text-lg font-bold text-slate-800 outline-none"
          >
            {coworking ? (
              coworkingUses.map((item, index) => (
                <option key={item} value={item}>
                  {deskLabels[index] || item}
                </option>
              ))
            ) : (
              <>
                <option value="sale">For Sale</option>
                <option value="lease">For Lease</option>
                <option value="commercial">Both</option>
              </>
            )}
          </select>
        </label>
        <button type="submit" className={`text-base font-black text-white ${accent}`}>
          {coworking ? 'Find Space' : 'Browse Assets'}
        </button>
      </div>
      {mode === 'commercial' ? (
        <p className="m-0 mt-4 text-[10px] font-black uppercase tracking-widest text-gray">
          Coworking is excluded from this search
        </p>
      ) : null}
    </form>
  )
}
