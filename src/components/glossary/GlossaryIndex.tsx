import React from 'react'

import { emptyGlossary, termPath, visibleTerms, type TermCard } from '@/lib/glossaryList'

export function GlossaryIndex({ terms }: { terms: TermCard[] }) {
  const visible = visibleTerms(terms)
  return (
    <section className="px-inset-phone py-section-phone md:px-inset-wide md:py-section">
      <h1 className="m-0 text-[28px] font-extrabold leading-none text-ink md:text-[32px]">Glossary</h1>
      {visible.length === 0 ? (
        <p className="m-0 mt-6 max-w-3xl text-[16px] font-light leading-6 text-ink md:text-body">{emptyGlossary}</p>
      ) : (
        <ul className="m-0 mt-8 max-w-3xl list-none p-0">
          {visible.map((term) => (
            <li key={term.slug} className="mt-4">
              <a href={termPath(term.slug)} className="text-[22px] font-extrabold text-ink no-underline">
                {term.term}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
