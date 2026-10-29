import React from 'react'

import { FormattedBody } from '@/components/content/FormattedBody'
import { termHeading, type TermCard } from '@/lib/glossaryList'
import type { RichTextBody } from '@/payload-types'

export function TermView({ term }: { term: TermCard }) {
  return (
    <article className="px-inset-phone py-section-phone md:px-inset-wide md:py-section">
      <h1 className="m-0 text-[28px] font-extrabold leading-none text-ink md:text-[32px]">{termHeading(term)}</h1>
      <div className="mt-6">
        <FormattedBody value={term.definition as RichTextBody | null | undefined} />
      </div>
    </article>
  )
}
