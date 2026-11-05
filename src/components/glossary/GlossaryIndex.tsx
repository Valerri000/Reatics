import React from 'react'

import { GlossaryBoard } from '@/components/glossary/GlossaryBoard'
import { definitionLine, termPath, visibleTerms, type TermCard } from '@/lib/glossaryList'

export function GlossaryIndex({ terms }: { terms: TermCard[] }) {
  const cards = visibleTerms(terms).map((term) => ({
    term: term.term,
    href: termPath(term.slug),
    line: term.metaDescription?.trim() || definitionLine(term.definition),
  }))
  return <GlossaryBoard terms={cards} />
}
