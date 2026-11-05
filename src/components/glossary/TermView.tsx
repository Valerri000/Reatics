import Link from 'next/link'
import React from 'react'

import { FormattedBody } from '@/components/content/FormattedBody'
import { PhoneNumber } from '@/components/PhoneNumber'
import { termHeading, type TermCard } from '@/lib/glossaryList'
import type { RichTextBody } from '@/payload-types'

export function TermView({ term }: { term: TermCard }) {
  return (
    <article className="bg-white px-inset-phone py-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-gray">
            <Link href="/glossary" className="no-underline">
              <span className="text-gray">Glossary</span>
            </Link>
          </p>
          <h1 className="m-0 mt-6 text-5xl font-black tracking-tight text-ink">{termHeading(term)}</h1>
          <div className="mt-8">
            <FormattedBody value={term.definition as RichTextBody | null | undefined} />
          </div>
        </div>
        <aside className="space-y-6">
          <Link href="/featured" className="flex items-center justify-between rounded-2xl bg-ink px-5 py-4 no-underline">
            <span className="text-sm font-black text-white">Search listings</span>
          </Link>
          <div className="rounded-[2rem] bg-brand p-8 text-white">
            <h2 className="m-0 text-xl font-black">Need help with a listing?</h2>
            <div className="mt-4">
              <PhoneNumber tone="white" />
            </div>
          </div>
        </aside>
      </div>
    </article>
  )
}
