import { describe, expect, it } from 'vitest'

import { bodyText, hasBody } from '@/lib/bodyText'

describe('body text', () => {
  it('reads a heading and a paragraph', () => {
    const text = bodyText({
      root: {
        children: [
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: 'Where to look' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Start with the city.' }],
          },
        ],
      },
    })
    expect(text).toBe('Where to lookStart with the city.')
    expect(hasBody(text)).toBe(true)
  })

  it('treats an empty body as missing', () => {
    expect(hasBody(null)).toBe(false)
    expect(hasBody('   ')).toBe(false)
    expect(hasBody({ root: { children: [{ type: 'paragraph', children: [] }] } })).toBe(false)
  })
})
