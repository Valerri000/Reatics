import React from 'react'

import { FormattedBody } from '@/components/content/FormattedBody'
import { postByline, type PostCard } from '@/lib/postList'
import type { RichTextBody } from '@/payload-types'

export function PostView({ post, preview = false }: { post: PostCard; preview?: boolean }) {
  const byline = postByline(post)
  const heading = post.h1?.trim() || post.title
  return (
    <article className="px-inset-phone py-section-phone md:px-inset-wide md:py-section">
      {preview && post.status === 'draft' ? (
        <p className="m-0 text-base font-semibold text-brand">Draft preview</p>
      ) : null}
      <h1
        className={`m-0 text-[28px] font-extrabold leading-none text-ink md:text-[32px] ${preview && post.status === 'draft' ? 'mt-4' : ''}`}
      >{heading}</h1>
      {byline ? <p className="m-0 mt-4 text-base text-slate">{byline}</p> : null}
      <div className="mt-6">
        <FormattedBody value={post.content as RichTextBody | null | undefined} />
      </div>
    </article>
  )
}
