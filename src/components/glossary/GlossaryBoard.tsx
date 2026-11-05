'use client'

import Link from 'next/link'
import React, { useMemo, useState } from 'react'

import { PhoneNumber } from '@/components/PhoneNumber'
import { emptyGlossary } from '@/lib/glossaryList'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export type GlossaryCard = {
  term: string
  href: string
  line: string
}

export function GlossaryBoard({ terms }: { terms: GlossaryCard[] }) {
  const [letter, setLetter] = useState('')
  const [selected, setSelected] = useState(terms[0]?.href || '')
  const shown = useMemo(
    () => terms.filter((term) => !letter || term.term.trim().toUpperCase().startsWith(letter)),
    [letter, terms],
  )
  const active = shown.find((term) => term.href === selected) || shown[0]

  return (
    <div className="bg-white">
      <section className="px-inset-phone py-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-7xl">
          <p className="m-0 inline-flex rounded-full bg-sand px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand">
            Glossary
          </p>
          <h1 className="m-0 mt-8 text-5xl font-black leading-none tracking-tight text-ink md:text-7xl">Glossary</h1>
          <p className="m-0 mt-6 max-w-3xl text-xl font-medium leading-relaxed text-slate">
            Terms used in commercial real estate.
          </p>
        </div>
      </section>
      <section className="sticky top-16 z-40 border-y border-line bg-white/90 px-inset-phone py-4 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="alpha-nav mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          <FilterButton active={letter === ''} onClick={() => setLetter('')}>
            All
          </FilterButton>
          {letters.map((item) => (
            <FilterButton key={item} active={letter === item} onClick={() => setLetter(item)}>
              {item}
            </FilterButton>
          ))}
        </div>
      </section>
      <section className="px-inset-phone py-12 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            {shown.length === 0 ? (
              <p className="m-0 text-base leading-7 text-ink">{emptyGlossary}</p>
            ) : (
              <div className="space-y-8">
                {groups(shown).map((group) => (
                  <div key={group.letter}>
                    <h2 className="m-0 text-4xl font-black text-ink">{group.letter}</h2>
                    <div className="mt-4 space-y-3">
                      {group.terms.map((term) => (
                        <button
                          key={term.href}
                          type="button"
                          onClick={() => setSelected(term.href)}
                          className="block w-full rounded-3xl bg-sand p-6 text-left"
                        >
                          <span className="block text-2xl font-black text-ink">{term.term}</span>
                          {term.line ? <span className="mt-2 block text-base text-slate">{term.line}</span> : null}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <aside className="space-y-6 lg:sticky lg:top-36">
            {active ? (
              <div className="rounded-[2.5rem] border border-line bg-white p-8">
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.3em] text-brand">Term</p>
                <h2 className="m-0 mt-4 text-3xl font-black tracking-tight text-ink">{active.term}</h2>
                {active.line ? <p className="m-0 mt-4 text-base leading-7 text-slate">{active.line}</p> : null}
                <Link href={active.href} className="mt-6 inline-flex text-sm font-black uppercase tracking-widest no-underline">
                  <span className="text-brand">Read the term</span>
                </Link>
                <Link href="/featured" className="mt-6 flex items-center justify-between rounded-2xl bg-ink px-5 py-4 no-underline">
                  <span className="text-sm font-black text-white">Search listings</span>
                </Link>
              </div>
            ) : null}
            <div className="rounded-[2rem] bg-brand p-8 text-white">
              <h2 className="m-0 text-xl font-black">Need help with a listing?</h2>
              <div className="mt-4">
                <PhoneNumber tone="white" />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 min-w-10 rounded-xl px-3 text-sm font-black ${active ? 'bg-brand text-white' : 'border border-line bg-white text-slate'}`}
    >
      {children}
    </button>
  )
}

function groups(terms: GlossaryCard[]) {
  const buckets = new Map<string, GlossaryCard[]>()
  for (const term of terms) {
    const letter = term.term.trim().charAt(0).toUpperCase() || '#'
    const list = buckets.get(letter) || []
    list.push(term)
    buckets.set(letter, list)
  }
  return [...buckets.entries()].map(([letter, items]) => ({ letter, terms: items }))
}
