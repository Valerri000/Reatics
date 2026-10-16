'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { Button } from '@/components/Button'

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
  { value: 'sale', label: 'for sale' },
  { value: 'lease', label: 'for lease' },
  { value: 'coworking', label: 'coworking' },
] as const

export type SearchKind = keyof typeof searchUses

const field = 'border-b border-ink bg-transparent px-1 text-base text-ink outline-none'

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
    const params = new URLSearchParams({
      place: place.trim(),
      kind,
      use,
    })
    router.push(`/featured?${params.toString()}`)
  }

  return (
    <form onSubmit={submit} className="mt-8 max-w-3xl rounded-panel bg-sand p-4 md:p-6">
      <p className="m-0 text-[16px] font-light leading-6 text-ink md:text-body">
        What kind of property are you looking for?
      </p>
      <p className="m-0 mt-4 flex flex-col gap-3 text-[16px] leading-8 text-ink md:block md:text-body">
        <span>I am looking for a space in </span>
        <input
          name="place"
          aria-label="City, state, county, or ZIP"
          placeholder="Pasadena CA 91106"
          value={place}
          onChange={(event) => setPlace(event.target.value)}
          className={`${field} w-full placeholder:text-placeholder md:w-64`}
        />
        <span>, that is, </span>
        <select
          name="kind"
          aria-label="Transaction"
          value={kind}
          onChange={(event) => changeKind(event.target.value as SearchKind)}
          className={field}
        >
          {searchKinds.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <span>, and is for </span>
        <select
          name="use"
          aria-label="Use"
          value={use}
          onChange={(event) => setUse(event.target.value)}
          className={field}
        >
          {searchUses[kind].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <span> uses.</span>
      </p>
      <Button className="mt-6 w-full md:w-auto" type="submit">
        Search
      </Button>
    </form>
  )
}
