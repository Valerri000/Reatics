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
  'h-12 w-full rounded-lg border border-line bg-white px-3 text-base text-ink outline-none'

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
    <form onSubmit={submit} className="mx-auto mt-10 max-w-3xl rounded-panel bg-white p-4 text-left shadow-2xl md:p-5">
      <p className="sr-only">What kind of property are you looking for?</p>
      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-end">
        <label className="block">
          <span className="mb-1 block px-1 text-xs font-bold uppercase text-gray">Location</span>
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
          <span className="mb-1 block px-1 text-xs font-bold uppercase text-gray">Type</span>
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
          <span className="mb-1 block px-1 text-xs font-bold uppercase text-gray">Use</span>
          <select
            name="use"
            aria-label="Use"
            value={use}
            onChange={(event) => setUse(event.target.value)}
            className={control}
          >
            {searchUses[kind].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <Button className="w-full md:w-auto" type="submit">
          Search
        </Button>
      </div>
    </form>
  )
}
