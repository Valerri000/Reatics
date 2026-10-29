import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'

import { PostView } from '@/components/blog/PostView'
import { loadPost } from '@/lib/loadStories'
import { postPath } from '@/lib/postList'
import { wantsPreview } from '@/lib/preview'
import { storyMeta } from '@/lib/storyMeta'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const query = await searchParams
  const post = await loadPost(slug, wantsPreview(query.preview))
  if (!post) return {}
  const meta = storyMeta({ ...post, path: postPath(post.slug) })
  if (post.status !== 'published') return { ...meta, robots: { index: false, follow: false } }
  return meta
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string }>
}) {
  const { slug } = await params
  const query = await searchParams
  const preview = wantsPreview(query.preview)
  const post = await loadPost(slug, preview)
  if (!post) notFound()
  return <PostView post={post} preview={preview} />
}
