import React from 'react'

import { BlogIndex } from '@/components/blog/BlogIndex'
import { loadPublishedPosts } from '@/lib/loadStories'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Blog',
  description: 'Notes on commercial real estate from Reatics.',
  alternates: { canonical: '/blog' },
  robots: { index: true, follow: true },
}

export default async function BlogPage() {
  const posts = await loadPublishedPosts()
  return <BlogIndex posts={posts} />
}
