import React from 'react'

import { PageBanner } from '@/components/content/PageBanner'
import { FormattedBody } from '@/components/content/FormattedBody'
import { postByline, type PostCard } from '@/lib/postList'
import type { RichTextBody } from '@/payload-types'

export function PostView({ post, preview = false }: { post: PostCard; preview?: boolean }) {
  const byline = postByline(post)
  const heading = post.h1?.trim() || post.title
  return (
    <PageBanner title={heading}>
      {preview && post.status === 'draft' ? (
        <p className="m-0 text-base font-semibold text-brand">Draft preview</p>
      ) : null}
      {byline ? <p className={`m-0 text-base text-slate ${preview && post.status === 'draft' ? 'mt-4' : ''}`}>{byline}</p> : null}
      <div className="mt-6">
        <FormattedBody value={post.content as RichTextBody | null | undefined} />
      </div>
    </PageBanner>
  )
}
