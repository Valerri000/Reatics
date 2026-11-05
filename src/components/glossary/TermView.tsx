import React from 'react'

import { PageBanner } from '@/components/content/PageBanner'
import { FormattedBody } from '@/components/content/FormattedBody'
import { termHeading, type TermCard } from '@/lib/glossaryList'
import type { RichTextBody } from '@/payload-types'

export function TermView({ term }: { term: TermCard }) {
  return (
    <PageBanner title={termHeading(term)}>
      <FormattedBody value={term.definition as RichTextBody | null | undefined} />
    </PageBanner>
  )
}
