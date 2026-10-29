import { publicPath } from '@/lib/paths'

export const emptyGlossary = 'No terms yet.'

export type TermCard = {
  term: string
  slug: string
  status?: string | null
  definition?: unknown
  h1?: string | null
  pageTitle?: string | null
  metaDescription?: string | null
  robots?: string | null
  canonicalUrl?: string | null
}

export function termPath(slug: string) {
  return publicPath('glossary', slug)
}

export function visibleTerms<T extends { status?: string | null; term?: string | null }>(terms: T[]) {
  return terms
    .filter((term) => term.status === 'published')
    .slice()
    .sort((a, b) => (a.term || '').localeCompare(b.term || ''))
}

export function termHeading(term: { h1?: string | null; term?: string | null }) {
  const heading = term.h1?.trim()
  if (heading) return heading
  return term.term?.trim() || ''
}
