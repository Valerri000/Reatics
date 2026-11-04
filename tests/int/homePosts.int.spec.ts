import { describe, expect, it } from 'vitest'

import { emptyBlog, homePostCards } from '@/lib/homePosts'

describe('homepage blog', () => {
  it('shows the latest published posts and the empty line', () => {
    const cards = homePostCards([
      {
        title: 'Older note',
        slug: 'older-note',
        status: 'published',
        publishedOn: '2026-10-01T12:00:00.000Z',
      },
      {
        title: 'Office tour notes',
        slug: 'office-tour-notes',
        status: 'draft',
        publishedOn: '2026-10-30T12:00:00.000Z',
      },
      {
        title: 'How to read a listing',
        slug: 'how-to-read-a-listing',
        status: 'published',
        publishedOn: '2026-10-29T15:00:00.000Z',
        author: { firstName: 'Ada', lastName: 'Cole' },
      },
    ])
    expect(cards.map((card) => card.href)).toEqual(['/blog/how-to-read-a-listing', '/blog/older-note'])
    expect(cards[0].byline).toContain('Ada Cole')
    expect(homePostCards([])).toEqual([])
    expect(emptyBlog).toBe('No posts yet.')
  })
})
