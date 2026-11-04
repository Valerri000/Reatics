import React from 'react'

import { FormattedBody } from '@/components/content/FormattedBody'
import { longPageClass, longPageHeading } from '@/lib/longPage'
import type { RichTextBody } from '@/payload-types'

export function PublicPageView({
  h1,
  content,
  contact,
}: {
  h1: string
  content?: RichTextBody | null
  contact?: React.ReactNode
}) {
  return (
    <article className={longPageClass}>
      <h1 className={longPageHeading}>{h1}</h1>
      <div className="mt-6">
        <FormattedBody value={content} />
        {contact}
      </div>
    </article>
  )
}
