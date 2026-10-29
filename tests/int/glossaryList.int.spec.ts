import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { emptyGlossary, termHeading, termPath, visibleTerms } from '@/lib/glossaryList'
import { storyMeta } from '@/lib/storyMeta'
import { sampleTerm } from '@/lib/storySeed'
import { TermView } from '@/components/glossary/TermView'

describe('glossary', () => {
  it('lists published terms and hides a draft', () => {
    const terms = [
      { term: 'Vacancy', slug: 'vacancy', status: 'draft' },
      { term: 'Cap rate', slug: 'cap-rate', status: 'published' },
      { term: 'Basis', slug: 'basis', status: 'published' },
    ]
    expect(visibleTerms(terms).map((term) => term.slug)).toEqual(['basis', 'cap-rate'])
    expect(termPath('cap-rate')).toBe('/glossary/cap-rate')
    expect(emptyGlossary).toBe('No terms yet.')
  })

  it('keeps the definition, the slug, and the SEO block on a term', () => {
    const meta = storyMeta({ ...sampleTerm, title: sampleTerm.term, path: termPath(sampleTerm.slug) })
    expect(sampleTerm.slug).toBe('cap-rate')
    expect(termHeading(sampleTerm)).toBe('Cap rate')
    expect(meta.title).toBe('Cap rate')
    expect(meta.description).toBe(sampleTerm.metaDescription)
    expect(meta.alternates).toEqual({ canonical: '/glossary/cap-rate' })
    expect(meta.robots).toEqual({ index: true, follow: true })
    const html = renderToStaticMarkup(createElement(TermView, { term: sampleTerm }))
    expect(html).toContain('Cap rate')
    expect(html).toContain('yearly net operating income')
  })
})
