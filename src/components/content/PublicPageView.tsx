import React from 'react'

import { FormattedBody } from '@/components/content/FormattedBody'
import { longPageClass, longPageHeading } from '@/lib/longPage'
import type { RichTextBody } from '@/lib/richTextBody'

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
      <p className="m-0 text-sm font-semibold uppercase tracking-[0.14em] text-brand">Reatics</p>
      <h1 className={`${longPageHeading} mt-4`}>{h1}</h1>
      <div className="mt-6">
        <FormattedBody value={content} />
        {contact}
      </div>
    </article>
  )
}
