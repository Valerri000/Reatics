import { describe, expect, it } from 'vitest'

import { resolveRedirect } from '@/lib/publicRedirect'

describe('external redirects', () => {
  it('sends a full address through when one was saved', () => {
    expect(
      resolveRedirect('/go', [
        { fromPath: '/go', toPath: 'https://example.com/next', statusCode: 301 },
      ]),
    ).toEqual({ toPath: 'https://example.com/next', statusCode: 301 })
  })
})
