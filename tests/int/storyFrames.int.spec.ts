import { describe, expect, it } from 'vitest'

import { emptyBlog } from '@/lib/postList'
import { emptyGlossary } from '@/lib/glossaryList'
import { storyEmptyStates, storyFrames, storyWidths } from '@/lib/storyFrames'

describe('blog and glossary frames', () => {
  it('covers the index, the entry, and the empty state at desktop and phone', () => {
    expect(storyWidths.map((item) => item.width)).toEqual([1920, 320])
    expect(storyFrames.map((frame) => frame.id)).toEqual([
      'blog-index',
      'blog-post',
      'glossary-index',
      'glossary-term',
    ])
    expect(storyEmptyStates()).toEqual([emptyBlog, emptyGlossary])
  })
})
