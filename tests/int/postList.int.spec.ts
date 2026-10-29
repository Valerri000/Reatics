import { describe, expect, it } from 'vitest'

import { authorName, emptyBlog, formatPostDate, postByline, postPath, visiblePosts } from '@/lib/postList'

const editor = { firstName: 'Avery', lastName: 'Lane', email: 'avery@example.com' }

const posts = [
  {
    title: 'Older note',
    slug: 'older-note',
    status: 'published',
    publishedOn: '2026-10-01T15:00:00.000Z',
    author: editor,
  },
  {
    title: 'Office tour notes',
    slug: 'office-tour-notes',
    status: 'draft',
    publishedOn: '2026-10-29T15:00:00.000Z',
    author: editor,
  },
  {
    title: 'How to read a listing',
    slug: 'how-to-read-a-listing',
    status: 'published',
    publishedOn: '2026-10-29T15:00:00.000Z',
    author: editor,
  },
]

describe('blog index', () => {
  it('lists published posts with the date and the author', () => {
    const visible = visiblePosts(posts)
    expect(visible.map((post) => post.slug)).toEqual(['how-to-read-a-listing', 'older-note'])
    expect(postPath('how-to-read-a-listing')).toBe('/blog/how-to-read-a-listing')
    expect(formatPostDate('2026-10-29T15:00:00.000Z')).toBe('October 29, 2026')
    expect(authorName(editor)).toBe('Avery Lane')
    expect(authorName(4)).toBe('')
    expect(postByline(visible[0])).toBe('October 29, 2026 · Avery Lane')
  })

  it('hides a draft and names the empty state', () => {
    expect(visiblePosts(posts.filter((post) => post.status === 'draft'))).toEqual([])
    expect(emptyBlog).toBe('No posts yet.')
  })
})
