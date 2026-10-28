import React from 'react'

import { FormattedBody } from '@/components/content/FormattedBody'
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
    <article className="px-inset-phone py-section-phone md:px-inset-wide md:py-section">
      <h1 className="m-0 text-[28px] font-extrabold leading-none text-ink md:text-[32px]">{h1}</h1>
      <div className="mt-6">
        <FormattedBody value={content} />
        {contact}
      </div>
    </article>
  )
}
