import React from 'react'

import { PageBanner } from '@/components/content/PageBanner'
import { emptyGlossary, termPath, visibleTerms, type TermCard } from '@/lib/glossaryList'

export function GlossaryIndex({ terms }: { terms: TermCard[] }) {
  const visible = visibleTerms(terms)
  return (
    <PageBanner title="Glossary">
      {visible.length === 0 ? (
        <p className="m-0 max-w-3xl text-[16px] font-light leading-6 text-ink md:text-body">{emptyGlossary}</p>
      ) : (
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {visible.map((term) => (
            <li key={term.slug} className="rounded-2xl border border-line bg-white">
              <a href={termPath(term.slug)} className="block p-5 text-[22px] font-extrabold text-ink no-underline">
                {term.term}
              </a>
            </li>
          ))}
        </ul>
      )}
    </PageBanner>
  )
}
