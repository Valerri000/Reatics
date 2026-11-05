'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { searchUses } from '@/components/home/HeroSearch'

const coworkingUses = searchUses.coworking.filter((item) => item !== 'all')

export function MarketQueryForm({
  mode,
}: {
  mode: 'coworking' | 'commercial'
}) {
  const router = useRouter()
  const [place, setPlace] = useState('')
  const [choice, setChoice] = useState(mode === 'coworking' ? coworkingUses[0] : 'sale')
  const accent = mode === 'coworking' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-ink hover:bg-brand'

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
    <form onSubmit={submit}>
      <div className="flex max-w-3xl flex-col gap-2 rounded-[2rem] bg-white/80 p-2 shadow-xl ring-1 ring-white md:flex-row">
        <label className="block flex-1 rounded-[1.5rem] bg-white p-4 text-left">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray">Market Search</span>
          <input
            name="place"
            aria-label="City, state, county, or ZIP"
            value={place}
            placeholder="City, state, or ZIP"
            onChange={(event) => setPlace(event.target.value)}
            className="w-full bg-transparent text-lg font-bold text-ink outline-none placeholder:text-gray"
          />
        </label>
        <label className="block rounded-[1.5rem] bg-white p-4 text-left md:w-56">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray">
            {mode === 'coworking' ? 'Team Size' : 'Transaction'}
          </span>
          <select
            name={mode === 'coworking' ? 'use' : 'kind'}
            value={choice}
            onChange={(event) => setChoice(event.target.value)}
            className="w-full bg-transparent text-lg font-bold text-ink outline-none"
          >
            {mode === 'coworking' ? (
              coworkingUses.map((item) => (
                <option key={item} value={item}>
                  {item}
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
        <button
          type="submit"
          className={`rounded-[1.5rem] px-8 py-4 text-base font-black text-white ${accent}`}
        >
          {mode === 'coworking' ? 'Find Space' : 'Browse Assets'}
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
