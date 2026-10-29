import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'

import { TermView } from '@/components/glossary/TermView'
import { termPath } from '@/lib/glossaryList'
import { loadTerm } from '@/lib/loadStories'
import { storyMeta } from '@/lib/storyMeta'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const term = await loadTerm(slug)
  if (!term) return {}
  return storyMeta({ ...term, title: term.term, path: termPath(term.slug) })
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const term = await loadTerm(slug)
  if (!term) notFound()
  return <TermView term={term} />
}
