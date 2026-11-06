'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { homepageSearchTarget } from '@/lib/searchTarget'

export const searchUses = {
  sale: [
    'all',
    'Office',
    'Retail',
    'Industrial/Flex',
    'Land',
    'Medical',
    'Shopping Center',
    'Multi-Family',
    'Other',
  ],
  lease: ['all', 'Office', 'Retail', 'Industrial', 'Flex', 'Medical', 'Land'],
  coworking: ['all', '1–2', '3–4', '5–10', '11–20', '25+'],
} as const

export const searchKinds = [
  { value: 'sale', label: 'For Sale' },
  { value: 'lease', label: 'For Lease' },
  { value: 'coworking', label: 'Coworking' },
] as const

export type SearchKind = keyof typeof searchUses

const control =
  'h-12 w-full rounded-xl border border-line bg-white px-3 text-base text-ink outline-none'

export function HeroSearch() {
  const router = useRouter()
  const [place, setPlace] = useState('')
  const [kind, setKind] = useState<SearchKind>('sale')
  const [use, setUse] = useState('all')

  function changeKind(next: SearchKind) {
    setKind(next)
    const choices = searchUses[next] as readonly string[]
    if (!choices.includes(use)) setUse('all')
  }

  function submit(event: React.FormEvent) {
    event.preventDefault()
    router.push(homepageSearchTarget({ place, kind, use }))
  }

  return (
    <form onSubmit={submit} className="mt-6 max-w-4xl rounded-panel bg-white p-3 text-left shadow-2xl md:p-4">
      <p className="sr-only">What kind of property are you looking for?</p>
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-end">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 px-1 text-xs font-semibold text-slate">
            <FieldIcon name="pin" />
            Location
          </span>
          <input
            name="place"
            aria-label="City, state, county, or ZIP"
            placeholder="City, state, or ZIP"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
            className={control}
          />
        </label>
        <label className="block">
          <span className="mb-2 flex items-center gap-2 px-1 text-xs font-semibold text-slate">
            <FieldIcon name="building" />
            Type
          </span>
          <select
            name="kind"
            aria-label="Transaction"
            value={kind}
            onChange={(event) => changeKind(event.target.value as SearchKind)}
            className={control}
          >
            {searchKinds.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 flex items-center gap-2 px-1 text-xs font-semibold text-slate">
            <FieldIcon name="grid" />
            Use
          </span>
          <select
            name="use"
            aria-label="Use"
            value={use}
            onChange={(event) => setUse(event.target.value)}
            className={control}
          >
            {searchUses[kind].map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? 'All Uses' : item}
              </option>
            ))}
          </select>
        </label>
        <Button className="w-full gap-2 md:w-auto" type="submit">
          <FieldIcon name="search" />
          Search
        </Button>
      </div>
    </form>
  )
}

function FieldIcon({ name }: { name: 'pin' | 'building' | 'grid' | 'search' }) {
  const common = { className: 'h-4 w-4', viewBox: '0 0 24 24', 'aria-hidden': true as const }
  if (name === 'building') {
    return (
      <svg {...common}>
        <path d="M4 20V9l8-5 8 5v11H4zM9 20v-6h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }
  if (name === 'grid') {
    return (
      <svg {...common}>
        <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }
  if (name === 'search') {
    return (
      <svg {...common} className="h-4 w-4 text-white">
        <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 16l4 4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="11" r="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
