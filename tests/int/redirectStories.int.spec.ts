import { describe, expect, it } from 'vitest'

import { resolveRedirect } from '@/lib/publicRedirect'

describe('story redirects', () => {
  it('sends an old post address to the new one', () => {
    expect(
      resolveRedirect('/blog/market-notes', [
        {
          fromPath: '/blog/market-notes',
          toPath: '/blog/how-to-read-a-listing',
          statusCode: 301,
        },
      ]),
    ).toEqual({ toPath: '/blog/how-to-read-a-listing', statusCode: 301 })
  })

  it('sends an old glossary address to the new one', () => {
    expect(
      resolveRedirect('/glossary/cap', [
        { fromPath: '/glossary/cap', toPath: '/glossary/cap-rate', statusCode: 301 },
      ]),
    ).toEqual({ toPath: '/glossary/cap-rate', statusCode: 301 })
  })
})
