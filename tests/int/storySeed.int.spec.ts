import { describe, expect, it } from 'vitest'

import { hasBody } from '@/lib/bodyText'
import { visiblePosts } from '@/lib/postList'
import { visibleTerms } from '@/lib/glossaryList'
import { publishErrors } from '@/lib/publish'
import { sampleDraftPost, samplePost, sampleTerm } from '@/lib/storySeed'

describe('story samples', () => {
  it('publishes a post with a date and leaves the draft off the index', () => {
    expect(samplePost.status).toBe('published')
    expect(samplePost.publishedOn).toBe('2026-10-29T15:00:00.000Z')
    expect(samplePost.canonicalUrl).toBe('/blog/how-to-read-a-listing')
    expect(hasBody(samplePost.content)).toBe(true)
    expect(publishErrors({ ...samplePost, author: 2 }, 'title', 'content')).toEqual([])
    expect(visiblePosts([samplePost, sampleDraftPost]).map((post) => post.slug)).toEqual([
      'how-to-read-a-listing',
    ])
    expect(sampleDraftPost.status).toBe('draft')
  })

  it('publishes a glossary term with a definition', () => {
    expect(sampleTerm.slug).toBe('cap-rate')
    expect(sampleTerm.canonicalUrl).toBe('/glossary/cap-rate')
    expect(hasBody(sampleTerm.definition)).toBe(true)
    expect(publishErrors(sampleTerm, 'term', 'definition')).toEqual([])
    expect(visibleTerms([sampleTerm]).map((term) => term.term)).toEqual(['Cap rate'])
  })
})
