import { publicPath } from '@/lib/paths'

export const emptyBlog = 'No posts yet.'

export type PostAuthor = {
  firstName?: string | null
  lastName?: string | null
  email?: string | null
}

export type PostCard = {
  title: string
  slug: string
  status?: string | null
  publishedOn?: string | null
  author?: PostAuthor | number | null
  h1?: string | null
  content?: unknown
  pageTitle?: string | null
  metaDescription?: string | null
  robots?: string | null
  canonicalUrl?: string | null
}

export function postPath(slug: string) {
  return publicPath('posts', slug)
}

export function visiblePosts<T extends { status?: string | null; publishedOn?: string | null; title?: string | null }>(
  posts: T[],
) {
  return posts
    .filter((post) => post.status === 'published')
    .slice()
    .sort((a, b) => {
      const delta = time(b.publishedOn) - time(a.publishedOn)
      if (delta !== 0) return delta
      return (a.title || '').localeCompare(b.title || '')
    })
}

export function formatPostDate(value?: string | null) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/Los_Angeles',
  }).format(date)
}

export function authorName(author?: PostAuthor | number | null) {
  if (!author || typeof author === 'number') return ''
  const name = [author.firstName, author.lastName]
    .filter((part) => typeof part === 'string' && part.trim())
    .join(' ')
  return name || author.email || ''
}

export function postByline(post: { publishedOn?: string | null; author?: PostAuthor | number | null }) {
  return [formatPostDate(post.publishedOn), authorName(post.author)].filter(Boolean).join(' · ')
}

function time(value?: string | null) {
  if (!value) return 0
  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? 0 : parsed
}
