import React from 'react'

import { GlossaryIndex } from '@/components/glossary/GlossaryIndex'
import { loadPublishedTerms } from '@/lib/loadStories'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Glossary',
  description: 'Terms used in commercial real estate.',
  alternates: { canonical: '/glossary' },
  robots: { index: true, follow: true },
}

export default async function GlossaryPage() {
  const terms = await loadPublishedTerms()
  return <GlossaryIndex terms={terms} />
}
